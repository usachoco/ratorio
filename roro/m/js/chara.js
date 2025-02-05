



// キャラクターデータインデックス
CGlobalConstManager.DefineEnum(
	"EnumCharaDataIndex",
	[
		"CHARA_DATA_INDEX_STATUS_ATK",
		"CHARA_DATA_INDEX_STATUS_ATK_GX",
		"CHARA_DATA_INDEX_WEAPON_ATK",
		"CHARA_DATA_INDEX_REFINE_ATK",
		"CHARA_DATA_INDEX_LEFT_ATK",
		"CHARA_DATA_INDEX_MAXHP",
		"CHARA_DATA_INDEX_MAXSP",
		"CHARA_DATA_INDEX_DEF_DIV",
		"CHARA_DATA_INDEX_DEF_MINUS",
		"CHARA_DATA_INDEX_MDEF_DIV",
		"CHARA_DATA_INDEX_MDEF_MINUS",
		"CHARA_DATA_INDEX_HIT",
		"CHARA_DATA_INDEX_FLEE",
		"CHARA_DATA_INDEX_LUCKY",
		"CHARA_DATA_INDEX_CRI",
		"CHARA_DATA_INDEX_STATUS_MATK",
		"CHARA_DATA_INDEX_WEAPON_MATK",
		"CHARA_DATA_INDEX_ASPD",
		"CHARA_DATA_INDEX_HPR",
		"CHARA_DATA_INDEX_SPR",
		"CHARA_DATA_INDEX_SPR_STOP",
		"CHARA_DATA_INDEX_CAST_PARAM",
		"CHARA_DATA_INDEX_MDEF_DIV_IGNORE_BUFF",
		"CHARA_DATA_INDEX_DISP_MAXHP",
		"CHARA_DATA_INDEX_DISP_MAXSP",
		"CHARA_DATA_INDEX_DISP_ATK_LEFT",
		"CHARA_DATA_INDEX_DISP_ATK_RIGHT",
		"CHARA_DATA_INDEX_DISP_MATK_LEFT",
		"CHARA_DATA_INDEX_DISP_MATK_RIGHT",
		"CHARA_DATA_INDEX_DISP_DEF_LEFT",
		"CHARA_DATA_INDEX_DISP_DEF_RIGHT",
		"CHARA_DATA_INDEX_DISP_MDEF_LEFT",
		"CHARA_DATA_INDEX_DISP_MDEF_RIGHT",
		"CHARA_DATA_INDEX_DISP_HIT",
		"CHARA_DATA_INDEX_DISP_FLEE",
		"CHARA_DATA_INDEX_DISP_CRI",
		"CHARA_DATA_INDEX_DISP_LUCKY",
		"CHARA_DATA_INDEX_DISP_ASPD",
		"CHARA_DATA_INDEX_DISP_HPR",
		"CHARA_DATA_INDEX_DISP_SPR",
		"CHARA_DATA_INDEX_COMBO_PARAM",
		"CHARA_DATA_INDEX_FIXED_TIME",
		"CHARA_DATA_INDEX_SKILL_CAST_TIME_SCALING_VARY",
		"CHARA_DATA_INDEX_SKILL_CAST_TIME_FIX_VARY",
		"CHARA_DATA_INDEX_SKILL_CAST_TIME_SCALING_FIXED",
		"CHARA_DATA_INDEX_SKILL_CAST_TIME_FIX_FIXED",
		"CHARA_DATA_INDEX_SKILL_CAST_TIME_SCALING_FORCE",
		"CHARA_DATA_INDEX_SKILL_CAST_TIME_FIX_FORCE",
		"CHARA_DATA_INDEX_SKILL_COOL_TIME_FIX",
		"CHARA_DATA_INDEX_SKILL_COST_SCALING",
		"CHARA_DATA_INDEX_SKILL_COST_FIX",
	],
	0,
	1
);


/*
idx = 0;
CHARA_DATA_INDEX_STATUS_ATK		= idx++;
CHARA_DATA_INDEX_STATUS_ATK_GX	= idx++;
CHARA_DATA_INDEX_WEAPON_ATK		= idx++;
CHARA_DATA_INDEX_REFINE_ATK		= idx++;
CHARA_DATA_INDEX_LEFT_ATK		= idx++;
CHARA_DATA_INDEX_MAXHP			= idx++;
CHARA_DATA_INDEX_MAXSP			= idx++;
CHARA_DATA_INDEX_DEF_DIV		= idx++;
CHARA_DATA_INDEX_DEF_MINUS		= idx++;
CHARA_DATA_INDEX_MDEF_DIV		= idx++;
CHARA_DATA_INDEX_MDEF_MINUS		= idx++;
CHARA_DATA_INDEX_HIT			= idx++;
CHARA_DATA_INDEX_FLEE			= idx++;
CHARA_DATA_INDEX_LUCKY			= idx++;
CHARA_DATA_INDEX_CRI			= idx++;
CHARA_DATA_INDEX_STATUS_MATK	= idx++;
CHARA_DATA_INDEX_WEAPON_MATK	= idx++;
CHARA_DATA_INDEX_ASPD			= idx++;
CHARA_DATA_INDEX_HPR			= idx++;
CHARA_DATA_INDEX_SPR			= idx++;
CHARA_DATA_INDEX_SPR_STOP		= idx++;
CHARA_DATA_INDEX_CAST_PARAM		= idx++;
CHARA_DATA_INDEX_MDEF_DIV_IGNORE_BUFF	= idx++;	// 支援スキルを適用していない値
CHARA_DATA_INDEX_DISP_MAXHP			= idx++;
CHARA_DATA_INDEX_DISP_MAXSP			= idx++;
CHARA_DATA_INDEX_DISP_ATK_LEFT		= idx++;
CHARA_DATA_INDEX_DISP_ATK_RIGHT		= idx++;
CHARA_DATA_INDEX_DISP_MATK_LEFT		= idx++;
CHARA_DATA_INDEX_DISP_MATK_RIGHT	= idx++;
CHARA_DATA_INDEX_DISP_DEF_LEFT		= idx++;
CHARA_DATA_INDEX_DISP_DEF_RIGHT		= idx++;
CHARA_DATA_INDEX_DISP_MDEF_LEFT		= idx++;
CHARA_DATA_INDEX_DISP_MDEF_RIGHT	= idx++;
CHARA_DATA_INDEX_DISP_HIT			= idx++;
CHARA_DATA_INDEX_DISP_FLEE			= idx++;
CHARA_DATA_INDEX_DISP_CRI			= idx++;
CHARA_DATA_INDEX_DISP_LUCKY			= idx++;
CHARA_DATA_INDEX_DISP_ASPD			= idx++;
CHARA_DATA_INDEX_DISP_HPR			= idx++;
CHARA_DATA_INDEX_DISP_SPR			= idx++;
CHARA_DATA_INDEX_COMBO_PARAM		= idx++;
*/
















/**
 * 指定のアイテムの装備数を取得する.
 * @param itemId アイテムＩＤ
 * @param rgnId  装備箇所ＩＤ（未指定時はすべて）
 * @returns 装備数
 */
function EquipNumSearch(itemId, rgnId) {
//function EquipNumSearch(itemId, rgnId == EQUIP_REGION_ID_ANY) {

	// 仮引数に未対応のブラウザ対策
	if (rgnId == undefined) {
		rgnId = EQUIP_REGION_ID_ANY;
	}

	var itemNum = 0;

	// 全ての装着部位を走査して、指定のアイテムＩＤの数を数える
	if (rgnId == EQUIP_REGION_ID_ANY) {
		for (var idx = 0; idx < n_A_Equip.length; idx++) {
			if (itemId == n_A_Equip[idx]) {
				itemNum += 1;
			}
		}
	}

	// または、指定の装備部位を走査する
	else {
		if (itemId == n_A_Equip[rgnId]) {
			itemNum += 1;
		}
	}

	return itemNum;
}

// TODO: データ移行過渡処理
function EquipNumSearchMIG(itemId, rgnId) {
	var eqpnum = EquipNumSearch(itemId, rgnId);

	// 既存機能の処理速度への影響を考慮して、この判定順序
	// 移行後は、この関数自体が不要になる想定
	if (eqpnum > 0) {
		if (IsMigrationedItemId(itemId)) {
			return 0;
		}
	}

	return eqpnum;
}



/**
 * 指定のカードの装備数を取得する.
 * @param cardId カードＩＤ
 * @param rgnId  装備箇所ＩＤ（未指定時はすべて）
 * @returns 装備数
 */
function CardNumSearch(cardId, rgnId) {
//function CardNumSearch(cardId, rgnId = CARD_REGION_ID_ANY) {

	// 仮引数に未対応のブラウザ対策
	if (rgnId == undefined) {
		rgnId = CARD_REGION_ID_ANY;
	}

	var cardNum = 0;

	// 全ての装着部位を走査して、指定のカードＩＤの数を数える
	if (rgnId == CARD_REGION_ID_ANY) {
		for (var idx = 0; idx < n_A_card.length; idx++) {
			if(cardId == n_A_card[idx]) {
				cardNum += 1;
			}
		}
	}

	// または、指定の装備部位を走査する
	else if (rgnId < 0) {
		switch (rgnId) {
		case CARD_REGION_ID_ARMS_RIGHT_ANY:
			if (cardId == n_A_card[CARD_REGION_ID_ARMS_RIGHT_1]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ARMS_RIGHT_2]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ARMS_RIGHT_3]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ARMS_RIGHT_4]) cardNum += 1;
			break;

		case CARD_REGION_ID_ARMS_LEFT_ANY:
			if (cardId == n_A_card[CARD_REGION_ID_ARMS_LEFT_1]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ARMS_LEFT_2]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ARMS_LEFT_3]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ARMS_LEFT_4]) cardNum += 1;
			break;

		case CARD_REGION_ID_HEAD_TOP_ANY:
			if (cardId == n_A_card[CARD_REGION_ID_HEAD_TOP]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_HEAD_TOP_1]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_HEAD_TOP_2]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_HEAD_TOP_3]) cardNum += 1;
			break;

		case CARD_REGION_ID_HEAD_MID_ANY:
			if (cardId == n_A_card[CARD_REGION_ID_HEAD_MID]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_HEAD_MID_1]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_HEAD_MID_2]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_HEAD_MID_3]) cardNum += 1;
			break;

		case CARD_REGION_ID_HEAD_UNDER_ANY:
			if (cardId == n_A_card[CARD_REGION_ID_HEAD_UNDER]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_HEAD_UNDER_1]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_HEAD_UNDER_2]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_HEAD_UNDER_3]) cardNum += 1;
			break;

		case CARD_REGION_ID_SHIELD_ANY:
			if (cardId == n_A_card[CARD_REGION_ID_SHIELD]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_SHIELD_1]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_SHIELD_2]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_SHIELD_3]) cardNum += 1;
			break;

		case CARD_REGION_ID_BODY_ANY:
			if (cardId == n_A_card[CARD_REGION_ID_BODY]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_BODY_1]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_BODY_2]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_BODY_3]) cardNum += 1;
			break;

		case CARD_REGION_ID_SHOULDER_ANY:
			if (cardId == n_A_card[CARD_REGION_ID_SHOULDER]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_SHOULDER_1]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_SHOULDER_2]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_SHOULDER_3]) cardNum += 1;
			break;

		case CARD_REGION_ID_SHOES_ANY:
			if (cardId == n_A_card[CARD_REGION_ID_SHOES]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_SHOES_1]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_SHOES_2]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_SHOES_3]) cardNum += 1;
			break;

		case CARD_REGION_ID_ACCESSARY_ANY:
			if (cardId == n_A_card[CARD_REGION_ID_ACCESSARY_1]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_ACCESSARY_1_1]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_ACCESSARY_1_2]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_ACCESSARY_1_3]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ACCESSARY_2]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_ACCESSARY_2_1]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_ACCESSARY_2_2]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_ACCESSARY_2_3]) cardNum += 1;
			break;

		case CARD_REGION_ID_ACCESSARY_1_ANY:
			if (cardId == n_A_card[CARD_REGION_ID_ACCESSARY_1]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_ACCESSARY_1_1]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_ACCESSARY_1_2]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_ACCESSARY_1_3]) cardNum += 1;
			break;

		case CARD_REGION_ID_ACCESSARY_2_ANY:
			if (cardId == n_A_card[CARD_REGION_ID_ACCESSARY_2]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_ACCESSARY_2_1]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_ACCESSARY_2_2]) cardNum += 1;
			if (cardId == n_A_card[CARD_REGION_ID_ENCHANT_ACCESSARY_2_3]) cardNum += 1;
			break;
		}
	}

	// または、指定の装備部位（１箇所）を走査する
	else {
		if (cardId == n_A_card[rgnId]) {
			cardNum += 1;
		}
	}

	return cardNum;
}





/**
 * 指定の衣装の装備数を取得する.
 * @param costumeId アイテムＩＤ
 * @param rgnId  装備箇所ＩＤ（未指定時はすべて）
 * @returns 装備数
 */
function CostumeNumSearch(costumeId, rgnId) {
//function CostumeNumSearch(costumeId, rgnId == COSTUME_REGION_ID_ANY) {

	// 仮引数に未対応のブラウザ対策
	if (rgnId == undefined) {
		rgnId = COSTUME_REGION_ID_ANY;
	}

	var costumeNum = 0;

	// 全ての装着部位を走査して、指定のアイテムＩＤの数を数える
	if (rgnId == COSTUME_REGION_ID_ANY) {
		for (var idx = 0; idx < n_A_costume.length; idx++) {
			if (costumeId == n_A_costume[idx]) {
				costumeNum += 1;
			}
		}
	}

	// または、指定の装備部位を走査する
	else {
		if (costumeId == n_A_costume[rgnId]) {
			costumeNum += 1;
		}
	}

	return costumeNum;
}








EXBUF_ID_ENDURE							 =  1990001;
EXBUF_ID_ASUMUPTIO						 =  2050000;
EXBUF_ID_IDUNNNO_RINGO					 =  3030001;
EXBUF_ID_IDUNNNO_RINGO_BUFFER_VITRANK	 =  3030002;
EXBUF_ID_IDUNNNO_RINGO_BUFFER_SKILLLV	 =  3030003;
EXBUF_ID_HUMMING						 =  3040001;
EXBUF_ID_HUMMING_BUFFER_DEXRANK			 =  3040002;
EXBUF_ID_HUMMING_BUFFER_SKILLLV			 =  3040003;
EXBUF_ID_SERVICE_FOR_YOU				 =  3060001;
EXBUF_ID_SERVICE_FOR_YOU_BUFFER_INTRANK	 =  3060002;
EXBUF_ID_SERVICE_FOR_YOU_BUFFER_SKILLLV	 =  3060003;
EXBUF_ID_IKUSADAIKONO_HIBIKI			 =  3090001;
EXBUF_ID_FUSHANIMUKATTE_TOTSUGEKI		 =  3190101;
EXBUF_ID_FUSHANIMUKATTE_TOTSUGEKI_BUFFER_JOBLV		 =  3190102;
EXBUF_ID_FUSHANIMUKATTE_TOTSUGEKI_BUFFER_SKILLLV	 =  3190103;
EXBUF_ID_ECHONO_UTA						 =  3190201;
EXBUF_ID_ECHONO_UTA_BUFFER_JOBLV		 =  3190202;
EXBUF_ID_ECHONO_UTA_BUFFER_SKILLLV		 =  3190203;
EXBUF_ID_KOIBITOTACHINOTAMENO_SYMPHONY	 =  3190501;
EXBUF_ID_KOIBITOTACHINOTAMENO_SYMPHONY_BUFFER_JOBLV			 =  3190502;
EXBUF_ID_KOIBITOTACHINOTAMENO_SYMPHONY_BUFFER_SKILLLV		 =  3190503;
EXBUF_ID_FRIGGNO_UTA					 =  3190700;
EXBUF_ID_FRYDAY_NIGHT_FEVER				 =  3390100;
EXBUF_ID_RELAZUNO_TSUYU					 =  3390301;
EXBUF_ID_RELAZUNO_TSUYU_COUNT_OF_MINWAN	 =  3390302;
EXBUF_ID_BEYOND_OF_WARCRAY				 =  3390401;
EXBUF_ID_BEYOND_OF_WARCRAY_COUNT_OF_MINWAN			 =  3390401;
EXBUF_ID_DANCE_WITH_WUG					 =  3390601;
EXBUF_ID_DANCE_WITH_WUG_COUNT_OF_MINWAN	 =  3390602;
EXBUF_ID_GOSPEL_HP_UP					 =  4060000;
EXBUF_ID_GOSPEL_SP_UP					 =  4070000;
EXBUF_ID_GOSPEL_HIT_FLEE_PLUS			 =  4090000;
EXBUF_ID_DELUGE							 =  6000100;
EXBUF_ID_ZYUTSUSHIKI_TENKAI				 =  6100000;
EXBUF_ID_FIGHTING_SPIRIT				 =  6110000;
EXBUF_ID_ODINNO_CHIKARA					 =  6120000;
EXBUF_ID_ODINNO_EPICLESIS				 =  6130000;
EXBUF_ID_HOM_S_PAINKILLER				 =  6210001;
EXBUF_ID_HOM_S_PAINKILLER_HOM_LEVEL		 =  6210002;
EXBUF_ID_CHATTERING						 =  6470001;
EXBUF_ID_CHAGASHI						 =  7000000;
EXBUF_ID_NIZIIRONO_OKASHI				 =  7020000;
EXBUF_ID_URAMINO_HAKO					 =  7090000;
EXBUF_ID_VITATA500						 =  7240000;
EXBUF_ID_BUCHE_DE_NOEL					 =  7250000;
EXBUF_ID_RUNEMIDGARTSSAN_OYATSU			 =  7260000;
EXBUF_ID_SCHWARZWALDSAN_OYATSU			 =  7270000;
EXBUF_ID_GUARANA_CANDY					 =  7350000;
EXBUF_ID_YAKITOMOROKOSHI				 =  7360000;
EXBUF_ID_HPZOKA_POTION					 =  7380000;
EXBUF_ID_SPZOKA_POTION					 =  7390000;
EXBUF_ID_SENTOYAKU						 =  7410000;
EXBUF_ID_EVENT_BUF_ATK_PLUS				 =  7420000;
EXBUF_ID_EVENT_BUF_HIT_PLUS				 =  7440000;
EXBUF_ID_ORLEANS_FULLCOURSE				 =  7490000;
EXBUF_ID_OTP_LOGIN_BONUS				 =  8220400;
EXBUF_ID_CUSTOM_HIT_PLUS				 =  9100000;
EXBUF_ID_CUSTOM_ATK_PLUS				 =  9170000;
EXBUF_ID_CUSTOM_HP_PLUS					 = 10010000;
EXBUF_ID_CUSTOM_HP_UP					 = 10030000;
EXBUF_ID_CUSTOM_SP_PLUS					 = 10040000;
EXBUF_ID_CUSTOM_SP_UP					 = 10060000;
EXBUF_ID_CUSTOM_DEF_PLUS				 = 10070000;
EXBUF_ID_CUSTOM_MDEF_PLUS				 = 10080000;
/**
 * 指定の外支援Ｂｕｆｆの効果値（レベル、補正値等）を取得する.
 * （自身の習得しているスキルは含まない）
 * @param exBufId 外支援ＢｕｆｆＩＤ
 * @returns 効果値（レベル、補正値等）
 */

function ExBuffNumSearch(exBufId) {

	var val = 0;
	var confval = 0;

	var exBufNum = 0;


	switch (exBufId) {

	// 支援アスムプティオ
	case EXBUF_ID_ENDURE:
		exBufNum = g_confDataIchizi[CCharaConfIchizi.CONF_ID_ENDURE];
		break;

	}


	switch (exBufId) {

	// 支援アスムプティオ
	case EXBUF_ID_ASUMUPTIO:
		exBufNum = g_confDataNizi[CCharaConfNizi.CONF_ID_ASSUMPTIO];
		break;

	}



	switch (exBufId) {

	// 支援イドゥンの林檎
	case EXBUF_ID_IDUNNNO_RINGO:
		exBufNum = n_A_PassSkill3[3];
		break;

	// 支援イドゥンの林檎　支援者ＶＩＴランク
	case EXBUF_ID_IDUNNNO_RINGO_BUFFER_VITRANK:
		if (n_A_PassSkill3[3]) exBufNum = n_A_PassSkill3[23];
		break;

	// 支援イドゥンの林檎　支援者補助スキルレベル
	case EXBUF_ID_IDUNNNO_RINGO_BUFFER_SKILLLV:
		if (n_A_PassSkill3[3]) exBufNum = n_A_PassSkill3[33];
		break;

	// 支援ハミング
	case EXBUF_ID_HUMMING:
		exBufNum = n_A_PassSkill3[4];
		break;

	// 支援ハミング　支援者ＤＥＸランク
	case EXBUF_ID_HUMMING_BUFFER_DEXRANK:
		if (n_A_PassSkill3[3]) exBufNum = n_A_PassSkill3[24];
		break;

	// 支援ハミング　支援者補助スキルレベル
	case EXBUF_ID_HUMMING_BUFFER_SKILLLV:
		if (n_A_PassSkill3[3]) exBufNum = n_A_PassSkill3[34];
		break;

	// 支援サービスフォーユー
	case EXBUF_ID_SERVICE_FOR_YOU:
		exBufNum = n_A_PassSkill3[6];
		break;

	// 支援サービスフォーユー　支援者ＩＮＴランク
	case EXBUF_ID_SERVICE_FOR_YOU_BUFFER_INTRANK:
		if (n_A_PassSkill3[6]) exBufNum = n_A_PassSkill3[26];
		break;

	// 支援サービスフォーユー　支援者補助スキルレベル
	case EXBUF_ID_SERVICE_FOR_YOU_BUFFER_SKILLLV:
		if (n_A_PassSkill3[6]) exBufNum = n_A_PassSkill3[36];
		break;

	// 支援戦太鼓の響き
	case EXBUF_ID_IKUSADAIKONO_HIBIKI:
		exBufNum = n_A_PassSkill3[9];
		break;

	// 支援風車に向かって突撃
	case EXBUF_ID_FUSHANIMUKATTE_TOTSUGEKI:
		if (n_A_PassSkill3[19] == 1) exBufNum = n_A_PassSkill3[37];
		break;

	// 支援風車に向かって突撃　支援者ジョブレベル
	case EXBUF_ID_FUSHANIMUKATTE_TOTSUGEKI_BUFFER_JOBLV:
		if (n_A_PassSkill3[19] == 1) exBufNum = n_A_PassSkill3[46];
		break;

	// 支援風車に向かって突撃　支援者補助スキルレベル
	case EXBUF_ID_FUSHANIMUKATTE_TOTSUGEKI_BUFFER_SKILLLV:
		if (n_A_PassSkill3[19] == 1) exBufNum = n_A_PassSkill3[38];
		break;

	// 支援エコーの歌
	case EXBUF_ID_ECHONO_UTA:
		if (n_A_PassSkill3[19] == 2) exBufNum = n_A_PassSkill3[37];
		break;

	// 支援エコーの歌　支援者ジョブレベル
	case EXBUF_ID_ECHONO_UTA_BUFFER_JOBLV:
		if (n_A_PassSkill3[19] == 2) exBufNum = n_A_PassSkill3[46];
		break;

	// 支援エコーの歌　支援者補助スキルレベル
	case EXBUF_ID_ECHONO_UTA_BUFFER_SKILLLV:
		if (n_A_PassSkill3[19] == 2) exBufNum = n_A_PassSkill3[38];
		break;

	// 支援恋人たちのためのシンフォニー
	case EXBUF_ID_KOIBITOTACHINOTAMENO_SYMPHONY:
		if (n_A_PassSkill3[19] == 5) exBufNum = n_A_PassSkill3[37];
		break;

	// 支援恋人たちのためのシンフォニー　支援者ジョブレベル
	case EXBUF_ID_KOIBITOTACHINOTAMENO_SYMPHONY_BUFFER_JOBLV:
		if (n_A_PassSkill3[19] == 5) exBufNum = n_A_PassSkill3[46];
		break;

	// 支援恋人たちのためのシンフォニー　支援者補助スキルレベル
	case EXBUF_ID_KOIBITOTACHINOTAMENO_SYMPHONY_BUFFER_SKILLLV:
		if (n_A_PassSkill3[19] == 5) exBufNum = n_A_PassSkill3[38];
		break;

	// 支援フリッグの歌
	case EXBUF_ID_FRIGGNO_UTA:
		exBufNum = g_confDataSanzi[CCharaConfSanzi.CONF_ID_FRIGGNO_UTA];
		break;



	// 支援フライデーナイトフィーバー
	case EXBUF_ID_FRYDAY_NIGHT_FEVER:
		if (n_A_PassSkill3[39] == 1) exBufNum = n_A_PassSkill3[40];
		break;

	// 支援レーラズの露
	case EXBUF_ID_RELAZUNO_TSUYU:
		if (n_A_PassSkill3[39] == 3) exBufNum = n_A_PassSkill3[40];
		break;

	// 支援レーラズの露　ミンストレルワンダラーの数
	case EXBUF_ID_RELAZUNO_TSUYU_COUNT_OF_MINWAN:
		if (n_A_PassSkill3[39] == 3) exBufNum = n_A_PassSkill3[41];
		break;

	// 支援ビヨンドオブウォークライ（敵から）
	case EXBUF_ID_BEYOND_OF_WARCRAY:
		if (n_A_PassSkill3[39] == 4) exBufNum = n_A_PassSkill3[40];
		break;

	// 支援ビヨンドオブウォークライ（敵から）　ミンストレルワンダラーの数
	case EXBUF_ID_BEYOND_OF_WARCRAY_COUNT_OF_MINWAN:
		if (n_A_PassSkill3[39] == 4) exBufNum = n_A_PassSkill3[41];
		break;

	// 支援ダンスウィズウォーグ（レンジャー有）
	case EXBUF_ID_DANCE_WITH_WUG:
		if (n_A_PassSkill3[39] == 6) exBufNum = n_A_PassSkill3[40];
		break;

	// 支援ダンスウィズウォーグ（レンジャー有）　ミンストレルワンダラーの数
	case EXBUF_ID_DANCE_WITH_WUG_COUNT_OF_MINWAN:
		if (n_A_PassSkill3[39] == 6) exBufNum = n_A_PassSkill3[41];
		break;

	}



	switch (exBufId) {

	// 支援ゴスペル　ＨＰアップ
	case EXBUF_ID_GOSPEL_HP_UP:
		if (n_A_PassSkill4[6]) exBufNum += 1;
		break;

	// 支援ゴスペル　ＳＰアップ
	case EXBUF_ID_GOSPEL_SP_UP:
		if (n_A_PassSkill4[7]) exBufNum += 1;
		break;

	// 支援ゴスペル　ＨＩＴ、ＦＬＥＥ＋
	case EXBUF_ID_GOSPEL_HIT_FLEE_PLUS:
		if (n_A_PassSkill4[9]) exBufNum += 1;
		break;


	}



	switch (exBufId) {

	// 支援デリュージ
	case EXBUF_ID_DELUGE:
		val = g_confDataNizi[CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI];
		if (val == CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI_DELUGE) {
			exBufNum = g_confDataNizi[CCharaConfNizi.CONF_ID_ZOKUSEIBA_LEVEL];
		}
		break;

	// 支援術式-展開-
	case EXBUF_ID_ZYUTSUSHIKI_TENKAI:
		exBufNum = g_confDataSanzi[CCharaConfSanzi.CONF_ID_ZYUTSUSHIKI_TENKAI];
		break;

	// 支援ファイティングスピリット
	case EXBUF_ID_FIGHTING_SPIRIT:
		exBufNum = g_confDataSanzi[CCharaConfSanzi.CONF_ID_FIGHTING_SPIRIT];
		break;

	// 支援オーディンの力
	case EXBUF_ID_ODINNO_CHIKARA:
		exBufNum = g_confDataSanzi[CCharaConfSanzi.CONF_ID_ODINNO_CHIKARA];
		break;

	// 支援エピクレシス
	case EXBUF_ID_ODINNO_EPICLESIS:
		exBufNum = g_confDataSanzi[CCharaConfSanzi.CONF_ID_EPICLESIS];
		break;

	// 支援ホムＳペインキラー
	case EXBUF_ID_HOM_S_PAINKILLER:
		exBufNum = g_confDataSanzi[CCharaConfSanzi.CONF_ID_PAIN_KILLER];
		break;

	// 支援ホムＳペインキラー　ホムンクルスのレベル
	case EXBUF_ID_HOM_S_PAINKILLER_HOM_LEVEL:
		if (g_confDataSanzi[CCharaConfSanzi.CONF_ID_PAIN_KILLER] > 0) {
			exBufNum = g_confDataSanzi[CCharaConfSanzi.CONF_ID_PAIN_KILLER_BASE_LEVEL];
		}
		break;

	// 支援チャタリング/ミャウミャウ
	case EXBUF_ID_CHATTERING:
		exBufNum = g_confDataSanzi[CCharaConfSanzi.CONF_ID_CHATTERING];
		break;
	}



	switch (exBufId) {
	// 茶菓子
	case EXBUF_ID_CHAGASHI:
		if (n_A_PassSkill7[0]) exBufNum += 1;
		break;


	// 虹色のお菓子
	case EXBUF_ID_NIZIIRONO_OKASHI:
		if (n_A_PassSkill7[2]) exBufNum += 1;
		break;

	// 恨みの箱
	case EXBUF_ID_URAMINO_HAKO:
		if (n_A_PassSkill7[9]) exBufNum += 1;
		break;

	// ビタタ５００
	case EXBUF_ID_VITATA500:
		if (n_A_PassSkill7[24]) exBufNum += 1;
		break;

	// ビュッシュ・ド・ノエル
	case EXBUF_ID_BUCHE_DE_NOEL:
		if (n_A_PassSkill7[25]) exBufNum += 1;
		break;

	// ルーンミッドガッツ産おやつ
	case EXBUF_ID_RUNEMIDGARTSSAN_OYATSU:
		if (n_A_PassSkill7[26]) exBufNum += 1;
		break;

	// シュバルツバルド産おやつ
	case EXBUF_ID_SCHWARZWALDSAN_OYATSU:
		if (n_A_PassSkill7[27]) exBufNum += 1;
		break;

	// ガラナキャンディ
	case EXBUF_ID_GUARANA_CANDY:
		if (n_A_PassSkill7[35]) exBufNum += 1;
		break;

	// 焼きトウモロコシ
	case EXBUF_ID_YAKITOMOROKOSHI:
		if (n_A_PassSkill7[36]) exBufNum += 1;
		break;

	// ＨＰ増加ポーション
	case EXBUF_ID_HPZOKA_POTION:
		exBufNum = n_A_PassSkill7[38];
		break;

	// ＳＰ増加ポーション
	case EXBUF_ID_SPZOKA_POTION:
		exBufNum = n_A_PassSkill7[39];
		break;

	// オルレアンのフルコース
	case EXBUF_ID_ORLEANS_FULLCOURSE:
		if (n_A_PassSkill7[49]) exBufNum += 1;
		break;

	// 戦闘薬
	case EXBUF_ID_SENTOYAKU:
		exBufNum = n_A_PassSkill7[41];
		break;

	// 期間限定イベント支援　ＡＴＫ
	case EXBUF_ID_EVENT_BUF_ATK_PLUS:
		exBufNum = n_A_PassSkill7[42];
		break;

	// 期間限定イベント支援　ＨＩＴ
	case EXBUF_ID_EVENT_BUF_HIT_PLUS:
		exBufNum = n_A_PassSkill7[44];
		break;

	}



	switch (exBufId) {

	// ＯＴＰログインボーナス支援
	case EXBUF_ID_OTP_LOGIN_BONUS:
		exBufNum = n_A_PassSkill8[22];
		break;

	}



	switch (exBufId) {

	// ＨＩＴ＋
	case EXBUF_ID_CUSTOM_HIT_PLUS:
		confval = g_objCharaConfCustomStatus.GetConf(CCharaConfCustomStatus.CONF_ID_HIT_PLUS);
		if (confval != 0) {
			exBufNum = confval;
		}
		break;

	// ＡＴＫ＋
	case EXBUF_ID_CUSTOM_ATK_PLUS:
		confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_ATK_PLUS);
		if (confval != 0) {
			exBufNum = confval;
		}
		break;

	// ＭａｘＨＰ＋
	case EXBUF_ID_CUSTOM_HP_PLUS:
		confval = g_objCharaConfCustomStatus.GetConf(CCharaConfCustomStatus.CONF_ID_MAXHP_PLUS);
		if (confval != 0) {
			exBufNum = confval;
		}
		break;

	// ＭａｘＨＰ％
	case EXBUF_ID_CUSTOM_HP_UP:
		confval = g_objCharaConfCustomStatus.GetConf(CCharaConfCustomStatus.CONF_ID_MAXHP_UP);
		if (confval != 0) {
			exBufNum = confval;
		}
		break;

	// ＭａｘＳＰ＋
	case EXBUF_ID_CUSTOM_SP_PLUS:
		confval = g_objCharaConfCustomStatus.GetConf(CCharaConfCustomStatus.CONF_ID_MAXSP_PLUS);
		if (confval != 0) {
			exBufNum = confval;
		}
		break;

	// ＭａｘＳＰ％
	case EXBUF_ID_CUSTOM_SP_UP:
		confval = g_objCharaConfCustomStatus.GetConf(CCharaConfCustomStatus.CONF_ID_MAXSP_UP);
		if (confval != 0) {
			exBufNum = confval;
		}
		break;

	// ＤＥＦ＋
	case EXBUF_ID_CUSTOM_DEF_PLUS:
		confval = g_objCharaConfCustomDef.GetConf(CCharaConfCustomDef.CONF_ID_DEF_PLUS);
		if (confval != 0) {
			exBufNum = confval;
		}
		break;

	// ＭＤＥＦ＋
	case EXBUF_ID_CUSTOM_MDEF_PLUS:
		confval = g_objCharaConfCustomDef.GetConf(CCharaConfCustomDef.CONF_ID_MDEF_PLUS);
		if (confval != 0) {
			exBufNum = confval;
		}
		break;

	}



	return exBufNum;
}



/**
 * 指定の時限アイテムの使用数を取得する.
 * @param timeItemId 時限アイテムＩＤ
 * @returns 使用数
 */
function TimeItemNumSearch(timeItemId) {

	var timeItemNum = 0;

	// 全ての設定を走査して、指定の時限アイテムＩＤの数を数える
	for(var idx = 0; idx < g_timeItemConf.length; idx++) {
		if (g_timeItemConfEffective[idx]) {
			if(timeItemId == g_timeItemConf[idx]) {
				timeItemNum += 1;
			}
		}
	}
	return timeItemNum;
}





//================================================================================================
//================================================================================================
//====
//==== プレイヤー防御属性　ここから
//====
//================================================================================================
//================================================================================================
/**
 * 装備等によるステータスの追加補正値を取得する（防御属性）.
 */
function GetStatusModifyBodyElement() {

	var val = ELM_ID_VANITY;
	var itemCount = 0;

	//----------------------------------------------------------------
	// 「四次精霊　ディフェンスモード」の効果
	//----------------------------------------------------------------
	switch (UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL)) {
		case SERE_SUPPORT_SKILL_ID_FLAME_ARMOR:
			return ELM_ID_FIRE;
		case SERE_SUPPORT_SKILL_ID_CRYSTAL_ARMOR:
			return ELM_ID_WATER;
		case SERE_SUPPORT_SKILL_ID_EYES_OF_STORM:
			return ELM_ID_WIND;
		case SERE_SUPPORT_SKILL_ID_STRONG_PROTECTION:
			return ELM_ID_EARTH;
		case SERE_SUPPORT_SKILL_ID_POISON_SHIELD:
			return ELM_ID_POISON;
	}

	//----------------------------------------------------------------
	// スキル「シェイプシフト」の、効果
	//----------------------------------------------------------------
	switch (UsedSkillSearch(SKILL_ID_SHAPE_SHIFT)) {
	case 1:
		return ELM_ID_FIRE;
	case 2:
		return ELM_ID_EARTH;
	case 3:
		return ELM_ID_WIND;
	case 4:
		return ELM_ID_WATER;
	}

	//----------------------------------------------------------------
	// 「聖体降福」の、効果
	//----------------------------------------------------------------
	if (g_confDataNizi[CCharaConfNizi.CONF_ID_SEITAI_KOFUKU]) {
		return ELM_ID_HOLY;
	}

	//----------------------------------------------------------------
	// 「パイエティ」の、効果
	//----------------------------------------------------------------
	if (g_confDataSanzi[CCharaConfSanzi.CONF_ID_PIETY]) {
		return ELM_ID_HOLY;
	}

	//----------------------------------------------------------------
	// 基本処理
	//----------------------------------------------------------------

	// TODO: データ移行過渡処理
	if (IsEnableMigrationBlockTransit()) {
		val = g_charaDataManager.GetCharaData(MIG_CHARA_MANAGER_ID_MAIN).GetEquipDefenseElement();
		if (val === undefined) {
			val = ELM_ID_VANITY;
		}
	}

	else {

		// 装備中の単純カード効果を検索
		val = GetEquippedTotalSPCardAndElse(ITEM_SP_BODY_ELEMENT);
		if (val != ELM_ID_VANITY) {
			return val;
		}

		// カード効果がなければ、装備固有の単純効果を検索
		val = GetEquippedTotalSPEquip(ITEM_SP_BODY_ELEMENT);
		if (val != ELM_ID_VANITY) {
			return val;
		}
	}

	//----------------------------------------------------------------
	// 「エンジェリングスーツ」の、過剰精錬よる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ANGELING_SUITS)) > 0) {
		if (n_A_BODY_DEF_PLUS >= 9) {
			return ELM_ID_HOLY;
		}
	}

	//----------------------------------------------------------------
	// 「ゴーストリングスーツ」の、過剰精錬よる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GHOSTRING_SUITS)) > 0) {
		if (n_A_BODY_DEF_PLUS >= 9) {
			return ELM_ID_PSYCO;
		}
	}

	//----------------------------------------------------------------
	// 「エクセリオンエンチャント」の、属性チップ
	//----------------------------------------------------------------
	if (CardNumSearch(CARD_ID_ENCHANT_E_FIRE)) return ELM_ID_FIRE;
	if (CardNumSearch(CARD_ID_ENCHANT_E_WATER)) return ELM_ID_WATER;
	if (CardNumSearch(CARD_ID_ENCHANT_E_GROUND)) return ELM_ID_EARTH;
	if (CardNumSearch(CARD_ID_ENCHANT_E_WIND)) return ELM_ID_WIND;

	//----------------------------------------------------------------
	// 「古びた楯無の鎧」の、精錬による効果
	//----------------------------------------------------------------
	if (EquipNumSearch(ITEM_SET_ID_FURUBITA_TATENASHINO_YOROI_REFINE)) {
		if (n_A_BODY_DEF_PLUS == 5) return ELM_ID_EARTH;
		if (n_A_BODY_DEF_PLUS == 6) return ELM_ID_WATER;
		if (n_A_BODY_DEF_PLUS == 7) return ELM_ID_WIND;
		if (n_A_BODY_DEF_PLUS == 8) return ELM_ID_FIRE;
		if (n_A_BODY_DEF_PLUS == 9) return ELM_ID_DARK;
		if (n_A_BODY_DEF_PLUS == 10) return ELM_ID_HOLY;
	}

	//----------------------------------------------------------------
	// 「職業カードセット　クルセイダー」の、装備職業による効果
	//----------------------------------------------------------------
	if (CardNumSearch(CARD_SET_ID_JOBSET_CRUSADER)) {
		if (GetHigherJobSeriesID(n_A_JOB) == JOB_ID_CRUSADER) {
			return ELM_ID_HOLY;
		}
	}

	//----------------------------------------------------------------
	// 「キャサリン・ゲオルグカード」の、精錬による効果
	//----------------------------------------------------------------
	if (CardNumSearch(CARD_ID_CATHERINE_GAEBOLG)) {
		if (n_A_BODY_DEF_PLUS >= 7) {
			return ELM_ID_HOLY;
		}
	}

	//----------------------------------------------------------------
	// 「ハルキゲニアカード」の、精錬による効果
	//----------------------------------------------------------------
	if (CardNumSearch(CARD_ID_HALLUCIGENIA)) {
		if (n_A_BODY_DEF_PLUS >= 7) {
			return ELM_ID_POISON;
		}
	}

	//----------------------------------------------------------------
	// 「ベビーハルキゲニアカード」の、精錬による効果
	//----------------------------------------------------------------
	if (CardNumSearch(CARD_ID_BABY_HALLUCIGENIA)) {
		if (n_A_BODY_DEF_PLUS >= 7) {
			return ELM_ID_POISON;
		}
	}

	return val;
}





