

// モンスター状態異常設定の限界値
// この数を超える場合は、セーブデータの拡張が必要
MOB_CONF_DEBUF_LIMIT = 80;





// 初期化作業
n_B_IJYOU = new Array();

MobConfDebufOBJ = new Array();

InitMobConfDebufData();





//================================================================
// モンスター状態異常データ定義用ダミー関数
// （可読性を高める目的で使用する）
//================================================================
function MobConfDebufText(value) { return value; };
function MobConfDebufControlType(value) { return value; };
function MobConfDebufDefaultValue(value) { return value; };
function MobConfDebufMinValue(value) { return value; };
function MobConfDebufMaxValue(value) { return value; };





//********************************************************************************************************************************
//********************************************************************************************************************************
//****
//**** モンスター状態異常データ定義
//****
//********************************************************************************************************************************
//********************************************************************************************************************************

/**
 * モンスター状態異常データを初期化（セットアップ）する.
 */
function InitMobConfDebufData() {

	var idx = 0;

	var MobConfDebufId = 0;
	var MobConfDebufData = new Array();
	var MobConfDebufOBJSorted = new Array();

	var indexdefiner = 0;



	//----------------------------------------------------------------
	// データインデックス定義
	//----------------------------------------------------------------
	MOB_CONF_DEBUF_DATA_INDEX_ID = indexdefiner++;
	MOB_CONF_DEBUF_DATA_INDEX_TEXT = indexdefiner++;
	MOB_CONF_DEBUF_DATA_INDEX_CONTROL_TYPE = indexdefiner++;
	MOB_CONF_DEBUF_DATA_INDEX_DEFAULT_VALUE = indexdefiner++;
	MOB_CONF_DEBUF_DATA_INDEX_MIN_VALUE = indexdefiner++;
	MOB_CONF_DEBUF_DATA_INDEX_MAX_VALUE = indexdefiner++;



	//----------------------------------------------------------------
	// データ定義　ここから
	//----------------------------------------------------------------
	MOB_CONF_DEBUF_ID_PROVOKE = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("プロボック(不死不可)"),
		MobConfDebufControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(10)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_QUAGMIRE = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("クァグマイア"),
		MobConfDebufControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(5)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_DOKU = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("毒"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_KURAYAMI = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("暗闇"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_TOUKETSU = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("凍結(不死不可)"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_BLESSING = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("ブレッシング(不死/悪魔)"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_LEX_AETERNA = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("レックスエーテルナ"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_STUN = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("スタン"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_SUIMIN = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("睡眠"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_SEKIKA = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("石化"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_NOROI = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("呪い"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_SOKUDO_GENSHO = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("速度減少"),
		MobConfDebufControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(10)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_SIGNUM_CRUCIS = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("シグナムクルシス"),
		MobConfDebufControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(10)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_STRIP_WEAPON = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("ストリップウェポン"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_STRIP_SHIELD = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("ストリップシールド"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_STRIP_ARMOR = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("ストリップアーマー"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_STRIP_HELM = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("ストリップヘルム"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_SPIDER_WEB = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("スパイダーウェブ"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_MIND_BREAKER = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("マインドブレイカー"),
		MobConfDebufControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(5)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_WATASHIWO_WASURENAIDE = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("私を忘れないで…(未)"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_EIENNNO_KONTON = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("永遠の混沌"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_ESKA = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("エスカ"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_ESKU = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("エスク"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_ELEMENTAL_CHANGE = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("エレメンタルチェンジ"),
		MobConfDebufControlType(CONTROL_TYPE_SELECTBOX_SPECIAL),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(4)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_FLYING = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("フライング"),
		MobConfDebufControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(5)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_VENOM_IMPRESS = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("ベナムインプレス"),
		MobConfDebufControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(5)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_ENERVATION = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("エナベーション"),
		MobConfDebufControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(3)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_GROOMY = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("(仮)グルーミー"),
		MobConfDebufControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(3)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_RAGENESS = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("レイジーネス"),
		MobConfDebufControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(3)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_WEEKNESS = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("ウィークネス"),
		MobConfDebufControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(3)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_UNLUCKY = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("アンラッキー"),
		MobConfDebufControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(3)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_ORATIO = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("オラティオ"),
		MobConfDebufControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(10)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_HAKKA = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("発火"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_SURPRISE_ATTACK_EFFECT = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("サプライズアタック後の+20%"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_HYOKETSU = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("氷結(DEF-10%)"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_REITO = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("冷凍"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_DARK_CRAW_EFFECT = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("ダーククロー後の状態"),
		MobConfDebufControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(5)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_ANALYSE = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("アナライズ"),
		MobConfDebufControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(3)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_WATER_BARRIER = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("ウォーターバリア"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_MAHI = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("麻痺"),
		MobConfDebufControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(5)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_RAKUIN_ZYOTAI = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("烙印状態"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_STRIP_ACCESSARY = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("ストリップアクセサリー"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_INUHAKKA_SHOWER = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("(×)イヌハッカシャワー"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_NYAN_GRASS = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("ニャングラス"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_TARONO_KIZU = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("タロウの傷"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_KAITO = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("カイト（ダメージ増加）"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_SHIRYO_HYOI = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("死霊憑依"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_ADORAMUS_DEBUFF = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("アドラムス(AGI-)"),
		MobConfDebufControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(10)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_MARSH_OF_ABYSS = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("マーシュオブアビス"),
		MobConfDebufControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(10)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;



	MOB_CONF_DEBUF_ID_EARTH_DRIVE_DEBUFF = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("アースドライブ(ASPD-/DEF-)"),
		MobConfDebufControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(10)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;


	MOB_CONF_DEBUF_ID_QUAKE_DEBUFF = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("クエイク状態"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;

	MOB_CONF_DEBUF_ID_SEIYU_SENREI_DEBUFF = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("(廃止)聖油洗礼状態"),
		MobConfDebufControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(5)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;

	MOB_CONF_DEBUF_ID_SOUND_BLEND = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("サウンドブレンド状態"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;

	MOB_CONF_DEBUF_ID_JACK_FROST_NOVA = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("ジャックフロストノヴァ状態"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;

	MOB_CONF_DEBUF_ID_CLIMAX_QUAKE = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("クライマックスクエイク状態"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;

	MOB_CONF_DEBUF_ID_CLIMAX_BLOOM = MobConfDebufId;
	MobConfDebufData = [
		MobConfDebufId,
		MobConfDebufText("クライマックスブルーム状態"),
		MobConfDebufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfDebufDefaultValue(0),
		MobConfDebufMinValue(0),
		MobConfDebufMaxValue(1)
	];
	MobConfDebufOBJ[MobConfDebufId] = MobConfDebufData;
	MobConfDebufId++;

	//----------------------------------------------------------------
	// データ定義数チェック
	//----------------------------------------------------------------
	if (MOB_CONF_DEBUF_LIMIT < MobConfDebufOBJ.length) {
		alert("モンスター状態異常　定義数超過");
	}

	//----------------------------------------------------------------
	// 状態異常設定変数配列を初期化
	//----------------------------------------------------------------
	for (idx = 0; idx < MOB_CONF_DEBUF_LIMIT; idx++) {
		if (idx < MobConfDebufOBJ.length) {
			n_B_IJYOU[idx] = MobConfDebufOBJ[idx][MOB_CONF_DEBUF_DATA_INDEX_DEFAULT_VALUE];
		}
		else {
			n_B_IJYOU[idx] = 0;
		}
	}

	//----------------------------------------------------------------
	// 表示順序に従い、状態異常データ定義を再配列
	//----------------------------------------------------------------
	MobConfDebufOBJSorted = new Array();

	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_PROVOKE];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_QUAGMIRE];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_DOKU];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_KURAYAMI];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_TOUKETSU];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_BLESSING];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_LEX_AETERNA];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_STUN];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_SUIMIN];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_SEKIKA];		// 10

	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_NOROI];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_SOKUDO_GENSHO];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_SIGNUM_CRUCIS];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_STRIP_WEAPON];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_STRIP_SHIELD];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_STRIP_ARMOR];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_STRIP_HELM];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_STRIP_ACCESSARY];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_SPIDER_WEB];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_MIND_BREAKER];	// 20

	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_WATASHIWO_WASURENAIDE];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_EIENNNO_KONTON];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_ESKA];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_ESKU];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_ELEMENTAL_CHANGE];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_FLYING];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_VENOM_IMPRESS];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_ENERVATION];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_GROOMY];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_ORATIO];		// 30

	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_HAKKA];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_SURPRISE_ATTACK_EFFECT];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_HYOKETSU];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_REITO];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_DARK_CRAW_EFFECT];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_ANALYSE];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_WATER_BARRIER];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_MAHI];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_RAKUIN_ZYOTAI];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_INUHAKKA_SHOWER];	// 40

	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_NYAN_GRASS];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_TARONO_KIZU];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_KAITO];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_SHIRYO_HYOI];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_ADORAMUS_DEBUFF];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_MARSH_OF_ABYSS];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_EARTH_DRIVE_DEBUFF];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_QUAKE_DEBUFF];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_SEIYU_SENREI_DEBUFF];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_SOUND_BLEND];	// 50

	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_JACK_FROST_NOVA];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_CLIMAX_QUAKE];
	MobConfDebufOBJSorted[MobConfDebufOBJSorted.length] = MobConfDebufOBJ[MOB_CONF_DEBUF_ID_CLIMAX_BLOOM];

	// 最大 80 個まで

	MobConfDebufOBJ = MobConfDebufOBJSorted;

}

