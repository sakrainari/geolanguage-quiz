// ベンガル語クイズ用データ
// 方針：独立母音だけを単体で問うより、まず「子音」と「子音＋母音記号」を覚える。

const CONSONANT_DATA = [
    { q: 'ক', a: 'k', roman: 'k', type: '子音・無気音', desc: 'カ行のk。単独では内在母音が乗って「kɔ」っぽく読まれる。' },
    { q: 'খ', a: 'kh', roman: 'kh', type: '子音・帯気音', desc: '息を強く出すk。日本語の「カ」より息が目立つ。' },
    { q: 'গ', a: 'g', roman: 'g', type: '子音・濁音', desc: 'ガ行のg。' },
    { q: 'ঘ', a: 'gh', roman: 'gh', type: '子音・帯気濁音', desc: '息を出しながらのg。' },
    { q: 'ঙ', a: 'ng', roman: 'ng', type: '子音・鼻音', desc: '語中・語末のング系。' },

    { q: 'চ', a: 'ch', roman: 'ch', type: '子音・無気音', desc: 'チャ行のch。' },
    { q: 'ছ', a: 'chh', roman: 'chh', type: '子音・帯気音', desc: '息を強く出すch。' },
    { q: 'জ', a: 'j', roman: 'j', type: '子音・濁音', desc: 'ジャ行のj。' },
    { q: 'ঝ', a: 'jh', roman: 'jh', type: '子音・帯気濁音', desc: '息を出しながらのj。' },
    { q: 'ঞ', a: 'ny', roman: 'ny', type: '子音・鼻音', desc: 'ニャ系。合字の一部としても出る。' },

    { q: 'ট', a: 'ṭ', roman: 'ṭ', type: '子音・反り舌', desc: '舌を反らせるタ系。' },
    { q: 'ঠ', a: 'ṭh', roman: 'ṭh', type: '子音・反り舌帯気', desc: '息を強く出す反り舌タ系。' },
    { q: 'ড', a: 'ḍ', roman: 'ḍ', type: '子音・反り舌濁音', desc: '反り舌のダ系。' },
    { q: 'ঢ', a: 'ḍh', roman: 'ḍh', type: '子音・反り舌帯気濁音', desc: '息を出しながらの反り舌ダ系。' },
    { q: 'ণ', a: 'ṇ', roman: 'ṇ', type: '子音・反り舌鼻音', desc: '反り舌のナ系。' },

    { q: 'ত', a: 't', roman: 't', type: '子音・歯音', desc: '歯音のタ系。' },
    { q: 'থ', a: 'th', roman: 'th', type: '子音・歯音帯気', desc: '息を強く出す歯音タ系。' },
    { q: 'দ', a: 'd', roman: 'd', type: '子音・歯音濁音', desc: '歯音のダ系。' },
    { q: 'ধ', a: 'dh', roman: 'dh', type: '子音・歯音帯気濁音', desc: '息を出しながらの歯音ダ系。' },
    { q: 'ন', a: 'n', roman: 'n', type: '子音・歯音鼻音', desc: 'ナ行のn。' },

    { q: 'প', a: 'p', roman: 'p', type: '子音・無気音', desc: 'パ行のp。' },
    { q: 'ফ', a: 'ph / f', roman: 'ph', type: '子音・帯気音', desc: '本来は息の強いp。外来語ではfっぽく扱われることもある。' },
    { q: 'ব', a: 'b', roman: 'b', type: '子音・濁音', desc: 'バ行のb。' },
    { q: 'ভ', a: 'bh / v', roman: 'bh', type: '子音・帯気濁音', desc: '息を出しながらのb。外来語ではvっぽく扱われることもある。' },
    { q: 'ম', a: 'm', roman: 'm', type: '子音・鼻音', desc: 'マ行のm。' },

    { q: 'য', a: 'y / j', roman: 'y', type: '子音・半母音', desc: 'ヤ行系。転写ではy/jの揺れがある。' },
    { q: 'র', a: 'r', roman: 'r', type: '子音・流音', desc: 'ラ行寄りのr。地名でも頻出。' },
    { q: 'ল', a: 'l', roman: 'l', type: '子音・流音', desc: 'ラ行寄りのl。' },
    { q: 'শ', a: 'sh', roman: 'sh', type: '子音・摩擦音', desc: 'シャ系。' },
    { q: 'ষ', a: 'ṣ / sh', roman: 'ṣ', type: '子音・摩擦音', desc: '反り舌系のシャ。実用上はsh系として見てもよい。' },
    { q: 'স', a: 's', roman: 's', type: '子音・摩擦音', desc: 'サ行のs。' },
    { q: 'হ', a: 'h', roman: 'h', type: '子音・摩擦音', desc: 'ハ行のh。' },

    // --- 地名で重要なヌクタ付き文字 ---
    { q: 'য়', a: 'y', roman: 'y', type: '子音・ヌクタ付き', desc: 'য + ়。地名では y/ya 系としてよく出る。নোয়াখালী、ময়মনসিংহ などで重要。' },
    { q: 'ড়', a: 'ṛ / r', roman: 'ṛ', type: '子音・ヌクタ付き', desc: 'ড + ়。ベンガル語特有のra系。বগুড়া、পঞ্চগড় などで出る。' },
    { q: 'ঢ়', a: 'ṛh / rh', roman: 'ṛh', type: '子音・ヌクタ付き', desc: 'ঢ + ়。頻度は低めだが、ড় とセットで覚える。' }
];

const VOWEL_SIGN_DATA = [
    { sign: '', display: 'なし', vowel: 'ɔ', label: '内在母音', desc: '母音記号がない子音には、最初から短いɔが乗る。例：ক = kɔ。' },
    { sign: 'া', display: '◌া', vowel: 'a', label: 'アー記号', desc: '子音の右側につく。例：ক + া = কা = ka。' },
    { sign: 'ি', display: '◌ি', vowel: 'i', label: '短いイ', desc: '見た目は子音の左に出るが、読む順は子音→母音。例：ক + ি = কি = ki。' },
    { sign: 'ী', display: '◌ী', vowel: 'iː', label: '長いイー', desc: '子音の右側につく長いイー。例：কী = kī。' },
    { sign: 'ু', display: '◌ু', vowel: 'u', label: '短いウ', desc: '子音の下につく。例：কু = ku。' },
    { sign: 'ূ', display: '◌ূ', vowel: 'uː', label: '長いウー', desc: '子音の下につく長いウー。例：কূ = kū。' },
    { sign: 'ে', display: '◌ে', vowel: 'e', label: 'エ', desc: '見た目は左側に出るが、読む順は子音→母音。例：কে = ke。' },
    { sign: 'ৈ', display: '◌ৈ', vowel: 'oi', label: 'オイ', desc: '二重母音oi。例：কৈ = koi。' },
    { sign: 'ো', display: '◌ো', vowel: 'o', label: 'オ', desc: '左右にまたがる形。例：কো = ko。' },
    { sign: 'ৌ', display: '◌ৌ', vowel: 'ou', label: 'オウ', desc: '左右にまたがる形。例：কৌ = kou。' }
];

// 互換用。旧コードで CHAR_DATA を見に行っても壊れないようにする。
const CHAR_DATA = CONSONANT_DATA;