//================================================================================================
//================================================================================================
//====
//==== ＡＴＫ＋○○　ここから
//====
//================================================================================================
//================================================================================================
/**
 * 装備等によるステータスの追加補正値を取得する（ＡＴＫ）.
 */
function GetStatusModifyAtkPlus() {

	var idx = 0;
	var val = 0;

	var vartmp = 0, varary = [];
	var itemCount = 0;
	var itemCountRight = 0, itemCountLeft = 0;
	var itemCountHeadTop = 0, itemCountHeadMid = 0, itemCountHeadUnder = 0;
	var itemCountShield = 0, itemCountBody = 0, itemCountShoulder = 0, itemCountShoes = 0;
	var itemCountAccessary1 = 0, itemCountAccessary2 = 0;
	var cardCount = 0;
	var cardCountRight = 0, cardCountLeft = 0;
	var cardCountHeadTop = 0, cardCountHeadMid = 0, cardCountHeadUnder = 0;
	var cardCountShield = 0, cardCountBody = 0, cardCountShoulder = 0, cardCountShoes = 0;
	var cardCountAccessary1 = 0, cardCountAccessary2 = 0;
	var sklLv = 0;
	var bufLv = 0;
	var bufferJobLv = 0, bufferSkillLv = 0;

	var masters = 0;



	//----------------------------------------------------------------
	// ランダムエンチャント効果
	//----------------------------------------------------------------
	val += GetRndOptTotalValue(ITEM_SP_ATK_PLUS, null, false);
	// val += GetRndEnchValue(ITEM_SP_ATK_PLUS);

//------------------------------------------------------------------------------------------------
// 武器効果　ここから
// ★武器は両手に装備される可能性（アサシン、影狼など）を考慮すること

	//----------------------------------------------------------------
	// 「ドゥームスレイヤー」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DOOM_SLAYER, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DOOM_SLAYER, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		if (SU_STR >= 95) val += 340 * itemCountRight;
		if (SU_STR >= 95) val += 340 * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ホルグレンの精錬ハンマー」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_HORGRENNO_SEIREN_HUMMER, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_HORGRENNO_SEIREN_HUMMER, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		if (SU_STR >= 44) val += 44 * itemCountRight;
		if (SU_STR >= 44) val += 44 * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「クラスナヤ」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_KRASNAYA, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_KRASNAYA, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		if (SU_STR >= 95) val += 20 * itemCountRight;
		if (SU_STR >= 95) val += 20 * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ベチェルアックス」の、素ＬＵＫによる効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BECHEL_AXE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BECHEL_AXE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		if (SU_LUK >= 90) val += 20 * itemCountRight;
		if (SU_LUK >= 90) val += 20 * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「達人の斧」の、製造スキルマスターによる効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_TATSUZINNO_ONO, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_TATSUZINNO_ONO, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {

		masters = 0;

		masters += (LearnedSkillSearch(SKILL_ID_TANKEN_SEISAKU) >= 3) ? 1 : 0;
		masters += (LearnedSkillSearch(SKILL_ID_KEN_SEISAKU) >= 3) ? 1 : 0;
		masters += (LearnedSkillSearch(SKILL_ID_RYOTEKEN_SEISAKU) >= 3) ? 1 : 0;
		masters += (LearnedSkillSearch(SKILL_ID_ONO_SEISAKU) >= 3) ? 1 : 0;
		masters += (LearnedSkillSearch(SKILL_ID_MACE_SEISAKU) >= 3) ? 1 : 0;
		masters += (LearnedSkillSearch(SKILL_ID_KNUCKLE_SEISAKU) >= 3) ? 1 : 0;
		masters += (LearnedSkillSearch(SKILL_ID_YARI_SEISAKU) >= 3) ? 1 : 0;

		val += 10 * masters * itemCountRight;
		val += 10 * masters * itemCountLeft;
	}
	itemCountRight = EquipNumSearch(ITEM_ID_TATSUZINNO_ONO_S2, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_TATSUZINNO_ONO_S2, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {

		masters = 0;

		masters += (LearnedSkillSearch(SKILL_ID_TANKEN_SEISAKU) >= 3) ? 1 : 0;
		masters += (LearnedSkillSearch(SKILL_ID_KEN_SEISAKU) >= 3) ? 1 : 0;
		masters += (LearnedSkillSearch(SKILL_ID_RYOTEKEN_SEISAKU) >= 3) ? 1 : 0;
		masters += (LearnedSkillSearch(SKILL_ID_ONO_SEISAKU) >= 3) ? 1 : 0;
		masters += (LearnedSkillSearch(SKILL_ID_MACE_SEISAKU) >= 3) ? 1 : 0;
		masters += (LearnedSkillSearch(SKILL_ID_KNUCKLE_SEISAKU) >= 3) ? 1 : 0;
		masters += (LearnedSkillSearch(SKILL_ID_YARI_SEISAKU) >= 3) ? 1 : 0;

		val += 10 * masters * itemCountRight;
		val += 10 * masters * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「チャクラム」の、カタール修練マスターによる効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_CACRAM, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_CACRAM, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		if (LearnedSkillSearch(SKILL_ID_KATAR_SHUREN) >= 10) val += 10 * itemCountRight;
		if (LearnedSkillSearch(SKILL_ID_KATAR_SHUREN) >= 10) val += 10 * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「蛇蝎大全集」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DAKATSU_DAIZENSHU, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DAKATSU_DAIZENSHU, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 3 * n_A_Weapon_ATKplus * itemCountRight;
		val += 3 * n_A_Weapon2_ATKplus * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ギガントランス」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_GIGANT_LANCE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_GIGANT_LANCE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		if (SU_STR >= 120) val += 300 * itemCountRight;
		if (SU_STR >= 120) val += 300 * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「アイアンネイル」の、コンボスキルマスターによる効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_IRON_NAIL, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_IRON_NAIL, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {

		masters = 0;

		masters += (LearnedSkillSearch(SKILL_ID_RENDASHO) >= 5) ? 1 : 0;
		masters += (LearnedSkillSearch(SKILL_ID_MORYUKEN) >= 5) ? 1 : 0;
		masters += (LearnedSkillSearch(SKILL_ID_BUKKOKEN) >= 5) ? 1 : 0;
		masters += (LearnedSkillSearch(SKILL_ID_RENCHUHOGEKI) >= 10) ? 2 : 0;

		val += 20 * masters * itemCountRight;
		val += 20 * masters * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「鬼丸」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_ONIMARU, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_ONIMARU, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;

		if (SU_STR >= 120) {
			vartmp += 120;
		}
		else {
			vartmp += SU_STR;
		}
		if (SU_STR >= 95) vartmp += 40;
		if (SU_STR >= 108) vartmp += 80;
		if (SU_STR >= 120) vartmp += 160;

		val += vartmp * itemCountRight;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「メテオストライク」の、精錬による効果
	// 「メテオストライク」の、スキル習得による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_METEOR_STRIKE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_METEOR_STRIKE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;

		vartmp += 10 * n_A_Weapon_ATKplus;

		vartmp += 7 * LearnedSkillSearch(SKILL_ID_ONO_SHUREN);
		vartmp += 10 * LearnedSkillSearch(SKILL_ID_BUKI_KENKYU);
		vartmp += 30 * LearnedSkillSearch(SKILL_ID_TEKKEN);

		val += vartmp * itemCountRight;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ヴァルキリーハンマー」の、職業による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_VALKYRIE_HAMMER, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_VALKYRIE_HAMMER, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		switch (GetLowerJobSeriesID(n_A_JOB)) {

		// ノービス系
		case JOB_SERIES_ID_NOVICE:
			val += 150 * itemCountRight;
			val += 150 * itemCountLeft;
			break;

		// ソードマン系
		case JOB_SERIES_ID_SWORDMAN:
			break;

		// マーチャント系
		case JOB_SERIES_ID_MERCHANT:
			val += 100 * itemCountRight;
			val += 100 * itemCountLeft;
			break;

		default:
			switch (GetHigherJobSeriesID(n_A_JOB)) {

			// プリースト系
			case JOB_SERIES_ID_PRIEST:
				val += 50 * itemCountRight;
				val += 50 * itemCountLeft;
				break;

			// モンク系
			case JOB_SERIES_ID_MONK:
				break;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ヴァルキリーナイフ」の、職業による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		switch (GetLowerJobSeriesID(n_A_JOB)) {

		// ノービス系
		case JOB_SERIES_ID_NOVICE:
			val += 100 * itemCountRight;
			val += 100 * itemCountLeft;
			break;

		// マジシャン系
		case JOB_SERIES_ID_MAGICIAN:
			break;

		// シーフ系
		case JOB_SERIES_ID_THIEF:
			break;

		default:
			switch (GetHigherJobSeriesID(n_A_JOB)) {

			// ハンター系
			case JOB_SERIES_ID_HUNTER:
				break;

			// バード系、ダンサー系
			case JOB_SERIES_ID_BARD:
			case JOB_SERIES_ID_DANCER:
				val += 100 * itemCountRight;
				val += 100 * itemCountLeft;
				break;
			}
		}
	}

	//----------------------------------------------------------------
	// 「邪念のダガー」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_ZYANENNO_DAGGER, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_ZYANENNO_DAGGER, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += Math.pow(n_A_Weapon_ATKplus, 2) * itemCountRight;
		val += Math.pow(n_A_Weapon2_ATKplus, 2) * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「邪念のセイバー」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_ZYANENNO_SAVOR, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_ZYANENNO_SAVOR, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += Math.pow(n_A_Weapon_ATKplus, 2) * itemCountRight;
		val += Math.pow(n_A_Weapon2_ATKplus, 2) * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「邪念のツーハンドソード」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_ZYANENNO_TWOHAND_SWORD, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_ZYANENNO_TWOHAND_SWORD, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += Math.pow(n_A_Weapon_ATKplus, 2) * itemCountRight;
		val += Math.pow(n_A_Weapon2_ATKplus, 2) * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「邪念のスピア」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_ZYANENNO_SPEAR, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_ZYANENNO_SPEAR, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += Math.pow(n_A_Weapon_ATKplus, 2) * itemCountRight;
		val += Math.pow(n_A_Weapon2_ATKplus, 2) * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「邪念のランス」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_ZYANENNO_LANCE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_ZYANENNO_LANCE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += Math.pow(n_A_Weapon_ATKplus, 2) * itemCountRight;
		val += Math.pow(n_A_Weapon2_ATKplus, 2) * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「邪念のツーハンドアックス」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_ZYANENNO_TWOHAND_AXE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_ZYANENNO_TWOHAND_AXE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += Math.pow(n_A_Weapon_ATKplus, 2) * itemCountRight;
		val += Math.pow(n_A_Weapon2_ATKplus, 2) * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「邪念のメイス」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_ZYANENNO_MACE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_ZYANENNO_MACE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += Math.pow(n_A_Weapon_ATKplus, 2) * itemCountRight;
		val += Math.pow(n_A_Weapon2_ATKplus, 2) * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「邪念のボウ」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_ZYANENNO_BOW, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_ZYANENNO_BOW, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += Math.pow(n_A_Weapon_ATKplus, 2) * itemCountRight;
		val += Math.pow(n_A_Weapon2_ATKplus, 2) * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「邪念のカタール」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_ZYANENNO_KATAR, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_ZYANENNO_KATAR, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += Math.pow(n_A_Weapon_ATKplus, 2) * itemCountRight;
		val += Math.pow(n_A_Weapon2_ATKplus, 2) * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「邪念のフィスト」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_ZYANENNO_FIST, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_ZYANENNO_FIST, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += Math.pow(n_A_Weapon_ATKplus, 2) * itemCountRight;
		val += Math.pow(n_A_Weapon2_ATKplus, 2) * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「邪念の風魔手裏剣」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_ZYANENNO_FUMASHURIKEN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_ZYANENNO_FUMASHURIKEN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += Math.pow(n_A_Weapon_ATKplus, 2) * itemCountRight;
		val += Math.pow(n_A_Weapon2_ATKplus, 2) * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「邪念のハンドガン」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_ZYANENNO_HANDGUN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_ZYANENNO_HANDGUN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += Math.pow(n_A_Weapon_ATKplus, 2) * itemCountRight;
		val += Math.pow(n_A_Weapon2_ATKplus, 2) * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァダガー」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_DAGGER, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_DAGGER, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァブレイド」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_BLADE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_BLADE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァクレイモア」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_CRAYMORE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_CRAYMORE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァスピア」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_SPEAR, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_SPEAR, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァランス」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_RANCE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_RANCE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァアックス」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_AXE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_AXE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァツーハンドアックス」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_TWOHAND_AXE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_TWOHAND_AXE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァメイス」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_MACE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_MACE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァウィング」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_WING, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_WING, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァカタール」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_KATAR, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_KATAR, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァクロー」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_CRAW, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_CRAW, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァ風魔手裏剣」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_FUMA_SHURIKEN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_FUMA_SHURIKEN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァハンドガン」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_HANDGUN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_HANDGUN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァライフル」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_RIFLE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_RIFLE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァガトリングガン」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_GATLINGGUN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_GATLINGGUN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァショットガン」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_SHOTGUN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_SHOTGUN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァグレネードガン」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_GRENADEGUN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_GRENADEGUN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュダガー」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_DAGGER, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_DAGGER, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュブレイド」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_BLADE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_BLADE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュクレイモア」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_CRAYMORE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_CRAYMORE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュスピア」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_SPEAR, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_SPEAR, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュランス」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_RANCE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_RANCE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュアックス」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_AXE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_AXE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュツーハンドアックス」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_TWOHAND_AXE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_TWOHAND_AXE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュメイス」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_MACE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_MACE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュウィング」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_WING, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_WING, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュカタール」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_KATAR, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_KATAR, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュクロー」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_CRAW, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_CRAW, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュ風魔手裏剣」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_FUMA_SHURIKEN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_FUMA_SHURIKEN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュハンドガン」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_HANDGUN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_HANDGUN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュライフル」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_RIFLE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_RIFLE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュガトリングガン」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_GATLINGGUN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_GATLINGGUN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュショットガン」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_SHOTGUN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_SHOTGUN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュグレネードガン」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_GRENADEGUN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_GRENADEGUN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「鉱員のつるはし」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_KOINNO_TSURUHASHI, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_KOINNO_TSURUHASHI, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 10 * n_A_Weapon_ATKplus * itemCountRight;
		val += 10 * n_A_Weapon2_ATKplus * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「猫じゃらしの模型」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		vartmp += 2 * n_A_Weapon_ATKplus;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 15;
		if (n_A_Weapon_ATKplus >= 8) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		vartmp += 2 * n_A_Weapon2_ATKplus;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 15;
		if (n_A_Weapon2_ATKplus >= 8) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「繊細な猫じゃらしの模型」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_SENSAINA_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_SENSAINA_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 5 * n_A_Weapon_ATKplus * itemCountRight;
		val += 5 * n_A_Weapon2_ATKplus * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「大きな猫じゃらしの模型」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_OKINA_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_OKINA_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		vartmp += 4 * n_A_Weapon_ATKplus;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 8) vartmp += 40;
		val += vartmp * itemCountRight;

		vartmp = 0;
		vartmp += 4 * n_A_Weapon2_ATKplus;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 8) vartmp += 40;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「精巧な猫じゃらしの模型」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_SEIKONA_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_SEIKONA_NEKOZYARASHINO_MOKEI, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 6 * n_A_Weapon_ATKplus * itemCountRight;
		val += 6 * n_A_Weapon2_ATKplus * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァフォックステイル」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_FOXTAIL, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_FOXTAIL, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュフォックステイル」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_FOXTAIL, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_FOXTAIL, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 30;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 30;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「イリュージョン連撃の爪」の、スキル習得による強化
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_ILLUSION_RENGEKINO_TSUME, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_ILLUSION_RENGEKINO_TSUME, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {

		if (LearnedSkillSearch(SKILL_ID_GOHO) >= 10) {
			val += 50 * (itemCountRight + itemCountLeft);
		}

		if (LearnedSkillSearch(SKILL_ID_SORYUKYAKU) >= 10) {
			val += 50 * (itemCountRight + itemCountLeft);
		}

		if (LearnedSkillSearch(SKILL_ID_DAITENHOSUI) >= 5) {
			val += 50 * (itemCountRight + itemCountLeft);
		}

		if (LearnedSkillSearch(SKILL_ID_TENRACHIMO) >= 5) {
			val += 50 * (itemCountRight + itemCountLeft);
		}
	}

	//----------------------------------------------------------------
	// 「フルフォース」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_FULL_FORCE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_FULL_FORCE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += Math.pow(n_A_Weapon_ATKplus * 2, 2) * itemCountRight;
		val += Math.pow(n_A_Weapon2_ATKplus * 2, 2) * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「獅子宮のメイス」の、ベースレベルによる効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_SHISHIKYUNO_MACE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_SHISHIKYUNO_MACE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 1 * n_A_BaseLV * itemCountRight;
		val += 1 * n_A_BaseLV * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「巨蟹宮のアックス」の、ベースレベルによる効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_KYOKAIKYUNO_AXE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_KYOKAIKYUNO_AXE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 1 * n_A_BaseLV * itemCountRight;
		val += 1 * n_A_BaseLV * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「天秤宮のクラスナヤ」の、ベースレベルによる効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_TENBINKYUNO_KRASNAYA, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_TENBINKYUNO_KRASNAYA, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 1 * n_A_BaseLV * itemCountRight;
		val += 1 * n_A_BaseLV * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「天蝎宮のカタール」の、ベースレベルによる効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_TENKATSUKYUNO_KATAR, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_TENKATSUKYUNO_KATAR, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 1 * n_A_BaseLV * itemCountRight;
		val += 1 * n_A_BaseLV * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「金牛宮のソード」の、ベースレベルによる効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_KINGYUKYUNO_SWORD, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_KINGYUKYUNO_SWORD, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 1 * n_A_BaseLV * itemCountRight;
		val += 1 * n_A_BaseLV * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「磨羯宮のシーフボウ」の、ベースレベルによる効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MAKATSUKYUNO_THIEF_BOW, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MAKATSUKYUNO_THIEF_BOW, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 1 * n_A_BaseLV * itemCountRight;
		val += 1 * n_A_BaseLV * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「白羊宮のスピアー」の、ベースレベルによる効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_HAKUYOKYUNO_SPEAR, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_HAKUYOKYUNO_SPEAR, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 1 * n_A_BaseLV * itemCountRight;
		val += 1 * n_A_BaseLV * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「双児宮のバイオリン」の、ベースレベルによる効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_SOZIKYUNO_VIOLIN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_SOZIKYUNO_VIOLIN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 1 * n_A_BaseLV * itemCountRight;
		val += 1 * n_A_BaseLV * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「双児宮のロープ」の、ベースレベルによる効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_SOZIKYUNO_ROPE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_SOZIKYUNO_ROPE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 1 * n_A_BaseLV * itemCountRight;
		val += 1 * n_A_BaseLV * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「人馬宮のハンターボウ」の、ベースレベルによる効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_ZINBAKYUNO_HUNTER_BOW, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_ZINBAKYUNO_HUNTER_BOW, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 1 * n_A_BaseLV * itemCountRight;
		val += 1 * n_A_BaseLV * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「覚醒フルフォース」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_KAKUSE_FULL_FORCE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_KAKUSE_FULL_FORCE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += Math.pow(n_A_Weapon_ATKplus * 2, 2) * itemCountRight;
		val += Math.pow(n_A_Weapon2_ATKplus * 2, 2) * itemCountLeft;
	}


// ★武器は両手に装備される可能性（アサシン、影狼など）を考慮すること
// 武器効果　ここまで
//------------------------------------------------------------------------------------------------
// 防具効果　ここから

	//----------------------------------------------------------------
	// 「盗賊の指輪」の、素ＡＧＩによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TOZOKUNO_YUBIWA)) > 0) {
		if (SU_AGI >= 90) val += 10 * itemCount;
	}

	//----------------------------------------------------------------
	// 「大型マジェスティックゴート」の、ジョブレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_OGATA_MAJESTIC_GOAT)) > 0) {
		val += Math.floor(n_A_JobLV / 7 * 2) * itemCount;
	}

	//----------------------------------------------------------------
	// 「獅子の仮面」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SHISHINO_KAMEN)) > 0) {
		val += 2 * n_A_HEAD_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「アーチャーフィギュア」の、装備職業による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ARCHER_FIGURE)) > 0) {
		if (GetLowerJobSeriesID(n_A_JOB) == JOB_SERIES_ID_ARCHER) {
			val += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ルーンサークレット」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_RUNE_CIRCLET)) > 0) {
		if (SU_STR >= 120) val += 10 * itemCount;
	}

	//----------------------------------------------------------------
	// 「沈黙の執行者」の、素ＡＧＩによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_CHIMONKUNO_SHIKKOSHA)) > 0) {
		if (SU_AGI >= 120) val += 10 * itemCount;
	}

	//----------------------------------------------------------------
	// 「ドライバーバンド」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_DRIVER_BAND_AKA)) > 0) {
		if (SU_STR >= 120) val += 10 * itemCount;
	}
	if ((itemCount = EquipNumSearch(ITEM_ID_DRIVER_BAND_KIRO)) > 0) {
		if (SU_STR >= 120) val += 10 * itemCount;
	}

	//----------------------------------------------------------------
	// 「シャドウクラウン」の、素ＡＧＩによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SHADOW_CROWN)) > 0) {
		if (SU_AGI >= 120) val += 10 * itemCount;
	}

	//----------------------------------------------------------------
	// 「ブレイジングソウル」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_BLAZING_SOUL)) > 0) {
		if (SU_STR >= 120) val += 10 * itemCount;
	}

	//----------------------------------------------------------------
	// 「ミダスのささやき」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_MIDASSNO_SASAYAKI)) > 0) {
		if (SU_STR >= 120) val += 5 * itemCount;
	}

	//----------------------------------------------------------------
	// 「ルーンブーツ」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_RUNE_BOOTS)) > 0) {
		if (SU_STR >= 90) val += 10 * itemCount;
		if (SU_STR >= 120) val += 10 * itemCount;
	}

	//----------------------------------------------------------------
	// 「百戦錬磨のお守り」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_HYAKUSENRENMANO_OMAMORI)) > 0) {
		if (SU_STR >= 80) val += 5 * itemCount;
		if (SU_STR >= 100) val += 5 * itemCount;
		if (SU_STR >= 120) val += 5 * itemCount;
	}

	//----------------------------------------------------------------
	// 「ナブのフード」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_NABUNO_HOOD)) > 0) {
		val += 2 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「黒羽のスーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KUROHANO_SUIT)) > 0) {
		val += 3 * n_A_BODY_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「剣聖の王冠」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KENSENO_OKAN)) > 0) {
		if (n_A_BaseLV >= 50) val += 5 * itemCount;
		if (n_A_BaseLV >= 100) val += 10 * itemCount;
		if (n_A_BaseLV >= 150) val += 15 * itemCount;
	}

	//----------------------------------------------------------------
	// 「力の時空ブーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_CHIKARANO_ZIKU_BOOTS)) > 0) {
		val += 7 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}
	if ((itemCount = EquipNumSearch(ITEM_ID_CHIKARANO_ZIKU_BOOTS_S1)) > 0) {
		val += 7 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「力の時空ブーツ」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_CHIKARANO_ZIKU_BOOTS)) > 0) {
		if (SU_STR >= 120) val += 50 * itemCount;
	}
	if ((itemCount = EquipNumSearch(ITEM_ID_CHIKARANO_ZIKU_BOOTS_S1)) > 0) {
		if (SU_STR >= 120) val += 50 * itemCount;
	}

	//----------------------------------------------------------------
	// 「力のグローブ」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_CHIKARANO_GLOVE)) > 0) {
		val += Math.floor(SU_STR / 10) * itemCount;
	}

	//----------------------------------------------------------------
	// 「ギャンブラーシール」の、素ＬＵＫによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GAMBLER_SEAL)) > 0) {
		val += 2 * Math.floor(SU_LUK / 10) * itemCount;
	}

	//----------------------------------------------------------------
	// 「酸素ボンベ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SANSO_BOMBE)) > 0) {
		val += 5 * Math.floor(n_A_SHOULDER_DEF_PLUS / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「古びたミダスのささやき」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_FURUBITA_MIDASS)) > 0) {
		val += 7 * n_A_HEAD_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ワクワクマント」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_WAKUWAKU_MANT)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 5) val += 2 * Math.floor(SU_STR / 10) * itemCount;
		if (n_A_SHOULDER_DEF_PLUS >= 7) val += 3 * Math.floor(SU_STR / 10) * itemCount;
	}

	//----------------------------------------------------------------
	// 「熾天使の花冠」の、素ＩＮＴによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SHITENSHINO_HANAKANMURI)) > 0) {
		val += 5 * Math.floor(SU_INT / 8) * itemCount;
		if (SU_INT >= 108) val += 50 * itemCount;
		if (SU_INT >= 120) val += 125 * itemCount;
	}

	//----------------------------------------------------------------
	// 「ガイアシールド」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GAIA_SHIELD)) > 0) {
		if (n_A_SHIELD_DEF_PLUS >= 8) {
			if (SU_STR >= 90) {
				val += 50 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「グウィバーの皮」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GWIBERNO_KAWA)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 8) {
			val += 5 * Math.floor((SU_INT + SU_DEX) / 20) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「アネモスシールド」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ANEMOS_SHIELD)) > 0) {
		if (n_A_SHIELD_DEF_PLUS >= 8) {
			if (SU_STR >= 90) {
				val += 50 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「巨人の加護」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KYOZINNO_KAGO)) > 0) {
		if (SU_STR >= 120) {
			val += 50 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ケミカルグローブ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_CHEMICAL_GLOVE)) > 0) {
		val += 15 * LearnedSkillSearch(SKILL_ID_CART_KAIZO) * itemCount;
	}

	//----------------------------------------------------------------
	// 「エクセリオンシールド」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_EXELION_SHIELD)) > 0) {
		val += 30 * Math.floor(n_A_SHIELD_DEF_PLUS / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「英雄の指輪」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_EIYUNO_YUBIWA)) > 0) {
		if (SU_STR >= 120) val += 50 * itemCount;
	}

	//----------------------------------------------------------------
	// 「名も無き剣士のブーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_NAMONAKI_KENNSHINO_BOOTS)) > 0) {
		val += 5 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「エメラルドリング」の、スキル習得による強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_EMERALD_RING)) > 0) {
		val += 20 * Math.floor(LearnedSkillSearch(SKILL_ID_DOUBLE_STRAFING) / 2) * itemCount;
	}

	//----------------------------------------------------------------
	// 「黒糸威胴丸」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KUROITOODOSHI_DOMARU)) > 0) {

		vartmp = 0;

		if (n_A_BODY_DEF_PLUS >= 7) vartmp += 20;
		if (n_A_BODY_DEF_PLUS >= 8) vartmp += 20;
		if (n_A_BODY_DEF_PLUS >= 9) vartmp += 30;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「おもちゃの指輪」の、スキル習得による強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_OMOCHANO_YUBIWA)) > 0) {
		val += 10 * Math.floor(LearnedSkillSearch(SKILL_ID_KEN_SHUREN) / 2) * itemCount;
		val += 10 * Math.floor(LearnedSkillSearch(SKILL_ID_KEN_SHUREN_GENETIC) / 2) * itemCount;
	}

	//----------------------------------------------------------------
	// 「ストロベリーハット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_STRAWBERRY_HAT)) > 0) {
		val += 5 * n_A_HEAD_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ドラムスーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_DORAM_SUITS)) > 0) {
		val += 5 * n_A_BODY_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「高級ドラムスーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KOKYU_DORAM_SUITS)) > 0) {
		val += 10 * n_A_BODY_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「特選ドラムスーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TOKUSEN_DORAM_SUITS)) > 0) {
		val += 15 * n_A_BODY_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ドラムシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_DORAM_SHOES)) > 0) {
		val += 5 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「高級ドラムシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KOKYU_DORAM_SHOES)) > 0) {
		val += 10 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「特選ドラムシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TOKUSEN_DORAM_SHOES)) > 0) {
		val += 15 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「パワードチップ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_POWERED_CHIP)) > 0) {
		if ((sklLv = LearnedSkillSearch(SKILL_ID_PILE_BUNKER)) >= 3) {
			val += 100 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「イリュージョンマフラー」の、ベースレベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_MUFFLER)) > 0) {
		if (n_A_BaseLV >= 170) {
			val += 20 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「イリュージョンシューズ」の、ベースレベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_SHOES)) > 0) {
		if (n_A_BaseLV >= 170) {
			val += 50 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「イリュージョンリング」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_RING)) > 0) {
		if (n_A_BaseLV >= 170) {
			val += 30 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ワークキャップ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_WORK_CAP)) > 0) {
		if ((sklLv = LearnedSkillSearch(SKILL_ID_AXE_BOOMERANG)) >= 5) {
			val += 100 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ラドゥーンの皮」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_RADOONNO_KAWA)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 8) {
			val += 15 * Math.floor((SU_AGI + SU_VIT) / 20) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ヘヴンリーオーダー」の、素ＬＵＫによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_HEAVENLY_ORDER)) > 0) {
		val += 15 * Math.floor(SU_LUK / 18) * itemCount;
	}

	//----------------------------------------------------------------
	// 「イリュージョンブーツ」の、ベースレベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_BOOTS)) > 0) {
		if (n_A_BaseLV >= 170) {
			val += 50 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「リングオブジュピター」の、素ＬＵＫによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_RING_OF_JUPITER, EQUIP_REGION_ID_ACCESSARY_1)) > 0) {
		val += 15 * Math.floor(SU_LUK / 10) * itemCount;
	}

	//----------------------------------------------------------------
	// 「シールドリング」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SHIELD_RING)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_DEBOTION) >= 5) {
			val += 100 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ディアボロスウィング　アーマーセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_ARMOR)) > 0) {
		val += 15 * n_A_BODY_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ディアボロスウィング　ブーツセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_BOOTS)) > 0) {
		val += 20 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「エウロパローブ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_EUROPA_ROBE)) > 0) {
		if (n_A_BODY_DEF_PLUS >= 8) {
			val += 10 * Math.floor((SU_VIT + SU_LUK) / 10) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ぷりちーウリボウシューズ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_PRETTY_URIBO_SHOES)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_SEIMEINO_TAMASHI) >= 1) {
			val += 100 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ガーディアンオブソウル」の、素ＳＴＲと素ＬＵＫによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GUARDIAN_OF_SOUL)) > 0) {
		val += 15 * Math.floor((SU_STR + SU_LUK) / 18) * itemCount;
	}

	//----------------------------------------------------------------
	// 「ダークリング」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_DARK_RING)) > 0) {
		val += 40 * LearnedSkillSearch(SKILL_ID_WEAPON_CRUSH) * itemCount;
	}

	//----------------------------------------------------------------
	// 「セブン-イレブンヘッドホン」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SEVEN_ELEVEN_HEADPHONE)) > 0) {
		val += 1 * n_A_BaseLV * itemCount;
	}

	//----------------------------------------------------------------
	// 「浮遊するアーティファクト」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_FUYUSURU_ARTIFACT)) > 0) {
		val += 1 * n_A_BaseLV * itemCount;
	}

	//----------------------------------------------------------------
	// 「インペリアルアニマルローブ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_ANIMAL_ROBE)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_SAVAGENO_TAMASHI) >= 5) {
			val += 1 * Math.floor(n_A_BaseLV / 3) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「グレースアニマルローブ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_ANIMAL_ROBE)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_SAVAGENO_TAMASHI) >= 5) {
			val += 1 * n_A_BaseLV * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「インペリアルクルシフォームスーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_CRUCIFORM_SUIT)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_MEIKYO_SHISUI) >= 5) {
			val += 50 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「グレースクルシフォームスーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_CRUCIFORM_SUIT)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_MEIKYO_SHISUI) >= 5) {
			val += 150 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「インペリアルマグマスーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_MAGMA_SUIT)) > 0) {
		val += 10 * LearnedSkillSearch(SKILL_ID_AXE_BOOMERANG) * itemCount;
	}

	//----------------------------------------------------------------
	// 「グレースマグマスーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_MAGMA_SUIT)) > 0) {
		val += 30 * LearnedSkillSearch(SKILL_ID_AXE_BOOMERANG) * itemCount;
	}

	//----------------------------------------------------------------
	// 「インペリアル天地スーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_TENCHI_SUIT)) > 0) {
		val += 10 * LearnedSkillSearch(SKILL_ID_TENKETSU_HAN) * itemCount;
	}

	//----------------------------------------------------------------
	// 「グレース天地スーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_TENCHI_SUIT)) > 0) {
		val += 30 * LearnedSkillSearch(SKILL_ID_TENKETSU_HAN) * itemCount;
	}

	//----------------------------------------------------------------
	// 「インペリアルメナススーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_MENUS_SUIT)) > 0) {
		val += 10 * LearnedSkillSearch(SKILL_ID_ESCAPE) * itemCount;
	}

	//----------------------------------------------------------------
	// 「グレースメナススーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_MENUS_SUIT)) > 0) {
		val += 30 * LearnedSkillSearch(SKILL_ID_ESCAPE) * itemCount;
	}

	//----------------------------------------------------------------
	// 「剛勇無双の神輿」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_GOYUMUSONO_MIKOSHI)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 8) {
			if (LearnedSkillSearch(SKILL_ID_SHUCHURYOKU_KOZYO) >= 10) {
				val += 50 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「インペリアルレインストームスーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_RAINSTORM_SUIT)) > 0) {
		val += 10 * LearnedSkillSearch(SKILL_ID_ENDLESS_HUMMING_VOICE) * itemCount;
	}

	//----------------------------------------------------------------
	// 「グレースレインストームスーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_RAINSTORM_SUIT)) > 0) {
		val += 30 * LearnedSkillSearch(SKILL_ID_ENDLESS_HUMMING_VOICE) * itemCount;
	}

	//----------------------------------------------------------------
	// 「インペリアルコンフィデンシャルメイル」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_IMPERIAL_CONFIDENCIAL_MAIL)) > 0) {
		val += 15 * Math.floor(LearnedSkillSearch(SKILL_ID_SONIC_WAVE) / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「グレースコンフィデンシャルメイル」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GRACE_CONFIDENCIAL_MAIL)) > 0) {
		val += 15 * LearnedSkillSearch(SKILL_ID_SONIC_WAVE) * itemCount;
	}

	//----------------------------------------------------------------
	// 「改良型パワードスーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KAIRYOGATA_POWERED_SUIT)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_ARMS_CANNON) >= 5) {
			val += 1 * n_A_BaseLV * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ダークトライアド」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_DARK_TRIAD)) > 0) {
		val += 50 * LearnedSkillSearch(SKILL_ID_MAELSTORM) * itemCount;
	}

	//----------------------------------------------------------------
	// 「アサルトスーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ASSAULT_SUIT)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_WUG_RIDER) >= 3) {
			val += 1 * n_A_BaseLV * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「デスブリンガー」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_DEATH_BRINGER)) > 0) {
		val += 50 * LearnedSkillSearch(SKILL_ID_CROSS_IMPACT) * itemCount;
	}