/**
 * モンスター状態異常設定テーブルを構築する.
 * @param objRoot テーブルの親オブジェクト
 * @param bAsExpand 展開表示フラグ（true : 展開表示、false : ヘッダのみ）
 */
function BuildUpMobConfDebufSelectArea(objRoot, bAsExpand) {

	var idx = 0;
	var confId = 0;
	var confText = "";
	var textArray = null;

	var controlType = 0;
	var controlValue = 0;
	var controlValueMin = 0;
	var controlValueMax = 0;

	var objTable = null;
	var objTbody = null;
	var objTr = null;
	var objTd = null;
	var objText = null;
	var objInput = null;
	var objSelect = null;
	var objOption = null;
	var objLabel = null;

	// 引数のルートオブジェクト配下を一度全削除
	HtmlRemoveAllChild(objRoot);

	// 設定欄のテーブルを生成
	objTable = document.createElement("table");
	objTable.setAttribute("border", 1);
	objRoot.appendChild(objTable);

	objTbody = document.createElement("tbody");
	objTable.appendChild(objTbody);

	// 設定欄テーブルのヘッダ部分を生成
	objTr = document.createElement("tr");
	objTbody.appendChild(objTr);

	objTd = document.createElement("td");
	objTd.setAttribute("id", "OBJID_TD_MOB_CONF_DEBUF_HEADER");
	objTd.setAttribute("colspan", 2);
	objTd.setAttribute("bgcolor", COLOR_CODE_TABLE_HEADER_IS_NOT_SET);
	objTr.appendChild(objTd);

	objInput = document.createElement("input");
	objInput.setAttribute("id", "OBJID_INPUT_MOB_CONF_DEBUF_SWITCH");
	objInput.setAttribute("type", "checkbox");
	objInput.setAttribute("onClick", "OnClickMobConfDebufSwitch()");
	if (bAsExpand) {
		objInput.setAttribute("checked", "checked");
	}
	objTd.appendChild(objInput);

	objLabel = HtmlCreateElement("label", objTd);
	objLabel.setAttribute("for", "OBJID_INPUT_MOB_CONF_DEBUF_SWITCH");
	HtmlCreateTextNode("モンスター状態異常設定", objLabel);

	// 展開表示でなければ、ヘッダだけ更新して終了
	if (!bAsExpand) {
		// ヘッダ更新
		RefreshMobConfDebufSelectAreaHeader();

		return;
	}

	// モンスター状態異常設定定義をループして、設定欄を構築する
	for (idx = 0; idx < MobConfDebufOBJ.length; idx++) {

		// モンスター状態異常設定ＩＤを取得
		confId = MobConfDebufOBJ[idx][MOB_CONF_DEBUF_DATA_INDEX_ID];

		// 設定欄用のテーブル行を生成
		objTr = document.createElement("tr");
		objTbody.appendChild(objTr);

		// 表示名の欄を生成
		objTd = document.createElement("td");
		objTr.appendChild(objTd);

		confText = MobConfDebufOBJ[idx][MOB_CONF_DEBUF_DATA_INDEX_TEXT];
		objText = document.createTextNode(confText);
		objTd.appendChild(objText);

		// 設定値の欄を生成
		objTd = document.createElement("td");
		objTr.appendChild(objTd);

		controlType = MobConfDebufOBJ[idx][MOB_CONF_DEBUF_DATA_INDEX_CONTROL_TYPE];

		// 設定方法が数値選択方式の場合
		switch (controlType) {
		case CONTROL_TYPE_SELECTBOX_NUMBER:

			// 選択セレクトボックスを生成
			objSelect = document.createElement("select");
			objSelect.setAttribute("id", "OBJID_SELECT_MOB_CONF_DEBUF_" + confId);
			objSelect.setAttribute("onChange", "OnChangeMobConfDebuf(true)");
			objTd.appendChild(objSelect);

			// 範囲定義に従い、セレクトオプションを生成
			controlValueMin = MobConfDebufOBJ[idx][MOB_CONF_DEBUF_DATA_INDEX_MIN_VALUE];
			controlValueMax = MobConfDebufOBJ[idx][MOB_CONF_DEBUF_DATA_INDEX_MAX_VALUE];
			for (controlValue = controlValueMin; controlValue <= controlValueMax; controlValue++) {
				objOption = HtmlCreateElementOption(controlValue, controlValue, objSelect);
			}

			// 初期値設定
			objSelect.setAttribute("value", MobConfDebufOBJ[idx][MOB_CONF_DEBUF_DATA_INDEX_DEFAULT_VALUE]);

			break;

		// 設定方法がチェック方式の場合
		case CONTROL_TYPE_CHECKBOX:

			// チェックボックスを生成
			objInput = document.createElement("input");
			objInput.setAttribute("id", "OBJID_INPUT_MOB_CONF_DEBUF_" + confId);
			objInput.setAttribute("type", "checkbox");
			objInput.setAttribute("onChange", "OnChangeMobConfDebuf(true)");
			objTd.appendChild(objInput);

			// 初期値設定
			if (MobConfDebufOBJ[idx][MOB_CONF_DEBUF_DATA_INDEX_DEFAULT_VALUE] == 1) {
				objInput.setAttribute("checked", "checked");
			}

			break;

		// 設定方法が数値入力方式の場合
		case CONTROL_TYPE_TEXTBOX_NUMBER:

			// 予備(未使用)入力テキストボックスを生成
			objInput = document.createElement("input");
			objInput.setAttribute("type", "text");
			objInput.setAttribute("id", "OBJID_INPUT_MOB_CONF_DEBUF_" + confId);
			objInput.setAttribute("size", "6");
			objInput.setAttribute("onChange", "OnChangeMobConfDebuf(true)");
			objTd.appendChild(objInput);

			// 初期値設定
			objInput.setAttribute("value", MobConfDebufOBJ[idx][MOB_CONF_DEBUF_DATA_INDEX_DEFAULT_VALUE]);

			break;

		// 設定方法が特殊方式の場合
		case CONTROL_TYPE_SELECTBOX_SPECIAL:
		case CONTROL_TYPE_CHECKBOX_SPECIAL:
		case CONTROL_TYPE_TEXTBOX_SPECIAL:
		case CONTROL_TYPE_SPECIAL:

			// 個別に実装する
			switch (confId) {

			// エレメンタルチェンジ
			case MOB_CONF_DEBUF_ID_ELEMENTAL_CHANGE:

				textArray = ["なし", "水", "地", "火", "風"];

				// 選択セレクトボックスを生成
				objSelect = document.createElement("select");
				objSelect.setAttribute("id", "OBJID_SELECT_MOB_CONF_DEBUF_" + confId);
				objSelect.setAttribute("onChange", "OnChangeMobConfDebuf(true)");
				objTd.appendChild(objSelect);

				for (var loopIdx = 0; loopIdx < textArray.length; loopIdx++) {
					objOption = HtmlCreateElementOption(loopIdx, textArray[loopIdx], null);
					objSelect.appendChild(objOption);
				}

				// 初期値設定
				objSelect.setAttribute("value", MobConfDebufOBJ[idx][MOB_CONF_DEBUF_DATA_INDEX_DEFAULT_VALUE]);

				break;

			}
		}

	}

	// 変数の値をもとに、設定欄の各コントロールを同期
	SyncronizeMobConfDebufSettingsVarToCtrl();

	// ヘッダ更新
	RefreshMobConfDebufSelectAreaHeader();
}

