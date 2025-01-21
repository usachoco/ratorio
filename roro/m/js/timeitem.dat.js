(function () {

	TIME_ITEM_ID_NONE = 0;
	TIME_ITEM_ID_AICILA_CARD = 1;
	TIME_ITEM_ID_ICE_TITAN_CARD = 2;
	TIME_ITEM_ID_ATOLOS_CARD = 3;
	TIME_ITEM_ID_ANNOLIAN_CARD = 4;
	TIME_ITEM_ID_ALCHEMIST_CARD_SET = 5;
	TIME_ITEM_ID_ANSATSUSHANO_DUMASCUS_TOKKO = 6;
	TIME_ITEM_ID_IXIONNO_HANE = 7;
	TIME_ITEM_ID_VAMBERK_CARD = 8;
	TIME_ITEM_ID_WOLF_HEZIN = 9;
	TIME_ITEM_ID_ANGELIC_RING = 10;
	TIME_ITEM_ID_GLORIOUS_GRENADEGUN = 11;
	TIME_ITEM_ID_GLORIOUS_JAMADAHAR = 12;
	TIME_ITEM_ID_GLORIOUS_TABLET = 13;
	TIME_ITEM_ID_GLORIOUS_FUMASHURIKEN = 14;
	TIME_ITEM_ID_GLORIOUS_BLOODY_ROAR = 15;
	TIME_ITEM_ID_KOENNO_TWINEDGE = 16;
	TIME_ITEM_ID_KOKKOCHAN = 17;
	TIME_ITEM_ID_SABAKUNO_YUGURE_KAZE_SET = 18;
	TIME_ITEM_ID_SHADOW_GUARD_WALKER_SET = 19;
	TIME_ITEM_ID_SENTO_FUMASHURIKEN_TOKKO = 20;
	TIME_ITEM_ID_SOENNO_TWINEDGE = 21;
	TIME_ITEM_ID_SOLDIER_GATLINGGUN = 22;
	TIME_ITEM_ID_SOLDIER_GRENADEGUN = 23;
	TIME_ITEM_ID_SOLDIER_HANDGUN = 24;
	TIME_ITEM_ID_TEGRYON = 25;
	TIME_ITEM_ID_TOSHINO_BATTLE_FIST_YUMO = 26;
	TIME_ITEM_ID_NAGANO_UROKO_YOROI = 27;
	TIME_ITEM_ID_NOBLE_HAT = 28;
	TIME_ITEM_ID_VIOLET_FEAR = 29;
	TIME_ITEM_ID_BLOODY_EAT = 30;
	TIME_ITEM_ID_BLUE_RIBBON = 31;
	TIME_ITEM_ID_HODREMRIN_CARD = 32;
	TIME_ITEM_ID_MISRIL_MAGIC_MANT = 33;
	TIME_ITEM_ID_RING_OF_FLAME_LORD = 34;
	TIME_ITEM_ID_SEIREN_VENSER_MVP_CARD = 35;
	TIME_ITEM_ID_SOLDIER_SHOTGUN = 36;
	TIME_ITEM_ID_VAINA = 37;
	TIME_ITEM_ID_RUBEL = 38;
	TIME_ITEM_ID_CHRONOS = 39;
	TIME_ITEM_ID_NEMESIS = 40;
	TIME_ITEM_ID_DUNAIL_CARD = 41;
	TIME_ITEM_ID_RATATOSK_CAD = 42;
	TIME_ITEM_ID_FIRA_CARD = 43;
	TIME_ITEM_ID_IGNIS_CAP = 44;
	TIME_ITEM_ID_RUDO_MASK = 45;
	TIME_ITEM_ID_SHINPANNO_MACE_PHYSICAL = 46;
	TIME_ITEM_ID_SHINPANNO_MACE_MAGICAL = 47;
	TIME_ITEM_ID_SHINPANNO_MACE_2_PHYSICAL = 48;
	TIME_ITEM_ID_SHINPANNO_MACE_2_MAGICAL = 49;
	TIME_ITEM_ID_PEOTH_SET = 50;
	TIME_ITEM_ID_SHIRAHANO_MANT = 51;
	TIME_ITEM_ID_NAGANO_UROKOTATE = 52;
	TIME_ITEM_ID_SHIBAINUBO_SET = 53;
	TIME_ITEM_ID_VNDER_CANMER_SHUCHURYOKU_KOZYO = 54;
	TIME_ITEM_ID_VNDER_CANMER_BAKURETSU_HADO = 55;
	TIME_ITEM_ID_RALF_FONG_TWIEGE_666 = 56;
	TIME_ITEM_ID_VALKYRIE_CIRCLET_SET = 57;
	TIME_ITEM_ID_SHISHIONO_KABUTO = 58;
	TIME_ITEM_ID_PIAMET_CHANGE = 59;
	TIME_ITEM_ID_OWLDUKENO_SILKHAT_AMPLV2 = 60;
	TIME_ITEM_ID_OKAMIMOYONO_TEKKO = 61;
	TIME_ITEM_ID_OWLDUKENO_SILKHAT_AMPLV4 = 62;
	TIME_ITEM_ID_OWLDUKENO_SILKHAT_AMPLV6 = 63;
	TIME_ITEM_ID_KITSUNE_SUZU_RIBBON = 64;
	TIME_ITEM_ID_NEKOMIMI_BERET_SET = 65;
	TIME_ITEM_ID_DATENSHINO_TATE = 66;
	TIME_ITEM_ID_BERET_BOSS_BOSHI = 67;
	TIME_ITEM_ID_DULGER_HYUKKENOFUKU = 68;
	TIME_ITEM_ID_AKUMA_BARAINO_SHO = 69;
	TIME_ITEM_ID_RANDEL_ROLENCE_CARD = 70;
	TIME_ITEM_ID_ATAMANORI_FEERIL_FUYUSURU_KENZYANO_ISHI_SET = 71;
	TIME_ITEM_ID_EIYUNO_KONSEKI_SUPPORT = 72;
	TIME_ITEM_ID_GEFFEN_MAHOTAIKAI_SUPPORT_ATK = 73;
	TIME_ITEM_ID_GEFFEN_MAHOTAIKAI_SUPPORT_MATK = 74;
	TIME_ITEM_ID_GEFFEN_MAHOTAIKAI_SUPPORT_RESIST = 75;
	TIME_ITEM_ID_BANIRMIRTBO_FUYUSURU_KENZYANO_ISHI = 76;
	TIME_ITEM_ID_SURVIVAL_CIRCLET_SET = 77;
	TIME_ITEM_ID_YUSHANO_HIDDEN_CLOTH = 78;
	TIME_ITEM_ID_ECLAGE_ORBE = 79;
	TIME_ITEM_ID_12TH_ANIVERSERY_SUPPORT = 80;
	TIME_ITEM_ID_RUEEZENO_AKAIKUTSU_PERMET_TURTLE_CARD = 81;
	TIME_ITEM_ID_AWL_VAICAUNTNO_SILKHAT = 82;
	TIME_ITEM_ID_SHADOW_STUFF = 83;
	TIME_ITEM_ID_IORNE_STUFF = 84;
	TIME_ITEM_ID_SARANO_ROBE = 85;
	TIME_ITEM_ID_FURUBITA_BALLERINANO_KAMIKAZARI = 86;
	TIME_ITEM_ID_FURUBITA_BLAZING_SOUL = 87;
	TIME_ITEM_ID_FURUBITA_MINSTRELSONGNO_BOSHI = 88;
	TIME_ITEM_ID_FURUBITA_SHADOW_CROWN = 89;
	TIME_ITEM_ID_LEASER_OF_EAGLE_DELAY_CUT = 90;
	TIME_ITEM_ID_LEASER_OF_EAGLE_TRUE_SIGHT = 91;
	TIME_ITEM_ID_S_ATK = 92;
	TIME_ITEM_ID_S_MATK = 93;
	TIME_ITEM_ID_S_AVOID = 94;
	TIME_ITEM_ID_S_MAXHP = 95;
	TIME_ITEM_ID_S_QUICK = 96;
	TIME_ITEM_ID_S_CRI = 97;
	TIME_ITEM_ID_SHADOW_RING = 98;
	TIME_ITEM_ID_POWERED_SET = 99;
	TIME_ITEM_ID_SHIPPU = 100;
	TIME_ITEM_ID_TENCHI = 101;
	TIME_ITEM_ID_LOLANO_TEKKYU_SET = 102;
	TIME_ITEM_ID_RUDONO_ROLLPAPER = 103;
	TIME_ITEM_ID_RUDO_CARD = 104;
	TIME_ITEM_ID_AVENGER_CLAYMORE = 105;
	TIME_ITEM_ID_AVENGER_BLOODYROAR = 106;
	TIME_ITEM_ID_AVENGER_GRENADEGUN = 107;
	TIME_ITEM_ID_RISUMIMI_HOODBO = 108;
	TIME_ITEM_ID_SUITEN = 109;
	TIME_ITEM_ID_ROKINO_ASSASIN_MASK = 110;
	TIME_ITEM_ID_TOZOKUNO_SUSUME_DAIIKKAN_BERSERK = 111;
	TIME_ITEM_ID_TOZOKUNO_SUSUME_DAIIKKAN_OVER_TRUST_MAX = 112;
	TIME_ITEM_ID_TOZOKUNO_SUSUME_DAIIKKAN_MAHORYOKU_ZOFUKU = 113;
	TIME_ITEM_ID_TOKIMAZYUTSUSHINO_ROBE = 114;
	TIME_ITEM_ID_HIMAWARI_SHONEN = 115;
	TIME_ITEM_ID_JULIET_DE_RACHEL = 116;
	TIME_ITEM_ID_GOFUSEKI_PEORTH_SET = 117;
	TIME_ITEM_ID_RUNE_KNIGHT_SEIREN_CARD_RUNE_KNIGHT_SEIREN_MVP_CARD = 118;
	TIME_ITEM_ID_WARLOCK_CATHERINE_CARD_WARLOCK_CATHERINE_MVP_CARD = 119;
	TIME_ITEM_ID_RANGER_CECIL_CARD_RANGER_CECIL_MVP_CARD = 120;
	TIME_ITEM_ID_ARCH_BISHOP_MARGARETTE_CARD_ARCH_BISHOP_MARGARETTE_MVP_CARD = 121;
	TIME_ITEM_ID_GUILLOTINE_CROSS_ELEMES_CARD_GUILLOTINE_CROSS_ELEMES_MVP_CARD = 122;
	TIME_ITEM_ID_MECHANIC_HAWARD_CARD_MECHANIC_HAWARD_MVP_CARD = 123;
	TIME_ITEM_ID_ROYAL_GUARD_RANDEL_CARD_ROYAL_GUARD_RANDEL_MVP_CARD = 124;
	TIME_ITEM_ID_SORCERER_CERIA_CARD_SORCERER_CERIA_MVP_CARD = 125;
	TIME_ITEM_ID_MINSTREL_ARFOSIO_CARD_MINSTREL_ARFOSIO_MVP_CARD = 126;
	TIME_ITEM_ID_WANDERER_TRENTINI_CARD_WANDERER_TRENTINI_MVP_CARD = 127;
	TIME_ITEM_ID_SHURA_CHENG_CARD_SHURA_CHENG_MVP_CARD = 128;
	TIME_ITEM_ID_SHADOW_CHASER_GARTY_CARD_SHADOW_CHASER_GARTY_MVP_CARD = 129;
	TIME_ITEM_ID_GENETIC_EMUR_CARD_GENETIC_EMUR_MVP_CARD = 130;
	TIME_ITEM_ID_AVENGER_JAMADAHAR = 131;
	TIME_ITEM_ID_HYAKKA = 132;
	TIME_ITEM_ID_SHINRINO_KAIHO = 133;
	TIME_ITEM_ID_SHAKUNETSUNO_KEN = 134;
	TIME_ITEM_ID_NARAKUNO_KEN = 135;
	TIME_ITEM_ID_ZYOKANO_KEN = 136;
	TIME_ITEM_ID_SHUGEKISHANO_ROBE = 137;
	TIME_ITEM_ID_CUTIE_CARD = 138;
	TIME_ITEM_ID_GODS_SWORD_ONRYOBUSHI_CARD = 139;
	TIME_ITEM_ID_CANCER = 140;
	TIME_ITEM_ID_SURVIVAL_SHOES_SURVIVAL_ROD_DEX_S1 = 141;
	TIME_ITEM_ID_SURVIVAL_SHOES_SURVIVAL_ROD_INT_S1 = 142;
	TIME_ITEM_ID_HAO = 143;
	TIME_ITEM_ID_ZYOO_FACEWORM = 144;
	TIME_ITEM_ID_JITTER_BUG = 145;
	TIME_ITEM_ID_GOWAN = 146;
	TIME_ITEM_ID_DAKITSUKI_SYAMUNEKO = 147;
	TIME_ITEM_ID_FURUBITA_SHUGONOKANMURI = 148;
	TIME_ITEM_ID_ULTIMATE_MODE_CHANGER_PEORTH_ARTIFACT = 149;
	TIME_ITEM_ID_CELINENO_BROACH_AKURYONO_ITONO_TEBUKURO = 150;
	TIME_ITEM_ID_FUSHINO_GUNDAN_NINSHIKIHYO_HIMAWARI_SHONEN = 151;
	TIME_ITEM_ID_GOKETSU = 152;
	TIME_ITEM_ID_ILLUSION_RENGEKINO_TSUME = 153;
	TIME_ITEM_ID_TOKUSHUKANNKYO_KATSUDOYO_BOOTS_DARKLORD_CARD = 154;
	TIME_ITEM_ID_FURUBITA_HAKENTAINO_YUBIWA_FURUBITA_BONECIRCRET = 155;
	TIME_ITEM_ID_FUSHOHENO_GANTAI_SEIREN_VIENSER_MVP_CARD = 156;
	TIME_ITEM_ID_ZETSUBONO_KAMI_MOROCC_CARD = 157;
	TIME_ITEM_ID_ENCHANT_HONOIKAZUCHINOOKAMI_AR = 158;
	TIME_ITEM_ID_ENCHANT_HONOIKAZUCHINOOKAMI_DEX100 = 159;
	TIME_ITEM_ID_GREATER_DRACLE_HORN = 160;
	TIME_ITEM_ID_OKAMINOKAMINO_HAGOROMO_KTULLANUX = 161;
	TIME_ITEM_ID_SHINO_YOKUDO = 162;
	TIME_ITEM_ID_DEMONISH_SWORD_ONRYOBUSHI_CARD = 163;
	TIME_ITEM_ID_BOOSTER_LANCE_OS = 164;
	TIME_ITEM_ID_X_FATAL_FLASH = 165;
	TIME_ITEM_ID_X_FIRING_SHOT = 166;
	TIME_ITEM_ID_X_LUCKY_STRIKE = 167;
	TIME_ITEM_ID_X_OVER_POWER = 168;
	TIME_ITEM_ID_X_SPELL_BUSTER = 169;
	TIME_ITEM_ID_X_UNLIMIT_VITAL = 170;
	TIME_ITEM_ID_AWL_BARRONNO_MANT = 171;
	TIME_ITEM_ID_MAGICAL_CLOTH = 172;
	TIME_ITEM_ID_EXTREME = 173;
	TIME_ITEM_ID_SOLOMONNO_PENDANT = 174;
	TIME_ITEM_ID_T_POWER_BOOST = 175;
	TIME_ITEM_ID_T_MAGIC_BOOST = 176;
	TIME_ITEM_ID_T_ASSAULT = 177;
	TIME_ITEM_ID_PIKAPIKA_NYANNYAN_CROWN = 178;
	TIME_ITEM_ID_CHAPUCHAPU_NYANPU_HAT = 179;
	TIME_ITEM_ID_KUMANO_CHIKARA = 180;
	TIME_ITEM_ID_KOSOKU = 181;
	TIME_ITEM_ID_KOGAI = 182;
	TIME_ITEM_ID_BOSOSHITA_MARYOKU = 183;
	TIME_ITEM_ID_OWASHINO_GANKO = 184;
	TIME_ITEM_ID_KOUUNNA_HI = 185;
	TIME_ITEM_ID_KAKUSEI_OKAMINOKAMINO_HAGOROMO_KTULLANUX = 186;
	TIME_ITEM_ID_OKAMINOKAMINO_HAGOROMO_FUINSARETA_KTULLANUX = 187;
	TIME_ITEM_ID_KAKUSEI_OKAMINOKAMINO_HAGOROMO_FUINSARETA_KTULLANUX = 188;
	TIME_ITEM_ID_METAL_DEATH_ADDER = 189;
	TIME_ITEM_ID_SENZAI_KAIHO_GUILLOTINE_CROSS = 190;
	TIME_ITEM_ID_POLLUX_BOOK = 191;
	TIME_ITEM_ID_KAKUSE_TOKUSHU_KANKYO_KATSUDOYO_BOOTS_FUINSARETA_DARKLORD_CARD = 192;
	TIME_ITEM_ID_TOKUSHU_KANKYO_KATSUDOYO_BOOTS_FUINSARETA_DARKLORD_CARD = 193;
	TIME_ITEM_ID_GULARUSION_UNLIMIT = 194;
	TIME_ITEM_ID_GULARUSION_AGI_PLUS = 195;
	TIME_ITEM_ID_INVIDIA_BANDLE = 196;
	TIME_ITEM_ID_S_FATAL_FLASH = 197;
	TIME_ITEM_ID_S_FIRING_SHOT = 198;
	TIME_ITEM_ID_S_LUCKY_STRIKE = 199;
	TIME_ITEM_ID_S_OVER_POWER = 200;
	TIME_ITEM_ID_S_SPELL_BUSTER = 201;
	TIME_ITEM_ID_S_UNLIMIT_VITAL = 202;
	TIME_ITEM_ID_CRYSTAL_BLADE_NECKLACE = 203;
	TIME_ITEM_ID_IMPERIAL_ANIMAL_ROBE = 204;
	TIME_ITEM_ID_GRACE_ANIMAL_ROBE = 205;
	TIME_ITEM_ID_ROYAL_WHIP = 206;
	TIME_ITEM_ID_ROYAL_CELLO = 207;
	TIME_ITEM_ID_TATSUINUNO_UDEWA_GOKETSU = 208;
	TIME_ITEM_ID_SANGAKU_HELMET = 209;
	TIME_ITEM_ID_GRACE_MENUS_SUIT = 210;
	TIME_ITEM_ID_PARACELSUS_GLOVE_HAO = 211;
	TIME_ITEM_ID_MELON_ARMS = 212;
	TIME_ITEM_ID_SHUKUSEINO_KUTSU = 213;
	TIME_ITEM_ID_FUINSARETA_ATOLOS_CARD = 214;
	TIME_ITEM_ID_ENCHANT_HOZYONO_MEGAMI_ATLOS = 215;
	TIME_ITEM_ID_ENCHANT_HOZYONO_MEGAMI_FUINSARETA_ATOLOS_CARD = 216;
	TIME_ITEM_ID_TRAVELER_RING_GOKETSU = 217;
	TIME_ITEM_ID_DARK_TRIAD = 218;
	TIME_ITEM_ID_ILLUSION_IBARANO_TSUE = 219;
	TIME_ITEM_ID_ILLUSION_STUFF_OF_TEAR = 220;
	TIME_ITEM_ID_ILLUSION_ANCIENT_DUGGER_TELECHINESIS_INSTENCE = 221;
	TIME_ITEM_ID_ILLUSION_ANCIENT_DUGGER_MAGICAL_UP = 222;
	TIME_ITEM_ID_SENZAI_KAKUSE_CRAZY_WEED = 223;
	TIME_ITEM_ID_SENZAI_KAKUSE_ARROW_STORM = 224;
	TIME_ITEM_ID_SENZAI_KAKUSE_JUDEX = 225;
	TIME_ITEM_ID_SENZAI_KAKUSE_MANGETSU_KYAKU = 226;
	TIME_ITEM_ID_SENZAI_KAKUSE_OTORO = 227;
	TIME_ITEM_ID_SENZAI_KAKUSE_SAVAGENO_TAMASHI = 228;
	TIME_ITEM_ID_SENZAI_KAKUSE_SISIKO = 229;
	TIME_ITEM_ID_SENZAI_KAKUSE_ARMS_CANNON = 230;
	TIME_ITEM_ID_SENZAI_KAKUSE_JACK_FROST = 231;
	TIME_ITEM_ID_SENZAI_KAKUSE_IGNITION_BREAK = 232;
	TIME_ITEM_ID_KOKUYOKUNO_SHITO = 233;
	TIME_ITEM_ID_IKYONO_TOKATSUSHA_TURTLE_GENERAL = 234;
	TIME_ITEM_ID_IKYONO_TOKATSUSHA_FUINSARETA_TURTLE_GENERAL = 235;
	TIME_ITEM_ID_LUDE = 236;
	TIME_ITEM_ID_SENZAI_KAKUSE_BUNISHING_BASTER = 237;
	TIME_ITEM_ID_DETECT_STUFF = 238;
	TIME_ITEM_ID_INORU_MONO = 239;
	TIME_ITEM_ID_KYOKANSURU_MONO = 240;
	TIME_ITEM_ID_KOFUKUWO_ATAERU_MONO = 241;
	TIME_ITEM_ID_HOHOEMU_MONO = 242;
	TIME_ITEM_ID_SINFUL_RUBY_NECKLACE = 243;
	TIME_ITEM_ID_ZINRIKI = 244;
	TIME_ITEM_ID_PLAGARION = 245;
	TIME_ITEM_ID_MYSTERY_WING = 246;
	TIME_ITEM_ID_VOLCARING = 247;
	TIME_ITEM_ID_SHIGERING = 248;
	TIME_ITEM_ID_DEMI_FREYA = 249;
	TIME_ITEM_ID_LAVA_TODO = 250;
	TIME_ITEM_ID_FUZINO_MAKEN = 251;
	TIME_ITEM_ID_UNMEINO_YARI = 252;
	TIME_ITEM_ID_SERENO_VIOLIN = 253;
	TIME_ITEM_ID_ZYABARAKEN = 254;
	TIME_ITEM_ID_HENI_CHIMERA_FULGOR = 255;
	TIME_ITEM_ID_YUENNARU_TENZYONO_MIYAKO = 256;
	TIME_ITEM_ID_URUNO_KAGO = 257;
	TIME_ITEM_ID_MUNEN_MUSO = 258;
	TIME_ITEM_ID_DOKUTSU_FUTOKA = 259;
	TIME_ITEM_ID_KAKYU_RGAN = 260;
	TIME_ITEM_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_WIND_HAWK_3 = 261;
	TIME_ITEM_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_INQUISITOR_2 = 262;
	TIME_ITEM_ID_CHOTOTSU_MOUSHIN = 269;
	TIME_ITEM_ID_TRIANGLE_DISASTER = 275;
	TIME_ITEM_ID_FLUSH_DETECT_STAFF = 276;
	TIME_ITEM_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_SHADOW_CHASER_2 = 277;
	TIME_ITEM_ID_MAKENSHI_SAKRAY_CARD = 294;

	ITEM_SP_TIME_OBJ = [
		[0,"装備/カードの時限性補助効果+NPC支援+期間限定","なし",[[0,0]],0],
		[1,"アイシラカード","詠唱-50%、FLEE+30",[[2,472]],9,30,0],
		[2,"アイスタイタンカード","DEF+10",[[2,484]],18,10,0],
		[3,"アトロスカード","ASPD+100%",[[2,463]],12,100,0],
		[4,"アノリアンカード","集中力向上Lv1（★ステ欄下部注意参照★）",[[2,224]],0],
		[5,"アルケミスト優遇カードセット","アドレナリンラッシュ(全ての武器)",[[2,461]],0],
		[6,"暗殺者のダマスカス(特攻)","発勁効果(錐計算)",[[1,898]],23,1,0],
		[7,"イクシオンの羽","ASPD+7%",[[1,821]],12,7,0],
		[8,"ヴァンベルクカード","CRI+100",[[2,471]],10,100,0],
		[9,"ウルフヘジン","物理被ダメージ20%減少、MDEF-20%",[[1,708]],0],
		[10,"エンジェリックリング","ヒール、サンク、Pピッチャーの回復量+20%",[[1,1000]],91,20,0],
		[11,"グロリアスグレネードガン","ASPD+20%",[[1,1103]],12,20,0],
		[12,"グロリアスジャマハダル(+9)","ASPD+100%",[[1,1091]],12,100,0],
		[13,"グロリアスタブレット","ATK+200",[[1,1094]],17,200,0],
		[14,"グロリアス風魔手裏剣","風魔手裏剣投げと一閃のダメージ+100%",[[1,1098]],5396,100,5405,100,5438,100,0],
		[15,"グロリアスブラッディロア(+9)","ASPD+100%",[[1,1090]],12,100,0],
		[16,"紅炎のツインエッジ","一般モンスターの防御力無視",[[1,933]],22,1,0],
		[17,"こっこちゃん","ラウドボイス",[[1,1012]],0],
		[18,"砂漠の夕暮れ+砂漠の風セット","ASPD+100%",[[1,818]],12,100,0],
		[19,"シャドウガード+ウォーカーセット","FLEE+20",[[1,995]],9,20,0],
		[20,"戦闘風魔手裏剣(特攻)","風魔手裏剣投げと一閃のダメージ+100%",[[1,931]],5396,100,5405,100,5438,100,0],
		[21,"蒼炎のツインエッジ","一般モンスターの防御力無視",[[1,932]],22,1,0],
		[22,"ソルジャーガトリングガン","ATK+80",[[1,927]],17,80,0],
		[23,"ソルジャーグレネードガン","ATK+300",[[1,929]],17,300,0],
		[24,"ソルジャーハンドガン","ASPD+100%",[[1,925]],12,100,0],
		[25,"テグリョン(JobLV70)","ATK+50",[[1,934]],17,50,0],
		[26,"闘士のバトルフィスト(勇猛)","阿修羅覇凰拳の詠唱-100%",[[1,916]],7197,100,7321,100,0],
		[27,"ナーガの鱗鎧","ATK+20",[[1,989]],17,20,0],
		[28,"ノーブルハット","アドレナリンラッシュ(全ての武器)",[[1,1129]],0],
		[29,"バイオレットフィアー","一般モンスターの防御力無視",[[1,935]],22,1,0],
		[30,"ブラッディイート","CRI+100、ATK+50",[[1,819]],10,100,17,50,0],
		[31,"ブルーリボン","集中力向上Lv2（★ステ欄下部注意参照★）",[[1,885]],0],
		[32,"ホドレムリンカード","完全回避+30",[[2,467]],11,30,0],
		[33,"ミスリルマジックマント","魔法被ダメージ20%減少、DEF-20%",[[1,709]],0],
		[34,"リングオブフレームロード","爆裂波動Lv1",[[1,728]],0],
		[35,"セイレン=ウィンザー(MVP)カード","バーサーク",[[2,178]],0],
		[36,"ソルジャーショットガン","ATK+100",[[1,928]],17,100,0],
		[37,"ヴァイナ","物理与ダメージ+10%",[[1,1157]],80,10,0],
		[38,"ルーベル","バッシュ/ボウリングバッシュのダメージ+20%",[[1,1158]],5006,20,5076,20,0],
		[39,"クロノス","MATK+12%/SP消費量+20%",[[1,1172]],89,12,102,20,0],
		[40,"ネメシス","ATK+50",[[1,820]],17,50,0],
		[41,"ドゥネイールカード","完全回避+10",[[2,544]],11,10,0],
		[42,"ラタトスクカード","固定詠唱-50%",[[2,545]],0],
		[43,"フィラカード","CRI+20",[[2,547]],10,20,0],
		[44,"イグニスキャップ","一般モンスターの防御力無視",[[1,1461]],22,1,0],
		[45,"ルードマスク","ラウドボイス",[[1,1468]],0],
		[46,"審判のメイス","悪魔への物理+20%",[[1,1569]],36,20,0],
		[47,"審判のメイス","悪魔への魔法+20%",[[1,1569]],176,20,0],
		[48,"審判のメイスII","悪魔への物理+40%",[[1,1571]],36,40,0],
		[49,"審判のメイスII","悪魔への魔法+40%",[[1,1571]],176,40,0],
		[50,"ペオースセット","コンセントレイションのAspd+2",[[1,1586]],101,2,0],
		[51,"白羽のマント","FLEE+20",[[1,1602]],9,20,0],
		[52,"ナーガの鱗盾","盾精錬値×3%を物理反射",[[1,993]],0],
		[53,"柴犬帽(黒)+忠節の首輪","(仮)Atk+(30+30x頭精錬値)",[[1,1683]],0],
		[54,"ヴンダーカンマー","集中力向上Lv5（★ステ欄下部注意参照★）",[[1,1404]],0],
		[55,"ヴンダーカンマー","爆裂波動Lv3",[[1,1404]],0],
		[56,"ラルフ・フォン・ツィーゲ666世","アドレナリンラッシュ(全ての武器)",[[1,1746]],0],
		[57,"ヴァルキリーサークレットSET","ランドグリス変化(Hit-10)",[[1,1786]],8,-10,0],
		[58,"獅子王の兜","ラウドボイス",[[1,1814]],0],
		[59,"ピアメット変化","ピアメットのリボン精錬値3毎にMatk+5",[[1,1886]],0],
		[60,"オウルデュークのシルクハット","魔法力増幅Lv2",[[1,1889]],0],
		[61,"狼紋様の手甲","ATK+100,FLEE-50",[[1,1988]],17,100,9,-50,0],
		[62,"オウルデュークのシルクハットSet","魔法力増幅Lv4",[[1,2021]],0],
		[63,"オウルデュークのシルクハットSet","魔法力増幅Lv6",[[1,2022]],0],
		[64,"狐耳鈴リボン","月夜花変化(Cri+100,遠距離物理+5%)",[[1,2085]],10,100,25,5,0],
		[65,"ネコミミベレーset","ワイルドローズに変身(All Status+8)",[[1,2103]],217,8,0],
		[66,"堕天使の盾","ディレイ-10%～",[[1,2118]],74,10,0],
		[67,"ベレーBOSS帽子(キングポリン変化)","小中大へ物理+20%",[[0,0]],27,20,28,20,29,20,0],
		[68,"ドゥルガー+ヒュッケ服","一般モンスターの防御力無視",[[1,2171]],22,1,0],
		[69,"悪魔祓いの書","魔法防御力無視",[[1,2178]],0],
		[70,"ランデル=ロレンスカード","オートガードLv3",[[2,719]],0],
		[71,"頭フィーリル+浮遊する賢者","ASPD+2,全武器DA_Lv10",[[1,2281]],101,2,0],
		[72,"■(期間限定)英雄支援","英雄の痕跡+20%",[[0,0]],0],
		[73,"▲(NPC)ゲフェン魔法大会支援","人間形ATK+10%",[[0,0]],37,10,0],
		[74,"▲(NPC)ゲフェン魔法大会支援","人間形Matk+10%",[[0,0]],177,10,0],
		[75,"▲(NPC)ゲフェン魔法大会支援","人間形耐性+10%",[[0,0]],57,10,0],
		[76,"バニル帽＋浮遊する賢者の石","ダブルキャスティングLv1",[[1,2284]],0],
		[77,"サバイバルサークレットSET","変動詠唱時間-50%",[[1,2339]],73,-50,0],
		[78,"勇者のヒドゥンクロース","Cri+20,Flee+20,Atk+10%,Matk+10%",[[1,2361]],10,20,9,20,80,10,89,10,0],
		[79,"▲(NPC)エクラージュ オーブ支援","ステータス+6(料理扱い),AtkとMatk+24",[[0,0]],0],
		[80,"■(期間限定)12thアニバ星座支援","与ダメ+30%/被ダメ-40%",[[0,0]],0],
		[81,"ルイーゼの赤い靴+パーメットC","Def+200,Mdef+20",[[1,2408]],18,200,19,20,0],
		[82,"オウルヴァイカウントのシルクハット","攻撃速度上昇",[[1,2413]],0],
		[83,"シャドウスタッフ","ヘルインフェルノの詠唱時間-30%",[[1,2428]],7528,30,0],
		[84,"アイオーンスタッフ","リリース後1秒魔法威力UP。ﾘﾘｰｽ後のため魔法力増幅無効",[[1,2429]],0],
		[85,"サラのローブ","鎧精錬値1上がる度にMatk+8",[[1,2526]],0],
		[86,"古びたバレリーナの髪飾り","シビアレインストームのダメージ+100%",[[1,2596]],5642,100,0],
		[87,"古びたブレイジングソウル","詠唱時間-100%",[[1,2600]],73,-100,0],
		[88,"古びたミンストレルソングの帽子","シビアレインストームのダメージ+100%",[[1,2596]],5642,100,0],
		[89,"古びたシャドウクラウン","DEX+100",[[1,2608]],5,100,0],
		[90,"レーザーオブイーグル","セシル=ディモン変化(スキルディレイ-100%)",[[1,2634]],74,100,0],
		[91,"レーザーオブイーグル","セシル=ディモン変化後のトゥルーサイトLv2",[[1,2634]],0],
		[92,"S-Atk","ATK+150",[[2,944]],17,150,0],
		[93,"S-Matk","MATK+150",[[2,945]],100,150,0],
		[94,"S-Avoid","完全回避+100",[[2,946]],11,100,0],
		[95,"S-MaxHP","MaxHP+7500,HP+7500",[[2,947]],13,7500,0],
		[96,"S-Quick","詠唱時間-100%,スキルディレイ-100%",[[2,948]],73,-100,74,100,0],
		[97,"S-Cri","Cri+100",[[2,949]],10,100,0],
		[98,"シャドウリング","トライアングルショット強化",[[1,2704]],0],
		[99,"パワードセット","被弾時スキルディレイ-30%",[[1,2714]],74,30,0],
		[100,"疾風","攻撃速度+70%、詠唱時間-70%、ｽｷﾙﾃﾞｨﾚｲ-70%",[[2,1006]],12,70,73,-70,74,70,0],
		[101,"天地","詠唱時間-70%、ｽｷﾙﾃﾞｨﾚｲ-70%、敵のDef・Mdef100%無視",[[2,1007]],73,-70,74,70,290,100,295,100,0],
		[102,"ローラの鎖鉄球セット","敵のDef100%無視",[[1,2747]],290,100,0],
		[103,"ルドのロールペーパー","聖属性魔法攻撃で与えるダメージ+10%",[[1,2753]],346,10,0],
		[104,"ルドカード","Agi+44",[[2,1011]],2,44,0],
		[105,"アヴェンジャークレイモア","スキルディレイ-100%",[[1,2758]],74,100,0],
		[106,"アヴェンジャーブラッディロア","Atk+100",[[1,2761]],17,100,0],
		[107,"アヴェンジャーグレネードガン","攻撃速度+20%",[[1,2769]],12,20,0],
		[108,"リス耳フード帽","クリティカル攻撃で与えるダメージ+100%",[[1,2785]],70,100,0],
		[109,"水天","詠唱時間-70%、スキルディレイ-70%、消費SP-70%",[[2,1067]],73,-70,74,70,102,70,0],
		[110,"ロキのアサシンマスク","Agi + 10、Atk + 10",[[1,2854]],2,10,17,10,0],
		[111,"盗賊のすすめ第一巻","バーサークLv1",[[1,2860]],0],
		[112,"盗賊のすすめ第一巻","オーバートラストマックスLv5",[[1,2860]],0],
		[113,"盗賊のすすめ第一巻","魔法力増幅Lv5",[[1,2860]],0],
		[114,"時魔術師のローブ","Int+3×精錬値",[[1,2880]],0],
		[115,"ひまわり少年","メテオストームで与えるダメージ+60%",[[1,2911]],5125,60,0],
		[116,"ジュリエットディレイチェル","Atk+50",[[1,2912]],17,50,0],
		[117,"業風石ペオースセット","スキルディレイ-70%",[[1,2968]],74,70,0],
		[118,"ルーンナイトセイレンセット","Vit+100",[[2,1187]],3,100,0],
		[119,"ウォーロックカトリーヌセット","Int+100",[[2,1190]],4,100,0],
		[120,"レンジャーセシルセット","Dex+100",[[2,1193]],5,100,0],
		[121,"アークビショップマーガレッタセット","ヒール回復量+100%",[[2,1196]],91,100,0],
		[122,"ギロチンクロスエレメスセット","Agi+100",[[2,1199]],2,100,0],
		[123,"メカニックハワードセット","Luk+100",[[2,1202]],6,100,0],
		[124,"ロイヤルガードランデルセット","Vit+100",[[2,1205]],3,100,0],
		[125,"ソーサラーセリアセット","Int+100",[[2,1208]],4,100,0],
		[126,"ミンストレルアルフォシオセット","Dex+100",[[2,1211]],5,100,0],
		[127,"ワンダラートレンティーニセット","Dex+100",[[2,1214]],5,100,0],
		[128,"修羅チェンセット","Str+100",[[2,1218]],1,100,0],
		[129,"シャドウチェイサーガーティセット","Agi+100",[[2,1221]],2,100,0],
		[130,"ジェネティックエミュールセット","Luk+100",[[2,1224]],6,100,0],
		[131,"アヴェンジャージャマダハル","クリダメ+20%",[[1,2762]],70,20,0],
		[132,"百火","詠唱時間-70%、ｽｷﾙﾃﾞｨﾚｲ-70%、物理魔法ダメ+70%",[[2,1244]],73,-70,74,70,262,70,269,70,0],
		[133,"真理の解放","完全回避+100、対ボス魔法ダメ+100%",[[2,1245]],11,100,96,100,0],
		[134,"灼熱の剣","一般ﾓﾝｽﾀｰのDef100%無視",[[1,3180]],291,100,0],
		[135,"奈落の剣","一般ﾓﾝｽﾀｰのDef100%無視",[[1,3181]],291,100,0],
		[136,"浄化の剣","一般ﾓﾝｽﾀｰのDef100%無視",[[1,3182]],291,100,0],
		[137,"襲撃者のローブ","魔法ﾀﾞﾒｰｼﾞ精錬値%UP",[[1,3193]],0],
		[138,"CUTIEカード","ASPD+100%",[[2,1282]],12,100,0],
		[139,"ｺﾞｯｽﾞｿｰﾄﾞ&怨霊武士c","完全回避+100",[[1,3209]],11,100,0],
		[140,"キャンサー","DEF100%無視",[[2,1286]],290,100,0],
		[141,"ｻﾊﾞｲﾊﾞﾙ(ｼｭｰｽﾞ&DEXﾛｯﾄﾞ)ｾｯﾄ","ﾁｪｰﾝﾗｲﾄﾆﾝｸﾞ +100%",[[1,3241]],5530,100,0],
		[142,"ｻﾊﾞｲﾊﾞﾙ(ｼｭｰｽﾞ&INTﾛｯﾄﾞ)ｾｯﾄ","ﾁｪｰﾝﾗｲﾄﾆﾝｸﾞ +100%",[[1,3242]],5530,100,0],
		[143,"覇王","STR +200",[[2,1297]],1,200,0],
		[144,"女王フェイスワームカード","AGI +100",[[2,1305]],2,100,0],
		[145,"ジターバグカード","職業限定のトゥルーサイトLv1",[[2,1311]],0],
		[146,"剛腕","ATK +100",[[2,1322]],17,100,0],
		[147,"抱きつきシャムネコ","全ての基本ステータス +30",[[1,3362]],7,30,0],
		[148,"古びた守護の冠","近接物理ダメージ 100%反射",[[1,2618]],71,100,0],
		[149,"ペオース　アルティメットセット","スキルディレイ -70%",[[1,2539]],74,70,0],
		[150,"セリーヌのブローチ　悪霊の糸の手袋セット","リコグナイズドスペルLv1",[[1,3073]],0],
		[151,"不死の軍団認識票　ひまわり少年セット","火属性魔法攻撃+50%",[[1,3422]],343,50,0],
		[152,"豪傑","完全回避+100、対ボス物理ダメ+100%",[[2,1348]],11,100,26,100,0],
		[153,"イリュージョン連撃の爪","Atk + 120",[[1,3507]],17,120,0],
		[154,"特殊環境活動用ブーツ　ダークロードカードセット","火属性魔法攻撃ＵＰ",[[1,3522]],0],
		[155,"古びた派遣隊の指輪　ボーンサークレット指輪セット","STR +200",[[1,3584]],1,200,0],
		[156,"負傷兵の眼帯　セイレンMVPカードセット","ATK +1000",[[1,3601]],17,1000,0],
		[157,"絶望の神モロクカード","[インスピレーション]Lv1",[[2,1423]],0],
		[158,"火雷大神","[アドレナリンラッシュ]Lv2",[[2,1427]],0],
		[159,"火雷大神","Dex+100",[[2,1427]],5,100,0],
		[160,"グレータードラクルホーン","ラウドボイス",[[1,3273]],0],
		[161,"淤加美神の羽衣-ｸﾄﾙﾗﾅｯｸｽcSET","水属性耐性+100%",[[1,3689]],61,100,0],
		[162,"死の欲動","Flee+150、スキルディレイ-100%",[[2,1450]],9,150,74,100,0],
		[163,"ﾃﾞﾓﾆｯｼｭｿｰﾄﾞ&怨霊武士c","完全回避+100",[[1,3801]],11,100,0],
		[164,"ブースターランス-OS","必中+50",[[1,3826]],86,50,0],
		[165,"X-FatalFlash","AGI+50",[[2,1473]],2,50,0],
		[166,"X-FiringShot","DEX+50",[[2,1474]],5,50,0],
		[167,"X-LuckyStrike","LUK+50",[[2,1475]],6,50,0],
		[168,"X-OverPower","STR+50",[[2,1476]],1,50,0],
		[169,"X-SpellBuster","INT+50",[[2,1477]],4,50,0],
		[170,"X-UnlimitVital","VIT+50",[[2,1478]],3,50,0],
		[171,"オウルバロンのマント","攻撃速度上昇",[[1,3876]],0],
		[172,"マジカルクロース","特定魔法ダメージUP",[[1,3906]],5051,100,5054,100,5056,100,5132,100,0],
		[173,"Extreme","DEX+100",[[2,1551]],5,100,0],
		[174,"ソロモンのペンダント","火・水・風・聖・無属性魔法ダメージ+30%",[[1,3963]],343,30,341,30,344,30,346,30,340,30,0],
		[175,"T-PowerBoost","Atk+100",[[2,1613]],17,100,0],
		[176,"T-MagicBoost","Matk+100",[[2,1614]],100,100,0],
		[177,"T-Assault","クリティカルダメージ + 40%",[[2,1615]],70,40,0],
		[178,"ぴかぴかニャンニャンクラウン","消費SP - 100%",[[1,4037]],102,100,0],
		[179,"ちゃぷちゃぷニャンプーハット","完全回避 + 100",[[1,4046]],11,100,0],
		[180,"熊の力","Str + 200、1秒毎にHP - 500",[[2,1300]],1,200,0],
		[181,"光速","攻撃速度 + 100%、完全回避 + 100、1秒毎にHP - 400 , SP - 40",[[2,1301]],12,100,11,100,0],
		[182,"鋼鎧","物理攻撃で与えるダメージ - 50%、Matk - 50%、Def + 1000",[[2,1302]],80,-50,89,-50,18,1000,0],
		[183,"暴走した魔力","Int + 200、1秒毎にSP - 200",[[2,888]],4,200,0],
		[184,"大鷲の眼光","Dex + 200、1秒毎にSP - 50",[[2,1303]],5,200,0],
		[185,"幸運な日","Luk + 200、一定確率で[宝箱]をドロップ",[[2,1304]],6,200,0],
		[186,"覚醒淤加美神の羽衣-ｸﾄﾙﾗﾅｯｸｽcSET","水属性耐性+100%",[[1,4066]],61,100,0],
		[187,"淤加美神の羽衣-封印ｸﾄﾙﾗﾅｯｸｽcSET","水属性耐性+100%",[[1,4068]],61,100,0],
		[188,"覚醒淤加美神の羽衣-封印ｸﾄﾙﾗﾅｯｸｽcSET","水属性耐性+100%",[[1,4067]],61,100,0],
		[189,"メタルデスアダー","完全回避+100",[[1,4086]],11,100,0],
		[190,"潜在解放(ギロチンクロス)","完全回避+100",[[2,1691]],11,100,0],
		[191,"ポルックスブック","Atk+150",[[1,4130]],17,150,0],
		[192,"覚醒特殊環境活動用ブーツ　封印されたダークロードカードセット","火属性魔法攻撃ＵＰ",[[1,4147]],0],
		[193,"特殊環境活動用ブーツ　封印されたダークロードカードセット","火属性魔法攻撃ＵＰ",[[1,4149]],0],
		[194,"グラルション","アンリミット状態",[[1,4160]],0],
		[195,"グラルション","Agi + 100",[[1,4160]],2,100,0],
		[196,"インウィディアバンドル","完全回避+100",[[1,4167]],11,100,0],
		[197,"S-FatalFlash","AGI+50",[[2,1774]],2,50,0],
		[198,"S-FiringShot","DEX+50",[[2,1775]],5,50,0],
		[199,"S-LuckyStrike","LUK+50",[[2,1776]],6,50,0],
		[200,"S-OverPower","STR+50",[[2,1777]],1,50,0],
		[201,"S-SpellBuster","INT+50",[[2,1778]],4,50,0],
		[202,"S-UnlimitVital","VIT+50",[[2,1779]],3,50,0],
		[203,"クリスタルブレイドネックレス","物理攻撃時、全属性モンスターダメージ+15%",[[1,4240]],262,15,0],
		[204,"インペリアルアニマルローブ","物理攻撃時、全属性モンスターダメージ+20%",[[1,4268]],262,20,0],
		[205,"グレースアニマルローブ","物理攻撃時、全属性モンスターダメージ+50%",[[1,4269]],262,50,0],
		[206,"ロイヤルウィップ","完全回避 + 100",[[1,4311]],11,100,0],
		[207,"ロイヤルチェロ","完全回避 + 100",[[1,4312]],11,100,0],
		[208,"辰戌の腕輪","完全回避 + 100",[[1,4315]],11,100,0],
		[209,"山岳ヘルメット","純粋VIT+1毎に[パワースイング]ダメ+1%",[[1,4316]],0],
		[210,"グレースメナススーツ","必中+50%、物理全属性モンスター+15%",[[1,4330]],86,50,262,15,0],
		[211,"パラケルススグローブ＆覇王セット","必中+100%",[[1,4385]],86,100,0],
		[212,"メロン武器","消費SP-100%",[[1,4404],[1,4405],[1,4406],[1,4407],[1,4408],[1,4409],[1,4410],[1,4411],[1,4412],[1,4413],[1,4414],[1,4415],[1,4416],[1,4417],[1,4418],[1,4419],[1,4420],[1,4421],[1,4422],[1,4423],[1,4424],[1,4425],[1,4426]],102,100,0],
		[213,"粛清の靴","ジュデックスのダメージ + BaseLv%",[[1,4449]],10000000005476,1,0],
		[214,"封印されたアトロスカード","ASPD+30%",[[2,1941]],12,30,0],
		[215,"豊穣の女神＆アトロスカード","ASPD+100%",[[2,2029]],12,100,0],
		[216,"豊穣の女神＆封印されたアトロスカード","ASPD+30%",[[2,2036]],12,30,0],
		[217,"トラベラーリング＆豪傑セット","アンリミット状態",[[1,4515]],0],
		[218,"ダークトライアド","アンリミット状態",[[1,4516]],0],
		[219,"イリュージョン茨の杖","闇属性魔法攻撃ダメージ + 50%",[[1,4555]],347,50,0],
		[220,"イリュージョンスタッフオブティアー","聖属性魔法攻撃ダメージ + 50%",[[1,4556]],346,50,0],
		[221,"イリュージョンエンシェントダガー","テレキネシスインテンスLv3状態",[[1,4557]],0],
		[222,"イリュージョンエンシェントダガー","念属性魔法攻撃ダメージ + 50%",[[1,4557]],348,50,0],
		[223,"潜在覚醒(クレイジーウィード)","[クレイジーウィード]の消費SP-59",[[2,2147]],23732,59,0],
		[224,"潜在覚醒(アローストーム)","[アローストーム]の消費SP-47",[[2,2148]],23498,47,0],
		[225,"潜在覚醒(ジュデックス)","[ジュデックス]の消費SP-46",[[2,2149]],23476,46,0],
		[226,"潜在覚醒(満月脚)","[満月脚]の消費SP-79",[[2,2151]],23955,79,0],
		[227,"潜在覚醒(大トロ)","[大トロ]の消費SP-59",[[2,2152]],23912,59,0],
		[228,"潜在覚醒(サベージの魂)","[サベージの魂]の消費SP-59",[[2,2154]],23938,59,0],
		[229,"潜在覚醒(獅子吼)","[獅子吼]の消費SP-119",[[2,2155]],23622,119,0],
		[230,"潜在覚醒(アームズキャノン)","[アームズキャノン]の消費SP-59",[[2,2157]],23554,59,0],
		[231,"潜在覚醒(ジャックフロスト)","[ジャックフロスト]の消費SP-119",[[2,2158]],23520,119,0],
		[232,"潜在覚醒(イグニッションブレイク)","[イグニッションブレイク]の消費SP-54",[[2,2159]],23445,54,0],
		[233,"黒翼の使徒","攻撃速度+100%、固定詠唱-100%",[[2,2220]],12,100,0],
		[234,"異境の統轄者＋タートルジェネラルc","火属性物理攻撃力 + 20%",[[2,2313]],0],
		[235,"異境の統轄者＋封印タートルジェネラルc","火属性物理攻撃力 + 10%",[[2,2354]],0],
		[236,"ルードカード(ノビ系限定)","インデュアLv1",[[2,218]],0],
		[237,"潜在覚醒(バニシングバスター)","[バニシングバスター]の消費SP-74",[[2,2390]],23831,74,0],
		[238,"ディテクトスタッフ","地属性魔法攻撃ダメージ + 50%",[[1,4628]],342,50,0],
		[239,"祈る者","火属性物理攻撃力 + 10%",[[2,2433]],0],
		[240,"共感する者","水属性物理攻撃力 + 10%",[[2,2434]],0],
		[241,"幸福を与える者","地属性物理攻撃力 + 10%",[[2,2435]],0],
		[242,"微笑む者","風属性物理攻撃力 + 10%",[[2,2436]],0],
		[243,"シンフルルビーネックレス","必中攻撃 + 100%",[[1,4677]],86,100,0],
		[244,"天地崩壊（神力）","ステータスUP",[[2,2417]],100000000000217,1,100000000000015,1,100000000000009,10,100000000000017,10,100000000000100,10,0],
		[245,"プラガリオン","風属性物理攻撃力 + 20%",[[2,2486]],0],
		[246,"ミステリーウィング","完全回避 + 95",[[1,4693]],11,95,0],
		[247,"ボルケリンカード","地属性物理攻撃力 + 20%",[[2,2539]],0],
		[248,"シゲリンカード","Flee + 50",[[2,2543]],9,50,0],
		[249,"デミフレイヤカード","[インスピレーション]Lv1",[[2,2550]],0],
		[250,"ラーヴァトードカード","毒属性物理攻撃力 + 10%",[[2,2553]],0],
		[251,"不治の魔剣","無属性魔法ダメ + 50%",[[1,4823]],340,50,0],
		[252,"運命の槍","聖属性魔法ダメ + 50%",[[1,4825]],346,50,0],
		[253,"精霊のバイオリン","無属性魔法ダメ + 50%",[[1,4829]],340,50,0],
		[254,"蛇腹剣","無属性魔法ダメ + 50%",[[1,4831]],340,50,0],
		[255,"変異キメラフルゴル","聖属性物理攻撃力 + 10%",[[2,2619]],0],
		[256,"悠遠なる天上の都（神力）","ステータスUP",[[2,2643]],100000000000217,1,100000000000015,1,100000000000009,10,100000000000017,10,100000000000100,10,0],
		[257,"ウルの加護","アンリミット状態",[[2,2646]],0],
		[258,"無念無想","Cri+100、クリダメ+100%",[[2,2682]],10,100,70,100,0],
		[259,"洞窟不凍花","水属性物理攻撃力 + 20%",[[2,2690]],0],
		[260,"下級ルガン","闇属性物理攻撃力 + 10%",[[2,2708]],0],
		[261,"潜在解放(ウィンドホークIII)＋豪傑","アンリミット状態",[[2,2731]],0],
		[262,"潜在解放(インクイジターII)＋豪傑","消費SP軽減(炎火滅魔神弾,爆火神弾,聖油洗礼)",[[2,2740]],24124,299,24123,169,24113,199,0],
	];

	ITEM_SP_TIME_OBJ_SORT = [0,80,79,73,74,75,121,84,1,2,105,107,131,106,69,3,71,4,5,6,234,235,7,44,239,219,221,222,220,153,196,204,37,57,8,119,257,9,54,55,252,10,82,60,62,63,171,61,184,161,187,260,186,188,192,64,140,240,122,180,194,195,203,205,210,160,39,11,12,13,14,15,185,16,182,152,181,117,241,146,233,17,139,77,142,141,18,85,209,130,248,58,145,100,162,53,19,83,129,98,254,213,128,116,144,51,46,47,48,49,243,244,133,109,253,35,157,150,262,261,190,230,224,232,227,223,228,229,231,225,237,226,20,21,125,22,23,36,24,174,218,147,208,66,179,238,25,249,163,101,259,26,111,112,113,41,68,114,154,193,217,52,27,65,40,28,29,143,76,211,99,59,178,115,132,43,214,164,151,251,156,245,30,31,89,148,155,86,87,88,50,149,67,255,215,216,183,32,158,159,242,247,191,172,246,33,126,258,123,189,212,256,78,250,42,56,70,108,34,81,236,45,38,118,104,103,90,91,120,206,124,207,102,110,127,173,92,93,95,97,94,96,197,198,199,200,201,202,177,176,175,165,166,167,168,169,170,72];

	ITEM_SP_TIME_OBJ[263] = [263,"魔獣の爪牙","物理・魔法攻撃命中時、一定確率で10秒間、Pow + 100",[[2,2886]],230,100,0];
	ITEM_SP_TIME_OBJ[264] = [264,"不滅の肉体","物理・魔法攻撃命中時、一定確率で10秒間、Sta + 100",[[2,2887]],231,100,0];
	ITEM_SP_TIME_OBJ[265] = [265,"叡知の王冠","物理・魔法攻撃命中時、一定確率で10秒間、Wis + 100",[[2,2888]],232,100,0];
	ITEM_SP_TIME_OBJ[266] = [266,"根源への到達","物理・魔法攻撃命中時、一定確率で10秒間、Spl + 100",[[2,2889]],233,100,0];
	ITEM_SP_TIME_OBJ[267] = [267,"蒼穹の覇者","物理・魔法攻撃命中時、一定確率で10秒間、Con + 100",[[2,2890]],234,100,0];
	ITEM_SP_TIME_OBJ[268] = [268,"天与の才","物理・魔法攻撃命中時、一定確率で10秒間、Crt + 100",[[2,2891]],235,100,0];
	ITEM_SP_TIME_OBJ_SORT.push(263);
	ITEM_SP_TIME_OBJ_SORT.push(264);
	ITEM_SP_TIME_OBJ_SORT.push(265);
	ITEM_SP_TIME_OBJ_SORT.push(266);
	ITEM_SP_TIME_OBJ_SORT.push(267);
	ITEM_SP_TIME_OBJ_SORT.push(268);
	ITEM_SP_TIME_OBJ[269] = [269,"猪突猛進","HPが1000上がる度に アニマル系スキルで与えるダメージ + 1%",[[2,2831],[1,3818],[1,4268],[1,4269],[1,4455]],0];
	ITEM_SP_TIME_OBJ_SORT.push(269);
	ITEM_SP_TIME_OBJ[270] = [270,"","完全回避 + 95",[[2,2885],[2,3371]],11,95,0];
	ITEM_SP_TIME_OBJ_SORT.push(270);
	ITEM_SP_TIME_OBJ[271] = [271,"鳴り響く小太刀","闇属性魔法攻撃ダメージ + 50%",[[1,5176]],347,50,0];
	ITEM_SP_TIME_OBJ_SORT.push(271);
	ITEM_SP_TIME_OBJ[272] = [272,"潜在覚醒(クロスリッパースラッシャーI)","ローリングカッターのダメージ + 150%",[[2,2828]],5474,150,0];
	ITEM_SP_TIME_OBJ_SORT.push(272);
	ITEM_SP_TIME_OBJ[273] = [273,"潜在解放(天帝IV)","[天命落星]で与えるダメージ + 100%",[[2,3071]],6182,100,0];
	ITEM_SP_TIME_OBJ_SORT.push(273);
	ITEM_SP_TIME_OBJ[274] = [274,"星界の暴君（神力）","ステータスUP",[[2,3105]],100000000000217,1,100000000000015,1,100000000000009,10,100000000000017,10,100000000000100,10,0];
	ITEM_SP_TIME_OBJ_SORT.push(274);
	ITEM_SP_TIME_OBJ[275] = [275,"トライアングルディザスター","アンリミット状態",[[1,4654]],0];
	ITEM_SP_TIME_OBJ_SORT.push(275);
	ITEM_SP_TIME_OBJ[276] = [276,"フラッシュディテクトスタッフ","地属性魔法攻撃で与えるダメージ + 50%",[[1,5264]],342,50,0];
	ITEM_SP_TIME_OBJ_SORT.push(276);
	ITEM_SP_TIME_OBJ[277] = [277,"","アンリミット状態",[[2,2881],[2,3357],[2,3365]],0];
	ITEM_SP_TIME_OBJ_SORT.push(277);
	ITEM_SP_TIME_OBJ[278] = [278,"潜在解放(ジェネティックII)+豪傑","[カートトルネード]使用時3秒間、必中攻撃 + 100%",[[2,2879]],86,100,0];
	ITEM_SP_TIME_OBJ_SORT.push(278);
	ITEM_SP_TIME_OBJ[279] = [279,"潜在解放(アビスチェイサーIV)+豪傑","消費SP軽減(チェーンリアクションショット,フレンジショット)",[[2,2918]],24102,169,24109,109,0];
	ITEM_SP_TIME_OBJ_SORT.push(279);
	ITEM_SP_TIME_OBJ[280] = [280,"潜在解放(マイスターIII)+豪傑","消費SP軽減(アックスストンプ,ラッシュクエイク,マイティスマッシュ)",[[2,2937]],24072,299,24073,439,24242,249,0];
	ITEM_SP_TIME_OBJ_SORT.push(280);
	ITEM_SP_TIME_OBJ[281] = [281,"潜在解放(ハイパーノービスIII)+真理の解放","消費SP軽減(ユピテルサンダーストーム,ヘルズドライブ,ナパームバルカンストライク)",[[2,2933]],24231,79,24232,69,24233,109,0];
	ITEM_SP_TIME_OBJ_SORT.push(281);
	ITEM_SP_TIME_OBJ[282] = [282,"雪ウサギウミウシ","念属性物理攻撃力 + 10%",[[2,3218]],288,10,0];
	ITEM_SP_TIME_OBJ_SORT.push(282);
	ITEM_SP_TIME_OBJ[283] = [283,"潜在解放(インクイジターV)","烙印コンボ第二撃・第三撃のダメージ+100%",[[2,3247]],6121,100,6117,100,6122,100,6119,100,6120,100,6118,100,0];
	ITEM_SP_TIME_OBJ_SORT.push(283);
	ITEM_SP_TIME_OBJ[284] = [284,"潜在解放(インクイジターVI)","烙印コンボの消費SP軽減",[[2,3249]],24115,139,24121,169,24122,169,24120,169,24117,199,24119,199,24118,199,0];
	ITEM_SP_TIME_OBJ_SORT.push(284);
	ITEM_SP_TIME_OBJ[285] = [285,"潜在解放(ドラゴンナイトVII)","消費SP軽減(ハックアンドスラッシャー,ストームスラッシュ)",[[2,3281]],24008,189,24012,109,0];
	ITEM_SP_TIME_OBJ_SORT.push(285);
	ITEM_SP_TIME_OBJ[286] = [286,"潜在解放(トルバドゥール&トルヴェールIV)","メタリックフューリーのダメージ+100%",[[2,3283]],6133,100,0];
	ITEM_SP_TIME_OBJ_SORT.push(286);
	ITEM_SP_TIME_OBJ[287] = [287,"潜在解放(トルバドゥール&トルヴェールV)","消費SP軽減(メタリックフューリー)",[[2,3285]],24133,129,0];
	ITEM_SP_TIME_OBJ_SORT.push(287);
	ITEM_SP_TIME_OBJ[288] = [288,"潜在解放(ナイトウォッチVI)","消費SP軽減(ビジラントアットナイト,マガジンフォーワン)",[[2,3289]],24219,179,24218,99,0];
	ITEM_SP_TIME_OBJ_SORT.push(288);
	ITEM_SP_TIME_OBJ[289] = [289,"潜在解放(バイオロVII)","消費SP軽減(メイヘミックソーンズ)",[[2,3293]],24240,299,0];
	ITEM_SP_TIME_OBJ_SORT.push(289);
	ITEM_SP_TIME_OBJ[290] = [290,"潜在解放(ハイパーノービスIX)","消費SP軽減(シールドチェーンラッシュ,スパイラルピアースマックス)",[[2,3297]],24267,99,24268,59,0];
	ITEM_SP_TIME_OBJ_SORT.push(290);
	ITEM_SP_TIME_OBJ[291] = [291,"潜在解放(マイスターVIII)","消費SP軽減(スパークブラスター,トリプルレーザー)",[[2,3301]],24237,249,24238,139,0];
	ITEM_SP_TIME_OBJ_SORT.push(291);
	ITEM_SP_TIME_OBJ[292] = [292,"潜在解放(蜃気楼&不知火VI)","消費SP軽減(四次術系列スキル)",[[2,3305]],24253,279,24255,279,24254,249,24256,199,24257,229,24258,409,0];
	ITEM_SP_TIME_OBJ_SORT.push(292);
	ITEM_SP_TIME_OBJ[293] = [293,"潜在解放(天帝VI)","消費SP軽減(四次太陽・月系列スキル,天羅万象)",[[2,3309]],24175,149,24178,269,24176,229,24177,229,24179,229,24180,229,24184,229,0];
	ITEM_SP_TIME_OBJ_SORT.push(293);
	ITEM_SP_TIME_OBJ[294] = [294,"魔剣士サクライ","[インスピレーション]Lv1",[[2,3310]],0];
	ITEM_SP_TIME_OBJ_SORT.push(294);
	ITEM_SP_TIME_OBJ[295] = [295,"潜在解放(シャドウクロスVIII)","[カウンタースラッシュ]状態",[[2,3267]],0];
	ITEM_SP_TIME_OBJ_SORT.push(295);
	ITEM_SP_TIME_OBJ[296] = [296,"フシャスラワルヤ（神力）","ステータスUP",[[1,5366]],100000000000217,1,100000000000015,1,100000000000009,10,100000000000017,10,100000000000100,10,0];
	ITEM_SP_TIME_OBJ_SORT.push(296);


})();