// 防具効果　ここまで
//------------------------------------------------------------------------------------------------
// カード効果　ここから

	//----------------------------------------------------------------
	// 「巨大ウィスパーカード」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_KYODAI_WHISPER)) > 0) {
		if (SU_STR >= 80) val += 20 * cardCount;
	}

	//----------------------------------------------------------------
	// 「イフリートカード」の、ジョブレベルによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_EFREET)) > 0) {
		val += Math.floor(n_A_JobLV /10) * cardCount;
	}

	//----------------------------------------------------------------
	// 「リヒトヘルシャーカード」の、＋１０本系列武器による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_LICHT_HERRSCHER)) > 0) {
		if ((n_A_WeaponType == ITEM_KIND_BOOK) && (n_A_Weapon_ATKplus >= 10)) {
			val += 20 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ワクワクカード」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_WAKUWAKU)) > 0) {
		val += 5 * Math.floor(SU_STR / 10) * cardCount;
	}

	//----------------------------------------------------------------
	// [LoVA] ルールーカードの、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_LOVA_RURU)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 7) val += 6 * Math.floor(SU_STR / 60) * cardCount;
	}

	//----------------------------------------------------------------
	// [LoVA] 真化ルールーカードの、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_LOVA_SHINKA_RURU)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 7)  val += 6 * Math.floor(SU_STR / 20) * cardCount;
	}

	//----------------------------------------------------------------
	// 「将軍デヒョンカード」の、剣系統の効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_SHOGUN_DAEHYON)) > 0) {
		if ((n_A_WeaponType == ITEM_KIND_SWORD) || (n_A_WeaponType == ITEM_KIND_SWORD_2HAND)) {
			val += 100 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「エナジー＜致命ノ一撃＞」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_ENCHANT_ENERGY_CHIMEINO_ICHIGEKI)) > 0) {
		val += 5 * n_A_SHOULDER_DEF_PLUS * cardCount;
	}

	//----------------------------------------------------------------
	// 「パワフルスケルトンカード」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_POWERFUL_SKELETON)) > 0) {
		val += 3 * Math.floor(n_A_BaseLV / 20) * cardCount;
	}

	//----------------------------------------------------------------
	// 「パワフルSスケルトンカード」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_POWERFUL_S_SKELETON)) > 0) {
		val += 5 * Math.floor(n_A_BaseLV / 20) * cardCount;
	}

	//----------------------------------------------------------------
	// 「レオ」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_LEO, CARD_REGION_ID_HEAD_TOP_ANY)) > 0) {
		// 修羅限定の効果
		if (IsSameJobClass(JOB_ID_SHURA)) {
			val += 4 * n_A_HEAD_DEF_PLUS * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「獄エンチャント」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_GOKU)) > 0) {
		// 職業限定の効果
		if (IsSameJobClass(JOB_ID_GENETIC)) {
			val += 50;
		}
	}

	//----------------------------------------------------------------
	// 「深層の古王グローザカード」の、精錬による効果
	//----------------------------------------------------------------
	cardCountHeadTop = CardNumSearch(CARD_ID_SHINSONO_KOO_GLOZA, CARD_REGION_ID_HEAD_TOP_ANY);
	if (cardCountHeadTop > 0) {
		val += 10 * n_A_HEAD_DEF_PLUS * cardCountHeadTop;
	}

	//----------------------------------------------------------------
	// 「トップブレードライダーカード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_TOP_BLADE_RIDER)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 7) {
			val += 40;
		}
	}

	//----------------------------------------------------------------
	// 「プラズマラットカード」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_PLASMA_RAT)) > 0) {
		val += 3 * Math.floor(SU_STR / 10) * cardCount;

		if (SU_STR >= 130) {
			val += 50 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「サイドライダーカード」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_SIDE_RIDER)) > 0) {
		if (SU_STR >= 120) {
			val += 30 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ジェミニ」の、精錬による効果
	//----------------------------------------------------------------
	cardCountHeadTop = CardNumSearch(CARD_ID_GEMINI, CARD_REGION_ID_HEAD_TOP_ANY);
	if (cardCountHeadTop > 0) {
		// 職業限定の効果
		if (IsSameJobClass(JOB_ID_MINSTREL)) {
			val += 5 * n_A_HEAD_DEF_PLUS * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「古のメガリスカード」の、素ＶＩＴによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_INISHIENO_MEGLIS)) > 0) {
		val += 3 * Math.floor(SU_VIT / 10) * cardCount;
	}

	//----------------------------------------------------------------
	// 「古のメガリスカード」の、素ＬＵＫによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_INISHIENO_MEGLIS)) > 0) {
		val += 3 * Math.floor(SU_LUK / 10) * cardCount;
	}

	//----------------------------------------------------------------
	// 「ギガンテスカード」の、斧系統の効果
	//----------------------------------------------------------------
	cardCountRight = CardNumSearch(CARD_ID_GIGANTES, CARD_REGION_ID_ARMS_RIGHT_ANY);
	cardCountLeft = CardNumSearch(CARD_ID_GIGANTES, CARD_REGION_ID_ARMS_LEFT_ANY);
	if (cardCountRight > 0) {
		if ((n_A_WeaponType == ITEM_KIND_AXE) || (n_A_WeaponType == ITEM_KIND_AXE_2HAND)) {
			if (n_A_Weapon_ATKplus >= 10) {
				val += 100 * cardCountRight;
			}
		}
	}
	if (cardCountLeft > 0) {
		if ((n_A_Weapon2Type == ITEM_KIND_AXE) || (n_A_Weapon2Type == ITEM_KIND_AXE_2HAND)) {
			if (n_A_Weapon2_ATKplus >= 10) {
				val += 100 * cardCountLeft;
			}
		}
	}

	//----------------------------------------------------------------
	// 「深海のセドラカード」の、楽器・鞭系統の効果
	//----------------------------------------------------------------
	cardCountRight = CardNumSearch(CARD_ID_SHINKAINO_CEDORA, CARD_REGION_ID_ARMS_RIGHT_ANY);
	cardCountLeft = CardNumSearch(CARD_ID_SHINKAINO_CEDORA, CARD_REGION_ID_ARMS_LEFT_ANY);
	if (cardCountRight > 0) {
		if ((n_A_WeaponType == ITEM_KIND_MUSICAL) || (n_A_WeaponType == ITEM_KIND_WHIP)) {
			if (n_A_Weapon_ATKplus >= 10) {
				val += 100 * cardCountRight;
			}
		}
	}
	if (cardCountLeft > 0) {
		if ((n_A_Weapon2Type == ITEM_KIND_MUSICAL) || (n_A_Weapon2Type == ITEM_KIND_WHIP)) {
			if (n_A_Weapon2_ATKplus >= 10) {
				val += 100 * cardCountLeft;
			}
		}
	}

	//----------------------------------------------------------------
	// 「混沌のキラーマンティスカード」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_KONTONNO_KILLER_MANTICE)) > 0) {
		val += 5 * Math.floor(SU_STR / 10) * cardCount;
	}

	//----------------------------------------------------------------
	// 「混沌のハンターフライカード」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_KONTONNO_HUNTERFLY)) > 0) {
		val += 3 * Math.floor(SU_STR / 10) * cardCount;
	}

	//----------------------------------------------------------------
	// 「混沌のハンターフライカード」の、素ＡＧＩによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_KONTONNO_HUNTERFLY)) > 0) {
		val += 3 * Math.floor(SU_AGI / 10) * cardCount;
	}

	//----------------------------------------------------------------
	// 「封印されたイフリートカード」の、ジョブレベルによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_FUINSARETA_EFREET)) > 0) {
		val += Math.floor(n_A_JobLV /10) * cardCount;
	}

	//----------------------------------------------------------------
	// 「魔力中毒プラガカード」の、爪系統の効果
	//----------------------------------------------------------------
	cardCountRight = CardNumSearch(CARD_ID_MARYOKU_CHUDOKU_PLAGA, CARD_REGION_ID_ARMS_RIGHT_ANY);
	cardCountLeft = CardNumSearch(CARD_ID_MARYOKU_CHUDOKU_PLAGA, CARD_REGION_ID_ARMS_LEFT_ANY);
	if (cardCountRight > 0) {
		if (n_A_WeaponType == ITEM_KIND_FIST) {
			if (n_A_Weapon_ATKplus >= 10) {
				val += 100 * cardCountRight;
			}
		}
	}
	if (cardCountLeft > 0) {
		if (n_A_Weapon2Type == ITEM_KIND_FIST) {
			if (n_A_Weapon2_ATKplus >= 10) {
				val += 100 * cardCountLeft;
			}
		}
	}


// カード効果　ここまで
//------------------------------------------------------------------------------------------------
// エンチャント効果　ここから
// ★エンチャントは、複数の装備部位に適用される可能性を考慮すること

	//----------------------------------------------------------------
	// 「エンチャント　金牛宮」の、精錬による効果
	//----------------------------------------------------------------
	cardCountHeadTop = CardNumSearch(CARD_ID_ENCHANT_KINGYUKYU, CARD_REGION_ID_HEAD_TOP_ANY);
	if (cardCountHeadTop > 0) {
		vartmp = 0;

		if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 4;
		if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 2;

		val += vartmp * cardCountHeadTop
	}

	//----------------------------------------------------------------
	// 「エンチャント　巨蟹宮」の、精錬による効果
	//----------------------------------------------------------------
	cardCountHeadTop = CardNumSearch(CARD_ID_ENCHANT_KYOKAIKYU, CARD_REGION_ID_HEAD_TOP_ANY);
	if (cardCountHeadTop > 0) {
		vartmp = 0;

		if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 5;

		val += vartmp * cardCountHeadTop
	}

	//----------------------------------------------------------------
	// 「エンチャント　Ａ－Ｓｔｒ」の、精錬と素ＳＴＲによる効果
	//----------------------------------------------------------------
	cardCountBody = CardNumSearch(CARD_ID_ENCHANT_A_STR, CARD_REGION_ID_BODY_ANY);
	if (cardCountBody > 0) {
		vartmp = 0;

		vartmp += 1;
		if (n_A_BODY_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_BODY_DEF_PLUS >= 8) vartmp += 4;
		if (n_A_BODY_DEF_PLUS >= 9) vartmp += 8;

		val += vartmp * Math.floor(SU_STR / 10) * cardCountBody;
	}

// ★エンチャントは、複数の装備部位に適用される可能性を考慮すること
// エンチャント効果　ここまで
//------------------------------------------------------------------------------------------------
// 装備セット効果　ここから

	//----------------------------------------------------------------
	// 「囚人の服　足鎖セット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_SHUZINNOFUKU_ASHIKUSARI)) > 0) {
		val += n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ルーンブーツ　コンチネンタルガードの印章セット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_RUNE_BOOTS_CONTINENTAL_GUARDNO_INSHO)) > 0) {
		val += n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「大盗賊の手鎖　囚人の服セット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_DAITOZOKUNO_TEKUSARI_SHUZINNO_FUKU)) > 0) {
		val += 2 * n_A_BODY_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「大盗賊の手鎖　足鎖セット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_DAITOZOKUNO_TEKUSARI_ASHIKUSARI)) > 0) {
		val += n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ナブのクロース　アーティファクトセット」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_NABUNO_CLOTH_ARTIFACT)) > 0) {
		if (SU_STR >= 120) val += 30 * itemCount;
	}

	//----------------------------------------------------------------
	// 「古びたサンダル　吸収系カードセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_FURUBITA_SANDAL_DRAINCARD)) > 0) {
		val += 10 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「ワクワクマント　ワクワクカードセット」の、素ＳＴＲによる効果（ペナルティ）
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_WAKUWAKU_MANT_WAKUWAKU)) > 0) {
		val += -5 * Math.floor(SU_STR / 10) * itemCount;
	}

	//----------------------------------------------------------------
	// 「勇者の怒りセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANOIKARI_ORCISH_AXE_ORCISH_SWORD)) > 0) {
		val += 15 * Math.floor( (n_A_Weapon_ATKplus + n_A_Weapon2_ATKplus) / 2) * itemCount;
	}

	//----------------------------------------------------------------
	// 「魔羊の咆哮　クレセントサイダーセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_MAHITSUZINO_HOKO_CRESCENT_CIZER)) > 0) {
		val += 15 * n_A_Weapon_ATKplus * itemCount;
	}

	//----------------------------------------------------------------
	// 「魔羊の咆哮　テグリョンセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_MAHITSUZINO_HOKO_TEGRYONG)) > 0) {
		val += 15 * n_A_Weapon_ATKplus * itemCount;
	}
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_MAHITSUZINO_HOKO_TEGRYONG_S2)) > 0) {
		val += 15 * n_A_Weapon_ATKplus * itemCount;
	}

	//----------------------------------------------------------------
	// 「神魔バフォメットの角　ブラッディクロスセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_SHINMA_BAPHOMETNO_TSUNO_BLOODY_CROSS)) > 0) {
		val += 15 * n_A_Weapon_ATKplus * itemCount;
	}

	//----------------------------------------------------------------
	// 「アインヘリヤルの鎧　戦死者のマントセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_EINHERJERNO_YOROI_SEINSHISHANO_MANT)) > 0) {
		val += 3 * n_A_SHOULDER_DEF_PLUS * itemCount
	}

	//----------------------------------------------------------------
	// 「アインヘリヤルの鎧　戦死者のマントセット」の、精錬と素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_EINHERJERNO_YOROI_SEINSHISHANO_MANT)) > 0) {
		vartmp = 0;

		if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 5;
		if (n_A_SHOULDER_DEF_PLUS >= 8) vartmp += 7;

		val += vartmp * Math.floor(SU_STR / 10) * itemCount
	}

	//----------------------------------------------------------------
	// 「勇者の靴　達人の斧セット」の、製造スキルマスターによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_ONO)) > 0) {
		masters = 0;

		masters += (LearnedSkillSearch(SKILL_ID_TANKEN_SEISAKU) >= 3) ? 1 : 0;
		masters += (LearnedSkillSearch(SKILL_ID_KEN_SEISAKU) >= 3) ? 1 : 0;
		masters += (LearnedSkillSearch(SKILL_ID_RYOTEKEN_SEISAKU) >= 3) ? 1 : 0;
		masters += (LearnedSkillSearch(SKILL_ID_ONO_SEISAKU) >= 3) ? 1 : 0;
		masters += (LearnedSkillSearch(SKILL_ID_MACE_SEISAKU) >= 3) ? 1 : 0;
		masters += (LearnedSkillSearch(SKILL_ID_KNUCKLE_SEISAKU) >= 3) ? 1 : 0;
		masters += (LearnedSkillSearch(SKILL_ID_YARI_SEISAKU) >= 3) ? 1 : 0;

		val += 10 * masters * itemCount;
	}
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_ONO_S2)) > 0) {
		masters = 0;

		masters += (LearnedSkillSearch(SKILL_ID_TANKEN_SEISAKU) >= 3) ? 1 : 0;
		masters += (LearnedSkillSearch(SKILL_ID_KEN_SEISAKU) >= 3) ? 1 : 0;
		masters += (LearnedSkillSearch(SKILL_ID_RYOTEKEN_SEISAKU) >= 3) ? 1 : 0;
		masters += (LearnedSkillSearch(SKILL_ID_ONO_SEISAKU) >= 3) ? 1 : 0;
		masters += (LearnedSkillSearch(SKILL_ID_MACE_SEISAKU) >= 3) ? 1 : 0;
		masters += (LearnedSkillSearch(SKILL_ID_KNUCKLE_SEISAKU) >= 3) ? 1 : 0;
		masters += (LearnedSkillSearch(SKILL_ID_YARI_SEISAKU) >= 3) ? 1 : 0;

		val += 10 * masters * itemCount;
	}

	//----------------------------------------------------------------
	// 「守護騎士の首飾り　インペリアルセット」の、素ＡＧＩによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_SHUGOKISHINO_KUBIKAZARI_IMPERIAL_FEATHER)) > 0) {
		vartmp = 0;

		if (SU_AGI >= 108) vartmp += 60;
		if (SU_AGI >= 120) vartmp += 80;

		val += vartmp * itemCount
	}

	//----------------------------------------------------------------
	// 「ローラのプレートメイルセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_LOLANO_PLATEMAIL_LOLANO_KUSARITEKKYU)) > 0) {
		val += 10 * n_A_Weapon_ATKplus * itemCount;
	}

	//----------------------------------------------------------------
	// 「ニーヴバレッタ　ニーヴ武器セット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_NIEVE_VALLETTA_NIEVE_ARMS)) > 0) {
		val += 20 * n_A_Weapon_ATKplus * itemCount;
	}

	//----------------------------------------------------------------
	// 「不思議なハト　ヴァルハラアイドルセット」の、素ＬＵＫによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_FUSHIGINA_HATO_WALHALLA_IDOL)) > 0) {
		val += 25 * Math.floor(SU_LUK / 18) * itemCount;
	}

	//----------------------------------------------------------------
	// 「星の眼帯　オークヒーローカードセット」の、素ＶＩＴによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_HOSHINO_GANTAI_ORC_HERO_CARD)) > 0) {
		if (n_A_BaseLV <= 99) {
			val += 10 * Math.floor(SU_VIT / 10) * itemCount;
		}
		else {
			val += 30 * Math.floor(SU_VIT / 10) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「虹色のねこじゃらし　レインボウセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_NIZIIRONO_NEKOZYARASHI_RAIN_BO)) > 0) {
		val += 15 * n_A_HEAD_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「イリュージョンテグリョン　魔羊の咆哮セット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_ILLUSION_TEGRYONG_MAHITSUZINO_HOKO)) > 0) {
		val += 15 * n_A_Weapon_ATKplus * itemCount;
	}

	//----------------------------------------------------------------
	// 「ファントムオブマスカレード　魔剣士タナトスの思念体セット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_PHANTOM_OF_MASKARADE_MAKENSHI_THANATOSNO_SHINENTAI_CARD)) > 0) {
		val += 4 * Math.pow(n_A_HEAD_DEF_PLUS, 2) * itemCount;
	}

	//----------------------------------------------------------------
	// 「ランナウェー・アクセラレータ　T-PowerBoost」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_RUNAWAY_ACCELERATOR_T_POWER_BOOST)) > 0) {
		val += 10 * n_A_HEAD_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「不死鳥の猫じゃらし　フレイムバードセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_FUSHICHONO_NEKOZYARASHI_FLAME_BIRD)) > 0) {
		val += 15 * n_A_HEAD_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ファントムオブマスカレード　封印された魔剣士タナトスの思念体セット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_PHANTOM_OF_MASKARADE_FUINSARETA_MAKENSHI_THANATOSNO_SHINENTAI_CARD)) > 0) {
		val += 2 * Math.pow(n_A_HEAD_DEF_PLUS, 2) * itemCount;
	}

	//----------------------------------------------------------------
	// 「星の眼帯　封印されたオークヒーローカードセット」の、素ＶＩＴによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_HOSHINO_GANTAI_FUINSARETA_ORC_HERO_CARD)) > 0) {
		if (n_A_BaseLV <= 99) {
			val += 3 * Math.floor(SU_VIT / 10) * itemCount;
		}
		else {
			val += 10 * Math.floor(SU_VIT / 10) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「豊穣の女神　イフリートカード」の、ジョブレベルによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_EFREET)) > 0) {
		val += 1 * n_A_JobLV * cardCount;
	}

	//----------------------------------------------------------------
	// 「豊穣の女神　封印されたイフリートカード」の、ジョブレベルによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_FUINSARETA_EFREET)) > 0) {
		val += 1 * Math.floor(n_A_JobLV / 2) * cardCount;
	}

// 装備セット効果　ここまで
//------------------------------------------------------------------------------------------------
// 自己スキル効果ここから

	//----------------------------------------------------------------
	// 「ロイヤルガード　インスピレーション」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_INSPIRATION)) > 0) {
		val += 40 * sklLv + 3 * n_A_JobLV;
	}
	else if (
		TimeItemNumSearch(TIME_ITEM_ID_ZETSUBONO_KAMI_MOROCC_CARD)
		|| TimeItemNumSearch(TIME_ITEM_ID_DEMI_FREYA)
		|| TimeItemNumSearch(TIME_ITEM_ID_MAKENSHI_SAKRAY_CARD)
		) {
		val += 40 * 1 + 3 * n_A_JobLV;
	}

	//----------------------------------------------------------------
	// 「ロイヤルガード　シールドスペル」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_SHIELD_SPELL_ATK_PLUS)) > 0) {
		if (n_A_ActiveSkill != SKILL_ID_SHIELD_SPELL_LV_1) {
			if(sklLv == 1) {
				val += ItemObjNew[n_A_Equip[EQUIP_REGION_ID_SHIELD]][ITEM_DATA_INDEX_POWER];
			}
			else{
				val += n_SieldSp[sklLv];
			}
		}
	}

	//----------------------------------------------------------------
	// 「ルーンナイト　ファイティングスピリット」の、効果
	// 「ルーンナイト　ファイティングスピリット（別キャラ支援）」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_FIGHTING_SPIRIT)) > 0) {
		val += 7 * sklLv;

		// ルーンヘルム、ジャスパーサークレット、ファフニールヘルム装備時の追加効果
		if(EquipNumSearch(ITEM_ID_RUNE_HELM) || EquipNumSearch(ITEM_ID_ZYASPER_CIRCLET) || EquipNumSearch(ITEM_ID_FAFNIR_HELM)) {
			val += 10;
		}
		else if (EquipNumSearch(ITEM_ID_TENBINKYUNO_DIADEM) > 0) {
			if (IsSameJobClass(JOB_ID_RUNEKNIGHT)) {
				val += 10;
			}
		}
	}
	else if ((bufLv = ExBuffNumSearch(EXBUF_ID_FIGHTING_SPIRIT)) > 0) {
		val += Math.floor(7 * bufLv / 4);
	}

	//----------------------------------------------------------------
	// 「ロイヤルガード　バンディング」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_BANDING)) > 0) {
		val += (10 + 10 * sklLv) * (UsedSkillSearch(SKILL_ID_COUNT_OF_RG_FOR_BANDING) + 1);
	}

	//----------------------------------------------------------------
	// 「修羅　閃光連撃」の、効果
	// 「修羅　閃光連撃直後のＡＴＫ上昇状態」の、効果
	//----------------------------------------------------------------
	sklLv = 0;
	if (n_A_ActiveSkill == SKILL_ID_SENKO_RENGEKI) {
		sklLv = Math.max(sklLv, n_A_ActiveSkillLV);
	}
	else {
		sklLv = Math.max(sklLv, UsedSkillSearch(SKILL_ID_ATK_PLUS_AFTER_SENKO_RENGEKI));
	}

	// 特定の戦闘エリアでの補正
	if (sklLv > 0) {
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
			val += 150 + 30 * sklLv;
			break;

		default:
			val += 20 + 20 * sklLv;
			break;

		}
	}


	//----------------------------------------------------------------
	// 「ソーサラー　精霊（Passive）」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_SERE)) > 0) {
		// 火Ｌｖ１～火Ｌｖ３のパッシブモードの場合、ＡＴＫ上昇
		if (UsedSkillSearch(SKILL_ID_SERE_MODE) == 1) {
			if(sklLv == 1) val += 60;
			if(sklLv == 2) val += 120;
			if(sklLv == 3) val += 180;
		}
	}

	//----------------------------------------------------------------
	// 「朧　幻術-残月-」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_GENZYUTSU_ZANGETSU)) > 0) {
		// HP設定が偶数の場合
		if (UsedSkillSearch(SKILL_ID_HPSPCONF_FOR_GENZYUTSU_ZANGETSU) <= 1) {
			val += 20 * sklLv + Math.floor(n_A_BaseLV / 3);
		}
		// HP設定が奇数の場合
		else {
			val += -30 * sklLv + Math.floor(n_A_BaseLV / 3);
		}
	}

	//----------------------------------------------------------------
	// 「Ｓホム　パイロクラスティック」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_PYROCLASTIC)) > 0) {
		val += 10 * sklLv + 121 + UsedSkillSearch(SKILL_ID_HOMLV_FOR_PYROCLASTIC);
	}

	//----------------------------------------------------------------
	// 「リベリオン　プラチナムアルター」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_PLATINUM_ALTER)) > 0) {
		// 聖属性の弾丸のみ適用
		if (GetEquippedTotalSPArrow(ITEM_SP_ELEMENTAL) == ELM_ID_HOLY) {
			val += sklLv * 10 + UsedSkillSearch(SKILL_ID_PLATINUM_ALTER_COIN_COUNT) * 10;
		}
	}

	//----------------------------------------------------------------
	// 「スーパーノービス＋　ブレイクスルー」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_BREAK_THROUGH)) > 0) {
		val += 15 * sklLv;

		if (sklLv >= 5) {
			val += 25;
		}
	}

// 自己スキル効果　ここまで
//------------------------------------------------------------------------------------------------
// 支援スキル効果　ここから

	//----------------------------------------------------------------
	// 「支援戦太鼓の響き」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_IKUSADAIKONO_HIBIKI)) > 0) {
		val += 25 + 25 * bufLv;
	}

	//----------------------------------------------------------------
	// 「合奏　支援フライデーナイトフィーバー」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_FRYDAY_NIGHT_FEVER)) > 0) {
		val += 100 * bufLv;
	}

	//----------------------------------------------------------------
	// 「合奏　支援ダンスウィズウォーグ（レンジャー有）」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_DANCE_WITH_WUG)) > 0) {
		if (IsSameJobClass(JOB_ID_RANGER) || IsSameJobClass(JOB_ID_MINSTREL) || IsSameJobClass(JOB_ID_WANDERER)) {
			vartmp = Math.min(7, ExBuffNumSearch(EXBUF_ID_DANCE_WITH_WUG_COUNT_OF_MINWAN));
			val += (2 * bufLv) * vartmp;
		}
	}

	//----------------------------------------------------------------
	// 「ミンストレル　支援風車に向かって突撃」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_FUSHANIMUKATTE_TOTSUGEKI)) > 0) {
		bufferJobLv = ExBuffNumSearch(EXBUF_ID_FUSHANIMUKATTE_TOTSUGEKI_BUFFER_JOBLV);
		bufferSkillLv = ExBuffNumSearch(EXBUF_ID_FUSHANIMUKATTE_TOTSUGEKI_BUFFER_SKILLLV);
		val += (6 * bufLv) + bufferSkillLv + Math.floor(bufferJobLv / 5);
	}

	//----------------------------------------------------------------
	// 「アークビショップ　支援オーディンの力」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_ODINNO_CHIKARA)) > 0) {

		// 特定の戦闘エリアでの補正
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
			val += 100 + 100 * bufLv;
			break;

		default:
			val += 40 + 30 * bufLv;
			break;

		}
	}

	//----------------------------------------------------------------
	// 「影狼・朧　支援術式-展開-」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_ZYUTSUSHIKI_TENKAI)) > 0) {
		if (bufLv == n_A_Weapon_zokusei) val += 200;
	}

	//----------------------------------------------------------------
	// 「ソウルリーパー　鷹の魂」の、効果
	//----------------------------------------------------------------
	if ((bufLv = g_confDataSanzi[CCharaConfSanzi.CONF_ID_TAKANO_TAMASHI]) > 0) {

		// 特定の戦闘エリアでの補正
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
			val += 300;
			break;

		default:
			val += 50;
			break;

		}
	}

	//----------------------------------------------------------------
	// 「オルレアンのフルコース」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_ORLEANS_FULLCOURSE)) > 0) {
		val += 30 * bufLv;
	}

	//----------------------------------------------------------------
	// 「エクラージュ支援」の、効果
	// 「恨みの箱」の、効果
	// 「虹色のお菓子」の、効果
	// 「ルーンミッドガッツ産おやつ」の、効果
	// ※もっとも効果の大きいひとつのみ有効
	//----------------------------------------------------------------
	vartmp = 0;
	if (vartmp == 0) vartmp += 24 * TimeItemNumSearch(79);
	if (vartmp == 0) vartmp += 20 * ExBuffNumSearch(EXBUF_ID_URAMINO_HAKO);
	if (vartmp == 0) vartmp += 10 * ExBuffNumSearch(EXBUF_ID_NIZIIRONO_OKASHI);
	if (vartmp == 0) vartmp += 5 * ExBuffNumSearch(EXBUF_ID_RUNEMIDGARTSSAN_OYATSU);
	val += vartmp;

	//----------------------------------------------------------------
	// 「期間限定イベント支援」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_EVENT_BUF_ATK_PLUS)) > 0) {
		val += bufLv;
	}

	//----------------------------------------------------------------
	// 「柴犬帽(黒)　忠節の首輪セット」の、追加発動による効果
	//----------------------------------------------------------------
	if ((bufLv = TimeItemNumSearch(53)) > 0) {
		val += (30 + 30 * n_A_HEAD_DEF_PLUS) * bufLv;
	}

	//----------------------------------------------------------------
	// 「性能カスタマイズ　ＡＴＫ＋」の、効果（マイナスを許容）
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_CUSTOM_ATK_PLUS)) != 0) {
		val += bufLv;
	}

	//----------------------------------------------------------------
	// 「サモナー　チャタリング」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_CHATTERING)) > 0) {

		// 特定の戦闘エリアでの補正
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
			val += 50 + 50 * bufLv;
			break;

		default:
			switch (bufLv) {
			case 1:
				val += 30;
				break;
			case 2:
				val += 50;
				break;
			case 3:
				val += 70;
				break;
			case 4:
				val += 100;
				break;
			case 5:
				val += 150;
				break;
			}
			break;

		}
	}



	// TODO: 四次対応
	for (idx = ITEM_SP_ATK_PLUS; idx <= ITEM_SP_ATK_PLUS; idx++) {
		val = ApplySpecModify(idx, val);
	}

// 支援スキル効果　ここまで
//------------------------------------------------------------------------------------------------

	return val;
}





//================================================================================================
//================================================================================================
//====
//==== ＭａｘＨＰ＋○○　ここから
//====
//================================================================================================
//================================================================================================
/**
* 装備等によるステータスの追加補正値を取得する（ＭａｘＨＰ＋）.
*/
function GetStatusModifyMaxHpPlus() {

	var val = 0;

	var vartmp = 0, varary = [];
	var itemCount = 0;
	var itemCountRight = 0, itemCountLeft = 0;
	var itemCountHeadTop = 0, itemCountHeadMid = 0, itemCountHeadUnder = 0;
	var itemCountShield = 0, itemCountBody = 0, itemCountShoulder = 0, itemCountShoes = 0;
	var itemCountAccessary1 = 0, itemCountAccessary2 = 0;
	var cardCount = 0;
	var cardCountRight = 0, cardCountLeft = 0;
	var cardCountHeadTop = 0, cardCountHeadMid = 0, cardCountHeadUnder = 0;
	var cardCountShield = 0, cardCountBody = 0, cardCountShoulder = 0, cardCountShoes = 0;
	var cardCountAccessary1 = 0, cardCountAccessary2 = 0;
	var sklLv = 0;
	var bufLv = 0;
	var bufferJobLv = 0, bufferSkillLv = 0;




	//----------------------------------------------------------------
	// ランダムエンチャント効果
	//----------------------------------------------------------------
	val += GetRndOptTotalValue(ITEM_SP_MAXHP_PLUS, null, false);
	// val += GetRndEnchValue(ITEM_SP_MAXHP_PLUS);

//------------------------------------------------------------------------------------------------
// 武器効果　ここから
// ★武器は両手に装備される可能性（アサシン、影狼など）を考慮すること

	//----------------------------------------------------------------
	// 「古代樹の杖」の、精錬による効果（ペナルティ）
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_KODAIZYUNO_TSUE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_KODAIZYUNO_TSUE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		if (n_A_Weapon_ATKplus >= 6) val += -200 * itemCountRight;
		if (n_A_Weapon2_ATKplus >= 6) val += -200 * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「クロノス」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_CHRONOS, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_CHRONOS, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 50 * Math.floor(n_A_Weapon_ATKplus / 2) * itemCountRight;
		val += 50 * Math.floor(n_A_Weapon2_ATKplus / 2) * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ヴァルキリーハンマー」の、職業による強化
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_VALKYRIE_HAMMER, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_VALKYRIE_HAMMER, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {

		switch (GetLowerJobSeriesID(n_A_JOB)) {

		// ノービス系
		case JOB_SERIES_ID_NOVICE:
			val += (500 + 200 * n_A_Weapon_ATKplus) * itemCountRight;
			val += (500 + 200 * n_A_Weapon2_ATKplus) * itemCountLeft;
			break;

		// ソードマン系
		case JOB_SERIES_ID_SWORDMAN:
			val += 500 * itemCountRight;
			val += 500 * itemCountLeft;
			break;

		// マーチャント系
		case JOB_SERIES_ID_MERCHANT:
			break;

		default:
			switch (GetHigherJobSeriesID(n_A_JOB)) {

			// プリースト系
			case JOB_SERIES_ID_PRIEST:
				break;

			// モンク系
			case JOB_SERIES_ID_MONK:
				break;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ヴァルキリーナイフ」の、職業による強化
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		switch (GetLowerJobSeriesID(n_A_JOB)) {

		// ノービス系
		case JOB_SERIES_ID_NOVICE:
			val += (300 + 200 * n_A_Weapon_ATKplus) * itemCountRight;
			val += (300 + 200 * n_A_Weapon2_ATKplus) * itemCountLeft;
			break;

		// マジシャン系
		case JOB_SERIES_ID_MAGICIAN:
			val += (200 * n_A_Weapon_ATKplus) * itemCountRight;
			val += (200 * n_A_Weapon2_ATKplus) * itemCountLeft;
			break;

		// シーフ系
		case JOB_SERIES_ID_THIEF:
			break;

		default:
			switch (GetHigherJobSeriesID(n_A_JOB)) {

			// ハンター系
			case JOB_SERIES_ID_HUNTER:
				val += 200 * itemCountRight;
				val += 200 * itemCountLeft;
				break;

			// バード系、ダンサー系
			case JOB_SERIES_ID_BARD:
			case JOB_SERIES_ID_DANCER:
				break;
			}
		}
	}

	//----------------------------------------------------------------
	// 「日月神示」の、精錬による強化
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_HITSUKISHINZI, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_HITSUKISHINZI, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 200 * n_A_Weapon_ATKplus * itemCountRight;
		val += 200 * n_A_Weapon2_ATKplus * itemCountLeft;
	}

// ★武器は両手に装備される可能性（アサシン、影狼など）を考慮すること
// 武器効果　ここまで
//------------------------------------------------------------------------------------------------
// 防具効果　ここから

	//----------------------------------------------------------------
	// 「ディアボロスブーツ」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_DIABOLOS_BOOTS)) > 0) {
		val += 10 * n_A_BaseLV * itemCount;
	}

	//----------------------------------------------------------------
	// 「ヴァルキリーシューズ」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_VALKIRIE_SHOES)) > 0) {
		switch (GetLowerJobSeriesID(n_A_JOB)) {
		case JOB_SERIES_ID_ACOLYTE:
		case JOB_SERIES_ID_ARCHER:
		case JOB_SERIES_ID_MAGICIAN:
			val += 5 * n_A_BaseLV * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「エーギルシューズ」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_AEGIR_SHOES)) > 0) {
		switch (GetLowerJobSeriesID(n_A_JOB)) {
		case JOB_SERIES_ID_ACOLYTE:
		case JOB_SERIES_ID_ARCHER:
		case JOB_SERIES_ID_MAGICIAN:
			val += 5 * n_A_BaseLV * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「アカデミーバッジ」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ACADEMY_BADGE)) > 0) {
		if (n_A_BaseLV <= 79) val += 400 * itemCount;
	}

	//----------------------------------------------------------------
	// 「ブリュンヒルデ」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_BRUNHILD)) > 0) {
		val += 20 * n_A_BaseLV * itemCount;
	}

	//----------------------------------------------------------------
	// 「ノービスフィギュア」の、職業による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_NOVICE_FIGURE)) > 0) {
		if (GetLowerJobSeriesID(n_A_JOB) == JOB_SERIES_ID_NOVICE) {
			val += 30 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「カメレオンアーマー」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_CHAMELEON_ARMER)) > 0) {
		val += 7 * n_A_BaseLV * itemCount;
	}

	//----------------------------------------------------------------
	// 「グロリアス量産型スーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GLORIOUS_RYOSANGATA_SUIT)) > 0) {
		if (n_A_BODY_DEF_PLUS >= 7) {
			val += 200 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「グロリアス普及用スーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GLORIOUS_FUKYUYO_SUIT)) > 0) {
		if (n_A_BODY_DEF_PLUS >= 7) {
			val += 300 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「派手なファントムマスク」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_HADENA_PHANTOM_MASK)) > 0) {
		val += 100 * n_A_HEAD_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「通学バッグ」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TSUGAKU_BAG)) > 0) {
		if (n_A_BaseLV <= 79) {
			val += 200 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ギャラクシーサークレット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GALAXY_CIRCLET)) > 0) {
		val += 10 * n_A_HEAD_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「無病息災のお守り」の、素ＶＩＴによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_MUBYOSOKUSAINO_OMAMORI)) > 0) {
		vartmp = 0;
		if (SU_VIT >= 80) vartmp += 50;
		if (SU_VIT >= 100) vartmp += 150;
		if (SU_VIT >= 120) vartmp += 100;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「ゲフェニア水の古書」の、素ＩＮＴによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GEFENIA_MIZUNO_KOSHO)) > 0) {
		if (SU_INT >= 120) {
			val += 800 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「時空ブーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ZIKU_BOOTS)) > 0) {
		val += 100 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「力の時空ブーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_CHIKARANO_ZIKU_BOOTS)) > 0) {
		val += 100 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}
	if ((itemCount = EquipNumSearch(ITEM_ID_CHIKARANO_ZIKU_BOOTS_S1)) > 0) {
		val += 100 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「知力の時空ブーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_CHIRYOKUNO_ZIKU_BOOTS)) > 0) {
		val += 100 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}
	if ((itemCount = EquipNumSearch(ITEM_ID_CHIRYOKUNO_ZIKU_BOOTS_S1)) > 0) {
		val += 100 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「俊敏の時空ブーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SHUNBINNO_ZIKU_BOOTS)) > 0) {
		val += 100 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}
	if ((itemCount = EquipNumSearch(ITEM_ID_SHUNBINNO_ZIKU_BOOTS_S1)) > 0) {
		val += 100 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「体力の時空ブーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TAIRYOKUNO_ZIKU_BOOTS)) > 0) {
		val += 300 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}
	if ((itemCount = EquipNumSearch(ITEM_ID_TAIRYOKUNO_ZIKU_BOOTS_S1)) > 0) {
		val += 300 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「技巧の時空ブーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GIKONO_ZIKU_BOOTS)) > 0) {
		val += 100 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}
	if ((itemCount = EquipNumSearch(ITEM_ID_GIKONO_ZIKU_BOOTS_S1)) > 0) {
		val += 100 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「幸運の時空ブーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KOUNNO_ZIKU_BOOTS)) > 0) {
		val += 100 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}
	if ((itemCount = EquipNumSearch(ITEM_ID_KOUNNO_ZIKU_BOOTS_S1)) > 0) {
		val += 100 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「体力のグローブ」の、素ＶＩＴによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TAIRYOKUNO_GLOVE)) > 0) {
		val += 50 * Math.floor(SU_VIT / 10) * itemCount;
	}

	//----------------------------------------------------------------
	// 「[衣装]ビギナー帽」の、ベースレベルによる効果（ペナルティ）
	//----------------------------------------------------------------
	if ((itemCount = CostumeNumSearch(COSTUME_ID_BEGINNER_BO)) > 0) {

		if (n_A_BaseLV >= 99) {
			val += -1000 * itemCount;
		}
		else {

			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_GVG:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_GVG_TE:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
				val += -1000 * itemCount;
				break;

			default:
				val += -100 * Math.floor(n_A_BaseLV / 10) * itemCount;
				break;

			}
		}
	}

	//----------------------------------------------------------------
	// 「１０周年記念バッジ」の、ジョブレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_10SHUNEN_KINEN_BADGE)) > 0) {
		val += 10 * n_A_JobLV * itemCount;
	}

	//----------------------------------------------------------------
	// 「くわえたイチゴ」の、レベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KUWAETA_ICHIGO)) > 0) {
		if (n_A_BaseLV <= 99) {
			val += 200;
		}
		else {
			val += 2000;
		}
	}

	//----------------------------------------------------------------
	// 「皇竜の天翼」の、職業による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KORYUNO_TENYOKU)) > 0) {
		switch (GetLowerJobSeriesID(n_A_JOB)) {
		case JOB_SERIES_ID_NOVICE:
		case JOB_SERIES_ID_TAEGKUON:
		case JOB_SERIES_ID_NINJA:
		case JOB_SERIES_ID_GUNSLINGER:
			val += 1000 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ディーヴァシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_DIVA_SHOES)) > 0) {
		vartmp = 0;

		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 1000;
		if (n_A_SHOES_DEF_PLUS >= 9) vartmp += 2000;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「ドレイクコート」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_DRAKE_COAT)) > 0) {
		vartmp = 0;

		if (n_A_BODY_DEF_PLUS >= 7) vartmp += 1000;
		if (n_A_BODY_DEF_PLUS >= 9) vartmp += 1500;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「エンジェリングスーツ」の、レベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ANGELING_SUITS)) > 0) {
		if (n_A_BaseLV >= 100) {
			val += 30 * (n_A_BaseLV - 99);
		}
	}

	//----------------------------------------------------------------
	// 「ゴーストリングスーツ」の、レベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GHOSTRING_SUITS)) > 0) {
		if (n_A_BaseLV >= 100) {
			val += 30 * (n_A_BaseLV - 99);
		}
	}

	//----------------------------------------------------------------
	// 「ディアボロスウィング　ブーツセット」の、レベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_BOOTS)) > 0) {
		val += 100 * n_A_BaseLV;
	}

	//----------------------------------------------------------------
	// 「イリュージョンミリタリーブーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_MILITARY_BOOTS)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_FAW_MAGIC_DECOY) >= 5) {
			val += 150 * n_A_BaseLV * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「科学者のマント」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KAGAKUSHANO_MANT)) > 0) {
		val += 1500 * LearnedSkillSearch(SKILL_ID_CRAZY_WEED) * itemCount;
	}

	//----------------------------------------------------------------
	// 「インペリアルアニマルローブ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_ANIMAL_ROBE)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_SAVAGENO_TAMASHI) >= 5) {
			val += 50 * Math.floor(n_A_BaseLV / 3) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「グレースアニマルローブ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_ANIMAL_ROBE)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_SAVAGENO_TAMASHI) >= 5) {
			val += 50 * n_A_BaseLV * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「インペリアル天地スーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_TENCHI_SUIT)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_SENRYU_SHOTEN) >= 10) {
			val += 50 * Math.floor(n_A_BaseLV / 3) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「グレース天地スーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_TENCHI_SUIT)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_SENRYU_SHOTEN) >= 10) {
			val += 50 * n_A_BaseLV * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「インペリアルホーリーローブ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_HOLY_ROBE)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_OFFERTORIUM) >= 5) {
			val += 50 * Math.floor(n_A_BaseLV / 3) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「グレースホーリーローブ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_HOLY_ROBE)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_OFFERTORIUM) >= 5) {
			val += 50 * n_A_BaseLV * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「インペリアルサイキックローブ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_PSYCHIC_ROBE)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_VACUUM_EXTREME) >= 5) {
			val += 50 * Math.floor(n_A_BaseLV / 3) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「グレースサイキックローブ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_PSYCHIC_ROBE)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_VACUUM_EXTREME) >= 5) {
			val += 50 * n_A_BaseLV * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「インペリアルパニッシュメントローブ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_IMPERIAL_PUNISHMENT_ROBE)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_RADIUS) >= 3) {
			val += 50 * Math.floor(n_A_BaseLV / 3) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「グレースパニッシュメントローブ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GRACE_PUNISHMENT_ROBE)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_RADIUS) >= 3) {
			val += 50 * n_A_BaseLV * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「インペリアルカルティベイションコート」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_IMPERIAL_CULTIVATION_COAT)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_ILLUSION_DOOPING) >= 5) {
			val += 50 * Math.floor(n_A_BaseLV / 3) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「グレースカルティベイションコート」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GRACE_CULTIVATION_COAT)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_ILLUSION_DOOPING) >= 5) {
			val += 50 * n_A_BaseLV * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「パラケルススコート」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_PARACELSUS_COAT)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_CART_BOOST_GENETIC) >= 5) {
			val += 50 * n_A_BaseLV * itemCount;
		}
	}