/**
 * モンスター状態異常設定欄の状態を同期させる（変数の値をコントロール部品へ反映）.
 */
function SyncronizeMobConfDebufSettingsVarToCtrl() {

	var idx = 0;
	var confId = 0;

	var controlType = 0;

	var objSelect = null;
	var objInput = null;

	// モンスター状態異常設定定義をループして、設定欄の状態を同期
	for (idx = 0; idx < MobConfDebufOBJ.length; idx++) {

		confId = MobConfDebufOBJ[idx][MOB_CONF_DEBUF_DATA_INDEX_ID];
		controlType = MobConfDebufOBJ[idx][MOB_CONF_DEBUF_DATA_INDEX_CONTROL_TYPE];

		switch (controlType) {

		// 設定方法が数値選択方式の場合
		case CONTROL_TYPE_SELECTBOX_NUMBER:
		case CONTROL_TYPE_SELECTBOX_SPECIAL:

			objSelect = document.getElementById("OBJID_SELECT_MOB_CONF_DEBUF_" + confId);
			objSelect.value = n_B_IJYOU[confId];

			break;

		// 設定方法がチェック方式の場合
		case CONTROL_TYPE_CHECKBOX:
		case CONTROL_TYPE_CHECKBOX_SPECIAL:

			objInput = document.getElementById("OBJID_INPUT_MOB_CONF_DEBUF_" + confId);

			if (n_B_IJYOU[confId]) {
				objInput.setAttribute("checked", "checked");
			}
			else {
				objInput.removeAttribute("checked");
			}

			break;

		// 設定方法が数値入力方式の場合
		case CONTROL_TYPE_TEXTBOX_NUMBER:
		case CONTROL_TYPE_TEXTBOX_SPECIAL:

			objInput = document.getElementById("OBJID_INPUT_MOB_CONF_DEBUF_" + confId);
			objInput.value = n_B_IJYOU[confId];

			break;

		// 設定方法が特殊方式の場合
		case CONTROL_TYPE_SPECIAL:

			// 個別に実装する
			switch (confId) {

			}
		}
	}
}

