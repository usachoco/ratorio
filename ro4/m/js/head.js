
// データ収集用
// バトルデータインデックス
CGlobalConstManager.DefineEnum(
	"EnumBattleDataIndex",
	[
		"BATTLE_DATA_INDEX_ACTIVE_SKILL",
		"BATTLE_DATA_INDEX_ATTACK_ELEMENT",
		"BATTLE_DATA_INDEX_RANGE_FLAG",

		"BATTLE_DATA_INDEX_STRDEX_BONUS",
		"BATTLE_DATA_INDEX_STRDEX_PENARTY",

		"BATTLE_DATA_INDEX_SIZE_MODIFY",
		"BATTLE_DATA_INDEX_HIT_RATE",
		"BATTLE_DATA_INDEX_HIT_RATE_AUTO_SPELL",
		"BATTLE_DATA_INDEX_HIT_RATE_DISP",
		"BATTLE_DATA_INDEX_CRITICAL_RATE",
		"BATTLE_DATA_INDEX_AVOID_RATE",

		"BATTLE_DATA_INDEX_BASE_DAMAGE_MIN",
		"BATTLE_DATA_INDEX_BASE_DAMAGE_AVE",
		"BATTLE_DATA_INDEX_BASE_DAMAGE_MAX",
		"BATTLE_DATA_INDEX_BASE_DAMAGE_MIN_GX",
		"BATTLE_DATA_INDEX_BASE_DAMAGE_AVE_GX",
		"BATTLE_DATA_INDEX_BASE_DAMAGE_MAX_GX",
		"BATTLE_DATA_INDEX_BASE_DAMAGE_MIN_QUAKE",
		"BATTLE_DATA_INDEX_BASE_DAMAGE_AVE_QUAKE",
		"BATTLE_DATA_INDEX_BASE_DAMAGE_MAX_QUAKE",
		"BATTLE_DATA_INDEX_CRITICAL_ATK_MIN",
		"BATTLE_DATA_INDEX_CRITICAL_ATK_AVE",
		"BATTLE_DATA_INDEX_CRITICAL_ATK_MAX",
		"BATTLE_DATA_INDEX_ARMS_ATK_MIN",
		"BATTLE_DATA_INDEX_ARMS_ATK_AVE",
		"BATTLE_DATA_INDEX_ARMS_ATK_MAX",

		"BATTLE_DATA_INDEX_HAND_ATK_PSYCO_FIX",
		"BATTLE_DATA_INDEX_HAND_ATK",

		"BATTLE_DATA_INDEX_GUIDED_DAMAGE",
		"BATTLE_DATA_INDEX_ATTACK_COUNT_MIN",
		"BATTLE_DATA_INDEX_ATTACK_COUNT_AVE",
		"BATTLE_DATA_INDEX_ATTACK_COUNT_MAX",
		"BATTLE_DATA_INDEX_DAMAGE_PER_SECOND",
		"BATTLE_DATA_INDEX_FINAL_DAMAGE_MIN",
		"BATTLE_DATA_INDEX_FINAL_DAMAGE_AVE",
		"BATTLE_DATA_INDEX_FINAL_DAMAGE_MAX",
		"BATTLE_DATA_INDEX_RECEIVE_DAMAGE_MIN",
		"BATTLE_DATA_INDEX_RECEIVE_DAMAGE_AVE",
		"BATTLE_DATA_INDEX_RECEIVE_DAMAGE_MAX",
		"BATTLE_DATA_INDEX_REFLECT_DAMAGE_MIN_RS",
		"BATTLE_DATA_INDEX_REFLECT_DAMAGE_AVE_RS",
		"BATTLE_DATA_INDEX_REFLECT_DAMAGE_MAX_RS",
		"BATTLE_DATA_INDEX_REFLECT_DAMAGE_MIN_SPEC",
		"BATTLE_DATA_INDEX_REFLECT_DAMAGE_AVE_SPEC",
		"BATTLE_DATA_INDEX_REFLECT_DAMAGE_MAX_SPEC",
		"BATTLE_DATA_INDEX_REFLECT_DAMAGE_MIN_SHIELD_SPELL",
		"BATTLE_DATA_INDEX_REFLECT_DAMAGE_AVE_SHIELD_SPELL",
		"BATTLE_DATA_INDEX_REFLECT_DAMAGE_MAX_SHIELD_SPELL",
		"BATTLE_DATA_INDEX_RECEIVE_DAMAGE_AVOIDS",
	],
	0,
	1
);












SaveDataAll = new Array();
for(var i=0;i<=19;i++) SaveDataAll[i] = "ZZZZ";
SaveNameAll = new Array();
for(var i=0;i<=500;i++) SaveNameAll[i] = "ZZZZ";
n_Nitou=0;
n_Ses=0;
n_Enekyori=0;
n_Skill1SW=0;
n_Skill2SW=0;
n_Skill3SW=0;
n_Skill4SW=0;
n_Skill5SW=0;
n_Skill6SW=0;
n_Skill7SW=0;
n_Skill8SW=0;
n_Skill9SW=0;
n_Skill10SW=0;
wLAch=0;
TyouEnkakuSousa3dan = 0;
not_use_card = 0;
str_bSUBname = "";
str_bSUB = "";
cast_kotei = 0;
b = 0;
n_PerfectHIT_DMG = 0;
n_Delay = [0,0,0,0,0,0,0,0];
wDelay = 0;
n_KoteiCast = 0;
n_tok = new Array();
n_tok_no_limit = new Array();
for(var i=0;i<=450;i++) {
	n_tok[i] = 0;
	n_tok_no_limit[i] = 0;
}
first_check = 0;
Last_DMG_A = [0,0,0];
Last_DMG_B = [0,0,0];
n_Buki_Muri = 0;
g_bSkillNoDamage = false;
n_Heal_MATK = [0,0,0];
n_MagicCalcType=0;
n_AS_MODE=0;
n_AS_HIT=0;
BK_Weapon_zokusei = 0;
n_AS_check_3dan = 0;
n_A_Kotei_Cast_Keigen = 0;
n_DEATH_BOUND = [0,0,0,0];
n_CONFIG = [0,33,19];
B_Total_DEF = 0;
B_Total_MDEF = 0;
w_DMG_AS_OverHP = 0;
n_A_DMG_GX = [0,0,0];
n_A_DMG_QUAKE = [0,0,0];
n_A_QUAKE_KIRI = 0;
//n_A_StatusATK_GX = 0;
n_A_GX_HANDO = 0;
n_NitouCalc = 0;
SG_Special_HITnum = 0;
SG_Special_DMG = [0,0,0];

n_A_Arrow = 0;

CAST_PARAM_BORDER = 265;

delayDownForDisp = 0;
aspdRaw = 0;

// ダメージ表示部のテキスト配列（最小、平均、最大）
// 旧 InnStr での組み立てから、３桁区切り対応で部分改造
g_damageTextArray = [];
g_damageTextArray[0] = [];
g_damageTextArray[1] = [];
g_damageTextArray[2] = [];


Item_or_Card = "Item";
ItemCardNumberCheck = 142;

g_wHITsuu_Array = null;
g_perfectHitRate = 0;
g_bUnknownCasts = false;
g_bDefinedDamageIntervals = false;

function BuildUpNumberSelect(objSelect, nMin, nMax) {

	var idx = 0;
	var n = 0;

	for (idx = 0, n = nMin; n <= nMax; idx++, n++) {
		objSelect.options[idx] = new Option(n, n);
	}

}

function BuildUpNumberSelectWithZeroOff(objSelect, nMin, nMax) {

	var idx = 0;
	var n = 0;

	objSelect.options[0] = new Option("off", 0);

	for (idx = 1, n = nMin; n <= nMax; idx++, n++) {
		objSelect.options[idx] = new Option(n, n);
	}

}



function myInnerHtml(wIH1,wIH2,wIH3) {
	if(g_SPMODE_FLAG == 1) return;
	if(wIH3 == 0){
		wIHOB = document.getElementById(wIH1);

if (wIHOB == null) {
	var i = 10;
}

		while(wIHOB.hasChildNodes()){
			wIHOB.removeChild(wIHOB.firstChild);
		}
		wIHOB.innerHTML = wIH2;
	}else{
		wIHOB = document.getElementById(wIH1);
		wIHOB.insertAdjacentHTML('BeforeEnd',wIH2);
	}
}
w_AG=[100,95,90,86,82,79,76,74,72,71,70];

mostEffectiveElmIdArray = [
	ELM_ID_VANITY,
	ELM_ID_WIND,
	ELM_ID_FIRE,
	ELM_ID_WATER,
	ELM_ID_EARTH,
	ELM_ID_HOLY,
	ELM_ID_DARK,
	ELM_ID_HOLY,
	ELM_ID_PSYCO,
	ELM_ID_HOLY,
];






WeaponName = ["素手","短剣","片手剣","両手剣","片手槍","両手槍","片手斧","両手斧","鈍器","杖","弓","カタール","本","ナックル","楽器","鞭","風魔手裏剣","ハンドガン","ライフル","ショットガン","ガトリングガン","グレネードガン","両手杖"];

 SyurikenOBJ = [ [10,0,"手裏剣"] ,[30,0,"雨雲の手裏剣"] ,[45,0,"閃光の手裏剣"] ,[70,0,"鋭刃の手裏剣"] ,[100,0,"棘針の手裏剣"] ,[110,0,"星ヒトデ"] ];
 KunaiOBJ = [ [30,3,"烈火の苦無"] ,[30,1,"氷柱の苦無"] ,[30,4,"狂風の苦無"] ,[30,2,"黒土の苦無"] ,[30,5,"猛毒の苦無"] ,[50,0,"スルメイカ"] ,[50,0,"トビウオ"] ];
 CanonOBJ = [ [100,0,"キャノンボール"], [250,0,"アイアンキャノンボール"], [120,6,"ホーリーキャノンボール"], [120,7,"ダークキャノンボール"], [120,8,"ソウルキャノンボール"], [120,ELM_ID_WATER,"アイスキャノンボール"], [120,ELM_ID_EARTH,"ストーンキャノンボール"], [120,ELM_ID_FIRE,"フレアキャノンボール"], [120,ELM_ID_WIND,"ライトニングキャノンボール"] ];
 SyuzokuOBJ = ["無形","不死","動物","植物","昆虫","魚類","悪魔","人間","天使","竜族"];
 ZokuseiOBJ = ["無","水","地","火","風","毒","聖","闇","念","不死"];
 SizeOBJ = ["小型","中型","大型"];
 IjyouOBJ = ["毒","スタン","凍結","呪い","暗黒","睡眠","沈黙","混乱","出血","石化","武器破壊","鎧破壊"];
 SubName = ["％","秒","ダメージ","クリティカルダメージ","クリティカル(発動率)","10000回以上","計測不能","計算外","×","詠唱時間","なし","あり"];

// 修練が乗らないスキル
n_SP_SKILL = [66,159,162,193,197,244,248,263,321,324,328,384,394,395,405,423,432,438,554,669,723,738,768,769,810, SKILL_ID_ZYURYOKU_CHOSE];





/**
 * ダメージ計算本体　エントリ関数.
 * @param battleCalcInfo 戦闘計算情報
 * @param charaData キャラデータ
 * @param specData 特性データ
 * @param mobData 対象データ
 * @param attackMethodConfArray 攻撃手段設定データ配列
 * @return 全戦闘結果情報インスタンス（CBattleCalcResultAll クラスのインスタンス）
 */
function BattleCalc999(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray) {

	var idx = 0;
	var idxChild = 0;
	var idxAS = 0;
	var ret = null;

	var bPoisonReactRevengeNormal = false;
	var actRate = 0;
	var skillId = 0;
	var skillIdOrigin = 0;
	var cloned = null;
	var dmgRate = 0;
	var dmgRateArray = null;
	var valueWork = 0;
	var resultWork = null;
	var bCommonAppend = true;
	var battleCalcInfoArray = null;

	var battleCalcResultAll = null;



	// 戻り値用インスタンス用意
	battleCalcResultAll = new CBattleCalcResultAll();

	// 基本情報を設定
	battleCalcResultAll.charaData = charaData;
	battleCalcResultAll.specData = specData;
	battleCalcResultAll.mobData = mobData;





	// ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	//
	// 新処理：通常攻撃の分解再起呼び出し
	//
	// 　オートスペル等のスキルにIDを挿げ替えて再起呼び出し
	// 　三段掌、フィアブリ、DA、オートスペル、スペルフィスト、（カタール追撃）
	//
	// 　ただし、ここで再起呼び出しすると、特化が二重にかかるので、
	// 　この関数の冒頭で再起呼び出しする
	//
	// ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★

	// ポイズンリアクトの通常攻撃による反撃判定
	bPoisonReactRevengeNormal = false;

	if (battleCalcInfo.skillId == SKILL_ID_POISON_REACT) {
		if (GetMonseterElmBasicType(mobData[MONSTER_DATA_INDEX_ELEMENT]) == ELM_ID_POISON) {
			bPoisonReactRevengeNormal = true;
		}
	}



	//--------------------------------------------------------------------------------------------------------------------------------
	//
	// 通常攻撃系
	//
	//--------------------------------------------------------------------------------------------------------------------------------

	// 通常攻撃、スペルフィスト、ポイズンリアクトの通常攻撃による反撃
	if (
		(battleCalcInfo.skillId == SKILL_ID_TUZYO_KOGEKI)
		|| (battleCalcInfo.skillId == SKILL_ID_SPELL_FIST)
		|| (bPoisonReactRevengeNormal)
	) {

		// TODO: これの効能未特定
		// ポイズンリアクトの通常攻撃による反撃の場合は、攻撃間隔判定不能フラグを立てる
		if (bPoisonReactRevengeNormal) {
			n_Delay[0] = 1;
		}

		// TODO: ポイズンリアクトでオートスペルや三段掌等が発動するか未検証



		skillIdOrigin = n_A_ActiveSkill;



		//----------------------------------------------------------------
		// 主撃が通常攻撃の場合
		//----------------------------------------------------------------
		if ((battleCalcInfo.skillId == SKILL_ID_TUZYO_KOGEKI) || (bPoisonReactRevengeNormal)) {

			// 右手計算
			cloned = battleCalcInfo.Clone();
			cloned.skillId = SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT;
			cloned.actRate = GetActRateNormal(battleCalcInfo.skillId, mobData);
			battleCalcResultAll.AddPassiveResult(undefined, BattleCalc999Body(cloned, charaData, specData, mobData, attackMethodConfArray, false));

			// 二刀流、左手計算
			if (n_Nitou) {
				cloned = battleCalcInfo.Clone();
				cloned.skillId = SKILL_ID_TUZYO_KOGEKI_CALC_LEFT;
				cloned.actRate = 100;
				cloned.criRate = battleCalcInfo.criRate;
				// 左手ATKを参照するように
				cloned.atkUnitArrayWpn.splice(0, 1);
				cloned.atkUnitArrayCri.splice(0, 1);
				battleCalcInfo.masteryAtk = battleCalcInfo.masteryAtkLeft;
				// 右手計算結果の子要素として設定する
				battleCalcResultAll.AddPassiveResult(SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT, BattleCalc999Body(cloned, charaData, specData, mobData, attackMethodConfArray, true));
			}

			// 二刀流ではなく、カタール追撃
			else if (n_A_WeaponType == ITEM_KIND_KATAR) {

				// 右手の計算結果を所定の倍率にすることで、再計算を省略する
				cloned = battleCalcResultAll.GetPassiveResult(0).Clone();

				// スキル情報の設定
				cloned.skillId = SKILL_ID_TUZYO_KOGEKI_CALC_KATAR_APPEND;
				cloned.actRate = 100;
				cloned.criRate = battleCalcInfo.criRate;

				// ダメージ倍率を計算
				dmgRate = 0.01 + (0.02 * UsedSkillSearch(SKILL_ID_DOUBLE_ATTACK, true));

				// ダメージを調整
				for (idx = 0; idx < cloned.dmgUnitArray.length; idx++) {
					cloned.dmgUnitArray[idx][0] = Math.floor(cloned.dmgUnitArray[idx][0] * dmgRate);
					cloned.dmgUnitArray[idx][1] = Math.floor(cloned.dmgUnitArray[idx][1] * dmgRate);
					cloned.dmgUnitArray[idx][2] = Math.floor(cloned.dmgUnitArray[idx][2] * dmgRate);
				}

				// 結果保存
				battleCalcResultAll.AddPassiveResult(SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT, cloned);
			}
		}

		//----------------------------------------------------------------
		// 主撃がスペルフィストの場合
		//----------------------------------------------------------------
		else if (battleCalcInfo.skillId == SKILL_ID_SPELL_FIST) {

			// 戦闘情報の加工
			cloned = battleCalcInfo.Clone();

			// ボルトの種類指定を取得
			switch ("" + attackMethodConfArray[0].GetOptionValue(0)) {
			case "0":
				valueWork = SKILL_ID_FIRE_BOLT;
				break;
			case "1":
				valueWork = SKILL_ID_COLD_BOLT;
				break;
			case "2":
				valueWork = SKILL_ID_LIGHTNING_BOLT;
				break;
			}

			// スキル情報を補正
			cloned.skillId = valueWork;
			cloned.parentSkillId = SKILL_ID_SPELL_FIST;

			// スキル情報修正
			cloned.actRate = 100 - GetActRateDA(cloned.skillId, mobData);
			cloned.criRate = 0;

			// 計算呼び出し＆結果保存
			battleCalcResultAll.AddPassiveResult(undefined, BattleCalc999Body(cloned, charaData, specData, mobData, attackMethodConfArray, false));
		}



		//----------------------------------------------------------------
		// 三段掌計算
		// （主撃が通常攻撃の場合のみ）
		//----------------------------------------------------------------
		if (battleCalcInfo.skillId == SKILL_ID_TUZYO_KOGEKI) {

			actRate = GetActRateSandansho(battleCalcInfo.skillId, mobData);
			if (actRate > 0) {
				cloned = battleCalcInfo.Clone();
				cloned.skillId = SKILL_ID_SANDANSHO;
				cloned.skillLv = UsedSkillSearch(SKILL_ID_SANDANSHO);
				cloned.actRate = actRate;
				battleCalcResultAll.AddPassiveResult(undefined, BattleCalc999Body(cloned, charaData, specData, mobData, attackMethodConfArray, false));
			}
		}

		//----------------------------------------------------------------
		// フィアーブリーズ計算
		// （主撃が通常攻撃の場合のみ）
		//----------------------------------------------------------------
		if (battleCalcInfo.skillId == SKILL_ID_TUZYO_KOGEKI) {

			actRate = GetActRateFearBleath(battleCalcInfo.skillId, mobData);
			if (actRate > 0) {

				// 右手の計算結果を倍にすることで、再計算を省略する

				// 右手の計算結果をクローン
				cloned = battleCalcResultAll.GetPassiveResult(0).Clone();

				// スキル情報の設定
				cloned.skillId = SKILL_ID_FEAR_BLEATH;
				cloned.skillLv = UsedSkillSearch(SKILL_ID_FEAR_BLEATH);
				cloned.actRate = actRate;
				cloned.criRate = battleCalcInfo.criRate;

				// ダメージ倍率を計算
				dmgRateArray = [];
				// 攻撃回数は、最小２回～最大（１＋レベル）回
				dmgRateArray[0] = 1 + 1;
				dmgRateArray[1] = 1 + 1;
				dmgRateArray[2] = 1 + Math.max(1, cloned.skillLv - 1);
				// スキルレベルによっては、平均攻撃回数を計算しなおす
				if (cloned.skillLv == 3) {
					dmgRateArray[1] = (2 * 20 + 3 * 15) / 35;
				}
				else if(cloned.skillLv == 4) {
					dmgRateArray[1] = (2 * 20 + 3 * 15 + 4 * 10) / 45;
				}
				else if(cloned.skillLv == 5) {
					dmgRateArray[1] = (2 * 20 + 3 * 15 + 4 * 10 + 5 * 5) / 50;
				}

				// ダメージ倍率を適用する
				for (idx = 0; idx < cloned.dmgUnitArray.length; idx++) {
					cloned.dmgUnitArray[idx][0] = cloned.dmgUnitArray[idx][0] * dmgRateArray[0];
					cloned.dmgUnitArray[idx][1] = cloned.dmgUnitArray[idx][1] * dmgRateArray[1];
					cloned.dmgUnitArray[idx][2] = cloned.dmgUnitArray[idx][2] * dmgRateArray[2];
				}


				// 結果保存
				battleCalcResultAll.AddPassiveResult(undefined, cloned);
			}
		}

		//----------------------------------------------------------------
		// ダブルアタック計算
		// （主撃が通常攻撃、または、スペルフィストの場合のみ）
		//----------------------------------------------------------------
		if ((battleCalcInfo.skillId == SKILL_ID_TUZYO_KOGEKI) || (battleCalcInfo.skillId == SKILL_ID_SPELL_FIST)) {

			actRate = GetActRateDA(battleCalcInfo.skillId, mobData);
			if (actRate > 0) {

				// 右手の計算結果を倍にすることで、再計算を省略する

				// 右手の計算結果をクローン
				cloned = battleCalcResultAll.GetPassiveResult(0).Clone();

				// スキル情報の設定
				if ((n_A_WeaponType == ITEM_KIND_HANDGUN) && (UsedSkillSearch(SKILL_ID_CHAIN_ACTION) > 0)) {
					cloned.skillId = SKILL_ID_CHAIN_ACTION;
				}
				else if (IsGunSeriesArms(n_A_WeaponType) && (UsedSkillSearch(SKILL_ID_ETERNAL_CHAIN) > 0)) {
					cloned.skillId = SKILL_ID_CHAIN_ACTION;
				}
				else {
					cloned.skillId = SKILL_ID_DOUBLE_ATTACK;
				}
				cloned.skillLv = UsedSkillSearch(SKILL_ID_DOUBLE_ATTACK);
				cloned.actRate = actRate;

				// ダメージをすべて倍にする
				for (idx = 0; idx < cloned.dmgUnitArray.length; idx++) {
					cloned.dmgUnitArray[idx][0] = cloned.dmgUnitArray[idx][0] * 2;
					cloned.dmgUnitArray[idx][1] = cloned.dmgUnitArray[idx][1] * 2;
					cloned.dmgUnitArray[idx][2] = cloned.dmgUnitArray[idx][2] * 2;
				}

				// カタールの追撃があれば、それも倍にする
				for (idxChild = 0; idxChild < cloned.childResultArray.length; idxChild++) {
					if (cloned.childResultArray[idxChild].skillId != SKILL_ID_TUZYO_KOGEKI_CALC_KATAR_APPEND) {
						continue;
					}

					resultWork = cloned.childResultArray[idxChild];

					for (idx = 0; idx < resultWork.dmgUnitArray.length; idx++) {
						resultWork.dmgUnitArray[idx][0] = resultWork.dmgUnitArray[idx][0] * 2;
						resultWork.dmgUnitArray[idx][1] = resultWork.dmgUnitArray[idx][1] * 2;
						resultWork.dmgUnitArray[idx][2] = resultWork.dmgUnitArray[idx][2] * 2;
					}
				}


				// 結果保存
				battleCalcResultAll.AddPassiveResult(undefined, cloned);
			}
		}



		n_A_ActiveSkill = skillIdOrigin;

	}

	//--------------------------------------------------------------------------------------------------------------------------------
	//
	// アクティブスキル系
	//
	//--------------------------------------------------------------------------------------------------------------------------------
	else {
		// 発生率を 100% に補正
		battleCalcInfo.actRate = 100;
		// 戦闘情報配列を用意
		battleCalcInfoArray = [battleCalcInfo];
		// 追撃があるスキルなど、戦闘情報配列を加工（追加）
		// 倍率などの細かい制御は、各スキルのダメージ計算処理部で実装
		bCommonAppend = false;
		skillId = parseInt(battleCalcInfo.skillId, 10);
		// 単発追撃系
		switch (skillId) {
			case SKILL_ID_METEOR_STORM_BUSTER:
			case SKILL_ID_ARBITRIUM:
			case SKILL_ID_CRYSTAL_IMPACT:
			case SKILL_ID_CRYMSON_ARROW:
			case SKILL_ID_ROSE_BLOSSOM:
			case SKILL_ID_RYUSE_RAKKA:
				bCommonAppend = true;
				break;
			case SKILL_ID_DESTRACTIVE_HURRICANE:
				bCommonAppend = (UsedSkillSearch(SKILL_ID_CLIMAX) == 1);
				break;
			case SKILL_ID_SEKIEN_HOU:
			case SKILL_ID_REIKETSU_HOU:
			case SKILL_ID_RAIDEN_HOU:
			case SKILL_ID_KINNRYUU_HOU:
			case SKILL_ID_ANTEN_HOU:
			case SKILL_ID_KAGE_NO_MAI:
			case SKILL_ID_KUNAI_WAIKYOKU:
				// 蜃気楼分身が召喚されている場合
				bCommonAppend = (attackMethodConfArray[0].GetOptionValue(0) > 0);
				break;
			case SKILL_ID_GENZYUTSU_ANKOKURYUU:
				// 悪夢の場合
				bCommonAppend = (attackMethodConfArray[0].GetOptionValue(0) == 1);
				break;
			case SKILL_ID_FUMASHURIKEN_KOUCHIKU:
				// 風魔手裏剣トラップが存在する場合
				bCommonAppend = (attackMethodConfArray[0].GetOptionValue(0) == 1);
				break;

		}
		// 追撃フラグが立っていれば、汎用追撃構造を構築
		if (bCommonAppend) {
			// 戦闘情報をクローン
			cloned = battleCalcInfo.Clone();
			cloned.parentSkillId = battleCalcInfo.skillId;
			// 配列追加
			battleCalcInfoArray.push(cloned);
		}
		// 順に呼び出し
		for (idx = 0; idx < battleCalcInfoArray.length; idx++) {
			battleCalcResultAll.AddActiveResult(((idx == 0) ? undefined : battleCalcInfoArray[idx].parentSkillId), BattleCalc999Body(battleCalcInfoArray[idx], charaData, specData, mobData, attackMethodConfArray, false));
		}
	}

	//----------------------------------------------------------------
	// オートスペル計算
	// （主撃が通常攻撃、または、スペルフィストの場合のみ）
	//
	// 別の場所（通常の呼び出しフロー直前）で、特定処理実施済み（AS_Calc()）
	// グローバル変数 n_AS_SKILL に、多次元配列データが入っているので、ここから計算処理を呼び出す
	//----------------------------------------------------------------
	if (n_AS_SKILL.length > 0) {
		// オートスペルフラグ ON
		n_AS_MODE = 1;
	}
	for (idxAS = 0; idxAS < n_AS_SKILL.length; idxAS++) {
		// 発動率不明は除外
		if (n_AS_SKILL[idxAS][2] <= 0) {
			continue;
		}
		cloned = battleCalcInfo.Clone();
		cloned.bAutoSpell = true;
		cloned.skillId = n_AS_SKILL[idxAS][0];
		cloned.skillLv = n_AS_SKILL[idxAS][1];
		cloned.actRate = n_AS_SKILL[idxAS][2] / 10;		// 千分率単位から百分率単位へ
		// 確率追撃配列に追加する
		battleCalcResultAll.AddAppendResult(undefined, BattleCalc999Body(cloned, charaData, specData, mobData, attackMethodConfArray, false));
	}
	// オートスペルフラグ OFF
	n_AS_MODE = 0;

	return battleCalcResultAll;
}



function BattleCalc999Body(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, bLeft) {

	var idx = 0;
	var idxUnit = 0;

	var battleCalcResult = null;

	var dmgUnitArray = null;
	var bCri = false;



	// ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	//
	// 呼び出し元から移植
	// TODO: デスバウンド計算からの再起呼び出しが未チェック
	//
	// ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★



	//----------------------------------------------------------------
	//
	// 結果用インスタンスの用意
	//
	//----------------------------------------------------------------
	battleCalcResult = new CBattleCalcResult();

	battleCalcResult.skillId = battleCalcInfo.skillId;
	battleCalcResult.skillLv = battleCalcInfo.skillLv;
	battleCalcResult.actRate = battleCalcInfo.actRate;
	battleCalcResult.criRate = battleCalcInfo.criRate;
	battleCalcResult.parentSkillId = battleCalcInfo.parentSkillId;
	battleCalcResult.bAutoSpell = battleCalcInfo.bAutoSpell;
	battleCalcResult.coolTime = battleCalcInfo.coolTime;
	battleCalcResult.delaySkill = battleCalcInfo.delaySkill;





	//----------------------------------------------------------------
	//
	// ATKの取得、計算対象配列の設定
	//
	//----------------------------------------------------------------

	//--------------------------------
	// 暫定復元処理
	//--------------------------------
	n_A_ActiveSkill = battleCalcInfo.skillId;
	n_A_ActiveSkillLV = battleCalcInfo.skillLv;
	n_A_DMG = battleCalcInfo.atkUnitArrayWpn[0].slice();
	n_A_CriATK = battleCalcInfo.atkUnitArrayCri[0].slice();
	BK_n_A_DMG_Wolf = battleCalcInfo.atkUnitArrayWug[0].slice();

	dmgUnitArray = [n_A_DMG, n_A_CriATK];



	//----------------------------------------------------------------
	//
	// 物理特化の適用
	//
	//----------------------------------------------------------------
	for (idxUnit = 0; idxUnit < dmgUnitArray.length; idxUnit++) {
		for (idx = 0; idx < dmgUnitArray[idxUnit].length; idx++) {
			dmgUnitArray[idxUnit][idx] = ApplyPhysicalSpecializeMonster(charaData, specData, mobData, dmgUnitArray[idxUnit][idx]);
		}
	}



	//----------------------------------------------------------------
	//
	// スパイダーウェブ効果の適用
	//
	//----------------------------------------------------------------
	if (!bLeft) {
		var wBaiA = GetSpiderWebDamageRatio();

		if (wBaiA != 0) {
			for (idxUnit = 0; idxUnit < dmgUnitArray.length; idxUnit++) {
				for (idx = 0; idx < dmgUnitArray[idxUnit].length; idx++) {
					dmgUnitArray[idxUnit][idx] = Math.floor(dmgUnitArray[idxUnit][idx] * (100 + wBaiA) / 100);
				}
			}
		}
	}



	//----------------------------------------------------------------
	//
	// 属性倍率の適用
	//
	//----------------------------------------------------------------
	switch (n_A_ActiveSkill) {

	// 属性相性無視スキル
	case SKILL_ID_CART_REVOLUTION:
	case SKILL_ID_ASHURA_HAOKEN:
	case SKILL_ID_ASHURA_HAOKEN_SPKOTEI:
	case SKILL_ID_ACID_DEMONSTRATION:
	case SKILL_ID_ISSEN:
	case SKILL_ID_ISSEN_MAX:
	case SKILL_ID_FIRE_EXPANSION:

// TODO :苦無バグ
//	case SKILL_ID_KUNAI_NAGE:

		// TODO: 強制無属性の処理はあっているのか？
		n_A_Weapon_zokusei = ELM_ID_VANITY;
		break;

	default:
		for (idxUnit = 0; idxUnit < dmgUnitArray.length; idxUnit++) {
			for (idx = 0; idx < dmgUnitArray[idxUnit].length; idx++) {
				dmgUnitArray[idxUnit][idx] = ApplyElementRatio(mobData, dmgUnitArray[idxUnit][idx], n_A_Weapon_zokusei);
			}
		}
		break;
	}



	//----------------------------------------------------------------
	//
	// 対象の属性耐性の適用（対プレイヤー、オラティオ系）
	//
	//----------------------------------------------------------------
	for (idxUnit = 0; idxUnit < dmgUnitArray.length; idxUnit++) {
		for (idx = 0; idx < dmgUnitArray[idxUnit].length; idx++) {
			dmgUnitArray[idxUnit][idx] = ApplyResistElement(mobData, dmgUnitArray[idxUnit][idx]);
		}
	}



	//----------------------------------------------------------------
	//
	// 左手武器ATKの基礎補正
	//
	//----------------------------------------------------------------
	if (bLeft) {
		for (idxUnit = 0; idxUnit < dmgUnitArray.length; idxUnit++) {
			for (idx = 0; idx < dmgUnitArray[idxUnit].length; idx++) {
				dmgUnitArray[idxUnit][idx] = Math.floor(dmgUnitArray[idxUnit][idx] * 0.75);
			}
		}
	}



	//----------------------------------------------------------------
	//
	// 素手ＡＴＫの加算
	//
	//----------------------------------------------------------------
	for (idxUnit = 0; idxUnit < dmgUnitArray.length; idxUnit++) {
		for (idx = 0; idx < dmgUnitArray[idxUnit].length; idx++) {
			dmgUnitArray[idxUnit][idx] += Math.floor(battleCalcInfo.statusAtk / (bLeft ? 2 : 1));
		}
	}



	// 特性ステータス対応

	//----------------------------------------------------------------
	//
	// P.Atk によるダメージ増幅
	//
	//----------------------------------------------------------------
	for (idxUnit = 0; idxUnit < dmgUnitArray.length; idxUnit++) {
		for (idx = 0; idx < dmgUnitArray[idxUnit].length; idx++) {
			dmgUnitArray[idxUnit][idx] = ApplyPAtkAmplify(dmgUnitArray[idxUnit][idx]);
		}
	}



	//----------------------------------------------------------------
	//
	// 修練ＡＴＫの加算
	//
	//----------------------------------------------------------------
	for (idxUnit = 0; idxUnit < dmgUnitArray.length; idxUnit++) {
		for (idx = 0; idx < dmgUnitArray[idxUnit].length; idx++) {
			dmgUnitArray[idxUnit][idx] += battleCalcInfo.masteryAtk;
		}
	}



	//----------------------------------------------------------------
	//
	// ○○の怒り系によるＡＴＫ増加効果
	// （この処理があるため、先行するダメージ計算処理を後回しにできない）
	//
	//----------------------------------------------------------------
	var pow = GetIkariPow(mobData);

	for (idxUnit = 0; idxUnit < dmgUnitArray.length; idxUnit++) {
		for (idx = 0; idx < dmgUnitArray[idxUnit].length; idx++) {
			dmgUnitArray[idxUnit][idx] = Math.floor(dmgUnitArray[idxUnit][idx] * pow / 100);
		}
	}





	//----------------------------------------------------------------
	//
	// クリティカル発生判定
	//
	//----------------------------------------------------------------

	bCri = (g_skillManager.GetCriActRate(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData, specData, mobData) > 0);

	// クリティカルが発生しないスキルの場合、クリティカル率を 0 にする
	if (!bCri) {
		battleCalcResult.criRate = 0;
	}



	//----------------------------------------------------------------
	//
	// ダメージ計算本体
	//
	//----------------------------------------------------------------

	for (idxUnit = 0; idxUnit < dmgUnitArray.length; idxUnit++) {

		g_wHITsuu_Array = null;

		// クリティカルが発生しない場合は、計算せずゼロにする
		if (idxUnit == 1) {
			if (battleCalcResult.criRate <= 0) {
				dmgUnitArray[idxUnit] = [0, 0, 0];
				battleCalcResult.hitCountArray[idxUnit] = [0, 0, 0];
				continue;
			}
		}


// 密結合用グローバル変数の初期化
g_wCastTemp = null;
g_wCastFixedTemp = null;
g_attackIntervalTemp = null;


		// ダメージ計算
		dmgUnitArray[idxUnit] = BattleCalc999Core(
			battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnitArray[idxUnit],
			(idxUnit == 1), bLeft,
		);

		// 下記の中でディレイ等を取得するため
		if (g_wCastTemp === null) {
			BuildCastAndDelayHtmlMIG(mobData);
		}

		//----------------------------------------------------------------
		// 戦闘結果インスタンスに格納
		//----------------------------------------------------------------
		battleCalcResult.delayMotion = n_Delay[1];
		battleCalcResult.delaySkill = n_Delay[2];
		battleCalcResult.delayForce = n_Delay[3];
		battleCalcResult.delayInput = n_Delay[4];
		battleCalcResult.damageInterval = n_Delay[5];
		battleCalcResult.objectLifeTime = n_Delay[6];
		battleCalcResult.coolTime = n_Delay[7];

		// 修正量削減のために、グローバル変数で密結合になっているデータを取得
		battleCalcResult.dmgPerfectArray[idxUnit] = n_PerfectHIT_DMG;
		battleCalcResult.hitCountArray[idxUnit] = g_wHITsuu_Array ? g_wHITsuu_Array.slice() : [wHITsuu, wHITsuu, wHITsuu];
		battleCalcResult.dividedHitCountArray[idxUnit] = [wActiveHitNum, wActiveHitNum, wActiveHitNum];
		battleCalcResult.castVary = g_wCastTemp;
		battleCalcResult.castFixed = g_wCastFixedTemp;
		if (g_bDefinedDamageIntervals) {
			battleCalcResult.attackInterval = n_Delay[5] / 1000;
		}
		else {
			battleCalcResult.attackInterval = g_attackIntervalTemp;
		}

		// 命中率補正などがあるため、ここで取得する
		battleCalcResult.hitRate = w_HIT;
		if (bCri) {
			battleCalcResult.criRate = GetActRateCritical(battleCalcInfo.skillId, mobData);
		}
		if ((g_skillManager.GetSkillType(battleCalcInfo.skillId) & CSkillData.TYPE_PHYSICAL) == CSkillData.TYPE_PHYSICAL) {
			battleCalcResult.perfectRate = g_perfectHitRate;
		}
		else {
			battleCalcResult.perfectRate = undefined;
		}
	}



	//----------------------------------------------------------------
	//
	// 結果を格納
	//
	//----------------------------------------------------------------

	battleCalcResult.dmgUnitArray = JSON.parse(JSON.stringify(dmgUnitArray));



	return battleCalcResult;
}



/**
 * ダメージ計算コア処理.
 */
function BattleCalc999Core(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, dmgUnit, bCri, bLeft) {

	var ret = null;

	var dmgMin = Number.MAX_VALUE;
	var dmgMax = 0;

	var weight = 0;
	var wpnLv = 0;
	var hitCountArray = null;
	var bMatchCond = false;
	var clonedClacInfo = null;

	var ampWork = 0;

	wbairitu = 100;
	wCast = 0;
	n_KoteiCast = 0;
	wHITsuu = 1;
	wLAch=0;
	w_DMG = [0,0,0];
	var w_MATK = [0,0,0];
	not_use_card = 0;
	cast_kotei = 0;
	str_PerfectHIT_DMG = 0;
	SG_Special_ch = 0;
	wActiveHitNum = 1;
	for(var i=0;i<=2;i++){
		Last_DMG_A[i] = 0;
		Last_DMG_B[i] = 0;
	}
	n_AS_check_3dan = 0;





	g_bUnknownCasts = false;
	g_bDefinedDamageIntervals = false;
	n_Buki_Muri = 0;
	g_bSkillNoDamage = false;



	hitCountArray = null;





	// 旧通常攻撃処理、もうここに来ることはないはず
	if(n_A_ActiveSkill==0 || n_A_ActiveSkill==SKILL_ID_SPELL_FIST || (n_A_ActiveSkill==SKILL_ID_POISON_REACT && (50 <= mobData[18] && mobData[18] <60))){
		console.log("[ERROR] BattleCalc999Core reaches a old flow.");
	}





	// 修練が乗らないスキルには、錐効果が適用されない
	if ((NumSearch(n_A_ActiveSkill, n_SP_SKILL) != 0) && (n_A_ActiveSkill != SKILL_ID_HAKKEI)) {
		if ((n_AS_MODE == 0) && (n_A_QUAKE_KIRI != 0)) {
			alert("想定外の錐効果演算。\nお手数ですが、投稿フォームから、URL出力のURLを添えて、お知らせください。");
		}
		for (var i = 0; i <= 2; i++) {
			n_A_DMG[i] -= n_A_QUAKE_KIRI;
		}
	}





	//================================================================================================================================
	//
	//
	// 物理スキル　基本計算式
	//
	//
	//================================================================================================================================
	while (true) {

		var bDefaultFormula = true;

		switch (n_A_ActiveSkill) {

		// 四次計算式用ダミー
		case SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT:
		case SKILL_ID_TUZYO_KOGEKI_CALC_LEFT:
			// 等倍計算
			break;

		// 四次計算式方式移行分
		case SKILL_ID_SHARP_SHOOTING:
			n_Enekyori=1;
			wbairitu = 200 + 50 * n_A_ActiveSkillLV;
			wCast = 2000;
			n_Delay[2] = 1500;
			break;

		case SKILL_ID_KAGEKIRI:
			n_Delay[0] = 1;
			n_Enekyori=0;
			wbairitu += (-50 + 150 * n_A_ActiveSkillLV);
			break;

		case SKILL_ID_CRUSH_STRIKE:
			n_KoteiCast = 3000;
			n_Delay[7] = 1000;
			wbairitu = n_A_WeaponLV * (6 + n_A_Weapon_ATKplus)* 100 + ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS]][ITEM_DATA_INDEX_POWER] + ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS]][ITEM_DATA_INDEX_WEIGHT];
			break;

		case SKILL_ID_EXCEED_BREAK:
			n_KoteiCast = 4500 + 500 * n_A_ActiveSkillLV;
			n_Delay[0] = 1;
			n_Delay[2] = 1000;
			n_Enekyori=0;
			wbairitu = 100 + 15 * n_A_JobLV + 150 * n_A_ActiveSkillLV + Math.floor(ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS]][ITEM_DATA_INDEX_WEIGHT] * n_A_WeaponLV * n_A_BaseLV / 100);
			break;

		// 従来からある分
		case SKILL_ID_BASH:
			wbairitu += n_A_ActiveSkillLV * 30;
			break;

		case SKILL_ID_MAGNUM_BREAK:
			wbairitu += n_A_ActiveSkillLV * 20;
			n_A_Weapon_zokusei = 3;
			n_Delay[2] = 2000;
			break;

		case SKILL_ID_SUNAMAKI:
			not_use_card = 1;
			wbairitu += 30;
			n_A_Weapon_zokusei = 2;
			break;

		case SKILL_ID_ARROW_SHOWER:
			n_Enekyori=1;
			wbairitu += 50 + 10 * n_A_ActiveSkillLV;
			n_Delay[3] = 1;
			break;

		case SKILL_ID_CHARGE_ARROW:
			n_Enekyori=1;
			wCast = 1500;
			wbairitu += 50;
			break;

		case SKILL_ID_MAMMONITE:
			wbairitu += n_A_ActiveSkillLV * 50;
			break;

		case SKILL_ID_SPEAR_STUB:
			wbairitu += n_A_ActiveSkillLV * 20;
			n_Enekyori=1;
			break;

		case SKILL_ID_GRIM_TOOTH:
			if(n_A_ActiveSkillLV >= 3) n_Enekyori=1;
			else n_Enekyori=0;
			wbairitu += 20 * n_A_ActiveSkillLV;
			break;

		case SKILL_ID_SHIELD_CHARGE:
			wbairitu += 20 * n_A_ActiveSkillLV;
			break;

		case SKILL_ID_HOLY_CROSS:
			wbairitu += 35 * n_A_ActiveSkillLV;
			n_A_Weapon_zokusei = 6;
			break;

		case SKILL_ID_DARK_CROSS:
			wbairitu += 35 * n_A_ActiveSkillLV;
			n_A_Weapon_zokusei = 7;
			break;


		case SKILL_ID_SURPRISE_ATTACK:
			wbairitu += 80 * n_A_ActiveSkillLV;
			break;

		case SKILL_ID_SPEAR_BOOMERANG:
			wbairitu += 50 * n_A_ActiveSkillLV;
			n_Delay[2] = 1000;
			n_Enekyori=1;
			break;

		case SKILL_ID_BRANDISH_SPEAR:
			w = (100 + 20 * n_A_ActiveSkillLV);
			if(n_A_ActiveSkillLV == 10)wbairitu += 462.5;
			else if(n_A_ActiveSkillLV >= 7)wbairitu += (w + w/2 + w/4 - 100);
			else if(n_A_ActiveSkillLV >= 4)wbairitu += (w + w/2 - 100);
			else wbairitu += (w - 100);
			wCast = 700;
			break;

		case SKILL_ID_SONIC_BLOW:
		case SKILL_ID_SONIC_BLOW_TAMASHI:
			wActiveHitNum = 8;
			wbairitu = 400 + 40 * n_A_ActiveSkillLV;
			if (UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON)) wbairitu = ROUNDDOWN(wbairitu / 2);
			n_Delay[3] = 2;
			if(n_A_ActiveSkill==SKILL_ID_SONIC_BLOW_TAMASHI){
				if(n_Ses == 1){
					wbairitu = ROUNDDOWN(wbairitu * 1.25);
				}else{
					wbairitu = ROUNDDOWN(wbairitu * 2);
					n_Delay[3] = 1;
				}
			}
			break;

		case SKILL_ID_FREEZING_TRAP:
			n_Delay[0] = 1;
			not_use_card = 1;
			n_A_Weapon_zokusei = 1;
			break;

		case SKILL_ID_BACK_STAB:
			wbairitu += 200 + 40 * n_A_ActiveSkillLV;
			n_Delay[2] = 500;
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			break;

		case SKILL_ID_INTIMIDATE:
		case SKILL_ID_INTIMIDATE_FOR_CLONE:
			wbairitu += 30 * n_A_ActiveSkillLV;
			n_Delay[2] = 1000;
			break;

		case SKILL_ID_SANDANSHO:
			wActiveHitNum = 3;
			wbairitu = 100 + 20 * n_A_ActiveSkillLV;
			n_Delay[0] = 1;
			break;

		case SKILL_ID_RENDASHO:
			wActiveHitNum = 4;
			wbairitu += 150 + 50 * n_A_ActiveSkillLV;
			n_Delay[0] = 1;
			n_Delay[1] = 0.1;
			n_Delay[3] = 1 - (0.004 * n_A_AGI) - (0.002 * n_A_DEX);
			break;

		case SKILL_ID_MORYUKEN:
			wbairitu = 450 + 50 * n_A_ActiveSkillLV;
			n_Delay[0] = 1;
			n_Delay[1] = 0.1;
			n_Delay[3] = 0.7 - (0.004 * n_A_AGI) - (0.002 * n_A_DEX);
			break;

		case SKILL_ID_MUSICAL_STRIKE:
		case SKILL_ID_YAUCHI:
			wCast = 1500;
			wbairitu += (40 * n_A_ActiveSkillLV - 40);
			n_A_Weapon_zokusei = GetEquippedTotalSPArrow(ITEM_SP_ELEMENTAL);
			if(eval(document.calcForm.A_Weapon_zokusei.value) != 0) n_A_Weapon_zokusei = eval(document.calcForm.A_Weapon_zokusei.value);
			n_Enekyori=1;
			break;

		case SKILL_ID_HEAD_CRUSH:
			n_Enekyori=1;
			wbairitu += 40 * n_A_ActiveSkillLV;
			n_Delay[2] = 500;
			break;

		case SKILL_ID_JOINT_BEAT:
			n_Enekyori=1;
			wbairitu += (10 * n_A_ActiveSkillLV - 50);
			if(n_A_ActiveSkillLV > 5) n_Delay[2] = 1000;
			else n_Delay[2] = 800;
			break;

		case SKILL_ID_METEOR_ASSALT:
			wbairitu += (40 * n_A_ActiveSkillLV - 60);
			wCast = 500;

			n_Delay[2] = 500;
			break;

		case SKILL_ID_MOKOKOHAZAN:
			wbairitu += (100 + 100 * n_A_ActiveSkillLV);
			n_Delay[3] = 1;
			n_Delay[2] = 300;
			break;

		case SKILL_ID_BUKKOKEN:
			n_Delay[0] = 1;
			wbairitu += 100 * n_A_ActiveSkillLV - 60;
			n_Delay[1] = 0.1;
			n_Delay[3] = 0.7 - (0.004 * n_A_AGI) - (0.002 * n_A_DEX);
			break;

		case SKILL_ID_RENCHUHOGEKI:
			wActiveHitNum = ROUNDDOWN((n_A_ActiveSkillLV + 1) / 2);
			n_Delay[0] = 1;
			wbairitu += (300 + 100 * n_A_ActiveSkillLV);
			if(n_A_ActiveSkillLV>=6) n_Delay[2] = 1000;
			else n_Delay[2] = 800;
			break;

		case SKILL_ID_ARRAW_VULKAN:
			wActiveHitNum = 9;
			wbairitu += 100 + 100 * n_A_ActiveSkillLV;
			n_A_Weapon_zokusei = GetEquippedTotalSPArrow(ITEM_SP_ELEMENTAL);
			if(eval(document.calcForm.A_Weapon_zokusei.value) != 0) n_A_Weapon_zokusei = eval(document.calcForm.A_Weapon_zokusei.value);
			n_Enekyori=1;
			wCast = 1800 + n_A_ActiveSkillLV * 200;
			if(n_A_ActiveSkillLV>=6) n_Delay[2] = 1000;
			else n_Delay[2] = 800;
			n_Delay[3] = 3;
			break;

		case SKILL_ID_TOMAHAWKNAGE:
			n_Enekyori=1;
			not_use_card = 1;
			n_A_Weapon_zokusei = 4;
			break;

		case SKILL_ID_PULSE_STRIKE:
			wbairitu += (100 * n_A_ActiveSkillLV - 100);
			break;

		case SKILL_ID_VENOM_KNIFE:
			n_Enekyori=1;
			not_use_card = 1;
			n_A_DMG[1] += Math.floor(14.5 * wCSize);
			n_A_DMG[2] += Math.floor(29 * wCSize);
			break;

		case SKILL_ID_FANTASMIC_ARROW:
			n_Enekyori=1;
			not_use_card = 1;
			wbairitu += 50;
			break;

		case SKILL_ID_CHARGE_ATTACK:
			var w;
			w = attackMethodConfArray[0].GetOptionValue(0);
			wbairitu += 100 * w;
			wCast = 500 * (w+1);
			if(wCast > 1500) wCast = 1500;
			break;

		// 「拳聖」スキル「＊＊の温もり」
		case SKILL_ID_NUKUMORI:
		case SKILL_ID_NUKUMORI_KABE:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル設定
			g_bDefinedDamageIntervals = true;
			// ダメージ間隔
			if (mobData[20] == MONSTER_BOSSTYPE_BOSS) {
				n_Delay[5] = 100;
			} else if (n_A_ActiveSkill == SKILL_ID_NUKUMORI) {
				n_Delay[5] = 50;
			} else {
				n_Delay[5] = 20;
			}
			n_Delay[6] = [0,10,20,60][n_A_ActiveSkillLV] * 1000;	// オブジェクト存続時間
			n_Delay[3] = n_Delay[6]; 								// 重複設置はできない
			// 属性
			n_A_Weapon_zokusei = g_skillManager.GetElement(battleCalcInfo.skillId);
			// ダメージ倍率
			wbairitu = 100;
			break;


		case SKILL_ID_CART_TERMINATION:
			wbairitu += Math.floor((attackMethodConfArray[0].GetOptionValue(0) / (16 - n_A_ActiveSkillLV) / 100 -1) * 100);
			break;

		case SKILL_ID_SUNKEI:
			not_use_card = 1;
			wbairitu += 200;
			n_Delay[2] = 2000;
			break;

		case SKILL_ID_FEORICHAGI:
		case SKILL_ID_NERYOCHAGI:
			n_Delay[0] = 1;
			wbairitu += (60 + 20 * n_A_ActiveSkillLV);
			break;

		case SKILL_ID_TORURYOCHAGI:
		case SKILL_ID_APUCHAORURIGI:
			n_Delay[0] = 1;
			wbairitu += (90 + 30 * n_A_ActiveSkillLV);
			if(n_A_ActiveSkill==SKILL_ID_APUCHAORURIGI) wActiveHitNum = 3;
			break;

		case SKILL_ID_TEIOAPUCHAGI:
			n_Enekyori=1;
			wbairitu += (10 * n_A_ActiveSkillLV - 70);
			break;

		case SKILL_ID_TEIOAPUCHAGI_IN_DASH:
			n_Enekyori=1;
			n_Delay[0] = 1;
			if (UsedSkillSearch(SKILL_ID_SPURT_ZYOTAI) && n_A_WeaponType==0) wbairitu += (n_A_BaseLV * 8 - 100);
			else wbairitu += (n_A_BaseLV * 4 - 100);
			break;

		case SKILL_ID_TATAMI_GAESHI:
			wbairitu = (100 + 10 * n_A_ActiveSkillLV) * 2;
			n_Delay[2] = 3000;
			break;

		case SKILL_ID_KASUMIGIRI:
			n_Delay[0] = 0;
			wbairitu += (20 * n_A_ActiveSkillLV);
			break;

		case SKILL_ID_BULLS_EYE:
			not_use_card = 1;
			wCast = 500;
			n_Delay[2] = 1000;
			n_Enekyori = 1;
			wActiveHitNum = 5;
			if(mobData[19] == 2 || mobData[19] == 7) wbairitu += 400;
			break;

		case SKILL_ID_RAPID_SHOWER:
			n_Enekyori=1;
			wActiveHitNum = 5;
			wbairitu += 400 + 50 * n_A_ActiveSkillLV;
			n_Delay[2] = 1700;
			break;

		case SKILL_ID_TRACKING:
			wCast = 500 + 100 * n_A_ActiveSkillLV;
			cast_kotei = 1;
			n_Enekyori=1;
			wbairitu += 100 + 100 * n_A_ActiveSkillLV;
			n_Delay[2] = 1000;
			w_HIT = w_HIT * 5 +5;
			if(w_HIT > 100) w_HIT = 100;
			w_HIT_HYOUJI = w_HIT;
			break;

		case SKILL_ID_DISARM:
			wCast = 2000;
			n_Delay[2] = 1000;
			n_Enekyori=1;
			break;

		case SKILL_ID_PIERCING_SHOT:
			wCast = 1500;
			n_Enekyori=1;
			if(n_A_WeaponType == 18) wbairitu += 150 + 30 * n_A_ActiveSkillLV;
			else wbairitu += 100 + 20 * n_A_ActiveSkillLV;
			n_Delay[2] = 500;
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			break;

		case SKILL_ID_DUST:
			cast_kotei = 1;
			n_Enekyori=0;
			wbairitu += 50 * n_A_ActiveSkillLV;
			n_Delay[3] = 1;
			break;

		case SKILL_ID_FULL_BASTER:
			n_Enekyori=1;
			wbairitu += 200 + 100 * n_A_ActiveSkillLV;
			n_Delay[2] = 1000 + 200 * n_A_ActiveSkillLV;
			break;

		case SKILL_ID_SPREAD_ATTACK:
			n_Enekyori=1;
			wbairitu = 200 + 30 * n_A_ActiveSkillLV;
			n_Delay[2] = 1000;
			break;

		case SKILL_ID_GROUND_DRIFT:
			wbairitu = 200 + 20 * n_A_ActiveSkillLV;
			n_Enekyori=1;
			not_use_card = 1;
			wCast = 1000;
			n_Delay[2] = 1000;
			break;

		case SKILL_ID_SONIC_WAVE:
			wActiveHitNum = 3;
			n_Enekyori=1;
			n_Delay[2] = (n_A_ActiveSkillLV <= 5) ? 1000 : 0;
			n_Delay[7] = (n_A_ActiveSkillLV <= 5) ? 2000 : 200;
			wbairitu = 700 + 100 * n_A_ActiveSkillLV;
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		case SKILL_ID_HANDRED_SPEAR:
			n_Enekyori=1;
			wCast = 200 * n_A_ActiveSkillLV;
			wActiveHitNum = 5;
			n_Delay[2] = 2000;
			n_Delay[7] = 1000;
			// ドラゴニックオーラ状態の場合はダメージ倍率が増加する
			if (UsedSkillSearch(SKILL_ID_DRAGONIC_AURA_STATE) > 1) {
				wbairitu = 700 + 200 * n_A_ActiveSkillLV;
			}
			else {
				wbairitu = 600 + 80 * n_A_ActiveSkillLV;
			}
			if(ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS]][ITEM_DATA_INDEX_WEIGHT] <1000) wbairitu += (1000 - ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS]][ITEM_DATA_INDEX_WEIGHT]);
			wbairitu = ROUNDDOWN(wbairitu * (1 + (n_A_BaseLV - 100) / 200));
			wbairitu += 50 * attackMethodConfArray[0].GetOptionValue(0);
			break;

		case SKILL_ID_WIND_CUTTER:
			n_A_Weapon_zokusei = 4;
			wCast = n_A_ActiveSkillLV * 500 - 500;
			n_Delay[2] = 500;
			n_Delay[7] = 2500 - 500 * n_A_ActiveSkillLV;
			wbairitu = 100 + 50 * n_A_ActiveSkillLV;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			break;

		case SKILL_ID_PHANTOM_SLAST:
			n_Enekyori=1;
			wbairitu = 50 * n_A_ActiveSkillLV + 10 * UsedSkillSearch(SKILL_ID_YARI_SHUREN);
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 150);
			break;

		case SKILL_ID_IGNITION_BREAK:
			n_Delay[7] = 3000;
			var w = attackMethodConfArray[0].GetOptionValue(0);
			if(w == 0) wbairitu = 300 * n_A_ActiveSkillLV;
			if(w == 1) wbairitu = 250 * n_A_ActiveSkillLV;
			if(w == 2) wbairitu = 200 * n_A_ActiveSkillLV;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			if(attackMethodConfArray[0].GetOptionValue(1) == 1) wbairitu -= 1;
			if(BK_Weapon_zokusei == 3) wbairitu += 100 * n_A_ActiveSkillLV;
			break;

		case SKILL_ID_STORM_BLAST:
			wCast = 1000;
			n_KoteiCast = 1000;
			n_Delay[7] = 8000;
			wbairitu = 100 * UsedSkillSearch(SKILL_ID_RUNE_MASTERY) + ROUNDDOWN(n_A_INT / 8) * 100;
			break;

		case SKILL_ID_CROSS_IMPACT:
			wActiveHitNum = 7;
			n_Delay[0] = 2;
			n_Delay[2] = 3000 - 500 * n_A_ActiveSkillLV;
			wbairitu = 1000 + 100 * n_A_ActiveSkillLV;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 120);
			if(UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON)) wbairitu = ROUNDDOWN(wbairitu / 2);
			break;

		case SKILL_ID_DARK_ILLUSION:
			n_Enekyori=1;
			n_Delay[7] = 1500 + 500 * n_A_ActiveSkillLV;
			wbairitu = 100;
			break;

		case SKILL_ID_VENOM_PRESSURE:
			n_Delay[0] = 1;
			n_Delay[2] = 1000;
			wbairitu = 1000;
			break;

		case SKILL_ID_COUNTER_SLASH:
			n_Delay[2] = 2000;
			wbairitu = 300 + 150 * n_A_ActiveSkillLV;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 120);
			ampWork = (n_A_JOB == MIG_JOB_ID_SHADOW_CROSS) ? GetJobLevelMax(JOB_ID_GILOTINCROSS) : n_A_JobLV;
			wbairitu += n_A_AGI * 2 + ampWork * 4;
			if(UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON)) wbairitu = ROUNDDOWN(wbairitu / 2);
			break;

		case SKILL_ID_PHANTOM_MENUS:
			n_Delay[7] = 1000;
			wbairitu = 300;
			if(attackMethodConfArray[0].GetOptionValue(0) == 0) wbairitu = 0;
			break;

		case SKILL_ID_ROLLING_CUTTER:
			n_Delay[7] = 200;
			wbairitu = 50 + 50 * n_A_ActiveSkillLV;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			if(UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON)) wbairitu = ROUNDDOWN(wbairitu / 2);
			break;

		case SKILL_ID_CROSS_RIPPER_SLASHER:
			n_Enekyori=1;
			n_Delay[0] = 1;
			n_Delay[2] = 1000;
			wbairitu = 400 + 80 * n_A_ActiveSkillLV;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			wbairitu += attackMethodConfArray[0].GetOptionValue(0) * n_A_AGI;
			if(UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON)) wbairitu = ROUNDDOWN(wbairitu / 2);
			break;

		case SKILL_ID_ARROW_STORM:
			wCast = 2000 + 200 * n_A_ActiveSkillLV;
			n_Delay[2] = 7000 - 400 * n_A_ActiveSkillLV;
			n_Delay[7] = 5500 - 500 * n_A_ActiveSkillLV;
			wActiveHitNum = 3;
			n_Enekyori=1;
			wbairitu = 1000 + 80 * n_A_ActiveSkillLV;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			break;

		case SKILL_ID_CLUSTER_BOMB:
			wbairitu = 200 + 100 * n_A_ActiveSkillLV;
			break;

		case SKILL_ID_FIRING_TRAP:
			wbairitu = 100;
			break;

		case SKILL_ID_ICEBOUND_TRAP:
			wbairitu = 100;
			break;

		case SKILL_ID_WUG_BITE:
			n_Delay[2] = 2000;

			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				n_Delay[7] = 2500 + 500 * n_A_ActiveSkillLV;
				break;

			default:
				n_Delay[7] = 2000 + 2000 * n_A_ActiveSkillLV;
				break;

			}

			wbairitu = 800 + 200 * n_A_ActiveSkillLV;
			if(n_AS_MODE == 0){
				var w = 50 + 10 * n_A_ActiveSkillLV - Math.floor(mobData[8] / 4) + UsedSkillSearch(SKILL_ID_TOOTH_OF_WUG) * 2;
				if(w <50) w = 50;
				if(w > 100) w = 100;
				str_bSUBname += "<Font size=2>命中時の拘束確率(推定)<BR></Font>";
				str_bSUB += w +"%<BR>";
			}
			break;

		case SKILL_ID_WUG_STRIKE:
			n_Enekyori=1;
			wbairitu = 250 * n_A_ActiveSkillLV;
			break;

		case SKILL_ID_EIBINNA_KYUKAKU:
			n_Delay[2] = 3000;

			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				n_Delay[7] = 2000 + 1000 * n_A_ActiveSkillLV;
				break;

			default:
				n_Delay[7] = 0;
				break;

			}

			wbairitu = 100 + 50 * n_A_ActiveSkillLV;
			break;

		case SKILL_ID_WUG_DASH:
			wbairitu = 300;
			break;

		// 「メカニック」スキル「アックストルネード」
		case SKILL_ID_AXE_TORNADE:
			// 2024/09/18 実測値との誤差無しを確認済み
			wActiveHitNum = 6;
			n_Delay[2] = 500;
			n_Delay[7] = 4500 - 500 * n_A_ActiveSkillLV;
			// 基本倍率
			if (UsedSkillSearch(SKILL_ID_AXE_STOMP_STATUS) == 1) {
				// アックスストンプ状態の場合
				wbairitu = 230 + 230 * n_A_ActiveSkillLV;
				wbairitu += n_A_VIT * 2;
			} else {
				wbairitu = 200 + 180 * n_A_ActiveSkillLV;
				wbairitu += n_A_VIT;
			}
			// TODO 削除して良いかもしれない部分
			if (_APPLY_UPDATE_LV200) {
			}
			else {
				if(attackMethodConfArray[0].GetOptionValue(0)) wbairitu = wbairitu * 3 / 4;
				if(BK_Weapon_zokusei == 4) wbairitu = wbairitu * 125 / 100;
			}
			// 最終倍率
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			break;

		case SKILL_ID_AXE_BOOMERANG:
			n_Enekyori = 1;
			var w_Weight = ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS]][ITEM_DATA_INDEX_WEIGHT];
			wCast = 5500 - 500 * n_A_ActiveSkillLV;
			wbairitu = 250 + 50 * n_A_ActiveSkillLV + w_Weight;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			break;

		// 「メカニック」スキル「パワースイング」
		// 2025/01/27 実測値との誤差無しを確認済み
		case SKILL_ID_POWER_SWING:
			wCast = Math.max(0, 1000 - 200 * n_A_ActiveSkillLV);
			if (attackMethodConfArray[0].GetOptionValue(1) == 1) {
				// ABRバトルウォリアー状態の場合
				wActiveHitNum = 2;
				wbairitu = 500 + 150 * n_A_ActiveSkillLV;
			} else {
				// 通常時
				wbairitu = 300 + 100 * n_A_ActiveSkillLV;
			}
			wbairitu += ROUNDDOWN((n_A_STR + n_A_DEX) * n_A_BaseLV / 100);
			break;

		// 「メカニック」スキル「ブーストナックル」
		case SKILL_ID_BOOST_KNUCKLE:
			n_Enekyori = 1;
			wCast = 500 * n_A_ActiveSkillLV - 500;
			n_Delay[1] = n_Delay[1] / 2;
			if(UsedSkillSearch(SKILL_ID_ABR_DUAL_CANNON)) wHITsuu = 2;
			wbairitu = 200 + 100 * n_A_ActiveSkillLV + n_A_DEX;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 120);
			break;

		case SKILL_ID_PILE_BUNKER:
			n_Delay[2] = 3000 - 1000 * n_A_ActiveSkillLV;
			n_Delay[7] = 7500 - 2500 * n_A_ActiveSkillLV;
			wbairitu = 300 + 100 * n_A_ActiveSkillLV + n_A_STR;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			break;

		// 「メカニック」スキル「バルカンアーム」
		case SKILL_ID_VULCAN_ARM:
			n_Enekyori = 1;
			wCast = 1000 * n_A_ActiveSkillLV - 1000;
			if(UsedSkillSearch(SKILL_ID_ABR_DUAL_CANNON)) wHITsuu = 2;
			wbairitu = 70 * n_A_ActiveSkillLV + n_A_DEX;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 120);
			break;

		case SKILL_ID_FLAME_THROWER:
		case SKILL_ID_COLD_THROWER:
			if(n_A_ActiveSkill==SKILL_ID_FLAME_THROWER){
				n_A_Weapon_zokusei = 3;
				wCast = 500;
			}
			if(n_A_ActiveSkill==SKILL_ID_COLD_THROWER){
				n_A_Weapon_zokusei = 1;
				wCast = 1000 * n_A_ActiveSkillLV;
			}
			n_Delay[2] = 2000 - 500 * n_A_ActiveSkillLV;
			n_Enekyori = 1;
			wbairitu = 300 + 300 * n_A_ActiveSkillLV;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 150);
			break;

		// 「ロイヤルガード」スキル「キャノンスピア」
		case SKILL_ID_CANNON_SPEAR:
			n_Enekyori = 1;
			n_Delay[7] = 2000;
			wbairitu = (50 + n_A_STR) * n_A_ActiveSkillLV;
			/*
			グランドジャッジメント状態スキル倍率
			実測値との一致を確認済み
			*/
			if (UsedSkillSearch(SKILL_ID_GRAND_JUDGEMENT_STATE) > 0) {
				wbairitu = (200 + n_A_STR) * n_A_ActiveSkillLV;
			}

			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「ロイヤルガード」スキル「バニシングポイント」
		case SKILL_ID_BANISHING_POINT:
			n_Enekyori = 1;
			// バッシュ習得Lv補正
			var w_BN = 30 * attackMethodConfArray[0].GetOptionValue(0);
			// 基本倍率
			wbairitu = 50 * n_A_ActiveSkillLV + w_BN;
			/*
			グランドジャッジメント状態スキル倍率
			実測値との一致を確認済み
			*/
			if (UsedSkillSearch(SKILL_ID_GRAND_JUDGEMENT_STATE) > 0) {
				wbairitu *= 2;
			}

			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		case SKILL_ID_SHIELD_PRESS:
			n_Delay[7] = 2000;
			wbairitu = 200 * n_A_ActiveSkillLV
			/*
			シールドシューティング状態スキル倍率
			実測値との一致を確認済み
			*/
			if (UsedSkillSearch(SKILL_ID_SHIELD_SHOOTING_STATE) > 0) {
				wbairitu = 300 * n_A_ActiveSkillLV;
			}

			wbairitu += n_A_STR + ItemObjNew[n_A_Equip[EQUIP_REGION_ID_SHIELD]][ITEM_DATA_INDEX_WEIGHT];
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		case SKILL_ID_RAGE_BURST_ATTACK:
			n_Delay[7] = 3000;
			wbairitu = 200 * attackMethodConfArray[0].GetOptionValue(0);
			if(attackMethodConfArray[0].GetOptionValue(1) > 0) {
				wbairitu += (charaData[CHARA_DATA_INDEX_MAXHP] - attackMethodConfArray[0].GetOptionValue(1)) / 100;
			}
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			break;

		case SKILL_ID_MOON_SLUSHER:
			var w_OB = 80 * attackMethodConfArray[0].GetOptionValue(0);
			wCast = 2000;
			n_Delay[7] = 5500 - 500 * n_A_ActiveSkillLV;
			wbairitu = 120 * n_A_ActiveSkillLV + w_OB;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			break;

		case SKILL_ID_EARTH_DRIVE:
			if (_APPLY_UPDATE_LV200) {
				wActiveHitNum = 1;
			}
			else {
				wActiveHitNum = 5;
			}
			wCast = 1000;
			n_Delay[2] = 1000;
			n_Delay[7] = 8000 - 1000 * n_A_ActiveSkillLV;
			wbairitu = 100 + 100 * n_A_ActiveSkillLV;
			/*
			シールドシューティング状態スキル倍率
			実測値との一致を確認済み
			*/
			if (UsedSkillSearch(SKILL_ID_SHIELD_SHOOTING_STATE) > 0) {
				wbairitu = 300 + 100 * n_A_ActiveSkillLV;
			}

			wbairitu = ROUNDDOWN(wbairitu * ItemObjNew[n_A_Equip[EQUIP_REGION_ID_SHIELD]][ITEM_DATA_INDEX_WEIGHT] / 100);
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			break;

		case SKILL_ID_FAINT_BOMB:
			var ratio = 1 + (n_A_ActiveSkillLV == 1 ? 2 : 3) + Math.floor((n_A_ActiveSkillLV - 1) / 3);
			wbairitu = ROUNDDOWN(ratio * (n_A_DEX / 2) * n_A_JobLV / 10 * n_A_BaseLV / 120);
			wCast = Math.max(0, 1000 * Math.floor((n_A_ActiveSkillLV - 4) / 3));

			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				n_Delay[7] = 7000;
				break;

			default:
				n_Delay[7] = 2000;
				break;

			}

			break;

		// 「シャドウチェイサー」スキル「フェイタルメナス」
		case SKILL_ID_FATAL_MENUS:
			n_Delay[2] = 500;
			// 基本倍率
			wbairitu = (n_A_ActiveSkillLV + 1) * 100;
			// アビスダガー状態補正
			if (UsedSkillSearch(SKILL_ID_ABYSS_DAGGER_STATE) == 1) {
				wbairitu *= 1.2;
			}
			// BaseLv補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// ヒット数
			if (n_A_WeaponType == ITEM_KIND_KNIFE) {
				wHITsuu = 2;
			}
			break;

		case SKILL_ID_TRIANGLE_SHOT:
			wActiveHitNum = 3;
			wbairitu = (n_A_ActiveSkillLV - 1) * (n_A_AGI / 2) + 300;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 120);
			n_A_Weapon_zokusei = GetEquippedTotalSPArrow(ITEM_SP_ELEMENTAL);
			if(eval(document.calcForm.A_Weapon_zokusei.value) != 0) n_A_Weapon_zokusei = eval(document.calcForm.A_Weapon_zokusei.value);
			n_Enekyori=1;
			wCast = 5000 - 500 * n_A_ActiveSkillLV;
			n_Delay[2] = 500 - 50 * n_A_ActiveSkillLV;
			break;

		case SKILL_ID_SORYUKYAKU:
			wActiveHitNum = 2;

			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				wbairitu = 50 + 20 * n_A_ActiveSkillLV;
				break;

			default:
				wbairitu = 100 + 40 * n_A_ActiveSkillLV;
				break;

			}

			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);

			var w = attackMethodConfArray[0].GetOptionValue(0);

			if(w != 0){
				if(w == 1) n_Delay[2] = 1000 - n_A_AGI * 4 - n_A_DEX * 2;
				if(w == 2) n_Delay[2] = 300 + (1000 - n_A_AGI * 4 - n_A_DEX * 2);
				if(n_Delay[2] <0) n_Delay[2] = 0;
			}
			break;

		case SKILL_ID_TENRACHIMO:
			n_Delay[7] = 200;
			wActiveHitNum = 3;
			if(n_AS_MODE == 0){
				if(attackMethodConfArray[0].GetOptionValue(0) == 0) wbairitu = 80 * n_A_ActiveSkillLV + n_A_AGI;
				else wbairitu = 100 * n_A_ActiveSkillLV + n_A_AGI + 150;
			}else{
				if(attackMethodConfArray[1].GetSkillId() == 799) wbairitu = 80 * n_A_ActiveSkillLV + n_A_AGI;
				else wbairitu = 100 * n_A_ActiveSkillLV + n_A_AGI + 150;
			}
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			break;

		case SKILL_ID_ZIRAISHIN:
			n_Delay[7] = 3000;
			if(attackMethodConfArray[0].GetOptionValue(0) == 0) wbairitu = ((50 * n_A_ActiveSkillLV) * n_A_BaseLV / 100) + n_A_INT * 2;
			else wbairitu = ((150 * n_A_ActiveSkillLV) * n_A_BaseLV / 100) + n_A_INT * 3;
			break;

		case SKILL_ID_BAKKISANDAN:
			n_Enekyori = 1;
			n_Delay[0] = 1;
			n_Delay[2] = 1000;
			n_Delay[7] = 10000;
			var w = attackMethodConfArray[0].GetOptionValue(0);
			if (UsedSkillSearch(SKILL_ID_SENRYU_SHOTEN) || UsedSkillSearch(SKILL_ID_BAKURETSU_HADO) || TimeItemNumSearch(34)) {
				wbairitu = ROUNDDOWN((125 + 25 * n_A_ActiveSkillLV) * n_A_BaseLV / 150 * w);
			}
			else wbairitu = ROUNDDOWN(20 * n_A_ActiveSkillLV * n_A_BaseLV / 150 * w);
			break;

		case SKILL_ID_DAITENHOSUI:
			n_Delay[0] = 1;
			wActiveHitNum = 2;
			wbairitu = 100 + 250 * n_A_ActiveSkillLV;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 150);
			break;

		case SKILL_ID_RASETSU_HAOGEKI_MAX:
		case SKILL_ID_RASETSU_HAOGEKI:
			wActiveHitNum = 7;
			wCast = 800 + 200 * n_A_ActiveSkillLV;
			n_Delay[2] = 100 * n_A_ActiveSkillLV;
			wbairitu = 500 * n_A_ActiveSkillLV;
			if(n_AS_MODE == 0){
				if(attackMethodConfArray[0].GetOptionValue(0) == 1) {
					wbairitu = 800 * n_A_ActiveSkillLV;
				}
			}
			else {
				wbairitu = 800 * n_A_ActiveSkillLV;
			}
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			break;

		case SKILL_ID_GOHO:
			n_Delay[2] = 1000;
			n_Delay[7] = 2000;
			var w1 = ROUNDDOWN(charaData[CHARA_DATA_INDEX_MAXHP] * (10 + 2 * n_A_ActiveSkillLV) / 100);
			var w2 = ROUNDDOWN(charaData[CHARA_DATA_INDEX_MAXSP] * (5 + n_A_ActiveSkillLV) / 100);
			wbairitu = (w1 + w2) / 4;
			if(n_AS_MODE == 0){
				if(attackMethodConfArray[0].GetOptionValue(0) == 0) wCast = 1000 + 100 * n_A_ActiveSkillLV;
				else n_Delay[0] = 1;
				if(attackMethodConfArray[0].GetOptionValue(0) == 1) wbairitu = wbairitu * 2;
			}else{
				if(attackMethodConfArray[1].GetSkillId() == 802) wbairitu = wbairitu * 2;
			}
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			break;

		case SKILL_ID_SENPUTAI:
			n_Delay[7] = 5000;
			wbairitu = n_A_BaseLV + n_A_DEX;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			break;

		case SKILL_ID_SISIKO:
			wCast = 1000;
			n_KoteiCast = 500;
			n_Delay[7] = 10000;
			wbairitu = 300 * n_A_ActiveSkillLV;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 150);
			break;

		case SKILL_ID_RAIKODAN:
			n_Enekyori = 1;
			wCast = 1000 * n_A_ActiveSkillLV;
			wbairitu = 200 * n_A_ActiveSkillLV;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			if(BK_Weapon_zokusei == 4) wbairitu = ROUNDDOWN(wbairitu * 125 / 100);
			break;

		case SKILL_ID_TENKETSU_MOKU:
			wbairitu = 100 * n_A_ActiveSkillLV + n_A_DEX;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			w_HIT = Math.floor(w_HIT * (5 * n_A_ActiveSkillLV + (n_A_DEX + n_A_BaseLV) / 10) / 100);
			w_HIT_HYOUJI = w_HIT;
			break;

		case SKILL_ID_GREAT_ECHO:
			wCast = 1800 + 200 * n_A_ActiveSkillLV;
			n_KoteiCast = 500;
			n_Delay[2] = 1000;
			n_Delay[7] = 10000;
			wbairitu = 200 * n_A_ActiveSkillLV + 400;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			if(attackMethodConfArray[0].GetOptionValue(0) > 2){
				var ge = [0,0,0,100,200,400,800,1600];
				wbairitu += ge[attackMethodConfArray[0].GetOptionValue(0)];
			}
			break;

		// 「ジェネティック」スキル「カートトルネード」
		// 2024/11/16 実測誤差無しを確認済み
		case SKILL_ID_CART_TORNADO:
			// 詠唱など
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			wbairitu = 100 * n_A_ActiveSkillLV
			// ウドゥンウォリアー補正
			wbairitu += 100 * n_A_ActiveSkillLV * attackMethodConfArray[0].GetOptionValue(1);
			// 修練補正
			wbairitu += 50 * UsedSkillSearch(SKILL_ID_CART_KAIZO)
			// カート重量・純粋STR補正
			wbairitu += Math.floor(attackMethodConfArray[0].GetOptionValue(0) / (150 - SU_STR));;
			// 分割ヒット
			wActiveHitNum = 3;
			break;

		case SKILL_ID_SLING_ITEM:
			n_Enekyori=1;
			n_Delay[2] = 500;

			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				n_Delay[7] = 7000;
				break;

			default:
				n_Delay[7] = 1000;
				break;

			}

			var kihon_bairitu = [300,800,800,500,877];
			wbairitu = ROUNDDOWN((kihon_bairitu[attackMethodConfArray[0].GetOptionValue(0)] + n_A_STR + n_A_DEX) * n_A_BaseLV / 100);
			break;

		// 「ジェネティック」スキル「スポアエクスプロージョン」
		// 2024/11/16 YEサーバー実測との誤差 +1 ～ -8 を確認
		// 計算式自体は合っていると判断
		case SKILL_ID_SPORE_EXPLOSION:
			// 詠唱など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 遠距離
			n_Enekyori=1;
			// 基本倍率
			wbairitu = 150 * n_A_ActiveSkillLV;
			// ウドゥンフェアリー補正
			wbairitu += 100 * n_A_ActiveSkillLV * attackMethodConfArray[0].GetOptionValue(0);
			// INT補正
			wbairitu += 200 + n_A_INT;
			// BaseLv補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// 分割ヒット
			wActiveHitNum = 3;
			break;

		// 「アークビショップ」スキル「グレイアムライト」
		case SKILL_ID_GRAHAM_LIGHT:
			n_Enekyori=1;
			wbairitu = 100 + 10 * n_A_ActiveSkillLV;
			break;

		case SKILL_ID_SHIELD_SPELL_LV_1:
			wCast = 1000;
			n_Delay[0] = 1;
			n_Delay[2] = 1000;
			n_Delay[7] = 2000;
			wbairitu = n_A_BaseLV * 4 + ItemObjNew[n_A_Equip[EQUIP_REGION_ID_SHIELD]][ITEM_DATA_INDEX_POWER] * 10 + n_A_VIT * 2;
			break;

		case SKILL_ID_CHIMEITEKINA_KIZU:
			wbairitu += 0;
			break;

		case SKILL_ID_HELL_JUDGEMENT:
		case SKILL_ID_VAMPIRE_GIFT:
// 投稿フォームからの連絡　プレイヤーが使用する場合、遠距離扱いではないらしい
//			n_Enekyori=1;
			wbairitu = 100 * n_A_ActiveSkillLV;
			break;

		case SKILL_ID_YOMIGAESHI:
			n_Enekyori=1;
			n_Delay[7] = 3500 - 500 * n_A_ActiveSkillLV;
			wbairitu = (100 + 20 * attackMethodConfArray[0].GetOptionValue(0)) * n_A_ActiveSkillLV;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			break;

		case SKILL_ID_FUMASHURIKEN_RANKA:
			n_Enekyori=1;
			wActiveHitNum = 5;
			wCast = Math.max(1200, 2200 - 200 * n_A_ActiveSkillLV);
			n_KoteiCast = Math.min(1800, 800 + 200 * n_A_ActiveSkillLV);
			n_Delay[7] = 500;
			wbairitu = 150 * n_A_ActiveSkillLV + n_A_STR + 100 * attackMethodConfArray[0].GetOptionValue(0);
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			if(n_AS_MODE == 0 && n_A_WeaponType != 16) n_Buki_Muri = 1;
			break;

		case SKILL_ID_DARK_CRAW:
			wActiveHitNum = 3;
			n_Delay[7] = 60000;
			wbairitu = 100 * n_A_ActiveSkillLV;
			break;

		case SKILL_ID_SHUTTER_STORM:
			wbairitu = 1700 + 200 * n_A_ActiveSkillLV;
			n_Enekyori=1;
			wCast = 3500 - 500 * n_A_ActiveSkillLV;
			n_Delay[2] = 0;
			n_Delay[7] = 2000;
			break;

		case SKILL_ID_HOWLING_MINE:
			wbairitu = 400 * n_A_ActiveSkillLV;
			n_Enekyori=1;
			wCast = 1000;
			n_Delay[2] = 1000;
			n_Delay[7] = 0;
			break;

		case SKILL_ID_HOWLING_MINE_APPEND:
// TODO: 暫定。ここにはいらない。
//			n_A_Weapon_zokusei = 3;		// 強制火属性
			wbairitu = 1000 + 400 * n_A_ActiveSkillLV;
			n_Enekyori=1;
			wCast = 0;
			n_Delay[2] = 0;
			n_Delay[7] = 0;
			break;

		case SKILL_ID_FIRE_RAIN:
			wbairitu = 500 + 500 * n_A_ActiveSkillLV;
			n_Enekyori=1;
			wCast = 0;
			n_Delay[2] = 1000;
			n_Delay[7] = 6000 - 1000 * n_A_ActiveSkillLV;
			break;

		case SKILL_ID_FIRE_DANCE:
			wbairitu = 1000 + 100 * n_A_ActiveSkillLV;
			wbairitu += 20 * attackMethodConfArray[0].GetOptionValue(0);
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			n_Enekyori=1;
			wCast = 0;
			n_Delay[2] = 1000;
			n_Delay[7] = 0;
			break;

		case SKILL_ID_BUNISHING_BASTER:
			wbairitu = 200 * n_A_ActiveSkillLV;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			n_Enekyori=1;
			wCast = 3500 - 500 * n_A_ActiveSkillLV;
			n_KoteiCast = 1000;
			n_Delay[2] = 0;
			n_Delay[7] = 0;
			break;

		case SKILL_ID_UNTIMATERIAL_BLAST:
			wbairitu = 1500 + 300 * n_A_ActiveSkillLV;
			n_Enekyori=1;
			wCast = 4000;
			n_KoteiCast = 1000;
			n_Delay[2] = 1000;
			n_Delay[7] = 5000;
			break;

		case SKILL_ID_DRAGON_TAIL:
// TODO: 暫定。ここにはいらない。
//			n_A_Weapon_zokusei = 0;		// 強制無属性
			wbairitu = 500 + 200 * n_A_ActiveSkillLV;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			// 烙印状態ならば、攻撃力２倍
			if (n_B_IJYOU[MOB_CONF_DEBUF_ID_RAKUIN_ZYOTAI]) {
				wbairitu *= 2;
			}

			n_Enekyori=1;
			wCast = Math.min(2000, 1000 + 200 * n_A_ActiveSkillLV);
			n_Delay[2] = 2000;
			n_Delay[7] = 5000;
			break;

		case SKILL_ID_SLUG_SHOT:
// TODO: 暫定。ここにはいらない。
//			n_A_Weapon_zokusei = 0;		// 強制無属性
			wbairitu = 600 * n_A_ActiveSkillLV;
			wbairitu *= (2 + mobData[17]);
			// 対モンスターのみ２倍 ****
			if(mobData[0] != MONSTER_ID_PLAYER){
				wbairitu *= 2;
			}
			wCast = 2500;
			n_Delay[2] = 0;
			n_Delay[7] = 15000;
			break;

		case SKILL_ID_HAMMER_OF_GOD:
// TODO: 暫定。ここにはいらない。
//			n_A_Weapon_zokusei = 0;		// 強制無属性
			wbairitu = 500 + 100 * n_A_ActiveSkillLV;

			// 烙印状態の影響
			var coincount = attackMethodConfArray[0].GetOptionValue(0);
			if (n_B_IJYOU[MOB_CONF_DEBUF_ID_RAKUIN_ZYOTAI]) {
				wbairitu += coincount * 200;
			} else {
				wbairitu += coincount * 50;
			}

			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);

			n_Enekyori=1;
			wCast = 0;
			n_Delay[2] = 2000;
			n_Delay[7] = 30000;
			break;

		case SKILL_ID_BIND_TRAP:
			wbairitu = (1000 + 90 * n_A_ActiveSkillLV) / 100;
			n_Enekyori=1;
			wCast = "不明";
			n_Delay[0] = 2000;
			break;

		case  SKILL_ID_KAMITSUKU:
			wbairitu = 1000;
			if (attackMethodConfArray[0].GetOptionValue(0) == 1) {
				wbairitu = ROUNDDOWN(wbairitu * 1.5);
			}
			wCast = 500;
			n_Delay[2] = 500;
			n_Delay[7] = 0;
			break;

		case  SKILL_ID_HIKKAKU:
			wbairitu = 400 + 200 * n_A_ActiveSkillLV;
			wCast = 0;
			n_Delay[2] = 0;
			n_Delay[7] = 0;
			break;

		case  SKILL_ID_PIKKI_TSUKI:
			n_Enekyori=1;
			wActiveHitNum = 5;

			wbairitu = 1250 + 50 * n_A_ActiveSkillLV;

			//----------------------------------------------------------------
			// 「サモナー　生命の魂効果<BR>(残りHP)」の、「アニマル系スキル」強化
			//----------------------------------------------------------------
			if (UsedSkillSearch(SKILL_ID_SEIMEINO_TAMASHI) > 0) {
				switch (UsedSkillSearch(SKILL_ID_SEIMEINO_TAMASHI_KOKA_NOKORI_HP)) {
				case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_100:
					wbairitu = ROUNDDOWN(wbairitu * 2);
					break;
				case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_81:
					wbairitu = ROUNDDOWN(wbairitu * 1.5);
					break;
				case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_51:
					wbairitu = ROUNDDOWN(wbairitu * 1.3);
					break;
				case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_10:
					wbairitu = ROUNDDOWN(wbairitu * 1.1);
					break;
				}
			}

			// 敵の残りＨＰによって威力増加
			var resthp = attackMethodConfArray[0].GetOptionValue(0);
			if ( (n_A_ActiveSkillLV == 1 && resthp < 30)
				|| (n_A_ActiveSkillLV == 2 && resthp < 40)
				|| (n_A_ActiveSkillLV == 3 && resthp < 50)
				|| (n_A_ActiveSkillLV == 4 && resthp < 60)
				|| (n_A_ActiveSkillLV == 5 && resthp < 70) ) {
				wbairitu = ROUNDDOWN(wbairitu * 2);
			}

			wCast = 500 * n_A_ActiveSkillLV - 500;
			n_Delay[2] = 2500 - 500 * n_A_ActiveSkillLV;
			n_Delay[7] = 0;
			break;

		case  SKILL_ID_TAROUNO_KIZU:
			n_Enekyori=1;

			wbairitu = 4000 + 200 * n_A_ActiveSkillLV;

			//----------------------------------------------------------------
			// 「サモナー　生命の魂効果<BR>(残りHP)」の、「アニマル系スキル」強化
			//----------------------------------------------------------------
			if (UsedSkillSearch(SKILL_ID_SEIMEINO_TAMASHI) > 0) {
				switch (UsedSkillSearch(SKILL_ID_SEIMEINO_TAMASHI_KOKA_NOKORI_HP)) {
				case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_100:
					wbairitu = ROUNDDOWN(wbairitu * 2);
					break;
				case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_81:
					wbairitu = ROUNDDOWN(wbairitu * 1.5);
					break;
				case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_51:
					wbairitu = ROUNDDOWN(wbairitu * 1.3);
					break;
				case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_10:
					wbairitu = ROUNDDOWN(wbairitu * 1.1);
					break;
				}
			}

			// ボスモンスターにはダメージ２倍
			if (mobData[20] == 1) {
				wbairitu *= 2;
			}

			// タロウの傷状態のモンスターにはダメージ２倍
			if (n_B_IJYOU[MOB_CONF_DEBUF_ID_TARONO_KIZU]) {
				wbairitu *= 2;
			}

			wCast = 0;
			n_KoteiCast = 2000;
			n_Delay[2] = 1000;
			n_Delay[7] = 15000;
			break;

		/*
			「サモナー」スキル「キャロットビート」
		*/
		case  SKILL_ID_CARROT_BEAT:
			n_Enekyori=1;
			wActiveHitNum = 3;

			// 基礎倍率
			wbairitu = 1000 + 100 * n_A_ActiveSkillLV;

			// Str補正
			wbairitu += n_A_STR

			// Lv補正
			if(n_A_BaseLV >= 100) {
				 wbairitu = ROUNDDOWN(wbairitu * (n_A_BaseLV / 100));
			}

			//----------------------------------------------------------------
			// 「サモナー　生命の魂効果<BR>(残りHP)」の、「アニマル系スキル」強化
			//----------------------------------------------------------------
			if (UsedSkillSearch(SKILL_ID_SEIMEINO_TAMASHI) > 0) {
				switch (UsedSkillSearch(SKILL_ID_SEIMEINO_TAMASHI_KOKA_NOKORI_HP)) {
				case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_100:
					wbairitu = ROUNDDOWN(wbairitu * 2);
					break;
				case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_81:
					wbairitu = ROUNDDOWN(wbairitu * 1.5);
					break;
				case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_51:
					wbairitu = ROUNDDOWN(wbairitu * 1.3);
					break;
				case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_10:
					wbairitu = ROUNDDOWN(wbairitu * 1.1);
					break;
				}
			}

			wCast = 2000;

			var aDelay = [0, 500, 1000, 1500, 3000];
			n_Delay[2] = aDelay[n_A_ActiveSkillLV - 1];
			var aCool = [2000, 1500, 1500, 1000, 500];
			n_Delay[7] = aCool[n_A_ActiveSkillLV - 1];
			break;

		case  SKILL_ID_SAVAGENO_TAMASHI:

			n_Enekyori=1;

			wbairitu = 2500 + 100 * n_A_ActiveSkillLV;

			//----------------------------------------------------------------
			// 「サモナー　生命の魂効果<BR>(残りHP)」の、「アニマル系スキル」強化
			//----------------------------------------------------------------
			if (UsedSkillSearch(SKILL_ID_SEIMEINO_TAMASHI) > 0) {
				switch (UsedSkillSearch(SKILL_ID_SEIMEINO_TAMASHI_KOKA_NOKORI_HP)) {
				case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_100:
					wbairitu = ROUNDDOWN(wbairitu * 2);
					break;
				case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_81:
					wbairitu = ROUNDDOWN(wbairitu * 1.5);
					break;
				case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_51:
					wbairitu = ROUNDDOWN(wbairitu * 1.3);
					break;
				case SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_10:
					wbairitu = ROUNDDOWN(wbairitu * 1.1);
					break;
				}
			}

			var aCast = [1000, 1000, 1000, 2000, 2000];
			wCast = aCast[n_A_ActiveSkillLV - 1];
			var aDelay = [0, 500, 1000, 1000, 1500];
			n_Delay[2] = aDelay[n_A_ActiveSkillLV - 1];
			n_Delay[7] = 2500 - 500 * n_A_ActiveSkillLV;
			break;

		case  SKILL_ID_TAIYO_BAKUHATSU:

			var hikariLv = 0;
			var hikariBairitsu = 0;
/*
			hikariLv = UsedSkillSearch(SKILL_ID_TAIYONO_HIKARI);

			if (hikariLv > 0) {
				hikariBairitsu = 25 + 5 * hikariLv;
			}
*/
			wbairitu = 1000 + 220 * n_A_ActiveSkillLV;
			wbairitu = Math.floor(wbairitu * (100 + hikariBairitsu) / 100);
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);

			wActiveHitNum = 3;
			n_Delay[7] = 500;

			break;

		case  SKILL_ID_SAKUGETSU_KYAKU:

			wbairitu = 1650 + 50 * n_A_ActiveSkillLV;

			wCast = 500 + 250 * n_A_ActiveSkillLV;
			n_Delay[7] = 500;

			break;

		case  SKILL_ID_MANGETSU_KYAKU:

			var hikariLv = 0;
			var hikariBairitsu = 0;
/*
			hikariLv = UsedSkillSearch(SKILL_ID_TSUKINO_HIKARI);

			if (hikariLv > 0) {
				hikariBairitsu = 25 + 5 * hikariLv;
			}
*/
			wbairitu = 500 + 150 * n_A_ActiveSkillLV;
			wbairitu = Math.floor(wbairitu * (100 + hikariBairitsu) / 100);
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);

			wCast = 100 * n_A_ActiveSkillLV;
			n_KoteiCast = 100 * n_A_ActiveSkillLV;

			break;

		case  SKILL_ID_SENKO_KYAKU:

			wbairitu = 100;

			n_Delay[7] = 3500 - 500 * n_A_ActiveSkillLV;

			break;

		case SKILL_ID_SHINSE_BAKUHATSU:


			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				wbairitu = 750 + 750 * n_A_ActiveSkillLV;
				break;

			default:
				wbairitu = 500 + 500 * n_A_ActiveSkillLV;
				break;
			}

			n_KoteiCast = 500;
			n_Delay[7] = 2000;

			if (attackMethodConfArray[0].GetOptionValue(0) == 1) {
				n_Delay[7] = 0;
			}

			break;

		case SKILL_ID_SEITE_KORIN:

			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				wbairitu = 2250 + 750 * n_A_ActiveSkillLV;
				break;

			default:
				wbairitu = 1500 + 500 * n_A_ActiveSkillLV;
				break;
			}

			wCast = 500 + 500 * n_A_ActiveSkillLV;
			n_Delay[7] = 3000;

			break;





		//----------------------------------------------------------------
		//
		// 四次ここから
		//
		//----------------------------------------------------------------

		case SKILL_ID_SERVANT_WEAPON:

			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);

			// 基本倍率
			wbairitu = 1250 + (50 * n_A_ActiveSkillLV);

			// POW補正
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);

			// ベースレベル補正
			wbairitu *= n_A_BaseLV / 100;

			// HIT数
			wHITsuu = 3;
			break;

		case  SKILL_ID_SERVANT_WEAPON_PHANTOM:
		case  SKILL_ID_SERVANT_WEAPON_DEMOLISION:

			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);

			// 基本倍率
			wbairitu = 1250 + (50 * n_A_ActiveSkillLV);

			// POW補正
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);

			// ベースレベル補正
			wbairitu *= n_A_BaseLV / 100;

			// HIT数
			wHITsuu = attackMethodConfArray[0].GetOptionValue(0);
			break;

		// 「ドラゴンナイト」スキル「ハックアンドスラッシャー」
		case SKILL_ID_HACK_AND_SLASHER:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 両手剣、両手槍のみ発動可能
			if (![ITEM_KIND_SWORD_2HAND, ITEM_KIND_SPEAR_2HAND].includes(n_A_WeaponType)) {
				wbairitu = 0;
				n_Buki_Muri = 1;
				break;
			}
			// 武器種別による距離属性変化
			n_Enekyori = (n_A_WeaponType == ITEM_KIND_SWORD_2HAND) ? 0 :1;
			// 基本倍率
			wbairitu = 1400 + 100 * n_A_ActiveSkillLV;
			// POW補正 (2025/01/12 未確認)
			wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// HIT数
			wHITsuu = 2;
			break;

		// 「ドラゴンナイト」スキル「ドラゴニックオーラ」
		case SKILL_ID_DRAGONIC_AURA:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 距離属性
			n_Enekyori = 1;
			// 基本倍率
			wbairitu = 7000 + 2000 * n_A_ActiveSkillLV;
			// POW補正 (2025/01/12 未確認)
			wbairitu += 40 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「ドラゴンナイト」スキル「マッドネスクラッシャー」
		case SKILL_ID_MADNESS_CRUSHER:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 両手剣、両手槍のみ発動可能
			if (![ITEM_KIND_SWORD_2HAND, ITEM_KIND_SPEAR_2HAND].includes(n_A_WeaponType)) {
				wbairitu = 0;
				n_Buki_Muri = 1;
				break;
			}
			// 距離属性
			n_Enekyori = 1;
			// 基本倍率
			wbairitu = 3000 + 900 * n_A_ActiveSkillLV;
			// 重量補正 (2025/01/12 未確認)
			wpnLv = ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS]][ITEM_DATA_INDEX_WPNLV] % 10;
			weight = ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS]][ITEM_DATA_INDEX_WEIGHT];
			wbairitu += weight * wpnLv;
			// POW補正 (2025/01/12 未確認)
			wbairitu += 15 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		case SKILL_ID_STORM_SLASH:

			// 両手剣、両手斧のみ発動可能
			switch (n_A_WeaponType) {

			case ITEM_KIND_SWORD_2HAND:
			case ITEM_KIND_AXE_2HAND:


				// 詠唱時間等
				wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);

				// 距離属性
				n_Enekyori = 0;

				// 基本倍率
				wbairitu = 1250 + (50 * n_A_ActiveSkillLV);

				// POW補正
				wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);

				// ベースレベル補正
				wbairitu *= n_A_BaseLV / 100;

				// HIT数
				wHITsuu = 1 * n_A_ActiveSkillLV;
				break;

			default:
				wbairitu = 0;
				n_Buki_Muri = 1;
				break;
			}
			break;

		case SKILL_ID_DANCING_KNIFE:

// TODO: 詠唱時間等未実測スキル
g_bUnknownCasts = true;

			// 距離属性
			n_Enekyori = 0;

			// 右手短剣のみ発動可能
			switch (n_A_WeaponType) {

			case ITEM_KIND_KNIFE:

				// 基本倍率
				wbairitu = 100 + (100 * n_A_ActiveSkillLV);

				// POW補正
				wbairitu += 2 * GetTotalSpecStatus(MIG_PARAM_ID_POW);

				// ベースレベル補正
				wbairitu *= n_A_BaseLV / 100;
				break;

			default:
				wbairitu = 0;
				n_Buki_Muri = 1;
				break;
			}
			break;

		case SKILL_ID_SAVAGE_IMPACT:

			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);

			// 距離属性
			n_Enekyori = 0;

			// カタールのみ発動可能
			switch (n_A_WeaponType) {

			case ITEM_KIND_KATAR:

				// 基本倍率
				wbairitu = 500 + (100 * n_A_ActiveSkillLV);

				// POW補正
				wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);

				// シャドウエクシード状態時、倍率２倍
				if (UsedSkillSearch(SKILL_ID_SHADOW_EXCEED) > 0) {
					wbairitu *= 2;
				}

				// ベースレベル補正
				wbairitu *= n_A_BaseLV / 100;

				// クローキングエクシード時、２回攻撃（２ＨＩＴ）
				if (attackMethodConfArray[0].GetOptionValue(0) == 1) {
					wHITsuu = 2;
				}
				break;

			default:
				wbairitu = 0;
				n_Buki_Muri = 1;
				break;
			}
			break;

		case SKILL_ID_ETERNAL_SLASH:

// TODO: 詠唱時間等未実測スキル
g_bUnknownCasts = true;

			// 距離属性
			n_Enekyori = 0;

			// 基本倍率
			wbairitu = 50 + (50 * n_A_ActiveSkillLV);

			// POW補正
			wbairitu += 1 * GetTotalSpecStatus(MIG_PARAM_ID_POW);

			// シャドウエクシード状態時、倍率２倍
			if (UsedSkillSearch(SKILL_ID_SHADOW_EXCEED) > 0) {
				wbairitu *= 2;
			}

			// ベースレベル補正
			wbairitu *= n_A_BaseLV / 100;

			// エターナルカウンター分の連続攻撃になる
			wHITsuu = Math.max(1, parseInt(attackMethodConfArray[0].GetOptionValue(0), 10));
			break;

		// 「シャドウクロス」スキル「フェイタルシャドウクロー」
		case SKILL_ID_FATAL_SHADOW_CRAW:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 距離属性
			n_Enekyori = 0;
			// 基本倍率
			wbairitu = 600 + 150 * n_A_ActiveSkillLV;
			// POW補正 (2025/01/12 未確認)
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「シャドウクロス」スキル「シャドウスタブ」
		case SKILL_ID_SHADOW_STAB:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 右手短剣のみ発動可能
			if (n_A_WeaponType != ITEM_KIND_KNIFE) {
				wbairitu = 0;
				n_Buki_Muri = 1;
				break;
			}
			// 距離属性
			n_Enekyori = 0;
			// 基本倍率
			if (attackMethodConfArray[0].GetOptionValue(0) == 1) {
				// クローキングエクシード状態
				wbairitu = 1250 + 1250 * n_A_ActiveSkillLV;
			} else {
				// 通常状態
				wbairitu = 500 + 500 * n_A_ActiveSkillLV;
			}
			// POW補正 (2025/01/12 未確認)
			wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		case SKILL_ID_IMPACT_CRATER:

			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);

			// カタールのみ発動可能
			switch (n_A_WeaponType) {

			case ITEM_KIND_KATAR:

				// 距離属性
				n_Enekyori = 0;

				// 基本倍率
				wbairitu = 50 + (50 * n_A_ActiveSkillLV);

				// POW補正
				wbairitu += 1 * GetTotalSpecStatus(MIG_PARAM_ID_POW);

				// ベースレベル補正
				wbairitu *= n_A_BaseLV / 100;

				// 回転カウンター分の連続攻撃になる
				wHITsuu = Math.max(1, parseInt(attackMethodConfArray[0].GetOptionValue(0), 10));
				break;

			default:
				wbairitu = 0;
				n_Buki_Muri = 1;
				break;
			}
			break;

		//「カーディナル」スキル「エフィリゴ」
		/**
		 * 2024/10/22 YE鯖の実測に対して許容が難しい誤差あり
		 * 分割ヒット周りで丸め誤差が生じている可能性もあります
		 * 不死・悪魔の倍率実測も済んでないので追試必須
		 */
		case SKILL_ID_EFIRIGO:
			// 鈍器、本のみ発動可能
			if (![ITEM_KIND_CLUB, ITEM_KIND_BOOK].includes(n_A_WeaponType)) {
				wbairitu = 0;
				n_Buki_Muri = 1;
				break;
			}
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 距離属性
			n_Enekyori = 0;
			// 基本倍率
			if ([RACE_ID_UNDEAD, RACE_ID_DEMON].includes(mobData[MONSTER_DATA_INDEX_RACE])) {
				// 不死・悪魔形の場合
				wbairitu = 4000 + 500 * n_A_ActiveSkillLV;
			} else {
				// それ以外
				wbairitu = 3000 + 375 * n_A_ActiveSkillLV;
			}
			// POW補正
			wbairitu += 40 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// 鈍器＆本修練 補正
			wbairitu += 475 + 68 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_DONKI_HON_SHUREN);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			
			// 分割ヒット
			wActiveHitNum = 7;
			break;

		// 「カーディナル」スキル「ペティティオ」
		// 2024/10/23 ダメージ誤差無しを確認
		case SKILL_ID_PETITIO:
			// 鈍器、本のみ発動可能
			if (![ITEM_KIND_CLUB, ITEM_KIND_BOOK].includes(n_A_WeaponType)) {
				wbairitu = 0;
				n_Buki_Muri = 1;
				break;
			}
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 武器種別による距離属性変化
			n_Enekyori = (n_A_WeaponType == ITEM_KIND_BOOK) ? 0 :1;
			// 基本倍率
			wbairitu = 250 * n_A_ActiveSkillLV;
			// POW補正
			wbairitu += 15 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// 鈍器・本修練補正
			wbairitu += 20 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_DONKI_HON_SHUREN);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「ウィンドホーク」スキル「ホークラッシュ」
		// 2024/11/15 誤差無しを確認
		case SKILL_ID_HAWK_RUSH:
			// 弓のみ発動可能
			if (n_A_WeaponType != ITEM_KIND_BOW) {
				wbairitu = 0;
				n_Buki_Muri = 1;
				break;
			}
			// ディレイ、クールタイム
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 距離属性
			n_Enekyori = 1;
			// 分割HIT数（スキル説明文には記載なし）
			wActiveHitNum = 2;
			// 基本倍率
			wbairitu = 1000 + (100 * n_A_ActiveSkillLV);
			// ワシの目の習得レベルは射程が伸びるだけでダメージ倍率に寄与しない
			// CON補正
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
			// 自然親和補正
			wbairitu *= (1 + 0.2 * UsedSkillSearch(SKILL_ID_SHIZEN_SHINWA));
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「ウィンドホーク」スキル「ホークブーメラン」
		// 2024/11/15 誤差無しを確認
		case SKILL_ID_HAWK_BOOMERANG:
			// 弓のみ発動可能
			if (n_A_WeaponType != ITEM_KIND_BOW) {
				wbairitu = 0;
				n_Buki_Muri = 1;
				break;
			}
			// ディレイ、クールタイム
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 距離属性
			n_Enekyori = 1;
			// 基本倍率
			wbairitu = 1000 + (100 * n_A_ActiveSkillLV);
			// ワシの目の習得レベルは射程が伸びるだけでダメージ倍率に寄与しない
			// CON補正
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
			// 自然親和補正
			wbairitu *= (1 + 0.2 * UsedSkillSearch(SKILL_ID_SHIZEN_SHINWA));
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);	
			// 種族特攻は小数点以下に掛からない
			// 動物・魚貝形はダメージ倍率２倍
			switch (mobData[MONSTER_DATA_INDEX_RACE]) {
				case RACE_ID_ANIMAL:
				case RACE_ID_FISH:
					wbairitu = Math.floor(wbairitu * 2);	
					break;
			}
			break;

		// 「ウィンドホーク」スキル「ゲイルストーム」
		// 2024/11/15 誤差なしを確認
		case SKILL_ID_GALE_STORM:
			// 弓のみ発動可能
			if (n_A_WeaponType != ITEM_KIND_BOW) {
				wbairitu = 0;
				n_Buki_Muri = 1;
				break;
			}
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 分割ヒット
			wActiveHitNum = 5;
			// 距離属性
			n_Enekyori = 1;
			// 基本倍率
			wbairitu = 1000 + 200 * n_A_ActiveSkillLV;
			// ワシの目の習得レベルは射程が伸びるだけでダメージ倍率に寄与しない
			// CON補正
			wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// カラミティゲイル状態は小数点以下に掛からない
			// カラミティゲイル状態で Mob の種族が動物・魚介の場合ダメージ２倍
			if (UsedSkillSearch(SKILL_ID_CALAMITY_GALE) > 0) {
				if ([RACE_ID_FISH, RACE_ID_ANIMAL].includes(mobData[MONSTER_DATA_INDEX_RACE])) {
					wbairitu = Math.floor(wbairitu * 2.00);
				}
			}
			break;

		// 「ウィンドホーク」スキル「ディープブラインドトラップ」
		// 「ウィンドホーク」スキル「ソリッドトラップ」
		// 「ウィンドホーク」スキル「スイフトトラップ」
		// 「ウィンドホーク」スキル「フレイムトラップ」
		// 2024/11/14 実測誤差が 0 ～ +1 であることを確認済み
		case SKILL_ID_DEEP_BLIND_TRAP:
		case SKILL_ID_SOLID_TRAP:
		case SKILL_ID_SWIFT_TRAP:
		case SKILL_ID_FLAME_TRAP:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル
			g_bDefinedDamageIntervals = true;
			// オブジェクト存続時間
			n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ間隔
			n_Delay[5] = ([0, 1300, 900, 600, 400, 300])[n_A_ActiveSkillLV];
			// 距離属性
			n_Enekyori = 0;
			// 基本倍率
			wbairitu = 1500 + 300 * n_A_ActiveSkillLV;
			// トラップ研究は射程が伸びるだけでダメージには寄与しない
			// CON補正
			wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
			// ベースレベル補正
			wbairitu = wbairitu * n_A_BaseLV / 100;
			// アドバンスドトラップ研究は小数点以下にも掛かる
			// アドバンスドトラップ研究補正
			wbairitu = Math.floor(wbairitu * (1 + 0.2 * UsedSkillSearch(SKILL_ID_ADVANCED_TRAP)));
			break;

		// 「ウィンドホーク」スキル「クレッシブボルト」
		// 2024/11/15 誤差なしを確認
		case SKILL_ID_CRESSIVE_VOLT:
			// 弓のみ発動可能
			if (n_A_WeaponType != ITEM_KIND_BOW) {
				wbairitu = 0;
				n_Buki_Muri = 1;
				break;
			}
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 距離属性
			n_Enekyori = 1;
			// 基本倍率
			wbairitu = 1000 + 200 * n_A_ActiveSkillLV;
			// ワシの目の習得レベルは射程が伸びるだけでダメージ倍率に寄与しない
			// CON補正
			wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
			// ベースレベル補正
			wbairitu *= n_A_BaseLV / 100;
			// クレッシブボルト状態は小数点以下にも掛かる
			// クレッシブボルト状態による増幅 (1.00, 1.10, 1.25, 1.50)
			wbairitu = Math.floor(wbairitu * [1.00, 1.10, 1.25, 1.50][attackMethodConfArray[0].GetOptionValue(0)]);
			// カラミティゲイル状態は小数点以下に掛からない
			// カラミティゲイル状態で 1.25 倍
			if (UsedSkillSearch(SKILL_ID_CALAMITY_GALE) > 0) {
				wbairitu = Math.floor(wbairitu * 1.25);
				// Mob の種族が魚介または動物の場合さらに 2.00 倍
				if ([RACE_ID_FISH, RACE_ID_ANIMAL].includes(mobData[MONSTER_DATA_INDEX_RACE])) {
					wbairitu = Math.floor(wbairitu * 2.00);
				}
			}
			break;

		// 「マイスター」スキル「アックスストンプ」
		case SKILL_ID_AXE_STOMP:
			// 片手斧・両手斧のみ発動可能
			switch (n_A_WeaponType) {
				// 2024/09/19 通常鯖のお試し道場で誤差無しを確認
				case ITEM_KIND_AXE:
				case ITEM_KIND_AXE_2HAND:
					// 詠唱時間等
					wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
					n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
					n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
					n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
					// 基本倍率
					wbairitu = 3150 + (750 * n_A_ActiveSkillLV);
					// POW補正
					wbairitu += 23 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
					// ベースレベル補正
					wbairitu *= n_A_BaseLV / 100;
					wbairitu = Math.floor(wbairitu);
					// 両手斧装備時、２回攻撃（２ＨＩＴ）
					if (n_A_WeaponType == ITEM_KIND_AXE_2HAND) {
						wHITsuu = 2;
					}
					break;
				default:
					wbairitu = 0;
					n_Buki_Muri = 1;
					break;
			}
			break;

		// 「マイスター」スキル「ラッシュクエイク」
		// 2025/01/18 ふみ。さん提供データに一致
		case SKILL_ID_RUSH_QUAKE:
			// 距離属性
			n_Enekyori = 0;
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			wbairitu = 2700 * n_A_ActiveSkillLV;
			// POW補正
			wbairitu += 90 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「マイスター」スキル「攻撃装置有効化」
		// 2025/01/18 ふみ。さん提供データに一致
		case SKILL_ID_KOGEKI_SOCHI_YUKOKA:
			// 詠唱時間等 (自分中心に継続ダメージが発生するバフのため詠唱などは無し)
			wCast = 0;
			n_KoteiCast = 0;
			n_Delay[2] = 0;
			n_Delay[7] = 0;
			// 設置スキル
			g_bDefinedDamageIntervals = true;
			// ダメージ間隔
			n_Delay[5] = 1000;
			// オブジェクト存続時間
			n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 距離属性
			n_Enekyori = 0;
			// 基本倍率
			wbairitu = (300 * n_A_ActiveSkillLV);
			// POW補正（バフの術者であるマイスターのPOWを参照する）
			wbairitu += 5 * attackMethodConfArray[0].GetOptionValue(0);
			// ベースレベル補正（バフの被術者である自分のベースレベルを参照する）
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「インペリアルガード」スキル「グランドジャッジメント」
		case SKILL_ID_GRAND_JUDGEMENT:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 片手槍・両手槍装備、「アタックスタンス」状態のみ発動可能
			let state_attack_stance = (UsedSkillSearch(SKILL_ID_ATTACK_STANCE) > 0);
			if (![ITEM_KIND_SPEAR,ITEM_KIND_SPEAR_2HAND].includes(n_A_WeaponType) || !state_attack_stance) {
				wbairitu = 0;
				n_Buki_Muri = 1;
				break;
			}
			// 距離属性
			n_Enekyori = 1;
			// 基本倍率
			wbairitu = 7000 + 2000 * n_A_ActiveSkillLV;
			// POW補正 (2025/01/12 未確認)
			wbairitu += 35 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		case SKILL_ID_SHIELD_SHOOTING:

// TODO: 詠唱時間等未実測スキル
g_bUnknownCasts = true;

			bMatchCond = false;

			// 盾装備、「アタックスタンス」状態のみ発動可能
			if (n_A_Equip[EQUIP_REGION_ID_SHIELD] != ITEM_ID_NOEQUIP_SHIELD) {
				if (UsedSkillSearch(SKILL_ID_ATTACK_STANCE) > 0) {
					bMatchCond = true;
				}
			}

			if (bMatchCond) {

				// 距離属性
				n_Enekyori = 1;

				// 基本倍率
				wbairitu = 600 + (800 * n_A_ActiveSkillLV);

				// POW補正
				wbairitu += 15 * GetTotalSpecStatus(MIG_PARAM_ID_POW);

				// ベースレベル補正
				wbairitu *= n_A_BaseLV / 100;
			}

			else {
				wbairitu = 0;
				n_Buki_Muri = 1;
			}
			break;

		// 「インペリアルガード」スキル「オーバースラッシュ」
		case SKILL_ID_OVER_SLASH:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 「アタックスタンス」状態のみ発動可能
			if (UsedSkillSearch(SKILL_ID_ATTACK_STANCE) === 0) {
				wbairitu = 0;
				n_Buki_Muri = 1;
				break;
			}
			// 距離属性
			n_Enekyori = 0;
			// 基本倍率
			wbairitu = 70 * n_A_ActiveSkillLV;
			// POW補正 (2025/01/12 未確認)
			wbairitu += 4 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// ヒット数
			switch(attackMethodConfArray[0].GetOptionValue(0)) {
				case 1:
					wHITsuu = 3;
					break;
				case 2:
					wHITsuu = 5;
					break;
				case 4:
					wHITsuu = 7;
					break;
			}
			break;

		// 「アビスチェイサー」スキル「アビスダガー」
		// 2024/10/23 提供データとの誤差無し
		case SKILL_ID_ABYSS_DAGGER:
			// 短剣・片手剣装備状態のみ発動可能
			if (![ITEM_KIND_KNIFE, ITEM_KIND_SWORD].includes(n_A_WeaponType)) {
				wbairitu = 0;
				n_Buki_Muri = 1;
				break;
			}
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 距離属性
			n_Enekyori = 0;
			// 基本倍率
			wbairitu = 3150 + 750 * n_A_ActiveSkillLV;
			// POW補正
			wbairitu += 23 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// 分割ヒット数
			wActiveHitNum = 2;
			break;

		// 「アビスチェイサー」スキル「アンラッキーラッシュ」
		// 2024/10/24 誤差無しを確認（ただしスキルLv1のみ）
		case SKILL_ID_UNLUCKY_RUSH:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 距離属性
			n_Enekyori = 0;
			// 基本倍率
			wbairitu = 2100 + 600 * n_A_ActiveSkillLV;
			// POW補正
			wbairitu += 17 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「アビスチェイサー」スキル「チェーンリアクション」
		// 2024/10/24 実測値に対して +1 の誤差が生じる場合があります
		// 計算前後の丸め誤差によるものと判断しています
		case SKILL_ID_CHAIN_REACTION_SHOT:
			if (![ITEM_KIND_BOW].includes(n_A_WeaponType)) {
				wbairitu = 0;
				n_Buki_Muri = 1;
				break;
			}
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 距離属性
			n_Enekyori = 1;
			// 基本倍率
			wbairitu = 2350 + 550 * n_A_ActiveSkillLV;
			// CON補正
			wbairitu += 17 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「アビスチェイサー」スキル「デフトスタブ」
		// 2024/10/23 提供データとの誤差無し
		case SKILL_ID_DEFT_STAB:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 距離属性
			n_Enekyori = 0;
			// 基本倍率
			wbairitu = 3400 + 350 * n_A_ActiveSkillLV;
			// POW補正
			wbairitu += 23 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// 分割ヒット
			wActiveHitNum = 2
			break;

		// 「アビスチェイサー」スキル「フレンジショット」
		// 2024/12/24 誤差無しを確認（ただしスキルLv1のみ）
		case SKILL_ID_FLANGE_SHOT:
			if (![ITEM_KIND_BOW].includes(n_A_WeaponType)) {
				wbairitu = 0;
				n_Buki_Muri = 1;
				break;
			}
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 距離属性
			n_Enekyori = 1;
			// 基本倍率
			wbairitu = 1100 + 100 * n_A_ActiveSkillLV;
			// CON補正
			wbairitu += 7 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// ヒット数
			// 通常は 1 hit だが 5 * skillLv の確率で 3 hit になる
			hitCountArray = [];
			hitCountArray[0] = 1;
			hitCountArray[1] = ((100 - (5 * n_A_ActiveSkillLV)) * 1 + (5 * n_A_ActiveSkillLV) * 3) / 100;
			hitCountArray[2] = 3;
			break;

		// 「インクイジター」スキル「聖油洗礼」
		// Lv260のSkillLv3,4,5で+13の誤差あり
		// Lv251では誤差無し
		// 提供データの採取ミス、または前段・後続の計算処理の問題と判断
		case SKILL_ID_SEYU_SENRE:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 距離属性
			n_Enekyori = 1;
			// 基本倍率
			wbairitu = 2000 + 500 * n_A_ActiveSkillLV;
			// POW補正
			wbairitu += 15 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「インクイジター」スキル「第一撃：烙印」
		case SKILL_ID_DAIICHIGEKI_RAKUIN:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 距離属性
			n_Enekyori = 0;
			// 基本倍率
			wbairitu = 2000 + 500 * n_A_ActiveSkillLV;
			// POW補正
			wbairitu += 15 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「インクイジター」スキル「第三撃：断罪」
		// YE道場の実測に対して最大で+1の誤差あり
		case SKILL_ID_DAISANGEKI_DANZAI:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 距離属性
			n_Enekyori = 0;
			// 基本倍率
			wbairitu = 7000 + 1000 * n_A_ActiveSkillLV;
			// POW補正
			wbairitu += 40 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「インクイジター」スキル「第三撃：滅火撃」
		// YE道場の実測値に対して誤差無し
		case SKILL_ID_DAISANGEKI_MEKKAGEKI:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 距離属性
			n_Enekyori = 0;
			// 基本倍率
			wbairitu = 7000 + 1000 * n_A_ActiveSkillLV;
			// POW補正
			wbairitu += 40 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// MaxHP補正
			wbairitu += charaData[CHARA_DATA_INDEX_MAXHP] / 100;
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// ヒット数
			if (UsedSkillSearch(SKILL_ID_KIKO) >= 11) {
				wHITsuu = 3;
			}
			else if (UsedSkillSearch(SKILL_ID_KIKO) >= 6) {
				wHITsuu = 2;
			}
			break;

		// 「インクイジター」スキル「第三撃：浄化」
		case SKILL_ID_DAISANGEKI_ZYOKA:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 距離属性
			n_Enekyori = 0;
			// 基本倍率
			wbairitu = 7000 + 1000 * n_A_ActiveSkillLV;
			// POW補正
			wbairitu += 40 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// ヒット数
			wHITsuu = 2;
			break;

		// 「インクイジター」スキル「第二撃：滅魔の火」
		// YE道場の実測に対して誤差無し
		case SKILL_ID_DAINIGEKI_METSUMANO_HI:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 距離属性
			n_Enekyori = 0;
			// 基本倍率
			wbairitu = 3600 + 900 * n_A_ActiveSkillLV;
			// POW補正
			wbairitu += 27 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「インクイジター」スキル「第二撃：信念」	
		// YE道場の実測値に対して誤差無し
		case SKILL_ID_DAINIGEKI_SHINNEN:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 距離属性
			n_Enekyori = 0;
			// 基本倍率
			wbairitu = 3150 + 750 * n_A_ActiveSkillLV;
			// POW補正
			wbairitu += 23 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// 分割ヒット
			wActiveHitNum = 2;
			break;

		// 「インクイジター」スキル「第二撃：審判」
		case SKILL_ID_DAINIGEKI_SHINPAN:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 距離属性
			n_Enekyori = 0;
			// 基本倍率
			wbairitu = 3375 + 825 * n_A_ActiveSkillLV;
			// POW補正
			wbairitu += 25 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// 分割ヒット
			wActiveHitNum = 3;
			break;

		// 「インクイジター」スキル「爆火神弾」
		// Lv260でSkillLv3以上に+13の誤差あり
		// Lv251の提供データとLv216のusa実測には誤差無し
		// 提供データの採取ミス、あるいは前段か後続の計算部分の問題と判断
		case SKILL_ID_BAKKA_SHINDAN:
			// 詠唱など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 距離属性
			n_Enekyori = 1;
			// 基本倍率
			wbairitu = 2000 + 500 * n_A_ActiveSkillLV;
			// 特性ステータス補正
			wbairitu += 15 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「インクイジター」スキル「炎火滅魔神弾」
		// Lv260のSkillLv2,3,4で+14の誤差あり
		// Lv251では誤差無し
		// 提供データの採取ミス、あるいは前段か後続の計算部分の問題と判断
		case SKILL_ID_ENKA_METSUMA_SHINDAN:
			// 詠唱など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 距離属性
			n_Enekyori = 1;
			// 基本倍率
			wbairitu = 3500 + 1000 * n_A_ActiveSkillLV;
			// POW補正
			wbairitu += 45 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「トルバドゥール・トルヴェール」スキル「ロゼブロッサム」
		// 「ステージマナー」の習得レベルが5の時はこの計算式で誤差無しになります
		// それ以外の場合は誤差があるので修正が必要です
		case SKILL_ID_ROSE_BLOSSOM:
			// 弓・楽器・鞭装備状態のみ発動可能
			if (![ITEM_KIND_BOW, ITEM_KIND_MUSICAL, ITEM_KIND_WHIP].includes(n_A_WeaponType)) {
				wbairitu = 0;
				n_Buki_Muri = 1;
				break;
			}
			// 距離属性
			n_Enekyori = 1;
			// 初段ＨＩＴの場合
			if (battleCalcInfo.parentSkillId === undefined) {
				// 詠唱時間等
				wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 基本倍率
				wbairitu = 750 + (150 * n_A_ActiveSkillLV);
				// CON補正
				wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				// サウンドブレンド補正
				if (n_B_IJYOU[MOB_CONF_DEBUF_ID_SOUND_BLEND]) {
					wbairitu += 500 + (200 * n_A_ActiveSkillLV);
					// CON補正
					wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				}
				// ベースレベル補正
				wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
				// 分割HIT数
				wActiveHitNum = 2;
			}
			// 追撃の場合
			else {
				// 基本倍率
				wbairitu = 1250 + (350 * n_A_ActiveSkillLV);
				// CON補正
				wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				// サウンドブレンド補正
				if (n_B_IJYOU[MOB_CONF_DEBUF_ID_SOUND_BLEND]) {
					wbairitu += 1250 + (350 * n_A_ActiveSkillLV);
					// CON補正
					wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
				}
				// ベースレベル補正
				wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			}
			break;

		// 「トルバドゥール・トルヴェール」スキル「リズムシューティング」
		// 「ステージマナー」の習得レベルが5の時はこの計算式で誤差無しになります
		// それ以外の場合は誤差があるので修正が必要です
		case SKILL_ID_RHYTHM_SHOOTING:
			// 弓・楽器・鞭装備状態のみ発動可能
			if (![ITEM_KIND_BOW, ITEM_KIND_MUSICAL, ITEM_KIND_WHIP].includes(n_A_WeaponType)) {
				wbairitu = 0;
				n_Buki_Muri = 1;
				break;
			}
			// 距離属性
			n_Enekyori = 1;
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			wbairitu = 750 + (150 * n_A_ActiveSkillLV);
			// CON補正
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
			// サウンドブレンド補正
			if (n_B_IJYOU[MOB_CONF_DEBUF_ID_SOUND_BLEND]) {
				wbairitu += 500 + (200 * n_A_ActiveSkillLV);
				// CON補正
				wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
			}
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// ヒット数
			wHITsuu = 3;
			break;

		// 「バイオロ」スキル「アシディファイドゾーン」
		// 2024/11/15 初撃のダメージ誤差無しを確認済み
		// 設置ダメージは全く合わないが実用性が薄いので調査優先度は低いと判断しこのまま静観します
		case SKILL_ID_ACIDIFIED_ZONE_MIZU:
		case SKILL_ID_ACIDIFIED_ZONE_CHI:
		case SKILL_ID_ACIDIFIED_ZONE_HI:
		case SKILL_ID_ACIDIFIED_ZONE_KAZE:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 初段ダメージの場合
			if (attackMethodConfArray[0].GetOptionValue(0) == 0) {
				// 距離属性
				n_Enekyori = 1;
				// バイオニックファーマシーはダメージ倍率に寄与しない
				// 基本倍率
				wbairitu = 2000 + 200 * n_A_ActiveSkillLV;
				// リサーチレポートの状態
				let research_report = (UsedSkillSearch(SKILL_ID_RESEARCH_REPORT) > 0);
				let effective_race = [RACE_ID_SOLID, RACE_ID_PLANT].includes(mobData[MONSTER_DATA_INDEX_RACE]);
				// POW補正
				if (research_report && effective_race) {
					// リサーチレポート種族特攻は POW 補正だけに 1.5 倍率がかかる
					wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW) * 1.5;
				} else {
					// POW補正
					wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				}
				// リサーチレポート共通補正は全体に 1.5 倍率がかかる
				if (research_report) {
					wbairitu *= 1.5;
				}
				// BaseLv補正
				wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
				// ヒット数
				wHITsuu = 3;
			}
			// 設置ダメージの場合
			// 2024/11/15 YEサーバー実測と全く合わないことを確認済み
			// POW補正とBaseLv補正をそれぞれON/OFF組み合わせても合わない
			else {
				g_bDefinedDamageIntervals = true;
				// ダメージ間隔
				n_Delay[5] = 1000;
				// オブジェクト存続時間
				n_Delay[6] = 10000;
				// 距離属性
				n_Enekyori = 0;
				// 基本倍率
				wbairitu = Math.floor(62.5 * n_A_ActiveSkillLV);
				// POW補正
				//wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// ベースレベル補正
				wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			}
			break;

		// 「天帝」スキル「天地一陽」
		case SKILL_ID_TENCHI_ICHIYO:
			// 距離属性
			n_Enekyori = 0;
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			wbairitu = 250 + (50 * n_A_ActiveSkillLV);
			// POW補正
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// 天気修練 補正
			wbairitu += 5 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_TENKI_SHUREN);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// 分割ヒット
			wActiveHitNum = 2;
			break;

		// 「天帝」スキル「太天一陽」
		// 2024/11/11 もなこさん提供データに対して誤差なしを確認
		case SKILL_ID_TAITEN_ICHIYO:
			// 日出、正午、天気の身状態でのみ使用可能
			state_hinode = (UsedSkillSearch(SKILL_ID_UNKONO_ZYOTAI) == 1);
			state_shougo = (UsedSkillSearch(SKILL_ID_UNKONO_ZYOTAI) == 2);
			state_tenki_no_mi = (UsedSkillSearch(SKILL_ID_TENKINO_MI) >= 1);
			if (!state_hinode && !state_shougo && !state_tenki_no_mi) {
				wbairitu = 0;
				n_Buki_Muri = 1;
				break;
			}
			// 距離属性
			n_Enekyori = 0;
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			wbairitu = 1125 + 175 * n_A_ActiveSkillLV;
			// POW補正
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// 天気修練 補正
			wbairitu += 5 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_TENKI_SHUREN);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// 正午 or 天気の身 のときだけクリが乗る仕様は CSkillManager.js 側で対処済み
			// 分割ヒット
			wActiveHitNum = 2;
			break;

		// 「天帝」スキル「天陽」
		// 2024/11/11 もなこさん提供データに対して誤差なしを確認
		case SKILL_ID_TENYO:
			// 正午、日没、天気の身状態でのみ使用可能
			state_shougo = (UsedSkillSearch(SKILL_ID_UNKONO_ZYOTAI) == 2);
			state_nichibotsu = (UsedSkillSearch(SKILL_ID_UNKONO_ZYOTAI) == 3);
			state_tenki_no_mi = (UsedSkillSearch(SKILL_ID_TENKINO_MI) >= 1)
			if (!state_shougo && !state_nichibotsu && !state_tenki_no_mi) {
				wbairitu = 0;
				n_Buki_Muri = 1;
				break;
			}
			// 距離属性
			n_Enekyori = 0;
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			wbairitu = 1575 + 225 * n_A_ActiveSkillLV;
			// POW補正
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// 天気修練 補正
			wbairitu += 5 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_TENKI_SHUREN);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// 日没 or 天気の身 のときだけクリが乗る仕様は CSkillManager.js 側で対処済み
			// 分割ヒット
			wActiveHitNum = 2;
			break;

		// 「天帝」スキル「天地一月」
		case SKILL_ID_TENCHI_ICHIGETSU:
			// 距離属性
			n_Enekyori = 0;
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			wbairitu = 175 + (25 * n_A_ActiveSkillLV);
			// POW補正
			wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// 天気修練 補正
			wbairitu += 5 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_TENKI_SHUREN);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// 分割ヒット
			wActiveHitNum = 2;
			break;

		// 「天帝」スキル「太天一月」
		case SKILL_ID_TAITEN_ICHIGETSU:
			// 月出、正子、天気の身状態でのみ使用可能
			state_tukidashi = (UsedSkillSearch(SKILL_ID_UNKONO_ZYOTAI) == 4);
			state_shougo = (UsedSkillSearch(SKILL_ID_UNKONO_ZYOTAI) == 5);
			state_tenki_no_mi = (UsedSkillSearch(SKILL_ID_TENKINO_MI) >= 1);
			if (!state_tukidashi && !state_shougo && !state_tenki_no_mi) {
				wbairitu = 0;
				n_Buki_Muri = 1;
				break;
			}
			// 距離属性
			n_Enekyori = 0;
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			wbairitu = 750 + (100 * n_A_ActiveSkillLV);
			// 正子、天気の身状態なら、倍率２倍
			if (state_shougo || state_tenki_no_mi) {
				wbairitu *= 2;
			}
			// POW補正
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// 天気修練 補正
			wbairitu += 5 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_TENKI_SHUREN);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// 分割ヒット
			wActiveHitNum = 2;
			break;

		// 「天帝」スキル「天月」
		// 2024/11/11 もなこさん提供データに対して誤差なしを確認
		case SKILL_ID_TENGETSU:
			// 正子、月没、天気の身状態でのみ使用可能
			state_shougo = (UsedSkillSearch(SKILL_ID_UNKONO_ZYOTAI) == 5);
			state_tukibotsu = (UsedSkillSearch(SKILL_ID_UNKONO_ZYOTAI) == 6);
			state_tenki_no_mi = (UsedSkillSearch(SKILL_ID_TENKINO_MI) >= 1);
			if (!state_tukibotsu && !state_shougo && !state_tenki_no_mi) {
				wbairitu = 0;
				n_Buki_Muri = 1;
				break;
			}
			// 距離属性
			n_Enekyori = 0;
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			if (state_tukibotsu || state_tenki_no_mi) {
				// 月没or天気の身状態なら、倍率２倍
				wbairitu = 1750 + 300 * n_A_ActiveSkillLV;
			} else {
				wbairitu = 875 + 150 * n_A_ActiveSkillLV;
			}
			// POW補正
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// 天気修練 補正
			wbairitu += 5 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_TENKI_SHUREN);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// 分割ヒット
			wActiveHitNum = 2;
			break;

		// 「天帝」スキル「天地万星」
		case SKILL_ID_TENCHI_BANSE:
			// 距離属性
			n_Enekyori = 0;
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル
			g_bDefinedDamageIntervals = true;
			n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ間隔
			n_Delay[5] = 300;
			// 基本倍率
			wbairitu = 250 + (100 * n_A_ActiveSkillLV);
			// POW補正
			wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// 天気修練 補正
			wbairitu += 3 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_TENKI_SHUREN);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// 分割ヒット
			wActiveHitNum = 3;
			break;

		// 「天帝」スキル「天命落星」
		case SKILL_ID_TENME_RAKUSE:
			// 距離属性
			n_Enekyori = 0;
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル
			g_bDefinedDamageIntervals = true;
			// ダメージ間隔
			n_Delay[5] = 300;
			// オブジェクト存続時間
			n_Delay[6] = 3000;
			// 基本倍率
			wbairitu = 150 + (100 * n_A_ActiveSkillLV);
			// POW補正
			wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// 天気修練 補正
			wbairitu += 5 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_TENKI_SHUREN);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// 分割ヒット
			wActiveHitNum = 2;
			break;

		// 「天帝」スキル「天星」
		case SKILL_ID_TENSE:
			// 距離属性
			n_Enekyori = 0;
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル
			g_bDefinedDamageIntervals = true;
			// ダメージ間隔
			n_Delay[5] = 300;
			// オブジェクト存続時間
			n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);;
			// 基本倍率
			wbairitu = 750 + (100 * n_A_ActiveSkillLV);
			// 天気修練 補正
			wbairitu += 5 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_TENKI_SHUREN);
			// POW補正
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// 分割ヒット
			wActiveHitNum = 3;
			break;

		// 「天帝」スキル「天羅万象」
		case SKILL_ID_TENRA_BANSHO:
			// 距離属性
			n_Enekyori = 0;
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			wbairitu = 300 * n_A_ActiveSkillLV;
			// POW補正
			wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// 悪魔・人間(プレイヤーを除く)形では、３回ヒット
			wHITsuu = 1;
			switch (parseInt(mobData[MONSTER_DATA_INDEX_RACE], 10)) {
				case RACE_ID_HUMAN:
					if (mobData[MONSTER_DATA_INDEX_ID] == MONSTER_ID_PLAYER) {
						break;
					}
				case RACE_ID_DEMON:
					wHITsuu = 3;
					break;
			}
			break;

		//「ナイトウォッチ」スキル「オンリーワンバレット」
		// 2025/01/25 もなこさん提供データに対して誤差なしを確認
		case SKILL_ID_ONLY_ONE_BULLET:
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 使用武器制限
			if (n_A_WeaponType != ITEM_KIND_HANDGUN && n_A_WeaponType != ITEM_KIND_RIFLE) {
				n_Buki_Muri = 1
				wbairitu = 0;
				break;
			}
			// 遠距離属性
			n_Enekyori = 1;
			if (n_A_WeaponType == ITEM_KIND_HANDGUN) {
				wbairitu = 6000 + 900 * n_A_ActiveSkillLV;
				bCri = false; // クリティカルしない
			}
			else if (n_A_WeaponType == ITEM_KIND_RIFLE) {
				wbairitu = 2800 + 500 * n_A_ActiveSkillLV;
			}
			// CON補正
			wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
			// 照準カウンター補正
			option_count = attackMethodConfArray[0].GetOptionValue(0);
			wbairitu += option_count * (950 + 150 * n_A_ActiveSkillLV);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「ナイトウォッチ」スキル「スパイラルシューティング」
		// 2025/01/25 もなこさん提供データに対して誤差なしを確認
		case SKILL_ID_SPIRAL_SHOOTING:
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 使用武器制限
			if (n_A_WeaponType != ITEM_KIND_GRENADEGUN && n_A_WeaponType != ITEM_KIND_RIFLE) {
				n_Buki_Muri = 1
				wbairitu = 0;
				break;
			}
			// 遠距離属性
			n_Enekyori = 1;
			if (n_A_WeaponType == ITEM_KIND_GRENADEGUN) {
				wbairitu = 1700 + 300 * n_A_ActiveSkillLV;
				bCri = false;	// クリティカルしない
				wHITsuu = 2;	// 2ヒットする
			}
			else if (n_A_WeaponType == ITEM_KIND_RIFLE) {
				wbairitu = 1950 + 350 * n_A_ActiveSkillLV;
			}
			// CON補正
			wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
			// 照準カウンター補正
			option_count = attackMethodConfArray[0].GetOptionValue(0);
			wbairitu += option_count * (550 + 100 * n_A_ActiveSkillLV);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「ナイトウォッチ」スキル「マガジンフォーワン」
		// 2025/01/25 もなこさん提供データに対して誤差なしを確認
		case SKILL_ID_MAGAZIN_FOR_ONE:
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 使用武器制限
			if (n_A_WeaponType != ITEM_KIND_HANDGUN && n_A_WeaponType != ITEM_KIND_GATLINGGUN) {
				n_Buki_Muri = 1
				wbairitu = 0;
				break;
			}
			// 遠距離属性
			n_Enekyori = 1;
			if (n_A_WeaponType == ITEM_KIND_GATLINGGUN) {
				wbairitu = 430 + 90 * n_A_ActiveSkillLV;
				bCri = false;	// クリティカルしない
				wHITsuu = 10;	// 10ヒットする
			}
			else if (n_A_WeaponType == ITEM_KIND_HANDGUN) {
				wbairitu = 500 + 50 * n_A_ActiveSkillLV;
				wHITsuu = 6;	// 6ヒットする
			}
			// CON補正
			wbairitu += 2 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
			// 照準カウンター補正
			option_count = attackMethodConfArray[0].GetOptionValue(0);
			wbairitu += option_count * (125 + 25 * n_A_ActiveSkillLV);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		//「ナイトウォッチ」スキル「ビジラントアットナイト」
		// 2025/01/25 もなこさん提供データに対して誤差なしを確認
		case SKILL_ID_VIGILANT_AT_NIGHT:
			// 使用武器制限
			if (n_A_WeaponType != ITEM_KIND_SHOTGUN && n_A_WeaponType != ITEM_KIND_GATLINGGUN) {
				n_Buki_Muri = 1
				wbairitu = 0;
				break;
			}
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 遠距離属性
			n_Enekyori = 1;
			// 照準カウンター
			option_count = attackMethodConfArray[0].GetOptionValue(0);
			if (n_A_WeaponType == ITEM_KIND_GATLINGGUN) {
				wHITsuu = 7;	// 7ヒットする
				// 基本倍率
				wbairitu = 375 + 85 * n_A_ActiveSkillLV;
				// 照準カウンター補正
				wbairitu += option_count * (125 + 25 * n_A_ActiveSkillLV);
				// CON補正
				wbairitu += 2 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
			}
			else if (n_A_WeaponType == ITEM_KIND_SHOTGUN) {
				wHITsuu = 4;	// 4ヒットする
				// 基本倍率
				wbairitu = 700 + 150 * n_A_ActiveSkillLV;
				// 照準カウンター補正
				wbairitu += option_count * (250 + 50 * n_A_ActiveSkillLV);
				// CON補正
				wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
			}
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		//「ナイトウォッチ」スキル「ワイルドファイア」
		// 2025/01/25 もなこさん提供データに対して誤差なしを確認
		case SKILL_ID_WILD_FIRE:
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 使用武器制限
			if (n_A_WeaponType != ITEM_KIND_SHOTGUN && n_A_WeaponType != ITEM_KIND_GRENADEGUN) {
				n_Buki_Muri = 1
				wbairitu = 0;
				break;
			}
			// 遠距離属性
			n_Enekyori = 1;
			// 基礎倍率
			wbairitu = 3700 + 600 * n_A_ActiveSkillLV;
			// CON補正
			wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
			// 照準カウンター補正
			option_count = attackMethodConfArray[0].GetOptionValue(0);
			wbairitu += option_count * (950 + 150 * n_A_ActiveSkillLV);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// 分割3ヒット
			wActiveHitNum = 3;
			break;


		/*
			「スピリットハンドラー」スキル「タイガースラッシュ」
			2024/11/08 誤差なしを確認済み
		*/
		case SKILL_ID_TIGER_SLASH:
			// 詠唱など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 遠距離属性
			n_Enekyori = 1;
			if (UsedSkillSearch(SKILL_ID_SANREI_ITTAI) > 0 || UsedSkillSearch(SKILL_ID_NYANTOMO_TEKKO) > 0) {
				// 基礎倍率
				wbairitu = 3000 + 500 * n_A_ActiveSkillLV;
				wbairitu += 150 * UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY);
			} else {
				// 基礎倍率
				wbairitu = 2050 + 350 * n_A_ActiveSkillLV;
				wbairitu += 100 * UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY);
				// クリティカル無し
				bCri = false;
			}
			// POW補正
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// 分割ヒット
			wActiveHitNum = 2;
			break;


		/*
			「スピリットハンドラー」スキル「タイガーハウリング」
		*/
		case SKILL_ID_TIGER_HOWLING:
			// 詠唱など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 遠距離属性
			n_Enekyori = 1;
			if (UsedSkillSearch(SKILL_ID_SANREI_ITTAI) > 0 || UsedSkillSearch(SKILL_ID_NYANTOMO_TEKKO) > 0) {
				// 基礎倍率
				wbairitu = 2400 + 300 * n_A_ActiveSkillLV;
				wbairitu += 100 * UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY);
			} else {
				// 基礎倍率
				wbairitu = 1600 + 200 * n_A_ActiveSkillLV;
				wbairitu += 50 * UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY);
			}
			// POW補正
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// スキル説明にないが3分割スキル
			wActiveHitNum = 3;
			break;


		/*
			「スピリットハンドラー」スキル「タイガーストライク」
		*/
		case SKILL_ID_TIGER_STRIKE:
			// 詠唱など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 遠距離属性
			n_Enekyori = 1;
			// ３ヒット
			wHITsuu = 3;
			if (UsedSkillSearch(SKILL_ID_SANREI_ITTAI) > 0 || UsedSkillSearch(SKILL_ID_NYANTOMO_TEKKO) > 0) {
				// 基礎倍率
				wbairitu = 450 + (150 * n_A_ActiveSkillLV);
				wbairitu += 20 * UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY);
			} else {
				// 基礎倍率
				wbairitu = 300 + (100 * n_A_ActiveSkillLV);
				wbairitu += 10 * UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY);
			}
			// POW補正
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「蜃気楼　不知火」スキル「影の舞」
		// 2024/12/25 もなこさん検証データとの誤差無しを確認ずみ
		case SKILL_ID_KAGE_NO_MAI:
			// 詠唱など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ倍率
			wbairitu = 3500 + 100 * n_A_ActiveSkillLV;											// 基礎倍率
			wbairitu += 45 * n_A_ActiveSkillLV * attackMethodConfArray[0].GetOptionValue(1);	// 習得済みスキル条件
			wbairitu += 4 * GetTotalSpecStatus(MIG_PARAM_ID_POW);								// 特性ステータス補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);									// BaseLv補正
			if (battleCalcInfo.parentSkillId === undefined) {
				// 本体の攻撃
				wActiveHitNum = 5;
			} else {
				// 分身の攻撃
				wbairitu = Math.floor(wbairitu * 30 / 100);					// 分身の威力は30%
				wbairitu *= attackMethodConfArray[0].GetOptionValue(0);		// 分身の数
				wActiveHitNum = 8;
			}
			break;

		// 「蜃気楼　不知火」スキル「影一閃」
		// 2024/12/25 もなこさん検証データとの誤差無しを確認ずみ
		case SKILL_ID_KAGE_ISSEN:
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ倍率
			wbairitu = 2000 + 100 * n_A_ActiveSkillLV;											// 基礎倍率
			wbairitu += 30 * n_A_ActiveSkillLV * attackMethodConfArray[0].GetOptionValue(0);	// 習得済みスキル条件
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);								// 特性ステータス補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);									// BaseLv補正
			// 分割ヒット
			wActiveHitNum = 2;
			break;

		// 「蜃気楼　不知火」スキル「影狩り」
		// 2024/12/25 もなこさん検証データとの誤差無しを確認ずみ
		case SKILL_ID_KAGE_GARI:
			// 詠唱など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ倍率
			wbairitu = 3500 + 100 * n_A_ActiveSkillLV;											// 基礎倍率
			wbairitu += 45 * n_A_ActiveSkillLV * attackMethodConfArray[0].GetOptionValue(0);	// 習得済みスキル条件
			wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_POW);								// 特性ステータス補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);									// BaseLv補正
			break;

		// 「蜃気楼　不知火」スキル「幻術 -影縫い-」
		// 2024/12/25 もなこさん検証データとの誤差無しを確認ずみ
		case SKILL_ID_GENJUTSU_KAGE_NUI:
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ倍率
			wbairitu = 23000;										// 基礎倍率
			wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// 特性ステータス補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);		// BaseLv補正
			// 悪夢の場合
			if (attackMethodConfArray[0].GetOptionValue(0) == 1) {
				wbairitu *= 1.5;
			}
			// 分割ヒット
			wActiveHitNum = 4;
			break;

		// 「蜃気楼　不知火」スキル「風魔手裏剣 -掌握-」
		// 2024/12/25 もなこさん検証データとの誤差無しを確認ずみ
		case SKILL_ID_FUMASHURIKEN_SHOUAKU:
			n_Enekyori = 1;			// 遠距離フラグ
			// 詠唱など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置
			g_bDefinedDamageIntervals = true;
			n_Delay[5] = 250;		// ダメージ間隔
			n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);		// オブジェクト存続時間
			// ダメージ倍率
			wbairitu = 50 * n_A_ActiveSkillLV;														// 基礎倍率
			wbairitu += 5 * n_A_ActiveSkillLV * attackMethodConfArray[0].GetOptionValue(0);			// 習得済みスキル条件
			wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_POW);									// 特性ステータス補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);										// BaseLv補正
			break;

		//「蜃気楼　不知火」スキル「風魔手裏剣 -構築-」
		// 2024/12/25 もなこさん検証データとの誤差無しを確認ずみ
		case SKILL_ID_FUMASHURIKEN_KOUCHIKU:
			n_Enekyori = 1;			// 遠距離フラグ
			// 詠唱など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基礎倍率
			if (battleCalcInfo.parentSkillId === undefined) {
				wbairitu = 3800 + 100 * n_A_ActiveSkillLV;											// 初撃 ダメージ倍率
			} else {
				wbairitu = 10500 + 200 * n_A_ActiveSkillLV;											// 追撃 ダメージ倍率
			}
			wbairitu += 48 * n_A_ActiveSkillLV * attackMethodConfArray[0].GetOptionValue(1);		// 習得済みスキル条件
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);									// 特性ステータス補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);										// BaseLv補正
			break;

		// 「ハイパーノービス」スキル「ダブルボウリングバッシュ」
		case SKILL_ID_DOUBLE_BOWLING_BASH:
			// 詠唱など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ヒット数
			option_count = attackMethodConfArray[0].GetOptionValue(0);								// 巻き込み数補正
			wHITsuu = [3,4,5][option_count];
			// 基本倍率
			wbairitu = 850;																			// 基礎倍率
			wbairitu += 3 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_DOKUGAKU_SENTOGAKU);		// 習得済みスキル条件
			wbairitu += 2 * GetTotalSpecStatus(MIG_PARAM_ID_POW);									// 特性ステータス補正
			wbairitu *= n_A_BaseLV / 100;															// BaseLv補正
			wbairitu = Math.floor(wbairitu);
			// 最終倍率
			wbairitu *= [100, 101, 103, 105, 107, 109, 111, 113, 115, 120, 125][UsedSkillSearch(SKILL_ID_DOKUGAKU_SENTOGAKU)] / 100;	// 独学補正
			wbairitu = Math.floor(wbairitu);
			wbairitu *= [100, 150][UsedSkillSearch(SKILL_ID_BREAKING_LIMIT_STATE)] / 100;												// ブレイキングリミット補正
			wbairitu = Math.floor(wbairitu);
			break;

		// 「ハイパーノービス」スキル「メガソニックブロー」
		case SKILL_ID_MEGA_SONIC_BLOW:
			// 詠唱など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 分割ヒット数
			wActiveHitNum = 8;
			// 基本倍率
			wbairitu = 1650 + (50 * n_A_ActiveSkillLV);												// 基礎倍率
			wbairitu += 5 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_DOKUGAKU_SENTOGAKU);		// 習得済みスキル条件
			wbairitu += 4 * GetTotalSpecStatus(MIG_PARAM_ID_POW);									// 特性ステータス補正
			wbairitu *= n_A_BaseLV / 100;															// BaseLv補正
			wbairitu = Math.floor(wbairitu);
			// 最終倍率
			wbairitu *= [100, 101, 103, 105, 107, 109, 111, 113, 115, 120, 125][UsedSkillSearch(SKILL_ID_DOKUGAKU_SENTOGAKU)] / 100;	// 独学補正
			wbairitu = Math.floor(wbairitu);
			wbairitu *= [100, 150][UsedSkillSearch(SKILL_ID_BREAKING_LIMIT_STATE)] / 100;												// ブレイキングリミット補正
			wbairitu = Math.floor(wbairitu);
			// 敵のHPが50%未満の場合ダメージ2倍
			option_count = attackMethodConfArray[0].GetOptionValue(0);								// 敵の残りHP
			wbairitu *= [100, 200][option_count] / 100;
			break;

		// 「マイスター」スキル「スパークブラスター」
		// 2025/01/18 ふみ。さん提供データに一致
		case SKILL_ID_SPARK_BLASTER:
			if (UsedSkillSearch(SKILL_ID_MADOGEAR) == 0) {
				n_Buki_Muri = 1
				wbairitu = 0;
				break;
			}
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 遠距離フラグ
			n_Enekyori = 1;
			// スキル倍率
			wbairitu = 3750 + 375 * n_A_ActiveSkillLV;							// 基礎倍率
			wbairitu += 25 * GetTotalSpecStatus(MIG_PARAM_ID_POW);				// 特性ステータス補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);					// BaseLv補正
			// 分割ヒット
			wActiveHitNum = 2;
			break;

		// 「マイスター」スキル「トリプルレーザー」
		case SKILL_ID_TRIPLE_LASER:
			if (UsedSkillSearch(SKILL_ID_MADOGEAR) == 0) {
				n_Buki_Muri = 1
				wbairitu = 0;
				break;
			}
			n_Enekyori = 1;	// 遠距離フラグ
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			wHITsuu = 3;
			wbairitu = 1100 + (200 * n_A_ActiveSkillLV);						// 基礎倍率
			wbairitu += 7 * GetTotalSpecStatus(MIG_PARAM_ID_POW);				// 特性ステータス補正
			wbairitu *= n_A_BaseLV / 100;										// BaseLv補正
			break;

		// 「バイオロ」スキル「エクスプロッシブパウダー」
		// 2024/11/16 実測誤差無しを確認
		case SKILL_ID_EXPLOSIVE_POWDER:
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			if (UsedSkillSearch(SKILL_ID_RESEARCH_REPORT) > 0) {
				// 基礎倍率
				wbairitu = 3700 + 1000 * n_A_ActiveSkillLV;
				// 特性ステータス補正
				wbairitu += 29 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			} else {
				// 基礎倍率
				wbairitu = 3150 + 750 * n_A_ActiveSkillLV;
				// 特性ステータス補正
				wbairitu += 23 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			}
			// BaseLv補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「バイオロ」スキル「メイヘミックソーンズ」
		// 2024/11/15 実測誤差なしを確認
		case SKILL_ID_MEYHEMIC_THORNS:
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 遠距離フラグ
			n_Enekyori = 1;
			if (UsedSkillSearch(SKILL_ID_RESEARCH_REPORT) > 0) {
				// 基礎倍率
				wbairitu = 2500 + 200 * n_A_ActiveSkillLV;
				// 特性ステータス補正
				wbairitu += 15 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			} else {
				// 基礎倍率
				wbairitu = 2000 + 100 * n_A_ActiveSkillLV;
				// 特性ステータス補正
				wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			}
			// BaseLv補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// 分割ヒット
			wActiveHitNum = 2;
			break;

		// 「ドラゴンナイト」スキル「ドラゴニックブレス」
		case SKILL_ID_DRAGONIC_BREATH:
			if (UsedSkillSearch(SKILL_ID_DRAGON_TRAINING) == 0) {
				n_Buki_Muri = 1
				wbairitu = 0;
				break;
			}
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 遠距離フラグ
			n_Enekyori = 1;	
			// スキル倍率
			if (UsedSkillSearch(SKILL_ID_DRAGONIC_AURA_STATE) > 1) {
				// Dオーラ状態
				wbairitu = 3500 + 400 * n_A_ActiveSkillLV;					// 基礎倍率
			} else {
				// 通常状態
				wbairitu = 2750 + 325 * n_A_ActiveSkillLV;					// 基礎倍率
			}
			wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_POW);		// 特性ステータス補正 (2025/01/12 未確認)
			wbairitu += charaData[CHARA_DATA_INDEX_MAXHP] / 500;		// MaxHP補正 (2025/01/12 未確認)
			wbairitu += charaData[CHARA_DATA_INDEX_MAXSP] / 20;			// MaxSP補正 (2025/01/12 未確認)
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);			// BaseLv補正
			break;

		// 「マイスター」スキル「マイティスマッシュ」
		// 2025/01/18 ふみ。さん提供データに一致
		case SKILL_ID_MIGHTY_SMASH:
			// 使用武器制限
			if (n_A_WeaponType != ITEM_KIND_AXE && n_A_WeaponType != ITEM_KIND_AXE_2HAND) {
				n_Buki_Muri = 1
				wbairitu = 0;
				break;
			}
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			if (UsedSkillSearch(SKILL_ID_AXE_STOMP_STATUS) > 0) {
				// アックスストンプ状態の場合
				wbairitu = 4700 + 400 * n_A_ActiveSkillLV;				// 基礎倍率
				wbairitu += 29 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// 特性ステータス補正
			} else {
				// 通常時
				wbairitu = 3400 + 350 * n_A_ActiveSkillLV;				// 基礎倍率
				wbairitu += 23 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// 特性ステータス補正
			}
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);			// BaseLv補正
			// 分割ヒット
			wActiveHitNum = 2;
			break;

		// 「ナイトウォッチ」スキル「ベーシックグレネード」
		// 2025/01/25 もなこさん検証データとの誤差無しを確認ずみ
		case SKILL_ID_BASIC_GRENADE:
			n_Enekyori = 1;	// 遠距離フラグ
			wActiveHitNum = 2;	// 見た目2hit
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ倍率
			wbairitu = 3000 + 600 * n_A_ActiveSkillLV;					// 基本
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_CON);		// 特性ステータス補正
			wbairitu += 50 * UsedSkillSearch(SKILL_ID_GRENADE_MASTERY) 	// グレネードマスタリー補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);			// BaseLv補正
			break;

		// 「ナイトウォッチ」スキル「ヘイスティファイアインザホール」
		// 2025/01/25 もなこさん検証データとの誤差無しを確認ずみ
		case SKILL_ID_HASTY_FIRE_IN_THE_HOLE:
			/*
				実際には
			    指定セルの周辺5x5セルに2hit → 0.3秒後さらに2hit → 0.3秒後さらに2hit
				なのでいまのダメージの表示方法は厳密ではないかもしれない
			 */
			n_Enekyori = 1;	// 遠距離フラグ
			wActiveHitNum = 2;	// 見た目2hit
			wHITsuu = 3; // 2 * 3 hit
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ倍率
			wbairitu = 3000 + 600 * n_A_ActiveSkillLV;					// 基本
			wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_CON);		// 特性ステータス補正
			wbairitu += 20 * UsedSkillSearch(SKILL_ID_GRENADE_MASTERY) 	// グレネードマスタリー補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);			// BaseLv補正
			break;

		// 「ナイトウォッチ」スキル「グレネーズドロッピング」
		// 2025/01/25 もなこさん検証データとの誤差無しを確認ずみ
		case SKILL_ID_GRENADES_DROPPING:
			/*
				ダメージセルがランダムに発生するので実際はこれよりも総ダメージが少なくなる
				検証によれば平均9～10hitで最大13hitとのこと（試行回数20回）
			 */
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 遠距離フラグ
			n_Enekyori = 1;	
			// 設置スキル
			g_bDefinedDamageIntervals = true;
			n_Delay[5] = 250;		// ダメージ間隔
			n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData); // オブジェクト存続時間
			// ダメージ倍率
			wbairitu = 1350 + 300 * n_A_ActiveSkillLV;					// 基本
			wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_CON);		// 特性ステータス補正
			wbairitu += 30 * UsedSkillSearch(SKILL_ID_GRENADE_MASTERY) 	// グレネードマスタリー補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);			// BaseLv補正
			break;

		// 「ナイトウォッチ」スキル「ミッションボンバード」
		// 2025/01/25 もなこさん検証データとの誤差無しを確認ずみ
		case SKILL_ID_MISSION_BOMBARD:
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 遠距離フラグ
			n_Enekyori = 1;
			if (attackMethodConfArray[0].GetOptionValue(1) === 0) {
			// 初撃
				// ダメージ倍率
				wbairitu = 2500 + 750 * n_A_ActiveSkillLV;						// 基本
				wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_CON);			// 特性ステータス補正
				wbairitu += 100 * UsedSkillSearch(SKILL_ID_GRENADE_MASTERY) 	// グレネードマスタリー補正

			} else {
			// 追撃
				// 設置スキル
				g_bDefinedDamageIntervals = true;
				n_Delay[5] = 250;									// ダメージ間隔
				n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);		// オブジェクト存続時間
				// ダメージ倍率
				wbairitu = 5000 + 1000 * n_A_ActiveSkillLV;					// 基本
				wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_CON);		// 特性ステータス補正
				wbairitu += 30 * UsedSkillSearch(SKILL_ID_GRENADE_MASTERY) 	// グレネードマスタリー補正
			}
			// BaseLv補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「ミンストレル＆ワンダラー」スキル「シビアレインストーム」
		case SKILL_ID_SEVERE_RAINSTORM:
		case SKILL_ID_SEVERE_RAINSTORM_EX:
			// 遠距離スキル
			n_Enekyori=1;
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル設定
			g_bDefinedDamageIntervals = true;
			n_Delay[5] = 300;								// ダメージ間隔
			n_Delay[6] = 2400 + 600 * n_A_ActiveSkillLV;	// オブジェクト存続時間
			// 属性
			n_A_Weapon_zokusei = g_skillManager.GetElement(battleCalcInfo.skillId);
			// ダメージ倍率
			if (n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM) {
				wbairitu = (n_A_DEX + n_A_AGI) * n_A_ActiveSkillLV / 5;
			}
			else {
				wbairitu = (attackMethodConfArray[0].GetOptionValue(0) + attackMethodConfArray[0].GetOptionValue(1)) * n_A_ActiveSkillLV / 5;
			}
			// 楽器、鞭使用時のダメージ補正
			if ((n_A_WeaponType == ITEM_KIND_MUSICAL) || (n_A_WeaponType == ITEM_KIND_WHIP)) {
				wbairitu *= 5 / 3;
			}
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「アルケミスト」スキル「デモンストレーション」
		case SKILL_ID_DEMONSTRATION:
			// 必中
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル設定
			g_bDefinedDamageIntervals = true;
			n_Delay[5] = 500;								// ダメージ間隔
			n_Delay[6] = 35000 + 5000 * n_A_ActiveSkillLV;	// オブジェクト存続時間
			n_Delay[3] = n_Delay[6]; 						// 足元置きができないので重複設置はできない
			// 属性
			n_A_Weapon_zokusei = g_skillManager.GetElement(battleCalcInfo.skillId);
			// ダメージ倍率
			wbairitu = 100 + 20 * n_A_ActiveSkillLV;
			break;

		// 「星帝」スキル「創星の書」
		case SKILL_ID_SOSENO_SHO:
			n_Enekyori=1;
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル設定
			g_bDefinedDamageIntervals = true;
			n_Delay[5] = 500;			// ダメージ間隔
			n_Delay[6] = 10000;			// オブジェクト存続時間
			n_Delay[3] = n_Delay[6]; 	// 重複設置はできない
			// 属性
			n_A_Weapon_zokusei = g_skillManager.GetElement(battleCalcInfo.skillId);
			// ダメージ倍率
			if (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA] == MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM) {
				wbairitu = 750 + 750 * n_A_ActiveSkillLV;
			} else {
				wbairitu = 500 + 500 * n_A_ActiveSkillLV;
			}
			break;

		// 「蜃気楼　不知火」スキル「影潜り」
		// 2024/12/25 もなこさん検証データとの誤差無しを確認ずみ
		case SKILL_ID_KAGEMOGURI:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 属性
			n_A_Weapon_zokusei = g_skillManager.GetElement(battleCalcInfo.skillId);
			// ダメージ倍率
			wbairitu = 2500 + 500 * n_A_ActiveSkillLV;											// 基本倍率
			wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_CON);								// 特性ステータス補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);									// BaseLv補正
			// 分割ヒット
			wActiveHitNum = 2;
			break;

		// 「蜃気楼　不知火」スキル「苦無 -歪曲-」
		// 2024/12/25 もなこさん検証データとの誤差無しを確認ずみ
		case SKILL_ID_KUNAI_WAIKYOKU:
			// 遠距離フラグ
			n_Enekyori = 1;
			// ダメージ倍率
			wbairitu = 3900 + 100 * n_A_ActiveSkillLV;											// 基本倍率
			wbairitu += 49 * n_A_ActiveSkillLV * attackMethodConfArray[0].GetOptionValue(1);	// 参照スキル習得Lv補正
			wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_POW);								// 特性ステータス補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);									// BaseLv補正
			if (battleCalcInfo.parentSkillId === undefined) {
			// 本体の攻撃
				wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 分割ヒット数
				wActiveHitNum = 2;
			} else {
			// 分身の追撃
				wbairitu = Math.floor(wbairitu * 30 / 100);									// 分身の威力は30%
				wbairitu *= attackMethodConfArray[0].GetOptionValue(0);						// 分身の数
				// 分割ヒット数
				wActiveHitNum = 3;
			}
			break;

		// 「蜃気楼　不知火」スキル「苦無 -回転-」
		// 2024/12/25 もなこさん検証データとの誤差無しを確認ずみ
		case SKILL_ID_KUNAI_KAITEN:
			// 遠距離フラグ
			n_Enekyori = 1;
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置型
			g_bDefinedDamageIntervals = true;
			n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);	// オブジェクト存続時間
			n_Delay[5] = 500;	// ダメージ間隔
			// 属性
			n_A_Weapon_zokusei = g_skillManager.GetElement(battleCalcInfo.skillId);
			// ダメージ倍率
			wbairitu = 1500 + 200 * n_A_ActiveSkillLV;											// 基本倍率
			wbairitu += 50 * n_A_ActiveSkillLV * attackMethodConfArray[0].GetOptionValue(0);	// 参照スキル習得Lv補正
			wbairitu += 4 * GetTotalSpecStatus(MIG_PARAM_ID_POW);								// 特性ステータス補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);									// BaseLv補正
			// 分割ヒット数
			wActiveHitNum = 3;
			break;

		// 「蜃気楼　不知火」スキル「苦無 -屈折-」
		// 2024/12/25 もなこさん検証データとの誤差無しを確認ずみ
		case SKILL_ID_KUNAI_KUSSETSU:
			// 遠距離フラグ
			n_Enekyori = 1;
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置型
			g_bDefinedDamageIntervals = true;
			n_Delay[5] = 250;	// ダメージ間隔
			n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);	// オブジェクト存続時間
			// 属性
			n_A_Weapon_zokusei = g_skillManager.GetElement(battleCalcInfo.skillId);
			// ダメージ倍率
			wbairitu = 500 + 50 * n_A_ActiveSkillLV;											// 基本倍率
			wbairitu += 20 * n_A_ActiveSkillLV * 5;												// 参照スキル習得Lv補正（前提スキル条件につき 5 で固定）
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);								// 特性ステータス補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);									// BaseLv補正
			break;

		// 「蜃気楼　不知火」スキル「幻術 -苦無-」
		// 2024/12/25 もなこさん検証データとの誤差無しを確認ずみ
		case SKILL_ID_GENJUTSU_KUNAI:
			// 遠距離フラグ
			n_Enekyori = 1;
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 属性
			n_A_Weapon_zokusei = g_skillManager.GetElement(battleCalcInfo.skillId);
			// ダメージ倍率
			wbairitu = 23000;
			// 特性ステータス補正
			wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
			// BaseLv補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// 悪夢の場合
			if (attackMethodConfArray[0].GetOptionValue(0) == 1) {
				wbairitu *= 1.5;
			}			
			// 分割ヒット数
			wActiveHitNum = 8;
			break;

		// 「ハイパーノービス」スキル「シールドチェーンラッシュ」
		case SKILL_ID_SHIELD_CHAIN_RUSH:
			// 遠距離フラグ
			n_Enekyori = 1;
			// 分割ヒット数
			wActiveHitNum = 5
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			wbairitu = 3050 + (175 * n_A_ActiveSkillLV);																				// 基礎倍率
			wbairitu += 3 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_DOKUGAKU_SENTOGAKU);											// 習得済みスキル条件
			wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_POW);																		// 特性ステータス補正
			wbairitu *= n_A_BaseLV / 100;																								// BaseLv補正
			wbairitu = Math.floor(wbairitu);
			// 最終倍率
			wbairitu *= [100, 101, 103, 105, 107, 109, 111, 113, 115, 120, 125][UsedSkillSearch(SKILL_ID_DOKUGAKU_SENTOGAKU)] / 100;	// 独学補正
			wbairitu = Math.floor(wbairitu);
			wbairitu *= [100, 150][UsedSkillSearch(SKILL_ID_BREAKING_LIMIT_STATE)] / 100;												// ブレイキングリミット補正
			wbairitu = Math.floor(wbairitu);
			break;

		// 「ハイパーノービス」スキル「スパイラルピアースマックス」
		case SKILL_ID_SPIRAL_PIERCE_MAX:
			// 遠距離フラグ
			n_Enekyori = 1;
			// 分割ヒット数
			wActiveHitNum = 5			
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			wbairitu = 4475 + (125 * n_A_ActiveSkillLV);											// 基礎倍率
			wbairitu += 3 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_DOKUGAKU_SENTOGAKU);		// 習得済みスキル条件
			switch (mobData[MONSTER_DATA_INDEX_SIZE]) {												// サイズ補正 (POWには掛からない)
				case SIZE_ID_LARGE:
					wbairitu *= 1.2;
					break;
				case SIZE_ID_MEDIUM:
					wbairitu *= 1.3;
					break;
				case SIZE_ID_SMALL:
					wbairitu *= 1.5;
					break;
			}
			wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_POW);																		// 特性ステータス補正
			wbairitu *= n_A_BaseLV / 100;																								// BaseLv補正
			wbairitu = Math.floor(wbairitu);
			// 最終倍率
			wbairitu *= [100, 101, 103, 105, 107, 109, 111, 113, 115, 120, 125][UsedSkillSearch(SKILL_ID_DOKUGAKU_SENTOGAKU)] / 100;	// 独学補正
			wbairitu = Math.floor(wbairitu);
			wbairitu *= [100, 150][UsedSkillSearch(SKILL_ID_BREAKING_LIMIT_STATE)] / 100;												// ブレイキングリミット補正
			wbairitu = Math.floor(wbairitu);
			break;
		
			// 「星帝」スキル「流星落下」
			/**
			 *  オートスペルですが何故かアクティブスキルとして登録されています
			 *  いずれアクティブスキル配列から削除したいと考えています
			 */
			case SKILL_ID_RYUSE_RAKKA:
			case SKILL_ID_RYUSE_RAKKA_TSUIGEKI:
				// 基礎倍率
				wbairitu = 100 + 100 * n_A_ActiveSkillLV;
				wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
				// 分割ヒット数
				if (n_A_ActiveSkill == SKILL_ID_RYUSE_RAKKA && battleCalcInfo.parentSkillId === undefined) {
					wActiveHitNum = 2;
				} else {
					wActiveHitNum = 3;
				}
				break;

			
/*
		case SKILL_ID_DUMMY:
			// 使用武器制限
			if (n_A_WeaponType != ITEM_KIND_SHOTGUN) {
				wbairitu = 0;
				break;
			}

			n_Enekyori = 1;	// 遠距離フラグ
			wHITsuu = 3;	// 多段ヒット数

			// CSkillManager.js で定義された詠唱時間などを取得する
			g_bUnknownCasts = true;	// 詠唱時間など未計測フラグ
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);

			// 設置型の場合
			g_bDefinedDamageIntervals = true;
			n_Delay[5] = 500;	// ダメージ間隔
			n_Delay[6] = 5000;	// オブジェクト存続時間

			// CAttackMethodAreaComponentManager.js で定義されたオプションを取得する
			option_count = attackMethodConfArray[0].GetOptionValue(0);
			wbairitu += option_count * (950 + (150 * n_A_ActiveSkillLV));

			// 習得済みスキル条件
			if (UsedSkillSearch(SKILL_ID_SANREI_ITTAI) > 0) {
				wbairitu = 650 + (150 * n_A_ActiveSkillLV);
			} else {
				wbairitu = 400 + (100 * n_A_ActiveSkillLV);
				bCri = false;										// クリティカルしない場合
			}
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// 特性ステータス補正

			// 種族特攻
			switch (parseInt(mobData[MONSTER_DATA_INDEX_RACE], 10)) {
				case RACE_ID_DEMON:
					wHITsuu = 3;
			}

			wbairitu *= n_A_BaseLV / 100;							// BaseLv補正
			break;
*/

/* --------------------------------------------------
↑ 物理攻撃スキル追加位置
-------------------------------------------------- */

		default:
			bDefaultFormula = false;
			break;

		}

		// 基本式でない場合は別の処理へ
		if (!bDefaultFormula) {
			break;
		}





		//----------------------------------------------------------------
		//
		// ダメージ計算（物理基本式）
		//
		//----------------------------------------------------------------

		//--------------------------------
		// スキルダメージ倍率の補正を計算
		//--------------------------------
		wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
		wbairitu = ATKbaiJYOUSAN(wbairitu);

		//--------------------------------
		// 参照するＡＴＫを特定
		//--------------------------------
		switch (n_A_ActiveSkill) {

		case SKILL_ID_WUG_BITE:
		case SKILL_ID_WUG_STRIKE:
		case SKILL_ID_WUG_DASH:
			dmgUnit = BK_n_A_DMG_Wolf;
			break;

		case SKILL_ID_TUZYO_KOGEKI_CALC_LEFT:
		default:
			// 変更なし（dmgUnitのまま）
			break;
		}

		//--------------------------------
		// ヒット数配列を用意
		//--------------------------------
		if (!hitCountArray) {
			hitCountArray = [wHITsuu, wHITsuu, wHITsuu];
		}
		g_wHITsuu_Array = hitCountArray.slice();


		//--------------------------------
		// ダメージ計算本体
		//--------------------------------

		// 通常ダメージ計算
		ret = BattleCalcSubDamagePhysicalCommon(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, n_A_ActiveSkill, dmgUnit, wbairitu, g_wHITsuu_Array, wActiveHitNum, bCri, bLeft);

		// 暫定互換性対応
		w_DMG = ret[0].slice();
		n_PerfectHIT_DMG = ret[1];



		//--------------------------------
		// オートスペルのダメージ計算処理中の場合は、処理打ち切り
		//--------------------------------

		if (n_AS_MODE == 1) {
			return w_DMG;
		}




/*
	★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	★
	★ TODO: 下記の命中率を加味する処理、表示上の変数にとどめておくべき？
	★		→AS_PLUS() の中で参照されていないか？
	★
	★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★

*/

/*
		//--------------------------------
		// 平均ダメージに命中率を適用する
		//--------------------------------
		w_DMG[1] = (w_DMG[1] * w_HIT + n_PerfectHIT_DMG * (100 - w_HIT)) / 100;

		// ↑おそらく、別の場所で処理可能



		//--------------------------------
		// オートスペルの発動を適用
		//--------------------------------
		AS_PLUS();


		// ↑の AS_PLUS() は、単純にオートスペルのダメージを足しているだけ。
		// 特殊な処理もなく、グローバル空間にダメージデータの変数を持っているので、別の場所で処理可能
*/



		// 処理終了
		return w_DMG;
	}





	//================================================================================================================================
	//
	//
	// 物理スキル　特殊計算式
	//
	//
	//================================================================================================================================
	while (true) {

		var bPhysicalFormula = true;

		switch (n_A_ActiveSkill) {

		case SKILL_ID_AIMED_BOLT:
			n_Enekyori=1;
			wCast = 4000;
			n_KoteiCast = 1000;
			n_Delay[2] = 1000;
			n_Delay[7] = 500;
			if(n_A_ActiveSkillLV > 5){
				wCast = 3500 - 400 * (n_A_ActiveSkillLV - 5);
				n_KoteiCast = 1000 - 150 * (n_A_ActiveSkillLV - 5);
				n_Delay[2] = 1000 - 100 * (n_A_ActiveSkillLV - 5);
				n_Delay[7] = 500 - 50 * (n_A_ActiveSkillLV - 5);
			}
			wbairitu = 500 + 50 * n_A_ActiveSkillLV;
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			var w = attackMethodConfArray[0].GetOptionValue(0);
			if(w == 2){
				if(mobData[17] == 0){
					wActiveHitNum = 2;
					wbairitu *= 2;
				}
				if(mobData[17] == 1){
					wActiveHitNum = 3;
					wbairitu *= 3;
				}
				if(mobData[17] == 2){
					wActiveHitNum = 4;
					wbairitu *= 4;
				}
			}
			if(w == 3){
				if(mobData[17] == 0){
					wActiveHitNum = 3;
					wbairitu *= 3;
				}
				if(mobData[17] == 1){
					wActiveHitNum = 4;
					wbairitu *= 4;
				}
				if(mobData[17] == 2){
					wActiveHitNum = 5;
					wbairitu *= 5;
				}
			}

			// 必中ダメージのみ仮計算（属性倍率未適用）
			n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);

			if(w != 1){
				wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
				wbairitu = ATKbaiJYOUSAN(wbairitu);
				for(var i=0;i<=2;i++){
					w_DMG[i] = n_A_DMG[i];
					w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					w_DMG[i] = Math.floor(w_DMG[i] * wbairitu / 100);
					w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
					w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
					w_DMG[i] += n_PerfectHIT_DMG;
					w_DMG[i] = ApplyHitJudgeElementRatio(n_A_ActiveSkill, w_DMG[i], mobData);
					w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					if(wActiveHitNum > 1) w_DMG[i] = Math.floor(w_DMG[i] / wActiveHitNum) * wActiveHitNum;
				}
				if(n_AS_MODE == 1) return w_DMG;
				for(var i=0;i<=2;i++){
					Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
					g_damageTextArray[i].push(Last_DMG_A[i]);
					if(wActiveHitNum > 1) g_damageTextArray[i].push("(", (w_DMG[i] / wActiveHitNum), "×", wActiveHitNum, "Hit)");
				}
			}
			else{
				var sizebai = [[2,2.5,3],[3,3.4,4],[4,4.3,5]];
				for(var i=0;i<=2;i++){
					w_DMG[i] = n_A_DMG[i];
					w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					w_DMG[i] = Math.floor(w_DMG[i] * (wbairitu * sizebai[mobData[17]][i] + GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray)) / 100);
					w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
					w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
					w_DMG[i] += n_PerfectHIT_DMG;
					w_DMG[i] = ApplyHitJudgeElementRatio(n_A_ActiveSkill, w_DMG[i], mobData);
					w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					w_DMG[i] = Math.floor(Math.floor(w_DMG[i] / sizebai[mobData[17]][i]) * sizebai[mobData[17]][i]);
				}
				if(n_AS_MODE == 1) return w_DMG;
				for(var i=0;i<=2;i++){
					Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
					g_damageTextArray[i].push(Last_DMG_A[i]);
					if(i != 1) g_damageTextArray[i].push("(", Math.floor(w_DMG[i] / sizebai[mobData[17]][i]), "×", sizebai[mobData[17]][i], "Hit)");
				}

			}

			// 改めて必中ダメージのみ計算（属性倍率適用）
			n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
			n_PerfectHIT_DMG = ApplyHitJudgeElementRatio(n_A_ActiveSkill, n_PerfectHIT_DMG, mobData);
			n_PerfectHIT_DMG = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, n_PerfectHIT_DMG);

			w_DMG[1] = (w_DMG[1] * w_HIT + n_PerfectHIT_DMG * (100-w_HIT))/100;
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);

			break;



		case SKILL_ID_MAGIC_CRUSHER:
			n_Enekyori=1;
			wCast = 300;
			n_Delay[2] = 300;
			for(var i=0;i<=2;i++){
				w_MATK[i] = BK_n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
			}

			// 必中ダメージのみ仮計算（属性倍率未適用）
			n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);

			for(var i=0;i<=2;i++){
				w_DMG[i] = n_A_DMG[i];
				w_DMG[i] += ROUNDDOWN(w_MATK[i] / 5);
				w_DMG[i] -= B_Total_DEF;
				if(w_DMG[i] <1) w_DMG[i] = 1;
				w_DMG[i] += n_A_WeaponLV_seirenATK;
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],n_A_Weapon_zokusei);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] += n_PerfectHIT_DMG;
				w_DMG[i] = ApplyHitJudgeElementRatio(n_A_ActiveSkill, w_DMG[i], mobData);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
			}
			for(var i=0;i<=2;i++){
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
			}

			// 改めて必中ダメージ計算
			n_PerfectHIT_DMG = n_A_WeaponLV_seirenATK;
			n_PerfectHIT_DMG = ApplyElementRatio(mobData, n_PerfectHIT_DMG,n_A_Weapon_zokusei);
			n_PerfectHIT_DMG += GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
			n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
			n_PerfectHIT_DMG = ApplyHitJudgeElementRatio(n_A_ActiveSkill, n_PerfectHIT_DMG, mobData);
			n_PerfectHIT_DMG = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, n_PerfectHIT_DMG);
			w_DMG[1] = (w_DMG[1] * w_HIT + n_PerfectHIT_DMG *(100-w_HIT))/100;
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);

			break;



		case SKILL_ID_DOUBLE_STRAFING:
		case SKILL_ID_PIERCE:
		case SKILL_ID_FREEZING_TRAP:
		case SKILL_ID_SHIDAN:
		case SKILL_ID_BOWLING_BASH:
		case SKILL_ID_TRIPLE_ACTION:
		case SKILL_ID_BEAST_STRAIFING:
		case SKILL_ID_DEATHPERAD:
		case SKILL_ID_HESPERUS_SLIT:
		case SKILL_ID_CRAZY_WEED:
		case SKILL_ID_QUICKDRAW_SHOT:
			if(n_A_ActiveSkill==SKILL_ID_DOUBLE_STRAFING){
				n_Enekyori=1;
				wbairitu += 10 * n_A_ActiveSkillLV - 10;
				wHITsuu = 2;
			}else if(n_A_ActiveSkill==SKILL_ID_PIERCE){
				wbairitu += 10 * n_A_ActiveSkillLV;
				wHITsuu = mobData[17]+1;
			}else if(n_A_ActiveSkill==SKILL_ID_BOWLING_BASH){
				wbairitu += 40 * n_A_ActiveSkillLV;
				wCast = 700;
				wHITsuu = 2;
				if(n_A_ActiveSkillLV == 1) wHITsuu = 1;
				wLAch=1;
				if(n_B_IJYOU[6] == 1){
					wHITsuu = 3;
					if(n_A_ActiveSkillLV == 1) wHITsuu = 2;
				}
			}else if(n_A_ActiveSkill==SKILL_ID_SHIDAN){
				wbairitu += (25 + 25 * n_A_ActiveSkillLV);
				if(GetHigherJobSeriesID(n_A_JOB)==15) {
					w = UsedSkillSearch(SKILL_ID_KIKO);
				}
				else {
					w = g_confDataNizi[CCharaConfNizi.CONF_ID_KIKO];
				}
				if(w > n_A_ActiveSkillLV){
					w = n_A_ActiveSkillLV;
				}
				wHITsuu = w;
				wCast = (1 + w) * 1000;
				n_Delay[2] = 500;
				n_Enekyori=1;
			}else if(n_A_ActiveSkill==SKILL_ID_TRIPLE_ACTION){
				n_Enekyori=1;
				n_Delay[2] = 1000;
				wbairitu += 50;
				wHITsuu = 3;
			}else if(n_A_ActiveSkill==SKILL_ID_BEAST_STRAIFING){
				n_Delay[0] = 1;
				n_Enekyori=1;
				wbairitu += n_A_STR * 8 - 50;
				wHITsuu = 2;
			}else if(n_A_ActiveSkill==SKILL_ID_DEATHPERAD){
				n_Enekyori=1;
				wbairitu += 50 * n_A_ActiveSkillLV - 50;
				n_Delay[2] = 1000;
				var DEATH = [1,1.2,1.6,2,2.4,3,3.6,4,5,6,7,8,9,10];
				wHITsuu = DEATH[attackMethodConfArray[0].GetOptionValue(0)];
			}else if(n_A_ActiveSkill==SKILL_ID_HESPERUS_SLIT){
				wCast = 2000;
				n_Delay[2] = 1000;
				n_Delay[7] = 2000;

				var w = 1 + UsedSkillSearch(SKILL_ID_COUNT_OF_RG_FOR_BANDING);
				if(
					UsedSkillSearch(SKILL_ID_INSPIRATION)
					|| TimeItemNumSearch(TIME_ITEM_ID_ZETSUBONO_KAMI_MOROCC_CARD)
					|| TimeItemNumSearch(TIME_ITEM_ID_DEMI_FREYA)
					|| TimeItemNumSearch(TIME_ITEM_ID_MAKENSHI_SAKRAY_CARD)
					){
					if(UsedSkillSearch(SKILL_ID_COUNT_OF_RG_FOR_BANDING) == 0) w = 3;
				}

				wbairitu = 120 * n_A_ActiveSkillLV + 200 * w;
				wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);

				// ヘスペルスリットは、なぜか「６人のとき“だけ”」威力が１．５倍されるらしい
				if (w == 6) {
					wbairitu = Math.floor(wbairitu * 150 / 100);
				}

				wHITsuu = w;

			}else if(n_A_ActiveSkill==SKILL_ID_CRAZY_WEED){
				n_A_Weapon_zokusei = 2;
				wCast = 500 + 500 * n_A_ActiveSkillLV;
				n_Delay[2] = 500 + 500 * Math.round(n_A_ActiveSkillLV / 2);
				n_Delay[7] = 5000;
				wbairitu = 500 + 100 * n_A_ActiveSkillLV;
				wHITsuu = attackMethodConfArray[0].GetOptionValue(0);
			}

			else if(n_A_ActiveSkill == SKILL_ID_QUICKDRAW_SHOT){
				n_Enekyori=1;
				wCast = 0;
				n_Delay[2] = 0;
				n_Delay[7] = 0;
				wHITsuu = ROUNDDOWN(n_A_JobLV / 20) + 1;
			}

			wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
			wbairitu = ATKbaiJYOUSAN(wbairitu);
			for(var i=0;i<=2;i++){
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, n_A_DMG[i]);
				w_DMG[i] = Math.floor(w_DMG[i] * wbairitu / 100);
				w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
				if(n_A_ActiveSkill==391 && mobData[19]!=2 && mobData[19]!=4) w_DMG[i] = 0;
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
			}
			if(n_AS_MODE == 1 && attackMethodConfArray[1].GetSkillId() != 391){

				// TODO: ダメージ表示方式変更対応
				// for(var i=0;i<=2;i++) w_DMG[i] *= wHITsuu;

				return w_DMG;
			}
			for(var i=0;i<=2;i++){
				Last_DMG_B[i] = w_DMG[i];
				if(n_A_ActiveSkill==76) Last_DMG_B[i] = w_DMG[i] * 2;

				// TODO: ダメージ表示方式変更対応
				// Last_DMG_A[i] = w_DMG[i] * wHITsuu;

				if(n_B_IJYOU[6] == 0 || wLAch==0) g_damageTextArray[i].push(Math.floor(w_DMG[i] * wHITsuu), "(", w_DMG[i], SubName[8], wHITsuu, "hit)");
				else{
					g_damageTextArray[i].push((w_DMG[i] * 3), "(", (w_DMG[i] * 2), "＋", w_DMG[i], ")");
					Last_DMG_B[i] = w_DMG[i] * 3;
				}

				// TODO: ダメージ表示方式変更対応
				// w_DMG[i] *= wHITsuu;
			}
			if(n_AS_MODE == 1) return w_DMG;
			var wX = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
			wX = ApplyHitJudgeElementRatio(n_A_ActiveSkill, wX, mobData);
			wX = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, wX);

			// TODO: ダメージ表示方式変更対応
			// w_DMG[1] = (w_DMG[1] * w_HIT + wX * wHITsuu *(100-w_HIT))/100;
			w_DMG[1] = (w_DMG[1] * w_HIT + wX * (100-w_HIT))/100;

			if(wHITsuu == 0 && n_A_ActiveSkill==192){
				if(GetHigherJobSeriesID(n_A_JOB) == 15) g_damageTextArray[0] = ["<Font color=Red><B>指弾の計算をするには<BR>気功を1以上にして下さい</B></Font>"];
				else g_damageTextArray[0] = ["<Font color=Red><B>指弾の計算をするには<BR>気功(天下大将軍C)を<BR>1以上にして下さい</B></Font>"];
			}

			if (wHITsuu < 3 && n_A_ActiveSkill == SKILL_ID_HESPERUS_SLIT) {
				g_damageTextArray[0] = ["<Font color=Red><B>パッシブ持続系の欄で<BR>RGの人数を3人以上にするか、インスピレーション状態に設定してください</B></Font>"];
			}

			AS_PLUS();

			// TODO: ダメージ表示方式変更対応
			// n_PerfectHIT_DMG = wX * wHITsuu;

			str_PerfectHIT_DMG = __DIG3(wX * wHITsuu) +"("+ __DIG3(wX) +"×"+ wHITsuu +"hit)";
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);

			break;



		case SKILL_ID_ISHINAGE:
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			n_PerfectHIT_DMG = 50;
			n_A_Weapon_zokusei = 0;
			n_Enekyori=1;
			var ISI = 50;
			ISI = ApplyElementRatio(mobData, ISI,0);
			ISI = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, ISI);
			for(var i=0;i<=2;i++){
				Last_DMG_A[i] = Last_DMG_B[i] = ISI;
				g_damageTextArray[i].push(Last_DMG_A[i]);
				w_DMG[i] = ISI;
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);

			break;



		case SKILL_ID_BLITZ_BEAT:
		case SKILL_ID_FALCON_ASSALT:
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			n_PerfectHIT_DMG = 0;
			n_A_Weapon_zokusei = 0;
			n_Enekyori=1;
			var wBT = 80 + Math.floor(n_A_DEX /10)*2 + Math.floor(n_A_INT/2)*2 + UsedSkillSearch(SKILL_ID_STEEL_CROW) *6;
			if(n_A_ActiveSkill==SKILL_ID_FALCON_ASSALT){
				wBT = Math.floor(wBT * (150 + 70 * n_A_ActiveSkillLV) /100);
				wBT = ApplyElementRatio(mobData, wBT,0);
				wBT = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, wBT);
				wBT *= 5;
				wCast = 1000;
				n_Delay[2] = 3000;
			}else{
				wBT = ApplyElementRatio(mobData, wBT,0);
				wBT = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, wBT);
				wBT *= n_A_ActiveSkillLV;
				wCast = 1500;
				n_Delay[2] = 1000;
			}
			if(n_AS_MODE == 1){
				w_DMG[0] = w_DMG[1] = w_DMG[2] = wBT;
				return w_DMG;
			}
			for(var i=0;i<=2;i++){
				Last_DMG_A[i] = Last_DMG_B[i] = wBT;
				g_damageTextArray[i].push(Last_DMG_A[i]);
				if(n_A_ActiveSkill==118){
					Last_DMG_B[i] = wBT / n_A_ActiveSkillLV;
					g_damageTextArray[i].push("(", Last_DMG_B[i], "×", n_A_ActiveSkillLV, "Hit)");
				}
				w_DMG[i] = wBT;
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);

			break;



		case SKILL_ID_ENVENOM:
		case SKILL_ID_POISON_REACT:
		/* TODO */
		// 本来の分岐条件は以下の通り。ポイズンリアクトの計算式でずれる可能性大
		// else if(n_A_ActiveSkill==17 || (n_A_ActiveSkill==86 && (mobData[18] <50 || 60 <= mobData[18]))){

			wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
			wbairitu = ATKbaiJYOUSAN(wbairitu);
			n_A_Weapon_zokusei = 5;
			n_PerfectHIT_DMG = 0;
			var AS_ATK = 0;
			if(n_AS_MODE == 1){
				AS_ATK = n_A_ActiveSkillLV * 15;
				AS_ATK = ApplyPhysicalSpecializeMonster(charaData, specData, mobData, AS_ATK);
				AS_ATK = ApplyElementRatio(mobData, AS_ATK,n_A_Weapon_zokusei);
			}
			for(var i=0;i<=2;i++){
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, n_A_DMG[i] + AS_ATK);
				w_DMG[i] = Math.floor(w_DMG[i] * wbairitu / 100);
				w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
			}
			if(n_AS_MODE == 1) return w_DMG;
			for(var i=0;i<=2;i++){
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
			}
			w_DMG[1] = (w_DMG[1] * w_HIT + ApplyHitJudgeElementRatio(n_A_ActiveSkill, GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray), mobData) *(100-w_HIT))/100;
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_SHIELD_BOOMERANG:
		case SKILL_ID_SHIELD_BOOMERANG_TAMASHI:
			n_PerfectHIT_DMG = 0;
			n_Enekyori=1;
			n_A_Weapon_zokusei = 0;
			n_Delay[2] = 700;
			if(n_A_ActiveSkill==SKILL_ID_SHIELD_BOOMERANG_TAMASHI) n_Delay[2] = 350;
			var wSBr = n_A_SHIELD_DEF_PLUS *4;
			var wbairitu2 = (100 + 30 * n_A_ActiveSkillLV);
			if(n_A_ActiveSkill==SKILL_ID_SHIELD_BOOMERANG_TAMASHI) wbairitu2 *= 2;
			for(var i=0;i<=2;i++){
				w_DMG[i] = charaData[CHARA_DATA_INDEX_STATUS_ATK] + ItemObjNew[n_A_Equip[EQUIP_REGION_ID_SHIELD]][ITEM_DATA_INDEX_WEIGHT] + wSBr;
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] -= B_Total_DEF;
				w_DMG[i] = ROUNDDOWN(w_DMG[i] * wbairitu2 / 100);
				if(w_DMG[i] <0) w_DMG[i] = 0;
				if(n_B_KYOUKA[10]){
					if(n_B_KYOUKA[10] == 6) w_DMG[i] = Math.floor(w_DMG[i] *12.5 / 100);
					else w_DMG[i] -= Math.floor(w_DMG[i] * (5 + 15 * n_B_KYOUKA[10]) / 100);
				}
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
			}
			w_DMG[1] = (w_DMG[1] * w_HIT)/100;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;


		// 「パラディン」スキル「シールドチェーン」
		case SKILL_ID_SHIELD_CHAIN:
			/**
			 *  2024/01/23 時点のゲーム内結果と全くダメージが合わない (YE鯖にて)
			 *  式の中で減算Defが効きすぎている模様
			 *  シールドシューティングの検証以前の話なので実装先送り
			 */
			n_PerfectHIT_DMG = 0;
			n_Enekyori=1;
			n_A_Weapon_zokusei = 0;
			wCast = 1000;
			n_Delay[2] = 1000;
			var w_Weight = ItemObjNew[n_A_Equip[EQUIP_REGION_ID_SHIELD]][ITEM_DATA_INDEX_WEIGHT];
			// 通常スキル倍率
			var SdCBAI = [0,130,160,190,220,250];
			/*
			実測確認出来るまでコメントアウト

			if (UsedSkillSearch(SKILL_ID_SHIELD_SHOOTING_STATE) > 0) {
				SdCBAI = [0,360,420,480,540,600];
			}
			 */
			for(var i=0;i<=2;i++){
				w_DMG[i] = n_A_DMG[i] + w_Weight + n_A_SHIELD_DEF_PLUS * 4;
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ROUNDDOWN(w_DMG[i] * SdCBAI[n_A_ActiveSkillLV] / 100);
				w_DMG[i] -= B_Total_DEF;
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				if(n_B_KYOUKA[10]){
					if(n_B_KYOUKA[10] == 6) w_DMG[i] = Math.floor(w_DMG[i] *12.5 / 100);
					else w_DMG[i] -= Math.floor(w_DMG[i] * (5 + 15 * n_B_KYOUKA[10]) / 100);
				}
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
				if(w_DMG[i] <0) w_DMG[i] = 0;
			}
			for(var i=0;i<=2;i++){
				Last_DMG_B[i] = w_DMG[i];
				Last_DMG_A[i] = Last_DMG_B[i] * 5;
				g_damageTextArray[i].push(Last_DMG_A[i], "(", Last_DMG_B[i], SubName[8], "5hit)");
				w_DMG[i] = Last_DMG_A[i];
			}
			w_DMG[1] = w_DMG[1] * w_HIT /100;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_SPIRAL_PIERCE:
			n_Enekyori=1;
			if(n_A_ActiveSkillLV == 5) wCast = 1000;
			else wCast = (100 + 200 * n_A_ActiveSkillLV);
			n_Delay[2] = 1000 + 200 * n_A_ActiveSkillLV;
			wbairitu = 100 + 50 * n_A_ActiveSkillLV + GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
			wbairitu = ATKbaiJYOUSAN(wbairitu);
			var wSYUUREN = TYPE_SYUUREN(mobData, attackMethodConfArray, false);
			for(var i=0;i<=2;i++){
				var wSPP;
				wSPP = ROUNDDOWN((n_A_DMG[i] - wSYUUREN) * 70 / 100) + ROUNDDOWN(ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS]][ITEM_DATA_INDEX_WEIGHT] * 70 / 100);
				if(mobData[17] == 0) wSPP = ROUNDDOWN(wSPP * 115 / 100);
				if(mobData[17] == 2) wSPP = ROUNDDOWN(wSPP * 85 / 100);
				wSPP += wSYUUREN;
				wSPP = Math.floor(wSPP * wbairitu / 100);
				wSPP = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, wSPP);
				wSPP = ApplyMonsterDefence(mobData, wSPP,0);
				w_DMG[i] = wSPP;
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
			}
			for(var i=0;i<=2;i++){
				Last_DMG_B[i] = w_DMG[i];
				Last_DMG_A[i] = Last_DMG_B[i] * 5;
				if(n_AS_MODE == 0) {
					g_damageTextArray[i].push(Last_DMG_A[i], "(", Last_DMG_B[i], SubName[8], "5hit)");
				}
				w_DMG[i] = Last_DMG_A[i];
			}
			w_DMG[1] = w_DMG[1] * w_HIT /100 + n_PerfectHIT_DMG * (100- w_HIT)/100;
			if(n_AS_MODE == 1) return w_DMG;

			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_VENOM_SPLASHER:
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			n_Delay[0] = 1;
			n_Delay[7] = 7000 + 500 * n_A_ActiveSkillLV;
			wCast = 1000;
			var VSbai = 500 + 75 * n_A_ActiveSkillLV;
			VSbai = ATKbaiJYOUSAN(VSbai);
			for(var i=0;i<=2;i++){
				w_DMG[i] = ROUNDDOWN((n_A_DMG[i]) * VSbai / 100);
				w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				if(w_DMG[i] <0) w_DMG[i] = 0;
				if(mobData[20] == 1) w_DMG[i] = 0;
			}
			if(n_AS_MODE == 1) return w_DMG;
			for(var i=0;i<=2;i++){
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
			}
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_SOUL_BREAKER:
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			n_Enekyori=1;
			wCast = 500;
			n_Delay[2] = 800 + 200 * n_A_ActiveSkillLV;
			var wbai = (300 + 50 * n_A_ActiveSkillLV);
			if(UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON)) wbai = ROUNDDOWN(wbai / 2);
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				var BK_X = n_A_Weapon_zokusei;
				n_A_Weapon_zokusei = 0;
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				n_A_Weapon_zokusei = BK_X;
				w_MATK[i] = BaiTaisei_C(mobData, w_MATK[i]);
			}
			for(var i=0;i<=2;i++){
				w_DMG[i] = ROUNDDOWN(n_A_DMG[i] * wbai / 100);
				w_DMG[i] += ROUNDDOWN(w_MATK[i] * wbai / 100);
				w_DMG[i] -= (mobData[13] + mobData[14] + n_B_MDEF2 + n_B_DEF2[0]);
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				if(w_DMG[i] <0) w_DMG[i] = 0;
			}
			if(n_AS_MODE == 1) return w_DMG;
			for(var i=0;i<=2;i++){
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
			}
			if(5 <= mobData[21] && mobData[21] <= 9){
				for(var i=0;i<=2;i++){
					Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i] = 1;
					g_damageTextArray[i].push(Last_DMG_A[i]);
				}
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_GRAND_CROSS:
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			n_PerfectHIT_DMG = 0;
			myInnerHtml("CRIATKname",'<Font color="#FF0000">発動コスト</Font>',0);
			myInnerHtml("CRIATK",'<Font color="#FF0000">'+ __DIG3(Math.floor(charaData[CHARA_DATA_INDEX_MAXHP] /5)) +"</Font>",0);
			myInnerHtml("CRInumname",'<Font color="#FF0000">反動ダメージ</Font>',0);
			n_Enekyori=2;
			n_A_Weapon_zokusei = 6;
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = BaiTaisei_A_SP(w_MATK[i]);
				w_MATK[i] -= Math.floor(w_MATK[i] * n_tok[57] / 100);
			}
			for(var i=0;i<=2;i++){
				w_DMG[i] = n_A_DMG_GX[i] + w_MATK[i];
				w_DMG[i] = ROUNDDOWN(w_DMG[i] / 2);
				w_DMG[i] = ROUNDDOWN(w_DMG[i] * (100 + 40 * n_A_ActiveSkillLV) / 100);
				w_DMG[i] -= (charaData[CHARA_DATA_INDEX_DEF_DIV] + charaData[CHARA_DATA_INDEX_DEF_MINUS] + charaData[CHARA_DATA_INDEX_MDEF_DIV] + charaData[CHARA_DATA_INDEX_MDEF_MINUS]);
				w_DMG[i] += ROUNDDOWN(w_DMG[i] * zokusei[n_A_BodyZokusei * 10 +1][6] / 100);
				w_DMG[i] = Math.floor(w_DMG[i] / 2);
				n_A_GX_HANDO = 1;
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				n_A_GX_HANDO = 0;
				var wGXbai3 = 0;
				if(EquipNumSearch(2495)) wGXbai3 += n_A_BaseLV;
				w_DMG[i] = ROUNDDOWN(w_DMG[i] * (100+GetEquippedTotalSPEquip(5000+n_A_ActiveSkill)+GetEquippedTotalSPCardAndElse(5000+n_A_ActiveSkill) + wGXbai3) / 100);
			}
			if(n_AS_MODE == 0) myInnerHtml("CRInum",'<Font color="#FF0000">'+ __DIG3(w_DMG[0]) +"×3hit～"+ __DIG3(w_DMG[2]) +"×3hit</Font>",0);
			wCast = 3000;
			n_Delay[2] = 1500;
			wLAch=1;
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
			}
			if(n_B_KYOUKA[7]){
				for(var i=0;i<=2;i++) n_A_DMG[i] += Math.floor(n_A_DMG[i] * (20 * n_B_KYOUKA[7]) / 100);
				w_MATK[i] += Math.floor(w_MATK[i] * (20 * n_B_KYOUKA[7]) / 100);
			}
			for(var i=0;i<=2;i++){
				w_DMG[i] = n_A_DMG[i] + w_MATK[i] ;
				w_DMG[i] = ROUNDDOWN(w_DMG[i] / 2);
				w_DMG[i] = ROUNDDOWN(w_DMG[i] * (100 + 40 * n_A_ActiveSkillLV) / 100);
				w_DMG[i] -= (mobData[13] + n_B_DEF2[i] + mobData[14] + n_B_MDEF2);
				n_Enekyori = 1;
				w_DMG[i] = BaiTaisei_E(mobData, w_DMG[i]);
				n_Enekyori = 2;
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],6);
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],6);
				if(w_DMG[i] <1)w_DMG[i]=1;
				if(60<=mobData[18] && mobData[18]<=69)w_DMG[i]=0;
			}
			if(n_AS_MODE == 1){
				for(var i=0;i<=2;i++) w_DMG[i] = w_DMG[i] * 3;
				return w_DMG;
			}
			if(n_B_IJYOU[6] == 0){
				for(var b=0;b<=2;b++){
					Last_DMG_A[b] = Last_DMG_B[b] = w_DMG[b] * 3;
					g_damageTextArray[b].push(Last_DMG_A[b], "(", w_DMG[b], SubName[8], "3hit)");
					w_DMG[b] = Last_DMG_A[b];
				}
			}else{
				for(var b=0;b<=2;b++){
					Last_DMG_A[b] = Last_DMG_B[b] = w_DMG[b] * 4;
					g_damageTextArray[b].push(Last_DMG_A[b], "(", (w_DMG[b] * 2), "＋", w_DMG[b], SubName[8], "2hit)");
					w_DMG[b] = Last_DMG_A[b];
				}
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_CART_REVOLUTION:
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			var CRbai = attackMethodConfArray[0].GetOptionValue(0) / (8000 + 500 * UsedSkillSearch(SKILL_ID_CART_KAIZO)) * 100;

			for(var i=0;i<=2;i++){
				w_DMG[i] = ROUNDDOWN(n_A_DMG[i] * 150 / 100);
				w_DMG[i] += ROUNDDOWN(n_A_DMG[i] * CRbai / 100);
				w_DMG[i] -= B_Total_DEF;
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
				if(w_DMG[i] <0) w_DMG[i] = 0;
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
			}
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_PRESSURE:
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			n_PerfectHIT_DMG = 0;
			w_DMG[2] = 500 + 300 * n_A_ActiveSkillLV;
			if(5 <= mobData[21] && mobData[21] <= 9) w_DMG[2] = 1;
			w_DMG[0] = w_DMG[1] = w_DMG[2];
			if(n_AS_MODE == 1) return w_DMG;
			for(var i=0;i<=2;i++){
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
			}
			wCast = 1500 + 500 * n_A_ActiveSkillLV;
			n_Delay[2] = 1500 + n_A_ActiveSkillLV * 500;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_SACRIFICE:
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			n_PerfectHIT_DMG = 0;
			n_A_Weapon_zokusei = 0;
			w_DMG[2] = Math.floor(charaData[CHARA_DATA_INDEX_MAXHP] * 0.09 * (0.9 + 0.1 * n_A_ActiveSkillLV));
			w_DMG[2] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[2]);
			w_DMG[2] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[2]);
			w_DMG[2] = ApplyElementRatio(mobData, w_DMG[2],0);
			w_DMG[0] = w_DMG[1] = w_DMG[2];
			for(var i=0;i<=2;i++){
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_HAKKEI:
			n_PerfectHIT_DMG = 0;
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			wbairitu += 75 * n_A_ActiveSkillLV;
			var AS_ATK = 0;
			if(n_AS_MODE == 1){
				AS_ATK = Math.floor(mobData[13] / 2);
				AS_ATK = ApplyPhysicalSpecializeMonster(charaData, specData, mobData, AS_ATK);
				AS_ATK = ApplyElementRatio(mobData, AS_ATK,n_A_Weapon_zokusei);
			}
			for(var i=0;i<=2;i++){
				w_DMG[i] = n_A_DMG[i] + AS_ATK;
				w_DMG[i] = Math.floor(w_DMG[i] * wbairitu / 100);
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
			}
			if(n_AS_MODE == 1) return w_DMG;
			for(var i=0;i<=2;i++){
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
			}
			AS_PLUS();
			wCast = 1000;
			n_Delay[2] = 500;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_ASHURA_HAOKEN:
		case SKILL_ID_ASHURA_HAOKEN_SPKOTEI:
			n_PerfectHIT_DMG = 0;
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			n_A_Weapon_zokusei = 0;

			if(n_A_ActiveSkill==SKILL_ID_ASHURA_HAOKEN) {
				wbairitu += 700 + 10 * (attackMethodConfArray[0].GetOptionValue(0) -1);
			}
			else {
				wbairitu += 700 + 10 * (charaData[CHARA_DATA_INDEX_MAXSP]-1);
			}

			var wASYU = 0;

			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				wASYU = 200000 * n_A_ActiveSkillLV;
				break;

			default:
				wASYU = 250 + 150 * n_A_ActiveSkillLV;
				break;

			}

			for(var i=0;i<=2;i++){
				w_DMG[i] = Math.floor(n_A_DMG[i] * wbairitu / 100) + wASYU;
				w_DMG[i] -= B_Total_DEF;
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
			}
			if(n_AS_MODE == 1) return w_DMG;
			for(var i=0;i<=2;i++){
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
			}
			AS_PLUS();
			wCast = 4500 - 500 * n_A_ActiveSkillLV;
			n_Delay[2] = 3500 - 500 * n_A_ActiveSkillLV;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_SHURIKEN_NAGE:
			n_Enekyori=1;
			not_use_card = 1;
			n_PerfectHIT_DMG = 0;
			wbairitu = 100 + 5 * n_A_ActiveSkillLV;
			for(var i=0;i<=2;i++){
				w_DMG[i] = n_A_DMG[i] + SyurikenOBJ[attackMethodConfArray[0].GetOptionValue(0)][0] + 3 * UsedSkillSearch(SKILL_ID_TOKAKU_SHUREN) + 4 * n_A_ActiveSkillLV;
				w_DMG[i] = ROUNDDOWN(w_DMG[i] * wbairitu / 100);
				w_DMG[i] -= B_Total_DEF;
				if(w_DMG[i] <0) w_DMG[i] = 0;
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_KUNAI_NAGE:
		case SKILL_ID_HAPPO_KUNAI:
			n_PerfectHIT_DMG = 0;
			if (n_A_ActiveSkill == SKILL_ID_HAPPO_KUNAI) {
				w_HIT_HYOUJI = 100;
				w_HIT = 100;
			}
			n_Enekyori=1;
			wbairitu = 100 * n_A_ActiveSkillLV;
			if(n_A_ActiveSkill==SKILL_ID_HAPPO_KUNAI){
				wbairitu = 300 + 60 * n_A_ActiveSkillLV;
			}
			var wKUNAI = KunaiOBJ[attackMethodConfArray[0].GetOptionValue(0)][0];

			for(var i=0;i<=2;i++){
				w_DMG[i] = n_A_DMG[i] + wKUNAI;
				w_DMG[i] = Math.floor(w_DMG[i] * wbairitu / 100);
				w_DMG[i] -= B_Total_DEF;
				if(w_DMG[i] <0) w_DMG[i] = 0;
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i], KunaiOBJ[attackMethodConfArray[0].GetOptionValue(0)][1]);
				if(n_A_ActiveSkill==395){
					Last_DMG_B[i] = ROUNDDOWN(w_DMG[i] / 3);
					Last_DMG_A[i] = Last_DMG_B[i] * 3;
					g_damageTextArray[i].push(Last_DMG_A[i], "(", Last_DMG_B[i], SubName[8], "3hit)");
				}else{
					Last_DMG_B[i] = w_DMG[i];
					Last_DMG_A[i] = Last_DMG_B[i];
					g_damageTextArray[i].push(Last_DMG_A[i]);
				}
				w_DMG[i] = Last_DMG_A[i];
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_BAKURETSU_KUNAI:
			n_PerfectHIT_DMG = 0;
			w_HIT_HYOUJI = 100;
			w_HIT = 100;
			n_Enekyori=1;
			n_Delay[2] = 1000;
			n_Delay[7] = 1000;
			wCast = 800 * n_A_ActiveSkillLV - 800;
			n_KoteiCast = 800;
			wbairitu = n_A_ActiveSkillLV * (50 + Math.floor(n_A_DEX / 4)) * UsedSkillSearch(SKILL_ID_TOKAKU_SHUREN) * 0.4 * n_A_BaseLV / 100 + 10 * n_A_JobLV;
			var wKUNAI = 0;
			for(var i=0;i<=2;i++){
				w_DMG[i] = n_A_DMG[i] + wKUNAI;
				w_DMG[i] = Math.floor(w_DMG[i] * wbairitu / 100);
				w_DMG[i] -= B_Total_DEF;
				if(w_DMG[i] <0) w_DMG[i] = 0;
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
				Last_DMG_B[i] = w_DMG[i];
				Last_DMG_A[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
				w_DMG[i] = Last_DMG_A[i];
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_FUMASHURIKEN_NAGE:
			wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
			wbairitu += (-50 + 250 * n_A_ActiveSkillLV);
			wbairitu = ATKbaiJYOUSAN(wbairitu);
			n_Enekyori=1;
			wCast = 3500 - 500 * n_A_ActiveSkillLV;
			n_Delay[2] = 1000;
			wActiveHitNum = 2 + Math.round(n_A_ActiveSkillLV / 2);
			for(var i=0;i<=2;i++){
				w_DMG[i] = Math.floor(n_A_DMG[i] * wbairitu / 100);
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				if(wActiveHitNum > 1) w_DMG[i] = Math.floor(w_DMG[i] / wActiveHitNum) * wActiveHitNum;
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
				g_damageTextArray[i].push("(", (Last_DMG_A[i] / wActiveHitNum), "×", wActiveHitNum, "Hit)");
			}
			n_PerfectHIT_DMG = ApplyElementRatio(mobData, ApplyHitJudgeElementRatio(n_A_ActiveSkill, GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray), mobData), 0);
			w_DMG[1] = (w_DMG[1] * w_HIT + n_PerfectHIT_DMG * (100-w_HIT))/100;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_ZENI_NAGE:
			w_HIT_HYOUJI = 100;
			w_HIT = 100;
			n_Enekyori=1;
			n_Delay[2] = 5000;
			for(var i=0;i<=2;i++){
				var dm = [500,750,1000];
				w_DMG[i] = Math.floor(dm[i] * n_A_ActiveSkillLV);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_MUCHANAGE:
			w_HIT = Math.floor((10 - (1 / (n_A_DEX + n_A_LUK)) * 500) * (n_A_ActiveSkillLV / 2 + 5));
			if(w_HIT > 100) w_HIT = 100;
			if(w_HIT <0) w_HIT = 0;
			w_HIT_HYOUJI = w_HIT;
			n_Enekyori=1;
			wCast = 1000;
			n_Delay[7] = 10000;
			for(var i=0;i<=2;i++){
				var dm = [5000,7500,10000];
				w_DMG[i] = Math.floor(dm[i] * n_A_ActiveSkillLV);
				var wBunsan = attackMethodConfArray[0].GetOptionValue(0);
				if(wBunsan >= 2) w_DMG[i] = ROUNDDOWN(w_DMG[i] / wBunsan);
				if(mobData[20]==1) w_DMG[i] = w_DMG[i] / 2;
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
				w_DMG[i] = Math.floor(w_DMG[i] / 10);
				Last_DMG_B[i] = w_DMG[i];
				Last_DMG_A[i] = w_DMG[i] * 10;
				g_damageTextArray[i].push(Last_DMG_A[i], "(", Last_DMG_B[i], SubName[8], "10hit)");
				w_DMG[i] = Last_DMG_A[i];
			}
			w_DMG[1] = (w_DMG[1] * w_HIT)/100;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_ISSEN:
		case SKILL_ID_ISSEN_MAX:
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			n_PerfectHIT_DMG = 0;
			n_A_Weapon_zokusei = 0;
			n_Enekyori=1;
			var w_1senHP;
			if(n_A_ActiveSkill==SKILL_ID_ISSEN) {
				w_1senHP = attackMethodConfArray[0].GetOptionValue(0);
				if (w_1senHP == 0) {
					w_1senHP = charaData[CHARA_DATA_INDEX_MAXHP];
				}
			}
			else {
				w_1senHP = charaData[CHARA_DATA_INDEX_MAXHP];
			}
			wActiveHitNum = 0;
			var wKageBai = 100;
			if(attackMethodConfArray[0].GetOptionValue(1)){
				wKageBai = 120 + 20 * attackMethodConfArray[0].GetOptionValue(1);
				wActiveHitNum = 2 + attackMethodConfArray[0].GetOptionValue(1);
			}
			for(var i=0;i<=2;i++){
				w_DMG[i] = n_A_DMG[i] * n_A_ActiveSkillLV + w_1senHP;
				w_DMG[i] = Math.floor(w_DMG[i] * wKageBai / 100);
				w_DMG[i] = w_DMG[i] - B_Total_DEF;
				if(w_DMG[i] <0) w_DMG[i] = 0;
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
				if(mobData[20] == 1) w_DMG[i] = Math.floor(w_DMG[i] / 2);
				if(wActiveHitNum > 1) w_DMG[i] = Math.floor(w_DMG[i] / wActiveHitNum) * wActiveHitNum;
			}
			for(var i=0;i<=2;i++){
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
				if(wActiveHitNum > 1) g_damageTextArray[i].push("(", (Last_DMG_A[i] / wActiveHitNum), "×", wActiveHitNum, "Hit)");
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_ACID_TERROR:
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			wCast = 1000;
			n_Enekyori=1;
			n_A_Weapon_zokusei = 0;
			wbairitu = 100 + 100 * n_A_ActiveSkillLV;
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
			}
			for(var i=0;i<=2;i++){
				w_DMG[i] = n_A_DMG[i] + w_MATK[i];
				w_DMG[i] = ROUNDDOWN(w_DMG[i] * wbairitu / 100);
				w_DMG[i] -= (B_Total_DEF + B_Total_MDEF);
				if(w_DMG[i] <0) w_DMG[i] = 0;
				if(mobData[20]==1) w_DMG[i] = Math.floor(w_DMG[i] / 2);
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
			}
			if(5 <= mobData[21] && mobData[21] <= 9){
				for(var i=0;i<=2;i++){
					Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i] = 1;
					g_damageTextArray[i].push(Last_DMG_A[i]);
				}
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;


		case SKILL_ID_ACID_DEMONSTRATION:
		case SKILL_ID_FIRE_EXPANSION:
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			wCast = 400 * n_A_ActiveSkillLV;
			n_Delay[2] = 1000;
			n_PerfectHIT_DMG = 0;
			n_Enekyori=1;
			n_A_Weapon_zokusei = 0;
			wHITsuu = n_A_ActiveSkillLV;

			if(n_A_ActiveSkill==SKILL_ID_FIRE_EXPANSION){
				wCast = 2000;
				n_Delay[0] = 1;
				n_Delay[2] = 500;
				wHITsuu = attackMethodConfArray[0].GetOptionValue(0);
				if(wHITsuu <5) wHITsuu = 5;
			}
			var w1 = [0,0,0];
			for(var i=0;i<=2;i++){
				w1[i] = n_A_DMG[i];
				if(n_B_KYOUKA[10]){
					if(n_B_KYOUKA[10] == 6) w1[i] = Math.floor(w1[i] *12.5 / 100);
					else w1[i] -= Math.floor(w1[i] * (5 + 15 * n_B_KYOUKA[10]) / 100);
				}
			}
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
			}
			for(var i=0;i<=2;i++){
				// TODO: ダメージ表示方式変更対応
				// 後続でヒット数で割る処理があるので、問題なし？
				if(mobData[6] <= 120){
					w_DMG[i] = ROUNDDOWN((w1[i] + w_MATK[i]) * 1400 * wHITsuu / 100 * mobData[6] / 100);
				}else{
					w_DMG[i] = ROUNDDOWN((w1[i] + w_MATK[i]) * 1400 * wHITsuu / 100 * 120 / 100);
					if(mobData[0] == 679) w_DMG[i] = ROUNDDOWN((w1[i] + w_MATK[i]) * 1400 * wHITsuu / 100 * 125 / 100);
					if(mobData[0] == 715) w_DMG[i] = ROUNDDOWN((w1[i] + w_MATK[i]) * 1400 * wHITsuu / 100 * 127 / 100);
				}
				w_DMG[i] -= (B_Total_DEF + B_Total_MDEF);
				w_DMG[i] = Math.floor(w_DMG[i] / 2);
				w_DMG[i] = ROUNDDOWN(w_DMG[i] / wHITsuu);
				if(mobData[0] == 787) w_DMG[i] = Math.floor(w_DMG[i] / 2);
				if(w_DMG[i] <0) w_DMG[i] = 0;
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
			}
			// ダメージ表示方式変更対応に伴い、w_DMG[] には、1HIT分のダメージが入った状態で処理を抜けるように変更
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_LAND_MINE:
		case SKILL_ID_BLAST_MINE:
		case SKILL_ID_CLAYMORE_TRAP:
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			n_PerfectHIT_DMG = 0;
			n_Delay[0] = 1;
			n_Enekyori=0;
			if(n_A_ActiveSkill==SKILL_ID_LAND_MINE){
				n_A_Weapon_zokusei = 2;
			}
			else if(n_A_ActiveSkill==SKILL_ID_BLAST_MINE){
				n_A_Weapon_zokusei = 4;
			}
			else if(n_A_ActiveSkill==SKILL_ID_CLAYMORE_TRAP){
				n_A_Weapon_zokusei = 3;
			}
			w_DMG[1] = n_A_DEX * (3 + n_A_BaseLV / 100) * (1 + n_A_INT / 35) * n_A_ActiveSkillLV + 40 * UsedSkillSearch(SKILL_ID_TRAP_KENKYU);
			w_DMG[1] = ApplyElementRatio(mobData, w_DMG[1],n_A_Weapon_zokusei);
			w_DMG[0] = Math.floor(w_DMG[1] * 90 / 100);
			w_DMG[2] = Math.floor(w_DMG[1] * 110 / 100);
			for(var i=0;i<=2;i++){
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_HEAL:
		case 489:
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			n_PerfectHIT_DMG = 0;
			n_A_Weapon_zokusei = 6;
			n_Delay[2] = 1000;
			n_Enekyori=2;
			if(n_A_ActiveSkill==489){
				wCast = 400 * n_A_ActiveSkillLV;
				n_Delay[7] = 1000;
				if(CardNumSearch(611)) n_Delay[7] -= 1000;
			}
			for(var i=0;i<=2;i++){
				if(n_A_ActiveSkill==25) w_DMG[i] = HealCalc(n_A_ActiveSkillLV,0,i,2,0);
				else w_DMG[i] = HealCalc(n_A_ActiveSkillLV,1,i,2,0);
				w_DMG[i] = ApplyElementRatio(mobData, Math.floor(w_DMG[i] / 2),6);
				if(mobData[18] <90){
					w_DMG[i]=0;
				}
				w_DMG[i] = ApplyLexAeterna(mobData, w_DMG[i]);
				w_DMG[i] = ApplyAttackDamageAmplify(mobData, w_DMG[i]);
			}
			if(n_AS_MODE == 1) return w_DMG;
			for(var i=0;i<=2;i++){
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case 94:
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			n_PerfectHIT_DMG = 0;
			n_A_Weapon_zokusei = 6;
			wCast = 5000;
			n_Delay[0] = 1;
			n_Enekyori=2;
			if(n_A_ActiveSkillLV <= 6) w_DMG[2] = 100 * n_A_ActiveSkillLV;
			else w_DMG[2] = 777;
			w_HEAL_BAI = 100 + n_tok[91];
			w_HEAL_BAI -= 2 * UsedSkillSearch(SKILL_ID_MEDITATIO);
			w_DMG[2] = Math.floor(w_DMG[2] * w_HEAL_BAI / 100);
			w_DMG[2] = ApplyElementRatio(mobData, Math.floor(w_DMG[2] / 2),6);
			if(mobData[18] <90 && mobData[19] != 6) w_DMG[2]=0;
			if(n_B_KYOUKA[7]) w_DMG[2] += Math.floor(w_DMG[2] * (20 * n_B_KYOUKA[7]) / 100);
			w_DMG[2] = ApplyLexAeterna(mobData, w_DMG[2]);
			w_DMG[2] = ApplyAttackDamageAmplify(mobData, w_DMG[2]);
			w_DMG[0] = w_DMG[1] = w_DMG[2];
			for(var i=0;i<=2;i++){
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_TURN_UNDEAD:
		case SKILL_ID_RESURRECTION:
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			if(n_AS_MODE == 1){
				for(var i=0;i<=2;i++) w_DMG[i] = 0;
				return w_DMG;
			}
			n_PerfectHIT_DMG = 0;
			if(n_A_ActiveSkill==SKILL_ID_TURN_UNDEAD){
				n_A_Weapon_zokusei = 6;
				wCast = 1000;
			}else{
				n_A_Weapon_zokusei = 0;
				wCast = 8000 - n_A_ActiveSkillLV * 2000;
			}
			n_Enekyori=2;
			if(mobData[18] <90){
				w = 0;
				w_DMG[2] = 0;
				w_DMG[0] = 0;
				w_DMG[1] = 0;
			}else{
				if(mobData[20] != 1){
					w = (20 * n_A_ActiveSkillLV + n_A_BaseLV + n_A_INT +n_A_LUK)/1000;
					w_DMG[2] = mobData[3];
				}
				else{
					w = 0;
					w_DMG[2] = 0;
				}
				w_DMG[0] = n_A_BaseLV + n_A_INT + n_A_ActiveSkillLV *10;
				w_DMG[0] = ApplyElementRatio(mobData, w_DMG[0],n_A_Weapon_zokusei);
				w_DMG[1] = Math.round((mobData[3] * w + w_DMG[0] * (100-w)/100));
			}
			for(var i=0;i<=2;i++) Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
			g_damageTextArray[0].push(w_DMG[0], "(失敗ダメージ)");
			g_damageTextArray[1].push(w_DMG[1], "(一発期待値)");
			g_damageTextArray[2].push(ApplyElementRatio(mobData, w_DMG[2], n_A_Weapon_zokusei), "(成功確率", Math.floor(w * 10000) / 100, "％)");
			n_Delay[2] = 3000;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case 488:
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			n_PerfectHIT_DMG = 0;
			n_A_Weapon_zokusei = 6;
			wCast = 3000;
			n_KoteiCast = 2000;
			n_Delay[7] = 1000;
			n_Delay[0] = 1;
			wHITsuu = 18;
			w_DMG[2] = n_A_BaseLV * 10 + n_A_INT;
			w_DMG[2] = ApplyElementRatio(mobData, w_DMG[2],6);
			if(mobData[18] <= 89 || 100 <= mobData[18]) w_DMG[2]=0;

			// TODO: ダメージ表示方式変更対応
			// w_DMG[2] = w_DMG[2] * wHITsuu;

			w_DMG[0] = w_DMG[1] = w_DMG[2];
			for(var i=0;i<=2;i++){
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i], "(", (w_DMG[i] / wHITsuu), "×", wHITsuu, "hit)");
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_GRAVITATION_FIELD:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル設定
			g_bDefinedDamageIntervals = true;
			n_Delay[5] = 500;								// ダメージ間隔
			n_Delay[6] = 4000 + (n_A_ActiveSkillLV * 1000);	// オブジェクト存続時間
			// 固定ダメージ設定
			w_HIT = 100;									// 命中率 100%
			w_DMG[2] = 500 + 100 * n_A_ActiveSkillLV;		// 固定ダメージ計算式
			// 固定ダメージ増加
			var damup = 0;
			damup += GetEquippedTotalSPEquip(ITEM_SP_SKILL_DAMAGE_OFFSET + SKILL_ID_GRAVITATION_FIELD);
			damup += GetEquippedTotalSPCardAndElse(ITEM_SP_SKILL_DAMAGE_OFFSET + SKILL_ID_GRAVITATION_FIELD);
			w_DMG[2] = w_DMG[2] * (100 + damup) / 100;
			w_DMG[2] = Math.floor(w_DMG[2]);
			// 草・エンペリウム相手は 1 ダメージ
			if (5 <= mobData[21] && mobData[21] <= 9) w_DMG[2] = 1;
			// ダメージ配列作成
			for (var i=0; i < 3; i++) {
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i] = w_DMG[2];
			}
			break;


		case 423:
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			n_PerfectHIT_DMG = 0;
			n_Enekyori=1;
			n_Delay[2] = 500;
			n_A_Weapon_zokusei = 8;
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
			}
			for(var i=0;i<=2;i++){
				w_DMG[i] = n_A_DMG[i] + w_MATK[i];
				w_DMG[i] = w_DMG[i] - B_Total_DEF;
				if(w_DMG[i] <0) w_DMG[i] = 0;
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],8);
			}
			for(var i=0;i<=2;i++){
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		// 「ルーンナイト」スキル「ファイアードラゴンブレス」
		// 「ルーンナイト」スキル「ウォータードラゴンブレス」
		case SKILL_ID_FIRE_DRAGON_BREATH:
		case SKILL_ID_WATER_DRAGON_BREATH:
			// 「ドラゴントレーニング」Lv0の前に騎乗の有無が包含されているためインデックスをずらしている
			dragon_training_lv = UsedSkillSearch(SKILL_ID_DRAGON_TRAINING) - 1;
			if (dragon_training_lv == -1) {
				// 未騎乗の場合
				n_Buki_Muri = 1;
				break;
			}
			// 遠距離スキル
			n_Enekyori = 1;
			// 必中スキル
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 属性補正
			n_A_Weapon_zokusei = g_skillManager.GetElement(battleCalcInfo.skillId);
			// --------- ダメージ計算開始 ---------
			n_PerfectHIT_DMG = 0;
			// 現HPとMaxSPから基本ダメージを算出
			var w_HP = attackMethodConfArray[0].GetOptionValue(0);
			if(w_HP == 0) {
				w_HP = charaData[CHARA_DATA_INDEX_MAXHP];
			}
			var w = w_HP / 50 + charaData[CHARA_DATA_INDEX_MAXSP] / 4;
			// スキルLv補正
			w *= n_A_ActiveSkillLV;
			// ドラゴントレーニング補正
			w *= [100,100,105,110,115,120][dragon_training_lv] / 100;
			// Lv補正
			w *= n_A_BaseLV / 100;
			// ドラゴニックオーラ補正
			if ((dragonic_aura_lv = UsedSkillSearch(SKILL_ID_DRAGONIC_AURA_STATE)) > 0) {
				if (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA] == MOB_CONF_PLAYER_ID_SENTO_AREA_YE) {
					// YE鯖だと指数1.0298で誤差1に収まる
					w *= 1 + Math.pow(GetTotalSpecStatus(MIG_PARAM_ID_POW) + GetPAtk(), 1.0298) / 100 * 250 / 300;
				}
				else{
					// 通常鯖だと指数1.05555で誤差2桁以内に収まる
					w *= 1 + Math.pow(GetTotalSpecStatus(MIG_PARAM_ID_POW) + GetPAtk(), 1.05555) / 100 * 250 / 300;
				}
			}
			// --------- 減衰計算開始 ---------
			w = ApplyResistElement(mobData, w);
			var wX = GetSpiderWebDamageRatio();
			if(wX != 0) w = ROUNDDOWN(w * (100 + wX) / 100);
			w -= B_Total_DEF;
			if(w <0) w = 0;
			w = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w);
			w = ApplyElementRatio(mobData, w,n_A_Weapon_zokusei);
			w = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w);
			w_DMG[0] = w_DMG[1] = w_DMG[2] = Math.floor(w);
			for(var i=0;i<=2;i++){
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;


		case SKILL_ID_DEATH_BOUND:
			if(n_DEATH_BOUND[3] == 0){
				w_DMG[0] = 1;
				w_DMG[1] = 1;
				w_DMG[2] = 1;
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}else{
				n_Delay[0] = 1;

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					n_Delay[7] = 2500 + 500 * n_A_ActiveSkillLV;
					break;

				default:
					n_Delay[7] = 3000;
					break;

				}

				w_DMG[0] = n_DEATH_BOUND[0];
				w_DMG[1] = n_DEATH_BOUND[1];
				w_DMG[2] = n_DEATH_BOUND[2];
				for(var i=0;i<=2;i++){
					Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
					g_damageTextArray[i].push(Last_DMG_A[i]);
				}
				w_HIT = 100;
				w_HIT_HYOUJI = 100;
				if(mobData[20] == 1) g_damageTextArray[0].push("<BR><Font color=Red><B>(BOSS属性には無効)</B></Font>");
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}
			break;

		case SKILL_ID_HELL_INFERNO:
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			wLAch = 1;
			n_PerfectHIT_DMG = 0;
			n_Enekyori=2;
			n_MagicCalcType=0;
			wbairitu = 100;
			n_bunkatuHIT = 0;
			var wBai = new Array();
			wBai[0] = 60 * n_A_ActiveSkillLV;
			wBai[0] = Math.floor(wBai[0] * n_A_BaseLV / 100);
			wBai[1] = 240 * n_A_ActiveSkillLV;
			wBai[1] = Math.floor(wBai[1] * n_A_BaseLV / 100);
			wBai[0] += GetBattlerMatkPercentUp();
			wBai[1] += GetBattlerMatkPercentUp();
			wCast = 1000 + 200 * n_A_ActiveSkillLV;
			var wHell_DMG1 = [0,0,0];
			var wHell_DMG2 = [0,0,0];
			n_A_Weapon_zokusei = 3;
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
			}
			wHell_DMG1[0] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[0] * wBai[0] / 100);
			wHell_DMG1[1] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[1] * wBai[0] / 100);
			wHell_DMG1[2] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[2] * wBai[0] / 100);
			n_A_Weapon_zokusei = 7;
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
			}
			wHell_DMG2[0] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[0] * wBai[1] / 100);
			wHell_DMG2[1] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[1] * wBai[1] / 100);
			wHell_DMG2[2] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[2] * wBai[1] / 100);
			for(var i=0;i<=2;i++){
				if(wHell_DMG1[i] <0) wHell_DMG1[i] = 0;
				if(wHell_DMG2[i] <0) wHell_DMG2[i] = 0;
			}
			if(n_AS_MODE == 1){
				for(var i=0;i<=2;i++) w_DMG[i] = wHell_DMG1[i] + wHell_DMG2[i];
				return w_DMG;
			}
			for(var i=0;i<=2;i++){
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i] = wHell_DMG1[i] + wHell_DMG2[i];
				if(n_B_IJYOU[6] == 0) g_damageTextArray[i].push(w_DMG[i], " (", wHell_DMG1[i], "+", wHell_DMG2[i], ")");
				else{
					var w = wHell_DMG1[i] * 2;
					var w2 = w + wHell_DMG2[i];
					g_damageTextArray[i].push(w2, " (", w, "+", wHell_DMG2[i], ")");
					Last_DMG_B[i] = w2;
				}
			}
			n_PerfectHIT_DMG = 0;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_CHAIN_LIGHTNING:
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			n_Enekyori=2;
			n_A_Weapon_zokusei = 4;
			if(n_AS_MODE == 0) wHITsuu = attackMethodConfArray[0].GetOptionValue(0);
			else wHITsuu = 4;
			wCast = 500 + 1000 * n_A_ActiveSkillLV;
			n_KoteiCast = 500;
			n_Delay[7] = 1000;
			var wC_DMG = new Array();
			for(var i=0;i<=5;i++) wC_DMG[i] = [0,0,0];
			var wBK_MATK = [0,0,0];
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
				wBK_MATK[i] = BK_n_A_MATK[i];
				wBK_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, wBK_MATK[i]);
				wBK_MATK[i] = ApplyResistElement(mobData, wBK_MATK[i]);
				wBK_MATK[i] = ApplyRegistPVPNormal(mobData, wBK_MATK[i]);
			}
			var T_check = -1;
			for(var i=0;i<=(wHITsuu-1);i++){
				wbairitu = 100 * n_A_ActiveSkillLV + 500;
				wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
				wbairitu += (300 + 100 * n_A_ActiveSkillLV - i * 100);
				wbairitu += GetBattlerMatkPercentUp();

				var ampHit = 1;
				if(n_AS_MODE == 0) ampHit = attackMethodConfArray[0].GetOptionValue(1);

				if(i <= ampHit){
					wC_DMG[i][0] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[0] * wbairitu / 100);
					wC_DMG[i][1] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[1] * wbairitu / 100);
					wC_DMG[i][2] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[2] * wbairitu / 100);
				}else{
					wC_DMG[i][0] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, wBK_MATK[0] * wbairitu / 100);
					wC_DMG[i][1] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, wBK_MATK[1] * wbairitu / 100);
					wC_DMG[i][2] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, wBK_MATK[2] * wbairitu / 100);
				}
				if(i==0){
					if(n_B_IJYOU[4] || n_B_IJYOU[9]){
						T_check = mobData[18];
						mobData[18] = MonsterObjNew[eval(document.calcForm.B_Enemy.value)][18];
						if(n_B_KYOUKA[6]) T_check = n_B_KYOUKA[6];
						if(n_B_IJYOU[23]) T_check = n_B_IJYOU[23] * 10 + (T_check % 10);
					}
				}
			}
			if(T_check != -1) mobData[18] = T_check;
			if(n_AS_MODE == 1){

				for(var i=0;i<=2;i++) {
					w_DMG[i] = wC_DMG[0][i] + wC_DMG[1][i] + wC_DMG[2][i] + wC_DMG[3][i] + wC_DMG[4][i] + wC_DMG[5][i];

					// TODO: ダメージ表示方式変更対応
					w_DMG[i] = Math.floor(w_DMG[i] / wHITsuu);
				}

				return w_DMG;
			}
			for(var i=0;i<=2;i++){
				if(n_B_IJYOU[6] == 0){

					Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i] = wC_DMG[0][i] + wC_DMG[1][i] + wC_DMG[2][i] + wC_DMG[3][i] + wC_DMG[4][i] + wC_DMG[5][i];

					// TODO: ダメージ表示方式変更対応
					Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i] = Math.floor(w_DMG[i] / wHITsuu);

					g_damageTextArray[i].push(w_DMG[i], " (");
					for(var j=0;j<=(wHITsuu-1);j++){
						g_damageTextArray[i].push(wC_DMG[j][i]);
						if(j <5 && wC_DMG[j+1][i] != 0) g_damageTextArray[i].push(" + ");
					}
					g_damageTextArray[i].push(")");
				}else{

					Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i] = (wC_DMG[0][i] * 2) + wC_DMG[1][i] + wC_DMG[2][i] + wC_DMG[3][i] + wC_DMG[4][i] + wC_DMG[5][i];

					// TODO: ダメージ表示方式変更対応
					Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i] = Math.floor(w_DMG[i] / wHITsuu);

					g_damageTextArray[i].push(w_DMG[i], " (");
					for(var j=0;j<=(wHITsuu-1);j++){
						if(j==0) g_damageTextArray[i].push(wC_DMG[j][i] * 2);
						else g_damageTextArray[i].push(wC_DMG[j][i]);
						if(j <5 && wC_DMG[j+1][i] != 0) g_damageTextArray[i].push(" + ");
					}
					g_damageTextArray[i].push(")");
				}
			}
			n_PerfectHIT_DMG = 0;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_TETRA_BOLTEX:
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			n_Enekyori=2;
			wCast = Math.min(9000, 4000 + 1000 * n_A_ActiveSkillLV);
			n_KoteiCast = Math.max(1000, 6000 - 1000 * n_A_ActiveSkillLV);
			n_Delay[7] = 1000;
			wbairitu = 500 + 500 * n_A_ActiveSkillLV;
			wbairitu += GetBattlerMatkPercentUp();
			var wT_DMG1 = [0,0,0];
			var wT_DMG2 = [0,0,0];
			var wT_DMG3 = [0,0,0];
			var wT_DMG4 = [0,0,0];
			n_A_Weapon_zokusei = Math.floor(attackMethodConfArray[0].GetOptionValue(0) / 10);
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
				wT_DMG1[i] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[i] * wbairitu / 100);
			}
			n_A_Weapon_zokusei = Math.floor(attackMethodConfArray[0].GetOptionValue(0) % 10);
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
				wT_DMG2[i] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[i] * wbairitu / 100);
			}
			n_A_Weapon_zokusei = Math.floor(attackMethodConfArray[0].GetOptionValue(1) / 10);
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
				wT_DMG3[i] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[i] * wbairitu / 100);
			}
			n_A_Weapon_zokusei = Math.floor(attackMethodConfArray[0].GetOptionValue(1) % 10);
			var T_check = -1;
			if(n_B_IJYOU[4] || n_B_IJYOU[9]){
				T_check = mobData[3];
				mobData[18] = MonsterObjNew[eval(document.calcForm.B_Enemy.value)][18];
				if(n_B_KYOUKA[6]) T_check = n_B_KYOUKA[6];
				if(n_B_IJYOU[23]) T_check = n_B_IJYOU[23] * 10 + (T_check % 10);
			}
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
				wT_DMG4[i] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[i] * wbairitu / 100);
			}
			if(T_check != -1) mobData[18] = T_check;
			for(var i=0;i<=2;i++){
				if(wT_DMG1[i] <0) wT_DMG1[i] = 0;
				if(wT_DMG2[i] <0) wT_DMG2[i] = 0;
				if(wT_DMG3[i] <0) wT_DMG3[i] = 0;
				if(wT_DMG4[i] <0) wT_DMG4[i] = 0;
			}
			if(n_AS_MODE == 1){
				for(var i=0;i<=2;i++) w_DMG[i] = wT_DMG1[i] + wT_DMG2[i] + wT_DMG3[i] + wT_DMG4[i];
				return w_DMG;
			}
			for(var i=0;i<=2;i++){
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i] = wT_DMG1[i] + wT_DMG2[i] + wT_DMG3[i] + wT_DMG4[i];
				if(n_B_IJYOU[6] == 0) g_damageTextArray[i].push(w_DMG[i], " (", wT_DMG1[i], "+", wT_DMG2[i], "+", wT_DMG3[i], "+", wT_DMG4[i], ")");
				else{
					var w = wT_DMG1[i] * 2;
					var w2 = w + wT_DMG2[i] + wT_DMG3[i] + wT_DMG4[i];
					g_damageTextArray[i].push(w2, " (", w, "+", wT_DMG2[i], "+", wT_DMG3[i], "+", wT_DMG4[i], ")");
					Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i] = w2;
				}
			}
			n_PerfectHIT_DMG = 0;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		// 「メカニック」スキル「アームズキャノン」
		case SKILL_ID_ARMS_CANNON:
			n_PerfectHIT_DMG = 0;
			w_HIT_HYOUJI = 100;
			w_HIT = 100;
			var wMADO = 0;
			n_Enekyori=1;
			wCast = Math.min(2000, 500 + 500 * n_A_ActiveSkillLV);
			n_Delay[2] = Math.max(500, 2000 - 500 * n_A_ActiveSkillLV);
			switch (mobData[17]) {
				case SIZE_ID_SMALL:
					wbairitu = 300 + 400 * n_A_ActiveSkillLV;
					break;
				case SIZE_ID_MEDIUM:
					wbairitu = 300 + 350 * n_A_ActiveSkillLV;
					break;
				case SIZE_ID_LARGE:
					wbairitu = 300 + 300 * n_A_ActiveSkillLV;
					break;
			}
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 120);
			wMADO += 2 * UsedSkillSearch(SKILL_ID_BUKI_KENKYU);
			if(n_A_WeaponType == 6 || n_A_WeaponType == 7) wMADO += 5 * UsedSkillSearch(SKILL_ID_ONO_SHUREN_MECHANIC);
			if(n_A_WeaponType == 8) wMADO += 4 * UsedSkillSearch(SKILL_ID_ONO_SHUREN_MECHANIC);
			if((20 <= mobData[18] && mobData[18] <= 29) || (30 <= mobData[18] && mobData[18] <= 39)) wMADO += 10 * UsedSkillSearch(SKILL_ID_HITO_DAICHINO_KENKYU);
			if(UsedSkillSearch(SKILL_ID_MADOGEAR)) wMADO += 20 * UsedSkillSearch(SKILL_ID_MADOGEAR_LICENSE);
			if(UsedSkillSearch(SKILL_ID_ABR_DUAL_CANNON)) wHITsuu = 2;
			wMADO += ApplyElementRatio(mobData, CanonOBJ[attackMethodConfArray[0].GetOptionValue(0)][0],CanonOBJ[attackMethodConfArray[0].GetOptionValue(0)][1]);
			for(var i=0;i<=2;i++){
				w_DMG[i] = n_A_DMG[i] + wMADO;
				w_DMG[i] = Math.floor(w_DMG[i] * wbairitu / 100);
				w_DMG[i] -= B_Total_DEF;
				if(w_DMG[i] <0) w_DMG[i] = 0;
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		// 「ジェネティック」スキル「カートキャノン」
		// 2024/11/16 YEサーバー誤差無しを確認済み
		case SKILL_ID_CART_CANNON:
			n_PerfectHIT_DMG = 0;
			// 必中処理
			w_HIT_HYOUJI = 100;
			w_HIT = 100;
			// 遠距離
			n_Enekyori = 1;
			// 詠唱など
			wCast = 500 + 500 * n_A_ActiveSkillLV;
			n_Delay[2] = 500;
			// ウドゥンウォリアー補正
			if (attackMethodConfArray[0].GetOptionValue(1) == 1) {
				wHITsuu = 2;
			}
			// 基本倍率
			wbairitu = 60 * n_A_ActiveSkillLV;
			// カート改造補正
			wbairitu += Math.floor(UsedSkillSearch(SKILL_ID_CART_KAIZO) * 50 * n_A_INT / 40);
			// 倍率補正
			var wMADO = 0;
			// 斧修練
			if ([ITEM_KIND_SWORD, ITEM_KIND_AXE, ITEM_KIND_AXE_2HAND].includes(n_A_WeaponType)) {
				wMADO += 3 * UsedSkillSearch(SKILL_ID_ONO_SHUREN);
			}
			// 剣修練
			if ([ITEM_KIND_KNIFE, ITEM_KIND_SWORD].includes(n_A_WeaponType)) {
				wMADO += 10 * UsedSkillSearch(SKILL_ID_KEN_SHUREN_GENETIC);
			}
			// 改造カートブースト補正
			wMADO += 10 * UsedSkillSearch(SKILL_ID_CART_BOOST_GENETIC);
			// 属性キャノンボール補正
			wMADO += ApplyElementRatio(mobData, CanonOBJ[attackMethodConfArray[0].GetOptionValue(0)][0],CanonOBJ[attackMethodConfArray[0].GetOptionValue(0)][1]);
			// ダメージ算出
			for(var i=0;i<=2;i++){
				w_DMG[i] = n_A_DMG[i] + wMADO;
				w_DMG[i] = Math.floor(w_DMG[i] * wbairitu / 100);
				w_DMG[i] -= B_Total_DEF;
				if(w_DMG[i] <0) w_DMG[i] = 0;
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
			}
			// ダメージ表示（不要な可能性あり）
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;

		case SKILL_ID_SELF_DESTRUCTION:
		case SKILL_ID_SELF_DESTRUCTION_MAX:
			w_HIT = 100;
			w_HIT_HYOUJI = 100;

			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
				wCast = 10000;
				n_KoteiCast = 10000;
				break;

			default:
				wCast = 1500 + 500 * n_A_ActiveSkillLV;
				n_KoteiCast = 3500 - 500 * n_A_ActiveSkillLV;
				break;

			}

			var w_HP;
			var w_SP;
			if(n_A_ActiveSkill == SKILL_ID_SELF_DESTRUCTION){
				w_HP = attackMethodConfArray[0].GetOptionValue(0);
				if (w_HP == 0) {
					w_HP = charaData[CHARA_DATA_INDEX_MAXHP];
				}
				w_SP = attackMethodConfArray[0].GetOptionValue(1);
			}else{
				w_HP = charaData[CHARA_DATA_INDEX_MAXHP];
				w_SP = charaData[CHARA_DATA_INDEX_MAXSP];
			}
			var mainF = UsedSkillSearch(SKILL_ID_MAINFRAME_KAIZO);
			if(mainF <2) mainF = 2;
			n_A_Weapon_zokusei = 0;
			var w = (n_A_ActiveSkillLV + 1) * (mainF + 8) * (w_SP + n_A_VIT);
			w = Math.floor(w * n_A_BaseLV / 100);
			w += w_HP;
			w -= B_Total_DEF;
			w = ApplyElementRatio(mobData, w,0);
			w = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w);
			w_DMG[0] = w_DMG[1] = w_DMG[2] = Math.floor(w);
			for(var i=0;i<=2;i++){
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_PINGPOINT_ATTACK:
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			n_Enekyori = 1;
			n_Delay[2] = 1000;
			n_Delay[7] = 5000;
			var wBAI = 100 * n_A_ActiveSkillLV;
			wBAI += n_A_AGI * 5;
			wBAI = ROUNDDOWN(wBAI * n_A_BaseLV / 120);
			wBAI += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
			wBAI = ATKbaiJYOUSAN(wBAI);
			for(var i=0;i<=2;i++){
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, n_A_CriATK[i], true);
				w_DMG[i] = Math.floor(w_DMG[i] * wBAI / 100);
				w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i],0);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,100);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i], i, true);
			}
			if(n_AS_MODE == 1) return w_DMG;
			for(var i=0;i<=2;i++){
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_OVER_BLAND:
			wLAch = 1;
			var w3HIT = attackMethodConfArray[0].GetOptionValue(0);
			var wSQ = attackMethodConfArray[0].GetOptionValue(1);
			var wBai = new Array();
			wBai[0] = n_A_ActiveSkillLV * 400 + 50 * wSQ;
			wBai[0] = Math.floor(wBai[0] * n_A_BaseLV / 150);
			wBai[1] = n_A_ActiveSkillLV * 300 + n_A_STR + n_A_DEX;
			wBai[1] = Math.floor(wBai[1] * n_A_BaseLV / 150);
			wBai[2] = n_A_ActiveSkillLV * 200;
			wCast = 2000;
			n_KoteiCast = 1000;
			n_Delay[1] = n_Delay[1] * 2;
			n_Delay[7] = 2500;

			var wOB_DMG = new Array();
			wOB_DMG[0] = [0,0,0];
			wOB_DMG[1] = [0,0,0];
			wOB_DMG[2] = [0,0,0];
			for(var j=0;j<=2;j++){
				wBai[j] += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
				wBai[j] = ATKbaiJYOUSAN(wBai[j]);
				for(var i=0;i<=2;i++){
					wOB_DMG[j][i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, n_A_DMG[i]);
					wOB_DMG[j][i] = Math.floor(wOB_DMG[j][i] * wBai[j] / 100);
					wOB_DMG[j][i] = ApplyMonsterDefence(mobData, wOB_DMG[j][i], 0);
					wOB_DMG[j][i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, wOB_DMG[j][i],i,-1);
					wOB_DMG[j][i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, wOB_DMG[j][i]);
				}
			}
			if(w3HIT==1){
				for(var i=0;i<=2;i++){
					Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i] = wOB_DMG[0][i] + wOB_DMG[1][i] + wOB_DMG[2][i];
					if(n_B_IJYOU[6] == 0) g_damageTextArray[i].push(w_DMG[i], " (", wOB_DMG[0][i], "+", wOB_DMG[1][i], "+", wOB_DMG[2][i], ")");
					else{
						var w = wOB_DMG[0][i] * 2;
						var w2 = w + wOB_DMG[1][i] + wOB_DMG[2][i];
						g_damageTextArray[i].push(w2, " (", w, "+", wOB_DMG[1][i], "+", wOB_DMG[2][i], ")");
						Last_DMG_B[i] = w2;
					}
				}
			}else{
				for(var i=0;i<=2;i++){
					Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i] = wOB_DMG[0][i] + wOB_DMG[1][i];
					if(n_B_IJYOU[6] == 0) g_damageTextArray[i].push(w_DMG[i], " (", wOB_DMG[0][i], "+", wOB_DMG[1][i], ")");
					else{
						var w = wOB_DMG[0][i] * 2;
						var w2 = w + wOB_DMG[1][i];
						g_damageTextArray[i].push(w2, " (", w, "+", wOB_DMG[1][i], ")");
						Last_DMG_B[i] = w2;
					}
				}
			}
			w_DMG[1] = 0;
			w_DMG[1] += (wOB_DMG[0][1] * w_HIT) / 100;
			w_DMG[1] += (wOB_DMG[1][1] * w_HIT) / 100;
			if(w3HIT == 1) w_DMG[1] += (wOB_DMG[2][1] * w_HIT) / 100 * w_HIT / 100;
			AS_PLUS();
			n_PerfectHIT_DMG = 0;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_SHURASHINDAN:
			n_Enekyori = 1;
			n_Delay[7] = Math.max(200, 1200 - 200 * n_A_ActiveSkillLV);
			wbairitu = 500 + 100 * n_A_ActiveSkillLV;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
			wbairitu = ATKbaiJYOUSAN(wbairitu);
			for(var i=0;i<=2;i++){
				w_DMG[i] = n_A_DMG[i];
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = Math.floor(w_DMG[i] * wbairitu / 100);
				w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
			}
			var w2hit = [0,0,0];
			wLAch=1;
			for(var i=0;i<=2;i++){
				if(attackMethodConfArray[0].GetOptionValue(0) == 1 && mobData[20] != 1){
					var w = GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
					w += 150 * n_A_ActiveSkillLV;
					w += ROUNDDOWN(mobData[2] * 5 * n_A_BaseLV / 150);
					if(mobData[0] == 787 && n_B_TAISEI[37] != 0) w += ROUNDDOWN(1000 * n_B_TAISEI[36] / n_B_TAISEI[37]);
					w = ATKbaiJYOUSAN(w);
					w = Math.floor(n_A_DMG[i] * w / 100);
					w = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w);
					w = ApplyMonsterDefence(mobData, w, 0);
					if(i == 0 && w_HIT <100) w = 0;
					if(i == 1) w = w * w_HIT / 100;
					if(w_DMG[i] <= 0) w = 0;
					w2hit[i] += w;
				}
				w2hit[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w2hit[i]);
				w_DMG[i] += w2hit[i] }
			if(n_AS_MODE == 1) return w_DMG;
			for(var i=0;i<=2;i++){
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
				if(attackMethodConfArray[0].GetOptionValue(0) == 1){
					var w = w2hit[i];
					if(w == 0) w = "Miss";
					g_damageTextArray[i].push(" (", (w_DMG[i] - w2hit[i]), " + ", w, ")");
				}
			}
			w_DMG[1] = (w_DMG[1] * w_HIT + ApplyHitJudgeElementRatio(n_A_ActiveSkill, GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray), mobData) *(100-w_HIT))/100;
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_HASAICHU:
			if(n_DEATH_BOUND[3] == 0){
				w_DMG[0] = 1;
				w_DMG[1] = 1;
				w_DMG[2] = 1;
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			}else{
				n_Delay[0] = 1;
				n_Delay[2] = 1000;

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					n_KoteiCast = 5500 - 500 * n_A_ActiveSkillLV;
					n_Delay[7] = 2000 + 1000 * n_A_ActiveSkillLV;
					break;

				default:
					n_KoteiCast = 0;
					n_Delay[7] = 5000;
					break;

				}

				var wEHP = attackMethodConfArray[0].GetOptionValue(1);
				if(wEHP == 0){
					wEHP = mobData[3];
					if(wEHP >= 100000) wEHP = 100000;
				}
				wbairitu = Math.floor((wEHP / 100) * n_A_ActiveSkillLV * n_A_BaseLV / 125);
				wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
				wbairitu = ATKbaiJYOUSAN(wbairitu);
				for(var i=0;i<=2;i++){
					w_DMG[i] = n_A_DMG[i];
					w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					w_DMG[i] = Math.floor(w_DMG[i] * wbairitu / 100);
					w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
					w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				}
				w_DMG[0] += n_DEATH_BOUND[0];
				w_DMG[1] += n_DEATH_BOUND[1];
				w_DMG[2] += n_DEATH_BOUND[2];
				var w2hit = [0,0,0];
				wLAch=1;
				for(var i=0;i<=2;i++){
					if(attackMethodConfArray[0].GetOptionValue(0) == 1 && mobData[20] == 0){
						var w = GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
						w += 200 * n_A_ActiveSkillLV;
						w = ATKbaiJYOUSAN(w);
						w = Math.floor(n_A_DMG[i] * w / 100);
						w = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w);
						w = ApplyMonsterDefence(mobData, w, 0);
						w2hit[i] += w;
					}
					w2hit[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w2hit[i]);
					w_DMG[i] += w2hit[i] }
				if(n_AS_MODE == 1) return w_DMG;
				for(var i=0;i<=2;i++){
					Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
					g_damageTextArray[i].push(Last_DMG_A[i]);
					if(attackMethodConfArray[0].GetOptionValue(0) == 1){
						var w = w2hit[i];
						if(w == 0) w = "Miss";
						g_damageTextArray[i].push(" (", (w_DMG[i] - w2hit[i]), " + ", w, ")");
					}
				}
				n_PerfectHIT_DMG = 0;
				if(w_HIT_HYOUJI <100){
					if(attackMethodConfArray[0].GetOptionValue(0) == 0 && mobData[20] == 0) str_PerfectHIT_DMG = __DIG3(n_DEATH_BOUND[0]) +"～"+ __DIG3(n_DEATH_BOUND[2]);
					else str_PerfectHIT_DMG = __DIG3(n_DEATH_BOUND[0]) +"+"+ __DIG3(w2hit[0]) +"～"+ __DIG3(n_DEATH_BOUND[2]) +"+"+ __DIG3(w2hit[2]);
					n_PerfectHIT_DMG = n_DEATH_BOUND[1] + w2hit[1];
				}
				w_DMG[1] = (w_DMG[1] * w_HIT + (ApplyHitJudgeElementRatio(n_A_ActiveSkill, GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray), mobData) + n_DEATH_BOUND[1] + w2hit[1]) *(100-w_HIT))/100;
				AS_PLUS();
				BuildCastAndDelayHtml(mobData);
				BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
				/*
					w_DMG[0] = n_DEATH_BOUND[0];
					w_DMG[1] = n_DEATH_BOUND[1];
					w_DMG[2] = n_DEATH_BOUND[2];
					for(var i=0;i<=2;i++){
					Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
					g_damageTextArray[i].push(Last_DMG_A[i]);
					}
					w_HIT_HYOUJI = 100;
					BuildCastAndDelayHtml(mobData);
					BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
				*/
			}
			break;



		case SKILL_ID_SHINDOZANKYO:
			n_Enekyori=0;
			wCast = 1000 + 100 * n_A_ActiveSkillLV;
			n_Delay[7] = 200;
			wbairitu = 300 + 100 * n_A_ActiveSkillLV;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			var wBunsan = attackMethodConfArray[0].GetOptionValue(0);
			if(wBunsan >= 2) wbairitu = ROUNDDOWN(wbairitu / wBunsan);
			for(var i=0;i<=2;i++){
				w_DMG[i] = n_A_DMG[i];
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = Math.floor(w_DMG[i] * wbairitu / 100);
				w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
			}
			var w_MagDMG = [0,0,0];
			var BKzok = n_A_Weapon_zokusei;
			n_A_Weapon_zokusei = 0;
			n_Enekyori=2;
			var w = 100 + 100 * n_A_ActiveSkillLV;
			w = ROUNDDOWN(w * n_A_BaseLV / 100);
			if(wBunsan >= 2) w = ROUNDDOWN(w / wBunsan);
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_A_MATK[i];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
			}
			for(var i=0;i<=2;i++){
				w_MagDMG[i] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[i] * w / 100);
			}
			n_A_Weapon_zokusei = BKzok;
			n_Enekyori=0;
			if(n_AS_MODE == 1){
				for(var i=0;i<=2;i++) w_DMG[i] += w_MagDMG[i];
				return w_DMG;
			}
			for(var i=0;i<=2;i++){
				g_damageTextArray[i].push(w_DMG[i] + w_MagDMG[i]);
				g_damageTextArray[i].push(" (", w_DMG[i], " + ", w_MagDMG[i], ")");
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i] = w_DMG[i] + w_MagDMG[i];
			}
			w_DMG[1] = (w_DMG[1] * w_HIT + w_MagDMG[1] * (100-w_HIT))/100;
			n_PerfectHIT_DMG = 0;
			if(w_HIT_HYOUJI <100){
				var w0 = w_MagDMG[0];
				var w2 = w_MagDMG[2];
				if(w0 == w2) str_PerfectHIT_DMG = __DIG3(w0) +"<BR>";
				else str_PerfectHIT_DMG = __DIG3(w0) +"～"+ __DIG3(w2) +"<BR>";
				n_PerfectHIT_DMG = w0;
			}
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_BLOOD_SUCKER:
		case SKILL_ID_THORN_TRAP:
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			wCast = 1500;
			n_Delay[2] = 500;
			n_Delay[5] = 1000;
			n_PerfectHIT_DMG = 0;
			n_A_Weapon_zokusei = 0;

			var w;

			if (n_A_ActiveSkill == SKILL_ID_BLOOD_SUCKER) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					w = 15000 + 3000 * n_A_ActiveSkillLV + n_A_INT;
					n_Delay[7] = 4500 + 500 * n_A_ActiveSkillLV;
					break;

				default:
					w = 200 + 100 * n_A_ActiveSkillLV + n_A_INT;
					break;

				}
			}

			else if (n_A_ActiveSkill == SKILL_ID_THORN_TRAP) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					w = 25000 + 5000 * n_A_ActiveSkillLV + n_A_INT;
					break;

				default:
					w = 100 + 200 * n_A_ActiveSkillLV + n_A_INT;
					break;

				}
			}

			w_DMG[0] = w_DMG[1] = w_DMG[2] = w;
			for(var i=0;i<=2;i++){

				w_DMG[i] = ApplyAttackDamageAmplify(mobData, w_DMG[i]);

				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_HELLS_PLANT:
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			n_Enekyori = 2;
			wCast = 2000;
			n_PerfectHIT_DMG = 0;
			n_A_Weapon_zokusei = 0;
			w = n_A_ActiveSkillLV * mobData[2] * 10 + Math.floor(n_A_INT * 7 / 2) * Math.floor(18 + n_A_JobLV / 4) * (5 / (10 - attackMethodConfArray[0].GetOptionValue(0)));
			w = ApplyElementRatio(mobData, w,0);
			w = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w);
			if(n_B_KYOUKA[7] && n_Enekyori == 2) w += Math.floor(w * (20 * n_B_KYOUKA[7]) / 100);
			w_DMG[0] = w_DMG[1] = w_DMG[2] = Math.floor(w);
			for(var i=0;i<=2;i++){
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
			}
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_ZYUMONZIGIRI:
			n_Enekyori=1;
			wActiveHitNum = 2;
			n_Delay[7] = Math.max(600, 6100 - 1100 * n_A_ActiveSkillLV);
			wbairitu = 200 * n_A_ActiveSkillLV;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 120);
			wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
			wbairitu = ATKbaiJYOUSAN(wbairitu);

			// 必中ダメージのみ仮計算（属性倍率未適用）
			n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);

			for(var i=0;i<=2;i++){
				w_DMG[i] = n_A_DMG[i];
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = Math.floor(w_DMG[i] * wbairitu / 100);
				w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] += n_PerfectHIT_DMG;
				w_DMG[i] = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
				w_DMG[i] = ApplyHitJudgeElementRatio(n_A_ActiveSkill, w_DMG[i], mobData);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				if(wActiveHitNum > 1) w_DMG[i] = Math.floor(w_DMG[i] / wActiveHitNum) * wActiveHitNum;
			}
			if(n_AS_MODE == 1) return w_DMG;
			if(attackMethodConfArray[0].GetOptionValue(0) >= 1){
				var wjyuu = [0,0,0];
				for(var i=0;i<=2;i++) wjyuu[i] = w_DMG[i];
				wbairitu = 150 * n_A_ActiveSkillLV;
				wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 120);
				wbairitu += n_A_BaseLV * n_A_ActiveSkillLV;
				wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
				wbairitu = ATKbaiJYOUSAN(wbairitu);
				n_Delay[0] = 1;
				for(var i=0;i<=2;i++){
					w_DMG[i] = n_A_DMG[i];
					w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					w_DMG[i] = Math.floor(w_DMG[i] * wbairitu / 100);
					w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
					w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
					w_DMG[i] += n_PerfectHIT_DMG;
					w_DMG[i] = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
					w_DMG[i] = ApplyHitJudgeElementRatio(n_A_ActiveSkill, w_DMG[i], mobData);
					w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
					if(wActiveHitNum > 1) w_DMG[i] = Math.floor(w_DMG[i] / wActiveHitNum) * wActiveHitNum;
				}
				for(var i=0;i<=2;i++){
					Last_DMG_A[i] = Last_DMG_B[i] = wjyuu[i] + w_DMG[i] * attackMethodConfArray[0].GetOptionValue(0);
					g_damageTextArray[i].push(Last_DMG_A[i]);
					g_damageTextArray[i].push("(", (wjyuu[i] / 2), "×2Hit + ");
					g_damageTextArray[i].push((w_DMG[i] / 2), "×", (2 * attackMethodConfArray[0].GetOptionValue(0)), ")");
					w_DMG[i] = Last_DMG_A[i];
				}

				// 改めて必中ダメージを計算
				n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
				n_PerfectHIT_DMG = ApplyHitJudgeElementRatio(n_A_ActiveSkill, n_PerfectHIT_DMG, mobData);
				n_PerfectHIT_DMG = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, n_PerfectHIT_DMG);
				w_DMG[1] = (w_DMG[1] * w_HIT + n_PerfectHIT_DMG * (100-w_HIT))/100;
			}
			else{
				for(var i=0;i<=2;i++){
					Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
					g_damageTextArray[i].push(Last_DMG_A[i]);
					if(wActiveHitNum > 1) g_damageTextArray[i].push("(", (w_DMG[i] / wActiveHitNum), "×", wActiveHitNum, "Hit)");
				}

				// 改めて必中ダメージを計算
				n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
				n_PerfectHIT_DMG = ApplyHitJudgeElementRatio(n_A_ActiveSkill, n_PerfectHIT_DMG, mobData);
				n_PerfectHIT_DMG = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, n_PerfectHIT_DMG);
				w_DMG[1] = (w_DMG[1] * w_HIT + n_PerfectHIT_DMG * (100-w_HIT))/100;
			}
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_SENKO_RENGEKI:
		case SKILL_ID_COMBO_SANDAN_MONK:
		case SKILL_ID_COMBO_SANDAN_CHAMP:
		case SKILL_ID_COMBO_SORYUKYAKU:
		case SKILL_ID_COMBO_RESERVED_803:
		case SKILL_ID_COMBO_RESERVED_804:
		case SKILL_ID_COMBO_RESERVED_805:
		case SKILL_ID_COMBO_RESERVED_806:
		case SKILL_ID_COMBO_RESERVED_807:
		case SKILL_ID_COMBO_RESERVED_808:
		case SKILL_ID_COMBO_RESERVED_809:
		case SKILL_ID_COMBO_GIGANTSET_JOINT_BEAT:
		case SKILL_ID_COMBO_GIGANTSET_SPIRAL_PIERCE:
			if(n_A_ActiveSkill == SKILL_ID_SENKO_RENGEKI){
				n_Delay[2] = 1000;
				n_Delay[3] = 2.35;
				n_Delay[7] = 14000 - 2000 * n_A_ActiveSkillLV;
			}else n_Delay[0] = 1;
			if(n_AS_MODE == 1) return w_DMG;
			for(var i=0;i<=2;i++) w_DMG[i] = 0;
			AS_PLUS();
			if(GetActHitRateAll(n_A_ActiveSkill, mobData) == 100){
				for(var i=0;i<=2;i++){
					Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
					g_damageTextArray[i].push(Last_DMG_A[i]);
				}
			}else{
				for(var i=0;i<=2;i++) Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				if(Last_DMG_A[0] >= 1) g_damageTextArray[0].push(ROUNDDOWN(Last_DMG_A[0]));
				else g_damageTextArray[0].push("Miss<BR><Font size=2>(命中100未満なので)</Font>");
				g_damageTextArray[1].push(ROUNDDOWN(Last_DMG_A[1]), "<BR><Font size=2>※コンボ系のこの欄は特別仕様で、<BR>※Miss込みの平均与ダメージです。<BR>※Missを消すにはフリオニCなどで。</Font>");
				g_damageTextArray[2].push(Last_DMG_A[2]);
			}
			w_DMG[1] = (w_DMG[1] * w_HIT + n_PerfectHIT_DMG * (100-w_HIT))/100;
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		// 「アースクエイク」
		case SKILL_ID_EARTH_QUAKE:
			var QuakeBairitu = [0,300,500,600,800,1000,1200,1300,1500,1600,1800];
			wbairitu = QuakeBairitu[n_A_ActiveSkillLV];
			wHITsuu = 3;
			n_Enekyori = 2;
			w_HIT = 100;
			w_HIT_HYOUJI = 100;
			if(n_AS_MODE == 0){
				var wBunsan = attackMethodConfArray[0].GetOptionValue(0);
				if(wBunsan >= 2) wbairitu = ROUNDDOWN(wbairitu / wBunsan);
			}
			for(var i=0;i<=2;i++){
				w_DMG[i] = n_A_DMG_GX[i] * wCSize;	// 基礎攻撃力 n_A_DMG_GX[i] にサイズ補正 wCSize をかける
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = Math.floor(w_DMG[i] * wbairitu / 100);
				w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i],0);
				if(n_B_KYOUKA[7] && n_Enekyori == 2) w_DMG[i] += Math.floor(w_DMG[i] * (20 * n_B_KYOUKA[7]) / 100);
			}
			if(n_AS_MODE == 1){
				// 最小、平均、最大の 1 hitあたりダメージ
				w_DMG[0] = w_DMG[0];
				w_DMG[1] = w_DMG[1];
				w_DMG[2] = w_DMG[2];
				return w_DMG;
			}
			// GvG補正
			for(var i=0;i<=2;i++){
				w_DMG[i] = ApplyAttackDamageAmplify(mobData, w_DMG[i]);
			}
			//
			for(var i=0;i<=2;i++){
				Last_DMG_B[i] = Math.floor(w_DMG[i] / 3);		// B = 1 hitあたりダメージ
				Last_DMG_A[i] = w_DMG[i];						// A = 3 hit合計ダメージ
				g_damageTextArray[i].push(Last_DMG_A[i]);
				g_damageTextArray[i].push("(", w_DMG[i], "×3Hit)");
				w_DMG[i] = Last_DMG_A[i];
			}
			var wX = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
			wX = ApplyHitJudgeElementRatio(n_A_ActiveSkill, wX, mobData);
			wX = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, wX);

			// TODO: ダメージ表示方式変更対応
			//w_DMG[1] = (w_DMG[1] * w_HIT + wX * wHITsuu *(100-w_HIT))/100;
			w_DMG[1] = (w_DMG[1] * w_HIT + wX * (100-w_HIT))/100;

			AS_PLUS();

			// TODO: ダメージ表示方式変更対応
			//n_PerfectHIT_DMG = wX * wHITsuu;

			str_PerfectHIT_DMG = __DIG3(wX * wHITsuu) +"("+ __DIG3(wX) +"×"+ wHITsuu +"hit)";
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_MAGMA_ILLUPTION:
			wCast = 2000;
			n_Delay[7] = 11000 - 1000 * n_A_ActiveSkillLV;
			wbairitu = 450 + 50 * n_A_ActiveSkillLV;
			wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
			wbairitu = ATKbaiJYOUSAN(wbairitu);

			var MAGUMA = 0;

			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				MAGUMA = (25000 + 5000 * n_A_ActiveSkillLV);
				break;

			default:
				MAGUMA = (800 + 200 * n_A_ActiveSkillLV);
				break;

			}

			// ダメージ増減適用
			MAGUMA = ApplyAttackDamageAmplify(mobData, MAGUMA);

			// 必中ダメージのみ仮計算（属性倍率未適用）
			n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);

			for(var i=0;i<=2;i++){
				w_DMG[i] = n_A_DMG[i];
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = Math.floor(w_DMG[i] * wbairitu / 100);
				w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] += n_PerfectHIT_DMG;
				w_DMG[i] = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
				w_DMG[i] = ApplyHitJudgeElementRatio(n_A_ActiveSkill, w_DMG[i], mobData);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] += MAGUMA * 10;
			}
			if(n_AS_MODE == 1){
				return w_DMG;
			}
			for(var i=0;i<=2;i++){
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
				g_damageTextArray[i].push("(", (w_DMG[i] - MAGUMA * 10), "＋", MAGUMA, "×10Hit)");
			}

			// 改めて必中ダメージ計算
			n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
			n_PerfectHIT_DMG = ApplyHitJudgeElementRatio(n_A_ActiveSkill, n_PerfectHIT_DMG, mobData);
			n_PerfectHIT_DMG = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, n_PerfectHIT_DMG);
			n_PerfectHIT_DMG += MAGUMA * 10;
			w_DMG[1] = (w_DMG[1] * w_HIT + n_PerfectHIT_DMG * (100-w_HIT))/100;
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;


		//「メイジ」スキル「ナパームビート」
		case SKILL_ID_NAPALM_BEAT:
			n_PerfectHIT_DMG = 0;
			n_Enekyori=2;
			n_MagicCalcType=1;
			wbairitu = 100;
			n_bunkatuHIT = 0;
			n_A_Weapon_zokusei = 8;
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_Heal_MATK[i];
				w_MATK[i] = Math.floor(w_MATK[i] * (70 + 10 * n_A_ActiveSkillLV) / 100);
				w_MATK[i] += n_tok[100];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
			}
			wHITsuu = 1;
			wCast = 500;
			if(n_A_ActiveSkillLV==10) n_Delay[2] = 500;
			else if(n_A_ActiveSkillLV==9) n_Delay[2] = 600;
			else if(n_A_ActiveSkillLV==8) n_Delay[2] = 700;
			else if(n_A_ActiveSkillLV>=6) n_Delay[2] = 800;
			else if(n_A_ActiveSkillLV>=4) n_Delay[2] = 900;
			else n_Delay[2] = 1000;
			wbairitu = 100;
			wbairitu += GetBattlerMatkPercentUp();
			var wBunsan = 1;
			if(n_AS_MODE == 0) wBunsan = attackMethodConfArray[0].GetOptionValue(0);
			if(wBunsan >= 2){
				for(var i=0;i<=2;i++) w_MATK[i] = ROUNDDOWN(w_MATK[i] / wBunsan);
			}
			for(var b=0;b<=2;b++){
				w_DMG[b] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[b] * wbairitu / 100);
				Last_DMG_B[b] = w_DMG[b];

				// TODO: ダメージ表示方式変更対応
				Last_DMG_A[b] = w_DMG[b] * wHITsuu;

				if(n_AS_MODE == 0) g_damageTextArray[b].push(Last_DMG_A[b], "(", Last_DMG_B[b], SubName[8], wHITsuu, "hit)");
				w_DMG[b] = Last_DMG_A[b];
			}
			if(n_AS_MODE == 1) return w_DMG;
			w_HIT_HYOUJI = 100;
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;


		// 「ハイウィザード」スキル「ナパームバルカン」
		case SKILL_ID_NAPALM_VULKAN:
			n_PerfectHIT_DMG = 0;
			n_Enekyori=2;
			n_MagicCalcType=1;
			wbairitu = 100;
			n_bunkatuHIT = 0;
			n_A_Weapon_zokusei = 8;
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_Heal_MATK[i];
				w_MATK[i] = Math.floor(w_MATK[i] * (70 + 10 * n_A_ActiveSkillLV) / 100);
				w_MATK[i] += n_tok[100];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
			}
			wHITsuu = n_A_ActiveSkillLV;
			wCast = 1000;
			n_Delay[2] = 1000;
			wbairitu = 100;
			wbairitu += GetBattlerMatkPercentUp();
			var wBunsan = 1;
			if(n_AS_MODE == 0) wBunsan = attackMethodConfArray[0].GetOptionValue(0);
			if(wBunsan >= 2){
				for(var i=0;i<=2;i++) w_MATK[i] = ROUNDDOWN(w_MATK[i] / wBunsan);
			}
			for(var b=0;b<=2;b++){
				w_DMG[b] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[b] * wbairitu / 100);
				// 単発ダメージ Last_DMG_B
				Last_DMG_B[b] = Math.floor(w_DMG[b] / wHITsuu);
				// 最終ダメージ Last_DMG_A
				// TODO: ダメージ表示方式変更対応
				Last_DMG_A[b] = w_DMG[b];
				if(n_AS_MODE == 0) g_damageTextArray[b].push(Last_DMG_A[b], "(", Last_DMG_B[b], SubName[8], wHITsuu, "hit)");
				w_DMG[b] = Last_DMG_A[b];
			}
			if(n_AS_MODE == 1) return w_DMG;
			w_HIT_HYOUJI = 100;
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		case SKILL_ID_FIRE_PILLAR:
			n_PerfectHIT_DMG = 0;
			n_Enekyori=2;
			wbairitu = 100;
			n_MagicCalcType = 1;
			n_bunkatuHIT = 1;
			n_A_Weapon_zokusei = 3;
			wHITsuu = (n_A_ActiveSkillLV +2);
			wCast = 3300 - (300 * n_A_ActiveSkillLV);
			n_Delay[2] = 1000;
			for(var i=0;i<=2;i++){
				w_MATK[i] = n_Heal_MATK[i];
				w_MATK[i] = Math.floor(w_MATK[i] * (40 + 20 * n_A_ActiveSkillLV) / 100) + 100 + 50 * n_A_ActiveSkillLV;
				w_MATK[i] += n_tok[100];
				w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
				w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
				w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
				w_MATK[i] = Math.floor(w_MATK[i] * (100+GetEquippedTotalSPEquip(5122) + GetEquippedTotalSPCardAndElse(5122)) / 100);
			}
			wbairitu += GetBattlerMatkPercentUp();
			for(var b=0;b<=2;b++){
				w_DMG[b] = Math.floor(ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[b] * wbairitu / 100) / wHITsuu);
				Last_DMG_A[b] = Last_DMG_B[b] = w_DMG[b] * wHITsuu;
				if(n_AS_MODE == 0) g_damageTextArray[b].push(Last_DMG_A[b], "(", w_DMG[b], SubName[8], wHITsuu, "hit)");

				// TODO: ダメージ表示方式変更対応
				// w_DMG[b] *= wHITsuu;
			}
			if(n_AS_MODE == 1) return w_DMG;
			w_HIT_HYOUJI = 100;
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		// リベリオン－マススパイラル（ハッケイから流用）
		case SKILL_ID_MASS_SPIRAL:
			n_Enekyori=1;
			wCast = 2000;
			n_Delay[2] = 0;
			n_Delay[7] = 0;

			// 威力に影響するＤＥＦは５００まで
			var defpower =  B_Original_DEF > 500 ? 500 :  B_Original_DEF;
			wbairitu = (200 + defpower) * n_A_ActiveSkillLV;

			var AS_ATK = 0;
			if(n_AS_MODE == 1){
				AS_ATK = Math.floor(mobData[13] / 2);
				AS_ATK = ApplyPhysicalSpecializeMonster(charaData, specData, mobData, AS_ATK);
				AS_ATK = ApplyElementRatio(mobData, AS_ATK,n_A_Weapon_zokusei);
			}
			for(var i=0;i<=2;i++){
				w_DMG[i] = n_A_DMG[i] + AS_ATK;
				w_DMG[i] = Math.floor(w_DMG[i] * wbairitu / 100);
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				// ＤＥＦの影響を受ける
				w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
	// バグ？　属性が２回かかってる。
	//			w_DMG[i] = ApplyElementRatio(mobData, w_DMG[i], n_A_Weapon_zokusei);
			}
			if(n_AS_MODE == 1) return w_DMG;
			for(var i=0;i<=2;i++){
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
			}
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		// リベリオン－ラウンドトリップ（修羅身弾から流用）
		case SKILL_ID_ROUND_TRIP:
			n_Enekyori=1;
			wCast = 0;
			n_Delay[2] = 0;
			n_Delay[7] = Math.max(200, 1200 - 200 * n_A_ActiveSkillLV);

			var basePower = 100 + 40 * n_A_ActiveSkillLV;
			basePower = ROUNDDOWN(basePower * n_A_BaseLV / 100);

			wbairitu = basePower;
			wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
			wbairitu = ATKbaiJYOUSAN(wbairitu);

			for(var i=0;i<=2;i++){
				w_DMG[i] = n_A_DMG[i];
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = Math.floor(w_DMG[i] * wbairitu / 100);
				w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
			}
			var w2hit = [0,0,0];
			wLAch=1;
			for(var i=0;i<=2;i++){
				if(attackMethodConfArray[0].GetOptionValue(0) == 1 && mobData[20] != 1){

					var w = basePower;
					w += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);

					if(mobData[0] == 787 && n_B_TAISEI[37] != 0) w += ROUNDDOWN(1000 * n_B_TAISEI[36] / n_B_TAISEI[37]);
					w = ATKbaiJYOUSAN(w);
					w = Math.floor(n_A_DMG[i] * w / 100);
					w = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w);
					w = ApplyMonsterDefence(mobData, w, 0);
					if(i == 0 && w_HIT <100) w = 0;
					if(i == 1) w = w * w_HIT / 100;
					if(w_DMG[i] <= 0) w = 0;
					w2hit[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w);
				}
				w_DMG[i] += w2hit[i] }
			if(n_AS_MODE == 1) return w_DMG;
			for(var i=0;i<=2;i++){
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
				if(attackMethodConfArray[0].GetOptionValue(0) == 1){
					var w = w2hit[i];
					if(w == 0) w = "Miss";
					g_damageTextArray[i].push(" (", (w_DMG[i] - w2hit[i]), " + ", w, ")");
				}
			}
			w_DMG[1] = (w_DMG[1] * w_HIT + ApplyHitJudgeElementRatio(n_A_ActiveSkill, GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray), mobData) *(100-w_HIT))/100;
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;



		// 紅焔脚（修羅身弾から流用）
		case SKILL_ID_KOEN_KYAKU:
			var hitMode = attackMethodConfArray[0].GetOptionValue(0);
			wCast = 50 + 80 * n_A_ActiveSkillLV + 40 * Math.floor(n_A_ActiveSkillLV / 2);
			for (let idx = 0; idx <= 2; idx++) {
				w_DMG[idx] = 0;
			}
			// 攻撃対象のダメージ計算
			if ((hitMode & 1) == 1) {
				wbairitu = 650 + 50 * n_A_ActiveSkillLV;
				wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
				wbairitu = ATKbaiJYOUSAN(wbairitu);
				for (let idx = 0; idx <= 2; idx++) {
					w_DMG[idx] = n_A_DMG[idx];
					w_DMG[idx] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[idx]);
					w_DMG[idx] = Math.floor(w_DMG[idx] * wbairitu / 100);
					w_DMG[idx] = ApplyMonsterDefence(mobData, w_DMG[idx], 0);
					w_DMG[idx] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[idx]);
				}
			}
			var w2hit = [0,0,0];
			wLAch=1;
			// 追加ダメージの計算
			if ((hitMode & 2) == 2) {
				for (let idx = 0; idx <= 2; idx++) {
					var w = 650 + 50 * n_A_ActiveSkillLV;
					w += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
					w = ATKbaiJYOUSAN(w);
					w = Math.floor(n_A_DMG[idx] * w / 100);
					w = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w);
					w = ApplyMonsterDefence(mobData, w, 0);
					/*
					if (idx == 0 && w_HIT <100) {	// 命中率が 100% 未満の場合、最低ダメージを 0 にする
						w = 0;
					}
					if (idx == 1) {	// 命中率を考慮した平均ダメージにする
						w = w * w_HIT / 100;
					}
					*/
					w2hit[idx] += w;
					w2hit[idx] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w2hit[idx]);
					w_DMG[idx] += w2hit[idx]
				}
			}
			if (n_AS_MODE == 1) {
				return w_DMG;
			}
			// 表示の調整
			for (let idx = 0; idx <= 2; idx++) {
				Last_DMG_A[idx] = Last_DMG_B[idx] = w_DMG[idx];
				g_damageTextArray[idx].push(Last_DMG_A[idx]);
				if ((hitMode & 3) == 3) {
					var w = w2hit[idx];
					if (w == 0) {
						w = "Miss";
					}
					g_damageTextArray[idx].push(" (", (w_DMG[idx] - w2hit[idx]), " + ", w, ")");
				}
			}
			//w_DMG[1] = (w_DMG[1] * w_HIT + ApplyHitJudgeElementRatio(n_A_ActiveSkill, GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray), mobData) *(100-w_HIT))/100;
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;


		case SKILL_ID_ZYURYOKU_CHOSE:

			wbairitu = 100;

			w_HIT = 100;
			w_HIT_HYOUJI = 100;

			n_KoteiCast = 1000;

			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				n_Delay[7] = 10000;
				break;

			default:
				n_Delay[7] = 2000;
				break;

			}

			wbairitu += GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray);
			wbairitu = ATKbaiJYOUSAN(wbairitu);

			// 必中ダメージのみ仮計算（属性倍率未適用）
			n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);

			for(var i=0;i<=2;i++){
				w_DMG[i] = n_A_DMG[i];
//				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = Math.floor(w_DMG[i] * wbairitu / 100);
				// 重量ダメージ
				w_DMG[i] += n_B_TAISEI[MOB_CONF_PLAYER_ID_SHOZIZYURYO_GENZAI];
				// 防御計算が特殊
				w_DMG[i] -= (mobData[13] + n_B_DEF2[0]);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] += n_PerfectHIT_DMG;
				w_DMG[i] = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
				w_DMG[i] = ApplyHitJudgeElementRatio(n_A_ActiveSkill, w_DMG[i], mobData);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);

				if(wActiveHitNum > 1) {
					w_DMG[i] = Math.floor(w_DMG[i] / wActiveHitNum) * wActiveHitNum;
				}
			}

			if(n_AS_MODE == 1) return w_DMG;

			for(var i=0;i<=2;i++){
				Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i];
				g_damageTextArray[i].push(Last_DMG_A[i]);
				if(wActiveHitNum > 1) g_damageTextArray[i].push("(", (w_DMG[i] / wActiveHitNum), "×", wActiveHitNum, "Hit)");
			}

			// 改めて必中ダメージ計算
			n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
			n_PerfectHIT_DMG = ApplyHitJudgeElementRatio(n_A_ActiveSkill, n_PerfectHIT_DMG, mobData);
			n_PerfectHIT_DMG = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, n_PerfectHIT_DMG);
			w_DMG[1] = (w_DMG[1] * w_HIT + n_PerfectHIT_DMG * (100-w_HIT))/100;
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);

			break;
/*
		// 「星帝」スキル「創星の書」
		case SKILL_ID_SOSENO_SHO:
			n_Enekyori=1;
			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {
			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				wbairitu = 750 + 750 * n_A_ActiveSkillLV;
				break;
			default:
				wbairitu = 500 + 500 * n_A_ActiveSkillLV;
				break;
			}
			wCast = 1000 * n_A_ActiveSkillLV;
			n_Delay[6] = 10;
			n_Delay[7] = 5000;
			wHITsuu = 20;
			// 必中ダメージのみ仮計算（属性倍率未適用）
			n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
			for(var i=0;i<=2;i++){
				w_DMG[i] = n_A_DMG[i];
				w_DMG[i] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);
				w_DMG[i] = Math.floor(w_DMG[i] * wbairitu / 100);
				w_DMG[i] = ApplyMonsterDefence(mobData, w_DMG[i], 0);
				w_DMG[i] += GetFixedAppendAtk(n_A_ActiveSkill, charaData, specData, mobData, w_DMG[i],i,-1);
				w_DMG[i] += n_PerfectHIT_DMG;
				w_DMG[i] = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
				w_DMG[i] = ApplyHitJudgeElementRatio(n_A_ActiveSkill, w_DMG[i], mobData);
				w_DMG[i] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, w_DMG[i]);

				if(wActiveHitNum > 1) {
					w_DMG[i] = Math.floor(w_DMG[i] / wActiveHitNum) * wActiveHitNum;
				}
			}
			if(n_AS_MODE == 1) return w_DMG;
			for(var i=0;i<=2;i++){

				// TODO: ダメージ表示方式変更対応
				//Last_DMG_A[i] = Last_DMG_B[i] = w_DMG[i] * wHITsuu;

				g_damageTextArray[i].push(Last_DMG_A[i]);
				if(wHITsuu > 1) g_damageTextArray[i].push("(", w_DMG[i], "×", wHITsuu, "hit)");
			}
			// 改めて必中ダメージ計算
			n_PerfectHIT_DMG = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
			n_PerfectHIT_DMG = ApplyHitJudgeElementRatio(n_A_ActiveSkill, n_PerfectHIT_DMG, mobData);
			n_PerfectHIT_DMG = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, n_PerfectHIT_DMG);
			w_DMG[1] = (w_DMG[1] * w_HIT + n_PerfectHIT_DMG * (100-w_HIT))/100;
			AS_PLUS();
			BuildCastAndDelayHtml(mobData);
			BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
			break;
*/

		default:
			bPhysicalFormula = false;
			break;

		}

		// 物理判定スキルでなければ別処理へ
		if (!bPhysicalFormula) {
			break;
		}

		return w_DMG;
	}




	//----------------------------------------------------------------
	//
	// 魔法判定スキル
	//
	//----------------------------------------------------------------
	while (true) {

		n_PerfectHIT_DMG = 0;
		n_Enekyori=2;
		n_MagicCalcType=0;
		wbairitu = 100;
		n_bunkatuHIT = 0;



		// 四次スキル以降の属性設定共通処理
		if (battleCalcInfo.skillId >= SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT) {
			n_A_Weapon_zokusei = g_skillManager.GetElement(battleCalcInfo.skillId);
		}



		switch (n_A_ActiveSkill) {

		// 「マジシャン」スキル「ファイアーボルト」
		case SKILL_ID_FIRE_BOLT:
			n_A_Weapon_zokusei = 3;
			// スペルフィストの中身として呼ばれている場合
			if (battleCalcInfo.parentSkillId == SKILL_ID_SPELL_FIST) {
				// 倍率計算の中の処理を正しく分岐させるために、遠距離判定フラグを調整
				n_Enekyori = 0;
				// ヒット数を 1 に補正
				wHITsuu = 1;
				// 詠唱とディレイを 0 にしておく
				wCast = 0;
				n_Delay[2] = 0;
			}
			// 上記以外の場合
			else {
				wHITsuu = n_A_ActiveSkillLV;
				wCast = 560 * n_A_ActiveSkillLV;
				n_Delay[2] = 800 + n_A_ActiveSkillLV * 200;
			}
			switch (UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL)) {
				case SERE_SUPPORT_SKILL_ID_PYRO_TECHNIC: 
					wbairitu += ROUNDDOWN(n_A_JobLV / 3);
					break;
				case SERE_SUPPORT_SKILL_ID_FLAME_TECHNIQUE:
					wbairitu += 75;
					break;
			}
			break;

		// 「マジシャン」スキル「コールドボルト」
		case SKILL_ID_COLD_BOLT:
			n_A_Weapon_zokusei = 1;
			// スペルフィストの中身として呼ばれている場合
			if (battleCalcInfo.parentSkillId == SKILL_ID_SPELL_FIST) {
				// 倍率計算の中の処理を正しく分岐させるために、遠距離判定フラグを調整
				n_Enekyori = 0;
				// ヒット数を 1 に補正
				wHITsuu = 1;
				// 詠唱とディレイを 0 にしておく
				wCast = 0;
				n_Delay[2] = 0;
			}
			// 上記以外の場合
			else {
				wHITsuu = n_A_ActiveSkillLV;
				wCast = 560 * n_A_ActiveSkillLV;
				n_Delay[2] = 800 + n_A_ActiveSkillLV * 200;
			}
			switch (UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL)) {
				case SERE_SUPPORT_SKILL_ID_AQUA_PLAY:
					wbairitu += ROUNDDOWN(n_A_JobLV / 3);
					break;
				case SERE_SUPPORT_SKILL_ID_COLD_FORCE:
					wbairitu += 75;
					break;
			}
			break;

		// 「マジシャン」スキル「ライトニングボルト」
		case SKILL_ID_LIGHTNING_BOLT:
			n_A_Weapon_zokusei = 4;
			// スペルフィストの中身として呼ばれている場合
			if (battleCalcInfo.parentSkillId == SKILL_ID_SPELL_FIST) {
				// 倍率計算の中の処理を正しく分岐させるために、遠距離判定フラグを調整
				n_Enekyori = 0;
				// ヒット数を 1 に補正
				wHITsuu = 1;
				// 詠唱とディレイを 0 にしておく
				wCast = 0;
				n_Delay[2] = 0;
			}
			// 上記以外の場合
			else {
				wHITsuu = n_A_ActiveSkillLV;
				wCast = 560 * n_A_ActiveSkillLV;
				n_Delay[2] = 800 + n_A_ActiveSkillLV * 200;
			}
			switch (UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL)) {
				case SERE_SUPPORT_SKILL_ID_GUST:
					wbairitu += ROUNDDOWN(n_A_JobLV / 3);
					break;
				case SERE_SUPPORT_SKILL_ID_GRACE_BREEZE:
					wbairitu += 75;
					break;
			}
			break;

		case SKILL_ID_FIRE_BALL:
			n_A_Weapon_zokusei = 3;
			if(n_A_ActiveSkillLV <=5){
				wCast = 1500;
				n_Delay[2] = 1500;
			}else{
				wCast = 150;
				n_Delay[2] = 1000;
			}
			wbairitu = (70 + n_A_ActiveSkillLV * 10) * 2;
			break;

		case SKILL_ID_FIRE_WALL:
			n_A_Weapon_zokusei = 3;
			wHITsuu = 4 + n_A_ActiveSkillLV;
			wCast = 2150 - (n_A_ActiveSkillLV * 150);
			n_Delay[2] = 100;
			wbairitu = 50;
			if(UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL) == 1) wbairitu += ROUNDDOWN(n_A_JobLV / 3);
			break;

		case SKILL_ID_FROST_DIVER:
			n_A_Weapon_zokusei = 1;
			wCast = 800;
			n_Delay[2] = 1500;
			wbairitu = 100 + 10 * n_A_ActiveSkillLV;
			if(UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL) == 10) wbairitu += ROUNDDOWN(n_A_JobLV / 3);
			break;

		case SKILL_ID_THUNDER_STORM:
			n_A_Weapon_zokusei = 4;
			wHITsuu = n_A_ActiveSkillLV;
			wCast = 800 * n_A_ActiveSkillLV;
			n_Delay[2] = 2000;
			wbairitu = 100;
			if(UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL) == 19) wbairitu += ROUNDDOWN(n_A_JobLV / 3);
			break;

		case SKILL_ID_SOUL_STRIKE:
			n_A_Weapon_zokusei = 8;
			wHITsuu = Math.round(n_A_ActiveSkillLV / 2);
			wCast = 500;
			if(n_A_ActiveSkillLV % 2 == 0) n_Delay[2] = 800 + n_A_ActiveSkillLV / 2 * 200;
			else n_Delay[2] = 1000 + (n_A_ActiveSkillLV+1) / 2 * 200;
			break;

		case SKILL_ID_SIGHT_RASHER:
			n_A_Weapon_zokusei = 3;
			wCast = 700;
			n_Delay[2] = 2000;
			wbairitu = 100 + 20 * n_A_ActiveSkillLV;
			break;

		case SKILL_ID_METEOR_STORM:
			wbairitu = 125;
			n_A_Weapon_zokusei = 3;
			if(n_AS_MODE == 0) wHITsuu = Math.round(n_A_ActiveSkillLV / 2) * attackMethodConfArray[0].GetOptionValue(0);
			else wHITsuu = Math.round(n_A_ActiveSkillLV / 2) * (Math.floor(n_A_ActiveSkillLV / 2) + 2);
			wCast = 12000;
			if(n_A_CAST_COMMON == 0) n_Delay[1] = n_Delay[1] / 2;
			n_Delay[2] = Math.floor(n_A_ActiveSkillLV / 2) * 1000 + 2000;
			break;

		case SKILL_ID_JUPITER_THUNDER:
			n_A_Weapon_zokusei = 4;
			wHITsuu = n_A_ActiveSkillLV + 2;
			wCast = 1600 + n_A_ActiveSkillLV * 400;
			break;


		//「ウィザード」スキル「ロードオブヴァーミリオン」
		case SKILL_ID_LORD_OF_VERMILLION:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル設定
			g_bDefinedDamageIntervals = true;
			n_Delay[5] = 1000;	// ダメージ間隔
			n_Delay[6] = 3100;	// オブジェクト存続時間
			n_Delay[3] = 3100;	// 強制ディレイ（オブジェクト発生中は別のLoVオブジェクトのダメージが発生しないため）
			// 属性
			n_A_Weapon_zokusei = g_skillManager.GetElement(battleCalcInfo.skillId);
			// ダメージ倍率
			wbairitu = [0,100,105,115,130,150,175,205,240,280,330][n_A_ActiveSkillLV];
			// 見た目 10 hit * hit数
			wActiveHitNum = 10;
			break;


		case SKILL_ID_WATER_BALL:
		case SKILL_ID_WATER_BALL_FOR_CLONE:
			n_A_Weapon_zokusei = 1;
			if(n_A_ActiveSkillLV >= 4) wHITsuu = 25;
			else if(n_A_ActiveSkillLV >= 2) wHITsuu = 9;
			SG_Special_HITnum = wHITsuu;
			wCast = 1000 * n_A_ActiveSkillLV;
			wbairitu = 100 + 30 * n_A_ActiveSkillLV;
			n_Delay[3] = 0.1 * wHITsuu;
			break;

		case SKILL_ID_FROST_NOVA:
			wbairitu = 100 + 10 * n_A_ActiveSkillLV;
			n_A_Weapon_zokusei = 1;
			wCast = 1000;
			break;

		// 「ウィザード」スキル「ストームガスト」
		case SKILL_ID_STORM_GUST:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[3] = 4500 // 強制ディレイ（オブジェクト発生中は別のSGを重ねられないため）
			// 設置スキル設定
			g_bDefinedDamageIntervals = true;
			n_Delay[5] = 450;	// ダメージ間隔
			// 「3hitで凍った場合のダメージを算出したいニーズ」を切り捨てない苦肉の策でオブジェクト存続時間を調整する
			n_Delay[6] = 450 * attackMethodConfArray[0].GetOptionValue(0);;	// オブジェクト存続時間
			// 属性
			n_A_Weapon_zokusei = g_skillManager.GetElement(battleCalcInfo.skillId);
			// ダメージ倍率
			wbairitu = 70 + 50 * n_A_ActiveSkillLV;
			break;

		// 「ウィザード」スキル「アーススパイク」
		case SKILL_ID_EARTH_SPIKE:
			n_A_Weapon_zokusei = 2;
			wHITsuu = n_A_ActiveSkillLV;
			wCast = 560 * n_A_ActiveSkillLV;
			n_Delay[2] = 800 + 200 * n_A_ActiveSkillLV;
			switch (UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL)) {
				case SERE_SUPPORT_SKILL_ID_PETROLOGY:
					wbairitu += ROUNDDOWN(n_A_JobLV / 3);
					break;
				case SERE_SUPPORT_SKILL_ID_EARTH_CARE:
					wbairitu += 75;
					break;
			}
			break;

		// 「ウィザード」スキル「ヘヴンズドライブ」			
		case SKILL_ID_HEAVENS_DRIVE:
		case SKILL_ID_HEAVENS_DRIVE_FOR_CLONE:
			n_A_Weapon_zokusei = 2;
			wHITsuu = n_A_ActiveSkillLV;
			wbairitu = 125;
			wCast = 1000 * n_A_ActiveSkillLV;
			n_Delay[2] = 1000;
			if(UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL) == SERE_SUPPORT_SKILL_ID_PETROLOGY) {
				wbairitu += ROUNDDOWN(n_A_JobLV / 3);
			}
			break;

		case SKILL_ID_RUWACH:
			n_A_Weapon_zokusei = 6;
			wHITsuu = 1;
			wbairitu = 145;
			if(attackMethodConfArray[0].GetOptionValue(0) == 0) wbairitu = 0;
			break;

		case SKILL_ID_HOLY_LIGHT:
		case SKILL_ID_HOLY_LIGHT_TAMASHI:
			n_A_Weapon_zokusei = 6;
			wCast = 2000;
			wbairitu = 125;
			if(n_A_ActiveSkill==SKILL_ID_HOLY_LIGHT_TAMASHI) wbairitu += 500;
			break;

		// 「プリースト」スキル「マグヌスエクソシズム」
		case SKILL_ID_MAGNUS_EXORCISMUS:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル設定
			g_bDefinedDamageIntervals = true;
			n_Delay[5] = 3000;								// ダメージ間隔
			n_Delay[6] = 4000 + 1000 * n_A_ActiveSkillLV;	// オブジェクト存続時間
			n_Delay[3] = n_Delay[6];						// 複数展開しても多重Hitしないスキル
			// 属性
			n_A_Weapon_zokusei = g_skillManager.GetElement(battleCalcInfo.skillId);
			// ダメージ倍率
			wbairitu = 100;
			// ヒット数
			wHITsuu = n_A_ActiveSkillLV;
			break;

		case SKILL_ID_DARK_STRIKE:
			n_A_Weapon_zokusei = 7;
			wHITsuu = Math.round(n_A_ActiveSkillLV / 2);
			wCast = 500;
			if(n_A_ActiveSkillLV % 2 == 0) n_Delay[2] = 800 + n_A_ActiveSkillLV / 2 * 200;
			else n_Delay[2] = 1000 + (n_A_ActiveSkillLV+1) / 2 * 200;
			break;

		case SKILL_ID_ESTIN:
			n_A_Weapon_zokusei = eval(document.calcForm.A_Weapon_zokusei.value);
			wCast = 100;
			n_Delay[2] = 500;
			if(mobData[17] == 0) wbairitu = 10 * n_A_ActiveSkillLV;
			else wbairitu = 1;
			break;

		case SKILL_ID_ESTON:
			n_A_Weapon_zokusei = eval(document.calcForm.A_Weapon_zokusei.value);
			wCast = 100;
			n_Delay[2] = 500;
			wbairitu = 5 * n_A_ActiveSkillLV;
			break;

		case SKILL_ID_ESMA:
			n_A_Weapon_zokusei = eval(document.calcForm.A_Weapon_zokusei.value);
			n_Delay[0] = 1;
			wHITsuu = n_A_ActiveSkillLV;
			wCast = 2000;
			n_Delay[2] = 500;
			wbairitu = 40 + n_A_BaseLV;
			break;

		case SKILL_ID_KOUENKA:
			n_A_Weapon_zokusei = 3;
			wbairitu = 90;
			if(UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU)==3) wbairitu += 20 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
			wHITsuu = n_A_ActiveSkillLV;
			wCast = 700 * n_A_ActiveSkillLV;
			break;

		case SKILL_ID_KAENZIN:
			n_A_Weapon_zokusei = 3;
			wbairitu = 50;
			if(UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU)==3) wbairitu += 20 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
			wHITsuu = Math.round(n_A_ActiveSkillLV / 2) +4 ;
			wCast = 6500 - 500 * n_A_ActiveSkillLV;
			n_Delay[2] = 1000;
			n_Delay[0] = 1;
			break;

		case SKILL_ID_RYUENZIN:
			n_bunkatuHIT = 1;
			n_A_Weapon_zokusei = 3;
			wbairitu = 150 + 150 * n_A_ActiveSkillLV;
			if(UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU)==3) wbairitu += 100 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
			wHITsuu = 3;
			wCast = 3000;
			n_Delay[2] = 3000;
			break;

		case SKILL_ID_HYOSENSO:
			n_A_Weapon_zokusei = 1;
			wbairitu = 70;
			if(UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU)==1) wbairitu += 20 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
			wHITsuu = n_A_ActiveSkillLV + 2;
			wCast = 700 * n_A_ActiveSkillLV;
			break;

		case SKILL_ID_TSURARAOTOSHI:
			n_A_Weapon_zokusei = 1;
			wbairitu = 150 + 150 * n_A_ActiveSkillLV;
			if(UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU)==1) wbairitu += 100 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
			wHITsuu = 1;
			wCast = 1500 + 500 * n_A_ActiveSkillLV;
			n_Delay[2] = 2000;
			break;

		case SKILL_ID_FUZIN:
			n_A_Weapon_zokusei = 4;
			wbairitu = 150;
			if(UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU)==4) wbairitu += 20 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
			wHITsuu = Math.floor(n_A_ActiveSkillLV / 2) +1;
			wCast = 1000 + 1000 * Math.floor(n_A_ActiveSkillLV / 2);
			break;

		case SKILL_ID_RAIGEKISAI:
			n_A_Weapon_zokusei = 4;
			wbairitu = 100 + 100 * n_A_ActiveSkillLV;
			if(UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU)==4) wbairitu += 20 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
			wHITsuu = 1;
			wCast = 4000;
			break;

		case SKILL_ID_SAKUFU:
			n_A_Weapon_zokusei = 4;
			wbairitu = 100 + 100 * n_A_ActiveSkillLV;
			if(UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU)==4) wbairitu += 100 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
			wHITsuu = 1;
			wCast = 4000;
			break;

		// 「アークビショップ」スキル「ジュデックス」
		case SKILL_ID_JUDEX:
			n_bunkatuHIT = 1;
			wHITsuu = 3;
			n_A_Weapon_zokusei = 6;
			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {
				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE:	// 2024/10/23 YEお試し道場で確認済み
					wbairitu = Math.floor((300 + 40 * n_A_ActiveSkillLV) * (n_A_BaseLV / 100));
					break;
				default:
					wbairitu = 300 + 40 * n_A_ActiveSkillLV;
					wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
					break;
			}
			wCast = 2000;
			break;

		case SKILL_ID_ADORAMUS:
			n_A_Weapon_zokusei = 6;
			wbairitu = Math.floor((500 + 100 * n_A_ActiveSkillLV) * (n_A_BaseLV / 100));
			n_bunkatuHIT = 1;
			wHITsuu = 10;
			wCast = 4000;

			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				n_Delay[7] = 5000 - 500 * n_A_ActiveSkillLV;
				break;

			default:
				n_Delay[7] = 0;
				break;
			}

			break;

		case SKILL_ID_SOUL_EXPANSION:
			n_A_Weapon_zokusei = 8;
			n_bunkatuHIT = 1;
			wHITsuu = 2;
			wCast = 2000;
			n_Delay[2] = 500;
			wbairitu = 400 + 100 * n_A_ActiveSkillLV + n_A_INT;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			break;

		case SKILL_ID_FROST_MISTY:
			n_A_Weapon_zokusei = 1;
			n_bunkatuHIT = 1;
			wHITsuu = 2 + n_A_ActiveSkillLV;
			wCast = 500 + 500 * n_A_ActiveSkillLV;
			n_KoteiCast = 1200 - 200 * n_A_ActiveSkillLV;
			n_Delay[2] = 500;
			n_Delay[7] = 200;
			wbairitu = 200 + 100 * n_A_ActiveSkillLV;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			break;

		case SKILL_ID_JACK_FROST:
			n_A_Weapon_zokusei = 1;
			n_bunkatuHIT = 1;
			wHITsuu = 5;
			n_KoteiCast = 1000;
			wCast = 1000 + 200 * n_A_ActiveSkillLV;
			n_Delay[2] = 500;
			n_Delay[7] = 200;
			if(attackMethodConfArray[0].GetOptionValue(0) == 1){
				wbairitu = 1000 + 300 * n_A_ActiveSkillLV;
				wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			}else{
				wbairitu = 500 + 100 * n_A_ActiveSkillLV;
				wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 150);
			}
			break;

		case SKILL_ID_DRAIN_LIFE:
			n_A_Weapon_zokusei = 0;
			wHITsuu = 1;
			n_KoteiCast = 1000;
			wCast = 4000;
			n_Delay[2] = 0;
			n_Delay[7] = 2000;
			wbairitu = 200 * n_A_ActiveSkillLV + n_A_INT;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			break;

		case SKILL_ID_CRYMSON_ROCK:
			n_A_Weapon_zokusei = 3;
			n_bunkatuHIT = 1;
			wHITsuu = 7;
			n_KoteiCast = 500;
			wCast = 1000 + 200 * n_A_ActiveSkillLV;
			n_Delay[2] = 500;
			n_Delay[7] = 2000;
			wbairitu = 300 * n_A_ActiveSkillLV;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			wbairitu += 1300;
			break;

		case SKILL_ID_COMMET:
			n_A_Weapon_zokusei = 0;
			n_bunkatuHIT = 1;
			wHITsuu = 20;
			n_KoteiCast = 1500 + 500 * n_A_ActiveSkillLV;
			wCast = 8500 + 1500 * n_A_ActiveSkillLV;
			n_Delay[2] = 2000;
			n_Delay[7] = 120000;

			var wDistance = attackMethodConfArray[0].GetOptionValue(0);

			switch (wDistance) {

			case 0:
				wbairitu = 2500 + 500 * n_A_ActiveSkillLV;
				break;

			case 1:
				wbairitu = 1600 + 400 * n_A_ActiveSkillLV;
				break;

			case 2:
				wbairitu = 1200 + 300 * n_A_ActiveSkillLV;
				break;

			case 3:
				wbairitu = 800 + 200 * n_A_ActiveSkillLV;
				break;

			case 4:	// 協力発動
				wbairitu = Math.floor(2500 + 400 * n_A_ActiveSkillLV * n_A_BaseLV / 120);
				break;
			}
			break;

		case SKILL_ID_EARTH_STRAIN:
			n_A_Weapon_zokusei = 2;
			n_bunkatuHIT = 1;
			wHITsuu = 2;
			wCast = 1500 + 500 * n_A_ActiveSkillLV;
			n_KoteiCast = 500;
			n_Delay[2] = 500;
			n_Delay[7] = 600 * n_A_ActiveSkillLV;
			wbairitu = 2000 + 100 * n_A_ActiveSkillLV;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			break;

		case SKILL_ID_SUMMON_FIRE_BALL:
		case SKILL_ID_SUMMON_WATER_BALL:
		case SKILL_ID_SUMMON_LIGHTNING_BALL:
		case SKILL_ID_SUMMON_STONE:
			if(n_A_ActiveSkill == SKILL_ID_SUMMON_FIRE_BALL) n_A_Weapon_zokusei = 3;
			if(n_A_ActiveSkill == SKILL_ID_SUMMON_WATER_BALL) n_A_Weapon_zokusei = 1;
			if(n_A_ActiveSkill == SKILL_ID_SUMMON_LIGHTNING_BALL) n_A_Weapon_zokusei = 4;
			if(n_A_ActiveSkill == SKILL_ID_SUMMON_STONE) n_A_Weapon_zokusei = 2;
			wHITsuu = attackMethodConfArray[0].GetOptionValue(0);
			wCast = 6000 - 1000 * n_A_ActiveSkillLV;

			wbairitu = (n_A_BaseLV + n_A_JobLV) * Math.round(n_A_ActiveSkillLV / 2);
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			break;

		// メタリックサウンド
		case SKILL_ID_METALIC_SOUND:
			n_A_Weapon_zokusei = 0;
			n_bunkatuHIT = 1;
			wCast = Math.min(3000, 500 + 500 * n_A_ActiveSkillLV);
			n_Delay[7] = 200;

			// 基本倍率
			wbairitu = 120 * n_A_ActiveSkillLV

			// サウンドブレンド補正
			if (n_B_IJYOU[MOB_CONF_DEBUF_ID_SOUND_BLEND] > 0) {
				wbairitu *= 2;
			}

			// レッスン補正
			wbairitu += 60 * UsedSkillSearch(SKILL_ID_LESSON);

			// BaseLv補正
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);

			// 睡眠補正
			if(n_B_IJYOU[MOB_CONF_DEBUF_ID_SUIMIN]) {
				wbairitu = ROUNDDOWN(wbairitu * 150 / 100);
			}

			break;

		case SKILL_ID_FIRE_WALK:
		case SKILL_ID_ELECTRIC_WALK:
			if(n_A_ActiveSkill==SKILL_ID_FIRE_WALK) n_A_Weapon_zokusei = 3;
			else n_A_Weapon_zokusei = 4;
			wHITsuu = attackMethodConfArray[0].GetOptionValue(0);
			wCast = 1000;
			n_Delay[0] = 1;
			n_Delay[2] = 1000;
			wbairitu = 60 * n_A_ActiveSkillLV;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			if(n_A_ActiveSkill==SKILL_ID_FIRE_WALK && UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL) == 4) {
				wbairitu += ROUNDDOWN(n_A_JobLV / 2);
			}
			if(n_A_ActiveSkill==SKILL_ID_ELECTRIC_WALK && UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL) == 22) {
				wbairitu += ROUNDDOWN(n_A_JobLV / 2);
			}
			break;

		// 「ソーサラー」スキル「サイキックウェーブ」
		case SKILL_ID_PSYCHIC_WAVE:

			g_bDefinedDamageIntervals = true;

			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);//2750 + 1250 * n_A_ActiveSkillLV;
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);//2250 - 250 * n_A_ActiveSkillLV;
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);//1000
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);//5000

			// ダメージ間隔
			n_Delay[5] = 500;

			// オブジェクト存続時間
			n_Delay[6] = 1000 + (n_A_ActiveSkillLV * 500);

			// 属性の設定
			if(n_AS_MODE == 0) n_A_Weapon_zokusei = attackMethodConfArray[0].GetOptionValue(0);
			else n_A_Weapon_zokusei = 0;

			wbairitu = 70 * n_A_ActiveSkillLV + 3 * n_A_INT;

			// ベースレベル補正
			wbairitu *= n_A_BaseLV / 100;
			wbairitu = ROUNDDOWN(wbairitu);
			break;

		//「ソーサラー」スキル「クラウドキル」
		case SKILL_ID_CLOUD_KILL:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル設定
			g_bDefinedDamageIntervals = true;
			n_Delay[5] = 500;								// ダメージ間隔
			n_Delay[6] = 6000 + 2000 * n_A_ActiveSkillLV;	// オブジェクト存続時間
			n_Delay[3] = n_Delay[6]; 						// 重複設置はできない
			// 属性
			n_A_Weapon_zokusei = g_skillManager.GetElement(battleCalcInfo.skillId);
			// ダメージ倍率
			wbairitu = 40 * n_A_ActiveSkillLV;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			// 精霊補正
			switch (UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL)) {
				case SERE_SUPPORT_SKILL_ID_CURSED_SOIL:
					wbairitu += n_A_JobLV;
					break;
				case SERE_SUPPORT_SKILL_ID_DEEP_POISONING:
					wbairitu += 200;
					break;
			}				
			break;

		case SKILL_ID_POISON_BUSTER:
			n_A_Weapon_zokusei = 5;
			n_KoteiCast = 1750 - 250 * n_A_ActiveSkillLV;
			wCast = 1250 * n_A_ActiveSkillLV - 750;
			n_Delay[2] = 1000;
			n_Delay[7] = 2000;
			wbairitu = 1000 + 300 * n_A_ActiveSkillLV;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 120);
			if(UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL) == 31) wbairitu += ROUNDDOWN(n_A_JobLV * 5);
			break;

		case SKILL_ID_EARTH_GRAVE:
			n_A_Weapon_zokusei = 2;
			n_bunkatuHIT = 1;
			wHITsuu = 3;
			n_KoteiCast = 2000 - 200 * n_A_ActiveSkillLV;
			wCast = 2000 + 200 * n_A_ActiveSkillLV;
			n_Delay[2] = 1000;
			n_Delay[7] = 5000;
			var subnumvalue = attackMethodConfArray[0].GetOptionValue(0);
			wbairitu = 200 * subnumvalue + n_A_INT * n_A_ActiveSkillLV;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			if(UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL) == 31) wbairitu += ROUNDDOWN(n_A_JobLV * 5);
			break;

		case SKILL_ID_DIAMOND_DUST:
			n_A_Weapon_zokusei = 1;
			n_bunkatuHIT = 1;
			wHITsuu = 5;
			wCast = 2000 + 200 * n_A_ActiveSkillLV;
			n_KoteiCast = 2000 - 200 * n_A_ActiveSkillLV;
			n_Delay[2] = 1000;
			n_Delay[7] = 5000;
			wbairitu = 200 * attackMethodConfArray[0].GetOptionValue(0) + n_A_INT * n_A_ActiveSkillLV;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			if(UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL) == 13) wbairitu += ROUNDDOWN(n_A_JobLV * 5);
			break;

		// 「ジェネティック」スキル「デモニックファイアー」
		case SKILL_ID_DEMONIC_FIRE:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル設定
			g_bDefinedDamageIntervals = true;
			n_Delay[5] = 2000;								// ダメージ間隔
			n_Delay[6] = 8001 + 2000 * n_A_ActiveSkillLV;	// オブジェクト存続時間 8000 だと発動回数が現実と合わないため 8001
			n_Delay[3] = n_Delay[6]; 						// 現実的な状況では重複設置はできない
			// 属性
			n_A_Weapon_zokusei = g_skillManager.GetElement(battleCalcInfo.skillId);
			// ダメージ倍率
			wbairitu = 200 * n_A_ActiveSkillLV;
			break;

		// 「アークビショップ」スキル「ミリアムライト」
		case SKILL_ID_MIRIAM_LIGHT:
			n_A_Weapon_zokusei = 0;
			wbairitu = 200 + 20 * n_A_ActiveSkillLV;
			break;

		case SKILL_ID_SHIELD_SPELL_LV_2:
			n_A_Weapon_zokusei = 6;
			wCast = 1000;
			n_Delay[0] = 1;
			n_Delay[2] = 1000;
			n_Delay[7] = 2000;
			var wX = 0;
			for(var i=ITEM_DATA_INDEX_SPBEGIN;ItemObjNew[n_A_Equip[EQUIP_REGION_ID_SHIELD]][i] != 0;i += 2) if(ItemObjNew[n_A_Equip[EQUIP_REGION_ID_SHIELD]][i] == 19) wX += ItemObjNew[n_A_Equip[EQUIP_REGION_ID_SHIELD]][i+1];
			wbairitu = n_A_BaseLV * 4 + wX * 100 + n_A_INT * 2;
			break;

		case SKILL_ID_ZYUTSUSHIKI_KAIHO:
			n_A_Weapon_zokusei = UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU);
			wbairitu = 200 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);
			break;

		// 「サモナー」スキル「マタタビランス」
		case SKILL_ID_MATATABI_LANCE:
			// レベルによって属性が変化する
			n_A_Weapon_zokusei = ELM_ID_PSYCO;
			switch (n_A_ActiveSkillLV) {
			case 1:
				break;
			case 2:
				n_A_Weapon_zokusei = ELM_ID_WATER;
				break;
			case 3:
				n_A_Weapon_zokusei = ELM_ID_WIND;
				break;
			case 4:
				n_A_Weapon_zokusei = ELM_ID_EARTH;
				break;
			case 5:
				n_A_Weapon_zokusei = ELM_ID_FIRE;
				break;
			}

			wbairitu = 5000;
			wCast = 2000;
			n_Delay[2] = 0;
			n_Delay[7] = 0;
			break;

		case SKILL_ID_INUHAKKA_METEOR:
//			wActiveHitNum = 7;	// 分割ダメージを削除

			// スピリットハンドラーのレインボーホーン追加に伴い任意の属性を取れるように変更
			if (attackMethodConfArray[0].optionValueArray.length == 1) {
				// 属性未定義の場合
				n_A_Weapon_zokusei = ELM_ID_VANITY;
			} else {
				n_A_Weapon_zokusei = attackMethodConfArray[0].GetOptionValue(1);
			};

//			wbairitu = 700;		// 旧仕様
			wbairitu = 400;		// 新仕様
			if(n_A_BaseLV >= 100) {
				// Base100以上の場合BaseLvが影響するように変更
				wbairitu = wbairitu * (n_A_BaseLV / 100);
			}
			wHITsuu = attackMethodConfArray[0].GetOptionValue(0) / 2;
			wCast = 2000;
			n_Delay[2] = 3000;
			var aDelay = [1000, 500, 500, 0, 0];
			n_Delay[7] = aDelay[n_A_ActiveSkillLV - 1];
			break;

		case SKILL_ID_VERATURE_SPEAR:
			wCast = Math.min(3000, 2000 + 200 * n_A_ActiveSkillLV);
			n_KoteiCast = Math.max(1000, 2000 - 200 * n_A_ActiveSkillLV);
			n_Delay[2] = 1000;
			n_Delay[7] = 2000;
			n_A_Weapon_zokusei = 4;

			n_bunkatuHIT = 1;
			wHITsuu = 3;

			var subnumvalue = attackMethodConfArray[0].GetOptionValue(0);
			var subnumvalue2 = attackMethodConfArray[0].GetOptionValue(1);
			wbairitu = ROUNDDOWN((120 * (subnumvalue + subnumvalue2) + n_A_INT * (n_A_ActiveSkillLV / 2)) * n_A_BaseLV / 100);

			if(UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL) == 22) wbairitu += ROUNDDOWN(n_A_JobLV * 5);

			break;

		case SKILL_ID_RAY_OF_GENESIS:
			wCast = 2000;
			n_Delay[2] = 1000;
			wbairitu = 200 * n_A_ActiveSkillLV;
			wbairitu = ROUNDDOWN(wbairitu * n_A_BaseLV / 100);

			n_bunkatuHIT = 1;
			wHITsuu = 7;

			break;

		case SKILL_ID_ESHA:
			n_A_Weapon_zokusei = eval(document.calcForm.A_Weapon_zokusei.value);
			wCast = 200 * n_A_ActiveSkillLV;
			n_KoteiCast = 200 * n_A_ActiveSkillLV;
			n_Delay[7] = 1000;
			wbairitu = 2000 + (100 * n_A_ActiveSkillLV);

			break;

		case SKILL_ID_ESPA:
			n_A_Weapon_zokusei = eval(document.calcForm.A_Weapon_zokusei.value);
			wCast = 100 * n_A_ActiveSkillLV;
			n_KoteiCast = 100 * n_A_ActiveSkillLV;
			wbairitu = 500 + (250 * n_A_ActiveSkillLV);
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);

			break;

		case SKILL_ID_ESFU:
			n_bunkatuHIT = 1;
			wHITsuu = 5;
			n_A_Weapon_zokusei = eval(document.calcForm.A_Weapon_zokusei.value);
			wCast = 100 * n_A_ActiveSkillLV;
			n_KoteiCast = 100 * n_A_ActiveSkillLV;
			wbairitu = 1500 + (250 * n_A_ActiveSkillLV);
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);

			break;

		case SKILL_ID_SHIRYO_BAKUHATSU:
			n_bunkatuHIT = 1;
			wHITsuu = 7;
			n_A_Weapon_zokusei = ELM_ID_DARK;
			wCast = 2000;
			n_Delay[2] = 1000;
			n_Delay[7] = 1000;
			if (n_B_IJYOU[MOB_CONF_DEBUF_ID_SHIRYO_HYOI]) {
				wbairitu = 2500 + (250 * n_A_ActiveSkillLV);
			}
			else {
				wbairitu = 2300 + (50 * n_A_ActiveSkillLV);
			}
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);

			break;





		//----------------------------------------------------------------
		//
		// 四次ここから
		//
		//----------------------------------------------------------------

		// 「カーディナル」スキル「アルビトリウム」
		// 2024/10/23 誤差無しを確認
		case SKILL_ID_ARBITRIUM:
			// 初段ＨＩＴの場合
			if (battleCalcInfo.parentSkillId === undefined) {
				// 詠唱時間等
				wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 基本倍率
				wbairitu = 50 * n_A_ActiveSkillLV;
				// フィドスアニムス補正
				wbairitu += 4 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_FIDOS_ANIMUS);
				// SPL補正
				wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// 追撃として呼ばれている場合
			else {
				// 基本倍率
				wbairitu = (450 * n_A_ActiveSkillLV);
				// フィドスアニムス補正
				wbairitu += 30 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_FIDOS_ANIMUS);
				// SPL補正
				wbairitu += 25 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「カーディナル」スキル「ニューマティックプロセラ」
		// 2024/10/23 YE鯖で無形に対する誤差+1を確認
		// 分散hit計算周りの丸め誤差と判断しています
		// 不死・悪魔は未確認なので確認次第 △ → ◯ へ
		case SKILL_ID_NUMATIC_PROCERA:
			// TODO: 詠唱時間等未実測スキル
			g_bDefinedDamageIntervals = true;
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// オブジェクト存続時間
			n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ間隔
			n_Delay[5] = 3000;
			// 不死・悪魔の場合
			if (mobData[MONSTER_DATA_INDEX_RACE] == RACE_ID_UNDEAD || mobData[MONSTER_DATA_INDEX_RACE] == RACE_ID_DEMON) {
				// 基本倍率
				wbairitu = 6000 + 1500 * n_A_ActiveSkillLV;
				// フィドスアニムス補正
				wbairitu += 5 * UsedSkillSearch(SKILL_ID_FIDOS_ANIMUS);
				// SPL補正
				wbairitu += 70 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// それ以外の場合
			else {
				// 基本倍率
				wbairitu = 5500 + 1250 * n_A_ActiveSkillLV;
				// フィドスアニムス補正
				wbairitu += 3 * UsedSkillSearch(SKILL_ID_FIDOS_ANIMUS);
				// SPL補正
				wbairitu += 60 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// 見た目10hitで最大40hit
			wActiveHitNum = 10;
			break;

		// 「カーディナル」スキル「フレーメン」
		// 2024/10/23 無形に対するダメージ誤差無しを確認
		// 不死・悪魔の実測が済み次第 △ → ◯ へ
		// 参考: ragna-promenade 様
		case SKILL_ID_PHREMEN:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 不死・悪魔の場合
			if (mobData[MONSTER_DATA_INDEX_RACE] == RACE_ID_UNDEAD || mobData[MONSTER_DATA_INDEX_RACE] == RACE_ID_DEMON) {
				// 基本倍率
				wbairitu = (900 * n_A_ActiveSkillLV);
				// フィドスアニムス補正
				wbairitu += 60 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_FIDOS_ANIMUS);
				// SPL補正
				wbairitu += 50 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// それ以外の場合
			else {
				// 基本倍率
				wbairitu = (600 * n_A_ActiveSkillLV);
				// フィドスアニムス補正
				wbairitu += 30 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_FIDOS_ANIMUS);
				// SPL補正
				wbairitu += 30 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「アークメイジ」スキル「デッドリープロジェクション」
		case SKILL_ID_DEADLY_PROJECTION:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			wbairitu = 2000 + 500 * n_A_ActiveSkillLV;
			// SPL補正
			wbairitu += 15 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「アークメイジ」スキル「ディストラクティブハリケーン」
		case SKILL_ID_DESTRACTIVE_HURRICANE:
			// 初段ＨＩＴの場合
			if (battleCalcInfo.parentSkillId === undefined) {
				// 詠唱時間等
				wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 基本倍率
				wbairitu = 8500 + 2500 * n_A_ActiveSkillLV;
				// SPL補正
				wbairitu += 70 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				// ベースレベル補正
				wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			}
			// 追撃の場合
			else {
				// SPL補正とベースレベル補正は乗らない
				wbairitu = 5000;
			}
			// ダメージ増幅
			switch (UsedSkillSearch(SKILL_ID_CLIMAX)) {
				case 3:
					battleCalcInfo.dmgAmpRate += 100;
					break;
				case 5:
					battleCalcInfo.dmgAmpRate += 50;
					break;
				case 4:
					g_bSkillNoDamage = true;
			}
			break;

		// 「アークメイジ」スキル「レインオブクリスタル」
		case SKILL_ID_RAIN_OF_CRYSTAL:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			g_bDefinedDamageIntervals = true;
			// オブジェクト存続時間
			n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ間隔
			n_Delay[5] = 500;
			// 基本倍率
			wbairitu = 2000 + 200 * n_A_ActiveSkillLV;
			// SPL補正
			wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「アークメイジ」スキル「ミステリーイリュージョン」
		case SKILL_ID_MYSTERY_ILLUSION:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			g_bDefinedDamageIntervals = true;
			// オブジェクト存続時間
			n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ間隔
			n_Delay[5] = 300;
			// 基本倍率
			wbairitu = 900 + 300 * n_A_ActiveSkillLV;
			// SPL補正
			wbairitu += 8 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「アークメイジ」スキル「バイオレントクエイク」
		case SKILL_ID_VIOLENT_QUAKE:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// オブジェクト存続時間
			n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ間隔
			n_Delay[5] = 300;
			g_bDefinedDamageIntervals = true;
			// 基本倍率
			wbairitu = 2000 + 200 * n_A_ActiveSkillLV;
			// SPL補正
			wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// ダメージ増幅
			switch (UsedSkillSearch(SKILL_ID_CLIMAX)) {
				case 1:
					battleCalcInfo.dmgAmpRate -= 50;
					break;
				case 3:
					battleCalcInfo.dmgAmpRate += 50;
					break;
				case 4:
					g_bSkillNoDamage = true;
				}
			break;

		// 「アークメイジ」スキル「ソウルバルカンストライク」
		case SKILL_ID_SOUL_VULKUN_STRIKE:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			wbairitu = 350 + 50 * n_A_ActiveSkillLV;
			// SPL補正
			wbairitu += 2 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// ヒット数
			wHITsuu = 2 + n_A_ActiveSkillLV;
			break;

		// 「アークメイジ」スキル「ストラタムトレマー」
		case SKILL_ID_STRATUM_TREAMER:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// オブジェクト存続時間
			n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ間隔
			n_Delay[5] = 300;
			g_bDefinedDamageIntervals = true;
			// 基本倍率
			wbairitu = 900 + 300 * n_A_ActiveSkillLV;
			// SPL補正
			wbairitu += 8 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// 分割Hit数
			wActiveHitNum = 2;
			break;

		// 「アークメイジ」スキル「オールブルーム」
		case SKILL_ID_ALL_BLOOM:
			// クライマックスLv
			const climaxLv = UsedSkillSearch(SKILL_ID_CLIMAX);
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 追撃ダメージを確認する場合
			if (climaxLv == 5 && attackMethodConfArray[0].GetOptionValue(0) == 1) {
				// 基本倍率
				wbairitu = 25000 + 5000 * n_A_ActiveSkillLV;
			}
			// 設置ダメージを確認する場合
			else {
				g_bDefinedDamageIntervals = true;
				// オブジェクト存続時間
				n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// ダメージ間隔
				if (climaxLv == 1) {
					n_Delay[5] = 150;
				} else {
					n_Delay[5] = 300;
				}
				// 基本倍率
				wbairitu = 2000 + 200 * n_A_ActiveSkillLV;
				// SPL補正
				wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				// ベースレベル補正
				wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
				// ダメージ増幅
				switch (climaxLv) {
					case 2:
						battleCalcInfo.dmgAmpRate -= 50;
						break;
					case 3:
						battleCalcInfo.dmgAmpRate += 50;
						break;
					case 4:
						g_bSkillNoDamage = true;
				}
			}
			break;

		// 「アークメイジ」スキル「クリスタルインパクト」
		case SKILL_ID_CRYSTAL_IMPACT:
			// クライマックス状態のレベルを取得
			sklLvSub = UsedSkillSearch(SKILL_ID_CLIMAX);
			// 初撃の場合
			if (battleCalcInfo.parentSkillId === undefined) {
				// 詠唱時間等
				wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 基本倍率
				wbairitu = 8500 + 2500 * n_A_ActiveSkillLV;
				// SPL補正
				wbairitu += 70 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				// クライマックス効果 Lv2, 3 は追撃部分に掛からない
				switch (sklLvSub) {
					case 2:
						// ヒット数増加
						wHITsuu = 2;
						break;
					case 3:
						// ダメージ増幅
						battleCalcInfo.dmgAmpRate += 50;
						break;
					}
			}
			// 追撃の場合
			else {
				// 基本倍率
				wbairitu = 100;
				// SPL補正
				wbairitu += 1 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				// クライマックス効果 Lv4 は初撃部分に掛からない
				if (sklLvSub == 4) {
					battleCalcInfo.dmgAmpRate += 5000;
				}
			}
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「アークメイジ」スキル「トルネードストーム」
		case SKILL_ID_TORNADE_STORM:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			g_bDefinedDamageIntervals = true;
			// オブジェクト存続時間
			n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ間隔
			n_Delay[5] = 300;
			// 基本倍率
			wbairitu = 900 + 300 * n_A_ActiveSkillLV;
			// SPL補正
			wbairitu += 8 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「アークメイジ」スキル「フローラルフレアロード」
		case SKILL_ID_FLORAL_FLARE_ROAD:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			g_bDefinedDamageIntervals = true;
			// オブジェクト存続時間
			n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ間隔
			n_Delay[5] = 300;
			// 基本倍率
			wbairitu = 900 + 300 * n_A_ActiveSkillLV;
			// SPL補正
			wbairitu += 8 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「アークメイジ」スキル「アストラルストライク」
		case SKILL_ID_ASTRAL_STRIKE:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 初段ダメージの場合
			if (attackMethodConfArray[0].GetOptionValue(0) == 0) {
				// 基本倍率
				wbairitu = 7000 + 2000 * n_A_ActiveSkillLV;
				// SPL補正
				wbairitu += 90 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// 設置持続ダメージの場合
			else {
				g_bDefinedDamageIntervals = true;
				// オブジェクト存続時間
				n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// ダメージ間隔
				n_Delay[5] = 300;
				// 基本倍率
				wbairitu = 1500 + 150 * n_A_ActiveSkillLV;
				// SPL補正
				if (n_A_ActiveSkillLV <= 5) {
					wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				} else {
					wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				}
			}
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「アークメイジ」スキル「ロックダウン」
		case SKILL_ID_ROCK_DOWN:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// クライマックス時
			if (UsedSkillSearch(SKILL_ID_CLIMAX) > 0) {
				// 基本倍率
				wbairitu = 6000 + 1500 * n_A_ActiveSkillLV;
				// SPL補正
				wbairitu += 45 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// 通常時
			else {
				// 基本倍率
				wbairitu = 4250 + 1250 * n_A_ActiveSkillLV;
				// SPL補正
				wbairitu += 35 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// 分割Hit
			wActiveHitNum = 5;
			break;

		// 「アークメイジ」スキル「ストームキャノン」
		case SKILL_ID_STORM_CANNON:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// クライマックス時
			if (UsedSkillSearch(SKILL_ID_CLIMAX) > 0) {
				// 基本倍率
				wbairitu = 6000 + 1500 * n_A_ActiveSkillLV;
				// SPL補正
				wbairitu += 45 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// 通常時
			else {
				// 基本倍率
				wbairitu = 4250 + 1250 * n_A_ActiveSkillLV;
				// SPL補正
				wbairitu += 35 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		//「アークメイジ」スキル「クリムゾンアロー」
		case SKILL_ID_CRYMSON_ARROW:
			// 初段ＨＩＴの場合
			if (battleCalcInfo.parentSkillId === undefined) {
				// 詠唱時間等
				wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 基本倍率
				wbairitu = 100 * n_A_ActiveSkillLV;
				// SPL補正
				wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// 追撃の場合
			else {
				// 基本倍率
				wbairitu = 1500 + 500 * n_A_ActiveSkillLV;
				// SPL補正
				wbairitu += 15 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				// 攻撃回数
				if (UsedSkillSearch(SKILL_ID_CLIMAX) > 0) {
					wHITsuu = 3;
				} else {
					wHITsuu = 2;
				}
			}
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		//「アークメイジ」スキル「フローズンスラッシュ」
		case SKILL_ID_FROZEN_SLASH:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// クライマックス時
			if (UsedSkillSearch(SKILL_ID_CLIMAX) > 0) {
				// 基本倍率
				wbairitu = 6000 + 1500 * n_A_ActiveSkillLV;
				// SPL補正
				wbairitu += 45 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// 通常時
			} else {
				// 基本倍率
				wbairitu = 4250 + 1250 * n_A_ActiveSkillLV;
				// SPL補正
				wbairitu += 35 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「インペリアルガード」スキル「ジャッジメントクロス」
		case SKILL_ID_JUDGEMENT_CROSS:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			wbairitu = 7000 + 2000 * n_A_ActiveSkillLV;
			// SPL補正 (2025/01/12 未確認)
			wbairitu += 60 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// 見た目10hit
			wActiveHitNum = 10;
			break;

		// 「インペリアルガード」スキル「クロスレイン」
		case SKILL_ID_CROSS_RAIN:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル
			g_bDefinedDamageIntervals = true;
			// ダメージ間隔
			n_Delay[5] = 300;
			// オブジェクト存続時間
			n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// スキル倍率
			if (UsedSkillSearch(SKILL_ID_HOLY_SHIELD) > 0) {
				// ホーリーシールド有り
				wbairitu = 150 * n_A_ActiveSkillLV;
				wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				wbairitu += 15 * UsedSkillSearch(SKILL_ID_YARI_KATATE_KEN_SHUREN);
			}
			else {
				// 通常時 (2025/01/12 未確認)
				wbairitu = 120 * n_A_ActiveSkillLV;
				wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);	
				wbairitu += 5 * UsedSkillSearch(SKILL_ID_YARI_KATATE_KEN_SHUREN);
			}
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「アビスチェイサー」スキル「フロムジアビス」
		// 2024/10/24 提供データとのほぼ誤差無しを確認
		// 誤差無し、無し、無し、+3誤差、無し、無し、無し、+2誤差、・・・という感じで最大 +4 までズレてくる
		// 誤差が拡大する方向ではなく通常鯖での1桁以内の誤差なのでスキル計算式そのものは合っていると判断
		case SKILL_ID_FROM_THE_ABYSS:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			wbairitu = 1500 + 1500 * n_A_ActiveSkillLV;
			// SPL補正
			wbairitu += 30 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「アビスチェイサー」スキル「オメガアビスストライク」
		// 2024/10/24 提供データとのほぼ誤差無しを確認済み
		// 誤差無し、無し、無し、+3誤差、無し、無し、無し、+2誤差、・・・という感じで最大 +4 までズレてくる
		// 誤差が拡大する方向ではなく通常鯖での1桁以内の誤差なのでスキル計算式そのものは合っていると判断
		case SKILL_ID_OMEGA_ABYSS_STRIKE:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			wbairitu = 7000 + 2000 * n_A_ActiveSkillLV;
			// SPL補正
			wbairitu += 90 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「アビスチェイサー」スキル「アビススクエア」
		// 2024/10/24 提供データとのほぼ誤差無しを確認済み
		// 誤差無し、無し、無し、+3誤差、無し、無し、無し、+2誤差、・・・という感じで最大 +4 までズレてくる
		// 誤差が拡大する方向ではなく通常鯖での1桁以内の誤差なのでスキル計算式そのものは合っていると判断
		// 参考: ragna-promenade様
		case SKILL_ID_ABYSS_SQUARE:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// オブジェクト存続時間
			n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ間隔
			n_Delay[5] = 300;
			g_bDefinedDamageIntervals = true;
			// 基本倍率
			wbairitu = 150 * n_A_ActiveSkillLV;
			// SPL補正
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// 魔法剣修練補正
			wbairitu += 15 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_MAHOKEN_SHUREN);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// 攻撃回数
			if (attackMethodConfArray[0].GetOptionValue(0) >= 1) {
				wHITsuu = 2;
			}
			break;

		// 「トルバドゥール・トルヴェール」スキル「メタリックフューリー」
		// 「ステージマナー」の習得レベルが5の時はこの計算式で誤差無しになります
		// それ以外の場合は誤差があるので修正が必要です
		case SKILL_ID_METALIC_FURY:
			// 楽器・鞭装備状態のみ発動可能
			if (![ITEM_KIND_MUSICAL, ITEM_KIND_WHIP].includes(n_A_WeaponType)) {
				wbairitu = 0;
				n_Buki_Muri = 1;
				break;
			}
			// 属性自動矢
			if(n_A_Arrow == ARROW_ID_ZOKUSE_ZIDO_YA_ATK30){
				n_A_Weapon_zokusei = mostEffectiveElmIdArray[ Math.floor(mobData[MONSTER_DATA_INDEX_ELEMENT] / 10) ];
			}
			// 通常の矢
			else {
				n_A_Weapon_zokusei = GetEquippedTotalSPArrow(ITEM_SP_ELEMENTAL);
			}
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			wbairitu = 1250 + (350 * n_A_ActiveSkillLV);
			// SPL補正
			wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// サウンドブレンド補正
			if (n_B_IJYOU[MOB_CONF_DEBUF_ID_SOUND_BLEND]) {
				wbairitu += 2750 + (650 * n_A_ActiveSkillLV);
				// SPL補正
				wbairitu += 20 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// ベースレベル補正
			wbairitu =  Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「トルバドゥール・トルヴェール」スキル「サウンドブレンド」
		// 「ステージマナー」の習得レベルが5の時はこの計算式で誤差無しになります
		// それ以外の場合は誤差があるので修正が必要です
		case SKILL_ID_SOUND_BLEND:
			// 楽器・鞭装備状態のみ発動可能
			if (![ITEM_KIND_MUSICAL, ITEM_KIND_WHIP].includes(n_A_WeaponType)) {
				wbairitu = 0;
				n_Buki_Muri = 1;
				break;
			}
			// 属性自動矢
			if(n_A_Arrow == ARROW_ID_ZOKUSE_ZIDO_YA_ATK30){
				n_A_Weapon_zokusei = mostEffectiveElmIdArray[ Math.floor(mobData[MONSTER_DATA_INDEX_ELEMENT] / 10) ];
			}
			// 通常の矢
			else {
				n_A_Weapon_zokusei = GetEquippedTotalSPArrow(ITEM_SP_ELEMENTAL);
			}
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 持続時間が終了した時点でダメージが発生するので擬似的に設置スキルとして扱う
			g_bDefinedDamageIntervals = true;
			// 持続時間
			n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ発生間隔
			n_Delay[5] = n_Delay[6] - 200;
			// 基本倍率
			wbairitu = 2000 + (500 * n_A_ActiveSkillLV);
			// SPL補正
			wbairitu += 15 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;


		// 「エレメンタルマスター」スキル「ダイヤモンドストーム」
		case SKILL_ID_DIAMOND_STORM:
			// 2024/08/27 実測
			// 1～3程度の誤差が残りますが本計算式の問題ではなく後続の共通計算式の丸め誤差と考えています
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ倍率
			if (UsedSkillSearch(SKILL_ID_SERE) == 14) { // 14: 水 ディルビオ
				// 四次精霊あり
				wbairitu = [0,4500,6300,8400,10800,13500][n_A_ActiveSkillLV];
				wbairitu += 45 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			} else {
				// 四次精霊なし
				wbairitu = [0,4500,5250,6000,6750,7500][n_A_ActiveSkillLV];
				wbairitu += 25 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// ベースレベル補正
			wbairitu *= n_A_BaseLV / 100;
			break;

		// 「エレメンタルマスター」スキル「テラドライブ」
		case SKILL_ID_TERA_DRIVE:
			// 2024/08/27 実測
			// 1～3程度の誤差が残りますが本計算式の問題ではなく後続の共通計算式の丸め誤差と考えています
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ倍率
			if (UsedSkillSearch(SKILL_ID_SERE) == 16) {	// 16: 地 テレモトゥス
				// 四次精霊あり
				wbairitu = [0,4500,6300,8400,10800,13500][n_A_ActiveSkillLV];
				wbairitu += 45 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			} else {
				// 四次精霊なし
				wbairitu = [0,4500,5250,6000,6750,7500][n_A_ActiveSkillLV];
				wbairitu += 25 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// ベースレベル補正
			wbairitu *= n_A_BaseLV / 100;
			break;
			
		//「エレメンタルマスター」スキル「ライトニングランド」
		case SKILL_ID_LIGHTNING_LAND:
			// 2024/08/27 実測
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル
			g_bDefinedDamageIntervals = true;
			n_Delay[5] = 300;	// ダメージ間隔
			n_Delay[6] = 3000;	// オブジェクト存続時間
			// ダメージ倍率
			if (UsedSkillSearch(SKILL_ID_SERE) == 15) {	// 15: 風 プロセラ
				// 四次精霊あり
				wbairitu = [0,1400,1800,2200,2600,3000][n_A_ActiveSkillLV];
				wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			} else {
				// 四次精霊なし
				wbairitu = [0,1200,1500,1800,2100,2400][n_A_ActiveSkillLV];
				wbairitu += 8 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// ベースレベル補正
			wbairitu *= n_A_BaseLV / 100;
			break;
			
		//「エレメンタルマスター」スキル「コンフラグレーション」
		case SKILL_ID_CONFLAGRATION:
			// 2024/08/27 実測
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル
			g_bDefinedDamageIntervals = true;
			n_Delay[5] = 300;	// ダメージ間隔
			n_Delay[6] = 3000;	// オブジェクト存続時間
			// ダメージ倍率
			if (UsedSkillSearch(SKILL_ID_SERE) == 13) {	// 13: 火 アルドール
				// 四次精霊あり
				wbairitu = [0,1400,1800,2200,2600,3000][n_A_ActiveSkillLV];
				wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			} else {
				// 四次精霊なし
				wbairitu = [0,1200,1500,1800,2100,2400][n_A_ActiveSkillLV];
				wbairitu += 8 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// ベースレベル補正
			wbairitu *= n_A_BaseLV / 100;
			break;
			
		//「エレメンタルマスター」スキル「ベナムスワンプ」
		case SKILL_ID_VENOM_SWAMP:
			// 2024/08/27 実測
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル
			g_bDefinedDamageIntervals = true;
			n_Delay[5] = 300;	// ダメージ間隔
			n_Delay[6] = 3000;	// オブジェクト存続時間
			// ダメージ倍率
			if (UsedSkillSearch(SKILL_ID_SERE) == 17) {	// 17: 毒 サーペンス
				// 四次精霊あり
				wbairitu = [0,1400,1800,2200,2600,3000][n_A_ActiveSkillLV];
				wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			} else {
				// 四次精霊なし
				wbairitu = [0,1200,1500,1800,2100,2400][n_A_ActiveSkillLV];
				wbairitu += 8 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			}
			// ベースレベル補正
			wbairitu *= n_A_BaseLV / 100;
			break;

		//「エレメンタルマスター」スキル「エレメンタルバスター」
		case SKILL_ID_ELEMENTAL_BASTER:
			bMatchCond = false;
			// 属性設定
			switch (UsedSkillSearch(SKILL_ID_SERE)) {
				case 13:
					n_A_Weapon_zokusei = ELM_ID_FIRE;
					bMatchCond = true;
					break;
				case 14:
					n_A_Weapon_zokusei = ELM_ID_WATER;
					bMatchCond = true;
					break;
				case 15:
					n_A_Weapon_zokusei = ELM_ID_WIND;
					bMatchCond = true;
					break;
				case 16:
					n_A_Weapon_zokusei = ELM_ID_EARTH;
					bMatchCond = true;
					break;
				case 17:
					n_A_Weapon_zokusei = ELM_ID_POISON;
					bMatchCond = true;
					break;
			}
			// 使用可否判定
			if (bMatchCond) {
				// 詠唱時間等
				wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
				// 基本倍率
				wbairitu = 10500 + (3000 * n_A_ActiveSkillLV);
				// SPL補正
				wbairitu += 135 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				// ベースレベル補正
				wbairitu *= n_A_BaseLV / 100;
			}
			// 使用不可
			else {
				wbairitu = 0;
				n_Buki_Muri = 1;
			}
			break;

		// 「ソウルアセティック」スキル「霊道符」
		case SKILL_ID_REIDO_FU:
			// 属性は暖かい風依存
			n_A_Weapon_zokusei = eval(document.calcForm.A_Weapon_zokusei.value);
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			wbairitu = 2000 + (200 * n_A_ActiveSkillLV);
			// SPL補正
			wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// 修練補正
			wbairitu += 7 * n_A_ActiveSkillLV * ( UsedSkillSearch(SKILL_ID_GOFU_SHUREN) + UsedSkillSearch(SKILL_ID_REIDOZYUTSU_SHUREN) );
			// ベースレベル補正
			wbairitu *= n_A_BaseLV / 100;
			break;

		// 「ソウルアセティック」スキル「死霊浄化」
		case SKILL_ID_SHIRYO_ZYOKA:
			// 属性は暖かい風依存
			n_A_Weapon_zokusei = eval(document.calcForm.A_Weapon_zokusei.value);
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率、SPL補正
			if (n_B_IJYOU[MOB_CONF_DEBUF_ID_SHIRYO_HYOI]) {
				wbairitu = 400 + (100 * n_A_ActiveSkillLV);
			}
			else {
				wbairitu = 350 + (50 * n_A_ActiveSkillLV);
			}
			// SPL補正
			wbairitu += 2 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// ベースレベル補正
			wbairitu *= n_A_BaseLV / 100;
			break;

		// 「ソウルアセティック」スキル「青龍符」
		case SKILL_ID_SEIRYU_FU:
			// 属性は暖かい風依存
			n_A_Weapon_zokusei = attackMethodConfArray[0].GetOptionValue(0);
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			if (UsedSkillSearch(SKILL_ID_SHIHO_FU_ZYOTAI) >= 5) {
				// 四方五行陣 状態
				wbairitu = 5500 + 1000 * n_A_ActiveSkillLV;
			} else {
				// 通常時
				wbairitu = 4250 + 750 * n_A_ActiveSkillLV;
			}
			// SPL補正 (2025/01/12 未確認)
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// 護符修練 補正 (2025/01/12 未確認)
			wbairitu += 15 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_GOFU_SHUREN);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「ソウルアセティック」スキル「白虎符」
		case SKILL_ID_BYAKKO_FU:
			// 属性は暖かい風依存
			n_A_Weapon_zokusei = attackMethodConfArray[0].GetOptionValue(0);
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			if (UsedSkillSearch(SKILL_ID_SHIHO_FU_ZYOTAI) >= 5) {
				// 四方五行陣 状態
				// 公式発表並びに実測確認の結果によるとLv4だけ倍率が異常なので直値で指定しています
				wbairitu = [0,4750,5250,5750,6200,6750][n_A_ActiveSkillLV];
			} else {
				// 通常時
				wbairitu = 3000 + 400 * n_A_ActiveSkillLV;
			}
			// SPL補正 (2025/01/12 未確認)
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// 護符修練 (2025/01/12 未確認)
			wbairitu += 15 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_GOFU_SHUREN);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「ソウルアセティック」スキル「朱雀符」
		case SKILL_ID_SUZAKU_FU:
			// 属性は暖かい風依存
			n_A_Weapon_zokusei = attackMethodConfArray[0].GetOptionValue(0);
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			if (UsedSkillSearch(SKILL_ID_SHIHO_FU_ZYOTAI) >= 5) {
				// 四方五行陣 状態
				wbairitu = 5500 + 650 * n_A_ActiveSkillLV;
			} else {
				// 通常時
				wbairitu = 4250 + 500 * n_A_ActiveSkillLV;
			}
			// SPL補正 (2025/01/12 未確認)
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// 護符修練 (2025/01/12 未確認)
			wbairitu += 15 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_GOFU_SHUREN);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「ソウルアセティック」スキル「玄武符」
		case SKILL_ID_GENBU_FU:
			// 属性は暖かい風依存
			n_A_Weapon_zokusei = attackMethodConfArray[0].GetOptionValue(0);
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			if (UsedSkillSearch(SKILL_ID_SHIHO_FU_ZYOTAI) >= 5) {
				// 四方五行陣 状態
				// 公式発表並びに実測確認の結果によるとLv4だけ倍率が異常なので直値で指定しています
				wbairitu = [0,4750,5250,5750,6200,6750][n_A_ActiveSkillLV];
			} else {
				// 通常時
				wbairitu = 3000 + 400 * n_A_ActiveSkillLV;
			}
			// SPL補正 (2025/01/12 未確認)
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// 護符補正 (2025/01/12 未確認)
			wbairitu += 15 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_GOFU_SHUREN);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		// 「ソウルアセティック」スキル「四方神符」
		case SKILL_ID_SHIHOZIN_FU:
			/**
			 * 素の状態から2桁程度の誤差がでますが五行陣を掛けても誤差は極端に拡大しないため丸め誤差の類だと思われます
			 * 計算式は信頼できると判断しています
			 */
			// 属性は暖かい風依存
			n_A_Weapon_zokusei = attackMethodConfArray[0].GetOptionValue(0);
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			wbairitu = 500 + (50 * n_A_ActiveSkillLV);
			// SPL補正
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// 護符修練
			wbairitu += 15 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_GOFU_SHUREN);
			// ベースレベル補正
			wbairitu *= n_A_BaseLV / 100;
			// HIT数
			wHITsuu = 1 + Math.min(5, UsedSkillSearch(SKILL_ID_SHIHO_FU_ZYOTAI));
			break;

		// 「ソウルアセティック」スキル「四方五行陣」
		case SKILL_ID_SHIHO_GOGYO_ZIN:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 使用条件は 玄武符 or 四方五行陣 状態であること
			if (UsedSkillSearch(SKILL_ID_SHIHO_FU_ZYOTAI) < 4) {
				n_Buki_Muri = 1;
				break;
			}
			// 属性は暖かい風依存
			n_A_Weapon_zokusei = attackMethodConfArray[0].GetOptionValue(0);
			// 基本倍率
			wbairitu = 2200 + 600 * n_A_ActiveSkillLV;
			// SPL補正 (2025/01/12 未確認)
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// 修練補正 (2025/01/12 未確認)
			wbairitu += 15 * n_A_ActiveSkillLV * (UsedSkillSearch(SKILL_ID_GOFU_SHUREN) +  UsedSkillSearch(SKILL_ID_REIDOZYUTSU_SHUREN))
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			// ヒット数
			wHITsuu = 5;
			break;

		// 「ハイパーノービス」スキル「ユピテルサンダーストーム」
		case SKILL_ID_JUPITER_THUNDER_STORM:
			// 2024/09/19 実測値との誤差無しを確認済み
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 基本倍率
			wbairitu = 2700 + (150 * n_A_ActiveSkillLV);
			wbairitu += 3 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU);		// 習得済みスキル条件
			wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);									// 特性ステータス補正
			// 最終倍率
			wbairitu *= n_A_BaseLV / 100;																					// BaseLv補正
			wbairitu = Math.floor(wbairitu);
			wbairitu *= [100,101,103,105,107,109,111,113,115,120,125][UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU)] / 100;	// 独学補正
			wbairitu = Math.floor(wbairitu);
			wbairitu *= [100, 300][UsedSkillSearch(SKILL_ID_RULE_BREAK_STATE)] / 100;										// ルールブレイク補正
			wbairitu = Math.floor(wbairitu);
			break;

		// 「ハイパーノービス」スキル「ヘルズドライブ」
		case SKILL_ID_HELLS_DRIVE:
			// 2024/09/19 実測値との誤差無しを確認済み
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 分割Hit数
			wActiveHitNum = 3;
			// 基本倍率
			wbairitu = 2600 + (150 * n_A_ActiveSkillLV);											// 基礎倍率
			wbairitu += 4 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU);		// 習得済みスキル条件
			wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);									// 特性ステータス補正
			// 最終倍率
			wbairitu *= n_A_BaseLV / 100;																					// BaseLv補正
			wbairitu = Math.floor(wbairitu);
			wbairitu *= [100,101,103,105,107,109,111,113,115,120,125][UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU)] / 100;	// 独学補正
			wbairitu = Math.floor(wbairitu);
			wbairitu *= [100, 300][UsedSkillSearch(SKILL_ID_RULE_BREAK_STATE)] / 100;										// ルールブレイク補正
			wbairitu = Math.floor(wbairitu);
			break;

		// 「ハイパーノービス」スキル「ナパームバルカンストライク」
		case SKILL_ID_NAPALM_VULKAN_STRIKE:
			// 2024/09/19 実測値との誤差無しまたは誤差1を確認済み
			// スキル計算式の問題ではなく後続の計算式の丸め誤差と判断しています
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 分割Hit数
			wActiveHitNum = 7;
			// 基本倍率
			wbairitu = 2600 + (150 * n_A_ActiveSkillLV);										// 基礎倍率
			wbairitu += 4 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU);	// 習得済みスキル条件
			wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);								// 特性ステータス補正
			// 最終倍率
			wbairitu *= n_A_BaseLV / 100;																					// BaseLv補正
			wbairitu = Math.floor(wbairitu);
			wbairitu *= [100,101,103,105,107,109,111,113,115,120,125][UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU)] / 100;	// 独学補正
			wbairitu = Math.floor(wbairitu);
			wbairitu *= [100, 300][UsedSkillSearch(SKILL_ID_RULE_BREAK_STATE)] / 100;										// ルールブレイク補正
			wbairitu = Math.floor(wbairitu);
			break;

		// 「ハイパーノービス」スキル「メテオストームバスター」
		case SKILL_ID_METEOR_STORM_BUSTER:
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// 設置スキル
			g_bDefinedDamageIntervals = true;
			n_Delay[5] = 500; // ダメージ発生間隔
			n_Delay[6] = [0,1500,2000,2000,2500,2500,3000,3000,3500,3500,4000][n_A_ActiveSkillLV];	// オブジェクト生存期間
			// 隕石
			if (battleCalcInfo.parentSkillId === undefined) {
				wActiveHitNum = 3;	// 隕石 1 つあたり見た目 3 Hit
				wbairitu = 1750 + 50 * n_A_ActiveSkillLV;													// 基礎倍率
				wbairitu += 5 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU);			// 習得済みスキル条件
				wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);										// 特性ステータス補正
				// 最終倍率
				wbairitu *= n_A_BaseLV / 100;																					// BaseLv補正
				wbairitu = Math.floor(wbairitu);
				wbairitu *= [100,101,103,105,107,109,111,113,115,120,125][UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU)] / 100;	// 独学補正
				wbairitu = Math.floor(wbairitu);
				wbairitu *= [100, 300][UsedSkillSearch(SKILL_ID_RULE_BREAK_STATE)] / 100;										// ルールブレイク補正
			}
			// 爆発
			else {
				wbairitu = 1175 + 25 * n_A_ActiveSkillLV;													// 基礎倍率
				wbairitu += 5 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU);			// 習得済みスキル条件
				wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);										// 特性ステータス補正
				// 最終倍率 (爆発には独学補正が掛からない)
				wbairitu *= n_A_BaseLV / 100;													// BaseLv補正
				wbairitu = Math.floor(wbairitu);
				wbairitu *= [100, 300][UsedSkillSearch(SKILL_ID_RULE_BREAK_STATE)] / 100;		// ルールブレイク補正
			}
			wbairitu = Math.floor(wbairitu);
			break;

		/*
			「スピリットハンドラー」スキル「ディアーキャノン」
			2024/11/09 実測済み
			SPL合計が奇数のときは誤差無しだが偶数のときに誤差が生じる
			にゃん友習得時+5以上の誤差を確認
			にゃん友未習得時+1以上の誤差を確認
			このためスキル計算式自体は合っていてこの後の特性ステータス処理に誤りがあると判断しています
		*/
		case SKILL_ID_DEER_CANON:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// スピリットハンドラーのレインボーホーン追加に伴い任意の属性を取れるように変更
			if (attackMethodConfArray[0].optionValueArray.length == 0) {
				// 属性未定義の場合
				n_A_Weapon_zokusei = ELM_ID_VANITY;
			} else {
				n_A_Weapon_zokusei = attackMethodConfArray[0].GetOptionValue(0);
			};
			if (UsedSkillSearch(SKILL_ID_SANREI_ITTAI) > 0 || UsedSkillSearch(SKILL_ID_NYANTOMO_KENROKU) > 0) {
				// 基礎倍率
				wbairitu = 5200 + 800 * n_A_ActiveSkillLV;
				// スピリットマスタリー補正
				wbairitu += 300 * UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY);
			} else {
				// 基礎倍率
				wbairitu = 2400 + 300 * n_A_ActiveSkillLV;
				// スピリットマスタリー補正
				wbairitu += 125 * UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY);
			}
			// SPL補正
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		/*
			「スピリットハンドラー」スキル「ディアーブリーズ」
		*/
		case SKILL_ID_DEER_BREEZE:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// オブジェクト存続時間
			n_Delay[6] = g_skillManager.GetLifeTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ間隔
			n_Delay[5] = 300;
			g_bDefinedDamageIntervals = true;
			// スピリットハンドラーのレインボーホーン追加に伴い任意の属性を取れるように変更
			if (attackMethodConfArray[0].optionValueArray.length == 0) {
				// 属性未定義の場合
				n_A_Weapon_zokusei = ELM_ID_VANITY;
			} else {
				n_A_Weapon_zokusei = attackMethodConfArray[0].GetOptionValue(0);
			};
			if (UsedSkillSearch(SKILL_ID_SANREI_ITTAI) > 0 || UsedSkillSearch(SKILL_ID_NYANTOMO_KENROKU) > 0) {
				// 基礎倍率
				wbairitu = 1600 + 200 * n_A_ActiveSkillLV;
				// スピリットマスタリー補正
				wbairitu += 40 * UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY);
			} else {
				// 基礎倍率
				wbairitu = 800 + 100 * n_A_ActiveSkillLV;
				// スピリットマスタリー補正
				wbairitu += 20 * UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY);
			}
			// SPL補正
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
			// ベースレベル補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);
			break;

		/**
		 * 「蜃気楼　不知火」スキル「赤炎砲」「冷血砲」「雷電砲」「金龍砲」
		 * 2024/10/23 提供データとの誤差+1以下を確認しています
		 * 計算前後の丸め誤差によるものと判断
		 */
		case SKILL_ID_SEKIEN_HOU:
		case SKILL_ID_REIKETSU_HOU:
		case SKILL_ID_RAIDEN_HOU:
		case SKILL_ID_KINNRYUU_HOU:
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			if (battleCalcInfo.parentSkillId === undefined) {
				// 本体の攻撃
				wbairitu = 4000 + 300 * n_A_ActiveSkillLV;												// 基本倍率
				wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);									// spl補正
				wbairitu += 70 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_ANTEN_HOU_LEARNED_LEVEL)	// 習得済みスキル条件
				wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);										// BaseLv補正
			} else {
				// 分身の追撃 暗転砲
				n_A_Weapon_zokusei = ELM_ID_DARK;												// 属性は闇固定
				if (UsedSkillSearch(SKILL_ID_ANTEN_HOU_LEARNED_LEVEL) == 0) {
					wbairitu = 0;
				} else {
					wbairitu = 5750 + 350 * UsedSkillSearch(SKILL_ID_ANTEN_HOU_LEARNED_LEVEL);	// 基本倍率
					wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);						// spl補正
					wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);							// BaseLv補正
					wbairitu = Math.floor(wbairitu * 30 / 100);									// 分身の威力は30%
					wbairitu *= attackMethodConfArray[0].GetOptionValue(0);						// 分身の数
					// 分割ヒット
					wActiveHitNum = 4;
				}
			}
			break;

		/**
		 * 「蜃気楼　不知火」スキル「暗転砲」
		 * 2024/10/23 提供データとの誤差無しを確認
		 */
		case SKILL_ID_ANTEN_HOU:
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			if (battleCalcInfo.parentSkillId === undefined) {
				// 本体の攻撃
				wbairitu = 5750 + 350 * n_A_ActiveSkillLV;				// 基本倍率
				wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);	// spl補正
				wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);		// BaseLv補正
				// 分割ヒット
				wActiveHitNum = 2;
			} else {
				// 分身の追撃
				if (UsedSkillSearch(SKILL_ID_ANTEN_HOU_LEARNED_LEVEL) == 0) {
					wbairitu = 0;
				} else {
					wbairitu = 5750 + 350 * UsedSkillSearch(SKILL_ID_ANTEN_HOU_LEARNED_LEVEL);	// 基本倍率
					wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);						// spl補正
					wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);							// BaseLv補正
					wbairitu = Math.floor(wbairitu * 30 / 100);									// 分身の威力は30%
					wbairitu *= attackMethodConfArray[0].GetOptionValue(0);						// 分身の数
					// 分割ヒット
					wActiveHitNum = 4;
				}
			}
			break;

		//「蜃気楼　不知火」スキル「幻術 -暗黒龍-」
		// 2024/12/25 もなこさん提供データに対して誤差+3を確認
		// 当スキルではなく魔法ダメージ計算の基本部分に誤差があると判断しています
		case SKILL_ID_GENZYUTSU_ANKOKURYUU:
			// 詠唱時間など
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ倍率
			wbairitu = 17000;											// 基本倍率
			wbairitu += 10 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);		// 特性ステータス補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);			// BaseLv補正
			if (battleCalcInfo.parentSkillId === undefined) {
				// 初撃 闇属性
			} else {
				// 悪夢状態の追撃 火属性
				n_A_Weapon_zokusei = ELM_ID_FIRE;
			}
			// 分割ヒット
			wActiveHitNum = 4;
			break;

		// 「蜃気楼　不知火」スキル「影溶き」
		// 2024/12/25 もなこさん提供データに対して誤差なしを確認
		case SKILL_ID_KAGETOKI:
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ倍率
			wbairitu = 3200 + 500 * n_A_ActiveSkillLV;											// 基本倍率
			wbairitu += 3 * GetTotalSpecStatus(MIG_PARAM_ID_CON);								// 特性ステータス補正
			wbairitu = Math.floor(wbairitu * n_A_BaseLV / 100);									// BaseLv補正
			// 分割ヒット
			wActiveHitNum = 2;
			break;

		// 「ハイパーノービス」スキル「ジャックフロストノヴァ」
		case SKILL_ID_JACK_FROST_NOVA:
			// 2024/09/19 実測値との誤差1を確認済み
			// 後続の計算式による丸め誤差と判断しています
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ計算
			if (attackMethodConfArray[0].GetOptionValue(0) === 0) {
				// 初撃ダメージ計算が指定された場合 (独学補正は掛からない)
				wbairitu = 100 + (20 * n_A_ActiveSkillLV);											// 基礎倍率
				wbairitu += 3 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU);	// 習得済みスキル条件
				wbairitu += 2 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);								// 特性ステータス補正
				wbairitu *= n_A_BaseLV / 100;														// BaseLv補正
				wbairitu = Math.floor(wbairitu);
				wbairitu *= [100, 300][UsedSkillSearch(SKILL_ID_RULE_BREAK_STATE)] / 100;			// ルールブレイク補正
			} else {
				// 設置ダメージ計算が指定された場合
				g_bDefinedDamageIntervals = true;
				n_Delay[5] = 500;	// ダメージ間隔
				n_Delay[6] = 3000;	// オブジェクト存続時間
				// 分割Hit数
				wActiveHitNum = 2;
				// 基本倍率
				wbairitu = 650 + (25 * n_A_ActiveSkillLV);							// 基礎倍率
				wbairitu += 3 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU);		// 習得済みスキル条件
				wbairitu += 4 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);				// 特性ステータス補正
				wbairitu *= n_A_BaseLV / 100;										// BaseLv補正
				wbairitu = Math.floor(wbairitu);
				wbairitu *= [100,101,103,105,107,109,111,113,115,120,125][UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU)] / 100;	// 独学補正
				wbairitu = Math.floor(wbairitu);
				wbairitu *= [100, 300][UsedSkillSearch(SKILL_ID_RULE_BREAK_STATE)] / 100;										// ルールブレイク補正
			}
			wbairitu = Math.floor(wbairitu);
			break;

		// 「ハイパーノービス」スキル「グラウンドグラビテーション」
		case SKILL_ID_GROUND_GRAVITATION:
			// 2024/09/19 実測値との誤差無しまたは誤差1を確認済み
			// 後続の計算式による丸め誤差と判断しています
			// 詠唱時間等
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			// ダメージ計算
			if (attackMethodConfArray[0].GetOptionValue(0) === 0) {
				// 初撃ダメージ計算が指定された場合 (独学補正は掛からない)
				wbairitu = 600 + (50 * n_A_ActiveSkillLV);											// 基礎倍率
				wbairitu += 4 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU);	// 習得済みスキル条件
				wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);								// 特性ステータス補正
				wbairitu *= n_A_BaseLV / 100;														// BaseLv補正
				wbairitu = Math.floor(wbairitu);
				wbairitu *= [100, 300][UsedSkillSearch(SKILL_ID_RULE_BREAK_STATE)] / 100;			// ルールブレイク補正
				// 分割Hit数
				wActiveHitNum = 2;
			} else {
				// 設置ダメージ計算が指定された場合
				g_bDefinedDamageIntervals = true;
				n_Delay[5] = 500;	// ダメージ間隔
				n_Delay[6] = 5000;	// オブジェクト存続時間
				// 基本倍率
				wbairitu = 300 + (10 * n_A_ActiveSkillLV);							// 基礎倍率
				wbairitu += 2 * n_A_ActiveSkillLV * UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU);		// 習得済みスキル条件
				wbairitu += 2 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);				// 特性ステータス補正
				wbairitu *= n_A_BaseLV / 100;										// BaseLv補正
				wbairitu = Math.floor(wbairitu);
				wbairitu *= [100,101,103,105,107,109,111,113,115,120,125][UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU)] / 100;	// 独学補正
				wbairitu = Math.floor(wbairitu);
				wbairitu *= [100, 300][UsedSkillSearch(SKILL_ID_RULE_BREAK_STATE)] / 100;										// ルールブレイク補正
			}
			wbairitu = Math.floor(wbairitu);
			break;

/*
		case SKILL_ID_DUMMY:
			// 使用武器制限
			if (n_A_WeaponType != ITEM_KIND_SHOTGUN) {
				wbairitu = 0;
				break;
			}

			n_Enekyori = 1;	// 遠距離フラグ
			wHITsuu = 3;	// 多段ヒット数

			// CSkillManager.js で定義された詠唱時間などを取得する
			g_bUnknownCasts = true;	// 詠唱時間など未計測フラグ
			wCast = g_skillManager.GetCastTimeVary(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_KoteiCast = g_skillManager.GetCastTimeFixed(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[2] = g_skillManager.GetDelayTimeCommon(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);
			n_Delay[7] = g_skillManager.GetCoolTime(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData);

			// 設置型の場合
			g_bDefinedDamageIntervals = true;
			n_Delay[5] = 500;	// ダメージ間隔
			n_Delay[6] = 5000;	// オブジェクト存続時間

			// CAttackMethodAreaComponentManager.js で定義されたオプションを取得する
			option_count = attackMethodConfArray[0].GetOptionValue(0);
			wbairitu += option_count * (950 + (150 * n_A_ActiveSkillLV));

			// 習得済みスキル条件
			if (UsedSkillSearch(SKILL_ID_SANREI_ITTAI) > 0) {
				wbairitu = 650 + (150 * n_A_ActiveSkillLV);
			} else {
				wbairitu = 400 + (100 * n_A_ActiveSkillLV);
				bCri = false;										// クリティカルしない場合
			}
			wbairitu += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// 特性ステータス補正

			// 種族特攻
			switch (parseInt(mobData[MONSTER_DATA_INDEX_RACE], 10)) {
				case RACE_ID_DEMON:
					wHITsuu = 3;
			}

			wbairitu *= n_A_BaseLV / 100;							// BaseLv補正
			break;
*/

/* --------------------------------------------------
↑ 魔法攻撃スキル追加位置
-------------------------------------------------- */
		}

		if (g_bSkillNoDamage) {
			return [0, 0, 0];
		}
		for(var i = 0; i <= 2; i++){
			// 各ＭＡＴＫを取得
			w_MATK[i] = n_A_MATK[i];
			// モンスター特化を適用
			w_MATK[i] = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w_MATK[i]);
			// 属性耐性を適用
			w_MATK[i] = ApplyResistElement(mobData, w_MATK[i]);
			// 対プレイヤー一般耐性を適用
			w_MATK[i] = ApplyRegistPVPNormal(mobData, w_MATK[i]);
		}
		// マグヌスエクソシズム、かつ、モンスターが対象外の場合、ＭＡＴＫを０で計算する
		if(n_A_ActiveSkill==104){
			if(mobData[19] != 6 && mobData[18] <90){
				w_MATK[0]=0;
				w_MATK[1]=0;
				w_MATK[2]=0;
			}
		}
		// ＭＡＴＫ％強化倍率を取得
		wbairitu += GetBattlerMatkPercentUp();
		// 単発スキルの場合
		if(n_bunkatuHIT == 0){
			for(var b = 0; b <= 2; b++){
				w_DMG[b] = ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[b] * wbairitu / 100);
				if(SG_Special_HITnum != 0){
					SG_Special_DMG[b] = w_DMG[b];
				}
				Last_DMG_B[b] = w_DMG[b];
				if(n_A_ActiveSkill==658 || n_A_ActiveSkill==659){
					if(b==1) wHITsuu = 2 * attackMethodConfArray[0].GetOptionValue(0);
					if(b==2) wHITsuu = 3 * attackMethodConfArray[0].GetOptionValue(0);
				}
				Last_DMG_A[b] = ROUNDDOWN(w_DMG[b] * wHITsuu);
				if(n_AS_MODE == 0) g_damageTextArray[b].push(Last_DMG_A[b], "(", Last_DMG_B[b], SubName[8], wHITsuu, "hit)");
				// TODO: 四次データ形式変更対応
				// w_DMG[b] = Last_DMG_A[b];
			}

		}
		// 分割ＨＩＴの場合
		else{
			var subnumvalue = attackMethodConfArray[0].GetOptionValue(0);
			if(n_A_ActiveSkill==518 && subnumvalue >= 1 && mobData[20] == 0){
				for(var b=0;b<=2;b++){
					w_DMG[b] = Math.floor(ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[b] * wbairitu / 100) / wHITsuu);
					var KoteiDMG = 400 * subnumvalue;
					KoteiDMG = KoteiDMG * ROUNDDOWN((100 + 40 * UsedSkillSearch(SKILL_ID_TELECHINESIS_INSTENCE)) / 100);
					Last_DMG_A[b] = Last_DMG_B[b] = w_DMG[b] * wHITsuu + KoteiDMG;
					if(n_AS_MODE == 0) g_damageTextArray[b].push(Last_DMG_A[b], "(", w_DMG[b], SubName[8], wHITsuu, "hit + ", KoteiDMG, ")");
					// TODO: 四次データ形式変更対応
					// w_DMG[b] *= wHITsuu;
				}
			}else{
				for(var b=0;b<=2;b++){
					// TODO: 2020年スキル修正に伴う変更（元からこの計算式だったかは不明）
					// w_DMG[b] = Math.floor(ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[b] * wbairitu / 100) / wHITsuu);
					w_DMG[b] = Math.floor(ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, w_MATK[b] * Math.floor(wbairitu / wHITsuu) * wHITsuu / 100) / wHITsuu);
					Last_DMG_A[b] = Last_DMG_B[b] = w_DMG[b] * wHITsuu;
					if(n_AS_MODE == 0) g_damageTextArray[b].push(Last_DMG_A[b], "(", w_DMG[b], SubName[8], wHITsuu, "hit)");
					// TODO: 四次データ形式変更対応
					// w_DMG[b] *= wHITsuu;
				}
			}
		}
		if(n_AS_MODE == 1){
			SG_Special_HITnum = 0;
			return w_DMG;
		}
		if(n_A_ActiveSkill==783 && (UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) == 0 || UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU) == 0)) g_damageTextArray[0] = ["<Font color=Red><B>術式解放の計算をするにはパッシブ欄で<BR>符の属性と数を設定して下さい</B></Font>"];
		if(n_A_ActiveSkill==526){
			str_bSUBname += "<FONT color='#0000FF'><B>吸収量</B></FONT><BR>";
			var w = ROUNDDOWN((8 * n_A_ActiveSkillLV) * n_A_BaseLV / 100);
			var w0 = ROUNDDOWN(w_DMG[0] * w / 100);
			var w2 = ROUNDDOWN(w_DMG[2] * w / 100);
			str_bSUB += "<FONT color='#0000FF'><B>"+ __DIG3(w0) +"～"+ __DIG3(w2) +"</B></FONT><BR>";
		}
		w_HIT_HYOUJI = 100;
		AS_PLUS();
		BuildCastAndDelayHtml(mobData);
		BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);
		return w_DMG;
	}
}


/**
 * 物理ダメージを計算する
 * @param {*} battleCalcInfo 
 * @param {*} charaData 
 * @param {*} specData 
 * @param {*} mobData 
 * @param {*} attackMethodConfArray 
 * @param {*} skillId 
 * @param {*} dmgUnit 
 * @param {*} dmgAmp 
 * @param {*} hitCountArrat 
 * @param {*} dividedHitCount 
 * @param {*} bCri 
 * @param {*} bLeft 
 * @returns 
 */
function BattleCalcSubDamagePhysicalCommon(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, skillId, dmgUnit, dmgAmp, hitCountArrat, dividedHitCount, bCri, bLeft) {
	var idx = 0;
	var dmgUnitResult = null;
	var dmgPerfect = 0;
	// TODO: これ消したい
	// 二刀流計算フラグ
	if (bLeft) {
		n_NitouCalc = 1;
	}
	else {
		n_NitouCalc = 0;
	}
	// 結果用ダメージユニット用意
	dmgUnitResult = [];
	// スキルダメージの必中部分のみ仮計算（属性倍率未適用）
	// （属性倍率まで先に計算すると、ダメージ本体に加算後、二重にかけることになり計算を誤る）
	if (!bLeft) {
		dmgPerfect = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
	}
	// 各ダメージ（最小、平均、最大）を計算
	for (idx = 0; idx < dmgUnit.length; idx++) {
		// ダメージの初期値に攻撃力を設定
		dmgUnitResult[idx] = dmgUnit[idx];
		// 物理判定攻撃のダメージ増幅を適用（距離特化、クリティカル）
		if (!bLeft) {
			dmgUnitResult[idx] = ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, dmgUnitResult[idx], bCri);
		}
		// スキルダメージ倍率を適用
		dmgUnitResult[idx] = Math.floor(dmgUnitResult[idx] * dmgAmp / 100);
		// モンスターの防御力を適用
		// TODO: なぜか二刀流の片手修練がここで適用されている
		dmgUnitResult[idx] = ApplyMonsterDefence(mobData, dmgUnitResult[idx], bLeft);
		// 固定追加ＡＴＫ効果の追加（オーラブレイド、エンチャントブレイド等）
		if (!bLeft) {
			dmgUnitResult[idx] += GetFixedAppendAtk(battleCalcInfo.skillId, charaData, specData, mobData, dmgUnitResult[idx], idx, -1);
		}
		// スキル必中ダメージの追加
		if (!bLeft) {
			dmgUnitResult[idx] += dmgPerfect;
		}
		// 四次特性左手ペナルティの適用
		if (bLeft) {
			dmgUnitResult[idx] = ApplyPAtkLeftHandPenalty(charaData, specData, mobData, dmgUnitResult[idx]);
		}
		// 判定属性による属性倍率の適用
		dmgUnitResult[idx] = ApplyHitJudgeElementRatio(skillId, dmgUnitResult[idx], mobData);
		// スキルダメージ増幅効果、その他ダメージ計算の適用
		dmgUnitResult[idx] = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, dmgUnitResult[idx], idx, bCri, bLeft);
		// TODO: ここのヒット数を加味した計算、誤差出るかも
		// 分割ヒットスキルの場合、端数の丸め処理を適用
		if (dividedHitCount > 1) {
			dmgUnitResult[idx] = Math.floor(Math.floor(dmgUnitResult[idx] * hitCountArrat[idx] / dividedHitCount) * dividedHitCount / hitCountArrat[idx]);
		}
	}
	//--------------------------------
	// 必中ダメージ計算本体
	//--------------------------------
	if (!bLeft) {
		// 改めて、スキルダメージの必中部分を計算
		dmgPerfect = GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray);
		// 判定属性による属性倍率の適用
		dmgPerfect = ApplyHitJudgeElementRatio(skillId, dmgPerfect, mobData);
		// スキルダメージ増幅効果、その他ダメージ計算の適用
		dmgPerfect = ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, dmgPerfect, idx, bCri);
		// 分割ヒットスキルの場合、端数の丸め処理を適用
		if (dividedHitCount > 1) {
			dmgPerfect = Math.floor(dmgPerfect / dividedHitCount) * dividedHitCount;
		}
	}
	return [dmgUnitResult.slice(), dmgPerfect];
}


/**
 * ＡＴＫ上昇倍率を取得する.
 * @return 上昇倍率（０～）
 */
function GetBattlerAtkPercentUp(charaData, specData, mobData, attackMethodConfArray) {
	var sklLv = 0;
	var w = 0;
	// オートバーサーク系（排他）
	// オートバーサーク
	if (UsedSkillSearch(SKILL_ID_AUTO_BERSERK)) {
		w += 32;
	}
	// 「一次職支援　支援プロボック」
	else if (g_confDataIchizi[CCharaConfIchizi.CONF_ID_SHIEN_PROVOKE]) {
		w += 2 + 3 * g_confDataIchizi[CCharaConfIchizi.CONF_ID_SHIEN_PROVOKE];
	}
	// アロエベラ
	else if (n_A_PassSkill7[37]) {
		w += 5;
	}

	// コンセントレイション
	if(UsedSkillSearch(SKILL_ID_CONCENTRATION)) {
		w += UsedSkillSearch(SKILL_ID_CONCENTRATION) * 5;
	}
	// 「二次職支援　コンセントレイション」の、効果
	else if ((sklLv = g_confDataNizi[CCharaConfNizi.CONF_ID_CONCENTRATION]) > 0) {
		w += sklLv * 5;
	}

	// トゥルーサイト
	if(UsedSkillSearch(SKILL_ID_TRUE_SIGHT)) {
		w += UsedSkillSearch(SKILL_ID_TRUE_SIGHT) * 2;
	}
	//----------------------------------------------------------------
	// 「二次職支援　トゥルーサイト」の、効果
	//----------------------------------------------------------------
	else if ((sklLv = g_confDataNizi[CCharaConfNizi.CONF_ID_TRUE_SIGHT]) > 0) {
		w += sklLv * 2;
	}
	// 「レーザーオブイーグル」の、トゥルーサイトＬｖ２
	else if (TimeItemNumSearch(91)) {
		w += 2 * 2;
	}

	// ギルドスキルＡＴＫ＋１００％
	if(n_A_PassSkill4[8]) w += 100;

	// 「一次職支援　マーダラーボーナス」
	if(g_confDataIchizi[CCharaConfIchizi.CONF_ID_MARDERER_BONUS]) {
		w += 10;
	}

	// ＡＴＫ％ＵＰ
	if(GetEquippedTotalSPEquip(87)) w += GetEquippedTotalSPEquip(87);

	// TODO : 謎補正
	if(n_A_IJYOU[3]) w -= 25;

	// 精霊スキル　ウォーターバリア
	if(UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL) == 17) w -= 30;

	// 魔道ギアに搭乗していない場合（Lv200解放アップデートで制限解除）
	if ((_APPLY_UPDATE_LV200) || (UsedSkillSearch(SKILL_ID_MADOGEAR) == 0)) {
		// オーバートラストマックス
		if (UsedSkillSearch(SKILL_ID_OVER_TRUST_MAX)){
			w += 20 * UsedSkillSearch(SKILL_ID_OVER_TRUST_MAX);
		}
		// オーバートラストマックス状態以外
		else{
			// オーバートラスト
			if(UsedSkillSearch(SKILL_ID_OVER_TRUST)) {
				w += UsedSkillSearch(SKILL_ID_OVER_TRUST) * 5;
			}
			// オーバートラスト（ＰＴ）
			else if (g_confDataNizi[CCharaConfNizi.CONF_ID_OVER_TRUST]) {
				w += g_confDataNizi[CCharaConfNizi.CONF_ID_OVER_TRUST] * 5 / 5;
			}
		}
	}

	// ＋９鬼丸の、バーサーク時オーバートラストマックス
	if(n_A_Weapon_ATKplus >= 9 && EquipNumSearch(2426) && UsedSkillSearch(SKILL_ID_BERSERK)) w += 100;

	// バーサーク
	if(UsedSkillSearch(SKILL_ID_BERSERK)) w += 200;

	// ヒートバレル
	if (UsedSkillSearch(SKILL_ID_HEAT_BARREL) > 0) {
		w += UsedSkillSearch(SKILL_ID_HEAT_BARREL_COIN_COUNT) * (6 + 2 * UsedSkillSearch(SKILL_ID_HEAT_BARREL));
	}

	// 「モンスター状態異常　カイト」
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_KAITO]) {
		if (n_A_ActiveSkill == SKILL_ID_TUZYO_KOGEKI) {
			w += 400;
		}
	}

	// ヴィゴール（通常近接物理攻撃のみ）
	if ((n_A_ActiveSkill == SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT) && (n_Enekyori == 0)) {
		sklLv = UsedSkillSearch(SKILL_ID_VIGOR);
		if (sklLv > 0) {
			// 基本倍率
			let ampWork = 100 * sklLv;
			w += ampWork;
		}
	}

	return w;
}


/**
 * バフやデバフによるダメージ増加効果を適用する。
 * 物理ダメージのみに適用する事を意図した関数のようだが、処理の内容的には物理依存ではない。
 * @param {*} wJ 適用前のダメージ倍率
 * @returns 適用後のダメージ倍率
 */
function ATKbaiJYOUSAN(wJ) {
	var w = 100;
	if(n_A_WeaponType == 11 && UsedSkillSearch(SKILL_ID_KATAR_KENKYU)) {
		w += 10 + 2 * UsedSkillSearch(SKILL_ID_KATAR_KENKYU);
	}
	// デバフ「クエイク状態」による効果
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_QUAKE_DEBUFF] > 0) {
		w += 15;
	}
	// 「モンスター状態異常　カイト」
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_KAITO]) {
		if (n_A_ActiveSkill != SKILL_ID_TUZYO_KOGEKI) {
			w += 400;
		}
	}
	if(w != 100) wJ = Math.floor(wJ * w /100);
	return wJ;
 }


/**
 * ＭＡＴＫ上昇倍率を取得する.
 * @return 上昇倍率（０～）
 */
function GetBattlerMatkPercentUp() {
	var w = 0;
	// 支援マインドブレイカー
	if(g_confDataNizi[CCharaConfNizi.CONF_ID_SHIEN_MIND_BREAKER]) {
		w += 20 * g_confDataNizi[CCharaConfNizi.CONF_ID_SHIEN_MIND_BREAKER];
	}
	return w;
 }


/**
 * モンスター特化（魔法）を適用する.
 * @param dmg ダメージ
 * @return 適用後のダメージ
 */
function ApplyMagicalSpecializeMonster(charaData, specData, mobData, dmg) {
// 今後の仕様変更用に、検証処理自体は残しておく
/*
if (_MAGIC_CALC_INSPECTION) {
	return ApplyMagicalSpecializeMonsterMod20211014(charaData, specData, mobData, dmg);
}
*/
	// 2021/11/17 に特定した順序で計算する
	dmg = ApplyMagicalSpecializeMonster20211117(charaData, specData, mobData, dmg);
	// 特性ステータス対応
	return ApplySMatkAmplify(dmg);
}


/**
 * モンスター特化（魔法）を適用する（2021/10/14検証用）.
 */
/*
function ApplyMagicalSpecializeMonsterMod20211014(charaData, specData, mobData, dmg) {
	var idx = 0;
	var idxChar = 0;
	var dmgResult = 0;
	var dmgResultOldFomula = 0;
	var patternStr = "";
	var patternArray = [];
	var patternListBase = [
		"0", "1", "2", "3", "4", "5", "6", "7",
	];
	var funcCreatePattern = function (patternArrayF, patternStrF, patternListF) {
		var idxF = 0;
		var patternListNextF = null;
		if (patternListF.length == 1) {
			patternArrayF.push(patternStrF + patternListF[0]);
			return;
		}
		for (idxF = 0; idxF < patternListF.length; idxF++) {
			patternListNextF = patternListF.slice();
			patternListNextF.splice(idxF, 1);
			funcCreatePattern(patternArrayF, patternStrF + patternListF[idxF], patternListNextF);
		}
	};
	// 検証用パターン生成
	funcCreatePattern(patternArray, "", patternListBase);
	// パターン格納用配列初期化
	g_matchPatternArray = [];
	g_matchResultArray = [];
	g_missMatchPatternArray = [];
	g_missMatchResultArray = [];
	g_missMatchPatternNotExpectedArray = [];
	g_missMatchResultNotExpectedArray = [];
	for (idx = 0; idx < patternArray.length; idx++) {
		dmgResult = dmg;
		patternStr = patternArray[idx];
		for (idxChar = 0; idxChar < patternStr.length; idxChar++) {
			switch (patternStr.charAt(idxChar)) {
				case "0":
					// 魔法攻撃で与えるダメージ＋○○％
					dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubMagicalDamageUp(charaData, specData, mobData, dmgResult);
					break;
				case "1":
					// スパイダーウェブ状態系のダメージ強化倍率の適用
					dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpiderWebModify(charaData, specData, mobData, dmgResult);
					break;
				case "2":
					// 地域特化
					dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpecializeMap(charaData, specData, mobData, dmgResult);
					break;
				case "3":
					// 種族特化
					dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpecializeRace(charaData, specData, mobData, dmgResult);
					break;
				case "4":
					// サイズ特化
					dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpecializeSize(charaData, specData, mobData, dmgResult);
					break;
				case "5":
					// 属性特化
					dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpecializeMonsterElement(charaData, specData, mobData, dmgResult);
					break;
				case "6":
					// 属性魔法特化
					dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpecializeMagicElement(charaData, specData, mobData, dmgResult);
					break;
				case "7":
					// ボス／一般特化
					dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpecializeBossType(charaData, specData, mobData, dmgResult);
					break;
			}
		}
		if (idx == 0) {
			dmgResultOldFomula = dmgResult;
		}
		else {
			// 期待されるダメージ計算結果が指定されていない場合
			if (g_expectedDmgResult === undefined) {
				if (dmgResult != dmgResultOldFomula) {
					g_missMatchPatternArray.push(patternStr);
					g_missMatchResultArray.push([patternStr, dmgResult]);
				}
				else {
					g_matchPatternArray.push(patternStr);
					g_matchResultArray.push([patternStr, dmgResult]);
				}
			}
			// 期待されるダメージ計算結果が指定されている場合
			else {
				if (dmgResult != dmgResultOldFomula) {

					if (dmgResult == g_expectedDmgResult) {
						g_missMatchPatternArray.push(patternStr);
						g_missMatchResultArray.push([patternStr, dmgResult]);
					}
					else {
						g_missMatchPatternNotExpectedArray.push(patternStr);
						g_missMatchResultNotExpectedArray.push([patternStr, dmgResult]);
					}
				}
				else {
					g_matchPatternArray.push(patternStr);
					g_matchResultArray.push([patternStr, dmgResult]);
				}
			}

		}
	}
	return dmgResultOldFomula;
}
*/

/**
 * モンスター特化（魔法）を適用する（2021/11/17特定版）.
 * @param dmg ダメージ
 * @return 適用後のダメージ
 */
function ApplyMagicalSpecializeMonster20211117(charaData, specData, mobData, dmg) {
	var idxChar = 0;
	var dmgResult = 0;
	var patternStr = "";
	// 特定したパターン "04251637" でのみ計算する
	dmgResult = dmg;
	patternStr = "04251637";
	for (idxChar = 0; idxChar < patternStr.length; idxChar++) {
		switch (patternStr.charAt(idxChar)) {
			case "0":
				// 魔法攻撃で与えるダメージ＋○○％
				dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubMagicalDamageUp(charaData, specData, mobData, dmgResult);
				break;
			case "1":
				// スパイダーウェブ状態系のダメージ強化倍率の適用
				dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpiderWebModify(charaData, specData, mobData, dmgResult);
				break;
			case "2":
				// 地域特化
				dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpecializeMap(charaData, specData, mobData, dmgResult);
				break;
			case "3":
				// 種族特化
				dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpecializeRace(charaData, specData, mobData, dmgResult);
				break;
			case "4":
				// サイズ特化
				dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpecializeSize(charaData, specData, mobData, dmgResult);
				break;
			case "5":
				// 属性特化
				dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpecializeMonsterElement(charaData, specData, mobData, dmgResult);
				break;
			case "6":
				// 属性魔法特化
				dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpecializeMagicElement(charaData, specData, mobData, dmgResult);
				break;
			case "7":
				// ボス／一般特化
				dmgResult = ApplyMagicalSpecializeMonsterMod20211014SubSpecializeBossType(charaData, specData, mobData, dmgResult);
				break;
		}
	}
	return dmgResult;
}


/**
 * 魔法ダメージ増加の効果をダメージに適用する
 * @param {*} charaData 未使用の引数
 * @param {*} specData 未使用の引数
 * @param {*} mobData 未使用の引数
 * @param {*} dmg 
 * @returns 
 */
function ApplyMagicalSpecializeMonsterMod20211014SubMagicalDamageUp(charaData, specData, mobData, dmg) {
	if (n_tok[ITEM_SP_MAGICAL_DAMAGE_UP]) {
		dmg = Math.floor(dmg * (100 + n_tok[ITEM_SP_MAGICAL_DAMAGE_UP]) / 100);
	}
	return dmg;
}


/**
 * スパイダーウェブの有無による倍率をダメージに適用する
 * @param {*} charaData 未使用の引数
 * @param {*} specData 未使用の引数
 * @param {*} mobData 
 * @param {*} dmg 
 * @returns 
 */
function ApplyMagicalSpecializeMonsterMod20211014SubSpiderWebModify(charaData, specData, mobData, dmg) {
	var wX = GetSpiderWebDamageRatio();
	if (wX != 0) {
		dmg = Math.floor(dmg * (100 + wX) / 100);
	}
	return dmg;
}


/**
 * 特定のモンスターグループに対する特攻をダメージに適用する。
 * 魔法ダメージ計算専用を意図して作られたようだが内部的には魔法に依存した処理ではない。
 * @param {*} charaData 未使用の引数
 * @param {*} specData 未使用の引数
 * @param {*} mobData 
 * @param {*} dmg 
 * @returns 
 */
function ApplyMagicalSpecializeMonsterMod20211014SubSpecializeMap(charaData, specData, mobData, dmg) {
	var wX = 0;
	//--------------------------------
	// マヌク特化
	//--------------------------------
	if(n_A_PassSkill7[30]){
		if (NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MANUKU]) == 1) {
			wX += 10;
		}
	}

	//--------------------------------
	// スプレンディッド特化
	//--------------------------------
	if(n_A_PassSkill7[33]){
		if (NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SPRENDED]) == 1) {
			wX += 10;
		}
	}

	//--------------------------------
	// ニブルヘイム特化
	//--------------------------------
	if(324 <= mobData[0] && mobData[0] <= 332){
		if(EquipNumSearch(2399)){
			wX += 5;
			if(n_A_HEAD_DEF_PLUS >= 5) wX += 5;
			if(n_A_HEAD_DEF_PLUS >= 7) wX += 10;
			if(n_A_HEAD_DEF_PLUS >= 9) wX += 20;
		}
	}

	//--------------------------------
	// モロク特化　タイプ１
	//--------------------------------
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
	case 2431:		// 両手剣
	case 2432:		// カタール
	case 2433:		// 杖
	case 2434:		// ハンマ－
	case 2435:		// 弓
		if(NumSearch(mobData[0],MonsterGroupObj[MONSTER_GROUP_ID_MOROC]) == 1){
			if(n_A_Weapon_ATKplus >= 5) wX += 40;
			if(n_A_Weapon_ATKplus >= 7) wX += 60;
			if(n_A_Weapon_ATKplus >= 9) wX += 80;
		}
		break;
	}

	//--------------------------------
	// モロク特化　タイプ２
	//--------------------------------
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
	case 2436:		// 短剣
		if(NumSearch(mobData[0],MonsterGroupObj[MONSTER_GROUP_ID_MOROC]) == 1){
			if(n_A_Weapon_ATKplus >= 5) wX += 20;
			if(n_A_Weapon_ATKplus >= 7) wX += 30;
			if(n_A_Weapon_ATKplus >= 9) wX += 40;
		}
		break;
	}
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT]) {
	case 2436:		// 短剣
		if(NumSearch(mobData[0],MonsterGroupObj[MONSTER_GROUP_ID_MOROC]) == 1){
			if(n_A_Weapon2_ATKplus >= 5) wX += 20;
			if(n_A_Weapon2_ATKplus >= 7) wX += 30;
			if(n_A_Weapon2_ATKplus >= 9) wX += 40;
		}
		break;
	}

	//--------------------------------
	// フェイスワーム特化
	//--------------------------------
	switch (mobData[0]) {
	case 748:
	case 749:
	case 750:
	case 752:
	case 753:
	case 754:
	case 755:
	case 756:
	case 757:
		if(EquipNumSearch(2490)){
			wX += 5;
			if(n_A_HEAD_DEF_PLUS >= 5) wX += 10;
			if(n_A_HEAD_DEF_PLUS >= 7) wX += 15;
			if(n_A_HEAD_DEF_PLUS >= 9) wX += 20;
		}
		break;
	}

	//--------------------------------
	// 英雄エンチャント特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_EIYUENCHANT]) == 1){
		if(CardNumSearch(CARD_ID_ENCHANT_MANPASHIKUZYOKUNO_GENZYU)){
			wX += 20;
		}
	}

	//--------------------------------
	// 生体特化　タイプ１
	//--------------------------------
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
	case ITEM_ID_REQUIEM_SWORD:			// レクイエムソード
	case ITEM_ID_REQUIEM_ARCWAND:		// レクイエムアークワンド
	case ITEM_ID_REQUIEM_WIZARDSTUFF:	// レクイエムウィザードスタッフ
		if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			wX += 40;
			if(n_A_Weapon_ATKplus >= 5) wX += 20;
			if(n_A_Weapon_ATKplus >= 6) wX += 15 * (n_A_Weapon_ATKplus - 5);
		}
		break;
	}
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT]) {
	case ITEM_ID_REQUIEM_SWORD:			// レクイエムソード
		if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			wX += 40;
			if(n_A_Weapon2_ATKplus >= 5) wX += 20;
			if(n_A_Weapon2_ATKplus >= 6) wX += 15 * (n_A_Weapon2_ATKplus - 5);
		}
		break;
	}

	//--------------------------------
	// 生体特化　タイプ２
	//--------------------------------
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
	case ITEM_ID_REQUIEM_DAGGER:		// レクイエムダガー
		if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			wX += 20;
			if(n_A_Weapon_ATKplus >= 5) wX += 20;
			if(n_A_Weapon_ATKplus >= 6) wX += 15 * (n_A_Weapon_ATKplus - 5);
		}
		break;
	}
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT]) {
	case ITEM_ID_REQUIEM_DAGGER:		// レクイエムダガー
		if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			wX += 20;
			if(n_A_Weapon2_ATKplus >= 5) wX += 20;
			if(n_A_Weapon2_ATKplus >= 6) wX += 15 * (n_A_Weapon2_ATKplus - 5);
		}
		break;
	}

	//--------------------------------
	// タナトス特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_THANATOS]) == 1){
		if (EquipNumSearch(ITEM_ID_USUDUKIYONO_BOSHI)) {
			wX += 5;
			if (n_A_HEAD_DEF_PLUS >= 5) wX += 10;
			if (n_A_HEAD_DEF_PLUS >= 7) wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) wX += 20;
		}
	}

	//--------------------------------
	// 地下排水路特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_CHIKA_HAISUIRO]) == 1){
		if (EquipNumSearch(ITEM_ID_NEKORYOTEKEN_TACHIUO)) wX += 50;
		if (EquipNumSearch(ITEM_ID_NEKOKATAR_TSUNA)) wX += 50;
		if (EquipNumSearch(ITEM_ID_NEKORYOTETSUE_KAZIKI)) wX += 50;
		if (EquipNumSearch(ITEM_ID_NEKORYOTEONO_KUROMAGURO)) wX += 50;
		if (EquipNumSearch(ITEM_ID_NEKOYUMI_KANI)) wX += 50;
		if (EquipNumSearch(ITEM_ID_NEKOTANKEN_AZI)) wX += 25 * EquipNumSearch(ITEM_ID_NEKOTANKEN_AZI);

		if (EquipNumSearch(ITEM_ID_MARAN_KAIZOKUDANBO) > 0) {
			wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) wX += 20;
		}
	}

	//--------------------------------
	// 暴屈折王の洞窟特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_BOKUTSUONO_DOKUTSU]) == 1){
		if (EquipNumSearch(ITEM_ID_NEKORYOTEKEN_TACHIUO)) wX += 50;
		if (EquipNumSearch(ITEM_ID_NEKOKATAR_TSUNA)) wX += 50;
		if (EquipNumSearch(ITEM_ID_NEKORYOTETSUE_KAZIKI)) wX += 50;
		if (EquipNumSearch(ITEM_ID_NEKORYOTEONO_KUROMAGURO)) wX += 50;
		if (EquipNumSearch(ITEM_ID_NEKOYUMI_KANI)) wX += 50;
		if (EquipNumSearch(ITEM_ID_NEKOTANKEN_AZI)) wX += 25 * EquipNumSearch(ITEM_ID_NEKOTANKEN_AZI);

		if (EquipNumSearch(ITEM_ID_MARAN_KAIZOKUDANBO) > 0) {
			wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) wX += 20;
		}
	}

	//--------------------------------
	// 時計塔特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_TOKEITO]) == 1){
		if (EquipNumSearch(ITEM_ID_NIZIIRONO_TSUBASA) > 0) {
			wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) wX += 20;
		}
	}

	//--------------------------------
	// ハートハンター軍事基地特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_HEARTHUNTER]) == 1){
		if (EquipNumSearch(ITEM_ID_GOOGLE_HAT) > 0) {
			wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) wX += 20;
		}
	}

	//--------------------------------
	// ロックリッジ特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_ROCKRIDGE]) == 1){
		if (EquipNumSearch(ITEM_ID_TAURUS_HAT) > 0) {
			wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) wX += 20;
		}
	}

	//--------------------------------
	// ヴェルナー研究所特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_VERNAR]) == 1){
		if (EquipNumSearch(ITEM_ID_ZIKKEN_SEITAI_GOATGATA_CAP) > 0) {
			wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) wX += 20;
		}
	}

	//--------------------------------
	// メロリン特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MELORIN]) == 1){
		if (EquipNumSearch(ITEM_ID_OKYU_MINI_MELON) > 0) {
			wX += 20 * n_A_HEAD_DEF_PLUS;
		}
	}

	//--------------------------------
	// ２５０ページ特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_PAGE250]) == 1){
		if (EquipNumSearch(ITEM_ID_BLACK_VEIL) > 0) {
			wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) wX += 20;
		}
	}

	//--------------------------------
	// 魔神殿特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MAZINDEN]) == 1){
		if (EquipNumSearch(ITEM_ID_DIAVOLOS_WING) > 0) {
			wX += 30;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_ARMOR) > 0) {
			wX += 20;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_ROBE) > 0) {
			wX += 20;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_MANT) > 0) {
			wX += 20;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_BOOTS) > 0) {
			wX += 20;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_RING) > 0) {
			wX += 20;
		}
	}

	//--------------------------------
	// スクロールストール特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SCROLL_STOLE]) == 1){
		if (EquipNumSearch(ITEM_ID_SCROLL_STOLE) > 0) {
			wX += 30;
		}
	}

	//--------------------------------
	// オース二次捜索特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_OS_NIZI_SOSAKU]) == 1){
		if (EquipNumSearch(ITEM_ID_KETTONO_RYU_BOSHI) > 0) {
			wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) wX += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) wX += 20;
		}
	}

	//--------------------------------
	// ミグエル特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MIGEL]) == 1){
		if (EquipNumSearch(ITEM_ID_KETTONO_RYU_BOSHI) > 0) {
			if (n_A_HEAD_DEF_PLUS >= 10) {
				wX += 100;
			}
		}
	}

	//--------------------------------
	// ノーグロード３層特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_NOGUE_ROAD_03]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_KOKA_RAVA_GOLEM)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// フローズンメモリー特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_FROZEN_MEMORY]) == 1){
		if (EquipNumSearch(ITEM_ID_FROZEN_SCALE_SHAWL) > 0) {
			wX += 30;
		}
	}

	//--------------------------------
	// 紫色の深海洞窟特化
	//--------------------------------
	if ((NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MURASAKI_IRONO_SHINKAI_DOKUTSU_ZYOSO]) == 1)
		|| (NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MURASAKI_IRONO_SHINKAI_DOKUTSU_KASO]) == 1)) {

		if ((cardCount = CardNumSearch(CARD_ID_SHINKAINO_HANGYOZIN)) > 0) {
			wX += 30 * cardCount;
		}

		if (EquipNumSearch(ITEM_ID_SHINKAI_SEIBUTSUNO_MANT) > 0) {
			wX += 30;
		}
	}

	//--------------------------------
	// ネジリアン帝国特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_NEZIRIAN_TEKOKU]) == 1){
		if (EquipNumSearch(ITEM_ID_KIGURUMI_BEARDOLL) > 0) {
			wX += 30;
		}
	}

	//--------------------------------
	// 幻想の北洞窟ルワンダ特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_GENSONO_KITA_DOKUTSU_RUWANDA]) == 1){
		if (EquipNumSearch(ITEM_ID_ANCIENT_MEGALIS_MANT) > 0) {
			wX += 30;
		}
	}

	//--------------------------------
	// 歪んだ迷宮の森特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_YUGANDA_MEIKYUNO_MORI]) == 1){
		if (EquipNumSearch(ITEM_ID_YAGIGENO_MUFFLER) > 0) {
			wX += 30;
		}
	}

	//--------------------------------
	// 認識の庭特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_NINSHIKINO_NIWA]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_MAZIMENA_HETAI_ANDRE)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// 鉱山ダンジョン03特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_KOZAN_DUNGEON_03]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_NEO_MINERAL)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// アビスレイク地下洞窟04特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_ABYSS_LAKE_CHIKA_DOKUTSU_04]) == 1){
		if (EquipNumSearch(ITEM_ID_DRAGON_SCALE_SHAWL) > 0) {
			wX += 30;
		}
		if ((cardCount = CardNumSearch(CARD_ID_BONE_PHEROS)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// 廃棄実験体遊技場ルドゥス4階特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_HAIKI_ZIKKENTAI_YUGIZYO_RUDUS_4F]) == 1){
		if (EquipNumSearch(ITEM_ID_DISCARDED_CAPE) > 0) {
			wX += 30;
		}
		if ((cardCount = CardNumSearch(CARD_ID_VENEDI)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// 崩れたオペラハウス特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_NIFLHEIM_DUNGEON_KUZURETA_OPERA_HOUSE]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_PIERROT_ZOIST)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// 大浴場メディタティオ特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_BALMUNT_TE_DAIYOKUZYO_MEDITATIO]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_NETTO_PHEN)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// 貯蔵庫タルタロス特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_BALMUNT_TE_CHOZOKO_TARUTAROS]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_KOSHOSHITA_KEBIGATA_BETA)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// 第2魔力発電所特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_BALMUNT_TE_DAI2_MARYOKU_HATSUDENSHO]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_KYORYOKUNA_MARYOKU)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// 灰色狼の森特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_HAIIRO_OKAMINO_MORI]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_GRAY_WOLF)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// オズの迷路特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_OZNO_MEIRO]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_VALTY)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// 廃棄実験所アミシティア特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_HAIKI_ZIKKENZYO_AMISITIA]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_HENI_CHIMERA_VANILAQUS)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// 捨てられた穴01特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SUTERARETA_ANA_01]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_DOKUTSU_CALMARING)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// 捨てられた穴02特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SUTERARETA_ANA_02]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_TANGAN_DOLLOCARIS)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// 蛇神の温もり特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_HEBIGAMINO_NUKUMORI]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_SAIKAKYU_RGAN)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// アルデバラン時計塔地下 未知の空間特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_TOKEITO_MICHI_NO_KUUKAN]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_GENERAL_ORK)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// 魔力が歪んだ平原 特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_PLAINS_DISTORTED_BY_MAGIC]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_HARD_ROCK_TITAN)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// ミョルニール地下洞窟 特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MIOLNIR_UNDERGROUND_CAVE]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_PUNCH_BUG)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// イスガルド北部（凍て付いた鱗の海辺、古代の氷の峡谷 東部、古代の氷の峡谷 西部） 特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_ISGARD_NORTH_FIELD]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_FAKE_IWIN_SOLDIERS)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// 蛇神の根源 特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_JOR_ROOT]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_JOR_MUNGANDR_GUARDIAN)) > 0) {
			wX += 30 * cardCount;
		}
	}

	//--------------------------------
	// 英雄の痕跡支援
	//--------------------------------
	if(TimeItemNumSearch(72)){
		if(743 <= mobData[0] && mobData[0] <= 757) wX += 20;
		if(769 <= mobData[0] && mobData[0] <= 786) wX += 20;
	}

	//--------------------------------
	// 12thアニバ星座支援
	//--------------------------------
	if(TimeItemNumSearch(80)) wX += 30;

	//--------------------------------
	// 「性能カスタマイズ」の、地域特化効果
	//--------------------------------
	confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_GROUP_DAMAGE_UP);
	if (confval != 0) {
		wX += confval;
	}

	// TODO: データ移行過渡処理
	// 計算したSP効果を、移行前のデータ形式に変換して、加算する
	if (IsEnableMigrationBlockTransit()) {
		var idxMap = 0;
		var candidateMapIdArray = null;
		var spTag = null;
		// 当該モンスターの出現するマップIDを収集
		candidateMapIdArray = [];
		for (idxMap = 0; idxMap < g_MonsterMapDataArray.length; idxMap++) {
			if (g_MonsterMapDataArray[idxMap][MONSTER_MAP_DATA_INDEX_DATA_ARRAY].indexOf(mobData[MONSTER_DATA_INDEX_ID]) >= 0) {
				candidateMapIdArray.push(g_MonsterMapDataArray[idxMap][MONSTER_MAP_DATA_INDEX_ID]);
			}
		}
		// すべての出現マップをループ
		for (idxMap = 0; idxMap < candidateMapIdArray.length; idxMap++) {
			spTag = new CMigEquipableSpTag()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_MAGICAL)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_BY_ATTACK)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_MAP_MONSTER, candidateMapIdArray[idxMap])
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT);
			wX += g_charaDataManager.GetCharaData(MIG_CHARA_MANAGER_ID_MAIN).GetSpValue(spTag, null, MIG_EFFECTIVE_SP_CALC_MODE_SUM);
			wX += g_charaDataManager.GetCharaData(MIG_CHARA_MANAGER_ID_MAIN).GetSetSpValue(spTag, null, MIG_EFFECTIVE_SP_CALC_MODE_SUM);
		}
	}
	// 移行前データでの処理（移行完了まで必要）
	else {
		//--------------------------------
		// グラストヘイムアビス特化
		//--------------------------------
		if(NumSearch(mobData[MONSTER_DATA_INDEX_ID], MonsterGroupObj[MONSTER_GROUP_ID_GLASTHEIM_ABYSS]) == 1){
			if (EquipNumSearch(ITEM_ID_SHIROKISHINO_MANT) > 0) {
				wX += 10;
				if (n_A_SHOULDER_DEF_PLUS >= 5) {
					wX += 15;
				}
				if (n_A_SHOULDER_DEF_PLUS >= 7) {
					wX += 15;
				}
			}
		}
	}
	if(wX != 0) {
		dmg = Math.floor(dmg * (100 + wX) / 100);
	}
	return dmg;
}

/**
 * 魔法使用時に、種族特攻をダメージに適用する
 * @param {*} charaData 未使用の引数
 * @param {*} specData 未使用の引数
 * @param {*} mobData 
 * @param {*} dmg 
 * @returns 
 */
function ApplyMagicalSpecializeMonsterMod20211014SubSpecializeRace(charaData, specData, mobData, dmg) {
	var wX = 0;
	// 対プレイヤーでない場合
	if (mobData[MONSTER_DATA_INDEX_ID] != MONSTER_ID_PLAYER) {
		// 種族特化をそのまま適用
		wX += n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_SOLID + mobData[MONSTER_DATA_INDEX_RACE]];
		// 人間形（プレイヤー除く）の適用
		if (mobData[MONSTER_DATA_INDEX_RACE] == RACE_ID_HUMAN) {
			wX += n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER];
		}
	}
	// 対プレイヤーの場合
	else {
		// 対プレイヤー特化の適用
		wX += n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_ALL];
		// 対プレイヤー設定の種族に基づき、参照値を変更
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SHUZOKU]) {
		// 種族が人間に設定されている場合は、人間特化を適用
		case MOB_CONF_PLAYER_ID_SHUZOKU_HUMAN:
			wX += n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN];
			wX += n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_HUMAN];
			break;
		// 種族がドラムに設定されている場合は、ドラム特化を適用
		case MOB_CONF_PLAYER_ID_SHUZOKU_DORAM:
			wX += n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_DORAM];
			break;
		}
	}
	if(wX != 0) {
		dmg = Math.floor(dmg * (100 + wX) / 100);
	}
	return dmg;
}

/**
 * 魔法使用時に、サイズ特攻をダメージに適用する
 * @param {*} charaData 未使用の引数
 * @param {*} specData 未使用の引数
 * @param {*} mobData 
 * @param {*} dmg 
 * @returns 
 */
function ApplyMagicalSpecializeMonsterMod20211014SubSpecializeSize(charaData, specData, mobData, dmg) {
	var wX = 0;
	// 対プレイヤーでない場合
	if (mobData[MONSTER_DATA_INDEX_ID] != MONSTER_ID_PLAYER) {
		// モンスターのサイズ定義に従い、そのまま適用
		wX += n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL + mobData[MONSTER_DATA_INDEX_SIZE]];
	}
	// 対プレイヤーの場合
	else {
		// 対プレイヤー設定の種族に基づき、参照値を変更
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SHUZOKU]) {
			// 種族が人間に設定されている場合は、中型特化を適用
			case MOB_CONF_PLAYER_ID_SHUZOKU_HUMAN:
				wX += n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_MEDIUM];
				break;
			// 種族がドラムに設定されている場合は、小型特化を適用
			case MOB_CONF_PLAYER_ID_SHUZOKU_DORAM:
				wX += n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL];
				break;
		}
	}
	if(wX != 0) {
		dmg = Math.floor(dmg * (100 + wX) / 100);
	}
	return dmg;
}

/**
 * 魔法使用時に、モンスターの属性特攻をダメージに適用する
 * @param {*} charaData 未使用の引数
 * @param {*} specData 未使用の引数
 * @param {*} mobData 
 * @param {*} dmg 
 * @returns 
 */
function ApplyMagicalSpecializeMonsterMod20211014SubSpecializeMonsterElement(charaData, specData, mobData, dmg) {
	var wX = 0;
	wX = n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_VANITY + Math.floor(mobData[MONSTER_DATA_INDEX_ELEMENT] / 10)];
	if(wX != 0) {
		dmg = Math.floor(dmg * (100 + wX) / 100);
	}
	return dmg;
}

/**
 * 属性魔法ダメージ増加を適用する
 * @param {*} charaData 未使用の引数
 * @param {*} specData 未使用の引数
 * @param {*} mobData 未使用の引数
 * @param {*} dmg 
 * @returns 
 */
function ApplyMagicalSpecializeMonsterMod20211014SubSpecializeMagicElement(charaData, specData, mobData, dmg) {
	var wX = 0;
	// 魔法スキルの場合、処理の途中で武器属性がスキルによって上書きされる
	if(n_A_Weapon_zokusei >= 0){
		wX = n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY + n_A_Weapon_zokusei];
	}
	if(wX != 0) {
		dmg = Math.floor(dmg * (100 + wX) / 100);
	}
	return dmg;
}

/**
 * 魔法使用時に、ボス特攻・一般特攻をダメージに適用する
 * @param {*} charaData 未使用の引数
 * @param {*} specData 未使用の引数
 * @param {*} mobData 
 * @param {*} dmg 
 * @returns 
 */
function ApplyMagicalSpecializeMonsterMod20211014SubSpecializeBossType(charaData, specData, mobData, dmg) {
	var wX = 0;
	// ボス特化
	if(mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == 1){
		wX = n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_BOSS];
		// マジカルブースター＆サザンクロスセットによるＢＯＳＳ特化
		if(EquipNumSearch(1627)){
			wX += 2;
			if(n_A_HEAD_DEF_PLUS >= 5) wX += 3;
			if(n_A_HEAD_DEF_PLUS >= 7) wX += 4;
		}
	}
	// 一般特化
	else {
		wX = n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_NOTBOSS];
	}
	if(wX != 0) {
		dmg = Math.floor(dmg * (100 + wX) / 100);
	}
	return dmg;
}


/**
 * 属性耐性を適用する
 * @param dmg ダメージ
 * @return 適用後のダメージ
 */
function ApplyResistElement(mobData, dmg) {
	var wX = 0;
	var bufLv = 0;
	// 敵が対プレイヤーの場合、対プレイヤー設定欄のサイズ耐性を適用
	if(mobData[0] == MONSTER_ID_PLAYER) {
		// ドラム族は小型なので注意
		if (IsDoramJob(n_A_JOB)) {
			wX += n_B_TAISEI[MOB_CONF_PLAYER_ID_KOGATA_TAISEI];
		}
		else {
			wX += n_B_TAISEI[MOB_CONF_PLAYER_ID_CHUGATA_TAISEI];
		}
	}
	dmg -= ROUNDDOWN(dmg * wX / 100);

	wX = 0;
	// 敵が対プレイヤーの場合、対プレイヤー設定欄の一般モンスター耐性を適用
	if(mobData[0] == MONSTER_ID_PLAYER) {
		wX += n_B_TAISEI[MOB_CONF_PLAYER_ID_IPPAN_MONSTER_TAISEI];
	}
	dmg -= ROUNDDOWN(dmg * wX / 100);

	wX = 0;
	// 毒属性武器、かつ、べナムインプレス状態の場合（判定順序は意図的に変えてある）
	if ((bufLv = n_B_IJYOU[MOB_CONF_DEBUF_ID_VENOM_IMPRESS]) > 0) {
		if (n_A_Weapon_zokusei == ELM_ID_POISON) {
			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {
				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					wX -= 75 + 5 * bufLv;
					break;
				default:
					wX -= 10 * bufLv;
					break;
			}
		}
	}
	// 聖属性武器、かつ、オラティオ状態の場合（判定順序は意図的に変えてある）
	if ((bufLv = n_B_IJYOU[MOB_CONF_DEBUF_ID_ORATIO]) > 0) {
		if (n_A_Weapon_zokusei == ELM_ID_HOLY) {
			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {
				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					wX -= 40 + 5 * bufLv + 5 * Math.max(0, (bufLv - 8));
					break;
				default:
					wX -= 5 * bufLv;
					break;
			}
		}
	}
	// 闇属性武器、かつ、死霊憑依状態の場合（判定順序は意図的に変えてある）
	if ((bufLv = n_B_IJYOU[MOB_CONF_DEBUF_ID_SHIRYO_HYOI]) > 0) {
		if (n_A_Weapon_zokusei == ELM_ID_DARK) {
			if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_BOSS) {
				wX -= 20;
			}
			else {
				wX -= 100;
			}
		}
	}
	// 地属性武器、かつ、クライマックスクエイク状態の場合（判定順序は意図的に変えてある）
	if ((bufLv = n_B_IJYOU[MOB_CONF_DEBUF_ID_CLIMAX_QUAKE]) > 0) {
		if (n_A_Weapon_zokusei == ELM_ID_EARTH) {
			wX -= 50;
		}
	}
	// 火属性武器、かつ、クライマックスブルーム状態の場合
	if ((bufLv = n_B_IJYOU[MOB_CONF_DEBUF_ID_CLIMAX_BLOOM]) > 0) {
		if (n_A_Weapon_zokusei == ELM_ID_FIRE) {
			wX -= 50;
		}
	}
	// 敵が対プレイヤーの場合、対プレイヤー設定欄の属性耐性を適用
	if(mobData[0] == MONSTER_ID_PLAYER){
		wX += n_B_TAISEI[MOB_CONF_PLAYER_ID_MU_ZOKUSEI_TAISEI + n_A_Weapon_zokusei];
		// さらに、物理耐性も適用
		if(n_Enekyori == 0 || n_Enekyori == 1) {
			wX += n_B_TAISEI[MOB_CONF_PLAYER_ID_BUTSURI_TAISEI];
		}
	}
	dmg -= ROUNDDOWN(dmg * wX / 100);

	wX = 0;
	// 敵が対プレイヤーの場合、対プレイヤー設定欄の属性モンスター耐性を適用
	if(mobData[0] == MONSTER_ID_PLAYER) {
		wX += n_B_TAISEI[MOB_CONF_PLAYER_ID_ZOKUSEI_MONSTER_TAISEI];
	}
	dmg -= ROUNDDOWN(dmg * wX / 100);

	return dmg;
}

/**
 * アースクエイク、グランドクロス専用の耐性計算処理
 * @param {*} w_Tai_DMG 
 * @returns 
 */
function BaiTaisei_A_SP(w_Tai_DMG) {
	var wX = n_tok[ITEM_SP_RESIST_SIZE_MEDIUM];
	if(n_A_PassSkill8[13] == 1) wX = n_tok[ITEM_SP_RESIST_SIZE_SMALL];
	w_Tai_DMG -= ROUNDDOWN(w_Tai_DMG * wX / 100);
	wX = n_tok[ITEM_SP_RESIST_NOTBOSS];
	w_Tai_DMG -= ROUNDDOWN(w_Tai_DMG * wX / 100);
	wX = n_tok[ITEM_SP_RESIST_ELM_VANITY + n_A_Weapon_zokusei];
	w_Tai_DMG -= ROUNDDOWN(w_Tai_DMG * wX / 100);
	wX = n_tok[ITEM_SP_RESIST_MONSTER_ELM_VANITY + n_A_BodyZokusei];
	w_Tai_DMG -= ROUNDDOWN(w_Tai_DMG * wX / 100);
	return w_Tai_DMG;
 }


/**
 * 対プレイヤー一般耐性を適用する.
 * @param dmg ダメージ
 * @return 適用後のダメージ
 */
function ApplyRegistPVPNormal(mobData, dmg) {
	var wX = 0;
	// 敵が対プレイヤーの場合、対プレイヤー設定欄の人間orドラム形耐性を適用
	if(mobData[0] == MONSTER_ID_PLAYER) {
		if (IsDoramJob(n_A_JOB)) {
			wX = n_B_TAISEI[MOB_CONF_PLAYER_ID_DORAM_KEI_TAISEI];
		}
		else {
			wX = n_B_TAISEI[MOB_CONF_PLAYER_ID_NINGEN_KEI_TAISEI];
		}
		dmg -= ROUNDDOWN(dmg * wX / 100);
		// 遠距離攻撃の場合、遠距離耐性も適用
		if(n_Enekyori == 1){
			wX = n_B_TAISEI[MOB_CONF_PLAYER_ID_ENKYORI_BUTSURI_TAISEI];
			dmg -= ROUNDDOWN(dmg * wX / 100);
		}
	}
	return dmg;
 }

/**
 * ソウルブレイカー専用の人間耐性処理
 * @param {*} mobData 
 * @param {*} w_Tai_DMG 
 * @returns 
 */
function BaiTaisei_C(mobData, w_Tai_DMG) {
	var wX = 0;
	if(mobData[0] == MONSTER_ID_PLAYER) wX += n_B_TAISEI[MOB_CONF_PLAYER_ID_NINGEN_KEI_TAISEI];
	w_Tai_DMG -= ROUNDDOWN(w_Tai_DMG * wX / 100);
	return w_Tai_DMG;
 }


/**
 * 対プレイヤーのエナジーコード効果を適用する.
 * @param dmg ダメージ
 * @return 適用後のダメージ
 */
function ApplyRegistPVPEnergyCoat(mobData, dmg) {
	var wX = 0;
	// 敵が対プレイヤーの場合、対プレイヤー設定欄のエナジーコート効果を適用
	if(mobData[0] == MONSTER_ID_PLAYER) {
		wX += 6 * n_B_TAISEI[MOB_CONF_PLAYER_ID_ENERGY_COAT];
		dmg -= ROUNDDOWN(dmg * wX / 100);
	}
	return dmg;
 }

/**
 * グランドクロス専用の遠距離耐性処理
 * @param {*} mobData 
 * @param {*} w_Tai_DMG 
 * @returns 
 */
function BaiTaisei_E(mobData, w_Tai_DMG) {
	var wX = 0;
	if(n_Enekyori == 1){
		wX = 0;
		if(mobData[0] == MONSTER_ID_PLAYER) wX += n_B_TAISEI[MOB_CONF_PLAYER_ID_ENKYORI_BUTSURI_TAISEI];
		w_Tai_DMG -= ROUNDDOWN(w_Tai_DMG * wX / 100);
	}
	return w_Tai_DMG;
 }


HEALTYPE_HEAL = 0;
HEALTYPE_HIGHNESS = 1;
HEALTYPE_SANCTUARY = 2;
HEALTYPE_SHINSENNA_EBI = 3;
HEALTYPE_EBI_ZANMAI = 4;
HEALTYPE_COLUCEO_HEAL = 5;

HEAL_TARGETTYPE_SELF = 0;
HEAL_TARGETTYPE_PLAYER = 1;
HEAL_TARGETTYPE_ENEMY = 2;

/**
 * ヒール回復量を計算する.
 * @param HealLv ヒールレベル
 * @param HealType ヒール種別
 * @param wMinMax 取得する種類（0：最小、1：平均、2：最大）
 * @param w_WHO 対象
 * @param ptmCount PT人数
 */
function HealCalc(HealLv,HealType,wMinMax,w_WHO,ptmCount) {

	var wHeal = 0;

	// H.Plus
	var valHPlus = GetHPlus();

	// 基本ヒール回復量の算出
	switch (HealType) {

	case HEALTYPE_HEAL:
	case HEALTYPE_COLUCEO_HEAL:
		wHeal = Math.floor((n_A_BaseLV + n_A_INT) / 5) * 3 * HealLv;
		break;

	case HEALTYPE_HIGHNESS:
		wHeal = Math.floor((n_A_BaseLV + n_A_INT) / 5) * 3 * 10;
		break;

	case HEALTYPE_SHINSENNA_EBI:
		wHeal = Math.floor((n_A_BaseLV + n_A_INT) / 5) * 7.5;
		break;

	case HEALTYPE_EBI_ZANMAI:
		wHeal = Math.floor((n_A_BaseLV + n_A_INT) / 5) * 7.5;
		break;

	}



	// 回復量増強効果の算出
	var healUp = 100 + n_tok[ITEM_SP_HEAL_UP_USING];
	if (w_WHO == HEAL_TARGETTYPE_ENEMY && HealType == HEALTYPE_HEAL) {
		healUp += n_tok[93];
	}



	// ＭＡＴＫ分の回復量の算出
	var wHealMatk = 0;
	var wMin = Math.max(0, n_Heal_MATK[0]);
	var wMax = Math.max(0, n_Heal_MATK[2]);

	if (wMin > wMax) {
		wMin = wMax;
	}

	switch (wMinMax) {
	case 0:
		wHealMatk += wMin;
		break;
	case 1:
		wHealMatk += Math.floor((wMin + wMax) / 2);
		break;
	case 2:
		wHealMatk += wMax;
		break;
	}



	// 最終回復量の計算
	switch (HealType) {
	case HEALTYPE_HEAL:
	case HEALTYPE_COLUCEO_HEAL:
	case HEALTYPE_HIGHNESS:
		wHeal = Math.floor(wHeal * healUp / 100 + wHealMatk + (((n_A_BaseLV + n_A_INT) / 5) * 3 * HealLv * valHPlus / 100));
		if (HealType == HEALTYPE_COLUCEO_HEAL) {
			wHeal = Math.floor(wHeal * (1 + 0.025 * ptmCount));
		}
		break;

	case HEALTYPE_SHINSENNA_EBI:
		wHeal = wHeal * healUp / 100 + wHealMatk / 2;

		// 海の魂習得による増強効果
		if (UsedSkillSearch(SKILL_ID_UMINO_TAMASHI) > 0) {
			// なぜか１．６倍の効果がある
			wHeal = wHeal * 1.6;
		}

		wHeal = Math.floor(wHeal);

		break;

	case HEALTYPE_EBI_ZANMAI:
		var healRatio = [1, 2, 4, 7, 8];
		wHeal = wHeal * healUp / 100 + wHealMatk / 4;
		wHeal = Math.floor(wHeal * healRatio[HealLv - 1]);
		break;
	}



	// ハイネスヒールの場合のレベル倍率適用
	if (HealType == HEALTYPE_HIGHNESS) {

		// 特定の戦闘エリアでの補正
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
			wHeal = Math.floor(wHeal * (510 + 90 * HealLv) / 100);
			break;

		default:
			wHeal = Math.floor(wHeal * (170 + 30 * HealLv) / 100);
			break;

		}
	}

	// 自分に使用した場合の増強効果適用
	if (w_WHO == HEAL_TARGETTYPE_SELF) {
		switch (HealType) {
		case HEALTYPE_SHINSENNA_EBI:
			// なぜか1.25倍の効果がある
			wHeal = Math.floor(wHeal * (100 + n_tok[ITEM_SP_HEAL_UP_USED] * 1.25) / 100);
			break;

		case HEALTYPE_EBI_ZANMAI:
			// なぜか効果率が変動する
			var usedRatio = [4, 2, 1, 0.5725, 0.5];
			wHeal = Math.floor(wHeal * (100 + n_tok[ITEM_SP_HEAL_UP_USED] * usedRatio[HealLv - 1]) / 100);
			break;

		default:
			wHeal = Math.floor(wHeal * (100 + n_tok[ITEM_SP_HEAL_UP_USED]) / 100);
			break;
		}
	}

	// 敵に使用した場合のストーンスキン効果を適用
	if(w_WHO == HEAL_TARGETTYPE_ENEMY && n_B_KYOUKA[7]) {
		wHeal += Math.floor(wHeal * (20 * n_B_KYOUKA[7]) / 100);
	}

	return wHeal;
 }




/**
 * 戦闘結果表示部を組み立てる.
 */
function BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray) {

	// 命中率が１００％未満の場合、必中ダメージがあれば追加表示
	if(n_PerfectHIT_DMG > 0 && w_HIT_HYOUJI <100){
		str_bSUBname += "<Font size=2>Miss時の必中ダメージ</Font>";
		if(str_PerfectHIT_DMG == 0){
			if(wActiveHitNum > 1){
				var w = ROUNDDOWN(n_PerfectHIT_DMG / wActiveHitNum);
				str_bSUB += __DIG3(w * wActiveHitNum) +"("+ __DIG3(w) +"×"+ wActiveHitNum +"Hit)";
			}
			else str_bSUB += __DIG3(n_PerfectHIT_DMG);
		}else str_bSUB += str_PerfectHIT_DMG;
	}


	myInnerHtml("bSUBname",str_bSUBname,0);
	myInnerHtml("bSUB",str_bSUB,0);
	myInnerHtml("BattleHIT",w_HIT_HYOUJI,0);
	myInnerHtml("BattlePerfectHIT",n_tok[ITEM_SP_PERFECT_ATTACK_UP],0);
//	myInnerHtml("nm067","％",0);



	// 二刀流の通常攻撃時の表示部分
	if(n_Nitou && n_A_ActiveSkill == 0){
		myInnerHtml("BattleHIT",w_HIT_HYOUJI +"％(左手"+ w_HIT +"％)",0);
//		myInnerHtml("nm067","",0);
	}



	// TODO : 謎処理　通常攻撃とグラビテーションフィールド以外
	if(mobData[21]==6 && n_A_ActiveSkill != 0 && n_A_ActiveSkill != 325){
		for(var i=0;i<=2;i++){
			w_DMG[i] = 0;
			g_damageTextArray[i] = ["Miss"];
		}
		myInnerHtml("MinATKnum","無理です",0);
		myInnerHtml("AveATKnum","無理です",0);
		myInnerHtml("MaxATKnum","無理です",0);
		myInnerHtml("AveSecondATK","-",0);
		myInnerHtml("AtkBaseExp","-",0);
		myInnerHtml("AtkJobExp","-",0);
		myInnerHtml("BattleTime","-",0);

		return;
	}



	// スキル使用不可武器の場合の表示部分
	if(n_Buki_Muri == 1){
		for(var i=0;i<=2;i++) w_DMG[i] = 0;
		g_damageTextArray[0] = ["<B>この武器では</B>"];
		g_damageTextArray[1] = ["<B>このスキルを</B>"];
		g_damageTextArray[2] = ["<B>使用できません</B>"];
		myInnerHtml("MinATKnum","-",0);
		myInnerHtml("AveATKnum","-",0);
		myInnerHtml("MaxATKnum","-",0);
		myInnerHtml("AveSecondATK","-",0);
		myInnerHtml("AtkBaseExp","-",0);
		myInnerHtml("AtkJobExp","-",0);
		myInnerHtml("BattleTime","-",0);

		return;
	}



	g_AttackCount = [-1, -1, -1];

	// 最小攻撃回数表示部の組み立て
	if(w_DMG[2] > 0){

		// 最小攻撃回数を算出
		g_AttackCount[0] = Math.ceil(mobData[3] / w_DMG[2]);

		// 最小攻撃回数が１万回未満ならば、そのまま表示
		if(g_AttackCount[0] < 10000) {
			myInnerHtml("MinATKnum",__DIG3(g_AttackCount[0]),0);
		}
		// １万回を超える場合は特殊表示
		else {
			myInnerHtml("MinATKnum",SubName[5],0);
		}

	}else{
		myInnerHtml("MinATKnum","<Font size=2>計算不能<BR>(0ダメージなので)</Font>",0);
	}



	// 多段ＨＩＴスキルで１殺の場合、１殺できる確率を表示する
	var w;
	if(SG_Special_HITnum != 0){

		if(w == 1){

			var wHITnum;
			var x;

			wHITnum = SG_Special_HITnum;
			x = (SG_Special_DMG[2] * wHITsuu - mobData[3]) / (SG_Special_DMG[2] * wHITsuu - SG_Special_DMG[0] * wHITsuu);

			if(x > 1) x = 1;
			if(x < 0) x = 0;

			if(wHITnum == 2){
				if(x < 0.5) x = 2 * x * x;
				else x = 1 - 2 * (1-x) * (1-x);
			}

			if(wHITnum == 3){
				if(x <(1/3)) x = 4.5 * Math.pow(x,3);
				else if((1/3) <= x && x <(2/3)) x = 4.5 * (Math.pow(x,3) - 3 * Math.pow(x-1/3,3));
				else if((2/3) <= x) x = 1 - 4.5 * Math.pow(1-x,3);
			}

			if(wHITnum >= 4){
				var y = Math.sqrt(Math.pow(SG_Special_DMG[2]-SG_Special_DMG[0],2) / 12 * wHITnum);
				x = (SG_Special_DMG[1] * wHITsuu - mobData[3]) / y;
				if(x >= 0) x = 0.5+0.5*Math.sqrt(1-Math.exp(-2*Math.pow(x,2)/Math.PI));
				else x = 0.5-0.5*Math.sqrt(1-Math.exp(-2*Math.pow(x,2)/Math.PI));
			}

			x = Math.floor(x * 10000) / 100;

			myInnerHtml("MinATKnum","1(1回で倒せる確率"+ x +"%)",0);
		}

		SG_Special_HITnum = 0;
	}



	//----------------------------------------------------------------
	// 経験値効率計算モード（SPMODE）の場合
	//----------------------------------------------------------------
	var atkCountAve = 0;
	var battleTimeAve = 0;
	var perexpBaseAve = 0;
	var perexpJobAve = 0;

	// 経験値効率計算モードの場合、かつ、確殺モードの場合
	if(g_SPMODE_FLAG == 1 && g_SPMODE_KAKUSATSU_MODE == 1){

		// 最少ダメージがモンスターのＨＰ以上となる場合、すなわち、確殺できる場合
		if(w_DMG[0] >= mobData[3]){
			g_SPMODE_MONSTER_RESULT[g_SPMODE_MONSTER_INDEX][SPMODE_MONSTER_RESULT_INDEX_RESULT_FLAG] = 1;
			g_SPMODE_MONSTER_RESULT[g_SPMODE_MONSTER_INDEX][SPMODE_MONSTER_RESULT_INDEX_PEREXP_BASE] = mobData[15];
			g_SPMODE_MONSTER_RESULT[g_SPMODE_MONSTER_INDEX][SPMODE_MONSTER_RESULT_INDEX_PEREXP_JOB] = mobData[16];
			g_SPMODE_MONSTER_RESULT[g_SPMODE_MONSTER_INDEX][SPMODE_MONSTER_RESULT_INDEX_BATTLE_TIME] = wCast + wDelay;
			g_SPMODE_MONSTER_RESULT[g_SPMODE_MONSTER_INDEX][SPMODE_MONSTER_RESULT_INDEX_HIT_RATE] = w_HIT_HYOUJI;
			g_SPMODE_MONSTER_RESULT[g_SPMODE_MONSTER_INDEX][SPMODE_MONSTER_RESULT_INDEX_FLEE_RATE] = Math.floor((w_FLEE + (100 - w_FLEE) * charaData[CHARA_DATA_INDEX_LUCKY] / 100) * 100) / 100;
		}

		// 処理終了
		return;
	}

	// 経験値効率計算モードの場合、かつ、確殺モードでない場合
	else if(g_SPMODE_FLAG == 1){

		// 平均ダメージが 0 より大きい場合のみ、計算を実施
		while (w_DMG[1] > 0){

			// 平均攻撃回数を算出
			atkCountAve = Math.ceil(mobData[3] / w_DMG[1]);

			// 平均戦闘時間を算出
			battleTimeAve = (wCast + wDelay) * atkCountAve;
			battleTimeAve = Math.floor(battleTimeAve * 100) / 100;

			// 条件検査
			// 平均戦闘時間が指定範囲外の場合、処理を抜ける
			if (battleTimeAve < g_RankingConditionBattleTimeMin) {
				break;
			}
			if (g_RankingConditionBattleTimeMax < battleTimeAve) {
				break;
			}

			// 平均一撃経験値を算出し、結果配列に格納
			perexpBaseAve = Math.round(mobData[15] / atkCountAve);
			perexpJobAve = Math.round(mobData[16] / atkCountAve);

			// 計算した結果を、結果配列に格納
			g_SPMODE_MONSTER_RESULT[g_SPMODE_MONSTER_INDEX][SPMODE_MONSTER_RESULT_INDEX_RESULT_FLAG] = 1;
			g_SPMODE_MONSTER_RESULT[g_SPMODE_MONSTER_INDEX][SPMODE_MONSTER_RESULT_INDEX_PEREXP_BASE] = perexpBaseAve;
			g_SPMODE_MONSTER_RESULT[g_SPMODE_MONSTER_INDEX][SPMODE_MONSTER_RESULT_INDEX_PEREXP_JOB] = perexpJobAve;
			g_SPMODE_MONSTER_RESULT[g_SPMODE_MONSTER_INDEX][SPMODE_MONSTER_RESULT_INDEX_BATTLE_TIME] = battleTimeAve;
			g_SPMODE_MONSTER_RESULT[g_SPMODE_MONSTER_INDEX][SPMODE_MONSTER_RESULT_INDEX_HIT_RATE] = w_HIT_HYOUJI;
			g_SPMODE_MONSTER_RESULT[g_SPMODE_MONSTER_INDEX][SPMODE_MONSTER_RESULT_INDEX_FLEE_RATE] = Math.floor((w_FLEE + (100 - w_FLEE) * charaData[CHARA_DATA_INDEX_LUCKY] / 100) * 100) / 100;

			break;
		}

		// 処理終了
		return;
	}



	// 最大攻撃回数表示部の組み立て
	// 命中率が１００％未満の場合は、特殊表示
	if(w_HIT_HYOUJI <100 && n_PerfectHIT_DMG == 0){
		myInnerHtml("MaxATKnum","<Font size=2>計算不能<BR>(命中100未満なので)</Font>",0);
	}
	// 命中率が１００％の場合は、確殺を計算
	else{
		var wX = w_DMG[0];
		if(w_HIT_HYOUJI <100) wX = n_PerfectHIT_DMG;
		if(wX > 0){
			g_AttackCount[2] = Math.ceil(mobData[3] / wX);
			if(g_AttackCount[2]<10000) myInnerHtml("MaxATKnum",__DIG3(g_AttackCount[2]),0);
			else myInnerHtml("MaxATKnum",SubName[5],0);
		}else{
			myInnerHtml("MaxATKnum","<Font size=2>計算不能<BR>(0ダメージなので)</Font>",0);
		}
	}



	// 平均攻撃回数表示部の組み立て
	// TODO : 詳細未解析
	g_dps = 0;
	if(w_DMG[1] > 0){
		var check=0;
		for(var j = 0; j < n_AS_SKILL.length; j++){
			if(n_AS_SKILL[j][0] != -1) check = 1;
		}
		if((w_DMG[1] <w_DMG_AS_OverHP) || check == 0){
			g_AttackCount[1] = Math.ceil(mobData[3] / w_DMG[1]);
		}else{
			g_AttackCount[1] = Math.ceil(mobData[3] / w_DMG_AS_OverHP);
		}

		if(g_AttackCount[1]<10000){
			myInnerHtml("AtkBaseExp",__DIG3(Math.round(mobData[15] / g_AttackCount[1])) +"Exp",0);
			myInnerHtml("AtkJobExp",__DIG3(Math.round(mobData[16] / g_AttackCount[1])) +"Exp",0);
		}else{
			myInnerHtml("AtkBaseExp",SubName[7],0);
			myInnerHtml("AtkJobExp",SubName[7],0);
		}

		if(g_AttackCount[1]<10000){
			myInnerHtml("AveATKnum",__DIG3(g_AttackCount[1]),0);
			n_AveATKnum = g_AttackCount[1];
			var w2 = (wCast + wDelay) * n_AveATKnum;
			w2 = Math.floor(w2 * 100) / 100;
			if(n_Delay[0]) myInnerHtml("BattleTime","特殊",0);
			else myInnerHtml("BattleTime",__DIG3(w2) + "秒",0);
		}else{
			myInnerHtml("AveATKnum",SubName[5],0);
			myInnerHtml("BattleTime",SubName[6],0);
		}

		g_dps = 1 / (wCast + wDelay) * w_DMG[1];
		g_dps *= 100;
		g_dps = Math.round(g_dps);
		g_dps /= 100;
		if(n_Delay[0]) {
			g_dps = -1;
			myInnerHtml("AveSecondATK","特殊",0);
		}
		else myInnerHtml("AveSecondATK",__DIG3(g_dps),0);
	}else{
		myInnerHtml("AtkBaseExp","<Font size=2>計算不能</Font>",0);
		myInnerHtml("AtkJobExp","<Font size=2>計算不能</Font>",0);
		myInnerHtml("AveSecondATK","<Font size=2>計算不能<BR>(0ダメージなので)</Font>",0);
		myInnerHtml("AveATKnum","<Font size=2>計算不能<BR>(0ダメージなので)</Font>",0);
		myInnerHtml("BattleTime","<Font size=2>計算不能</Font>",0);
	}



	w = BattleHiDam(charaData, specData, mobData, attackMethodConfArray);
	w = Math.round(w *(100-charaData[CHARA_DATA_INDEX_LUCKY]))/100;
	w = Math.round(w *(100-w_FLEE))/100;

	var agLv = Math.max(
		0,
		UsedSkillSearch(SKILL_ID_AUTO_GUARD),
		g_confDataNizi[CCharaConfNizi.CONF_ID_AUTO_GUARD],
		TimeItemNumSearch(70)
	);

	if (agLv > 0) {
		w = Math.round(w * w_AG[agLv]) / 100;
	}

	if(n_A_WeaponType==3 && UsedSkillSearch(SKILL_ID_PARIYING)){
		w = Math.round(w * (80- UsedSkillSearch(SKILL_ID_PARIYING) *3))/100;
	}
	if(UsedSkillSearch(SKILL_ID_REJECT_SWORD)){
		w = Math.round(w * (100- UsedSkillSearch(SKILL_ID_REJECT_SWORD) *7.5))/100;
	}

	myInnerHtml("B_Ave2Atk",__DIG3(w)+"ダメージ",0);

	g_receiveDamageAvoids = w;

	if(n_A_ActiveSkill==441) {
		myInnerHtml("B_Ave2Atk","-",0);
	}

 }


/*
function OnClickTabBTLRSLT(tabIndex) {

	var objGridDmg = document.getElementById("BATTLE_RESULT_DAMAGE");

	if (!objGridDmg) {
		return;
	}


	objGridDmg.classList.remove("CSSFLG_BTLRSLT_TAB_ALL");
	objGridDmg.classList.remove("CSSFLG_BTLRSLT_TAB_BASIC");
	objGridDmg.classList.remove("CSSFLG_BTLRSLT_TAB_DAMAGE");
	objGridDmg.classList.remove("CSSFLG_BTLRSLT_TAB_RESULT");



	switch (tabIndex) {
	case 0:
		objGridDmg.classList.add("CSSFLG_BTLRSLT_TAB_ALL");
		break;
	case 1:
		objGridDmg.classList.add("CSSFLG_BTLRSLT_TAB_BASIC");
		break;
	case 2:
		objGridDmg.classList.add("CSSFLG_BTLRSLT_TAB_DAMAGE");
		break;
	case 3:
		objGridDmg.classList.add("CSSFLG_BTLRSLT_TAB_RESULT");
		break;
	}

}
*/

function BuildBattleResultHtmlMIG(charaData, specData, mobData, attackMethodConfArray, battleCalcResultAll) {

	// パート定義名
	const PART_ID_STR_BASE = "BTLRSLT_PART_BASE";
	const PART_ID_STR_CAST = "BTLRSLT_PART_CAST";
	const PART_ID_STR_ATKDMG = "BTLRSLT_PART_ATKDMG";
	const PART_ID_STR_ATKCNT = "BTLRSLT_PART_ATKCNT";
	const PART_ID_STR_EXP = "BTLRSLT_PART_EXP";
	const PART_ID_STR_RECEIVE = "BTLRSLT_PART_RECEIVE";
	const CHK_ID_DMG_DETAIL = "BTLRSLT_DAMAGE_DETAIL";

	var partIdStrArrayDefined = [
		PART_ID_STR_BASE,
		PART_ID_STR_CAST,
		PART_ID_STR_ATKDMG,
		PART_ID_STR_ATKCNT,
		PART_ID_STR_EXP,
		PART_ID_STR_RECEIVE,
		CHK_ID_DMG_DETAIL,
	];


	var idx = 0;

	var valueWork = 0;
	var textWork = "";

	var partIdStr = "";
	var uncheckedMap = null;
	var refreshCheckboxArray = null;

	var criRate = 0;
	var attackCountAve = 0;

	var dmg = 0;
	var dmgUnit = null;
	var dmgText = "";

	var battleCalcResult = null;

	var objGridBasic = null;
	var objGridDmg = null;
	var objCell = null;
	var objCellSub = null;
	var objGridTiny = null;

	// 数値の整形
	var funcDIG3PX = function (valueF, pointCountF, unitText = "") {

		// 数値でない場合はそのまま返す（単位もつけない）
		if (isNaN(valueF)) {
			return valueF;
		}

		var valueModF = Math.round(valueF * Math.pow(10, pointCountF)) / Math.pow(10, pointCountF);
		var valueTextF = __DIG3(valueModF);
		var posF = valueTextF.indexOf(".");

		if (posF >= 0) {
			if (pointCountF == 0) {
				valueTextF = valueTextF.slice(0, Math.min(valueTextF.length, posF));
			}
			else {
				valueTextF = (valueTextF + ("0").repeat(pointCountF)).slice(0, posF + pointCountF + 1);
			}
		}
		else if (pointCountF > 0) {
			valueTextF += "." + ("0").repeat(pointCountF);
		}

		return valueTextF + unitText;
	};

	var funcDIG3PXPercent = function (valueF, pointCountF) {
		return funcDIG3PX(valueF, pointCountF, " %");
	};

	var funcDIG3PXSecond = function (valueF, pointCountF) {
		return funcDIG3PX(valueF, pointCountF, " 秒");
	};

	var funcDIG3PXSecondCompact = function (valueF, pointCountF) {
		return funcDIG3PX(valueF, pointCountF, "秒").replace(/\.?0+秒$/, '秒');
	};

	var funcDIG3PXCount = function (valueF, pointCountF) {
		return funcDIG3PX(valueF, pointCountF, (valueF == 1) ? " Hit" : " Hits");
	};

	var funcPerMill = function (valueF) {
		var valWorkF = parseInt("" + valueF, 10);
		var retF = valWorkF % 1000;
		retF = ((retF == 0) ? "" : ("." + ("000" + retF).slice(-3)));
		retF = ("" + Math.floor(valWorkF / 1000)) + retF;
		return Number(retF);
	};

	var funcOnChangeChkPart = function (evtF) {

		var idxF = 0;

		var dispStateF = (evtF.target.checked) ? null : "none";
		var objChildrenF = document.getElementsByClassName(evtF.target.id);

		for (idxF = 0; idxF < objChildrenF.length; idxF++) {
			objChildrenF[idxF].style.display = dispStateF;
		}
	};

	var funcOnChangeDamageDetail = function (evtF) {

		var idxF = 0;

		var bDispDetailF = (evtF.target.checked) ? true : false;
		var objGridDmgF = document.getElementById("BATTLE_RESULT_DAMAGE");

		objGridDmgF.classList.remove("CSSFLG_BTLRSLT_DAMAGE_DETAIL");

		if (bDispDetailF) {
			objGridDmgF.classList.add("CSSFLG_BTLRSLT_DAMAGE_DETAIL");
		}
	};

	// チェックボックスの生成
	var funcAppendCheckbox = function (objRootF, idStrF, dispTextF, bUncheckedF, funcOnChange) {

		var objCheckF = null;
		var objLabelF = null;

		objCheckF = HtmlCreateElement("input", objRootF);
		objCheckF.setAttribute("type", "checkbox");
		objCheckF.setAttribute("id", idStrF);
		objCheckF.addEventListener("change", funcOnChange);
		if (bUncheckedF) {
		}
		else {
			objCheckF.checked = "checked";
		}

		// 構築完了時のリフレッシュ対象に追加
		refreshCheckboxArray.push(objCheckF);

		objLabelF = HtmlCreateElement("label", objRootF);
		objLabelF.setAttribute("for", idStrF);

		HtmlCreateTextNode(dispTextF, objLabelF);

		return objCheckF;
	};

	// スキルダメージブロックの生成
	var funcAddSkillDamageBlock = function (objGridF, battleCalcResultF, bAppendResult) {

		var criRateF = 0;

		var objCellF = null;

		// セルを生成する
		var funcCreateCellF = function (bTotalFF) {

			var objCellFF = null;

			objCellFF = HtmlCreateElement("div", objGridF);
			objCellFF.classList.add("BTLRSLT_TAB_DAMAGE");
			objCellFF.classList.add(partIdStr);
			objCellFF.classList.add("CSSCLS_BTLRSLT_VALUE");
			objCellFF.classList.add((bTotalFF ? "BTLRSLT_DAMAGE_TOTAL" : CHK_ID_DMG_DETAIL));

			return objCellFF;
		};

		// 配列の和を計算する
		var funcGetSumDmgText = function (arrayFF, funcDigFF, funcDigParamFF) {

			var sumFF = arrayFF.reduce(
				(accFFF, curFFF) => {
					var valFFF = curFFF[0];
					valFFF *= (curFFF[1] > 1) ? curFFF[1] : 1;
					valFFF *= (curFFF[2] > 1) ? curFFF[2] : 1;
					return (accFFF + valFFF);
				},
				0
			);

			return funcDigFF(sumFF, funcDigParamFF);
		};

		// 結合表示を取得する
		var funcGetJoinDmgText = function (arrayFF, funcDigFF, funcDigParamFF) {
			return arrayFF.reduce(
				(accFFF, curFFF) => {

					var valFFF = "";

					if (accFFF.length > 0) {
						valFFF = " + ";
					}

					valFFF += funcDigFF(curFFF[0], funcDigParamFF);

					if (curFFF[1] > 1) {
						valFFF += " × " + curFFF[1] + " hits";
					}

					if (curFFF[2] > 1) {
						valFFF += " × " + curFFF[2] + " Hits";
					}

					return (accFFF + valFFF);
				},
				""
			);
		};


		// 合計ダメージ表示を取得する
		var funcGetJoinDmgText2 = function (arrayFF, funcDigFF, funcDigParamFF, counts) {
			return arrayFF.reduce(
				(accFFF, curFFF) => {

					var valFFF = "";

					if (!counts){
						counts = 1;
					}
					else if (counts === Infinity) {
						counts = 1;
					}

					valFFF = funcDigFF(curFFF[0] * counts, funcDigParamFF);

					if (curFFF[1] > 1) {
						valFFF = funcDigFF(curFFF[0] * counts * curFFF[1], funcDigParamFF);
					}

					// クライマックスクリムゾンアローのような 単発 + 複数Hit スキルの場合は
					// curFFF[2]に複数Hit数が入っているので計算する
					if (curFFF[2] > 1) {
						valFFF = funcDigFF(curFFF[0] * counts * curFFF[2], funcDigParamFF);
					}

					// accFFFが空でない場合（追撃の場合）は初撃と追撃を + で結合表示する
					if (accFFF.length > 0) {
						valFFF = " + " + valFFF;
					}

					return (accFFF + valFFF);
				},
				""
			);
		};




		// クリティカル率を取得
		criRateF = battleCalcResultF.criRate;



		//----------------
		// スキルラベル
		//----------------
		objCellF = HtmlCreateElement("div", objGridF);
		objCellF.style.gridColumnStart = "1";
		objCellF.style.gridColumnEnd = "6";
		objCellF.classList.add("BTLRSLT_TAB_DAMAGE");
		objCellF.classList.add(partIdStr);
		// ラベルCSS変更
		if (bAppendResult) {
			objCellF.classList.add("CSSCLS_BTLRSLT_METHOD_LABEL_APPEND");
		}
		else {
			objCellF.classList.add("CSSCLS_BTLRSLT_METHOD_LABEL");
		}
		HtmlCreateTextNode(battleCalcResultF.GetSkillName(), objCellF);


		// 使用不可の場合
		if (n_Buki_Muri) {
			objCellF = HtmlCreateElement("div", objGridF);
			objCellF.style.gridColumnStart = "1";
			objCellF.style.gridColumnEnd = "6";
			objCellF.classList.add("BTLRSLT_TAB_DAMAGE");
			objCellF.classList.add(partIdStr);
			objCellF.classList.add("CSSCLS_BTLRSLT_DISUSABLE");
			HtmlCreateTextNode("使用条件不成立のため使用不可", objCellF);
			return;
		}

		// ダメージなし化の場合
		if (g_bSkillNoDamage) {
			objCellF = HtmlCreateElement("div", objGridF);
			objCellF.style.gridColumnStart = "1";
			objCellF.style.gridColumnEnd = "6";
			objCellF.classList.add("BTLRSLT_TAB_DAMAGE");
			objCellF.classList.add(partIdStr);
			objCellF.classList.add("CSSCLS_BTLRSLT_DISUSABLE");
			HtmlCreateTextNode("ダメージ発生なし", objCellF);
			return;
		}


		//----------------
		// 最小ダメージ
		//----------------
		objCellF = HtmlCreateElement("div", objGridF);
		objCellF.style.gridColumnStart = "1";
		objCellF.style.textAlign = "right";
		objCellF.style.whiteSpace = "nowrap";
		objCellF.classList.add("BTLRSLT_TAB_DAMAGE");
		objCellF.classList.add(partIdStr);
		HtmlCreateTextNode("最小", objCellF);

		// 通常
		HtmlCreateTextNode(funcGetJoinDmgText(battleCalcResultF.GetDamageSummaryMin(true), funcDIG3PX, 0), funcCreateCellF(false));
		HtmlCreateTextNode(funcGetSumDmgText(battleCalcResultF.GetDamageSummaryMin(true), funcDIG3PX, 0), funcCreateCellF(true));

		// クリティカル
		if (criRateF > 0) {
			HtmlCreateTextNode(funcGetJoinDmgText(battleCalcResultF.GetDamageSummaryCriMin(true), funcDIG3PX, 0), funcCreateCellF(false));
			HtmlCreateTextNode(funcGetSumDmgText(battleCalcResultF.GetDamageSummaryCriMin(true), funcDIG3PX, 0), funcCreateCellF(true));
		}
		// 1サイクルダメージ

		HtmlCreateTextNode(funcGetJoinDmgText2(battleCalcResultF.GetDamageSummaryMin(true), funcDIG3PX, 0, Math.ceil(n_Delay[6]/n_Delay[5])), funcCreateCellF(false));
		HtmlCreateTextNode(funcGetSumDmgText(battleCalcResultF.GetDamageSummaryMin(true), funcDIG3PX, 0), funcCreateCellF(true));
		// クリティカル
		if (criRateF > 0) {
			HtmlCreateTextNode(funcGetJoinDmgText2(battleCalcResultF.GetDamageSummaryCriMin(true), funcDIG3PX, 0, 1), funcCreateCellF(false));
			HtmlCreateTextNode(funcGetSumDmgText(battleCalcResultF.GetDamageSummaryCriMin(true), funcDIG3PX, 0), funcCreateCellF(true));
		}


		//----------------
		// 平均ダメージ
		//----------------
		objCellF = HtmlCreateElement("div", objGridF);
		objCellF.style.gridColumnStart = "1";
		objCellF.style.textAlign = "right";
		objCellF.classList.add("BTLRSLT_TAB_DAMAGE");
		objCellF.classList.add(partIdStr);
		HtmlCreateTextNode("平均", objCellF);

		// 通常
		HtmlCreateTextNode(funcGetJoinDmgText(battleCalcResultF.GetDamageSummaryAve(true), funcDIG3PX, 0), funcCreateCellF(false));
		HtmlCreateTextNode(funcGetSumDmgText(battleCalcResultF.GetDamageSummaryAve(true), funcDIG3PX, 0), funcCreateCellF(true));

		// クリティカル
		if (criRateF > 0) {
			HtmlCreateTextNode(funcGetJoinDmgText(battleCalcResultF.GetDamageSummaryCriAve(true), funcDIG3PX, 0), funcCreateCellF(false));
			HtmlCreateTextNode(funcGetSumDmgText(battleCalcResultF.GetDamageSummaryCriAve(true), funcDIG3PX, 0), funcCreateCellF(true));
		}
		// 1サイクルダメージ
		HtmlCreateTextNode(funcGetJoinDmgText2(battleCalcResultF.GetDamageSummaryAve(true), funcDIG3PX, 0, Math.ceil(n_Delay[6]/n_Delay[5])), funcCreateCellF(false));
		HtmlCreateTextNode(funcGetSumDmgText(battleCalcResultF.GetDamageSummaryAve(true), funcDIG3PX, 0), funcCreateCellF(true));
		// クリティカル
		if (criRateF > 0) {
			HtmlCreateTextNode(funcGetJoinDmgText2(battleCalcResultF.GetDamageSummaryCriAve(true), funcDIG3PX, 0, 1), funcCreateCellF(false));
			HtmlCreateTextNode(funcGetSumDmgText(battleCalcResultF.GetDamageSummaryCriAve(true), funcDIG3PX, 0), funcCreateCellF(true));
		}


		//----------------
		// 最大ダメージ
		//----------------
		objCellF = HtmlCreateElement("div", objGridF);
		objCellF.style.gridColumnStart = "1";
		objCellF.style.textAlign = "right";
		objCellF.classList.add("BTLRSLT_TAB_DAMAGE");
		objCellF.classList.add(partIdStr);
		HtmlCreateTextNode("最大", objCellF);

		// 通常
		HtmlCreateTextNode(funcGetJoinDmgText(battleCalcResultF.GetDamageSummaryMax(true), funcDIG3PX, 0), funcCreateCellF(false));
		HtmlCreateTextNode(funcGetSumDmgText(battleCalcResultF.GetDamageSummaryMax(true), funcDIG3PX, 0), funcCreateCellF(true));

		// クリティカル
		if (criRateF > 0) {
			HtmlCreateTextNode(funcGetJoinDmgText(battleCalcResultF.GetDamageSummaryCriMax(true), funcDIG3PX, 0), funcCreateCellF(false));
			HtmlCreateTextNode(funcGetSumDmgText(battleCalcResultF.GetDamageSummaryCriMax(true), funcDIG3PX, 0), funcCreateCellF(true));
		}
		// 1サイクルダメージ
		HtmlCreateTextNode(funcGetJoinDmgText2(battleCalcResultF.GetDamageSummaryMax(true), funcDIG3PX, 0, Math.ceil(n_Delay[6]/n_Delay[5])), funcCreateCellF(false));
		HtmlCreateTextNode(funcGetSumDmgText(battleCalcResultF.GetDamageSummaryMax(true), funcDIG3PX, 0), funcCreateCellF(true));
		// クリティカル
		if (criRateF > 0) {
			HtmlCreateTextNode(funcGetJoinDmgText2(battleCalcResultF.GetDamageSummaryCriMax(true), funcDIG3PX, 0, 1), funcCreateCellF(false));
			HtmlCreateTextNode(funcGetSumDmgText(battleCalcResultF.GetDamageSummaryCriMax(true), funcDIG3PX, 0), funcCreateCellF(true));
		}
	};

	// 簡易戦闘結果
	var funcRenderResultTinyHtml = function (objRoot, labelText, valueText) {
		var objCell = null;

		objCell = HtmlCreateElement("span", objRoot);
		objCell.classList.add("CSSCLS_BATTLE_TINY_LABEL");
		HtmlCreateTextNode(labelText, objCell);

		objCell = HtmlCreateElement("span", objRoot);
		objCell.classList.add("CSSCLS_BATTLE_TINY_VALUE");
		HtmlCreateTextNode(valueText, objCell);
	};





	//----------------------------------------------------------------
	//
	// ブロックごとの展開状態を保持
	//
	//----------------------------------------------------------------
	uncheckedMap = new Map();
	for (idx = 0; idx < partIdStrArrayDefined.length; idx++) {
		if (!document.getElementById(partIdStrArrayDefined[idx])) {
			continue;
		}
		if (!document.getElementById(partIdStrArrayDefined[idx]).checked) {
			uncheckedMap.set(partIdStrArrayDefined[idx], "unchecked");
		}
	}

	refreshCheckboxArray = [];





	//----------------------------------------------------------------
	//
	// 全体リセット
	//
	//----------------------------------------------------------------
	objGridBasic = document.getElementById("BATTLE_RESULT_BASIC");
	objGridBasic.innerHTML = "";
	objGridDmg = document.getElementById("BATTLE_RESULT_DAMAGE");
	objGridDmg.innerHTML = "";
	objGridTiny = document.getElementById("OBJID_DIV_BATTLE_RESULT_TINY");
	objGridTiny.innerHTML = "";



	//----------------------------------------------------------------
	//
	// 基本情報部
	//
	//----------------------------------------------------------------

	partIdStr = PART_ID_STR_BASE;

	//----------------
	// 基本情報ラベル
	//----------------
	objCell = HtmlCreateElement("div", objGridBasic);
	objCell.style.gridColumnStart = "1";
	objCell.style.gridColumnEnd = "-1";
	objCell.classList.add("BTLRSLT_TAB_BASIC");
	objCell.classList.add("CSSCLS_BTLRSLT_HEADER");
	funcAppendCheckbox(objCell, partIdStr, "基本情報", uncheckedMap.get(partIdStr), funcOnChangeChkPart);

	//----------------
	// 命中率
	//----------------
	objCell = HtmlCreateElement("div", objGridBasic);
	objCell.style.gridColumnStart = "1";
	objCell.classList.add("BTLRSLT_TAB_BASIC");
	objCell.classList.add(partIdStr);
	HtmlCreateTextNode("命中率", objCell);

	objCell = HtmlCreateElement("div", objGridBasic);
	objCell.classList.add("BTLRSLT_TAB_BASIC");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
	HtmlCreateTextNode(funcDIG3PXPercent(w_HIT_HYOUJI, 2), objCell);

	// 必中効果のみ
	if (battleCalcResultAll.GetPassiveResultCount() > 0) {
		battleCalcResult = battleCalcResultAll.GetPassiveResult(0);
	}
	else if (battleCalcResultAll.GetActiveResultCount() > 0) {
		battleCalcResult = battleCalcResultAll.GetActiveResult(0);
	}

	if (battleCalcResult.perfectRate !== undefined) {
		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.style.gridColumnStart = "1";
		objCell.style.textAlign = "right";
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		HtmlCreateTextNode("（必中）", objCell);

		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PXPercent(battleCalcResult.perfectRate, 2), objCell);

		funcRenderResultTinyHtml(objGridTiny, "必中", funcDIG3PX(battleCalcResult.perfectRate, 0, "%"));
	}

	//----------------
	// 回避率
	//----------------
	objCell = HtmlCreateElement("div", objGridBasic);
	objCell.style.gridColumnStart = "1";
	objCell.classList.add("BTLRSLT_TAB_BASIC");
	objCell.classList.add(partIdStr);
	HtmlCreateTextNode("回避率", objCell);

	objCell = HtmlCreateElement("div", objGridBasic);
	objCell.classList.add("BTLRSLT_TAB_BASIC");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
	HtmlCreateTextNode(funcDIG3PXPercent(w_FLEE, 2), objCell);

	//----------------
	// クリティカル率
	//----------------
	objCell = HtmlCreateElement("div", objGridBasic);
	objCell.style.gridColumnStart = "1";
	objCell.style.whiteSpace = "nowrap";
	objCell.classList.add("BTLRSLT_TAB_BASIC");
	objCell.classList.add(partIdStr);
	HtmlCreateTextNode("ｸﾘﾃｨｶﾙ率", objCell);

	// 後ほど参照するので、クリティカル率を保持しておく
	criRate = GetActRateCritical(battleCalcResult.skillId, mobData);
	objCell = HtmlCreateElement("div", objGridBasic);
	objCell.classList.add("BTLRSLT_TAB_BASIC");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
	HtmlCreateTextNode(funcDIG3PXPercent(criRate, 2), objCell);

	funcRenderResultTinyHtml(objGridTiny, "クリ", funcDIG3PX(criRate, 0, "%"));

	//----------------------------------------------------------------
	//
	// 詠唱ディレイ部
	//
	//----------------------------------------------------------------

	partIdStr = PART_ID_STR_CAST;



	// TODO: 詠唱時間等未実測スキル対応
	if (g_bUnknownCasts) {

		//----------------
		// 攻撃間隔
		//----------------
		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.style.gridColumnStart = "1";
		objCell.style.gridColumnEnd = "-1";
		objCell.classList.add("CSSCLS_BTLRSLT_HEADER");
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		funcAppendCheckbox(objCell, partIdStr, "攻撃間隔", uncheckedMap.get(partIdStr), funcOnChangeChkPart);


	}

	// パッシブキルによる攻撃の場合
	else if (battleCalcResultAll.GetPassiveResultCount() > 0) {

		//----------------
		// 計算結果を取得
		//----------------
		battleCalcResult = battleCalcResultAll.GetPassiveResult(0);

		//----------------
		// 攻撃間隔
		//----------------
		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.style.gridColumnStart = "1";
		objCell.style.gridColumnEnd = "-1";
		objCell.classList.add("CSSCLS_BTLRSLT_HEADER");
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		funcAppendCheckbox(objCell, partIdStr, "攻撃間隔", uncheckedMap.get(partIdStr), funcOnChangeChkPart);

	}

	// アクティブスキルによる攻撃の場合
	else if (battleCalcResultAll.GetActiveResultCount() > 0) {

		//----------------
		// 計算結果を取得
		//----------------
		battleCalcResult = battleCalcResultAll.GetActiveResult(0);

		//----------------
		// 詠唱/ディレイラベル
		//----------------
		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.style.gridColumnStart = "1";
		objCell.style.gridColumnEnd = "-1";
		objCell.classList.add("CSSCLS_BTLRSLT_HEADER");
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		funcAppendCheckbox(objCell, partIdStr, "詠唱/ディレイ", uncheckedMap.get(partIdStr), funcOnChangeChkPart);

		//----------------
		// 詠唱時間
		//----------------

		// 変動詠唱時間＋固定詠唱時間
		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.style.gridColumnStart = "1";
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		HtmlCreateTextNode("詠唱時間", objCell);

		valueWork = battleCalcResult.castVary + battleCalcResult.castFixed;
		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PXSecond(valueWork, 2), objCell);

		// 変動詠唱時間のみ
		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.style.gridColumnStart = "1";
		objCell.style.textAlign = "right";
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		HtmlCreateTextNode("（変動）", objCell);

		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PXSecond(battleCalcResult.castVary, 2), objCell);

		// 簡易戦闘結果: "0秒(276)" or "0.03秒(256.5)"
		var castText = funcDIG3PXSecondCompact(battleCalcResult.castVary, 2);
		castText += `(${CExtraInfoAreaComponentManager.charaData[CHARA_DATA_INDEX_CAST_PARAM]})`;
		funcRenderResultTinyHtml(objGridTiny, "詠唱", castText);

		// 固定詠唱時間のみ
		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.style.gridColumnStart = "1";
		objCell.style.textAlign = "right";
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		HtmlCreateTextNode("（固定）", objCell);

		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PXSecond(battleCalcResult.castFixed, 2), objCell);

		let castFixedText = funcDIG3PXSecondCompact(battleCalcResult.castFixed, 2);
		castFixedText += `(${(100 - GetCastScalingOfSkillForCastTimeFixed(n_A_ActiveSkill)) > n_A_Kotei_Cast_Keigen ? GetCastScalingOfSkillForCastTimeFixed(n_A_ActiveSkill) : (100 - n_A_Kotei_Cast_Keigen)}%)`;
		funcRenderResultTinyHtml(objGridTiny, "固定", castFixedText);

		//----------------
		// ディレイ
		//----------------
		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.style.gridColumnStart = "1";
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		HtmlCreateTextNode("ディレイ", objCell);

		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PXSecond(battleCalcResult.delaySkill, 2), objCell);

		// 簡易戦闘結果: "0.1秒(5%)" or "0秒(-15%)"
		var delayText = funcDIG3PXSecondCompact(battleCalcResult.delaySkill, 2);
		const overValue = Math.round((100 - delayDownForDisp) * 100) / 100;
		delayText += `(${overValue}%)`
		funcRenderResultTinyHtml(objGridTiny, "ディレイ", delayText);

		//----------------
		// クールタイム
		//----------------
		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.style.gridColumnStart = "1";
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		HtmlCreateTextNode("クールタイム", objCell);

		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PXSecond(battleCalcResult.coolTime, 2), objCell);

		funcRenderResultTinyHtml(objGridTiny, "CT", funcDIG3PXSecondCompact(battleCalcResult.coolTime, 2));
	}

	// 上記以外
	else {
		return;
	}

	//----------------
	// 攻撃間隔
	//----------------
	// 簡易戦闘結果: "189.1" or "193(193.3)"
	const aspdValue = Math.floor(charaData[CHARA_DATA_INDEX_ASPD] * 10) / 10;
	const aspdRawValue = Math.floor(aspdRaw * 10)/10;
	var aspdText = "" + aspdValue;
	if (aspdRawValue > aspdValue) {
		aspdText += `(${aspdRawValue})`
	}
	funcRenderResultTinyHtml(objGridTiny, "ASPD", aspdText);

	//----------------
	// 設置系
	//----------------
	if (g_bDefinedDamageIntervals) {

		// サブラベル
		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.style.gridColumnStart = "1";
		objCell.style.gridColumnEnd = "-1";
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add("CSSCLS_BTLRSLT_RAYING_LABEL");
		HtmlCreateTextNode("設置系情報", objCell);

		// 攻撃間隔
		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.style.gridColumnStart = "1";
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		HtmlCreateTextNode("攻撃間隔", objCell);

		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PXSecond(battleCalcResult.attackInterval, 2), objCell);

		funcRenderResultTinyHtml(objGridTiny, "攻撃間隔", funcDIG3PXSecondCompact(battleCalcResult.attackInterval, 2));

		// オブジェクト持続時間
		if (battleCalcResult.objectLifeTime > 0) {
			objCell = HtmlCreateElement("div", objGridBasic);
			objCell.style.gridColumnStart = "1";
			objCell.classList.add("BTLRSLT_TAB_BASIC");
			objCell.classList.add(partIdStr);
			HtmlCreateTextNode("持続時間", objCell);

			objCell = HtmlCreateElement("div", objGridBasic);
			objCell.classList.add("BTLRSLT_TAB_BASIC");
			objCell.classList.add(partIdStr);
			objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
			HtmlCreateTextNode(funcDIG3PXSecond(funcPerMill(battleCalcResult.objectLifeTime), 2), objCell);
		}

		// ダメージ回数
		if ((battleCalcResult.damageInterval > 0) && (battleCalcResult.objectLifeTime > 0)) {
			objCell = HtmlCreateElement("div", objGridBasic);
			objCell.style.gridColumnStart = "1";
			objCell.classList.add("BTLRSLT_TAB_BASIC");
			objCell.classList.add(partIdStr);
			HtmlCreateTextNode("ダメージ回数", objCell);

			objCell = HtmlCreateElement("div", objGridBasic);
			objCell.classList.add("BTLRSLT_TAB_BASIC");
			objCell.classList.add(partIdStr);
			objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
			HtmlCreateTextNode(funcDIG3PXCount(battleCalcResult.GetDamageCountSummary(), 0), objCell);
		}
	}

	// TODO: 詠唱時間等未実測スキル対応
	else if (g_bUnknownCasts) {

		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.style.gridColumnStart = "1";
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		HtmlCreateTextNode("詠唱時間等", objCell);

		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_CENTERING");
		HtmlCreateTextNode("（未実測）", objCell);
	}

	//----------------
	// 一般
	//----------------
	else {
		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.style.gridColumnStart = "1";
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		HtmlCreateTextNode("攻撃間隔", objCell);

		objCell = HtmlCreateElement("div", objGridBasic);
		objCell.classList.add("BTLRSLT_TAB_BASIC");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PXSecond(battleCalcResult.castVary + battleCalcResult.castFixed + battleCalcResult.attackInterval, 2), objCell);

		funcRenderResultTinyHtml(objGridTiny, "攻撃間隔", funcDIG3PXSecondCompact(battleCalcResult.castVary + battleCalcResult.castFixed + battleCalcResult.attackInterval, 2));
	}



	//----------------------------------------------------------------
	//
	// 与ダメージ部
	//
	//----------------------------------------------------------------

	partIdStr = PART_ID_STR_ATKDMG;

	//----------------
	// 与ダメージラベル
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.position = "relative";
	objCell.style.gridColumnStart = "1";
	if (criRate > 0) {
		objCell.style.gridColumnEnd = "6";
	}
	else {
		objCell.style.gridColumnEnd = "4";
	}
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add("CSSCLS_BTLRSLT_HEADER");

	// 詳細表示ラベル
	objCellSub = HtmlCreateElement("div", objCell);
	objCellSub.style.position = "absolute";
	objCellSub.style.right = "1em";
	funcAppendCheckbox(objCellSub, CHK_ID_DMG_DETAIL, "詳細表示", uncheckedMap.get(CHK_ID_DMG_DETAIL), funcOnChangeDamageDetail);

	// チェックボックスの追加順序調整
	funcAppendCheckbox(objCell, partIdStr, "与ダメージ", uncheckedMap.get(partIdStr), funcOnChangeChkPart);

	//----------------
	// サブラベル
	//----------------

	// ダミー
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.gridColumnStart = "1";
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add(partIdStr);

	// 通常
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_CENTERING");
	HtmlCreateTextNode("通常(1Hit)", objCell);

	// クリティカル
	if (criRate > 0) {
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.classList.add("BTLRSLT_TAB_DAMAGE");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_CENTERING");
		HtmlCreateTextNode("ｸﾘﾃｨｶﾙ", objCell);
	}
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.whiteSpace = "nowrap";
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_CENTERING");
	HtmlCreateTextNode("1ｻｲｸﾙﾀﾞﾒ", objCell);
	// クリティカル
	if (criRate > 0) {
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.style.whiteSpace = "nowrap";
		objCell.classList.add("BTLRSLT_TAB_DAMAGE");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_CENTERING");
		HtmlCreateTextNode("1ｻｲｸﾙ(ｸﾘﾀﾞﾒ)", objCell);
	}


	//----------------
	// 表示本体
	//----------------

	// パッシブキルによる攻撃の場合
	if (battleCalcResultAll.GetPassiveResultCount() > 0) {

		for (idx = 0; idx < battleCalcResultAll.GetPassiveResultCount(); idx++) {
			funcAddSkillDamageBlock(objGridDmg, battleCalcResultAll.GetPassiveResult(idx), false);
		}

	}

	// アクティブスキルによる攻撃の場合
	else if (battleCalcResultAll.GetActiveResultCount() > 0) {

		for (idx = 0; idx < battleCalcResultAll.GetActiveResultCount(); idx++) {
			funcAddSkillDamageBlock(objGridDmg, battleCalcResultAll.GetActiveResult(idx), false);
		}

	}

	// 確率追撃攻撃は常に
	if (battleCalcResultAll.GetAppendResultCount() > 0) {

		for (idx = 0; idx < battleCalcResultAll.GetAppendResultCount(); idx++) {
			funcAddSkillDamageBlock(objGridDmg, battleCalcResultAll.GetAppendResult(idx), true);
		}

	}


	//----------------
	// 総ダメージラベル
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.gridColumnStart = "1";
	if (criRate > 0) {
		objCell.style.gridColumnEnd = "6";
	}
	else {
		objCell.style.gridColumnEnd = "4";
	}
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_PERSEC_LABEL");
	HtmlCreateTextNode("実ダメージ（発動率、命中率込み）", objCell);

	//----------------
	// サブラベル
	//----------------

	// ダミー
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.gridColumnStart = "1";
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add(partIdStr);

	// 一撃
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_CENTERING");
	if (g_bDefinedDamageIntervals) {
		HtmlCreateTextNode("1Hit", objCell);
	}
	else {
		HtmlCreateTextNode("1Shot", objCell);
	}

	// 秒間
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_CENTERING");
	HtmlCreateTextNode("DPS", objCell);

	//----------------
	// 最小ダメージ
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.gridColumnStart = "1";
	objCell.style.textAlign = "right";
	objCell.style.whiteSpace = "nowrap";
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add(partIdStr);
	HtmlCreateTextNode("最小", objCell);

	// ダメージ
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
	HtmlCreateTextNode(funcDIG3PX(battleCalcResultAll.GetDamageSummaryMinPerAtk(), 0), objCell);

	// TODO: 詠唱時間等未実測スキル対応
	if (g_bUnknownCasts) {
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.classList.add("BTLRSLT_TAB_DAMAGE");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_CENTERING");
		HtmlCreateTextNode("（計算不能）", objCell);
	}
	else {
		// ダメージ
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.classList.add("BTLRSLT_TAB_DAMAGE");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PX(battleCalcResultAll.GetDamageSummaryMinPerSec(), 0), objCell);
	}

	//----------------
	// 平均ダメージ
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.gridColumnStart = "1";
	objCell.style.textAlign = "right";
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add(partIdStr);
	HtmlCreateTextNode("平均", objCell);

	// ダメージ
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
	HtmlCreateTextNode(funcDIG3PX(battleCalcResultAll.GetDamageSummaryAvePerAtk(), 0), objCell);

	funcRenderResultTinyHtml(objGridTiny, "平均", funcDIG3PX(battleCalcResultAll.GetDamageSummaryAvePerAtk(), 0));

	// TODO: 詠唱時間等未実測スキル対応
	if (g_bUnknownCasts) {
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.classList.add("BTLRSLT_TAB_DAMAGE");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_CENTERING");
		HtmlCreateTextNode("（計算不能）", objCell);

		funcRenderResultTinyHtml(objGridTiny, "DPS", "（計算不能）");
	}
	else {
		// ダメージ
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.classList.add("BTLRSLT_TAB_DAMAGE");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PX(battleCalcResultAll.GetDamageSummaryAvePerSec(), 0), objCell);

		funcRenderResultTinyHtml(objGridTiny, "DPS", funcDIG3PX(battleCalcResultAll.GetDamageSummaryAvePerSec(), 0));
	}

	//----------------
	// 最大ダメージ
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.gridColumnStart = "1";
	objCell.style.textAlign = "right";
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add(partIdStr);
	HtmlCreateTextNode("最大", objCell);

	// ダメージ
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.classList.add("BTLRSLT_TAB_DAMAGE");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
	HtmlCreateTextNode(funcDIG3PX(battleCalcResultAll.GetDamageSummaryMaxPerAtk(), 0), objCell);


	// TODO: 詠唱時間等未実測スキル対応
	if (g_bUnknownCasts) {
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.classList.add("BTLRSLT_TAB_DAMAGE");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_CENTERING");
		HtmlCreateTextNode("（計算不能）", objCell);
	}
	else {
		// ダメージ
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.classList.add("BTLRSLT_TAB_DAMAGE");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PX(battleCalcResultAll.GetDamageSummaryMaxPerSec(), 0), objCell);
	}



	//----------------------------------------------------------------
	//
	// 攻撃回数部
	//
	//----------------------------------------------------------------

	partIdStr = PART_ID_STR_ATKCNT;

	//----------------
	// 攻撃回数ラベル
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.gridColumnStart = "1";
	if (criRate > 0) {
		objCell.style.gridColumnEnd = "6";
	}
	else {
		objCell.style.gridColumnEnd = "4";
	}
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add("CSSCLS_BTLRSLT_HEADER");
	funcAppendCheckbox(objCell, partIdStr, "攻撃回数", uncheckedMap.get(partIdStr), funcOnChangeChkPart);

	//----------------
	// 最小攻撃回数
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.textAlign = "right";
	objCell.style.gridColumnStart = "1";
	objCell.style.whiteSpace = "nowrap";
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);
	HtmlCreateTextNode("最小", objCell);

	// 攻撃回数
	valueWork = battleCalcResultAll.GetAttackCountSummaryMin();
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.whiteSpace = "nowrap";
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
	HtmlCreateTextNode(funcDIG3PXCount(valueWork, 0), objCell);


	// TODO: 詠唱時間等未実測スキル対応
	if (g_bUnknownCasts) {
	}
	else {
		// 秒数
		if (g_bDefinedDamageIntervals == true) {
			valueWork = battleCalcResultAll.GetAttackSecondSummaryMinInterval();
		} else {
			valueWork = battleCalcResultAll.GetAttackSecondSummaryMin();
		}
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.style.whiteSpace = "nowrap";		
		objCell.classList.add("BTLRSLT_TAB_RESULT");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PXSecond(valueWork, 2), objCell);
	}

	//----------------
	// 平均攻撃回数
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.textAlign = "right";
	objCell.style.gridColumnStart = "1";
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);
	HtmlCreateTextNode("平均", objCell);

	// 攻撃回数
	valueWork = battleCalcResultAll.GetAttackCountSummaryAve();
	// 経験値効率計算用に保持
	attackCountAve = valueWork;
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.whiteSpace = "nowrap";
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
	HtmlCreateTextNode(funcDIG3PXCount(valueWork, 0), objCell);


	// TODO: 詠唱時間等未実測スキル対応
	if (g_bUnknownCasts) {
	}
	else {
		// 秒数
		if (g_bDefinedDamageIntervals == true) {
			valueWork = battleCalcResultAll.GetAttackSecondSummaryAveInterval();
		} else {
			valueWork = battleCalcResultAll.GetAttackSecondSummaryAve();
		}
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.classList.add("BTLRSLT_TAB_RESULT");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PXSecond(valueWork, 2), objCell);
	}

	//----------------
	// 最大攻撃回数
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.textAlign = "right";
	objCell.style.gridColumnStart = "1";
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);
	HtmlCreateTextNode("最大", objCell);

	// 攻撃回数
	valueWork = battleCalcResultAll.GetAttackCountSummaryMax();
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.whiteSpace = "nowrap";
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
	HtmlCreateTextNode(funcDIG3PXCount(valueWork, 0), objCell);


	// TODO: 詠唱時間等未実測スキル対応
	if (g_bUnknownCasts) {
	}
	else {
		// 秒数
		if (g_bDefinedDamageIntervals == true) {
			valueWork = battleCalcResultAll.GetAttackSecondSummaryMaxInterval();
		} else {
			valueWork = battleCalcResultAll.GetAttackSecondSummaryMax();
		}
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.classList.add("BTLRSLT_TAB_RESULT");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PXSecond(valueWork, 2), objCell);
	}



	//----------------------------------------------------------------
	//
	// 経験値効率部
	//
	//----------------------------------------------------------------

	partIdStr = PART_ID_STR_EXP;

	//----------------
	// 経験値効率ラベル
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.gridColumnStart = "1";
	if (criRate > 0) {
		objCell.style.gridColumnEnd = "6";
	}
	else {
		objCell.style.gridColumnEnd = "4";
	}
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add("CSSCLS_BTLRSLT_HEADER");
	funcAppendCheckbox(objCell, partIdStr, "経験値効率", uncheckedMap.get(partIdStr), funcOnChangeChkPart);

	//----------------
	// サブラベル
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.gridColumnStart = "1";
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);

	// ベース
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_CENTERING");
	HtmlCreateTextNode("BaseExp", objCell);

	// ジョブ
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_CENTERING");
	HtmlCreateTextNode("JobExp", objCell);

	//----------------
	// 一撃平均
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.gridColumnStart = "1";
	objCell.style.whiteSpace = "nowrap";
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);
	HtmlCreateTextNode("一撃平均", objCell);

	// ベース
	valueWork = battleCalcResultAll.GetBaseExpPerAtk();
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
	HtmlCreateTextNode(funcDIG3PX(valueWork, 0), objCell);

	// ジョブ
	valueWork = battleCalcResultAll.GetJobExpPerAtk();
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
	HtmlCreateTextNode(funcDIG3PX(valueWork, 0), objCell);


	// TODO: 詠唱時間等未実測スキル対応
	if (g_bUnknownCasts) {
	}
	else {
		//----------------
		// 秒間平均
		//----------------
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.style.gridColumnStart = "1";
		objCell.classList.add("BTLRSLT_TAB_RESULT");
		objCell.classList.add(partIdStr);
		HtmlCreateTextNode("秒間平均", objCell);

		// ベース
		valueWork = battleCalcResultAll.GetBaseExpPerSec();
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.classList.add("BTLRSLT_TAB_RESULT");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PX(valueWork, 0), objCell);

		// ジョブ
		valueWork = battleCalcResultAll.GetJobExpPerSec();
		objCell = HtmlCreateElement("div", objGridDmg);
		objCell.classList.add("BTLRSLT_TAB_RESULT");
		objCell.classList.add(partIdStr);
		objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
		HtmlCreateTextNode(funcDIG3PX(valueWork, 0), objCell);
	}




	//----------------------------------------------------------------
	//
	// 被ダメージ部（仮）
	//
	//----------------------------------------------------------------

	partIdStr = PART_ID_STR_RECEIVE;

	//----------------
	// 被ダメージラベル
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.gridColumnStart = "1";
	if (criRate > 0) {
		objCell.style.gridColumnEnd = "6";
	}
	else {
		objCell.style.gridColumnEnd = "4";
	}
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add("CSSCLS_BTLRSLT_HEADER");
	funcAppendCheckbox(objCell, partIdStr, "被ダメージ（仮）", uncheckedMap.get(partIdStr), funcOnChangeChkPart);

	//----------------
	// 平均ダメージ
	//----------------
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.style.gridColumnStart = "1";
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);
	HtmlCreateTextNode("平均", objCell);

	// トータルダメージ
	objCell = HtmlCreateElement("div", objGridDmg);
	objCell.classList.add("BTLRSLT_TAB_RESULT");
	objCell.classList.add(partIdStr);
	objCell.classList.add("CSSCLS_BTLRSLT_VALUE");
	if (n_B_KYOUKA[MOB_CONF_BUF_ID_MAX_PAIN] == 0) {
		BattleHiDam(charaData, specData, mobData, attackMethodConfArray, objCell);
	} else {
		BattleHiDamMaxPain(charaData, specData, mobData, attackMethodConfArray, battleCalcResultAll.GetDamageSummaryAvePerAtk(), objCell);
	}







	// 各パートの表示状態の更新
	for (idx = 0; idx < refreshCheckboxArray.length; idx++) {
		refreshCheckboxArray[idx].dispatchEvent(new Event("change"));
	}





	return;











	// 従来の表示


	// 命中率が１００％未満の場合、必中ダメージがあれば追加表示
	if(n_PerfectHIT_DMG > 0 && w_HIT_HYOUJI <100){
		str_bSUBname += "<Font size=2>Miss時の必中ダメージ</Font>";
		if(str_PerfectHIT_DMG == 0){
			if(wActiveHitNum > 1){
				var w = ROUNDDOWN(n_PerfectHIT_DMG / wActiveHitNum);
				str_bSUB += __DIG3(w * wActiveHitNum) +"("+ __DIG3(w) +"×"+ wActiveHitNum +"Hit)";
			}
			else str_bSUB += __DIG3(n_PerfectHIT_DMG);
		}else str_bSUB += str_PerfectHIT_DMG;
	}


	myInnerHtml("bSUBname",str_bSUBname,0);
	myInnerHtml("bSUB",str_bSUB,0);
	myInnerHtml("BattleHIT",w_HIT_HYOUJI,0);
	myInnerHtml("BattlePerfectHIT",n_tok[ITEM_SP_PERFECT_ATTACK_UP],0);
//	myInnerHtml("nm067","％",0);



	// 二刀流の通常攻撃時の表示部分
	if(n_Nitou && n_A_ActiveSkill == 0){
		myInnerHtml("BattleHIT",w_HIT_HYOUJI +"％(左手"+ w_HIT +"％)",0);
//		myInnerHtml("nm067","",0);
	}



	// TODO : 謎処理　通常攻撃とグラビテーションフィールド以外
	if(mobData[21]==6 && n_A_ActiveSkill != 0 && n_A_ActiveSkill != 325){
		for(var i=0;i<=2;i++){
			w_DMG[i] = 0;
			g_damageTextArray[i] = ["Miss"];
		}
		myInnerHtml("MinATKnum","無理です",0);
		myInnerHtml("AveATKnum","無理です",0);
		myInnerHtml("MaxATKnum","無理です",0);
		myInnerHtml("AveSecondATK","-",0);
		myInnerHtml("AtkBaseExp","-",0);
		myInnerHtml("AtkJobExp","-",0);
		myInnerHtml("BattleTime","-",0);

		return;
	}



	// スキル使用不可武器の場合の表示部分
	if(n_Buki_Muri == 1){
		n_Buki_Muri = 0;
		for(var i=0;i<=2;i++) w_DMG[i] = 0;
		g_damageTextArray[0] = ["<B>この武器では</B>"];
		g_damageTextArray[1] = ["<B>このスキルを</B>"];
		g_damageTextArray[2] = ["<B>使用できません</B>"];
		myInnerHtml("MinATKnum","-",0);
		myInnerHtml("AveATKnum","-",0);
		myInnerHtml("MaxATKnum","-",0);
		myInnerHtml("AveSecondATK","-",0);
		myInnerHtml("AtkBaseExp","-",0);
		myInnerHtml("AtkJobExp","-",0);
		myInnerHtml("BattleTime","-",0);

		return;
	}



	g_AttackCount = [-1, -1, -1];

	// 最小攻撃回数表示部の組み立て
	if(w_DMG[2] > 0){

		// 最小攻撃回数を算出
		g_AttackCount[0] = Math.ceil(mobData[3] / w_DMG[2]);

		// 最小攻撃回数が１万回未満ならば、そのまま表示
		if(g_AttackCount[0] < 10000) {
			myInnerHtml("MinATKnum",__DIG3(g_AttackCount[0]),0);
		}
		// １万回を超える場合は特殊表示
		else {
			myInnerHtml("MinATKnum",SubName[5],0);
		}

	}else{
		myInnerHtml("MinATKnum","<Font size=2>計算不能<BR>(0ダメージなので)</Font>",0);
	}



	// 多段ＨＩＴスキルで１殺の場合、１殺できる確率を表示する
	var w;
	if(SG_Special_HITnum != 0){

		if(w == 1){

			var wHITnum;
			var x;

			wHITnum = SG_Special_HITnum;
			x = (SG_Special_DMG[2] * wHITsuu - mobData[3]) / (SG_Special_DMG[2] * wHITsuu - SG_Special_DMG[0] * wHITsuu);

			if(x > 1) x = 1;
			if(x < 0) x = 0;

			if(wHITnum == 2){
				if(x < 0.5) x = 2 * x * x;
				else x = 1 - 2 * (1-x) * (1-x);
			}

			if(wHITnum == 3){
				if(x <(1/3)) x = 4.5 * Math.pow(x,3);
				else if((1/3) <= x && x <(2/3)) x = 4.5 * (Math.pow(x,3) - 3 * Math.pow(x-1/3,3));
				else if((2/3) <= x) x = 1 - 4.5 * Math.pow(1-x,3);
			}

			if(wHITnum >= 4){
				var y = Math.sqrt(Math.pow(SG_Special_DMG[2]-SG_Special_DMG[0],2) / 12 * wHITnum);
				x = (SG_Special_DMG[1] * wHITsuu - mobData[3]) / y;
				if(x >= 0) x = 0.5+0.5*Math.sqrt(1-Math.exp(-2*Math.pow(x,2)/Math.PI));
				else x = 0.5-0.5*Math.sqrt(1-Math.exp(-2*Math.pow(x,2)/Math.PI));
			}

			x = Math.floor(x * 10000) / 100;

			myInnerHtml("MinATKnum","1(1回で倒せる確率"+ x +"%)",0);
		}

		SG_Special_HITnum = 0;
	}



	//----------------------------------------------------------------
	// 経験値効率計算モード（SPMODE）の場合
	//----------------------------------------------------------------
	var atkCountAve = 0;
	var battleTimeAve = 0;
	var perexpBaseAve = 0;
	var perexpJobAve = 0;

	// 経験値効率計算モードの場合、かつ、確殺モードの場合
	if(g_SPMODE_FLAG == 1 && g_SPMODE_KAKUSATSU_MODE == 1){

		// 最少ダメージがモンスターのＨＰ以上となる場合、すなわち、確殺できる場合
		if(w_DMG[0] >= mobData[3]){
			g_SPMODE_MONSTER_RESULT[g_SPMODE_MONSTER_INDEX][SPMODE_MONSTER_RESULT_INDEX_RESULT_FLAG] = 1;
			g_SPMODE_MONSTER_RESULT[g_SPMODE_MONSTER_INDEX][SPMODE_MONSTER_RESULT_INDEX_PEREXP_BASE] = mobData[15];
			g_SPMODE_MONSTER_RESULT[g_SPMODE_MONSTER_INDEX][SPMODE_MONSTER_RESULT_INDEX_PEREXP_JOB] = mobData[16];
			g_SPMODE_MONSTER_RESULT[g_SPMODE_MONSTER_INDEX][SPMODE_MONSTER_RESULT_INDEX_BATTLE_TIME] = wCast + wDelay;
			g_SPMODE_MONSTER_RESULT[g_SPMODE_MONSTER_INDEX][SPMODE_MONSTER_RESULT_INDEX_HIT_RATE] = w_HIT_HYOUJI;
			g_SPMODE_MONSTER_RESULT[g_SPMODE_MONSTER_INDEX][SPMODE_MONSTER_RESULT_INDEX_FLEE_RATE] = Math.floor((w_FLEE + (100 - w_FLEE) * charaData[CHARA_DATA_INDEX_LUCKY] / 100) * 100) / 100;
		}

		// 処理終了
		return;
	}

	// 経験値効率計算モードの場合、かつ、確殺モードでない場合
	else if(g_SPMODE_FLAG == 1){

		// 平均ダメージが 0 より大きい場合のみ、計算を実施
		while (w_DMG[1] > 0){

			// 平均攻撃回数を算出
			atkCountAve = Math.ceil(mobData[3] / w_DMG[1]);

			// 平均戦闘時間を算出
			battleTimeAve = (wCast + wDelay) * atkCountAve;
			battleTimeAve = Math.floor(battleTimeAve * 100) / 100;

			// 条件検査
			// 平均戦闘時間が指定範囲外の場合、処理を抜ける
			if (battleTimeAve < g_RankingConditionBattleTimeMin) {
				break;
			}
			if (g_RankingConditionBattleTimeMax < battleTimeAve) {
				break;
			}

			// 平均一撃経験値を算出し、結果配列に格納
			perexpBaseAve = Math.round(mobData[15] / atkCountAve);
			perexpJobAve = Math.round(mobData[16] / atkCountAve);

			// 計算した結果を、結果配列に格納
			g_SPMODE_MONSTER_RESULT[g_SPMODE_MONSTER_INDEX][SPMODE_MONSTER_RESULT_INDEX_RESULT_FLAG] = 1;
			g_SPMODE_MONSTER_RESULT[g_SPMODE_MONSTER_INDEX][SPMODE_MONSTER_RESULT_INDEX_PEREXP_BASE] = perexpBaseAve;
			g_SPMODE_MONSTER_RESULT[g_SPMODE_MONSTER_INDEX][SPMODE_MONSTER_RESULT_INDEX_PEREXP_JOB] = perexpJobAve;
			g_SPMODE_MONSTER_RESULT[g_SPMODE_MONSTER_INDEX][SPMODE_MONSTER_RESULT_INDEX_BATTLE_TIME] = battleTimeAve;
			g_SPMODE_MONSTER_RESULT[g_SPMODE_MONSTER_INDEX][SPMODE_MONSTER_RESULT_INDEX_HIT_RATE] = w_HIT_HYOUJI;
			g_SPMODE_MONSTER_RESULT[g_SPMODE_MONSTER_INDEX][SPMODE_MONSTER_RESULT_INDEX_FLEE_RATE] = Math.floor((w_FLEE + (100 - w_FLEE) * charaData[CHARA_DATA_INDEX_LUCKY] / 100) * 100) / 100;

			break;
		}

		// 処理終了
		return;
	}



	// 最大攻撃回数表示部の組み立て
	// 命中率が１００％未満の場合は、特殊表示
	if(w_HIT_HYOUJI <100 && n_PerfectHIT_DMG == 0){
		myInnerHtml("MaxATKnum","<Font size=2>計算不能<BR>(命中100未満なので)</Font>",0);
	}
	// 命中率が１００％の場合は、確殺を計算
	else{
		var wX = w_DMG[0];
		if(w_HIT_HYOUJI <100) wX = n_PerfectHIT_DMG;
		if(wX > 0){
			g_AttackCount[2] = Math.ceil(mobData[3] / wX);
			if(g_AttackCount[2]<10000) myInnerHtml("MaxATKnum",__DIG3(g_AttackCount[2]),0);
			else myInnerHtml("MaxATKnum",SubName[5],0);
		}else{
			myInnerHtml("MaxATKnum","<Font size=2>計算不能<BR>(0ダメージなので)</Font>",0);
		}
	}



	// 平均攻撃回数表示部の組み立て
	// TODO : 詳細未解析
	g_dps = 0;
	if(w_DMG[1] > 0){
		var check=0;
		for(var j = 0; j < n_AS_SKILL.length; j++){
			if(n_AS_SKILL[j][0] != -1) check = 1;
		}
		if((w_DMG[1] <w_DMG_AS_OverHP) || check == 0){
			g_AttackCount[1] = Math.ceil(mobData[3] / w_DMG[1]);
		}else{
			g_AttackCount[1] = Math.ceil(mobData[3] / w_DMG_AS_OverHP);
		}

		if(g_AttackCount[1]<10000){
			myInnerHtml("AtkBaseExp",__DIG3(Math.round(mobData[15] / g_AttackCount[1])) +"Exp",0);
			myInnerHtml("AtkJobExp",__DIG3(Math.round(mobData[16] / g_AttackCount[1])) +"Exp",0);
		}else{
			myInnerHtml("AtkBaseExp",SubName[7],0);
			myInnerHtml("AtkJobExp",SubName[7],0);
		}

		if(g_AttackCount[1]<10000){
			myInnerHtml("AveATKnum",__DIG3(g_AttackCount[1]),0);
			n_AveATKnum = g_AttackCount[1];
			var w2 = (wCast + wDelay) * n_AveATKnum;
			w2 = Math.floor(w2 * 100) / 100;
			if(n_Delay[0]) myInnerHtml("BattleTime","特殊",0);
			else myInnerHtml("BattleTime",__DIG3(w2) + "秒",0);
		}else{
			myInnerHtml("AveATKnum",SubName[5],0);
			myInnerHtml("BattleTime",SubName[6],0);
		}

		g_dps = 1 / (wCast + wDelay) * w_DMG[1];
		g_dps *= 100;
		g_dps = Math.round(g_dps);
		g_dps /= 100;
		if(n_Delay[0]) {
			g_dps = -1;
			myInnerHtml("AveSecondATK","特殊",0);
		}
		else myInnerHtml("AveSecondATK",__DIG3(g_dps),0);
	}else{
		myInnerHtml("AtkBaseExp","<Font size=2>計算不能</Font>",0);
		myInnerHtml("AtkJobExp","<Font size=2>計算不能</Font>",0);
		myInnerHtml("AveSecondATK","<Font size=2>計算不能<BR>(0ダメージなので)</Font>",0);
		myInnerHtml("AveATKnum","<Font size=2>計算不能<BR>(0ダメージなので)</Font>",0);
		myInnerHtml("BattleTime","<Font size=2>計算不能</Font>",0);
	}



	w = BattleHiDam(charaData, specData, mobData, attackMethodConfArray);
	w = Math.round(w *(100-charaData[CHARA_DATA_INDEX_LUCKY]))/100;
	w = Math.round(w *(100-w_FLEE))/100;

	var agLv = Math.max(
		0,
		UsedSkillSearch(SKILL_ID_AUTO_GUARD),
		g_confDataNizi[CCharaConfNizi.CONF_ID_AUTO_GUARD],
		TimeItemNumSearch(70)
	);

	if (agLv > 0) {
		w = Math.round(w * w_AG[agLv]) / 100;
	}

	if(n_A_WeaponType==3 && UsedSkillSearch(SKILL_ID_PARIYING)){
		w = Math.round(w * (80- UsedSkillSearch(SKILL_ID_PARIYING) *3))/100;
	}
	if(UsedSkillSearch(SKILL_ID_REJECT_SWORD)){
		w = Math.round(w * (100- UsedSkillSearch(SKILL_ID_REJECT_SWORD) *7.5))/100;
	}

	myInnerHtml("B_Ave2Atk",__DIG3(w)+"ダメージ",0);

	g_receiveDamageAvoids = w;

	if(n_A_ActiveSkill==441) {
		myInnerHtml("B_Ave2Atk","-",0);
	}

 }





function BattleHiDam(charaData, specData, mobData, attackMethodConfArray, objCell = null){

	var idx = 0;

	w_HiDam = new Array();
	var mobMaxATK = mobData[31];
	var mobMinATK = mobData[30];
	var mobStATK = mobData[2] * 2;
	if(mobData[22] == 1){
		mobStATK = mobData[2] + mobData[4];
	}
	if(mobMinATK <= mobStATK) mobMinATK = mobStATK;
	if(mobMinATK > mobMaxATK){
		mobMinATK = mobMaxATK - 1;
		mobStATK = mobMaxATK - 1;
	}
	mobMinATK -= mobStATK;
	mobMaxATK -= mobStATK;
	w_HiDam[0] = mobMinATK;
	w_HiDam[1] = (mobMinATK *5 + mobMaxATK) /6;
	w_HiDam[2] = (mobMinATK *4 + mobMaxATK *2) /6;
	w_HiDam[3] = (mobMinATK + mobMaxATK) /2;
	w_HiDam[4] = (mobMinATK *2 + mobMaxATK *4) /6;
	w_HiDam[5] = (mobMinATK + mobMaxATK *5) /6;
	w_HiDam[6] = mobMaxATK;
	if(mobMinATK == mobMaxATK){
		for(var i=0;i<=6;i++) w_HiDam[i] = mobMaxATK;
	}

	var wBHD;

	wBHD = GetEquippedTotalSPCardAndElse(3000+mobData[0]);
	wBHD += GetEquippedTotalSPEquip(3000+mobData[0]);









	//--------------------------------
	// マヌク耐性
	//--------------------------------
	if(n_A_PassSkill7[31]){
		if (NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MANUKU]) == 1) {
			wBHD += 10;
		}
	}

	//--------------------------------
	// スプレンディッド耐性
	//--------------------------------
	if(n_A_PassSkill7[34]){
		if (NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SPRENDED]) == 1) {
			wBHD += 10;
		}
	}

	//--------------------------------
	// モロク耐性　タイプ１
	//--------------------------------
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
	case 2431:		// 両手剣
	case 2432:		// カタール
	case 2433:		// 杖
	case 2434:		// ハンマ－
	case 2435:		// 弓
		if(NumSearch(mobData[0],MonsterGroupObj[MONSTER_GROUP_ID_MOROC]) == 1){
			if(n_A_Weapon_ATKplus >= 5) wBHD += 10;
			if(n_A_Weapon_ATKplus >= 7) wBHD += 20;
			if(n_A_Weapon_ATKplus >= 9) wBHD += 40;
		}
		break;
	}

	//--------------------------------
	// モロク耐性　タイプ２
	//--------------------------------
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
	case 2436:		// 短剣
		if(NumSearch(mobData[0],MonsterGroupObj[MONSTER_GROUP_ID_MOROC]) == 1){
			if(n_A_Weapon_ATKplus >= 5) wBHD += 5;
			if(n_A_Weapon_ATKplus >= 7) wBHD += 10;
			if(n_A_Weapon_ATKplus >= 9) wBHD += 20;
		}
		break;
	}
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT]) {
	case 2436:		// 短剣
		if(NumSearch(mobData[0],MonsterGroupObj[MONSTER_GROUP_ID_MOROC]) == 1){
			if(n_A_Weapon2_ATKplus >= 5) wBHD += 5;
			if(n_A_Weapon2_ATKplus >= 7) wBHD += 10;
			if(n_A_Weapon2_ATKplus >= 9) wBHD += 20;
		}
		break;
	}

	//--------------------------------
	// フェイスワーム耐性
	//--------------------------------
	switch (mobData[0]) {
	case 748:
	case 749:
	case 750:
	case 752:
	case 753:
	case 754:
	case 755:
	case 756:
	case 757:
		if(EquipNumSearch(2490)){
			wBHD += 5;
			if(n_A_HEAD_DEF_PLUS >= 5) wBHD += 10;
			if(n_A_HEAD_DEF_PLUS >= 7) wBHD += 15;
			if(n_A_HEAD_DEF_PLUS >= 9) wBHD += 20;
		}
		break;
	}

	//--------------------------------
	// 生体耐性
	//--------------------------------
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
	case ITEM_ID_REQUIEM_CLAYMORE:			// レクイエムクレイモア
	case ITEM_ID_REQUIEM_LANCE:				// レクイエムランス
	case ITEM_ID_REQUIEM_TWOHANDAXE:		// レクイエムツーハンドアックス
	case ITEM_ID_REQUIEM_WIZARDSTUFF:		// レクイエムウィザードスタッフ
	case ITEM_ID_REQUIEM_GREATBOW:			// レクイエムグレイトボウ
	case ITEM_ID_REQUIEM_KATAR:				// レクイエムカタール
		if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			wBHD += 5;
			if(n_A_Weapon_ATKplus >= 5) wBHD += 5;
			if(n_A_Weapon_ATKplus >= 6) wBHD += 1 * (n_A_Weapon_ATKplus - 5);
		}
		break;
	}

	//--------------------------------
	// 英雄エンチャント耐性
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_EIYUENCHANT]) == 1){
		if(CardNumSearch(CARD_ID_ENCHANT_UCHUKONGEN_GENZYU)){
			wBHD += 20;
		}
	}

	//--------------------------------
	// 生体耐性　防具
	//--------------------------------
	// レクイエムスーツ、または、レクイエムローブ
	if(EquipNumSearch(ITEM_ID_REQUIEM_SUIT) || EquipNumSearch(ITEM_ID_REQUIEM_ROBE)){
		if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			wBHD += 3;
			if(n_A_BODY_DEF_PLUS >= 6) wBHD += 2;
			if(n_A_BODY_DEF_PLUS >= 8) wBHD += 2;
		}
	}
	// レクイエムシールド
	if(EquipNumSearch(ITEM_ID_REQUIEM_SHIELD)){
		if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			wBHD += 10;
			if(n_A_SHIELD_DEF_PLUS >= 6) wBHD += 7;
			if(n_A_SHIELD_DEF_PLUS >= 8) wBHD += 7;
		}
	}
	// レクイエムマント
	if(EquipNumSearch(ITEM_ID_REQUIEM_MANT)){
		if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			wBHD += 3;
			if(n_A_SHOULDER_DEF_PLUS >= 6) wBHD += 1;
			if(n_A_SHOULDER_DEF_PLUS >= 8) wBHD += 1;
		}
	}
	// レクイエムブーツ
	if(EquipNumSearch(ITEM_ID_REQUIEM_BOOTS)){
		if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			wBHD += 3;
			if(n_A_SHOES_DEF_PLUS >= 6) wBHD += 1;
			if(n_A_SHOES_DEF_PLUS >= 8) wBHD += 1;
		}
	}

	//--------------------------------
	// タナトス耐性
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_THANATOS]) == 1){
		if (EquipNumSearch(ITEM_ID_USUDUKIYONO_BOSHI)) {
			wBHD += 5;
			if (n_A_HEAD_DEF_PLUS >= 5) wBHD += 10;
			if (n_A_HEAD_DEF_PLUS >= 7) wBHD += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) wBHD += 20;
		}
	}

	//--------------------------------
	// 地下排水路耐性
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_CHIKA_HAISUIRO]) == 1){
		if (EquipNumSearch(ITEM_ID_NEKORYOTEKEN_TACHIUO)) wBHD += 30;
		if (EquipNumSearch(ITEM_ID_NEKOKATAR_TSUNA)) wBHD += 30;
		if (EquipNumSearch(ITEM_ID_NEKORYOTETSUE_KAZIKI)) wBHD += 30;
		if (EquipNumSearch(ITEM_ID_NEKORYOTEONO_KUROMAGURO)) wBHD += 30;
		if (EquipNumSearch(ITEM_ID_NEKOYUMI_KANI)) wBHD += 30;
		if (EquipNumSearch(ITEM_ID_NEKOTANKEN_AZI)) wBHD += 15 * EquipNumSearch(ITEM_ID_NEKOTANKEN_AZI);

		if (EquipNumSearch(ITEM_ID_MARAN_KAIZOKUDANBO) > 0) {
			wBHD += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) wBHD += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) wBHD += 20;
		}
	}

	//--------------------------------
	// 暴屈折王の洞窟耐性
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_BOKUTSUONO_DOKUTSU]) == 1){
		if (EquipNumSearch(ITEM_ID_NEKORYOTEKEN_TACHIUO)) wBHD += 30;
		if (EquipNumSearch(ITEM_ID_NEKOKATAR_TSUNA)) wBHD += 30;
		if (EquipNumSearch(ITEM_ID_NEKORYOTETSUE_KAZIKI)) wBHD += 30;
		if (EquipNumSearch(ITEM_ID_NEKORYOTEONO_KUROMAGURO)) wBHD += 30;
		if (EquipNumSearch(ITEM_ID_NEKOYUMI_KANI)) wBHD += 30;
		if (EquipNumSearch(ITEM_ID_NEKOTANKEN_AZI)) wBHD += 15 * EquipNumSearch(ITEM_ID_NEKOTANKEN_AZI);

		if (EquipNumSearch(ITEM_ID_MARAN_KAIZOKUDANBO) > 0) {
			wBHD += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) wBHD += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) wBHD += 20;
		}
	}

	//--------------------------------
	// 時計塔耐性
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_TOKEITO]) == 1){
		if (EquipNumSearch(ITEM_ID_NIZIIRONO_TSUBASA) > 0) {
			wBHD += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) wBHD += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) wBHD += 20;
		}
	}

	//--------------------------------
	// ハートハンター軍事基地耐性
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_HEARTHUNTER]) == 1){
		if (EquipNumSearch(ITEM_ID_GOOGLE_HAT) > 0) {
			wBHD += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) wBHD += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) wBHD += 20;
		}
	}

	//--------------------------------
	// ロックリッジ耐性
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_ROCKRIDGE]) == 1){
		if (EquipNumSearch(ITEM_ID_TAURUS_HAT) > 0) {
			wBHD += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) wBHD += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) wBHD += 20;
		}
	}

	//--------------------------------
	// ヴェルナー耐性
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_VERNAR]) == 1){
		if (EquipNumSearch(ITEM_ID_ZIKKEN_SEITAI_GOATGATA_CAP) > 0) {
			wBHD += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) wBHD += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) wBHD += 20;
		}
	}

	//--------------------------------
	// ２５０ページ耐性
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_PAGE250]) == 1){
		if (EquipNumSearch(ITEM_ID_BLACK_VEIL) > 0) {
			wBHD += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) wBHD += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) wBHD += 20;
		}
	}

	//--------------------------------
	// 魔神殿耐性
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MAZINDEN]) == 1){
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_ARMOR) > 0) {
			wBHD += 5;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_ROBE) > 0) {
			wBHD += 5;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_MANT) > 0) {
			wBHD += 5;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_BOOTS) > 0) {
			wBHD += 5;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_RING) > 0) {
			wBHD += 5;
		}
	}

	//--------------------------------
	// オース二次捜索耐性
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_OS_NIZI_SOSAKU]) == 1){
		if (EquipNumSearch(ITEM_ID_KETTONO_RYU_BOSHI) > 0) {
			wBHD += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) wBHD += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) wBHD += 20;
		}
	}

	//--------------------------------
	// フローズンメモリー耐性
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_FROZEN_MEMORY]) == 1){
		if (EquipNumSearch(ITEM_ID_FROZEN_SCALE_SHAWL) > 0) {
			wBHD += 60;
		}
	}

	//--------------------------------
	// ネジリアン帝国耐性
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_NEZIRIAN_TEKOKU]) == 1){
		if (EquipNumSearch(ITEM_ID_KIGURUMI_BEARDOLL) > 0) {
			wBHD += 60;
		}
	}

	//--------------------------------
	// 幻想の北洞窟ルワンダ耐性
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_GENSONO_KITA_DOKUTSU_RUWANDA]) == 1){
		if (EquipNumSearch(ITEM_ID_ANCIENT_MEGALIS_MANT) > 0) {
			wBHD += 60;
		}
	}

	//--------------------------------
	// 歪んだ迷宮の森耐性
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_YUGANDA_MEIKYUNO_MORI]) == 1){
		if (EquipNumSearch(ITEM_ID_YAGIGENO_MUFFLER) > 0) {
			wBHD += 60;
		}
	}

	//--------------------------------
	// 紫色の深海洞窟耐性
	//--------------------------------
	if ((NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MURASAKI_IRONO_SHINKAI_DOKUTSU_ZYOSO]) == 1)
		|| (NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MURASAKI_IRONO_SHINKAI_DOKUTSU_KASO]) == 1)) {

		if (EquipNumSearch(ITEM_ID_SHINKAI_SEIBUTSUNO_MANT) > 0) {
			wBHD += 60;
		}
	}

	//--------------------------------
	// アビスレイク地下洞窟04耐性
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_ABYSS_LAKE_CHIKA_DOKUTSU_04]) == 1){
		if (EquipNumSearch(ITEM_ID_DRAGON_SCALE_SHAWL) > 0) {
			wBHD += 60;
		}
	}

	//--------------------------------
	// 廃棄実験体遊技場ルドゥス4階耐性
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_HAIKI_ZIKKENTAI_YUGIZYO_RUDUS_4F]) == 1){
		if (EquipNumSearch(ITEM_ID_DISCARDED_CAPE) > 0) {
			wBHD += 60;
		}
	}	


	//--------------------------------
	// 英雄の痕跡支援
	//--------------------------------
	if(TimeItemNumSearch(72)){
		if(743 <= mobData[0] && mobData[0] <= 757) wBHD += 20;
		if(769 <= mobData[0] && mobData[0] <= 786) wBHD += 20;
	}

	//--------------------------------
	// 12thアニバ星座支援
	//--------------------------------
	if(TimeItemNumSearch(80)) wBHD += 40;

	//----------------------------------------------------------------
	// 「性能カスタマイズ欄」の、地域耐性効果
	//----------------------------------------------------------------
	confval = g_objCharaConfCustomDef.GetConf(CCharaConfCustomDef.CONF_ID_RESIST_GROUP);
	if (confval != 0) {
		wBHD += confval;
	}



	// TODO: データ移行過渡処理
	// 計算したSP効果を、移行前のデータ形式に変換して、加算する
	if (IsEnableMigrationBlockTransit()) {

		var idxMap = 0;

		var candidateMapIdArray = null;

		var spTag = null;

		// 当該モンスターの出現するマップIDを収集
		candidateMapIdArray = [];

		for (idxMap = 0; idxMap < g_MonsterMapDataArray.length; idxMap++) {
			if (g_MonsterMapDataArray[idxMap][MONSTER_MAP_DATA_INDEX_DATA_ARRAY].indexOf(mobData[0]) >= 0) {
				candidateMapIdArray.push(g_MonsterMapDataArray[idxMap][MONSTER_MAP_DATA_INDEX_ID]);
			}
		}

		// すべての出現マップをループ
		for (idxMap = 0; idxMap < candidateMapIdArray.length; idxMap++) {

			spTag = new CMigEquipableSpTag()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_RECEIVE_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_MAP_MONSTER, candidateMapIdArray[idxMap])
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT);

			wBHD += g_charaDataManager.GetCharaData(MIG_CHARA_MANAGER_ID_MAIN).GetSpValue(spTag, null, MIG_EFFECTIVE_SP_CALC_MODE_SUM);
			wBHD += g_charaDataManager.GetCharaData(MIG_CHARA_MANAGER_ID_MAIN).GetSetSpValue(spTag, null, MIG_EFFECTIVE_SP_CALC_MODE_SUM);

			spTag = new CMigEquipableSpTag()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_RECEIVE_DAMAGE_OLD)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_MAP_MONSTER, candidateMapIdArray[idxMap])
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT);

			wBHD += g_charaDataManager.GetCharaData(MIG_CHARA_MANAGER_ID_MAIN).GetSpValue(spTag, null, MIG_EFFECTIVE_SP_CALC_MODE_SUM);
			wBHD += g_charaDataManager.GetCharaData(MIG_CHARA_MANAGER_ID_MAIN).GetSetSpValue(spTag, null, MIG_EFFECTIVE_SP_CALC_MODE_SUM);
		}
	}

	// 移行前データでの処理（移行完了まで必要）
	else {

	}



	// Lv200解放アップデートでの、上限値新設への対応
	if (_APPLY_UPDATE_LV200) {
		wBHD = Math.min(95, wBHD);
	}



	for (idx = 0; idx < w_HiDam.length; idx++) {
		w_HiDam[idx] -= Math.floor(w_HiDam[idx] * wBHD /100);
	}





	//--------------------------------
	// サイズ耐性
	//--------------------------------
	wBHD = n_tok[ITEM_SP_RESIST_SIZE_SMALL + mobData[17]];



	// TODO: 四次対応
	// サイズ物理耐性の加算
	wBHD += n_tok[ITEM_SP_PHYSICAL_RESIST_SIZE_SMALL + mobData[17]];



	// Lv200解放アップデートでの、上限値新設への対応
	if (_APPLY_UPDATE_LV200) {
		wBHD = Math.min(95, wBHD);
	}

	for (idx = 0; idx < w_HiDam.length; idx++) {
		w_HiDam[idx] -= Math.floor(w_HiDam[idx] * wBHD /100);
	}



	//--------------------------------
	// ボス／一般耐性
	//--------------------------------
	if (mobData[20] == MONSTER_BOSSTYPE_BOSS) {
		wBHD = n_tok[ITEM_SP_RESIST_BOSS];
	}
	else {
		wBHD = n_tok[ITEM_SP_RESIST_NOTBOSS];
	}

	// Lv200解放アップデートでの、上限値新設への対応
	if (_APPLY_UPDATE_LV200) {
		wBHD = Math.min(95, wBHD);
	}

	for (idx = 0; idx < w_HiDam.length; idx++) {
		w_HiDam[idx] -= Math.floor(w_HiDam[idx] * wBHD /100);
	}



	//--------------------------------
	// 属性耐性（実質、無属性耐性のみ考慮）
	//--------------------------------
	wBHD = n_tok[ITEM_SP_RESIST_ELM_VANITY];

	// Lv200解放アップデートでの、上限値新設への対応
	if (_APPLY_UPDATE_LV200) {
		wBHD = Math.min(95, wBHD);
	}

	for (idx = 0; idx < w_HiDam.length; idx++) {
		w_HiDam[idx] -= Math.floor(w_HiDam[idx] * wBHD /100);
	}



	//--------------------------------
	// モンスター属性への耐性
	//--------------------------------
	wBHD = n_tok[ITEM_SP_RESIST_MONSTER_ELM_VANITY + Math.floor(mobData[18] / 10)];

	// Lv200解放アップデートでの、上限値新設への対応
	if (_APPLY_UPDATE_LV200) {
		wBHD = Math.min(95, wBHD);
	}

	for (idx = 0; idx < w_HiDam.length; idx++) {
		w_HiDam[idx] -= Math.floor(w_HiDam[idx] * wBHD /100);
	}



	// これ以降の耐性は素手ATKにも効果がある
	for (idx = 0; idx < w_HiDam.length; idx++) {
		w_HiDam[idx] += mobStATK;
	}



	//--------------------------------
	// 種族耐性
	//--------------------------------
	wBHD = 0;

	// 対プレイヤーでない場合
	if (mobData[0] != MONSTER_ID_PLAYER) {

		// 種族耐性をそのまま適用
		wBHD += n_tok[ITEM_SP_RESIST_RACE_SOLID + mobData[19]];

		// 人間形（プレイヤー除く）の適用
		if (mobData[19] == RACE_ID_HUMAN) {
			wBHD += n_tok[ITEM_SP_RESIST_RACE_HUMAN_NOT_PLAYER];
		}
	}

	// 対プレイヤーの場合
	else {

		// 対プレイヤー耐性の適用
		wBHD += n_tok[ITEM_SP_RESIST_PLAYER_ALL];

		// 対プレイヤー設定の種族に基づき、参照値を変更
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SHUZOKU]) {

		// 種族が人間に設定されている場合は、人間耐性を適用
		case MOB_CONF_PLAYER_ID_SHUZOKU_HUMAN:
			wBHD += n_tok[ITEM_SP_RESIST_RACE_HUMAN];
			wBHD += n_tok[ITEM_SP_RESIST_PLAYER_HUMAN];
			break;

		// 種族がドラムに設定されている場合は、ドラム耐性を適用
		case MOB_CONF_PLAYER_ID_SHUZOKU_DORAM:
			wBHD += n_tok[ITEM_SP_RESIST_PLAYER_DORAM];
			break;

		}
	}

	// Lv200解放アップデートでの、上限値新設への対応
	if (_APPLY_UPDATE_LV200) {
		wBHD = Math.min(95, wBHD);
	}

	for (idx = 0; idx < w_HiDam.length; idx++) {
		w_HiDam[idx] -= Math.floor(w_HiDam[idx] * wBHD /100);
	}



	//--------------------------------
	// 遠距離耐性
	//--------------------------------
	if(mobData[12] >= 4){
		wBHD = n_tok[ITEM_SP_RESIST_LONGRANGE];

		// Lv200解放アップデートでの、上限値新設への対応
		if (_APPLY_UPDATE_LV200) {
			wBHD = Math.min(95, wBHD);
		}

		for (idx = 0; idx < w_HiDam.length; idx++) {
			w_HiDam[idx] -= Math.floor(w_HiDam[idx] * wBHD /100);
		}
	}



	//--------------------------------
	// DEFによるダメージ減少
	//--------------------------------
	for (idx = 0; idx < w_HiDam.length; idx++) {
		w_HiDam[idx] = Math.floor(w_HiDam[idx] * (4000 + charaData[CHARA_DATA_INDEX_DEF_DIV]) / (4000 + charaData[CHARA_DATA_INDEX_DEF_DIV] * 10)) - charaData[CHARA_DATA_INDEX_DEF_MINUS];
	}



	//--------------------------------
	// 「アコライト　ディバインプロテクション」の効果
	//--------------------------------
	if ((GetMonseterElmBasicType(mobData[MONSTER_DATA_INDEX_ELEMENT]) == ELM_ID_UNDEAD)
		|| (mobData[MONSTER_DATA_INDEX_RACE] == RACE_ID_DEMON)) {

		wBHD = Math.round((3 + 4 / 100 * n_A_BaseLV) * UsedSkillSearch(SKILL_ID_DIVINE_PROTECTION));

		for (i = 0; i <= 6; i++) {
			w_HiDam[i] -= wBHD;
		}
	}

	//--------------------------------
	// 「レンジャー　レンジャーメイン」の効果
	//--------------------------------
	switch (mobData[MONSTER_DATA_INDEX_RACE]) {
	case RACE_ID_ANIMAL:
	case RACE_ID_PLANT:
	case RACE_ID_FISH:
		for (i = 0; i <= 6; i++) {
			w_HiDam[i] -= 5 * UsedSkillSearch(SKILL_ID_RANGER_MAIN);
		}
	}

	//--------------------------------
	// 「メカニック　火と大地の研究」の効果
	//--------------------------------
	if ((GetMonseterElmBasicType(mobData[MONSTER_DATA_INDEX_ELEMENT]) == ELM_ID_EARTH)
		|| (GetMonseterElmBasicType(mobData[MONSTER_DATA_INDEX_ELEMENT]) == ELM_ID_FIRE)) {

		for (i = 0; i <= 6; i++) {
			w_HiDam[i] -= 10 * UsedSkillSearch(SKILL_ID_HITO_DAICHINO_KENKYU);
		}

	}

	//--------------------------------
	// 「拳聖　太陽の安楽」の効果
	//--------------------------------
	if (UsedSkillSearch(SKILL_ID_TAIYONO_ANRAKU)) {
		switch (UsedSkillSearch(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_HI)) {
			case 1:	// 今日の日付
				let today = (new Date()).getDate();
				if (today % 2 == 1)	break; // 太陽の日ではない（奇数）
			case 0:	// 無条件発動
			case 2: // 太陽の日
				wBHD = Math.floor((n_A_BaseLV + n_A_LUK + n_A_DEX) / 2);
				for (i = 0; i <= 6; i++) {
					w_HiDam[i] -= wBHD;
				}
		}
	}

	//--------------------------------
	// 「クルセイダー　ディフェンダー」の効果
	//--------------------------------
	if (mobData[MONSTER_DATA_INDEX_RANGE] >= 4){
		sklLv = Math.max(0, UsedSkillSearch(SKILL_ID_DEFENDER), g_confDataNizi[CCharaConfNizi.CONF_ID_DEFENDER]);

		wBHD = 5 + 15 * sklLv;

		for (i = 0; i <= 6; i++) {
			w_HiDam[i] -= Math.floor(w_HiDam[i] * wBHD /100);
		}
	}

	//--------------------------------
	// 「マジシャン　エナジーコート」の効果
	//--------------------------------
	if (UsedSkillSearch(SKILL_ID_ENERGY_COAT)){
		wBHD = 6 * UsedSkillSearch(SKILL_ID_ENERGY_COAT);

		for (i = 0; i <= 6; i++) {
			w_HiDam[i] -= Math.floor(w_HiDam[i] * wBHD /100);
		}
	}
	else if (n_A_PassSkill7[50]){
		wBHD = 6 * n_A_PassSkill7[50];

		for (i = 0; i <= 6; i++) {
			w_HiDam[i] -= Math.floor(w_HiDam[i] * wBHD /100);
		}
	}


	//--------------------------------
	// ストーンスキンのダメージ軽減効果
	//--------------------------------
	if (TimeItemNumSearch(TIME_ITEM_ID_WOLF_HEZIN)) {
		for (i = 0; i <= 6; i++) {
			w_HiDam[i] -= Math.floor(w_HiDam[i] * 20 /100);
		}
	}

	//--------------------------------
	// 金剛のダメージ軽減効果
	//--------------------------------
	if (UsedSkillSearch(SKILL_ID_KONGO)) {
		for(i=0;i<=6;i++) w_HiDam[i] -= Math.floor(w_HiDam[i] * 90 / 100);
	}

	//--------------------------------
	// 「サモナー　うずくまる」のダメージ軽減効果
	//--------------------------------
	if (UsedSkillSearch(SKILL_ID_UZUKUMARU)) {

		// 特定の戦闘エリアでの補正
		var rateWork = 80;
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
			rateWork = 50;
			break;

		}

		for (i = 0; i <= 6; i++) {
			w_HiDam[i] -= Math.floor(w_HiDam[i] * rateWork / 100);
		}
	}



	//--------------------------------
	// 被ダメージ増幅／軽減効果を適用
	//--------------------------------
	for (i = 0; i <= 6; i++) {
		w_HiDam[i] = ApplyReceiveDamageAmplify(mobData, w_HiDam[i]);
	}



	for(i=0;i<=6;i++){
		if(w_HiDam[i] <1) w_HiDam[i]=1;
	}
	if(mobData[12] >= 4){
		if(UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL) == 26){
			for(i=0;i<=6;i++) w_HiDam[i] = 0;
		}
	}
	if(n_A_PassSkill4[10]) for(i=0;i<=6;i++) w_HiDam[i] = Math.floor(w_HiDam[i] / 2);
	w_HiDam[0] = Math.floor(w_HiDam[0]);
	w_HiDam[6] = Math.floor(w_HiDam[6]);
	wBHD=0;
	for(i=0;i<=6;i++) wBHD += w_HiDam[i];
	wBHD = Math.round(wBHD / 7);
	var name64 = "平均被ダメージ(仮)";
	var wRefStr = "";
	wRef1 = new Array();
	wRef2 = new Array();
	wRef3 = new Array();



	var w_sp_rs=1;
	if(UsedSkillSearch(SKILL_ID_KONGO)) w_sp_rs = 10;
	if(UsedSkillSearch(SKILL_ID_UZUKUMARU)) w_sp_rs = 20;

	var w_MaxHP = Math.floor(charaData[CHARA_DATA_INDEX_MAXHP] * n_A_BaseLV / 100);
	if(UsedSkillSearch(SKILL_ID_REFLECT_SHIELD)){
		var wRSnum = (10 + 3 * UsedSkillSearch(SKILL_ID_REFLECT_SHIELD)) * w_sp_rs;
		wRef1[0] = Math.floor(wBHD * wRSnum / 100);
		wRef1[1] = Math.floor(w_HiDam[0] * wRSnum / 100);
		wRef1[2] = Math.floor(w_HiDam[6] * wRSnum / 100);
		for(var i=0;i<=2;i++) if(wRef1[i] > w_MaxHP) wRef1[i] = w_MaxHP;
		wRefStr += "<BR><Font color='Blue'><B>"+ __DIG3(wRef1[0]) +"("+ __DIG3(wRef1[1]) +"～"+ __DIG3(wRef1[2]) +")</B>";
		name64 += "<BR><Font color=Blue><B>反射ダメージ</B></Font>";
	}
	if(n_tok[71]){
		var w = n_tok[71] * w_sp_rs;
		wRef2[0] = Math.floor(wBHD * w / 100);
		wRef2[1] = Math.floor(w_HiDam[0] * w / 100);
		wRef2[2] = Math.floor(w_HiDam[6] * w / 100);
		for(var i=0;i<=2;i++) if(wRef2[i] > w_MaxHP) wRef2[i] = w_MaxHP;
		wRefStr += "<BR><Font color='Blue'><B>"+ __DIG3(wRef2[0]) +"("+ __DIG3(wRef2[1]) +"～"+ __DIG3(wRef2[2]) +")</B>";
		name64 += "<BR><Font color=Blue><B>反射ダメージ</B></Font>";
	}
	if(UsedSkillSearch(SKILL_ID_SHIELD_SPELL_REFLECT)){
		var wRef_SP;
		if(UsedSkillSearch(SKILL_ID_SHIELD_SPELL_REFLECT) == 1) wRef_SP = (ItemObjNew[n_A_Equip[EQUIP_REGION_ID_SHIELD]][ITEM_DATA_INDEX_POWER] / 10) * w_sp_rs;
		else wRef_SP = (n_SieldSp[UsedSkillSearch(SKILL_ID_SHIELD_SPELL_REFLECT)] / 10) * w_sp_rs;
		wRef3[0] = Math.floor(wBHD * wRef_SP / 100);
		wRef3[1] = Math.floor(w_HiDam[0] * wRef_SP / 100);
		wRef3[2] = Math.floor(w_HiDam[6] * wRef_SP / 100);
		for(var i=0;i<=2;i++) if(wRef3[i] > w_MaxHP) wRef3[i] = w_MaxHP;
		wRefStr += "<BR><Font color='Blue'><B>"+ __DIG3(wRef3[0]) +"("+ __DIG3(wRef3[1]) +"～"+ __DIG3(wRef3[2]) +")</B>";
		name64 += "<BR><Font color=Blue><B>反射ダメージ</B></Font>";
	}

	if(n_A_ActiveSkill==441){
		if(n_DEATH_BOUND[3]==0){

			var wRef_DB;
			wRef_DB = (500 + 100 * n_A_ActiveSkillLV) * w_sp_rs;

			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				wRef_DB = (75 + 5 * n_A_ActiveSkillLV) * w_sp_rs;
				break;

			}

			var wRef4 = new Array();
			n_DEATH_BOUND[0] = Math.floor((w_HiDam[0] * 0.7) * wRef_DB / 100);
			n_DEATH_BOUND[1] = Math.floor((wBHD * 0.7) * wRef_DB / 100);
			n_DEATH_BOUND[2] = Math.floor((w_HiDam[6] * 0.7) * wRef_DB / 100);
			n_DEATH_BOUND[3] = 1;
			BattleCalc999(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray);
			n_DEATH_BOUND[3] = 0;
			wBHD = Math.floor((wBHD * 0.3) * wRef_DB / 100);
			w_HiDam[0] = Math.floor((w_HiDam[0] * 0.3) * wRef_DB / 100);
			w_HiDam[6] = Math.floor((w_HiDam[6] * 0.3) * wRef_DB / 100);
		}
	}
	if(n_A_ActiveSkill==630){
		if(n_DEATH_BOUND[3]==0){
			var wRef_DB;
			wRef_DB = (100 + 20 * n_A_ActiveSkillLV) * w_sp_rs;
			var wRef4 = new Array();
			n_DEATH_BOUND[0] = Math.floor(w_HiDam[0] * wRef_DB / 100);
			n_DEATH_BOUND[1] = Math.floor(wBHD * wRef_DB / 100);
			n_DEATH_BOUND[2] = Math.floor(w_HiDam[6] * wRef_DB / 100);
			n_DEATH_BOUND[3] = 1;
			if(attackMethodConfArray[0].GetOptionValue(2) != 0){
				n_DEATH_BOUND[0] = Math.floor(attackMethodConfArray[0].GetOptionValue(2) * wRef_DB / 100);
				n_DEATH_BOUND[1] = n_DEATH_BOUND[0];
				n_DEATH_BOUND[2] = n_DEATH_BOUND[0];
			}
			BattleCalc999(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray);
			n_DEATH_BOUND[3] = 0;
		}
	}

	if (objCell) {
		HtmlCreateTextNode(__DIG3(Math.floor(wBHD)), objCell);
	}
	else {
		myInnerHtml("B_AveAtk", __DIG3(wBHD) + "<BR>" + " (" + __DIG3(w_HiDam[0]) + "～" + __DIG3(w_HiDam[6]) + ")" + wRefStr, 0);
	}

	g_receiveDamageAverage = wBHD;

	return wBHD;
 }



 function BattleHiDamMaxPain(charaData, specData, mobData, attackMethodConfArray, painATK, objCell = null){

	var idx = 0;

	w_HiDam = new Array();
	for(var i=0;i<=6;i++) w_HiDam[i] = painATK;

	var wBHD;
	wBHD = GetEquippedTotalSPCardAndElse(3000+mobData[0]);
	wBHD += GetEquippedTotalSPEquip(3000+mobData[0]);

	// TODO: データ移行過渡処理
	// 計算したSP効果を、移行前のデータ形式に変換して、加算する
	if (IsEnableMigrationBlockTransit()) {

		var idxMap = 0;

		var candidateMapIdArray = null;

		var spTag = null;

		// 当該モンスターの出現するマップIDを収集
		candidateMapIdArray = [];

		for (idxMap = 0; idxMap < g_MonsterMapDataArray.length; idxMap++) {
			if (g_MonsterMapDataArray[idxMap][MONSTER_MAP_DATA_INDEX_DATA_ARRAY].indexOf(mobData[0]) >= 0) {
				candidateMapIdArray.push(g_MonsterMapDataArray[idxMap][MONSTER_MAP_DATA_INDEX_ID]);
			}
		}

		// すべての出現マップをループ
		for (idxMap = 0; idxMap < candidateMapIdArray.length; idxMap++) {

			spTag = new CMigEquipableSpTag()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_RECEIVE_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_MAP_MONSTER, candidateMapIdArray[idxMap])
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT);

			wBHD += g_charaDataManager.GetCharaData(MIG_CHARA_MANAGER_ID_MAIN).GetSpValue(spTag, null, MIG_EFFECTIVE_SP_CALC_MODE_SUM);
			wBHD += g_charaDataManager.GetCharaData(MIG_CHARA_MANAGER_ID_MAIN).GetSetSpValue(spTag, null, MIG_EFFECTIVE_SP_CALC_MODE_SUM);

			spTag = new CMigEquipableSpTag()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_RECEIVE_DAMAGE_OLD)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_MAP_MONSTER, candidateMapIdArray[idxMap])
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT);

			wBHD += g_charaDataManager.GetCharaData(MIG_CHARA_MANAGER_ID_MAIN).GetSpValue(spTag, null, MIG_EFFECTIVE_SP_CALC_MODE_SUM);
			wBHD += g_charaDataManager.GetCharaData(MIG_CHARA_MANAGER_ID_MAIN).GetSetSpValue(spTag, null, MIG_EFFECTIVE_SP_CALC_MODE_SUM);
		}
	}
	// 移行前データでの処理（移行完了まで必要）
	else {

	}

	// Lv200解放アップデートでの、上限値新設への対応
	if (_APPLY_UPDATE_LV200) {
		wBHD = Math.min(95, wBHD);
	}

	for (idx = 0; idx < w_HiDam.length; idx++) {
		w_HiDam[idx] -= Math.floor(w_HiDam[idx] * wBHD /100);
	}


	//--------------------------------
	// 「マジシャン　エナジーコート」の効果
	//--------------------------------
	if (UsedSkillSearch(SKILL_ID_ENERGY_COAT)){
		wBHD = 6 * UsedSkillSearch(SKILL_ID_ENERGY_COAT);

		for (i = 0; i <= 6; i++) {
			w_HiDam[i] -= Math.floor(w_HiDam[i] * wBHD /100);
		}
	}
	else if (n_A_PassSkill7[50]){
		wBHD = 6 * n_A_PassSkill7[50];

		for (i = 0; i <= 6; i++) {
			w_HiDam[i] -= Math.floor(w_HiDam[i] * wBHD /100);
		}
	}


	//--------------------------------
	// ストーンスキンのダメージ軽減効果
	//--------------------------------
	if (TimeItemNumSearch(TIME_ITEM_ID_WOLF_HEZIN)) {
		for (i = 0; i <= 6; i++) {
			w_HiDam[i] -= Math.floor(w_HiDam[i] * 20 /100);
		}
	}

	//--------------------------------
	// 金剛のダメージ軽減効果
	//--------------------------------
	if (UsedSkillSearch(SKILL_ID_KONGO)) {
		for(i=0;i<=6;i++) w_HiDam[i] -= Math.floor(w_HiDam[i] * 90 / 100);
	}

	//--------------------------------
	// 「サモナー　うずくまる」のダメージ軽減効果
	//--------------------------------
	if (UsedSkillSearch(SKILL_ID_UZUKUMARU)) {

		// 特定の戦闘エリアでの補正
		var rateWork = 80;
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
			rateWork = 50;
			break;

		}

		for (i = 0; i <= 6; i++) {
			w_HiDam[i] -= Math.floor(w_HiDam[i] * rateWork / 100);
		}
	}

	//--------------------------------
	// 服の属性によるダメージ軽減効果
	//--------------------------------
	if (n_A_BodyZokusei == ELM_ID_PSYCO) {
		for (i = 0; i <= 6; i++) {
			w_HiDam[i] -= Math.floor(w_HiDam[i] * 75 /100);
		}
	}


	//--------------------------------
	// 被ダメージ増幅／軽減効果を適用
	//--------------------------------
	for (i = 0; i <= 6; i++) {
		w_HiDam[i] = ApplyReceiveDamageAmplify(mobData, w_HiDam[i]);
	}



	for(i=0;i<=6;i++){
		if(w_HiDam[i] <1) w_HiDam[i]=1;
	}
	if(mobData[12] >= 4){
		if(UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL) == 26){
			for(i=0;i<=6;i++) w_HiDam[i] = 0;
		}
	}
	if(n_A_PassSkill4[10]) for(i=0;i<=6;i++) w_HiDam[i] = Math.floor(w_HiDam[i] / 2);
	w_HiDam[0] = Math.floor(w_HiDam[0]);
	w_HiDam[6] = Math.floor(w_HiDam[6]);
	wBHD=0;
	for(i=0;i<=6;i++) wBHD += w_HiDam[i];
	wBHD = Math.round(wBHD / 7);
	var name64 = "平均被ダメージ(仮)";
	var wRefStr = "";
	wRef1 = new Array();
	wRef2 = new Array();
	wRef3 = new Array();



	var w_sp_rs=1;
	if(UsedSkillSearch(SKILL_ID_KONGO)) w_sp_rs = 10;
	if(UsedSkillSearch(SKILL_ID_UZUKUMARU)) w_sp_rs = 20;
	//var w_MaxHP = Math.floor(charaData[CHARA_DATA_INDEX_MAXHP] * n_A_BaseLV / 100);
	if (objCell) {
		HtmlCreateTextNode(__DIG3(Math.floor(wBHD)), objCell);
	}
	else {
		myInnerHtml("B_AveAtk", __DIG3(wBHD) + "<BR>" + " (" + __DIG3(w_HiDam[0]) + "～" + __DIG3(w_HiDam[6]) + ")" + wRefStr, 0);
	}
	g_receiveDamageAverage = wBHD;

	return wBHD;
 }




/**
 * 魔法判定攻撃に対するスキル倍率の増減を取得する.
 * MDEFなどの計算後に処理される
 * @param wBMC ダメージ
 * @return 適用後のダメージ
 */
function GetMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData) {

	var valueWork = 0;

	var wX = 0;

//********************************************************************************************************************************
//********************************************************************************************************************************
//****
//**** ★★★★　装備セット等の“魔法”スキル倍率補正　ここから　★★★★
//****
//********************************************************************************************************************************
//********************************************************************************************************************************

	//----------------------------------------------------------------
	// ファイアーピラー以外の場合、装備固定効果、カード固定効果を適用
	//----------------------------------------------------------------
	if(n_A_ActiveSkill != 122) {
		wX = GetEquippedTotalSPEquip(5000 + n_A_ActiveSkill) + GetEquippedTotalSPCardAndElse(5000 + n_A_ActiveSkill);
	}

	//----------------------------------------------------------------
	// 「バンシーカード」の、「ナパームビート」「ソウルストライク」「ナパームバルカン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 46 || n_A_ActiveSkill == 47 || n_A_ActiveSkill == 277) {
		if(GetLowerJobSeriesID(n_A_JOB)==5) wX += 20 * CardNumSearch(474);
	}

	//----------------------------------------------------------------
	// 「花のカチューシャ」の、「アーススパイク」「ヘヴンズドライブ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 132 || n_A_ActiveSkill == 133) {
		if(EquipNumSearch(1146)) wX += n_A_HEAD_DEF_PLUS;
	}

	//----------------------------------------------------------------
	// 「ラクリマスティック」の、「ストームガスト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 131) {
		if(EquipNumSearch(1169)) wX += n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「ノアの帽子」の、「ホーリーライト」強化
	// 「マジカルフェザー」の、「ホーリーライト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 37 || n_A_ActiveSkill == 387){

		if(GetLowerJobSeriesID(n_A_JOB) == 3 && EquipNumSearch(1247)){
			wX += 5;
			if(n_A_HEAD_DEF_PLUS >= 7) wX += 5;
		}

		if(EquipNumSearch(2394)) {
			wX += 80 * LearnedSkillSearch(SKILL_ID_IMPOSITIO_MANUS);
		}
	}

	//----------------------------------------------------------------
	// 「メンタルスティック」の、「サイキックウェーブ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 662){
		if(EquipNumSearch(1475)){
			if(n_A_Weapon_ATKplus >= 6) wX += (n_A_Weapon_ATKplus - 5) * 2;
		}
	}

	//----------------------------------------------------------------
	// 「審判セット」の、「アドラムス」強化
	// 「審判Ⅱセット」の、「アドラムス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 478){
		if(n_A_Weapon_ATKplus >= 7 && n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7){
			if(EquipNumSearch(1570)) wX += 100;
			if(EquipNumSearch(1572)) wX += 50;
		}
	}

	//----------------------------------------------------------------
	// 「冷気の魔法書」の、「コールドボルト」「ダイヤモンドダスト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 54 || n_A_ActiveSkill == 667) {
		if(EquipNumSearch(1697)) wX += 3 * n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「炎神の系譜」の、「ファイアーボルト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 51) {
		if(EquipNumSearch(1803)) wX += n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「氷神の系譜」の、「コールドボルト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 54) {
		if(EquipNumSearch(1784)) wX += n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「雷神の系譜」の、「ライトニングボルト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 56) {
		if(EquipNumSearch(1744)) wX += n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「地神の系譜」の、「アーススパイク」「ヘヴンズドライブ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 132 || n_A_ActiveSkill == 133) {
		if(EquipNumSearch(1900)) wX += n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「エレメンタルブーツ」の、「ファイアーボルト」「コールドボルト」「ライトニングボルト」「アーススパイク」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 51 || n_A_ActiveSkill == 54 || n_A_ActiveSkill == 56 || n_A_ActiveSkill == 132) {
		if(n_A_SHOES_DEF_PLUS >= 6 && EquipNumSearch(1894)) wX += n_A_SHOES_DEF_PLUS - 5;
	}

	//----------------------------------------------------------------
	// 「天体サークル」の、「メテオストーム」「クリムゾンロック」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 125 || n_A_ActiveSkill == 527) {
		if(EquipNumSearch(2092)) wX += 5 * ROUNDDOWN(n_A_HEAD_DEF_PLUS / 3);
	}

	//----------------------------------------------------------------
	// 「まねき餅花」の、「ファイアーウォール」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 53) {
		if(n_A_HEAD_DEF_PLUS >= 1 && EquipNumSearch(2166)) wX += 5 * n_A_HEAD_DEF_PLUS;
	}

	//----------------------------------------------------------------
	// 「悪魔祓いの書」の、「マグヌスエクソシズム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 104){
		if(EquipNumSearch(2178)){
			var w9 = SU_INT;
			if(w9 > 120) w9 = 120;
			wX += w9;
		}
	}

	//----------------------------------------------------------------
	// 「酸素ボンベ」の、「ファイアーウォール」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 53) {
		if(EquipNumSearch(2299)) wX += ROUNDDOWN(n_A_BaseLV / 2);
	}

	//----------------------------------------------------------------
	// 「シャドウスタッフ」の、スキル習得による「ヘルインフェルノ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 528){
		if(EquipNumSearch(ITEM_ID_SHADOW_STUFF)){
			if (LearnedSkillSearch(SKILL_ID_HELL_INFERNO) >= 5) {
				wX += 100;
				wX += 10 * n_A_Weapon_ATKplus;
			}
		}
	}

	//----------------------------------------------------------------
	// 「法螺貝」の、「振動残響」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 639 && EquipNumSearch(2430)){
		if(n_A_Weapon_ATKplus >= 5) wX += 10;
		if(n_A_Weapon_ATKplus >= 7) wX += 20;
		if(n_A_Weapon_ATKplus >= 9) wX += 40;
	}

	//----------------------------------------------------------------
	// 「アルティメット　クリムゾンセット」の、「サモンファイアーボール」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 533 && EquipNumSearch(2546)) {
		wX += 2 * n_A_BODY_DEF_PLUS;
	}

	//----------------------------------------------------------------
	// 「アルティメット　アクアセット」の、「サモンウォーターボール」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 534 && EquipNumSearch(2551)) {
		wX += 2 * n_A_BODY_DEF_PLUS;
	}

	//----------------------------------------------------------------
	// 「アルティメット　ゴールデンロッドセット」の、「サモンボールライトニング」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 535 && EquipNumSearch(2556)) {
		wX += 2 * n_A_BODY_DEF_PLUS;
	}

	//----------------------------------------------------------------
	// 「アルティメット　フォレストセット」の、「サモンストーン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 536 && EquipNumSearch(2561)) {
		wX += 2 * n_A_BODY_DEF_PLUS;
	}

	//----------------------------------------------------------------
	// 「アルティメット　各ウォーロックセット」の、「魔法力増幅」使用後における、
	// 「メテオストーム」、「ストームガスト」、「ロードオブヴァーミリオン」、「ヘヴンズドライブ」強化
	//----------------------------------------------------------------
	if(UsedSkillSearch(SKILL_ID_MAHORYOKU_ZOFUKU)){
		if(n_A_ActiveSkill == 125 && EquipNumSearch(2549)) wX += 1 * n_A_BaseLV;
		if(n_A_ActiveSkill == 131 && EquipNumSearch(2554)) wX += ROUNDDOWN(1.5 * n_A_BaseLV);
		if(n_A_ActiveSkill == 127 && EquipNumSearch(2559)) wX += 2 * n_A_BaseLV;
		if(n_A_ActiveSkill == 133 && EquipNumSearch(2564)) wX += ROUNDDOWN(2.5 * n_A_BaseLV);
	}





	//----------------------------------------------------------------
	// 「古びたミンストレルソングの帽子」の、「振動残響」強化
	// 「古びたバレリーナの髪飾り」の、「振動残響」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 639) {
		if(EquipNumSearch(ITEM_ID_FURUBITA_BALLERINA)
			|| EquipNumSearch(ITEM_ID_FURUBITA_MINSTRELSONG)) {
			if(n_A_HEAD_DEF_PLUS >= 7) wX += 30;
			if(n_A_HEAD_DEF_PLUS >= 9) wX += 20;
		}
	}

	//----------------------------------------------------------------
	// 「古びた魔力石の帽子」の、「クリムゾンロック」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 527) {
		if(EquipNumSearch(ITEM_ID_FURUBITA_MARYOKUSEKI)) {
			if(n_A_HEAD_DEF_PLUS >= 7) wX += 30;
			if(n_A_HEAD_DEF_PLUS >= 9) wX += 20;
		}
	}

	//----------------------------------------------------------------
	// 「古びた魔力石の帽子」の、「コメット」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 529) {
		if(EquipNumSearch(ITEM_ID_FURUBITA_MARYOKUSEKI)) {
			if(n_A_HEAD_DEF_PLUS >= 7) wX += 15;
			if(n_A_HEAD_DEF_PLUS >= 9) wX += 10;
		}
	}



	//----------------------------------------------------------------
	// 「精霊王の指輪」の、「アースグレイヴ」「ダイヤモンドダスト」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == 666 || n_A_ActiveSkill == 667) {
		wX += ROUNDDOWN(n_A_BaseLV / 8) * 1 * EquipNumSearch(ITEM_ID_SEIREIONO_YUBIWA);
	}



	//----------------------------------------------------------------
	// 「エメラルドイヤリング」の、「メタリックサウンド」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 641) {
		wX += ROUNDDOWN(n_A_BaseLV / 5) * 2 * EquipNumSearch(ITEM_ID_EMERALDEARRING);
	}



	//----------------------------------------------------------------
	// 「ポロロッカシューズ　ラクリマセット」の、「ウォーターボール」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_WATER_BALL) {
		if (EquipNumSearch(ITEM_SET_ID_POROROCA_SHOES_LACRYMA_STICK)) {

			// ウォーターボール習得レベルによる強化
			wX += 30 * LearnedSkillSearch(SKILL_ID_WATER_BALL);

			// ラクリマスティックの精錬による強化
			wX += 20 * n_A_Weapon_ATKplus;
		}
	}



	//----------------------------------------------------------------
	// 「アヴェンジャーウィザードスタッフ」の、「コメット」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_COMMET) {
		if (EquipNumSearch(ITEM_ID_AVENGER_WIZARDSTUFF)) {
			if (n_A_Weapon_ATKplus >= 9) {
				wX += 20;
			}
		}
	}



	//----------------------------------------------------------------
	// 「サバイバルオーブ　ロッドセット」の、「アースストレイン」強化
	// 「サバイバルオーブ　ロッドセット」の、「チェーンライトニング」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_EARTH_STRAIN
		|| n_A_ActiveSkill == SKILL_ID_CHAIN_LIGHTNING) {

		if (EquipNumSearch(ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_ROD_DEX)
			|| EquipNumSearch(ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_ROD_INT)) {
			if (n_A_Weapon_ATKplus >= 10) {
				if (n_A_BaseLV <= 99) {
					wX += 15;
				}
				else {
					wX += 45;
				}
			}
		}
	}
	//----------------------------------------------------------------
	// 「サバイバルオーブ　ロッドセット」の、「ヘヴンズドライブ」強化
	// 「サバイバルオーブ　ロッドセット」の、「ユピテルサンダー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_HEAVENS_DRIVE
		|| n_A_ActiveSkill == SKILL_ID_JUPITER_THUNDER) {

		if (EquipNumSearch(ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_ROD_DEX)
			|| EquipNumSearch(ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_ROD_INT)) {
			if (n_A_Weapon_ATKplus >= 10) {
				if (n_A_BaseLV <= 99) {
					wX += 70;
				}
				else {
					wX += 210;
				}
			}
		}
	}



	//----------------------------------------------------------------
	// 「マジカルリング」の、「ファイアーボルト」強化
	// 「マジカルリング」の、「コールドボルト」強化
	// 「マジカルリング」の、「ライトニングボルト」強化
	// 「マジカルリング」の、「アーススパイク」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FIRE_BOLT
		|| n_A_ActiveSkill == SKILL_ID_COLD_BOLT
		|| n_A_ActiveSkill == SKILL_ID_LIGHTNING_BOLT
		|| n_A_ActiveSkill == SKILL_ID_EARTH_SPIKE) {

		if (EquipNumSearch(ITEM_ID_MAGICAL_RING)) {
			wX += 1 * ROUNDDOWN(n_A_BaseLV / 5) * EquipNumSearch(ITEM_ID_MAGICAL_RING);
		}
	}




	//----------------------------------------------------------------
	// 「裁きの靴　ホーリーステッキセット」の、「アドラムス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_ADORAMUS) {
		if(EquipNumSearch(ITEM_SET_ID_SABAKINO_KUTSU_HOLY_STICK)) {

			// ラウダアグヌス等の習得レベルによる強化
			var sklLv = 0;
			sklLv += LearnedSkillSearch(SKILL_ID_CLEARANCE);
			sklLv += LearnedSkillSearch(SKILL_ID_LAUDAAGNUS);
			sklLv += LearnedSkillSearch(SKILL_ID_LAUDARAMUS);

			wX += 10 * sklLv;

			// 過剰精錬による強化
			if (n_A_Weapon_ATKplus >= 9) {
				wX += 20;
			}
		}
	}



	//----------------------------------------------------------------
	// 「上忍の腰帯」の、「龍炎陣」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_RYUENZIN) {
		if ((itemCount = EquipNumSearch(ITEM_ID_ZYONINNO_KOSHIOBI)) > 0) {
			wX += 10 * LearnedSkillSearch(SKILL_ID_KOUENKA) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「上忍の腰帯」の、「氷柱落とし」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_TSURARAOTOSHI) {
		if ((itemCount = EquipNumSearch(ITEM_ID_ZYONINNO_KOSHIOBI)) > 0) {
			wX += 20 * LearnedSkillSearch(SKILL_ID_HYOSENSO) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「上忍の腰帯」の、「龍炎陣」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_SAKUFU) {
		if ((itemCount = EquipNumSearch(ITEM_ID_ZYONINNO_KOSHIOBI)) > 0) {
			wX += 10 * LearnedSkillSearch(SKILL_ID_FUZIN) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「神魔バフォメットの角」の、「デュプレライト（魔法）」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_MIRIAM_LIGHT) {
		if ((itemCount = EquipNumSearch(ITEM_ID_SHINMA_BAPHOMETNO_TSUNO)) > 0) {
			wX += 10 * n_A_HEAD_DEF_PLUS * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「悪魔崇拝者の靴　堕天司祭の闇光外套　古代樹の杖セット」の、「ヘルインフェルノ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_HELL_INFERNO) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_AKUMASUHAISHANO_KUTSU_DATENSHISAINO_ANKOGAITO_KODAIZYUNO_TSUE)) > 0) {
			vartmp = 0;

			if (n_A_Weapon_ATKplus >= 7) vartmp += 100;
			if (n_A_Weapon_ATKplus >= 9) vartmp += 100;

			wX += vartmp * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「炎雷魔女の大杖」の、「ファイアーウォーク」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FIRE_WALK) {
		if ((itemCount = EquipNumSearch(ITEM_ID_ENRAIMAZYONO_OTSUE)) > 0) {
			wX += 30 * n_A_Weapon_ATKplus;

			if (n_A_Weapon_ATKplus >= 9) {
				wX += 100;
			}
		}
	}

	//----------------------------------------------------------------
	// 「炎雷魔女の大杖」の、「エレクトリックーウォーク」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ELECTRIC_WALK) {
		if ((itemCount = EquipNumSearch(ITEM_ID_ENRAIMAZYONO_OTSUE)) > 0) {
			wX += 30 * n_A_Weapon_ATKplus;

			if (n_A_Weapon_ATKplus >= 9) {
				wX += 100;
			}
		}
	}

	//----------------------------------------------------------------
	// 「太極の護符　灼熱の剣　デイヴィッドシールドセット」の、精錬による効果
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CRYMSON_ROCK) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_TAIKYOKUNO_GOFU_SHAKUNETSUNO_KEN_DIVID_SHIELD)) > 0) {
			wX += 1 * n_A_Weapon_ATKplus * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「太極の護符　浄化の剣　デイヴィッドシールドセット」の、精錬による効果
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_JUDEX) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_TAIKYOKUNO_GOFU_ZYOKANO_KEN_DIVID_SHIELD)) > 0) {
			wX += 5 * n_A_Weapon_ATKplus * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「太極の護符　奈落の剣　デイヴィッドシールドセット」の、精錬による効果
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_HELL_INFERNO) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_TAIKYOKUNO_GOFU_NARAKUNO_KEN_DIVID_SHIELD)) > 0) {
			wX += 10 * n_A_Weapon_ATKplus * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「星のカード」の、「ソウルエクスパンション」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SOUL_EXPANSION) {
		wX += ApplyMagicalSkillDamageRatioChangeSubArcanaCard(CARD_ID_ARCANA_STAR);
	}

	//----------------------------------------------------------------
	// 「隠者のカード」の、「アドラムス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ADORAMUS) {
		wX += ApplyMagicalSkillDamageRatioChangeSubArcanaCard(CARD_ID_ARCANA_HARMIT);
	}

	//----------------------------------------------------------------
	// 「月のカード」の、「ダイヤモンドダスト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_DIAMOND_DUST) {
		wX += ApplyMagicalSkillDamageRatioChangeSubArcanaCard(CARD_ID_ARCANA_MOON);
	}



	//----------------------------------------------------------------
	// 「マッターキメラカード」の、「ファイアーボルト」強化
	// 「マッターキメラカード」の、「ライトニングボルト」強化
	// 「マッターキメラカード」の、「コールドボルト」強化
	// 「マッターキメラカード」の、「アーススパイク」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FIRE_BOLT
		|| n_A_ActiveSkill == SKILL_ID_LIGHTNING_BOLT
		|| n_A_ActiveSkill == SKILL_ID_COLD_BOLT
		|| n_A_ActiveSkill == SKILL_ID_EARTH_SPIKE) {
		if ((cardCount = CardNumSearch(CARD_ID_MATTER_CHEMERA)) > 0) {
			wX += 7 * n_A_SHOES_DEF_PLUS * cardCount;
		}
	}



	//----------------------------------------------------------------
	// 「戦乙女の雫」の、「マグヌスエクソシズム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_MAGNUS_EXORCISMUS) {
		if ((itemCount = EquipNumSearch(ITEM_ID_IKUSAOTOMENO_SHIZUKU)) > 0) {
			wX += 3 * ROUNDDOWN(n_A_BaseLV / 2) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「精霊のローブ」の、「サイキックウェーブ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_PSYCHIC_WAVE) {
		if ((itemCount = EquipNumSearch(ITEM_ID_SEIREINO_ROBE)) > 0) {
			if (n_A_BODY_DEF_PLUS >= 9) {
				wX += 10 * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「精霊のマント」の、「サイキックウェーブ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_PSYCHIC_WAVE) {
		if ((itemCount = EquipNumSearch(ITEM_ID_SEIREINO_MANT)) > 0) {
			wX += 3 * n_A_SHOULDER_DEF_PLUS * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「古代龍の宝冠」の、「サイキックウェーブ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_PSYCHIC_WAVE) {
		if ((itemCount = EquipNumSearch(ITEM_ID_KODAIRYUNO_HOKAN)) > 0) {
			if (n_A_HEAD_DEF_PLUS >= 7) {
				wX += 10 * itemCount;
			}
			if (n_A_HEAD_DEF_PLUS >= 9) {
				wX += 10 * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「特選葉のお守り」の、「イヌハッカメテオ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_INUHAKKA_METEOR) {
		if ((itemCount = EquipNumSearch(ITEM_ID_TOKUSEN_HANO_OMAMORI)) > 0) {
			wX += 1 * ROUNDDOWN(n_A_BaseLV / 10) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「用心棒のスカーフ」の、「術式-解放-」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ZYUTSUSHIKI_KAIHO) {
		if ((itemCount = EquipNumSearch(ITEM_ID_YOZINBONO_SCARF)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_ZYUTSUSHIKI_KAIHO) >= 1) {
				wX += 40 * itemCount;
			}

			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				wX += 3 * ROUNDDOWN(n_A_BaseLV / 2) * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「サラの幻影カード」の、「ヘルインフェルノ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_HELL_INFERNO) {
		cardCountHeadTop = CardNumSearch(CARD_ID_SARANO_GENEI, CARD_REGION_ID_HEAD_TOP_ANY);
		if (cardCountHeadTop > 0) {
			wX += 10 * n_A_HEAD_DEF_PLUS * cardCountHeadTop;
		}
	}



	//----------------------------------------------------------------
	// 「不死の軍団認識票　ひまわり少年セット」の、「クリムゾンロック」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CRYMSON_ROCK) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FUSHINO_GUNDAN_NINSHIKIHYO_HIMAWARI_SHONEN)) > 0) {
			wX += 1 * n_A_Weapon_ATKplus * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「トラベラーシューズ」の、「メタリックサウンド」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_METALIC_SOUND) {
		if ((itemCount = EquipNumSearch(ITEM_ID_TRAVELER_SHOES)) > 0) {
			wX += 10 * LearnedSkillSearch(SKILL_ID_MELANCHOLY) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「スタッフオブパフィ」の、「ファイアーボルト」強化
	// 「スタッフオブパフィ」の、「コールドボルト」強化
	// 「スタッフオブパフィ」の、「ライトニングボルト」強化
	// 「スタッフオブパフィ」の、「アーススパイク」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FIRE_BOLT
		|| n_A_ActiveSkill == SKILL_ID_COLD_BOLT
		|| n_A_ActiveSkill == SKILL_ID_LIGHTNING_BOLT
		|| n_A_ActiveSkill == SKILL_ID_EARTH_SPIKE) {

		if ((itemCount = EquipNumSearch(ITEM_ID_STUFF_OF_PUFFY)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_SPELL_FIST) >= 5) {
				wX += 3 * n_A_Weapon_ATKplus * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「イリュージョン黙示録」の、「ヘルインフェルノ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_HELL_INFERNO) {
		if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_MOKUSHIROKU)) > 0) {
			if (n_A_BaseLV >= 170) {
				wX += 20 * n_A_Weapon_ATKplus * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「勇者のブローチ　勇者のジャッジメントローブセット」の、「アドラムス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ADORAMUS) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANO_BROACH_YUSHANO_JUDGEMENT_ROBE)) > 0) {
			wX += 5 * n_A_BODY_DEF_PLUS * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「勇者のブローチ　勇者のジャッジメントローブセット」の、「ジュデックス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_JUDEX) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANO_BROACH_YUSHANO_JUDGEMENT_ROBE)) > 0) {
			wX += 5 * n_A_BODY_DEF_PLUS * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「降霊術士のドレス　炎雷魔女の大杖セット」の、「エレクトリックウォーク」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_ELECTRIC_WALK) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KORE_ZYUTSUSHINO_DRESS_ENRAI_MAZYONO_OTSUE)) > 0) {
			wX += 30 * n_A_Weapon_ATKplus * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「降霊術士のドレス　炎雷魔女の大杖セット」の、「ファイアウォーク」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_FIRE_WALK) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KORE_ZYUTSUSHINO_DRESS_ENRAI_MAZYONO_OTSUE)) > 0) {
			wX += 30 * n_A_Weapon_ATKplus * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「エルヴィラブーツ」の、「ライトニングボルト」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_LIGHTNING_BOLT) {
		if ((itemCount = EquipNumSearch(ITEM_ID_ELVIRA_BOOTS)) > 0) {
			wX += 3 * n_A_SHOES_DEF_PLUS * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「虹色のマフラー」の、「メタリックサウンド」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_METALIC_SOUND) {
		if ((itemCount = EquipNumSearch(ITEM_ID_NIZIIRONO_MUFFLER)) > 0) {
			wX += 4 * LearnedSkillSearch(SKILL_ID_MELANCHOLY) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「虹色のねこじゃらし　ブラッディナイトカードセット」の、「ヘルインフェルノ」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_HELL_INFERNO) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_NIZIIRONO_NEKOZYARASHI_BLOODY_KNIGHT_CARD)) > 0) {
			wX += 10 * n_A_Weapon_ATKplus * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「虹色のねこじゃらし　ストームナイトカードセット」の、「ダイヤモンドダスト」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_DIAMOND_DUST) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_NIZIIRONO_NEKOZYARASHI_STORM_KNIGHT_CARD)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_NYAN_TAMASHI) >= 1) {
				wX += 10 * n_A_Weapon_ATKplus * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「イリュージョンタブレット」の、「ジュデックス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_JUDEX) {
		if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_TABLET)) > 0) {
			if (n_A_BaseLV >= 170) {
				wX += 10 * n_A_Weapon_ATKplus * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「ふわふわタンポポシューズ」の、「マタタビランス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_MATATABI_LANCE) {
		if ((itemCount = EquipNumSearch(ITEM_ID_FUWAFUWA_TANPOPO_SHOES)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_DAICHINO_TAMASHI) >= 1) {
				if (LearnedSkillSearch(SKILL_ID_INUHAKKA_METEOR) >= 5) {
					wX += 20 * itemCount;
				}
			}
		}
	}



	//----------------------------------------------------------------
	// 「ふわふわタンポポシューズ」の、「イヌハッカメテオ」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_INUHAKKA_METEOR) {
		if ((itemCount = EquipNumSearch(ITEM_ID_FUWAFUWA_TANPOPO_SHOES)) > 0) {
			wX += 15 * LearnedSkillSearch(SKILL_ID_MYAUMYAU) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「ゲフェニア氷の魔道具」の、「ストームガスト」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_STORM_GUST) {
		if ((itemCount = EquipNumSearch(ITEM_ID_GEFFENIA_KORINO_MADOGU)) > 0) {
			wX += 2 * ROUNDDOWN(n_A_BaseLV / 3) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「ゲフェニア氷の魔道具」の、「コメット」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_COMMET) {
		if ((itemCount = EquipNumSearch(ITEM_ID_GEFFENIA_KORINO_MADOGU)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_JACK_FROST) >= 5) {
				wX += 50 * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「ゲフェニア氷の魔道具」の、「フロストミスティ」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_FROST_MISTY) {
		if ((itemCount = EquipNumSearch(ITEM_ID_GEFFENIA_KORINO_MADOGU)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_STASIS) >= 5) {
				wX += 50 * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「ゲフェニア氷の魔道具」の、「ジャックフロスト」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_JACK_FROST) {
		if ((itemCount = EquipNumSearch(ITEM_ID_GEFFENIA_KORINO_MADOGU)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_STASIS) >= 5) {
				wX += 50 * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「ルティルススティック-OS」の、ベースレベルによる効果
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_HELL_INFERNO) {
		itemCountRight = EquipNumSearch(ITEM_ID_RUTIS_STICK_OS, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_RUTIS_STICK_OS, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			wX += 1 * n_A_BaseLV * itemCountRight;
			wX += 1 * n_A_BaseLV * itemCountLeft;
		}
	}



	//----------------------------------------------------------------
	// 「ウルティオ-OS」の、「デュプレライト（魔法）」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_MIRIAM_LIGHT) {
		itemCountRight = EquipNumSearch(ITEM_ID_ULTIO_OS, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_ULTIO_OS, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			wX += 7 * n_A_BaseLV * itemCountRight;
			wX += 7 * n_A_BaseLV * itemCountLeft;
		}
	}



	//----------------------------------------------------------------
	// 「MH-P89-OS」の、「振動残響」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SHINDOZANKYO) {
		itemCountRight = EquipNumSearch(ITEM_ID_MH_P89_OS, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_MH_P89_OS, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			wX += 1 * Math.floor(n_A_BaseLV / 2) * itemCountRight;
			wX += 1 * Math.floor(n_A_BaseLV / 2) * itemCountLeft;
		}
	}



	//----------------------------------------------------------------
	// 「サーキットボード-OS」の、「ファイアーボルト」強化
	// 「サーキットボード-OS」の、「コールドボルト」強化
	// 「サーキットボード-OS」の、「ライトニングボルト」強化
	// 「サーキットボード-OS」の、「アーススパイク」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FIRE_BOLT
		|| n_A_ActiveSkill == SKILL_ID_COLD_BOLT
		|| n_A_ActiveSkill == SKILL_ID_LIGHTNING_BOLT
		|| n_A_ActiveSkill == SKILL_ID_EARTH_SPIKE) {

		itemCountRight = EquipNumSearch(ITEM_ID_CIRCUIT_BOARD_OS, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_CIRCUIT_BOARD_OS, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			wX += 1 * n_A_BaseLV * itemCountRight;
			wX += 1 * n_A_BaseLV * itemCountLeft;
		}
	}



	//----------------------------------------------------------------
	// 「ディオ・アネモスカード」の、「サンダーストーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_THUNDER_STORM) {
		cardCount = CardNumSearch(CARD_ID_DIO_ANEMOS);
		if (cardCount > 0) {
			wX += 2 * Math.floor(n_A_BaseLV / 3) * cardCount;
		}
	}



	//----------------------------------------------------------------
	// 「半龍王女の指輪」の、「テトラボルテックス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_TETRA_BOLTEX) {
		if ((itemCount = EquipNumSearch(ITEM_ID_HANRYU_OZYONO_YUBIWA)) > 0) {
			wX += 1 * n_A_BaseLV * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「不死鳥のねこじゃらし　ミュータントドラゴンカードセット」の、「メテオストーム」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_METEOR_STORM) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FUSHICHONO_NEKOZYARASHI_MUTANT_DRAGON_CARD)) > 0) {
			wX += 10 * n_A_Weapon_ATKplus * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「不死鳥のねこじゃらし　ボイタタカードセット」の、「クリムゾンロック」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_CRYMSON_ROCK) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FUSHICHONO_NEKOZYARASHI_BOITATA_CARD)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_NYAN_TAMASHI) >= 1) {
				wX += 10 * n_A_Weapon_ATKplus * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「あざといケロケロカッパ」の、「イヌハッカメテオ」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_INUHAKKA_METEOR) {
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_AZATOI_KEROKERO_KAPPA)) > 0) {
			wX += 10 * LearnedSkillSearch(SKILL_ID_MYAUMYAU) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「きらきらニャンニャンチョーカー」の、「マタタビランス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_MATATABI_LANCE) {
		if ((itemCount = EquipNumSearch(ITEM_ID_KIRAKIRA_NYANNYAN_CHOKER)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_DAICHINO_TAMASHI) >= 1) {

				// アイテム効果なので、「習得スキル」欄で設定しても、「パッシブ持続系」で設定してもＯＫとする
				// （大きい方を採用）

				valueWork = 0;

				valueWork += LearnedSkillSearch(SKILL_ID_MATATABI_LANCE);
				valueWork += LearnedSkillSearch(SKILL_ID_MATATABINO_NEKKO);
				valueWork += LearnedSkillSearch(SKILL_ID_INUHAKKA_METEOR);
				valueWork += LearnedSkillSearch(SKILL_ID_INUHAKKA_SHOWER);
				valueWork += LearnedSkillSearch(SKILL_ID_CHATTERING);
				valueWork += LearnedSkillSearch(SKILL_ID_MYAUMYAU);
				valueWork += LearnedSkillSearch(SKILL_ID_NYAN_GRASS);

				valueWork = Math.max(valueWork, UsedSkillSearch(SKILL_ID_PLANT_KEI_SHUTOKU_LEVEL_GOKEI));

				wX += 1 * valueWork * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「インペリアルパニッシュメントローブ」の、「クリムゾンロック」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_CRYMSON_ROCK) {
		itemCount = EquipNumSearch(ITEM_ID_IMPERIAL_PUNISHMENT_ROBE);
		if (itemCount > 0) {
			if (LearnedSkillSearch(SKILL_ID_DRAIN_LIFE) >= 5) {
				wX += 1 * Math.floor(n_A_BaseLV / 6) * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「グレースパニッシュメントローブ」の、「クリムゾンロック」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_CRYMSON_ROCK) {
		itemCount = EquipNumSearch(ITEM_ID_GRACE_PUNISHMENT_ROBE);
		if (itemCount > 0) {
			if (LearnedSkillSearch(SKILL_ID_DRAIN_LIFE) >= 5) {
				wX += 1 * Math.floor(n_A_BaseLV / 2) * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「ぽかぽかタンポポケープ」の、スキル習得による効果
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_MATATABI_LANCE) {
		itemCount = EquipNumSearch(ITEM_ID_POKAPOKA_TANPOPO_CAPE);
		if (itemCount > 0) {
			if (LearnedSkillSearch(SKILL_ID_DAICHINO_TAMASHI) >= 1) {
				vartmp = 0;
				vartmp += LearnedSkillSearch(SKILL_ID_MATATABI_LANCE);
				vartmp += LearnedSkillSearch(SKILL_ID_MATATABINO_NEKKO);
				vartmp += LearnedSkillSearch(SKILL_ID_INUHAKKA_METEOR);
				vartmp += LearnedSkillSearch(SKILL_ID_INUHAKKA_SHOWER);
				vartmp += LearnedSkillSearch(SKILL_ID_CHATTERING);
				vartmp += LearnedSkillSearch(SKILL_ID_MYAUMYAU);
				vartmp += LearnedSkillSearch(SKILL_ID_NYAN_GRASS);

				wX += 1 * vartmp * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ぽかぽかタンポポケープ」の、スキル習得による効果
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_INUHAKKA_METEOR) {
		itemCount = EquipNumSearch(ITEM_ID_POKAPOKA_TANPOPO_CAPE);
		if (itemCount > 0) {
			wX += 10 * LearnedSkillSearch(SKILL_ID_NYAN_GRASS) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「ゾディアック　処女宮のダイアデム」セットの、職業による効果
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_JUDEX) {
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_SHOZYOKYUNO_DIADEM)) {
			if (IsSameJobClass(JOB_ID_ARCBISHOP)) {
				wX += 10 * n_A_HEAD_DEF_PLUS;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ゾディアック　処女宮のシューズ」セットの、職業による効果
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_JUDEX) {
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_SHOZYOKYUNO_SHOES)) {
			if (IsSameJobClass(JOB_ID_ARCBISHOP)) {
				wX += 10 * n_A_SHOES_DEF_PLUS;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ゾディアック　双魚宮のシューズ」セットの、職業による効果
	//----------------------------------------------------------------
	if (
		(n_A_ActiveSkill == SKILL_ID_FIRE_BOLT)
		|| (n_A_ActiveSkill == SKILL_ID_COLD_BOLT)
		|| (n_A_ActiveSkill == SKILL_ID_LIGHTNING_BOLT)
		|| (n_A_ActiveSkill == SKILL_ID_EARTH_SPIKE)
	) {
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_SOGYOKYUNO_SHOES)) {
			if (IsSameJobClass(JOB_ID_SORCERER)) {
				wX += 10 * n_A_SHOES_DEF_PLUS;
			}
		}
	}



	//----------------------------------------------------------------
	// 「虹色のねこじゃらし　封印されたストームナイトカードセット」の、「ダイヤモンドダスト」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_DIAMOND_DUST) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_NIZIIRONO_NEKOZYARASHI_FUINSARETA_STORM_KNIGHT)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_NYAN_TAMASHI) >= 1) {
				wX += 3 * n_A_Weapon_ATKplus * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「不死鳥のねこじゃらし　封印されたボイタタカードセット」の、「クリムゾンロック」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_CRYMSON_ROCK) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FUSHICHONO_NEKOZYARASHI_FUINSARETA_BOITATA)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_NYAN_TAMASHI) >= 1) {
				wX += 3 * n_A_Weapon_ATKplus * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「ディア・デ・ムエルトス」の、「エスパ」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_ESPA) {
		if ((itemCount = EquipNumSearch(ITEM_ID_DIA_DE_MUERTOS)) > 0) {
			wX += 5 * LearnedSkillSearch(SKILL_ID_TAMASHINO_SHUKAKU) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ディア・デ・ムエルトス」の、「エスフ」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_ESFU) {
		if ((itemCount = EquipNumSearch(ITEM_ID_DIA_DE_MUERTOS)) > 0) {
			wX += 25 * LearnedSkillSearch(SKILL_ID_TAMASHINO_SHUKAKU) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「ゾディアック　特選ドラムケープセット」の、「プラント系スキル」強化
	//----------------------------------------------------------------
	if ( (n_A_ActiveSkill == SKILL_ID_MATATABI_LANCE)
		|| (n_A_ActiveSkill == SKILL_ID_INUHAKKA_METEOR)
	) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_ENCHANT_ZODIAC_TOKUSEN_DORAM_CAPE)) > 0) {
			if (IsSameJobClass(JOB_ID_SUMMONER)) {
				wX += 5 * n_A_SHOULDER_DEF_PLUS * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「マジックコンプレッション」の、「ファイアーボルト」強化
	//----------------------------------------------------------------
	if ((n_A_ActiveSkill == SKILL_ID_FIRE_BOLT)
		|| (n_A_ActiveSkill == SKILL_ID_COLD_BOLT)
		|| (n_A_ActiveSkill == SKILL_ID_LIGHTNING_BOLT)
		|| (n_A_ActiveSkill == SKILL_ID_EARTH_SPIKE)) {
		if ((itemCount = EquipNumSearch(ITEM_ID_MAGIC_COMPRESSION)) > 0) {
			wX += 20 * LearnedSkillSearch(SKILL_ID_STRIKING) * itemCount;
		}
	}



	//★★★★★★★★★★★★★★★★★★★
	//★★★★ roro 側にも反映のこと ★★★★
	//★★★★★★★★★★★★★★★★★★★





	//----------------------------------------------------------------
	// 「ミスティックシンフォニー」の、「サウンドブレンド」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_SOUND_BLEND) {
		if (UsedSkillSearch(SKILL_ID_MYSTIC_SYMPHONY) > 0) {
			wX += 50;
		}
	}



	//----------------------------------------------------------------
	// 「性能カスタマイズ欄」の、「○○スキルで攻撃時ダメージ上昇」強化
	//----------------------------------------------------------------
	confBaseLvBy = g_objCharaConfCustomSkill.GetConf(CCharaConfCustomSkill.CONF_ID_SKILL_DAMAGE_UP_BASE_LEVEL_BY);
	confval = g_objCharaConfCustomSkill.GetConf(CCharaConfCustomSkill.CONF_ID_SKILL_DAMAGE_UP);
	if (n_A_ActiveSkill != 0) {
		if (confval != 0) {
			if (confBaseLvBy > 0) {
				wX += confval * Math.floor(n_A_BaseLV / confBaseLvBy);
			}
			else {
				wX += confval;
			}
		}
	}



	//----------------------------------------------------------------
	// 戦闘計算情報に保持されているダメージ増幅の適用
	//----------------------------------------------------------------
	wX += battleCalcInfo.dmgAmpRate;





	// TODO: データ移行過渡処理
	// 計算したSP効果を、移行前のデータ形式に変換して、加算する
	if (IsEnableMigrationBlockTransit()) {

		var spTag = null;

		// 移行時のデータ整合性のためだけの判定、本来は不要で中の処理だけ行えばよい
		if ((g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_MAGICAL) == CSkillData.TYPE_MAGICAL) {

			spTag = new CMigEquipableSpTag()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL, g_skillManager.GetBaseSkillId(n_A_ActiveSkill))
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT);

			wX += g_charaDataManager.GetCharaData(MIG_CHARA_MANAGER_ID_MAIN).GetSpValue(spTag, null, MIG_EFFECTIVE_SP_CALC_MODE_SUM);
			wX += g_charaDataManager.GetCharaData(MIG_CHARA_MANAGER_ID_MAIN).GetSetSpValue(spTag, null, MIG_EFFECTIVE_SP_CALC_MODE_SUM);
		}
	}


//********************************************************************************************************************************
//********************************************************************************************************************************
//****
//**** ★★★★　装備セット等の“魔法”スキル倍率補正　ここまで　★★★★
//****
//********************************************************************************************************************************
//********************************************************************************************************************************

	return wX;
}





/**
 * 魔法判定攻撃に対するスキル倍率の増減を適用する.
 * @param wBMC ダメージ
 * @return 適用後のダメージ
 */
function ApplyMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray, wBMC) {

	var w_MDEF = mobData[14];
	var w_MDEF2 = n_B_MDEF2;
	var wBMC2 = Math.floor(wBMC);
	var wX = 0;



	// 属性場のダメージ追加倍率を適用
	wX = GetElementFieldDamageRatio();
	wBMC2 = ROUNDDOWN(wBMC2 * (100 + wX) / 100);





	// 特性ステータス対応
	// MRES減衰の適用
	wBMC2 = ApplyMresResist(mobData, wBMC2);





	// モンスターのＭＤＥＦを適用
	if(n_MagicCalcType == 1) {
		wBMC2 = Math.floor(wBMC2 - B_Total_MDEF);
	}
	else{
		var w = w_MDEF * 4;
		wBMC2 = Math.floor(wBMC2 * (4000 + w) / (4000 + w * 10) - w_MDEF2);
	}
	if(wBMC2 < 1) wBMC2 = 1;



	// マグヌスエクソシズム、かつ、対象外モンスターの場合、ダメージを０に固定
	if(n_A_ActiveSkill == 104){
		if(mobData[19] != 6 && mobData[18] <90){
			wBMC2=0;
		}
	}

	// ルアフ、かつ、敵がハイド中でない場合、ダメージを０に固定
	else if(n_A_ActiveSkill==34){
		if(attackMethodConfArray[0].GetOptionValue(0) == 0) wBMC2=0;
	}

	// ソウルストライク、かつ、不死属性の場合、ダメージ増加を適用
	if(90 <= mobData[18] && n_A_ActiveSkill == 47) {
		wBMC2 = Math.floor(wBMC2 * (1 + 0.05 * n_A_ActiveSkillLV));
	}



	// 特定のスキルを除いて、レックスエーテルナ効果を適用
	switch (n_A_ActiveSkill) {
	case 583:	// レイオブジェネシス
	case 639:	// 振動残響
		// 上記スキルは、レックスエーテルナ対象外
		break;

	default:
		wBMC2 = ApplyLexAeterna(mobData, wBMC2);
		break;
	}

	// 対プレイヤーエナジーコート耐性を適用
	wBMC2 = ApplyRegistPVPEnergyCoat(mobData, wBMC2);



	// 魔法ダメージ倍率強化を取得
	wX = GetMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData);



	wBMC2 = ROUNDDOWN(wBMC2 * (100 + wX) / 100);



	// 冷凍状態での、風属性魔法ダメージ増加の適用
	if(n_B_IJYOU[35] == 1){
		if(n_A_Weapon_zokusei == 4) wBMC2 = Math.floor(wBMC2 * 1.5);
	}

	// テレキネシスインテンス状態での、特定スキルのダメージ増加の適用
	if(UsedSkillSearch(SKILL_ID_TELECHINESIS_INSTENCE)) {
		switch (n_A_ActiveSkill) {
		case 46:	// ナパームビート
		case 47:	// ソウルストライク
		case 277:	// ナパームバルカン
		case 518:	// ソウルエクスパンション
			wBMC2 = ROUNDDOWN(wBMC2 * (100 + 40 * UsedSkillSearch(SKILL_ID_TELECHINESIS_INSTENCE)) / 100);
			break;
		}
	}

	// ホワイトインプリズン状態での、ソウルエクスパンションのダメージ増加の適用
	if(n_A_ActiveSkill == 518){
		var subnumvalue = attackMethodConfArray[0].GetOptionValue(0);
		if(mobData[20] == 0 && subnumvalue >= 1) wBMC2 = ROUNDDOWN(wBMC2 * 2);
	}



	// 属性倍率を適用
	wBMC2 = ApplyElementRatio(mobData, wBMC2,n_A_Weapon_zokusei);
	wBMC2 = Math.floor(wBMC2);



	// TODO : 謎補正　スペルフィスト？
	if(n_Enekyori == 0){
		if(n_A_ActiveSkill == 51 || n_A_ActiveSkill == 54 || n_A_ActiveSkill == 56) {
			if (n_A_ActiveSkillLV <= 5) {
				wBMC2 = wBMC2 * (attackMethodConfArray[0].GetOptionValue(1) + n_A_ActiveSkillLV);
			}
			else {
				wBMC2 = wBMC2 * (attackMethodConfArray[0].GetOptionValue(1) + (n_A_ActiveSkillLV * 3 - 10));
			}
		}
	}



	// ストーンスキンによる、魔法ダメージ増加効果の適用
	if(n_B_KYOUKA[7] && n_Enekyori == 2) {
		wBMC2 += Math.floor(wBMC2 * (20 * n_B_KYOUKA[7]) / 100);
	}

	// ダメージカット効果の適用
	wBMC2 = ApplyAttackDamageAmplify(mobData, wBMC2);



	// ロードオブヴァーミリオンの多段ＨＩＴ補正（ＭＤＥＦ１０分の１適用？）
	/*
	if(n_A_ActiveSkill == 127) {
		wBMC2 = Math.floor(wBMC2 / 10);
	}
	*/

	return (wBMC2 >= 0) ? wBMC2 : 0;
 }

/**
 * 魔法判定攻撃に対するスキル倍率の増減を適用する（サブ）（アルカナカード系）
 * @param カードID
 * @return 倍率
 */
function ApplyMagicalSkillDamageRatioChangeSubArcanaCard(cardid) {
	var vartmp = 0;

	cardCountArmsRight	 = CardNumSearch(cardid, CARD_REGION_ID_ARMS_RIGHT_ANY);
	cardCountArmsLeft	 = CardNumSearch(cardid, CARD_REGION_ID_ARMS_LEFT_ANY);
	cardCountHeadTop	 = CardNumSearch(cardid, CARD_REGION_ID_HEAD_TOP_ANY);
	cardCountHeadMid	 = CardNumSearch(cardid, CARD_REGION_ID_HEAD_MID_ANY);
	cardCountShield		 = CardNumSearch(cardid, CARD_REGION_ID_SHIELD_ANY);
	cardCountBody		 = CardNumSearch(cardid, CARD_REGION_ID_BODY_ANY);
	cardCountShoulder	 = CardNumSearch(cardid, CARD_REGION_ID_SHOULDER_ANY);
	cardCountShoes		 = CardNumSearch(cardid, CARD_REGION_ID_SHOES_ANY);
	cardCountAccessary1	 = CardNumSearch(cardid, CARD_REGION_ID_ACCESSARY_1_ANY);
	cardCountAccessary2	 = CardNumSearch(cardid, CARD_REGION_ID_ACCESSARY_2_ANY);

	vartmp += 1 * n_A_Weapon_ATKplus * cardCountArmsRight;
	vartmp += 1 * n_A_Weapon2_ATKplus * cardCountArmsLeft;
	vartmp += 1 * n_A_HEAD_DEF_PLUS * cardCountHeadTop;
	vartmp += 1 * n_A_SHIELD_DEF_PLUS * cardCountShield;
	vartmp += 1 * n_A_BODY_DEF_PLUS * cardCountBody;
	vartmp += 1 * n_A_SHOULDER_DEF_PLUS * cardCountShoulder;
	vartmp += 1 * n_A_SHOES_DEF_PLUS * cardCountShoes;

	if (n_A_Weapon_ATKplus >= 10)		vartmp += 5 * cardCountArmsRight;
	if (n_A_Weapon2_ATKplus >= 10)		vartmp += 5 * cardCountArmsLeft;
	if (n_A_HEAD_DEF_PLUS >= 10)		vartmp += 5 * cardCountHeadTop;
	if (n_A_SHIELD_DEF_PLUS >= 10)		vartmp += 5 * cardCountShield;
	if (n_A_BODY_DEF_PLUS >= 10)		vartmp += 5 * cardCountBody;
	if (n_A_SHOULDER_DEF_PLUS >= 10)	vartmp += 5 * cardCountShoulder;
	if (n_A_SHOES_DEF_PLUS >= 10)		vartmp += 5 * cardCountShoes;

	return vartmp;
}








/**
 * スキルダメージ倍率強化表示欄の再構築.
 */
function RebuildActiveSkillRatioInfo(battleCalcInfo, charaData, specData, mobData) {

	var ratioPhysical = 0;
	var ratioMagical = 0;

	if (!battleCalcInfo) {
		battleCalcInfo = new CBattleCalcInfo();
		battleCalcInfo.skillId = n_A_ActiveSkill;
		battleCalcInfo.skillLv = n_A_ActiveSkillLV;
	}

	let ratio = 0;
	try{
		if((g_skillManager.GetSkillType(battleCalcInfo.skillId) & CSkillData.TYPE_PHYSICAL) == CSkillData.TYPE_PHYSICAL) {
			// 物理スキル
			ratio = GetPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData);
		} else {
			// 魔法スキル
			ratio = GetMagicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData);
		}
	}catch(e){
		console.log(e);
	}
	let html = ""
	if (ratio != 0){
		html = `スキル強化：<span class="CSSCLS_SKILL_RATIO_${ratio>0?"PLUS":"MINUS"}">${ratio}%</span>`;
	}
	$("#OBJID_SPAN_ACTIVE_SKILL_RATIO_CHANGE_PHYSICAL").html(html);
}






/**
 * 物理攻撃・物理スキルに対するサイズ倍率補正値表示欄の再構築.
 */
function RebuildSizeModifyRatioInfo(battleCalcInfo, charaData, specData, mobData, wRatio) {
	if (!battleCalcInfo) {
		battleCalcInfo = new CBattleCalcInfo();
		battleCalcInfo.skillId = n_A_ActiveSkill;
		battleCalcInfo.skillLv = n_A_ActiveSkillLV;
	}
	let bFlag = ((g_skillManager.GetSkillType(battleCalcInfo.skillId) & CSkillData.TYPE_PHYSICAL) == CSkillData.TYPE_PHYSICAL);
	let html = "";
	if(bFlag) {
		let wWeaponRatio = weaponsize[n_A_WeaponType][mobData[17]];

		html = `　サイズ補正： <span class="CSSCLS_SIZE_MODIFY_${wRatio>=1?"PLUS":"MINUS"}">${wRatio*100}%</span> (武器倍率<span class="CSSCLS_SIZE_MODIFY_${wWeaponRatio>=1?"PLUS":"MINUS"}">${wWeaponRatio*100}%</span>)`;
	}
	$("#OBJID_SPAN_SIZE_MODIFY").html(html);
}






 n_SieldSp = ["off","on",20,35,40,50,60,75,80,85,90,95,98,105,110,120,130,150,100,140,170];
 n_SieldSpNum = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12, 18, 13, 14, 15, 16, 19, 17, 20];
 n_SieldSpDum = ["off","on",20,35,40,50,60,75,80,85,90,95,98,100,105,110,120,130,140,150,170];




/**
 * パッシブ持続系 チェックボックス生成
 */
function Click_PassSkillSW(){

	var idx = 0;

	var passiveSkillIdArray = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB).GetPassiveSkillIdArray();



	with(document.calcForm){
		n_Skill1SW = A1_SKILLSW.checked;
		if(n_Skill1SW){
			var end = passiveSkillIdArray.length -1;
			var str;
			str = '<TABLE Border>';
			str += '<TR><TD ColSpan="4" id="A1TD" Bgcolor="#DDDDFF" class="title">';
			str += '<input id="OBJID_CHECK_A1_SKILL_SW" type="checkbox" name="A1_SKILLSW"onClick="Click_PassSkillSW()">';
			str += `<label for="OBJID_CHECK_A1_SKILL_SW">${GetJobName(n_A_JOB)}固有自己支援・パッシブ持続系</label>`;
			str += '<span id="A1used"></span>';
			str += '</TD></TR>';
			for(var i=0;i<=end;i+=2) str += '<TR><TD id="P_Skill'+ i +'"></TD><TD id="P_Skill'+ i +'s"></TD><TD id="P_Skill'+ (i+1) +'"></TD><TD id="P_Skill'+ (i+1) +'s"></TD></TR>';
			str += '</TABLE>';
			myInnerHtml("ID_PASS_SKILL",str,0);
			A1_SKILLSW.checked = 1;

			for(var i=0;i<=end;i++){
				if (passiveSkillIdArray[i] == SKILL_ID_SHUCHURYOKU_KOZYO) {
					myInnerHtml("P_Skill"+i, SkillObjNew[passiveSkillIdArray[i]][SKILL_DATA_INDEX_NAME] + "　<a href=\"../kousin/note20210606.html\" target=\"_blank\">(★注意情報★)</a>", 0);
				}
				else {
					myInnerHtml("P_Skill"+i,SkillObjNew[passiveSkillIdArray[i]][SKILL_DATA_INDEX_NAME],0);
				}
				myInnerHtml("P_Skill"+i+"s","<select name=A_skill"+i+" id=A_skill"+i+" onChange=Click_A1(1)></select>",0);
			}
			for(var j=0;j<=end;j++){
				var w = passiveSkillIdArray[j];
				var w2 = [12,68,74,152,153,155,196,253,258,301,309,310,322,345,364,365,383,379,385,386,389,390,392,420,421,422,450,453,522,750,752];
				var wOBJ = document.getElementById("A_skill"+j);
				if(NumSearch(w,w2)){
					wOBJ.options[0] = new Option("off",0);
					wOBJ.options[1] = new Option("on",1);
				}
				else{
					for(var i=10;i>=0;i--) wOBJ.options[i] = null;
					for(var i=0;i<=SkillObjNew[passiveSkillIdArray[j]][SKILL_DATA_INDEX_MAXLV];i++) wOBJ.options[i] = new Option(i,i);
				}

				// スパノビの魂専用処理
				if (w == SKILL_ID_SUPER_NOVICENO_TAMASHI) {
					wOBJ.setAttribute("onClick", "RefreshSuperNoviceFullWeapon(parseInt(this.value) == 1)");
				}
			}
			var w = NumSearch2(58,passiveSkillIdArray);
			if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				var w_ECname=["off","6%","12%","18%","24%","30%"];
				for(i=1;i<=5;i++) w_ECname[i] += "カット";
				for(i=0;i<=5;i++) wOBJ.options[i] = new Option(w_ECname[i],i);
			}
			var w = NumSearch2(78,passiveSkillIdArray);
			if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				var w_name = new Array();
				w_name[0] = "ペコなし";
				for(i=1;i<=6;i++) w_name[i] = "修練" + (i-1);
				for(i=0;i<=6;i++) wOBJ.options[i] = new Option(w_name[i],i);
			}
			var w = NumSearch2(446,passiveSkillIdArray);
			if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				var w_name = new Array();
				w_name[0] = "未騎乗";
				for(i=1;i<=6;i++) w_name[i] = "Lv" + (i-1);
				for(i=0;i<=6;i++) wOBJ.options[i] = new Option(w_name[i],i);
			}
			var w = NumSearch2(SKILL_ID_FIGHTING_SPIRIT,passiveSkillIdArray);
			if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("off",0);
				wOBJ.options[1] = new Option("on(ソロ)",1);
				for(i=2;i<=12;i++) wOBJ.options[i] = new Option(i +"人PT",i);
			}
			var w = NumSearch2(SKILL_ID_DRAGONIC_AURA_STATE,passiveSkillIdArray);
			if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("未習得",0);
				wOBJ.options[1] = new Option("未使用",1);
				for(i=1;i<=10;i++) wOBJ.options[i+1] = new Option("Lv"+i, i+1);
			}
			var w = NumSearch2(367,passiveSkillIdArray);
			if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				var w_name=[0,1,2,3,4,5,6,8,10];
				for(i=0;i<=8;i++) wOBJ.options[i] = new Option((w_name[i] * 10) + "%",w_name[i]);
			}
			var w = NumSearch2(185,passiveSkillIdArray);
			if(w != -1){
				if ((n_A_JOB != JOB_ID_MONK) && (n_A_JOB != JOB_ID_CHAMPION)) {
					var wOBJ = document.getElementById("A_skill" + w);
					for(i=10;i>=0;i--) wOBJ.options[i] = null;
					for(i=0;i<=15;i++) wOBJ.options[i] = new Option(i,i);
				}
			}
			var w = NumSearch2(496,passiveSkillIdArray);
			if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("off",0);
				for(i=1;i<=10;i++) wOBJ.options[i] = new Option(i+"秒",i);
			}
			var w = NumSearch2(739,passiveSkillIdArray);
			if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("未搭乗",0);
				wOBJ.options[1] = new Option("搭乗中",1);
			}
			var w = NumSearch2(743,passiveSkillIdArray);
			if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("-",0);
				wOBJ.options[1] = new Option("FB3",1);
				wOBJ.options[2] = new Option("CB3",2);
				wOBJ.options[3] = new Option("LB3",3);
			}
			var w = NumSearch2(SKILL_ID_ABR_DUAL_CANNON,passiveSkillIdArray);
			if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("未召喚",0);
				wOBJ.options[1] = new Option("召喚中",1);
			}

			// シールドスペル(ATK+)
			var w = NumSearch2(744,passiveSkillIdArray);
			if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("off",0);
				wOBJ.options[1] = new Option("装備盾",1);
				for(i=2;i<n_SieldSp.length;i++) wOBJ.options[i] = new Option("(+"+ n_SieldSpDum[i] +")",n_SieldSpNum[i]);
			}

			// シールドスペル(反射)
			var w = NumSearch2(756,passiveSkillIdArray);
			if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("off",0);
				wOBJ.options[1] = new Option("装備盾",1);
				for(i=2;i<n_SieldSp.length;i++) wOBJ.options[i] = new Option("("+ n_SieldSpDum[i] +")",n_SieldSpNum[i]);
			}

			// シールドスペル(DEF+)
			var w = NumSearch2(745,passiveSkillIdArray);
			if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("off",0);
				wOBJ.options[1] = new Option("装備盾",1);
				for(i=2;i<=11;i++) wOBJ.options[i] = new Option("(+"+ (i-1) +")",i);
			}
			var w = NumSearch2(747,passiveSkillIdArray);
			if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				var wASSname = ["-","FB","FBL","FW","CB","FD","LB","TS","NB","SS","△MS","JT","△LoV","WB","FN","×SG","ES","HD","×TU","×ME", "CrL", "SoE", "HI"];
				wOBJ.options[0] = new Option("-",0);
				for(i=0;i<wASSname.length;i++) wOBJ.options[i] = new Option(wASSname[i],i);
			}
			var w = NumSearch2(749,passiveSkillIdArray);
			if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("off",0);
				for(i=1;i<=10;i++) wOBJ.options[i] = new Option("on(Lv"+ i +")",i);
			}

			// EDP毒部分消す　説明リンク
			var w = passiveSkillIdArray.indexOf(SKILL_ID_CANCEL_EDP_POISON_ATTACK);
			if (w >= 0) {
				var wOBJ = document.getElementById("P_Skill" + w);

				var objAnchor = HtmlCreateElement("a", wOBJ);
				objAnchor.setAttribute("href", "../form/20110622edp.html");
				objAnchor.setAttribute("target", "_blank");
				objAnchor.style.display = "inline-block";
				objAnchor.style.marginLeft = "1em";
				HtmlCreateTextNode("[説明]", objAnchor)
			}

			var w = NumSearch2(754,passiveSkillIdArray);
			if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("ソロ",0);
				for(i=1;i<=11;i++) wOBJ.options[i] = new Option((i+1)+"人",i);
			}
			var w = NumSearch2(761,passiveSkillIdArray);
			if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option(0,0);
				for(i=1;i<=5;i++) wOBJ.options[i] = new Option("+"+(20 * i),i);
			}
			var w = NumSearch2(791,passiveSkillIdArray);
			if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("off",0);
				wOBJ.options[2] = new Option("水符",1);
				wOBJ.options[4] = new Option("土符",2);
				wOBJ.options[1] = new Option("火符",3);
				wOBJ.options[3] = new Option("風符",4);
			}
			var w = NumSearch2(793,passiveSkillIdArray);
			if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("偶偶",0);
				wOBJ.options[1] = new Option("偶奇",1);
				wOBJ.options[2] = new Option("奇偶",2);
				wOBJ.options[3] = new Option("奇奇",3);
			}


			//----------------------------------------------------------------
			// エレメンタルマスター系列　召喚中の精霊
			//----------------------------------------------------------------
			var sklIdx = NumSearch2(SKILL_ID_SERE, passiveSkillIdArray);
			if(sklIdx != -1){

				// 一度、選択肢を全削除
				var objSelect = document.getElementById("A_skill" + sklIdx);
				HtmlRemoveOptionAll(objSelect);

				var w_name = [
					"off",					// 0
					"火Lv1","火Lv2","火Lv3",	// 1 - 3 
					"水Lv1","水Lv2","水Lv3",	// 4 - 6
					"風Lv1","風Lv2","風Lv3",	// 7 - 9
					"地Lv1","地Lv2","地Lv3",	// 10 - 12
				];

				if (passiveSkillIdArray.indexOf(SKILL_ID_ELEMENTAL_SPIRIT_MASTERY) >= 0) {
					w_name = w_name.concat([
						"火四次", "水四次", "風四次", "地四次", "毒四次",	// 13 - 17
					]);
				}

				for (idx = 0; idx < w_name.length; idx++) {
					HtmlCreateElementOption(idx, w_name[idx], objSelect);
				}
			}

			// -------------------------------------------------------
			// エレメンタルマスター系列　精霊のモード
			// -------------------------------------------------------
			var w = NumSearch2(SKILL_ID_SERE_MODE, passiveSkillIdArray);
			if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10;i>=0;i--) wOBJ.options[i] = null;
				var w_name = ["off","passive","defensive","ofensive"];
				for(i=0;i<=3;i++) wOBJ.options[i] = new Option(w_name[i],i);
			}

			// -------------------------------------------------------
			// エレメンタルマスター系列　精霊のスキル
			// -------------------------------------------------------
			var w = NumSearch2(SKILL_ID_SERE_SUPPORT_SKILL, passiveSkillIdArray);
			if(w != -1){
				// i に設定可能な最大値は 64 (=6bit)
				// 旧バージョンのセーブ処理に含まれており拡張が容易ではない
				// 拡張するぐらいなら別項目で作り直す方が良いと思います
				var wOBJ = document.getElementById("A_skill" + w);
				for(let i=10 ;i>=0; i--) wOBJ.options[i] = null;
				// --- w_name ---
				//      Passive, Defence, Attack →
				// Lv1
				// Lv2
				// Lv3
				// ↓
				var w_name = [
					"off",
					"(火1P)ﾊﾟｲﾛﾃｸﾆｯｸ",0,0,
					"(火2P)ﾋｰﾀｰ","(火2D)ﾌｧｲｱｰｸﾛｰｸ",0,
					0,0,0,
					"(水1P)ｱｸｱﾌﾟﾚｲ",0,0,
					"(水2P)ｸｰﾗｰ","(水2D)ｳｫｰﾀｰﾄﾞﾛｯﾌﾟ",0,
					0,"(水3D)ｳｫｰﾀｰﾊﾞﾘｱ",0,
					"(風1P)ｶﾞｽﾄ","(風1D)ｳｨﾝﾄﾞｽﾃｯﾌﾟ",0,
					"(風2P)ﾌﾞﾗｽﾄ","(風2D)ｳｨﾝﾄﾞｶｰﾃﾝ",0,
					0,"(風3D)ｾﾞﾌｧｰ",0,
					"(地1P)ﾍﾟﾄﾛﾛｼﾞｰ","(地1D)ｿﾘｯﾄﾞｽｷﾝ",0,
					"(地2P)ｶｰｽﾞﾄﾞｿｲﾙ","(地2D)ｽﾄｰﾝｼｰﾙﾄﾞ",0,
					0,"(地3D)ﾊﾟﾜｰｵﾌﾞｶﾞｲｱ",0,
					"(火4P)ﾌﾚｲﾑﾃｸﾆｯｸ", "(火4D)ﾌﾚｲﾑｱｰﾏｰ", 0,
					"(水4P)ｺｰﾙﾄﾞﾌｫｰｽ", "(水4D)ｸﾘｽﾀﾙｱｰﾏｰ", 0,
					"(風4P)ｸﾞﾚｲｽﾌﾞﾘｰｽﾞ", "(風4D)ｱｲｽﾞｵﾌﾞｽﾄｰﾑ", 0,
					"(地4P)ｱｰｽｹｱ", "(地4D)ｽﾄﾛﾝｸﾞﾌﾟﾛﾃｸｼｮﾝ", 0,
					"(毒4P)ﾃﾞｨｰﾌﾟﾎﾟｲｽﾞﾆﾝｸﾞ", "(毒4D)ﾎﾟｲｽﾞﾝｼｰﾙﾄﾞ", 0,
				];
				var sere_skill_index=0;
				for(let i=0; i<=51; i++){
					if(w_name[i] != 0){
						wOBJ.options[sere_skill_index] = new Option(w_name[i],i);
						sere_skill_index++;
					}
				}
			}

			var w = NumSearch2(SKILL_ID_HOMLV_FOR_PYROCLASTIC, passiveSkillIdArray);
			if(w != -1){
				var wOBJ = document.getElementById("A_skill" + w);
				for(i=10; i>=0; i--) wOBJ.options[i] = null;
				wOBJ.options[0] = new Option("-",0);
				for(i=1; i<=29; i++) wOBJ.options[i] = new Option(i+121, i);
			}

			//----------------------------------------------------------------
			// 修羅：閃光連撃終了直後状態
			//----------------------------------------------------------------
			var sklIdx = NumSearch2(SKILL_ID_ATK_PLUS_AFTER_SENKO_RENGEKI, passiveSkillIdArray);
			if (sklIdx != -1) {
				// 一度、選択肢を全削除
				var objSelect = document.getElementById("A_skill" + sklIdx);
				HtmlRemoveOptionAll(objSelect);

				// 選択肢を追加
				HtmlCreateElementOption(0, "なし", objSelect);
				HtmlCreateElementOption(1, "Lv1", objSelect);
				HtmlCreateElementOption(2, "Lv2", objSelect);
				HtmlCreateElementOption(3, "Lv3", objSelect);
				HtmlCreateElementOption(4, "Lv4", objSelect);
				HtmlCreateElementOption(5, "Lv5", objSelect);
			}

			//----------------------------------------------------------------
			// リベリオン：クイックドロー全追撃
			//----------------------------------------------------------------
			var sklIdx = NumSearch2(SKILL_ID_AS_QUICKDRAW, passiveSkillIdArray);
			if (sklIdx != -1) {
				// 一度、選択肢を全削除
				var objSelect = document.getElementById("A_skill" + sklIdx);
				HtmlRemoveOptionAll(objSelect);

				// 選択肢を追加
				HtmlCreateElementOption(0, "off", objSelect);
				HtmlCreateElementOption(1, "on", objSelect);
			}

			//----------------------------------------------------------------
			// サモナー：大地の魂効果(ﾏﾀﾀﾋﾞの根っこ使用後のMATK＋)
			//----------------------------------------------------------------
			var sklIdx = NumSearch2(SKILL_ID_DAICHINO_TAMASHI_KOKA_MATATABINO_NEKKO, passiveSkillIdArray);
			if (sklIdx != -1) {
				// 一度、選択肢を全削除
				var objSelect = document.getElementById("A_skill" + sklIdx);
				HtmlRemoveOptionAll(objSelect);

				// 選択肢を追加
				HtmlCreateElementOption(0, "off", objSelect);
				HtmlCreateElementOption(1, "on", objSelect);
			}

			//----------------------------------------------------------------
			// サモナー：大地の魂効果(ｲﾇﾊｯｶｼｬﾜｰ使用後の完全回避＋)
			//----------------------------------------------------------------
			var sklIdx = NumSearch2(SKILL_ID_DAICHINO_TAMASHI_KOKA_INUHAKKA_SHOWER, passiveSkillIdArray);
			if (sklIdx != -1) {
				// 一度、選択肢を全削除
				var objSelect = document.getElementById("A_skill" + sklIdx);
				HtmlRemoveOptionAll(objSelect);

				// 選択肢を追加
				HtmlCreateElementOption(0, "off", objSelect);
				HtmlCreateElementOption(1, "on", objSelect);
			}

			//----------------------------------------------------------------
			// サモナー：大地の魂効果(ニャングラス使用後のMATK＋)
			//----------------------------------------------------------------
			var sklIdx = NumSearch2(SKILL_ID_DAICHINO_TAMASHI_KOKA_NYAN_GRASS, passiveSkillIdArray);
			if (sklIdx != -1) {
				// 一度、選択肢を全削除
				var objSelect = document.getElementById("A_skill" + sklIdx);
				HtmlRemoveOptionAll(objSelect);

				// 選択肢を追加
				HtmlCreateElementOption(0, "off", objSelect);
				HtmlCreateElementOption(1, "on", objSelect);
			}

			//----------------------------------------------------------------
			// サモナー：生命の魂効果(残りHP)
			//----------------------------------------------------------------
			var sklIdx = NumSearch2(SKILL_ID_SEIMEINO_TAMASHI_KOKA_NOKORI_HP, passiveSkillIdArray);
			if (sklIdx != -1) {
				// 一度、選択肢を全削除
				var objSelect = document.getElementById("A_skill" + sklIdx);
				HtmlRemoveOptionAll(objSelect);

				// 選択肢を追加
				HtmlCreateElementOption(SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_100, "100%", objSelect);
				HtmlCreateElementOption(SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_81, "81%～99%", objSelect);
				HtmlCreateElementOption(SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_51, "51%～80%", objSelect);
				HtmlCreateElementOption(SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_10, "10%～50%", objSelect);
				HtmlCreateElementOption(SKILL_LEVEL_VALUE_SEIMEINO_TAMASHI_KOKA_NOKORI_HP_OVER_0, "0%～9%", objSelect);

			}

			//----------------------------------------------------------------
			// 星帝：流星落下の計算方法
			//----------------------------------------------------------------
			var sklIdx = NumSearch2(SKILL_ID_RYUSE_RAKKA_MODE, passiveSkillIdArray);
			if (sklIdx != -1) {
				// 一度、選択肢を全削除
				var objSelect = document.getElementById("A_skill" + sklIdx);
				HtmlRemoveOptionAll(objSelect);

				// 選択肢を追加
				HtmlCreateElementOption(0, "対象＋追撃", objSelect);
				HtmlCreateElementOption(1, "対象のみ", objSelect);
				HtmlCreateElementOption(2, "追撃のみ", objSelect);
			}

			//----------------------------------------------------------------
			// 天帝：運行の状態
			//----------------------------------------------------------------
			var sklIdx = NumSearch2(SKILL_ID_UNKONO_ZYOTAI, passiveSkillIdArray);
			if (sklIdx != -1) {
				// 一度、選択肢を全削除
				var objSelect = document.getElementById("A_skill" + sklIdx);
				HtmlRemoveOptionAll(objSelect);

				// 選択肢を追加
				HtmlCreateElementOption(0, "なし", objSelect);
				HtmlCreateElementOption(1, "日出", objSelect);
				HtmlCreateElementOption(2, "正午", objSelect);
				HtmlCreateElementOption(3, "日没", objSelect);
				HtmlCreateElementOption(4, "月出", objSelect);
				HtmlCreateElementOption(5, "正子", objSelect);
				HtmlCreateElementOption(6, "月没", objSelect);
			}

			//----------------------------------------------------------------
			// 拳聖・星帝・天帝：太陽と月と星の日
			//----------------------------------------------------------------
			var sklIdx = NumSearch2(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_HI, passiveSkillIdArray);
			if (sklIdx != -1) {
				// 一度、選択肢を全削除
				var objSelect = document.getElementById("A_skill" + sklIdx);
				HtmlRemoveOptionAll(objSelect);

				// 選択肢を追加
				HtmlCreateElementOption(0, "全て発動させる", objSelect);
				HtmlCreateElementOption(1, "今日の日付", objSelect);
				HtmlCreateElementOption(2, "太陽の日(偶数)", objSelect);
				HtmlCreateElementOption(3, "月の日(奇数)", objSelect);
				HtmlCreateElementOption(4, "星の日(5の倍数)", objSelect);
			}

			//----------------------------------------------------------------
			// ソウルアセティック：四方符の状態
			//----------------------------------------------------------------
			var sklIdx = NumSearch2(SKILL_ID_SHIHO_FU_ZYOTAI, passiveSkillIdArray);
			if (sklIdx != -1) {
				// 一度、選択肢を全削除
				var objSelect = document.getElementById("A_skill" + sklIdx);
				HtmlRemoveOptionAll(objSelect);

				// 選択肢を追加
				HtmlCreateElementOption(0, "なし", objSelect);
				HtmlCreateElementOption(1, "青龍符", objSelect);
				HtmlCreateElementOption(2, "白虎符", objSelect);
				HtmlCreateElementOption(3, "朱雀符", objSelect);
				HtmlCreateElementOption(4, "玄武符", objSelect);
				HtmlCreateElementOption(5, "四方五行陣Lv1", objSelect);
				HtmlCreateElementOption(6, "四方五行陣Lv2", objSelect);
				HtmlCreateElementOption(7, "四方五行陣Lv3", objSelect);
				HtmlCreateElementOption(8, "四方五行陣Lv4", objSelect);
				HtmlCreateElementOption(9, "四方五行陣Lv5", objSelect);
			}





			for (var i = 0; i < passiveSkillIdArray.length; i++) {
				var wOBJ = document.getElementById("A_skill" + i);
				wOBJ.value = n_A_PassSkill[i];
			}
		}
		else{
			var str;
			str = '<TABLE Border>';
			str += '<TR><TD ColSpan="4" id="A1TD" Bgcolor="#DDDDFF" class="title">';
			str += '<input id="OBJID_CHECK_A1_SKILL_SW" type="checkbox" name="A1_SKILLSW"onClick="Click_PassSkillSW()">';
			str += `<label for="OBJID_CHECK_A1_SKILL_SW">${GetJobName(n_A_JOB)}固有自己支援・パッシブ持続系</label>`;
			str += '<span id="A1used"></span>';
			str += '</TD></TR>';
			str += '</TABLE>';
			myInnerHtml("ID_PASS_SKILL",str,0);
			A1_SKILLSW.checked = 0;
		}
		Click_A1(0);
	}
}




/**
 * パッシブ持続系の設定変更を反映する
 * @param {*} n 再計算フラグ（1 = 再計算する, 1以外 = 再計算しない）
 */
function Click_A1(n){

	if(n==1) AutoCalc("Click_A1");

	var sw=0;

	var passiveSkillIdArray = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB).GetPassiveSkillIdArray();

	var end = passiveSkillIdArray.length;

	for(var i=0;i <end;i++){
		if(n_A_PassSkill[i] != 0){
			sw = 1;
			break;
		}
	}
	if(sw == 0){
		document.getElementById('A1TD').style.backgroundColor = "#DDDDFF";
		myInnerHtml("A1used","",0);
	}else{
		document.getElementById('A1TD').style.backgroundColor = "#FF7777";
		myInnerHtml("A1used","　<B>使用中</B>",0);
	}
 }





SWs3sw = [0,0,0,0,0,0,0,0,0,0,0,0];





function Click_Skill3SW(){
	with(document.calcForm){
		n_Skill3SW = A3_SKILLSW.checked;
		if(n_Skill3SW){
			var str;
			str = '<TABLE Border style="white-space:nowrap;"><TR><TD id="A3TD" ColSpan="6" class="title"><input id="OBJID_CHECK_A3_SKILLSW" type="checkbox" name="A3_SKILLSW"onClick="Click_Skill3SW()">';
			str += '<label for="OBJID_CHECK_A3_SKILLSW">演奏/踊り系スキル</label>';
			str += '<span id="A3used"></span></TD></TR>';
			str += '<TR><TD id="EN0_1"></TD><TD id="EN0_2"></TD><TD id="EN0_3"></TD><TD id="EN0_4"></TD><TD id="EN0_5"></TD><TD id="EN0_6"></TD></TR>';
			str += '<TR><TD id="EN1_1"></TD><TD id="EN1_2"></TD><TD id="EN1_3"></TD><TD id="EN1_4"></TD><TD id="EN1_5"></TD><TD id="EN1_6"></TD></TR>';
			str += '<TR><TD RowSpan=2 id="EN2_1"></TD><TD RowSpan=2 id="EN2_2"></TD><TD id="EN2_3"></TD><TD id="EN2_4"></TD><TD RowSpan="2" id="EN2_7"></TD><TD RowSpan="2" id="EN2_8"></TD></TR>';
			str += '<TR><TD id="EN2_5"></TD><TD id="EN2_6"></TD></TR>';
			str += '<TR><TD id="EN3_1"></TD><TD id="EN3_2"></TD><TD id="EN3_3"></TD><TD id="EN3_4"></TD><TD id="EN3_5"></TD><TD id="EN3_6"></TD></TR>';
			str += '<TR><TD id="EN4_1"></TD><TD id="EN4_2"></TD><TD id="EN4_3"></TD><TD id="EN4_4"></TD><TD id="EN4_5"></TD><TD id="EN4_6"></TD></TR>';
			str += '<TR><TD id="EN5_1"></TD><TD id="EN5_2"></TD><TD id="EN5_3"></TD><TD id="EN5_4"></TD><TD id="EN5_5"></TD><TD id="EN5_6"></TD></TR>';
			str += '<TR><TD id="EN6_1"></TD><TD id="EN6_2"></TD><TD id="EN6_3"></TD><TD id="EN6_4"></TD><TD id="EN6_5"></TD><TD id="EN6_6"></TD></TR>';
			str += '<TR><TD id="EN7_1"></TD><TD id="EN7_2"></TD><TD id="EN8_1"></TD><TD id="EN8_2"></TD></TR>';
			str += '<TR><TD id="EN9_1"></TD><TD id="EN9_2"></TD><TD id="EN10_1"></TD><TD id="EN10_2"></TD></TR>';
			str += '<TR><TD id="EN12_1"></TD><TD id="EN12_2"></TD><TD id="EN12_3"></TD><TD id="EN12_4"></TD><TD id="EN12_5"></TD><TD id="EN12_6"></TD></TR>';
			str += '<TR><TD id="EN13_1"></TD><TD id="EN13_2"></TD><TD id="EN13_3"></TD><TD id="EN13_4"></TD></TR>';
			str += '<TR><TD id="EN20_1"></TD><TD id="EN20_2"></TD><TD id="EN21_1"></TD><TD id="EN21_2"></TD></TR>';
			str += '<TR><TD colspan=4><span id="EN11_1"></span><span id="EN11_2"></span><span id="EN11_1a"></span></TD></TR></TABLE>';
			myInnerHtml("SP_SIEN01",str,0);
			A3_SKILLSW.checked = 1;
			name_CS3SW_SKILL = ["口笛","夕陽のアサシンクロス","ブラギの詩","イドゥンの林檎","ハミング","幸運のキス","サービスフォーユー","不死身ジークフリード","ニヨルドの宴","戦太鼓の響き","ニーベルングの指輪"];
			html_CS3SW_SKILL = new Array();
			for(i=0;i<=10;i++) myInnerHtml("EN"+i+"_1",name_CS3SW_SKILL[i],0);
			html_CS3SW_SKILL[0] = '<select name="A3_Skill0_1"onChange="Skill3SW_2()|Click_A3(1)"></select>';
			html_CS3SW_SKILL[1] = '<select name="A3_Skill1_1"onChange="Skill3SW_2()|Click_A3(1)"></select>';
			html_CS3SW_SKILL[2] = '<select name="A3_Skill2_1"onChange="Skill3SW_2()|Click_A3(1)"></select>';
			html_CS3SW_SKILL[3] = '<select name="A3_Skill3_1"onChange="Skill3SW_2()|Click_A3(1)"></select>';
			html_CS3SW_SKILL[4] = '<select name="A3_Skill4_1"onChange="Skill3SW_2()|Click_A3(1)"></select>';
			html_CS3SW_SKILL[5] = '<select name="A3_Skill5_1"onChange="Skill3SW_2()|Click_A3(1)"></select>';
			html_CS3SW_SKILL[6] = '<select name="A3_Skill6_1"onChange="Skill3SW_2()|Click_A3(1)"></select>';
			html_CS3SW_SKILL[7] = '<select name="A3_Skill7"onChange="Click_A3(1)"></select>';
			html_CS3SW_SKILL[8] = '<select name="A3_Skill8"onChange="Click_A3(1)"></select>';
			html_CS3SW_SKILL[9] = '<select name="A3_Skill9"onChange="Click_A3(1)"></select>';
			html_CS3SW_SKILL[10] = '<select name="A3_Skill10"onChange="Click_A3(1)"></select>';
			for(i=0;i<=10;i++) myInnerHtml("EN"+i+"_2",html_CS3SW_SKILL[i],0);

			// フリッグの歌は仕様変更により、三次職支援へ移動
			var uta_name = ["◆三次職歌スキル off","風車に向かって突撃","エコーの歌","式不明(ハーモナイズ)","スイングダンス","(×)恋人たちの為のシンフォニー","月明かりのセレナーデ"];
			myInnerHtml("EN12_1",'<select name="A3_Skill12_0"onChange="Skill3SW_2()|Click_A3(1)"></select>',0);
			for(var i= 0; i < uta_name.length; i++) {
				A3_Skill12_0.options[i] = new Option(uta_name[i],i);
			}

			var gassou_name = ["◆三次職合奏スキル off","(仮)フライデーナイトフィーバー","エンドレスハミングボイス","(仮)レーラズの露","(?)ﾋﾞﾖﾝﾄﾞｵﾌﾞｳｫｰｸﾗｲ(敵から)","(?)ﾒﾛﾃﾞｨｰｵﾌﾞｼﾝｸ(敵から)","(?)ﾀﾞﾝｽｳｨｽﾞｳｫｰｸﾞ(ﾚﾝｼﾞｬｰ有)","(?)ﾀﾞﾝｽｳｨｽﾞｳｫｰｸﾞ(ﾚﾝｼﾞｬｰ無)"];
			myInnerHtml("EN13_1",'<select name="A3_Skill13_0"onChange="Skill3SW_2()|Click_A3(1)"></select>',0);
			for(var i=0;i<=7;i++) A3_Skill13_0.options[i] = new Option(gassou_name[i],i);
			myInnerHtml("EN20_1","<Font size=2>メランコリーLv<BR>(こちらの欄はFleeとASPD低下用)</Font>",0);
			myInnerHtml("EN20_2",'<select name="A3_Skill20"onChange="Skill3SW_2()|Click_A3(1)"></select>',0);
			for(i=0;i<=5;i++) A3_Skill20.options[i] = new Option(i,i);
			myInnerHtml("EN21_1","<Font size=2>(仮)メランコリーでの威力増加(15%は確殺用<BR>55%か60%がLv5+レッスン10の期待値位)</Font>",0);
			myInnerHtml("EN21_2",'<select name="A3_Skill42"onChange="Skill3SW_2()|Click_A3(1)"></select>',0);
			A3_Skill42.options[0] = new Option("off",0);
			for(i=3;i<=20;i++) A3_Skill42.options[i-2] = new Option("+"+(i * 5)+"%",i);
			myInnerHtml("EN11_1","マリオネットコントロール",0);
			myInnerHtml("EN11_2", "<br>術者のステ："+ '<select name="A3_Skill11_STR"onChange="Click_A3(1)"></select>'+ '<select name="A3_Skill11_AGI"onChange="Click_A3(1)"></select>'+ '<select name="A3_Skill11_VIT"onChange="Click_A3(1)"></select>'+ '<select name="A3_Skill11_INT"onChange="Click_A3(1)"></select>'+ '<select name="A3_Skill11_DEX"onChange="Click_A3(1)"></select>'+ '<select name="A3_Skill11_LUK"onChange="Click_A3(1)"></select>'+ "<BR>"+'<input id="OBJID_CHECK_A3_Skill11a" type="checkbox" name="A3_Skill11a"onClick="Click_A3(1)">'+'<Font size=2><label for="OBJID_CHECK_A3_Skill11a">ステータスをそのまま補正に＋する(憑神や装備解除調整用/人力計算)</label></Font>',0);
			A3_Skill11_STR.options[0] = new Option("STR",0);
			A3_Skill11_AGI.options[0] = new Option("AGI",0);
			A3_Skill11_VIT.options[0] = new Option("VIT",0);
			A3_Skill11_INT.options[0] = new Option("INT",0);
			A3_Skill11_DEX.options[0] = new Option("DEX",0);
			A3_Skill11_LUK.options[0] = new Option("LUK",0);
			for(i=1;i<=130;i++){
				A3_Skill11_STR.options[i] = new Option(i,i);
				A3_Skill11_AGI.options[i] = new Option(i,i);
				A3_Skill11_VIT.options[i] = new Option(i,i);
				A3_Skill11_INT.options[i] = new Option(i,i);
				A3_Skill11_DEX.options[i] = new Option(i,i);
				A3_Skill11_LUK.options[i] = new Option(i,i);
			}
			A3_Skill11_STR.value = n_A_PassSkill3[12];
			A3_Skill11_AGI.value = n_A_PassSkill3[13];
			A3_Skill11_VIT.value = n_A_PassSkill3[14];
			A3_Skill11_INT.value = n_A_PassSkill3[15];
			A3_Skill11_DEX.value = n_A_PassSkill3[16];
			A3_Skill11_LUK.value = n_A_PassSkill3[17];
			A3_Skill11a.checked = n_A_PassSkill3[18];
			for(i=0;i<=10;i++){
				A3_Skill0_1.options[i] = new Option(i,i);
				A3_Skill1_1.options[i] = new Option(i,i);
				A3_Skill2_1.options[i] = new Option(i,i);
				A3_Skill3_1.options[i] = new Option(i,i);
				A3_Skill4_1.options[i] = new Option(i,i);
				A3_Skill5_1.options[i] = new Option(i,i);
				A3_Skill6_1.options[i] = new Option(i,i);
			}
			for(i=0;i<=5;i++){
				A3_Skill7.options[i] = new Option(i,i);
				A3_Skill8.options[i] = new Option(i,i);
				A3_Skill9.options[i] = new Option(i,i);
				A3_Skill10.options[i] = new Option(i,i);
			}
			A3_Skill0_1.value = n_A_PassSkill3[0];
			A3_Skill1_1.value = n_A_PassSkill3[1];
			A3_Skill2_1.value = n_A_PassSkill3[2];
			A3_Skill3_1.value = n_A_PassSkill3[3];
			A3_Skill4_1.value = n_A_PassSkill3[4];
			A3_Skill5_1.value = n_A_PassSkill3[5];
			A3_Skill6_1.value = n_A_PassSkill3[6];
			A3_Skill7.value = n_A_PassSkill3[7];
			A3_Skill8.value = n_A_PassSkill3[8];
			A3_Skill9.value = n_A_PassSkill3[9];
			A3_Skill10.value = n_A_PassSkill3[10];
			A3_Skill12_0.value = n_A_PassSkill3[19];
			A3_Skill13_0.value = n_A_PassSkill3[39];
			A3_Skill20.value = n_A_PassSkill3[11];
			A3_Skill42.value = n_A_PassSkill3[42];
			Skill3SW_2();
		}
		else{
			var str;
			str = '<TABLE Border><TR><TD id="A3TD" class="title"><input id="OBJID_CHECK_A3_SKILLSW" type="checkbox" name="A3_SKILLSW"onClick="Click_Skill3SW()"><label for="OBJID_CHECK_A3_SKILLSW">演奏/踊り系スキル</label><span id="A3used"></span></TD></TR></TABLE>';
			myInnerHtml("SP_SIEN01",str,0);
			A3_SKILLSW.checked = 0;
			for(i=0;i<=11;i++) SWs3sw[i]=0;
		}
		Click_A3(0);
	}}




/**
 * 演奏/踊り系スキルの変更を変数に反映する
 */
function Skill3SW_2(){
	with(document.calcForm){
		n_A_PassSkill3[0] = eval(A3_Skill0_1.value);
		n_A_PassSkill3[1] = eval(A3_Skill1_1.value);
		n_A_PassSkill3[2] = eval(A3_Skill2_1.value);
		n_A_PassSkill3[3] = eval(A3_Skill3_1.value);
		n_A_PassSkill3[4] = eval(A3_Skill4_1.value);
		n_A_PassSkill3[5] = eval(A3_Skill5_1.value);
		n_A_PassSkill3[6] = eval(A3_Skill6_1.value);
		n_A_PassSkill3[19] = eval(A3_Skill12_0.value);
		n_A_PassSkill3[39] = eval(A3_Skill13_0.value);
		if(n_A_PassSkill3[0] != 0){
			if(SWs3sw[0] == 0){
				if(n_A_PassSkill3[30] == 0) n_A_PassSkill3[30] = 10;
				myInnerHtml("EN0_3","バードのAGI<BR>バードのLUK",0);
				myInnerHtml("EN0_4",'<select name="A3_Skill0_2"onChange="Click_A3(1)"></select><BR><select name="A3_Skill0_4"onChange="Click_A3(1)"></select>',0);
				myInnerHtml("EN0_5","楽器の練習",0);
				myInnerHtml("EN0_6",'<select name="A3_Skill0_3"onChange="Click_A3(1)"></select>',0);
				for(i=0;i<=40;i++) A3_Skill0_2.options[i] = new Option((i * 15) +"～"+ ((i * 15)+14),i);
				for(i=0;i<=20;i++) A3_Skill0_4.options[i] = new Option((i * 30) +"～"+ ((i * 30)+29),i);
				for(i=1;i<=10;i++) A3_Skill0_3.options[i-1] = new Option(i,i);
				SWs3sw[0] = 1;
				A3_Skill0_2.value = n_A_PassSkill3[20];
				A3_Skill0_4.value = n_A_PassSkill3[28];
				A3_Skill0_3.value = n_A_PassSkill3[30];
			}
		}else{
			SWs3sw[0] = 0;
			if(n_A_PassSkill3[30]==10) n_A_PassSkill3[30] = 0;
			myInnerHtml("EN0_3","-",0);
			myInnerHtml("EN0_4","-",0);
			myInnerHtml("EN0_5","",0);
			myInnerHtml("EN0_6","",0);
		}
		if(n_A_PassSkill3[1] != 0){
			if(SWs3sw[1] == 0){
				if(n_A_PassSkill3[31]==0) n_A_PassSkill3[31] = 10;
				myInnerHtml("EN1_3","バードのAGI",0);
				myInnerHtml("EN1_4",'<select name="A3_Skill1_2"onChange="Click_A3(1)"></select>',0);
				myInnerHtml("EN1_5","楽器の練習",0);
				myInnerHtml("EN1_6",'<select name="A3_Skill1_3"onChange="Click_A3(1)"></select>',0);
				for(i=0;i<=30;i++) A3_Skill1_2.options[i] = new Option((i * 20) +"～"+ ((i * 20)+19),i);
				for(i=1;i<=10;i++) A3_Skill1_3.options[i-1] = new Option(i,i);
				SWs3sw[1] = 1;
				A3_Skill1_2.value = n_A_PassSkill3[21];
				A3_Skill1_3.value = n_A_PassSkill3[31];
			}
		}else{
			SWs3sw[1] = 0;
			if(n_A_PassSkill3[31]==10) n_A_PassSkill3[31] = 0;
			myInnerHtml("EN1_3","-",0);
			myInnerHtml("EN1_4","-",0);
			myInnerHtml("EN1_5","",0);
			myInnerHtml("EN1_6","",0);
		}
		if(n_A_PassSkill3[2] != 0){
			if(SWs3sw[2] == 0){
				if(n_A_PassSkill3[32]==0) n_A_PassSkill3[32] = 10;
				myInnerHtml("EN2_3","バードのDEX",0);
				myInnerHtml("EN2_4",'<select name="A3_Skill2_2"onChange="Click_A3(1)"></select>',0);
				myInnerHtml("EN2_5","バードのINT",0);
				myInnerHtml("EN2_6",'<select name="A3_Skill2_3"onChange="Click_A3(1)"></select>',0);
				myInnerHtml("EN2_7","楽器の練習",0);
				myInnerHtml("EN2_8",'<select name="A3_Skill2_4"onChange="Click_A3(1)"></select>',0);
				for(i=0;i<=60;i++) A3_Skill2_2.options[i] = new Option((i * 10) +"～"+ ((i * 10)+9),i);
				for(i=0;i<=90;i++) A3_Skill2_3.options[i] = new Option((i * 5) +"～"+ ((i * 5)+4),i);
				for(i=1;i<=10;i++) A3_Skill2_4.options[i-1] = new Option(i,i);
				SWs3sw[2] = 1;
				A3_Skill2_2.value = n_A_PassSkill3[22];
				A3_Skill2_3.value = n_A_PassSkill3[29];
				A3_Skill2_4.value = n_A_PassSkill3[32];
			}
		}else{
			SWs3sw[2] = 0;
			if(n_A_PassSkill3[32]==10) n_A_PassSkill3[32] = 0;
			myInnerHtml("EN2_3","-",0);
			myInnerHtml("EN2_4","-",0);
			myInnerHtml("EN2_5","",0);
			myInnerHtml("EN2_6","",0);
			myInnerHtml("EN2_7","",0);
			myInnerHtml("EN2_8","",0);
		}
		if(n_A_PassSkill3[3] != 0){
			if(SWs3sw[3] == 0){
				if(n_A_PassSkill3[33]==0) n_A_PassSkill3[33] = 10;
				myInnerHtml("EN3_3","バードのVIT",0);
				myInnerHtml("EN3_4",'<select name="A3_Skill3_2"onChange="Click_A3(1)"></select>',0);
				myInnerHtml("EN3_5","楽器の練習",0);
				myInnerHtml("EN3_6",'<select name="A3_Skill3_3"onChange="Click_A3(1)"></select>',0);
				for(i=0;i<=60;i++) A3_Skill3_2.options[i] = new Option((i * 10) +"～"+ ((i * 10)+9),i);
				for(i=1;i<=10;i++) A3_Skill3_3.options[i-1] = new Option(i,i);
				SWs3sw[3] = 1;
				A3_Skill3_2.value = n_A_PassSkill3[23];
				A3_Skill3_3.value = n_A_PassSkill3[33];
			}
		}else{
			SWs3sw[3] = 0;
			if(n_A_PassSkill3[33]==10) n_A_PassSkill3[33] = 0;
			myInnerHtml("EN3_3","-",0);
			myInnerHtml("EN3_4","-",0);
			myInnerHtml("EN3_5","",0);
			myInnerHtml("EN3_6","",0);
		}
		if(n_A_PassSkill3[4] != 0){
			if(SWs3sw[4] == 0){
				if(n_A_PassSkill3[34]==0) n_A_PassSkill3[34] = 10;
				myInnerHtml("EN4_3","ダンサーのDEX",0);
				myInnerHtml("EN4_4",'<select name="A3_Skill4_2"onChange="Click_A3(1)"></select>',0);
				myInnerHtml("EN4_5","ダンスの練習",0);
				myInnerHtml("EN4_6",'<select name="A3_Skill4_3"onChange="Click_A3(1)"></select>',0);
				for(i=0;i<=40;i++) A3_Skill4_2.options[i] = new Option((i * 15) +"～"+ ((i * 15)+14),i);
				for(i=1;i<=10;i++) A3_Skill4_3.options[i-1] = new Option(i,i);
				SWs3sw[4] = 1;
				A3_Skill4_2.value = n_A_PassSkill3[24];
				A3_Skill4_3.value = n_A_PassSkill3[34];
			}
		}else{
			SWs3sw[4] = 0;
			if(n_A_PassSkill3[34]==10) n_A_PassSkill3[34] = 0;
			myInnerHtml("EN4_3","-",0);
			myInnerHtml("EN4_4","-",0);
			myInnerHtml("EN4_5","",0);
			myInnerHtml("EN4_6","",0);
		}
		if(n_A_PassSkill3[5] != 0){
			if(SWs3sw[5] == 0){
				if(n_A_PassSkill3[35]==0) n_A_PassSkill3[35] = 10;
				myInnerHtml("EN5_3","ダンサーのLUK",0);
				myInnerHtml("EN5_4",'<select name="A3_Skill5_2"onChange="Click_A3(1)"></select>',0);
				myInnerHtml("EN5_5","ダンスの練習",0);
				myInnerHtml("EN5_6",'<select name="A3_Skill5_3"onChange="Click_A3(1)"></select>',0);
				for(i=0;i<=60;i++) A3_Skill5_2.options[i] = new Option((i * 10) +"～"+ ((i * 10)+9),i);
				for(i=1;i<=10;i++) A3_Skill5_3.options[i-1] = new Option(i,i);
				SWs3sw[5] = 1;
				A3_Skill5_2.value = n_A_PassSkill3[25];
				A3_Skill5_3.value = n_A_PassSkill3[35];
			}
		}else{
			SWs3sw[5] = 0;
			if(n_A_PassSkill3[35]==10) n_A_PassSkill3[35] = 0;
			myInnerHtml("EN5_3","-",0);
			myInnerHtml("EN5_4","-",0);
			myInnerHtml("EN5_5","",0);
			myInnerHtml("EN5_6","",0);
		}
		if(n_A_PassSkill3[6] != 0){
			if(SWs3sw[6] == 0){
				if(n_A_PassSkill3[36]==0) n_A_PassSkill3[36] = 10;
				myInnerHtml("EN6_3","ダンサーのINT",0);
				myInnerHtml("EN6_4",'<select name="A3_Skill6_2"onChange="Click_A3(1)"></select>',0);
				myInnerHtml("EN6_5","ダンスの練習",0);
				myInnerHtml("EN6_6",'<select name="A3_Skill6_3"onChange="Click_A3(1)"></select>',0);
				for(i=0;i<=60;i++) A3_Skill6_2.options[i] = new Option((i * 10) +"～"+ ((i * 10)+9),i);
				for(i=1;i<=10;i++) A3_Skill6_3.options[i-1] = new Option(i,i);
				SWs3sw[6] = 1;
				A3_Skill6_2.value = n_A_PassSkill3[26];
				A3_Skill6_3.value = n_A_PassSkill3[36];
			}
		}else{
			SWs3sw[6] = 0;
			if(n_A_PassSkill3[36]==10) n_A_PassSkill3[36] = 0;
			myInnerHtml("EN6_3","-",0);
			myInnerHtml("EN6_4","-",0);
			myInnerHtml("EN6_5","",0);
			myInnerHtml("EN6_6","",0);
		}

// フリッグの歌は仕様変更により、三次職支援へ移動
/*
		if(n_A_PassSkill3[19] == 7){
			if(SWs3sw[7] != 1){
				n_A_PassSkill3[46] = 0;
				n_A_PassSkill3[38] = 0;
				myInnerHtml("EN12_2","",0);
				myInnerHtml("EN12_3","-",0);
				myInnerHtml("EN12_4","-",0);
				myInnerHtml("EN12_5","",0);
				myInnerHtml("EN12_6","",0);
				n_A_PassSkill3[37] = 5;
				myInnerHtml("EN12_2",'<select name="A3_Skill12_1"onChange="Click_A3(1)"></select>',0);
				for(i=1;i<=5;i++) A3_Skill12_1.options[i-1] = new Option(i,i);
				A3_Skill12_1.value = n_A_PassSkill3[37];
				SWs3sw[7] = 1;
			}
		}else if(n_A_PassSkill3[19] != 0){
*/

		if(n_A_PassSkill3[19] != 0){
			if(SWs3sw[7] != 2){
				if(n_A_PassSkill3[46]==0){
					n_A_PassSkill3[37] = 5;
					n_A_PassSkill3[46] = 60;
					n_A_PassSkill3[38] = 10;
				}
				myInnerHtml("EN12_2",'<select name="A3_Skill12_1"onChange="Click_A3(1)"></select>',0);
				myInnerHtml("EN12_3","ミン/ワンのJobLv",0);
				myInnerHtml("EN12_4",'<select name="A3_Skill12_2"onChange="Click_A3(1)"></select>',0);
				myInnerHtml("EN12_5","レッスン",0);
				myInnerHtml("EN12_6",'<select name="A3_Skill12_3"onChange="Click_A3(1)"></select>',0);
				for(i=1;i<=5;i++) A3_Skill12_1.options[i-1] = new Option(i,i);
				for(i=1;i<=60;i++) A3_Skill12_2.options[i-1] = new Option(i,i);
				for(i=0;i<=10;i++) A3_Skill12_3.options[i] = new Option(i,i);
				if(n_A_PassSkill3[37] > 5) n_A_PassSkill3[37] = 5;
				A3_Skill12_1.value = n_A_PassSkill3[37];
				A3_Skill12_2.value = n_A_PassSkill3[46];
				A3_Skill12_3.value = n_A_PassSkill3[38];
				SWs3sw[7] = 2;
			}
		}else{
			SWs3sw[7] = 0;
			n_A_PassSkill3[37] = 0;
			n_A_PassSkill3[46] = 0;
			n_A_PassSkill3[38] = 0;
			myInnerHtml("EN12_2","",0);
			myInnerHtml("EN12_3","<Font size=2>←風車などクリックで選択可</Font>",0);
			myInnerHtml("EN12_4","",0);
			myInnerHtml("EN12_5","",0);
			myInnerHtml("EN12_6","",0);
		}
		if(n_A_PassSkill3[39] != 0){
			if(SWs3sw[8] == 0){
				if(n_A_PassSkill3[41]==0){
					n_A_PassSkill3[40] = 5;
					n_A_PassSkill3[41] = 2;
				}
				myInnerHtml("EN13_2",'<select name="A3_Skill13_1"onChange="Click_A3(1)"></select>',0);
				for(i=1;i<=5;i++) A3_Skill13_1.options[i-1] = new Option(i,i);
				A3_Skill13_1.value = n_A_PassSkill3[40];
				if(n_A_PassSkill3[39] != 1){
					myInnerHtml("EN13_3","ミン/ワンの人数",0);
					myInnerHtml("EN13_4",'<select name="A3_Skill13_2"onChange="Click_A3(1)"></select>',0);
					for(i=2;i<=12;i++) A3_Skill13_2.options[i-2] = new Option(i,i);
					if(n_A_PassSkill3[41] <2) n_A_PassSkill3[41] = 2;
					A3_Skill13_2.value = n_A_PassSkill3[41];
				}else{
					myInnerHtml("EN13_3","ATK増加のタイプ(検証用)",0);
					myInnerHtml("EN13_4",'<select name="A3_Skill13_2"onChange="Click_A3(1)"></select>',0);
					A3_Skill13_2.options[0] = new Option("アンドレC型(ほぼ確定)",3);
					A3_Skill13_2.options[1] = new Option("アンドレC型(ほぼ確定)",1);
					A3_Skill13_2.options[2] = new Option("アンドレC型(ほぼ確定)",2);
					A3_Skill13_2.value = n_A_PassSkill3[41];
				}
				SWs3sw[8] = 0;
			}
		}else{
			SWs3sw[8] = 0;
			n_A_PassSkill3[40] = 0;
			n_A_PassSkill3[41] = 0;
			myInnerHtml("EN13_2","",0);
			myInnerHtml("EN13_3","",0);
			myInnerHtml("EN13_4","",0);
		}
	}}

/**
 * 演奏/踊り系スキルの変更を反映する
 * @param {*} n 再計算フラグ（n = 1 再計算する）
 */
function Click_A3(n){
	if(n==1) AutoCalc("Click_A3");

	var sw=0;
	for(var i=0;i <n_A_PassSkill3.length;i++){
		if(n_A_PassSkill3[i] != 0){
			if(!(20 <= i && i <= 36)){
				sw = 1;
				break;
			}
		}
	}
	if(sw == 0){
		document.getElementById('A3TD').style.backgroundColor = "#DDDDFF";
		myInnerHtml("A3used","",0);
	}else{
		document.getElementById('A3TD').style.backgroundColor = "#FF7777";
		myInnerHtml("A3used","　<B>使用中</B>",0);
	}
 }




/**
 * ギルドスキル/ゴスペル/他　を構築する
 */
function Click_Skill4SW(){
	with(document.calcForm){
		n_Skill4SW = A4_SKILLSW.checked;
		if(n_Skill4SW){
			var str;
			str = '<TABLE Border style="white-space:nowrap;"><TR><TD id="A4TD" ColSpan="10" class="title"><input id="OBJID_CHECK_A4_SKILLSW" type="checkbox" name="A4_SKILLSW"onClick="Click_Skill4SW()"><label for="OBJID_CHECK_A4_SKILLSW">ギルドスキル/ゴスペル/他</label><span id="A4used"></span></TD></TR>';
			str += '<TR><TD ColSpan="10">ギルドスキル</TD></TR>';
			str += '<TR><TD id="EN40_1"></TD><TD id="EN40_2"></TD><TD id="EN41_1"></TD><TD id="EN41_2"></TD><TD id="EN42_1"></TD><TD id="EN42_2"></TD></TR>';
			str += '<TR><TD id="EN43_1"></TD><TD id="EN43_2"></TD><TD id="EN44_1"></TD><TD id="EN44_2"></TD></TR>';
			str += '<TR><TD ColSpan="10">ゴスペルスキル</TD></TR>';
			str += '<TR><TD id="EN45_1"></TD><TD id="EN45_2"></TD><TD id="EN46_1"></TD><TD id="EN46_2"></TD><TD id="EN47_1"></TD><TD id="EN47_2"></TD></TR>';
			str += '<TR><TD id="EN48_1"></TD><TD id="EN48_2"></TD><TD id="EN49_1"></TD><TD id="EN49_2"></TD><TD id="EN410_1"></TD><TD id="EN410_2"></TD></TR>';
			str += '<TR><TD ColSpan="10">一部スキルの持ち替え等による強化<BR><Font size=2>スキル使用時のステータスを入力してください。スキルに無関係なステータスは無視されます。<BR>スキルレベルはパッシブ/持続系欄で選択してください。</Font></TD></TR>';
			str += '<TR><TD ColSpan="10" id="EN411_2"></TD></TR>';
			str += '<TR><TD id="EN430_1"></TD><TD id="EN430_2"></TD><TD id="EN431_1"></TD><TD id="EN431_2"></TD><TD id="EN432_1"></TD><TD id="EN432_2"></TD></TR>';
			str += '<TR><TD id="EN433_1"></TD><TD id="EN433_2"></TD><TD id="EN434_1"></TD><TD id="EN434_2"></TD><TD id="EN435_1"></TD><TD id="EN435_2"></TD></TR>';
			str += '</TABLE>';
			myInnerHtml("SP_SIEN02",str,0);
			A4_SKILLSW.checked = 1;
			name_CS4SW_SKILL = ["臨戦体勢","偉大なる指導力","栄光の傷","冷静な心","鋭い視線","ステータスALL+20","HP+100%","SP+100%","ATK+100%","HIT+50＆FLEE+50","被ダメージ半減"];
			html_CS4SW_SKILL = new Array();
			for(i=0;i<=10;i++) myInnerHtml("EN4"+i+"_1",name_CS4SW_SKILL[i],0);
			html_CS4SW_SKILL[0] = '<input type="checkbox" name="A4_Skill0"onClick="StAllCalc() | Click_A4(1)">';
			html_CS4SW_SKILL[1] = '<select name="A4_Skill1"onChange="StAllCalc() | Click_A4(1)"></select>';
			html_CS4SW_SKILL[2] = '<select name="A4_Skill2"onChange="StAllCalc() | Click_A4(1)"></select>';
			html_CS4SW_SKILL[3] = '<select name="A4_Skill3"onChange="StAllCalc() | Click_A4(1)"></select>';
			html_CS4SW_SKILL[4] = '<select name="A4_Skill4"onChange="StAllCalc() | Click_A4(1)"></select>';
			html_CS4SW_SKILL[5] = '<input type="checkbox" name="A4_Skill5"onClick="StAllCalc() | Click_A4(1)">';
			html_CS4SW_SKILL[6] = '<input type="checkbox" name="A4_Skill6"onClick="StAllCalc() | Click_A4(1)">';
			html_CS4SW_SKILL[7] = '<input type="checkbox" name="A4_Skill7"onClick="StAllCalc() | Click_A4(1)">';
			html_CS4SW_SKILL[8] = '<input type="checkbox" name="A4_Skill8"onClick="StAllCalc() | Click_A4(1)">';
			html_CS4SW_SKILL[9] = '<input type="checkbox" name="A4_Skill9"onClick="StAllCalc() | Click_A4(1)">';
			html_CS4SW_SKILL[10] = '<input type="checkbox" name="A4_Skill10"onClick="StAllCalc() | Click_A4(1)">';
			html_CS4SW_SKILL[11] = '<select name="A4_Skill11"onChange="StAllCalc() | Click_A4(1)"></select>';
			for(i=0;i<=11;i++) myInnerHtml("EN4"+i+"_2",html_CS4SW_SKILL[i],0);
			myInnerHtml("EN430_1","STR",0);
			myInnerHtml("EN431_1","AGI",0);
			myInnerHtml("EN432_1","VIT",0);
			myInnerHtml("EN433_1","INT",0);
			myInnerHtml("EN434_1","DEX",0);
			myInnerHtml("EN435_1","LUK",0);
			html_CS4SW_SKILL[30] = '<select name="A4_Skill30"onChange="StAllCalc() | Click_A4(1)"></select>';
			html_CS4SW_SKILL[31] = '<select name="A4_Skill31"onChange="StAllCalc() | Click_A4(1)"></select>';
			html_CS4SW_SKILL[32] = '<select name="A4_Skill32"onChange="StAllCalc() | Click_A4(1)"></select>';
			html_CS4SW_SKILL[33] = '<select name="A4_Skill33"onChange="StAllCalc() | Click_A4(1)"></select>';
			html_CS4SW_SKILL[34] = '<select name="A4_Skill34"onChange="StAllCalc() | Click_A4(1)"></select>';
			html_CS4SW_SKILL[35] = '<select name="A4_Skill35"onChange="StAllCalc() | Click_A4(1)"></select>';
			for(i=30;i<=35;i++) myInnerHtml("EN4"+i+"_2",html_CS4SW_SKILL[i],0);
			for(i=0;i<=5;i++){
				A4_Skill1.options[i] = new Option(i,i);
				A4_Skill2.options[i] = new Option(i,i);
				A4_Skill3.options[i] = new Option(i,i);
				A4_Skill4.options[i] = new Option(i,i);
			}
			A4_Skill11.options[0] = new Option("■選択してください",0);
			A4_Skill11.options[1] = new Option(SkillObjNew[439][SKILL_DATA_INDEX_NAME] +"(Int)",1);
			A4_Skill11.options[2] = new Option(SkillObjNew[627][SKILL_DATA_INDEX_NAME] +"(Str&Dex&Int)",2);
			A4_Skill11.options[3] = new Option(SkillObjNew[628][SKILL_DATA_INDEX_NAME] +"(Vit)",3);
			for(i=0;i<=300;i++){
				A4_Skill31.options[i] = new Option(i,i);
				A4_Skill32.options[i] = new Option(i,i);
			}
			for(i=0;i<=600;i++){
				A4_Skill30.options[i] = new Option(i,i);
				A4_Skill33.options[i] = new Option(i,i);
				A4_Skill34.options[i] = new Option(i,i);
				A4_Skill35.options[i] = new Option(i,i);
			}
			A4_Skill0.checked = n_A_PassSkill4[0];
			A4_Skill1.value = n_A_PassSkill4[1];
			A4_Skill2.value = n_A_PassSkill4[2];
			A4_Skill3.value = n_A_PassSkill4[3];
			A4_Skill4.value = n_A_PassSkill4[4];
			A4_Skill5.checked = n_A_PassSkill4[5];
			A4_Skill6.checked = n_A_PassSkill4[6];
			A4_Skill7.checked = n_A_PassSkill4[7];
			A4_Skill8.checked = n_A_PassSkill4[8];
			A4_Skill9.checked = n_A_PassSkill4[9];
			A4_Skill10.checked = n_A_PassSkill4[10];
			A4_Skill11.value = n_A_PassSkill4[11];
			A4_Skill30.value = n_A_PassSkill4[30];
			A4_Skill31.value = n_A_PassSkill4[31];
			A4_Skill32.value = n_A_PassSkill4[32];
			A4_Skill33.value = n_A_PassSkill4[33];
			A4_Skill34.value = n_A_PassSkill4[34];
			A4_Skill35.value = n_A_PassSkill4[35];
		}
		else{
			var str;
			str = '<TABLE Border><TR><TD id="A4TD" class="title"><input id="OBJID_CHECK_A4_SKILLSW" type="checkbox" name="A4_SKILLSW"onClick="Click_Skill4SW()"><label for="OBJID_CHECK_A4_SKILLSW">ギルドスキル/ゴスペル/他</label><span id="A4used"></span></TD></TR></TABLE>';
			myInnerHtml("SP_SIEN02",str,0);
			A4_SKILLSW.checked = 0;
		}
		Click_A4(0);
	}}

/**
 * ギルドスキル/ゴスペル/他の変更を反映する
 * @param {*} n 再計算フラグ（n = 1 再計算する）
 */
function Click_A4(n){
	if(n==1) AutoCalc("Click_A4");

	var sw=0;
	for(var i=0;i <n_A_PassSkill4.length;i++) {
		if(n_A_PassSkill4[i] != 0){
			sw = 1;
			break;
		}
	}
	if(sw == 0){
		document.getElementById('A4TD').style.backgroundColor = "#DDDDFF";
		myInnerHtml("A4used","",0);
	}else{
		document.getElementById('A4TD').style.backgroundColor = "#FF7777";
		myInnerHtml("A4used","　<B>使用中</B>",0);
	}
 }









function Click_Skill7SW(){

	var idxRow = 0;
	var idxColumn = 0;
	var idxKind = 0;
	var idxValue = 0;

	var objRoot = null;
	var objTable = null;
	var objTbody = null;
	var objTr = null;
	var objTd = null;
	var objInput = null;
	var objSelect = null;
	var objLabel = null;
	var objSpan = null;

	var optText = "";



	// 展開状態を取得
	objInput = document.getElementById("OBJID_CHECK_A7_SKILLSW");
	n_Skill7SW = objInput.checked;

	// ルートオブジェクト取得
	objRoot = document.getElementById("OBJID_SP_SIEN05");

	// ルートオブジェクト配下、全削除
	HtmlRemoveAllChild(objRoot);

	// テーブル生成
	objTable = HtmlCreateElement("table", objRoot);
	objTable.setAttribute("border", "1");
	objTable.style.whiteSpace = "nowrap";
	objTbody = HtmlCreateElement("tbody", objTable);

	// ヘッダ部分構築
	objTr = HtmlCreateElement("tr", objTbody);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("id", "A7TD");
	objTd.setAttribute("class", "title");
	if (n_Skill7SW) {
		objTd.setAttribute("colspan", "6");
	}

	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("type", "checkbox");
	objInput.setAttribute("id", "OBJID_CHECK_A7_SKILLSW");
	objInput.setAttribute("name", "A7_SKILLSW");
	objInput.setAttribute("onclick", "Click_Skill7SW()");
	if (n_Skill7SW) {
		objInput.setAttribute("checked", "checked");
	}

	objLabel = HtmlCreateElement("label", objTd);
	objLabel.setAttribute("for", "OBJID_CHECK_A7_SKILLSW");

	HtmlCreateTextNode("アイテム(食品/他)", objLabel);

	objSpan = HtmlCreateElement("span", objTd);
	objSpan.setAttribute("id", "A7used");



	// 展開表示でない場合は、処理終了
	if (!n_Skill7SW) {
		Click_A7(0);
		return;
	}



	var buildInfo = null;
	var buildInfoTable = [
		[
			[0, "茶菓子(HIT+30)"],
			[1, "揚げ菓子(FLEE+30)"],
			[2, "虹色のお餅(ATK/MATK+10)"]
		],
		[
			[9, "恨みの箱(ATK+20)"],
			[10, "眠い箱(MATK+20)"],
			[]
		],
		[
			[11, "レジストコールドポーション"],
			[12, "レジストアースポーション"],
			[]
		],
		[
			[13, "レジストファイアーポーション"],
			[14, "レジストウィンドポーション"],
			[]
		],
		[
			[22, "濃縮サラマインジュース"],
			[23, "濃縮ホワイトポーションZ"],
			[24, "ビタタ500"]
		],
		[
			[25, "ビュッシュ・ド・ノエル"],
			[35, "ガラナキャンディ"],
			[36, "焼きトウモロコシ"]
		],
		[
			[26, "ルーンミッドガッツ産おやつ"],
			[27, "シュバルツバルド産おやつ"],
			[28, "アルナベルツ産おやつ"]
		],
		[
			[29, "マヌクの豪気"],
			[30, "マヌクの信念"],
			[31, "マヌクの意思"]
		],
		[
			[32, "ピンギキュラの果実ジャム"],
			[33, "コルヌスの涙"],
			[34, "ルシオラヴェスパのハチ蜜"]
		],
		[
			[37, "アロエベラ"],
			[38, "HP増加ポーション", ["なし","(小)","(中)","(大)"]],
			[39, "SP増加ポーション", ["なし","(小)","(中)","(大)"]],
		],
		[
			[40, "(効果なし)マキシマイズパワー"],
			[41, "戦闘薬", ["なし","戦闘薬","高級戦闘薬"]],
			[48, "古代精霊のお守り"],
		],
		[
			[50, "エナジーコート", ["なし","6%","12%","18%","24%","30%"]],
			[49, "オルレアンのフルコース"],
			[51, "フェンリルの呪符"],
		],
	];

	var subInfoArray = null;



	for (idxRow = 0; idxRow < buildInfoTable.length; idxRow++) {

		// 追加行が存在するインデックス
		switch (idxRow) {

		case 1:
			objTr = HtmlCreateElement("tr", objTbody);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("colspan", "3");

			subInfoArray = [
				[3, "STR"], [4, "AGI"], [5, "VIT"], [6, "INT"], [7, "DEX"], [8, "LUK"],
			];

			for (idxKind = 0; idxKind < subInfoArray.length; idxKind++) {

				objSelect = HtmlCreateElement("select", objTd);
				objSelect.setAttribute("name", "A7_Skill" + subInfoArray[idxKind][0]);
				objSelect.setAttribute("onchange", "StAllCalc() | Click_A7(1)");

				HtmlCreateElementOption(0, subInfoArray[idxKind][1] + "+食品", objSelect);
				for (idxValue = 1; idxValue <= 10; idxValue++) {
					HtmlCreateElementOption(idxValue, "+" + idxValue, objSelect);
				}

				objSelect.value = n_A_PassSkill7[subInfoArray[idxKind][0]];

				HtmlCreateTextNode(" ", objTd);
			}

			objInput = HtmlCreateElement("input", objTd);
			objInput.setAttribute("type", "button");
			objInput.setAttribute("id", "FOODOFF");
			objInput.setAttribute("value", "全解除");
			objInput.setAttribute("onclick", "Click_Food_Off() | StAllCalc()");

			HtmlCreateTextNode(" ", objTd);

			objInput = HtmlCreateElement("input", objTd);
			objInput.setAttribute("type", "button");
			objInput.setAttribute("name", "NETCAFE3");
			objInput.setAttribute("value", "ALL＋10");
			objInput.setAttribute("onclick", "Click_NetCafe3() | StAllCalc()");

			HtmlCreateElement("br", objTd);

			HtmlCreateTextNode("※ネットカフェのステータスALL+10は食品扱い", objTd);

			break;

		case 4:
			objTr = HtmlCreateElement("tr", objTbody);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("colspan", "3");

			objInput = HtmlCreateElement("input", objTd);
			objInput.setAttribute("type", "checkbox");
			objInput.setAttribute("id", "OBJID_CHECK_A7_Skill15");
			objInput.setAttribute("name", "A7_Skill15");
			objInput.setAttribute("onclick", "StAllCalc() | Click_A7(1) | CAttackMethodAreaComponentManager.RebuildControls()");

			objLabel = HtmlCreateElement("label", objTd);
			objLabel.setAttribute("for", "OBJID_CHECK_A7_Skill15");

			HtmlCreateTextNode("攻撃方法を追加する（魔女のスキルカード・攻撃魔法スクロール・イグドラシルの葉）", objLabel);

			if (n_A_PassSkill7[15]) {
				objInput.checked = "checked";
			}

			// +20 料理
			objTr = HtmlCreateElement("tr", objTbody);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("colspan", "3");

			subInfoArray = [
				[16, "STR"], [17, "AGI"], [18, "VIT"], [19, "INT"], [20, "DEX"], [21, "LUK"],
			];

			for (idxKind = 0; idxKind < subInfoArray.length; idxKind++) {

				if (idxKind > 0) {
					HtmlCreateTextNode("　　", objTd);
				}

				objInput = HtmlCreateElement("input", objTd);
				objInput.setAttribute("type", "checkbox");
				objInput.setAttribute("id", "OBJID_CHECK_A7_Skill" + subInfoArray[idxKind][0]);
				objInput.setAttribute("name", "A7_Skill" + subInfoArray[idxKind][0]);
				objInput.setAttribute("onclick", "StAllCalc() | Click_A7(1)");

				objLabel = HtmlCreateElement("label", objTd);
				objLabel.setAttribute("for", "OBJID_CHECK_A7_Skill" + subInfoArray[idxKind][0]);

				HtmlCreateTextNode(subInfoArray[idxKind][1] + "+20", objLabel);

				if (n_A_PassSkill7[subInfoArray[idxKind][0]]) {
					objInput.checked = "checked";
				}
			}

			break;

		}


		objTr = HtmlCreateElement("tr", objTbody);

		for (idxColumn = 0; idxColumn < buildInfoTable[idxRow].length; idxColumn++) {

			buildInfo = buildInfoTable[idxRow][idxColumn];

			objTd = HtmlCreateElement("td", objTr);

			// 空要素
			if (buildInfo.length < 2) {
				continue;
			}

			// チェックボックス方式
			else if (buildInfo.length == 2) {
				objInput = HtmlCreateElement("input", objTd);
				objInput.setAttribute("type", "checkbox");
				objInput.setAttribute("id", "OBJID_CHECK_A7_Skill" + buildInfo[0]);
				objInput.setAttribute("name", "A7_Skill" + buildInfo[0]);
				objInput.setAttribute("onclick", "StAllCalc() | Click_A7(1)");

				objLabel = HtmlCreateElement("label", objTd);
				objLabel.setAttribute("for", "OBJID_CHECK_A7_Skill" + buildInfo[0]);

				HtmlCreateTextNode(buildInfo[1], objLabel);

				if (n_A_PassSkill7[buildInfo[0]]) {
					objInput.checked = "checked";
				}
			}

			// セレクトボックス方式
			else {
				HtmlCreateTextNode(buildInfo[1], objTd);

				HtmlCreateTextNode("　", objTd);

				objSelect = HtmlCreateElement("select", objTd);
				objSelect.setAttribute("name", "A7_Skill" + buildInfo[0]);
				objSelect.setAttribute("onchange", "StAllCalc() | Click_A7(1)");

				for (idxValue = 0; idxValue < buildInfo[2].length; idxValue++) {
					HtmlCreateElementOption(idxValue, buildInfo[2][idxValue], objSelect);
				}

				objSelect.value = n_A_PassSkill7[buildInfo[0]];
			}
		}
	}

	// 期間限定効果行
	objTr = HtmlCreateElement("tr", objTbody);

	objTd = HtmlCreateElement("td", objTr);

	subInfoArray = [
		[42, "ATK"], [43, "MATK"], [44, "HIT"], [45, "FLEE"], [46, "Cri"], [47, "ASPD"],
	];

	for (idxKind = 0; idxKind < subInfoArray.length; idxKind++) {

		objSelect = HtmlCreateElement("select", objTd);
		objSelect.setAttribute("name", "A7_Skill" + subInfoArray[idxKind][0]);
		objSelect.setAttribute("onchange", "StAllCalc() | Click_A7(1)");

		HtmlCreateElementOption(0, "期間限定系[" + subInfoArray[idxKind][1] + "] なし", objSelect);
		for (idxValue = 1; idxValue <= 50; idxValue++) {

			optText = subInfoArray[idxKind][1] + "+" + idxValue;

			if (subInfoArray[idxKind][1] == "ASPD") {

				if (idxValue < 10) {
					continue;
				}

				optText += "%";

				switch (idxValue) {
				case 10:
					optText += "(=スピポ)";
					break;
				case 15:
					optText += "(=ハイスピ)";
					break;
				case 20:
					optText += "(=バサクP)";
					break;
				}
			}

			HtmlCreateElementOption(idxValue, optText, objSelect);
		}

		HtmlCreateElement("br", objTd);

		objSelect.value = n_A_PassSkill7[subInfoArray[idxKind][0]];
	}

	objTd = HtmlCreateElement("td", objTr);

	objSpan = HtmlCreateElement("span", objTd);
	objSpan.setAttribute("style", "font-size : smaller");

	HtmlCreateTextNode("左欄は期間限定イベントのアイテムや", objSpan);
	HtmlCreateElement("br", objSpan);
	HtmlCreateTextNode("イベントNPCからのパワーアップ効果用。", objSpan);
	HtmlCreateElement("br", objSpan);
	HtmlCreateTextNode("これらは同じ系列の他の食品と", objSpan);
	HtmlCreateElement("br", objSpan);
	HtmlCreateTextNode("競合する可能性があるので", objSpan);
	HtmlCreateElement("br", objSpan);
	HtmlCreateTextNode("ゲーム内では食品使ってると効果ないかも。", objSpan);
	HtmlCreateElement("br", objSpan);
	HtmlCreateTextNode("例：ASPD+%はスピポ系と競合。", objSpan);
	HtmlCreateElement("br", objSpan);
	HtmlCreateTextNode("STR+などは一般食品欄をお使い下さい。", objSpan);

	objTd = HtmlCreateElement("td", objTr);



	// 表示更新
	Click_A7(0);
}





function Click_NetCafe3(){
	with(document.calcForm){
		A7_Skill3.value = 10;
		A7_Skill4.value = 10;
		A7_Skill5.value = 10;
		A7_Skill6.value = 10;
		A7_Skill7.value = 10;
		A7_Skill8.value = 10;
		Click_A7(1);
	}
}





function Click_Food_Off(){
	with(document.calcForm){
		A7_Skill3.value = 0;
		A7_Skill4.value = 0;
		A7_Skill5.value = 0;
		A7_Skill6.value = 0;
		A7_Skill7.value = 0;
		A7_Skill8.value = 0;
		Click_A7(1);
	}
}

/**
 * アイテム(食品/他)の変更を反映する
 * @param {*} n 再計算フラグ（n = 1 再計算する）
 */
function Click_A7(n){
	if(n==1) AutoCalc("Click_A7");

	var sw=0;
	for(var i=0;i <n_A_PassSkill7.length;i++){
		if(n_A_PassSkill7[i] != 0){
			sw = 1;
			break;
		}
	}
	if(sw == 0){
		document.getElementById('A7TD').style.backgroundColor = "#DDDDFF";
		myInnerHtml("A7used","",0);
	}else{
		document.getElementById('A7TD').style.backgroundColor = "#FF7777";
		myInnerHtml("A7used","　<B>使用中</B>",0);
	}
 }



function OnChangePetSelect() {

	// ペット説明更新
	RefreshPetExplain();

	// 攻撃方法更新
	CAttackMethodAreaComponentManager.RebuildControls();

	// 共通処理へ合流
	Click_A8(1);
}

function RefreshPetExplain() {

	var petId = 0;

	var objSelect = null;
	var objSpan = null;

	// 説明欄オブジェクトを取得
	objSpan = document.getElementById("OBJID_SPAN_PET_EXPLAIN");

	if (!objSpan) {
		return;
	}

	// 説明欄クリア
	HtmlRemoveAllChild(objSpan);

	// 選択されているペットを取得
	petId = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_PET", 0);

	// 説明追記
	CItemInfoManager.AppendEfficiencyInfoSub(objSpan, CONST_DATA_KIND_PET, petId, true);

	// セット情報追記
	CItemInfoManager.AppendSetInfo(objSpan, PetIdToSetIdMap[petId], true);
}


function Click_Skill8SW(){

	var idx = 0;

	var petId = 0;
	var petDataArrayWork = null;

	var objSelect = null;



	with(document.calcForm){
		n_Skill8SW = A8_SKILLSW.checked;
		if(n_Skill8SW){
			var str;
			str = '<TABLE Border style="white-space:nowrap;"><TR><TD id="A8TD" Colspan="2" class="title"><input id="OBJID_CHECK_A8_SKILLSW" type="checkbox" name="A8_SKILLSW"onClick="Click_Skill8SW()"><label for="OBJID_CHECK_A8_SKILLSW">その他の支援/設定 (暫定追加機能)</label><SPAN id="A8used"></SPAN></TD></TR>';
			str += '<TR><TD>ペット：<select id="OBJID_SELECT_PET" name="A8_Skill0" onchange="StAllCalc() | OnChangePetSelect()"></select></TD><TD>親密度：<select id="OBJID_SELECT_PET_FRIENDLITY" name="A8_Skill17" onChange="StAllCalc() | Click_A8(1)"></select></TD></TR>';
			str += '<TR><TD colspan="2"><SPAN id="OBJID_SPAN_PET_EXPLAIN"></SPAN></TD></TR>';
			str += '<TR><TD id="EN801"></TD><TD id="EN802"></TD></TR>';
			str += '<TR><TD id="EN803"></TD><TD id="EN804"></TD></TR>';
			str += '<TR><TD id="EN822"></TD><TD id="EN823"></TD></TR>';
			str += '<TR><TD id="EN805"></TD><TD id="EN806"></TD></TR>';
			str += '<TR><TD Colspan="2" id="EN821"></TD></TR>';
			str += '<TR><TD id="EN807"></TD><TD id="EN808"></TD></TR>';
			str += '<TR><TD Colspan="2" id="EN809"></TD></TR>';
			str += '<TR><TD id="EN810"></TD><TD id="EN811"></TD></TR>';
			str += '<TR><TD id="EN812"></TD><TD id="EN813"></TD></TR>';
			str += '<TR><TD id="EN814"></TD><TD id="EN815"></TD></TR>';
			str += '<TR><TD id="EN819"></TD><TD id="EN820"></TD></TR>';
			str += '<TR><TD colspan="2"><Font size=2><B>これより下、自キャラクターがかけられた状態異常</B></Font></TD></TR>';
			str += '<TR><TD id="EN830"></TD><TD id="EN831"></TD></TR>';
			str += '<TR><TD id="EN832"></TD><TD id="EN833"></TD></TR>';
			str += '<TR><TD id="EN834"></TD><TD id="EN835"></TD></TR>';
			str += '<TR><TD id="EN836"></TD><TD id="EN837"></TD></TR>';
			str += '</TABLE>';
			myInnerHtml("ID_ETC",str,0);

			A8_SKILLSW.checked = 1;



			// ペットのセレクトボックスを構築

			// ペットのデータを複製して読み仮名ソート
			petDataArrayWork = PET_OBJ.slice();
			petDataArrayWork.sort(
				function(a, b) {
					if (a[PET_DATA_INDEX_KANA] < b[PET_DATA_INDEX_KANA]) return -1;
					if (a[PET_DATA_INDEX_KANA] > b[PET_DATA_INDEX_KANA]) return 1;
					return 0;
				}
			);

			// ペットセレクトボックスへ追加
			objSelect = document.getElementById("OBJID_SELECT_PET");
			for (idx = 0; idx < petDataArrayWork.length; idx++) {
				petId = petDataArrayWork[idx][PET_DATA_INDEX_ID];
				HtmlCreateElementOption(PET_OBJ[petId][PET_DATA_INDEX_ID], PET_OBJ[petId][PET_DATA_INDEX_NAME], objSelect);
			}

			// 親密度セレクトボックスへ追加
			objSelect = document.getElementById("OBJID_SELECT_PET_FRIENDLITY");
			for (idx = FRIENDLITY_ID_AUTO; idx < FRIENDLITY_ID_COUNT; idx++) {
				HtmlCreateElementOption(idx, GetFriendlityText(idx), objSelect);
			}



			myInnerHtml("EN801",'戦闘教範系<select name="A8_Skill1" onChange="StAllCalc() | Click_A8(1)"></select>',0);
			var w_name=["なし","25","50","75","100","(125)","(150)"];
			for(i=0;i<=6;i++) A8_Skill1.options[i] = new Option(w_name[i],i);
			myInnerHtml("EN802",'Job教範系<select name="A8_Skill2" onChange="StAllCalc() | Click_A8(1)"></select>',0);
			var w_name=["なし","50","(75)","(100)"];
			for(i=0;i<=3;i++) A8_Skill2.options[i] = new Option(w_name[i],i);
			myInnerHtml("EN803",'ネットカフェ経験値UP<select name="A8_Skill3" onChange="StAllCalc() | Click_A8(1)"></select>',0);
			A8_Skill3.options[0] = new Option("-",0);
			for(i=1;i<=2;i++){
				var wy = 50 * i;
				var wx = (100 + wy) / 100;
				A8_Skill3.options[i] = new Option("+"+ wy +"%("+ wx +"倍)",i);
			}
			myInnerHtml("EN804",'経験値増加キャンペーン<select name="A8_Skill7" onChange="StAllCalc() | Click_A8(1)"></select>',0);
			A8_Skill7.options[0] = new Option("-",0);
			for(i=1;i<=8;i++){
				var wy = 25 * i;
				var wx = (100 + wy) / 100;
				A8_Skill7.options[i] = new Option(wx+"倍(+"+(25*i)+"%)",i);
			}
			myInnerHtml("EN822",'OTP<select name="A8_Skill22" onChange="StAllCalc() | Click_A8(1)"></select>',0);
			A8_Skill22.options[0] = new Option("ログインボーナスなし",0);
			A8_Skill22.options[1] = new Option("ブロンズ(Exp+5%)",1);
			A8_Skill22.options[2] = new Option("シルバー(↑＋スピードポーション)",2);
			A8_Skill22.options[3] = new Option("ゴールド(↑＋Hit+10/Flee+10)",3);
			A8_Skill22.options[4] = new Option("レインボー(↑＋MaxHP+20%/MaxSP+20%)",4);
			myInnerHtml("EN823",'←ジョンダパスはOTPレインボーです',0);
			myInnerHtml("EN805",'公平PT人数<select name="A8_Skill5" onChange="StAllCalc() | Click_A8(1)"></select>',0);
			A8_Skill5.options[0] = new Option("-",0);
			for(i=1;i<=11;i++) A8_Skill5.options[i] = new Option((i+1)+"人",i);
			myInnerHtml("EN806",'共闘ボーナス<select name="A8_Skill6" onChange="StAllCalc() | Click_A8(1)"></select>',0);
			A8_Skill6.options[0] = new Option("-",0);
			for(i=1;i<=20;i++) A8_Skill6.options[i] = new Option("+"+ (i*25) +"%",i);
			myInnerHtml("EN821",'討伐クエストのExpを加算(1匹あたりの値)<select name="A8_Skill21" disabled="disabled" onChange="StAllCalc() | Click_A8(1)"></select>',0);
			A8_Skill21.options[0] = new Option("-",0);
			A8_Skill21.options[1] = new Option("BaseExpで受け取る",1);
			A8_Skill21.options[2] = new Option("JobExpで受け取る",2);
			myInnerHtml("EN807",'<input id="OBJID_CHECK_A8_Skill4" type="checkbox" name="A8_Skill4"onClick="StAllCalc() | Click_A8(1)"><label for="OBJID_CHECK_A8_Skill4">結婚スパノビステータスALL+1付与</label>',0);
			myInnerHtml("EN808",'<input id="OBJID_CHECK_A8_Skill13" type="checkbox" name="A8_Skill13"onClick="StAllCalc() | Click_A8(1)||RebuildStatusSelect()||CalcStatusPoint(true)"><label for="OBJID_CHECK_A8_Skill13">養子状態にする</label>',0);

			myInnerHtml("EN809",'<font size="2" color="red">（時限性補助効果の設定は、「アイテム時限効果」設定欄へ移動しました）</font><input type="button" value="設定欄を表示" onclick="CTimeItemAreaComponentManager.FocusArea(0, true)">',0);

			myInnerHtml("EN810",'囲んでいる敵の数<select name="A8_Skill12" onChange="StAllCalc() | Click_A8(1)"></select>',0);
			for(i=0;i<=22;i++) A8_Skill12.options[i] = new Option(i + "匹",i);
			myInnerHtml("EN812",'<Font size=2><B>攻城戦の設定は[対人プレイヤー設定]欄に移動</B></Font>',0);
			myInnerHtml("EN813",'防衛値<select name="A8_Skill15" onChange="StAllCalc() | Click_A8(1)"></select><Font size=2>(攻城戦モード時のみ有効)</Font>',0);
			A8_Skill15.options[0] = new Option("-",0);
			for(i=1;i<=20;i++) A8_Skill15.options[i] = new Option(i * 5,i);
			myInnerHtml("EN814",'<input id="OBJID_CHECK_A8_Skill16" type="checkbox" name="A8_Skill16"onClick="StAllCalc() | Click_A8(1)"><label for="OBJID_CHECK_A8_Skill16">クリティカル率を0にする</label>',0);
			if(41 <= n_A_JOB && n_A_JOB <=43) myInnerHtml("EN819",'<input id="OBJID_CHECK_A8_Skill19" type="checkbox" name="A8_Skill19"onClick="StAllCalc() | Click_A8(1)"><label for="OBJID_CHECK_A8_Skill19"><Font size=2>暖かい風欄を他職からの武器属性付与にする<BR>　（素手Atk部分には武器属性付与が適用されない）</Font></label>',0);
			else myInnerHtml("EN819",'<input id="OBJID_CHECK_A8_Skill19" type="checkbox" name="A8_Skill19"onClick="StAllCalc() | Click_A8(1)"><label for="OBJID_CHECK_A8_Skill19"><Font size=2>武器属性付与をアカデミーの看板型付与にする<BR>　（素手Atk部分にも武器属性付与が適用される）</Font></label>',0);

			myInnerHtml("EN830",'クァグマイア<select name="A_IJYOU0" onChange="StAllCalc() | Click_A8(1)"></select>',0);
			A_IJYOU0.options[0] = new Option("-",0);
			for(i=1;i<=5;i++) A_IJYOU0.options[i] = new Option("Lv"+i+"(モンスターが使用)",i);
			for(i=6;i<=10;i++) A_IJYOU0.options[i] = new Option("Lv"+(i-5)+"(プレイヤーが使用)",i);

			myInnerHtml("EN831",'速度減少<select name="A_IJYOU1" onChange="StAllCalc() | Click_A8(1)"></select>',0);
			A_IJYOU1.options[0] = new Option("-",0);
			for(i=1;i<=10;i++) A_IJYOU1.options[i] = new Option("Lv"+i,i);
			A_IJYOU1.options[11] = new Option("Lv46",46);
			A_IJYOU1.options[12] = new Option("Lv48",48);

			myInnerHtml("EN832",'<input id="OBJID_CHECK_A_IJYOU2" type="checkbox" name="A_IJYOU2"onClick="StAllCalc() | Click_A8(1)"><label for="OBJID_CHECK_A_IJYOU2">毒</label>',0);

			myInnerHtml("EN833",'<input id="OBJID_CHECK_A_IJYOU3" type="checkbox" name="A_IJYOU3"onClick="StAllCalc() | Click_A8(1)"><label for="OBJID_CHECK_A_IJYOU3">呪い</label>',0);

			myInnerHtml("EN834",'スローキャスト<select name="A_IJYOU4" onChange="StAllCalc() | Click_A8(1)"></select>',0);
			A_IJYOU4.options[0] = new Option("-",0);
			for(i=1;i<=5;i++) A_IJYOU4.options[i] = new Option("Lv"+i,i);

			myInnerHtml("EN835",'<input id="OBJID_CHECK_A_IJYOU5" type="checkbox" name="A_IJYOU5"onClick="StAllCalc() | Click_A8(1)"><label for="OBJID_CHECK_A_IJYOU5">氷結<Font size=2>(ASPD-30%/DEF-10%/固定詠唱+50%)</Font></label>',0);

			myInnerHtml("EN836",'<input id="OBJID_CHECK_A_IJYOU6" type="checkbox" name="A_IJYOU6"onClick="StAllCalc() | Click_A8(1)"><label for="OBJID_CHECK_A_IJYOU6">(×)イヌハッカシャワー</label>',0);

			myInnerHtml("EN837",'<input id="OBJID_CHECK_A_IJYOU7" type="checkbox" name="A_IJYOU7"onClick="StAllCalc() | Click_A8(1)"><label for="OBJID_CHECK_A_IJYOU7">(×)ニャングラス</label>',0);

			A8_Skill0.value = n_A_PassSkill8[0];
			A8_Skill1.value = n_A_PassSkill8[1];
			A8_Skill2.value = n_A_PassSkill8[2];
			A8_Skill3.value = n_A_PassSkill8[3];
			A8_Skill4.checked = n_A_PassSkill8[4];
			A8_Skill5.value = n_A_PassSkill8[5];
			A8_Skill6.value = n_A_PassSkill8[6];
			A8_Skill7.value = n_A_PassSkill8[7];
			A8_Skill12.value = n_A_PassSkill8[12];
			A8_Skill13.checked = n_A_PassSkill8[13];
			A8_Skill15.value = n_A_PassSkill8[15];
			A8_Skill16.checked = n_A_PassSkill8[16];
			A8_Skill17.value = n_A_PassSkill8[17];
			A8_Skill19.checked = n_A_PassSkill8[19];
			A8_Skill21.value = n_A_PassSkill8[21];
			A8_Skill22.value = n_A_PassSkill8[22];
			A_IJYOU0.value = n_A_IJYOU[0];
			A_IJYOU1.value = n_A_IJYOU[1];
			A_IJYOU2.checked = n_A_IJYOU[2];
			A_IJYOU3.checked = n_A_IJYOU[3];
			A_IJYOU4.value = n_A_IJYOU[4];
			A_IJYOU5.checked = n_A_IJYOU[5];
			A_IJYOU6.checked = n_A_IJYOU[6];
			A_IJYOU7.checked = n_A_IJYOU[7];

			// ペット説明更新
			RefreshPetExplain();

		}else{
			var str;
			str = '<TABLE Border><TR><TD id="A8TD" class="title"><input id="OBJID_CHECK_A8_SKILLSW" type="checkbox" name="A8_SKILLSW"onClick="Click_Skill8SW()"><label for="OBJID_CHECK_A8_SKILLSW">その他の支援/設定 (暫定追加機能)</label><SPAN id="A8used"></SPAN></TD></TR></TABLE>';
			str += '';
			myInnerHtml("ID_ETC",str,0);
			A8_SKILLSW.checked = 0;
		}
		Click_A8(0);
	}
}

/**
 * その他の支援/設定 (暫定追加機能)の変更を反映する
 * @param {*} n 再計算フラグ（n = 1 再計算する）
 */
function Click_A8(n){
	if(n==1) AutoCalc("Click_A8");

	var sw=0;
	for(var i=0;i <n_A_PassSkill8.length;i++){
		if(n_A_PassSkill8[i] != 0){
			sw = 1;
			break;
		}
	}
	for(var i=0;i <n_A_IJYOU.length;i++) if(n_A_IJYOU[i] != 0){
		sw = 1;
		break;
	}
	if(sw == 0){
		document.getElementById('A8TD').style.backgroundColor = "#DDDDFF";
		myInnerHtml("A8used","",0);
	}else{
		document.getElementById('A8TD').style.backgroundColor = "#FF7777";
		myInnerHtml("A8used","　<B>使用中</B>",0);
	}
 }





/**
 * サイズ補正の倍率を取得する.
 * @param wSC_Size サイズ補正倍率の基礎値
 * @returns 最終サイズ補正倍率
 */
function GetSizeModify(mobData, wSC_Size) {

	// 騎兵修練習得時の、槍装備による、中型の１００％補正
	if (UsedSkillSearch(SKILL_ID_KIHE_SHUREN)) {
		if ((n_A_WeaponType == 4 || n_A_WeaponType == 5) && mobData[17] == 1) {
			wSC_Size = 1;
		}
	}

	// ドラゴントレーニング習得時の、槍装備による、全型１００％補正
	if (UsedSkillSearch(SKILL_ID_DRAGON_TRAINING)) {
		if (n_A_WeaponType==4 || n_A_WeaponType==5) wSC_Size = 1;
	}

	// 自己ウェポンパーフェクション使用時の、全型１００％補正（魔導ギア搭乗時を除く、Lv200解放アップデートで制限解除）
	if (UsedSkillSearch(SKILL_ID_WEAPON_PERFECTION)) {
		if ((_APPLY_UPDATE_LV200) || (UsedSkillSearch(SKILL_ID_MADOGEAR) == 0)) wSC_Size = 1;
	}

	// 支援ウェポンパーフェクション使用時の、全型１００％補正
	if (g_confDataNizi[CCharaConfNizi.CONF_ID_WEAPON_PERFECTION]) {
		wSC_Size = 1;
	}

	// ドレイクカード装着時の、全型１００％補正
	if (CardObjNew[n_A_card[CARD_REGION_ID_ARMS_RIGHT_1]][0] == 32
		|| CardObjNew[n_A_card[CARD_REGION_ID_ARMS_RIGHT_2]][0] == 32
		|| CardObjNew[n_A_card[CARD_REGION_ID_ARMS_RIGHT_3]][0] == 32
		|| CardObjNew[n_A_card[CARD_REGION_ID_ARMS_RIGHT_4]][0] == 32
		|| CardObjNew[n_A_card[CARD_REGION_ID_ARMS_LEFT_1]][0] == 32
		|| CardObjNew[n_A_card[CARD_REGION_ID_ARMS_LEFT_2]][0] == 32
		|| CardObjNew[n_A_card[CARD_REGION_ID_ARMS_LEFT_3]][0] == 32
		|| CardObjNew[n_A_card[CARD_REGION_ID_ARMS_LEFT_4]][0] == 32) wSC_Size = 1;

	// 大型オークヒーローの兜装備時の、全型１００％補正
	if (EquipNumSearch(1177)) wSC_Size = 1;

	// ＋１０スパルタカス装備時の、全型１００％補正
	if (EquipNumSearch(1802) && n_A_Weapon_ATKplus >= 10) wSC_Size = 1;

	// ＋９クイーン・アンズ・リベンジ装備時の、全型１００％補正
	if (n_A_HEAD_DEF_PLUS >= 9 && EquipNumSearch(2512)) wSC_Size = 1;

	// 騎兵修練【未習得】時の、セイヴザキング装備時による、全型１００％補正
	if (UsedSkillSearch(SKILL_ID_KIHE_SHUREN) == 0) {
		if (EquipNumSearch(ITEM_ID_SAVE_THE_KING)) wSC_Size = 1;
	}

	// ＋１０リンディーホップ装備時の、全型１００％補正
	if (n_A_Weapon_ATKplus >= 10 && EquipNumSearch(ITEM_ID_LINDY_HOP, EQUIP_REGION_ID_ARMS)) wSC_Size = 1;

	// ＋９ドレイクコート装備時の、全型１００％補正
	if (n_A_BODY_DEF_PLUS >= 9 && EquipNumSearch(ITEM_ID_DRAKE_COAT)) wSC_Size = 1;

	// 天秤宮セット装備時の、全型１００％補正
	if (EquipNumSearch(ITEM_SET_ID_TENBINKYU_SET)) wSC_Size = 1;

	// 「スナイピングシューズ」の、スキル習得による、全型１００％補正
	if ((itemCount = EquipNumSearch(ITEM_ID_SNIPING_SHOES)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_AIMED_BOLT) >= 10) {
			wSC_Size = 1;
		}
	}

	// 「黒色-OS」の、精錬による、全型１００％補正
	itemCountRight = EquipNumSearch(ITEM_ID_KOKUSHOKU_OS, EQUIP_REGION_ID_ARMS);
	if (itemCountRight > 0 && n_A_Weapon_ATKplus >= 10) {
		wSC_Size = 1;
	}
	itemCountLeft = EquipNumSearch(ITEM_ID_KOKUSHOKU_OS, EQUIP_REGION_ID_ARMS_LEFT);
	if (itemCountLeft > 0 && n_A_Weapon2_ATKplus >= 10) {
		wSC_Size = 1;
	}

	// 「バーニングナックル-OS」の、精錬による、全型１００％補正
	itemCountRight = EquipNumSearch(ITEM_ID_BURNING_KNUCKLE_OS, EQUIP_REGION_ID_ARMS);
	if (itemCountRight > 0 && n_A_Weapon_ATKplus >= 10) {
		wSC_Size = 1;
	}
	itemCountLeft = EquipNumSearch(ITEM_ID_BURNING_KNUCKLE_OS, EQUIP_REGION_ID_ARMS_LEFT);
	if (itemCountLeft > 0 && n_A_Weapon2_ATKplus >= 10) {
		wSC_Size = 1;
	}

	// ＋８デモニッシュソード装備時の、全型１００％補正
	if (n_A_Weapon_ATKplus >= 8 && EquipNumSearch(ITEM_ID_DEMONISH_SWORD, EQUIP_REGION_ID_ARMS)) {
		wSC_Size = 1;
	}
	if (n_A_Weapon2_ATKplus >= 8 && EquipNumSearch(ITEM_ID_DEMONISH_SWORD, EQUIP_REGION_ID_ARMS_LEFT)) {
		wSC_Size = 1;
	}

	// ラーヴァレザースーツセット装備時の、全型１００％補正
	if (EquipNumSearch(ITEM_SET_ID_RAVA_LEATHER_SUIT_SET)) wSC_Size = 1;

	// 森羅万象の指輪＋死の欲動セット装備時の、全型１００％補正
	if (EquipNumSearch(ITEM_SET_ID_SHINRA_BANSHONO_YUBIWA_SHINO_YOKUDO)) wSC_Size = 1;

	// 「氷炎悪神の刃鎌」の、精錬による、全型１００％補正
	itemCountRight = EquipNumSearch(ITEM_ID_HYOEN_AKUSHINNO_HAGAMA, EQUIP_REGION_ID_ARMS);
	if (itemCountRight > 0 && n_A_Weapon_ATKplus >= 10) {
		wSC_Size = 1;
	}
	itemCountLeft = EquipNumSearch(ITEM_ID_HYOEN_AKUSHINNO_HAGAMA, EQUIP_REGION_ID_ARMS_LEFT);
	if (itemCountLeft > 0 && n_A_Weapon2_ATKplus >= 10) {
		wSC_Size = 1;
	}

	// 「追撃者のシューズ」の、スキル習得による、全型１００％補正
	if ((itemCount = EquipNumSearch(ITEM_ID_TSUIGEKISHANO_SHOES)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_FAINT_BOMB) >= 10) {
			wSC_Size = 1;
		}
	}

	// 剛勇無双の甲胄＋剛勇無双の貫セット装備時の、全型１００％補正
	if (EquipNumSearch(ITEM_SET_ID_GOYUMUSONO_KACCHU_TSURANUKI)) wSC_Size = 1;

	// 再生の思念体シューズ＋熊の力セット装備時の、全型１００％補正
	if (EquipNumSearch(ITEM_SET_ID_SAISENO_SHINENTAI_SHOES_KUMANO_CHIKARA)) wSC_Size = 1;

	// ポルックスセット装備時の、全型１００％補正
	if (EquipNumSearch(ITEM_SET_ID_POLLUX_SET)) wSC_Size = 1;

	// 「アワリティアメタル」の、精錬による、全型１００％補正
	itemCountRight = EquipNumSearch(ITEM_ID_AVARITIA_METAL, EQUIP_REGION_ID_ARMS);
	if (itemCountRight > 0 && n_A_Weapon_ATKplus >= 10) {
		wSC_Size = 1;
	}
	itemCountLeft = EquipNumSearch(ITEM_ID_AVARITIA_METAL, EQUIP_REGION_ID_ARMS_LEFT);
	if (itemCountLeft > 0 && n_A_Weapon2_ATKplus >= 10) {
		wSC_Size = 1;
	}

	// 「ワースホイール」の、精錬による、全型１００％補正
	itemCountRight = EquipNumSearch(ITEM_ID_WRATH_WHEEL, EQUIP_REGION_ID_ARMS);
	if (itemCountRight > 0 && n_A_Weapon_ATKplus >= 10) {
		wSC_Size = 1;
	}
	itemCountLeft = EquipNumSearch(ITEM_ID_WRATH_WHEEL, EQUIP_REGION_ID_ARMS_LEFT);
	if (itemCountLeft > 0 && n_A_Weapon2_ATKplus >= 10) {
		wSC_Size = 1;
	}

	// 「ラースレック」の、精錬による、全型１００％補正
	itemCountRight = EquipNumSearch(ITEM_ID_WRATH_LECK, EQUIP_REGION_ID_ARMS);
	if (itemCountRight > 0 && n_A_Weapon_ATKplus >= 10) {
		wSC_Size = 1;
	}
	itemCountLeft = EquipNumSearch(ITEM_ID_WRATH_LECK, EQUIP_REGION_ID_ARMS_LEFT);
	if (itemCountLeft > 0 && n_A_Weapon2_ATKplus >= 10) {
		wSC_Size = 1;
	}

	// 「イラフィースト」の、精錬による、全型１００％補正
	itemCountRight = EquipNumSearch(ITEM_ID_IRA_FIST, EQUIP_REGION_ID_ARMS);
	if (itemCountRight > 0 && n_A_Weapon_ATKplus >= 10) {
		wSC_Size = 1;
	}
	itemCountLeft = EquipNumSearch(ITEM_ID_IRA_FIST, EQUIP_REGION_ID_ARMS_LEFT);
	if (itemCountLeft > 0 && n_A_Weapon2_ATKplus >= 10) {
		wSC_Size = 1;
	}

	// 「インペリアルクルシフォームスーツ」の、スキル習得による、全型１００％補正
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_CRUCIFORM_SUIT)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_MUCHANAGE) >= 10) {
			wSC_Size = 1;
		}
	}

	// 「グレースクルシフォームスーツ」の、スキル習得による、全型１００％補正
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_CRUCIFORM_SUIT)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_MUCHANAGE) >= 10) {
			wSC_Size = 1;
		}
	}

	// 「覚醒栄光を讃えし王剣」の、精錬による、全型１００％補正
	itemCountRight = EquipNumSearch(ITEM_ID_KAKUSE_EIKOWO_TATAESHI_OKEN, EQUIP_REGION_ID_ARMS);
	if (itemCountRight > 0 && n_A_Weapon_ATKplus >= 9) {
		wSC_Size = 1;
	}
	itemCountLeft = EquipNumSearch(ITEM_ID_KAKUSE_EIKOWO_TATAESHI_OKEN, EQUIP_REGION_ID_ARMS_LEFT);
	if (itemCountLeft > 0 && n_A_Weapon2_ATKplus >= 9) {
		wSC_Size = 1;
	}

	// 「鬼神の盟友」の、スキル習得による、全型１００％補正
	if ((itemCount = EquipNumSearchMIG(ITEM_ID_KISHINNO_MEIYU)) > 0) {
		if (LearnedSkillSearch(SKILL_ID_TENKETSU_HAN) >= 5) {
			wSC_Size = 1;
		}
	}



	// 特性
	if (n_tok[ITEM_SP_SIZE_PERFECTION] > 0) {
		wSC_Size = 1;
	}

	// 計算データ出力用
	else if (wSC_Size > 0) {
		n_tok[ITEM_SP_SIZE_PERFECTION] = wSC_Size;
	}



	// TODO: データ移行過渡処理
	// 計算したSP効果を、移行前のデータ形式に変換して、加算する
	if (IsEnableMigrationBlockTransit()) {

		var spTag = null;

		spTag = new CMigEquipableSpTag()
			.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_PERFECTION);

		if (0 < g_charaDataManager.GetCharaData(MIG_CHARA_MANAGER_ID_MAIN).GetSpValue(spTag, null, MIG_EFFECTIVE_SP_CALC_MODE_MAX)) {
			wSC_Size = 1;
			n_tok[ITEM_SP_SIZE_PERFECTION] = Math.max(n_tok[ITEM_SP_SIZE_PERFECTION], wSC_Size);
		}
		else if (0 < g_charaDataManager.GetCharaData(MIG_CHARA_MANAGER_ID_MAIN).GetSetSpValue(spTag, null, MIG_EFFECTIVE_SP_CALC_MODE_MAX)) {
			wSC_Size = 1;
			n_tok[ITEM_SP_SIZE_PERFECTION] = Math.max(n_tok[ITEM_SP_SIZE_PERFECTION], wSC_Size);
		}
	}



	return wSC_Size;
}





//================================================================================================================================
//================================================================================================================================
//
// 通常攻撃時のパッシブ発動系スキル関連関数
//
//================================================================================================================================
//================================================================================================================================

/**
 * 三段掌の基本発動率を取得する.
 */
function GetBaseRateSandansho(mobData) {

	var sklLv = 0;
	var rate = 0;

	sklLv = UsedSkillSearch(SKILL_ID_SANDANSHO);

	if (sklLv > 0) {
		rate = Math.max(rate, 30 - sklLv);
	}

	return rate;
}

/**
 * フィアーブリーズの基本発動率を取得する.
 */
function GetBaseRateFearBleath(mobData) {

	var aBaserate = [0, 20, 20, 35, 45, 50];		// 基本発動率

	var rate = 0;

	// 弓装備時限定
	if (n_A_WeaponType == ITEM_KIND_BOW) {
		rate = Math.max(rate, aBaserate[UsedSkillSearch(SKILL_ID_FEAR_BLEATH)]);
	}

	return rate;
}

/**
 * DAの基本発動率を取得する.
 */
function GetBaseRateDA(mobData) {

	var rate = 0;

	// 素手では発動しない
	if (n_A_WeaponType == ITEM_KIND_NONE) {
		return 0;
	}

	// 草系に対する二刀流時の発動率計算機補正
	if (5 <= mobData[21] && mobData[21] <= 9 && n_Nitou == 1) {
		return 0;
	}

	// スキル習得による効果
	rate = Math.max(rate, 5 * UsedSkillSearch(SKILL_ID_DOUBLE_ATTACK));


	return rate;
}





/**
 * 三段掌の実質発動率を取得する.
 */
function GetActRateSandansho(skillId, mobData) {

	switch (skillId) {
	case SKILL_ID_TUZYO_KOGEKI:
	case SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT:
		break;

	// 通常攻撃（右手）以外は発動しない
	default:
		return 0;
	}

	return GetBaseRateSandansho(mobData);
}

/**
 * 三段掌の実質発動命中率を取得する.
 */
function GetActHitRateSandansho(skillId, mobData) {
	return GetActRateSandansho(skillId, mobData) * w_HIT / 100;
}



/**
 * フィアーブリーズの実質発動率を取得する.
 */
function GetActRateFearBleath(skillId, mobData) {

	var rate = 0;

	rate = (100 - GetActRateSandansho(skillId, mobData)) * GetBaseRateFearBleath(mobData) / 100;

	rate = Math.min(100, Math.max(0, rate));

	return rate;
}

/**
 * フィアーブリーズの実質発動命中率を取得する.
 */
function GetActHitRateFearBleath(skillId, mobData) {

	var rate = GetActRateFearBleath(skillId, mobData);

	// 対プレイヤーの場合、防御側の完全回避を考慮
	if (mobData[0] == MONSTER_ID_PLAYER && n_B_TAISEI[MOB_CONF_PLAYER_ID_LUCKY] > 0) {
		rate *= (100 - n_B_TAISEI[MOB_CONF_PLAYER_ID_LUCKY]) / 100;
	}

	return rate * w_HIT / 100;
}



/**
 * DAの実質発動率を取得する.
 */
function GetActRateDA(skillId, mobData) {

	var rate = 0;

	rate = (100 - GetActRateSandansho(skillId, mobData) - GetActRateFearBleath(skillId, mobData)) * GetBaseRateDA(mobData) / 100;

	rate = Math.min(100, Math.max(0, rate));

	return rate;
}

/**
 * DAの実質発動命中率を取得する.
 */
function GetActHitRateDA(skillId, mobData) {

	var rate = GetActRateDA(skillId, mobData);

	// 対プレイヤーの場合、防御側の完全回避を考慮
	if (mobData[0] == MONSTER_ID_PLAYER && n_B_TAISEI[MOB_CONF_PLAYER_ID_LUCKY] > 0) {
		rate *= (100 - n_B_TAISEI[MOB_CONF_PLAYER_ID_LUCKY]) / 100;
	}

	return rate * w_HIT / 100;
}



/**
 * クリティカルの実質発動率を取得する.
 */
function GetActRateCritical(skillId, mobData) {

	var rate = 0;

	rate = (100 - GetActRateSandansho(skillId, mobData)) * w_Cri / 100;

	return rate;
}

/**
 * クリティカルの実質発動命中率を取得する.
 */
function GetActHitRateCritical(skillId, mobData) {

	var rate = GetActRateCritical(skillId, mobData);

	// 対プレイヤーの場合、防御側の完全回避を考慮
	if (mobData[0] == MONSTER_ID_PLAYER && n_B_TAISEI[MOB_CONF_PLAYER_ID_LUCKY] > 0) {
		rate *= (100 - n_B_TAISEI[MOB_CONF_PLAYER_ID_LUCKY]) / 100;
	}

	return rate * 100 / 100;	// クリティカルは必中
}



/**
 * 通常攻撃の実質発動率を取得する.
 */
function GetActRateNormal(skillId, mobData) {

	var rate = 0;

	rate = (100 - GetActRateSandansho(skillId, mobData) - GetActRateFearBleath(skillId, mobData) - GetActRateDA(skillId, mobData));

	return rate;
}

/**
 * 通常攻撃の実質発動命中率を取得する.
 */
function GetActHitRateNormal(skillId, mobData) {

	var rate = GetActRateNormal(skillId, mobData);

	// 対プレイヤーの場合、防御側の完全回避を考慮
	if (mobData[0] == MONSTER_ID_PLAYER && n_B_TAISEI[MOB_CONF_PLAYER_ID_LUCKY] > 0) {
		rate *= (100 - n_B_TAISEI[MOB_CONF_PLAYER_ID_LUCKY]) / 100;
	}

	return rate * w_HIT / 100;
}



/**
 * 素振りの実質発動命中率を取得する.
 */
function GetActHitRateAll(skillId, mobData) {

	var rate = 0;

	rate = GetActHitRateSandansho(skillId, mobData);
	rate += GetActHitRateFearBleath(skillId, mobData);
	rate += GetActHitRateDA(skillId, mobData);
	rate += GetActHitRateCritical(skillId, mobData);
	rate += GetActHitRateNormal(skillId, mobData);

	// 必中ＨＩＴを満たしている場合
	if(w_HIT >= 100) {
		rate = 100;
	}

	// クリティカル率１００％を超えている場合
	if(w_Cri >= 100 && GetActRateSandansho(skillId, mobData) == 0 && GetBaseRateDA(mobData) == 0) {
		rate = 100;
	}

	return rate;
}



/**
 * ○○の怒り系によるＡＴＫ増加効果を取得する.
 */
function GetIkariPow(mobData) {

	// ○○の怒り系によるＡＴＫ増加効果
	var bEffective = false;
	var pow = 0;
	var powWork = 0;
	var lvWork = 0;
	var effectMax = 0;

	// 複数の怒り系をパッシブで設定できるようにするため、適切な怒りを検索する
	while (true) {

		// 星の怒り
		if ((lvWork = UsedSkillSearch(SKILL_ID_HOSHINO_IKARI)) > 0) {

			bEffective = true;

			// 太陽と月と星の奇跡発動中は、条件不問
			if (UsedSkillSearch(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KISEKI) > 0) {
			}

			// 対プレイヤーの場合は、条件不問
			else if (mobData[MONSTER_DATA_INDEX_ID] == MONSTER_ID_PLAYER) {
			}

			// 上記以外は、条件チェック
			else {
				bEffective &= (mobData[MONSTER_DATA_INDEX_SIZE] == SIZE_ID_LARGE);
				bEffective &= (mobData[MONSTER_DATA_INDEX_HP] >= 20000);
			}

			// 有効な場合は、倍率を設定して、処理用ループを抜ける
			if (bEffective) {
				powWork = n_A_BaseLV + n_A_STR + n_A_LUK + n_A_DEX;
				effectMax = 70 * lvWork;
				break;
			}
		}

		// 月の怒り
		if ((lvWork = UsedSkillSearch(SKILL_ID_TSUKINO_IKARI)) > 0) {

			bEffective = true;

			// 対プレイヤーの場合は、条件不問
			if (mobData[MONSTER_DATA_INDEX_ID] == MONSTER_ID_PLAYER) {
			}

			// 上記以外は、条件チェック
			else {
				bEffective &= (mobData[MONSTER_DATA_INDEX_SIZE] == SIZE_ID_MEDIUM);
				bEffective &= (mobData[MONSTER_DATA_INDEX_HP] >= 6000);
			}

			// 有効な場合は、倍率を設定して、処理用ループを抜ける
			if (bEffective) {
				powWork = n_A_BaseLV + n_A_LUK + n_A_DEX;
				effectMax = 50 * lvWork;
				break;
			}
		}

		// 太陽の怒り
		if ((lvWork = UsedSkillSearch(SKILL_ID_TAIYONO_IKARI)) > 0) {

			bEffective = true;

			// 対プレイヤーの場合は、条件不問
			if (mobData[MONSTER_DATA_INDEX_ID] == MONSTER_ID_PLAYER) {
			}

			// 上記以外は、条件チェック
			else {
				bEffective &= (mobData[MONSTER_DATA_INDEX_SIZE] == SIZE_ID_SMALL);
			}

			// 有効な場合は、倍率を設定して、処理用ループを抜ける
			if (bEffective) {
				powWork = n_A_BaseLV + n_A_LUK + n_A_DEX;
				effectMax = 50 * lvWork;
				break;
			}
		}

		bEffective = false;

		break;
	}

	pow = 100 + Math.min(effectMax, Math.floor(powWork / (12 - lvWork * 3)));

	return pow;
}

/**
 * 各種パラメータ変更時の自動計算機能
 * @param {*} callFrom 関数呼び出し元
 * 						undefined									: 基本ステータス、特性ステータス、装備
 * 						CConfBase.OnChangeValueHandler				: 支援設定、性能カスタマイズ
 * 						OnChangeMobConfDebuf						: モンスター状態異常設定
 * 						OnChangeMobConfBuf							: モンスター状態強化設定
 * 						OnChangeMobConfPlayer						: 対プレイヤー設定
 * 						OnChangeSettingAutoSpell					: オートスペル設定 (テスト中)
 * 						CTimeItemAreaComponentManager.OnChangeConf	: アイテム時限効果
 * 						RefreshSkillColumnHeaderLearned				: 習得スキル（装備効果用）
 * 						Click_A1									: パッシブ持続系
 * 						Click_A3									: 演奏/踊り系スキル
 * 						Click_A4									: ギルドスキル/ゴスペル/他
 * 						Click_A7									: アイテム(食品/他)
 * 						Click_A8									: その他の支援/設定 (暫定追加機能)
 * 				CAttackMethodAreaComponentManager.OnChangeAutoCalc	: 攻撃手段
 * 		CAttackMethodAreaComponentManager.OnChangeAttackMethodOption: 攻撃手段オプション
 * 			CAttackMethodAreaComponentManager.OnChangeAttackMethod	: 自動計算のON/OFF
 */
function AutoCalc(callFrom) {
	// 自動設定が有効の場合のみ、再計算する
	var autoCalcFlag = HtmlGetObjectValueByIdAsInteger("OBJID_INPUT_ATTACK_METHOD_AUTO_CALC", 0);
	switch (autoCalcFlag) {
		case 1: // 攻撃方法変更時に自動で再計算する
			if (callFrom === "CAttackMethodAreaComponentManager.OnChangeAttackMethod"
				|| callFrom === "CAttackMethodAreaComponentManager.OnChangeAttackMethodOption"
				|| callFrom === "CAttackMethodAreaComponentManager.OnChangeAutoCalc"
				) {
					calc();
				}
		case 0: // 攻撃方法変更時に自動で再計算しない
			if (callFrom === "CConfBase.OnChangeValueHandler"
				|| callFrom === "OnChangeMobConfDebuf"
				|| callFrom === "OnChangeMobConfBuf"
				|| callFrom === "OnChangeMobConfPlayer"
				|| callFrom === "OnChangeSettingAutoSpell"
				|| callFrom === "CTimeItemAreaComponentManager.OnChangeConf"
				|| callFrom === "RefreshSkillColumnHeaderLearned"
				|| callFrom === "Click_A1"
				|| callFrom === "Click_A3"
				|| callFrom === "Click_A4"
				|| callFrom === "Click_A7"
				|| callFrom === "Click_A8"
				) {
					calc();
				}
			break;
		case 2:	// 全ての項目変更時に自動で再計算しない
			break;
		case 3: // 全ての項目変更時に自動で再計算する
			calc();
			break;
	}
}

//================================================================================================================================
//================================================================================================================================
//
// calc関数
//
//================================================================================================================================
//================================================================================================================================

function calc() {

	var w_EnkyoriSkill = [40,41,44,71,84,72,118,159,192,199,207,244,259,260,261,263,271,272,275,292,302,306,307,324,328,384,394,395,391,396,405,418,419,423,428,430,431,432,435,436,437,438,440,447,497,498,513,542,549,551,552,553,569,570,574,612,613,623,642,723,738,741,769,794];
	var w_MagicSkill = [37,46,47,51,52,53,54,55,56,57,122,124,125,126,127,128,130,131,132,133,407,408,409,410,411,412,413,414,415,476,478,518,519,520,527,528,529,530,531,532,662,663,666,667,658,659];

	var idx = 0;
	var idxArray = 0;

	var atkWork = 0;

	var charaData = null;
	var specData = null;
	var mobData = null;
	var attackMethodConfArray = null;



	if (_TEST_SETTINGS_APPLYING) {
		return;
	}



	str_bSUBname = "";
	str_bSUB = "";
	wbairitu = 100;
	not_use_card = 0;

	for (idx = 0; idx < g_damageTextArray.length; idx++) {
		g_damageTextArray[idx] = [];
	}





	// データ収集
	CCalcDataTextCreator.refBattleData = [];




	// ステータス等の計算（foot.js で定義しているアレ）
	var retValArray = null;
	retValArray = StAllCalc();

	// データの取りだし
	charaData = retValArray[0];
	specData = retValArray[1];
	mobData = retValArray[2];
	attackMethodConfArray = retValArray[3];



	//----------------------------------------------------------------
	//
	// 命中率の算出
	//
	//----------------------------------------------------------------

	// 魔法は必中
	if (w_MagicSkill.indexOf(n_A_ActiveSkill) >= 0) {
		w_HIT = 100;
		g_perfectHitRate = 0;
	}
	// 魔法は必中
	if ((g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_MAGICAL) == CSkillData.TYPE_MAGICAL) {
		w_HIT = 100;
		g_perfectHitRate = 0;
	}

	// それ以外は、命中率を計算
	else {
		// 基本確率
		w_HIT = 100 - (mobData[32] - charaData[CHARA_DATA_INDEX_HIT]);
		n_AS_HIT = w_HIT;

		// スキルによるHIT補正の適用
		w_HIT = Math.floor(w_HIT * (100 + GetHitModify()) / 100);

		// 必中スキルの補正
		// TODO: なぜここで？
		switch (n_A_ActiveSkill) {

		case SKILL_ID_CART_REVOLUTION:
		case SKILL_ID_APUCHAORURIGI:
		case SKILL_ID_SHIELD_BOOMERANG_TAMASHI:
		case SKILL_ID_SPELL_FIST:
			w_HIT = 100;
			break;
		}

		if (UsedSkillSearch(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO)) {
			w_HIT = 100;
		}

		// 確率範囲補正
		w_HIT = Math.min(100, Math.max(5, w_HIT));

		// 特定スキルの命中補正
		if (n_A_ActiveSkill == SKILL_ID_SHIELD_CHAIN) {
			w_HIT += 20;
		}

		// 確率範囲補正
		w_HIT = Math.min(100, Math.max(5, w_HIT));

		// ○○％の確率で必中　効果の適用
		//var wkHit = GetEquippedTotalSPEquip(86) + GetEquippedTotalSPCardAndElse(86);
		var wkHit = n_tok[ITEM_SP_PERFECT_ATTACK_UP];

		// シールドチェーンの特殊補正
		if (n_A_ActiveSkill == SKILL_ID_SHIELD_CHAIN) {
			// シールドチェーンには、必中効果が乗らない
			wkHit = 0;
		}



		// TODO: 必中効果保持用
		g_perfectHitRate = wkHit;



		if (wkHit > 0) {
			w_HIT = w_HIT + (100 - w_HIT) * wkHit / 100;
		}
		if (w_HIT > 100) {
			w_HIT = 100;
		}

		// フェイタルメナスの命中率減少ペナルティ
		if (n_A_ActiveSkill == SKILL_ID_FATAL_MENUS) {

			w_HIT -= Math.floor(w_HIT * (35 - 5 * n_A_ActiveSkillLV - (n_A_ActiveSkillLV >= 6 ? 5 : 0)) / 100);

			// 確率範囲補正
			w_HIT = Math.min(100, Math.max(5, w_HIT));
		}

		// 丸め処理
		w_HIT = Math.floor(w_HIT * 100)/100;
	}

	// 表示用変数にも設定
	w_HIT_HYOUJI = w_HIT;





	//----------------------------------------------------------------
	//
	// クリティカル率の算出
	//
	//----------------------------------------------------------------

	// スキルによる攻撃側クリティカル率の補正
	switch (n_A_ActiveSkill) {

	case SKILL_ID_SHARP_SHOOTING:
		charaData[CHARA_DATA_INDEX_CRI] += 20;
		break;

	case SKILL_ID_KAGEKIRI:
		charaData[CHARA_DATA_INDEX_CRI] += 25 + n_A_ActiveSkillLV * 5;
		break;

	}

	// 基本確率
	w_Cri = charaData[CHARA_DATA_INDEX_CRI];

	// スキルクリティカルの確率補正を適用したクリティカル率を取得
	w_Cri = g_skillManager.GetCriActRate(n_A_ActiveSkill, n_A_ActiveSkillLV, charaData, specData, mobData);

	// 敵のCRI耐性減算
	w_Cri -= ((mobData[MONSTER_DATA_INDEX_LEVEL] / 150) + (mobData[MONSTER_DATA_INDEX_LUK] / 5));

	// 睡眠状態ならば、クリティカル率２倍
	if (n_B_IJYOU[8]) {
		w_Cri *= 2;
	}

	// 必ずクリティカルするスキルのクリティカル率の補正
	switch (n_A_ActiveSkill) {

	case SKILL_ID_PINGPOINT_ATTACK:
		w_Cri = 100;
		break;

	}

	// 拳聖の「太陽と月と星の融合」状態による補正
	if (UsedSkillSearch(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO) > 0) {
		w_Cri = 100;
	}



	// 確率範囲補正
	w_Cri = Math.min(100, Math.max(0, w_Cri));



	TyouEnkakuSousa3dan = 0;



	//----------------------------------------------------------------
	//
	// 回避率の算出
	//
	//----------------------------------------------------------------

	// 対プレイヤーの場合、防御側の完全回避を考慮
	if(mobData[0] == MONSTER_ID_PLAYER && n_B_TAISEI[MOB_CONF_PLAYER_ID_LUCKY] > 0){
		// TODO: 考慮されてない
	}

	if(n_A_ActiveSkill==0 || n_A_ActiveSkill==SKILL_ID_SHARP_SHOOTING || n_A_ActiveSkill==401 || n_A_ActiveSkill==456 || n_A_ActiveSkill==578 || (n_A_ActiveSkill==86 && (50 <= mobData[18] && mobData[18] <60))){
		w_HIT_HYOUJI = Math.floor(GetActHitRateAll(n_A_ActiveSkill, mobData) * 100) /100;
		myInnerHtml("CRInum",(Math.round(GetActRateCritical(n_A_ActiveSkill, mobData) * 100) / 100) + SubName[0],0);
	}

	w_FLEE = 95 - (mobData[33] - charaData[CHARA_DATA_INDEX_FLEE]);

	// シーズモードでの回避率低下補正を加味するケース
	if (n_Ses == 1) {

		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
			break;

		default:
			w_FLEE = 95 - (mobData[33] - Math.floor(charaData[CHARA_DATA_INDEX_FLEE] * 0.8));
			break;

		}
	}

	// FLEE範囲補正
	w_FLEE = Math.min(95, Math.max(5, w_FLEE));

	myInnerHtml("BattleFLEE",Math.floor((w_FLEE + (100 - w_FLEE) * charaData[CHARA_DATA_INDEX_LUCKY] / 100) * 100) / 100,0);



	//----------------------------------------------------------------
	//
	// 遠距離属性、魔法攻撃属性の特定
	//
	//----------------------------------------------------------------

	// 近距離攻撃を仮定
	n_Enekyori = 0;

	// 通常攻撃の場合は、武器の遠距離属性を適用
	if (n_A_ActiveSkill == 0) {

		// 武器の遠距離属性を検査
		if (IsLongRange(n_A_Equip[EQUIP_REGION_ID_ARMS])) {
			n_Enekyori = 1;
		}

		// サモナースキル　ソウルアタックの効果
		else if (UsedSkillSearch(SKILL_ID_SOUL_ATTACK)) {
			n_Enekyori = 1;
		}
	}

	// スキル攻撃の場合は、スキルの射程を適用
	else {

		// 遠距離攻撃スキルの検査
		if (w_EnkyoriSkill.indexOf(n_A_ActiveSkill) >= 0) {
			n_Enekyori = 1;
		}

		// 魔法攻撃スキルの検査
		else if (w_MagicSkill.indexOf(n_A_ActiveSkill) >= 0) {
			n_Enekyori = 2;
		}
	}



	//----------------------------------------------------------------
	//
	// 【ＡＴＫ計算】サイズ補正の取得
	//
	//----------------------------------------------------------------

	wCSize = GetSizeModify(mobData, weaponsize[n_A_WeaponType][mobData[17]]);



	//----------------------------------------------------------------
	//
	// 【ＡＴＫ計算】攻撃力の基本となるステータスを決定（STR攻撃力）
	//
	//----------------------------------------------------------------

	// DEXベース武器ならば、DEXを設定
	if (IsDexBasedArms(n_A_WeaponType)) {
		w_STRDEX = n_A_DEX;
	}

	// 上記以外は、すべてSTRベース武器
	else {
		w_STRDEX = n_A_STR;
	}



	//----------------------------------------------------------------
	//
	// 【ＡＴＫ計算】STRボーナスを算出
	//
	//----------------------------------------------------------------
	var w_BONUS = 0;

	w_BONUS = Math.floor(w_STRDEX / 10);
	w_BONUS = Math.floor(w_BONUS * w_BONUS / 3);



	//----------------------------------------------------------------
	//
	// 【ＡＴＫ計算】武器ATKの算出（通常、クリティカル）
	//
	//----------------------------------------------------------------

	var w = 0;
	var refineAtk = 0;

	for(var i=0;i<=2;i++) {
		n_A_DMG_GX[i] = 0;
	}
	var wBukiAtk = [0,0,0];
	n_A_CriATK = [0,0,0];
	n_A_DMG = [0,0,0];

	var wBukiAtkLeft = [0,0,0];
	var wBukiAtkLeftCri = [0,0,0];



	//--------------------------------
	// 影狼・朧スキル「土符」の効果を算出
	//--------------------------------
	var tsuchifuAtkRate = 0;

	if (UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) == ELM_ID_EARTH) {
		tsuchifuAtkRate = Math.max(0, 10 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU));
	}

	//--------------------------------
	// 各種武器ATKの取得
	//--------------------------------

	// 右手系列
	refineAtk = charaData[CHARA_DATA_INDEX_REFINE_ATK];
	wBukiAtk = GetWeaponAtk(w_STRDEX, w_BONUS, n_A_WeaponType, n_A_WeaponLV, n_A_Weapon_ATK, wCSize,
							refineAtk, n_A_WeaponLV_Minplus, n_A_WeaponLV_Maxplus, tsuchifuAtkRate,
							n_A_ActiveSkill, mobData, false, false, false, false);

	n_A_CriATK = GetWeaponAtk(w_STRDEX, w_BONUS, n_A_WeaponType, n_A_WeaponLV, n_A_Weapon_ATK, wCSize,
							refineAtk, n_A_WeaponLV_Minplus, n_A_WeaponLV_Maxplus, tsuchifuAtkRate,
							n_A_ActiveSkill, mobData, true, false, false, false);

	// 左手系列
	if (n_Nitou) {
		refineAtk = charaData[CHARA_DATA_INDEX_REFINE_ATK] - n_A_WeaponLV_seirenATK + n_A_Weapon2LV_seirenATK;
		wBukiAtkLeft = GetWeaponAtk(w_STRDEX, w_BONUS, n_A_Weapon2Type, n_A_Weapon2LV, n_A_Weapon2_ATK, wCSize,
								refineAtk, n_A_Weapon2LV_Minplus, n_A_Weapon2LV_Maxplus, tsuchifuAtkRate,
								n_A_ActiveSkill, mobData, false, false, false, true);

		wBukiAtkLeftCri = GetWeaponAtk(w_STRDEX, w_BONUS, n_A_Weapon2Type, n_A_Weapon2LV, n_A_Weapon2_ATK, wCSize,
								refineAtk, n_A_Weapon2LV_Minplus, n_A_Weapon2LV_Maxplus, tsuchifuAtkRate,
								n_A_ActiveSkill, mobData, true, false, false, true);
	}

	// 以下、クリティカル未対応
	refineAtk = charaData[CHARA_DATA_INDEX_REFINE_ATK];
	n_A_DMG_QUAKE = GetWeaponAtk(w_STRDEX, w_BONUS, n_A_WeaponType, n_A_WeaponLV, n_A_Weapon_ATK, wCSize,
							refineAtk, n_A_WeaponLV_Minplus, n_A_WeaponLV_Maxplus, tsuchifuAtkRate,
							n_A_ActiveSkill, mobData, false, true, false, false);

	n_A_DMG_GX = GetWeaponAtk(w_STRDEX, w_BONUS, n_A_WeaponType, n_A_WeaponLV, n_A_Weapon_ATK, wCSize,
							refineAtk, n_A_WeaponLV_Minplus, n_A_WeaponLV_Maxplus, tsuchifuAtkRate,
							n_A_ActiveSkill, mobData, false, false, true, false);





	//----------------------------------------------------------------
	//
	// 【ＡＴＫ計算】ウォーグスキルの攻撃力を算出
	//
	//----------------------------------------------------------------

	BK_n_A_DMG_Wolf = [0,0,0];

	for (idx = 0; idx < BK_n_A_DMG_Wolf.length; idx++) {

		//--------------------------------
		// 基礎攻撃力
		//--------------------------------
		BK_n_A_DMG_Wolf[idx] = charaData[CHARA_DATA_INDEX_STATUS_ATK] + wBukiAtk[idx] - n_tok[ITEM_SP_ATK_PLUS];

		//--------------------------------
		// 強制無属性（倍率適用）
		//--------------------------------
		BK_n_A_DMG_Wolf[idx] = ApplyElementRatio(mobData, BK_n_A_DMG_Wolf[idx], ELM_ID_VANITY);

		//--------------------------------
		// 「トゥースオブウォーグ」の攻撃力増加
		//--------------------------------
		BK_n_A_DMG_Wolf[idx] += 10 * UsedSkillSearch(SKILL_ID_TOOTH_OF_WUG);

		//--------------------------------
		// 演奏スキル「ダンスウィズウォーグ」の攻撃力増加
		//--------------------------------
		if(n_A_PassSkill3[39] == 6){

			// ミンストレルとワンダラーの人数による効果の変化（上限７人）
			BK_n_A_DMG_Wolf[idx] += (2 * n_A_PassSkill3[40]) * Math.min(7, parseInt("" + n_A_PassSkill3[41], 10));
		}
	}







	// ★★★★★★★★★★★★★★★★
	// ★
	// ★ 戦闘計算情報用意
	// ★
	// ★★★★★★★★★★★★★★★★
	var battleCalcInfo = new CBattleCalcInfo();

	battleCalcInfo.criRate = GetActRateCritical(n_A_ActiveSkill, mobData);
	// 右手ATK
	battleCalcInfo.atkUnitArrayWpn[0] = wBukiAtk.slice(0, 3);
	battleCalcInfo.atkUnitArrayCri[0] = n_A_CriATK.slice(0, 3);
	// 左手ATK
	battleCalcInfo.atkUnitArrayWpn[1] = wBukiAtkLeft.slice();
	battleCalcInfo.atkUnitArrayCri[1] = wBukiAtkLeftCri.slice();
	// ウォーグATK
	battleCalcInfo.atkUnitArrayWug[0] = BK_n_A_DMG_Wolf.slice(0, 3);







	//----------------------------------------------------------------
	//
	// 【ダメージ計算】その他、特殊計算用攻撃力を用意
	//
	//----------------------------------------------------------------

	BK_n_A_DMG2 = [];		// オートスペル計算用攻撃力


	// 攻撃力初期設定
	for (idx = 0; idx < wBukiAtk.length; idx++) {
		BK_n_A_DMG2[idx] = wBukiAtk[idx];
		n_A_DMG[idx] = wBukiAtk[idx];
	}





	// ダメージ反転補正？（未整理）

	if(n_A_DMG[2] <0){
		var wBK = n_A_DMG[0];
		n_A_DMG[0] = n_A_DMG[2];
		n_A_DMG[2] = wBK;
		wBK = n_A_CriATK[0];
		n_A_CriATK[0] = n_A_CriATK[2];
		n_A_CriATK[2] = wBK;
	}





	//----------------------------------------------------------------
	//
	// 【ＡＴＫ計算】素手ATKの計算
	//
	// 2020年1月 スキル調整に伴う変更？
	// 素手 ATK に、強制無属性倍率がかかるようになった模様
	// 結果として、念属性へのダメージが減少
	// 修練にはかからない模様
	// テコン系の属性付与は、暖かい風扱いで、素手にも属性がかかるので、計算の対象にならない
	// （強制無属性スキルでも同様なので、攻撃属性ではなく、付与状態で判定するようにしている）
	//
	//----------------------------------------------------------------
	var charaStatusAtk = 0;
	var psycoFix = 0;

	// 素手ATK取得
	charaStatusAtk = charaData[CHARA_DATA_INDEX_STATUS_ATK];

	// 強制無属性倍率の算出
	if (GetLowerJobSeriesID(n_A_JOB) != JOB_SERIES_ID_TAEGKUON) {
		psycoFix = zokusei[mobData[MONSTER_DATA_INDEX_ELEMENT]][ELM_ID_VANITY];
	}
	else {
		psycoFix = zokusei[mobData[MONSTER_DATA_INDEX_ELEMENT]][HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_ARMS_ELEMENT", 0)];
	}

	// 強制無属性倍率の適用
	// （丸め処理の違いに注意のこと）
	if (psycoFix < 0) {
		charaStatusAtk = Math.ceil(charaData[CHARA_DATA_INDEX_STATUS_ATK] * (100 + psycoFix) / 100.0)
	}
	else if (psycoFix > 0) {
		charaStatusAtk = Math.floor(charaData[CHARA_DATA_INDEX_STATUS_ATK] * (100 + psycoFix) / 100.0)
	}



	//----------------------------------------------------------------
	//
	// 【ＡＴＫ計算】修練ＡＴＫの算出
	//
	//----------------------------------------------------------------

	// 下記のデータ格納に統合





	// ★★★★★★★★★★★★★★★★
	// ★
	// ★ 戦闘計算情報用意
	// ★
	// ★★★★★★★★★★★★★★★★

	battleCalcInfo.statusAtk = charaStatusAtk;
	battleCalcInfo.masteryAtk = TYPE_SYUUREN(mobData, attackMethodConfArray, false);
	battleCalcInfo.masteryAtkLeft = TYPE_SYUUREN(mobData, attackMethodConfArray, true);





	//----------------------------------------------------------------
	//
	// 【ダメージ計算】アースクエイク式計算の要否の判定（オートスペル「アースクエイク」の有無）
	//
	//----------------------------------------------------------------
	var wCH_AS_QUAKE = 0;

	for (idx = 0 ; idx < AUTO_SPELL_SETTING_COUNT; idx++) {

		var asId = n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_ID + idx];

		if (asId == undefined) {
			continue;
		}

		if (AutoSpellSkill[asId][2] == SKILL_ID_EARTH_QUAKE) {
			wCH_AS_QUAKE = 1;
		}
	}





	//----------------------------------------------------------------
	//
	// 【ダメージ計算】アースクエイク式計算（未解析）
	//
	//----------------------------------------------------------------
	if (
		(n_A_ActiveSkill == SKILL_ID_GRAND_CROSS)
		|| (n_A_ActiveSkill == SKILL_ID_EARTH_QUAKE)
		|| (wCH_AS_QUAKE == 1)
	) {

		var wBK_n_B0 = mobData[0];
		var wBK_n_B17 = mobData[17];
		var wBK_n_B18 = mobData[18];
		var wBK_n_B19 = mobData[19];
		var wBK_n_B20 = mobData[20];
		mobData[0] = 787;
		mobData[17] = 1;
		if(n_A_PassSkill8[13] == 1) mobData[17] = 0;
		mobData[18] = n_A_BodyZokusei * 10 + 1;
		mobData[19] = 7;
		mobData[20] = 0;
		n_A_DMG_QUAKE[0] = n_A_DMG_QUAKE[2];
		if(n_A_WeaponType == 10 || (17 <= n_A_WeaponType && n_A_WeaponType <= 21)){
			n_A_DMG_QUAKE[0] += 0;
			n_A_DMG_QUAKE[2] += 0;
		}else{
			n_A_DMG_QUAKE[0] += n_A_WeaponLV_Minplus;
			n_A_DMG_QUAKE[2] += n_A_WeaponLV_Maxplus;
		}
		n_A_DMG_QUAKE[1] = (n_A_DMG_QUAKE[0] + n_A_DMG_QUAKE[2]) / 2;
		var w = 0;
		w = w_STRDEX + w_BONUS;
		for(var i=0;i<=2;i++){
			n_A_DMG_QUAKE[i] += w;
			if(n_A_DMG_QUAKE[i] <0) n_A_DMG_QUAKE[i] = 0;
			n_A_DMG_QUAKE[i] += charaData[CHARA_DATA_INDEX_REFINE_ATK];
			if(UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) == 2 && UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU) >= 1){
				var wX = 10 * UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
				n_A_DMG_QUAKE[i] += ROUNDDOWN(n_A_DMG_QUAKE[i] * wX / 100);
			}
		}
		if(n_A_ActiveSkill == 810 || wCH_AS_QUAKE == 1){
			n_A_DMG_GX[0] = n_A_DMG_QUAKE[0];
			n_A_DMG_GX[1] = n_A_DMG_QUAKE[1];
			n_A_DMG_GX[2] = n_A_DMG_QUAKE[2];
		}
		var GXsize = GetSizeModify(mobData, weaponsize[n_A_WeaponType][mobData[17]]);
		for(var i=0;i<=2;i++) n_A_DMG_GX[i] = ROUNDDOWN(n_A_DMG_GX[i] * GXsize);
		if(n_A_WeaponType == 0 && charaData[CHARA_DATA_INDEX_REFINE_ATK] != 0){
			for(var i=0;i<=2;i++) n_A_DMG_GX[i] += charaData[CHARA_DATA_INDEX_REFINE_ATK];
		}
		if(g_confDataIchizi[CCharaConfIchizi.CONF_ID_MAGNUM_BREAK_ZYOTAI]){
			if(mobData[18] != 33 && mobData[18] != 34){
				for(var i=0;i<=2;i++){
					var w = ApplyElementRatio(mobData, n_A_DMG_GX[i],3);
					w = ROUNDDOWN(w / 5);
					n_A_DMG_GX[i] += w;
				}
			}
		}
		else if(UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON) && UsedSkillSearch(SKILL_ID_CANCEL_EDP_POISON_ATTACK) == 0){
			if(n_A_ActiveSkill == 810){
				for(var i=0;i<=2;i++){
					var w = ApplyElementRatio(mobData, n_A_DMG_GX[i],5);
					w = ROUNDDOWN(w / 4);
					n_A_DMG_GX[i] += w;
				}
			}
		}

		var w_Arrow = 0;

		switch (n_A_WeaponType) {
		case ITEM_KIND_BOW:
		case ITEM_KIND_MUSICAL:
		case ITEM_KIND_WHIP:
		case ITEM_KIND_HANDGUN:
		case ITEM_KIND_RIFLE:
		case ITEM_KIND_SHOTGUN:
		case ITEM_KIND_GATLINGGUN:
		case ITEM_KIND_GRENADEGUN:
			w_Arrow = GetEquippedTotalSPArrow(ITEM_SP_ATK_PLUS);
		}

		for(var i=0;i<=2;i++) n_A_DMG_GX[i] += n_tok[17] + w_Arrow;
		if(wCH_AS_QUAKE == 1) for(var i=0;i<=2;i++) n_A_DMG_GX[i] -= n_A_QUAKE_KIRI;
		for(var i=0;i<=2;i++) n_A_DMG_GX[i] = ApplyPhysicalSpecializeMonster(charaData, specData, mobData, n_A_DMG_GX[i]);
		var wBaiB = GetElementFieldDamageRatio();



		for(var i=0;i<=2;i++){
			n_A_DMG_GX[i] = ApplyElementRatio(mobData, n_A_DMG_GX[i],n_A_Weapon_zokusei);
			if(wBaiB != 0) n_A_DMG_GX[i] = ROUNDDOWN(n_A_DMG_GX[i] * (100 + wBaiB) / 100);
		}



		for(var i=0;i<=2;i++){
			n_A_DMG_GX[i] = BaiTaisei_A_SP(n_A_DMG_GX[i]);
			n_A_DMG_GX[i] += charaData[CHARA_DATA_INDEX_STATUS_ATK_GX];
		}
		if(n_A_DMG_GX[2] <0){
			var wBK = n_A_DMG_GX[0];
			n_A_DMG_GX[0] = n_A_DMG_GX[2];
			n_A_DMG_GX[2] = wBK;
		}
		mobData[0] = wBK_n_B0;
		mobData[17] = wBK_n_B17;
		mobData[18] = wBK_n_B18;
		mobData[19] = wBK_n_B19;
		mobData[20] = wBK_n_B20;
	}





	//----------------------------------------------------------------
	//
	// 【ダメージ計算】オートスペルダメージ計算
	//
	//----------------------------------------------------------------
	AS_Calc(charaData, specData, mobData, attackMethodConfArray, battleCalcInfo);





	//----------------------------------------------------------------
	//
	// 【ダメージ計算】ダメージ計算コア処理呼び出し
	//
	//----------------------------------------------------------------
	var battleCalcResultAll = null;

	// スキルIDを設定
	battleCalcInfo.skillId = n_A_ActiveSkill;
	battleCalcInfo.skillLv = n_A_ActiveSkillLV;

	battleCalcResultAll = BattleCalc999(battleCalcInfo, charaData, specData, mobData, attackMethodConfArray);





	//--------------------------------
	// 戦闘結果を出力
	//--------------------------------

	// TODO: これ、中にフックいれてMIG関数呼んでる
	// 詠唱／ディレイ表示
	BuildCastAndDelayHtml(mobData);

	// ダメージ
	BuildBattleResultHtml(charaData, specData, mobData, attackMethodConfArray);

	BuildBattleResultHtmlMIG(charaData, specData, mobData, attackMethodConfArray, battleCalcResultAll);





	//--------------------------------
	// calc()をトリガーにするその他の処理
	//--------------------------------
	BuildResistElementTinyHtml();
	RebuildActiveSkillRatioInfo(null, charaData, n_tok, mobData);
	RebuildSizeModifyRatioInfo(null, charaData, n_tok, mobData, wCSize);



	//----------------------------------------------------------------
	//
	// 計算ボタン付近の注意事項表示
	//
	//----------------------------------------------------------------
	var objTd = null;
	var objSpan = null;
	var objA = null;

	// 内容全削除
	objTd = document.getElementById("OBJID_TD_CALC_BUTTON_NOTICE");
	HtmlRemoveAllChild(objTd);

	// 状況に応じて追加

	if (g_skillManager.GetSkillName(attackMethodConfArray[0].GetSkillId()).indexOf("(×)") == 0) {

		objSpan = HtmlCreateElement("span", objTd);
		objSpan.setAttribute("class", "CSSCLS_GENERAL_COLOR_RED");

		HtmlCreateTextNode("※ダメージ計算式が実測されていないスキルです。", objSpan);
		HtmlCreateElement("br", objSpan);
		HtmlCreateTextNode("　計算結果を過信しすぎないよう、ご注意ください。", objSpan);
		HtmlCreateElement("br", objSpan);
	}

	if (UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON) && UsedSkillSearch(SKILL_ID_CANCEL_EDP_POISON_ATTACK) == 0) {

		if ((g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_PHYSICAL) == CSkillData.TYPE_PHYSICAL) {

			var checkedSkillIdArray = [
				SKILL_ID_BASH,
				SKILL_ID_MAGNUM_BREAK,
				SKILL_ID_GRAND_CROSS,
				SKILL_ID_EARTH_QUAKE,
			];

			// 本来は n_A_JOB で判定。四次職の確認ができていないので、ギロチンクロスのIDでチェック
			if (g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, JOB_ID_GILOTINCROSS).GetAttackSkillIdArray().concat(checkedSkillIdArray).indexOf(n_A_ActiveSkill) < 0) {
//			if (g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB).GetAttackSkillIdArray().concat(checkedSkillIdArray).indexOf(n_A_ActiveSkill) < 0) {

				objSpan = HtmlCreateElement("span", objTd);
				objSpan.setAttribute("class", "CSSCLS_GENERAL_COLOR_RED");

				HtmlCreateTextNode("※「エンチャントデッドリーポイズン」の効果が正しく計算されているか、", objSpan);
				HtmlCreateElement("br", objSpan);
				HtmlCreateTextNode("　実測での確認が取れていないスキルです。", objSpan);
				HtmlCreateElement("br", objSpan);
				HtmlCreateTextNode("　計算結果を過信しすぎないよう、ご注意ください。", objSpan);
				HtmlCreateElement("br", objSpan);
			}
		}
	}

	if (false) {

		objSpan = HtmlCreateElement("span", objTd);
		objSpan.setAttribute("class", "CSSCLS_GENERAL_COLOR_RED");

		HtmlCreateTextNode("※最近の大型アップデートについて、対応しきれていません。", objSpan);
		HtmlCreateElement("br", objSpan);
		HtmlCreateTextNode("　計算結果を過信しすぎないよう、ご注意ください。", objSpan);
		HtmlCreateElement("br", objSpan);
	}

	if ((n_Nitou) && (attackMethodConfArray[0].GetSkillId() == SKILL_ID_TUZYO_KOGEKI)) {

		objSpan = HtmlCreateElement("span", objTd);
		objSpan.setAttribute("class", "CSSCLS_GENERAL_COLOR_RED");

		HtmlCreateTextNode("※現在、二刀流の左手ダメージが正しく計算できていません。", objSpan);
		HtmlCreateElement("br", objSpan);
		HtmlCreateTextNode("　計算結果よりも低いダメージになりますので、ご注意ください。", objSpan);
		HtmlCreateElement("br", objSpan);
	}

	if (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA] == MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM) {

		objSpan = HtmlCreateElement("span", objTd);
		objSpan.setAttribute("class", "CSSCLS_GENERAL_COLOR_RED");

		HtmlCreateTextNode("※戦闘エリア『コロッセオ』での計算は、", objSpan);
		HtmlCreateElement("br", objSpan);
		HtmlCreateTextNode("　実際のゲームでのダメージと大きく異なる可能性があります。", objSpan);
		HtmlCreateElement("br", objSpan);

		HtmlCreateTextNode("　", objSpan);

		objA = HtmlCreateElement("a", objSpan);
		objA.setAttribute("href", "../kousin/note20211003.html");
		objA.setAttribute("target", "_blank");
		HtmlCreateTextNode("こちら", objA);

		HtmlCreateTextNode("の対応状況をご確認ください。", objSpan);
		HtmlCreateElement("br", objSpan);
	}

if (false) {
	if (attackMethodConfArray[0].GetSkillId() == SKILL_ID_WUG_BITE) {

		objSpan = HtmlCreateElement("span", objTd);

		HtmlCreateTextNode("※拘束に失敗するとゲーム内ではダメージが出ません。", objSpan);
		HtmlCreateElement("br", objSpan);
	}

	if (n_tok[ITEM_SP_SHORTRANGE_DAMAGE_UP] > 0) {

		objSpan = HtmlCreateElement("span", objTd);
		objSpan.setAttribute("class", "CSSCLS_GENERAL_COLOR_RED");

		HtmlCreateTextNode("※『近接物理攻撃で与えるダメージ＋○○％』の効果が設定されています。", objSpan);
		HtmlCreateElement("br", objSpan);

		HtmlCreateTextNode("　実際のゲームでのダメージと異なる場合がありますので、", objSpan);
		HtmlCreateElement("br", objSpan);

		HtmlCreateTextNode("　", objSpan);

		objA = HtmlCreateElement("a", objSpan);
		objA.setAttribute("href", "../kousin/note20210427.html");
		objA.setAttribute("target", "_blank");
		HtmlCreateTextNode("こちら", objA);

		HtmlCreateTextNode("の注意事項をご確認ください。", objSpan);
		HtmlCreateElement("br", objSpan);
	}

	if (EquipNumSearch(ITEM_ID_KAKUSE_FULL_FORCE) > 0) {

		objSpan = HtmlCreateElement("span", objTd);
		objSpan.setAttribute("class", "CSSCLS_GENERAL_COLOR_RED");

		HtmlCreateTextNode("※「覚醒フルフォース」のAtk上昇効果の効果量は、ゲーム内では未確認です。", objSpan);
		HtmlCreateElement("br", objSpan);

		HtmlCreateTextNode("　実際のゲームでのダメージと異なる場合がありますので、ご注意ください。", objSpan);
		HtmlCreateElement("br", objSpan);
	}

	if (CardNumSearch(CARD_ID_FUINSARETA_EFREET) > 0) {

		objSpan = HtmlCreateElement("span", objTd);
		objSpan.setAttribute("class", "CSSCLS_GENERAL_COLOR_RED");

		HtmlCreateTextNode("※「封印されたイフリート」のJobLvによる能力上昇効果の効果量は、ゲーム内では未確認です。", objSpan);
		HtmlCreateElement("br", objSpan);

		HtmlCreateTextNode("　実際のゲームでのダメージと異なる場合がありますので、ご注意ください。", objSpan);
		HtmlCreateElement("br", objSpan);
	}
}
	if (g_appliedAppendDamage) {

		objSpan = HtmlCreateElement("span", objTd);
		objSpan.setAttribute("class", "CSSCLS_GENERAL_COLOR_RED");

		HtmlCreateTextNode("※「△△属性物理攻撃力＋○○％」の効果は、マグナムブレイク状態と同系統です。", objSpan);
		HtmlCreateElement("br", objSpan);
		HtmlCreateTextNode("　最も効果の高いものが１つだけ適用されます。ただし、未確認の仕様がある可能性も否定できません。", objSpan);
		HtmlCreateElement("br", objSpan);
		HtmlCreateTextNode("　実際のゲームでのダメージと異なる場合がありますので、ご注意ください。", objSpan);
		HtmlCreateElement("br", objSpan);
	}





	var innerHtmlText = "";

	for (idx = 0; idx < g_damageTextArray.length; idx++) {

		innerHtmlText = "";

		for (idxArray = 0; idxArray < g_damageTextArray[idx].length; idxArray++) {

			// 数値でなければ、そのまま追記
			if (isNaN(g_damageTextArray[idx][idxArray])) {
				innerHtmlText += g_damageTextArray[idx][idxArray];
			}

			// 数値の場合は、３桁区切り適用
			else {
				innerHtmlText += __DIG3(g_damageTextArray[idx][idxArray]);
			}
		}

		myInnerHtml("strID_" + idx, innerHtmlText, 0);
	}





	// データ収集
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_ACTIVE_SKILL] = n_A_ActiveSkill;
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_ATTACK_ELEMENT] = n_A_Weapon_zokusei;
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_RANGE_FLAG] = n_Enekyori;

	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_STRDEX_BONUS] = w_BONUS;

	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_SIZE_MODIFY] = wCSize;
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_HIT_RATE] = w_HIT;
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_HIT_RATE_AUTO_SPELL] = n_AS_HIT;
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_HIT_RATE_DISP] = w_HIT_HYOUJI;
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_CRITICAL_RATE] = w_Cri;
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_AVOID_RATE] = w_FLEE;

	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_BASE_DAMAGE_MIN] = n_A_DMG[0];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_BASE_DAMAGE_AVE] = n_A_DMG[1];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_BASE_DAMAGE_MAX] = n_A_DMG[2];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_BASE_DAMAGE_MIN_GX] = n_A_DMG_GX[0];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_BASE_DAMAGE_AVE_GX] = n_A_DMG_GX[1];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_BASE_DAMAGE_MAX_GX] = n_A_DMG_GX[2];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_BASE_DAMAGE_MIN_QUAKE] = n_A_DMG_QUAKE[0];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_BASE_DAMAGE_AVE_QUAKE] = n_A_DMG_QUAKE[1];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_BASE_DAMAGE_MAX_QUAKE] = n_A_DMG_QUAKE[2];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_CRITICAL_ATK_MIN] = (n_A_ActiveSkill == SKILL_ID_TUZYO_KOGEKI) ? n_A_CriATK[0] : "（除外：スキル攻撃）";
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_CRITICAL_ATK_AVE] = (n_A_ActiveSkill == SKILL_ID_TUZYO_KOGEKI) ? n_A_CriATK[1] : "（除外：スキル攻撃）";
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_CRITICAL_ATK_MAX] = (n_A_ActiveSkill == SKILL_ID_TUZYO_KOGEKI) ? n_A_CriATK[2] : "（除外：スキル攻撃）";
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_ARMS_ATK_MIN] = wBukiAtk[0];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_ARMS_ATK_AVE] = wBukiAtk[1];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_ARMS_ATK_MAX] = wBukiAtk[2];

	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_HAND_ATK_PSYCO_FIX] = psycoFix;
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_HAND_ATK] = charaStatusAtk;

	// 呼び出し先グローバル
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_GUIDED_DAMAGE] = n_PerfectHIT_DMG;
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_ATTACK_COUNT_MIN] = g_AttackCount[0];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_ATTACK_COUNT_AVE] = g_AttackCount[1];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_ATTACK_COUNT_MAX] = g_AttackCount[2];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_DAMAGE_PER_SECOND] = g_dps;
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_FINAL_DAMAGE_MIN] = w_DMG[0];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_FINAL_DAMAGE_AVE] = w_DMG[1];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_FINAL_DAMAGE_MAX] = w_DMG[2];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_RECEIVE_DAMAGE_MIN] = w_HiDam[0];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_RECEIVE_DAMAGE_AVE] = g_receiveDamageAverage;
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_RECEIVE_DAMAGE_MAX] = w_HiDam[6];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_REFLECT_DAMAGE_MIN_RS] = wRef1[1];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_REFLECT_DAMAGE_AVE_RS] = wRef1[0];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_REFLECT_DAMAGE_MAX_RS] = wRef1[2];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_REFLECT_DAMAGE_MIN_SPEC] = wRef2[1];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_REFLECT_DAMAGE_AVE_SPEC] = wRef2[0];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_REFLECT_DAMAGE_MAX_SPEC] = wRef2[2];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_REFLECT_DAMAGE_MIN_SHIELD_SPELL] = wRef3[1];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_REFLECT_DAMAGE_AVE_SHIELD_SPELL] = wRef3[0];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_REFLECT_DAMAGE_MAX_SHIELD_SPELL] = wRef3[2];
	CCalcDataTextCreator.refBattleData[BATTLE_DATA_INDEX_RECEIVE_DAMAGE_AVOIDS] = g_receiveDamageAvoids;



}



/**
 * 武器ATKを取得する.
 */
function GetWeaponAtk(strdex, strBonus, armsType, armsLv, armsAtk, sizeModify,
						refineAtk, exRefineAtkMin, exRefineAtkMax, tsuchifuAtkRate,
						atkSkillId, mobData, bCri, bEQ, bGX, bLeft) {

	var idx = 0;

	var strPenalty = 0;
	var armsAtkActual = 0;
	var wpnAtkBase = 0;
	var dexAtk = 0;
	var appendElm = 0;
	var appendRatio = 0;
	var atkWork = 0;
	var atkArrow = 0;

	var itemCount = 0;
	var effectValue = 0;

	var wpnAtkArray = [0, 0, 0];
	var wpnAtkArrayCri = [0, 0, 0];
	var wpnAtkArrayGX = [0, 0, 0];



	//----------------------------------------------------------------
	//
	// 基礎となる武器ATKの算出
	//
	//----------------------------------------------------------------

	// STRペナルティを算出
	strPenalty = Math.max(0, Math.floor(armsAtk * 2 / 3) - Math.floor(Math.pow(Math.floor(strdex / 10), 2) * 4 / armsLv));

	// 武器固有ATKの算出
	armsAtkActual = Math.floor(armsAtk * (100 + 10 * armsLv) / 100);

	// 基礎武器ATKの算出（STRペナルティ込み）
	wpnAtkBase = Math.max(0, armsAtkActual - strPenalty);



	//----------------------------------------------------------------
	//
	// 通常武器ATKの算出
	//
	//----------------------------------------------------------------

	// ステ込み武器ATKの算出（最小、最大）

	// クリティカルの場合は、最小＝最大＝基礎武器ATKで固定
	if (bCri) {
		wpnAtkArray[0] = wpnAtkBase;
		wpnAtkArray[2] = wpnAtkBase;
	}

	// マキシマイズパワーが有効の場合は、最小＝最大＝基礎武器ATKで固定
	else if (UsedSkillSearch(SKILL_ID_MAXIMIZE_POWER) > 0 || g_confDataNizi[CCharaConfNizi.CONF_ID_MAXIMIZE_POWER] > 0) {
		wpnAtkArray[0] = wpnAtkBase;
		wpnAtkArray[2] = wpnAtkBase;
	}

	// 上記以外の場合は、DEX攻撃力によって変動する
	else {

		// DEX攻撃力の算出

		// DEXベース武器の場合
		if (IsDexBasedArms(armsType)) {
			dexAtk = Math.floor(Math.floor(n_A_DEX / 2) * (80 + 20 * armsLv) / 100) + Math.floor(armsAtk / 3);
		}

		// STRベース武器の場合
		else {
			dexAtk = Math.floor((armsAtk * 5 + n_A_DEX * (armsLv * 3 + 18) + 14) / 15);
		}


		// DEX攻撃力が基礎武器ATK以上の場合は、基礎武器ATKで一定
		if (dexAtk >= armsAtkActual) {
			wpnAtkArray[0] = wpnAtkBase;
			wpnAtkArray[2] = wpnAtkBase;
		}

		// そうでなければ、『DEX攻撃力－STRペナルティ』を最小値、基礎武器ATKを最大値として、ランダム
		else{
			wpnAtkArray[0] = dexAtk - strPenalty;
			wpnAtkArray[2] = wpnAtkBase;
		}
	}

	// 最小攻撃力の範囲補正
	wpnAtkArray[0] = Math.min(wpnAtkArray[0], wpnAtkArray[2]);

	// EQ用攻撃力計算の場合はここまで
	if (bEQ) {
		return wpnAtkArray;
	}

	//--------------------------------
	// 過剰精錬ATKの追加
	//--------------------------------
	if (IsEffectiveExceededRefinedAtkArms(armsType)) {
		wpnAtkArray[0] += exRefineAtkMin;
		wpnAtkArray[2] += exRefineAtkMax;
	}

	//--------------------------------
	// 武器ATK（平均）の算出
	//--------------------------------
	wpnAtkArray[1] = (wpnAtkArray[0] + wpnAtkArray[2]) / 2;



	//----------------------------------------------------------------
	//
	// 実武器ATKの算出
	//
	//----------------------------------------------------------------
	for (idx = 0; idx < wpnAtkArray.length; idx++) {

		// STR攻撃力、STRボーナスを追加
		wpnAtkArray[idx] += strdex + strBonus;

		// 範囲補正
		wpnAtkArray[idx] = Math.max(0, wpnAtkArray[idx]);

		// 精錬ATKを追加
		wpnAtkArray[idx] += refineAtk;

		// 土符の効果を追加
		wpnAtkArray[idx] += Math.floor(wpnAtkArray[idx] * tsuchifuAtkRate / 100);

		// GX用攻撃力の場合はここまで
		if (bGX) {
			continue;
		}

		// サイズ補正を適用
		wpnAtkArray[idx] = Math.floor(wpnAtkArray[idx] * sizeModify);

		// アイテム特性「武器攻撃力＋○○％」を適用
		// （実測検証の誤差から、サイズ補正を適用し切り捨てた後で、適用される模様）
		wpnAtkArray[idx] = Math.floor(wpnAtkArray[idx] * (100 + n_tok[ITEM_SP_WEAPON_ATK_UP]) / 100);
	}

	// GX用攻撃力の場合はここまで
	if (bGX) {
		return wpnAtkArray;
	}



	// TODO: ↓実態は「武器攻撃力＋○○％」なのでは？

	//----------------------------------------------------------------
	// 「執行者のシューズ」の、スキル習得による効果
	//----------------------------------------------------------------
	if ((itemCount = EquipNumSearch(ITEM_ID_SHIKKOUSHANO_SHOES)) > 0) {
		for (idx = 0; idx < wpnAtkArray.length; idx++) {
			effectValue = 4 * LearnedSkillSearch(SKILL_ID_WEAPON_CRUSH) * itemCount;
			wpnAtkArray[idx] = Math.floor((wpnAtkArray[idx]* (100 + effectValue)) / 100);
		}
	}



	//----------------------------------------------------------------
	//
	// 追加属性攻撃力を算出（右手のみ）
	//
	//----------------------------------------------------------------
	if (!bLeft) {

		let appendDamageElement = ELM_ID_VANITY;
		let appendDamageRate = 0;
		let funcSelectAppendDamage = (elmIdF, rateF) => {
			if (rateF > appendDamageRate) {
				appendDamageRate = rateF;
				appendDamageElement = elmIdF;
			}
			else if (rateF == appendDamageRate) {
				if (elmIdF < appendDamageElement) {
					appendDamageElement = elmIdF;
				}
			}
		};

		switch (atkSkillId) {

		// 追加属性ダメージ系が適用されないスキル
		case SKILL_ID_METEOR_ASSALT:
		case SKILL_ID_FAINT_BOMB:
			break;

		default:
			// 『△属性物理攻撃力+○○%』の効果が、マグナムブレイク状態と同様の効果であるため、計算式調整

			// 適用される効果を特定する（複数設定している場合、最も効果の高いものだけを適用する）
			// ＥＤＰは特殊扱いで、最後に判定するものとする

			// 時限効果「ボルケリン」カード（地、20%）
			if (TimeItemNumSearch(TIME_ITEM_ID_VOLCARING) > 0) {
				funcSelectAppendDamage(ELM_ID_EARTH, 20);
			}
			// マグナムブレイク状態（火、20%）
			if (g_confDataIchizi[CCharaConfIchizi.CONF_ID_MAGNUM_BREAK_ZYOTAI]) {
				funcSelectAppendDamage(ELM_ID_FIRE, 20);
			}
			// 時限効果「異境の統括者＋タートルジェネラル」セット（火、20%）
			if (TimeItemNumSearch(TIME_ITEM_ID_IKYONO_TOKATSUSHA_TURTLE_GENERAL) > 0) {
				funcSelectAppendDamage(ELM_ID_FIRE, 20);
			}
			// 時限効果「プラガリオン」カード（風、20%）
			if (TimeItemNumSearch(TIME_ITEM_ID_PLAGARION) > 0) {
				funcSelectAppendDamage(ELM_ID_WIND, 20);
			}
			// 時限効果「洞窟不凍花」カード（水、20%）
			if (TimeItemNumSearch(TIME_ITEM_ID_DOKUTSU_FUTOKA) > 0) {
				funcSelectAppendDamage(ELM_ID_WATER, 20);
			}

			// 時限効果「共感する者」カード（水、10%）
			if (TimeItemNumSearch(TIME_ITEM_ID_KYOKANSURU_MONO) > 0) {
				funcSelectAppendDamage(ELM_ID_WATER, 10);
			}
			// 時限効果「幸福を与える者」カード（地、10%）
			if (TimeItemNumSearch(TIME_ITEM_ID_KOFUKUWO_ATAERU_MONO) > 0) {
				funcSelectAppendDamage(ELM_ID_EARTH, 10);
			}
			// 時限効果「祈る者」カード（火、10%）
			if (TimeItemNumSearch(TIME_ITEM_ID_INORU_MONO) > 0) {
				funcSelectAppendDamage(ELM_ID_FIRE, 10);
			}
			// 時限効果「異境の統括者＋封印されたタートルジェネラル」セット（火、10%）
			if (TimeItemNumSearch(TIME_ITEM_ID_IKYONO_TOKATSUSHA_FUINSARETA_TURTLE_GENERAL) > 0) {
				funcSelectAppendDamage(ELM_ID_FIRE, 10);
			}
			// 時限効果「微笑む者」カード（風、10%）
			if (TimeItemNumSearch(TIME_ITEM_ID_HOHOEMU_MONO) > 0) {
				funcSelectAppendDamage(ELM_ID_WIND, 10);
			}
			// 時限効果「ラーヴァトード」カード（毒、10%）
			if (TimeItemNumSearch(TIME_ITEM_ID_LAVA_TODO) > 0) {
				funcSelectAppendDamage(ELM_ID_POISON, 10);
			}
			// 時限効果「変異キメラフルゴル」カード（聖、10%）
			if (TimeItemNumSearch(TIME_ITEM_ID_HENI_CHIMERA_FULGOR) > 0) {
				funcSelectAppendDamage(ELM_ID_HOLY, 10);
			}
			// 時限効果「下級ルガン」カード（闇、10%）
			if (TimeItemNumSearch(TIME_ITEM_ID_KAKYU_RGAN) > 0) {
				funcSelectAppendDamage(ELM_ID_DARK, 10);
			}

			// 性能カスタマイズの効果
			for (let loopElmId = ELM_ID_VANITY; loopElmId <= ELM_ID_UNDEAD; loopElmId++) {
				funcSelectAppendDamage(loopElmId, n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_VANITY + loopElmId]);
			}

			// （特殊扱い）エンチャントデッドリーポイズンの効果（毒、25%、対象スキル特殊）
			if (appendDamageRate == 0) {

				if (UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON) && (UsedSkillSearch(SKILL_ID_CANCEL_EDP_POISON_ATTACK) == 0)) {
						switch (atkSkillId) {

					// 習得できるスキルのうち効果が適用されないもの
					case SKILL_ID_SUNAMAKI:
					case SKILL_ID_ISHINAGE:
					case SKILL_ID_VENOM_SPLASHER:
					case SKILL_ID_POISON_REACT:
					case SKILL_ID_VENOM_KNIFE:
					case SKILL_ID_METEOR_ASSALT:
						break;

					// 習得できないスキルのうち効果が適用されないもの

					// 効果が適用されるもの
					default:
						if ((g_skillManager.GetSkillType(atkSkillId) & CSkillData.TYPE_PHYSICAL) == CSkillData.TYPE_PHYSICAL) {
							appendDamageRate = 25;
							appendDamageElement = ELM_ID_POISON;
						}
						break;
					}
				}
			}


			// 追加ダメージ計算
g_appliedAppendDamage = (appendDamageRate > 0);
			if (appendDamageRate > 0) {
				for (idx = 0; idx < wpnAtkArray.length; idx++) {
					atkWork = ApplyElementRatio(mobData, wpnAtkArray[idx], appendDamageElement);
					atkWork = ROUNDDOWN(atkWork * appendDamageRate / 100);
					wpnAtkArray[idx] += atkWork;
				}
			}
		}
	}



	//----------------------------------------------------------------
	//
	// 矢ATKを算出・加算、装備ATK増加効果を加算
	//
	//----------------------------------------------------------------
	atkArrow = 0;
	if (IsDexBasedArms(armsType)) {
		atkArrow = GetEquippedTotalSPArrow(ITEM_SP_ATK_PLUS);
	}

	for (idx = 0; idx < wpnAtkArray.length; idx++) {
		wpnAtkArray[idx] += atkArrow + n_tok[ITEM_SP_ATK_PLUS];
	}



	return wpnAtkArray;
}




/**
 * モンスターの防御力を適用する.
 * @param dmg ダメージ
 * @return 適用後のダメージ
 */
function _SUB_ApplyMonsterDefence(mobData, dmg){

	var bPenetrate = false;

	// DEF無視スキルのチェック
	switch(n_A_ActiveSkill) {
		case SKILL_ID_COUNTER_SLASH:	// カウンタースラッシュ
		case SKILL_ID_PIERCING_SHOT: 	// ピアーシングショット
		case SKILL_ID_SHADOW_STAB:		// シャドウスタブ
		case SKILL_ID_SPARK_BLASTER: 	// スパークブラスター
		case SKILL_ID_DRAGONIC_BREATH:	// ドラゴニックブレス
			bPenetrate = true;
	}

	// ハンドガン装備時のオンリーワンバレット
	if (n_A_ActiveSkill == SKILL_ID_ONLY_ONE_BULLET && n_A_WeaponType == ITEM_KIND_HANDGUN) {
		bPenetrate = true;
	}

	// ガトリングガン装備時のビジラントアットナイト
	if (n_A_ActiveSkill == SKILL_ID_VIGILANT_AT_NIGHT && n_A_WeaponType == ITEM_KIND_GATLINGGUN) {
		bPenetrate = true;
	}

	if(n_tok[ITEM_SP_PENETRATE_DEF_RACE_SOLID + mobData[MONSTER_DATA_INDEX_RACE]] >= 1) {
		bPenetrate = true;
	}
	// ITEM_SP_PENETRATE_DEF は代入されている値によって適用範囲が変化する
	// 一般モンスターのみ有効
	if(n_tok[ITEM_SP_PENETRATE_DEF] >= 1 && mobData[MONSTER_DATA_INDEX_BOSS_TYPE] == 0) {
		bPenetrate = true;
	}
	// BOSSを含むすべてのモンスターに有効
	if(n_tok[ITEM_SP_PENETRATE_DEF] >= 10) {
		bPenetrate = true;
	}

	// 太陽と月と星の融合
	if (UsedSkillSearch(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO)) {
		bPenetrate = true;
	}

	// ＋１０ギロチンブレードの人間種族防御無視
	if(n_A_Weapon_ATKplus >= 10 && mobData[MONSTER_DATA_INDEX_RACE] == RACE_ID_HUMAN && EquipNumSearch(2457)) {
		bPenetrate = true;
	}

	// 錐効果
	if (n_tok[ITEM_SP_KIRI_EFFECT] != 0) {
		bPenetrate = true;
	}

	// 除算DEFの適用
	if (!bPenetrate) {
		dmg = Math.floor(dmg * (4000 + mobData[13]) / (4000 + mobData[13] * 10));
	}

	// 特性ステータス対応
	// RES減衰の適用
	dmg = ApplyResResist(mobData, dmg);

	// 減算DEFの適用
	if (!bPenetrate) {
		dmg -= n_B_DEF2[0];
	}

	return dmg;
}

/**
 * モンスターの防御力と右手修練効果を適用する.
 * @param dmg ダメージ
 * @param lefthand 二刀左手フラグ（0以外:二刀左手、0:その他）
 * @return 適用後のダメージ
 */
function ApplyMonsterDefence(mobData, dmg, lefthand) {

	// モンスターの防御力を適用
	dmg = _SUB_ApplyMonsterDefence(mobData, dmg);
	if(dmg < 1) dmg = 0;

	// 二刀左手の場合、修練効果を適用し、終了
	if (lefthand != 0) {

		// 影狼／朧の場合
		if (IsSameJobClass(JOB_ID_KAGERO) || IsSameJobClass(JOB_ID_OBORO)) {
			dmg = Math.floor(dmg * (5 + UsedSkillSearch(SKILL_ID_HIDARITE_TANREN)) / 10);
		}
		// それ以外（アサ系）の場合
		else {
			dmg = Math.floor(dmg * (3 + UsedSkillSearch(SKILL_ID_HIDARITE_SHUREN)) / 10);
		}

		return dmg;
	}

	// 二刀流での通常攻撃の場合、かつ、素手でない場合、右手修練を適用
	if(n_Nitou && n_A_ActiveSkill==0){
		if(n_A_WeaponType != 0){
			// 影狼／朧の場合
			if (IsSameJobClass(JOB_ID_KAGERO) || IsSameJobClass(JOB_ID_OBORO)) {
				dmg = Math.floor(dmg * (70 + UsedSkillSearch(SKILL_ID_MIGITE_TANREN) * 10) /100);
			}
			// それ以外（アサシン系）の場合
			else {
				dmg = Math.floor(dmg * (50 + UsedSkillSearch(SKILL_ID_MIGITE_SHUREN) * 10) /100);
			}
		}
	}

	return Math.floor(dmg);
}





function TYPE_SYUUREN(mobData, attackMethodConfArray, bArmsLeft){

	if(NumSearch(n_A_ActiveSkill,n_SP_SKILL) != 0) return 0;

	var w = 0;

	//----------------------------------------------------------------
	// 「武器ごとの一般修練系」の効果
	//----------------------------------------------------------------
	switch (n_A_WeaponType) {

	case ITEM_KIND_NONE:
		w += 3 * UsedSkillSearch(SKILL_ID_TEKKEN);
		w += 10 * UsedSkillSearch(SKILL_ID_TAIRIGI);
		break;

	case ITEM_KIND_KNIFE:
		w += 4 * UsedSkillSearch(SKILL_ID_KEN_SHUREN);
		w += 10 * UsedSkillSearch(SKILL_ID_KEN_SHUREN_GENETIC);
		break;

	case ITEM_KIND_SWORD:
		w += 4 * UsedSkillSearch(SKILL_ID_KEN_SHUREN);
		w += 3 * UsedSkillSearch(SKILL_ID_ONO_SHUREN);
		w += 10 * UsedSkillSearch(SKILL_ID_KEN_SHUREN_GENETIC);
		break;

	case ITEM_KIND_SWORD_2HAND:
		w += 4 * UsedSkillSearch(SKILL_ID_RYOUTKEN_SHUREN);
		break;

	case ITEM_KIND_SPEAR:
	case ITEM_KIND_SPEAR_2HAND:
		if (IsSameJobClass(JOB_ID_RUNEKNIGHT)) {
			if (UsedSkillSearch(SKILL_ID_DRAGON_TRAINING) == 0) {
				w += 4 * UsedSkillSearch(SKILL_ID_YARI_SHUREN);
			}
			else {
				w += 10 * UsedSkillSearch(SKILL_ID_YARI_SHUREN);
			}
		}
		else {
			if (UsedSkillSearch(SKILL_ID_KIHE_SHUREN) == 0) {
				w += 4 * UsedSkillSearch(SKILL_ID_YARI_SHUREN);
			}
			else {
				w += 5 * UsedSkillSearch(SKILL_ID_YARI_SHUREN);
			}
		}
		break;

	case ITEM_KIND_AXE:
	case ITEM_KIND_AXE_2HAND:
		w += 3 * UsedSkillSearch(SKILL_ID_ONO_SHUREN);
		w += 5 * UsedSkillSearch(SKILL_ID_ONO_SHUREN_MECHANIC);
		break;

	case ITEM_KIND_CLUB:
		w += 3 * UsedSkillSearch(SKILL_ID_MACE_SHUREN);
		w += 4 * UsedSkillSearch(SKILL_ID_ONO_SHUREN_MECHANIC);

	case ITEM_KIND_KATAR:
		w += 3 * UsedSkillSearch(SKILL_ID_KATAR_SHUREN);
		break;

	case ITEM_KIND_BOOK:
		w += 3 * UsedSkillSearch(SKILL_ID_ADVANCED_BOOK);
		break;

	case ITEM_KIND_FIST:
		w += 3 * UsedSkillSearch(SKILL_ID_TEKKEN);
		break;

	case ITEM_KIND_MUSICAL:
		w += 3 * UsedSkillSearch(SKILL_ID_GAKKINO_RENSHU);
		break;

	case ITEM_KIND_WHIP:
		w += 3 * UsedSkillSearch(SKILL_ID_DANCENO_RENSHU);
		break;

	}



	if(n_A_PassSkill3[10]) {
		w += 75 + 25 * n_A_PassSkill3[10];
	}

	if(n_A_PassSkill3[9]) {
		w += (125 + 25 * n_A_PassSkill3[9]);
	}

	//----------------------------------------------------------------
	// 「ブラックスミス　武器研究」の効果
	//----------------------------------------------------------------
	w += 2 * UsedSkillSearch(SKILL_ID_BUKI_KENKYU);

	//----------------------------------------------------------------
	// 「ブラックスミス　ヒルトバインディング」の効果
	//----------------------------------------------------------------
	if (UsedSkillSearch(SKILL_ID_HILT_BINDING)) {
		w += 4;
	}

	//----------------------------------------------------------------
	// 「メカニック　火と大地の研究」の効果
	//----------------------------------------------------------------
	if ((GetMonseterElmBasicType(mobData[MONSTER_DATA_INDEX_ELEMENT]) == ELM_ID_EARTH)
		|| (GetMonseterElmBasicType(mobData[MONSTER_DATA_INDEX_ELEMENT]) == ELM_ID_FIRE)) {
		w += 10 * UsedSkillSearch(SKILL_ID_HITO_DAICHINO_KENKYU);
	}

	//----------------------------------------------------------------
	// 「メカニック　魔導ギアライセンス」の効果
	//----------------------------------------------------------------
	if (UsedSkillSearch(SKILL_ID_MADOGEAR) > 0) {
		w += 20 * UsedSkillSearch(SKILL_ID_MADOGEAR_LICENSE);
	}

	//----------------------------------------------------------------
	// 「アコライト　デーモンベイン」の効果
	//----------------------------------------------------------------
	if ((mobData[MONSTER_DATA_INDEX_RACE] == RACE_ID_DEMON)
		|| (GetMonseterElmBasicType(mobData[MONSTER_DATA_INDEX_ELEMENT]) == ELM_ID_UNDEAD)) {
		w += Math.floor((3 + 5/100 * n_A_BaseLV) * UsedSkillSearch(SKILL_ID_DEMON_BANE));
	}

	//----------------------------------------------------------------
	// 「ハンター　ビーストベイン」の効果
	//----------------------------------------------------------------
	if (mobData[MONSTER_DATA_INDEX_RACE] == RACE_ID_ANIMAL || mobData[MONSTER_DATA_INDEX_RACE] == RACE_ID_INSECT){
		w += 4 * UsedSkillSearch(SKILL_ID_BEAST_BANE);
		if (UsedSkillSearch(SKILL_ID_HUNTERNO_TAMASHI_KOKA)) {
			w += n_A_STR;
		}
	}

	//----------------------------------------------------------------
	// 「レンジャー　レンジャーメイン」の効果
	//----------------------------------------------------------------
	if (mobData[MONSTER_DATA_INDEX_RACE] == RACE_ID_ANIMAL
		|| mobData[MONSTER_DATA_INDEX_RACE] == RACE_ID_PLANT
		|| mobData[MONSTER_DATA_INDEX_RACE] == RACE_ID_FISH) {
		w += 5 * UsedSkillSearch(SKILL_ID_RANGER_MAIN);
	}

	//----------------------------------------------------------------
	// 「レンジャー　カモフラージュ」の効果
	//----------------------------------------------------------------
	w += 30 * UsedSkillSearch(SKILL_ID_CAMOUFLAGE);

	//----------------------------------------------------------------
	// 「ガンスリンガー　マッドネスキャンセラー」の効果
	//----------------------------------------------------------------
	if (UsedSkillSearch(SKILL_ID_MADNESSS_CANCELER)) {
		w += 100;
	}

	//----------------------------------------------------------------
	// 「ガンスリンガー　ガトリングフィーバー」の効果
	//----------------------------------------------------------------
	if (UsedSkillSearch(SKILL_ID_GATLING_FEVER)) {
		if (n_A_WeaponType == ITEM_KIND_GATLINGGUN || n_A_WeaponType == ITEM_KIND_NONE) {
			w += 20 + 10 * UsedSkillSearch(SKILL_ID_GATLING_FEVER);
		}
	}

	//----------------------------------------------------------------
	// 「ジェネティック　改造カートブースト」の効果
	//----------------------------------------------------------------
	w += 10 * UsedSkillSearch(SKILL_ID_CART_BOOST_GENETIC);

	//----------------------------------------------------------------
	// 「二次職支援　イムポシティオマヌス」の効果
	//----------------------------------------------------------------
	if(g_confDataNizi[CCharaConfNizi.CONF_ID_IMPOSITIO_MANUS]) {
		w += g_confDataNizi[CCharaConfNizi.CONF_ID_IMPOSITIO_MANUS] * 5;
	}

	//----------------------------------------------------------------
	// 「二次職支援　ボルケーノ」の効果
	//----------------------------------------------------------------
	if(g_confDataNizi[CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI] == CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI_VOLCANO) {
		w += g_confDataNizi[CCharaConfNizi.CONF_ID_ZOKUSEIBA_LEVEL] * 5;
	}

	//----------------------------------------------------------------
	// 「モンク　気功」の効果
	// 「二次職支援　気功」の効果
	//----------------------------------------------------------------
	if (GetHigherJobSeriesID(n_A_JOB) == JOB_SERIES_ID_MONK) {
		w += 3 * UsedSkillSearch(SKILL_ID_KIKO);
	}
	else {
		w += 3 * g_confDataNizi[CCharaConfNizi.CONF_ID_KIKO];
	}

	if (UsedSkillSearch(SKILL_ID_KIKO) != 0 || g_confDataNizi[CCharaConfNizi.CONF_ID_KIKO] != 0){
		if(n_A_ActiveSkill==184) w -= 3;
		if(n_A_ActiveSkill==289) w -= 3;
		if(n_A_ActiveSkill==290) w -= 6;
		if(n_A_ActiveSkill==611) w -= 3;
		var wBAKUKI;
		if(n_A_ActiveSkill==612){
			if(UsedSkillSearch(SKILL_ID_KIKO)) {
				w -= 3 * UsedSkillSearch(SKILL_ID_KIKO);
			}
			else {
				w -= 3 * g_confDataNizi[CCharaConfNizi.CONF_ID_KIKO];
			}
		}
		if(n_A_ActiveSkill==613) w -= 3;
		if(n_A_ActiveSkill==616 || n_A_ActiveSkill==617) w -= 15;
		if(n_A_ActiveSkill==622) w -= 3 * n_A_ActiveSkillLV;
		if(n_A_ActiveSkill==623) w -= 3 * n_A_ActiveSkillLV;
		if(n_A_ActiveSkill==630) w -= 6;

		if (attackMethodConfArray.length > 2) {

			switch (attackMethodConfArray[1].GetSkillId()) {
			case 799:
				w -= 3 * (6 - ROUNDDOWN((attackMethodConfArray[1].GetSkillLv() + 1) / 2));
				break;
			default:
				if(n_A_ActiveSkill==614) w -= 6;
				if(n_A_ActiveSkill==615) w -= 6;
				break;
			}

			switch (attackMethodConfArray[1].GetSkillId()) {
			case 801:
				if(n_A_ActiveSkill==289 && attackMethodConfArray[0].GetOptionValue(1)) w -= 3;
				if(n_A_ActiveSkill==290 && attackMethodConfArray[0].GetOptionValue(1)) w -= 3;
				if(n_A_ActiveSkill==290 && attackMethodConfArray[0].GetOptionValue(2)) w -= 3;
				break;
			case 802:
				if(n_A_ActiveSkill==615 && attackMethodConfArray[0].GetOptionValue(1)) w -= 6;
				if(n_A_ActiveSkill==616 && attackMethodConfArray[0].GetOptionValue(1)) w -= 6;
				break;
			}
		}
		else {
			if(n_A_ActiveSkill==614) w -= 6;
			if(n_A_ActiveSkill==615) w -= 6;
		}

	}

	w += 3 * UsedSkillSearch(SKILL_ID_COUNT_OF_COIN);

	if(bArmsLeft){
		if(n_A_card[CARD_REGION_ID_ARMS_LEFT_1]==106 && n_A_card[CARD_REGION_ID_ARMS_LEFT_2]==106 && n_A_card[CARD_REGION_ID_ARMS_LEFT_3]==106){
			w += 40;
		}else{
			for(i=4;i<=6;i++){
				if(CardObjNew[n_A_card[i]][0]==106) w += 5;
			}
		}
		if(n_A_card[CARD_REGION_ID_ARMS_LEFT_4]==106) w += 10;
	}
	else {
		if(n_A_card[CARD_REGION_ID_ARMS_RIGHT_1]==106 && n_A_card[CARD_REGION_ID_ARMS_RIGHT_2]==106 && n_A_card[CARD_REGION_ID_ARMS_RIGHT_3]==106){
			w += 40;
		}else{
			for(i=0;i<=2;i++){
				if(CardObjNew[n_A_card[i]][0]==106) w += 5;
			}
		}
		if(n_A_card[CARD_REGION_ID_ARMS_RIGHT_4]==106) w += 10;
	}
	return Math.floor(w);
 }





function GetArmsElementBySPData(itemRegionIdArray, cardRegionIdArray, elmIdDefault = ELM_ID_VANITY) {

	var idx = 0;
	var idxRegion = 0;

	var itemId = 0;
	var itemData = null;

	var cardId = 0;
	var cardData = null;

	var elmId = elmIdDefault;


	// アイテム自体の効果
	for (idxRegion = 0; idxRegion < itemRegionIdArray.length; idxRegion++) {

		itemId = n_A_Equip[itemRegionIdArray[idxRegion]];
		itemData = ItemObjNew[itemId];

		// SP効果 を直接判定
		for (idx = 0; itemData[ITEM_DATA_INDEX_SPBEGIN + idx] != 0; idx += 2) {

			switch (itemData[ITEM_DATA_INDEX_SPBEGIN + idx]) {
			case ITEM_SP_ELEMENTAL:
			case ITEM_SP_ARMS_ELEMENT:
				elmId = itemData[ITEM_DATA_INDEX_SPBEGIN + idx + 1];
			}
		}
	}


	// カード効果
	for (idxRegion = 0; idxRegion < cardRegionIdArray.length; idxRegion++) {

		cardId = n_A_card[cardRegionIdArray[idxRegion]];

		// 製造属性武器
		if (201 <= cardId && cardId <= 204) {
			elmId = cardId - 200;
		}

		// それ以外
		else {

			cardData = CardObjNew[cardId];

			// SP効果 を直接判定
			for (idx = 0; cardData[CARD_DATA_INDEX_SPBEGIN + idx] != 0; idx += 2) {

				switch (cardData[CARD_DATA_INDEX_SPBEGIN + idx]) {
				case ITEM_SP_ELEMENTAL:
				case ITEM_SP_ARMS_ELEMENT:
					elmId = cardData[CARD_DATA_INDEX_SPBEGIN + idx + 1];
				}
			}
		}
	}


	return elmId;
}

function SET_ZOKUSEI(mobData, attackMethodConfArray) {

	var itemRegionIdArray = null;
	var cardRegionIdArray = null;

	var bApplyArrowElement = false;



	// 属性付与状態を取得
	n_A_Weapon_zokusei = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_ARMS_ELEMENT", ELM_ID_VANITY);
	n_A_Weapon2_zokusei = n_A_Weapon_zokusei;
	BK_Weapon_zokusei = n_A_Weapon_zokusei;



	// 属性付与が指定されていない場合のみ、装備の属性を確認
	if (n_A_Weapon_zokusei == ELM_ID_VANITY) {

		// 右手武器
		itemRegionIdArray = [
			EQUIP_REGION_ID_ARMS,
		];
		cardRegionIdArray = [
			CARD_REGION_ID_ARMS_RIGHT_1,
			CARD_REGION_ID_ARMS_RIGHT_2,
			CARD_REGION_ID_ARMS_RIGHT_3,
			CARD_REGION_ID_ARMS_RIGHT_4,
		];
		n_A_Weapon_zokusei = GetArmsElementBySPData(itemRegionIdArray, cardRegionIdArray, n_A_Weapon_zokusei);



		// 左手武器
		itemRegionIdArray = [
			EQUIP_REGION_ID_ARMS_LEFT,
		];
		cardRegionIdArray = [
			CARD_REGION_ID_ARMS_LEFT_1,
			CARD_REGION_ID_ARMS_LEFT_2,
			CARD_REGION_ID_ARMS_LEFT_3,
			CARD_REGION_ID_ARMS_LEFT_4,
		];
		n_A_Weapon2_zokusei = GetArmsElementBySPData(itemRegionIdArray, cardRegionIdArray, n_A_Weapon_zokusei);


		// 一部のスキルでは、付与属性がダメージに影響するので、保持しておく
		if (n_A_ActiveSkill == SKILL_ID_IGNITION_BREAK || n_A_ActiveSkill == SKILL_ID_AXE_TORNADE) {
			BK_Weapon_zokusei = n_A_Weapon_zokusei;
		}



		// 矢属性の計算
		bApplyArrowElement = false;

		switch (n_A_WeaponType) {
			case ITEM_KIND_BOW:
			case ITEM_KIND_HANDGUN:
			case ITEM_KIND_RIFLE:
			case ITEM_KIND_SHOTGUN:
			case ITEM_KIND_GATLINGGUN:
			case ITEM_KIND_GRENADEGUN:
				bApplyArrowElement = true;
				break;
			default:
				switch (n_A_ActiveSkill) {
					case SKILL_ID_MUSICAL_STRIKE:
					case SKILL_ID_YAUCHI:
					case SKILL_ID_ARRAW_VULKAN:
					case SKILL_ID_SEVERE_RAINSTORM:
					case SKILL_ID_SEVERE_RAINSTORM_EX:
					case SKILL_ID_ROSE_BLOSSOM:
					case SKILL_ID_RHYTHM_SHOOTING:
						bApplyArrowElement = true;
						break;
				}
		}

		if (bApplyArrowElement) {

			// 属性自動矢
			if(n_A_Arrow == ARROW_ID_ZOKUSE_ZIDO_YA_ATK30){
				n_A_Weapon_zokusei = mostEffectiveElmIdArray[ Math.floor(mobData[MONSTER_DATA_INDEX_ELEMENT] / 10) ];
			}

			// 通常の矢
			else {
				n_A_Weapon_zokusei = GetEquippedTotalSPArrow(ITEM_SP_ELEMENTAL);
			}

			BK_Weapon_zokusei = n_A_Weapon_zokusei;
		}
	}



	// スキル使用状態による、攻撃属性の変化

	// 「インビジブル」は、強制念属性
	if (UsedSkillSearch(SKILL_ID_INVISIBILITY)) {
		n_A_Weapon_zokusei = ELM_ID_PSYCO;
	}

	// 「パイロクラスティック」は、付与なしの場合に限り、火属性付与
	if (UsedSkillSearch(SKILL_ID_PYROCLASTIC)) {
		if (n_A_Weapon_zokusei == ELM_ID_VANITY) {
			n_A_Weapon_zokusei = ELM_ID_FIRE;
		}
	}





	// 強制属性系の設定
	switch (n_A_ActiveSkill) {

	// 「マグナムブレイク」は、強制火属性
	case SKILL_ID_MAGNUM_BREAK:
		n_A_Weapon_zokusei = ELM_ID_FIRE;
		break;

	// 「インベナム」は、強制毒属性
	case SKILL_ID_ENVENOM:
		n_A_Weapon_zokusei = ELM_ID_POISON;
		break;

	// 「砂まき」は、強制地属性
	case SKILL_ID_SUNAMAKI:
		n_A_Weapon_zokusei = ELM_ID_EARTH;
		break;

	// 「ポイズンリアクト（反撃）」は、強制毒属性
	case SKILL_ID_POISON_REACT:
		if (mobData[18] < 50 || 60 <= mobData[18]) {
			n_A_Weapon_zokusei = ELM_ID_POISON;
		}
		break;

	// 「フリージングトラップ」は、強制水属性
	case SKILL_ID_FREEZING_TRAP:
		n_A_Weapon_zokusei = ELM_ID_WATER;
		break;

	// 「ホーリークロス」は、強制聖属性
	case SKILL_ID_HOLY_CROSS:
		n_A_Weapon_zokusei = ELM_ID_HOLY;
		break;

	// 「ダーククロス」は、強制闇属性
	case SKILL_ID_DARK_CROSS:
		n_A_Weapon_zokusei = ELM_ID_DARK;
		break;

	// 「トマホーク投げ」は、強制風属性
	case SKILL_ID_TOMAHAWKNAGE:
		n_A_Weapon_zokusei = ELM_ID_WIND;
		break;

// TODO :苦無バグ
	// 「苦無投げ」は、強制無属性
	case SKILL_ID_KUNAI_NAGE:
//		n_A_Weapon_zokusei = ELM_ID_VANITY;
		break;

	// 「ウィンドカッター」は、強制風属性
	case SKILL_ID_WIND_CUTTER:
		n_A_Weapon_zokusei = ELM_ID_WIND;
		break;

	// 「フレームスロワー」は、強制火属性
	case SKILL_ID_FLAME_THROWER:
		n_A_Weapon_zokusei = ELM_ID_FIRE;
		break;

	// 「コールドスロワー」は、強制水属性
	case SKILL_ID_COLD_THROWER:
		n_A_Weapon_zokusei = ELM_ID_WATER;
		break;

	// 「レイオブジェネシス」は、強制聖属性
	case SKILL_ID_RAY_OF_GENESIS:
		n_A_Weapon_zokusei = ELM_ID_HOLY;
		break;

	// 「アースドライブ」は、強制地属性
	case SKILL_ID_EARTH_DRIVE:
		// バトルコロッセオのみ適用除外
		if (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA] == MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM) {
			break;
		}
		n_A_Weapon_zokusei = ELM_ID_EARTH;
		break;

	// 「ヴェラチュールスピアー」は、強制風属性
	case SKILL_ID_VERATURE_SPEAR:
		n_A_Weapon_zokusei = ELM_ID_WIND;
		break;

	// 「クレイジーウィード」は、強制地属性
	case SKILL_ID_CRAZY_WEED:
		n_A_Weapon_zokusei = ELM_ID_EARTH;
		break;

	// 「爆裂苦無」は、強制無属性
	case SKILL_ID_BAKURETSU_KUNAI:
		n_A_Weapon_zokusei = ELM_ID_VANITY;
		break;

	// 「ドラゴンテイル」は、強制無属性
	case SKILL_ID_DRAGON_TAIL:
		n_A_Weapon_zokusei = ELM_ID_VANITY;
		break;

	// 「スラッグショット」は、強制無属性
	case SKILL_ID_SLUG_SHOT:
		n_A_Weapon_zokusei = ELM_ID_VANITY;
		break;

	// 「ハンマーオブゴッド」は、強制無属性
	case SKILL_ID_HAMMER_OF_GOD:
		n_A_Weapon_zokusei = ELM_ID_VANITY;
		break;

	// 「ハウリングマイン追撃」は、強制火属性
	case SKILL_ID_HOWLING_MINE_APPEND:
		n_A_Weapon_zokusei = ELM_ID_FIRE;
		break;

	// 「新星爆発」は、強制無属性
	case SKILL_ID_SHINSE_BAKUHATSU:
 		n_A_Weapon_zokusei = ELM_ID_VANITY;
		break;

	// 「ベーシックグレネード」「ヘイスティファイアインザホール」「グレネーズドロッピング」「ミッションボンバード」はグレネードフラグメント属性、指定がなければ弾丸属性
	case SKILL_ID_BASIC_GRENADE:
	case SKILL_ID_HASTY_FIRE_IN_THE_HOLE:
	case SKILL_ID_GRENADES_DROPPING:
	case SKILL_ID_MISSION_BOMBARD:
		// グレネードフラグメント属性
		if ((grenade_flagment = attackMethodConfArray[0].GetOptionValue(0)) > 0) {
			n_A_Weapon_zokusei = grenade_flagment;
		}
		break;

	default:

		// 四次スキルはスキルデータを参照して設定する
		if (n_A_ActiveSkill >= SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT) {
			var elmWork = g_skillManager.GetElement(n_A_ActiveSkill);
			if ((CSkillData.ELEMENT_FORCE_VANITY <= elmWork) && (elmWork <= CSkillData.ELEMENT_FORCE_UNDEAD)) {
				n_A_Weapon_zokusei = elmWork;
			}
		}
		break;
	}





	// 矢等依存属性系の設定
	switch (n_A_ActiveSkill) {

	// 「アームズキャノン」は、キャノンボール依存属性
	case SKILL_ID_ARMS_CANNON:
		n_A_Weapon_zokusei = CanonOBJ[attackMethodConfArray[0].GetOptionValue(0)][1];
		break;

	// 「スペルフィスト」は、ボルト魔法依存属性
	case SKILL_ID_SPELL_FIST:
		switch (attackMethodConfArray[0].GetOptionValue(0)) {
		case 0:
			n_A_Weapon_zokusei = ELM_ID_FIRE;
			break;
		case 1:
			n_A_Weapon_zokusei = ELM_ID_WATER;
			break;
		case 2:
			n_A_Weapon_zokusei = ELM_ID_WIND;
			break;
		}
		break;

	// 「カートキャノン」は、キャノンボール依存属性
	case SKILL_ID_CART_CANNON:
		n_A_Weapon_zokusei = CanonOBJ[attackMethodConfArray[0].GetOptionValue(0)][1];
		break;

	}




	// 「へスペルスリット」の、強制聖属性
	// なぜこの位置なのかは不明
	if (n_A_ActiveSkill == SKILL_ID_HESPERUS_SLIT) {

		// なぜか「５人の時“だけ”」聖属性になる
		if (UsedSkillSearch(SKILL_ID_COUNT_OF_RG_FOR_BANDING) == 4) {
			n_A_Weapon_zokusei = ELM_ID_HOLY;
		}

		// ソロでインスピレーション時は、聖属性になる
		else if (UsedSkillSearch(SKILL_ID_COUNT_OF_RG_FOR_BANDING) == 0) {
			if (
				UsedSkillSearch(SKILL_ID_INSPIRATION)
				|| TimeItemNumSearch(TIME_ITEM_ID_ZETSUBONO_KAMI_MOROCC_CARD)
				|| TimeItemNumSearch(TIME_ITEM_ID_DEMI_FREYA)
				|| TimeItemNumSearch(TIME_ITEM_ID_MAKENSHI_SAKRAY_CARD)
				) {
				n_A_Weapon_zokusei = ELM_ID_HOLY;
			}
		}
	}
}




/**
 * 属性倍率を適用する
 * @param wpnAtk 武器ＡＴＫ
 * @param elmId 属性ＩＤ
 */
function ApplyElementRatio(mobData, wpnAtk, elmId){

	var elmRatio = zokusei[mobData[18]][elmId];

	// 属性場の適用
	if(g_confDataNizi[CCharaConfNizi.CONF_ID_ZOKUSEIBA_LEVEL] >= 1){

		var baizok = [0,10,14,17,19,20];

		// 火属性武器、かつ、ボルケーノ
		if(n_A_Weapon_zokusei == ELM_ID_FIRE
			&& g_confDataNizi[CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI] == CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI_VOLCANO) {
			elmRatio += baizok[g_confDataNizi[CCharaConfNizi.CONF_ID_ZOKUSEIBA_LEVEL]];
		}

		// 水属性武器、かつ、デリュージ
		if(n_A_Weapon_zokusei == ELM_ID_WATER
			&& g_confDataNizi[CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI] == CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI_DELUGE) {
			elmRatio += baizok[g_confDataNizi[CCharaConfNizi.CONF_ID_ZOKUSEIBA_LEVEL]];
		}

		// 風属性武器、かつ、バイオレントゲイル
		if(n_A_Weapon_zokusei == ELM_ID_WIND
			&& g_confDataNizi[CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI] == CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI_VIOLENT_GALE) {
			elmRatio += baizok[g_confDataNizi[CCharaConfNizi.CONF_ID_ZOKUSEIBA_LEVEL]];
		}
	}

	var w = wpnAtk;
	w += ROUNDDOWN(w * elmRatio / 100);

	return w;
 }





/**
 * HIT補正を取得する.
 * @return HIT補正値
 */
function GetHitModify(){

	var value = 0;


	// 武器研究の効果
	value += 2 * UsedSkillSearch(SKILL_ID_BUKI_KENKYU);



	// その他のスキルによる効果
	switch (n_A_ActiveSkill) {

	case SKILL_ID_BASH:
	case SKILL_ID_PIERCE:
		value += 5 * n_A_ActiveSkillLV;
		break;

	case SKILL_ID_SONIC_BLOW:
	case SKILL_ID_SONIC_BLOW_TAMASHI:
		if (UsedSkillSearch(SKILL_ID_SONIC_ACCELERATION) > 0) {
			value += 50;
		}
		break;

	case SKILL_ID_MAGNUM_BREAK:
		value += 10 * n_A_ActiveSkillLV;
		break;

	case SKILL_ID_SHARP_SHOOTING:
		value += 10 * n_A_ActiveSkillLV;
		break;

	case SKILL_ID_VENOM_PRESSURE:

		// 特定の戦闘エリアでの補正
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
			value += -50 + 50 * n_A_ActiveSkillLV;
			break;

		default:
			value += 10 + 4 * n_A_ActiveSkillLV;
			break;
		}

		break;

	case SKILL_ID_SONIC_WAVE:
		value += 7 * n_A_ActiveSkillLV;
		break;

	case SKILL_ID_BANISHING_POINT:
		value += 3 * n_A_ActiveSkillLV;
		break;
	}



	return value;
 }





/**
 * 必中ダメージを取得する.
 * @return 必中ダメージ
 */
function GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray) {

	var w999 = 0;

	// 素手、かつ、スパート状態の場合、特定スキルに必中攻撃力を追加
	if (n_A_WeaponType == ITEM_KIND_NONE && UsedSkillSearch(SKILL_ID_TAIRIGI)) {
		switch (n_A_ActiveSkill) {
		case SKILL_ID_FEORICHAGI:	// フェオリチャギ
		case SKILL_ID_NERYOCHAGI:	// ネリョチャギ
		case SKILL_ID_TORURYOCHAGI:	// トルリョチャギ
		case SKILL_ID_APUCHAORURIGI:	// アプチャオルリギ
			w999 += ApplyPhysicalSpecializeMonster(charaData, specData, mobData, 10 * UsedSkillSearch(SKILL_ID_TAIRIGI));
			break;
		}
	}

	// 必中攻撃力の追加
	switch (n_A_ActiveSkill) {

	// クラスターボム
	case 505:
		w999 += Math.floor(Math.floor(((n_A_ActiveSkillLV * n_A_DEX) + (n_A_INT * 5)) * (1.5 + n_A_BaseLV / 100)) * (UsedSkillSearch(SKILL_ID_TRAP_KENKYU) * 20 / 50));
		w999 += 40 * UsedSkillSearch(SKILL_ID_TRAP_KENKYU);
		break;

	// ファイアリングトラップ
	// アイスバウンドトラップ
	case 507:
	case 508:
		w999 += Math.floor(Math.floor(((n_A_ActiveSkillLV * n_A_DEX) + (n_A_INT * 5)) * (1.5 + n_A_BaseLV / 100)) * (UsedSkillSearch(SKILL_ID_TRAP_KENKYU) * 20 / 100));
		w999 += 40 * UsedSkillSearch(SKILL_ID_TRAP_KENKYU);
		break;

	// 大纏崩捶
	case 614:
		var wsize = [1,3,5];
		w999 += (wsize[mobData[17]] + n_A_ActiveSkillLV) * n_A_STR;

		// 対プレイヤーの場合
		if(mobData[0] == MONSTER_ID_PLAYER) {
			w999 += ROUNDDOWN(n_B_TAISEI[MOB_CONF_PLAYER_ID_SHOZIZYURYO_GENZAI] * n_A_DEX / 120);
		}
		// 対モンスターの場合
		else {
			w999 += ROUNDDOWN(mobData[2] * 50 * n_A_DEX / 120);
		}
		break;

	// 號砲
	case SKILL_ID_GOHO:

		// オートスペルの計算中でない場合
		if(n_AS_MODE == 0){

			// コンボ時のフラグを見て、威力倍率を調整
			if(attackMethodConfArray[0].GetOptionValue(0) == 0) {
				w999 += 40 * mobData[2] + 240 * n_A_ActiveSkillLV;
			}
			else {
				w999 += 40 * mobData[2] + 500 * n_A_ActiveSkillLV;
			}
		}

		// オートスペルの計算中の場合
		else{

			// 攻撃手段が「閃光連撃時の連撃」の場合
			if(attackMethodConfArray[1].GetSkillId() == SKILL_ID_SENKO_RENGEKI) {
				w999 += 40 * mobData[2] + 240 * n_A_ActiveSkillLV;
			}

			// 攻撃手段がそれ以外（「双龍コンボ時の連撃」）の場合
			else {
				w999 += 40 * mobData[2] + 500 * n_A_ActiveSkillLV;
			}
		}
		break;

	// 羅刹破凰撃(HPSP固定)
	// 羅刹破凰撃(HPSP変動可)
	case SKILL_ID_RASETSU_HAOGEKI_MAX:
	case SKILL_ID_RASETSU_HAOGEKI:

		var wHP = 0;
		var wSP = 0;
		var syouhiSP = 0;
		var baseLvDmg = 0;

		// HPSP変動可の場合は、設定値を取得
		if (n_A_ActiveSkill != SKILL_ID_RASETSU_HAOGEKI_MAX) {
			wHP = attackMethodConfArray[0].GetOptionValue(1);
			wSP = attackMethodConfArray[0].GetOptionValue(2);
		}

		// HPSP固定、もしくは最大値で計算の場合は、設定値を補正
		if (wHP == 0) {
			wHP = charaData[CHARA_DATA_INDEX_MAXHP];
		}
		if (wSP == 0) {
			wSP = charaData[CHARA_DATA_INDEX_MAXSP];
		}

		// 消費SP、ベースレベルダメージを計算
		// オートスペル計算中でない場合、かつ、スキルのオプションが『単発発動』の場合
		if ((n_AS_MODE == 0) && (attackMethodConfArray[0].GetOptionValue(0) == 0)) {

			// 消費SPあり
			syouhiSP = ROUNDDOWN(charaData[CHARA_DATA_INDEX_MAXSP] * (10 + n_A_ActiveSkillLV) / 100);

			// ベースレベルダメージ低め
			baseLvDmg = 10 * n_A_BaseLV;
		}

		// 上記以外の場合
		else {

			// 消費SPなし
			syouhiSP = 0;

			// ベースレベルダメージ高め
			baseLvDmg = 40 * n_A_BaseLV;
		}

		// ダメージを計算
		w999 += (wSP - syouhiSP) * (100 + 20 * n_A_ActiveSkillLV) / 100 + baseLvDmg + (charaData[CHARA_DATA_INDEX_MAXHP] - wHP);
		break;

	// 新星爆発
	case SKILL_ID_SHINSE_BAKUHATSU:

		w999 += Math.floor(charaData[CHARA_DATA_INDEX_MAXHP] / Math.max(1, (6 - n_A_ActiveSkillLV)));
		w999 += Math.floor(charaData[CHARA_DATA_INDEX_MAXSP] * (200 * n_A_ActiveSkillLV) / 100);

		break;

	}



	return Math.floor(w999);
}



/**
 * ダメージ判定の強制属性による属性倍率を適用する.
 * @param skillId スキルID
 * @param dam 元ダメージ
 * @param mobData 相手データ
 * @return 適用後のダメージ
 */
function ApplyHitJudgeElementRatio(skillId, dam, mobData) {

	switch (skillId) {

	// 無属性
	case SKILL_ID_CLUSTER_BOMB:
	case SKILL_ID_DAITENHOSUI:
	case SKILL_ID_GOHO:
	case SKILL_ID_RASETSU_HAOGEKI_MAX:
	case SKILL_ID_RASETSU_HAOGEKI:
	case SKILL_ID_SHINSE_BAKUHATSU:
		return ApplyElementRatio(mobData, dam, ELM_ID_VANITY);

	// 水属性
	case SKILL_ID_ICEBOUND_TRAP:
		return ApplyElementRatio(mobData, dam, ELM_ID_WATER);

	// 火属性
	case SKILL_ID_FIRING_TRAP:
		return ApplyElementRatio(mobData, dam, ELM_ID_FIRE);

	}


	// 上記以外は、対象外
	return dam;
}





/**
 * モンスター特化（物理）を適用する.
 * @param dmg ダメージ
 * @return 適用後のダメージ
 */
function ApplyPhysicalSpecializeMonster(charaData, specData, mobData, dmg) {

	//--------------------------------
	// 種族特化
	//--------------------------------
	var w = 100;

	// 対プレイヤーでない場合
	if (mobData[0] != MONSTER_ID_PLAYER) {

		// 種族特化をそのまま適用
		w += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_SOLID + mobData[19]];

		// 人間形（プレイヤー除く）の適用
		if (mobData[19] == RACE_ID_HUMAN) {
			w += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER];
		}
	}

	// 対プレイヤーの場合
	else {

		// 対プレイヤー特化の適用
		w += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL];

		// 対プレイヤー設定の種族に基づき、参照値を変更
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SHUZOKU]) {

		// 種族が人間に設定されている場合は、人間特化を適用
		case MOB_CONF_PLAYER_ID_SHUZOKU_HUMAN:
			w += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN];
			w += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_HUMAN];
			break;

		// 種族がドラムに設定されている場合は、ドラム特化を適用
		case MOB_CONF_PLAYER_ID_SHUZOKU_DORAM:
			w += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_DORAM];
			break;

		}
	}

	dmg = Math.floor(dmg * w / 100);



	//--------------------------------
	// サイズ特化
	//--------------------------------
	var w = 100;

	// 対プレイヤーでない場合
	if (mobData[0] != MONSTER_ID_PLAYER) {

		// モンスターのサイズ定義に従い、そのまま適用
		w += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL + mobData[17]];
	}

	// 対プレイヤーの場合
	else {

		// 対プレイヤー設定の種族に基づき、参照値を変更
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SHUZOKU]) {

		// 種族が人間に設定されている場合は、中型特化を適用
		case MOB_CONF_PLAYER_ID_SHUZOKU_HUMAN:
			w += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM];
			break;

		// 種族がドラムに設定されている場合は、小型特化を適用
		case MOB_CONF_PLAYER_ID_SHUZOKU_DORAM:
			w += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL];
			break;

		}
	}

	dmg = Math.floor(dmg * w / 100);



	//--------------------------------
	// 属性特化
	//--------------------------------
	w = n_tok[40+Math.floor(mobData[18] / 10)];
	dmg = Math.floor(dmg * (100+w) /100);



	var w = 100;

	//--------------------------------
	// ゴブリン特化
	//--------------------------------
	switch (mobData[0]) {
	case 108:
	case 109:
	case 110:
	case 111:
	case 112:
	case 113:
	case 114:
	case 115:
	case 319:
		w += n_tok[81];
		break;
	}

	//--------------------------------
	// コボルド特化
	//--------------------------------
	switch (mobData[0]) {
	case 116:
	case 117:
	case 118:
	case 119:
	case 120:
		w += n_tok[82];
		break;
	}

	//--------------------------------
	// オーク特化
	//--------------------------------
	switch (mobData[0]) {
	case 49:
	case 50:
	case 51:
	case 52:
	case 55:
	case 221:
		w += n_tok[83];
		break;
	}

	//--------------------------------
	// ゴーレム特化
	//--------------------------------
	switch (mobData[0]) {
	case 106:
	case 152:
	case 308:
	case 32:
	case 541:
		w += n_tok[84];
		break;
	}

	//--------------------------------
	// マヌク特化
	//--------------------------------
	if(n_A_PassSkill7[29]){
		if (NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MANUKU]) == 1) {
			w += 10;
		}
	}

	//--------------------------------
	// スプレンディッド特化
	//--------------------------------
	if(n_A_PassSkill7[32]){
		if (NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SPRENDED]) == 1) {
			w += 10;
		}
	}

	//--------------------------------
	// ニブルヘイム特化
	//--------------------------------
	switch (mobData[0]) {
	case 324:
	case 325:
	case 326:
	case 327:
	case 328:
	case 329:
	case 330:
	case 331:
	case 332:
		if(EquipNumSearch(2399)){
			w += 5;
			if(n_A_HEAD_DEF_PLUS >= 5) w += 5;
			if(n_A_HEAD_DEF_PLUS >= 7) w += 10;
			if(n_A_HEAD_DEF_PLUS >= 9) w += 20;
		}
		break;
	}

	//--------------------------------
	// モロク特化　タイプ１
	//--------------------------------
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
	case 2431:		// 両手剣
	case 2432:		// カタール
	case 2433:		// 杖
	case 2434:		// ハンマ－
	case 2435:		// 弓
		if(NumSearch(mobData[0],MonsterGroupObj[MONSTER_GROUP_ID_MOROC]) == 1){
			if(n_A_Weapon_ATKplus >= 5) w += 40;
			if(n_A_Weapon_ATKplus >= 7) w += 60;
			if(n_A_Weapon_ATKplus >= 9) w += 80;
		}
		break;
	}

	//--------------------------------
	// モロク特化　タイプ２
	//--------------------------------
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
	case 2436:		// 短剣
		if(NumSearch(mobData[0],MonsterGroupObj[MONSTER_GROUP_ID_MOROC]) == 1){
			if(n_A_Weapon_ATKplus >= 5) w += 20;
			if(n_A_Weapon_ATKplus >= 7) w += 30;
			if(n_A_Weapon_ATKplus >= 9) w += 40;
		}
		break;
	}
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT]) {
	case 2436:		// 短剣
		if(NumSearch(mobData[0],MonsterGroupObj[MONSTER_GROUP_ID_MOROC]) == 1){
			if(n_A_Weapon2_ATKplus >= 5) w += 20;
			if(n_A_Weapon2_ATKplus >= 7) w += 30;
			if(n_A_Weapon2_ATKplus >= 9) w += 40;
		}
		break;
	}

	//--------------------------------
	// フェイスワーム特化
	//--------------------------------
	switch (mobData[0]) {
	case 748:
	case 749:
	case 750:
	case 752:
	case 753:
	case 754:
	case 755:
	case 756:
	case 757:
		if(EquipNumSearch(2490)){
			w += 5;
			if(n_A_HEAD_DEF_PLUS >= 5) w += 10;
			if(n_A_HEAD_DEF_PLUS >= 7) w += 15;
			if(n_A_HEAD_DEF_PLUS >= 9) w += 20;
		}
		break;
	}

	//--------------------------------
	// 英雄エンチャント特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_EIYUENCHANT]) == 1){
		if(CardNumSearch(CARD_ID_ENCHANT_RYUBIRYUNO_GENZYU)){
			w += 20;
		}
	}

	//--------------------------------
	// 生体特化　タイプ１
	//--------------------------------
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
	case ITEM_ID_REQUIEM_SWORD:			// レクイエムソード
	case ITEM_ID_REQUIEM_SPEAR:			// レクイエムスピア
	case ITEM_ID_REQUIEM_SMASHER:		// レクイエムスマッシャー
	case ITEM_ID_REQUIEM_GREATBOW:		// レクイエムグレイトボウ
	case ITEM_ID_REQUIEM_KATAR:			// レクイエムカタール
	case ITEM_ID_REQUIEM_KNUCKLE:		// レクイエムナックル
	case ITEM_ID_REQUIEM_VIOLIN:		// レクイエムバイオリン
	case ITEM_ID_REQUIEM_BLADEWHIP:		// レクイエムブレイドウィップ
		if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			w += 40;
			if(n_A_Weapon_ATKplus >= 5) w += 20;
			if(n_A_Weapon_ATKplus >= 6) w += 15 * (n_A_Weapon_ATKplus - 5);
		}
		break;
	}
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT]) {
	case ITEM_ID_REQUIEM_SWORD:			// レクイエムソード
		if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			w += 40;
			if(n_A_Weapon2_ATKplus >= 5) w += 20;
			if(n_A_Weapon2_ATKplus >= 6) w += 15 * (n_A_Weapon2_ATKplus - 5);
		}
		break;
	}

	//--------------------------------
	// 生体特化　タイプ２
	//--------------------------------
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
	case ITEM_ID_REQUIEM_DAGGER:		// レクイエムダガー
		if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			w += 20;
			if(n_A_Weapon_ATKplus >= 5) w += 20;
			if(n_A_Weapon_ATKplus >= 6) w += 15 * (n_A_Weapon_ATKplus - 5);
		}
		break;
	}
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT]) {
	case ITEM_ID_REQUIEM_DAGGER:		// レクイエムダガー
		if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			w += 20;
			if(n_A_Weapon2_ATKplus >= 5) w += 20;
			if(n_A_Weapon2_ATKplus >= 6) w += 15 * (n_A_Weapon2_ATKplus - 5);
		}
		break;
	}

	//--------------------------------
	// 生体特化　タイプ３
	//--------------------------------
	switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
	case ITEM_ID_REQUIEM_CLAYMORE:			// レクイエムクレイモア
	case ITEM_ID_REQUIEM_LANCE:				// レクイエムランス
	case ITEM_ID_REQUIEM_TWOHANDAXE:		// レクイエムツーハンドアックス
		if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SEITAI]) == 1){
			w += 40;
			if(n_A_Weapon_ATKplus >= 5) w += 30;
			if(n_A_Weapon_ATKplus >= 6) w += 15 * (n_A_Weapon_ATKplus - 5);
		}
		break;
	}

	//--------------------------------
	// タナトス特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_THANATOS]) == 1){
		if (EquipNumSearch(ITEM_ID_USUDUKIYONO_BOSHI)) {
			w += 5;
			if (n_A_HEAD_DEF_PLUS >= 5) w += 10;
			if (n_A_HEAD_DEF_PLUS >= 7) w += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) w += 20;
		}
	}

	//--------------------------------
	// 地下排水路特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_CHIKA_HAISUIRO]) == 1){
		if (EquipNumSearch(ITEM_ID_NEKORYOTEKEN_TACHIUO)) w += 50;
		if (EquipNumSearch(ITEM_ID_NEKOKATAR_TSUNA)) w += 50;
		if (EquipNumSearch(ITEM_ID_NEKORYOTETSUE_KAZIKI)) w += 50;
		if (EquipNumSearch(ITEM_ID_NEKORYOTEONO_KUROMAGURO)) w += 50;
		if (EquipNumSearch(ITEM_ID_NEKOYUMI_KANI)) w += 50;
		if (EquipNumSearch(ITEM_ID_NEKOTANKEN_AZI)) w += 25 * EquipNumSearch(ITEM_ID_NEKOTANKEN_AZI);

		if (EquipNumSearch(ITEM_ID_MARAN_KAIZOKUDANBO) > 0) {
			w += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) w += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) w += 20;
		}
	}

	//--------------------------------
	// 暴屈王の洞窟特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_BOKUTSUONO_DOKUTSU]) == 1){
		if (EquipNumSearch(ITEM_ID_NEKORYOTEKEN_TACHIUO)) w += 50;
		if (EquipNumSearch(ITEM_ID_NEKOKATAR_TSUNA)) w += 50;
		if (EquipNumSearch(ITEM_ID_NEKORYOTETSUE_KAZIKI)) w += 50;
		if (EquipNumSearch(ITEM_ID_NEKORYOTEONO_KUROMAGURO)) w += 50;
		if (EquipNumSearch(ITEM_ID_NEKOYUMI_KANI)) w += 50;
		if (EquipNumSearch(ITEM_ID_NEKOTANKEN_AZI)) w += 25 * EquipNumSearch(ITEM_ID_NEKOTANKEN_AZI);

		if (EquipNumSearch(ITEM_ID_MARAN_KAIZOKUDANBO) > 0) {
			w += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) w += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) w += 20;
		}
	}

	//--------------------------------
	// 時計塔特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_TOKEITO]) == 1){
		if (EquipNumSearch(ITEM_ID_NIZIIRONO_TSUBASA) > 0) {
			w += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) w += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) w += 20;
		}
	}

	//--------------------------------
	// ハートハンター軍事基地特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_HEARTHUNTER]) == 1){
		if (EquipNumSearch(ITEM_ID_GOOGLE_HAT) > 0) {
			w += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) w += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) w += 20;
		}
	}

	//--------------------------------
	// ロックリッジ特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_ROCKRIDGE]) == 1){
		if (EquipNumSearch(ITEM_ID_TAURUS_HAT) > 0) {
			w += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) w += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) w += 20;
		}
	}

	//--------------------------------
	// ヴェルナー研究所特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_VERNAR]) == 1){
		if (EquipNumSearch(ITEM_ID_ZIKKEN_SEITAI_GOATGATA_CAP) > 0) {
			w += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) w += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) w += 20;
		}
	}

	//--------------------------------
	// メロリン特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MELORIN]) == 1){
		if (EquipNumSearch(ITEM_ID_OKYU_MINI_MELON) > 0) {
			w += 20 * n_A_HEAD_DEF_PLUS;
		}
	}

	//--------------------------------
	// ２５０ページ特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_PAGE250]) == 1){
		if (EquipNumSearch(ITEM_ID_BLACK_VEIL) > 0) {
			w += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) w += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) w += 20;
		}
	}

	//--------------------------------
	// 魔神殿特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MAZINDEN]) == 1){
		if (EquipNumSearch(ITEM_ID_DIAVOLOS_WING) > 0) {
			w += 30;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_ARMOR) > 0) {
			w += 20;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_ROBE) > 0) {
			w += 20;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_MANT) > 0) {
			w += 20;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_BOOTS) > 0) {
			w += 20;
		}
		if (EquipNumSearch(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_RING) > 0) {
			w += 20;
		}
	}

	//--------------------------------
	// スクロールストール特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SCROLL_STOLE]) == 1){
		if (EquipNumSearch(ITEM_ID_SCROLL_STOLE) > 0) {
			w += 30;
		}
	}

	//--------------------------------
	// オース二次捜索特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_OS_NIZI_SOSAKU]) == 1){
		if (EquipNumSearch(ITEM_ID_KETTONO_RYU_BOSHI) > 0) {
			w += 15;
			if (n_A_HEAD_DEF_PLUS >= 7) w += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) w += 20;
		}
	}

	//--------------------------------
	// ミグエル特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MIGEL]) == 1){
		if (EquipNumSearch(ITEM_ID_KETTONO_RYU_BOSHI) > 0) {
			if (n_A_HEAD_DEF_PLUS >= 10) {
				w += 100;
			}
		}
	}

	//--------------------------------
	// ノーグロード３層特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_NOGUE_ROAD_03]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_KOKA_RAVA_GOLEM)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// フローズンメモリー特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_FROZEN_MEMORY]) == 1){
		if (EquipNumSearch(ITEM_ID_FROZEN_SCALE_SHAWL) > 0) {
			w += 30;
		}
	}

	//--------------------------------
	// 紫色の深海洞窟特化
	//--------------------------------
	if ((NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MURASAKI_IRONO_SHINKAI_DOKUTSU_ZYOSO]) == 1)
		|| (NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MURASAKI_IRONO_SHINKAI_DOKUTSU_KASO]) == 1)) {

		if ((cardCount = CardNumSearch(CARD_ID_SHINKAINO_HANGYOZIN)) > 0) {
			w += 30 * cardCount;
		}

		if (EquipNumSearch(ITEM_ID_SHINKAI_SEIBUTSUNO_MANT) > 0) {
			w += 30;
		}
	}

	//--------------------------------
	// ネジリアン帝国特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_NEZIRIAN_TEKOKU]) == 1){
		if (EquipNumSearch(ITEM_ID_KIGURUMI_BEARDOLL) > 0) {
			w += 30;
		}
	}

	//--------------------------------
	// 幻想の北洞窟ルワンダ特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_GENSONO_KITA_DOKUTSU_RUWANDA]) == 1){
		if (EquipNumSearch(ITEM_ID_ANCIENT_MEGALIS_MANT) > 0) {
			w += 30;
		}
	}

	//--------------------------------
	// 歪んだ迷宮の森耐性
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_YUGANDA_MEIKYUNO_MORI]) == 1){
		if (EquipNumSearch(ITEM_ID_YAGIGENO_MUFFLER) > 0) {
			w += 30;
		}
	}

	//--------------------------------
	// 認識の庭特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_NINSHIKINO_NIWA]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_MAZIMENA_HETAI_ANDRE)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// 鉱山ダンジョン03特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_KOZAN_DUNGEON_03]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_NEO_MINERAL)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// アビスレイク地下洞窟04特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_ABYSS_LAKE_CHIKA_DOKUTSU_04]) == 1){
		if (EquipNumSearch(ITEM_ID_DRAGON_SCALE_SHAWL) > 0) {
			w += 30;
		}
		if ((cardCount = CardNumSearch(CARD_ID_BONE_PHEROS)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// 廃棄実験体遊技場ルドゥス4階特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_HAIKI_ZIKKENTAI_YUGIZYO_RUDUS_4F]) == 1){
		if (EquipNumSearch(ITEM_ID_DISCARDED_CAPE) > 0) {
			w += 30;
		}
		if ((cardCount = CardNumSearch(CARD_ID_VENEDI)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// 崩れたオペラハウス特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_NIFLHEIM_DUNGEON_KUZURETA_OPERA_HOUSE]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_PIERROT_ZOIST)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// 大浴場メディタティオ特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_BALMUNT_TE_DAIYOKUZYO_MEDITATIO]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_NETTO_PHEN)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// 貯蔵庫タルタロス特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_BALMUNT_TE_CHOZOKO_TARUTAROS]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_KOSHOSHITA_KEBIGATA_BETA)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// 第2魔力発電所特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_BALMUNT_TE_DAI2_MARYOKU_HATSUDENSHO]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_KYORYOKUNA_MARYOKU)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// 灰色狼の森特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_HAIIRO_OKAMINO_MORI]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_GRAY_WOLF)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// オズの迷路特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_OZNO_MEIRO]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_VALTY)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// 廃棄実験所アミシティア特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_HAIKI_ZIKKENZYO_AMISITIA]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_HENI_CHIMERA_VANILAQUS)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// 捨てられた穴01特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SUTERARETA_ANA_01]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_DOKUTSU_CALMARING)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// 捨てられた穴02特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_SUTERARETA_ANA_02]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_TANGAN_DOLLOCARIS)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// 蛇神の温もり特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_HEBIGAMINO_NUKUMORI]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_SAIKAKYU_RGAN)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// アルデバラン時計塔地下 未知の空間特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_TOKEITO_MICHI_NO_KUUKAN]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_GENERAL_ORK)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// 魔力が歪んだ平原 特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_PLAINS_DISTORTED_BY_MAGIC]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_HARD_ROCK_TITAN)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// ミョルニール地下洞窟 特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_MIOLNIR_UNDERGROUND_CAVE]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_PUNCH_BUG)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// イスガルド北部（凍て付いた鱗の海辺、古代の氷の峡谷 東部、古代の氷の峡谷 西部） 特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_ISGARD_NORTH_FIELD]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_FAKE_IWIN_SOLDIERS)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// 蛇神の根源 特化
	//--------------------------------
	if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_JOR_ROOT]) == 1){
		if ((cardCount = CardNumSearch(CARD_ID_JOR_MUNGANDR_GUARDIAN)) > 0) {
			w += 30 * cardCount;
		}
	}

	//--------------------------------
	// その他の装備によるモンスター特化
	//--------------------------------
	w += GetEquippedTotalSPEquip(1000 + mobData[0]);

	//--------------------------------
	// その他のカードによるモンスター特化
	//--------------------------------
	w += GetEquippedTotalSPCardAndElse(1000+mobData[0]);



	//--------------------------------
	// 英雄の痕跡支援
	//--------------------------------
	if(TimeItemNumSearch(72)){
		if(743 <= mobData[0] && mobData[0] <= 757) w += 20;
		if(769 <= mobData[0] && mobData[0] <= 786) w += 20;
	}

	//--------------------------------
	// 12thアニバ星座支援
	//--------------------------------
	if(TimeItemNumSearch(80)) w += 30;



	//----------------------------------------------------------------
	// 「性能カスタマイズ欄」の、地域特化効果
	//----------------------------------------------------------------
	confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_GROUP_DAMAGE_UP);
	if (confval != 0) {
		w += confval;
	}



	// TODO: データ移行過渡処理
	// 計算したSP効果を、移行前のデータ形式に変換して、加算する
	if (IsEnableMigrationBlockTransit()) {

		var idxMap = 0;

		var candidateMapIdArray = null;

		var spTag = null;

		// 当該モンスターの出現するマップIDを収集
		candidateMapIdArray = [];

		for (idxMap = 0; idxMap < g_MonsterMapDataArray.length; idxMap++) {
			if (g_MonsterMapDataArray[idxMap][MONSTER_MAP_DATA_INDEX_DATA_ARRAY].indexOf(mobData[0]) >= 0) {
				candidateMapIdArray.push(g_MonsterMapDataArray[idxMap][MONSTER_MAP_DATA_INDEX_ID]);
			}
		}

		// すべての出現マップをループ
		for (idxMap = 0; idxMap < candidateMapIdArray.length; idxMap++) {

			spTag = new CMigEquipableSpTag()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_BY_ATTACK)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_MAP_MONSTER, candidateMapIdArray[idxMap])
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT);

			w += g_charaDataManager.GetCharaData(MIG_CHARA_MANAGER_ID_MAIN).GetSpValue(spTag, null, MIG_EFFECTIVE_SP_CALC_MODE_SUM);
			w += g_charaDataManager.GetCharaData(MIG_CHARA_MANAGER_ID_MAIN).GetSetSpValue(spTag, null, MIG_EFFECTIVE_SP_CALC_MODE_SUM);

			spTag = new CMigEquipableSpTag()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE_OLD)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_MAP_MONSTER, candidateMapIdArray[idxMap])
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT);

			w += g_charaDataManager.GetCharaData(MIG_CHARA_MANAGER_ID_MAIN).GetSpValue(spTag, null, MIG_EFFECTIVE_SP_CALC_MODE_SUM);
			w += g_charaDataManager.GetCharaData(MIG_CHARA_MANAGER_ID_MAIN).GetSetSpValue(spTag, null, MIG_EFFECTIVE_SP_CALC_MODE_SUM);
		}
	}

	// 移行前データでの処理（移行完了まで必要）
	else {

		//--------------------------------
		// グラストヘイムアビス特化
		//--------------------------------
		if(NumSearch(mobData[0], MonsterGroupObj[MONSTER_GROUP_ID_GLASTHEIM_ABYSS]) == 1){
			if (EquipNumSearch(ITEM_ID_SHIROKISHINO_MANT) > 0) {
				w += 10;
				if (n_A_SHOULDER_DEF_PLUS >= 5) {
					w += 15;
				}
				if (n_A_SHOULDER_DEF_PLUS >= 7) {
					w += 15;
				}
			}
		}
	}



	dmg = Math.floor(dmg * w /100);



	// ボス／一般特化
	w = 0;
	if(mobData[20] == 1) {
		w += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_BOSS];
	}
	else {
		w += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_NOTBOSS];
	}

	w += n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP];
	dmg = Math.floor(dmg * (100+w) /100);



	//--------------------------------
	// ＥＤＰ補正
	//--------------------------------
	if(UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON)){

		switch (n_A_ActiveSkill) {

		// 習得できるスキルのうち効果が適用されないもの
		case SKILL_ID_SUNAMAKI:
		case SKILL_ID_ISHINAGE:
		case SKILL_ID_GRIM_TOOTH:
		case SKILL_ID_VENOM_SPLASHER:
		case SKILL_ID_POISON_REACT:
		case SKILL_ID_VENOM_KNIFE:
		case SKILL_ID_METEOR_ASSALT:
			break;

		// 習得できないスキルのうち効果が適用されないもの

		// 効果が適用されるもの
		default:
			if ((g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_PHYSICAL) == CSkillData.TYPE_PHYSICAL) {
				dmg = Math.floor(dmg * (150 + 50 * UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON)) / 100);
			}
			break;
		}
	}

	return Math.floor(dmg);
 }





/**
 * スパイダーウェブ状態系ダメージ追加倍率を取得する.
 */
function GetSpiderWebDamageRatio() {

	var w=0;

	if(n_A_Weapon_zokusei == 3 && n_B_IJYOU[17]) w += 100;

	return w;
 }




/**
 * 属性場によるダメージ追加倍率を取得する.
 */
function GetElementFieldDamageRatio() {

	var w = 0;

// いつかのパッチで仕様変更。ApplyElementRatio()内へ移動。
/*
	if(g_confDataNizi[1] >= 1){

		var baizok = [0,10,14,17,19,20];

		// 火属性武器、かつ、ボルケーノ
		if(n_A_Weapon_zokusei == 3 && g_confDataNizi[0] == 0) w += baizok[g_confDataNizi[1]];

		// 水属性武器、かつ、デリュージ
		if(n_A_Weapon_zokusei == 1 && g_confDataNizi[0] == 1) w += baizok[g_confDataNizi[1]];

		// 風属性武器、かつ、バイオレントゲイル
		if(n_A_Weapon_zokusei == 4 && g_confDataNizi[0] == 2) w += baizok[g_confDataNizi[1]];
	}
*/

	return w;
 }





/**
 * 物理判定攻撃に対するダメージ倍率を適用
 * @param dmg ダメージ
 * @return 適用後のダメージ
 */
function ApplyPhysicalDamageRatio(battleCalcInfo, charaData, specData, mobData, dmg, bCri) {

	var criDmgUp = 0;


	// TODO : 謎判定　ウォーグ系スキル
	if(n_A_ActiveSkill==511 || n_A_ActiveSkill==513 || n_A_ActiveSkill==516) return Math.floor(dmg);



	// 近接物理、遠距離攻撃ダメージ上昇効果の適用
	var rangeUp = 0;

	// 弓装備時、遠距離攻撃の場合
	if (n_Enekyori == 1 && n_A_WeaponType == ITEM_KIND_BOW) {
		if(TyouEnkakuSousa3dan != -1){
			rangeUp = n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP_ONLY_BOW];
		}
	}	

	// 遠距離攻撃の場合
	if (n_Enekyori == 1) {
		if(TyouEnkakuSousa3dan != -1){
			rangeUp = n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP];
		}
	}

	// グランドクロスの場合（反動除く）
	else if ((n_A_ActiveSkill == SKILL_ID_GRAND_CROSS) && (n_A_GX_HANDO == 0)) {
		if (TyouEnkakuSousa3dan != -1) {
			rangeUp = n_tok[ITEM_SP_LONGRANGE_DAMAGE_UP];
		}
	}

	// サクリファイスの場合
	else if (n_A_ActiveSkill == SKILL_ID_SACRIFICE) {
	}

	// 近接物理攻撃の場合
	else if ((g_skillManager.GetSkillType(n_A_ActiveSkill) & CSkillData.TYPE_PHYSICAL) == CSkillData.TYPE_PHYSICAL) {
		rangeUp = n_tok[ITEM_SP_SHORTRANGE_DAMAGE_UP];
	}

	dmg = Math.floor(dmg * (100 + rangeUp) / 100);



	// エウカリスティカによる、不死／闇属性へのダメージ強化
	if (UsedSkillSearch(SKILL_ID_EUCHARISTICA)) {
		if (n_A_JOB == JOB_ID_ARCBISHOP) {
			if((70 <= mobData[18] && mobData[18] <= 79) || (90 <= mobData[18] && mobData[18] <= 99)) {
				dmg = Math.floor(dmg * (100 + 3 * UsedSkillSearch(SKILL_ID_EUCHARISTICA)) / 100);
			}
		}
	}

	// クリティカルダメージ補正
	if (bCri) {

		// 一部のスキルにおいて効果に修正が入る
		criDmgUp = g_skillManager.CriDamageRate(battleCalcInfo.skillId, battleCalcInfo.skillLv, charaData, specData, mobData);

		dmg = Math.floor(dmg * (100 + criDmgUp) / 100);
	}

	// ファイトによる、ダメージ強化
	if (UsedSkillSearch(SKILL_ID_FIGHT)) {
		var w = 20 * UsedSkillSearch(SKILL_ID_FIGHT);
		dmg = Math.floor(dmg * (100 + w) /100);
	}

	// 非対人戦における、アンチマジックによる、物理ダメージ増加効果
	if(n_B_KYOUKA[8]) {
		dmg = Math.floor(dmg * (100 + 20 * n_B_KYOUKA[8]) / 100);
	}

	// 対プレイヤー一般耐性を適用
	dmg = ApplyRegistPVPNormal(mobData, dmg);

	return Math.floor(dmg);
 }





/**
 * 物理判定攻撃に対するスキル倍率の増減を適用する.
 * @param wBaiCI ダメージ
 * @param number 謎
 * @return 適用後のダメージ
 * TODO 謎パラメタ
 */
function GetPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData) {

//********************************************************************************************************************************
//********************************************************************************************************************************
//****
//**** ★★★★　装備セット等の“物理”スキル倍率補正　ここから　★★★★
//****
//********************************************************************************************************************************
//********************************************************************************************************************************

	var itemCount = 0;

	var w1 = 0;

	//----------------------------------------------------------------
	// 「フリーズタートルカード」の、「バッシュ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 6) {
		if(n_A_SHOES_DEF_PLUS >= 9 && CardNumSearch(362)) w1 += 10;
	}

	//----------------------------------------------------------------
	// 「ソードガーディアンカード」の、「ボウリングバッシュ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 76) {
		if(n_A_WeaponType==2 || n_A_WeaponType==3) w1 += 25 * CardNumSearch(464);
	}

	//----------------------------------------------------------------
	// 「ボウガーディアンカード」の、「アローシャワー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 41) {
		if(n_A_WeaponType==10) w1 += 50 * CardNumSearch(465);
	}

	//----------------------------------------------------------------
	// 「グロリアスハンターボウ」の、「ダブルストレイフィング」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 40) {
		if(n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1089)) w1 += 20;
	}

	//----------------------------------------------------------------
	// 「インペリアルリング」の、「グランドクロス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 162) {
		if(EquipNumSearch(2495)) w1 += n_A_BaseLV;
	}

	//----------------------------------------------------------------
	// 「グロリアスハンドガン」の、「ラピッドシャワー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 428) {
		if(n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1099)) w1 += 2 * n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「グロリアスライフル」の、「トラッキング」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 430) {
		if(n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1100)) w1 += 3 * n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「グロリアスショットガン」の、「スプレッドアタック」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 436) {
		if(n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1102)) w1 += 2 * n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「グロリアスグレネードガン」の、「グラウンドドリフト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 437) {
		if(n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1103)) w1 += 2 * n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「グロリアス系銃器」の、「トリプルアクション」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 418){
		if(n_A_Weapon_ATKplus >= 7) {
			if(EquipNumSearch(1100) || EquipNumSearch(1101) || EquipNumSearch(1102) || EquipNumSearch(1103)) w1 += 30;
		}
	}

	//----------------------------------------------------------------
	// 「達人の剣」の、「バッシュ」「ボウリングバッシュ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 6 || n_A_ActiveSkill == 76) {
		if(n_A_ActiveSkillLV == 10 && EquipNumSearch(1159)) w1 += 50;
	}

	//----------------------------------------------------------------
	// 「ベチェルアックス」の、「メナーナイト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 65) {
		if(SU_LUK >= 90 && SU_DEX >= 90 && EquipNumSearch(1164)) w1 += 15;
	}

	//----------------------------------------------------------------
	// 「チャクラム」の、「メテオアサルト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 264) {
		if(EquipNumSearch(1176) && LearnedSkillSearch(SKILL_ID_KATAR_SHUREN) == 10) w1 += 20;
	}

	//----------------------------------------------------------------
	// 「ブラックウィング」の、「フェイタルメナス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 606) {
		if(n_A_Weapon_ATKplus >= 6 && EquipNumSearch(1337)) w1 += 2 * (n_A_Weapon_ATKplus - 5);
	}

	//----------------------------------------------------------------
	// 「インペリアルスピア」の、「キャノンスピア」「バニシングポイント」強化
	// 「インペリアルセット」の、「キャノンスピア」「バニシングポイント」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 569 || n_A_ActiveSkill == 570){
		if(EquipNumSearch(1341)) w1 += 3 * ROUNDDOWN(n_A_Weapon_ATKplus / 2);
		if(EquipNumSearch(2493)) w1 += 7 * ROUNDDOWN(n_A_Weapon_ATKplus / 2);
	}

	//----------------------------------------------------------------
	// 「赤いエーテルバッグ」の、「クレイジーウィード」「デモニックファイアー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 732 || n_A_ActiveSkill == 737) {
		if(n_A_Weapon_ATKplus >= 6 && EquipNumSearch(1343)) w1 += 2 * (n_A_Weapon_ATKplus - 5);
	}

	//----------------------------------------------------------------
	// 「インペリアルガード」の、「シールドプレス」強化
	// 「インペリアルセット」の、「シールドプレス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 572){
		if(n_A_SHIELD_DEF_PLUS >= 6 && EquipNumSearch(1348)) w1 += 2 * (n_A_SHIELD_DEF_PLUS - 5);
		if(n_A_SHIELD_DEF_PLUS >= 6 && EquipNumSearch(2494)) w1 += 8 * (n_A_SHIELD_DEF_PLUS - 5);
	}

	//----------------------------------------------------------------
	// 「ウルズセット」の、「ハンドレッドスピア」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 442) {
		if(n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7 && EquipNumSearch(1581)) w1 += 50;
	}

	//----------------------------------------------------------------
	// 「白羽セット」の、「アローストーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 498) {
		if(n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7 && EquipNumSearch(1601)) w1 += 10;
	}

	//----------------------------------------------------------------
	// 「黒羽セット」の、「クラスターボム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 505) {
		if(n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7 && EquipNumSearch(1606)) w1 += 10;
	}

	//----------------------------------------------------------------
	// 「キャノンスピア」の、「キャノンスピア」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 569) {
		if(EquipNumSearch(1696)) w1 += 3 * n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「カタパルト」の、「トライアングルショット」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 608) {
		if(EquipNumSearch(1707)) w1 += 2 * n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「大型クロスボウ」の、「アローストーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 498) {
		if(EquipNumSearch(1708)) w1 += 5 * n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「機械植物帽」の、「スポアエクスプロージョン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill==736) {
		if(EquipNumSearch(2082)) w1 += 5 * ROUNDDOWN(n_A_HEAD_DEF_PLUS / 2);
	}

	//----------------------------------------------------------------
	// 「鳥狩の鉤爪」の、「ブリッツビート」強化
	// 「空飛ぶガラパゴ」の、「ブリッツビート」強化
	// 「楽園の鳥かご」の、「ブリッツビート」強化
	// 「楽園の鳥かごセット」の、「ブリッツビート」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill==118){
		if(EquipNumSearch(2187)) w1 += 10 * LearnedSkillSearch(SKILL_ID_STEEL_CROW) * EquipNumSearch(2187);
		if(EquipNumSearch(2513)) w1 += 40 * LearnedSkillSearch(SKILL_ID_STEEL_CROW);
		if(IsSameJobClass(JOB_ID_RANGER) && EquipNumSearch(2396)) w1 += 5 * n_A_HEAD_DEF_PLUS;
		if(IsSameJobClass(JOB_ID_RANGER) && EquipNumSearch(2398)) w1 += 5 * n_A_Weapon_ATKplus;
		if(IsSameJobClass(JOB_ID_RANGER) && EquipNumSearch(ITEM_ID_RAKUENNO_TORIKAGO_EXSIONNO_HANE_S2)) w1 += 5 * n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「古びた楯無の鎧」の、「シールドチェーン」「サクリファイス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill==284 || n_A_ActiveSkill==324){
		if(EquipNumSearch(2236)) w1 += 5 * ROUNDDOWN(n_A_BODY_DEF_PLUS / 2);
	}

	//----------------------------------------------------------------
	// 「ギガントアックス」の、「カートターミネーション」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill==326){
		if(EquipNumSearch(2335)) w1 += 5 * n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「ギガントヘルムセット」の、「スパイラルピアース」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill==259){
		if(EquipNumSearch(2337)) w1 += 5 * n_A_Weapon_ATKplus;
	}

	//----------------------------------------------------------------
	// 「法螺貝」の、「振動残響」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill==639 && EquipNumSearch(2430)){
		if(n_A_Weapon_ATKplus >= 5) w1 += 10;
		if(n_A_Weapon_ATKplus >= 7) w1 += 20;
		if(n_A_Weapon_ATKplus >= 9) w1 += 40;
	}

	//----------------------------------------------------------------
	// 「ルーンヘルム」の、「ストームブラスト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill==452){
		if (EquipNumSearch(ITEM_ID_RUNE_HELM) > 0) {
			w1 += 30;
			if(n_A_HEAD_DEF_PLUS >= 6) w1 += 20;
			if(n_A_HEAD_DEF_PLUS >= 8) w1 += 20;
		}
		else if (EquipNumSearch(ITEM_ID_ZYASPER_CIRCLET) > 0) {
			w1 += 30;
			if(n_A_HEAD_DEF_PLUS >= 6) w1 += 20;
			if(n_A_HEAD_DEF_PLUS >= 8) w1 += 20;
		}
		else if (EquipNumSearch(ITEM_ID_TENBINKYUNO_DIADEM) > 0) {
			if (IsSameJobClass(JOB_ID_RUNEKNIGHT)) {
				w1 += 30;
				if(n_A_HEAD_DEF_PLUS >= 6) w1 += 20;
				if(n_A_HEAD_DEF_PLUS >= 8) w1 += 20;
			}
		}
		else if (EquipNumSearch(ITEM_ID_FAFNIR_HELM) > 0) {
			w1 += 30;
			if(n_A_HEAD_DEF_PLUS >= 6) w1 += 20;
			if(n_A_HEAD_DEF_PLUS >= 8) w1 += 20;
		}

	}

	//----------------------------------------------------------------
	// 「破戒僧の数珠」の、「双龍脚」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 609){
		if(n_A_Equip[EQUIP_REGION_ID_ACCESSARY_1] == 2525)w1 += ROUNDDOWN(n_A_BaseLV / 15) * 2;
		if(n_A_Equip[EQUIP_REGION_ID_ACCESSARY_2] == 2525)w1 += ROUNDDOWN(n_A_BaseLV / 15) * 2;
	}

	//----------------------------------------------------------------
	// 「破戒僧の数珠」の、「天羅地網」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 610){
		if(n_A_Equip[EQUIP_REGION_ID_ACCESSARY_1] == 2525)w1 += ROUNDDOWN(n_A_BaseLV / 30) * 2;
		if(n_A_Equip[EQUIP_REGION_ID_ACCESSARY_2] == 2525)w1 += ROUNDDOWN(n_A_BaseLV / 30) * 2;
	}

	//----------------------------------------------------------------
	// 「破戒僧の数珠」の、「修羅身弾」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 613){
		if(n_A_Equip[EQUIP_REGION_ID_ACCESSARY_1] == 2525)w1 += ROUNDDOWN(n_A_BaseLV / 20) * 2;
		if(n_A_Equip[EQUIP_REGION_ID_ACCESSARY_2] == 2525)w1 += ROUNDDOWN(n_A_BaseLV / 20) * 2;
	}

	//----------------------------------------------------------------
	// 「アルティメットモードチェンジャー　ペオースセット」の、「ウィンドカッター」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 443){
		if(EquipNumSearch(2537)) w1 += 50 * ROUNDDOWN(n_A_SHOULDER_DEF_PLUS / 2);
		if(n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7 && EquipNumSearch(2539)) w1 += 100;
	}

	//----------------------------------------------------------------
	// 「アルティメットモードチェンジャー　黒羽セット」の、「クラスターボム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 505 && EquipNumSearch(2544)){
		w1 += SU_INT * 2;
		if(n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7) w1 += SU_INT * 2;
	}

	//----------------------------------------------------------------
	// 「アルティメットモードチェンジャー　ナブセット」の、「カウンタースラッシュ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 469 && EquipNumSearch(2569)){
		w1 += n_A_BaseLV;
		if(n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7) w1 += n_A_BaseLV;
	}

	// TODO : 謎補正
	if(TyouEnkakuSousa3dan == -1) {
		w1 += GetEquippedTotalSPEquip(5187) + GetEquippedTotalSPCardAndElse(5187);
	}

	//----------------------------------------------------------------
	// 「ソニックアクセラレーション」の、「ソニックブロー」強化
	//----------------------------------------------------------------
	if((n_A_ActiveSkill==83 || n_A_ActiveSkill==388) && UsedSkillSearch(SKILL_ID_SONIC_ACCELERATION)) {
		w1 += 10;
	}



	//----------------------------------------------------------------
	// 「貴族の仮面」の、「サクリファイス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 284) {
		w1 += 2 * n_A_BaseLV * EquipNumSearch(ITEM_ID_KIZOKUNO_KAMEN);
	}



	//----------------------------------------------------------------
	// 「レクイエムバイオリン」の、「アローバルカン」強化
	// 「レクイエムブレイドウィップ」の、「アローバルカン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 292) {
		if (EquipNumSearch(ITEM_ID_REQUIEM_VIOLIN)) {
			if (n_A_Weapon_ATKplus >= 7) w1 += 200;
		}
		if (EquipNumSearch(ITEM_ID_REQUIEM_BLADEWHIP)) {
			if (n_A_Weapon_ATKplus >= 7) w1 += 200;
		}
	}



	//----------------------------------------------------------------
	// 「古びたボーンサークレット」の、「クロスインパクト」「ダークイリュージョン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 460 || n_A_ActiveSkill == 461) {
		if(EquipNumSearch(ITEM_ID_FURUBITA_BONECIRCRET)) {
			if(n_A_HEAD_DEF_PLUS >= 7) w1 += 20;
			if(n_A_HEAD_DEF_PLUS >= 9) w1 += 15;
		}
	}

	//----------------------------------------------------------------
	// 「古びたミンストレルソングの帽子」の、「振動残響」強化
	// 「古びたバレリーナの髪飾り」の、「振動残響」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 639) {
		if(EquipNumSearch(ITEM_ID_FURUBITA_BALLERINA)
			|| EquipNumSearch(ITEM_ID_FURUBITA_MINSTRELSONG)) {
			if(n_A_HEAD_DEF_PLUS >= 7) w1 += 30;
			if(n_A_HEAD_DEF_PLUS >= 9) w1 += 20;
		}
	}

	//----------------------------------------------------------------
	// 「古びたブレイジングソウル」の、「雷光弾」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 623) {
		if(EquipNumSearch(ITEM_ID_FURUBITA_BLAZINGSOUL)) {
			if(n_A_HEAD_DEF_PLUS >= 7) w1 += 30;
			if(n_A_HEAD_DEF_PLUS >= 9) w1 += 20;
		}
	}

	//----------------------------------------------------------------
	// 「古びたドライバーバンド」の、「コールドスロワー」「フレイムスロワー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 552 || n_A_ActiveSkill == 553) {
		if(EquipNumSearch(ITEM_ID_FURUBITA_DRIVERBAND_KIRO)) {
			if(n_A_HEAD_DEF_PLUS >= 7) w1 += 30;
			if(n_A_HEAD_DEF_PLUS >= 9) w1 += 20;
		}
		if(EquipNumSearch(ITEM_ID_FURUBITA_DRIVERBAND_AKA)) {
			if(n_A_HEAD_DEF_PLUS >= 7) w1 += 30;
			if(n_A_HEAD_DEF_PLUS >= 9) w1 += 20;
		}
	}

	//----------------------------------------------------------------
	// 「古びたルーンサークレット」の、「ウィンドカッター」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 443) {
		if(EquipNumSearch(ITEM_ID_FURUBITA_RUNECIRCRET)) {
			if(n_A_HEAD_DEF_PLUS >= 7) w1 += 200;
			if(n_A_HEAD_DEF_PLUS >= 9) w1 += 150;
		}
	}

	//----------------------------------------------------------------
	// 「古びたルーンサークレット」の、「ストームブラスト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 452) {
		if(EquipNumSearch(ITEM_ID_FURUBITA_RUNECIRCRET)) {
			if(n_A_HEAD_DEF_PLUS >= 7) w1 += 50;
			if(n_A_HEAD_DEF_PLUS >= 9) w1 += 30;
		}
	}

	//----------------------------------------------------------------
	// 「古びた守護の冠」の、「キャノンスピア」「バニシングポイント」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 569 || n_A_ActiveSkill == 570) {
		if(EquipNumSearch(ITEM_ID_FURUBITA_SHUGONOKANNMURI)) {
			if(n_A_HEAD_DEF_PLUS >= 7) w1 += 20;
			if(n_A_HEAD_DEF_PLUS >= 9) w1 += 15;
		}
	}



	//----------------------------------------------------------------
	// 「サファイアリスト」の、装備効果
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == 736) {
		w1 += 5 * ROUNDDOWN(n_A_BaseLV / 20) *  EquipNumSearch(ITEM_ID_SAPPHIRE_LIST);
	}

	//----------------------------------------------------------------
	// 「エメラルドイヤリング」の、「アローバルカン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 292) {
		w1 += n_A_BaseLV * EquipNumSearch(ITEM_ID_EMERALDEARRING);
	}

	//----------------------------------------------------------------
	// 「エメラルドイヤリング」の、「ミュージカルストライク」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 199) {
		w1 += n_A_BaseLV * EquipNumSearch(ITEM_ID_EMERALDEARRING);
	}

	//----------------------------------------------------------------
	// 「エメラルドイヤリング」の、「矢撃ち」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == 207) {
		w1 += n_A_BaseLV * EquipNumSearch(ITEM_ID_EMERALDEARRING);
	}



	//----------------------------------------------------------------
	// 「元素のタオルセット」の、「アローストーム」「シビアレインストーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ARROW_STORM || n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM){

		if(n_A_Arrow == ARROW_ID_HONOONO_YA && EquipNumSearch(ITEM_SET_ID_GENSONO_TOWEL_MOERU_YUMI)) {
				w1 += 5 * n_A_Weapon_ATKplus;
		}

		if(n_A_Arrow == ARROW_ID_SUISHONO_YA && EquipNumSearch(ITEM_SET_ID_GENSONO_TOWEL_HYOTENNO_YUMI)) {
			w1 += 5 * n_A_Weapon_ATKplus;
		}

		if(n_A_Arrow == ARROW_ID_GANSEKINO_YA && EquipNumSearch(ITEM_SET_ID_GENSONO_TOWEL_DAICHINO_YUMI)) {
			w1 += 5 * n_A_Weapon_ATKplus;
		}

		if(n_A_Arrow == ARROW_ID_KAZENO_YA && EquipNumSearch(ITEM_SET_ID_GENSONO_TOWEL_HAYATENO_YUMI)) {
			w1 += 5 * n_A_Weapon_ATKplus;
		}
	}



	//----------------------------------------------------------------
	// 「アルクイエンのネックレス」の、「カートレボリューション」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CART_REVOLUTION) {
		w1 += n_A_BaseLV * EquipNumSearch(ITEM_ID_ARKUIENNO_NECKLACE);
	}

	//----------------------------------------------------------------
	// 「アルクイエンのネックレス」の、「アックストルネード」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_AXE_TORNADE) {
		w1 += ROUNDDOWN(n_A_BaseLV / 3) * EquipNumSearch(ITEM_ID_ARKUIENNO_NECKLACE);
	}

	//----------------------------------------------------------------
	// 「アルクイエンのネックレス」の、「パワースイング」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_POWER_SWING) {
		w1 +=  ROUNDDOWN(n_A_BaseLV / 5) * EquipNumSearch(ITEM_ID_ARKUIENNO_NECKLACE);
	}

	//----------------------------------------------------------------
	// 「レッドベビードラゴン」の、「ウォータードラゴンブレス」「ファイアードラゴンブレス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_WATER_DRAGON_BREATH || n_A_ActiveSkill == SKILL_ID_FIRE_DRAGON_BREATH) {

		if(EquipNumSearch(ITEM_ID_RED_BABY_DRAGON)) {

			if(n_A_HEAD_DEF_PLUS >= 6) w1 += 15;
			if(n_A_HEAD_DEF_PLUS >= 8) w1 += 15;

		}
	}

	//----------------------------------------------------------------
	// 「執行者のマント」の、「グリムトゥース」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_GRIM_TOOTH) {
		if (EquipNumSearch(ITEM_ID_SHIKKOSHANO_MANT)) {
			// スキル習得による効果
			if (LearnedSkillSearch(SKILL_ID_GRIM_TOOTH) >= 5) {
				w1 += 50;
			}

			// 過剰精錬による効果
			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				w1 += n_A_BaseLV;
			}
		}
	}

	//----------------------------------------------------------------
	// 「執行者のマント」の、「ソウルブレイカー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SOUL_BREAKER) {
		if (EquipNumSearch(ITEM_ID_SHIKKOSHANO_MANT)) {
			// スキル習得による効果
			if (LearnedSkillSearch(SKILL_ID_SOUL_BREAKER) >= 10) {
				w1 += 50;
			}

			// 過剰精錬による効果
			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				w1 += ROUNDDOWN(n_A_BaseLV / 3);
			}
		}
	}

	//----------------------------------------------------------------
	// 「執行者のマント」の、「クロスインパクト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CROSS_IMPACT) {
		if (EquipNumSearch(ITEM_ID_SHIKKOSHANO_MANT)) {
			// スキル習得による効果
			if (LearnedSkillSearch(SKILL_ID_CROSS_IMPACT) >= 5) {
				w1 += 5;
			}

			// 過剰精錬による効果
			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				w1 += ROUNDDOWN(n_A_BaseLV / 30);
			}
		}
	}



	//----------------------------------------------------------------
	// 「試験管ヘアバンド」の、「カートキャノン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CART_CANNON) {
		if (EquipNumSearch(ITEM_ID_SHIKENKAN_HAIRBAND)) {
			if (n_A_HEAD_DEF_PLUS >= 6) w1 += 20;
			if (n_A_HEAD_DEF_PLUS >= 8) w1 += 30;
		}
	}

	//----------------------------------------------------------------
	// 「試験管ヘアバンド」の、「カートトルネード」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CART_TORNADO) {
		if (EquipNumSearch(ITEM_ID_SHIKENKAN_HAIRBAND)) {
			if (n_A_HEAD_DEF_PLUS >= 6) w1 += 10;
			if (n_A_HEAD_DEF_PLUS >= 8) w1 += 20;
		}
	}



	//----------------------------------------------------------------
	// 「ショットガン系統」の、「スラッグショット」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SLUG_SHOT) {
		if (n_A_WeaponType == ITEM_KIND_SHOTGUN) {
			w1 += 7 * ROUNDDOWN(SU_STR / 10);
			if (SU_STR >= 110) {
				w1 += 30;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ライフル系統」の、「ハンマーオブゴッド」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_HAMMER_OF_GOD) {
		if (n_A_WeaponType == ITEM_KIND_RIFLE) {
			w1 += 7 * ROUNDDOWN(SU_INT / 10);
			if (SU_INT >= 110) {
				w1 += 30;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ガトリングガン系統」の、「ラウンドトリップ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ROUND_TRIP) {
		if (n_A_WeaponType == ITEM_KIND_GATLINGGUN) {
			w1 += 7 * ROUNDDOWN(SU_AGI / 10);
			if (SU_AGI >= 110) {
				w1 += 30;
			}
		}
	}

	//----------------------------------------------------------------
	// 「グレネードガン系統」の、「ドラゴンテイル」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_DRAGON_TAIL) {
		if (n_A_WeaponType == ITEM_KIND_GRENADEGUN) {
			w1 += 7 * ROUNDDOWN(SU_LUK / 10);
			if (SU_LUK >= 110) {
				w1 += 30;
			}
		}
	}



	//----------------------------------------------------------------
	// 「布都御魂」の、「黄泉返し」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_YOMIGAESHI) {
		if(n_A_Weapon_ATKplus >= 1 && n_A_Equip[EQUIP_REGION_ID_ARMS] == ITEM_ID_FUTSUNOMITAMA){
			w1 += 2 * n_A_Weapon_ATKplus;
		}
		if(n_A_Weapon2_ATKplus >= 1 && n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT] == ITEM_ID_FUTSUNOMITAMA){
			w1 += 2 * n_A_Weapon2_ATKplus;
		}
	}



	//----------------------------------------------------------------
	// 「与一の肩掛け」の、「エイムドボルト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_AIMED_BOLT) {
		if (EquipNumSearch(ITEM_ID_YOICHINO_KATAKAE)) {

			// スキル習得レベルによる効果
			if (LearnedSkillSearch(SKILL_ID_AIMED_BOLT) >= 10) {
				w1 += 5;
			}

			// 装備の過剰による効果
			if (EquipNumSearch(ITEM_ID_YOICHINO_KATAKAE)) {
				if (n_A_SHOULDER_DEF_PLUS >= 7) {
					w1 += ROUNDDOWN(n_A_BaseLV / 30);
				}
			}
		}
	}

	//----------------------------------------------------------------
	// 「与一の肩掛け」の、「シャープシューティング」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SHARP_SHOOTING) {
		if (EquipNumSearch(ITEM_ID_YOICHINO_KATAKAE)) {

			// スキル習得レベルによる効果
			if (LearnedSkillSearch(SKILL_ID_SHARP_SHOOTING) >= 5) {
				w1 += 60;
			}

			// 装備の過剰による効果
			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				w1 += ROUNDDOWN(n_A_BaseLV / 3);
			}
		}
	}

	//----------------------------------------------------------------
	// 「与一の肩掛け」の、「ブリッツビート」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BLITZ_BEAT) {
		if (EquipNumSearch(ITEM_ID_YOICHINO_KATAKAE)) {

			// スキル習得レベルによる効果
			if (LearnedSkillSearch(SKILL_ID_BLITZ_BEAT) >= 5) {
				w1 += 15;
			}

			// 装備の過剰による効果
			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				w1 += ROUNDDOWN(n_A_BaseLV / 5);
			}
		}
	}



	//----------------------------------------------------------------
	// 「シャドウリング」の、「バックスタブ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BACK_STAB) {
		w1 += 2 * n_A_BaseLV * EquipNumSearch(ITEM_ID_SHADOW_RING);
	}

	//----------------------------------------------------------------
	// 「シャドウリング」の、「トライアングルショット」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_TRIANGLE_SHOT) {
		if (TimeItemNumSearch(98)) {
			// 当強化効果はバフとしてかかるらしいので、複数装備しても効果は増えない
			w1 += ROUNDDOWN(n_A_BaseLV / 3) * 1;
		}
	}



	//----------------------------------------------------------------
	// 「パワードセット」の、「アームズキャノン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ARMS_CANNON) {
		if (EquipNumSearch(ITEM_SET_ID_POWERED_SET)) {
			w1 += 50;
			if (n_A_BODY_DEF_PLUS >= 7
				&& n_A_SHOULDER_DEF_PLUS >= 7
				&& n_A_SHOES_DEF_PLUS >= 7) {
				w1 += 50;
			}
		}
	}

	//----------------------------------------------------------------
	// 「パワードセット」の、「フレイムスロワー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FLAME_THROWER) {
		if (EquipNumSearch(ITEM_SET_ID_POWERED_SET)) {
			w1 += 50;
			if (n_A_BODY_DEF_PLUS >= 7
				&& n_A_SHOULDER_DEF_PLUS >= 7
				&& n_A_SHOES_DEF_PLUS >= 7) {
				w1 += 50;
			}
		}
	}

	//----------------------------------------------------------------
	// 「パワードセット」の、「コールドスロワー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_COLD_THROWER) {
		if (EquipNumSearch(ITEM_SET_ID_POWERED_SET)) {
			w1 += 50;
			if (n_A_BODY_DEF_PLUS >= 7
				&& n_A_SHOULDER_DEF_PLUS >= 7
				&& n_A_SHOES_DEF_PLUS >= 7) {
				w1 += 50;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ガーディアンセット」の、「バルカンアーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_VULCAN_ARM) {
		if (EquipNumSearch(ITEM_SET_ID_GUARDIAN_SET)) {
			if (n_A_BODY_DEF_PLUS >= 7
				&& n_A_SHOULDER_DEF_PLUS >= 7
				&& n_A_SHOES_DEF_PLUS >= 7) {
				w1 += 50;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ガーディアンセット」の、「ブーストナックル」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BOOST_KNUCKLE) {
		if (EquipNumSearch(ITEM_SET_ID_GUARDIAN_SET)) {
			if (n_A_BODY_DEF_PLUS >= 7
				&& n_A_SHOULDER_DEF_PLUS >= 7
				&& n_A_SHOES_DEF_PLUS >= 7) {
				w1 += 50;
			}
		}
	}



	//----------------------------------------------------------------
	// 「バイオプロテクターセット」の、「スポアエクスプロージョン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SPORE_EXPLOSION) {
		if (EquipNumSearch(ITEM_SET_ID_BIO_PROTECTOR_KIKAI_SHOKUBUTSU_BO)) {
			w1 += 5 * n_A_HEAD_DEF_PLUS;
		}
	}



	//----------------------------------------------------------------
	// 「古王の双刃」の、「クロスインパクト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CROSS_IMPACT) {
		if (EquipNumSearch(ITEM_ID_KOONO_SOZIN)) {
			w1 += 3 * n_A_Weapon_ATKplus;
		}
	}
	//----------------------------------------------------------------
	// 「古王の双刃」の、「クロスリッパーラッシャー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CROSS_RIPPER_SLASHER) {
		if (EquipNumSearch(ITEM_ID_KOONO_SOZIN)) {
			w1 += 2 * n_A_Weapon_ATKplus;
		}
	}
	//----------------------------------------------------------------
	// 「古王の双刃」の、「ローリングカッター」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ROLLING_CUTTER) {
		if (EquipNumSearch(ITEM_ID_KOONO_SOZIN)) {
			w1 += 1 * n_A_Weapon_ATKplus;
		}
	}



	//----------------------------------------------------------------
	// 「アヴェンジャーランス」の、「バニシングポイント」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BANISHING_POINT) {
		if (EquipNumSearch(ITEM_ID_AVENGER_LANCE)) {
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 20;
			}
		}
	}
	//----------------------------------------------------------------
	// 「アヴェンジャーランス」の、「ハンドレッドスピア」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_HANDRED_SPEAR) {
		if (EquipNumSearch(ITEM_ID_AVENGER_LANCE)) {
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 20;
			}
		}
	}

	//----------------------------------------------------------------
	// 「アヴェンジャーツーハンドアックス」の、「アックストルネード」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_AXE_TORNADE) {
		if (EquipNumSearch(ITEM_ID_AVENGER_TWOHAND_AXE)) {
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 20;
			}
		}
	}
	//----------------------------------------------------------------
	// 「アヴェンジャーツーハンドアックス」の、「パワースイング」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_POWER_SWING) {
		if (EquipNumSearch(ITEM_ID_AVENGER_TWOHAND_AXE)) {
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 20;
			}
		}
	}

	//----------------------------------------------------------------
	// 「アヴェンジャーハンターボウ」の、「アローストーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ARROW_STORM) {
		if (EquipNumSearch(ITEM_ID_AVENGER_HUNTERBOW)) {
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 20;
			}
		}
	}
	//----------------------------------------------------------------
	// 「アヴェンジャーハンターボウ」の、「シビアレインストーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM) {
		if (EquipNumSearch(ITEM_ID_AVENGER_HUNTERBOW)) {
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 20;
			}
		}
	}

	//----------------------------------------------------------------
	// 「アヴェンジャー風魔手裏剣」の、「風魔手裏剣-乱華」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FUMASHURIKEN_RANKA) {
		if (EquipNumSearch(ITEM_ID_AVENGER_FUMASHURIKEN)) {
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 20;
			}
		}
	}



	//----------------------------------------------------------------
	// 「ギガントブーツ　アックスセット」の、「カートターミネーション」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CART_TERMINATION) {
		if (EquipNumSearch(ITEM_SET_ID_GIGANT_BOOTS_GIGANT_AXE)) {
			if (n_A_SHOES_DEF_PLUS >= 7) {
				if (n_A_Weapon_ATKplus >= 7) w1 += 8;
				if (n_A_Weapon_ATKplus >= 9) w1 += 12;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ギガントブーツ　ボウセット」の、「アローストーム」強化
	// 「ギガントブーツ　ボウセット」の、「エイムドボルト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ARROW_STORM
		|| n_A_ActiveSkill == SKILL_ID_AIMED_BOLT) {
		if (EquipNumSearch(ITEM_SET_ID_GIGANT_BOOTS_GIGANT_BOW)) {
			if (n_A_SHOES_DEF_PLUS >= 7) {
				if (n_A_Weapon_ATKplus >= 7) w1 += 20;
				if (n_A_Weapon_ATKplus >= 9) w1 += 30;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ギガントブーツ　ランスセット」の、「スパイラルピアース」強化
	// 「ギガントブーツ　ランスセット」の、「ソニックウェーブ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SPIRAL_PIERCE
		|| n_A_ActiveSkill == SKILL_ID_SONIC_WAVE) {
		if (EquipNumSearch(ITEM_SET_ID_GIGANT_BOOTS_GIGANT_LANCE)) {
			if (n_A_Weapon_ATKplus >= 7) w1 += 20;
			if (n_A_Weapon_ATKplus >= 9) w1 += 30;
		}
	}



	//----------------------------------------------------------------
	// 「セイヴザキング」の、騎兵修練【未習得】時における、「グランドクロス」強化
	// 「セイヴザキング」の、騎兵修練【未習得】時における、「バッシュ」強化
	// 「セイヴザキング」の、騎兵修練【未習得】時における、「ホーリークロス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_GRAND_CROSS
		|| n_A_ActiveSkill == SKILL_ID_BASH
		|| n_A_ActiveSkill == SKILL_ID_HOLY_CROSS) {

		if (LearnedSkillSearch(SKILL_ID_KIHE_SHUREN) == 0) {
			if (EquipNumSearch(ITEM_ID_SAVE_THE_KING)) {
				w1 += n_A_Weapon_ATKplus * 20;
			}
		}

	}



	//----------------------------------------------------------------
	// 「反逆者のスカーフ」の、「クイックドローショット」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_QUICKDRAW_SHOT) {
		if ((itemCount = EquipNumSearch(ITEM_ID_HANGYAKUSHANO_SCARF)) > 0) {
			w1 += 5 * LearnedSkillSearch(SKILL_ID_ETERNAL_CHAIN) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「反逆者のスカーフ」の、「シャッターストーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SHUTTER_STORM) {
		if ((itemCount = EquipNumSearch(ITEM_ID_HANGYAKUSHANO_SCARF)) > 0) {
			w1 += 10 * LearnedSkillSearch(SKILL_ID_SHUTTER_STORM) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「反逆者のスカーフ」の、「ファイアーレイン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FIRE_RAIN) {
		if ((itemCount = EquipNumSearch(ITEM_ID_HANGYAKUSHANO_SCARF)) > 0) {
			w1 += 5 * LearnedSkillSearch(SKILL_ID_FIRE_RAIN) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「反逆者のスカーフ」の、「マススパイラル」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_MASS_SPIRAL) {
		if ((itemCount = EquipNumSearch(ITEM_ID_HANGYAKUSHANO_SCARF)) > 0) {
			w1 += 5 * LearnedSkillSearch(SKILL_ID_MASS_SPIRAL) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「神魔バフォメットの角」の、「デュプレライト（物理）」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_GRAHAM_LIGHT) {
		if ((itemCount = EquipNumSearch(ITEM_ID_SHINMA_BAPHOMETNO_TSUNO)) > 0) {
			w1 += 10 * n_A_HEAD_DEF_PLUS * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「神魔バフォメットの角　ブラッディクロスセット」の、「ダーククロス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_DARK_CROSS) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_SHINMA_BAPHOMETNO_TSUNO_BLOODY_CROSS)) > 0) {
			w1 += 10 * n_A_Weapon_ATKplus * itemCount;

			if (n_A_Weapon_ATKplus >= 10) {
				w1 += 100;
			}
		}
	}



	//----------------------------------------------------------------
	// 「ガーディアンプロセッサ　パイルバンカーセット」の、「バルカンアーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_VULCAN_ARM) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_GUARDIAN_PROCESSOR_PILEBUNKER)) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				w1 += 50;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 50;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ガーディアンプロセッサ　パイルバンカーセット」の、「ブーストナックル」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BOOST_KNUCKLE) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_GUARDIAN_PROCESSOR_PILEBUNKER)) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				w1 += 30;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 30;
			}
		}
	}



	//----------------------------------------------------------------
	// 「勇者の靴　達人の剣　セット」の、「バッシュ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BASH) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_KEN)) > 0) {
			w1 += 10 * LearnedSkillSearch(SKILL_ID_ENCHANT_BLADE) * itemCount;
			w1 += 10 * LearnedSkillSearch(SKILL_ID_AURA_BLADE) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「勇者の靴　達人の剣　セット」の、「ボウリングバッシュ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BOWLING_BASH) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_KEN)) > 0) {
			w1 += 10 * LearnedSkillSearch(SKILL_ID_ENCHANT_BLADE) * itemCount;
			w1 += 10 * LearnedSkillSearch(SKILL_ID_AURA_BLADE) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「業風石　ゲラドリア　セット」の、「ウィンドカッター」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_WIND_CUTTER) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_GOFUSEKI_GERADRIA)) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				w1 += 30 * itemCount;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 20 * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「ディーヴァバイオリン」の、「アローバルカン」強化
	// 「ディーヴァブレイドウィップ」の、「アローバルカン」強化
	// 「ミラージュバイオリン」の、「アローバルカン」強化
	// 「ミラージュブレイドウィップ」の、「アローバルカン」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_ARRAW_VULKAN) {
		if (EquipNumSearch(ITEM_ID_DIVA_VIOLIN)) {
			if (n_A_Weapon_ATKplus >= 7) w1 += 150;
			if (n_A_Weapon_ATKplus >= 9) w1 += 50;
		}
		if (EquipNumSearch(ITEM_ID_DIVA_BLADEWHIP)) {
			if (n_A_Weapon_ATKplus >= 7) w1 += 150;
			if (n_A_Weapon_ATKplus >= 9) w1 += 50;
		}
		if (EquipNumSearch(ITEM_ID_MIRRORAGE_VIOLIN)) {
			if (n_A_Weapon_ATKplus >= 7) w1 += 150;
			if (n_A_Weapon_ATKplus >= 9) w1 += 50;
		}
		if (EquipNumSearch(ITEM_ID_MIRRORAGE_BLADEWHIP)) {
			if (n_A_Weapon_ATKplus >= 7) w1 += 150;
			if (n_A_Weapon_ATKplus >= 9) w1 += 50;
		}
	}



	//----------------------------------------------------------------
	// 「執行者のシューズ」の、「メテオアサルト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_METEOR_ASSALT) {
		if (EquipNumSearch(ITEM_ID_SHIKKOUSHANO_SHOES)) {
			// スキル習得による効果
			if (LearnedSkillSearch(SKILL_ID_POISON_REACT) > 0) {
				w1 += 30 * LearnedSkillSearch(SKILL_ID_POISON_REACT);
			}

			// 過剰精錬による効果
			if (n_A_SHOES_DEF_PLUS >= 5) {
				w1 += n_A_BaseLV;
			}
			if (n_A_SHOES_DEF_PLUS >= 7) {
				w1 += n_A_BaseLV;
			}
		}
	}



	//----------------------------------------------------------------
	// 「獄エンチャント」の、「ストームブラスト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_STORM_BLAST) {
		if (CardNumSearch(CARD_ID_GOKU)) {
			// 職業限定の効果
			if (IsSameJobClass(JOB_ID_RUNEKNIGHT)) {
				w1 += 100;
			}
		}
	}

	//----------------------------------------------------------------
	// 「獄エンチャント」の、「ウォーグストライク」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_WUG_STRIKE) {
		if (CardNumSearch(CARD_ID_GOKU)) {
			// 職業限定の効果
			if (IsSameJobClass(JOB_ID_RANGER)) {
				w1 += 30;
			}
		}
	}



	//----------------------------------------------------------------
	// 「巨人の加護　アックスセット」の、「カートターミネーション」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CART_TERMINATION) {
		if (EquipNumSearch(ITEM_SET_ID_KYOZINNO_KAGO_GIGANT_AXE)) {
			if (n_A_Weapon_ATKplus >= 7) w1 += 5;
			if (n_A_Weapon_ATKplus >= 9) w1 += 10;
		}
	}

	//----------------------------------------------------------------
	// 「巨人の加護　ボウセット」の、「アローストーム」強化
	// 「巨人の加護　ボウセット」の、「エイムドボルト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ARROW_STORM
		|| n_A_ActiveSkill == SKILL_ID_AIMED_BOLT) {
		if (EquipNumSearch(ITEM_SET_ID_KYOZINNO_KAGO_GIGANT_BOW)) {
			if (n_A_Weapon_ATKplus >= 7) w1 += 5;
			if (n_A_Weapon_ATKplus >= 9) w1 += 10;
		}
	}

	//----------------------------------------------------------------
	// 「巨人の加護　ランスセット」の、「スパイラルピアース」強化
	// 「巨人の加護　ランスセット」の、「ソニックウェーブ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SPIRAL_PIERCE
		|| n_A_ActiveSkill == SKILL_ID_SONIC_WAVE) {
		if (EquipNumSearch(ITEM_SET_ID_KYOZINNO_KAGO_GIGANT_LANCE)) {
			if (n_A_Weapon_ATKplus >= 7) w1 += 5;
			if (n_A_Weapon_ATKplus >= 9) w1 += 10;
		}
	}



	//----------------------------------------------------------------
	// 「深淵の王の指輪」の、「クロスリッパースラッシャー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CROSS_RIPPER_SLASHER) {
		w1 += 1 * ROUNDDOWN(n_A_BaseLV / 3) * EquipNumSearch(ITEM_ID_SHINENNO_ONO_YUBIWA);
	}

	//----------------------------------------------------------------
	// 「深淵の王の指輪」の、「ローリングカッター」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ROLLING_CUTTER) {
		w1 += 1 * ROUNDDOWN(n_A_BaseLV / 10) * EquipNumSearch(ITEM_ID_SHINENNO_ONO_YUBIWA);
	}

	//----------------------------------------------------------------
	// 「キングスガード　セイヴザキング　セット」の、「グランドクロス」強化
	// 「キングスガード　セイヴザキング　セット」の、「バッシュ」強化
	// 「キングスガード　セイヴザキング　セット」の、「ホーリークロス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_GRAND_CROSS
		|| n_A_ActiveSkill == SKILL_ID_BASH
		|| n_A_ActiveSkill == SKILL_ID_HOLY_CROSS) {

		if (EquipNumSearch(ITEM_SET_ID_KINGS_GUARD_SAVE_THE_KING)) {
			w1 += n_A_SHIELD_DEF_PLUS * 20;
		}
	}



	//----------------------------------------------------------------
	// 「悪魔のカード」の、「フェイントボム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FAINT_BOMB) {
		w1 += ApplyPhysicalSkillDamageRatioChangeSubArcanaCard(CARD_ID_ARCANA_DEVIL);
	}

	//----------------------------------------------------------------
	// 「力のカード」の、「天羅地網」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_TENRACHIMO) {
		w1 += ApplyPhysicalSkillDamageRatioChangeSubArcanaCard(CARD_ID_ARCANA_POWER);
	}

	//----------------------------------------------------------------
	// 「正義のカード」の、「ハンドレッドスピア」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_HANDRED_SPEAR) {
		w1 += ApplyPhysicalSkillDamageRatioChangeSubArcanaCard(CARD_ID_ARCANA_JUSTICE);
	}

	//----------------------------------------------------------------
	// 「節制のカード」の、「アローストーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ARROW_STORM) {
		w1 += ApplyPhysicalSkillDamageRatioChangeSubArcanaCard(CARD_ID_ARCANA_SESSEI);
	}

	//----------------------------------------------------------------
	// 「戦車のカード」の、「アームズキャノン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ARMS_CANNON) {
		w1 += ApplyPhysicalSkillDamageRatioChangeSubArcanaCard(CARD_ID_ARCANA_CHARIOT);
	}

	//----------------------------------------------------------------
	// 「死神のカード」の、「ローリングカッター」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ROLLING_CUTTER) {
		w1 += ApplyPhysicalSkillDamageRatioChangeSubArcanaCard(CARD_ID_ARCANA_DEATH);
	}

	//----------------------------------------------------------------
	// 「皇帝のカード」の、「オーバーブランド」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_OVER_BLAND) {
		w1 += ApplyPhysicalSkillDamageRatioChangeSubArcanaCard(CARD_ID_ARCANA_EMPEROR);
	}

	//----------------------------------------------------------------
	// 「恋人のカード」の、「シビアレインストーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM) {
		w1 += ApplyPhysicalSkillDamageRatioChangeSubArcanaCard(CARD_ID_ARCANA_LOVERS);
	}
	if(n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM_EX) {
		w1 += ApplyPhysicalSkillDamageRatioChangeSubArcanaCard(CARD_ID_ARCANA_LOVERS);
	}

	//----------------------------------------------------------------
	// 「法王のカード」の、「カートトルネード」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CART_TORNADO) {
		w1 += ApplyPhysicalSkillDamageRatioChangeSubArcanaCard(CARD_ID_ARCANA_HOUO);
	}



	//----------------------------------------------------------------
	// 「ケミカルグローブ」の、「カートレボリューション」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CART_REVOLUTION) {
		w1 += 1 * ROUNDDOWN(n_A_BaseLV / 1) * EquipNumSearch(ITEM_ID_CHEMICAL_GLOVE);
	}

	//----------------------------------------------------------------
	// 「ケミカルグローブ」の、「カートキャノン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CART_CANNON) {
		w1 += 2 * ROUNDDOWN(n_A_BaseLV / 20) * EquipNumSearch(ITEM_ID_CHEMICAL_GLOVE);
	}

	//----------------------------------------------------------------
	// 「ケミカルグローブ」の、「カートトルネード」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CART_TORNADO) {
		w1 += 2 * ROUNDDOWN(n_A_BaseLV / 30) * EquipNumSearch(ITEM_ID_CHEMICAL_GLOVE);
	}



	//----------------------------------------------------------------
	// 「Y.S.F.0.1.セット」の、「スパイラルピアース」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SPIRAL_PIERCE) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YSF01_PLATE_FULLSET)) > 0) {
			if (n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7) {
				w1 += 100 * itemCount;
			}
			if (n_A_BODY_DEF_PLUS >= 9 && n_A_SHOULDER_DEF_PLUS >= 9 && n_A_SHOES_DEF_PLUS >= 9) {
				w1 += 100 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「Y.S.F.0.1.セット」の、「スピアブーメラン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SPEAR_BOOMERANG) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YSF01_PLATE_FULLSET)) > 0) {
			if (n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7) {
				w1 += 200 * itemCount;
			}
			if (n_A_BODY_DEF_PLUS >= 9 && n_A_SHOULDER_DEF_PLUS >= 9 && n_A_SHOES_DEF_PLUS >= 9) {
				w1 += 200 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「Y.S.F.0.1.セット」の、「ハンドレッドスピア」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_HANDRED_SPEAR) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YSF01_PLATE_FULLSET)) > 0) {
			if (n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7) {
				w1 += 100 * itemCount;
			}
			if (n_A_BODY_DEF_PLUS >= 9 && n_A_SHOULDER_DEF_PLUS >= 9 && n_A_SHOES_DEF_PLUS >= 9) {
				w1 += 100 * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「スナイピングベール」の、「マススパイラル」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_MASS_SPIRAL) {
		if ((itemCount = EquipNumSearch(ITEM_ID_SNIPING_VEIL)) > 0) {
			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				w1 += 1 * ROUNDDOWN(n_A_BaseLV / 3) * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「スナイピングベール」の、「アンチマテリアルブラスト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_UNTIMATERIAL_BLAST) {
		if ((itemCount = EquipNumSearch(ITEM_ID_SNIPING_VEIL)) > 0) {
			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				w1 += 3 * ROUNDDOWN(n_A_BaseLV / 4) * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「スナイピングベール」の、「ハンマーオブゴッド」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_HAMMER_OF_GOD) {
		if ((itemCount = EquipNumSearch(ITEM_ID_SNIPING_VEIL)) > 0) {
			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				w1 += 6 * ROUNDDOWN(n_A_BaseLV / 5) * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「英雄の指輪　達人の槌セット」の、「ホーリークロス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_HOLY_CROSS) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_TSUCHI_YUSHANO_KUTSU)) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				w1 += 50 * itemCount;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 100 * itemCount;
			}
		}
	}
	if(n_A_ActiveSkill == SKILL_ID_HOLY_CROSS) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_TSUCHI_S2_YUSHANO_KUTSU)) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				w1 += 50 * itemCount;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 100 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「英雄の指輪　達人の剣セット」の、「バッシュ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BASH) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_KEN_YUSHANO_KUTSU)) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				w1 += 100 * itemCount;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 200 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「英雄の指輪　達人の剣セット」の、「ボウリングバッシュ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BOWLING_BASH) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_KEN_YUSHANO_KUTSU)) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				w1 += 100 * itemCount;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 200 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「英雄の指輪　達人の斧セット」の、「アックストルネード」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_AXE_TORNADE) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_ONO_YUSHANO_KUTSU)) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				w1 += 20 * itemCount;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 40 * itemCount;
			}
		}
	}
	if(n_A_ActiveSkill == SKILL_ID_AXE_TORNADE) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_ONO_S2_YUSHANO_KUTSU)) > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				w1 += 20 * itemCount;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 40 * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「灰羽のブーツ　黒羽スーツセット」の、「クラスターボム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CLUSTER_BOMB) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_HAIHANENO_BOOTS_KUROHANO_SUITS)) > 0) {
			w1 += 30 * ROUNDDOWN(SU_INT / 20) * itemCount;

			if (n_A_BODY_DEF_PLUS >= 7) {
				w1 += 400 * itemCount;
			}

			if (n_A_BODY_DEF_PLUS >= 9) {
				w1 += 200 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「灰羽のブーツ　黒羽スーツセット」の、「エイムドボルト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_AIMED_BOLT) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_HAIHANENO_BOOTS_KUROHANO_SUITS)) > 0) {
			if (n_A_BODY_DEF_PLUS >= 7) {
				w1 += 20 * itemCount;
			}

			if (n_A_BODY_DEF_PLUS >= 9) {
				w1 += 10 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「灰羽のブーツ　白羽スーツセット」の、「シャープシューティング」による強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SHARP_SHOOTING) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_HAIHANENO_BOOTS_SHIRAHANO_SUITS)) > 0) {
			if (n_A_BODY_DEF_PLUS >= 7) {
				w1 += 50 * itemCount;
			}

			if (n_A_BODY_DEF_PLUS >= 9) {
				w1 += 25 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「灰羽のブーツ　白羽スーツセット」の、「ブリッツビート」による強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BLITZ_BEAT) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_HAIHANENO_BOOTS_SHIRAHANO_SUITS)) > 0) {
			if (n_A_BODY_DEF_PLUS >= 7) {
				w1 += 40 * itemCount;
			}

			if (n_A_BODY_DEF_PLUS >= 9) {
				w1 += 20 * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「物影」の、「影斬り」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_KAGEKIRI) {
		if(n_A_Equip[EQUIP_REGION_ID_ARMS] == ITEM_ID_MONOKAGE){
			w1 += 1 * n_A_BaseLV;
		}
		if(n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT] == ITEM_ID_MONOKAGE){
			w1 += 1 * n_A_BaseLV;
		}
	}

	//----------------------------------------------------------------
	// 「物影」の、「霞斬り」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_KASUMIGIRI) {
		if(n_A_Equip[EQUIP_REGION_ID_ARMS] == ITEM_ID_MONOKAGE){
			w1 += 3 * n_A_BaseLV;
		}
		if(n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT] == ITEM_ID_MONOKAGE){
			w1 += 3 * n_A_BaseLV;
		}
	}



	//----------------------------------------------------------------
	// 「大自然のギター」の、「アローバルカン」強化
	// 「大自然のロープ」の、「アローバルカン」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_ARRAW_VULKAN) {
		if (EquipNumSearch(ITEM_ID_DAISHIZENNO_GUITAR)) {
			if (n_A_Weapon_ATKplus >= 7) w1 += 150;
			if (n_A_Weapon_ATKplus >= 9) w1 += 50;
		}
		if (EquipNumSearch(ITEM_ID_DAISHIZENNO_ROPE)) {
			if (n_A_Weapon_ATKplus >= 7) w1 += 150;
			if (n_A_Weapon_ATKplus >= 9) w1 += 50;
		}
	}



	//----------------------------------------------------------------
	// 「用心棒のスカーフ」の、「風魔手裏剣投げ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FUMASHURIKEN_NAGE) {
		if ((itemCount = EquipNumSearch(ITEM_ID_YOZINBONO_SCARF)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_FUMASHURIKEN_NAGE) >= 5) {
				w1 += 50 * itemCount;
			}

			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				w1 += 1 * ROUNDDOWN(n_A_BaseLV / 1) * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「用心棒のスカーフ」の、「風魔手裏剣-乱華-」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FUMASHURIKEN_RANKA) {
		if ((itemCount = EquipNumSearch(ITEM_ID_YOZINBONO_SCARF)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_FUMASHURIKEN_RANKA) >= 5) {
				w1 += 30 * itemCount;
			}

			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				w1 += 1 * ROUNDDOWN(n_A_BaseLV / 3) * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「鉱員のリュック」の、「マグマイラプション」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_MAGMA_ILLUPTION) {
		if ((itemCount = EquipNumSearch(ITEM_ID_KOINNNO_RUCKSACK)) > 0) {
			w1 += 10 * n_A_SHOULDER_DEF_PLUS * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「スカラバハイヒール　エルヴンボウセット」の、「シビアレインストーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM || n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM_EX) {
		if (EquipNumSearchMIG(ITEM_SET_ID_SCARABA_HIGHHEEL_ELVEN_BOW) > 0) {
			if (n_A_SHOES_DEF_PLUS >= 7) {
				if (n_A_Weapon_ATKplus >= 8) w1 += 8;
				if (n_A_Weapon_ATKplus >= 10) w1 += 12;
			}
		}
	}



	//----------------------------------------------------------------
	// 「スカラバハイヒール　ドゥルガーセット」の、「ローリングカッター」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ROLLING_CUTTER) {
		if ((itemCount = EquipNumSearchMIG(ITEM_SET_ID_SCARABA_HIGHHEEL_DULLGER)) > 0) {
			vartmp = 0;

			if (n_A_Weapon_ATKplus >= 7)  vartmp += 8;
			if (n_A_Weapon_ATKplus >= 9)  vartmp += 12;

			w1 += vartmp * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「エメラルドリング」の、「アローシャワー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ARROW_SHOWER) {
		if ((itemCount = EquipNumSearch(ITEM_ID_EMERALD_RING)) > 0) {
			w1 += 1 * n_A_BaseLV * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「エメラルドリング」の、「ダブルストレイフィング」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_DOUBLE_STRAFING) {
		if ((itemCount = EquipNumSearch(ITEM_ID_EMERALD_RING)) > 0) {
			w1 += 1 * n_A_BaseLV * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「エメラルドリング」の、「シビアレインストーム」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM || n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM_EX) {
		if ((itemCount = EquipNumSearch(ITEM_ID_EMERALD_RING)) > 0) {
			w1 += 2 * ROUNDDOWN(n_A_BaseLV / 10) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「悪魔の手」の、「獅子吼」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SISIKO) {
		if ((itemCount = EquipNumSearch(ITEM_ID_AKUMANO_TE)) > 0) {
			if (n_A_HEAD_DEF_PLUS >= 7) {
				w1 += 30 * itemCount;
			}
			if (n_A_HEAD_DEF_PLUS >= 9) {
				w1 += 50 * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「不死鳥の冠」の、「オーバーブランド」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_OVER_BLAND) {
		if ((itemCount = EquipNumSearch(ITEM_ID_FUSHICHONO_KANMURI)) > 0) {
			if (n_A_HEAD_DEF_PLUS >= 7) {
				w1 += 15 * itemCount;
			}
			if (n_A_HEAD_DEF_PLUS >= 9) {
				w1 += 25 * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「おもちゃの指輪」の、「バッシュ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BASH) {
		if ((itemCount = EquipNumSearch(ITEM_ID_OMOCHANO_YUBIWA)) > 0) {
			w1 += 1 * ROUNDDOWN(n_A_BaseLV / 1) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「おもちゃの指輪」の、「ボウリングバッシュ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BOWLING_BASH) {
		if ((itemCount = EquipNumSearch(ITEM_ID_OMOCHANO_YUBIWA)) > 0) {
			w1 += 3 * ROUNDDOWN(n_A_BaseLV / 5) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「特選ウサギのお守り」の、「キャロットビート」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CARROT_BEAT) {
		if ((itemCount = EquipNumSearch(ITEM_ID_TOKUSEN_USAGINO_OMAMORI)) > 0) {
			w1 += 1 * ROUNDDOWN(n_A_BaseLV / 10) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「虹色のスカーフ」の、「アローストーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ARROW_STORM) {
		if ((itemCount = EquipNumSearch(ITEM_ID_NIZIIRONO_SCARF)) > 0) {
			w1 += 1 * LearnedSkillSearch(SKILL_ID_AIMED_BOLT) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「イリュージョン名射手のりんご」の、「ダブルストレイフィング」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_DOUBLE_STRAFING) {
		if (EquipNumSearch(ITEM_ID_ILLUSION_MEISHASHUNO_RINGO)) {
			if (n_A_BaseLV >= 170) {
				w1 += 70;
			}
		}
	}



	//----------------------------------------------------------------
	// 「イリュージョン神の使者」の、「シールドチェーン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SHIELD_CHAIN) {
		if (EquipNumSearch(ITEM_ID_ILLUSION_KAMINO_SHISHA)) {
			if (n_A_BaseLV >= 170) {
				w1 += 15;
			}
		}
	}

	//----------------------------------------------------------------
	// 「イリュージョン神の使者」の、「シールドブーメラン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SHIELD_BOOMERANG) {
		if (EquipNumSearch(ITEM_ID_ILLUSION_KAMINO_SHISHA)) {
			if (n_A_BaseLV >= 170) {
				w1 += 15;
			}
		}
	}



	//----------------------------------------------------------------
	// 「イリュージョンポールアクス」の、「スパイラルピアース」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SPIRAL_PIERCE) {
		if (EquipNumSearch(ITEM_ID_ILLUSION_POLE_AXE)) {
			if (n_A_BaseLV >= 170) {
				w1 += 15 * n_A_Weapon_ATKplus;
			}
		}
	}



	//----------------------------------------------------------------
	// 「イリュージョンウォーアクス」の、「アックスブーメラン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_AXE_BOOMERANG) {
		if (EquipNumSearch(ITEM_ID_ILLUSION_WAR_AXE)) {
			if (n_A_BaseLV >= 170) {
				w1 += 10 * n_A_Weapon_ATKplus;
			}
		}
	}



	//----------------------------------------------------------------
	// 「インペリアルブーツ」の、「バニシングポイント」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BANISHING_POINT) {
		if ((itemCount = EquipNumSearch(ITEM_ID_IMPERIAL_BOOTS)) > 0) {
			w1 += 10 * LearnedSkillSearch(SKILL_ID_CANNON_SPEAR) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「勇者のブローチ　勇者のジャッジメントローブセット」の、「地雷震」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ZIRAISHIN) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANO_BROACH_YUSHANO_JUDGEMENT_ROBE)) > 0) {
			w1 += 5 * n_A_BODY_DEF_PLUS * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「勇者のブローチ　勇者のジャッジメントローブセット」の、「双龍脚」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SORYUKYAKU) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANO_BROACH_YUSHANO_JUDGEMENT_ROBE)) > 0) {
			w1 += 5 * n_A_BODY_DEF_PLUS * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「勇者のブローチ　勇者のジャッジメントローブセット」の、「天羅地網」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_TENRACHIMO) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANO_BROACH_YUSHANO_JUDGEMENT_ROBE)) > 0) {
			w1 += 5 * n_A_BODY_DEF_PLUS * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「勇者のブローチ　勇者のプレートセット」の、「バニシングポイント」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BANISHING_POINT) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANO_BROACH_YUSHANO_PLATE)) > 0) {
			w1 += 5 * n_A_BODY_DEF_PLUS * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「勇者のブローチ　勇者のプレートセット」の、「ストームブラスト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_STORM_BLAST) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANO_BROACH_YUSHANO_PLATE)) > 0) {
			w1 += 5 * n_A_BODY_DEF_PLUS * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「キングスメイル　セイヴザキングセット」の、「グランドクロス」強化
	// 「キングスメイル　セイヴザキングセット」の、「バッシュ」強化
	// 「キングスメイル　セイヴザキングセット」の、「ホーリークロス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_GRAND_CROSS
		|| n_A_ActiveSkill == SKILL_ID_BASH
		|| n_A_ActiveSkill == SKILL_ID_HOLY_CROSS) {

		if (EquipNumSearch(ITEM_SET_ID_KINGS_MAIL_SAVE_THE_KING)) {
			w1 += 20 * n_A_BODY_DEF_PLUS;
		}

	}



	//----------------------------------------------------------------
	// 「古龍ジラントカード」の、「ウォータードラゴンブレス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_WATER_DRAGON_BREATH) {
		if ((itemCount = CardNumSearch(CARD_ID_KORYU_ZIRANT, CARD_REGION_ID_ACCESSARY_1_ANY)) > 0) {
			w1 += 50 * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「古龍ジラントカード」の、「ファイアードラゴンブレス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FIRE_DRAGON_BREATH) {
		if ((itemCount = CardNumSearch(CARD_ID_KORYU_ZIRANT, CARD_REGION_ID_ACCESSARY_2_ANY)) > 0) {
			w1 += 50 * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「エンチャント　反逆者」の、「ラウンドトリップ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ROUND_TRIP) {
		if ((cardCount = CardNumSearch(CARD_ID_ENCHANT_HANGYAKUSHA)) > 0) {
			if (SU_AGI >= 110) {
				w1 += 30 * ROUNDDOWN((SU_AGI - 110) / 5) * cardCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「エンチャント　反逆者」の、「ドラゴンテイル」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_DRAGON_TAIL) {
		if ((cardCount = CardNumSearch(CARD_ID_ENCHANT_HANGYAKUSHA)) > 0) {
			if (SU_LUK >= 110) {
				w1 += 30 * ROUNDDOWN((SU_LUK - 110) / 5) * cardCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「イリュージョン熱血鉢巻き」の、「天羅地網」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_TENRACHIMO) {
		if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_NEKKETSU_HACHIMAKI)) > 0) {
			if (n_A_BaseLV >= 170) {
				w1 += 5 * n_A_HEAD_DEF_PLUS * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「螺旋風魔の宝珠」の、「風魔手裏剣投げ」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FUMASHURIKEN_NAGE) {
		if ((itemCount = EquipNumSearch(ITEM_ID_RASEN_FUMANO_HOZYU)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_GENZYUTSU_KAGEMUSHA) >= 5) {
				w1 += 2 * Math.floor(n_A_BaseLV / 4) * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「螺旋風魔の宝珠」の、「風魔手裏剣-乱華-」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FUMASHURIKEN_RANKA) {
		if ((itemCount = EquipNumSearch(ITEM_ID_RASEN_FUMANO_HOZYU)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_GENZYUTSU_KAGEMUSHA) >= 5) {
				w1 += 1 * Math.floor(n_A_BaseLV / 4) * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「フロンティアブーツ　自警団の弓セット」の、「シビアレインストーム」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FRONTIER_BOOTS_ZIKEDANNO_YUMI)) > 0) {
			if (n_A_SHOES_DEF_PLUS >= 7) {
				if (SU_INT >= 120) {
					w1 += 50 * itemCount;
				}
			}
		}
	}
	if (n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM_EX) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FRONTIER_BOOTS_ZIKEDANNO_YUMI)) > 0) {
			if (n_A_SHOES_DEF_PLUS >= 7) {
				if (SU_INT >= 120) {
					w1 += 50 * itemCount;
				}
			}
		}
	}

	//----------------------------------------------------------------
	// 「フロンティアブーツ　自警団の弓セット」の、「トライアングルショット」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_TRIANGLE_SHOT) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FRONTIER_BOOTS_ZIKEDANNO_YUMI)) > 0) {
			if (n_A_SHOES_DEF_PLUS >= 7) {
				if (SU_INT >= 120) {
					w1 += 50 * itemCount;
				}
			}
		}
	}

	//----------------------------------------------------------------
	// 「悪鬼羅刹の指輪」の、「獅子吼」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_SISIKO) {
		if ((itemCount = EquipNumSearch(ITEM_ID_AKKI_RASETSUNO_YUBIWA)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_BAKKISANDAN) >= 5) {
				w1 += 30 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「悪鬼羅刹の指輪」の、「修羅身弾」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_SHURASHINDAN) {
		if ((itemCount = EquipNumSearch(ITEM_ID_AKKI_RASETSUNO_YUBIWA)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_BAKKISANDAN) >= 5) {
				w1 += 100 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ジャガーノート」の、「バニシングバスター」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_BUNISHING_BASTER) {
		if ((itemCount = EquipNumSearch(ITEM_ID_JAGUAR_NOTE)) > 0) {
			w1 += 60 * LearnedSkillSearch(SKILL_ID_BUNISHING_BASTER) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ジャガーノート」の、「ファイアーレイン」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_FIRE_RAIN) {
		if ((itemCount = EquipNumSearch(ITEM_ID_JAGUAR_NOTE)) > 0) {
			w1 += 50 * LearnedSkillSearch(SKILL_ID_FIRE_RAIN) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ジャガーノート」の、「ハウリングマイン」強化
	//----------------------------------------------------------------
	if ((n_A_ActiveSkill == SKILL_ID_HOWLING_MINE)
		|| (n_A_ActiveSkill == SKILL_ID_HOWLING_MINE_APPEND)) {
		if ((itemCount = EquipNumSearch(ITEM_ID_JAGUAR_NOTE)) > 0) {
			w1 += 40 * LearnedSkillSearch(SKILL_ID_HOWLING_MINE) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「ウルティオ-OS」の、「デュプレライト（物理）」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_GRAHAM_LIGHT) {
		itemCountRight = EquipNumSearch(ITEM_ID_ULTIO_OS, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_ULTIO_OS, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			w1 += 7 * n_A_BaseLV * itemCountRight;
			w1 += 7 * n_A_BaseLV * itemCountLeft;
		}
	}



	//----------------------------------------------------------------
	// 「バーチャルボウ-OS」の、「クラスターボム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CLUSTER_BOMB) {
		itemCountRight = EquipNumSearch(ITEM_ID_VIRTUAL_BOW_OS, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_VIRTUAL_BOW_OS, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			w1 += 4 * n_A_BaseLV * itemCountRight;
			w1 += 4 * n_A_BaseLV * itemCountLeft;
		}
	}



	//----------------------------------------------------------------
	// 「MH-P89-OS」の、「振動残響」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SHINDOZANKYO) {
		itemCountRight = EquipNumSearch(ITEM_ID_MH_P89_OS, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_MH_P89_OS, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			w1 += 1 * Math.floor(n_A_BaseLV / 2) * itemCountRight;
			w1 += 1 * Math.floor(n_A_BaseLV / 2) * itemCountLeft;
		}
	}



	//----------------------------------------------------------------
	// 「ハートハンター・ベラレカード」の、「スプレッドアタック」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SPREAD_ATTACK) {
		if ((itemCount = CardNumSearch(CARD_ID_HEART_HUNTER_BELLARE)) > 0) {
			w1 += 3 * n_A_BaseLV * itemCount;

			if (IsSameJobClass(JOB_ID_REBELLION)) {
				w1 += 2 * n_A_BaseLV * itemCount;

				if (n_A_SHOES_DEF_PLUS >= 9) {
					w1 += 1 * n_A_BaseLV * itemCount;
				}
			}
		}
	}



	//----------------------------------------------------------------
	// 「ハートハンター・Mベラレカード」の、「ラピッドシャワー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_RAPID_SHOWER) {
		if ((itemCount = CardNumSearch(CARD_ID_HEART_HUNTER_M_BELLARE)) > 0) {
			w1 += 1 * n_A_BaseLV * itemCount;

			if (IsSameJobClass(JOB_ID_REBELLION)) {
				w1 += 1 * n_A_BaseLV * itemCount;

				if (n_A_SHOES_DEF_PLUS >= 9) {
					w1 += 1 * n_A_BaseLV * itemCount;
				}
			}
		}
	}



	//----------------------------------------------------------------
	// 「不調和の思念体シューズ　ウィンドゲイル　セット」の、「アローシャワー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ARROW_SHOWER) {
		itemCount = EquipNumSearch(ITEM_SET_ID_FUCHOWANO_SHINENTAI_SHOES_WIND_GAIL);
		if (itemCount > 0) {
			w1 += 4 * n_A_BaseLV * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「不調和の思念体シューズ　ウィンドゲイル　セット」の、「シビアレインストーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM) {
		itemCount = EquipNumSearch(ITEM_SET_ID_FUCHOWANO_SHINENTAI_SHOES_WIND_GAIL);
		if (itemCount > 0) {
			w1 += 1 * Math.floor(n_A_BaseLV / 2) * itemCount;
		}
	}

	if(n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM_EX) {
		itemCount = EquipNumSearch(ITEM_SET_ID_FUCHOWANO_SHINENTAI_SHOES_WIND_GAIL);
		if (itemCount > 0) {
			w1 += 1 * Math.floor(n_A_BaseLV / 2) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「不調和の思念体シューズ　シャープスター　セット」の、「シャープシューティング」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SHARP_SHOOTING) {
		itemCount = EquipNumSearch(ITEM_SET_ID_FUCHOWANO_SHINENTAI_SHOES_SHARP_STAR);
		if (itemCount > 0) {
			w1 += 1 * n_A_BaseLV * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「不調和の思念体シューズ　シャープスター　セット」の、「ダブルストレイフィング」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_DOUBLE_STRAFING) {
		itemCount = EquipNumSearch(ITEM_SET_ID_FUCHOWANO_SHINENTAI_SHOES_SHARP_STAR);
		if (itemCount > 0) {
			w1 += 2 * n_A_BaseLV * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「不調和の思念体シューズ　ファルケンシューター　セット」の、「ブリッツビート」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BLITZ_BEAT) {
		itemCount = EquipNumSearch(ITEM_SET_ID_FUCHOWANO_SHINENTAI_SHOES_FALCEN_SHOOTER);
		if (itemCount > 0) {
			w1 += 2 * n_A_BaseLV * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「不調和の思念体シューズ　ファルケンシューター　セット」の、「ウォーグストライク」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_WUG_STRIKE) {
		itemCount = EquipNumSearch(ITEM_SET_ID_FUCHOWANO_SHINENTAI_SHOES_FALCEN_SHOOTER);
		if (itemCount > 0) {
			w1 += 1 * Math.floor(n_A_BaseLV / 2) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「ビリー・コスルリースカード」の、「インベナム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ENVENOM) {
		cardCount = CardNumSearch(CARD_ID_BILLY_COSRLEASE);
		if (cardCount > 0) {
			w1 += 2 * n_A_BaseLV * cardCount;
		}
	}



	//----------------------------------------------------------------
	// 「イフォドスカード」の、「スピアブーメラン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SPEAR_BOOMERANG) {
		cardCount = CardNumSearch(CARD_ID_IFODOS);
		if (cardCount > 0) {
			w1 += 4 * n_A_BaseLV * cardCount;
		}
	}



	//----------------------------------------------------------------
	// 「ユメヒメカード」の、「アローシャワー」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_ARROW_SHOWER) {
		cardCount = CardNumSearch(CARD_ID_YUMEHIME);
		if (cardCount > 0) {
			w1 += 2 * n_A_BaseLV * cardCount;
		}
	}



	//----------------------------------------------------------------
	// 「イリュージョンミリタリーブーツ」の、「アックストルネード」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_AXE_TORNADE) {
		itemCount = EquipNumSearch(ITEM_ID_ILLUSION_MILITARY_BOOTS);
		if (itemCount > 0) {
			w1 += 30 * LearnedSkillSearch(SKILL_ID_AXE_BOOMERANG) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「イリュージョンミリタリーブーツ」の、「アックスブーメラン」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_AXE_BOOMERANG) {
		itemCount = EquipNumSearch(ITEM_ID_ILLUSION_MILITARY_BOOTS);
		if (itemCount > 0) {
			w1 += 20 * LearnedSkillSearch(SKILL_ID_AXE_BOOMERANG) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「暴威のマフラー」の、「シビアレインストーム」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM) {
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_BOINO_MUFFLER)) > 0) {
			w1 += 2 * LearnedSkillSearch(SKILL_ID_FRIGNO_UTA) * itemCount;
		}
	}
	if(n_A_ActiveSkill == SKILL_ID_SEVERE_RAINSTORM_EX) {
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_BOINO_MUFFLER)) > 0) {
			w1 += 2 * LearnedSkillSearch(SKILL_ID_FRIGNO_UTA) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「メタルスティック」の、「バニシングポイント」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_BANISHING_POINT) {
		itemCountRight = EquipNumSearch(ITEM_ID_METAL_STICK, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_METAL_STICK, EQUIP_REGION_ID_ARMS_LEFT);

		if ((itemCountRight + itemCountLeft) > 0) {
			w1 += 2 * n_A_BaseLV * (itemCountRight + itemCountLeft);
		}

		if (itemCountRight > 0) {
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 1 * n_A_BaseLV * itemCountRight;
			}
		}

		if (itemCountLeft > 0) {
			if (n_A_Weapon2_ATKplus >= 9) {
				w1 += 1 * n_A_BaseLV * itemCountLeft;
			}
		}
	}



	//----------------------------------------------------------------
	// 「氷炎悪神の刃鎌」の、「メナーナイト」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_MAMMONITE) {
		itemCountRight = EquipNumSearch(ITEM_ID_HYOEN_AKUSHINNO_HAGAMA, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_HYOEN_AKUSHINNO_HAGAMA, EQUIP_REGION_ID_ARMS_LEFT);

		if ((itemCountRight + itemCountLeft) > 0) {
			w1 += 10 * n_A_BaseLV * (itemCountRight + itemCountLeft);
		}
	}



	//----------------------------------------------------------------
	// 「追撃者のシューズ」の、「フェイタルメナス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_FATAL_MENUS) {
		itemCount = EquipNumSearch(ITEM_ID_TSUIGEKISHANO_SHOES);
		if (itemCount > 0) {
			w1 += 10 * LearnedSkillSearch(SKILL_ID_KEN_SHUREN) * itemCount;
			w1 += 10 * LearnedSkillSearch(SKILL_ID_KEN_SHUREN_GENETIC) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「よちよちウリボウスタイ」の、「アニマル系スキル」短縮
	//----------------------------------------------------------------
	if ( (n_A_ActiveSkill == SKILL_ID_PIKKI_TSUKI)
			|| (n_A_ActiveSkill == SKILL_ID_TAROUNO_KIZU)
			|| (n_A_ActiveSkill == SKILL_ID_CARROT_BEAT)
			|| (n_A_ActiveSkill == SKILL_ID_SAVAGENO_TAMASHI)
	) {
		if ((itemCount = EquipNumSearch(ITEM_ID_YOCHIYOCHI_URIBO_SUTAI)) > 0) {
			w1 += 15 * LearnedSkillSearch(SKILL_ID_SAVAGENO_TAMASHI) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「試験管ブーツ」の、「カートトルネード」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_CART_TORNADO) {
		itemCount = EquipNumSearch(ITEM_ID_SHIKENKAN_BOOTS);
		if (itemCount > 0) {
			w1 += 10 * LearnedSkillSearch(SKILL_ID_CRAZY_WEED) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「溶岩のマント」の、「アックストルネード」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_AXE_TORNADE) {
		itemCount = EquipNumSearch(ITEM_ID_YOGANNO_MANT);
		if (itemCount > 0) {
			w1 += 20 * LearnedSkillSearch(SKILL_ID_AXE_BOOMERANG) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「溶岩のマント」の、「パワースイング」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_POWER_SWING) {
		itemCount = EquipNumSearch(ITEM_ID_YOGANNO_MANT);
		if (itemCount > 0) {
			w1 += 20 * LearnedSkillSearch(SKILL_ID_AXE_BOOMERANG) * itemCount;
		}
	}




	//----------------------------------------------------------------
	// 「ファフニールブレス」の、「ファイアードラゴンブレス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_FIRE_DRAGON_BREATH) {
		itemCount = EquipNumSearch(ITEM_ID_FAFNIR_BREATH);
		if (itemCount > 0) {
			w1 += 20 * LearnedSkillSearch(SKILL_ID_DRAGON_HOWLING) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ファフニールブレス」の、「ウォータードラゴンブレス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_WATER_DRAGON_BREATH) {
		itemCount = EquipNumSearch(ITEM_ID_FAFNIR_BREATH);
		if (itemCount > 0) {
			w1 += 20 * LearnedSkillSearch(SKILL_ID_DRAGON_HOWLING) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「追撃者のリング」の、「フェイタルメナス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_FATAL_MENUS) {
		itemCount = EquipNumSearch(ITEM_ID_TSUIGEKISHANO_RING);
		if (itemCount > 0) {
			w1 += 1 * Math.floor(n_A_BaseLV / 3) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「天魔外道の外套」の、「獅子吼」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_SISIKO) {
		itemCount = EquipNumSearch(ITEM_ID_TENMA_GEDONO_GAITO);
		if (itemCount > 0) {
			w1 += 15 * LearnedSkillSearch(SKILL_ID_BAKKISANDAN) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「ルーングリーブ」の、「スパイラルピアース」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_SPIRAL_PIERCE) {
		itemCount = EquipNumSearch(ITEM_ID_RUNE_GREEVE);
		if (itemCount > 0) {
			w1 += 40 * LearnedSkillSearch(SKILL_ID_DRAGON_HOWLING) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ルーングリーブ」の、「ハンドレッドスピア」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_HANDRED_SPEAR) {
		itemCount = EquipNumSearch(ITEM_ID_RUNE_GREEVE);
		if (itemCount > 0) {
			w1 += 40 * LearnedSkillSearch(SKILL_ID_DRAGON_HOWLING) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「ポルックスリング」の、「温もり」強化
	//----------------------------------------------------------------
	if ((n_A_ActiveSkill == SKILL_ID_NUKUMORI) || (n_A_ActiveSkill == SKILL_ID_NUKUMORI_KABE)) {
		if (IsSameJobClass(JOB_ID_STAR_EMPEROR)) {
			itemCount = EquipNumSearch(ITEM_ID_POLLUX_RING);
			if (itemCount > 0) {
				w1 += 100 * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「科学者のマント」の、「スポアエクスプロージョン」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_SPORE_EXPLOSION) {
		itemCount = EquipNumSearch(ITEM_ID_KAGAKUSHANO_MANT);
		if (itemCount > 0) {
			w1 += 20 * LearnedSkillSearch(SKILL_ID_FIRE_EXPANSION) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「スローステキスト」の、「温もり」強化
	//----------------------------------------------------------------
	if ((n_A_ActiveSkill == SKILL_ID_NUKUMORI) || (n_A_ActiveSkill == SKILL_ID_NUKUMORI_KABE)) {

		itemCountRight = EquipNumSearch(ITEM_ID_SLOTH_TEXT, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_SLOTH_TEXT, EQUIP_REGION_ID_ARMS_LEFT);

		if (itemCountRight > 0) {
			if (n_A_Weapon_ATKplus >= 7) {
				w1 += 50 * itemCountRight;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				w1 += 50 * itemCountRight;
			}
		}

		if (itemCountLeft > 0) {
			if (n_A_Weapon2_ATKplus >= 7) {
				w1 += 50 * itemCountLeft;
			}
			if (n_A_Weapon2_ATKplus >= 9) {
				w1 += 50 * itemCountLeft;
			}
		}
	}



	//----------------------------------------------------------------
	// 「パワードウィング」の、「アームズキャノン」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_ARMS_CANNON) {
		itemCount = EquipNumSearchMIG(ITEM_ID_POWERED_WING);
		if (itemCount > 0) {
			w1 += 25 * LearnedSkillSearch(SKILL_ID_PILE_BUNKER) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「パワードウィング」の、「コールドスローワー」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_COLD_THROWER) {
		itemCount = EquipNumSearchMIG(ITEM_ID_POWERED_WING);
		if (itemCount > 0) {
			w1 += 25 * LearnedSkillSearch(SKILL_ID_PILE_BUNKER) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「パワードウィング」の、「フレイムスローワー」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_FLAME_THROWER) {
		itemCount = EquipNumSearchMIG(ITEM_ID_POWERED_WING);
		if (itemCount > 0) {
			w1 += 25 * LearnedSkillSearch(SKILL_ID_PILE_BUNKER) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「エリュマントスの皮」の、「アローストーム」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_ARROW_STORM) {
		itemCount = EquipNumSearchMIG(ITEM_ID_ERYMANTHNO_KAWA);
		if (itemCount > 0) {
			w1 += 1 * LearnedSkillSearch(SKILL_ID_AIMED_BOLT) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「インペリアルガトリングスーツ」の、「ファイアーレイン」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_FIRE_RAIN) {
		itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_GATLING_SUIT);
		if (itemCount > 0) {
			w1 += 20 * LearnedSkillSearch(SKILL_ID_HEAT_BARREL) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「グレースガトリングスーツ」の、「ファイアーレイン」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_FIRE_RAIN) {
		itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_GATLING_SUIT);
		if (itemCount > 0) {
			w1 += 50 * LearnedSkillSearch(SKILL_ID_HEAT_BARREL) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「インペリアルクルシフォームスーツ」の、「十文字斬り」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_ZYUMONZIGIRI) {
		itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_CRUCIFORM_SUIT);
		if (itemCount > 0) {
			w1 += 15 * Math.floor(LearnedSkillSearch(SKILL_ID_ZYUMONZIGIRI) / 5) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「グレースクルシフォームスーツ」の、「十文字斬り」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_ZYUMONZIGIRI) {
		itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_CRUCIFORM_SUIT);
		if (itemCount > 0) {
			w1 += 15 * Math.floor(LearnedSkillSearch(SKILL_ID_ZYUMONZIGIRI) / 2) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「グロトネリーア」の、「トライアングルショット」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_TRIANGLE_SHOT) {
		itemCount = EquipNumSearchMIG(ITEM_ID_GLOTONERIA);
		if (itemCount > 0) {
			w1 += 50 * LearnedSkillSearch(SKILL_ID_MAELSTORM) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「グロトネリーア」の、「フェイントボム」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_FAINT_BOMB) {
		itemCount = EquipNumSearchMIG(ITEM_ID_GLOTONERIA);
		if (itemCount > 0) {
			w1 += 15 * LearnedSkillSearch(SKILL_ID_MAELSTORM) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「山岳ヘルメット」の、「パワースイング」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_POWER_SWING) {
		if (TimeItemNumSearch(TIME_ITEM_ID_SANGAKU_HELMET)) {
			w1 += 1 * SU_VIT;
		}
	}



	//----------------------------------------------------------------
	// 「インペリアルアーティススーツ」の、「ボウリングバッシュ」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_BOWLING_BASH) {
		itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_ARTIS_SUIT);
		if (itemCount > 0) {
			if (LearnedSkillSearch(SKILL_ID_ONO_SHUREN) >= 10) {
				w1 += 2 * Math.floor(n_A_BaseLV / 3) * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「グレースアーティススーツ」の、「ボウリングバッシュ」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_BOWLING_BASH) {
		itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_ARTIS_SUIT);
		if (itemCount > 0) {
			if (LearnedSkillSearch(SKILL_ID_ONO_SHUREN) >= 10) {
				w1 += 2 * n_A_BaseLV * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「インペリアルコンフィデンシャルメイル」の、「ソニックウェーブ」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_SONIC_WAVE) {
		itemCount = EquipNumSearch(ITEM_ID_IMPERIAL_CONFIDENCIAL_MAIL);
		if (itemCount > 0) {
			if (LearnedSkillSearch(SKILL_ID_DEATH_BOUND) >= 10) {
				w1 += 1 * Math.floor(n_A_BaseLV / 3) * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「グレースコンフィデンシャルメイル」の、「ソニックウェーブ」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_SONIC_WAVE) {
		itemCount = EquipNumSearch(ITEM_ID_GRACE_CONFIDENCIAL_MAIL);
		if (itemCount > 0) {
			if (LearnedSkillSearch(SKILL_ID_DEATH_BOUND) >= 10) {
				w1 += 1 * n_A_BaseLV * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「アヴァレーツォ」の、「カウンタースラッシュ」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_COUNTER_SLASH) {
		itemCount = EquipNumSearch(ITEM_ID_AVARECO);
		if (itemCount > 0) {
			w1 += 6 * LearnedSkillSearch(SKILL_ID_CROSS_IMPACT) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「アヴァレーツォ」の、「クロスインパクト」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_CROSS_IMPACT) {
		itemCount = EquipNumSearch(ITEM_ID_AVARECO);
		if (itemCount > 0) {
			w1 += 30 * LearnedSkillSearch(SKILL_ID_CROSS_IMPACT) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「パラケルススコート」の、「カートキャノン」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_CART_CANNON) {
		itemCount = EquipNumSearch(ITEM_ID_PARACELSUS_COAT);
		if (itemCount > 0) {
			if (LearnedSkillSearch(SKILL_ID_FIRE_EXPANSION) >= 5) {
				w1 += 2 * n_A_BaseLV * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「パラケルススコート」の、「カートトルネード」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_CART_TORNADO) {
		itemCount = EquipNumSearch(ITEM_ID_PARACELSUS_COAT);
		if (itemCount > 0) {
			if (LearnedSkillSearch(SKILL_ID_FIRE_EXPANSION) >= 5) {
				w1 += 1 * n_A_BaseLV * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ドラゴニックオーラ」の「ウォータードラゴンブレス」「ファイアードラゴンブレス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_WATER_DRAGON_BREATH || n_A_ActiveSkill == SKILL_ID_FIRE_DRAGON_BREATH) {
		w1 += 15 * (dragonic_aura_lv - 1)
	}

	//----------------------------------------------------------------
	// 「ツインヘッド・ドラゴンメイル」「ツインヘッド・ドラゴンブーツ」の、「ウォータードラゴンブレス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_WATER_DRAGON_BREATH) {
		itemCount = EquipNumSearch(ITEM_ID_TWIN_HEAD_DRAGON_MAIL);
		if (itemCount > 0) {
			w1 += 10 * LearnedSkillSearch(SKILL_ID_WATER_DRAGON_BREATH) * itemCount;
		}
		itemCount = EquipNumSearch(ITEM_ID_TWIN_HEAD_DRAGON_BOOTS);
		if (itemCount > 0) {
			w1 += 10 * LearnedSkillSearch(SKILL_ID_WATER_DRAGON_BREATH) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ツインヘッド・ドラゴンメイル」「ツインヘッド・ドラゴンブーツ」の、「ファイアードラゴンブレス」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_FIRE_DRAGON_BREATH) {
		itemCount = EquipNumSearch(ITEM_ID_TWIN_HEAD_DRAGON_MAIL);
		if (itemCount > 0) {
			w1 += 10 * LearnedSkillSearch(SKILL_ID_FIRE_DRAGON_BREATH) * itemCount;
		}
		itemCount = EquipNumSearch(ITEM_ID_TWIN_HEAD_DRAGON_BOOTS);
		if (itemCount > 0) {
			w1 += 10 * LearnedSkillSearch(SKILL_ID_FIRE_DRAGON_BREATH) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ゾディアック　巨蟹宮のマント」セットの、職業による効果
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_AXE_TORNADE) {
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_KYOKAIKYUNO_MANT)) {
			if (IsSameJobClass(JOB_ID_MECHANIC)) {
				w1 += 10 * n_A_SHOULDER_DEF_PLUS;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ゾディアック　金牛宮のダイアデム」セットの、職業による効果
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_CART_CANNON) {
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_KINGYUKYUNO_DIADEM)) {
			if (IsSameJobClass(JOB_ID_GENETIC)) {
				w1 += 5 * n_A_HEAD_DEF_PLUS;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ゾディアック　金牛宮のマント」セットの、職業による効果
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_CART_TORNADO) {
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_KINGYUKYUNO_MANT)) {
			if (IsSameJobClass(JOB_ID_GENETIC)) {
				w1 += 5 * n_A_SHOULDER_DEF_PLUS;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ゾディアック　金牛宮のシューズ」セットの、職業による効果
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_CART_CANNON) {
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_KINGYUKYUNO_SHOES)) {
			if (IsSameJobClass(JOB_ID_GENETIC)) {
				w1 += 15 * n_A_SHOES_DEF_PLUS;
			}
		}
	}
	if (n_A_ActiveSkill == SKILL_ID_CART_TORNADO) {
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_KINGYUKYUNO_SHOES)) {
			if (IsSameJobClass(JOB_ID_GENETIC)) {
				w1 += 10 * n_A_SHOES_DEF_PLUS;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ゾディアック　天秤宮のシューズ」セットの、職業による効果
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_WATER_DRAGON_BREATH) {
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_TENBINKYUNO_SHOES)) {
			if (IsSameJobClass(JOB_ID_RUNEKNIGHT)) {
				w1 += 5 * n_A_SHOES_DEF_PLUS;
			}
		}
	}
	if (n_A_ActiveSkill == SKILL_ID_FIRE_DRAGON_BREATH) {
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_TENBINKYUNO_SHOES)) {
			if (IsSameJobClass(JOB_ID_RUNEKNIGHT)) {
				w1 += 5 * n_A_SHOES_DEF_PLUS;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ゾディアック　磨羯宮のマント」セットの、職業による効果
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_TRIANGLE_SHOT) {
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_MAKATSUKYUNO_MANT)) {
			if (IsSameJobClass(JOB_ID_SHADOWCHASER)) {
				w1 += 15 * n_A_SHOULDER_DEF_PLUS;
			}
		}
	}



	//----------------------------------------------------------------
	// 「エンドオブザワールド」の、「カウンタースラッシュ」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_COUNTER_SLASH) {
		itemCount = EquipNumSearch(ITEM_ID_END_OF_THE_WORLD);
		if (itemCount > 0) {
			w1 += 6 * LearnedSkillSearch(SKILL_ID_ROLLING_CUTTER) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「エンドオブザワールド」の、「ローリングカッター」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_ROLLING_CUTTER) {
		itemCount = EquipNumSearch(ITEM_ID_END_OF_THE_WORLD);
		if (itemCount > 0) {
			w1 += 100 * LearnedSkillSearch(SKILL_ID_ROLLING_CUTTER) * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「シンフルオパールリング」の、「温もり」強化
	//----------------------------------------------------------------
	if ((n_A_ActiveSkill == SKILL_ID_NUKUMORI) || (n_A_ActiveSkill == SKILL_ID_NUKUMORI_KABE)) {
		itemCount = EquipNumSearch(ITEM_ID_SINFUL_OPAL_RING);
		if (itemCount > 0) {
			w1 += 100 * itemCount;
		}
	}



	//----------------------------------------------------------------
	// 「光輝」の、「雷光弾」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_RAIKODAN) {
		itemCount = EquipNumSearchMIG(ITEM_ID_KOKI);
		if (itemCount > 0) {
			if (LearnedSkillSearch(SKILL_ID_SENDENPO) >= 5) {
				w1 += 2 * n_A_BaseLV * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「プラチナムアビトレイター」の、「キャノンスピア」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_CANNON_SPEAR) {
		itemCount = EquipNumSearchMIG(ITEM_ID_PLATINUM_ARBITRATOR);
		if (itemCount > 0) {
			if (LearnedSkillSearch(SKILL_ID_CANNON_SPEAR) >= 5) {
				w1 += 1 * Math.floor(n_A_BaseLV / 2) * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「プラチナムアビトレイター」の、「バニシングポイント」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_BANISHING_POINT) {
		itemCount = EquipNumSearchMIG(ITEM_ID_PLATINUM_ARBITRATOR);
		if (itemCount > 0) {
			if (LearnedSkillSearch(SKILL_ID_CANNON_SPEAR) >= 5) {
				w1 += 2 * Math.floor(n_A_BaseLV / 2) * itemCount;
			}
		}
	}



	//----------------------------------------------------------------
	// 「ゾディアック　特選ドラムケープセット」の、「アニマル系スキル」強化
	//----------------------------------------------------------------
	if ( (n_A_ActiveSkill == SKILL_ID_PIKKI_TSUKI)
			|| (n_A_ActiveSkill == SKILL_ID_TAROUNO_KIZU)
			|| (n_A_ActiveSkill == SKILL_ID_CARROT_BEAT)
			|| (n_A_ActiveSkill == SKILL_ID_SAVAGENO_TAMASHI)
	) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_ENCHANT_ZODIAC_TOKUSEN_DORAM_CAPE)) > 0) {
			w1 += 5 * n_A_SHOULDER_DEF_PLUS * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「猪突猛進」の、「アニマル系スキル」強化
	//----------------------------------------------------------------
	if ( (n_A_ActiveSkill == SKILL_ID_PIKKI_TSUKI)
			|| (n_A_ActiveSkill == SKILL_ID_TAROUNO_KIZU)
			|| (n_A_ActiveSkill == SKILL_ID_CARROT_BEAT)
			|| (n_A_ActiveSkill == SKILL_ID_SAVAGENO_TAMASHI)
	) {
		if (TimeItemNumSearch(TIME_ITEM_ID_CHOTOTSU_MOUSHIN) > 0) {
			w1 += Math.min(100, charaData[CHARA_DATA_INDEX_MAXHP] / 1000);
		}
	}



	//★★★★★★★★★★★★★★★★★★★
	//★★★★ roro 側にも反映のこと ★★★★
	//★★★★★★★★★★★★★★★★★★★





	//----------------------------------------------------------------
	// 「ヘビィメタリンカード」の、「カートレボリューション」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill == SKILL_ID_CART_REVOLUTION) {
		w1 += 50 * CardNumSearch(549);
	}





	//----------------------------------------------------------------
	// 「両手槍装備」の、「ホーリークロス」強化
	//----------------------------------------------------------------
	if(n_A_ActiveSkill==SKILL_ID_HOLY_CROSS && n_A_WeaponType == 5) {
		w1 += 100;
	}

	//----------------------------------------------------------------
	// 「メランコリー」の、「各種スキル」強化
	//----------------------------------------------------------------
	if(n_A_PassSkill3[42]){
		switch (n_A_ActiveSkill) {
		case 73:
		case 158:
		case 159:
		case 259:
		case 324:
		case 384:
		case 442:
		case 572:
			w1 += (5 * n_A_PassSkill3[42]);
		}
	}

	//----------------------------------------------------------------
	// 「ダンスウィズウォーグ」の、「ウォーグ系スキル」強化
	//----------------------------------------------------------------
	if(n_A_PassSkill3[39] == 6 || n_A_PassSkill3[39] == 7){
		if(n_A_ActiveSkill==511 || n_A_ActiveSkill==513 || n_A_ActiveSkill==516){
			if(n_A_PassSkill3[41] >= 7) w1 += (10 * n_A_PassSkill3[40]) * 7;
			else w1 += (10 * n_A_PassSkill3[40]) * n_A_PassSkill3[41];
		}
	}

	//----------------------------------------------------------------
	// 「幻術-分身-」の、「体術忍法」強化
	//----------------------------------------------------------------
	switch (n_A_ActiveSkill) {
	case SKILL_ID_BAKURETSU_KUNAI:
	case SKILL_ID_HAPPO_KUNAI:
	case SKILL_ID_ZYUMONZIGIRI:
	case SKILL_ID_FUMASHURIKEN_RANKA:
		if (g_confDataSanzi[CCharaConfSanzi.CONF_ID_BUNSHIN] > 0) {
			w1 += 20;
		}
	}

	//----------------------------------------------------------------
	// 「太陽の光」の、「太陽爆発」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_TAIYO_BAKUHATSU) {
		if (UsedSkillSearch(SKILL_ID_TAIYONO_HIKARI) > 0) {

			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				w1 += 100 + 5 * UsedSkillSearch(SKILL_ID_TAIYONO_HIKARI);
				break;

			default:
				w1 += 25 + 5 * UsedSkillSearch(SKILL_ID_TAIYONO_HIKARI);
				break;

			}
		}
	}

	//----------------------------------------------------------------
	// 「月の光」の、「満月脚」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_MANGETSU_KYAKU) {
		if (UsedSkillSearch(SKILL_ID_TSUKINO_HIKARI) > 0) {

			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				w1 += 100 + 5 * UsedSkillSearch(SKILL_ID_TSUKINO_HIKARI);
				break;

			default:
				w1 += 25 + 5 * UsedSkillSearch(SKILL_ID_TSUKINO_HIKARI);
				break;

			}
		}
	}

	//----------------------------------------------------------------
	// 「星の光」の、「流星落下」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_RYUSE_RAKKA) {
		if (UsedSkillSearch(SKILL_ID_HOSHINO_HIKARI) > 0) {

			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				w1 += 100 + 5 * UsedSkillSearch(SKILL_ID_HOSHINO_HIKARI);
				break;

			default:
				w1 += 25 + 5 * UsedSkillSearch(SKILL_ID_HOSHINO_HIKARI);
				break;

			}
		}
	}

	//----------------------------------------------------------------
	// 「ミスティックシンフォニー」の、「ロゼブロッサム」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_ROSE_BLOSSOM) {
		if (UsedSkillSearch(SKILL_ID_MYSTIC_SYMPHONY) > 0) {
			w1 += 50;
		}
	}

	//----------------------------------------------------------------
	// 「ミスティックシンフォニー」の、「リズムシューティング」強化
	//----------------------------------------------------------------
	if (n_A_ActiveSkill == SKILL_ID_RHYTHM_SHOOTING) {
		if (UsedSkillSearch(SKILL_ID_MYSTIC_SYMPHONY) > 0) {
			w1 += 50;
		}
	}





	//----------------------------------------------------------------
	// 「性能カスタマイズ欄」の、「○○スキルで攻撃時ダメージ上昇」強化
	//----------------------------------------------------------------
	confBaseLvBy = g_objCharaConfCustomSkill.GetConf(CCharaConfCustomSkill.CONF_ID_SKILL_DAMAGE_UP_BASE_LEVEL_BY);
	confval = g_objCharaConfCustomSkill.GetConf(CCharaConfCustomSkill.CONF_ID_SKILL_DAMAGE_UP);
	if (n_A_ActiveSkill != 0) {
		if (confval != 0) {
			if (confBaseLvBy > 0) {
				w1 += confval * Math.floor(n_A_BaseLV / confBaseLvBy);
			}
			else {
				w1 += confval;
			}
		}
	}



	//----------------------------------------------------------------
	// 戦闘計算情報に保持されているダメージ増幅の適用
	//----------------------------------------------------------------
	w1 += battleCalcInfo.dmgAmpRate;



	// 装備自体の当該スキル強化値、カード自体の当該スキル強化値を適用する
	w1 += GetEquippedTotalSPEquip(5000 + n_A_ActiveSkill) + GetEquippedTotalSPCardAndElse(5000 + n_A_ActiveSkill)

	// TODO: データ移行過渡処理
	// 計算したSP効果を、移行前のデータ形式に変換して、加算する
	if (IsEnableMigrationBlockTransit()) {

		var spTag = null;

		spTag = new CMigEquipableSpTag()
			.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL, g_skillManager.GetBaseSkillId(n_A_ActiveSkill))
			.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT);

		w1 += g_charaDataManager.GetCharaData(MIG_CHARA_MANAGER_ID_MAIN).GetSpValue(spTag, null, MIG_EFFECTIVE_SP_CALC_MODE_SUM);
		w1 += g_charaDataManager.GetCharaData(MIG_CHARA_MANAGER_ID_MAIN).GetSetSpValue(spTag, null, MIG_EFFECTIVE_SP_CALC_MODE_SUM);
	}

//********************************************************************************************************************************
//********************************************************************************************************************************
//****
//**** ★★★★　装備セット等のスキル補正　ここまで　★★★★
//****
//********************************************************************************************************************************
//********************************************************************************************************************************

	return w1;
}


/**
 * 物理判定攻撃に対するスキル倍率の増減を適用する.
 * @param wBaiCI ダメージ
 * @param dmgType ダメージタイプ（0:最小、1:平均、2:最大）
 * @param bCri クリティカルフラグ
 * @return 適用後のダメージ
 * TODO 謎パラメタ
 */
function ApplyPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData, dmg, dmgType, bCri, bLeft) {

	var w1 = 0;

	var bEffective = false;
	var powWork = 0;
	var lvWork = 0;



	// バックスタブ、かつ、弓装備時の、ダメージ半減効果
	if (n_A_ActiveSkill == SKILL_ID_BACK_STAB) {
		if (n_A_WeaponType == ITEM_KIND_BOW) {
			dmg = Math.floor(dmg / 2);
		}
	}



	// TODO : ポイズンリアクトと拳聖スキルだけ別計算？

	// ポイズンリアクト
	if(n_A_ActiveSkill==86 && (50 <= mobData[18] && mobData[18] <60)) {
		dmg = Math.floor(dmg * (100 + 30 * n_A_ActiveSkillLV) /100);
	}

	// ○○の怒りは、素ＡＴＫ計算へ移動（『○○の怒り』で検索可）

	dmg = ApplyLexAeterna(mobData, dmg);
	dmg = ApplyRegistPVPEnergyCoat(mobData, dmg);



	// 物理ダメージ倍率強化を取得
	w1 = GetPhysicalSkillDamageRatioChange(battleCalcInfo, charaData, specData, mobData);



	// dmg に対して、ここまでで求めた強化値、装備自体の当該スキル強化値、カード自体の当該スキル強化値を適用する
	dmg = ROUNDDOWN(dmg * (100 + w1) / 100);



	// ジャイアントグロースの効果補正
	switch (n_A_ActiveSkill) {
	case SKILL_ID_TUZYO_KOGEKI:
	case SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT:
	// 左手は乗らないように
	case SKILL_ID_TUZYO_KOGEKI_CALC_KATAR_APPEND:

		if ((UsedSkillSearch(SKILL_ID_GIANT_GROWTH) || g_confDataSanzi[CCharaConfSanzi.CONF_ID_GIANT_GLOTH])
			&& (mobData[21] <= 4 || mobData[21] >= 10)) {

			switch (dmgType) {

			case 1:
				dmg = ROUNDDOWN(dmg * 145 / 100);
				break;

			case 2:
				dmg = dmg * 3;
				break;
			}
		}
	}

	// 「冷凍状態」のダメージ増減効果
	if(n_B_IJYOU[35] == 1){
		switch (n_A_ActiveSkill) {
		case 118:	// ブリッツビート
		case 271:	// ファルコンアサルト
		case 106:	// ランドマイン
		case 112:	// ブラストマイン
		case 113:	// クレイモアトラップ
		case 159:	// シールドブーメラン
		case 447:	// ファイアードラゴンブレス
		case 734:	// ヘルズプラント
		case 794:	// ウォータードラゴンブレス
			// 上記スキルは、冷凍状態の影響を受けない
			break;

		default:
			// 武器種類による補正の適用
			if(n_A_WeaponType == 6 || n_A_WeaponType == 7 || n_A_WeaponType == 8) dmg = Math.floor(dmg * 1.5);
			if(n_A_WeaponType == 1 || n_A_WeaponType == 2 || n_A_WeaponType == 3 || n_A_WeaponType == 10) dmg -= Math.floor(dmg / 2);
		}
	}

	// TODO : 謎補正。シールドプレスの何か
	if(n_A_ActiveSkill==572){
		dmg += Math.max(0, n_A_VIT * n_A_SHIELD_DEF_PLUS);
		dmg = ApplyElementRatio(mobData, dmg,0);
	}

	// クリティカルダメージ補正（左手は乗らない）
	if (bCri) {
		if (!bLeft) {

			// 特性ステータス対応
			var criDmgRate = ApplyCRateAmplify(140);

			dmg = Math.floor(dmg * criDmgRate /100);
		}
	}



	// ダメージカット効果の適用
	dmg = ApplyAttackDamageAmplify(mobData, dmg);

	// ダメージ計算後の複数ＨＩＴ判定スキルに対する補正
	w1 = 100;

	switch (n_A_ActiveSkill) {

	// 双龍脚
	case SKILL_ID_SORYUKYAKU:

		// YEマップでない場合（コロッセオを除く）のみ、増加
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
		// case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
			break;

		default:
			w1 += 100;
			break;
		}

		break;

	// 大纏崩捶
	case SKILL_ID_DAITENHOSUI:
		// 全マップで増加（計算式が特殊なため、ここで300%に補正する）
		w1 += 200;
		break;

	// フェイントボム
	case SKILL_ID_FAINT_BOMB:
		// 一般マップでのみ、増加
		if (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA] == MOB_CONF_PLAYER_ID_SENTO_AREA_NONE) {
			w1 += 100;
		}
		break;

	// スポアエクスプロージョン
	case SKILL_ID_SPORE_EXPLOSION:
		// 一般マップでのみ、増加
		if (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA] == MOB_CONF_PLAYER_ID_SENTO_AREA_NONE) {
			w1 += 100;
		}
		break;


// 2023/01/24 のパッチで効果がなくなったのか未確認
/*
	// ローリングカッター
	case SKILL_ID_ROLLING_CUTTER:

		// 一般マップでない、かつ、YE系マップでない場合のみ、増加
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

		case MOB_CONF_PLAYER_ID_SENTO_AREA_NONE:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
			break;

		default:
			w1 += 50;
			break;

		}

		break;

	// クロスリッパーラッシャー
	case SKILL_ID_CROSS_RIPPER_SLASHER:

		// 一般マップでない、かつ、YE系マップでない場合のみ、増加
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

		case MOB_CONF_PLAYER_ID_SENTO_AREA_NONE:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
			break;

		default:
			w1 += 50;
			break;

		}

		break;

	// ブーストナックル
	case SKILL_ID_BOOST_KNUCKLE:

		// 一般マップでない、かつ、YE系マップでない場合のみ、増加
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

		case MOB_CONF_PLAYER_ID_SENTO_AREA_NONE:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
			break;

		default:
			w1 += 100;
			break;

		}

		break;

	// パイルバンカー
	case SKILL_ID_PILE_BUNKER:

		// 一般マップでない、かつ、YE系マップでない場合のみ、増加
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

		case MOB_CONF_PLAYER_ID_SENTO_AREA_NONE:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
			break;

		default:
			w1 += 100;
			break;

		}

		break;

	// バルカンアーム
	case SKILL_ID_VULCAN_ARM:

		// 一般マップでない、かつ、YE系マップでない場合のみ、増加
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

		case MOB_CONF_PLAYER_ID_SENTO_AREA_NONE:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
			break;

		default:
			w1 += 200;
			break;

		}

		break;
*/


	}

	dmg = ROUNDDOWN(dmg * w1 / 100);



	return Math.floor(dmg);
 }

/**
 * 物理判定攻撃に対するスキル倍率の増減を適用する（サブ）（アルカナカード系）
 * @param カードID
 * @return 倍率
 */
function ApplyPhysicalSkillDamageRatioChangeSubArcanaCard(cardid) {
	var vartmp = 0;

	cardCountArmsRight	 = CardNumSearch(cardid, CARD_REGION_ID_ARMS_RIGHT_ANY);
	cardCountArmsLeft	 = CardNumSearch(cardid, CARD_REGION_ID_ARMS_LEFT_ANY);
	cardCountHeadTop	 = CardNumSearch(cardid, CARD_REGION_ID_HEAD_TOP_ANY);
	cardCountHeadMid	 = CardNumSearch(cardid, CARD_REGION_ID_HEAD_MID_ANY);
	cardCountShield		 = CardNumSearch(cardid, CARD_REGION_ID_SHIELD_ANY);
	cardCountBody		 = CardNumSearch(cardid, CARD_REGION_ID_BODY_ANY);
	cardCountShoulder	 = CardNumSearch(cardid, CARD_REGION_ID_SHOULDER_ANY);
	cardCountShoes		 = CardNumSearch(cardid, CARD_REGION_ID_SHOES_ANY);
	cardCountAccessary1	 = CardNumSearch(cardid, CARD_REGION_ID_ACCESSARY_1_ANY);
	cardCountAccessary2	 = CardNumSearch(cardid, CARD_REGION_ID_ACCESSARY_2_ANY);

	vartmp += 1 * n_A_Weapon_ATKplus * cardCountArmsRight;
	vartmp += 1 * n_A_Weapon2_ATKplus * cardCountArmsLeft;
	vartmp += 1 * n_A_HEAD_DEF_PLUS * cardCountHeadTop;
	vartmp += 1 * n_A_SHIELD_DEF_PLUS * cardCountShield;
	vartmp += 1 * n_A_BODY_DEF_PLUS * cardCountBody;
	vartmp += 1 * n_A_SHOULDER_DEF_PLUS * cardCountShoulder;
	vartmp += 1 * n_A_SHOES_DEF_PLUS * cardCountShoes;

	if (n_A_Weapon_ATKplus >= 10)		vartmp += 5 * cardCountArmsRight;
	if (n_A_Weapon2_ATKplus >= 10)		vartmp += 5 * cardCountArmsLeft;
	if (n_A_HEAD_DEF_PLUS >= 10)		vartmp += 5 * cardCountHeadTop;
	if (n_A_SHIELD_DEF_PLUS >= 10)		vartmp += 5 * cardCountShield;
	if (n_A_BODY_DEF_PLUS >= 10)		vartmp += 5 * cardCountBody;
	if (n_A_SHOULDER_DEF_PLUS >= 10)	vartmp += 5 * cardCountShoulder;
	if (n_A_SHOES_DEF_PLUS >= 10)		vartmp += 5 * cardCountShoes;

	return vartmp;
}



/**
 * レックスエーテルナ系効果を適用する.
 * @param dmg ダメージ
 * @return 適用後のダメージ
 */
function ApplyLexAeterna(mobData, dmg) {

	// TODO : 謎判定
	if(n_AS_MODE==0){

		// レックスエーテルナ状態の場合
		if(n_B_IJYOU[6] && wLAch == 0){

			// チェーンライトニング、テトラボルテックス以外の場合（多段判定以外の場合）
			if(n_A_ActiveSkill != 530 && n_A_ActiveSkill != 532) return (dmg * 2);

		}
	}

	var w_num = 0;

	// サプライズアタック後状態の場合
	if(n_B_IJYOU[33]){
		// TODO : 謎判定
		if(mobData[20] == 1) w_num = 10;
		else w_num = 20;
	}
	dmg = ROUNDDOWN(dmg * (100 + w_num) / 100);

	return dmg;
 }





/**
 * ダメージ期待値を計算する.
 * @param dmg ダメージ
 * @return ダメージ期待値
 */
function CalcMeanDamage(skillId, charaData, specData, mobData, attackMethodConfArray, dmgSandansho, dmgFearBleath, dmgCritical, dmgNormal) {

	// 三段掌　ダメージ倍率期待値
	var meanDmgSandansho = GetActHitRateSandansho(skillId, mobData) * dmgSandansho;

	// フィアーブリーズ　ダメージ倍率期待値
	var meanDmgFearBleath = GetActHitRateFearBleath(skillId, mobData) * dmgFearBleath;

	// ダブルアタック　ダメージ倍率期待値
	var meanDmgDA = GetActHitRateDA(skillId, mobData) * dmgNormal * 2;

	// TODO : 謎処理　カタール装備時の通常攻撃
	if (n_A_WeaponType == 11 && n_A_ActiveSkill==0 && 5 <= mobData[21] && mobData[21] <= 9) {
		meanDmgDA = GetActHitRateDA(skillId, mobData) * 3;
	}

	// クリティカル攻撃　ダメージ期待値
	var meanDmgCritical = GetActRateCritical(skillId, mobData) * n_A_CriATK[1];

	// 通常攻撃　ダメージ期待値
	var meanDmgNormal = GetActHitRateNormal(skillId, mobData) * dmgNormal;

	// 攻撃ミス　ダメージ期待値（つまり、必中ダメージ期待値）
	var meanDmgPerfect = (100 - GetActHitRateAll(skillId, mobData)) * ApplyHitJudgeElementRatio(n_A_ActiveSkill, GetPerfectHitDamage(charaData, specData, mobData, attackMethodConfArray), mobData);

	// 最終的なダメージ期待値
	var meanDmgAll = (meanDmgSandansho + meanDmgFearBleath + meanDmgDA + meanDmgCritical + meanDmgNormal + meanDmgPerfect) / 100;

	return meanDmgAll;
}





/**
 * ダメージ期待値を計算する（左手用）.
 * @param dmg ダメージ
 * @return ダメージ期待値
 */
function CalcMeanDamageLeftHand(skillId, mobData, dmg) {

	var meanDmgNormal = dmg * (100 - GetActHitRateSandansho(skillId, mobData)) * w_HIT / 100 / 100;
	var meanDmgAll = meanDmgNormal;

	return meanDmgAll;
}





function UsedSkillSearch(sklId, bOnlyUsed = false) {

	var sklLv = 0;
	var effectivLvArray = [0];
	var bAvoidRecalc = false;



	// スキル欄のみの場合
	if (bOnlyUsed) {
		return UsedSkillSearchSubUsedOnly(sklId);
	}



	// 時限アイテム欄等で指定するスキル
	switch (sklId) {

	// バーサーク
	case SKILL_ID_BERSERK:
		if (TimeItemNumSearch(35)) effectivLvArray.push(1);
		if (TimeItemNumSearch(111)) effectivLvArray.push(1);
		break;

	// オーバートラストマックス
	case SKILL_ID_OVER_TRUST_MAX:
		if (TimeItemNumSearch(112)) effectivLvArray.push(5);
		break;

	// 魔法力増幅
	case SKILL_ID_MAHORYOKU_ZOFUKU:
		if ((sklLv = g_confDataNizi[CCharaConfNizi.CONF_ID_MAHORYOKU_ZOFUKU]) > 0) {
			effectivLvArray.push(sklLv);
		}
		if (TimeItemNumSearch(113)) effectivLvArray.push(5);
		break;

	// オーラブレイド
	case SKILL_ID_AURA_BLADE:
		if ((sklLv = g_confDataNizi[CCharaConfNizi.CONF_ID_AURA_BLADE]) > 0) {
			effectivLvArray.push(sklLv);
		}
		break;

	// トゥルーサイト
	case SKILL_ID_TRUE_SIGHT:
		if (TimeItemNumSearch(TIME_ITEM_ID_LEASER_OF_EAGLE_TRUE_SIGHT)) {
			effectivLvArray.push(2);
		}
		if (TimeItemNumSearch(TIME_ITEM_ID_JITTER_BUG)) {
			effectivLvArray.push(1);
		}
		break;

	// 金剛
	case SKILL_ID_KONGO:
		if ((sklLv = g_confDataNizi[CCharaConfNizi.CONF_ID_KONGO]) > 0) {
			effectivLvArray.push(sklLv);
		}
		break;

	// 集中力向上
	case SKILL_ID_SHUCHURYOKU_KOZYO:
		if (TimeItemNumSearch(TIME_ITEM_ID_VNDER_CANMER_SHUCHURYOKU_KOZYO) > 0){
			effectivLvArray.push(5);
		}
		else if ((bufLv = g_confDataIchizi[CCharaConfIchizi.CONF_ID_SHUCHURYOKU_KOZYO]) > 0) {
			effectivLvArray.push(bufLv);
		}
		else if (TimeItemNumSearch(TIME_ITEM_ID_BLUE_RIBBON) > 0) {
			effectivLvArray.push(2);
		}
		else if (TimeItemNumSearch(4) > 0) {
			effectivLvArray.push(1);;
		}
		break;

	// アンリミット
	case SKILL_ID_UNLIMIT:
		if ((bufLv = g_confDataSanzi[CCharaConfSanzi.CONF_ID_UNLIMIT]) > 0) {
			effectivLvArray.push(bufLv);
		}
		else if (TimeItemNumSearch(TIME_ITEM_ID_GULARUSION_UNLIMIT) > 0) {
			effectivLvArray.push(5);
		}
		else if (TimeItemNumSearch(TIME_ITEM_ID_TRAVELER_RING_GOKETSU) > 0) {
			effectivLvArray.push(5);
		}
		else if (TimeItemNumSearch(TIME_ITEM_ID_DARK_TRIAD) > 0) {
			effectivLvArray.push(5);
		}
		else if (TimeItemNumSearch(TIME_ITEM_ID_URUNO_KAGO) > 0) {
			effectivLvArray.push(5);
		}
		else if (TimeItemNumSearch(TIME_ITEM_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_WIND_HAWK_3) > 0) {
			effectivLvArray.push(5);
		}
		else if (TimeItemNumSearch(TIME_ITEM_ID_TRIANGLE_DISASTER) > 0) {
			effectivLvArray.push(5);
		}
		else if (TimeItemNumSearch(TIME_ITEM_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_SHADOW_CHASER_2) > 0) {
			effectivLvArray.push(5);
		}		
		break;

	// テレキネシスインテンス
	case SKILL_ID_TELECHINESIS_INSTENCE:
		if (TimeItemNumSearch(TIME_ITEM_ID_ILLUSION_ANCIENT_DUGGER_TELECHINESIS_INSTENCE) > 0) {
			effectivLvArray.push(3);
		}
		break;

	// 三段掌
	case SKILL_ID_SANDANSHO:

		// 「陣羽織」による、追加発動効果
		if (EquipNumSearch(ITEM_ID_ZINBAORI)) {

			if (n_A_SHOULDER_DEF_PLUS >= 9) {
				effectivLvArray.push(10);
			}
			else if (n_A_SHOULDER_DEF_PLUS >= 7) {
				effectivLvArray.push(5);
			}
			else {
				effectivLvArray.push(3);
			}
		}

		// 「混沌のサイドワインダーカード」による、追加発動効果
		if (CardNumSearch(CARD_ID_KONTONNO_SIDEWINDER)) {
			effectivLvArray.push(5);
		}

		// 「変異キメラガレンシスカード」による、追加発動効果
		if (CardNumSearch(CARD_ID_HENI_CHIMERA_GALENSIS, CARD_REGION_ID_HEAD_TOP_ANY)) {
			effectivLvArray.push(n_A_HEAD_DEF_PLUS);
		}
		break;

	// ダブルアタック
	case SKILL_ID_DOUBLE_ATTACK:

		// 「サイドワインダーカード」の効果
		if (CardNumSearch(CARD_ID_SIDEWINDER)) {
			effectivLvArray.push(1);
		}

		// 「ひよこちゃん」の効果
		if (EquipNumSearch(ITEM_ID_HIYOKOCHAN)) {
			effectivLvArray.push(2);
		}

		// 「[レンタル] ひよこちゃん」の効果
		if (EquipNumSearch(ITEM_ID_HIYOKOCHAN_RENTAL)) {
			effectivLvArray.push(2);
		}

		// 「バレンタイン帽　反対派の証セット」の効果
		if (EquipNumSearch(ITEM_SET_ID_VALENTINE_BO_HANTAIHANO_AKASHI)) {
			effectivLvArray.push(2);
		}

		// 「彷徨う者の羽織　傘セット」の効果
		if (EquipNumSearch(ITEM_SET_ID_SAMAYOUMONONO_HAORI_KASA)) {
			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				effectivLvArray.push(5);
			}
			else {
				effectivLvArray.push(2);
			}
		}

		// 「バレンタイン帽　反対派の証セット」の効果
		if (EquipNumSearch(ITEM_ID_NEIGAN)) {
			effectivLvArray.push(5);
		}

		// 「陣羽織」の効果
		if (EquipNumSearch(ITEM_ID_ZINBAORI)) {
			if (n_A_SHOULDER_DEF_PLUS >= 9) {
				effectivLvArray.push(10);
			}
			else if (n_A_SHOULDER_DEF_PLUS >= 7) {
				effectivLvArray.push(5);
			}
			else {
				effectivLvArray.push(3);
			}
		}

		// 「スタッフオブパフィ」の効果
		if (EquipNumSearch(ITEM_ID_STUFF_OF_PUFFY)) {
			if (n_A_Weapon_ATKplus >= 10) {
				effectivLvArray.push(3);
			}
		}

		// 「頭フィーリル　浮遊する賢者セット」の追加発動の効果
		if (TimeItemNumSearch(71)) {
			effectivLvArray.push(10);
		}

		// 「サーキットボード-OS」の効果
		if (EquipNumSearch(ITEM_ID_CIRCUIT_BOARD_OS)) {
			if (n_A_Weapon_ATKplus >= 10) {
				effectivLvArray.push(10);
			}
		}

		// 「トートの書」の効果
		if (EquipNumSearch(ITEM_ID_TOTONO_SHO) || EquipNumSearch(ITEM_ID_TOTONO_SHO_T1)) {
			effectivLvArray.push(10);
		}

		// 「潜在覚醒(スペルフィストI)」の効果
		if (CardNumSearch(CARD_SET_ID_ENCHANT_SHINRINO_KAIHO_SENZAI_SPELL_FIST_1) > 0) {
			effectivLvArray.push(10);
		}

		// 「分身」スキルの効果
		if (g_confDataSanzi[CCharaConfSanzi.CONF_ID_BUNSHIN] > 0) {
			effectivLvArray.push(2 * g_confDataSanzi[CCharaConfSanzi.CONF_ID_BUNSHIN]);
		}

		// 「チェーンアクション」スキルの効果
		sklLv = UsedSkillSearch(SKILL_ID_CHAIN_ACTION);
		if ((n_A_WeaponType == ITEM_KIND_HANDGUN) && (sklLv > 0)) {
			effectivLvArray.push(sklLv);
		}

		// 「エターナルチェーン」スキルの効果
		sklLv = UsedSkillSearch(SKILL_ID_ETERNAL_CHAIN);
		if (IsGunSeriesArms(n_A_WeaponType) && (sklLv > 0)) {
			effectivLvArray.push(sklLv);
		}

		// 「ダブルアタック」スキルの効果
		sklLv = UsedSkillSearch(SKILL_ID_DOUBLE_ATTACK, true);
		if ((n_A_WeaponType == ITEM_KIND_KNIFE) && (sklLv > 0)) {
			effectivLvArray.push(sklLv);
		}

		// 再計算回避フラグを立てる
		bAvoidRecalc = true;

		break;

	}



	// 再計算回避フラグが立っていなければ、通常スキル欄を追加
	if (!bAvoidRecalc) {
		effectivLvArray.push(UsedSkillSearchSubUsedOnly(sklId));
	}



	// 最大レベルを返す
	return effectivLvArray.reduce(
		function(a, b) {
 	   		return Math.max(a, b);
		}
	);
}
window.globalFunction = {};
window.globalFunction.UsedSkillSearch = UsedSkillSearch;

function UsedSkillSearchSubUsedOnly(sklId) {

	var idx = 0;

	// 通常スキル欄
	var passiveSkillIdArray = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB).GetPassiveSkillIdArray();
	for (idx = 0; idx < passiveSkillIdArray.length; idx++) {
		if(passiveSkillIdArray[idx] == sklId) {
			return n_A_PassSkill[idx];
		}
	}

	return 0;
}






/**
 * 固定追加攻撃力を取得する.
 * @param w_DAM ダメージ
 * @param ch_MAXMIN 最小/最大フラグ？
 * @param 命中率？
 * @return 固定追加攻撃力
 * TODO : 謎パラメタ
 */
function GetFixedAppendAtk(skillId, charaData, specData, mobData, w_DAM, ch_MAXMIN, x_HIT){

	var atkAuraBlade = 0;
	var atkEnchantBlade = 0;

	if (w_DAM <= 0) {
		return 0;
	}

	if (x_HIT == -1) {
		x_HIT = GetActHitRateAll(skillId, mobData);
	}

	if (w_HIT == 100) {
		x_HIT = w_HIT;
	}

	// オーラブレイドによるＡＴＫ上昇効果
	if (UsedSkillSearch(SKILL_ID_AURA_BLADE)){
		if(n_A_WeaponType != 0){
			atkAuraBlade = 20 * UsedSkillSearch(SKILL_ID_AURA_BLADE);
		}
	}

	// エンチャントブレイドによるＡＴＫ上昇効果
	if (UsedSkillSearch(SKILL_ID_ENCHANT_BLADE) || UsedSkillSearch(SKILL_ID_MAGICAL_BARRET)){

		// エンチャントブレイドの効果が乗るスキルかの判定
		// ・通常攻撃
		// ・ファイアリングトラップ
		// ・アイスバウンドトラップ
		var EBcheck = [0,507,508];

		if(NumSearch(n_A_ActiveSkill,EBcheck) == 1){

			// 固定上昇分
			var w_EB = 0;
			if (UsedSkillSearch(SKILL_ID_ENCHANT_BLADE)) {
				w_EB = 100 + 20 * UsedSkillSearch(SKILL_ID_ENCHANT_BLADE);
				w_EB = Math.floor(w_EB * n_A_BaseLV / 150);
			}

			var w = 0;
			w = n_A_MATK[ch_MAXMIN];

			// 属性を無しに設定して、魔法判定部分の威力を計算
			var BKzok = n_A_Weapon_zokusei;
			n_A_Weapon_zokusei = -1;
			w = ApplyMagicalSpecializeMonster(charaData, specData, mobData, w);
			n_A_Weapon_zokusei = BKzok;

			if (UsedSkillSearch(SKILL_ID_ENCHANT_BLADE)) {
				// 持ち替えエンチャントブレイドが指定されている場合、専用欄のＩＮＴを加算
				if(n_A_PassSkill4[11] == 1) {
					w += n_A_PassSkill4[33];
				}
				// それ以外の場合は、ステータス欄のＩＮＴを加算
				else w += n_A_INT;
			}

			// モンスターのＭＤＥＦによる軽減を適用
			if (UsedSkillSearch(SKILL_ID_ENCHANT_BLADE)) {
				w = w - (mobData[14] + n_B_MDEF2);
			} else {
				w = ROUNDDOWN(w * (1000 + mobData[14]) / (1000 + mobData[14] * 10) - n_B_MDEF2);
			}

			// 最終上昇量を算出
			// （0 を下回った場合は、0（2020年1月 スキル修正対応））
			atkEnchantBlade = Math.max(0, Math.floor(w + w_EB));
		}
	}

	return Math.floor(atkAuraBlade + atkEnchantBlade);
 }







/**
 * 詠唱時間とディレイを計算し、表示部を組み立てる.
 */
function BuildCastAndDelayHtml(mobData){
	BuildCastAndDelayHtmlMIG(mobData);
}

/**
 * 詠唱時間とディレイを計算し、引数の戦闘結果に格納する.
 */
function BuildCastAndDelayHtmlMIG(mobData){

	var scaling = 0;
	var spTag = null;

	//----------------------------------------------------------------
	// 変動詠唱時間の算出
	//----------------------------------------------------------------

	// 詠唱時間短縮効果（±○○秒）の適用
	wCast += GetCastFixOfSkillForCastTimeVary(n_A_ActiveSkill);

	if (wCast < 0) wCast = 0;

	// 詠唱時間短縮効果（±○○％）の適用
	scaling = GetCastScalingOfSkillForCastTimeVary(n_A_ActiveSkill);

	if (scaling < 0) scaling = 0;
	wCast = wCast * scaling / 100;

	// 詠唱時間短縮効果（ステータス）の適用
	var BK_wCast = wCast;
	if (cast_kotei == 0 && wCast != "不明") {
		wCast = wCast * n_A_CAST_COMMON;
	}



	//----------------------------------------------------------------
	// 固定詠唱時間の算出
	//----------------------------------------------------------------

	// 詠唱時間短縮効果（±○○秒）の適用
	n_KoteiCast -= n_tok[ITEM_SP_SKILL_FIXED_MINUS];
	n_KoteiCast += GetCastFixOfSkillForCastTimeFixed(n_A_ActiveSkill);

	if (n_KoteiCast < 0) n_KoteiCast = 0;

	// 詠唱時間短縮効果（±○○％）の適用
	scaling = GetCastScalingOfSkillForCastTimeFixed(n_A_ActiveSkill);

	if (scaling < 0) scaling = 0;
	wCastFixed = n_KoteiCast * scaling / 100;

	scaling = (100 - n_A_Kotei_Cast_Keigen);		// スキル全般の固定詠唱マイナス。たぶん乗算。
	if (scaling < 0) scaling = 0;
	wCastFixed = wCastFixed * scaling / 100;

	// スローキャスト状態の適用
	if(n_A_IJYOU[4]) {
		wCast += (wCast * (20 * n_A_IJYOU[4]) / 100);
		wCastFixed += (wCastFixed * (20 * n_A_IJYOU[4]) / 100);
	}



	//----------------------------------------------------------------
	// 戦闘結果インスタンスに格納
	//----------------------------------------------------------------
g_wCastTemp ??= wCast / 1000;;
g_wCastFixedTemp ??= wCastFixed / 1000;



	//----------------------------------------------------------------
	// 変動詠唱時間に固定詠唱時間を加算
	//----------------------------------------------------------------
	wCast += wCastFixed;

	wCast = wCast / 1000;

	if(n_Delay[5] > 0) wCast = 0;



	//----------------------------------------------------------------
	// 全体ディレイの算出
	// モーションディレイやクールタイム等を考慮した、最長のディレイ
	// 全部で７ケース存在する
	// ケース番号が遅いものほど強い制約
	//----------------------------------------------------------------

	switch (n_A_ActiveSkill) {

	// 通常攻撃扱い
	case SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT:
	case SKILL_ID_TUZYO_KOGEKI_CALC_LEFT:
	case SKILL_ID_TUZYO_KOGEKI_CALC_KATAR_APPEND:
		w = 1;
		break;

	// それ以外
	default:

		// 特定スキルのモーションディレイ限界による補正
		switch (n_A_ActiveSkill) {

		case 474:	// ローリングカッター
		case 610:	// 天羅地網
		case 722:	// カートトルネード
		case SKILL_ID_ROUND_TRIP:		// ラウンドトリップ
			if(0.22 <= n_Delay[1] && n_Delay[1] <= 0.3) n_Delay[1] = 0.22;
			break;

		case 769:	// 八方苦無
			if(0.22 <= n_Delay[1] && n_Delay[1] <= 0.3) n_Delay[1] = 0.22;
			break;

		}

		wDelay = 0;
		var w = 0;

		// モーションディレイが最長ディレイの場合、全体ディレイとして採用（ケース１）
		if(n_Delay[1] > wDelay){
			wDelay = n_Delay[1];
			w = 1;
		}

		// スキルディレイ減少効果の適用
		n_Delay[2] = Math.floor(Math.floor(n_Delay[2] * (100 - n_tok[ITEM_SP_SKILL_DELAY_DOWN])) / 1000) / 100;

		// スキルディレイが最長ディレイの場合、全体ディレイとして採用（ケース２）
		if(n_Delay[2] > wDelay){
			wDelay = n_Delay[2];
			w = 2;
		}

		// 固有強制ディレイが最長ディレイの場合、全体ディレイとして採用（ケース３）
		// （コンボ待ち受けや強制モーション）
		if(n_Delay[3] > wDelay){
			wDelay = n_Delay[3];
			w = 3;
		}

		// 入力限界が最長ディレイの場合、全体ディレイとして採用（ケース４）
		if(n_A_ActiveSkill != 0 && n_A_ActiveSkill != 284 && n_A_ActiveSkill != SKILL_ID_SPELL_FIST){

			// 入力欄の値を採用
			n_Delay[4] = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_ACTIVE_INTERVAL", 14) /100;

			// 対象指定なしの即時発動系は、入力限界なし
			switch (n_A_ActiveSkill) {
			case 474:	// ローリングカッター
			case 610:	// 天羅地網
			case 722:	// カートトルネード
			case 769:	// 八方苦無
				n_Delay[4] = 0;
				break;
			}
		}
		if(n_Delay[4] > (wDelay + wCast)){
			wDelay = n_Delay[4] - wCast;
			w = 4;
		}

		// スキル固有のダメージ間隔が最長ディレイの場合、全体ディレイとして採用（ケース５）
		if(n_Delay[5] != 0){
			wDelay = n_Delay[5] / 1000;
			w = 5;
		}

		/// スキル固有のオブジェクト持続時間が最長ディレイの場合、全体ディレイとして採用（ケース６）
		if(n_Delay[6] > (wDelay + wCast)){
			wDelay = n_Delay[6] - wCast;
			w = 6;
		}

		// クールタイムが最長ディレイの場合、全体ディレイとして採用（ケース７）
		n_Delay[7] += GetCoolFixOfSkill(n_A_ActiveSkill);

		if (n_Delay[7] < 0) {
			n_Delay[7] = 0;
		}
		// 小数第三位を切り捨て、ミリ秒単位から秒単位に変換
		n_Delay[7] = (Math.floor(n_Delay[7] / 10) * 10) / 1000;

		if(n_Delay[7] > 0){
			if(n_Delay[7] > wDelay){
				wDelay = n_Delay[7];
				w = 7;
			}
		}
		break;
	}



g_attackIntervalTemp ??= n_Delay[w];
}





/**
 * 属性倍率の簡易表示HTMLを描画する.
 */
function BuildResistElementTinyHtml(){
	// 聖  95%[過 3%]  100%  5%
	resistValueArray = [];      // 属性耐性  95
	bodyElmRatioArray = [];     // 属性倍率  100
	finalRatioArray = [];       // 最終倍率  5
	resistValueArrayOver = [];  // (超過値)  3
	for (idx = 0; idx < ELM_ID_COUNT; idx++) {
		resistValueArray[idx] = n_tok[ITEM_SP_RESIST_ELM_VANITY + idx];
		resistValueArrayOver[idx] = Math.max(0, n_tok_no_limit[ITEM_SP_RESIST_ELM_VANITY + idx] - n_tok[ITEM_SP_RESIST_ELM_VANITY + idx]);
		bodyElmRatioArray[idx] = zokusei[n_A_BodyZokusei * 10 + 1][idx] + 100;
		finalRatioArray[idx] = bodyElmRatioArray[idx] - Math.floor(resistValueArray[idx] * bodyElmRatioArray[idx]) / 100;
	}

	// 描画: "(属性被ダメ) 無80% 火118% 水95% ..."
	const objRoot = document.getElementById("OBJID_DIV_RESIST_ELEMENT_TINY");
	objRoot.innerHTML = "";

	const lead = HtmlCreateElement("span", objRoot);
	lead.textContent = '(属性被ダメ)';
	lead.classList.add('label');

	// GetElementTextで定義されている属性の順序
	const originalOrder = ['u', 'm', 't', 'h', 'k', 'd', 's', 'y', 'n', 'f'];
	// 描画は一般的な「火水風地」の順序にする
	const displayOrder = ['u', 'h', 'm', 'k', 't', 'd', 's', 'y', 'n', 'f'];

	displayOrder.forEach((initial) => {
		const index = originalOrder.indexOf(initial);
		const ratio = finalRatioArray[index];

		const label = HtmlCreateElement("span", objRoot);  // 聖
		const value = HtmlCreateElement("span", objRoot);  // 5%
		const over = resistValueArrayOver[index];          // 3

		label.classList.add(initial, 'label', initial);
		label.textContent = GetElementText(index);

		value.classList.add('value');
		const grade = (ratio > 100) ? 'weak' : ((ratio < 0) ? 'absorb' : 'resist');
		value.classList.add(`value-${grade}`);
		value.textContent = `${Math.ceil(ratio)}%`;
		// 最終ダメージが5%以下なら太字
		if (ratio <= 5) {
			value.style.fontWeight = 'bold';
		}
		// 過剰分: (+3%)
		if (over > 0) {
			const valueOver = HtmlCreateElement("span", objRoot);
			valueOver.textContent = `(-${Math.ceil(over)}%)`;
			valueOver.classList.add('value-over');
		}
	});
}





/**
 * 与ダメージ増幅／軽減効果を適用する.
 * @param dmg ダメージ
 * @return 適用後のダメージ
 */
function ApplyAttackDamageAmplify(mobData, dmg){

	var dmgAmp = 0;



	// ★★★★　注意　★★★★
	//
	// 戦闘エリアによる補正は、被ダメージ用の関数も存在する（この下）
	// 当該処理を変更した際は、そちらも変更すること
	//
	// ★★★★　注意　★★★★



	// 戦闘エリアによる補正
	switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

		// YE攻城戦（マッチング・小規模・乱戦）の場合
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE:
			// 全ての攻撃ダメージが一律 1/20
			dmg = Math.floor(dmg / 20);
			break;

		// YE攻城戦TE（模擬戦）の場合
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
			// 全ての攻撃ダメージが一律 1/10
			dmg = Math.floor(dmg / 10);
			break;

		// YEコロッセオの場合
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
			// 全ての攻撃ダメージが一律 1/10
			dmg = Math.floor(dmg / 10);
			break;

		/**
		 * 以下のエリア設定は殆ど利用されないと思いますが
		 * 消したときの影響が確認できていないため残しておきます
		 * */

		// YE蜃気楼の場合
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
			switch (n_A_ActiveSkill) {
				// セルフディストラクション
				case SKILL_ID_SELF_DESTRUCTION:
				case SKILL_ID_SELF_DESTRUCTION_MAX:
					dmg = Math.floor(dmg / 10);
					break;
				// その他、全ての攻撃ダメージが一律 1/5
				default:
					dmg = Math.floor(dmg / 5);
					break;
			}
			break;

		// 攻城戦TE(通常鯖)の場合
		case MOB_CONF_PLAYER_ID_SENTO_AREA_GVG_TE:

			// 全ての攻撃ダメージが一律 1/5
			dmg = Math.floor(dmg / 5);
			break;

		// それ以外（PvPルーム、通常鯖の攻城戦）の場合
		default:

			// シーズ補正貫通スキルのチェック
			// ・クラッシュストライク
			// ・イクシードブレイク
			var SES_kantuu = [456, 578];

			if(NumSearch(n_A_ActiveSkill, SES_kantuu) == 0){

				// シーズ補正貫通スキルでない、かつ、シーズ補正適用の場合
				if(n_Ses == 1){

					// 通常攻撃でなければ、60% の補正
					if(n_A_ActiveSkill != 0) {
						dmg = Math.floor(dmg * 0.6);
					}

					// 遠距離通常攻撃の場合は、80% への補正
					else if(n_Enekyori == 1) {
						dmg = Math.floor(dmg * 0.8);
					}

					// TODO : 謎補正　モンスターが対プレイヤーでない場合（たぶん、GvGの防衛値）
					if(mobData[0] != MONSTER_ID_PLAYER){
						if(n_A_PassSkill8[15]) {
							dmg = Math.floor(dmg * (10 / (n_A_PassSkill8[15] * 5)));
						}
					}
				}
			}
			break;
	}

	// ダーククロー後の状態における、ダメージ増加の適用
	// （二刀左手は適用除外）
	if (n_B_IJYOU[MOB_CONF_DEBUF_ID_DARK_CRAW_EFFECT] && n_Enekyori == 0) {
		if (n_NitouCalc == 0) {

			// 特定の戦闘エリアでの補正
			switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

			case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
				dmgAmp = 20 * n_B_IJYOU[MOB_CONF_DEBUF_ID_DARK_CRAW_EFFECT];
				break;

			default:
				dmgAmp = 30 * n_B_IJYOU[MOB_CONF_DEBUF_ID_DARK_CRAW_EFFECT];
				break;

			}

			dmg += Math.floor(dmg * dmgAmp / 100);
		}
	}

	// モンスター強化欄の、ストーンスキン効果適用
	if(n_B_KYOUKA[7] && n_Enekyori != 2) {
		dmg -= Math.floor(dmg * 20 * n_B_KYOUKA[7] / 100);
	}

	// モンスター強化欄の、アンチマジック効果適用
	if(n_B_KYOUKA[8] && n_Enekyori == 2) {
		dmg -= Math.floor(dmg * 20 * n_B_KYOUKA[8] / 100);
	}

	// モンスター強化欄の、ディフェンダー効果適用
	if(n_B_KYOUKA[10]){
		var w_DF_hantei = 0;
		if(n_Enekyori==1) w_DF_hantei = 1;
		if(n_A_ActiveSkill==616 || n_A_ActiveSkill==617) if(n_A_ActiveSkillLV >= 5) w_DF_hantei = 1;
		var DF_kantuu = [22,118,159,162,244,248,263,271,324,328,384,738];
		if(NumSearch(n_A_ActiveSkill,DF_kantuu)) w_DF_hantei = 0;
		if(w_DF_hantei == 1){
			if(n_B_KYOUKA[10] == 6) dmg = Math.floor(dmg *12.5 / 100);
			else dmg -= Math.floor(dmg * (5 + 15 * n_B_KYOUKA[10]) / 100);
		}
	}

	// TODO : 謎判定
	if(dmg > 0 && 5 <= mobData[21] && mobData[21] <= 9){
		var kantuu = [19,22,88,106,112,113,118,264,271,302,398,505,603];
		if(NumSearch(n_A_ActiveSkill,kantuu) == 0){
			if(dmg >= 1) dmg = 1;
		}
		if(mobData[21] == 7) dmg = 1;
		if(n_A_ActiveSkill==122) dmg = 0;
		if(mobData[21] == 6){
			if(n_AS_MODE == 1 && n_A_ActiveSkill != 0) dmg = 0;
		}
	}

	// モンスター強化欄の、ダメージ減衰効果適用
	var dmgDivArray = [
		1, 2, 5,
		10, 20, 50,
		100, 200, 500,
		1000
	];
	if (n_B_KYOUKA[MOB_CONF_BUF_ID_DAMAGE_DIVIDE] != 0) {
		dmg = Math.floor(dmg / dmgDivArray[n_B_KYOUKA[MOB_CONF_BUF_ID_DAMAGE_DIVIDE]]);
	}
	// モンスター状態強化欄のマックスペインがONの場合、与ダメを半減
	if (n_B_KYOUKA[MOB_CONF_BUF_ID_MAX_PAIN] != 0) {
		dmg = Math.floor(dmg / 2);
	}

	return Math.floor(dmg);
}

/**
 * 被ダメージ増幅／軽減効果を適用する.
 * @param dmg ダメージ
 * @return 適用後のダメージ
 */
function ApplyReceiveDamageAmplify(mobData, dmg) {

	var dmgAmp = 0;



	// ★★★★　注意　★★★★
	//
	// 戦闘エリアによる補正は、与ダメージ用の関数も存在する（この上）
	// 当該処理を変更した際は、そちらも変更すること
	//
	// ★★★★　注意　★★★★



	// 戦闘エリアによる補正
	switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

		// YE攻城戦（マッチング・小規模・乱戦）の場合
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE:
			// 全ての攻撃ダメージが一律 1/20
			dmg = Math.floor(dmg / 20);
			break;

		// YE攻城戦TE（模擬戦）の場合
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
			// 全ての攻撃ダメージが一律 1/10
			dmg = Math.floor(dmg / 10);
			break;

		// YEコロッセオの場合
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
			// 全ての攻撃ダメージが一律 1/10
			dmg = Math.floor(dmg / 10);
			break;

		/**
		 * 以下のエリア設定は利用する場面が存在しないはずですが
		 * 消したときの影響が確認できていないため残しておきます
		 * */

		// YE蜃気楼の場合
		case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:

			// 全ての攻撃ダメージが一律 1/5
			dmg = Math.floor(dmg / 5);
			break;

		// 攻城戦TEの場合
		case MOB_CONF_PLAYER_ID_SENTO_AREA_GVG_TE:

			// 全ての攻撃ダメージが一律 1/5
			dmg = Math.floor(dmg / 5);
			break;

		// それ以外（PvP、通常鯖の攻城戦）の場合
		default:

			// シーズ補正適用の場合
			if(n_Ses == 1){

				// 現状、敵からの攻撃は近接物理通常攻撃しか計算していないため、補正不要

	/*
				// 通常攻撃でなければ、60% の補正
				if(n_A_ActiveSkill != 0) {
					dmg = Math.floor(dmg * 0.6);
				}

				// 遠距離通常攻撃の場合は、80% への補正
				else if(n_Enekyori == 1) {
					dmg = Math.floor(dmg * 0.8);
				}
	*/

			}
			break;
	}

	return dmg;
}