// 防具効果　ここまで
//------------------------------------------------------------------------------------------------
// カード効果　ここから

	//----------------------------------------------------------------
	// 「アポカリプスカード」の、過剰精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_APOCALYPSE)) > 0) {
		if (n_A_BODY_DEF_PLUS >= 9) val += 800 * cardCount;
	}

	//----------------------------------------------------------------
	// 「リムーバカード」の、精錬による効果（ペナルティ）
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_REMOVER)) > 0) {
		val += -40 * n_A_BODY_DEF_PLUS * cardCount;
	}

	//----------------------------------------------------------------
	// 「バンシーカード」の、職業による効果（ペナルティ）
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_BANSHEE)) > 0) {
		if (GetLowerJobSeriesID(n_A_JOB) == JOB_SERIES_ID_MAGICIAN) {
			val += -100 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「エキオカード」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_EKIO)) > 0) {
		if (GetLowerJobSeriesID(n_A_JOB) == JOB_SERIES_ID_SWORDMAN) {
			val += 500 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ジェジェリンカード」の、素ＶＩＴによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_JEJERIN)) > 0) {
		val += 200 * Math.floor(SU_VIT / 10) * cardCount;
	}

	//----------------------------------------------------------------
	// 「アリエス」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_ARIES, CARD_REGION_ID_HEAD_TOP_ANY)) > 0) {
		if (IsSameJobClass(JOB_ID_ROYALGUARD)) {
			val += 500 * n_A_HEAD_DEF_PLUS * cardCount;
		}
	}

// カード効果　ここまで
//------------------------------------------------------------------------------------------------
// エンチャント効果　ここから
// ★エンチャントは、複数の装備部位に適用される可能性を考慮すること

	//----------------------------------------------------------------
	// 「エンチャント　安息のニーヴ(体力)」の、精錬による効果
	//----------------------------------------------------------------
	cardCountRight	  = CardNumSearch(CARD_ID_ENCHANT_ANSOKUNO_NIEVE_TAIRYOKU, CARD_REGION_ID_ARMS_RIGHT_ANY);
	cardCountLeft	  = CardNumSearch(CARD_ID_ENCHANT_ANSOKUNO_NIEVE_TAIRYOKU, CARD_REGION_ID_ARMS_LEFT_ANY);
	cardCountHeadTop  = CardNumSearch(CARD_ID_ENCHANT_ANSOKUNO_NIEVE_TAIRYOKU, CARD_REGION_ID_HEAD_TOP_ANY);
	cardCountShield	  = CardNumSearch(CARD_ID_ENCHANT_ANSOKUNO_NIEVE_TAIRYOKU, CARD_REGION_ID_SHIELD_ANY);
	cardCountBody	  = CardNumSearch(CARD_ID_ENCHANT_ANSOKUNO_NIEVE_TAIRYOKU, CARD_REGION_ID_BODY_ANY);
	cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_ANSOKUNO_NIEVE_TAIRYOKU, CARD_REGION_ID_SHOULDER_ANY);
	cardCountShoes	  = CardNumSearch(CARD_ID_ENCHANT_ANSOKUNO_NIEVE_TAIRYOKU, CARD_REGION_ID_SHOES_ANY);
	if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield
		+ cardCountBody + cardCountShoulder + cardCountShoes > 0) {

		// 右手武器へのエンチャント
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 6) vartmp += 300;
		if (n_A_Weapon_ATKplus >= 8) vartmp += 500;
		val += vartmp * cardCountRight

		// 左手武器へのエンチャント
		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 6) vartmp += 300;
		if (n_A_Weapon2_ATKplus >= 8) vartmp += 500;
		val += vartmp * cardCountLeft

		// 頭防具へのエンチャント
		vartmp = 0;
		if (n_A_HEAD_DEF_PLUS >= 6) vartmp += 300;
		if (n_A_HEAD_DEF_PLUS >= 8) vartmp += 500;
		val += vartmp * cardCountHeadTop

		// 盾防具へのエンチャント
		vartmp = 0;
		if (n_A_SHIELD_DEF_PLUS >= 6) vartmp += 300;
		if (n_A_SHIELD_DEF_PLUS >= 8) vartmp += 500;
		val += vartmp * cardCountShield

		// 体防具へのエンチャント
		vartmp = 0;
		if (n_A_BODY_DEF_PLUS >= 6) vartmp += 300;
		if (n_A_BODY_DEF_PLUS >= 8) vartmp += 500;
		val += vartmp * cardCountBody

		// 肩防具へのエンチャント
		vartmp = 0;
		if (n_A_SHOULDER_DEF_PLUS >= 6) vartmp += 300;
		if (n_A_SHOULDER_DEF_PLUS >= 8) vartmp += 500;
		val += vartmp * cardCountShoulder

		// 靴防具へのエンチャント
		vartmp = 0;
		if (n_A_SHOES_DEF_PLUS >= 6) vartmp += 300;
		if (n_A_SHOES_DEF_PLUS >= 8) vartmp += 500;
		val += vartmp * cardCountShoes

		// アクセサリへのエンチャント
		// 精錬できないので処理不要
	}

// ★エンチャントは、複数の装備部位に適用される可能性を考慮すること
// エンチャント効果　ここまで
//------------------------------------------------------------------------------------------------
// 装備セット効果　ここから

	//----------------------------------------------------------------
	// 「クイールペンリング　スモールブックペンダントセット」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_QUILL_PENRING_SMALL_BOOK_PENDANT)) > 0) {
		val += 3 * n_A_BaseLV * itemCount;
	}

	//----------------------------------------------------------------
	// 「破産者の仮面　お金を失ったも者の心セット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_HASANSHANO_KAMEN_OKANEWO_USHINATTAMONONO_KOKORO)) > 0) {
		val += 100 * n_A_HEAD_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「星タマゴバッジ　アカデミーバッジセット」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_HOSHITAMAGO_BADGE_ACADEMY_BADGE)) > 0) {
		if (n_A_BaseLV <= 79) {
			val += 200 * itemCount;
		}
		else {
			val += 600 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「飛行船スーツセット」の、精錬による強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_HIKOSEN_SUIT_HIKOSEN_MANT_HIKOSEN_BOOTS)) > 0) {
		var refinedtotal = n_A_BODY_DEF_PLUS + n_A_SHOULDER_DEF_PLUS + n_A_SHOES_DEF_PLUS;

		vartmp = 0;
		if (refinedtotal >= 15)  vartmp += 1000;
		if (refinedtotal >= 20)  vartmp += 1500;
		if (refinedtotal >= 25)  vartmp += 2000;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「ペルロックのスーツセット」の、精錬による強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_PELLROCKNO_SUIT_PELLROCKNO_MANT_PELLROCKNO_BOOTS)) > 0) {
		var refinedtotal = n_A_BODY_DEF_PLUS + n_A_SHOULDER_DEF_PLUS + n_A_SHOES_DEF_PLUS;

		vartmp = 0;
		if (refinedtotal >= 15)  vartmp += 1000;
		if (refinedtotal >= 20)  vartmp += 1500;
		if (refinedtotal >= 25)  vartmp += 2000;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「イリュージョンサバイバルセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_ILLUSION_SURVIVAL_STUFF_ILLUSION_SURVIVAL_MANT)) > 0) {
		val += 1000 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「王者セット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_OZYANO_MAIL_OZYANO_MANT_OZYANO_BOOTS)) > 0) {
		val += 50 * n_A_BaseLV * itemCount;
	}

	//----------------------------------------------------------------
	// 「ゾディアック　白羊宮のシューズ」セットの、職業による効果
	//----------------------------------------------------------------
	if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_HAKUYOKYUNO_SHIELD)) {
		if (IsSameJobClass(JOB_ID_ROYALGUARD)) {
			val += 500 * n_A_SHIELD_DEF_PLUS;
		}
	}

// 装備セット効果　ここまで
//------------------------------------------------------------------------------------------------
// 自己スキル効果ここから

	//----------------------------------------------------------------
	// 「クルセイダー　フェイス」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_FAITH)) > 0) {
		val += 200 * sklLv;
	}

	//----------------------------------------------------------------
	// 「ソーサラー　精霊補助スキル（ソリッドスキン）」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL)) > 0) {
		if (sklLv == 29) {
			val += 2000;
		}
	}

	//----------------------------------------------------------------
	// 「サモナー　にゃん魂」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_NYAN_TAMASHI)) > 0) {
		val += 2000;
	}

	//----------------------------------------------------------------
	// 「サモナー　海の力」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_UMINO_CHIKARA)) > 0) {
		val += 1000;

		if (UsedSkillSearch(SKILL_ID_SEAFOOD_KEI_SHUTOKU_LEVEL_GOKEI) >= 20) {
			val += 3000;
		}
	}

	//----------------------------------------------------------------
	// 「スーパーノービス＋　ブレイクスルー」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_BREAK_THROUGH)) > 0) {
		val += 350 * sklLv;

		if (sklLv >= 5) {
			val += 250;
		}
	}

	//----------------------------------------------------------------
	// 「スーパーノービス＋　トランセンデンス」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_TRANSCENDENCE)) > 0) {
		val += 350 * sklLv;

		if (sklLv >= 5) {
			val += 250;
		}
	}

// 自己スキル効果　ここまで
//------------------------------------------------------------------------------------------------
// 支援スキル効果　ここから

	//----------------------------------------------------------------
	// 「合奏　支援レーラズの露」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_RELAZUNO_TSUYU)) > 0) {
		vartmp = ExBuffNumSearch(EXBUF_ID_RELAZUNO_TSUYU_COUNT_OF_MINWAN);
		val += (200 * bufLv) - 600 + (300 * vartmp);

	}

	//----------------------------------------------------------------
	// 「ＨＰ増加ポーション」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_HPZOKA_POTION)) > 0) {
		val += (-500 + 1000 * bufLv) + Math.floor(n_A_BaseLV * 10 / 3);
	}

	//----------------------------------------------------------------
	// 「性能カスタマイズ　ＭａｘＨＰ＋」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_CUSTOM_HP_PLUS)) > 0) {
		val += bufLv;
	}

// 支援スキル効果　ここまで
//------------------------------------------------------------------------------------------------

	return val;
}






//================================================================================================
//================================================================================================
//====
//==== ＭａｘＨＰ　％ＵＰ　ここから
//====
//================================================================================================
//================================================================================================
/**
* 装備等によるステータスの追加補正値を取得する（ＭａｘＨＰ％）.
*/
function GetStatusModifyMaxHpUp() {

	var val = 0;

	var vartmp = 0, varary = [];
	var itemCount = 0;
	var itemCountRight = 0, itemCountLeft = 0;
	var itemCountHeadTop = 0, itemCountHeadMid = 0, itemCountHeadUnder = 0;
	var itemCountShield = 0, itemCountBody = 0, itemCountShoulder = 0, itemCountShoes = 0;
	var itemCountAccessary1 = 0, itemCountAccessary2 = 0;
	var cardCount = 0;
	var cardCountRight = 0, cardCountLeft = 0;
	var cardCountHeadTop = 0, cardCountHeadMid = 0, cardCountHeadUnder = 0;
	var cardCountShield = 0, cardCountBody = 0, cardCountShoulder = 0, cardCountShoes = 0;
	var cardCountAccessary1 = 0, cardCountAccessary2 = 0;
	var sklLv = 0;
	var bufLv = 0;
	var bufferJobLv = 0, bufferSkillLv = 0;




	//----------------------------------------------------------------
	// ランダムエンチャント効果
	//----------------------------------------------------------------
	val += GetRndOptTotalValue(ITEM_SP_MAXHP_UP, null, false);
	// val += GetRndEnchValue(ITEM_SP_MAXHP_UP);

//------------------------------------------------------------------------------------------------
// 武器効果　ここから
// ★武器は両手に装備される可能性（アサシン、影狼など）を考慮すること

	//----------------------------------------------------------------
	// 「メンタルスティック」の、精錬による効果（ペナルティ）
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MENTAL_STICK, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MENTAL_STICK, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += -2 * Math.max(0, (n_A_Weapon_ATKplus - 5)) * itemCountRight;
		val += -2 * Math.max(0, (n_A_Weapon2_ATKplus - 5)) * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ラグズナイフ」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_LAGUZ_KNIFE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_LAGUZ_KNIFE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 1 * Math.max(0, (n_A_Weapon_ATKplus - 6)) * itemCountRight;
		val += 1 * Math.max(0, (n_A_Weapon2_ATKplus - 6)) * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「エイワズナイフ」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_EIHWAZ_KNIFE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_EIHWAZ_KNIFE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 1 * Math.max(0, (n_A_Weapon_ATKplus - 6)) * itemCountRight;
		val += 1 * Math.max(0, (n_A_Weapon2_ATKplus - 6)) * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「カノナイフ」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_KANO_KNIFE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_KANO_KNIFE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 1 * Math.max(0, (n_A_Weapon_ATKplus - 6)) * itemCountRight;
		val += 1 * Math.max(0, (n_A_Weapon2_ATKplus - 6)) * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ハガラズナイフ」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_HAGALAZ_KNIFE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_HAGALAZ_KNIFE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 1 * Math.max(0, (n_A_Weapon_ATKplus - 6)) * itemCountRight;
		val += 1 * Math.max(0, (n_A_Weapon2_ATKplus - 6)) * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「オンディーヌの槍」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_ONDINENO_YARI, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_ONDINENO_YARI, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 1 * n_A_Weapon_ATKplus * itemCountRight;
		val += 1 * n_A_Weapon2_ATKplus * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「大自然のギター」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DAISHIZENNO_GUITAR, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DAISHIZENNO_GUITAR, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 1 * n_A_Weapon_ATKplus * itemCountRight;
		val += 1 * n_A_Weapon2_ATKplus * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「大自然のロープ」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DAISHIZENNO_ROPE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DAISHIZENNO_ROPE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 1 * n_A_Weapon_ATKplus * itemCountRight;
		val += 1 * n_A_Weapon2_ATKplus * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルートダマスカス」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_DUMASCUS, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_DUMASCUS, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルートスピア」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_SPEAR, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_SPEAR, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルートクリーヴァー」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_CLEAVER, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_CLEAVER, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルートモーニングスター」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_MORNINGSTAR, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_MORNINGSTAR, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルートアークワンド」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_ARCWAND, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_ARCWAND, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルートハンドガン」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_HANDGUN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_HANDGUN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルートライフル」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_RIFLE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_RIFLE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルートガトリングガン」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_GATLINGGUN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_GATLINGGUN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルートショットガン」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_SHOTGUN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_SHOTGUN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルートグレネードガン」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_GRENADEGUN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_GRENADEGUN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルートハンターボウ」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_HUNTER_BOW, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_HUNTER_BOW, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルートギター」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_GUITAR, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_GUITAR, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルートラリエット」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_RARIET, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_RARIET, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルート風魔手裏剣」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_FUMASHURIKEN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_FUMASHURIKEN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルートカタール」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_KATAR, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_KATAR, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}
// ★武器は両手に装備される可能性（アサシン、影狼など）を考慮すること
// 武器効果　ここまで
//------------------------------------------------------------------------------------------------
// 防具効果　ここから

	//----------------------------------------------------------------
	// 「バリアントシューズ」の、精錬による効果（ペナルティ）
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_VARIANT_SHOES)) > 0) {
		val += -1 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「グロリアススーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GLORIOUS_SUIT)) > 0) {
		if (n_A_BODY_DEF_PLUS >= 7) {
			val += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「グロリアスシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GLORIOUS_SHOES)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 7) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「グロリアス量産型シューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GLORIOUS_RYOSANGATA_SHOES)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 7) {
			val += 7 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「グロリアス普及用シューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GLORIOUS_FUKYUYO_SHOES)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 7) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「グロリアスマフラー」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GLORIOUS_MUFFLER)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 7) {
			val += 3 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ホワイトフェザー」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_WHITE_FEATHER)) > 0) {
		vartmp = 0;

		vartmp += 10;
		if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 3;
		if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 3;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「ウルズプレート」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_URUZ_PLATE)) > 0) {
		val += 1 * n_A_BODY_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ウルズグリーブ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_URUZ_GREAVE)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 8) {
			val += 1 * (n_A_SHOES_DEF_PLUS - 7) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「イドゥンの羽耳」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_IDUNNNO_HANEMIMI)) > 0) {
		if (n_A_BaseLV >= 100) {
			val += 1 * itemCount;
		}
		if (n_A_BaseLV >= 150) {
			val += 1 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「賢者の靴」の、精錬による効果（ペナルティ）
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KENZYANO_KUTSU)) > 0) {
		val += -1 * Math.max(0, n_A_SHOES_DEF_PLUS - 5) * itemCount;
	}

	//----------------------------------------------------------------
	// 「ネクタルスーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_NECTAR_SUIT)) > 0) {
		val += 1 * Math.floor(n_A_BODY_DEF_PLUS / 2) * itemCount;
	}

	//----------------------------------------------------------------
	// 「ＢＯＳＳ帽」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_BOSS_BO)) > 0) {
		vartmp = 0;

		vartmp += 1 * Math.max(0, n_A_HEAD_DEF_PLUS - 4);
		if (n_A_HEAD_DEF_PLUS >= 10) {
			vartmp += 4;
		}

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「希望の上履き」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KIBONO_UWABAKI)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 6) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「スヴェル」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SUVEL)) > 0) {
		val += 1 * Math.floor(n_A_SHIELD_DEF_PLUS / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「体力の時空ブーツ」の、素ＶＩＴによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TAIRYOKUNO_ZIKU_BOOTS)) > 0) {
		if (SU_VIT >= 120) {
			val += 8 * itemCount;
		}
	}
	if ((itemCount = EquipNumSearch(ITEM_ID_TAIRYOKUNO_ZIKU_BOOTS_S1)) > 0) {
		if (SU_VIT >= 120) {
			val += 8 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「体力のグローブ」の、素ＶＩＴによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TAIRYOKUNO_GLOVE)) > 0) {
		if (SU_VIT >= 110) {
			val += 1 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「機械人形用増幅装置・改」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KIKAININGYOYO_ZOFUKUSOCHI_KAI)) > 0) {
		val += 1 * Math.max(0, n_A_SHOULDER_DEF_PLUS - 5) * itemCount;
	}

	//----------------------------------------------------------------
	// 「機械人形用加速装置・改」の、精錬による効果（ペナルティ）
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KIKAININGYOYO_KASOKUSOCHI_KAI)) > 0) {
		val += -1 * Math.max(0, n_A_BODY_DEF_PLUS - 5) * itemCount;
	}

	//----------------------------------------------------------------
	// 「リアンシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_LIEN_SHOES)) > 0) {
		val += 1 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「フロワシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_FROID_SHOES)) > 0) {
		val += 1 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ソルシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SOL_SHOES)) > 0) {
		val += 1 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「シャレールシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_CHALEUR_SHOES)) > 0) {
		val += 1 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ルヴァンシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_LEVAIN_SHOES)) > 0) {
		val += 1 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「プワゾンシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_POISON_SHOES)) > 0) {
		val += 1 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「リュミエールシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_LUMIERE_SHOES)) > 0) {
		val += 1 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ソンブルシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SOMBRE_SHOES)) > 0) {
		val += 1 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「エスプリシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ESPRIT_SHOES)) > 0) {
		val += 1 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ラモールシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_LAMORT_SHOES)) > 0) {
		val += 1 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「アンティマジックスーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ANTIMAGIC_SUIT)) > 0) {
		if (n_A_BODY_DEF_PLUS >= 9) {
			val += 2 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「プロテクトフェザー」の、素ＶＩＴによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_PROTECT_FEATHER)) > 0) {
		if (SU_VIT >= 120) {
			val += 3 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「登山靴」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TOZANGUTSU)) > 0) {
		val += 3 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「エクセリオンスーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_EXELION_SUIT)) > 0) {
		val += 4 * Math.floor(n_A_BODY_DEF_PLUS / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「スクトゥム」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SKTOM)) > 0) {
		if (n_A_SHIELD_DEF_PLUS >= 10) {
			val += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「貴族の仮面」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KIZOKUNO_KAMEN)) > 0) {
		if (n_A_BaseLV >= 100) {
			val += 1 * itemCount;
		}
		if (n_A_BaseLV >= 150) {
			val += 1 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「レクイエムスーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_REQUIEM_SUIT)) > 0) {
		if (n_A_BODY_DEF_PLUS >= 6) {
			val += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「レクイエムローブ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_REQUIEM_ROBE)) > 0) {
		if (n_A_BODY_DEF_PLUS >= 6) {
			val += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「レクイエムマント」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_REQUIEM_MANT)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 6) {
			val += 3 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「レクイエムブーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_REQUIEM_BOOTS)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 6) {
			val += 3 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「古びた風のささやき」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_FURUBITA_KAZENO_SASAYAKI)) > 0) {
		val += 1 * n_A_HEAD_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「エスランのシャツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ESLANNO_SHIRT)) > 0) {
		vartmp = 0;

		if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 4;
		if (n_A_SHOULDER_DEF_PLUS >= 8) vartmp += 6;
		if (n_A_SHOULDER_DEF_PLUS >= 9) vartmp += 8;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「執行者のマント」の、職業による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SHIKKOSHANO_MANT)) > 0) {
		if (IsSameJobClass(JOB_ID_GILOTINCROSS)) {
			vartmp = 0;

			vartmp += 15;
			if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 5;

			val += vartmp * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「エクセリオンレッグ」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_EXCELION_LEG)) > 0) {
		vartmp = 0;

		vartmp += 3 * Math.floor(n_A_SHOES_DEF_PLUS / 3);
		if (n_A_BaseLV >= 130) vartmp += 4;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「ポロロッカシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_POROROCA_SHOES)) > 0) {
		vartmp = 0;

		if (n_A_SHOES_DEF_PLUS >= 5) vartmp += 7;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 10;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「与一の肩掛け」の、職業による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_YOICHINO_KATAKAE)) > 0) {
		if (IsSameJobClass(JOB_ID_RANGER)) {
			vartmp = 0;

			vartmp += 15;
			if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 5;

			val += vartmp * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ギガントブーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GIGANT_BOOTS)) > 0) {
		vartmp = 0;

		if (n_A_SHOES_DEF_PLUS >= 5) vartmp += 4;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 4;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「裁きの靴」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SABAKINO_KUTSU)) > 0) {
		vartmp = 0;

		if (n_A_SHOES_DEF_PLUS >= 5) vartmp += 7;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 10;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「魔呪のメイル」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_MAZYUNO_MAIL)) > 0) {
		if (n_A_BODY_DEF_PLUS >= 7) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「リンドブルムの皮」の、素ＡＧＩと素ＶＩＴによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_LINDWURMNO_KAWA)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 8) {
			val += 1 * Math.floor((SU_AGI + SU_VIT) / 20) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ディーヴァマント」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_DIVA_MANT)) > 0) {
		vartmp = 0;

		if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 5;
		if (n_A_SHOULDER_DEF_PLUS >= 9) vartmp += 10;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「執行者のシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SHIKKOUSHANO_SHOES)) > 0) {
		vartmp = 0;

		if (n_A_SHOES_DEF_PLUS >= 5) vartmp += 7;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 10;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「悪魔崇拝者の靴」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_AKUMASUHAISHANO_KUTSU)) > 0) {
		vartmp = 0;

		if (n_A_SHOES_DEF_PLUS >= 5) vartmp += 7;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 10;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「巨人の加護」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KYOZINNO_KAGO)) > 0) {
		if (SU_STR >= 120) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ケミカルグローブ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_CHEMICAL_GLOVE)) > 0) {
		val += 2 * LearnedSkillSearch(SKILL_ID_CART_KAIZO) * itemCount;
	}

	//----------------------------------------------------------------
	// 「スナイピングベール」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SNIPING_VEIL)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 7) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「金剛石の靴」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KONGOSEKINO_KUTSU)) > 0) {
		val += 3 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「天狗の下駄」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TENGUNO_GETA)) > 0) {
		vartmp = 0;

		if (n_A_SHOES_DEF_PLUS >= 5) vartmp += 7;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 10;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「天狗の下駄」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TENGUNO_GETA)) > 0) {
		if (sklLv = LearnedSkillSearch(SKILL_ID_TENKETSU_KAI)) {
			val += 2 * sklLv * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ゴッズヘルム」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GODS_HELM)) > 0) {
		val += 1 * Math.floor(n_A_HEAD_DEF_PLUS / 1) * itemCount;
	}

	//----------------------------------------------------------------
	// 「エクセリオンシールド」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_EXELION_SHIELD)) > 0) {
		if (n_A_BaseLV >= 130) {
				val += 5;
		}
	}

	//----------------------------------------------------------------
	// 「禁忌の魔導書」の、スキル習得による強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KINKINO_MADOSHO)) > 0) {
		val += 2 * LearnedSkillSearch(SKILL_ID_ELEMENTAL_SYMPASY) * itemCount;
	}

	//----------------------------------------------------------------
	// 「英雄の指輪」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_EIYUNO_YUBIWA)) > 0) {
		if (SU_STR >= 120) val += 5 * itemCount;
	}

	//----------------------------------------------------------------
	// 「サバイバルシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SURVIVAL_SHOES)) > 0) {
		vartmp = 0;

		if (n_A_SHOES_DEF_PLUS >= 5) vartmp += 7;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 10;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「天邪鬼の鬼面」の、素ＤＥＸよる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_AMANOZYAKUNO_KIMEN)) > 0) {
		val += 1 * Math.floor(SU_DEX / 18) * itemCount;
	}

	//----------------------------------------------------------------
	// 「灰羽のブーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_HAIHANENO_BOOTS)) > 0) {
		vartmp = 0;

		if (n_A_SHOES_DEF_PLUS >= 5) vartmp += 7;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 10;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「用心棒のスカーフ」の、職業による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_YOZINBONO_SCARF)) > 0) {
		if (IsSameJobClass(JOB_ID_KAGERO) || IsSameJobClass(JOB_ID_OBORO)) {
			vartmp = 0;

			vartmp += 15;
			if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 5;

			val += vartmp * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ニーヴバレッタ」の、ベースレベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_VALLETTA)) > 0) {
		val += 1 * Math.floor(n_A_BaseLV / 25) * itemCount;
	}

	//----------------------------------------------------------------
	// 「スカラバハイヒール」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_SCARABA_HIGHHEEL)) > 0) {
		vartmp = 0;

		if (n_A_SHOES_DEF_PLUS >= 5) vartmp += 4;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 4;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「名も無き剣士のブーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_NAMONAKI_KENNSHINO_BOOTS)) > 0) {
		val += 2 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「猛炎と白魔の指輪」の、効果
	//----------------------------------------------------------------
	itemCountAccessary2 = EquipNumSearch(ITEM_ID_MOENTO_HAKUMANO_YUBIWA, EQUIP_REGION_ID_ACCESSARY_2);
	if (itemCountAccessary2 > 0) {
		val += 15 * itemCountAccessary2;
	}

	//----------------------------------------------------------------
	// 「巡礼者の靴」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ZYUNREISHANO_KUTSU)) > 0) {
		vartmp = 0;

		if (n_A_SHOES_DEF_PLUS >= 5) vartmp += 7;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 10;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「不死鳥の冠」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_FUSHICHONO_KANMURI)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_FORCE_OF_BANGUARD) >= 5) {
			val += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「新鮮な草のネックレス」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SHINSENNA_KUSANO_NECKLACE)) > 0) {

		sklLv = 0;

		sklLv += LearnedSkillSearch(SKILL_ID_PIKKI_TSUKI);
		sklLv += LearnedSkillSearch(SKILL_ID_ARCLOUSE_DASH);
		sklLv += LearnedSkillSearch(SKILL_ID_TAROUNO_KIZU);
		sklLv += LearnedSkillSearch(SKILL_ID_CARROT_BEAT);
		sklLv += LearnedSkillSearch(SKILL_ID_KEIKAI);
		sklLv += LearnedSkillSearch(SKILL_ID_MURENO_CHIKARA);
		sklLv += LearnedSkillSearch(SKILL_ID_SAVAGENO_TAMASHI);

		val += 1 * Math.floor(sklLv / 5) * itemCount;
	}

	//----------------------------------------------------------------
	// 「可愛い草のネックレス」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KAWAII_KUSANO_NECKLACE)) > 0) {

		sklLv = 0;

		sklLv += LearnedSkillSearch(SKILL_ID_SHINSENNA_EBI);
		sklLv += LearnedSkillSearch(SKILL_ID_EBI_ZANMAI);
		sklLv += LearnedSkillSearch(SKILL_ID_OTORO);
		sklLv += LearnedSkillSearch(SKILL_ID_MAGURO_SHIELD);
		sklLv += LearnedSkillSearch(SKILL_ID_GROOMING);
		sklLv += LearnedSkillSearch(SKILL_ID_NODOWO_NARASU);
		sklLv += LearnedSkillSearch(SKILL_ID_EBI_PARTY);

		val += 2 * Math.floor(sklLv / 5) * itemCount;
	}

	//----------------------------------------------------------------
	// 「魔力の草のネックレス」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_MARYOKUNO_KUSANO_NECKLACE)) > 0) {

		sklLv = 0;

		sklLv += LearnedSkillSearch(SKILL_ID_MATATABI_LANCE);
		sklLv += LearnedSkillSearch(SKILL_ID_MATATABINO_NEKKO);
		sklLv += LearnedSkillSearch(SKILL_ID_INUHAKKA_METEOR);
		sklLv += LearnedSkillSearch(SKILL_ID_INUHAKKA_SHOWER);
		sklLv += LearnedSkillSearch(SKILL_ID_CHATTERING);
		sklLv += LearnedSkillSearch(SKILL_ID_MYAUMYAU);
		sklLv += LearnedSkillSearch(SKILL_ID_NYAN_GRASS);

		val += 1 * Math.floor(sklLv / 5) * itemCount;
	}

	//----------------------------------------------------------------
	// 「抱きつきシャムネコ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_DAKITSUKI_SYAMNEKO)) > 0) {
		val += 1 * n_A_HEAD_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ドラムケープ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_DORAM_CAPE)) > 0) {
		val += 1 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「高級ドラムケープ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KOKYU_DORAM_CAPE)) > 0) {
		val += 1 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「特選ドラムケープ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TOKUSEN_DORAM_CAPE)) > 0) {
		val += 2 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「イリュージョンシューズ」の、ベースレベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_SHOES)) > 0) {
		if (n_A_BaseLV >= 170) {
			val += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「トラベラーシューズ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TRAVELER_SHOES)) > 0) {
		val += 2 * LearnedSkillSearch(SKILL_ID_FRIGNO_UTA) * itemCount;
	}

	//----------------------------------------------------------------
	// 「勇者のブローチ」の、職業による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_YUSHANO_BROACH)) > 0) {
		if (IsSameJobClass(JOB_ID_RUNEKNIGHT) || IsSameJobClass(JOB_ID_ROYALGUARD)) {
			val += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ヘヴンリーオーダー」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_HEAVENLY_ORDER)) > 0) {
		val += 2 * Math.floor(SU_STR / 18) * itemCount;
	}

	//----------------------------------------------------------------
	// 「イリュージョンブーツ」の、ベースレベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_BOOTS)) > 0) {
		if (n_A_BaseLV >= 170) {
			val += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「リングオブジュピター」の、素ＶＩＴによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_RING_OF_JUPITER, EQUIP_REGION_ID_ACCESSARY_2)) > 0) {
		val += 2 * Math.floor(SU_VIT / 10) * itemCount;
	}

	//----------------------------------------------------------------
	// 「イリュージョンゴヴニュの兜」の、ベースレベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_GOIBHNIUNO_KABUTO)) > 0) {
		if (n_A_BaseLV >= 170) {
			val += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「イリュージョンゴヴニュの鎧」の、ベースレベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_GOIBHNIUNO_YOROI)) > 0) {
		if (n_A_BaseLV >= 170) {
			val += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「イリュージョンゴヴニュの肩飾り」の、ベースレベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_GOIBHNIUNO_KATAKAZARI)) > 0) {
		if (n_A_BaseLV >= 170) {
			val += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「イリュージョンゴヴニュの軍靴」の、ベースレベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_GOIBHNIUNO_GUNKA)) > 0) {
		if (n_A_BaseLV >= 170) {
			val += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「イルシオンレッグI」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILUSION_LEG_1)) > 0) {
		if (n_A_BaseLV >= 170) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「イルシオンレッグII」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILUSION_LEG_2)) > 0) {
		if (n_A_BaseLV >= 170) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ガーディアンオブソウル」の、素ＡＧＩと素ＶＩＴによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GUARDIAN_OF_SOUL)) > 0) {
		val += 2 * Math.floor((SU_AGI + SU_VIT) / 18) * itemCount;
	}

	//----------------------------------------------------------------
	// 「ちゃぷちゃぷニャンプーハット」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_CHAPUCHAPU_NYANPU_HAT)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_EBI_PARTY) >= 5) {
			val += 30 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ファフニールブレス」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_FAFNIR_BREATH)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_DRAGON_TRAINING) >= 5) {
			val += 20 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「不死鳥のリング」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_FUSHICHONO_RING)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_KINGS_GRACE) >= 5) {
			val += 15 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ジャスパーリング」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_ZYASPER_RING)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_IGNITION_BREAK) >= 5) {
			val += 15 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「辰戌の腕輪」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_TATSUINUNO_UDEWA)) > 0) {
		val += 2 * LearnedSkillSearch(SKILL_ID_SENRYU_SHOTEN) * itemCount;
	}

	//----------------------------------------------------------------
	// 「正義の冠」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_SEIGINO_KANMURI)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_DEBOTION) >= 5) {
			val += 15 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「インペリアルメナススーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_MENUS_SUIT)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_FAINT_BOMB) >= 10) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「グレースメナススーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_MENUS_SUIT)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_FAINT_BOMB) >= 10) {
			val += 15 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「インペリアルレインストームスーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_RAINSTORM_SUIT)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_SEVERE_RAINSTORM) >= 5) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「グレースレインストームスーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_RAINSTORM_SUIT)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_SEVERE_RAINSTORM) >= 5) {
			val += 15 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「インペリアルスカルローブ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_SCULL_ROBE)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_SHIRYO_HYOI) >= 5) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「グレーススカルローブ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_SCULL_ROBE)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_SHIRYO_HYOI) >= 5) {
			val += 15 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「パラケルススグローブ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_PARACELSUS_GLOVE)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_CART_BOOST_GENETIC) >= 5) {
			val += 15 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「きらきらニャンニャンチョーカー」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KIRAKIRA_NYANNYAN_CHOKER)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_CHATTERING) >= 5) {
			val += 15 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「インペリアルコンフィデンシャルメイル」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_IMPERIAL_CONFIDENCIAL_MAIL)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_IGNITION_BREAK) >= 5) {
			val += 15 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「グレースコンフィデンシャルメイル」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GRACE_CONFIDENCIAL_MAIL)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_IGNITION_BREAK) >= 5) {
			val += 50 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ファフニールヘルム」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_FAFNIR_HELM)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_DRAGON_TRAINING) >= 5) {
			val += 25 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「もこふわシャークパジャマ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_MOKOFUWA_SHARK_PAJAMA)) > 0) {
		val += 10 * LearnedSkillSearch(SKILL_ID_GROOMING) * itemCount;
	}

	//----------------------------------------------------------------
	// 「トラベラーリング」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TRAVELER_RING)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_FRIGNO_UTA) >= 5) {
			val += 25 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ツインヘッド・ドラゴンメイル」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TWIN_HEAD_DRAGON_MAIL)) > 0) {
		val += 4 * LearnedSkillSearch(SKILL_ID_WATER_DRAGON_BREATH) * itemCount;
	}

	//----------------------------------------------------------------
	// 「ツインヘッド・ドラゴンブーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TWIN_HEAD_DRAGON_BOOTS)) > 0) {
		val += 4 * LearnedSkillSearch(SKILL_ID_WATER_DRAGON_BREATH) * itemCount;
	}
	
	//----------------------------------------------------------------
	// 「鬼神の盟友」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KISHINNO_MEIYU)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_SENRYU_SHOTEN) >= 10) {
			val += 25 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ミステリーウィング」の、素ステータスによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_MYSTERY_WING)) > 0) {
		if (GetTotalPureBasicStatus() >= 300) {
			val += 20 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「プラチナムアビトレイター」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_PLATINUM_ARBITRATOR)) > 0) {
		val += 8 * LearnedSkillSearch(SKILL_ID_INSPIRATION) * itemCount;
	}

	//----------------------------------------------------------------
	// 「りんりんニャンカーベル」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_RINRIN_NYAN_KABERU)) > 0) {		// りんりんニャンカーベル装備中
		val += 3 * LearnedSkillSearch(SKILL_ID_NODOWO_NARASU) * itemCount;	// のどを鳴らすが1上がる度に3%
	}



