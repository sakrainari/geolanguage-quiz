const state = {
    datasetId: 'thai',
    modeId: 'thai-consonants',
    items: [],
    current: 0,
    score: 0,
    correct: 0,
    locked: false,
};

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

function shuffle(values) {
    const result = [...values];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

function getDataset() {
    return SCRIPT_DATASETS[state.datasetId];
}

function getMode() {
    return getDataset().modes.find(mode => mode.id === state.modeId) || getDataset().modes[0];
}

function getCount() {
    const count = $('#count').value;
    return count === 'all' ? Infinity : Number(count);
}

function renderDatasetTabs() {
    const tabs = $('#dataset-tabs');
    tabs.innerHTML = '';

    Object.values(SCRIPT_DATASETS).forEach(dataset => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = dataset.id === state.datasetId
            ? 'px-4 py-3 rounded-lg bg-slate-900 text-white font-bold text-left'
            : 'px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold text-left hover:border-slate-400';
        button.innerHTML = `<span class="${dataset.textClass} text-xl mr-2">${dataset.nativeLabel}</span>${dataset.label}`;
        button.onclick = () => {
            state.datasetId = dataset.id;
            state.modeId = dataset.modes[0].id;
            renderSetup();
        };
        tabs.appendChild(button);
    });
}

function renderModeCards() {
    const dataset = getDataset();
    const modes = $('#mode-cards');
    modes.innerHTML = '';

    dataset.modes.forEach(mode => {
        const total = mode.buildItems().length;
        const label = document.createElement('label');
        label.className = 'block cursor-pointer';
        label.innerHTML = `
            <input type="radio" name="mode" value="${mode.id}" class="hidden" ${mode.id === state.modeId ? 'checked' : ''}>
            <div class="mode-card h-full rounded-lg border-2 border-slate-200 bg-white p-4 transition hover:border-slate-400">
                <div class="flex items-start justify-between gap-3">
                    <div>
                        <div class="text-lg font-bold text-slate-900">${mode.label}</div>
                        <div class="mt-1 text-sm text-slate-500">${mode.description}</div>
                    </div>
                    <div class="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">${total}</div>
                </div>
            </div>
        `;
        label.querySelector('input').onchange = () => {
            state.modeId = mode.id;
            renderModeCards();
        };
        modes.appendChild(label);
    });
}

function renderSetup() {
    const dataset = getDataset();
    $('#dataset-title').textContent = dataset.label;
    $('#dataset-native').textContent = dataset.nativeLabel;
    $('#dataset-native').className = `${dataset.textClass} text-4xl font-bold text-slate-900`;
    $('#dataset-description').textContent = dataset.description;
    renderDatasetTabs();
    renderModeCards();
}

function startQuiz() {
    const rawItems = getMode().buildItems();
    const count = Math.min(getCount(), rawItems.length);
    state.items = shuffle(rawItems).slice(0, count).map(item => ({
        ...item,
        options: buildOptions(item, rawItems),
    }));
    state.current = 0;
    state.score = 0;
    state.correct = 0;
    state.locked = false;
    showScreen('quiz');
    renderQuestion();
}

function buildOptions(item, pool) {
    const used = new Set([item.answer]);
    const distractors = [];
    for (const candidate of shuffle(pool)) {
        if (!used.has(candidate.answer)) {
            used.add(candidate.answer);
            distractors.push(candidate.answer);
        }
        if (distractors.length === 3) break;
    }
    return shuffle([item.answer, ...distractors]);
}

function renderQuestion() {
    const dataset = getDataset();
    const mode = getMode();
    const item = state.items[state.current];
    state.locked = false;

    $('#quiz-context').textContent = `${dataset.label} / ${mode.label}`;
    $('#qno').textContent = `${state.current + 1} / ${state.items.length}`;
    $('#score').textContent = `Score ${state.score}`;
    $('#prompt').textContent = item.prompt;
    $('#prompt').className = `${dataset.textClass} text-center font-bold text-slate-900 ${mode.id.includes('places') || mode.id.includes('provinces') ? 'text-5xl md:text-7xl' : 'text-7xl md:text-9xl'}`;
    $('#feedback').style.display = 'none';

    const options = $('#options');
    options.innerHTML = '';
    item.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'opt rounded-lg border-2 border-slate-200 bg-white p-4 text-left text-lg font-bold text-slate-800 transition hover:border-slate-500 hover:bg-slate-50';
        button.innerHTML = `<span class="mr-3 text-sm text-slate-400">${index + 1}</span>${option}`;
        button.onclick = () => choose(option);
        options.appendChild(button);
    });
}

function choose(option) {
    if (state.locked) return;
    state.locked = true;

    const item = state.items[state.current];
    const isCorrect = option === item.answer;
    if (isCorrect) {
        state.correct++;
        state.score += 100;
    }
    $('#score').textContent = `Score ${state.score}`;

    $$('.opt').forEach(button => {
        const text = button.textContent.replace(/^\d+\s*/, '');
        button.disabled = true;
        if (text === item.answer) button.classList.add('correct');
        else if (text === option) button.classList.add('wrong');
    });

    renderFeedback(item, isCorrect, option);
}

function renderFeedback(item, isCorrect, option) {
    const feedback = $('#feedback');
    feedback.style.display = 'block';
    $('#result-label').textContent = isCorrect ? '正解' : '不正解';
    $('#result-label').className = isCorrect ? 'text-2xl font-bold text-emerald-600' : 'text-2xl font-bold text-red-600';
    $('#answer-line').textContent = isCorrect ? `${item.answer} / ${item.note}` : `正解: ${item.answer} / 回答: ${option}`;
    const detail = $('#detail-list');
    detail.innerHTML = '';
    item.detail.forEach(row => {
        const div = document.createElement('div');
        div.className = 'rounded-lg bg-slate-50 p-3';
        div.innerHTML = `<div class="text-xs font-bold uppercase tracking-wide text-slate-400">${row.label}</div><div class="mt-1 text-sm font-semibold text-slate-700">${row.value}</div>`;
        detail.appendChild(div);
    });

    const mapLink = $('#map-link');
    if (item.mapQuery) {
        mapLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.mapQuery)}`;
        mapLink.style.display = 'inline-flex';
    } else {
        mapLink.removeAttribute('href');
        mapLink.style.display = 'none';
    }
}

function nextQuestion() {
    state.current++;
    if (state.current >= state.items.length) {
        renderResult();
        return;
    }
    renderQuestion();
}

function renderResult() {
    showScreen('result');
    const accuracy = state.items.length ? Math.round((state.correct / state.items.length) * 100) : 0;
    $('#final-score').textContent = state.score;
    $('#final-accuracy').textContent = `${accuracy}%`;
    $('#final-count').textContent = `${state.correct} / ${state.items.length}`;
}

function showScreen(name) {
    ['setup', 'quiz', 'result'].forEach(id => {
        $('#' + id).style.display = id === name ? 'block' : 'none';
    });
}

document.addEventListener('keydown', event => {
    if ($('#quiz').style.display === 'none') return;
    const number = Number(event.key);
    if (!state.locked && number >= 1 && number <= 4) {
        const item = state.items[state.current];
        if (item.options[number - 1]) choose(item.options[number - 1]);
    } else if (state.locked && event.key === 'Enter') {
        nextQuestion();
    }
});

$('#start').onclick = startQuiz;
$('#next').onclick = nextQuestion;
$('#retry').onclick = () => showScreen('setup');
$('#back').onclick = () => showScreen('setup');

renderSetup();