/**
 * モンスター状態異常設定欄の状態を同期させる（コントロール部品の状態を変数へ反映）.
 */
function SyncronizeMobConfDebufSettingsCtrlToVar() {

	var idx = 0;
	var confId = 0;

	var controlType = 0;
	var controlValue = 0;
	var controlValueMin = 0;
	var controlValueMax = 0;

	var objSelect = null;
	var objInput = null;

	// モンスター状態異常設定定義をループして、設定欄の状態をもとに変数を同期
	for (idx = 0; idx < MobConfDebufOBJ.length; idx++) {

		confId = MobConfDebufOBJ[idx][MOB_CONF_DEBUF_DATA_INDEX_ID];
		controlType = MobConfDebufOBJ[idx][MOB_CONF_DEBUF_DATA_INDEX_CONTROL_TYPE];

		switch (controlType) {

		// 設定方法が数値選択方式の場合
		case CONTROL_TYPE_SELECTBOX_NUMBER:
		case CONTROL_TYPE_SELECTBOX_SPECIAL:

			objSelect = document.getElementById("OBJID_SELECT_MOB_CONF_DEBUF_" + confId);
			n_B_IJYOU[confId] = parseInt(objSelect.value);

			break;

		// 設定方法がチェック方式の場合
		case CONTROL_TYPE_CHECKBOX:
		case CONTROL_TYPE_CHECKBOX_SPECIAL:

			n_B_IJYOU[confId] = HtmlGetObjectCheckedById("OBJID_INPUT_MOB_CONF_DEBUF_" + confId, false);

			break;

		// 設定方法が数値入力方式の場合
		case CONTROL_TYPE_TEXTBOX_NUMBER:
		case CONTROL_TYPE_TEXTBOX_SPECIAL:

			objInput = document.getElementById("OBJID_INPUT_MOB_CONF_DEBUF_" + confId);
			n_B_IJYOU[confId] = parseInt(objInput.value);

			// 範囲外補正
			controlValueMin = MobConfDebufOBJ[idx][MOB_CONF_DEBUF_DATA_INDEX_MIN_VALUE];
			controlValueMax = MobConfDebufOBJ[idx][MOB_CONF_DEBUF_DATA_INDEX_MAX_VALUE];
			n_B_IJYOU[confId] = ValueRangeModify(n_B_IJYOU[confId], controlValueMin, controlValueMax);
			objInput.value = n_B_IJYOU[confId];

			break;

		// 設定方法が特殊方式の場合
		case CONTROL_TYPE_SPECIAL:

			// 個別に実装する
			switch (confId) {

			}
		}
	}
}