// 防具効果　ここまで
//------------------------------------------------------------------------------------------------
// カード効果　ここから

	//----------------------------------------------------------------
	// 「巨大ウィスパーカード」の、素ＶＩＴによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_KYODAI_WHISPER)) > 0) {
		if (SU_VIT >= 80) {
			val += 3 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「エリオットカード」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_ERIOT)) > 0) {
		switch (GetLowerJobSeriesID(n_A_JOB)) {
		case JOB_SERIES_ID_SWORDMAN:
		case JOB_SERIES_ID_THIEF:
		case JOB_SERIES_ID_MERCHANT:
			val += 5 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「銃奇兵カード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_ZYUKIHE)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 9) {
			val += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ゴールドオシドスカード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_GOLD_OSIDOS)) > 0) {
		if (n_A_SHOES_DEF_PLUS <= 4) {
			val += 4 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ランデル＝ロレンス（ＭＶＰ）カード」の、素ＩＮＴによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_RANDEL_RORENCE_MVP)) > 0) {
		if (SU_INT >= 110) {
			val += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「アルフォシオ＝バジルカード」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_ALFOSIO_BASIL)) > 0) {
		if (GetHigherJobSeriesID(n_A_JOB) == JOB_SERIES_ID_BARD) {
			val += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「トレンティーニカード」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_TRENTINI)) > 0) {
		if (GetHigherJobSeriesID(n_A_JOB) == JOB_SERIES_ID_DANCER) {
			val += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ブギスギスカード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_BUGISGIS)) > 0) {
		val += 1 * Math.floor(n_A_HEAD_DEF_PLUS / 2) * cardCount;
	}

	//----------------------------------------------------------------
	// 「変異のシーラカンスカード」の、精錬による効果（ペナルティ）
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_HENINO_COELACANTH)) > 0) {
		val += -1 * Math.floor(n_A_HEAD_DEF_PLUS / 2) * cardCount;
	}

	//----------------------------------------------------------------
	// 「[LoVA] ルールーカード」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_LOVA_RURU)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 7) {
			val += 1 * Math.floor(SU_STR / 60) * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「[LoVA] 真化ルールーカード」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_LOVA_SHINKA_RURU)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 7) {
			val += 1 * Math.floor(SU_STR / 20) * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「プレゼント包装担当者カード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_PRESENT_HOSOTANTOSHA)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 9) {
			val += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「不死の軍団カード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_FUSHINO_GUNDAN)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 9) {
			val += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「アークビショップマーガレッタ(MVP)カード」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_ARCH_BISHOP_MARGARETTE_MVP)) > 0) {
		if (IsSameJobClass(JOB_ID_ARCBISHOP)) {
			val += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「修羅チェン(MVP)カード」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_SHURA_CHENG_MVP)) > 0) {
		if (IsSameJobClass(JOB_ID_SHURA)) {
			val += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ソーサラーセリア(MVP)カード」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_SORCERER_CERIA_MVP)) > 0) {
		if (IsSameJobClass(JOB_ID_SORCERER)) {
			val += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ミンストレルアルフォシオ(MVP)カード」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_MINSTREL_ARFOSIO_MVP)) > 0) {
		if (IsSameJobClass(JOB_ID_MINSTREL)) {
			val += 15 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ワンダラートレンティーニ(MVP)カード」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_WANDERER_TRENTINI_MVP)) > 0) {
		if (IsSameJobClass(JOB_ID_WANDERER)) {
			val += 15 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ロックステップカード」の、素ＶＩＴによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_ROCKSTEP)) > 0) {
		val += 3 * Math.floor(SU_VIT / 20) * cardCount;
	}

	//----------------------------------------------------------------
	// 「獄エンチャント」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_GOKU)) > 0) {
		// 職業限定の効果
		if (IsSameJobClass(JOB_ID_GENETIC)) {
			val += 15;
		}
	}

	//----------------------------------------------------------------
	// 「ハートハンターカード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_HEART_HUNTER)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 9) {
			val += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「サイドライダーカード」の、素ＶＩＴによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_SIDE_RIDER)) > 0) {
		if (SU_VIT >= 120) {
			val += 5 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「サーペンタリウス」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_SERPENTARIUS, CARD_REGION_ID_HEAD_TOP)) > 0) {
		// 職業限定の効果
		if (IsSameJobClass(JOB_ID_SUMMONER)) {
			val += 2 * n_A_HEAD_DEF_PLUS * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「混沌のハンターフライカード」の、素ＡＧＩによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_KONTONNO_HUNTERFLY)) > 0) {
		val += 1 * Math.floor(SU_AGI / 10) * cardCount;
	}

	//----------------------------------------------------------------
	// 「下水クランプカード」の、素ＡＧＩによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_GESUI_CLAMP)) > 0) {
		val += 1 * Math.floor(SU_AGI / 10) * cardCount;
	}

// カード効果　ここまで
//------------------------------------------------------------------------------------------------
// エンチャント効果　ここから
// ★エンチャントは、複数の装備部位に適用される可能性を考慮すること

// ★エンチャントは、複数の装備部位に適用される可能性を考慮すること
// エンチャント効果　ここまで
//------------------------------------------------------------------------------------------------
// 装備セット効果　ここから

	//----------------------------------------------------------------
	// 「機械人形用増幅装置　エリオットカードセット」の、職業による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_KIKAININGYOYO_ZOFUKUSOCHI_KAI_ERIOT_CARD)) > 0) {
		switch (GetLowerJobSeriesID(n_A_JOB)) {
		case JOB_SERIES_ID_SWORDMAN:
		case JOB_SERIES_ID_THIEF:
		case JOB_SERIES_ID_MERCHANT:
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ホワイトフェザー　パイプタバコセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_WHITE_FEATHER_PIPE_TABACCO)) > 0) {
		vartmp = 0;

		if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 2;
		if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 2;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「ウルズプレート　アーティファクトセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_URUZ_PLATE_ARTIFACT)) > 0) {
		if ((n_A_BODY_DEF_PLUS >= 7) && (n_A_SHOULDER_DEF_PLUS >= 7) && (n_A_SHOES_DEF_PLUS >= 7)) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「黒羽のスーツ　アーティファクトセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_KUROHANO_SUIT_ARTIFACT)) > 0) {
		if ((n_A_BODY_DEF_PLUS >= 7) && (n_A_SHOULDER_DEF_PLUS >= 7) && (n_A_SHOES_DEF_PLUS >= 7)) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「スプリントグローブ　スプリントシューズセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_SPRINT_GLOVE_SPRINT_SHOES)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 7) {
			val += 2 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「リアンシューズ　リアンマントセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_LIEN_SHOES_LIEN_MANT)) > 0) {
		val += 1 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「フロワシューズ　フロワマントセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_FROID_SHOES_FROID_MANT)) > 0) {
		val += 1 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ソルシューズ　ソルマントセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_SOL_SHOES_SOL_MANT)) > 0) {
		val += 1 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「シャレールシューズ　シャレールマントセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_CHALEUR_SHOES_CHALEUR_MANT)) > 0) {
		val += 1 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ルヴァンシューズ　ルヴァンマントセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_LEVAIN_SHOES_LEVAIN_MANT)) > 0) {
		val += 1 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「プワゾンシューズ　プワゾンマントセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_POISON_SHOES_POISON_MANT)) > 0) {
		val += 1 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「リュミエールシューズ　リュミエールマントセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_LUMIERE_SHOES_LUMIERE_MANT)) > 0) {
		val += 1 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ソンブルシューズ　ソンブルマントセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_SOMBRE_SHOES_SOMBRE_MANT)) > 0) {
		val += 1 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「エスプリシューズ　エスプリマントセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_ESPRIT_SHOES_ESPRIT_MANT)) > 0) {
		val += 1 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ラモールシューズ　ラモールマントセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_LAMORT_SHOES_LAMORT_MANT)) > 0) {
		val += 1 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「古くピンク色のあれ　サンダルセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_FURUKU_PINKIRONO_ARE_SANDAL)) > 0) {
		val += 2 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「楯無の鎧　ＲＳＸ－０８０６カードセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_TATENASHINO_YOROI_RSX_0806)) > 0) {
		val += 5 * n_A_BODY_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「プロテクトフェザー　羽のベレーセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_PROTECT_FEATHER_HANENO_BERET)) > 0) {
		if (n_A_HEAD_DEF_PLUS >= 9) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「浮遊する賢者の石　アミストルキャップセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_FUYUSURU_KENZYONO_ISHI_AMISTRL_CAP)) > 0) {
		val += 1 * n_A_HEAD_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ハイレベル　銃奇兵カードセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_HIGHLEVEL_ZYUKIHE)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 9) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「アルティメットモードチェンジャー　ペオースプレートセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_ULTIMATE_MODE_CHANGER_PEORTH_PLATE)) > 0) {
		val += 1 * n_A_BODY_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ガーディアンプロセッサ　ガーディアンユニットセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_GUARDIAN_PROCESSOR_GUARDIAN_UNIT)) > 0) {
		vartmp = 0;

		if (n_A_BODY_DEF_PLUS >= 7) vartmp += 10;
		if (n_A_BODY_DEF_PLUS >= 9) vartmp += 10;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「暴徒のスカーフ　グラスセット」の、素ＡＧＩと素ＶＩＴによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_BOTONO_SCARF_GLASS)) > 0) {
		val += 5 * Math.floor((SU_AGI + SU_VIT) / 80) * itemCount;
	}

	//----------------------------------------------------------------
	// 「暴徒のスカーフ　サングラスセット」の、素ＡＧＩと素ＶＩＴによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_BOTONO_SCARF_SUNGLASS)) > 0) {
		val += 5 * Math.floor((SU_AGI + SU_VIT) / 80) * itemCount;
	}

	//----------------------------------------------------------------
	// 「業風石　ペオースプレートセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_GOFUSEKI_PEORTH_PLATE)) > 0) {
		vartmp = 0;

		if (n_A_BODY_DEF_PLUS >= 7) vartmp += 15;
		if (n_A_BODY_DEF_PLUS >= 9) vartmp += 15;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「エーギルリング　シューズセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_AEGIR_RING_AEGIR_SHOES)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 7) {
			val += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ニーヴバレッタ　ニーヴ武器セット」の、素ＶＩＴによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_NIEVE_VALLETTA_NIEVE_ARMS)) > 0) {
		val += 1 * Math.floor(SU_VIT / 10) * itemCount;
	}

	//----------------------------------------------------------------
	// 「ライオットチップ　Z-Knockbackセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_RIOTCHIP_Z_KNOCKBACK)) > 0) {
		val += 1 * Math.floor(n_A_HEAD_DEF_PLUS / 2) * itemCount;
	}

	//----------------------------------------------------------------
	// 「ライオットチップ　Z-Immortalセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_RIOTCHIP_Z_IMMORTAL)) > 0) {
		val += 1 * Math.floor(n_A_HEAD_DEF_PLUS / 2) * itemCount;
	}

	//----------------------------------------------------------------
	// 「ライオットチップ　Z-Killgainセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_RIOTCHIP_Z_KILLGAIN)) > 0) {
		val += 1 * Math.floor(n_A_HEAD_DEF_PLUS / 2) * itemCount;
	}

	//----------------------------------------------------------------
	// 「ライオットチップ　Z-Reincarnationセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_RIOTCHIP_Z_REINCARNATION)) > 0) {
		val += 1 * Math.floor(n_A_HEAD_DEF_PLUS / 2) * itemCount;
	}

	//----------------------------------------------------------------
	// 「ライオットチップ　Z-NoDispellセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_RIOTCHIP_Z_NODISPELL)) > 0) {
		val += 1 * Math.floor(n_A_HEAD_DEF_PLUS / 2) * itemCount;
	}

	//----------------------------------------------------------------
	// 「ライオットチップ　Z-Clairvoyanceセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_RIOTCHIP_Z_CLAIRVOYANCE)) > 0) {
		val += 1 * Math.floor(n_A_HEAD_DEF_PLUS / 2) * itemCount;
	}

	//----------------------------------------------------------------
	// 「ライオットチップ　Z-CastFixedセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_RIOTCHIP_Z_CASTFIXED)) > 0) {
		val += 1 * Math.floor(n_A_HEAD_DEF_PLUS / 2) * itemCount;
	}

	//----------------------------------------------------------------
	// 「フロンティアブーツ　大自然のギターセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_FRONTIER_BOOTS_DAISHIZENNO_GUITAR)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 7) {
			if (n_A_Weapon_ATKplus >= 7) {
				val += 10 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「フロンティアブーツ　大自然のロープセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_FRONTIER_BOOTS_DAISHIZENNO_ROPE)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 7) {
			if (n_A_Weapon_ATKplus >= 7) {
				val += 10 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「剛勇無双の神輿　剛勇無双の甲胄　セット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_GOYUMUSONO_MIKOSHI_GOYUMUSONO_KACCHU)) > 0) {
		val += 20 * Math.floor(n_A_BODY_DEF_PLUS / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「楯無の鎧　封印されたＲＳＸ－０８０６カードセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_TATENASHINO_YOROI_FUINSARETA_RSX_0806)) > 0) {
		val += 2 * n_A_BODY_DEF_PLUS * itemCount;
	}



// 装備セット効果　ここまで
//------------------------------------------------------------------------------------------------
// 自己スキル効果ここから

	//----------------------------------------------------------------
	// 「ロイヤルガード　フォースオブバンガード」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_FORCE_OF_BANGUARD)) > 0) {
		val += 3 * sklLv;
	}

	//----------------------------------------------------------------
	// 「修羅　潜龍昇天」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_SENRYU_SHOTEN)) > 0) {
		val += 2 + sklLv;
	}

	//----------------------------------------------------------------
	// 「修羅　点穴 -反-」の、効果（ペナルティ）
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_TENKETSU_HAN)) > 0) {
		val += -4 * sklLv;
	}

	//----------------------------------------------------------------
	// 「修羅　点穴 -活-」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_TENKETSU_KATSU)) > 0) {
		val += 2 * sklLv;
	}

	//----------------------------------------------------------------
	// 「ソーサラー　精霊（Passive）」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_SERE)) > 0) {
		// 地Ｌｖ１～地Ｌｖ３のパッシブモードの場合、ＡＴＫ上昇
		if (UsedSkillSearch(SKILL_ID_SERE_MODE) == 1) {
			if(sklLv == 10) val += 5;
			if(sklLv == 11) val += 10;
			if(sklLv == 12) val += 15;
		}
	}

	//----------------------------------------------------------------
	// 「ソーサラー　精霊補助スキル（パワーオブガイア）」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL)) > 0) {
		if (sklLv == 35) {
			val += 20;
		}
	}

	//----------------------------------------------------------------
	// 「星帝　月の構え」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_TSUKINO_KAMAE)) > 0) {
		val += -5 + 10 * sklLv;
	}

// 自己スキル効果　ここまで
//------------------------------------------------------------------------------------------------
// 支援スキル効果　ここから

	//----------------------------------------------------------------
	// 「支援デリュージ」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_DELUGE)) > 0) {
		var valary = [0, 5, 9, 12, 14, 15];
		val += valary[bufLv];
	}

	//----------------------------------------------------------------
	// 「支援ゴスペル　ＨＰアップ」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_GOSPEL_HP_UP)) > 0) {
		val += 100;
	}

	//----------------------------------------------------------------
	// 「支援イドゥンの林檎」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_IDUNNNO_RINGO)) > 0) {
		var bufferVitRank = ExBuffNumSearch(EXBUF_ID_IDUNNNO_RINGO_BUFFER_VITRANK);
		bufferSkillLv = ExBuffNumSearch(EXBUF_ID_IDUNNNO_RINGO_BUFFER_SKILLLV);

		val += 5 + bufLv * 2 + Math.floor(bufferSkillLv / 2) + bufferVitRank;
	}

	//----------------------------------------------------------------
	// 「支援フリッグの歌」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_FRIGGNO_UTA)) > 0) {

		// 特定の戦闘エリアでの補正
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
			val += 75 + 5 * bufLv;
			break;

		default:
			val += 5 * bufLv;
			break;

		}
	}

	//----------------------------------------------------------------
	// 「支援ビヨンドオブウォークライ（敵から）」の、効果（ペナルティ）
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_BEYOND_OF_WARCRAY)) > 0) {
		var bufferCount = ExBuffNumSearch(EXBUF_ID_BEYOND_OF_WARCRAY_COUNT_OF_MINWAN);
		val += -4 * (bufLv + Math.min(7, bufferCount) - 2);
	}

	//----------------------------------------------------------------
	// 「支援エピクレシス」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_ODINNO_EPICLESIS)) > 0) {

		// 特定の戦闘エリアでの補正
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
			val += 20 * bufLv;
			break;

		default:
			val += 5 * bufLv;
			break;

		}
	}

	//----------------------------------------------------------------
	// 「戦闘薬」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_SENTOYAKU)) > 0) {
		if (bufLv == 1) val += -3;
		if (bufLv == 2) val += -5;
	}

	//----------------------------------------------------------------
	// 「ＯＴＰログインボーナス支援　レインボー」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_OTP_LOGIN_BONUS)) > 0) {

		if (bufLv == 4) {

			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_GVG:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_GVG_TE:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
				break;

			default:
				val += 20;
				break;
			}
		}
	}

	//----------------------------------------------------------------
	// 「性能カスタマイズ　ＭａｘＨＰ％」の、効果（マイナスを許容）
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_CUSTOM_HP_UP)) != 0) {
		val += bufLv;
	}



	// TODO: 四次対応
	for (idx = ITEM_SP_MAXHP_UP; idx <= ITEM_SP_MAXHP_UP; idx++) {
		val = ApplySpecModify(idx, val);
	}

// 支援スキル効果　ここまで
//------------------------------------------------------------------------------------------------

	return val;
}






//================================================================================================
//================================================================================================
//====
//==== ＭａｘＳＰ　＋○○　ここから
//====
//================================================================================================
//================================================================================================
/**
* 装備等によるステータスの追加補正値を取得する（ＭａｘＳＰ＋）.
*/
function GetStatusModifyMaxSpPlus() {

	var val = 0;

	var vartmp = 0, varary = [];
	var itemCount = 0;
	var itemCountRight = 0, itemCountLeft = 0;
	var itemCountHeadTop = 0, itemCountHeadMid = 0, itemCountHeadUnder = 0;
	var itemCountShield = 0, itemCountBody = 0, itemCountShoulder = 0, itemCountShoes = 0;
	var itemCountAccessary1 = 0, itemCountAccessary2 = 0;
	var cardCount = 0;
	var cardCountRight = 0, cardCountLeft = 0;
	var cardCountHeadTop = 0, cardCountHeadMid = 0, cardCountHeadUnder = 0;
	var cardCountShield = 0, cardCountBody = 0, cardCountShoulder = 0, cardCountShoes = 0;
	var cardCountAccessary1 = 0, cardCountAccessary2 = 0;
	var sklLv = 0;
	var bufLv = 0;
	var bufferJobLv = 0, bufferSkillLv = 0;




	//----------------------------------------------------------------
	// ランダムエンチャント効果
	//----------------------------------------------------------------
	val += GetRndOptTotalValue(ITEM_SP_MAXSP_PLUS, null, false);
	// val += GetRndEnchValue(ITEM_SP_MAXSP_PLUS);

//------------------------------------------------------------------------------------------------
// 武器効果　ここから
// ★武器は両手に装備される可能性（アサシン、影狼など）を考慮すること

	//----------------------------------------------------------------
	// 「スタッフオブカーシング」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_STUFF_OF_CURSING, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_STUFF_OF_CURSING, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		if (n_A_Weapon_ATKplus >= 9) val += 300 * itemCountRight;
		if (n_A_Weapon2_ATKplus >= 9) val += 300 * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「古代樹の杖」の、精錬による効果（ペナルティ）
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_KODAIZYUNO_TSUE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_KODAIZYUNO_TSUE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		if (n_A_Weapon_ATKplus >= 6) val += -100 * itemCountRight;
		if (n_A_Weapon2_ATKplus >= 6) val += -100 * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ヴァルキリーハンマー」の、職業による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_VALKYRIE_HAMMER, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_VALKYRIE_HAMMER, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		switch (GetLowerJobSeriesID(n_A_JOB)) {

		// ノービス系
		case JOB_SERIES_ID_NOVICE:
			val += 200 * itemCountRight;
			val += 200 * itemCountLeft;
			break;

		// ソードマン系
		case JOB_SERIES_ID_SWORDMAN:
			val += 100 * itemCountRight;
			val += 100 * itemCountLeft;
			break;

		// マーチャント系
		case JOB_SERIES_ID_MERCHANT:
			break;

		default:
			switch (GetHigherJobSeriesID(n_A_JOB)) {

			// プリースト系
			case JOB_SERIES_ID_PRIEST:
				break;

			// モンク系
			case JOB_SERIES_ID_MONK:
				val += 200 * itemCountRight;
				val += 200 * itemCountLeft;
				break;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ヴァルキリーナイフ」の、職業による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_VALKYRIE_KNIFE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		switch (GetLowerJobSeriesID(n_A_JOB)) {

		// ノービス系
		case JOB_SERIES_ID_NOVICE:
			val += (300 + 20 * n_A_Weapon_ATKplus) * itemCountRight;
			val += (300 + 20 * n_A_Weapon_ATKplus) * itemCountLeft;
			break;

		// マジシャン系
		case JOB_SERIES_ID_MAGICIAN:
			val += 20 * n_A_Weapon_ATKplus * itemCountRight;
			val += 20 * n_A_Weapon_ATKplus * itemCountLeft;
			break;

		// シーフ系
		case JOB_SERIES_ID_THIEF:
			val += 100 * itemCountRight;
			val += 100 * itemCountLeft;
			break;

		default:
			switch (GetHigherJobSeriesID(n_A_JOB)) {

			// ハンター系
			case JOB_SERIES_ID_HUNTER:
				break;

			// バード系、ダンサー系
			case JOB_SERIES_ID_BARD:
			case JOB_SERIES_ID_DANCER:
				break;
			}
		}
	}

	//----------------------------------------------------------------
	// 「日月神示」の、精錬による強化
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_HITSUKISHINZI, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_HITSUKISHINZI, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 50 * n_A_Weapon_ATKplus * itemCountRight;
		val += 50 * n_A_Weapon2_ATKplus * itemCountLeft;
	}

// ★武器は両手に装備される可能性（アサシン、影狼など）を考慮すること
// 武器効果　ここまで
//------------------------------------------------------------------------------------------------
// 防具効果　ここから

	//----------------------------------------------------------------
	// 「ヴァルキリーシューズ」の、職業による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_VALKIRIE_SHOES)) > 0) {
		switch (GetLowerJobSeriesID(n_A_JOB)) {
		case JOB_SERIES_ID_SWORDMAN:
		case JOB_SERIES_ID_THIEF:
		case JOB_SERIES_ID_MERCHANT:
			val += 2 * n_A_JobLV * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「エーギルシューズ」の、職業による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_AEGIR_SHOES)) > 0) {
		switch (GetLowerJobSeriesID(n_A_JOB)) {
		case JOB_SERIES_ID_SWORDMAN:
		case JOB_SERIES_ID_THIEF:
		case JOB_SERIES_ID_MERCHANT:
			val += 2 * n_A_JobLV * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「アカデミーバッジ」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ACADEMY_BADGE)) > 0) {
		if (n_A_BaseLV <= 79) {
			val += 200 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ブリュンヒルデ」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_BRUNHILD)) > 0) {
		val += 5 * n_A_BaseLV * itemCount;
	}

	//----------------------------------------------------------------
	// 「アコライトフィギュア」の、職業による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ACOLYTE_FIGURE)) > 0) {
		if (GetLowerJobSeriesID(n_A_JOB) == JOB_SERIES_ID_ACOLYTE) {
			val += 50 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「カメレオンアーマー」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_CHAMELEON_ARMER)) > 0) {
		val += 1 * Math.floor(n_A_BaseLV / 2) * itemCount;
	}

	//----------------------------------------------------------------
	// 「スキンオブシャドウ」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SKIN_OF_SHADOW)) > 0) {
		val += 1 * (Math.floor(n_A_BaseLV / 3) + (10 * n_A_SHOULDER_DEF_PLUS)) * itemCount;
	}

	//----------------------------------------------------------------
	// 「通学バッグ」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TSUGAKU_BAG)) > 0) {
		if (n_A_BaseLV <= 79) {
			val += 100 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ギャラクシーサークレット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GALAXY_CIRCLET)) > 0) {
		val += 10 * n_A_HEAD_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「時空ブーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ZIKU_BOOTS)) > 0) {
		val += 10 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「力の時空ブーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_CHIKARANO_ZIKU_BOOTS)) > 0) {
		val += 10 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}
	if ((itemCount = EquipNumSearch(ITEM_ID_CHIKARANO_ZIKU_BOOTS_S1)) > 0) {
		val += 10 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「知力の時空ブーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_CHIRYOKUNO_ZIKU_BOOTS)) > 0) {
		val += 10 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}
	if ((itemCount = EquipNumSearch(ITEM_ID_CHIRYOKUNO_ZIKU_BOOTS_S1)) > 0) {
		val += 10 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「俊敏の時空ブーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SHUNBINNO_ZIKU_BOOTS)) > 0) {
		val += 10 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}
	if ((itemCount = EquipNumSearch(ITEM_ID_SHUNBINNO_ZIKU_BOOTS_S1)) > 0) {
		val += 10 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「体力の時空ブーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TAIRYOKUNO_ZIKU_BOOTS)) > 0) {
		val += 10 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}
	if ((itemCount = EquipNumSearch(ITEM_ID_TAIRYOKUNO_ZIKU_BOOTS_S1)) > 0) {
		val += 10 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「技巧の時空ブーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GIKONO_ZIKU_BOOTS)) > 0) {
		val += 10 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}
	if ((itemCount = EquipNumSearch(ITEM_ID_GIKONO_ZIKU_BOOTS_S1)) > 0) {
		val += 10 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「幸運の時空ブーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KOUNNO_ZIKU_BOOTS)) > 0) {
		val += 10 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}
	if ((itemCount = EquipNumSearch(ITEM_ID_KOUNNO_ZIKU_BOOTS_S1)) > 0) {
		val += 10 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「[衣装]ビギナー帽」の、ベースレベルによる効果（ペナルティ）
	//----------------------------------------------------------------
	if ((itemCount = CostumeNumSearch(COSTUME_ID_BEGINNER_BO)) > 0) {

		if (n_A_BaseLV >= 99) {
			val += -200 * itemCount;
		}
		else {

			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_GVG:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_GVG_TE:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
				val += -200 * itemCount;
				break;

			default:
				val += -20 * Math.floor(n_A_BaseLV / 10) * itemCount;
				break;

			}
		}
	}

	//----------------------------------------------------------------
	// 「皇竜の天翼」の、職業による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KORYUNO_TENYOKU)) > 0) {
		switch (GetLowerJobSeriesID(n_A_JOB)) {
		case JOB_SERIES_ID_NOVICE:
		case JOB_SERIES_ID_TAEGKUON:
		case JOB_SERIES_ID_NINJA:
		case JOB_SERIES_ID_GUNSLINGER:
			val += 100 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ミラージュシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_MIRRORAGE_SHOES)) > 0) {
		vartmp = 0;

		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 100;
		if (n_A_SHOES_DEF_PLUS >= 9) vartmp += 200;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「ドレイクコート」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_DRAKE_COAT)) > 0) {
		vartmp = 0;

		if (n_A_BODY_DEF_PLUS >= 7) vartmp += 100;
		if (n_A_BODY_DEF_PLUS >= 9) vartmp += 150;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「エンジェリングスーツ」の、レベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ANGELING_SUITS)) > 0) {
		if (n_A_BaseLV >= 100) {
			val += 5 * (n_A_BaseLV - 99);
		}
	}

	//----------------------------------------------------------------
	// 「ゴーストリングスーツ」の、レベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GHOSTRING_SUITS)) > 0) {
		if (n_A_BaseLV >= 100) {
			val += 5 * (n_A_BaseLV - 99);
		}
	}


// 防具効果　ここまで
//------------------------------------------------------------------------------------------------
// カード効果　ここから

	//----------------------------------------------------------------
	// 「ジェスターカード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_JESTER, CARD_REGION_ID_HEAD_TOP_ANY)) > 0) {
		if (n_A_HEAD_DEF_PLUS >= 9) {
			val += 150 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ブルーオシドスカード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_BLUE_OSIDOS, CARD_REGION_ID_HEAD_TOP_ANY)) > 0) {
		if (n_A_HEAD_DEF_PLUS <= 4) {
			val += 40 * cardCount;
		}
	}
	if ((cardCount = CardNumSearch(CARD_ID_BLUE_OSIDOS, CARD_REGION_ID_HEAD_MID_ANY)) > 0) {
		val += 40 * cardCount;
	}

	//----------------------------------------------------------------
	// 「バンシーカード」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_BANSHEE)) > 0) {
		if (GetLowerJobSeriesID(n_A_JOB) == JOB_SERIES_ID_MAGICIAN) {
			val += 100 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「アガヴカード」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_AGAVE)) > 0) {
		if (GetLowerJobSeriesID(n_A_JOB) == JOB_SERIES_ID_MAGICIAN) {
			val += 100 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「エナジー＜守護竜＞」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_ENCHANT_ENERGY_SHUGORYU)) > 0) {
		val += 1 * (Math.floor(n_A_BaseLV / 3) + (10 * n_A_SHOULDER_DEF_PLUS)) * cardCount;
	}

	//----------------------------------------------------------------
	// 「古のフレイムシューターカード」の、素ＳＴＲよる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_INISHIENO_FLAME_SHOOTER)) > 0) {
		val += 20 * Math.floor(SU_STR / 10) * cardCount;
	}

// カード効果　ここまで
//------------------------------------------------------------------------------------------------
// エンチャント効果　ここから
// ★エンチャントは、複数の装備部位に適用される可能性を考慮すること

	//----------------------------------------------------------------
	// 「エンチャント　安息のニーヴ(精神)」の、精錬による効果
	//----------------------------------------------------------------
	cardCountRight	  = CardNumSearch(CARD_ID_ENCHANT_ANSOKUNO_NIEVE_SEISHIN, CARD_REGION_ID_ARMS_RIGHT_ANY);
	cardCountLeft	  = CardNumSearch(CARD_ID_ENCHANT_ANSOKUNO_NIEVE_SEISHIN, CARD_REGION_ID_ARMS_LEFT_ANY);
	cardCountHeadTop  = CardNumSearch(CARD_ID_ENCHANT_ANSOKUNO_NIEVE_SEISHIN, CARD_REGION_ID_HEAD_TOP_ANY);
	cardCountShield	  = CardNumSearch(CARD_ID_ENCHANT_ANSOKUNO_NIEVE_SEISHIN, CARD_REGION_ID_SHIELD_ANY);
	cardCountBody	  = CardNumSearch(CARD_ID_ENCHANT_ANSOKUNO_NIEVE_SEISHIN, CARD_REGION_ID_BODY_ANY);
	cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_ANSOKUNO_NIEVE_SEISHIN, CARD_REGION_ID_SHOULDER_ANY);
	cardCountShoes	  = CardNumSearch(CARD_ID_ENCHANT_ANSOKUNO_NIEVE_SEISHIN, CARD_REGION_ID_SHOES_ANY);
	if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield
		+ cardCountBody + cardCountShoulder + cardCountShoes > 0) {

		// 右手武器へのエンチャント
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 6) vartmp += 20;
		if (n_A_Weapon_ATKplus >= 8) vartmp += 50;
		val += vartmp * cardCountRight

		// 左手武器へのエンチャント
		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 6) vartmp += 20;
		if (n_A_Weapon2_ATKplus >= 8) vartmp += 50;
		val += vartmp * cardCountLeft

		// 頭防具へのエンチャント
		vartmp = 0;
		if (n_A_HEAD_DEF_PLUS >= 6) vartmp += 20;
		if (n_A_HEAD_DEF_PLUS >= 8) vartmp += 50;
		val += vartmp * cardCountHeadTop

		// 盾防具へのエンチャント
		vartmp = 0;
		if (n_A_SHIELD_DEF_PLUS >= 6) vartmp += 20;
		if (n_A_SHIELD_DEF_PLUS >= 8) vartmp += 50;
		val += vartmp * cardCountShield

		// 体防具へのエンチャント
		vartmp = 0;
		if (n_A_BODY_DEF_PLUS >= 6) vartmp += 20;
		if (n_A_BODY_DEF_PLUS >= 8) vartmp += 50;
		val += vartmp * cardCountBody

		// 肩防具へのエンチャント
		vartmp = 0;
		if (n_A_SHOULDER_DEF_PLUS >= 6) vartmp += 20;
		if (n_A_SHOULDER_DEF_PLUS >= 8) vartmp += 50;
		val += vartmp * cardCountShoulder

		// 靴防具へのエンチャント
		vartmp = 0;
		if (n_A_SHOES_DEF_PLUS >= 6) vartmp += 20;
		if (n_A_SHOES_DEF_PLUS >= 8) vartmp += 50;
		val += vartmp * cardCountShoes

		// アクセサリへのエンチャント
		// 精錬できないので処理不要
	}

