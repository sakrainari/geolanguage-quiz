const PLACE_DATA = [
    // 公式の Bangladesh National Portal に掲載されている8管区・64地区をベースにした実戦地名データ
    // q は看板判読しやすいように『জেলা』を省いた短い形を基本にしています。

    // --- Divisions / 管区 ---
    { q: "ঢাকা বিভাগ", a: "Dhaka Division", type: "Division", desc: "ダッカ管区。首都圏を中心とする管区。" },
    { q: "খুলনা বিভাগ", a: "Khulna Division", type: "Division", desc: "クルナ管区。バングラデシュ南西部の管区。" },
    { q: "চট্টগ্রাম বিভাগ", a: "Chattogram Division", type: "Division", desc: "チョットグラム管区。南東部と沿岸部の重要管区。" },
    { q: "রাজশাহী বিভাগ", a: "Rajshahi Division", type: "Division", desc: "ラジシャヒ管区。北西部の管区。" },
    { q: "সিলেট বিভাগ", a: "Sylhet Division", type: "Division", desc: "シレット管区。北東部、お茶の産地として有名。" },
    { q: "রংপুর বিভাগ", a: "Rangpur Division", type: "Division", desc: "ランプル管区。最北部の管区。" },
    { q: "ময়মনসিংহ বিভাগ", a: "Mymensingh Division", type: "Division", desc: "マイメンシン管区。ダッカ北方の管区。" },
    { q: "বরিশাল বিভাগ", a: "Barishal Division", type: "Division", desc: "バリサル管区。南部の河川地帯。" },

    // --- Dhaka Division / Districts ---
    { q: "ঢাকা", a: "Dhaka", type: "District", desc: "ダッカ。首都。" },
    { q: "ফরিদপুর", a: "Faridpur", type: "District", desc: "ファリドプール。パドマ川の南西。" },
    { q: "গাজীপুর", a: "Gazipur", type: "District", desc: "ガジプール。ダッカ北部の工業地帯。" },
    { q: "গোপালগঞ্জ", a: "Gopalganj", type: "District", desc: "ゴパルガンジ。南西寄りの地区。" },
    { q: "কিশোরগঞ্জ", a: "Kishoreganj", type: "District", desc: "キショルガンジ。ダッカ北東側。" },
    { q: "মাদারীপুর", a: "Madaripur", type: "District", desc: "マダリプール。パドマ川南側。" },
    { q: "মানিকগঞ্জ", a: "Manikganj", type: "District", desc: "マニクガンジ。ダッカ西側。" },
    { q: "মুন্সীগঞ্জ", a: "Munshiganj", type: "District", desc: "ムンシガンジ。ダッカ南側。" },
    { q: "নারায়ণগঞ্জ", a: "Narayanganj", type: "District", desc: "ナラヤンガンジ。ダッカ南東の河港・工業都市。" },
    { q: "নরসিংদী", a: "Narsingdi", type: "District", desc: "ナルシンディ。ダッカ北東側。" },
    { q: "রাজবাড়ী", a: "Rajbari", type: "District", desc: "ラジバリ。パドマ川沿い。" },
    { q: "শরীয়তপুর", a: "Shariatpur", type: "District", desc: "シャリアトプル。パドマ川南側。" },
    { q: "টাঙ্গাইল", a: "Tangail", type: "District", desc: "タンガイル。ダッカ北西へ向かう道路で頻出。" },

    // --- Khulna Division / Districts ---
    { q: "বাগেরহাট", a: "Bagerhat", type: "District", desc: "バゲルハット。世界遺産のモスク都市でも有名。" },
    { q: "চুয়াডাঙ্গা", a: "Chuadanga", type: "District", desc: "チュアダンガ。インド国境寄り。" },
    { q: "যশোর", a: "Jashore", type: "District", desc: "ジョショール。ベナポール方面への要所。" },
    { q: "ঝিনাইদহ", a: "Jhenaidah", type: "District", desc: "ジナイダ。クルナ管区北部。" },
    { q: "খুলনা", a: "Khulna", type: "District", desc: "クルナ。南西部の中心都市。" },
    { q: "কুষ্টিয়া", a: "Kushtia", type: "District", desc: "クシュティア。北西寄りの重要都市。" },
    { q: "মাগুরা", a: "Magura", type: "District", desc: "マグラ。クルナ管区中央寄り。" },
    { q: "মেহেরপুর", a: "Meherpur", type: "District", desc: "メヘルプール。西部国境寄り。" },
    { q: "নড়াইল", a: "Narail", type: "District", desc: "ナライル。ヌクタ付きのড়がポイント。" },
    { q: "সাতক্ষীরা", a: "Satkhira", type: "District", desc: "サトキラ。スンダルバンス方面。" },

    // --- Chattogram Division / Districts ---
    { q: "বান্দরবান", a: "Bandarban", type: "District", desc: "バンダルバン。丘陵地帯。" },
    { q: "ব্রাহ্মণবাড়িয়া", a: "Brahmanbaria", type: "District", desc: "ブラフマンバリア。合字が多く読み応えあり。" },
    { q: "চাঁদপুর", a: "Chandpur", type: "District", desc: "チャンドプル。鼻母音記号ঁがポイント。" },
    { q: "চট্টগ্রাম", a: "Chattogram", type: "District", desc: "チョットグラム。旧英語名Chittagong。" },
    { q: "কুমিল্লা", a: "Cumilla", type: "District", desc: "クミッラ。ダッカ〜チョットグラム間で重要。" },
    { q: "কক্সবাজার", a: "Cox's Bazar", type: "District", desc: "コックスバザール。観光地・海岸で有名。" },
    { q: "ফেনী", a: "Feni", type: "District", desc: "フェニ。幹線道路上の重要地点。" },
    { q: "খাগড়াছড়ি", a: "Khagrachhari", type: "District", desc: "カグラチャリ。丘陵地帯、ড়がポイント。" },
    { q: "লক্ষ্মীপুর", a: "Lakshmipur", type: "District", desc: "ラクシュミプル。ক্ষの合字がポイント。" },
    { q: "নোয়াখালী", a: "Noakhali", type: "District", desc: "ノアカリ。য়＋母音の形が出る。" },
    { q: "রাঙ্গামাটি", a: "Rangamati", type: "District", desc: "ランガマティ。正式にはRangamati Hill District。" },

    // --- Rajshahi Division / Districts ---
    { q: "বগুড়া", a: "Bogura", type: "District", desc: "ボグラ/ボグラ系。2018年以降の英語綴りはBogura。" },
    { q: "জয়পুরহাট", a: "Joypurhat", type: "District", desc: "ジョイプルハット。北西部。" },
    { q: "নওগাঁ", a: "Naogaon", type: "District", desc: "ナオガオン。ওと鼻母音がポイント。" },
    { q: "নাটোর", a: "Natore", type: "District", desc: "ナトール。ラジシャヒ管区。" },
    { q: "চাঁপাইনবাবগঞ্জ", a: "Chapainawabganj", type: "District", desc: "チャパイナワブガンジ。長い地名で看板判読向き。" },
    { q: "পাবনা", a: "Pabna", type: "District", desc: "パブナ。ガンジス川北岸。" },
    { q: "রাজশাহী", a: "Rajshahi", type: "District", desc: "ラジシャヒ。北西部の中心。" },
    { q: "সিরাজগঞ্জ", a: "Sirajganj", type: "District", desc: "シラジガンジ。ジャムナ橋方面で重要。" },

    // --- Sylhet Division / Districts ---
    { q: "হবিগঞ্জ", a: "Habiganj", type: "District", desc: "ホビガンジ。ダッカ〜シレット方面。" },
    { q: "মৌলভীবাজার", a: "Moulvibazar", type: "District", desc: "モウルビバザール。ৌがポイント。" },
    { q: "সুনামগঞ্জ", a: "Sunamganj", type: "District", desc: "スナムガンジ。シレット管区。" },
    { q: "সিলেট", a: "Sylhet", type: "District", desc: "シレット。北東部の中心。" },

    // --- Rangpur Division / Districts ---
    { q: "দিনাজপুর", a: "Dinajpur", type: "District", desc: "ディナジプール。北西の端。" },
    { q: "গাইবান্ধা", a: "Gaibandha", type: "District", desc: "ガイバンダ。ブラマプトラ川沿い。" },
    { q: "কুড়িগ্রাম", a: "Kurigram", type: "District", desc: "クリグラム。ড়がポイント。" },
    { q: "লালমনিরহাট", a: "Lalmonirhat", type: "District", desc: "ラルモニルハット。北部国境寄り。" },
    { q: "নীলফামারী", a: "Nilphamari", type: "District", desc: "ニルファマリ。北部。" },
    { q: "পঞ্চগড়", a: "Panchagarh", type: "District", desc: "パンチャガル。ড়がポイント。" },
    { q: "রংপুর", a: "Rangpur", type: "District", desc: "ランプル。最北部の中心都市。" },
    { q: "ঠাকুরগাঁও", a: "Thakurgaon", type: "District", desc: "タクルガオン。গাঁওの形がポイント。" },

    // --- Mymensingh Division / Districts ---
    { q: "জামালপুর", a: "Jamalpur", type: "District", desc: "ジャマルプル。マイメンシン管区。" },
    { q: "ময়মনসিংহ", a: "Mymensingh", type: "District", desc: "マイメンシン。ダッカ北方の拠点。" },
    { q: "নেত্রকোণা", a: "Netrokona", type: "District", desc: "ネトロコナ。ত্রの連結がポイント。" },
    { q: "শেরপুর", a: "Sherpur", type: "District", desc: "シェルプル。北の国境近く。" },

    // --- Barishal Division / Districts ---
    { q: "ঝালকাঠি", a: "Jhalokati", type: "District", desc: "ジャロカティ。バリサル管区。" },
    { q: "বরগুনা", a: "Barguna", type: "District", desc: "ボルグナ。南部沿岸寄り。" },
    { q: "বরিশাল", a: "Barishal", type: "District", desc: "バリサル。南部河川地帯の中心。" },
    { q: "ভোলা", a: "Bhola", type: "District", desc: "ボラ。大きな島。" },
    { q: "পটুয়াখালী", a: "Patuakhali", type: "District", desc: "ポトゥアカリ。南部沿岸部。" },
    { q: "পিরোজপুর", a: "Pirojpur", type: "District", desc: "ピロジプル。バリサル管区。" }
];