/**
 * モンスター状態異常設定欄の展開スイッチクリックイベントハンドラ.
 */
function OnClickMobConfDebufSwitch() {

	var bExpand = false;
	var objInput = null;

	// 展開スイッチの状態を取得
	bExpand = HtmlGetObjectCheckedById("OBJID_INPUT_MOB_CONF_DEBUF_SWITCH", false);

	// 構築関数呼び出し
	BuildUpMobConfDebufSelectArea(document.getElementById("OBJID_TD_MOB_CONF_DEBUF"), bExpand);

	// コントロールのCSSを更新する
	if (bExpand) {
		RefreshMobConfDebufControlCSS();
	}
}

/**
 * モンスター状態異常設定欄の設定値変更イベントハンドラ.
 * @param bCalc 再計算フラグ（true : 再計算する、false : 再計算しない）
 */
function OnChangeMobConfDebuf(bCalc) {

	// 設定の変更を変数に同期させる
	SyncronizeMobConfDebufSettingsCtrlToVar();

	// ヘッダの表示を更新する
	RefreshMobConfDebufSelectAreaHeader();

	// コントロールのCSSを更新する
	RefreshMobConfDebufControlCSS();

	// 再計算フラグが立っている場合は、再計算を実行
	if (bCalc) {
		AutoCalc("OnChangeMobConfDebuf");
	}
}