// ★エンチャントは、複数の装備部位に適用される可能性を考慮すること
// エンチャント効果　ここまで
//------------------------------------------------------------------------------------------------
// 装備セット効果　ここから

	//----------------------------------------------------------------
	// 「クイールペンリング　スモールブックペンダントセット」の、ジョブレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_QUILL_PENRING_SMALL_BOOK_PENDANT)) > 0) {
		val += 1 * n_A_JobLV * itemCount;
	}

	//----------------------------------------------------------------
	// 「星タマゴバッジ　アカデミーバッジセット」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_HOSHITAMAGO_BADGE_ACADEMY_BADGE)) > 0) {
		if (n_A_BaseLV <= 79) {
			val += 150 * itemCount;
		}
		else {
			val += 50 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「飛行船スーツセット」の、精錬による強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_HIKOSEN_SUIT_HIKOSEN_MANT_HIKOSEN_BOOTS)) > 0) {
		vartmp = 0;

		var refinedtotal = n_A_BODY_DEF_PLUS + n_A_SHOULDER_DEF_PLUS + n_A_SHOES_DEF_PLUS;
		if (refinedtotal >= 15)  vartmp += 30;
		if (refinedtotal >= 20)  vartmp += 100;
		if (refinedtotal >= 25)  vartmp += 200;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「ペルロックのスーツセット」の、精錬による強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_PELLROCKNO_SUIT_PELLROCKNO_MANT_PELLROCKNO_BOOTS)) > 0) {
		vartmp = 0;

		var refinedtotal = n_A_BODY_DEF_PLUS + n_A_SHOULDER_DEF_PLUS + n_A_SHOES_DEF_PLUS;
		if (refinedtotal >= 15)  vartmp += 30;
		if (refinedtotal >= 20)  vartmp += 100;
		if (refinedtotal >= 25)  vartmp += 200;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「スカラバハイヒール　カルガメイスセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_SET_ID_SCARABA_HIGHHEEL_CARGA_MACE)) > 0) {
		vartmp = 0;

		if (n_A_Weapon_ATKplus >= 7)  vartmp += 400;
		if (n_A_Weapon_ATKplus >= 9)  vartmp += 600;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「王者セット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_OZYANO_MAIL_OZYANO_MANT_OZYANO_BOOTS)) > 0) {
		val += 5 * n_A_BaseLV * itemCount;
	}


// 装備セット効果　ここまで
//------------------------------------------------------------------------------------------------
// 自己スキル効果ここから

	//----------------------------------------------------------------
	// 「ソウルリンカー　カイナ」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_KAINA)) > 0) {
		val += 30 * sklLv;
	}

	//----------------------------------------------------------------
	// 「レンジャー　トラップ研究」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_TRAP_KENKYU)) > 0) {
		val += 200 + 20 * sklLv;
	}

	//----------------------------------------------------------------
	// 「ミンストレル／ワンダラー　レッスン」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_LESSON)) > 0) {
		val += 30 * sklLv;
	}

	//----------------------------------------------------------------
	// 「サモナー　にゃん魂」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_NYAN_TAMASHI)) > 0) {
		val += 200;
	}

	//----------------------------------------------------------------
	// 「サモナー　海の力」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_UMINO_CHIKARA)) > 0) {
		val += 100;

		if (UsedSkillSearch(SKILL_ID_SEAFOOD_KEI_SHUTOKU_LEVEL_GOKEI) >= 20) {
			val += 300;
		}
	}

	//----------------------------------------------------------------
	// 「スーパーノービス＋　ブレイクスルー」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_BREAK_THROUGH)) > 0) {
		val += 30 * sklLv;

		if (sklLv >= 5) {
			val += 50;
		}
	}

	//----------------------------------------------------------------
	// 「スーパーノービス＋　トランセンデンス」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_TRANSCENDENCE)) > 0) {
		val += 30 * sklLv;

		if (sklLv >= 5) {
			val += 50;
		}
	}

// 自己スキル効果　ここまで
//------------------------------------------------------------------------------------------------
// 支援スキル効果　ここから

	//----------------------------------------------------------------
	// 「性能カスタマイズ　ＭａｘＳＰ＋」の、効果（マイナスを許容）
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_CUSTOM_SP_PLUS)) != 0) {
		val += bufLv;
	}

// 支援スキル効果　ここまで
//------------------------------------------------------------------------------------------------

	return val;
}





//================================================================================================
//================================================================================================
//====
//==== ＭａｘＳＰ　％ＵＰ　ここから
//====
//================================================================================================
//================================================================================================
/**
* 装備等によるステータスの追加補正値を取得する（ＭａｘＳＰ％）.
*/
function GetStatusModifyMaxSpUp() {

	var val = 0;

	var vartmp = 0, varary = [];
	var itemCount = 0;
	var itemCountRight = 0, itemCountLeft = 0;
	var itemCountHeadTop = 0, itemCountHeadMid = 0, itemCountHeadUnder = 0;
	var itemCountShield = 0, itemCountBody = 0, itemCountShoulder = 0, itemCountShoes = 0;
	var itemCountAccessary1 = 0, itemCountAccessary2 = 0;
	var cardCount = 0;
	var cardCountRight = 0, cardCountLeft = 0;
	var cardCountHeadTop = 0, cardCountHeadMid = 0, cardCountHeadUnder = 0;
	var cardCountShield = 0, cardCountBody = 0, cardCountShoulder = 0, cardCountShoes = 0;
	var cardCountAccessary1 = 0, cardCountAccessary2 = 0;
	var sklLv = 0;
	var bufLv = 0;
	var bufferJobLv = 0, bufferSkillLv = 0;



	//----------------------------------------------------------------
	// ランダムエンチャント効果
	//----------------------------------------------------------------
	val += GetRndOptTotalValue(ITEM_SP_MAXSP_UP, null, false);
	// val += GetRndEnchValue(ITEM_SP_MAXSP_UP);

//------------------------------------------------------------------------------------------------
// 武器効果　ここから
// ★武器は両手に装備される可能性（アサシン、影狼など）を考慮すること

	//----------------------------------------------------------------
	// 「ブルートダマスカス」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_DUMASCUS, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_DUMASCUS, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルートスピア」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_SPEAR, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_SPEAR, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルートクリーヴァー」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_CLEAVER, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_CLEAVER, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルートモーニングスター」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_MORNINGSTAR, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_MORNINGSTAR, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルートアークワンド」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_ARCWAND, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_ARCWAND, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルートハンドガン」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_HANDGUN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_HANDGUN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルートライフル」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_RIFLE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_RIFLE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルートガトリングガン」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_GATLINGGUN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_GATLINGGUN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルートショットガン」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_SHOTGUN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_SHOTGUN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルートグレネードガン」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_GRENADEGUN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_GRENADEGUN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルートハンターボウ」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_HUNTER_BOW, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_HUNTER_BOW, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルートギター」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_GUITAR, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_GUITAR, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルートラリエット」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_RARIET, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_RARIET, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルート風魔手裏剣」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_FUMASHURIKEN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_FUMASHURIKEN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ブルートカタール」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_KATAR, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_KATAR, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 10) vartmp += 15;
		val += vartmp * itemCountLeft;
	}

// ★武器は両手に装備される可能性（アサシン、影狼など）を考慮すること
// 武器効果　ここまで
//------------------------------------------------------------------------------------------------
// 防具効果　ここから

	//----------------------------------------------------------------
	// 「グロリアス量産型シューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GLORIOUS_RYOSANGATA_SHOES)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 7) {
			val += 7 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「魔法のストール」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_MAHONO_STOLE)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 6) {
			val += 3 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ネクタルスーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_NECTAR_SUIT)) > 0) {
		val += 1 * Math.floor(n_A_BODY_DEF_PLUS / 2) * itemCount;
	}

	//----------------------------------------------------------------
	// 「ＢＯＳＳ帽」の、精錬による効果（ペナルティ）
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_BOSS_BO)) > 0) {
		vartmp = 0;

		vartmp += -2 * Math.max(0, n_A_HEAD_DEF_PLUS - 4);
		if (n_A_HEAD_DEF_PLUS >= 10) {
			vartmp += -3;
		}

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「希望の上履き」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KIBONO_UWABAKI)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 6) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「機械人形用増幅装置・改」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KIKAININGYOYO_ZOFUKUSOCHI_KAI)) > 0) {
		val += 1 * Math.max(0, (n_A_SHOULDER_DEF_PLUS - 5)) * itemCount;
	}


	//----------------------------------------------------------------
	// 「リアンシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_LIEN_SHOES)) > 0) {
		val += 1 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「フロワシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_FROID_SHOES)) > 0) {
		val += 1 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ソルシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SOL_SHOES)) > 0) {
		val += 1 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「シャレールシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_CHALEUR_SHOES)) > 0) {
		val += 1 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ルヴァンシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_LEVAIN_SHOES)) > 0) {
		val += 1 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「プワゾンシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_POISON_SHOES)) > 0) {
		val += 1 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「リュミエールシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_LUMIERE_SHOES)) > 0) {
		val += 1 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ソンブルシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SOMBRE_SHOES)) > 0) {
		val += 1 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「エスプリシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ESPRIT_SHOES)) > 0) {
		val += 1 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ラモールシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_LAMORT_SHOES)) > 0) {
		val += 1 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「登山靴」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TOZANGUTSU)) > 0) {
		val += 3 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「スクトゥム」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SKTOM)) > 0) {
		if (n_A_SHIELD_DEF_PLUS >= 10) {
			val += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「執行者のマント」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SHIKKOSHANO_MANT)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 9) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「エクセリオンレッグ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_EXCELION_LEG)) > 0) {
		vartmp = 0;

		vartmp += 3 * Math.floor(n_A_SHOES_DEF_PLUS / 3);
		if (n_A_BaseLV >= 130) {
			vartmp += 4;
		}

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「ポロロッカシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_POROROCA_SHOES)) > 0) {
		vartmp = 0;

		if (n_A_SHOES_DEF_PLUS >= 5) vartmp += 7;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 10;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「与一の肩掛け」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_YOICHINO_KATAKAE)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 9) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ギガントブーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_GIGANT_BOOTS)) > 0) {
		vartmp = 0;

		if (n_A_SHOES_DEF_PLUS >= 5) vartmp += 4;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 4;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「裁きの靴」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SABAKINO_KUTSU)) > 0) {
		vartmp = 0;

		if (n_A_SHOES_DEF_PLUS >= 5) vartmp += 7;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 10;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「魔呪のメイル」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_MAZYUNO_MAIL)) > 0) {
		if (n_A_BODY_DEF_PLUS >= 7) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「バリアントシューズ」の、精錬による効果（ペナルティ）
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_VARIANT_SHOES)) > 0) {
		val += -1 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ミラージュマント」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_MIRRORAGE_MANT)) > 0) {
		vartmp = 0;

		if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 5;
		if (n_A_SHOULDER_DEF_PLUS >= 9) vartmp += 10;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「執行者のシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SHIKKOUSHANO_SHOES)) > 0) {
		vartmp = 0;

		if (n_A_SHOES_DEF_PLUS >= 5) vartmp += 7;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 10;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「悪魔崇拝者の靴」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_AKUMASUHAISHANO_KUTSU)) > 0) {
		vartmp = 0;

		if (n_A_SHOES_DEF_PLUS >= 5) vartmp += 7;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 10;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「巨人の加護」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KYOZINNO_KAGO)) > 0) {
		if (SU_STR >= 120) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「Y.S.F.0.1.グリーヴ」の、精錬による強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_YSF01_GREEVE)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 9) {
			val += 15 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「スナイピングベール」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SNIPING_VEIL)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 9) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「金剛石の靴」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KONGOSEKINO_KUTSU)) > 0) {
		val += 3 * Math.floor(n_A_SHOES_DEF_PLUS / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「天狗の下駄」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TENGUNO_GETA)) > 0) {
		vartmp = 0;

		if (n_A_SHOES_DEF_PLUS >= 5) vartmp += 7;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 10;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「エクセリオンシールド」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_EXELION_SHIELD)) > 0) {
		if (n_A_BaseLV >= 130) {
				val += 5;
		}
	}

	//----------------------------------------------------------------
	// 「禁忌の魔導書」の、スキル習得による強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KINKINO_MADOSHO)) > 0) {
		val += 2 * LearnedSkillSearch(SKILL_ID_ELEMENTAL_SYMPASY) * itemCount;
	}

	//----------------------------------------------------------------
	// 「英雄の指輪」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_EIYUNO_YUBIWA)) > 0) {
		if (SU_STR >= 120) val += 5 * itemCount;
	}

	//----------------------------------------------------------------
	// 「サバイバルシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SURVIVAL_SHOES)) > 0) {
		vartmp = 0;

		if (n_A_SHOES_DEF_PLUS >= 5) vartmp += 7;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 10;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「灰羽のブーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_HAIHANENO_BOOTS)) > 0) {
		vartmp = 0;

		if (n_A_SHOES_DEF_PLUS >= 5) vartmp += 7;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 10;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「用心棒のスカーフ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_YOZINBONO_SCARF)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 9) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ニーヴバレッタ」の、ベースレベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_VALLETTA)) > 0) {
		val += 1 * Math.floor(n_A_BaseLV / 25) * itemCount;
	}

	//----------------------------------------------------------------
	// 「スカラバハイヒール」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_SCARABA_HIGHHEEL)) > 0) {
		vartmp = 0;

		if (n_A_SHOES_DEF_PLUS >= 5) vartmp += 4;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 4;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「名も無き剣士のブーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_NAMONAKI_KENNSHINO_BOOTS)) > 0) {
		val += 2 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「猛炎と白魔の指輪」の、効果
	//----------------------------------------------------------------
	itemCountAccessary1 = EquipNumSearch(ITEM_ID_MOENTO_HAKUMANO_YUBIWA, EQUIP_REGION_ID_ACCESSARY_1);
	if (itemCountAccessary1 > 0) {
		val += 15 * itemCountAccessary1;
	}

	//----------------------------------------------------------------
	// 「巡礼者の靴」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ZYUNREISHANO_KUTSU)) > 0) {
		vartmp = 0;

		if (n_A_SHOES_DEF_PLUS >= 5) vartmp += 7;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 10;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「不死鳥の冠」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_FUSHICHONO_KANMURI)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_FORCE_OF_BANGUARD) >= 5) {
			val += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「新鮮な草のネックレス」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SHINSENNA_KUSANO_NECKLACE)) > 0) {

		sklLv = 0;

		sklLv += LearnedSkillSearch(SKILL_ID_PIKKI_TSUKI);
		sklLv += LearnedSkillSearch(SKILL_ID_ARCLOUSE_DASH);
		sklLv += LearnedSkillSearch(SKILL_ID_TAROUNO_KIZU);
		sklLv += LearnedSkillSearch(SKILL_ID_CARROT_BEAT);
		sklLv += LearnedSkillSearch(SKILL_ID_KEIKAI);
		sklLv += LearnedSkillSearch(SKILL_ID_MURENO_CHIKARA);
		sklLv += LearnedSkillSearch(SKILL_ID_SAVAGENO_TAMASHI);

		val += 1 * Math.floor(sklLv / 5) * itemCount;
	}

	//----------------------------------------------------------------
	// 「可愛い草のネックレス」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KAWAII_KUSANO_NECKLACE)) > 0) {

		sklLv = 0;

		sklLv += LearnedSkillSearch(SKILL_ID_SHINSENNA_EBI);
		sklLv += LearnedSkillSearch(SKILL_ID_EBI_ZANMAI);
		sklLv += LearnedSkillSearch(SKILL_ID_OTORO);
		sklLv += LearnedSkillSearch(SKILL_ID_MAGURO_SHIELD);
		sklLv += LearnedSkillSearch(SKILL_ID_GROOMING);
		sklLv += LearnedSkillSearch(SKILL_ID_NODOWO_NARASU);
		sklLv += LearnedSkillSearch(SKILL_ID_EBI_PARTY);

		val += 2 * Math.floor(sklLv / 5) * itemCount;
	}

	//----------------------------------------------------------------
	// 「魔力の草のネックレス」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_MARYOKUNO_KUSANO_NECKLACE)) > 0) {

		sklLv = 0;

		sklLv += LearnedSkillSearch(SKILL_ID_MATATABI_LANCE);
		sklLv += LearnedSkillSearch(SKILL_ID_MATATABINO_NEKKO);
		sklLv += LearnedSkillSearch(SKILL_ID_INUHAKKA_METEOR);
		sklLv += LearnedSkillSearch(SKILL_ID_INUHAKKA_SHOWER);
		sklLv += LearnedSkillSearch(SKILL_ID_CHATTERING);
		sklLv += LearnedSkillSearch(SKILL_ID_MYAUMYAU);
		sklLv += LearnedSkillSearch(SKILL_ID_NYAN_GRASS);

		val += 1 * Math.floor(sklLv / 5) * itemCount;
	}

	//----------------------------------------------------------------
	// 「抱きつきシャムネコ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_DAKITSUKI_SYAMNEKO)) > 0) {
		val += 1 * n_A_HEAD_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ドラムケープ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_DORAM_CAPE)) > 0) {
		val += 1 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「高級ドラムケープ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KOKYU_DORAM_CAPE)) > 0) {
		val += 1 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「特選ドラムケープ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TOKUSEN_DORAM_CAPE)) > 0) {
		val += 2 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「イリュージョンシューズ」の、ベースレベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_SHOES)) > 0) {
		if (n_A_BaseLV >= 170) {
			val += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ヘヴンリーオーダー」の、素ＩＮＴによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_HEAVENLY_ORDER)) > 0) {
		val += 2 * Math.floor(SU_INT / 18) * itemCount;
	}

	//----------------------------------------------------------------
	// 「イリュージョンブーツ」の、ベースレベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_BOOTS)) > 0) {
		if (n_A_BaseLV >= 170) {
			val += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「リングオブジュピター」の、素ＶＩＴによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_RING_OF_JUPITER, EQUIP_REGION_ID_ACCESSARY_2)) > 0) {
		val += 2 * Math.floor(SU_VIT / 10) * itemCount;
	}

	//----------------------------------------------------------------
	// 「イリュージョンゴヴニュの兜」の、ベースレベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_GOIBHNIUNO_KABUTO)) > 0) {
		if (n_A_BaseLV >= 170) {
			val += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「イリュージョンゴヴニュの鎧」の、ベースレベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_GOIBHNIUNO_YOROI)) > 0) {
		if (n_A_BaseLV >= 170) {
			val += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「イリュージョンゴヴニュの肩飾り」の、ベースレベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_GOIBHNIUNO_KATAKAZARI)) > 0) {
		if (n_A_BaseLV >= 170) {
			val += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「イリュージョンゴヴニュの軍靴」の、ベースレベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_GOIBHNIUNO_GUNKA)) > 0) {
		if (n_A_BaseLV >= 170) {
			val += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「イルシオンレッグI」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILUSION_LEG_1)) > 0) {
		if (n_A_BaseLV >= 170) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「イルシオンレッグII」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILUSION_LEG_2)) > 0) {
		if (n_A_BaseLV >= 170) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ダークリング」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_DARK_RING)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_CLOAKING_EXCEED) >= 5) {
			val += 15 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ちゃぷちゃぷニャンプーハット」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_CHAPUCHAPU_NYANPU_HAT)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_EBI_PARTY) >= 5) {
			val += 30 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ファフニールブレス」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_FAFNIR_BREATH)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_DRAGON_TRAINING) >= 5) {
			val += 20 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「不死鳥のリング」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_FUSHICHONO_RING)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_KINGS_GRACE) >= 5) {
			val += 15 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「辰戌の腕輪」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_TATSUINUNO_UDEWA)) > 0) {
		val += 2 * LearnedSkillSearch(SKILL_ID_SENRYU_SHOTEN) * itemCount;
	}

	//----------------------------------------------------------------
	// 「ファフニールヘルム」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_FAFNIR_HELM)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_DRAGON_TRAINING) >= 5) {
			val += 25 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ツインヘッド・ドラゴンメイル」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TWIN_HEAD_DRAGON_MAIL)) > 0) {
		val += 4 * LearnedSkillSearch(SKILL_ID_WATER_DRAGON_BREATH) * itemCount;
	}

	//----------------------------------------------------------------
	// 「ツインヘッド・ドラゴンブーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TWIN_HEAD_DRAGON_BOOTS)) > 0) {
		val += 4 * LearnedSkillSearch(SKILL_ID_WATER_DRAGON_BREATH) * itemCount;
	}

	//----------------------------------------------------------------
	// 「ディア・デ・ムエルトス」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_DIA_DE_MUERTOS)) > 0) {
		val += 5 * LearnedSkillSearch(SKILL_ID_SOUL_ENERGY_KENKYU) * itemCount;
	}

	//----------------------------------------------------------------
	// 「ミステリーウィング」の、素ステータスによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_MYSTERY_WING)) > 0) {
		if (GetTotalPureBasicStatus() >= 300) {
			val += 20 * itemCount;
		}
	}


// 防具効果　ここまで
//------------------------------------------------------------------------------------------------
// カード効果　ここから

	//----------------------------------------------------------------
	// 「銃奇兵カード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_ZYUKIHE)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 9) {
			val += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ゴールドオシドスカード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_GOLD_OSIDOS)) > 0) {
		if (n_A_SHOES_DEF_PLUS <= 4) {
			val += 4 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「エリオットカード」の、職業よる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_ERIOT)) > 0) {
		vartmp = 0;

		switch (GetLowerJobSeriesID(n_A_JOB)) {
		case JOB_SERIES_ID_ACOLYTE:
		case JOB_SERIES_ID_ARCHER:
		case JOB_SERIES_ID_MAGICIAN:
			vartmp += 5;

			if (EquipNumSearch(ITEM_SET_ID_KIKAININGYOYO_ZOFUKUSOCHI_KAI_ERIOT_CARD) > 0) {
				vartmp += 5;
			}
		}

		val += vartmp * cardCount;
	}

	//----------------------------------------------------------------
	// 「アルフォシオ＝バジルカード」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_ALFOSIO_BASIL)) > 0) {
		if (GetHigherJobSeriesID(n_A_JOB) == JOB_SERIES_ID_BARD) {
			val += 5 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「トレンティーニ」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_TRENTINI)) > 0) {
		if (GetHigherJobSeriesID(n_A_JOB) == JOB_SERIES_ID_DANCER) {
			val += 5 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「暴虐のシーラカンスカード」の、精錬による効果（ペナルティ）
	//----------------------------------------------------------------
	cardCountHeadTop = CardNumSearch(CARD_ID_BOGYAKUNO_COELACANTH, CARD_REGION_ID_HEAD_TOP_ANY);
	cardCountHeadMid = CardNumSearch(CARD_ID_BOGYAKUNO_COELACANTH, CARD_REGION_ID_HEAD_MID_ANY);
	if (cardCountHeadTop + cardCountHeadMid > 0) {
		val += -1 * Math.floor(n_A_HEAD_DEF_PLUS / 2) * cardCountHeadTop;
		// 中段は精錬できないため、効果を発揮しない
	}


	//----------------------------------------------------------------
	// 「[LoVA] キマカード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_LOVA_KIMA)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 7) {
			val += 1 * Math.floor(SU_INT / 30) * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「[LoVA] 真化キマカード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_LOVA_SHINKA_KIMA)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 7) {
			val += 1 * Math.floor(SU_INT / 10) * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「プレゼント包装担当者カード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_PRESENT_HOSOTANTOSHA)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 9) {
			val += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「エナジー＜魔導＞」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_ENCHANT_ENERGY_MADO)) > 0) {
		val += 1 * Math.max(0, (n_A_SHOULDER_DEF_PLUS - 4)) * cardCount;
	}

	//----------------------------------------------------------------
	// 「不死の軍団カード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_FUSHINO_GUNDAN)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 9) {
			val += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ミンストレルアルフォシオ(MVP)カード」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_MINSTREL_ARFOSIO_MVP)) > 0) {
		if (IsSameJobClass(JOB_ID_MINSTREL)) {
			val += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ワンダラートレンティーニ(MVP)カード」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_WANDERER_TRENTINI_MVP)) > 0) {
		if (IsSameJobClass(JOB_ID_WANDERER)) {
			val += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ハートハンターカード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_HEART_HUNTER)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 9) {
			val += 10 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「サーペンタリウス」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_SERPENTARIUS, CARD_REGION_ID_HEAD_TOP)) > 0) {
		// 職業限定の効果
		if (IsSameJobClass(JOB_ID_SUMMONER)) {
			val += 2 * n_A_HEAD_DEF_PLUS * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「アクエリアス」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_AQUARIUS, CARD_REGION_ID_HEAD_TOP)) > 0) {
		// 職業限定の効果
		if (IsSameJobClass(JOB_ID_WARLOCK)) {
			val += 1 * n_A_HEAD_DEF_PLUS * cardCount;
		}
	}

// カード効果　ここまで
//------------------------------------------------------------------------------------------------
// エンチャント効果　ここから
// ★エンチャントは、複数の装備部位に適用される可能性を考慮すること

// ★エンチャントは、複数の装備部位に適用される可能性を考慮すること
// エンチャント効果　ここまで
//------------------------------------------------------------------------------------------------
// 装備セット効果　ここから

	//----------------------------------------------------------------
	// 「桜花冠　花びらセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_OKAKAN_HANABIRA)) > 0) {
		val += 1 * Math.max(0, (n_A_HEAD_DEF_PLUS - 6)) * itemCount;
	}

	//----------------------------------------------------------------
	// 「スプリントグローブ　スプリントメイルセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_SPRINT_GLOVE_SPRINT_MAIL)) > 0) {
		if (n_A_BODY_DEF_PLUS >= 7) {
			val += 2 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「リアンシューズ　リアンマントセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_LIEN_SHOES_LIEN_MANT)) > 0) {
		val += 1 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「フロワシューズ　フロワマントセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_FROID_SHOES_FROID_MANT)) > 0) {
		val += 1 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ソルシューズ　ソルマントセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_SOL_SHOES_SOL_MANT)) > 0) {
		val += 1 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「シャレールシューズ　シャレールマントセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_CHALEUR_SHOES_CHALEUR_MANT)) > 0) {
		val += 1 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ルヴァンシューズ　ルヴァンマントセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_LEVAIN_SHOES_LEVAIN_MANT)) > 0) {
		val += 1 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「プワゾンシューズ　プワゾンマントセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_POISON_SHOES_POISON_MANT)) > 0) {
		val += 1 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「リュミエールシューズ　リュミエールマントセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_LUMIERE_SHOES_LUMIERE_MANT)) > 0) {
		val += 1 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ソンブルシューズ　ソンブルマントセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_SOMBRE_SHOES_SOMBRE_MANT)) > 0) {
		val += 1 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「エスプリシューズ　エスプリマントセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_ESPRIT_SHOES_ESPRIT_MANT)) > 0) {
		val += 1 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ラモールシューズ　ラモールマントセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_LAMORT_SHOES_LAMORT_MANT)) > 0) {
		val += 1 * n_A_SHOULDER_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「古くピンク色のアレ　サンダルセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_FURUKU_PINKIRONO_ARE_SANDAL)) > 0) {
		val += 2 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「浮遊する賢者の石　たれリーフセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_FUYUSURU_KENZYONO_ISHI_TARE_LEAF)) > 0) {
		val += 1 * n_A_HEAD_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ハイレベル　銃奇兵カードセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_HIGHLEVEL_ZYUKIHE)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 9) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「紅蓮のストール　呪われたロイヤルナイトカードセット」の、効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_GURENNO_STOLE_NOROWARETA_ROYAL_KNIGHT)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 10) {
			val += 44 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「堕ちた大神官ヒバムカード　暴走した魔力セット」の、効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_SET_ID_OCHITA_DAISHINKAN_HIBAM_ENCHANT_BOSOSHITA_MARYOKU)) > 0) {
		val += 50 * cardCount;
	}

	//----------------------------------------------------------------
	// 「エーギルリング　シューズセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_AEGIR_RING_AEGIR_SHOES)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 7) {
			val += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「フロンティアブーツ　大自然のギターセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_FRONTIER_BOOTS_DAISHIZENNO_GUITAR)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 7) {
			if (n_A_Weapon_ATKplus >= 7) {
				val += 10 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「フロンティアブーツ　大自然のロープセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_FRONTIER_BOOTS_DAISHIZENNO_ROPE)) > 0) {
		if (n_A_SHOES_DEF_PLUS >= 7) {
			if (n_A_Weapon_ATKplus >= 7) {
				val += 10 * itemCount;
			}
		}
	}

// 装備セット効果　ここまで
//------------------------------------------------------------------------------------------------
// 自己スキル効果ここから

	//----------------------------------------------------------------
	// 「ハイプリースト　メディタティオ」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_MEDITATIO)) > 0) {
		val += 1 * sklLv;
	}

	//----------------------------------------------------------------
	// 「ハイウィザード　ソウルドレイン」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_SOUL_DRAIN)) > 0) {
		val += 2 * sklLv;
	}

	//----------------------------------------------------------------
	// 「修羅　潜龍昇天」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_SENRYU_SHOTEN)) > 0) {
		val += 2 + sklLv;
	}


// 自己スキル効果　ここまで
//------------------------------------------------------------------------------------------------
// 支援スキル効果　ここから

	//----------------------------------------------------------------
	// 「ダンサー　サービスフォーユー」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_SERVICE_FOR_YOU)) > 0) {
		var bufferIntRank = ExBuffNumSearch(EXBUF_ID_SERVICE_FOR_YOU_BUFFER_INTRANK);
		bufferSkillLv = ExBuffNumSearch(EXBUF_ID_SERVICE_FOR_YOU_BUFFER_SKILLLV);

		val += 15 + bufLv + Math.floor(bufferSkillLv / 2) + bufferIntRank;
	}

	//----------------------------------------------------------------
	// 「支援ゴスペル　ＳＰアップ」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_GOSPEL_SP_UP)) > 0) {
		val += 100 * bufLv;
	}

	//----------------------------------------------------------------
	// 「ビタタ５００」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_VITATA500)) > 0) {
		val += 5 * bufLv;
	}

	//----------------------------------------------------------------
	// 「ＳＰ増加ポーション」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_SPZOKA_POTION)) > 0) {
		val += -10 + 5 * bufLv + Math.floor(n_A_BaseLV / 10);
	}

	//----------------------------------------------------------------
	// 「戦闘薬」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_SENTOYAKU)) > 0) {
		if (bufLv == 1) val += -3;
		if (bufLv == 2) val += -5;
	}

	//----------------------------------------------------------------
	// 「ＯＴＰログインボーナス支援　レインボー」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_OTP_LOGIN_BONUS)) > 0) {

		if (bufLv == 4) {

			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_GVG:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_GVG_TE:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
				break;

			default:
				val += 20;
				break;
			}
		}
	}

	//----------------------------------------------------------------
	// 「性能カスタマイズ　ＭａｘＳＰ＋」の、効果（マイナスを許容）
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_CUSTOM_SP_UP)) != 0) {
		val += bufLv;
	}

// 支援スキル効果　ここまで
//------------------------------------------------------------------------------------------------

	return val;
}





//================================================================================================
//================================================================================================
//====
//==== 除算ＤＥＦ＋○○　ここから
//====
//================================================================================================
//================================================================================================
/**
* 装備等によるステータスの追加補正値を取得する（除算ＤＥＦ＋）.
*/
function GetStatusModifyDefDivPlus() {

	var idx = 0;
	var val = 0;

	var vartmp = 0, varary = [];
	var itemCount = 0;
	var itemCountRight = 0, itemCountLeft = 0;
	var itemCountHeadTop = 0, itemCountHeadMid = 0, itemCountHeadUnder = 0;
	var itemCountShield = 0, itemCountBody = 0, itemCountShoulder = 0, itemCountShoes = 0;
	var itemCountAccessary1 = 0, itemCountAccessary2 = 0;
	var cardCount = 0;
	var cardCountRight = 0, cardCountLeft = 0;
	var cardCountHeadTop = 0, cardCountHeadMid = 0, cardCountHeadUnder = 0;
	var cardCountShield = 0, cardCountBody = 0, cardCountShoulder = 0, cardCountShoes = 0;
	var cardCountAccessary1 = 0, cardCountAccessary2 = 0;
	var sklLv = 0;
	var bufLv = 0;
	var bufferJobLv = 0, bufferSkillLv = 0;



	//----------------------------------------------------------------
	// ランダムエンチャント効果
	//----------------------------------------------------------------
	val += GetRndOptTotalValue(ITEM_SP_DEF_PLUS, null, false);
	// val += GetRndEnchValue(ITEM_SP_DEF_PLUS);

//------------------------------------------------------------------------------------------------
// 武器効果　ここから
// ★武器は両手に装備される可能性（アサシン、影狼など）を考慮すること

	//----------------------------------------------------------------
	// 「ルナボウ」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_RUNA_BOW, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_RUNA_BOW, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		vartmp += 2;
		if (n_A_Weapon_ATKplus >= 6) vartmp += 3;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 2;
		val += vartmp * itemCountRight;

		vartmp = 0;
		vartmp += 2;
		if (n_A_Weapon2_ATKplus >= 6) vartmp += 3;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 2;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ゲートキーパーＤＤ」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_GATE_KEEPER_DD, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_GATE_KEEPER_DD, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 1 * n_A_Weapon_ATKplus * itemCountRight;
		val += 1 * n_A_Weapon2_ATKplus * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「カルド」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_KARD, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_KARD, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 1 * Math.floor(n_A_Weapon_ATKplus / 2) * itemCountRight;
		val += 1 * Math.floor(n_A_Weapon2_ATKplus / 2) * itemCountLeft;
	}


// ★武器は両手に装備される可能性（アサシン、影狼など）を考慮すること
// 武器効果　ここまで
//------------------------------------------------------------------------------------------------
// 防具効果　ここから

	//----------------------------------------------------------------
	// 「サンタのひげ」の、効果（ペナルティ）
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SANTANO_HIGE)) > 0) {
		val += -5 * itemCount;
	}

	//----------------------------------------------------------------
	// 「バリアントシューズ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_VARIANT_SHOES)) > 0) {
		val += 1 * Math.floor(n_A_SHOES_DEF_PLUS / 2) * itemCount;
	}

	//----------------------------------------------------------------
	// 「カメレオンアーマー」の、職業による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_CHAMELEON_ARMER)) > 0) {
		switch (GetLowerJobSeriesID(n_A_JOB)) {
		case JOB_SERIES_ID_SWORDMAN:
		case JOB_SERIES_ID_THIEF:
		case JOB_SERIES_ID_MERCHANT:
			val += 3 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ソードマンフィギュア」の、職業による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SWORDMAN_FIGURE)) > 0) {
		if (GetLowerJobSeriesID(n_A_JOB) == JOB_SERIES_ID_SWORDMAN) {
			val += 2 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「シュミッツのヘルム」の、素ＩＮＴによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SCHMITTNO_HELM)) > 0) {
		if (SU_INT >= 120) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「戦死者のマント」の、素ＶＩＴによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SENSHISHANO_MANT)) > 0) {
		if (SU_VIT >= 130) {
			if (EquipNumSearchFurubitaSet() > 0) {
				val += 600 * itemCount;
			} else {
				val += 300 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「古びた守護の冠」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_FURUBITA_SHUGONOKANNMURI)) > 0) {
		val += 30 * n_A_HEAD_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「金剛石の盾」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KONGOSEKINO_TATE)) > 0) {
		if (n_A_BaseLV >= 150) {
			val += 100 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「金剛石の盾」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KONGOSEKINO_TATE)) > 0) {
		val += 20 * Math.floor(n_A_SHIELD_DEF_PLUS / 3) * itemCount;
	}

	//----------------------------------------------------------------
	// 「バレルヘルム」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_BARREL_HELM)) > 0) {
		if (n_A_HEAD_DEF_PLUS >= 7) {
			val += 100 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「聖なる白衣」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SEINARU_HAKUI)) > 0) {
		vartmp = 0;

		if (n_A_BODY_DEF_PLUS >= 7) vartmp += 50;
		if (n_A_BODY_DEF_PLUS >= 8) vartmp += 100;
		if (n_A_BODY_DEF_PLUS >= 9) vartmp += 150;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「ローラのプレートメイル」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_LOLANO_PLATEMAIL)) > 0) {
		val += 20 * n_A_BODY_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「天狗の下駄」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TENGUNO_GETA)) > 0) {
		if (sklLv = LearnedSkillSearch(SKILL_ID_TENKETSU_KATSU)) {
			val += 30 * sklLv * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「禁忌の魔導書」の、精錬による強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KINKINO_MADOSHO)) > 0) {
		vartmp = 0;

		if (n_A_SHIELD_DEF_PLUS >= 7) vartmp += 100;
		if (n_A_SHIELD_DEF_PLUS >= 9) vartmp += 200;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「フェアリークロース」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_FAIRLY_CLOTH)) > 0) {
		vartmp = 0;

		if (n_A_SHOULDER_DEF_PLUS >= 5) vartmp += 50;
		if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 50;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「巡礼者の靴」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ZYUNREISHANO_KUTSU)) > 0) {
		if (sklLv = LearnedSkillSearch(SKILL_ID_SECRAMENT)) {
			val += 50 * sklLv * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「不死鳥の冠」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_FUSHICHONO_KANMURI)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_FORCE_OF_BANGUARD) >= 5) {
			val += 150 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「イリュージョンキャップ」の、ベースレベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_CAP)) > 0) {
		if (n_A_BaseLV >= 170) {
			val += 150 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ヘヴンリーオーダー」の、素ＬＵＫによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_HEAVENLY_ORDER)) > 0) {
		val += 20 * Math.floor(SU_LUK / 18) * itemCount;
	}

	//----------------------------------------------------------------
	// 「テュポーンの皮」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TUPOONNO_KAWA)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 8) {
			val += 20 * Math.floor((SU_AGI + SU_VIT) / 20) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「リングオブジュピター」の、素ＶＩＴによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_RING_OF_JUPITER, EQUIP_REGION_ID_ACCESSARY_2)) > 0) {
		if (SU_VIT >= 125) {
			val += 300 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「フェアリーオブエデン」の、スキル習得による効果
	//----------------------------------------------------------------
	itemCount = Math.max(
		EquipNumSearch(ITEM_ID_FAIRY_OF_EDEN),
		EquipNumSearch(ITEM_ID_FAIRY_OF_EDEN_T1)
		);
	if (itemCount > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 8) {
			if (LearnedSkillSearch(SKILL_ID_ENERGY_COAT) >= 1) {
				val += 300 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「インペリアルホーリーローブ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_HOLY_ROBE)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_OFFERTORIUM) >= 5) {
			val += 1 * Math.floor(n_A_BaseLV / 3) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「グレースホーリーローブ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_HOLY_ROBE)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_OFFERTORIUM) >= 5) {
			val += 1 * n_A_BaseLV * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ノーザンクロス」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_NORTHERN_CROSS)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_TELECHINESIS_INSTENCE) >= 5) {
			val += 150 * itemCount;
		}
	}

// 防具効果　ここまで
//------------------------------------------------------------------------------------------------
// カード効果　ここから

	//----------------------------------------------------------------
	// 「アクラウスカード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_ARCLOUSE)) > 0) {
		if (n_A_SHIELD_DEF_PLUS <= 5) {
			val += 2 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ゴートカード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_GOAT)) > 0) {
		if (n_A_BODY_DEF_PLUS <= 5) {
			val += 2 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ロイヤルガードランデル(MVP)カード」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_ROYAL_GUARD_RANDEL_MVP)) > 0) {
		if (IsSameJobClass(JOB_ID_ROYALGUARD)) {
			val += 350 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「古のウータンシューターカード」の、素ＶＩＴによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_INISHIENO_WOOTANG_SHOOTER)) > 0) {
		val += 10 * Math.floor(SU_VIT / 10) * cardCount;
	}

// カード効果　ここまで
//------------------------------------------------------------------------------------------------
// エンチャント効果　ここから
// ★エンチャントは、複数の装備部位に適用される可能性を考慮すること

	//----------------------------------------------------------------
	// 「エンチャント　死のニーヴ(体力)」の、精錬による効果
	//----------------------------------------------------------------
	cardCountRight	  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_TAIRYOKU, CARD_REGION_ID_ARMS_RIGHT_ANY);
	cardCountLeft	  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_TAIRYOKU, CARD_REGION_ID_ARMS_LEFT_ANY);
	cardCountHeadTop  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_TAIRYOKU, CARD_REGION_ID_HEAD_TOP_ANY);
	cardCountShield	  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_TAIRYOKU, CARD_REGION_ID_SHIELD_ANY);
	cardCountBody	  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_TAIRYOKU, CARD_REGION_ID_BODY_ANY);
	cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_TAIRYOKU, CARD_REGION_ID_SHOULDER_ANY);
	cardCountShoes	  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_TAIRYOKU, CARD_REGION_ID_SHOES_ANY);
	if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield
		+ cardCountBody + cardCountShoulder + cardCountShoes > 0) {

		// 右手武器へのエンチャント
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 15;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 25;
		val += vartmp * cardCountRight

		// 左手武器へのエンチャント
		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 15;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 25;
		val += vartmp * cardCountLeft

		// 頭防具へのエンチャント
		vartmp = 0;
		if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 15;
		if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 25;
		val += vartmp * cardCountHeadTop

		// 盾防具へのエンチャント
		vartmp = 0;
		if (n_A_SHIELD_DEF_PLUS >= 7) vartmp += 15;
		if (n_A_SHIELD_DEF_PLUS >= 9) vartmp += 25;
		val += vartmp * cardCountShield

		// 体防具へのエンチャント
		vartmp = 0;
		if (n_A_BODY_DEF_PLUS >= 7) vartmp += 15;
		if (n_A_BODY_DEF_PLUS >= 9) vartmp += 25;
		val += vartmp * cardCountBody

		// 肩防具へのエンチャント
		vartmp = 0;
		if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 15;
		if (n_A_SHOULDER_DEF_PLUS >= 9) vartmp += 25;
		val += vartmp * cardCountShoulder

		// 靴防具へのエンチャント
		vartmp = 0;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 15;
		if (n_A_SHOES_DEF_PLUS >= 9) vartmp += 25;
		val += vartmp * cardCountShoes

		// アクセサリへのエンチャント
		// 精錬できないので処理不要
	}

// ★エンチャントは、複数の装備部位に適用される可能性を考慮すること
// エンチャント効果　ここまで
//------------------------------------------------------------------------------------------------
// 装備セット効果　ここから

	//----------------------------------------------------------------
	// 「オーディンの祝福　マグニセット」の、職業による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_ODINNO_SHUKUFUKU_MAGNI_SET)) > 0) {
		if (GetLowerJobSeriesID(n_A_JOB) == JOB_SERIES_ID_SWORDMAN) {
			val += 6 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「オーディンの祝福　フリッグセット」の、精錬による効果（ペナルティ）
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ODINNO_SHUKUFUKU_FRIGG_SET)) > 0) {
		val += -1 * (n_A_HEAD_DEF_PLUS + n_A_SHIELD_DEF_PLUS) * itemCount;
	}

	//----------------------------------------------------------------
	// 「スプリントメイル　シークレットセット」の、効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SPRINT_MAIL)) > 0) {
		var itemCountTmp = 0;
		itemCountTmp += EquipNumSearch(ITEM_ID_LONG_HORN);
		itemCountTmp += EquipNumSearch(ITEM_ID_BATTLE_FOOK);
		itemCountTmp += EquipNumSearch(ITEM_ID_HUNTING_SPEAR);

		if (itemCountTmp > 0) {
			val += 2 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「楯無の鎧　楯無の兜セット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_TATENASHINO_YOROI_TATENASHINO_KABUTO)) > 0) {
		vartmp = 0;

		vartmp += 15 * n_A_BODY_DEF_PLUS;
		vartmp += 15 * n_A_HEAD_DEF_PLUS;

		val += vartmp * itemCount;
	}

// 装備セット効果　ここまで
//------------------------------------------------------------------------------------------------
// 自己スキル効果ここから

	//----------------------------------------------------------------
	// 「メカニック　メインフレーム改造」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_MAINFRAME_KAIZO)) > 0) {
		val += 20 + 20 * sklLv;
	}

	//----------------------------------------------------------------
	// 「ロイヤルガード　プレスティージ」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_PRESTAGE)) > 0) {
		var sklLvDefender = UsedSkillSearch(SKILL_ID_SKILL_LV_DEFENDER_FOR_PRESTAGE);
		vartmp = 0;

		vartmp += Math.floor(15 * sklLv * n_A_BaseLV / 100);
		vartmp += Math.floor(sklLvDefender / 5 * n_A_BaseLV / 2);

		val += vartmp;
	}

	//----------------------------------------------------------------
	// 「ロイヤルガード　シールドスペル（ＤＥＦ＋）」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_SHIELD_SPELL_DEF_PLUS)) > 0) {
		if (sklLv == 1) {
			val += Math.floor(10 * n_A_SHIELD_DEF_PLUS * n_A_BaseLV / 100);
		}
		else {
			val += Math.floor(10 * (UsedSkillSearch(SKILL_ID_SHIELD_SPELL_DEF_PLUS) - 1) * n_A_BaseLV / 100);
		}
	}

	//----------------------------------------------------------------
	// 「ロイヤルガード　バンディング」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_COUNT_OF_RG_FOR_BANDING)) > 0) {
		var sklLvBanding = UsedSkillSearch(SKILL_ID_BANDING);
		val += (5 + sklLvBanding) * (sklLv + 1);
	}

	//----------------------------------------------------------------
	// 「ルーンナイト　ストーンハードスキン」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_STONE_HARD_SKIN)) > 0) {
		var sklLvRuneMastery = UsedSkillSearch(SKILL_ID_RUNE_MASTERY);
		val += Math.floor(n_A_JobLV * sklLvRuneMastery / 4);
	}

	//----------------------------------------------------------------
	// 「ソーサラー　精霊スキル　パワーオブガイア」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL)) > 0) {
		if (sklLv == 35) {
			val += 100;
		}
	}

// 自己スキル効果　ここまで
//------------------------------------------------------------------------------------------------
// 支援スキル効果　ここから

	//----------------------------------------------------------------
	// 「支援戦太鼓の響き」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_IKUSADAIKONO_HIBIKI)) > 0) {
		val += 10 * bufLv;
	}

	//----------------------------------------------------------------
	// 「支援オーディンの力」の、効果（ペナルティ）
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_ODINNO_CHIKARA)) > 0) {

		// 特定の戦闘エリアでの補正
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
			val -= 50 * bufLv;
			break;

		default:
			val -= 20 * bufLv;
			break;

		}
	}

	//----------------------------------------------------------------
	// 「ソウルリーパー　ゴーレムの魂」の、効果
	//----------------------------------------------------------------
	if ((bufLv = g_confDataSanzi[CCharaConfSanzi.CONF_ID_GOLEMNO_TAMASHI]) > 0) {

		// 特定の戦闘エリアでの補正
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
			val += 300;
			break;

		default:
			val += 100;
			break;

		}

	}

	//----------------------------------------------------------------
	// 「性能カスタマイズ　Ｄｅｆ＋」の、効果（マイナスを許容）
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_CUSTOM_DEF_PLUS)) != 0) {
		val += bufLv;
	}



	// TODO: 四次対応
	for (idx = ITEM_SP_DEF_PLUS; idx <= ITEM_SP_DEF_PLUS; idx++) {
		val = ApplySpecModify(idx, val);
	}

// 支援スキル効果　ここまで
//------------------------------------------------------------------------------------------------

	return val;
}





//================================================================================================
//================================================================================================
//====
//==== 除算Ｄｅｆ　％ＵＰ　ここから
//====
//================================================================================================
//================================================================================================
/**
* 装備等によるステータスの追加補正値を取得する（Ｄｅｆ％）.
*/
function GetStatusModifyDefDivUp() {

	var val = 0;

	var vartmp = 0, varary = [];
	var itemCount = 0;
	var itemCountRight = 0, itemCountLeft = 0;
	var itemCountHeadTop = 0, itemCountHeadMid = 0, itemCountHeadUnder = 0;
	var itemCountShield = 0, itemCountBody = 0, itemCountShoulder = 0, itemCountShoes = 0;
	var itemCountAccessary1 = 0, itemCountAccessary2 = 0;
	var cardCount = 0;
	var cardCountRight = 0, cardCountLeft = 0;
	var cardCountHeadTop = 0, cardCountHeadMid = 0, cardCountHeadUnder = 0;
	var cardCountShield = 0, cardCountBody = 0, cardCountShoulder = 0, cardCountShoes = 0;
	var cardCountAccessary1 = 0, cardCountAccessary2 = 0;
	var sklLv = 0;
	var bufLv = 0;
	var bufferJobLv = 0, bufferSkillLv = 0;


//------------------------------------------------------------------------------------------------
// 武器効果　ここから
// ★武器は両手に装備される可能性（アサシン、影狼など）を考慮すること

// ★武器は両手に装備される可能性（アサシン、影狼など）を考慮すること
// 武器効果　ここまで
//------------------------------------------------------------------------------------------------
// 防具効果　ここから

// 防具効果　ここまで
//------------------------------------------------------------------------------------------------
// カード効果　ここから

// カード効果　ここまで
//------------------------------------------------------------------------------------------------
// エンチャント効果　ここから
// ★エンチャントは、複数の装備部位に適用される可能性を考慮すること

// ★エンチャントは、複数の装備部位に適用される可能性を考慮すること
// エンチャント効果　ここまで
//------------------------------------------------------------------------------------------------
// 装備セット効果　ここから

// 装備セット効果　ここまで
//------------------------------------------------------------------------------------------------
// 自己スキル効果ここから

	//----------------------------------------------------------------
	// 「ロイヤルガード　フォースオブバンガード」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_FORCE_OF_BANGUARD)) > 0) {
		val += 2 * sklLv;
	}

	//----------------------------------------------------------------
	// 「影狼・朧　土符」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU)) > 0) {
		if (sklLv == ELM_ID_EARTH) {
			val += 10 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
		}
	}

	//----------------------------------------------------------------
	// 「レンジャー　カモフラージュ」の、効果（ペナルティ）
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_CAMOUFLAGE)) > 0) {
		val += -5 * sklLv;
	}

	//----------------------------------------------------------------
	// 「ソーサラー　精霊補助スキル　ウォーターバリア」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL)) > 0) {
		if (sklLv == 17) {
			val += 30;
		}
	}

	//----------------------------------------------------------------
	// 「ソーサラー　精霊補助スキル　ソリッドスキン」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL)) > 0) {
		if (sklLv == 29) {
			val += 100;
		}
	}

	//----------------------------------------------------------------
	// 「ジェネティック　Ｓホム　オーバードブースト」の、効果（ペナルティ）
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_OVERED_BOOST)) > 0) {
		val += -50;
	}

// 自己スキル効果　ここまで
//------------------------------------------------------------------------------------------------
// 支援スキル効果　ここから

	//----------------------------------------------------------------
	// 「支援アスムプティオ」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_ASUMUPTIO)) > 0) {
		if (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA] > MOB_CONF_PLAYER_ID_SENTO_AREA_NONE) {
			val += 35;
		}
		else {
			val += 100;
		}
	}

	//----------------------------------------------------------------
	// 「支援エコーの歌」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_ECHONO_UTA)) > 0) {
		bufferJobLv = ExBuffNumSearch(EXBUF_ID_ECHONO_UTA_BUFFER_JOBLV);
		bufferSkillLv = ExBuffNumSearch(EXBUF_ID_ECHONO_UTA_BUFFER_SKILLLV);

		val += (6 * bufLv) + (bufferSkillLv) + Math.floor(bufferJobLv / 4);
	}

	//----------------------------------------------------------------
	// 「支援フライデーナイトフィーバー」の、効果（ペナルティ）
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_FRYDAY_NIGHT_FEVER)) > 0) {
		val += -1 * (10 + 10 * bufLv);
	}

	//----------------------------------------------------------------
	// キャラクター状態異常　毒
	//----------------------------------------------------------------
	if (n_A_IJYOU[2]) {
		val -= 25;
	}

	//----------------------------------------------------------------
	// キャラクター状態異常　氷結
	//----------------------------------------------------------------
	if (n_A_IJYOU[5]) {
		val -= 10;
	}

// 支援スキル効果　ここまで
//------------------------------------------------------------------------------------------------

	return val;
}





//================================================================================================
//================================================================================================
//====
//==== 除算ＭＤＥＦ＋○○　ここから
//====
//================================================================================================
//================================================================================================
/**
* 装備等によるステータスの追加補正値を取得する（除算ＭＤＥＦ＋）.
*/
function GetStatusModifyMdefDivPlus(bIgnoreBuff) {

	var val = 0;

	var vartmp = 0, varary = [];
	var itemCount = 0;
	var itemCountRight = 0, itemCountLeft = 0;
	var itemCountHeadTop = 0, itemCountHeadMid = 0, itemCountHeadUnder = 0;
	var itemCountShield = 0, itemCountBody = 0, itemCountShoulder = 0, itemCountShoes = 0;
	var itemCountAccessary1 = 0, itemCountAccessary2 = 0;
	var cardCount = 0;
	var cardCountRight = 0, cardCountLeft = 0;
	var cardCountHeadTop = 0, cardCountHeadMid = 0, cardCountHeadUnder = 0;
	var cardCountShield = 0, cardCountBody = 0, cardCountShoulder = 0, cardCountShoes = 0;
	var cardCountAccessary1 = 0, cardCountAccessary2 = 0;
	var sklLv = 0;
	var bufLv = 0;
	var bufferJobLv = 0, bufferSkillLv = 0;



	//----------------------------------------------------------------
	// ランダムエンチャント効果
	//----------------------------------------------------------------
	val += GetRndOptTotalValue(ITEM_SP_MDEF_PLUS, null, false);
	// val += GetRndEnchValue(ITEM_SP_MDEF_PLUS);

//------------------------------------------------------------------------------------------------
// 武器効果　ここから
// ★武器は両手に装備される可能性（アサシン、影狼など）を考慮すること

	//----------------------------------------------------------------
	// 「ラクリマスティック」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_LACRYMA_STICK, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_LACRYMA_STICK, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 1 * n_A_Weapon_ATKplus * itemCountRight;
		val += 1 * n_A_Weapon2_ATKplus * itemCountLeft;
	}


// ★武器は両手に装備される可能性（アサシン、影狼など）を考慮すること
// 武器効果　ここまで
//------------------------------------------------------------------------------------------------
// 防具効果　ここから

	//----------------------------------------------------------------
	// 「カメレオンアーマー」の、職業による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_CHAMELEON_ARMER)) > 0) {
		switch (GetLowerJobSeriesID(n_A_JOB)) {
		case JOB_SERIES_ID_ACOLYTE:
		case JOB_SERIES_ID_ARCHER:
		case JOB_SERIES_ID_MAGICIAN:
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「たれリーフ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TARE_LEAF)) > 0) {
		val += 1 * n_A_HEAD_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「真っ赤なドレスハット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_MAKKANA_DRESSHAT)) > 0) {
		val += 1 * Math.floor(n_A_HEAD_DEF_PLUS / 2) * itemCount;
	}

	//----------------------------------------------------------------
	// 「ビョンウンゴブーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_BANGUNGOT_BOOTS)) > 0) {
		val += 1 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「バヤニ・ビョンウンゴブーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_BAYANI_BANGUNGOT_BOOTS)) > 0) {
		val += 1 * n_A_SHOES_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ナチュラルクロース」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_NATURAL_CLOTH)) > 0) {
		val += 1 * n_A_BODY_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「シェファードクロース」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SHEPHARD_CLOTH)) > 0) {
		val += 1 * n_A_BODY_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ヴァーミンクロース」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_VERMIN_CLOTH)) > 0) {
		val += 1 * n_A_BODY_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「アグリカルチュラルクロース」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_AGRICULTURAL_CLOTH)) > 0) {
		val += 1 * n_A_BODY_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「オルカクロース」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ORCA_CLOTH)) > 0) {
		val += 1 * n_A_BODY_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ヴィシャスクロース」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_VICIOUS_CLOTH)) > 0) {
		val += 1 * n_A_BODY_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ドラゴンクロース」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_DRAGON_CLOTH)) > 0) {
		val += 1 * n_A_BODY_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「アンティマジックスーツ」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ANTIMAGIC_SUIT)) > 0) {
		if (n_A_BODY_DEF_PLUS >= 7) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「プロテクトフェザー」の、素ＶＩＴによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_PROTECT_FEATHER)) > 0) {
		if (SU_VIT >= 120) {
			val += 3 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「勇者のマジックコート」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_YUSHANO_MAGIC_COAT)) > 0) {
		if (n_A_BODY_DEF_PLUS % 2 == 0) {
			val += 1 * Math.floor(n_A_BODY_DEF_PLUS / 2) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「古びたブレイジングソウル」の、精錬による強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_FURUBITA_BLAZINGSOUL)) > 0) {
		val += 1 * n_A_HEAD_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「死霊魔術師のニット帽」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SHIRYOMAZYUTSUSHINO_NITTOBO)) > 0) {
		vartmp = 0;

		if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 5;
		if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 5;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「火雷大神靴　月夜花カード　セット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_HONOIKAZUCHINOOOKAMI_KUTSU_WORUYAFA)) > 0) {
		if (n_A_BaseLV <= 99) {
			val += 5 * n_A_SHOES_DEF_PLUS * itemCount;
		} else {
			val += 10 * n_A_SHOES_DEF_PLUS * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「禁忌の魔導書」の、精錬による強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KINKINO_MADOSHO)) > 0) {
		vartmp = 0;

		if (n_A_SHIELD_DEF_PLUS >= 7) vartmp += 5;
		if (n_A_SHIELD_DEF_PLUS >= 9) vartmp += 10;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「アンソニの服」の、精錬による強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ANSONINO_FUKU)) > 0) {
		vartmp = 0;

		if (n_A_BODY_DEF_PLUS >= 7) vartmp += 5;
		if (n_A_BODY_DEF_PLUS >= 8) vartmp += 10;
		if (n_A_BODY_DEF_PLUS >= 9) vartmp += 15;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「自警団のスーツ」の、精錬による強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ZIKEIDANNNO_SUITS)) > 0) {
		vartmp = 0;

		vartmp += 1 * n_A_BODY_DEF_PLUS;

		if (n_A_BODY_DEF_PLUS >= 7) vartmp += 5;
		if (n_A_BODY_DEF_PLUS >= 9) vartmp += 5;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「ニーヴバレッタ」の、ベースレベルによる強化
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_NIEVE_VALLETTA)) > 0) {
		val += 1 * Math.floor(n_A_BaseLV / 25) * itemCount;
	}

	//----------------------------------------------------------------
	// 「フェアリークロース」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_FAIRLY_CLOTH)) > 0) {
		vartmp = 0;

		if (n_A_SHOULDER_DEF_PLUS >= 5) vartmp += 5;
		if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 5;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「不死鳥の冠」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_FUSHICHONO_KANMURI)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_FORCE_OF_BANGUARD) >= 5) {
			val += 15 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ヘヴンリーオーダー」の、素ＶＩＴによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_HEAVENLY_ORDER)) > 0) {
		val += 2 * Math.floor(SU_VIT / 18) * itemCount;
	}

	//----------------------------------------------------------------
	// 「リングオブジュピター」の、素ＶＩＴによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_RING_OF_JUPITER, EQUIP_REGION_ID_ACCESSARY_2)) > 0) {
		if (SU_VIT >= 125) {
			val += 50 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「フェアリーオブエデン」の、スキル習得による効果
	//----------------------------------------------------------------
	itemCount = Math.max(
		EquipNumSearch(ITEM_ID_FAIRY_OF_EDEN),
		EquipNumSearch(ITEM_ID_FAIRY_OF_EDEN_T1)
		);
	if (itemCount > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 8) {
			if (LearnedSkillSearch(SKILL_ID_ENERGY_COAT) >= 1) {
				val += 15 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「インペリアルグローリー」の、素ＡＧＩと素ＶＩＴによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_GLORY)) > 0) {
		val += 4 * Math.floor((SU_AGI + SU_VIT) / 50) * itemCount;
	}

	//----------------------------------------------------------------
	// 「ノーザンクロス」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_NORTHERN_CROSS)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_TELECHINESIS_INSTENCE) >= 5) {
			val += 15 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「きらきらニャンニャンチョーカー」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KIRAKIRA_NYANNYAN_CHOKER)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_DAICHINO_TAMASHI) >= 1) {

			// アイテム効果なので、「習得スキル」欄で設定しても、「パッシブ持続系」で設定してもＯＫとする
			// （大きい方を採用）

			vartmp = 0;

			vartmp += LearnedSkillSearch(SKILL_ID_MATATABI_LANCE);
			vartmp += LearnedSkillSearch(SKILL_ID_MATATABINO_NEKKO);
			vartmp += LearnedSkillSearch(SKILL_ID_INUHAKKA_METEOR);
			vartmp += LearnedSkillSearch(SKILL_ID_INUHAKKA_SHOWER);
			vartmp += LearnedSkillSearch(SKILL_ID_CHATTERING);
			vartmp += LearnedSkillSearch(SKILL_ID_MYAUMYAU);
			vartmp += LearnedSkillSearch(SKILL_ID_NYAN_GRASS);

			vartmp = Math.max(vartmp, UsedSkillSearch(SKILL_ID_PLANT_KEI_SHUTOKU_LEVEL_GOKEI));

			val += 1 * vartmp * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「粛清の靴」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SHUKUSEINO_KUTSU)) > 0) {
		val += 10 * LearnedSkillSearch(SKILL_ID_LAUDAAGNUS) * itemCount;
		val += 10 * LearnedSkillSearch(SKILL_ID_LAUDARAMUS) * itemCount;
	}

	//----------------------------------------------------------------
	// 「フィフスエレメント」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_FIFTH_ELEMENT)) > 0) {
		vartmp = 0;
		vartmp += LearnedSkillSearch(SKILL_ID_SUMMON_AGNI);
		vartmp += LearnedSkillSearch(SKILL_ID_SUMMON_AQUA);
		vartmp += LearnedSkillSearch(SKILL_ID_SUMMON_VENTOS);
		vartmp += LearnedSkillSearch(SKILL_ID_SUMMON_TERA);

		val += 4 * vartmp * itemCount;
	}

// 防具効果　ここまで
//------------------------------------------------------------------------------------------------
// カード効果　ここから

	//----------------------------------------------------------------
	// 「ライドワードカード」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_RIDEWORD)) > 0) {
		if (GetLowerJobSeriesID(n_A_JOB) == JOB_SERIES_ID_ACOLYTE) {
			val += 1 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「スティングカード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_STING)) > 0) {
		if (n_A_SHIELD_DEF_PLUS >= 9) {
			val += 5 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ジビットカード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_GIBBET, CARD_REGION_ID_HEAD_TOP_ANY)) > 0) {
		if (n_A_HEAD_DEF_PLUS <= 5) {
			val += 5 * cardCount;
		}
	}
	if ((cardCount = CardNumSearch(CARD_ID_GIBBET, CARD_REGION_ID_HEAD_MID_ANY)) > 0) {
		val += 5 * cardCount;
	}

	//----------------------------------------------------------------
	// 「アクラウスカード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_ARCLOUSE)) > 0) {
		if (n_A_SHIELD_DEF_PLUS <= 5) {
			val += 3 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ゴートカード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_GOAT)) > 0) {
		if (n_A_BODY_DEF_PLUS <= 5) {
			val += 5 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「メガリスカード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_MEGALITH)) > 0) {
		if (n_A_SHOES_DEF_PLUS <= 5) {
			val += 7 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「河童カード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_KAPPA)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS <= 5) {
			val += 8 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「プルスカード」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_FRUS)) > 0) {
		if (GetLowerJobSeriesID(n_A_JOB) == JOB_SERIES_ID_MAGICIAN) {
			val += 3 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「エナジー＜魔導＞」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_ENCHANT_ENERGY_MADO)) > 0) {
		val += 1 * Math.max(0, (n_A_SHOULDER_DEF_PLUS - 4)) * cardCount;
	}

	//----------------------------------------------------------------
	// 「ウォーロックカトリーヌ(MVP)カード」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_WARLOCK_CATHERINE_MVP)) > 0) {
		if (IsSameJobClass(JOB_ID_WARLOCK)) {
			val += 80 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「パイシーズ」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_PISCES, CARD_REGION_ID_HEAD_TOP_ANY)) > 0) {
		if (IsSameJobClass(JOB_ID_SORCERER)) {
			val += 1 * n_A_HEAD_DEF_PLUS * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「混沌のハンターフライカード」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_KONTONNO_HUNTERFLY)) > 0) {
		val += 1 * Math.floor(SU_STR / 10) * cardCount;
	}


// カード効果　ここまで
//------------------------------------------------------------------------------------------------
// エンチャント効果　ここから
// ★エンチャントは、複数の装備部位に適用される可能性を考慮すること

	//----------------------------------------------------------------
	// 「エンチャント　死のニーヴ(魔防)」の、精錬による効果
	//----------------------------------------------------------------
	cardCountRight	  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_MABO, CARD_REGION_ID_ARMS_RIGHT_ANY);
	cardCountLeft	  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_MABO, CARD_REGION_ID_ARMS_LEFT_ANY);
	cardCountHeadTop  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_MABO, CARD_REGION_ID_HEAD_TOP_ANY);
	cardCountShield	  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_MABO, CARD_REGION_ID_SHIELD_ANY);
	cardCountBody	  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_MABO, CARD_REGION_ID_BODY_ANY);
	cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_MABO, CARD_REGION_ID_SHOULDER_ANY);
	cardCountShoes	  = CardNumSearch(CARD_ID_ENCHANT_SHINO_NIEVE_MABO, CARD_REGION_ID_SHOES_ANY);
	if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield
		+ cardCountBody + cardCountShoulder + cardCountShoes > 0) {

		// 右手武器へのエンチャント
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 6;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 10;
		val += vartmp * cardCountRight

		// 左手武器へのエンチャント
		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 6;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 10;
		val += vartmp * cardCountLeft

		// 頭防具へのエンチャント
		vartmp = 0;
		if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 6;
		if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 10;
		val += vartmp * cardCountHeadTop

		// 盾防具へのエンチャント
		vartmp = 0;
		if (n_A_SHIELD_DEF_PLUS >= 7) vartmp += 6;
		if (n_A_SHIELD_DEF_PLUS >= 9) vartmp += 10;
		val += vartmp * cardCountShield

		// 体防具へのエンチャント
		vartmp = 0;
		if (n_A_BODY_DEF_PLUS >= 7) vartmp += 6;
		if (n_A_BODY_DEF_PLUS >= 9) vartmp += 10;
		val += vartmp * cardCountBody

		// 肩防具へのエンチャント
		vartmp = 0;
		if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 6;
		if (n_A_SHOULDER_DEF_PLUS >= 9) vartmp += 10;
		val += vartmp * cardCountShoulder

		// 靴防具へのエンチャント
		vartmp = 0;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 6;
		if (n_A_SHOES_DEF_PLUS >= 9) vartmp += 10;
		val += vartmp * cardCountShoes

		// アクセサリへのエンチャント
		// 精錬できないので処理不要
	}


// ★エンチャントは、複数の装備部位に適用される可能性を考慮すること
// エンチャント効果　ここまで
//------------------------------------------------------------------------------------------------
// 装備セット効果　ここから

	//----------------------------------------------------------------
	// 「オーディンの祝福　フリッグセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ODINNO_SHUKUFUKU_FRIGG_SET)) > 0) {
		val += 1 * (n_A_HEAD_DEF_PLUS + n_A_SHIELD_DEF_PLUS) * itemCount;
	}

	//----------------------------------------------------------------
	// 「プラチナリング　ウェディングセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_PLATINUM_RING_WEDDING_GOODS)) > 0) {
		val += 1 * (n_A_HEAD_DEF_PLUS + n_A_BODY_DEF_PLUS + n_A_SHOES_DEF_PLUS) * itemCount;
	}

	//----------------------------------------------------------------
	// 「覚醒火雷大神靴　月夜花カード　セット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_KAKUSE_HONOIKAZUCHINOOOKAMI_KUTSU_WORUYAFA_CARD)) > 0) {
		if (n_A_BaseLV <= 99) {
			val += 5 * n_A_SHOES_DEF_PLUS * itemCount;
		} else {
			val += 10 * n_A_SHOES_DEF_PLUS * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「覚醒火雷大神靴　封印された月夜花カード　セット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_KAKUSE_HONOIKAZUCHINOOOKAMI_KUTSU_FUINSARETA_WORUYAFA_CARD)) > 0) {
		if (n_A_BaseLV <= 99) {
			val += 5 * n_A_SHOES_DEF_PLUS * itemCount;
		} else {
			val += 10 * n_A_SHOES_DEF_PLUS * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「火雷大神靴　封印された月夜花カード　セット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_HONOIKAZUCHINOOOKAMI_KUTSU_FUINSARETA_WORUYAFA_CARD)) > 0) {
		if (n_A_BaseLV <= 99) {
			val += 3 * n_A_SHOES_DEF_PLUS * itemCount;
		} else {
			val += 6 * n_A_SHOES_DEF_PLUS * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「異境の統轄者　黒蛇王カード」セットの、ジョブレベルによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_KOKUDAO)) > 0) {
		val += 1 * Math.floor(n_A_JobLV / 3) * cardCount;
	}

	//----------------------------------------------------------------
	// 「異境の統轄者　封印された黒蛇王カード」セットの、ジョブレベルによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_FUINSARETA_KOKUDAO)) > 0) {
		val += 1 * Math.floor(n_A_JobLV / 10) * cardCount;
	}


// 装備セット効果　ここまで
//------------------------------------------------------------------------------------------------
// 自己スキル効果ここから

	if (!bIgnoreBuff) {

		//----------------------------------------------------------------
		// 「ソードマン　インデュア」系統の、効果
		//----------------------------------------------------------------
		vartmp = 0;

		// インデュアの使用、発動
		vartmp = Math.max(vartmp, UsedSkillSearch(SKILL_ID_ENDURE));
		vartmp = Math.max(vartmp, ExBuffNumSearch(EXBUF_ID_ENDURE));
		if (TimeItemNumSearch(TIME_ITEM_ID_LUDE) > 0) {
			vartmp = Math.max(vartmp, 1);
		}

		// 無限インデュア効果
		if (EquipNumSearch(ITEM_ID_KOREIZYUTSUSHINO_GAITO) > 0) {
			if (n_A_SHOULDER_DEF_PLUS >= 10) {
				vartmp = Math.max(vartmp, 1);
			}
		}
		if (EquipNumSearch(ITEM_ID_SHIRONO_KISHIDANNO_YOROI) > 0) {
			if (n_A_BODY_DEF_PLUS >= 10) {
				vartmp = Math.max(vartmp, 1);
			}
		}
		if (EquipNumSearch(ITEM_SET_ID_ORCLORDNO_YOROI_ORCLORD_CARD) > 0) {
			vartmp = Math.max(vartmp, 1);
		}
		if (EquipNumSearch(ITEM_SET_ID_PARACELSUS_GLOVE_HAO) > 0) {
			if (IsSameJobClass(JOB_ID_GENETIC)) {
				vartmp = Math.max(vartmp, 1);
			}
		}
		if (EquipNumSearch(ITEM_SET_ID_ILLUSION_MORRIGAN_SET) > 0) {
			vartmp = Math.max(vartmp, 1);
		}
		if (EquipNumSearch(ITEM_SET_ID_KAKUSE_ORCLORDNO_YOROI_ORCLORD_CARD) > 0) {
			vartmp = Math.max(vartmp, 1);
		}
		if (EquipNumSearch(ITEM_SET_ID_KAKUSE_ORCLORDNO_YOROI_FUINSARETA_ORCLORD_CARD) > 0) {
			vartmp = Math.max(vartmp, 1);
		}
		if (EquipNumSearch(ITEM_ID_ILLUSION_DOOM_SLAYER) > 0) {
			if (n_A_Weapon_ATKplus >= 10) {
				if (n_A_BaseLV >= 170) {
					vartmp = Math.max(vartmp, 1);
				}
			}
		}
		if (CardNumSearch(CARD_ID_EDDGA) > 0) {
			vartmp = Math.max(vartmp, 1);
		}
		if (CardNumSearch(CARD_ID_ENCHANT_SENZAI_KAIHO_MECHANIC) > 0) {
			if (IsSameJobClass(JOB_ID_MECHANIC)) {
				vartmp = Math.max(vartmp, 1);
			}
		}
		if (CardNumSearch(CARD_ID_MUGENNO_EDDGA, CARD_REGION_ID_HEAD_TOP_ANY) > 0) {
			if (n_A_HEAD_DEF_PLUS >= 9) {
				vartmp = Math.max(vartmp, 1);
			}
		}
		if (CardNumSearch(CARD_ID_ENCHANT_FUKUTSU) > 0) {
			vartmp = Math.max(vartmp, 1);
		}

		// コンセントレイションの使用、発動
		if (UsedSkillSearch(SKILL_ID_CONCENTRATION) > 0) {
			vartmp = Math.max(vartmp, 1);
		}
		if (g_confDataNizi[CCharaConfNizi.CONF_ID_CONCENTRATION] > 0) {
			vartmp = Math.max(vartmp, 1);
		}

		// 最大レベルで適用
		if (vartmp > 0) {
			val += vartmp;
		}

		//----------------------------------------------------------------
		// 「ルーンナイト　ストーンハードスキン」の、効果
		//----------------------------------------------------------------
		if ((sklLv = UsedSkillSearch(SKILL_ID_STONE_HARD_SKIN)) > 0) {
			val += Math.floor(n_A_JobLV * UsedSkillSearch(SKILL_ID_RUNE_MASTERY) / 4);
		}

	}

// 自己スキル効果　ここまで
//------------------------------------------------------------------------------------------------
// 支援スキル効果　ここから

	if (!bIgnoreBuff) {

		//----------------------------------------------------------------
		// 「支援オーディンの力」の、効果（ペナルティ）
		//----------------------------------------------------------------
		if ((bufLv = ExBuffNumSearch(EXBUF_ID_ODINNO_CHIKARA)) > 0) {

			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				val -= 50 * bufLv;
				break;

			default:
				val -= 20 * bufLv;
				break;

			}
		}

	}

	//----------------------------------------------------------------
	// 「ソウルリーパー　ゴーレムの魂」の、効果
	//----------------------------------------------------------------
	if ((bufLv = g_confDataSanzi[CCharaConfSanzi.CONF_ID_GOLEMNO_TAMASHI]) > 0) {

		// 特定の戦闘エリアでの補正
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
			val += 25 + 25 * bufLv;
			break;

		default:
			val += 10 * bufLv;
			break;

		}
	}

	//----------------------------------------------------------------
	// 「性能カスタマイズ　Ｍｄｅｆ＋」の、効果（マイナスを許容）
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_CUSTOM_MDEF_PLUS)) != 0) {
		val += bufLv;
	}



	// TODO: 四次対応
	for (idx = ITEM_SP_MDEF_PLUS; idx <= ITEM_SP_MDEF_PLUS; idx++) {
		val = ApplySpecModify(idx, val);
	}

// 支援スキル効果　ここまで
//------------------------------------------------------------------------------------------------

	return val;
}