/**
 * モンスター状態異常設定テーブルのヘッダをリフレッシュする.
 */
function RefreshMobConfDebufSelectAreaHeader() {

	var bSet = false;
	var bChecked = false;

	var idx = 0;
	var confId = 0;

	var objSelect = null;
	var objTd = null;

	// モンスター状態異常設定定義をループして、設定欄の状態を検査
	for (idx = 0; idx < MobConfDebufOBJ.length; idx++) {

		confId = MobConfDebufOBJ[idx][MOB_CONF_DEBUF_DATA_INDEX_ID];

		if (n_B_IJYOU[confId] != MobConfDebufOBJ[idx][MOB_CONF_DEBUF_DATA_INDEX_DEFAULT_VALUE]) {
			bSet = true;
			break;
		}
	}

	// 設定状況に応じて、ヘッダ部分の表示を更新
	objTd = document.getElementById("OBJID_TD_MOB_CONF_DEBUF_HEADER");
	if (bSet) {
		objTd.setAttribute("bgcolor", COLOR_CODE_TABLE_HEADER_IS_SET);
	}
	else {
		objTd.setAttribute("bgcolor", COLOR_CODE_TABLE_HEADER_IS_NOT_SET);
	}
}

/**
 * モンスター状態異常設定欄の選択状態により、コントロールのCSSを変更する.
 */
function RefreshMobConfDebufControlCSS() {

	var idx = 0;
	var confId = 0;

	var controlType = 0;

	var objSelect = null;
	var objInput = null;

	// モンスター状態異常設定定義をループして、設定欄の状態をもとに変数を同期
	for (idx = 0; idx < MobConfDebufOBJ.length; idx++) {

		confId = MobConfDebufOBJ[idx][MOB_CONF_DEBUF_DATA_INDEX_ID];
		controlType = MobConfDebufOBJ[idx][MOB_CONF_DEBUF_DATA_INDEX_CONTROL_TYPE];

		switch (controlType) {

		// 設定方法が数値選択方式の場合
		case CONTROL_TYPE_SELECTBOX_NUMBER:
		case CONTROL_TYPE_SELECTBOX_SPECIAL:

			objSelect = document.getElementById("OBJID_SELECT_MOB_CONF_DEBUF_" + confId);
			if (!objSelect) {
				continue;
			}

			if (objSelect.value != MobConfDebufOBJ[idx][MOB_CONF_DEBUF_DATA_INDEX_DEFAULT_VALUE]) {
				objSelect.setAttribute("class", "CSSCLS_SELECTED_MOB_CONF_DEBUF");
			}
			else {
				objSelect.setAttribute("class", "");
			}

			break;

		// 設定方法がチェック方式の場合
		case CONTROL_TYPE_CHECKBOX:
		case CONTROL_TYPE_CHECKBOX_SPECIAL:

			objInput = document.getElementById("OBJID_INPUT_MOB_CONF_DEBUF_" + confId);
			if (!objInput) {
				continue;
			}

			if ((objInput.checked) && (MobConfDebufOBJ[idx][MOB_CONF_DEBUF_DATA_INDEX_DEFAULT_VALUE] != 1)) {
				objInput.setAttribute("class", "CSSCLS_CHECKED_MOB_CONF_DEBUF");
			}
			if ((!objInput.checked) && (MobConfDebufOBJ[idx][MOB_CONF_DEBUF_DATA_INDEX_DEFAULT_VALUE] != 0)) {
				objInput.setAttribute("class", "CSSCLS_CHECKED_MOB_CONF_DEBUF");
			}
			else {
				objInput.setAttribute("class", "");
			}

			break;

		// 設定方法が数値入力方式の場合
		case CONTROL_TYPE_TEXTBOX_NUMBER:
		case CONTROL_TYPE_TEXTBOX_SPECIAL:

			objInput = document.getElementById("OBJID_INPUT_MOB_CONF_DEBUF_" + confId);
			if (!objInput) {
				continue;
			}

			if (objInput.value != MobConfDebufOBJ[idx][MOB_CONF_DEBUF_DATA_INDEX_DEFAULT_VALUE]) {
				objInput.setAttribute("class", "CSSCLS_INPUTTED_MOB_CONF_DEBUF");
			}
			else {
				objInput.setAttribute("class", "");
			}

			break;

		// 設定方法が特殊方式の場合
		case CONTROL_TYPE_SPECIAL:

			// 個別に実装する
			switch (confId) {

			}
		}
	}
}