//================================================================================================
//================================================================================================
//====
//==== 除算Ｍｄｅｆ　％ＵＰ　ここから
//====
//================================================================================================
//================================================================================================
/**
* 装備等によるステータスの追加補正値を取得する（Ｍｄｅｆ％）.
*/
function GetStatusModifyMdefDivUp(bIgnoreBuff) {

	var val = 0;

	var vartmp = 0, varary = [];
	var itemCount = 0;
	var itemCountRight = 0, itemCountLeft = 0;
	var itemCountHeadTop = 0, itemCountHeadMid = 0, itemCountHeadUnder = 0;
	var itemCountShield = 0, itemCountBody = 0, itemCountShoulder = 0, itemCountShoes = 0;
	var itemCountAccessary1 = 0, itemCountAccessary2 = 0;
	var cardCount = 0;
	var cardCountRight = 0, cardCountLeft = 0;
	var cardCountHeadTop = 0, cardCountHeadMid = 0, cardCountHeadUnder = 0;
	var cardCountShield = 0, cardCountBody = 0, cardCountShoulder = 0, cardCountShoes = 0;
	var cardCountAccessary1 = 0, cardCountAccessary2 = 0;
	var sklLv = 0;
	var bufLv = 0;
	var bufferJobLv = 0, bufferSkillLv = 0;


//------------------------------------------------------------------------------------------------
// 武器効果　ここから
// ★武器は両手に装備される可能性（アサシン、影狼など）を考慮すること

// ★武器は両手に装備される可能性（アサシン、影狼など）を考慮すること
// 武器効果　ここまで
//------------------------------------------------------------------------------------------------
// 防具効果　ここから

	//----------------------------------------------------------------
	// 「アヌビスの帽子」の、効果（ペナルティ）
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ANUBISNO_BOSHI)) > 0) {
		val += -50 * itemCount;
	}


// 防具効果　ここまで
//------------------------------------------------------------------------------------------------
// カード効果　ここから

// カード効果　ここまで
//------------------------------------------------------------------------------------------------
// エンチャント効果　ここから
// ★エンチャントは、複数の装備部位に適用される可能性を考慮すること

// ★エンチャントは、複数の装備部位に適用される可能性を考慮すること
// エンチャント効果　ここまで
//------------------------------------------------------------------------------------------------
// 装備セット効果　ここから

// 装備セット効果　ここまで
//------------------------------------------------------------------------------------------------
// 自己スキル効果ここから

	if (!bIgnoreBuff) {

		//----------------------------------------------------------------
		// 「ソーサラー　精霊補助スキル　ウォーターバリア」の、効果
		//----------------------------------------------------------------
		if ((sklLv = UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL)) > 0) {
			if (sklLv == 17) {
				val += 20;
			}
		}

	}

// 自己スキル効果　ここまで
//------------------------------------------------------------------------------------------------
// 支援スキル効果　ここから

	if (!bIgnoreBuff) {

		//----------------------------------------------------------------
		// 「支援アスムプティオ」の、効果
		//----------------------------------------------------------------
		if ((bufLv = ExBuffNumSearch(EXBUF_ID_ASUMUPTIO)) > 0) {
			if (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA] > MOB_CONF_PLAYER_ID_SENTO_AREA_NONE) {
				val += 35;
			}
			else {
				val += 100;
			}
		}

		//----------------------------------------------------------------
		// 「支援恋人たちのためのシンフォニー」の、効果
		//----------------------------------------------------------------
		if ((bufLv = ExBuffNumSearch(EXBUF_ID_KOIBITOTACHINOTAMENO_SYMPHONY)) > 0) {
			bufferJobLv = ExBuffNumSearch(EXBUF_ID_KOIBITOTACHINOTAMENO_SYMPHONY_BUFFER_JOBLV);
			bufferSkillLv = ExBuffNumSearch(EXBUF_ID_KOIBITOTACHINOTAMENO_SYMPHONY_BUFFER_SKILLLV);

			val += (12 * bufLv) + (2 * bufferSkillLv) + Math.floor(bufferJobLv / 2);
		}

	}

// 支援スキル効果　ここまで
//------------------------------------------------------------------------------------------------

	return val;
}





//================================================================================================
//================================================================================================
//====
//==== ＨＩＴ　＋○○　ここから
//====
//================================================================================================
//================================================================================================
/**
* 装備等によるステータスの追加補正値を取得する（ＨＩＴ＋）.
*/
function GetStatusModifyHitPlus() {

	var idx = 0;
	var val = 0;

	var vartmp = 0, varary = [];
	var itemCount = 0;
	var itemCountRight = 0, itemCountLeft = 0;
	var itemCountHeadTop = 0, itemCountHeadMid = 0, itemCountHeadUnder = 0;
	var itemCountShield = 0, itemCountBody = 0, itemCountShoulder = 0, itemCountShoes = 0;
	var itemCountAccessary1 = 0, itemCountAccessary2 = 0;
	var cardCount = 0;
	var cardCountRight = 0, cardCountLeft = 0;
	var cardCountHeadTop = 0, cardCountHeadMid = 0, cardCountHeadUnder = 0;
	var cardCountShield = 0, cardCountBody = 0, cardCountShoulder = 0, cardCountShoes = 0;
	var cardCountAccessary1 = 0, cardCountAccessary2 = 0;
	var sklLv = 0;
	var bufLv = 0;
	var bufferJobLv = 0, bufferSkillLv = 0;



	//----------------------------------------------------------------
	// ランダムエンチャント効果
	//----------------------------------------------------------------
	val += GetRndOptTotalValue(ITEM_SP_HIT_PLUS, null, false);
	// val += GetRndEnchValue(ITEM_SP_HIT_PLUS);

//------------------------------------------------------------------------------------------------
// 武器効果　ここから
// ★武器は両手に装備される可能性（アサシン、影狼など）を考慮すること

	//----------------------------------------------------------------
	// 「ジャングルカービン」の、素ＤＥＸによる効果（ペナルティ）
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_JUNGLE_CARBIN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_JUNGLE_CARBIN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += -1 * Math.floor(SU_DEX / 3) * itemCountRight;
		val += -1 * Math.floor(SU_DEX / 3) * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ギガントアックス」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_GIGANT_AXE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_GIGANT_AXE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		if (SU_STR >= 95) {
			val += 10 * itemCountRight;
			val += 10 * itemCountLeft;
		}
	}

	//----------------------------------------------------------------
	// 「蛸引包丁」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_TAKOHIKI_HOCHO, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_TAKOHIKI_HOCHO, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 1 * n_A_Weapon_ATKplus * itemCountRight;
		val += 1 * n_A_Weapon2_ATKplus * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「エージェントカタール」の、素ＬＵＫによる効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_AGENT_KATAR, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_AGENT_KATAR, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 1 * Math.floor(SU_LUK / 2) * itemCountRight;
		val += 1 * Math.floor(SU_LUK / 2) * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「メテオストライク」の、スキル習得による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_METEOR_STRIKE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_METEOR_STRIKE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 5 * LearnedSkillSearch(SKILL_ID_ONO_SHUREN) * itemCountRight;
		val += 5 * LearnedSkillSearch(SKILL_ID_ONO_SHUREN) * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「錆びたアーム」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_SABITA_ARM, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_SABITA_ARM, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		if (n_A_Weapon_ATKplus >= 7) val += 15 * itemCountRight;
		if (n_A_Weapon2_ATKplus >= 7) val += 15 * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ヴァルキリーハンマー」の、職業による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_VALKYRIE_HAMMER, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_VALKYRIE_HAMMER, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {

		switch (GetLowerJobSeriesID(n_A_JOB)) {

		// ノービス系
		case JOB_SERIES_ID_NOVICE:
			val += 10 * itemCountRight;
			val += 10 * itemCountLeft;
			break;

		// ソードマン系
		case JOB_SERIES_ID_SWORDMAN:
			break;

		// マーチャント系
		case JOB_SERIES_ID_MERCHANT:
			val += 10 * itemCountRight;
			val += 10 * itemCountLeft;
			break;

		default:
			switch (GetHigherJobSeriesID(n_A_JOB)) {

			// プリースト系
			case JOB_SERIES_ID_PRIEST:
				break;

			// モンク系
			case JOB_SERIES_ID_MONK:
				break;
			}
		}
	}

	//----------------------------------------------------------------
	// 「アヴェンジャーショットガン」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_AVENGER_SHOTGUN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_AVENGER_SHOTGUN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		if (n_A_Weapon_ATKplus >= 9) val += 100 * itemCountRight;
		if (n_A_Weapon2_ATKplus >= 9) val += 100 * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「荒野の用心棒」の、素ＡＧＩによる効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_KOYANO_YOZINBO, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_KOYANO_YOZINBO, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		val += 1 * Math.floor(SU_AGI / 10) * itemCountRight;
		val += 1 * Math.floor(SU_AGI / 10) * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァダガー」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_DAGGER, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_DAGGER, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァブレイド」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_BLADE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_BLADE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァクレイモア」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_CRAYMORE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_CRAYMORE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァスピア」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_SPEAR, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_SPEAR, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァランス」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_RANCE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_RANCE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァアックス」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_AXE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_AXE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァツーハンドアックス」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_TWOHAND_AXE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_TWOHAND_AXE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァメイス」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_MACE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_MACE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァウィング」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_WING, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_WING, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァカタール」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_KATAR, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_KATAR, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァクロー」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_CRAW, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_CRAW, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァ風魔手裏剣」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_FUMA_SHURIKEN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_FUMA_SHURIKEN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァハンドガン」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_HANDGUN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_HANDGUN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァライフル」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_RIFLE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_RIFLE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァガトリングガン」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_GATLINGGUN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_GATLINGGUN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァショットガン」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_SHOTGUN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_SHOTGUN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァグレネードガン」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_GRENADEGUN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_GRENADEGUN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュダガー」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_DAGGER, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_DAGGER, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュブレイド」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_BLADE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_BLADE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュクレイモア」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_CRAYMORE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_CRAYMORE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュスピア」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_SPEAR, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_SPEAR, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュランス」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_RANCE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_RANCE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュアックス」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_AXE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_AXE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュツーハンドアックス」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_TWOHAND_AXE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_TWOHAND_AXE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュメイス」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_MACE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_MACE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュウィング」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_WING, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_WING, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュカタール」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_KATAR, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_KATAR, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュクロー」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_CRAW, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_CRAW, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュ風魔手裏剣」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_FUMA_SHURIKEN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_FUMA_SHURIKEN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュハンドガン」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_HANDGUN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_HANDGUN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュライフル」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_RIFLE, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_RIFLE, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュガトリングガン」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_GATLINGGUN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_GATLINGGUN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュショットガン」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_SHOTGUN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_SHOTGUN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュグレネードガン」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_GRENADEGUN, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_GRENADEGUN, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ディーヴァフォックステイル」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_DIVA_FOXTAIL, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_DIVA_FOXTAIL, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}

	//----------------------------------------------------------------
	// 「ミラージュフォックステイル」の、精錬による効果
	//----------------------------------------------------------------
	itemCountRight = EquipNumSearch(ITEM_ID_MIRRORAGE_FOXTAIL, EQUIP_REGION_ID_ARMS);
	itemCountLeft = EquipNumSearch(ITEM_ID_MIRRORAGE_FOXTAIL, EQUIP_REGION_ID_ARMS_LEFT);
	if ((itemCountRight > 0) || (itemCountLeft > 0)) {
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountRight;

		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 5;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 5;
		val += vartmp * itemCountLeft;
	}


// ★武器は両手に装備される可能性（アサシン、影狼など）を考慮すること
// 武器効果　ここまで
//------------------------------------------------------------------------------------------------
// 防具効果　ここから

	//----------------------------------------------------------------
	// 「盗賊の指輪」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_TOZOKUNO_YUBIWA)) > 0) {
		if (SU_STR >= 90) {
			val += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ブレイジングソウル」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_BLAZING_SOUL)) > 0) {
		if (SU_STR >= 120) {
			val += 3 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「囚人の服」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SHUZINNO_FUKU)) > 0) {
		val += 1 * n_A_BODY_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「ホワイトフェザー」の、精錬による効果（ペナルティ）
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_WHITE_FEATHER)) > 0) {
		vartmp = 0;

		if (n_A_HEAD_DEF_PLUS >= 5) vartmp += -10;
		if (n_A_HEAD_DEF_PLUS >= 7) vartmp += -3;
		if (n_A_HEAD_DEF_PLUS >= 9) vartmp += -3;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「百戦錬磨のお守り」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_HYAKUSENRENMANO_OMAMORI)) > 0) {
		vartmp = 0;

		if (SU_STR >= 100) vartmp += 2;
		if (SU_STR >= 120) vartmp += 3;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「狩人のマント」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KARYUDONO_MANT)) > 0) {
		val += 1 * Math.max(0, n_A_SHOULDER_DEF_PLUS - 5) * itemCount;
	}

	//----------------------------------------------------------------
	// 「剣聖の王冠」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KENSENO_OKAN)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_KEN_SHUREN) == 10) {
			val += 10 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「器用さのグローブ」の、素ＤＥＸによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_KIYOSANO_GLOVE)) > 0) {
		val += 1 * Math.floor(SU_DEX / 10) * itemCount;
	}

	//----------------------------------------------------------------
	// 「[衣装]ビギナー帽」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if ((itemCount = CostumeNumSearch(COSTUME_ID_BEGINNER_BO)) > 0) {

		if (n_A_BaseLV >= 99) {
			val += -30 * itemCount;
		}
		else {

			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_GVG:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_GVG_TE:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
				val += -30 * itemCount;
				break;

			default:
				val += -3 * Math.floor(n_A_BaseLV / 10) * itemCount;
				break;

			}
		}
	}

	//----------------------------------------------------------------
	// 「古びた迷彩ウサギフード」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_FURUBITA_MEISAIUSAGI)) > 0) {
		val += 2 * n_A_HEAD_DEF_PLUS * itemCount;
	}

	//----------------------------------------------------------------
	// 「炎竜の鎧」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_ENRYUNO_YOROI)) > 0) {
		vartmp = 0;

		if (n_A_BODY_DEF_PLUS >= 7) vartmp += 10;
		if (n_A_BODY_DEF_PLUS >= 9) vartmp += 10;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「マタギの剣鉈」の、素ＬＵＫによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_MATAGINO_KENNATA)) > 0) {
		if (SU_LUK >= 100) {
			val += 5 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「フリオニウィング」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_FURIONI_WING)) > 0) {
		vartmp = 0;

		if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 20;
		if (n_A_SHOULDER_DEF_PLUS >= 8) vartmp += 30;
		if (n_A_SHOULDER_DEF_PLUS >= 9) vartmp += 40;
		if (n_A_SHOULDER_DEF_PLUS >= 10) vartmp += 100;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「ラドゥーンの皮」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_RADOONNO_KAWA)) > 0) {
		if (n_A_SHOULDER_DEF_PLUS >= 8) {
			val += 5 * Math.floor((SU_AGI + SU_VIT) / 20) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ヘヴンリーオーダー」の、素ＳＴＲによる効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_HEAVENLY_ORDER)) > 0) {
		val += 2 * Math.floor(SU_STR / 18) * itemCount;
	}

	//----------------------------------------------------------------
	// 「試験管ブーツ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SHIKENKAN_BOOTS)) > 0) {
		val += 20 * LearnedSkillSearch(SKILL_ID_CART_BOOST_WS) * itemCount;
		val += 20 * LearnedSkillSearch(SKILL_ID_CART_BOOST_GENETIC) * itemCount;
	}


// 防具効果　ここまで
//------------------------------------------------------------------------------------------------
// カード効果　ここから

	//----------------------------------------------------------------
	// 「ソードガーディアンカード」の、武器種別による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_SWORD_GUARDIAN)) > 0) {
		if ((n_A_WeaponType == ITEM_KIND_SWORD) || (n_A_WeaponType == ITEM_KIND_SWORD_2HAND)) {
			val += 5 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ボウガーディアンカード」の、武器種別による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_BOW_GUARDIAN)) > 0) {
		if (n_A_WeaponType == ITEM_KIND_BOW) {
			val += 5 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「イフリートカード」の、ジョブレベルによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_EFREET)) > 0) {
		val += 1 * Math.floor(n_A_JobLV /10) * cardCount;
	}

	//----------------------------------------------------------------
	// 「ガーティー＝ウー（ＭＶＰ）カード」の、素ＬＵＫによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_GERTIE_UH_MVP)) > 0) {
		if (SU_LUK >= 110) {
			val += 20 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「ローラカード」の、武器種別による効果（ペナルティ）
	//----------------------------------------------------------------
	cardCountRight = CardNumSearch(CARD_ID_LOLA, CARD_REGION_ID_ARMS_RIGHT_ANY);
	cardCountLeft = CardNumSearch(CARD_ID_LOLA, CARD_REGION_ID_ARMS_LEFT_ANY);
	if ((cardCountRight > 0) || (cardCountLeft > 0)) {
		if (n_A_WeaponType == ITEM_KIND_CLUB) {
			val += -1 * (10 + 1 * n_A_Weapon_ATKplus) * cardCountRight;
			val += -1 * (10 + 1 * n_A_Weapon2_ATKplus) * cardCountLeft;
		}
	}

	//----------------------------------------------------------------
	// 「レオ」の、精錬による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_LEO, CARD_REGION_ID_HEAD_TOP_ANY)) > 0) {
		// 修羅限定の効果
		if (IsSameJobClass(JOB_ID_SHURA)) {
			val += 2 * n_A_HEAD_DEF_PLUS * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「メカニックハワード(MVP)カード」の、職業による効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_MECHANIC_HAWARD_MVP)) > 0) {
		if (IsSameJobClass(JOB_ID_MECHANIC)) {
			val += 20 * cardCount;
		}
	}

	//----------------------------------------------------------------
	// 「サジタリウス」の、精錬による効果
	//----------------------------------------------------------------
	cardCountHeadTop = CardNumSearch(CARD_ID_SAGITTARIUS, CARD_REGION_ID_HEAD_TOP_ANY);
	if (cardCountHeadTop > 0) {
		// 職業限定の効果
		if (IsSameJobClass(JOB_ID_RANGER)) {
			val += 5 * n_A_HEAD_DEF_PLUS * cardCountHeadTop;
		}
	}

	//----------------------------------------------------------------
	// 「古のメガリスカード」の、素ＶＩＴによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_INISHIENO_MEGLIS)) > 0) {
		val += 5 * Math.floor(SU_VIT / 10) * cardCount;
	}

	//----------------------------------------------------------------
	// 「E-EA1Lカード」の、武器種別による効果（ペナルティ）
	//----------------------------------------------------------------
	cardCountRight = CardNumSearch(CARD_ID_E_EA1L, CARD_REGION_ID_ARMS_RIGHT_ANY);
	cardCountLeft = CardNumSearch(CARD_ID_E_EA1L, CARD_REGION_ID_ARMS_LEFT_ANY);
	if ((cardCountRight > 0) || (cardCountLeft > 0)) {
		if (n_A_WeaponType == ITEM_KIND_BOW) {
			val += -1 * (10 + 1 * n_A_Weapon_ATKplus) * cardCountRight;
			val += -1 * (10 + 1 * n_A_Weapon2_ATKplus) * cardCountLeft;
		}
	}

	//----------------------------------------------------------------
	// 「コトネスカード」の、武器種別による効果（Hit ペナルティ）
	//----------------------------------------------------------------
	cardCountRight = CardNumSearch(CARD_ID_COTNESS, CARD_REGION_ID_ARMS_RIGHT_ANY);
	cardCountLeft = CardNumSearch(CARD_ID_COTNESS, CARD_REGION_ID_ARMS_LEFT_ANY);
	if ((cardCountRight > 0) || (cardCountLeft > 0)) {
		if ((n_A_WeaponType == ITEM_KIND_FIST)) {
			val -= (10 + 1 * n_A_Weapon_ATKplus) * cardCountRight;
			val -= (10 + 1 * n_A_Weapon2_ATKplus) * cardCountLeft;
		}
	}
	
	//----------------------------------------------------------------
	// 「ギガンテスカード」の、斧系統の効果
	//----------------------------------------------------------------
	cardCountRight = CardNumSearch(CARD_ID_GIGANTES, CARD_REGION_ID_ARMS_RIGHT_ANY);
	cardCountLeft = CardNumSearch(CARD_ID_GIGANTES, CARD_REGION_ID_ARMS_LEFT_ANY);
	if (cardCountRight > 0) {
		if ((n_A_WeaponType == ITEM_KIND_AXE) || (n_A_WeaponType == ITEM_KIND_AXE_2HAND)) {
			val += 15 * cardCountRight;
		}
	}
	if (cardCountLeft > 0) {
		if ((n_A_Weapon2Type == ITEM_KIND_AXE) || (n_A_Weapon2Type == ITEM_KIND_AXE_2HAND)) {
			val += 15 * cardCountLeft;
		}
	}

	//----------------------------------------------------------------
	// 「深海のセドラカード」の、楽器・鞭系統の効果
	//----------------------------------------------------------------
	cardCountRight = CardNumSearch(CARD_ID_SHINKAINO_CEDORA, CARD_REGION_ID_ARMS_RIGHT_ANY);
	cardCountLeft = CardNumSearch(CARD_ID_SHINKAINO_CEDORA, CARD_REGION_ID_ARMS_LEFT_ANY);
	if (cardCountRight > 0) {
		if ((n_A_WeaponType == ITEM_KIND_MUSICAL) || (n_A_WeaponType == ITEM_KIND_WHIP)) {
			val += 15 * cardCountRight;
		}
	}
	if (cardCountLeft > 0) {
		if ((n_A_Weapon2Type == ITEM_KIND_MUSICAL) || (n_A_Weapon2Type == ITEM_KIND_WHIP)) {
			val += 15 * cardCountLeft;
		}
	}

	//----------------------------------------------------------------
	// 「魔力中毒プラガカード」の、爪系統の効果
	//----------------------------------------------------------------
	cardCountRight = CardNumSearch(CARD_ID_MARYOKU_CHUDOKU_PLAGA, CARD_REGION_ID_ARMS_RIGHT_ANY);
	cardCountLeft = CardNumSearch(CARD_ID_MARYOKU_CHUDOKU_PLAGA, CARD_REGION_ID_ARMS_LEFT_ANY);
	if (cardCountRight > 0) {
		if (n_A_WeaponType == ITEM_KIND_FIST) {
			val += 15 * cardCountRight;
		}
	}
	if (cardCountLeft > 0) {
		if (n_A_Weapon2Type == ITEM_KIND_FIST) {
			val += 15 * cardCountLeft;
		}
	}

	//----------------------------------------------------------------
	// 「封印されたイフリートカード」の、ジョブレベルによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_ID_FUINSARETA_EFREET)) > 0) {
		val += 1 * Math.floor(n_A_JobLV /10) * cardCount;
	}

	//----------------------------------------------------------------
	// 「ハートハンターATカード」の、武器種別による効果（ペナルティ）
	//----------------------------------------------------------------
	cardCountRight = CardNumSearch(CARD_ID_HEART_HUNTER_AT, CARD_REGION_ID_ARMS_RIGHT_ANY);
	cardCountLeft = CardNumSearch(CARD_ID_HEART_HUNTER_AT, CARD_REGION_ID_ARMS_LEFT_ANY);
	if ((cardCountRight > 0) || (cardCountLeft > 0)) {
		if (n_A_WeaponType == ITEM_KIND_KATAR) {
			val += -1 * (10 + 1 * n_A_Weapon_ATKplus) * cardCountRight;
			val += -1 * (10 + 1 * n_A_Weapon2_ATKplus) * cardCountLeft;
		}
	}

// カード効果　ここまで
//------------------------------------------------------------------------------------------------
// エンチャント効果　ここから
// ★エンチャントは、複数の装備部位に適用される可能性を考慮すること

	//----------------------------------------------------------------
	// 「エンチャント　金牛宮」の、精錬による効果
	//----------------------------------------------------------------
	cardCountHeadTop = CardNumSearch(CARD_ID_ENCHANT_KINGYUKYU, CARD_REGION_ID_HEAD_TOP_ANY);
	if (cardCountHeadTop > 0) {
		vartmp = 0;

		if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 3;
		if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 1;

		val += vartmp * cardCountHeadTop
	}

	//----------------------------------------------------------------
	// 「名誉のニーヴ(命中)」の、精錬による効果
	//----------------------------------------------------------------
	cardCountRight	  = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_MEICHU, CARD_REGION_ID_ARMS_RIGHT_ANY);
	cardCountLeft	  = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_MEICHU, CARD_REGION_ID_ARMS_LEFT_ANY);
	cardCountHeadTop  = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_MEICHU, CARD_REGION_ID_HEAD_TOP_ANY);
	cardCountShield	  = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_MEICHU, CARD_REGION_ID_SHIELD_ANY);
	cardCountBody	  = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_MEICHU, CARD_REGION_ID_BODY_ANY);
	cardCountShoulder = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_MEICHU, CARD_REGION_ID_SHOULDER_ANY);
	cardCountShoes	  = CardNumSearch(CARD_ID_ENCHANT_MEIYONO_NIEVE_MEICHU, CARD_REGION_ID_SHOES_ANY);
	if (cardCountRight + cardCountLeft + cardCountHeadTop + cardCountShield
		+ cardCountBody + cardCountShoulder + cardCountShoes > 0) {

		// 右手武器へのエンチャント
		vartmp = 0;
		if (n_A_Weapon_ATKplus >= 7) vartmp += 10;
		if (n_A_Weapon_ATKplus >= 9) vartmp += 10;
		val += vartmp * cardCountRight

		// 左手武器へのエンチャント
		vartmp = 0;
		if (n_A_Weapon2_ATKplus >= 7) vartmp += 10;
		if (n_A_Weapon2_ATKplus >= 9) vartmp += 10;
		val += vartmp * cardCountLeft

		// 頭防具へのエンチャント
		vartmp = 0;
		if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 10;
		if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 10;
		val += vartmp * cardCountHeadTop

		// 盾防具へのエンチャント
		vartmp = 0;
		if (n_A_SHIELD_DEF_PLUS >= 7) vartmp += 10;
		if (n_A_SHIELD_DEF_PLUS >= 9) vartmp += 10;
		val += vartmp * cardCountShield

		// 体防具へのエンチャント
		vartmp = 0;
		if (n_A_BODY_DEF_PLUS >= 7) vartmp += 10;
		if (n_A_BODY_DEF_PLUS >= 9) vartmp += 10;
		val += vartmp * cardCountBody

		// 肩防具へのエンチャント
		vartmp = 0;
		if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 10;
		if (n_A_SHOULDER_DEF_PLUS >= 9) vartmp += 10;
		val += vartmp * cardCountShoulder

		// 靴防具へのエンチャント
		vartmp = 0;
		if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 10;
		if (n_A_SHOES_DEF_PLUS >= 9) vartmp += 10;
		val += vartmp * cardCountShoes

		// アクセサリへのエンチャント
		// 精錬できないので処理不要
	}

// ★エンチャントは、複数の装備部位に適用される可能性を考慮すること
// エンチャント効果　ここまで
//------------------------------------------------------------------------------------------------
// 装備セット効果　ここから

	//----------------------------------------------------------------
	// 「ホワイトフェザー　パイプタバコセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_WHITE_FEATHER_PIPE_TABACCO)) > 0) {
		vartmp = 0;

		if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 1;
		if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 1;

		val += vartmp * itemCount;
	}

	//----------------------------------------------------------------
	// 「太極の護符　灼熱の剣　デイヴィッドシールドセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_TAIKYOKUNO_GOFU_SHAKUNETSUNO_KEN_DIVID_SHIELD)) > 0) {
		val += 5 * n_A_Weapon_ATKplus * itemCount;
	}

	//----------------------------------------------------------------
	// 「太極の護符　浄化の剣　デイヴィッドシールドセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_TAIKYOKUNO_GOFU_ZYOKANO_KEN_DIVID_SHIELD)) > 0) {
		val += 5 * n_A_Weapon_ATKplus * itemCount;
	}

	//----------------------------------------------------------------
	// 「太極の護符　奈落の剣　デイヴィッドシールドセット」の、精錬による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_SET_ID_TAIKYOKUNO_GOFU_NARAKUNO_KEN_DIVID_SHIELD)) > 0) {
		val += 5 * n_A_Weapon_ATKplus * itemCount;
	}

	//----------------------------------------------------------------
	// 「エンチャント　Ａ－Ｈｉｔ　ライオットチップセット」の、精錬による効果
	//----------------------------------------------------------------
	if (EquipNumSearch(ITEM_SET_ID_RIOTCHIP_A_HIT)) {
		val += 5 * Math.floor(n_A_HEAD_DEF_PLUS / 3);
	}

	//----------------------------------------------------------------
	// 「豊穣の女神　イフリートカード」の、ジョブレベルによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_EFREET)) > 0) {
		val += 1 * n_A_JobLV * cardCount;
	}

	//----------------------------------------------------------------
	// 「豊穣の女神　封印されたイフリートカード」の、ジョブレベルによる効果
	//----------------------------------------------------------------
	if ((cardCount = CardNumSearch(CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_FUINSARETA_EFREET)) > 0) {
		val += 1 * Math.floor(n_A_JobLV / 2) * cardCount;
	}

// 装備セット効果　ここまで
//------------------------------------------------------------------------------------------------
// 自己スキル効果ここから

	//----------------------------------------------------------------
	// 「アーチャー　ワシの目」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_WASHINO_ME)) > 0) {
		val += 1 * sklLv;
	}

	//----------------------------------------------------------------
	// 「スナイパー　トゥルーサイト」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_TRUE_SIGHT)) > 0) {
		val += 3 * sklLv;
	}
	//----------------------------------------------------------------
	// 「二次職支援　トゥルーサイト」の、効果
	//----------------------------------------------------------------
	else if ((sklLv = g_confDataNizi[CCharaConfNizi.CONF_ID_TRUE_SIGHT]) > 0) {
		val += 3 * sklLv;
	}

	//----------------------------------------------------------------
	// 「ロードナイト　コンセントレイション」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_CONCENTRATION)) > 0) {
		val += 10 * sklLv;
	}
	//----------------------------------------------------------------
	// 「二次職支援　コンセントレイション」の、効果
	//----------------------------------------------------------------
	else if ((sklLv = g_confDataNizi[CCharaConfNizi.CONF_ID_CONCENTRATION]) > 0) {
		val += 10 * sklLv;
	}

	//----------------------------------------------------------------
	// 「ガンスリンガー　スネークアイ」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_SNAKE_EYE)) > 0) {
		val += 1 * sklLv;
	}

	//----------------------------------------------------------------
	// 「ガンスリンガー　アジャストメント」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_ADJUSTMENT)) > 0) {
		val -= 30;
	}

	//----------------------------------------------------------------
	// 「ガンスリンガー　インクリージングアキュラシー」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_INCREASING_ACCURACY)) > 0) {
		val += 20;
	}

	//----------------------------------------------------------------
	// 「ガンスリンガー　シングルアクション」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_SINGLE_ACTION)) > 0) {
		val += 2 * sklLv;
	}

	//----------------------------------------------------------------
	// 「ロイヤルガード　インスピレーション」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_INSPIRATION)) > 0) {
		val += 5 * sklLv + Math.floor(n_A_JobLV / 2);
	}
	else if (
		TimeItemNumSearch(TIME_ITEM_ID_ZETSUBONO_KAMI_MOROCC_CARD)
		|| TimeItemNumSearch(TIME_ITEM_ID_DEMI_FREYA)
		|| TimeItemNumSearch(TIME_ITEM_ID_MAKENSHI_SAKRAY_CARD)
		) {
		val += 5 * 1 + Math.floor(n_A_JobLV / 2);
	}

	//----------------------------------------------------------------
	// 「メカニック　斧鍛錬（メカニック）」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_ONO_SHUREN_MECHANIC)) > 0) {
		vartmp = 0;

		switch (n_A_WeaponType) {
		case ITEM_KIND_AXE:
		case ITEM_KIND_AXE_2HAND:
			vartmp = 3;
			break;

		case ITEM_KIND_CLUB:
			vartmp = 2;
			break;
		}

		val += vartmp * sklLv;
	}

	//----------------------------------------------------------------
	// 「ジェネティック　剣鍛錬（ジェネティック）」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_KEN_SHUREN_GENETIC)) > 0) {
		vartmp = 0;

		switch (n_A_WeaponType) {
		case ITEM_KIND_KNIFE:
		case ITEM_KIND_SWORD:
			vartmp = 3;
			break;
		}

		val += vartmp * sklLv;
	}

	//----------------------------------------------------------------
	// 「リベリオン　ヒートバレル」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_HEAT_BARREL)) > 0) {
		val -= (25 + 5 * sklLv);
	}

	//----------------------------------------------------------------
	// 「サモナー　生命の力」の、効果
	//----------------------------------------------------------------
	if ((sklLv = UsedSkillSearch(SKILL_ID_SEIMEINO_CHIKARA)) > 0) {
		val += 50;
	}


// 自己スキル効果　ここまで
//------------------------------------------------------------------------------------------------
// 支援スキル効果　ここから

	//----------------------------------------------------------------
	// 「ソウルリーパー　鷹の魂」の、効果
	//----------------------------------------------------------------
	if ((bufLv = g_confDataSanzi[CCharaConfSanzi.CONF_ID_TAKANO_TAMASHI]) > 0) {

		// 特定の戦闘エリアでの補正
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
			val += 50 + 50 * bufLv;
			break;

		default:
			val += 25 + 25 * bufLv;
			break;

		}
	}

	//----------------------------------------------------------------
	// 「支援ハミング」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_HUMMING)) > 0) {
		var bufferDexRank = ExBuffNumSearch(EXBUF_ID_HUMMING_BUFFER_DEXRANK);
		bufferSkillLv = ExBuffNumSearch(EXBUF_ID_HUMMING_BUFFER_SKILLLV);

		val += 20 + (2 * bufLv) + (bufferSkillLv) + (bufferDexRank);
	}

	//----------------------------------------------------------------
	// 「支援ゴスペル　ＨＩＴ、ＦＬＥＥ＋」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_GOSPEL_HIT_FLEE_PLUS)) > 0) {
		val += 50 * bufLv;
	}

	//----------------------------------------------------------------
	// 「ビュッシュ・ド・ノエル」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_BUCHE_DE_NOEL)) > 0) {
		val += 3 * bufLv;
	}

	//----------------------------------------------------------------
	// 「茶菓子」の、効果
	// 「シュバルツバルド産おやつ」の、効果
	// 「焼きトウモロコシ」の、効果
	// 「ガラナキャンディ」の、効果
	// 「ＯＴＰログインボーナス支援」の、効果
	// ※効果は、もっとも高いもののみ適用
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_CHAGASHI)) > 0) {
		val += 30 * bufLv;
	}
	else if ((bufLv = ExBuffNumSearch(EXBUF_ID_SCHWARZWALDSAN_OYATSU)) > 0) {
		val += 10 * bufLv;
	}
	else if ((bufLv = ExBuffNumSearch(EXBUF_ID_YAKITOMOROKOSHI)) > 0) {
		val += 10 * bufLv;
	}
	else if ((bufLv = ExBuffNumSearch(EXBUF_ID_OTP_LOGIN_BONUS)) > 0) {
		if ((bufLv == 4) || (bufLv == 3)) {
			val += 10;
		}
	}
	else if ((bufLv = ExBuffNumSearch(EXBUF_ID_GUARANA_CANDY)) > 0) {
		val += 5 * bufLv;
	}

	//----------------------------------------------------------------
	// 「期間限定イベント支援　ＨＩＴ」の、効果
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_EVENT_BUF_HIT_PLUS)) > 0) {
		val += bufLv;
	}

	//----------------------------------------------------------------
	// 「性能カスタマイズ　ＨＩＴ＋」の、効果（マイナスを許容）
	//----------------------------------------------------------------
	if ((bufLv = ExBuffNumSearch(EXBUF_ID_CUSTOM_HIT_PLUS)) != 0) {
		val += bufLv;
	}



	// TODO: 四次対応
	for (idx = ITEM_SP_HIT_PLUS; idx <= ITEM_SP_HIT_PLUS; idx++) {
		val = ApplySpecModify(idx, val);
	}

// 支援スキル効果　ここまで
//------------------------------------------------------------------------------------------------

	return val;
}















//================================================================================================
//================================================================================================
//====
//==== ＭａｘＨＰ　％ＵＰ　ここから
//====
//================================================================================================
//================================================================================================
/**
* 装備等によるステータスの追加補正値を取得する（ＭａｘＨＰ％）.
*/
function GetStatusModifyTEMPPlus() {

	var val = 0;

	var vartmp = 0, varary = [];
	var itemCount = 0;
	var itemCountRight = 0, itemCountLeft = 0;
	var itemCountHeadTop = 0, itemCountHeadMid = 0, itemCountHeadUnder = 0;
	var itemCountShield = 0, itemCountBody = 0, itemCountShoulder = 0, itemCountShoes = 0;
	var itemCountAccessary1 = 0, itemCountAccessary2 = 0;
	var cardCount = 0;
	var cardCountRight = 0, cardCountLeft = 0;
	var cardCountHeadTop = 0, cardCountHeadMid = 0, cardCountHeadUnder = 0;
	var cardCountShield = 0, cardCountBody = 0, cardCountShoulder = 0, cardCountShoes = 0;
	var cardCountAccessary1 = 0, cardCountAccessary2 = 0;
	var sklLv = 0;
	var bufLv = 0;
	var bufferJobLv = 0, bufferSkillLv = 0;


//------------------------------------------------------------------------------------------------
// 武器効果　ここから
// ★武器は両手に装備される可能性（アサシン、影狼など）を考慮すること

// ★武器は両手に装備される可能性（アサシン、影狼など）を考慮すること
// 武器効果　ここまで
//------------------------------------------------------------------------------------------------
// 防具効果　ここから

// 防具効果　ここまで
//------------------------------------------------------------------------------------------------
// カード効果　ここから

// カード効果　ここまで
//------------------------------------------------------------------------------------------------
// エンチャント効果　ここから
// ★エンチャントは、複数の装備部位に適用される可能性を考慮すること

// ★エンチャントは、複数の装備部位に適用される可能性を考慮すること
// エンチャント効果　ここまで
//------------------------------------------------------------------------------------------------
// 装備セット効果　ここから

// 装備セット効果　ここまで
//------------------------------------------------------------------------------------------------
// 自己スキル効果ここから

// 自己スキル効果　ここまで
//------------------------------------------------------------------------------------------------
// 支援スキル効果　ここから

// 支援スキル効果　ここまで
//------------------------------------------------------------------------------------------------

	return val;
}
