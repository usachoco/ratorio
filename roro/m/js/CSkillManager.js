function CSkillData() {

	CSkillData.TYPE_PASSIVE = 1;
	CSkillData.TYPE_ACTIVE = 2;
	CSkillData.TYPE_PHYSICAL = 4;
	CSkillData.TYPE_MAGICAL = 8;
	CSkillData.TYPE_100HIT = 16;
	CSkillData.TYPE_IRREGULAR_BATTLE_TIME = 32; // 戦闘時間が特殊になるフラグ。n_Delay[0] = 1
												// に対応
	CSkillData.TYPE_UNKNOWN_DELAY_TIME = 64; // ディレイorクールタイム不明フラグ。n_Delay[0]
												// = 2 に対応
	CSkillData.TYPE_DIVHIT_FORMULA = 128; // 分割ヒット計算フラグ。n_bunkatuHIT == 1 に対応

	CSkillData.RANGE_SHORT = 0;
	CSkillData.RANGE_LONG = 1;
	CSkillData.RANGE_MAGIC = 2;
	CSkillData.RANGE_SPECIAL = 3; // レベルによって変化など。（グリムトゥース等）

	CSkillData.ELEMENT_VOID = -1;
	CSkillData.ELEMENT_FORCE_VANITY = 0;
	CSkillData.ELEMENT_FORCE_WATER = 1;
	CSkillData.ELEMENT_FORCE_EARTH = 2;
	CSkillData.ELEMENT_FORCE_FIRE = 3;
	CSkillData.ELEMENT_FORCE_WIND = 4;
	CSkillData.ELEMENT_FORCE_POISON = 5;
	CSkillData.ELEMENT_FORCE_HOLY = 6;
	CSkillData.ELEMENT_FORCE_DARK = 7;
	CSkillData.ELEMENT_FORCE_PSYCO = 8;
	CSkillData.ELEMENT_FORCE_UNDEAD = 9;
	CSkillData.ELEMENT_SPECIAL = 10; // 複合属性など。（ヘルインフェルノ等）

	this.id = 0;
	this.refId = -1;
	this.name = "";
	this.kana = "";
	this.maxLv = 0;
	this.type = 0;
	this.range = 0;
	this.element = 0;



	this.CostVary = function(skillLv, charaDataManger) {
		return 0;
	}
	this.CostFixed = function(skillLv, charaDataManger) {
		return 0;
	}
	this.CostAP = function(skillLv, charaDataManger) {
		return 0;
	}
	this.Power = function(skillLv, charaDataManger) {
		return 0;
	}
	this.hitCount = function(skillLv, charaDataManger) {
		return 1;
	}
	this.dispHitCount = function(skillLv, charaDataManger) {
		return 0;
	}
	this.CastTimeVary = function(skillLv, charaDataManger) {
		return 0;
	}
	this.CastTimeFixed = function(skillLv, charaDataManger) {
		return 0;
	}
	this.CastTimeForce = function(skillLv, charaDataManger) {
		return 0;
	}
	this.DelayTimeCommon = function(skillLv, charaDataManger) {
		return 0;
	}
	this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
		return 0;
	}
	this.DelayTimeSkillTiming = function(skillLv, charaDataManger) {
		return 0;
	}
	this.DelayTimeSkillObject = function(skillLv, charaDataManger) {
		return 0;
	}
	this.CoolTime = function(skillLv, charaDataManger) {
		return 0;
	}

	// クリティカル発生率を取得（0:発生しない、100:等倍、etc...）
	this.CriActRate = function(skillLv, charaData, specData, mobData) {

		if (UsedSkillSearch(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO) > 0) {
			return this._CriActRate100(skillLv, charaData, specData, mobData);
		}

		return 0;
	}

	this._CriActRate100 = function(skillLv, charaData, specData, mobData) {

		if (UsedSkillSearch(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO) > 0) {
			if ((this.type & CSkillData.TYPE_PHYSICAL) == CSkillData.TYPE_PHYSICAL) {
				return 100;
			}
		}

		return GetActRateCritical(mobData);
	};

	// クリティカルダメージ上昇特性効果量を取得（0:無効、100:等倍、etc...）
	this.CriDamageRate = function(skillLv, charaData, specData, mobData) {

		if (UsedSkillSearch(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO) > 0) {
			return this._CriDamageRate100(skillLv, charaData, specData, mobData);
		}

		return 0;
	}

	this._CriDamageRate100 = function(skillLv, charaData, specData, mobData) {

		if (UsedSkillSearch(SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO) > 0) {
			if ((this.type & CSkillData.TYPE_PHYSICAL) == CSkillData.TYPE_PHYSICAL) {
				return specData[ITEM_SP_CRITICAL_DAMAGE_UP] / 2;
			}
		}

		return specData[ITEM_SP_CRITICAL_DAMAGE_UP];
	};
}



function CSkillManager() {

	this.dataArray = new Array();

	this.GetBaseSkillId = function(skillId) {
		if (this.dataArray[skillId].refId >= 0) {
			return this.dataArray[skillId].refId;
		}

		return this.dataArray[skillId].id;
	}

	this.GetSkillName = function(skillId) {
		return this.dataArray[skillId].name;
	}

	this.GetSkillPlaneName = function(skillId) {

		var name = this.GetSkillName(skillId);
		var regReplacer = /\([^)]+\)/;

		while (regReplacer.test(name)) {
			name = name.replace(regReplacer, "");
		}

		return name;
	}

	this.GetSkillIdByName = function (name) {

		var idx = 0;
		var regKanaChange = null;
		var nameChanged = "";

		for (idx = 0; idx < this.dataArray.length; idx++) {
			if (this.dataArray[idx].name.replace(/\([^)]+\)/g, "") == name) {
				return this.dataArray[idx].id;
			}
		}

		// TODO: 「ヘスペルスリット」などで、「へ」が片仮名ではなく平仮名になっていたりする問題への対応（公式のバグ）
		// 引数で渡された名称に、平仮名の「へ」がある場合、片仮名に変換して再検索する
		regKanaChange = new RegExp("(?:へ|ぺ|べ)");

		if (regKanaChange.test(name)) {

			nameChanged = name.replace("へ", "ヘ").replace("ぺ", "ペ").replace("べ", "ベ");

			for (idx = 0; idx < this.dataArray.length; idx++) {
				if (this.dataArray[idx].name.replace(/\([^)]+\)/g, "") == nameChanged) {
					return this.dataArray[idx].id;
				}
			}
		}

		return -1;
	}

	this.GetSkillKana = function(skillId) {
		return this.dataArray[skillId].kana;
	}

	this.GetMaxLv = function(skillId) {
		return this.dataArray[skillId].maxLv;
	}

	this.GetSkillType = function(skillId) {
		return this.dataArray[skillId].type;
	}

	this.GetSkillRange = function(skillId) {
		return this.dataArray[skillId].range;
	}

	this.GetElement = function(skillId) {
		return this.dataArray[skillId].element;
	}

	this.GetPower = function(skillId, skillLv, charaDataManger) {
		return this.dataArray[skillId].Power(skillLv, charaDataManger);
	}

	this.GetCostVary = function(skillId, skillLv, charaDataManger) {
		return this.dataArray[skillId].CostVary(skillLv, charaDataManger);
	}

	this.GetCostFixed = function(skillId, skillLv, charaDataManger) {
		return this.dataArray[skillId].CostFixed(skillLv, charaDataManger);
	}

	this.GetCastTimeVary = function(skillId, skillLv, charaDataManger) {
		return this.dataArray[skillId].CastTimeVary(skillLv, charaDataManger);
	}

	this.GetCastTimeFixed = function(skillId, skillLv, charaDataManger) {
		return this.dataArray[skillId].CastTimeFixed(skillLv, charaDataManger);
	}

	this.GetCastTimeForce = function(skillId, skillLv, charaDataManger) {
		return this.dataArray[skillId].CastTimeForce(skillLv, charaDataManger);
	}

	this.GetDelayTimeCommon = function(skillId, skillLv, charaDataManger) {
		return this.dataArray[skillId].DelayTimeCommon(skillLv, charaDataManger);
	}

	this.GetCoolTime = function(skillId, skillLv, charaDataManger) {
		return this.dataArray[skillId].CoolTime(skillLv, charaDataManger);
	}

	this.IsEnableCritical = function(skillId, skillLv, charaData, specData, mobData) {
		return (this.dataArray[skillId].CriActRate(skillLv, charaData, specData, mobData) > 0);
	}

	this.GetCriActRate = function(skillId, skillLv, charaData, specData, mobData) {
		return this.dataArray[skillId].CriActRate(skillLv, charaData, specData, mobData);
	}

	this.CriDamageRate = function(skillId, skillLv, charaData, specData, mobData) {
		return this.dataArray[skillId].CriDamageRate(skillLv, charaData, specData, mobData);
	}

	this.GetDataCount = function() {
		return this.dataArray.length;
	}

	this.Init = function() {

		var idx = 0;

		var skillId = 0;
		var skillData = null;

		// ----------------------------------------------------------------
		// 通常攻撃
		// ----------------------------------------------------------------
		SKILL_ID_TUZYO_KOGEKI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "通常攻撃";
			this.kana = "ツウシヨウコウケキ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData);
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 応急手当
		// ----------------------------------------------------------------
		SKILL_ID_OKYU_TEATE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "応急手当";
			this.kana = "オウキユウテアテ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 3;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 死んだふり
		// ----------------------------------------------------------------
		SKILL_ID_SHINDAFURI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "死んだふり";
			this.kana = "シンタフリ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 剣修練
		// ----------------------------------------------------------------
		SKILL_ID_KEN_SHUREN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "剣修練";
			this.kana = "ケンシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 両手剣修練
		// ----------------------------------------------------------------
		SKILL_ID_RYOUTKEN_SHUREN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "両手剣修練";
			this.kana = "リヨウテケンシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// HP回復力向上
		// ----------------------------------------------------------------
		SKILL_ID_HP_KAIFUKURYOKU_KOZYO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "HP回復力向上";
			this.kana = "ヒツトホイントカイフクリヨクコウシヨウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// バッシュ
		// ----------------------------------------------------------------
		SKILL_ID_BASH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "バッシュ";
			this.kana = "ハツシユ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 7 * Math.floor((skillLv - 1) / 5);
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 30 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マグナムブレイク
		// ----------------------------------------------------------------
		SKILL_ID_MAGNUM_BREAK = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マグナムブレイク";
			this.kana = "マクナムフレイク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 20 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// プロボック
		// ----------------------------------------------------------------
		SKILL_ID_PROVOKE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "プロボック";
			this.kana = "フロホツク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 3 + skillLv;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// インデュア
		// ----------------------------------------------------------------
		SKILL_ID_ENDURE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "インデュア";
			this.kana = "インテユア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 7 + 3 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 10000;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 移動時HP回復
		// ----------------------------------------------------------------
		SKILL_ID_IDOZI_HP_KAIFUKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "移動時HP回復";
			this.kana = "イトウシヒツトホイントカイフク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 急所攻撃
		// ----------------------------------------------------------------
		SKILL_ID_KYUSHO_KOGEKI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "急所攻撃";
			this.kana = "キユウシヨコウケキ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// オートバーサーク
		// ----------------------------------------------------------------
		SKILL_ID_AUTO_BERSERK = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "オートバーサーク";
			this.kana = "オオトハアサアク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ダブルアタック
		// ----------------------------------------------------------------
		SKILL_ID_DOUBLE_ATTACK = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ダブルアタック";
			this.kana = "タフルアタツク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;


			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData);
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 回避率増加
		// ----------------------------------------------------------------
		SKILL_ID_KAIHIRITSU_ZOKA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "回避率増加";
			this.kana = "カイヒリツソウカ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スティール
		// ----------------------------------------------------------------
		SKILL_ID_STEAL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スティール";
			this.kana = "ステイイル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ハイディング
		// ----------------------------------------------------------------
		SKILL_ID_HIDING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ハイディング";
			this.kana = "ハイテインク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// インベナム
		// ----------------------------------------------------------------
		SKILL_ID_ENVENOM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "インベナム";
			this.kana = "インヘナム";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 解毒
		// ----------------------------------------------------------------
		SKILL_ID_GEDOKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "解毒";
			this.kana = "ケトク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 砂まき
		// ----------------------------------------------------------------
		SKILL_ID_SUNAMAKI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "砂まき";
			this.kana = "スナマキ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 130;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// バックステップ
		// ----------------------------------------------------------------
		SKILL_ID_BACKSTEP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "バックステップ";
			this.kana = "ハツクステツフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 7;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 石拾い
		// ----------------------------------------------------------------
		SKILL_ID_ISHIHIROI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "石拾い";
			this.kana = "イシヒロイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 石投げ
		// ----------------------------------------------------------------
		SKILL_ID_ISHINAGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "石投げ";
			this.kana = "イシナケ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 100;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ディバインプロテクション
		// ----------------------------------------------------------------
		SKILL_ID_DIVINE_PROTECTION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ディバインプロテクション";
			this.kana = "テイハインフロテクシヨン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// デーモンベイン
		// ----------------------------------------------------------------
		SKILL_ID_DEMON_BANE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "デーモンベイン";
			this.kana = "テエモンヘイン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ヒール
		// ----------------------------------------------------------------
		SKILL_ID_HEAL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ヒール";
			this.kana = "ヒイル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// キュアー
		// ----------------------------------------------------------------
		SKILL_ID_CURE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "キュアー";
			this.kana = "キユアア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 速度増加
		// ----------------------------------------------------------------
		SKILL_ID_SOKUDO_ZOKA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "速度増加";
			this.kana = "ソクトソウカ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 3 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 速度減少
		// ----------------------------------------------------------------
		SKILL_ID_SOKUDO_GENSHO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "速度減少";
			this.kana = "ソクトケンシヨウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 13 + 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シグナムクルシス
		// ----------------------------------------------------------------
		SKILL_ID_SIGNUM_CRUCIS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "シグナムクルシス";
			this.kana = "シクナムクルシス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エンジェラス
		// ----------------------------------------------------------------
		SKILL_ID_ANGELUS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エンジェラス";
			this.kana = "エンシエラス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 3 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ブレッシング
		// ----------------------------------------------------------------
		SKILL_ID_BLESSING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ブレッシング";
			this.kana = "フレツシンク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 24 + 4 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ニューマ
		// ----------------------------------------------------------------
		SKILL_ID_PNEUMA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ニューマ";
			this.kana = "ニユウマ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アクアベネディクタ
		// ----------------------------------------------------------------
		SKILL_ID_AQUA_BENEDICTA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アクアベネディクタ";
			this.kana = "アクアヘネテイクタ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ルアフ
		// ----------------------------------------------------------------
		SKILL_ID_RUWACH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ルアフ";
			this.kana = "ルアフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// テレポート
		// ----------------------------------------------------------------
		SKILL_ID_TELEPORT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "テレポート";
			this.kana = "テレホオト";
			this.maxLv = 2;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 11 - 1 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ワープポータル
		// ----------------------------------------------------------------
		SKILL_ID_WARP_PORTAL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ワープポータル";
			this.kana = "ワアフホオタル";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 38 - 3 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ホーリーライト
		// ----------------------------------------------------------------
		SKILL_ID_HOLY_LIGHT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ホーリーライト";
			this.kana = "ホオリイライト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 125;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ふくろうの目
		// ----------------------------------------------------------------
		SKILL_ID_FUKURONO_ME = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ふくろうの目";
			this.kana = "フクロウノメ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ワシの目
		// ----------------------------------------------------------------
		SKILL_ID_WASHINO_ME = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ワシの目";
			this.kana = "ワシノメ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ダブルストレイフィング
		// ----------------------------------------------------------------
		SKILL_ID_DOUBLE_STRAFING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ダブルストレイフィング";
			this.kana = "タフルストレイフインク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 90 + 10 * skillLv;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アローシャワー
		// ----------------------------------------------------------------
		SKILL_ID_ARROW_SHOWER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アローシャワー";
			this.kana = "アロオシヤワア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 150 + 10 * skillLv;
			}

			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 集中力向上
		// ----------------------------------------------------------------
		SKILL_ID_SHUCHURYOKU_KOZYO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "集中力向上";
			this.kana = "シユウチユウリヨクコウシヨウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 5 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 矢作成
		// ----------------------------------------------------------------
		SKILL_ID_YA_SAKUSEI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "矢作成";
			this.kana = "ヤサクセイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// チャージアロー
		// ----------------------------------------------------------------
		SKILL_ID_CHARGE_ARROW = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "チャージアロー";
			this.kana = "チヤアシアロオ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 150;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// SP回復力向上
		// ----------------------------------------------------------------
		SKILL_ID_SP_KAIFUKURYOKU_KOZYO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "SP回復力向上";
			this.kana = "スヒリチユアルハワアカイフクリヨクコウシヨウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ナパームビート
		// ----------------------------------------------------------------
		SKILL_ID_NAPALM_BEAT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ナパームビート";
			this.kana = "ナハアムヒイト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_PSYCO;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9 + 3 * Math.floor((skillLv - 1) / 3);
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				switch (skillLv) {
				case 1:
				case 2:
				case 3:
					return 1000;
				case 4:
				case 5:
					return 900;
				case 6:
				case 7:
					return 800;
				case 8:
					return 700;
				case 9:
					return 600;
				case 10:
					return 500;
				}

				return 0;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ソウルストライク
		// ----------------------------------------------------------------
		SKILL_ID_SOUL_STRIKE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ソウルストライク";
			this.kana = "ソウルストライク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_PSYCO;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12 + 6 * Math.floor((skillLv + 1) / 2) - 4
						* ((skillLv + 1) % 2);
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return Math.floor(skillLv / 2);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 + 200 * Math.floor((skillLv + 1) / 2) - 200
						* ((skillLv + 1) % 2);
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// セイフティウォール
		// ----------------------------------------------------------------
		SKILL_ID_SAFETY_WALL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "セイフティウォール";
			this.kana = "セイフテイウオオル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return (skillLv == 10) ? 40 : 30 + 5 * Math
						.floor((skillLv - 1) / 3);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4400 - 400 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ストーンカース
		// ----------------------------------------------------------------
		SKILL_ID_STONE_CURSE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ストーンカース";
			this.kana = "ストオンカアス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 26 - skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サイト
		// ----------------------------------------------------------------
		SKILL_ID_SIGHT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "サイト";
			this.kana = "サイト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ファイアーボルト
		// ----------------------------------------------------------------
		SKILL_ID_FIRE_BOLT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ファイアーボルト";
			this.kana = "フアイアアホルト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var seirei = 0;

				// 基本式
				pow = 100;

				// 「ソーサラー 精霊スキル」の効果
				seirei = charaDataManger.UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL);
				if (seirei == 1) {
					pow += Math.floor(charaDataManger.GetCharaJobLv() / 3);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 400 + 400 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 800 + 200 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ファイアーボール
		// ----------------------------------------------------------------
		SKILL_ID_FIRE_BALL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ファイアーボール";
			this.kana = "フアイアアホオル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 140 + 20 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (skillLv <= 5) ? 1500 : 150;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (skillLv <= 5) ? 1500 : 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ファイアーウォール
		// ----------------------------------------------------------------
		SKILL_ID_FIRE_WALL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ファイアーウォール";
			this.kana = "フアイアアウオオル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var seirei = 0;

				// 基本式
				pow = 50;

				// 「ソーサラー 精霊スキル」の効果
				seirei = charaDataManger.UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL);
				if (seirei == 1) {
					pow += Math.floor(charaDataManger.GetCharaJobLv() / 3);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 4 + skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2150 - 150 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 100;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// コールドボルト
		// ----------------------------------------------------------------
		SKILL_ID_COLD_BOLT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "コールドボルト";
			this.kana = "コオルトホルト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var seirei = 0;

				// 基本式
				pow = 100;

				// 「ソーサラー 精霊スキル」の効果
				seirei = charaDataManger.UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL);
				if (seirei == 10) {
					pow += Math.floor(charaDataManger.GetCharaJobLv() / 3);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 400 + 400 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 800 + 200 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フロストダイバー
		// ----------------------------------------------------------------
		SKILL_ID_FROST_DIVER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フロストダイバー";
			this.kana = "フロストタイハア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 26 - skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var seirei = 0;

				// 基本式
				pow = 100 + 10 * skillLv;

				// 「ソーサラー 精霊スキル」の効果
				seirei = charaDataManger.UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL);
				if (seirei == 10) {
					pow += Math.floor(charaDataManger.GetCharaJobLv() / 3);
				}

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 800;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ライトニングボルト
		// ----------------------------------------------------------------
		SKILL_ID_LIGHTNING_BOLT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ライトニングボルト";
			this.kana = "ライトニンクホルト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var seirei = 0;

				// 基本式
				pow = 100;

				// 「ソーサラー 精霊スキル」の効果
				seirei = charaDataManger.UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL);
				if (seirei == 19) {
					pow += Math.floor(charaDataManger.GetCharaJobLv() / 3);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 400 + 400 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 800 + 200 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サンダーストーム
		// ----------------------------------------------------------------
		SKILL_ID_THUNDER_STORM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "サンダーストーム";
			this.kana = "サンタアストオム";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 24 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var seirei = 0;

				// 基本式
				pow = 100;

				// 「ソーサラー 精霊スキル」の効果
				seirei = charaDataManger.UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL);
				if (seirei == 19) {
					pow += Math.floor(charaDataManger.GetCharaJobLv() / 3);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 800 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エナジーコート
		// ----------------------------------------------------------------
		SKILL_ID_ENERGY_COAT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エナジーコート";
			this.kana = "エナシイコオト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 - skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 所持限界量増加
		// ----------------------------------------------------------------
		SKILL_ID_SHOZIGENKAIRYO_ZOKA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "所持限界量増加";
			this.kana = "シヨシケンカイリヨウソウカ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ディスカウント
		// ----------------------------------------------------------------
		SKILL_ID_DISCOUNT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ディスカウント";
			this.kana = "テイスカウント";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// オーバーチャージ
		// ----------------------------------------------------------------
		SKILL_ID_OVER_CHARGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "オーバーチャージ";
			this.kana = "オオハアチヤアシ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// プッシュカート
		// ----------------------------------------------------------------
		SKILL_ID_PUSH_CART = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "プッシュカート";
			this.kana = "フツシユカアト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アイテム鑑定
		// ----------------------------------------------------------------
		SKILL_ID_ITEM_KANTE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アイテム鑑定";
			this.kana = "アイテムカンテイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 露店開設
		// ----------------------------------------------------------------
		SKILL_ID_ROTEN_KAISETSU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "露店開設";
			this.kana = "ロテンカイセツ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// メマーナイト
		// ----------------------------------------------------------------
		SKILL_ID_MAMMONITE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "メマーナイト";
			this.kana = "メマアナイト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 50 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// カートレボリューション
		// ----------------------------------------------------------------
		SKILL_ID_CART_REVOLUTION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "カートレボリューション";
			this.kana = "カアトレホリユウシヨン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// チェンジカート
		// ----------------------------------------------------------------
		SKILL_ID_CHANGE_CART = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "チェンジカート";
			this.kana = "チエンシカアト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ラウドボイス
		// ----------------------------------------------------------------
		SKILL_ID_LOUD_VOICE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ラウドボイス";
			this.kana = "ラウトホイス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 槍修練
		// ----------------------------------------------------------------
		SKILL_ID_YARI_SHUREN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "槍修練";
			this.kana = "ヤリシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ピアース
		// ----------------------------------------------------------------
		SKILL_ID_PIERCE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ピアース";
			this.kana = "ヒアアス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 7;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 10 * skillLv;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 1 + 1 * charaDataManger.GetMonsterSize();
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スピアスタブ
		// ----------------------------------------------------------------
		SKILL_ID_SPEAR_STUB = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スピアスタブ";
			this.kana = "スヒアスタフ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 20 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スピアブーメラン
		// ----------------------------------------------------------------
		SKILL_ID_SPEAR_BOOMERANG = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スピアブーメラン";
			this.kana = "スヒアフウメラン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 50 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ブランディッシュスピア
		// ----------------------------------------------------------------
		SKILL_ID_BRANDISH_SPEAR = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ブランディッシュスピア";
			this.kana = "フランテイツシユスヒア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var powBase = 0;

				powBase = 100 + 20 * skillLv;

				pow = powBase;
				pow += (skillLv >= 4) ? powBase / 2 : 0;
				pow += (skillLv >= 7) ? powBase / 4 : 0;
				pow += (skillLv >= 10) ? powBase / 8 : 0;

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 700;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ツーハンドクイッケン
		// ----------------------------------------------------------------
		SKILL_ID_TWOHAND_QUICKEN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ツーハンドクイッケン";
			this.kana = "ツウハントクイツケン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 4 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// オートカウンター
		// ----------------------------------------------------------------
		SKILL_ID_AUTO_COUNTER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "オートカウンター";
			this.kana = "オオトカウンタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 3;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ボウリングバッシュ
		// ----------------------------------------------------------------
		SKILL_ID_BOWLING_BASH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ボウリングバッシュ";
			this.kana = "ホウリンクハツシユ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12 + skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 40 * skillLv;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				var hitcnt = 2;

				if (skillLv == 1) {
					hitcnt -= 1;
				}

				if (charaDataManger.GetMonsterDebuf(MOB_CONF_DEBUF_ID_LEX_AETERNA) > 0) {
					hitcnt += 1;
				}

				return hitcnt;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 700;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ライディング
		// ----------------------------------------------------------------
		SKILL_ID_RIDING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ライディング";
			this.kana = "ライテインク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 騎兵修練
		// ----------------------------------------------------------------
		SKILL_ID_KIHE_SHUREN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "騎兵修練";
			this.kana = "キヘイシユウレン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 右手修練
		// ----------------------------------------------------------------
		SKILL_ID_MIGITE_SHUREN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "右手修練";
			this.kana = "ミキテシユウレン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 左手修練
		// ----------------------------------------------------------------
		SKILL_ID_HIDARITE_SHUREN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "左手修練";
			this.kana = "ヒタリテシユウレン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// カタール修練
		// ----------------------------------------------------------------
		SKILL_ID_KATAR_SHUREN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "カタール修練";
			this.kana = "カタアルシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クローキング
		// ----------------------------------------------------------------
		SKILL_ID_CLOAKING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "クローキング";
			this.kana = "クロオキンク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ソニックブロー
		// ----------------------------------------------------------------
		SKILL_ID_SONIC_BLOW = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ソニックブロー";
			this.kana = "ソニツクフロオ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 14 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var edp = 0;

				// 基本式
				pow = 400 + 40 * skillLv;

				// 「アサシンクロス エンチャントデッドリーポイズン」の効果（ペナルティ）
				edp = charaDataManger.UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON);
				if (edp > 0) {
					pow = Math.floor(pow / 2);
				}

				return pow;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 8;
			}

			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// グリムトゥース
		// ----------------------------------------------------------------
		SKILL_ID_GRIM_TOOTH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "グリムトゥース";
			this.kana = "クリムトウウス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SPECIAL;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 3;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 20 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エンチャントポイズン
		// ----------------------------------------------------------------
		SKILL_ID_ENCHANT_POISON = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エンチャントポイズン";
			this.kana = "エンチヤントホイスン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ポイズンリアクト(反撃)
		// ----------------------------------------------------------------
		SKILL_ID_POISON_REACT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ポイズンリアクト(反撃)";
			this.kana = "ホイスンリアクトハンケキ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				if (GetMonseterElmBasicType(mobData[MONSTER_DATA_INDEX_ELEMENT]) == ELM_ID_POISON) {
					return this._CriActRate100(skillLv, charaData, specData, mobData);
				}

				return 0;
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				if (GetMonseterElmBasicType(mobData[MONSTER_DATA_INDEX_ELEMENT]) == ELM_ID_POISON) {
					return this._CriDamageRate100(skillLv, charaData, specData, mobData);
				}

				return 0;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ベナムダスト
		// ----------------------------------------------------------------
		SKILL_ID_VENOM_DUST = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ベナムダスト";
			this.kana = "ヘナムタスト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ベナムスプラッシャー
		// ----------------------------------------------------------------
		SKILL_ID_VENOM_SPLASHER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ベナムスプラッシャー";
			this.kana = "ヘナムスフラツシヤア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 500 + 75 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 7000 + 500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// メイス修練
		// ----------------------------------------------------------------
		SKILL_ID_MACE_SHUREN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "メイス修練";
			this.kana = "メイスシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// イムポシティオマヌス
		// ----------------------------------------------------------------
		SKILL_ID_IMPOSITIO_MANUS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "イムポシティオマヌス";
			this.kana = "イムホシテイオマヌス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 3 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サフラギウム
		// ----------------------------------------------------------------
		SKILL_ID_SUFFRAGIUM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "サフラギウム";
			this.kana = "サフラキウム";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アスペルシオ
		// ----------------------------------------------------------------
		SKILL_ID_ASPERSIO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アスペルシオ";
			this.kana = "アスヘルシオ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 4 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 聖体降福
		// ----------------------------------------------------------------
		SKILL_ID_SEITAI_KOFUKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "聖体降福";
			this.kana = "セイタイコウフク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サンクチュアリ
		// ----------------------------------------------------------------
		SKILL_ID_SANCTUARY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "サンクチュアリ";
			this.kana = "サンクチユアリ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// リカバリー
		// ----------------------------------------------------------------
		SKILL_ID_RECOVERY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "リカバリー";
			this.kana = "リカハリイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スローポイズン
		// ----------------------------------------------------------------
		SKILL_ID_SLOW_POISON = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スローポイズン";
			this.kana = "スロオホイスン";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 4 + 2 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// リザレクション
		// ----------------------------------------------------------------
		SKILL_ID_RESURRECTION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)リザレクション";
			this.kana = "リサレクシヨン";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 8000 - 2000 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -1000 + 1000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// キリエエレイソン
		// ----------------------------------------------------------------
		SKILL_ID_KYRIE_ELEISON = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "キリエエレイソン";
			this.kana = "キリエエレイソン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 5 * Math.floor((skillLv - 1) / 3);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マグニフィカート
		// ----------------------------------------------------------------
		SKILL_ID_MAGNIFICAT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マグニフィカート";
			this.kana = "マクニフイカアト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// グロリア
		// ----------------------------------------------------------------
		SKILL_ID_GLORIA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "グロリア";
			this.kana = "クロリア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// レックスディビーナ
		// ----------------------------------------------------------------
		SKILL_ID_LEX_DIVINA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "レックスディビーナ";
			this.kana = "レツクステイヒイナ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return (skillLv <= 5) ? 20 : 20 - 2 * (skillLv - 5);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ターンアンデッド
		// ----------------------------------------------------------------
		SKILL_ID_TURN_UNDEAD = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ターンアンデッド";
			this.kana = "タアンアンテツト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// レックスエーテルナ
		// ----------------------------------------------------------------
		SKILL_ID_LEX_AETERNA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "レックスエーテルナ";
			this.kana = "レツクスエエテルナ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マグヌスエクソシズム
		// ----------------------------------------------------------------
		SKILL_ID_MAGNUS_EXORCISMUS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マグヌスエクソシズム";
			this.kana = "マクヌスエクソシスム";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 38 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 15000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 4000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スキッドトラップ
		// ----------------------------------------------------------------
		SKILL_ID_SKID_TRAP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スキッドトラップ";
			this.kana = "スキツトトラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ランドマイン
		// ----------------------------------------------------------------
		SKILL_ID_LAND_MINE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(仮)ランドマイン";
			this.kana = "ラントマイン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アンクルスネア
		// ----------------------------------------------------------------
		SKILL_ID_ANKLESNARE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アンクルスネア";
			this.kana = "アンクルスネア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フラッシャー
		// ----------------------------------------------------------------
		SKILL_ID_FLASHER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フラッシャー";
			this.kana = "フラツシヤア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ショックウェーブトラップ
		// ----------------------------------------------------------------
		SKILL_ID_SHOCKWAVE_TRAP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ショックウェーブトラップ";
			this.kana = "シヨツクウエエフトラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 45;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サンドマン
		// ----------------------------------------------------------------
		SKILL_ID_SANDMAN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "サンドマン";
			this.kana = "サントマン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フリージングトラップ
		// ----------------------------------------------------------------
		SKILL_ID_FREEZING_TRAP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フリージングトラップ";
			this.kana = "フリイシンクトラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ブラストマイン
		// ----------------------------------------------------------------
		SKILL_ID_BLAST_MINE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(？)ブラストマイン";
			this.kana = "フラストマイン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クレイモアトラップ
		// ----------------------------------------------------------------
		SKILL_ID_CLAYMORE_TRAP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(？)クレイモアトラップ";
			this.kana = "クレイモアトラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// リムーブトラップ
		// ----------------------------------------------------------------
		SKILL_ID_REMOVE_TRAP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "リムーブトラップ";
			this.kana = "リムウフトラツフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// トーキーボックス
		// ----------------------------------------------------------------
		SKILL_ID_TALKIE_BOX = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "トーキーボックス";
			this.kana = "トオキイホツクス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ビーストベイン
		// ----------------------------------------------------------------
		SKILL_ID_BEAST_BANE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ビーストベイン";
			this.kana = "ヒイストヘイン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ファルコンマスタリー
		// ----------------------------------------------------------------
		SKILL_ID_FALCON_MASTERY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ファルコンマスタリー";
			this.kana = "フアルコンマスタリイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ブリッツビート
		// ----------------------------------------------------------------
		SKILL_ID_BLITZ_BEAT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ブリッツビート";
			this.kana = "フリツツヒイト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 7 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スチールクロウ
		// ----------------------------------------------------------------
		SKILL_ID_STEEL_CROW = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スチールクロウ";
			this.kana = "スチイルクロウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ディテクティング
		// ----------------------------------------------------------------
		SKILL_ID_DETECTING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ディテクティング";
			this.kana = "テイテクテインク";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スプリングトラップ
		// ----------------------------------------------------------------
		SKILL_ID_SPRING_TRAP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スプリングトラップ";
			this.kana = "スフリンクトラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ファイアーピラー
		// ----------------------------------------------------------------
		SKILL_ID_FIRE_PILLAR = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ファイアーピラー";
			this.kana = "フアイアアヒラア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 75;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 2 + skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3300 - 300 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// モンスター情報
		// ----------------------------------------------------------------
		SKILL_ID_MONSTER_ZYOHO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "モンスター情報";
			this.kana = "モンスタアシヨウホウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サイトラッシャー
		// ----------------------------------------------------------------
		SKILL_ID_SIGHT_RASHER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "サイトラッシャー";
			this.kana = "サイトラツシヤア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 33 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 20 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 700;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// メテオストーム
		// ----------------------------------------------------------------
		SKILL_ID_METEOR_STORM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "メテオストーム";
			this.kana = "メテオストオム";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv - 1 * ((skillLv + 1) % 2);
			}

			this.Power = function(skillLv, charaDataManger) {
				return 125;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 12000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000 + 1000 * Math.floor(skillLv / 2);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ユピテルサンダー
		// ----------------------------------------------------------------
		SKILL_ID_JUPITER_THUNDER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ユピテルサンダー";
			this.kana = "ユヒテルサンタア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 17 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 2 + skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1600 + 400 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ロードオブヴァーミリオン
		// ----------------------------------------------------------------
		SKILL_ID_LORD_OF_VERMILLION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ロードオブヴァーミリオン";
			this.kana = "ロオトオフウアアミリオン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 56 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				pow = 100 + 5 * ((skillLv - 1) * (skillLv) / 2);
				pow += (skillLv == 10) ? 5 : 0;

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 12400 - 400 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.DelayTimeSkillObject = function(skillLv, charaDataManger) {
				return 4000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウォーターボール
		// ----------------------------------------------------------------
		SKILL_ID_WATER_BALL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ウォーターボール";
			this.kana = "ウオオタアホオル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 30 * skillLv;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				var hitcnt = 0;

				if (skillLv >= 4) {
					hitcnt = 25;
				} else if (skillLv >= 2) {
					hitcnt = 9;
				} else {
					hitcnt = 1;
				}

				return hitcnt;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}

			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return 100 * this.hitCount(skillLv, charaDataManger);
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アイスウォール
		// ----------------------------------------------------------------
		SKILL_ID_ICE_WALL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アイスウォール";
			this.kana = "アイスウオオル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フロストノヴァ
		// ----------------------------------------------------------------
		SKILL_ID_FROST_NOVA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フロストノヴァ";
			this.kana = "フロストノウア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 47 - 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ストームガスト
		// ----------------------------------------------------------------
		SKILL_ID_STORM_GUST = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ストームガスト";
			this.kana = "ストオムカスト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 78;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 70 + 50 * skillLv;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000 + 800 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.DelayTimeSkillObject = function(skillLv, charaDataManger) {
				return 4500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アーススパイク
		// ----------------------------------------------------------------
		SKILL_ID_EARTH_SPIKE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アーススパイク";
			this.kana = "アアススハイク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var seirei = 0;

				// 基本式
				pow = 100;

				// 「ソーサラー 精霊スキル」の効果
				seirei = charaDataManger.UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL);
				if (seirei == 28) {
					pow += Math.floor(charaDataManger.GetCharaJobLv() / 3);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 560 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 800 + 200 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ヘヴンズドライブ
		// ----------------------------------------------------------------
		SKILL_ID_HEAVENS_DRIVE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ヘヴンズドライブ";
			this.kana = "ヘウンストライフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 24 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var seirei = 0;

				// 基本式
				pow = 125;

				// 「ソーサラー 精霊スキル」の効果
				seirei = charaDataManger.UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL);
				if (seirei == 28) {
					pow += Math.floor(charaDataManger.GetCharaJobLv() / 3);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クァグマイア
		// ----------------------------------------------------------------
		SKILL_ID_QUAGMIRE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "クァグマイア";
			this.kana = "クアクマイア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 鉄製造
		// ----------------------------------------------------------------
		SKILL_ID_TETSU_SEIZO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "鉄製造";
			this.kana = "テツセイソウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 鋼鉄製造
		// ----------------------------------------------------------------
		SKILL_ID_KOTETSU_SEIZO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "鋼鉄製造";
			this.kana = "コウテツセイソウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 属性石製造
		// ----------------------------------------------------------------
		SKILL_ID_ZOKUSEISEKI_SEIZO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "属性石製造";
			this.kana = "ソクセイセキセイソウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// オリデオコン研究
		// ----------------------------------------------------------------
		SKILL_ID_ORIDEOCON_KENKYU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "オリデオコン研究";
			this.kana = "オリテオコンケンキユウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 短剣製作
		// ----------------------------------------------------------------
		SKILL_ID_TANKEN_SEISAKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "短剣製作";
			this.kana = "タンケンセイサク";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 剣製作
		// ----------------------------------------------------------------
		SKILL_ID_KEN_SEISAKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "剣製作";
			this.kana = "ケンセイサク";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 両手剣製作
		// ----------------------------------------------------------------
		SKILL_ID_RYOTEKEN_SEISAKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "両手剣製作";
			this.kana = "リヨウテケンセイサク";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 斧製作
		// ----------------------------------------------------------------
		SKILL_ID_ONO_SEISAKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "斧製作";
			this.kana = "オノセイサク";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// メイス製作
		// ----------------------------------------------------------------
		SKILL_ID_MACE_SEISAKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "メイス製作";
			this.kana = "メイスセイサク";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ナックル製作
		// ----------------------------------------------------------------
		SKILL_ID_KNUCKLE_SEISAKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ナックル製作";
			this.kana = "ナツクルセイサク";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 槍製作
		// ----------------------------------------------------------------
		SKILL_ID_YARI_SEISAKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "槍製作";
			this.kana = "ヤリセイサク";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ヒルトバインディング
		// ----------------------------------------------------------------
		SKILL_ID_HILT_BINDING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ヒルトバインディング";
			this.kana = "ヒルトハインテインク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 鉱石発見
		// ----------------------------------------------------------------
		SKILL_ID_KOSEKI_HAKKEN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "鉱石発見";
			this.kana = "コウセキハツケン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 武器研究
		// ----------------------------------------------------------------
		SKILL_ID_BUKI_KENKYU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "武器研究";
			this.kana = "フキケンキユウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 武器修理
		// ----------------------------------------------------------------
		SKILL_ID_BUKI_SHURI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "武器修理";
			this.kana = "フキシユウリ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スキンテンパリング
		// ----------------------------------------------------------------
		SKILL_ID_SKIN_TEMPERING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スキンテンパリング";
			this.kana = "スキンテンハリンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ハンマーフォール
		// ----------------------------------------------------------------
		SKILL_ID_HAMMER_FALL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ハンマーフォール";
			this.kana = "ハンマアフオオル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アドレナリンラッシュ
		// ----------------------------------------------------------------
		SKILL_ID_ADRENALINE_RUSH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アドレナリンラッシュ";
			this.kana = "アトレナリンラツシユ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 17 + 3 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウェポンパーフェクション
		// ----------------------------------------------------------------
		SKILL_ID_WEAPON_PERFECTION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ウェポンパーフェクション";
			this.kana = "ウエホンハアフエクシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 - 2 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// オーバートラスト
		// ----------------------------------------------------------------
		SKILL_ID_OVER_TRUST = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "オーバートラスト";
			this.kana = "オオハアトラスト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 - 2 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マキシマイズパワー
		// ----------------------------------------------------------------
		SKILL_ID_MAXIMIZE_POWER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マキシマイズパワー";
			this.kana = "マキシマイスハワア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フェイス
		// ----------------------------------------------------------------
		SKILL_ID_FAITH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フェイス";
			this.kana = "フエイス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// オートガード
		// ----------------------------------------------------------------
		SKILL_ID_AUTO_GUARD = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "オートガード";
			this.kana = "オオトカアト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シールドチャージ
		// ----------------------------------------------------------------
		SKILL_ID_SHIELD_CHARGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "シールドチャージ";
			this.kana = "シイルトチヤアシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 20 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シールドブーメラン
		// ----------------------------------------------------------------
		SKILL_ID_SHIELD_BOOMERANG = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "シールドブーメラン";
			this.kana = "シイルトフウメラン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 30 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 700;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// リフレクトシールド
		// ----------------------------------------------------------------
		SKILL_ID_REFLECT_SHIELD = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "リフレクトシールド";
			this.kana = "リフレクトシイルト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 5 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ホーリークロス
		// ----------------------------------------------------------------
		SKILL_ID_HOLY_CROSS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ホーリークロス";
			this.kana = "ホオリイクロス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 35 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// グランドクロス
		// ----------------------------------------------------------------
		SKILL_ID_GRAND_CROSS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "グランドクロス";
			this.kana = "クラントクロス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 7 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ディボーション
		// ----------------------------------------------------------------
		SKILL_ID_DEBOTION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ディボーション";
			this.kana = "テイホオシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// プロヴィデンス
		// ----------------------------------------------------------------
		SKILL_ID_PROVIDENCE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "プロヴィデンス";
			this.kana = "フロウイテンス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ディフェンダー
		// ----------------------------------------------------------------
		SKILL_ID_DEFENDER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ディフェンダー";
			this.kana = "テイフエンタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スピアクイッケン
		// ----------------------------------------------------------------
		SKILL_ID_SPEAR_QUICKEN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スピアクイッケン";
			this.kana = "スヒアクイツケン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 4 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スナッチャー
		// ----------------------------------------------------------------
		SKILL_ID_SNATCHER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スナッチャー";
			this.kana = "スナツチヤア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スティールコイン
		// ----------------------------------------------------------------
		SKILL_ID_STEAL_COIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スティールコイン";
			this.kana = "ステイイルコイン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// バックスタブ
		// ----------------------------------------------------------------
		SKILL_ID_BACK_STAB = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "バックスタブ";
			this.kana = "ハツクスタフ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 300 + 40 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// トンネルドライブ
		// ----------------------------------------------------------------
		SKILL_ID_TUNNEL_DRIVE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "トンネルドライブ";
			this.kana = "トンネルトライフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サプライズアタック
		// ----------------------------------------------------------------
		SKILL_ID_SURPRISE_ATTACK = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "サプライズアタック";
			this.kana = "サフライスアタツク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 80 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ストリップウェポン
		// ----------------------------------------------------------------
		SKILL_ID_STRIP_WEAPON = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ストリップウェポン";
			this.kana = "ストリツフウエホン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 2 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

				}

				return 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 10000;

				}

				return 0;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ストリップシールド
		// ----------------------------------------------------------------
		SKILL_ID_STRIP_SHIELD = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ストリップシールド";
			this.kana = "ストリツフシイルト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

				}

				return 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 10000;

				}

				return 0;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ストリップアーマー
		// ----------------------------------------------------------------
		SKILL_ID_STRIP_ARMER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ストリップアーマー";
			this.kana = "ストリツフアアマア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 2 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

				}

				return 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 10000;

				}

				return 0;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ストリップヘルム
		// ----------------------------------------------------------------
		SKILL_ID_STRIP_HELM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ストリップヘルム";
			this.kana = "ストリツフヘルム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

				}

				return 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 10000;

				}

				return 0;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// インティミデイト
		// ----------------------------------------------------------------
		SKILL_ID_INTIMIDATE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "インティミデイト";
			this.kana = "インテイミテイト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 30 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// グラフィティ
		// ----------------------------------------------------------------
		SKILL_ID_GRAPHITY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "グラフィティ";
			this.kana = "クラフイテイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フラッググラフィティ
		// ----------------------------------------------------------------
		SKILL_ID_FLAG_GRAPHITY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フラッググラフィティ";
			this.kana = "フラツククラフイテイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クリーナー
		// ----------------------------------------------------------------
		SKILL_ID_CLEANER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "クリーナー";
			this.kana = "クリイナア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ギャングスターパラダイス
		// ----------------------------------------------------------------
		SKILL_ID_GANGSTAR_PARADISE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ギャングスターパラダイス";
			this.kana = "キヤンクスタアハラタイス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// コンパルションディスカウント
		// ----------------------------------------------------------------
		SKILL_ID_COMPULSION_DISCOUNT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "コンパルションディスカウント";
			this.kana = "コンハルシヨンテイスカウント";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クローンスキル
		// ----------------------------------------------------------------
		SKILL_ID_CLONE_SKILL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "クローンスキル";
			this.kana = "クロオンスキル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 鉄拳
		// ----------------------------------------------------------------
		SKILL_ID_TEKKEN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "鉄拳";
			this.kana = "テツケン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 息吹
		// ----------------------------------------------------------------
		SKILL_ID_IBUKI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "息吹";
			this.kana = "イフキ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 気功(気弾数)
		// ----------------------------------------------------------------
		SKILL_ID_KIKO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "気功(気弾数)";
			this.kana = "キコウキタンスウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 気奪
		// ----------------------------------------------------------------
		SKILL_ID_KIDATSU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "気奪";
			this.kana = "キタツ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 三段掌
		// ----------------------------------------------------------------
		SKILL_ID_SANDANSHO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "三段掌";
			this.kana = "サンタンシヨウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 連打掌
		// ----------------------------------------------------------------
		SKILL_ID_RENDASHO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "連打掌";
			this.kana = "レンタシヨウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 250 + 50 * skillLv;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 4;
			}

			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return 1000 - (4 * charaDataManger.GetCharaAgi())
						- (2 * charaDataManger.GetCharaDex());
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 猛龍拳
		// ----------------------------------------------------------------
		SKILL_ID_MORYUKEN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "猛龍拳";
			this.kana = "モウリユウケン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 450 + 50 * skillLv;
			}

			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return 700 - (4 * charaDataManger.GetCharaAgi())
						- (2 * charaDataManger.GetCharaDex());
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 残影
		// ----------------------------------------------------------------
		SKILL_ID_ZANEI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "残影";
			this.kana = "サンエイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 14;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 見切り
		// ----------------------------------------------------------------
		SKILL_ID_MIKIRI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "見切り";
			this.kana = "ミキリ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 指弾(Hit数=気功)
		// ----------------------------------------------------------------
		SKILL_ID_SHIDAN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "指弾(Hit数=気功)";
			this.kana = "シタン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 125 + 25 * skillLv;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				var kidan = 0;

				// 気弾数
				kidan = this.CountOfKidan(charaDataManger);

				// 補正
				if (kidan > skillLv) {
					kidan = skillLv;
				}

				return kidan;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				var kidan = 0;

				// 気弾数
				kidan = this.CountOfKidan(charaDataManger);

				// 補正
				if (kidan > skillLv) {
					kidan = skillLv;
				}

				return 1000 + 1000 * kidan;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CountOfKidan = function(charaDataManger) {
				var kidan = 0;

				// モンク系の自己支援
				kidan = charaDataManger.UsedSkillSearch(SKILL_ID_KIKO);

				// 気功転移等による二次職支援
				if (kidan == 0) {
					kidan = charaDataManger
							.GetCharaConfNizi(CCharaConfNizi.CONF_ID_KIKO);
				}

				return kidan;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 発勁
		// ----------------------------------------------------------------
		SKILL_ID_HAKKEI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "発勁";
			this.kana = "ハツケイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 6 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 75 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 白刃取り
		// ----------------------------------------------------------------
		SKILL_ID_SHIRAHADORI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "白刃取り";
			this.kana = "シラハトリ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 爆裂波動
		// ----------------------------------------------------------------
		SKILL_ID_BAKURETSU_HADO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "爆裂波動";
			this.kana = "ハクレツハトウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 金剛
		// ----------------------------------------------------------------
		SKILL_ID_KONGO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "金剛";
			this.kana = "コンコウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 200;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 阿修羅覇王拳(SP調整可)
		// ----------------------------------------------------------------
		SKILL_ID_ASHURA_HAOKEN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "阿修羅覇王拳(SP調整可)";
			this.kana = "アシユラハオウケン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostVary = function(skillLv, charaDataManger) {
				return 100;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 楽器の練習
		// ----------------------------------------------------------------
		SKILL_ID_GAKKINO_RENSHU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "楽器の練習";
			this.kana = "カツキノレンシユウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ミュージカルストライク
		// ----------------------------------------------------------------
		SKILL_ID_MUSICAL_STRIKE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ミュージカルストライク";
			this.kana = "ミユウシカルストライク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return -1 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 60 + 40 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 不協和音
		// ----------------------------------------------------------------
		SKILL_ID_FUKYOWAON = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "不協和音";
			this.kana = "フキヨウワオン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 3 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 寒いジョーク
		// ----------------------------------------------------------------
		SKILL_ID_SAMUI_JOKE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "寒いジョーク";
			this.kana = "サムイシヨオク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 4000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 口笛
		// ----------------------------------------------------------------
		SKILL_ID_KUCHIBUE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "口笛";
			this.kana = "クチフエ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 4 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 夕陽のアサシンクロス
		// ----------------------------------------------------------------
		SKILL_ID_YUHINO_ASSASINCROSS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "夕陽のアサシンクロス";
			this.kana = "ユウヒノアサシンクロス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 3 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ブラギの詩
		// ----------------------------------------------------------------
		SKILL_ID_BRAGINO_UTA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ブラギの詩";
			this.kana = "フラキノウタ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// イドゥンの林檎
		// ----------------------------------------------------------------
		SKILL_ID_IDUNNNO_RINGO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "イドゥンの林檎";
			this.kana = "イトウンノリンコ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ダンスの練習
		// ----------------------------------------------------------------
		SKILL_ID_DANCENO_RENSHU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ダンスの練習";
			this.kana = "タンスノレンシユウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 矢撃ち
		// ----------------------------------------------------------------
		SKILL_ID_YAUCHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "矢撃ち";
			this.kana = "ヤウチ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return -1 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 60 + 40 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 自分勝手なダンス
		// ----------------------------------------------------------------
		SKILL_ID_ZIBUNKATTENA_DANCE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "自分勝手なダンス";
			this.kana = "シフンカツテナタンス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 3 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スクリーム
		// ----------------------------------------------------------------
		SKILL_ID_SCREAM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スクリーム";
			this.kana = "スクリイム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 4000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ハミング
		// ----------------------------------------------------------------
		SKILL_ID_HUMMING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ハミング";
			this.kana = "ハミンク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 2 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 私を忘れないで…
		// ----------------------------------------------------------------
		SKILL_ID_WATASHIWO_WASURENAIDE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "私を忘れないで…";
			this.kana = "ワタシヲワスレナイテ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 3 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 幸運のキス
		// ----------------------------------------------------------------
		SKILL_ID_KOUNNO_KISS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "幸運のキス";
			this.kana = "コウウンノキス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 3 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サービスフォーユー
		// ----------------------------------------------------------------
		SKILL_ID_SERVICE_FOR_YOU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "サービスフォーユー";
			this.kana = "サアヒスフオオユウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アドリブ
		// ----------------------------------------------------------------
		SKILL_ID_ADLIB = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アドリブ";
			this.kana = "アトリフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アンコール
		// ----------------------------------------------------------------
		SKILL_ID_ENCORE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アンコール";
			this.kana = "アンコオル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 子守歌
		// ----------------------------------------------------------------
		SKILL_ID_KOMORIUTA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "子守歌";
			this.kana = "コモリウタ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ニヨルドの宴
		// ----------------------------------------------------------------
		SKILL_ID_NJORDNO_UTAGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ニヨルドの宴";
			this.kana = "ヒヨルトノウタケ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 永遠の混沌
		// ----------------------------------------------------------------
		SKILL_ID_EIENNO_KONTON = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "永遠の混沌";
			this.kana = "エイエンノコントン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 戦太鼓の響き
		// ----------------------------------------------------------------
		SKILL_ID_IKUSADAIKONO_HIBIKI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "戦太鼓の響き";
			this.kana = "イクサタイコノヒヒキ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 3 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ニーベルングの指輪
		// ----------------------------------------------------------------
		SKILL_ID_NIBELUGENNO_YUBIWA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ニーベルングの指輪";
			this.kana = "ニイヘルンクノユヒワ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 3 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ロキの叫び
		// ----------------------------------------------------------------
		SKILL_ID_LOKINO_SAKEBI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ロキの叫び";
			this.kana = "ロキノサケヒ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 深淵の中に
		// ----------------------------------------------------------------
		SKILL_ID_SHINENNO_NAKANI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "深淵の中に";
			this.kana = "シンエンノナカニ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 不死身のジークフリード
		// ----------------------------------------------------------------
		SKILL_ID_FUZIMINO_SIEGFRIED = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "不死身のジークフリード";
			this.kana = "フシミノシイクフリイト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アドバンスドブック
		// ----------------------------------------------------------------
		SKILL_ID_ADVANCED_BOOK = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アドバンスドブック";
			this.kana = "アトハンストフツク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// キャストキャンセル
		// ----------------------------------------------------------------
		SKILL_ID_CAST_CANCEL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "キャストキャンセル";
			this.kana = "キヤストキヤンセル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マジックロッド
		// ----------------------------------------------------------------
		SKILL_ID_MAGIC_ROD = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マジックロッド";
			this.kana = "マシツクロツト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スペルブレイカー
		// ----------------------------------------------------------------
		SKILL_ID_SPELL_BREAKER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スペルブレイカー";
			this.kana = "スヘルフレイカア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 700;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フリーキャスト
		// ----------------------------------------------------------------
		SKILL_ID_FREE_CAST = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フリーキャスト";
			this.kana = "フリイキヤスト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// オートマジシャンスペル
		// ----------------------------------------------------------------
		SKILL_ID_AUTO_MAGICIAN_SPELL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(仮)オートマジシャンスペル";
			this.kana = "オオトスヘル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フレイムランチャー
		// ----------------------------------------------------------------
		SKILL_ID_FLAME_LAUNCHER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フレイムランチャー";
			this.kana = "フレイムランチヤア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フロストウェポン
		// ----------------------------------------------------------------
		SKILL_ID_FROST_WEAPON = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フロストウェポン";
			this.kana = "フロストウエホン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ライトニングローダー
		// ----------------------------------------------------------------
		SKILL_ID_LIGHTNING_LOADER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ライトニングローダー";
			this.kana = "ライトニンクロオタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サイズミックウェポン
		// ----------------------------------------------------------------
		SKILL_ID_SEISMIC_WEAPON = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "サイズミックウェポン";
			this.kana = "サイスミツクウエホン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ドラゴノロジー
		// ----------------------------------------------------------------
		SKILL_ID_DRAGONOLOGY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ドラゴノロジー";
			this.kana = "トラコノロシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ボルケーノ
		// ----------------------------------------------------------------
		SKILL_ID_VOLCANO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ボルケーノ";
			this.kana = "ホルケエノ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 - 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// デリュージ
		// ----------------------------------------------------------------
		SKILL_ID_DELUGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "デリュージ";
			this.kana = "テリユウシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 - 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// バイオレントゲイル
		// ----------------------------------------------------------------
		SKILL_ID_VIOLENT_GALE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "バイオレントゲイル";
			this.kana = "ハイオレントケイル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 - 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ランドプロテクター
		// ----------------------------------------------------------------
		SKILL_ID_LAND_PROTECTOR = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ランドプロテクター";
			this.kana = "ラントフロテクタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 - 4 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ディスペル
		// ----------------------------------------------------------------
		SKILL_ID_DISPELL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ディスペル";
			this.kana = "テイスヘル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アブラカタブラ
		// ----------------------------------------------------------------
		SKILL_ID_ABRACADABRA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アブラカタブラ";
			this.kana = "アフラカタフラ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 斧修練
		// ----------------------------------------------------------------
		SKILL_ID_ONO_SHUREN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "斧修練";
			this.kana = "オノシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ラーニングポーション
		// ----------------------------------------------------------------
		SKILL_ID_LEARNING_POTION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ラーニングポーション";
			this.kana = "ラアニンクホオシヨン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ファーマシー
		// ----------------------------------------------------------------
		SKILL_ID_PHARMACY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ファーマシー";
			this.kana = "フアアマシイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アシッドテラー
		// ----------------------------------------------------------------
		SKILL_ID_ACID_TERROR = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アシッドテラー";
			this.kana = "アシツトテラア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ポーションピッチャー
		// ----------------------------------------------------------------
		SKILL_ID_POTION_PITCHER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ポーションピッチャー";
			this.kana = "ホオシヨンヒツチヤア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// バイオプラント
		// ----------------------------------------------------------------
		SKILL_ID_BIOPLANT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "バイオプラント";
			this.kana = "ハイオフラント";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スフィアーマイン
		// ----------------------------------------------------------------
		SKILL_ID_SPHERE_MINE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スフィアーマイン";
			this.kana = "スフイアアマイン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// デモンストレーション
		// ----------------------------------------------------------------
		SKILL_ID_DEMONSTRATION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "デモンストレーション";
			this.kana = "テモンストレエシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 20 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeSkillTiming = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ケミカルウェポンチャージ
		// ----------------------------------------------------------------
		SKILL_ID_CHEMICAL_WEAPON_CHARGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ケミカルウェポンチャージ";
			this.kana = "ケミカルウエホンチヤアシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ケミカルシールドチャージ
		// ----------------------------------------------------------------
		SKILL_ID_CHEMICAL_SHIELD_CHARGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ケミカルシールドチャージ";
			this.kana = "ケミカルシイルトチヤアシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ケミカルアーマーチャージ
		// ----------------------------------------------------------------
		SKILL_ID_CHEMICAL_ARMER_CHARGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ケミカルアーマーチャージ";
			this.kana = "ケミカルアアマアチヤアシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ケミカルヘルムチャージ
		// ----------------------------------------------------------------
		SKILL_ID_CHEMICAL_HELM_CHARGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ケミカルヘルムチャージ";
			this.kana = "ケミカルヘルムチヤアシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 爆裂波動(Sノビ)
		// ----------------------------------------------------------------
		SKILL_ID_BAKURETSU_HADO_SUPER_NOVICE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.refId = SKILL_ID_BAKURETSU_HADO;
			this.name = "爆裂波動(Sノビ)";
			this.kana = "ハクレツハトウスウハアノオヒス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// オーラブレイド
		// ----------------------------------------------------------------
		SKILL_ID_AURA_BLADE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "オーラブレイド";
			this.kana = "オオラフレイト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 38 + 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// パリイング
		// ----------------------------------------------------------------
		SKILL_ID_PARIYING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "パリイング";
			this.kana = "ハリインク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// コンセントレイション
		// ----------------------------------------------------------------
		SKILL_ID_CONCENTRATION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "コンセントレイション";
			this.kana = "コンセントレイシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 4 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// テンションリラックス
		// ----------------------------------------------------------------
		SKILL_ID_TENTION_RELAX = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "テンションリラックス";
			this.kana = "テンシヨンリラツクス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// バーサーク
		// ----------------------------------------------------------------
		SKILL_ID_BERSERK = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "バーサーク";
			this.kana = "ハアサアク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 200;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スパイラルピアース
		// ----------------------------------------------------------------
		SKILL_ID_SPIRAL_PIERCE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スパイラルピアース";
			this.kana = "スハイラルヒアアス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 50 * skillLv;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 5;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (skillLv == 5) ? (1000) : (100 + 200 * skillLv);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 + 200 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ヘッドクラッシュ
		// ----------------------------------------------------------------
		SKILL_ID_HEAD_CRUSH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ヘッドクラッシュ";
			this.kana = "ヘツトクラツシユ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 23;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 40 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ジョイントビート
		// ----------------------------------------------------------------
		SKILL_ID_JOINT_BEAT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ジョイントビート";
			this.kana = "シヨイントヒイト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * Math.floor((skillLv + 1) / 2);
			}

			this.Power = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 800 + 200 * Math.floor((skillLv - 1) / 5);
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// カタール研究
		// ----------------------------------------------------------------
		SKILL_ID_KATAR_KENKYU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "カタール研究";
			this.kana = "カタアルケンキユウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ソウルブレイカー
		// ----------------------------------------------------------------
		SKILL_ID_SOUL_BREAKER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ソウルブレイカー";
			this.kana = "ソウルフレイカア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 10 * Math.floor((skillLv - 1) / 5);
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var edp = 0;

				// 基本式
				pow = 300 + 50 * skillLv;

				// 「アサシンクロス エンチャントデッドリーポイズン」の効果（ペナルティ）
				edp = charaDataManger.UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON);
				if (edp > 0) {
					pow = Math.floor(pow / 2);
				}

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 800 + 200 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// メテオアサルト
		// ----------------------------------------------------------------
		SKILL_ID_METEOR_ASSALT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "メテオアサルト";
			this.kana = "メテオアサルト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 40 + 40 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クリエイトデッドリーポイズン
		// ----------------------------------------------------------------
		SKILL_ID_CREATE_DEADLY_POISON = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "クリエイトデッドリーポイズン";
			this.kana = "クリエイトテツトリイホイスン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (仮)エンチャントデッドリーポイズン
		// ----------------------------------------------------------------
		SKILL_ID_ENCHANT_DEADLY_POISON = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(仮)エンチャントデッドリーポイズン";
			this.kana = "エンチヤントテツトリイホイスン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アスムプティオ
		// ----------------------------------------------------------------
		SKILL_ID_ASSUMPTIO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アスムプティオ";
			this.kana = "アスムフテイオ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 + 100 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// バジリカ
		// ----------------------------------------------------------------
		SKILL_ID_BASILICA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "バジリカ";
			this.kana = "ハシリカ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000 + 1000 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 + 1000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// メディタティオ
		// ----------------------------------------------------------------
		SKILL_ID_MEDITATIO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "メディタティオ";
			this.kana = "メテイタテイオ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// トゥルーサイト
		// ----------------------------------------------------------------
		SKILL_ID_TRUE_SIGHT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "トゥルーサイト";
			this.kana = "トウルウサイト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 5 * Math.floor((skillLv - 1) / 2);
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ファルコンアサルト
		// ----------------------------------------------------------------
		SKILL_ID_FALCON_ASSALT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ファルコンアサルト";
			this.kana = "フアルコンアサルト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 26 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シャープシューティング
		// ----------------------------------------------------------------
		SKILL_ID_SHARP_SHOOTING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "シャープシューティング";
			this.kana = "シヤアフシユウテインク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 200 + 50 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500;
			}

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウインドウォーク
		// ----------------------------------------------------------------
		SKILL_ID_WIND_WALK = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ウインドウォーク";
			this.kana = "ウイントウオオク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 6 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1600 + 400 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ソウルドレイン
		// ----------------------------------------------------------------
		SKILL_ID_SOUL_DRAIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ソウルドレイン";
			this.kana = "ソウルトレイン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マジッククラッシャー
		// ----------------------------------------------------------------
		SKILL_ID_MAGIC_CRUSHER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マジッククラッシャー";
			this.kana = "マシツククラツシヤア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 300;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 300;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 魔法力増幅
		// ----------------------------------------------------------------
		SKILL_ID_MAHORYOKU_ZOFUKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "魔法力増幅";
			this.kana = "マホウリヨクソウフク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 4 * skillLv;
			}

			this.CastTimeForce = function(skillLv, charaDataManger) {
				return 700;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ナパームバルカン
		// ----------------------------------------------------------------
		SKILL_ID_NAPALM_VULKAN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ナパームバルカン";
			this.kana = "ナハアムハルカン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_PSYCO;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// メルトダウン
		// ----------------------------------------------------------------
		SKILL_ID_MELTDOWN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "メルトダウン";
			this.kana = "メルトタウン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * Math.floor((skillLv - 1) / 2);
			}

			this.CastTimeForce = function(skillLv, charaDataManger) {
				return 700;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// お金製造
		// ----------------------------------------------------------------
		SKILL_ID_OKANE_SEIZO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "お金製造";
			this.kana = "オカネセイソウ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 塊製造
		// ----------------------------------------------------------------
		SKILL_ID_KATAMARI_SEIZO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "塊製造";
			this.kana = "カタマリセイソウ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// カートブースト
		// ----------------------------------------------------------------
		SKILL_ID_CART_BOOST_WS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "カートブースト";
			this.kana = "カアトフウスト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 運命のタロットカード
		// ----------------------------------------------------------------
		SKILL_ID_UNMEINO_TALOTCARD = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "運命のタロットカード";
			this.kana = "ウンメイノタロツトカアト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// プレッシャー
		// ----------------------------------------------------------------
		SKILL_ID_PRESSURE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "プレッシャー";
			this.kana = "フレツシヤア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サクリファイス
		// ----------------------------------------------------------------
		SKILL_ID_SACRIFICE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "サクリファイス";
			this.kana = "サクリファイス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ゴスペル
		// ----------------------------------------------------------------
		SKILL_ID_GOSPEL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ゴスペル";
			this.kana = "コスヘル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 + 20 * Math.floor((skillLv - 1) / 5);
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// チェイスウォーク(STR+)
		// ----------------------------------------------------------------
		SKILL_ID_CHASEWALK = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "チェイスウォーク(STR+)";
			this.kana = "チエイスウオオク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// リジェクトソード
		// ----------------------------------------------------------------
		SKILL_ID_REJECT_SWORD = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "リジェクトソード";
			this.kana = "リシエクトソオト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 猛虎硬派山
		// ----------------------------------------------------------------
		SKILL_ID_MOKOKOHAZAN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "猛虎硬派山";
			this.kana = "モウココウハサン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 200 + 100 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 300;
			}

			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 伏虎拳
		// ----------------------------------------------------------------
		SKILL_ID_BUKKOKEN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "伏虎拳";
			this.kana = "フツコケン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 40 + 100 * skillLv;
			}

			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return 700 - (4 * charaDataManger.GetCharaAgi())
						- (2 * charaDataManger.GetCharaDex());
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 連柱崩撃
		// ----------------------------------------------------------------
		SKILL_ID_RENCHUHOGEKI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "連柱崩撃";
			this.kana = "レンチユウホウケキ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 400 + 100 * skillLv;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return Math.floor((skillLv + 1) / 2);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 800 + 200 * Math.floor((skillLv - 1) / 5);
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ソウルコレクト
		// ----------------------------------------------------------------
		SKILL_ID_SOUL_COLECT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ソウルコレクト";
			this.kana = "ソウルコレクト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アローバルカン
		// ----------------------------------------------------------------
		SKILL_ID_ARRAW_VULKAN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アローバルカン";
			this.kana = "アロオハルカン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 200 + 100 * skillLv;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 9;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1800 + 200 * Math.floor((skillLv - 1) / 5);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 800 + 200 * Math.floor((skillLv - 1) / 5);
			}

			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 練気功
		// ----------------------------------------------------------------
		SKILL_ID_RENKIKO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "練気功";
			this.kana = "レンキコウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マリオネットコントロール
		// ----------------------------------------------------------------
		SKILL_ID_MARIONET_CONTROL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マリオネットコントロール";
			this.kana = "マリオネツトコントロオル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ライフコンバージョン
		// ----------------------------------------------------------------
		SKILL_ID_LIFE_CONVERSION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ライフコンバージョン";
			this.kana = "ライフコンハアシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ソウルチェンジ
		// ----------------------------------------------------------------
		SKILL_ID_SOUL_CHANGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ソウルチェンジ";
			this.kana = "ソウルチエンシ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ソウルバーン
		// ----------------------------------------------------------------
		SKILL_ID_SOUL_BURN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ソウルバーン";
			this.kana = "ソウルハアン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return (skillLv == 5) ? 15000 : 10000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マインドブレイカー
		// ----------------------------------------------------------------
		SKILL_ID_MIND_BREAKER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マインドブレイカー";
			this.kana = "マイントフレイカア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9 + 3 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 700 + 100 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アルケミー
		// ----------------------------------------------------------------
		SKILL_ID_ALCHEMY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アルケミー";
			this.kana = "アルケミイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ポーションシノプス
		// ----------------------------------------------------------------
		SKILL_ID_POTION_SYNAPSE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ポーションシノプス";
			this.kana = "ホオシヨンシノフス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 連打掌修得時の三段掌ディレイ増加
		// ----------------------------------------------------------------
		SKILL_ID_SANDAN_DELAY_ZOKA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "連打掌修得時の三段掌ディレイ増加";
			this.kana = "レンタシヨウシユウトクシノサンタンシヨウテイレイソウカ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// トマホーク投げ
		// ----------------------------------------------------------------
		SKILL_ID_TOMAHAWKNAGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "トマホーク投げ";
			this.kana = "トマホオクナケ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// パルスストライク
		// ----------------------------------------------------------------
		SKILL_ID_PULSE_STRIKE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "パルスストライク";
			this.kana = "ハルスストライク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return -1;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// バーサクピッチャー
		// ----------------------------------------------------------------
		SKILL_ID_BERSERK_PITCHER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "バーサークピッチャー";
			this.kana = "ハアサアクヒツチヤア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ティオアプチャギ(ダッシュ中)
		// ----------------------------------------------------------------
		SKILL_ID_TEIOAPUCHAGI_IN_DASH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.refId = SKILL_ID_TEIOAPUCHAGI;
			this.name = "ティオアプチャギ(ダッシュ中)";
			this.kana = "テイオアフチヤキタツシユチユウ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 - 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var spurt = 0;
				var wpn = 0;

				// 基本式
				pow = 4 * charaDataManger.GetCharaBaseLv();

				// 「テコンキッド スパート状態」の効果
				spurt = charaDataManger.UsedSkillSearch(SKILL_ID_SPURT_ZYOTAI);
				wpn = charaDataManger.GetWeaponType();
				if ((spurt > 0) && (wpn == 0)) {
					pow *= 2;
				}

				return pow;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ベナムナイフ
		// ----------------------------------------------------------------
		SKILL_ID_VENOM_KNIFE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ベナムナイフ";
			this.kana = "ヘナムナイフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ファンタズミックアロー
		// ----------------------------------------------------------------
		SKILL_ID_FANTASMIC_ARROW = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ファンタズミックアロー";
			this.kana = "フアンタスミツクアロオ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 150;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// チャージアタック
		// ----------------------------------------------------------------
		SKILL_ID_CHARGE_ATTACK = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "チャージアタック";
			this.kana = "チヤアシアタツク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 無死亡ボーナス
		// ----------------------------------------------------------------
		SKILL_ID_SUPER_NOVICE_NODEAD_BONUS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "無死亡ボーナス";
			this.kana = "ムシホウホウナス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 結婚ステータス-1付与
		// ----------------------------------------------------------------
		SKILL_ID_MARIAGE_STATUS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "結婚ステータス-1付与";
			this.kana = "ケツコンステエタスフヨ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 製作スキルマスター数(達人の斧用)
		// ----------------------------------------------------------------
		SKILL_ID_SKILL_COUNT_CREATE_ARMS_MASTER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "製作スキルマスター数(達人の斧用)";
			this.kana = "セイサクスキルマスタアスウタツシンノオノヨウ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ダークストライク
		// ----------------------------------------------------------------
		SKILL_ID_DARK_STRIKE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ダークストライク";
			this.kana = "タアクストライク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_DARK;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12 + 6 * Math.floor((skillLv + 1) / 2) - 4
						* ((skillLv + 1) % 2);
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return Math.floor(skillLv / 2);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 + 200 * Math.floor((skillLv + 1) / 2) - 200
						* ((skillLv + 1) % 2);
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 予約313
		// ----------------------------------------------------------------
		SKILL_ID_RESERVED_313 = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "";
			this.kana = "";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 予約314
		// ----------------------------------------------------------------
		SKILL_ID_RESERVED_314 = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "";
			this.kana = "";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 予約315
		// ----------------------------------------------------------------
		SKILL_ID_RESERVED_315 = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "";
			this.kana = "";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 予約316
		// ----------------------------------------------------------------
		SKILL_ID_RESERVED_316 = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "";
			this.kana = "";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 温もり
		// ----------------------------------------------------------------
		SKILL_ID_NUKUMORI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "温もり";
			this.kana = "ヌクモリ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.DelayTimeSkillTiming = function(skillLv, charaDataManger) {
				return (charaDataManger.GetMobBossType() == MONSTER_BOSSTYPE_BOSS) ? 100
						: 50;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 温もり(壁押付)
		// ----------------------------------------------------------------
		SKILL_ID_NUKUMORI_KABE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.refId = SKILL_ID_NUKUMORI;
			this.name = "温もり(壁押付)";
			this.kana = "ヌクモリカヘオシツケ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.DelayTimeSkillTiming = function(skillLv, charaDataManger) {
				return (charaDataManger.GetMobBossType() == MONSTER_BOSSTYPE_BOSS) ? 100
						: 20;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ヘヴンズドライブ(盗作用Ex)
		// ----------------------------------------------------------------
		SKILL_ID_HEAVENS_DRIVE_FOR_CLONE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.refId = SKILL_ID_HEAVENS_DRIVE;
			this.name = "ヘヴンズドライブ(盗作用Ex)";
			this.kana = "ヘウンストライフトウサクヨウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 24 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var seirei = 0;

				// 基本式
				pow = 125;

				// 「ソーサラー 精霊スキル」の効果
				seirei = charaDataManger.UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL);
				if (seirei == 28) {
					pow += Math.floor(charaDataManger.GetCharaJobLv() / 3);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウォーターボール(盗作用Ex)
		// ----------------------------------------------------------------
		SKILL_ID_WATER_BALL_FOR_CLONE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.refId = SKILL_ID_WATER_BALL;
			this.name = "ウォーターボール(盗作用Ex)";
			this.kana = "ウオオタアホオルトウサクヨウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 30 * skillLv;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				var hitcnt = 0;

				if (skillLv >= 4) {
					hitcnt = 25;
				} else if (skillLv >= 2) {
					hitcnt = 9;
				} else {
					hitcnt = 1;
				}

				return hitcnt;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}

			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return 100 * this.hitCount(skillLv, charaDataManger);
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 阿修羅覇王拳(MaxSP-1固定)
		// ----------------------------------------------------------------
		SKILL_ID_ASHURA_HAOKEN_SPKOTEI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.refId = SKILL_ID_ASHURA_HAOKEN;
			this.name = "阿修羅覇王拳(MaxSP-1固定)";
			this.kana = "アシユラハオウケンスヒリチユアルホイントコテイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostVary = function(skillLv, charaDataManger) {
				return 100;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// メモライズ(5回制限未計算)
		// ----------------------------------------------------------------
		SKILL_ID_MEMORIZE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "メモライズ(5回制限未計算)";
			this.kana = "メモライス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}

			this.CastTimeForce = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 予約323
		// ----------------------------------------------------------------
		SKILL_ID_RESERVED_323 = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(現在この欄は未使用)";
			this.kana = "";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シールドチェーン
		// ----------------------------------------------------------------
		SKILL_ID_SHIELD_CHAIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "シールドチェーン";
			this.kana = "シイルトチエエン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// グラビテーションフィールド
		// ----------------------------------------------------------------
		SKILL_ID_GRAVITATION_FIELD = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "グラビテーションフィールド";
			this.kana = "クラヒテエシヨンフイイルト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 8 + 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeSkillObject = function(skillLv, charaDataManger) {
				return 9000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// カートターミネーション
		// ----------------------------------------------------------------
		SKILL_ID_CART_TERMINATION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "カートターミネーション";
			this.kana = "カアトタアミネエシヨン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// オーバートラストマックス
		// ----------------------------------------------------------------
		SKILL_ID_OVER_TRUST_MAX = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "オーバートラストマックス";
			this.kana = "オオハアトラストマツクス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (仮)アシッドデモンストレーション
		// ----------------------------------------------------------------
		SKILL_ID_ACID_DEMONSTRATION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(仮)アシッドデモンストレーション";
			this.kana = "アシツトテモンストレエシヨン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 400 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// タイリギ(蹴威力UP)
		// ----------------------------------------------------------------
		SKILL_ID_TAIRIGI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "タイリギ(蹴威力UP)";
			this.kana = "タイリキ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 110 - 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (skillLv >= 7) ? 0 : (7000 - 1000 * skillLv);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 200;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フェオリチャギの構え
		// ----------------------------------------------------------------
		SKILL_ID_FEORICHAGINO_KAMAE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フェオリチャギの構え";
			this.kana = "フエオリチヤキノカマエ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フェオリチャギ
		// ----------------------------------------------------------------
		SKILL_ID_FEORICHAGI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フェオリチャギ";
			this.kana = "フエオリチヤキ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 - 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 160 + 20 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ネリョチャギの構え
		// ----------------------------------------------------------------
		SKILL_ID_NERYOCHAGINO_KAMAE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ネリョチャギの構え";
			this.kana = "ネリヨチヤキノカマエ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ネリョチャギ
		// ----------------------------------------------------------------
		SKILL_ID_NERYOCHAGI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ネリョチャギ";
			this.kana = "ネリヨチヤキ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 - 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 160 + 20 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// トルリョチャギの構え
		// ----------------------------------------------------------------
		SKILL_ID_TORURYOCHAGINO_KAMAE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "トルリョチャギの構え";
			this.kana = "トルリヨチヤキノカマエ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// トルリョチャギ
		// ----------------------------------------------------------------
		SKILL_ID_TORURYOCHAGI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "トルリョチャギ";
			this.kana = "トルリヨチヤキ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 - 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 190 + 30 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アプチャオルリギの構え
		// ----------------------------------------------------------------
		SKILL_ID_APUCHAORURIGINO_KAMAE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アプチャオルリギの構え";
			this.kana = "アフチヤオルリキノカマエ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アプチャオルリギ
		// ----------------------------------------------------------------
		SKILL_ID_APUCHAORURIGI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アプチャオルリギ";
			this.kana = "アフチヤオルリキ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 - 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 190 + 30 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 落法(調整中)
		// ----------------------------------------------------------------
		SKILL_ID_RAKHO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "落法(調整中)";
			this.kana = "ラクホウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ティオアプチャギ
		// ----------------------------------------------------------------
		SKILL_ID_TEIOAPUCHAGI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ティオアプチャギ";
			this.kana = "テイオアフチヤキ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 - 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 30 + 10 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 穏やかな休息
		// ----------------------------------------------------------------
		SKILL_ID_ODAYAKANA_KYUSOKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "穏やかな休息";
			this.kana = "オタヤカナキユウソク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 楽しい休息
		// ----------------------------------------------------------------
		SKILL_ID_TANOSHI_KYUSOKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "楽しい休息";
			this.kana = "タノシイキユウソク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ファイト
		// ----------------------------------------------------------------
		SKILL_ID_FIGHT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ファイト";
			this.kana = "フアイト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ノピティギ
		// ----------------------------------------------------------------
		SKILL_ID_NOPITIGI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ノピティギ";
			this.kana = "ノヒテイキ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 6000 - 1000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// テコンミッション
		// ----------------------------------------------------------------
		SKILL_ID_TAEGWON_MISSION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "テコンミッション";
			this.kana = "テコンミツシヨン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// テコンランカー状態
		// ----------------------------------------------------------------
		SKILL_ID_TAEGWON_RANKER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "テコンランカー状態";
			this.kana = "テコンランカアシヨウタイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 暖かい風
		// ----------------------------------------------------------------
		SKILL_ID_ATATAKAI_KAZE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "暖かい風";
			this.kana = "アタタカイカセ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return (skillLv <= 4) ? 20 : 50;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 太陽と月と星の感情
		// ----------------------------------------------------------------
		SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KANZYO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "太陽と月と星の感情";
			this.kana = "タイヨウトツキトホシノカンシヨウ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 太陽の温もり
		// ----------------------------------------------------------------
		SKILL_ID_TAIYONO_NUKUMORI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "太陽の温もり";
			this.kana = "タイヨウノヌクモリ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.DelayTimeSkillTiming = function(skillLv, charaDataManger) {
				return (charaDataManger.GetMobBossType() == MONSTER_BOSSTYPE_BOSS) ? 100
						: 50;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 月の温もり
		// ----------------------------------------------------------------
		SKILL_ID_TSUKINO_NUKUMORI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "月の温もり";
			this.kana = "ツキノヌクモリ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.DelayTimeSkillTiming = function(skillLv, charaDataManger) {
				return (charaDataManger.GetMobBossType() == MONSTER_BOSSTYPE_BOSS) ? 100
						: 50;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 星の温もり
		// ----------------------------------------------------------------
		SKILL_ID_HOSHINO_NUKUMORI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "星の温もり";
			this.kana = "ホシノヌクモリ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.DelayTimeSkillTiming = function(skillLv, charaDataManger) {
				return (charaDataManger.GetMobBossType() == MONSTER_BOSSTYPE_BOSS) ? 100
						: 50;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 太陽と月と星の憎しみ
		// ----------------------------------------------------------------
		SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_NIKUSHIMI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "太陽と月と星の憎しみ";
			this.kana = "タイヨウトツキトホシノニクシミ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 太陽の怒り
		// ----------------------------------------------------------------
		SKILL_ID_TAIYONO_IKARI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "太陽の怒り";
			this.kana = "タイヨウノイカリ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 月の怒り
		// ----------------------------------------------------------------
		SKILL_ID_TSUKINO_IKARI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "月の怒り";
			this.kana = "ツキノイカリ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 星の怒り
		// ----------------------------------------------------------------
		SKILL_ID_HOSHINO_IKARI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "星の怒り";
			this.kana = "ホシノイカリ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 太陽の安楽
		// ----------------------------------------------------------------
		SKILL_ID_TAIYONO_ANRAKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "太陽の安楽";
			this.kana = "タイヨウノアンラク";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 - 10 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 月の安楽
		// ----------------------------------------------------------------
		SKILL_ID_TSUKINO_ANRAKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "月の安楽";
			this.kana = "ツキノアンラク";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 - 10 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 星の安楽
		// ----------------------------------------------------------------
		SKILL_ID_HOSHINO_ANRAKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "星の安楽";
			this.kana = "ホシノアンラク";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 - 10 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 太陽の祝福
		// ----------------------------------------------------------------
		SKILL_ID_TAIYONO_SHUKUFUKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "太陽の祝福";
			this.kana = "タイヨウノシユクフク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 月の祝福
		// ----------------------------------------------------------------
		SKILL_ID_TSUKUNO_SHUKUFUKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "月の祝福";
			this.kana = "ツキノシユクフク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 星の祝福
		// ----------------------------------------------------------------
		SKILL_ID_HOSHINO_SHUKUFUKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "星の祝福";
			this.kana = "ホシノシユクフク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 太陽と月と星の悪魔
		// ----------------------------------------------------------------
		SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_AKUMA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "太陽と月と星の悪魔";
			this.kana = "タイヨウトツキトホシノアクマ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 太陽と月と星の友
		// ----------------------------------------------------------------
		SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_TOMO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "太陽と月と星の友";
			this.kana = "タイヨウトツキトホシノトモ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 太陽と月と星の知識
		// ----------------------------------------------------------------
		SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_CHISHIKI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "太陽と月と星の知識";
			this.kana = "タイヨウトツキトホシノチシキ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 太陽と月と星の融合
		// ----------------------------------------------------------------
		SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "太陽と月と星の融合";
			this.kana = "タイヨウトツキトホシノユウコウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 太陽と月と星の奇跡
		// ----------------------------------------------------------------
		SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KISEKI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "太陽と月と星の奇跡";
			this.kana = "タイヨウトツキトホシノキセキ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 太陽と月と星の天使
		// ----------------------------------------------------------------
		SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_TENSHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "太陽と月と星の天使";
			this.kana = "タイヨウトツキトホシノテンシ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ～の祝福(経験値増加率)
		// ----------------------------------------------------------------
		SKILL_ID_SHUKUFUKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "～の祝福(経験値増加率)";
			this.kana = "シユクフク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// カイゼル
		// ----------------------------------------------------------------
		SKILL_ID_KAISEL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "カイゼル";
			this.kana = "カイセル";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 130 - 10 * skillLv;
			}

			this.CastTimeForce = function(skillLv, charaDataManger) {
				return (skillLv >= 5) ? 2500 : (5000 - 500 * skillLv);
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// カアヒ
		// ----------------------------------------------------------------
		SKILL_ID_KAAHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "カアヒ";
			this.kana = "カアヒ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// カウプ
		// ----------------------------------------------------------------
		SKILL_ID_KAUPU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "カウプ";
			this.kana = "カウフ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// カイト
		// ----------------------------------------------------------------
		SKILL_ID_KAITO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "カイト";
			this.kana = "カイト";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 6500 - 500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// カイナ
		// ----------------------------------------------------------------
		SKILL_ID_KAINA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "カイナ";
			this.kana = "カイナ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エスティン
		// ----------------------------------------------------------------
		SKILL_ID_ESTIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エスティン";
			this.kana = "エステイン";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 10 * skillLv;

				// 小型以外には効果激減
				if (charaDataManger.GetMobSize() != SIZE_ID_SMALL) {
					pow = 1;
				}

				// プレイヤーには効果なし
				if (charaDataManger.GetMobId() == MONSTER_ID_PLAYER) {
					pow = 0;
				}

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 100;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エストン
		// ----------------------------------------------------------------
		SKILL_ID_ESTON = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エストン";
			this.kana = "エストン";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 5 * skillLv;

				// プレイヤーには効果なし
				if (charaDataManger.GetMobId() == MONSTER_ID_PLAYER) {
					pow = 0;
				}

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 100;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エスマ
		// ----------------------------------------------------------------
		SKILL_ID_ESMA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エスマ";
			this.kana = "エスマ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 40 + charaDataManger.GetCharaBaseLv();
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エスウ
		// ----------------------------------------------------------------
		SKILL_ID_ESU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エスウ";
			this.kana = "エスウ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 85 - 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エスカ
		// ----------------------------------------------------------------
		SKILL_ID_ESKA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エスカ";
			this.kana = "エスカ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 120 - 20 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エスク
		// ----------------------------------------------------------------
		SKILL_ID_ESKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エスク";
			this.kana = "エスク";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 75 - 20 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000 - 1000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// タイリギスパート状態(STR+状態)
		// ----------------------------------------------------------------
		SKILL_ID_SPURT_ZYOTAI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "タイリギスパート状態(STR+状態)";
			this.kana = "タイリキスハアトシヨウタイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 自分以外のPT人数(ファイト用)
		// ----------------------------------------------------------------
		SKILL_ID_ZIBUNIGAINO_PTNINZU_FOR_FIGHT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "自分以外のPT人数(ファイト用)";
			this.kana = "シフンイカイノハアテイイニンスウフアイトヨウ";
			this.maxLv = 11;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ソニックアクセラレーション
		// ----------------------------------------------------------------
		SKILL_ID_SONIC_ACCELERATION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ソニックアクセラレーション";
			this.kana = "ソニツクアクセラレエシヨン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 寸勁
		// ----------------------------------------------------------------
		SKILL_ID_SUNKEI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "寸勁";
			this.kana = "スンケイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 300;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クローズコンファイン
		// ----------------------------------------------------------------
		SKILL_ID_CLOSE_CONFINE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "クローズコンファイン";
			this.kana = "クロオスコンフアイン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シールドブーメラン(SL魂版)
		// ----------------------------------------------------------------
		SKILL_ID_SHIELD_BOOMERANG_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.refId = SKILL_ID_SHIELD_BOOMERANG;
			this.name = "シールドブーメラン(SL魂版)";
			this.kana = "シイルトフウメランソウルリンカアタマシイハン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 200 + 60 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 350;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スーパーノービスの魂
		// ----------------------------------------------------------------
		SKILL_ID_SUPER_NOVICENO_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スーパーノービスの魂";
			this.kana = "スウハアノオヒスノタマシイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ワンハンドクイッケン(SL魂)
		// ----------------------------------------------------------------
		SKILL_ID_ONEHAND_QUICKEN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ワンハンドクイッケン(SL魂)";
			this.kana = "ワンハントクイツケンソウルリンカアタマシイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ホーリーライト(SL魂版)
		// ----------------------------------------------------------------
		SKILL_ID_HOLY_LIGHT_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.refId = SKILL_ID_HOLY_LIGHT;
			this.name = "ホーリーライト(SL魂版)";
			this.kana = "ホオリイライトソウルリンカアタマシイハン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 75;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 625;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ソニックブロー(SL魂版)
		// ----------------------------------------------------------------
		SKILL_ID_SONIC_BLOW_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.refId = SKILL_ID_SONIC_BLOW;
			this.name = "ソニックブロー(SL魂版)";
			this.kana = "ソニツクフロオソウルリンカアタマシイハン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 14 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var edp = 0;

				// 基本式
				pow = 400 + 40 * skillLv;

				// 「アサシンクロス エンチャントデッドリーポイズン」の効果（ペナルティ）
				edp = charaDataManger.UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON);
				if (edp > 0) {
					pow = Math.floor(pow / 2);
				}

				// 魂効果
				pow *= (charaDataManger.IsSeedsMode()) ? 1.25 : 2;

				return pow;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 8;
			}

			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return (charaDataManger.IsSeedsMode()) ? 2000 : 1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フルアドレナリンラッシュ
		// ----------------------------------------------------------------
		SKILL_ID_FULL_ADRENALINE_RUSH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フルアドレナリンラッシュ";
			this.kana = "フルアトレナリンラツシユ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 64;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ハンターの魂
		// ----------------------------------------------------------------
		SKILL_ID_HUNTERNO_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ハンターの魂";
			this.kana = "ハンタアノタマシイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ビーストストレイフィング
		// ----------------------------------------------------------------
		SKILL_ID_BEAST_STRAIFING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ビーストストレイフィング";
			this.kana = "ヒイストストレイフインク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 50 + 8 * charaDataManger.GetCharaStr();
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 転生一次職の魂
		// ----------------------------------------------------------------
		SKILL_ID_TENSE_ICHIZISHOKUNO_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "転生一次職の魂";
			this.kana = "テンセイイチシシヨクノタマシイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 投擲修練
		// ----------------------------------------------------------------
		SKILL_ID_TOKAKU_SHUREN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "投擲修練";
			this.kana = "トウカクシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 手裏剣投げ
		// ----------------------------------------------------------------
		SKILL_ID_SHURIKEN_NAGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)手裏剣投げ";
			this.kana = "シユリケンナケ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 5 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 苦無投げ
		// ----------------------------------------------------------------
		SKILL_ID_KUNAI_NAGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)苦無投げ";
			this.kana = "クナイナケ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 風魔手裏剣投げ
		// ----------------------------------------------------------------
		SKILL_ID_FUMASHURIKEN_NAGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)風魔手裏剣投げ";
			this.kana = "フウマシユリケンナケ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -50 + 250 * skillLv;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 3 + 1 * Math.floor((skillLv - 1) / 2);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 銭投げ
		// ----------------------------------------------------------------
		SKILL_ID_ZENI_NAGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "銭投げ";
			this.kana = "セニナケ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 畳返し
		// ----------------------------------------------------------------
		SKILL_ID_TATAMI_GAESHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "畳返し";
			this.kana = "タタミカエシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 200 + 20 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 影跳び
		// ----------------------------------------------------------------
		SKILL_ID_KAGETOBI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "影跳び";
			this.kana = "カケトヒ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 霞斬り
		// ----------------------------------------------------------------
		SKILL_ID_KASUMIGIRI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)霞斬り";
			this.kana = "カスミキリ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 20 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 影斬り
		// ----------------------------------------------------------------
		SKILL_ID_KAGEKIRI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)影斬り";
			this.kana = "カケキリ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 50 + 150 * skillLv;
			}

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 空蝉
		// ----------------------------------------------------------------
		SKILL_ID_UTSUSEMI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "空蝉";
			this.kana = "ウツセミ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 影分身
		// ----------------------------------------------------------------
		SKILL_ID_KAGEBUNSHIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "影分身";
			this.kana = "カケフンシン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 28 + 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (skillLv >= 7) ? 1000 : (4500 - 500 * skillLv);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 念
		// ----------------------------------------------------------------
		SKILL_ID_NEN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "念";
			this.kana = "ネン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 6000 - 1000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 一閃
		// ----------------------------------------------------------------
		SKILL_ID_ISSEN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "一閃";
			this.kana = "イツセン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 忍法修練
		// ----------------------------------------------------------------
		SKILL_ID_NINPO_SHUREN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "忍法修練";
			this.kana = "ニンホウシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 紅炎華
		// ----------------------------------------------------------------
		SKILL_ID_KOUENKA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "紅炎華";
			this.kana = "コウエンカ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 90;

				// 「影狼・朧 火符：炎天」の効果
				if (charaDataManger.UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) == ELM_ID_FIRE) {
					pow += 20 * charaDataManger.UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 700 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 火炎陣
		// ----------------------------------------------------------------
		SKILL_ID_KAENZIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "火炎陣";
			this.kana = "カエンシン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 50;

				// 「影狼・朧 火符：炎天」の効果
				if (charaDataManger.UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) == ELM_ID_FIRE) {
					pow += 20 * charaDataManger.UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 5 + 1 * Math.floor((skillLv - 1) / 2);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 6500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 龍炎陣
		// ----------------------------------------------------------------
		SKILL_ID_RYUENZIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "龍炎陣";
			this.kana = "リユウエンシン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 150 + 150 * skillLv;

				// 「影狼・朧 火符：炎天」の効果
				if (charaDataManger.UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) == ELM_ID_FIRE) {
					pow += 100 * charaDataManger.UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 3;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 氷閃槍
		// ----------------------------------------------------------------
		SKILL_ID_HYOSENSO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "氷閃槍";
			this.kana = "ヒヨウセンソウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 70;

				// 「影狼・朧 氷符：吹雪」の効果
				if (charaDataManger.UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) == ELM_ID_WATER) {
					pow += 20 * charaDataManger.UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 2 + skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 700 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 水遁
		// ----------------------------------------------------------------
		SKILL_ID_SUITON = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "水遁";
			this.kana = "スイトン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12 + 3 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 氷柱落し
		// ----------------------------------------------------------------
		SKILL_ID_TSURARAOTOSHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)氷柱落し";
			this.kana = "ツララオトシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 150 + 150 * skillLv;

				// 「影狼・朧 氷符：吹雪」の効果
				if (charaDataManger.UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) == ELM_ID_WATER) {
					pow += 100 * charaDataManger.UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
				}

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 風刃
		// ----------------------------------------------------------------
		SKILL_ID_FUZIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "風刃";
			this.kana = "フウシン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 150;

				// 「影狼・朧 風符：青嵐」の効果
				if (charaDataManger.UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) == ELM_ID_WIND) {
					pow += 20 * charaDataManger.UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 1 + 1 * Math.floor(skillLv / 2);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 + 1000 * Math.floor(skillLv / 2);
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 雷撃砕
		// ----------------------------------------------------------------
		SKILL_ID_RAIGEKISAI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)雷撃砕";
			this.kana = "ライケキサイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 100 + 100 * skillLv;

				// 「影狼・朧 風符：青嵐」の効果
				if (charaDataManger.UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) == ELM_ID_WIND) {
					pow += 20 * charaDataManger.UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
				}

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 朔風
		// ----------------------------------------------------------------
		SKILL_ID_SAKUFU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)朔風";
			this.kana = "サクフウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 100 + 100 * skillLv;

				// 「影狼・朧 風符：青嵐」の効果
				if (charaDataManger.UsedSkillSearch(SKILL_ID_FU_ELEMENT_OF_FU) == ELM_ID_WIND) {
					pow += 100 * charaDataManger.UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);
				}

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// コインの枚数
		// ----------------------------------------------------------------
		SKILL_ID_COUNT_OF_COIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "コインの枚数";
			this.kana = "コインノマイスウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フライング
		// ----------------------------------------------------------------
		SKILL_ID_FLYING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フライング";
			this.kana = "フラインク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// トリプルアクション
		// ----------------------------------------------------------------
		SKILL_ID_TRIPLE_ACTION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "トリプルアクション";
			this.kana = "トリフルアクシヨン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 150;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 3;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ブルズアイ
		// ----------------------------------------------------------------
		SKILL_ID_BULLS_EYE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ブルズアイ";
			this.kana = "フルスアイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var race = 0;

				// 基本式
				pow = 100;

				// 人間形と動物形には500%
				race = charaDataManger.GetMobRace();
				if ((race == RACE_ID_HUMAN) || (race == RACE_ID_ANIMAL)) {
					pow = 500;
				}

				return pow;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 5;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マッドネスキャンセラー
		// ----------------------------------------------------------------
		SKILL_ID_MADNESSS_CANCELER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マッドネスキャンセラー";
			this.kana = "マツトネスキヤンセラア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アジャストメント
		// ----------------------------------------------------------------
		SKILL_ID_ADJUSTMENT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アジャストメント";
			this.kana = "アシヤストメント";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// インクリージングアキュラシー
		// ----------------------------------------------------------------
		SKILL_ID_INCREASING_ACCURACY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "インクリージングアキュラシー";
			this.kana = "インクリイシンクアキユラシイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マジカルバレット
		// ----------------------------------------------------------------
		SKILL_ID_MAGICAL_BARRET = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マジカルバレット";
			this.kana = "マシカルハレツト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クラッカー
		// ----------------------------------------------------------------
		SKILL_ID_CRACKER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "クラッカー";
			this.kana = "クラツカア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シングルアクション
		// ----------------------------------------------------------------
		SKILL_ID_SINGLE_ACTION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "シングルアクション";
			this.kana = "シンクルアクシヨン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スネークアイ
		// ----------------------------------------------------------------
		SKILL_ID_SNAKE_EYE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スネークアイ";
			this.kana = "スネエクアイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// チェーンアクション
		// ----------------------------------------------------------------
		SKILL_ID_CHAIN_ACTION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "チェーンアクション";
			this.kana = "チエエンアクシヨン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData);
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ラピッドシャワー
		// ----------------------------------------------------------------
		SKILL_ID_RAPID_SHOWER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ラピッドシャワー";
			this.kana = "ラヒツトシヤワア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 500 + 50 * skillLv;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 5;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1700;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// デスペラード
		// ----------------------------------------------------------------
		SKILL_ID_DEATHPERAD = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "デスペラード";
			this.kana = "テスヘラアト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 50 + 50 * skillLv;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// トラッキング
		// ----------------------------------------------------------------
		SKILL_ID_TRACKING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "トラッキング";
			this.kana = "トラツキンク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 200 + 100 * skillLv;
			}

			this.CastTimeForce = function(skillLv, charaDataManger) {
				return 500 + 100 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ディスアーム
		// ----------------------------------------------------------------
		SKILL_ID_DISARM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ディスアーム";
			this.kana = "テイスアアム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ピアーシングショット
		// ----------------------------------------------------------------
		SKILL_ID_PIERCING_SHOT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ピアーシングショット";
			this.kana = "ヒアアシンクシヨツト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 武器の種類によって威力が変化
				switch (charaDataManger.GetCharaArmsType()) {

				case ITEM_KIND_HANDGUN:
					pow = 100 + 20 * skillLv;
					break;

				case ITEM_KIND_RIFLE:
					pow = 150 + 30 * skillLv;
					break;
				}

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ガトリングフィーバー
		// ----------------------------------------------------------------
		SKILL_ID_GATLING_FEVER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ガトリングフィーバー";
			this.kana = "カトリンクフィイハア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 28 + 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ダスト
		// ----------------------------------------------------------------
		SKILL_ID_DUST = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ダスト";
			this.kana = "タスト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 50 * skillLv;
			}

			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フルバスター
		// ----------------------------------------------------------------
		SKILL_ID_FULL_BASTER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フルバスター";
			this.kana = "フルハスタア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 300 + 100 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 + 200 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スプレッドアタック
		// ----------------------------------------------------------------
		SKILL_ID_SPREAD_ATTACK = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スプレッドアタック";
			this.kana = "スフレツトアタツク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 200 + 20 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// グラウンドドリフト
		// ----------------------------------------------------------------
		SKILL_ID_GROUND_DRIFT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "グラウンドドリフト";
			this.kana = "クラウントトリフト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 200 + 20 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 一閃(MaxHP固定)
		// ----------------------------------------------------------------
		SKILL_ID_ISSEN_MAX = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.refId = SKILL_ID_ISSEN;
			this.name = "一閃(MaxHP固定)";
			this.kana = "イツセンマツクスヒツトホイントコテイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エンチャントブレイド
		// ----------------------------------------------------------------
		SKILL_ID_ENCHANT_BLADE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エンチャントブレイド";
			this.kana = "エンチヤントフレイト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 38 + 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ソニックウェーブ
		// ----------------------------------------------------------------
		SKILL_ID_SONIC_WAVE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ソニックウェーブ";
			this.kana = "ソニツクウエエフ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 27 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 700 + 100 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100)

				return pow;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (skillLv <= 5) ? 1000 : 0;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return (skillLv <= 5) ? 2000 : 200;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// デスバウンド
		// ----------------------------------------------------------------
		SKILL_ID_DEATH_BOUND = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)デスバウンド";
			this.kana = "テスハウント";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 2500 + 500 * skillLv;

				}

				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ハンドレッドスピア
		// ----------------------------------------------------------------
		SKILL_ID_HANDRED_SPEAR = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ハンドレッドスピア";
			this.kana = "ハントレツトスヒア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 5;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 200 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウィンドカッター
		// ----------------------------------------------------------------
		SKILL_ID_WIND_CUTTER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ウィンドカッター";
			this.kana = "ウイントカツタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 100 + 50 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2500 - 500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ファントムスラスト
		// ----------------------------------------------------------------
		SKILL_ID_PHANTOM_SLAST = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ファントムスラスト";
			this.kana = "フアントムスラスト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 50 * skillLv;
				pow += 10 * charaDataManger.UsedSkillSearch(SKILL_ID_YARI_SHUREN);

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 150);

				return pow;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (仮)イグニッションブレイク
		// ----------------------------------------------------------------
		SKILL_ID_IGNITION_BREAK = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(仮)イグニッションブレイク";
			this.kana = "イクニツシヨンフレイク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ドラゴントレーニング
		// ----------------------------------------------------------------
		SKILL_ID_DRAGON_TRAINING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ドラゴントレーニング";
			this.kana = "トラコントレエニンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ファイアードラゴンブレス
		// ----------------------------------------------------------------
		SKILL_ID_FIRE_DRAGON_BREATH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)ファイアードラゴンブレス";
			this.kana = "フアイアアトラコンフレス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {

				if (skillLv >= 9) {
					return 2000;
				} else if (skillLv >= 7) {
					return 1500;
				} else if (skillLv >= 4) {
					return 1000;
				}

				return 3000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ドラゴンハウリング
		// ----------------------------------------------------------------
		SKILL_ID_DRAGON_HOWLING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ドラゴンハウリング";
			this.kana = "トラコンハウリンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1250 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return (skillLv == 5) ? 200 : (12500 - 2500 * skillLv);
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ルーンマスタリー
		// ----------------------------------------------------------------
		SKILL_ID_RUNE_MASTERY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ルーンマスタリー";
			this.kana = "ルウンマスタリイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ジャイアントグロース
		// ----------------------------------------------------------------
		SKILL_ID_GIANT_GROWTH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ジャイアントグロース";
			this.kana = "シヤイアントクロオス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// バイタリティアクティベーション
		// ----------------------------------------------------------------
		SKILL_ID_VITARITY_ACTIVATION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "バイタリティアクティベーション";
			this.kana = "ハイタリテイアクテイヘエシヨン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 300000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ストームブラスト
		// ----------------------------------------------------------------
		SKILL_ID_STORM_BLAST = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ストームブラスト";
			this.kana = "ストオムフラスト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow += 100 * charaDataManger.UsedSkillSearch(SKILL_ID_RUNE_MASTERY);
				pow += 100 * Math.floor(charaDataManger.GetCharaInt() / 8);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 8000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ストーンハードスキン
		// ----------------------------------------------------------------
		SKILL_ID_STONE_HARD_SKIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ストーンハードスキン";
			this.kana = "ストオンハアトスキン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ファイティングスピリット
		// ----------------------------------------------------------------
		SKILL_ID_FIGHTING_SPIRIT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ファイティングスピリット";
			this.kana = "フアイテインクスヒリツト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アバンダンス
		// ----------------------------------------------------------------
		SKILL_ID_AVANDANCE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アバンダンス";
			this.kana = "アハンタンス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クラッシュストライク
		// ----------------------------------------------------------------
		SKILL_ID_CRUSH_STRIKE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "クラッシュストライク";
			this.kana = "クラツシユストライク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData);
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// リフレッシュ
		// ----------------------------------------------------------------
		SKILL_ID_REFRESH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "リフレッシュ";
			this.kana = "リフレツシユ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ミレニアムシールド
		// ----------------------------------------------------------------
		SKILL_ID_MILLENNIUM_SHIELD = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ミレニアムシールド";
			this.kana = "ミレニアムシイルト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ベナムインプレス
		// ----------------------------------------------------------------
		SKILL_ID_VENOM_IMPRESS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ベナムインプレス";
			this.kana = "ヘナムインフレス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 4 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 5000;

				}

				return 0;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クロスインパクト
		// ----------------------------------------------------------------
		SKILL_ID_CROSS_IMPACT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "クロスインパクト";
			this.kana = "クロスインハクト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_UNKNOWN_DELAY_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var edp = 0;

				// 基本式
				pow = 1000 + 100 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 120);

				// 「アサシンクロス エンチャントデッドリーポイズン」の効果（ペナルティ）
				edp = charaDataManger.UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON);
				if (edp > 0) {
					pow = Math.floor(pow / 2);
				}

				return pow;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 7;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000 - 500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ダークイリュージョン
		// ----------------------------------------------------------------
		SKILL_ID_DARK_ILLUSION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ダークイリュージョン";
			this.kana = "タアクイリユウシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 新毒研究
		// ----------------------------------------------------------------
		SKILL_ID_SHINDOKU_KENKYU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "新毒研究";
			this.kana = "シントクケンキユウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 新毒製造
		// ----------------------------------------------------------------
		SKILL_ID_SHINDOKU_SEIZO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "新毒製造";
			this.kana = "シントクセイソウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アンチドート
		// ----------------------------------------------------------------
		SKILL_ID_ANTIDOTE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アンチドート";
			this.kana = "アンチトオト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ポイズニングウェポン
		// ----------------------------------------------------------------
		SKILL_ID_POISONING_WEAPON = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ポイズニングウェポン";
			this.kana = "ホイスニンクウエホン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 + 4 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 10000;

				}

				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ベナムプレッシャー
		// ----------------------------------------------------------------
		SKILL_ID_VENOM_PRESSURE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ベナムプレッシャー";
			this.kana = "ヘナムフレツシヤア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ポイズンスモーク
		// ----------------------------------------------------------------
		SKILL_ID_POISON_SMOKE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ポイズンスモーク";
			this.kana = "ホイスンスモオク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウェポンブロッキング
		// ----------------------------------------------------------------
		SKILL_ID_WEAPON_BLOCKING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ウェポンブロッキング";
			this.kana = "ウエホンフロツキンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 44 - 4 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 5000;

				}

				return 0;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// カウンタースラッシュ
		// ----------------------------------------------------------------
		SKILL_ID_COUNTER_SLASH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)カウンタースラッシュ";
			this.kana = "カウンタアスラツシユ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var edp = 0;

				// 基本式
				pow = 300 + 150 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 120);

				// ステータス補正
				pow += 2 * charaDataManger.GetCharaAgi();
				pow += 4 * charaDataManger.GetCharaJobLv();

				// 「アサシンクロス エンチャントデッドリーポイズン」の効果（ペナルティ）
				edp = charaDataManger.UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON);
				if (edp > 0) {
					pow = Math.floor(pow / 2);
				}

				return pow;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウェポンクラッシュ
		// ----------------------------------------------------------------
		SKILL_ID_WEAPON_CRUSH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ウェポンクラッシュ";
			this.kana = "ウエホンクラツシユ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クローキングエクシード
		// ----------------------------------------------------------------
		SKILL_ID_CLOAKING_EXCEED = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "クローキングエクシード";
			this.kana = "クロオキンクエクシイト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 45;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ファントムメナス
		// ----------------------------------------------------------------
		SKILL_ID_PHANTOM_MENUS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ファントムメナス";
			this.kana = "フアントムメナス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ハルシネーションウォーク
		// ----------------------------------------------------------------
		SKILL_ID_HALLUCINATION_WALK = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ハルシネーションウォーク";
			this.kana = "ハルシネエシヨンウオオク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 180000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ローリングカッター
		// ----------------------------------------------------------------
		SKILL_ID_ROLLING_CUTTER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ローリングカッター";
			this.kana = "ロオリンクカツタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var edp = 0;

				// 基本式
				pow = 50 + 50 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				// 「アサシンクロス エンチャントデッドリーポイズン」の効果（ペナルティ）
				edp = charaDataManger.UsedSkillSearch(SKILL_ID_ENCHANT_DEADLY_POISON);
				if (edp > 0) {
					pow = Math.floor(pow / 2);
				}

				return pow;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 200;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クロスリッパースラッシャー
		// ----------------------------------------------------------------
		SKILL_ID_CROSS_RIPPER_SLASHER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "クロスリッパースラッシャー";
			this.kana = "クロスリツハアスラツシヤア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ジュデックス
		// ----------------------------------------------------------------
		SKILL_ID_JUDEX = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)ジュデックス";
			this.kana = "シユテツクス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 17 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 360 + 48 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 3;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アンシラ
		// ----------------------------------------------------------------
		SKILL_ID_ANCILLA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アンシラ";
			this.kana = "アンシラ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostVary = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アドラムス
		// ----------------------------------------------------------------
		SKILL_ID_ADORAMUS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アドラムス";
			this.kana = "アトラムス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 + 6 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 500 + 100 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 5000 - 500 * skillLv;

				}

				return 0;
			}


		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クレメンティア
		// ----------------------------------------------------------------
		SKILL_ID_CLEMENTIA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "クレメンティア";
			this.kana = "クレメンテイア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 64 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// カントキャンディダス
		// ----------------------------------------------------------------
		SKILL_ID_CANTOCANDIDUS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "カントキャンディダス";
			this.kana = "カントキヤンテイタス";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 45 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// コルセオヒール
		// ----------------------------------------------------------------
		SKILL_ID_COLUCEO_HEAL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "コルセオヒール";
			this.kana = "コルセオヒイル";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 + 40 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2500 - 500 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000 - 1000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エピクレシス
		// ----------------------------------------------------------------
		SKILL_ID_EPICLESIS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エピクレシス";
			this.kana = "エヒクレシス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 300;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 + 1000 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000 + 5000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// プラエファティオ
		// ----------------------------------------------------------------
		SKILL_ID_PRAEFATIO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "プラエファティオ";
			this.kana = "フラエファテイオ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 4000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 4000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// オラティオ
		// ----------------------------------------------------------------
		SKILL_ID_ORATIO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "オラティオ";
			this.kana = "オラテイオ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 32 + 3 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ラウダアグヌス
		// ----------------------------------------------------------------
		SKILL_ID_LAUDAAGNUS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ラウダアグヌス";
			this.kana = "ラウタアクヌス";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ラウダラムス
		// ----------------------------------------------------------------
		SKILL_ID_LAUDARAMUS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ラウダラムス";
			this.kana = "ラウタラムス";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (仮)エウカリスティカ
		// ----------------------------------------------------------------
		SKILL_ID_EUCHARISTICA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(仮)エウカリスティカ";
			this.kana = "エウカリステイカ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// レノヴァティオ
		// ----------------------------------------------------------------
		SKILL_ID_RENOVATIO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "レノヴァティオ";
			this.kana = "レノウアテイオ";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ハイネスヒール
		// ----------------------------------------------------------------
		SKILL_ID_HIGHNESS_HEAL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ハイネスヒール";
			this.kana = "ハイネスヒイル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (skillLv == 5) ? 2000 : (100 + 400 * skillLv);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クリアランス
		// ----------------------------------------------------------------
		SKILL_ID_CLEARANCE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "クリアランス";
			this.kana = "クリアランス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 48 + 6 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エクスピアティオ
		// ----------------------------------------------------------------
		SKILL_ID_EXPIATIO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エクスピアティオ";
			this.kana = "エクスヒアテイオ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// デュプレライト
		// ----------------------------------------------------------------
		SKILL_ID_DUPLELIGHT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "デュプレライト";
			this.kana = "テユフレライト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 4 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シレンティウム
		// ----------------------------------------------------------------
		SKILL_ID_SILENTIUM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "シレンティウム";
			this.kana = "シレンテイウム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60 + 4 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 15000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サクラメント
		// ----------------------------------------------------------------
		SKILL_ID_SECRAMENT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "サクラメント";
			this.kana = "サクラメント";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 + 20 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// レンジャーメイン
		// ----------------------------------------------------------------
		SKILL_ID_RANGER_MAIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "レンジャーメイン";
			this.kana = "レンシヤアメイン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// カモフラージュ
		// ----------------------------------------------------------------
		SKILL_ID_CAMOUFLAGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "カモフラージュ";
			this.kana = "カモフラアシユ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エイムドボルト
		// ----------------------------------------------------------------
		SKILL_ID_AIMED_BOLT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エイムドボルト";
			this.kana = "エイムトホルト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 28 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (skillLv > 5) ? (5500 - 400 * skillLv) : 4000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (skillLv > 5) ? (1750 - 150 * skillLv) : 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (skillLv > 5) ? (1500 - 100 * skillLv) : 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return (skillLv > 5) ? (750 - 50 * skillLv) : 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アローストーム
		// ----------------------------------------------------------------
		SKILL_ID_ARROW_STORM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アローストーム";
			this.kana = "アロオストオム";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 28 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 1000 + 80 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 3;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000 + 200 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 7000 - 400 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5500 - 500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フィアーブリーズ
		// ----------------------------------------------------------------
		SKILL_ID_FEAR_BLEATH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フィアーブリーズ";
			this.kana = "フイアアフリイス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 5 * skillLv;
			}

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData);
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// トラップ研究
		// ----------------------------------------------------------------
		SKILL_ID_TRAP_KENKYU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "トラップ研究";
			this.kana = "トラツフケンキユウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マゼンタトラップ
		// ----------------------------------------------------------------
		SKILL_ID_MAGENTA_TRAP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マゼンタトラップ";
			this.kana = "マセンタトラツフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// コバルトトラップ
		// ----------------------------------------------------------------
		SKILL_ID_COBALT_TRAP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "コバルトトラップ";
			this.kana = "コハルトトラツフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ヴェルデュールトラップ
		// ----------------------------------------------------------------
		SKILL_ID_VERDURE_TRAP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ヴェルデュールトラップ";
			this.kana = "ウエルテユウルトラツフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// メイズトラップ
		// ----------------------------------------------------------------
		SKILL_ID_MAZE_TRAP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "メイズトラップ";
			this.kana = "メイストラツフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クラスターボム
		// ----------------------------------------------------------------
		SKILL_ID_CLUSTER_BOMB = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "クラスターボム";
			this.kana = "クラスタアホム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 200 + 100 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// デトネイター
		// ----------------------------------------------------------------
		SKILL_ID_DETONATOR = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "デトネイター";
			this.kana = "テトネイタア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ファイアリングトラップ
		// ----------------------------------------------------------------
		SKILL_ID_FIRING_TRAP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ファイアリングトラップ";
			this.kana = "フアイアリンクトラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アイスバウンドトラップ
		// ----------------------------------------------------------------
		SKILL_ID_ICEBOUND_TRAP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アイスバウンドトラップ";
			this.kana = "アイフハウントトラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エレクトリックショッカー
		// ----------------------------------------------------------------
		SKILL_ID_ELECTRIC_SHOCKER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エレクトリックショッカー";
			this.kana = "エレクトリツクシヨツカア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウォーグマスタリー
		// ----------------------------------------------------------------
		SKILL_ID_WUG_MASTERY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ウォーグマスタリー";
			this.kana = "ウオオクマスタリイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウォーグバイト
		// ----------------------------------------------------------------
		SKILL_ID_WUG_BITE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ウォーグバイト";
			this.kana = "ウオオクハイト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 38 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 800 + 200 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 2500 + 500 * skillLv;

				}

				return 2000 + 2000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// トゥースオブウォーグ
		// ----------------------------------------------------------------
		SKILL_ID_TOOTH_OF_WUG = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "トゥースオブウォーグ";
			this.kana = "トウウスオフウオオク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウォーグストライク
		// ----------------------------------------------------------------
		SKILL_ID_WUG_STRIKE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ウォーグストライク";
			this.kana = "ウオオクストライク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 18 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 250 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 鋭敏な嗅覚
		// ----------------------------------------------------------------
		SKILL_ID_EIBINNA_KYUKAKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "鋭敏な嗅覚";
			this.kana = "エイヒンナキユウカク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 50 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 2000 + 1000 * skillLv;

				}

				return 0;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウォーグライダー
		// ----------------------------------------------------------------
		SKILL_ID_WUG_RIDER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ウォーグライダー";
			this.kana = "ウオオクライタア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウォーグダッシュ
		// ----------------------------------------------------------------
		SKILL_ID_WUG_DASH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ウォーグダッシュ";
			this.kana = "ウオオクタツシユ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 4;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 300;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ホワイトインプリズン
		// ----------------------------------------------------------------
		SKILL_ID_WHITE_IN_PRISON = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ホワイトインプリズン";
			this.kana = "ホワイトインフリスン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 45 + 5 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 4500 + 500 * skillLv;

				}

				return 4000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ソウルエクスパンション
		// ----------------------------------------------------------------
		SKILL_ID_SOUL_EXPANSION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ソウルエクスパンション";
			this.kana = "ソウルエクスハンシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_PSYCO;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 400 + 100 * skillLv + charaDataManger.GetCharaInt();

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 2;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フロストミスティ
		// ----------------------------------------------------------------
		SKILL_ID_FROST_MISTY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フロストミスティ";
			this.kana = "フロストミステイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 200 + 100 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 2 + skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1200 - 200 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 200;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ジャックフロスト
		// ----------------------------------------------------------------
		SKILL_ID_JACK_FROST = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ジャックフロスト";
			this.kana = "シヤツクフロスト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 5;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 + 200 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 200;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マーシュオブアビス
		// ----------------------------------------------------------------
		SKILL_ID_MARSH_OF_ABYSS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マーシュオブアビス";
			this.kana = "マアシユオフアヒス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 38 + 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 500 + 500 * skillLv + 500 * Math.max(0, skillLv - 3);

				}

				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// リコグナイズドスペル
		// ----------------------------------------------------------------
		SKILL_ID_RECOGNIZED_SPELL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "リコグナイズドスペル";
			this.kana = "リコクナイストスヘル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return (skillLv == 5) ? 90 : (200 - 20 * skillLv);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -5000 + 35000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シエナエクセクレイト
		// ----------------------------------------------------------------
		SKILL_ID_SIENNA_EXEXRATE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "シエナエクセクレイト";
			this.kana = "シエナエクセクレイト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ラディウス
		// ----------------------------------------------------------------
		SKILL_ID_RADIUS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ラディウス";
			this.kana = "ラテイウス";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ステイシス
		// ----------------------------------------------------------------
		SKILL_ID_STASIS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ステイシス";
			this.kana = "ステイシス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

				}

				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 5000 + 5000 * skillLv;

				}

				return 300000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ドレインライフ
		// ----------------------------------------------------------------
		SKILL_ID_DRAIN_LIFE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ドレインライフ";
			this.kana = "トレインライフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 200 * skillLv + charaDataManger.GetCharaInt();

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クリムゾンロック
		// ----------------------------------------------------------------
		SKILL_ID_CRYMSON_ROCK = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "クリムゾンロック";
			this.kana = "クリムソンロツク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 300 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				// ベースレベル補正がかからない威力
				pow += 1300;

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 7;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 + 200 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ヘルインフェルノ
		// ----------------------------------------------------------------
		SKILL_ID_HELL_INFERNO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ヘルインフェルノ";
			this.kana = "ヘルインフエルノ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_SPECIAL;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 + 200 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// コメット
		// ----------------------------------------------------------------
		SKILL_ID_COMMET = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "コメット";
			this.kana = "コメツト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 400 + 80 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 8500 + 1500 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 120000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// チェーンライトニング
		// ----------------------------------------------------------------
		SKILL_ID_CHAIN_LIGHTNING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "チェーンライトニング";
			this.kana = "チエエンライトニンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 1000 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アースストレイン
		// ----------------------------------------------------------------
		SKILL_ID_EARTH_STRAIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アースストレイン";
			this.kana = "アアスストレイン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 62 + 8 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 2000 + 100 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 2;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 600 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// テトラボルテックス
		// ----------------------------------------------------------------
		SKILL_ID_TETRA_BOLTEX = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "テトラボルテックス";
			this.kana = "テトラホルテツクス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_SPECIAL;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 90 + 30 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return Math.min(9000, 4000 + 1000 * skillLv);
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return Math.max(1000, 6000 - 1000 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サモンファイアーボール
		// ----------------------------------------------------------------
		SKILL_ID_SUMMON_FIRE_BALL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "サモンファイアーボール";
			this.kana = "サモンフアイアアホオル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var powlv = 0;

				// 基本式
				powlv = charaDataManger.GetCharaBaseLv()
						+ charaDataManger.GetCharaJobLv();
				pow = powlv * Math.floor((skillLv + 1) / 2);

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 6000 - 1000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サモンウォーターボール
		// ----------------------------------------------------------------
		SKILL_ID_SUMMON_WATER_BALL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "サモンウォーターボール";
			this.kana = "サモンウオオタアホオル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var powlv = 0;

				// 基本式
				powlv = charaDataManger.GetCharaBaseLv()
						+ charaDataManger.GetCharaJobLv();
				pow = powlv * Math.floor((skillLv + 1) / 2);

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 6000 - 1000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サモンボールライトニング
		// ----------------------------------------------------------------
		SKILL_ID_SUMMON_LIGHTNING_BALL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "サモンボールライトニング";
			this.kana = "サモンホオルライトニンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var powlv = 0;

				// 基本式
				powlv = charaDataManger.GetCharaBaseLv()
						+ charaDataManger.GetCharaJobLv();
				pow = powlv * Math.floor((skillLv + 1) / 2);

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 6000 - 1000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サモンストーン
		// ----------------------------------------------------------------
		SKILL_ID_SUMMON_STONE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "サモンストーン";
			this.kana = "サモンストオン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var powlv = 0;

				// 基本式
				powlv = charaDataManger.GetCharaBaseLv()
						+ charaDataManger.GetCharaJobLv();
				pow = powlv * Math.floor((skillLv + 1) / 2);

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 6000 - 1000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// リリース
		// ----------------------------------------------------------------
		SKILL_ID_RELEASE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "リリース";
			this.kana = "リリイス";
			this.maxLv = 2;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return -14 + 17 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// リーディングスペルブック
		// ----------------------------------------------------------------
		SKILL_ID_READING_SPELLBOOK = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "リーディングスペルブック";
			this.kana = "リイテインクスヘルフツク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 250;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フリージングスペル
		// ----------------------------------------------------------------
		SKILL_ID_FREEZING_SPELL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フリージングスペル";
			this.kana = "フリイシンクスヘル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 斧鍛錬
		// ----------------------------------------------------------------
		SKILL_ID_ONO_SHUREN_MECHANIC = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = (_APPLY_UPDATE_LV200 ? "斧鍛錬" : "斧修練");
			this.kana = "オノシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アックストルネード
		// ----------------------------------------------------------------
		SKILL_ID_AXE_TORNADE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)アックストルネード";
			this.kana = "アツクストルネエト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 6;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 4500 - 500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アックスブーメラン
		// ----------------------------------------------------------------
		SKILL_ID_AXE_BOOMERANG = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アックスブーメラン";
			this.kana = "アツクスフウメラン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 18 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5500 - 500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// パワースイング
		// ----------------------------------------------------------------
		SKILL_ID_POWER_SWING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)パワースイング";
			this.kana = "ハワアスインク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = charaDataManger.GetCharaStr() + charaDataManger.GetCharaDex();

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				// ベースレベル補正がかからない威力
				pow += 300 + 100 * skillLv;

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return Math.max(0, 1000 - 200 * skillLv);
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 火と大地の研究
		// ----------------------------------------------------------------
		SKILL_ID_HITO_DAICHINO_KENKYU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "火と大地の研究";
			this.kana = "ヒトタイチノケンキユウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// FAW シルバースナイパー
		// ----------------------------------------------------------------
		SKILL_ID_FAW_SILVER_SNIPER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "FAW シルバースナイパー";
			this.kana = "エフエエタフリユウシルハアスナイハア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 5 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2250 - 250 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// FAW マジックデコイ
		// ----------------------------------------------------------------
		SKILL_ID_FAW_MAGIC_DECOY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "FAW マジックデコイ";
			this.kana = "エフエエタフリユウマシツクテコイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return (skillLv >= 4) ? (45 + 5 * skillLv) : (35 + 5 * skillLv);
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2250 - 250 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// FAW解除
		// ----------------------------------------------------------------
		SKILL_ID_FAW_KAIZYO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "FAW解除";
			this.kana = "エフエエタフリユウカイシヨ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 魔導ギアライセンス
		// ----------------------------------------------------------------
		SKILL_ID_MADOGEAR_LICENSE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "魔導ギアライセンス";
			this.kana = "マトウキアライセンス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ブーストナックル
		// ----------------------------------------------------------------
		SKILL_ID_BOOST_KNUCKLE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ブーストナックル";
			this.kana = "フウストナツクル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 200 + 100 * skillLv + charaDataManger.GetCharaDex();

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 120);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -500 + 500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// パイルバンカー
		// ----------------------------------------------------------------
		SKILL_ID_PILE_BUNKER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "パイルバンカー";
			this.kana = "ハイルハンカア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 300 + 100 * skillLv + charaDataManger.GetCharaStr();

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000 - 1000 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 7500 - 2500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// バルカンアーム
		// ----------------------------------------------------------------
		SKILL_ID_VULCAN_ARM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "バルカンアーム";
			this.kana = "ハルカンアアム";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 70 * skillLv + charaDataManger.GetCharaDex();

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 120);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -1000 + 1000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フレイムスローワー
		// ----------------------------------------------------------------
		SKILL_ID_FLAME_THROWER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フレイムスローワー";
			this.kana = "フレイムスロオワア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 300 + 300 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 150);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000 - 500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// コールドスローワー
		// ----------------------------------------------------------------
		SKILL_ID_COLD_THROWER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "コールドスローワー";
			this.kana = "コオルトスロオワア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 300 + 300 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 150);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000 - 500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アームズキャノン
		// ----------------------------------------------------------------
		SKILL_ID_ARMS_CANNON = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)アームズキャノン";
			this.kana = "アアムスキヤノン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				switch (charaDataManger.GetMobSize()) {
				case SIZE_ID_SMALL:
					pow = 300 + 400 * skillLv;
					break;
				case SIZE_ID_MEDIUM:
					pow = 300 + 350 * skillLv;
					break;
				case SIZE_ID_LARGE:
					pow = 300 + 300 * skillLv;
					break;
				}

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 120);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return Math.min(2000, 500 + 500 * skillLv);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return Math.max(500, 2000 - 500 * skillLv);
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アクセラレーション
		// ----------------------------------------------------------------
		SKILL_ID_ACCELARATION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アクセラレーション";
			this.kana = "アクセラレエシヨン";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ホバーリング
		// ----------------------------------------------------------------
		SKILL_ID_HOVERING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ホバーリング";
			this.kana = "ホハアリンク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フロントサイドスライド
		// ----------------------------------------------------------------
		SKILL_ID_FRONTSIDE_SLIDE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フロントサイドスライド";
			this.kana = "フロントサイトスライト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// リアサイドスライド
		// ----------------------------------------------------------------
		SKILL_ID_REARSIDE_SLIDE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "リアサイドスライド";
			this.kana = "リアサイトスライト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// メインフレーム改造
		// ----------------------------------------------------------------
		SKILL_ID_MAINFRAME_KAIZO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "メインフレーム改造";
			this.kana = "メインフレエムカイソウ";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シェイプシフト
		// ----------------------------------------------------------------
		SKILL_ID_SHAPE_SHIFT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "シェイプシフト";
			this.kana = "シエイフシフト";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// インフラレッドスキャン
		// ----------------------------------------------------------------
		SKILL_ID_INFRARED_SCAN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "インフラレッドスキャン";
			this.kana = "インフラレツトスキヤン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アナライズ
		// ----------------------------------------------------------------
		SKILL_ID_ANALYZE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アナライズ";
			this.kana = "アナライス";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// セルフディストラクション
		// ----------------------------------------------------------------
		SKILL_ID_SELF_DESTRUCTION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "セルフディストラクション";
			this.kana = "セルフテイストラクシヨン";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostVary = function(skillLv, charaDataManger) {
				return 100;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE:
				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
					return 10000;

				}

				return 1500 + 500 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE:
				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
					return 10000;

				}

				return 3500 - 500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エマージェンシークール
		// ----------------------------------------------------------------
		SKILL_ID_EMERGENCY_COOL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エマージェンシークール";
			this.kana = "エマアシエンシイクウル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マグネティックフィールド
		// ----------------------------------------------------------------
		SKILL_ID_MAGNETIC_FIELD = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マグネティックフィールド";
			this.kana = "マクネテイツクフイイルト";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 25000 - 5000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ニュートラルバリアー
		// ----------------------------------------------------------------
		SKILL_ID_NUTRAL_BARRIER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ニュートラルバリアー";
			this.kana = "ニユウトラルハリアア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 25000 - 5000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ステルスフィールド
		// ----------------------------------------------------------------
		SKILL_ID_STEALTH_FIELD = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ステルスフィールド";
			this.kana = "ステルスフイイルト";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60 + 20 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 25000 - 5000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// リペア
		// ----------------------------------------------------------------
		SKILL_ID_REPEAR = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "リペア";
			this.kana = "リヘア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return (skillLv == 3) ? 20 : (10 + 5 * skillLv);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 100 + 100 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// キャノンスピア
		// ----------------------------------------------------------------
		SKILL_ID_CANNON_SPEAR = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "キャノンスピア";
			this.kana = "キヤノンスヒア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = (50 + charaDataManger.GetCharaStr()) * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// バニシングポイント
		// ----------------------------------------------------------------
		SKILL_ID_BANISHING_POINT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "バニシングポイント";
			this.kana = "ハニシンクホイント";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 5 * Math.floor((skillLv - 1) / 5);
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// トランプル
		// ----------------------------------------------------------------
		SKILL_ID_TRUMPLE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "トランプル";
			this.kana = "トランフル";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 15 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シールドプレス
		// ----------------------------------------------------------------
		SKILL_ID_SHIELD_PRESS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)シールドプレス";
			this.kana = "シイルトフレス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// リフレクトダメージ
		// ----------------------------------------------------------------
		SKILL_ID_REFLECT_DAMAGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "リフレクトダメージ";
			this.kana = "リフレクトタメエシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 20 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 300000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ピンポイントアタック
		// ----------------------------------------------------------------
		SKILL_ID_PINGPOINT_ATTACK = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ピンポイントアタック";
			this.kana = "ヒンホイントアタツク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 100 * skillLv;
				pow += 5 * charaDataManger.GetCharaAgi();

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 120);

				return pow;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return 100;
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フォースオブバンガード
		// ----------------------------------------------------------------
		SKILL_ID_FORCE_OF_BANGUARD = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フォースオブバンガード";
			this.kana = "フオオスオフハンカアト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// レイジバーストアタック
		// ----------------------------------------------------------------
		SKILL_ID_RAGE_BURST_ATTACK = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "レイジバーストアタック";
			this.kana = "レイシハアストアタツク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 150;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シールドスペル
		// ----------------------------------------------------------------
		SKILL_ID_SHIELD_SPELL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "シールドスペル";
			this.kana = "シイルトスヘル";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// イクシードブレイク
		// ----------------------------------------------------------------
		SKILL_ID_EXCEED_BREAK = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "イクシードブレイク";
			this.kana = "イクシイトフレイク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 12 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 4500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData);
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// オーバーブランド
		// ----------------------------------------------------------------
		SKILL_ID_OVER_BLAND = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "オーバーブランド";
			this.kana = "オオハアフラント";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// プレスティージ
		// ----------------------------------------------------------------
		SKILL_ID_PRESTAGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "プレスティージ";
			this.kana = "フレステイイシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 60000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// バンディング
		// ----------------------------------------------------------------
		SKILL_ID_BANDING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "バンディング";
			this.kana = "ハンテインク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 24 + 6 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ムーンスラッシャー
		// ----------------------------------------------------------------
		SKILL_ID_MOON_SLUSHER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ムーンスラッシャー";
			this.kana = "ムウンスラツシヤア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5500 - 500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// レイオブジェネシス
		// ----------------------------------------------------------------
		SKILL_ID_RAY_OF_GENESIS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)レイオブジェネシス";
			this.kana = "レイオフシエネシス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// パイエティ
		// ----------------------------------------------------------------
		SKILL_ID_PIETY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "パイエティ";
			this.kana = "ハイエテイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アースドライブ
		// ----------------------------------------------------------------
		SKILL_ID_EARTH_DRIVE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アースドライブ";
			this.kana = "アアストライフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 44 + 8 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 5;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 8000 - 1000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (仮)ヘスペルスリット
		// ----------------------------------------------------------------
		SKILL_ID_HESPERUS_SLIT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(仮)ヘスペルスリット";
			this.kana = "ヘスヘルスリツト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (仮)インスピレーション
		// ----------------------------------------------------------------
		SKILL_ID_INSPIRATION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "インスピレーション";
			this.kana = "インスヒレエシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 30000 + 6000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ボディペインティング
		// ----------------------------------------------------------------
		SKILL_ID_BODY_PAINTING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ボディペインティング";
			this.kana = "ホテイヘインテインク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5 + 5 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マスカレード-エナベーション
		// ----------------------------------------------------------------
		SKILL_ID_MASKARADE_INOVATION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マスカレード-エナベーション";
			this.kana = "マスカレエトエナヘエシヨン";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マスカレード-グルーミー
		// ----------------------------------------------------------------
		SKILL_ID_MASKARADE_GLOOMY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マスカレード-グルーミー";
			this.kana = "マスカレエトクルウミイ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マスカレード-イグノアランス
		// ----------------------------------------------------------------
		SKILL_ID_MASKARADE_IGNORANCE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マスカレード-イグノアランス";
			this.kana = "マスカレエトイクノアランス";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マスカレード-レイジネス
		// ----------------------------------------------------------------
		SKILL_ID_MASKARADE_RAGENESS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マスカレード-レイジネス";
			this.kana = "マスカレエトレイシネス";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マスカレード-ウィークネス
		// ----------------------------------------------------------------
		SKILL_ID_MASKARADE_WEEKNESS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マスカレード-ウィークネス";
			this.kana = "マスカレエトウイイクネス";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

				}

				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マスカレード-アンラッキー
		// ----------------------------------------------------------------
		SKILL_ID_MASKARADE_UNLUCKY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マスカレード-アンラッキー";
			this.kana = "マスカレエトアンラツキイ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// リプロデュース
		// ----------------------------------------------------------------
		SKILL_ID_REPORDUCE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "リプロデュース";
			this.kana = "リフロテユウス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (仮)オートシャドウスペル
		// ----------------------------------------------------------------
		SKILL_ID_AUTO_SHADOW_SPELL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(仮)オートシャドウスペル";
			this.kana = "オオトシヤトウスヘル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シャドウフォーム
		// ----------------------------------------------------------------
		SKILL_ID_SHADOW_FORM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "シャドウフォーム";
			this.kana = "シヤトウフオオム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 10 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

				}

				return 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 10000 - 1000 * skillLv;

				}

				return 0;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// デッドリーインフェクト
		// ----------------------------------------------------------------
		SKILL_ID_DEADLY_INEFFECT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "デッドリーインフェクト";
			this.kana = "テツトリイインフエクト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 36 + 4 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 5000 + 1000 * skillLv;

				}

				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (仮)インビジビリティ
		// ----------------------------------------------------------------
		SKILL_ID_INVISIBILITY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(仮)インビジビリティ";
			this.kana = "インヒシヒリテイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 10000 + 10000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マンホール
		// ----------------------------------------------------------------
		SKILL_ID_MANHOLE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マンホール";
			this.kana = "マンホオル";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

				}

				return 0;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 1000 + 2000 * skillLv;

				}

				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ディメンションドア
		// ----------------------------------------------------------------
		SKILL_ID_DEMENSION_DOOR = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ディメンションドア";
			this.kana = "テイメンシヨントア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 24 + 6 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ブラッディラスト
		// ----------------------------------------------------------------
		SKILL_ID_BLOODY_LAST = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ブラッディラスト";
			this.kana = "フラツテイラスト";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フェイントボム
		// ----------------------------------------------------------------
		SKILL_ID_FAINT_BOMB = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)フェイントボム";
			this.kana = "フエイントホム";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var ratio = 0;

				ratio = 1 + (skillLv == 1 ? 2 : 3) + Math.floor((skillLv - 1) / 3);

				// 基本式
				pow = ratio * (charaDataManger.GetCharaDex() / 2)
						* (charaDataManger.GetCharaJobLv() / 10);

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 120);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return Math.max(0, 1000 * Math.floor((skillLv - 4) / 3));
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 7000;

				}

				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// カオスパニック
		// ----------------------------------------------------------------
		SKILL_ID_CHAOS_PANIC = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "カオスパニック";
			this.kana = "カオスハニツク";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 24 + 6 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// メイルストーム
		// ----------------------------------------------------------------
		SKILL_ID_MAELSTORM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "メイルストーム";
			this.kana = "メイルストオム";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 45 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 2000 * skillLv;

				}

				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フェイタルメナス
		// ----------------------------------------------------------------
		SKILL_ID_FATAL_MENUS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フェイタルメナス";
			this.kana = "フエイタルメナス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 17 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 100 + 100 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ストリップアクセサリー
		// ----------------------------------------------------------------
		SKILL_ID_STRIP_ACCESSARY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ストリップアクセサリー";
			this.kana = "ストリツフアクセサリイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12 + 3 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

				}

				return 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// トライアングルショット
		// ----------------------------------------------------------------
		SKILL_ID_TRIANGLE_SHOT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "トライアングルショット";
			this.kana = "トライアンクルシヨツト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 18;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 300 + (skillLv - 1) * (charaDataManger.GetCharaAgi() / 2);

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 120);

				return pow;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 3;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500 - 50 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 双龍脚
		// ----------------------------------------------------------------
		SKILL_ID_SORYUKYAKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "双龍脚";
			this.kana = "ソウリユウキヤク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					pow = 50 + 20 * skillLv;
					break;

				default:
					pow = 100 + 40 * skillLv;
					break;

				}

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 天羅地網
		// ----------------------------------------------------------------
		SKILL_ID_TENRACHIMO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "天羅地網";
			this.kana = "テンラチモウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 7 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 3;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 200;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 地雷震
		// ----------------------------------------------------------------
		SKILL_ID_ZIRAISHIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "地雷震";
			this.kana = "シライシン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 32 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 爆気散弾
		// ----------------------------------------------------------------
		SKILL_ID_BAKKISANDAN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "爆気散弾";
			this.kana = "ハクキサンタン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 150;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 10000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 修羅身弾
		// ----------------------------------------------------------------
		SKILL_ID_SHURASHINDAN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)修羅身弾";
			this.kana = "シユラシンタン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 500 + 100 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return Math.max(200, 1200 - 200 * skillLv);
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 大纏崩捶
		// ----------------------------------------------------------------
		SKILL_ID_DAITENHOSUI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)大纏崩捶";
			this.kana = "タイテンホウスイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 100 + 250 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 150);

				return pow;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 號砲
		// ----------------------------------------------------------------
		SKILL_ID_GOHO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "號砲";
			this.kana = "コウホウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostVary = function(skillLv, charaDataManger) {
				return 5 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 + 100 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 羅刹破凰撃(HPSP固定)
		// ----------------------------------------------------------------
		SKILL_ID_RASETSU_HAOGEKI_MAX = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.refId = SKILL_ID_RASETSU_HAOGEKI;
			this.name = "羅刹破凰撃(HPSP固定)";
			this.kana = "ラセツハオウケキコテイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostVary = function(skillLv, charaDataManger) {
				return 10 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 7;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 800 + 200 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 羅刹破凰撃(HPSP変動可)
		// ----------------------------------------------------------------
		SKILL_ID_RASETSU_HAOGEKI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "羅刹破凰撃(HPSP変動可)";
			this.kana = "ラセツハオウケキ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostVary = function(skillLv, charaDataManger) {
				return 10 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 7;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 800 + 200 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 旋風腿
		// ----------------------------------------------------------------
		SKILL_ID_SENPUTAI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "旋風腿";
			this.kana = "センフウタイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = charaDataManger.GetCharaBaseLv() + charaDataManger.GetCharaDex();

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 呪縛陣
		// ----------------------------------------------------------------
		SKILL_ID_ZYUBAKUZIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "呪縛陣";
			this.kana = "シユハクシン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 20 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 10000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 閃電歩
		// ----------------------------------------------------------------
		SKILL_ID_SENDENPO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "閃電歩";
			this.kana = "センテンホ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 90 - 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 潜龍昇天(HPSP+爆裂状態)
		// ----------------------------------------------------------------
		SKILL_ID_SENRYU_SHOTEN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "潜龍昇天(HPSP+爆裂状態)";
			this.kana = "センリユウシヨウテン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 120;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 30000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 獅子吼
		// ----------------------------------------------------------------
		SKILL_ID_SISIKO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "獅子吼";
			this.kana = "シシコウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 300 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 10000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 雷光弾
		// ----------------------------------------------------------------
		SKILL_ID_RAIKODAN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "雷光弾";
			this.kana = "ライコウタン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 200 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				// 武器属性による補正
				if (charaDataManger.GetCharaAttackElement() == ELM_ID_WIND) {
					pow = Math.floor(pow * 125 / 100);
				}

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 点穴 -黙-
		// ----------------------------------------------------------------
		SKILL_ID_TENKETSU_MOKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "点穴 -黙-";
			this.kana = "テンケツモク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 22 - 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 100 * skillLv + charaDataManger.GetCharaDex();

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 点穴 -快-
		// ----------------------------------------------------------------
		SKILL_ID_TENKETSU_KAI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "点穴 -快-";
			this.kana = "テンケツカイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 700 + 300 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 点穴 -球-
		// ----------------------------------------------------------------
		SKILL_ID_TENKETSU_KYU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "点穴 -球-";
			this.kana = "テンケツキユウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 点穴 -反-
		// ----------------------------------------------------------------
		SKILL_ID_TENKETSU_HAN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "点穴 -反-";
			this.kana = "テンケツハン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 点穴 -活-
		// ----------------------------------------------------------------
		SKILL_ID_TENKETSU_KATSU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "点穴 -活-";
			this.kana = "テンケツカツ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 5 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 吸気功
		// ----------------------------------------------------------------
		SKILL_ID_KYUKIKO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "吸気功";
			this.kana = "キユウキコウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 破碎柱
		// ----------------------------------------------------------------
		SKILL_ID_HASAICHU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "破碎柱";
			this.kana = "ハサイチユウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 5500 - 500 * skillLv;

				}

				return 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 2000 + 1000 * skillLv;

				}

				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// レッスン
		// ----------------------------------------------------------------
		SKILL_ID_LESSON = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "レッスン";
			this.kana = "レツスン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 安らぎの子守唄
		// ----------------------------------------------------------------
		SKILL_ID_YASURAGINO_KOMORIUTA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "安らぎの子守唄";
			this.kana = "ヤスラキノコモリウタ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 10000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 地獄の歌
		// ----------------------------------------------------------------
		SKILL_ID_ZIGOKUNO_UTA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "地獄の歌";
			this.kana = "シコクノウタ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 8 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 不確定要素の言語
		// ----------------------------------------------------------------
		SKILL_ID_FUKAKUTEYOSONO_GENGO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "不確定要素の言語";
			this.kana = "フカクテイヨウソノケンコ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// メランコリー
		// ----------------------------------------------------------------
		SKILL_ID_MELANCHOLY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "メランコリー";
			this.kana = "メランコリイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// セイレーンの声
		// ----------------------------------------------------------------
		SKILL_ID_SIRENNO_KOE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "セイレーンの声";
			this.kana = "セイレエンノコエ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 8 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 循環する自然の音
		// ----------------------------------------------------------------
		SKILL_ID_ZYUNKANSURU_SIZENNO_OTO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "循環する自然の音";
			this.kana = "シユンカンスルシセンノオト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 38 + 4 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 生死の境で
		// ----------------------------------------------------------------
		SKILL_ID_SEISHINO_SAKAIDE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "生死の境で";
			this.kana = "セイシノサカイテ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 47 + 3 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 振動残響
		// ----------------------------------------------------------------
		SKILL_ID_SHINDOZANKYO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "振動残響";
			this.kana = "シントウサンキヨウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 24 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 + 100 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 200;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ドミニオンインパルス
		// ----------------------------------------------------------------
		SKILL_ID_DOMINION_IMPULSE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ドミニオンインパルス";
			this.kana = "トミニオンインハルス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// メタリックサウンド
		// ----------------------------------------------------------------
		SKILL_ID_METALIC_SOUND = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)メタリックサウンド";
			this.kana = "メタリツクサウント";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 120 * skillLv;

				// 「ミンストレル・ワンダラー レッスン」の習得レベルによる補正
				pow += 60 * charaDataManger.UsedSkillSearch(SKILL_ID_LESSON);

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				// 「モンスター状態異常 睡眠」による補正
				if (charaDataManger.GetMobDebuf(MOB_CONF_DEBUF_ID_SUIMIN)) {
					pow = Math.floor(pow * 150 / 100);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 1 + Math.floor((skillLv + 1) / 2);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return Math.min(3000, 500 + 500 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 200;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シビアレインストーム
		// ----------------------------------------------------------------
		SKILL_ID_SEVERE_RAINSTORM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)シビアレインストーム";
			this.kana = "シヒアレインストオム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = (charaDataManger.GetCharaAgi() + charaDataManger.GetCharaDex())
						* skillLv / 5;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 8 + 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 + 500 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 風車に向かって突撃
		// ----------------------------------------------------------------
		SKILL_ID_FUSHANIMUKATTE_TOTSUGEKI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "風車に向かって突撃";
			this.kana = "フウシヤニムカツテトツケキ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 76 + 6 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エコーの歌
		// ----------------------------------------------------------------
		SKILL_ID_ECHONO_UTA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エコーの歌";
			this.kana = "エコオノウタ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 3 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ハーモナイズ
		// ----------------------------------------------------------------
		SKILL_ID_HARMONIZE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ハーモナイズ";
			this.kana = "ハアモナイス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 65 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 月明かりのセレナーデ
		// ----------------------------------------------------------------
		SKILL_ID_TSUKIAKARINO_SERENADE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "月明かりのセレナーデ";
			this.kana = "ツキアカリノセレナアテ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 72 + 12 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 恋人たちの為のシンフォニー
		// ----------------------------------------------------------------
		SKILL_ID_KOIBITOTACHINO_TAMENO_SYMPHONY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "恋人たちの為のシンフォニー";
			this.kana = "コイヒトタチノタメノシンフオニイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 51 + 9 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スイングダンス
		// ----------------------------------------------------------------
		SKILL_ID_SWING_DANCE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スイングダンス";
			this.kana = "スインクタンス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 + 16 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// レーラズの露
		// ----------------------------------------------------------------
		SKILL_ID_LERAORNO_TSUYU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "レーラズの露";
			this.kana = "レエラスノツユ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 110 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ビヨンドオブウォークライ
		// ----------------------------------------------------------------
		SKILL_ID_BEYOND_OF_WARCRY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ビヨンドオブウォークライ";
			this.kana = "ヒヨントオフウオオクライ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 110 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マナの歌
		// ----------------------------------------------------------------
		SKILL_ID_MANANO_UTA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マナの歌";
			this.kana = "マナノウタ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 110 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// メロディーオブシンク
		// ----------------------------------------------------------------
		SKILL_ID_MELODY_OF_THINK = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "メロディーオブシンク";
			this.kana = "メロテイイオフシンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 110 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ダンスウィズウォーグ
		// ----------------------------------------------------------------
		SKILL_ID_DANCE_WITH_WUG = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ダンスウィズウォーグ";
			this.kana = "タンスウイスウオオク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100 + 20 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フライデーナイトフィーバー
		// ----------------------------------------------------------------
		SKILL_ID_FRIDAY_NIGHT_FEVER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フライデーナイトフィーバー";
			this.kana = "フライテエナイトフイイハア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 140 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サウンドオブディストラクション
		// ----------------------------------------------------------------
		SKILL_ID_SOUND_OF_DESTRUCTION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "サウンドオブディストラクション";
			this.kana = "サウントオフテイストラクシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エンドレスハミングボイス
		// ----------------------------------------------------------------
		SKILL_ID_ENDLESS_HUMMING_VOICE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エンドレスハミングボイス";
			this.kana = "エントレスハミンクホイス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 100000 + 10000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (×)グレートエコー(未検証)
		// ----------------------------------------------------------------
		SKILL_ID_GREAT_ECHO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)グレートエコー(未検証)";
			this.kana = "クレエトエコオ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1800 + 200 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 10000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ファイアーウォーク
		// ----------------------------------------------------------------
		SKILL_ID_FIRE_WALK = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ファイアーウォーク";
			this.kana = "フアイアアウオオク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 26 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var seirei = 0;

				// 基本式
				pow = 60 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				// 「ソーサラー 精霊スキル」の効果
				seirei = charaDataManger.UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL);
				if (seirei == 4) {
					pow += Math.floor(charaDataManger.GetCharaJobLv() / 2);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エレクトリックウォーク
		// ----------------------------------------------------------------
		SKILL_ID_ELECTRIC_WALK = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エレクトリックウォーク";
			this.kana = "エレクトリツクウオオク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 26 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var seirei = 0;

				// 基本式
				pow = 60 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				// 「ソーサラー 精霊スキル」の効果
				seirei = charaDataManger.UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL);
				if (seirei == 22) {
					pow += Math.floor(charaDataManger.GetCharaJobLv() / 2);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スペルフィスト
		// ----------------------------------------------------------------
		SKILL_ID_SPELL_FIST = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)スペルフィスト";
			this.kana = "スヘルフイスト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// バキュームエクストリーム
		// ----------------------------------------------------------------
		SKILL_ID_VACUUM_EXTREME = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "バキュームエクストリーム";
			this.kana = "ハキユウムエクストリイム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 26 + 8 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サイキックウェーブ
		// ----------------------------------------------------------------
		SKILL_ID_PSYCHIC_WAVE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "サイキックウェーブ";
			this.kana = "サイキツクウエエフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_SPECIAL;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 8 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var seirei = 0;

				// 基本式
				pow = 70 * skillLv + 3 * charaDataManger.GetCharaInt();

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 2 + skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2750 + 1250 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2250 - 250 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クラウドキル
		// ----------------------------------------------------------------
		SKILL_ID_CLOUD_KILL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "クラウドキル";
			this.kana = "クラウトキル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_POISON;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 8 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var seirei = 0;

				// 基本式
				pow = 40 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				// 「ソーサラー 精霊スキル」の効果
				seirei = charaDataManger.UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL);
				if (seirei == 31) {
					pow += Math.floor(charaDataManger.GetCharaJobLv() / 1);
				}

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 12 + 4 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 + 200 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1750 - 250 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeSkillObject = function(skillLv, charaDataManger) {
				return 6000 + 2000 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ポイズンバスター
		// ----------------------------------------------------------------
		SKILL_ID_POISON_BUSTER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ポイズンバスター";
			this.kana = "ホイスンハスタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_POISON;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 20 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var seirei = 0;

				// 基本式
				pow = 1000 + 300 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 120);

				// 「ソーサラー 精霊スキル」の効果
				seirei = charaDataManger.UsedSkillSearch(SKILL_ID_SERE_SUPPORT_SKILL);
				if (seirei == 31) {
					pow += Math.floor(charaDataManger.GetCharaJobLv() * 5);
				}

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -750 + 1250 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1750 - 250 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ストライキング
		// ----------------------------------------------------------------
		SKILL_ID_STRIKING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ストライキング";
			this.kana = "ストライキンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 45 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アースグレイヴ
		// ----------------------------------------------------------------
		SKILL_ID_EARTH_GRAVE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アースグレイヴ";
			this.kana = "アアスクレイウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 54 + 8 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 3;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000 + 200 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2000 - 200 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ダイヤモンドダスト
		// ----------------------------------------------------------------
		SKILL_ID_DIAMOND_DUST = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ダイヤモンドダスト";
			this.kana = "タイヤモントタスト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 44 + 6 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 5;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000 + 200 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2000 - 200 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウォーマー
		// ----------------------------------------------------------------
		SKILL_ID_WARMER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ウォーマー";
			this.kana = "ウオオマア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 28 + 12 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000 + 200 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2000 - 200 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 30000 + 5000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ヴェラチュールスピアー
		// ----------------------------------------------------------------
		SKILL_ID_VERATURE_SPEAR = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)ヴェラチュールスピアー";
			this.kana = "ウエラチユウルスヒアア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL
					| CSkillData.TYPE_DIVHIT_FORMULA;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 48 + 7 * skillLv + (skillLv >= 8 ? 10 : 0);
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return Math.min(3000, 2000 + 200 * skillLv);
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return Math.max(1000, 2000 - 200 * skillLv);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アルージョ
		// ----------------------------------------------------------------
		SKILL_ID_ARRULLO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アルージョ";
			this.kana = "アルウシヨ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 4000 + 1000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サモンアグニ
		// ----------------------------------------------------------------
		SKILL_ID_SUMMON_AGNI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "サモンアグニ";
			this.kana = "サモンアクニ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 50 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 4000 - 1000 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 30000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サモンアクア
		// ----------------------------------------------------------------
		SKILL_ID_SUMMON_AQUA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "サモンアクア";
			this.kana = "サモンアクア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 50 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 4000 - 1000 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 30000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サモンベントス
		// ----------------------------------------------------------------
		SKILL_ID_SUMMON_VENTOS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "サモンベントス";
			this.kana = "サモンヘントス";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 50 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 4000 - 1000 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 30000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サモンテラ
		// ----------------------------------------------------------------
		SKILL_ID_SUMMON_TERA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "サモンテラ";
			this.kana = "サモンテラ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 50 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 4000 - 1000 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 30000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エレメンタルコントロール
		// ----------------------------------------------------------------
		SKILL_ID_ELEMENTAL_CONTROL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エレメンタルコントロール";
			this.kana = "エレメンタルコントロオル";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000 - 2000 * Math.floor((skillLv + 1) / 2);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 10000 - 5000 * Math.floor((skillLv + 1) / 2);
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エレメンタルアクション
		// ----------------------------------------------------------------
		SKILL_ID_ELEMENTAL_ACTION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エレメンタルアクション";
			this.kana = "エレメンタルアクシヨン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エレメンタルアナライシス
		// ----------------------------------------------------------------
		SKILL_ID_ELEMENTAL_ANALYSIS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エレメンタルアナライシス";
			this.kana = "エレメンタルアナライシス";
			this.maxLv = 2;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エレメンタルシンパシー
		// ----------------------------------------------------------------
		SKILL_ID_ELEMENTAL_SYMPASY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エレメンタルシンパシー";
			this.kana = "エレメンタルシンハシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エレメンタルキュアー
		// ----------------------------------------------------------------
		SKILL_ID_ELEMENTAL_CURE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エレメンタルキュアー";
			this.kana = "エレメンタルキユアア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostVary = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ファイアーインシグニア
		// ----------------------------------------------------------------
		SKILL_ID_FIRE_INSIGNIA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ファイアーインシグニア";
			this.kana = "フアイアアインシクニア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウォーターインシグニア
		// ----------------------------------------------------------------
		SKILL_ID_WATER_INSIGNIA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ウォーターインシグニア";
			this.kana = "ウオオタアインシクニア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウィンドインシグニア
		// ----------------------------------------------------------------
		SKILL_ID_WIND_INSIGNIA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ウィンドインシグニア";
			this.kana = "ウイントインシクニア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アースインシグニア
		// ----------------------------------------------------------------
		SKILL_ID_EARTH_INSIGNIA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アースインシグニア";
			this.kana = "アアスインシクニア";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// パイロテクニック
		// ----------------------------------------------------------------
		SKILL_ID_PILO_TECHNIC = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "パイロテクニック";
			this.kana = "ハイロテクニツク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サークルオブファイアー
		// ----------------------------------------------------------------
		SKILL_ID_CIRCLE_OF_FIRE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "サークルオブファイアー";
			this.kana = "サアクルオフフアイアア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ファイアーアロー
		// ----------------------------------------------------------------
		SKILL_ID_FIRE_ARROW = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ファイアーアロー";
			this.kana = "フアイアアアロオ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ヒーター
		// ----------------------------------------------------------------
		SKILL_ID_HEATER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ヒーター";
			this.kana = "ヒイタア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ファイアークローク
		// ----------------------------------------------------------------
		SKILL_ID_FIRE_CLOAK = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ファイアークローク";
			this.kana = "フアイアアクロオク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ファイアーボム
		// ----------------------------------------------------------------
		SKILL_ID_FIRE_BOMB = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ファイアーボム";
			this.kana = "フアイアアホム";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// トロピック
		// ----------------------------------------------------------------
		SKILL_ID_TOROPIC = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "トロピック";
			this.kana = "トロヒツク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ファイアーマントル
		// ----------------------------------------------------------------
		SKILL_ID_FIRE_MANTLE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ファイアーマントル";
			this.kana = "フアイアアマントル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ファイアーウェーブ
		// ----------------------------------------------------------------
		SKILL_ID_FIRE_WAVE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ファイアーウェーブ";
			this.kana = "フアイアアウエエフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アクアプレイ
		// ----------------------------------------------------------------
		SKILL_ID_AQUA_PLAY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アクアプレイ";
			this.kana = "アクアフレイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウォータースクリーン
		// ----------------------------------------------------------------
		SKILL_ID_WATER_SCREEN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ウォータースクリーン";
			this.kana = "ウオオタアスクリイン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アイスニードル
		// ----------------------------------------------------------------
		SKILL_ID_ICE_NEEDLE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アイスニードル";
			this.kana = "アイスニイトル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クーラー
		// ----------------------------------------------------------------
		SKILL_ID_COOLER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "クーラー";
			this.kana = "クウラア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウォータードロップ
		// ----------------------------------------------------------------
		SKILL_ID_WATER_DROP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ウォータードロップ";
			this.kana = "ウオオタアトロツフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウォータースクリュー
		// ----------------------------------------------------------------
		SKILL_ID_WATER_SCREW = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ウォータースクリュー";
			this.kana = "ウオオタアスクリユウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// チリエア
		// ----------------------------------------------------------------
		SKILL_ID_CHILLY_AIR = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "チリエア";
			this.kana = "チリエア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウォーターバリア
		// ----------------------------------------------------------------
		SKILL_ID_WATER_BARRIER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ウォーターバリア";
			this.kana = "ウオオタアハリア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// タイダルウェポン
		// ----------------------------------------------------------------
		SKILL_ID_TAIDAL_WEAPON = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "タイダルウェポン";
			this.kana = "タイタルウエホン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ガスト
		// ----------------------------------------------------------------
		SKILL_ID_GAST = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ガスト";
			this.kana = "カスト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウィンドステップ
		// ----------------------------------------------------------------
		SKILL_ID_WIND_STEP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ウィンドステップ";
			this.kana = "ウイントステツフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウィンドスラッシュ
		// ----------------------------------------------------------------
		SKILL_ID_WIND_SLASH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ウィンドスラッシュ";
			this.kana = "ウイントスラツシユ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ブラスト
		// ----------------------------------------------------------------
		SKILL_ID_BLAST = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ブラスト";
			this.kana = "フラスト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウィンドカーテン
		// ----------------------------------------------------------------
		SKILL_ID_WIND_CURTAIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ウィンドカーテン";
			this.kana = "ウイントカアテン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ハリケーンレイジ
		// ----------------------------------------------------------------
		SKILL_ID_HURRICANE_RAGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ハリケーンレイジ";
			this.kana = "ハリケエンレイシ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ワイルドストーム
		// ----------------------------------------------------------------
		SKILL_ID_WILD_STORM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ワイルドストーム";
			this.kana = "ワイルトストオム";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ゼファー
		// ----------------------------------------------------------------
		SKILL_ID_XEPHER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ゼファー";
			this.kana = "セフアア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// タイフーンミサイル
		// ----------------------------------------------------------------
		SKILL_ID_TAYPHOON_MISSILE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "タイフーンミサイル";
			this.kana = "タイフウンミサイル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ペトロロジー
		// ----------------------------------------------------------------
		SKILL_ID_PETROLOGY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ペトロロジー";
			this.kana = "ヘトロロシイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ソリッドスキン
		// ----------------------------------------------------------------
		SKILL_ID_SOLID_SKIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ソリッドスキン";
			this.kana = "ソリツトスキン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ストーンハンマー
		// ----------------------------------------------------------------
		SKILL_ID_STONE_HUMMER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ストーンハンマー";
			this.kana = "ストオンハンマア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// カーズドソイル
		// ----------------------------------------------------------------
		SKILL_ID_CURSED_SOIL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "カーズドソイル";
			this.kana = "カアストソイル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ストーンシールド
		// ----------------------------------------------------------------
		SKILL_ID_STONE_SHIELD = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ストーンシールド";
			this.kana = "ストオンシイルト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ロッククラッシャー
		// ----------------------------------------------------------------
		SKILL_ID_ROCK_CRUSHER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ロッククラッシャー";
			this.kana = "ロツククラツシヤア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アップヒーバル
		// ----------------------------------------------------------------
		SKILL_ID_UP_HIEBAL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アップヒーバル";
			this.kana = "アツフヒイハル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// パワーオブガイア
		// ----------------------------------------------------------------
		SKILL_ID_POWER_OF_GAIA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "パワーオブガイア";
			this.kana = "ハワアオフカイア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ストーンレイン
		// ----------------------------------------------------------------
		SKILL_ID_STONE_RAIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ストーンレイン";
			this.kana = "ストオンレイン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 剣鍛錬
		// ----------------------------------------------------------------
		SKILL_ID_KEN_SHUREN_GENETIC = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = (_APPLY_UPDATE_LV200 ? "剣鍛錬" : "剣修練");
			this.kana = "ケンシユウレンシエネテイツク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// カート改造
		// ----------------------------------------------------------------
		SKILL_ID_CART_KAIZO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "カート改造";
			this.kana = "カアトカイソウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// カートトルネード
		// ----------------------------------------------------------------
		SKILL_ID_CART_TORNADO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)カートトルネード";
			this.kana = "カアトトルネエト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return (skillLv >= 5) ? 200 : (1000 - 500 * Math.floor((skillLv - 1) / 2));
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// カートキャノン
		// ----------------------------------------------------------------
		SKILL_ID_CART_CANNON = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "カートキャノン";
			this.kana = "カアトキヤノン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;
				var powCart = 0;
				var powInt = 0;

				// 基本式
				pow = 60 * skillLv;
				powCart = 50 * charaDataManger.UsedSkillSearch(SKILL_ID_CART_KAIZO);
				powInt = charaDataManger.GetCharaInt() / 40;
				pow += Math.floor(powCard * powInt);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 改造カートブースト
		// ----------------------------------------------------------------
		SKILL_ID_CART_BOOST_GENETIC = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = (_APPLY_UPDATE_LV200 ? "改造カートブースト" : "カートブースト");
			this.kana = "カアトフウストシエネテイツク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 4 + 16 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// チェンジマテリアル
		// ----------------------------------------------------------------
		SKILL_ID_CHANGE_MATERIAL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "チェンジマテリアル";
			this.kana = "チエンシマテリアル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スリングアイテム
		// ----------------------------------------------------------------
		SKILL_ID_SLING_ITEM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スリングアイテム";
			this.kana = "スリンクアイテム";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 4;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 7000;

				}

				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スペシャルファーマシー
		// ----------------------------------------------------------------
		SKILL_ID_SPECIAL_PHARMACY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スペシャルファーマシー";
			this.kana = "スヘシヤルフアアマシイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ミックスクッキング
		// ----------------------------------------------------------------
		SKILL_ID_MIX_COOKING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ミックスクッキング";
			this.kana = "ミツクスクツキンク";
			this.maxLv = 2;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return -30 + 35 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 爆弾製造
		// ----------------------------------------------------------------
		SKILL_ID_BAKUDAN_SEIZO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "爆弾製造";
			this.kana = "ハクタンセイソウ";
			this.maxLv = 2;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return -30 + 35 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ソーントラップ
		// ----------------------------------------------------------------
		SKILL_ID_THORN_TRAP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ソーントラップ";
			this.kana = "ソオントラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 18 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeSkillTiming = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ソーンウォール
		// ----------------------------------------------------------------
		SKILL_ID_THORN_WALL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ソーンウォール";
			this.kana = "ソオンウオオル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クレイジーウィード
		// ----------------------------------------------------------------
		SKILL_ID_CRAZY_WEED = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "クレイジーウィード";
			this.kana = "クレイシイウイイト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 500 + 100 * skillLv;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 + 500 * Math.floor((skillLv - 1) / 2);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ブラッドサッカー
		// ----------------------------------------------------------------
		SKILL_ID_BLOOD_SUCKER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ブラッドサッカー";
			this.kana = "フタツトサツカア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeSkillTiming = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 4500 + 500 * skillLv;

				}

				return 0;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ヘルズプラント
		// ----------------------------------------------------------------
		SKILL_ID_HELLS_PLANT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ヘルズプラント";
			this.kana = "ヘルスフラント";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_MAGIC; // なぜか魔法フラグ
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ハウリングオブマンドラゴラ
		// ----------------------------------------------------------------
		SKILL_ID_HOWLING_OF_MANDRAGORA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ハウリングオブマンドラゴラ";
			this.kana = "ハウリンクオフマントラコラ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 12000 - 2000 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500 * Math.floor(skillLv / 2);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -4000 + 4000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スポアエクスプロージョン
		// ----------------------------------------------------------------
		SKILL_ID_SPORE_EXPLOSION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スポアエクスプロージョン";
			this.kana = "スホアエクスフロオシヨン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// デモニックファイアー
		// ----------------------------------------------------------------
		SKILL_ID_DEMONIC_FIRE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "デモニックファイアー";
			this.kana = "テモニツクフアイア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 200 * skillLv;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 4 + skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeSkillObject = function(skillLv, charaDataManger) {
				return 2 * (4 + skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (仮)ファイアーエクスパンション(Lv5)
		// ----------------------------------------------------------------
		SKILL_ID_FIRE_EXPANSION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ファイアーエクスパンション(Lv5)";
			this.kana = "フアイアエクスハンシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 魔導ギア
		// ----------------------------------------------------------------
		SKILL_ID_MADOGEAR = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "魔導ギア";
			this.kana = "マトウキア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// セルフディストラクション(HPSP固定)
		// ----------------------------------------------------------------
		SKILL_ID_SELF_DESTRUCTION_MAX = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.refId = SKILL_ID_SELF_DESTRUCTION;
			this.name = "セルフディストラクション(HPSP固定)";
			this.kana = "セルフテイストラクシヨンコテイ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostVary = function(skillLv, charaDataManger) {
				return 100;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE:
				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
					return 10000;

				}

				return 1500 + 500 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE:
				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE:
				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO:
					return 10000;

				}

				return 3500 - 500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// デュプレライト(物理)
		// ----------------------------------------------------------------
		SKILL_ID_GRAHAM_LIGHT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "デュプレライト(物理)";
			this.kana = "テユフレライトフツリ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// デュプレライト(魔法)
		// ----------------------------------------------------------------
		SKILL_ID_MIRIAM_LIGHT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "デュプレライト(魔法)";
			this.kana = "テユフレライトマホウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// AS用設定魔法
		// ----------------------------------------------------------------
		SKILL_ID_MAGIC_SETTING_FOR_AUTO_SPELL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "AS用設定魔法";
			this.kana = "オウトスヘルヨウセツテイマホウ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シールドスペル(ATK+)
		// ----------------------------------------------------------------
		SKILL_ID_SHIELD_SPELL_ATK_PLUS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "シールドスペル(ATK+)";
			this.kana = "シイルトスヘルアタツクフラス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シールドスペル(DEF+)
		// ----------------------------------------------------------------
		SKILL_ID_SHIELD_SPELL_DEF_PLUS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "シールドスペル(DEF+)";
			this.kana = "シイルトスヘルテフフラス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ディフェンダーの習得Lv(プレスティージ用)
		// ----------------------------------------------------------------
		SKILL_ID_SKILL_LV_DEFENDER_FOR_PRESTAGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ディフェンダーの習得Lv(プレスティージ用)";
			this.kana = "テイフエンタアノシユウトクレヘル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ASS用設定魔法
		// ----------------------------------------------------------------
		SKILL_ID_MAGIC_SETTING_FOR_AUTO_SHADOW_SPELL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ASS用設定魔法";
			this.kana = "オウトシヤトウスヘルヨウセツテイマホウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 全気注入
		// ----------------------------------------------------------------
		SKILL_ID_ZENKI_CHUNYU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "全気注入";
			this.kana = "センキチユウニユウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// セージの魂(魔法の習得Lv)
		// ----------------------------------------------------------------
		SKILL_ID_SAGENO_TAMASHI_MAHONO_SHUTOKU_LEVEL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "セージの魂(魔法の習得Lv)";
			this.kana = "セエシノタマシイマホウノシユウトクレヘル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ハルシネーション効果後のASPD減
		// ----------------------------------------------------------------
		SKILL_ID_HALLUCINATION_WALKGONO_ASPD_GENSHO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ハルシネーション効果後のASPD減";
			this.kana = "ハルシネエシヨンコウカコノアタツクスヒイトケン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 自動狼
		// ----------------------------------------------------------------
		SKILL_ID_AUTO_WUG = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "自動狼";
			this.kana = "シトウオオカミ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (特殊)EDP毒部分を消す[通常はoff]
		// ----------------------------------------------------------------
		SKILL_ID_CANCEL_EDP_POISON_ATTACK = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(特殊)EDP毒部分を消す[通常はoff]";
			this.kana = "エンチヤントテツトリイホイスントクフフンヲケス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シビアレインストーム(特殊)
		// ----------------------------------------------------------------
		SKILL_ID_SEVERE_RAINSTORM_EX = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.refId = SKILL_ID_SEVERE_RAINSTORM;
			this.name = "(×)シビアレインストーム(特殊)";
			this.kana = "シヒアレインストオムトクシユ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 + 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = (charaDataManger.GetCharaAgi() + charaDataManger.GetCharaDex())
						* skillLv / 5;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 8 + 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 + 500 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ロイヤルガードの人数(バンディング用)
		// ----------------------------------------------------------------
		SKILL_ID_COUNT_OF_RG_FOR_BANDING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ロイヤルガードの人数(バンディング用)";
			this.kana = "ロイヤルカアトノニンスウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ダブルキャスティング
		// ----------------------------------------------------------------
		SKILL_ID_DOUBLE_CASTING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ダブルキャスティング";
			this.kana = "タフルキヤステインク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

			this.CastTimeForce = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シールドスペル(反射)
		// ----------------------------------------------------------------
		SKILL_ID_SHIELD_SPELL_REFLECT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "シールドスペル(反射)";
			this.kana = "シイルトスヘルハンシヤ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マナリチャージ
		// ----------------------------------------------------------------
		SKILL_ID_MANA_RECHARGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マナリチャージ";
			this.kana = "マナリチヤアシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シールドスペルLv1(物理)
		// ----------------------------------------------------------------
		SKILL_ID_SHIELD_SPELL_LV_1 = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "シールドスペルLv1(物理)";
			this.kana = "シイルトスヘルレヘルイチフツリ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シールドスペルLv2(魔法)
		// ----------------------------------------------------------------
		SKILL_ID_SHIELD_SPELL_LV_2 = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "シールドスペルLv2(魔法)";
			this.kana = "シイルトスヘルレヘルニマホウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 致命的な傷
		// ----------------------------------------------------------------
		SKILL_ID_CHIMEITEKINA_KIZU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "致命的な傷";
			this.kana = "チメイテキナキス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アイアンネイル用ATK+
		// ----------------------------------------------------------------
		SKILL_ID_ATK_FOR_IRON_NAIL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アイアンネイル用ATK+";
			this.kana = "アイアンネイルヨウアタツクフラス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ヘルジャッジメント
		// ----------------------------------------------------------------
		SKILL_ID_HELL_JUDGEMENT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ヘルジャッジメント";
			this.kana = "ヘルシヤツシメント";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 闇雲
		// ----------------------------------------------------------------
		SKILL_ID_YAMIKUMO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "闇雲";
			this.kana = "ヤミクモ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 右手鍛錬
		// ----------------------------------------------------------------
		SKILL_ID_MIGITE_TANREN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "右手鍛錬";
			this.kana = "ミキテタンレン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 左手鍛錬
		// ----------------------------------------------------------------
		SKILL_ID_HIDARITE_TANREN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "左手鍛錬";
			this.kana = "ヒタリテタンレン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 十文字斬り
		// ----------------------------------------------------------------
		SKILL_ID_ZYUMONZIGIRI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)十文字斬り";
			this.kana = "シユウモンシキリ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 6 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 200 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 120);

				return pow;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return Math.max(600, 6100 - 1100 * skillLv);
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 黄泉返し
		// ----------------------------------------------------------------
		SKILL_ID_YOMIGAESHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "黄泉返し";
			this.kana = "ヨミカエシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 55 - 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 爆裂苦無
		// ----------------------------------------------------------------
		SKILL_ID_BAKURETSU_KUNAI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)爆裂苦無";
			this.kana = "ハクレツクナイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = (50 + Math.floor(charaDataManger.GetCharaDex() / 4)) * skillLv;
				pow *= 0.4 * charaDataManger.UsedSkillSearch(SKILL_ID_TOKAKU_SHUREN);

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 120);

				// ベースレベル補正がかからない威力
				pow += 10 * charaDataManger.GetCharaJobLv();

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -800 + 800 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 八方苦無
		// ----------------------------------------------------------------
		SKILL_ID_HAPPO_KUNAI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "八方苦無";
			this.kana = "ハツホウクナイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 300 + 60 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 風魔手裏剣 -乱華-
		// ----------------------------------------------------------------
		SKILL_ID_FUMASHURIKEN_RANKA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "風魔手裏剣 -乱華-";
			this.kana = "フウマシユリケンランカ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 5;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return Math.max(1200, 2200 - 200 * skillLv);
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return Math.min(1800, 800 + 200 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 撒菱
		// ----------------------------------------------------------------
		SKILL_ID_MAKIBISHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "撒菱";
			this.kana = "マキヒシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 6 + 3 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (仮)無茶投げ
		// ----------------------------------------------------------------
		SKILL_ID_MUCHANAGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(仮)無茶投げ";
			this.kana = "ムチヤナケ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 10000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 明鏡止水
		// ----------------------------------------------------------------
		SKILL_ID_MEIKYO_SHISUI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "明鏡止水";
			this.kana = "メイキヨウシスイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2500;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 300000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 幻術-影武者-
		// ----------------------------------------------------------------
		SKILL_ID_GENZYUTSU_KAGEMUSHA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "幻術-影武者-";
			this.kana = "ケンシユツカケムシヤ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 36 + 4 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 135000 - 15000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 幻術-驚愕-
		// ----------------------------------------------------------------
		SKILL_ID_GENZYUTSU_KYOGAKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "幻術-驚愕-";
			this.kana = "ケンシユツキヨウカク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 36 + 4 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 4500 + 500 * skillLv;

				}

				return (7000 - 1000 * skillLv);
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 幻術-呪殺-
		// ----------------------------------------------------------------
		SKILL_ID_GENZYUTSU_ZYUSATSU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "幻術-呪殺-";
			this.kana = "ケンシユツシユサツ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 36 + 4 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 7000 - 1000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 幻術-幻惑-
		// ----------------------------------------------------------------
		SKILL_ID_GENZYUTSU_GENWAKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "幻術-幻惑-";
			this.kana = "ケンシユツケンワク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 36 + 4 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 7000 - 1000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 十六夜
		// ----------------------------------------------------------------
		SKILL_ID_IZAYOI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "十六夜";
			this.kana = "イサヨイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 150;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000 + 1000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 火符：炎天
		// ----------------------------------------------------------------
		SKILL_ID_HIFU_ENTEN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)火符：炎天";
			this.kana = "ヒフエンテン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 氷符：吹雪
		// ----------------------------------------------------------------
		SKILL_ID_HYOFU_FUBUKI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)氷符：吹雪";
			this.kana = "ヒヨウフフフキ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 風符：青嵐
		// ----------------------------------------------------------------
		SKILL_ID_FUFU_SEIRAN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)風符：青嵐";
			this.kana = "フウフセイラン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 土符：剛塊
		// ----------------------------------------------------------------
		SKILL_ID_DOFU_GOKAI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)土符：剛塊";
			this.kana = "トフコウカイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 術式-解放-
		// ----------------------------------------------------------------
		SKILL_ID_ZYUTSUSHIKI_KAIHO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "術式-解放-";
			this.kana = "シユツシキカイホウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_SPECIAL;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 200 * charaDataManger.UsedSkillSearch(SKILL_ID_FU_COUNT_OF_FU);

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 術式-展開-
		// ----------------------------------------------------------------
		SKILL_ID_ZYUTSUSHIKI_TENKAI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "術式-展開-";
			this.kana = "シユツシキテンカイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 幻術-影踏み-
		// ----------------------------------------------------------------
		SKILL_ID_GENZYUTSU_KAGEFUMI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "幻術-影踏み-";
			this.kana = "ケンシユツカケフミ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 5 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 幻術-虚無の影-
		// ----------------------------------------------------------------
		SKILL_ID_GENZYUTSU_KYOMUNOKAGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "幻術-虚無の影-";
			this.kana = "ケンシユツキヨムノカケ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 幻術-分身-
		// ----------------------------------------------------------------
		SKILL_ID_GENZYUTSU_BUNSHIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)幻術-分身-";
			this.kana = "ケンシユツフンシン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 175000 - 25000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 幻術-残月-
		// ----------------------------------------------------------------
		SKILL_ID_GENZYUTSU_ZANGETSU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "幻術-残月-";
			this.kana = "ケンシユツサンケツ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 30000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 幻術-紅月-
		// ----------------------------------------------------------------
		SKILL_ID_GENZYUTSU_KOUGETSU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "幻術-紅月-";
			this.kana = "ケンシユツコウケツ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 35000 - 5000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 幻術-朧幻想-
		// ----------------------------------------------------------------
		SKILL_ID_GENZYUTSU_OBOROGENSO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "幻術-朧幻想-";
			this.kana = "ケンシユツオホロケンソウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

				}

				return 60000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 符の属性
		// ----------------------------------------------------------------
		SKILL_ID_FU_ELEMENT_OF_FU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "符の属性";
			this.kana = "フノソクセイ";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 符の数
		// ----------------------------------------------------------------
		SKILL_ID_FU_COUNT_OF_FU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "符の数";
			this.kana = "フノカス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 残月用HpSp設定(前Hp後Sp 偶=偶数 奇=奇数)
		// ----------------------------------------------------------------
		SKILL_ID_HPSPCONF_FOR_GENZYUTSU_ZANGETSU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "残月用HpSp設定(前Hp後Sp 偶=偶数 奇=奇数)";
			this.kana = "サンケツヨウセツテイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウォータードラゴンブレス
		// ----------------------------------------------------------------
		SKILL_ID_WATER_DRAGON_BREATH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)ウォータードラゴンブレス";
			this.kana = "ウオオタアトラコンフレス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_WATER;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {

				if (skillLv >= 9) {
					return 2000;
				} else if (skillLv >= 7) {
					return 1500;
				} else if (skillLv >= 4) {
					return 1000;
				}

				return 3000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アンリミット
		// ----------------------------------------------------------------
		SKILL_ID_UNLIMIT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アンリミット";
			this.kana = "アンリミツト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 + 20 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 500 * skillLv;

				}

				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 300000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// オフェルトリウム
		// ----------------------------------------------------------------
		SKILL_ID_OFFERTORIUM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "オフェルトリウム";
			this.kana = "オフエルトリウム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 6000 - 1000 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 10000;

				}

				return 0;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ダーククロー
		// ----------------------------------------------------------------
		SKILL_ID_DARK_CRAW = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ダーククロー";
			this.kana = "タアククロオ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 12 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 3;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 60000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// テレキネシスインテンス
		// ----------------------------------------------------------------
		SKILL_ID_TELECHINESIS_INSTENCE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "テレキネシスインテンス";
			this.kana = "テレキネシスインテンス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 200 - 20 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				var coolAry = [ 120000, 170000, 210000, 240000, 260000 ];

				return coolAry[skillLv - 1];
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 閃光連撃
		// ----------------------------------------------------------------
		SKILL_ID_SENKO_RENGEKI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "閃光連撃";
			this.kana = "センコウレンケキ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 65;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return 2350;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 14000 - 2000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (仮)コンボ計算(三段～)
		// ----------------------------------------------------------------
		SKILL_ID_COMBO_SANDAN_MONK = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(仮)コンボ計算(三段～)";
			this.kana = "コンホケイサンモンク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (仮)コンボ計算(三段～)
		// ----------------------------------------------------------------
		SKILL_ID_COMBO_SANDAN_CHAMP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(仮)コンボ計算(三段～)";
			this.kana = "コンホケイサンチヤンヒオン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (仮)コンボ計算(双龍～)
		// ----------------------------------------------------------------
		SKILL_ID_COMBO_SORYUKYAKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(仮)コンボ計算(双龍～)";
			this.kana = "コンホケイサンソウリユウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (仮)コンボ計算(～)
		// ----------------------------------------------------------------
		SKILL_ID_COMBO_RESERVED_803 = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(仮)コンボ計算(～)";
			this.kana = "コンホケイサン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (仮)コンボ計算(～)
		// ----------------------------------------------------------------
		SKILL_ID_COMBO_RESERVED_804 = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(仮)コンボ計算(～)";
			this.kana = "コンホケイサン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (仮)コンボ計算(～)
		// ----------------------------------------------------------------
		SKILL_ID_COMBO_RESERVED_805 = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(仮)コンボ計算(～)";
			this.kana = "コンホケイサン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (仮)コンボ計算(～)
		// ----------------------------------------------------------------
		SKILL_ID_COMBO_RESERVED_806 = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(仮)コンボ計算(～)";
			this.kana = "コンホケイサン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (仮)コンボ計算(～)
		// ----------------------------------------------------------------
		SKILL_ID_COMBO_RESERVED_807 = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(仮)コンボ計算(～)";
			this.kana = "コンホケイサン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (仮)コンボ計算(～)
		// ----------------------------------------------------------------
		SKILL_ID_COMBO_RESERVED_808 = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(仮)コンボ計算(～)";
			this.kana = "コンホケイサン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (仮)コンボ計算(～)
		// ----------------------------------------------------------------
		SKILL_ID_COMBO_RESERVED_809 = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(仮)コンボ計算(～)";
			this.kana = "コンホケイサン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (仮)アースクエイク
		// ----------------------------------------------------------------
		SKILL_ID_EARTH_QUAKE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(仮)アースクエイク";
			this.kana = "アアスクエイク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 3;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マグマイラプション
		// ----------------------------------------------------------------
		SKILL_ID_MAGMA_ILLUPTION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マグマイラプション";
			this.kana = "マクマイラフシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 450 + 50 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 11000 - 1000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (仮)精霊
		// ----------------------------------------------------------------
		SKILL_ID_SERE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(仮)精霊";
			this.kana = "セイレイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 精霊(モード)
		// ----------------------------------------------------------------
		SKILL_ID_SERE_MODE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "精霊(モード)";
			this.kana = "セイレイモオト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (仮)精霊(補助スキル)
		// ----------------------------------------------------------------
		SKILL_ID_SERE_SUPPORT_SKILL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(仮)精霊(補助スキル)";
			this.kana = "セイレイホシヨスキル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// SホムのLv(パイロ用)
		// ----------------------------------------------------------------
		SKILL_ID_HOMLV_FOR_PYROCLASTIC = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "SホムのLv(パイロ用)";
			this.kana = "エスホムノレヘル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// パイロクラスティック(Sホム)
		// ----------------------------------------------------------------
		SKILL_ID_PYROCLASTIC = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "パイロクラスティック(Sホム)";
			this.kana = "ハイロクラステイツク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 12 + 8 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// オーバードブースト(Sホム)
		// ----------------------------------------------------------------
		SKILL_ID_OVERED_BOOST = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "オーバードブースト(Sホム)";
			this.kana = "オオハアトフウスト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 20 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (仮)グラニティックアーマー(Sホム)
		// ----------------------------------------------------------------
		SKILL_ID_GRANITIC_ARMOR = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(仮)グラニティックアーマー(Sホム)";
			this.kana = "クラニテイツクアアマア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000 + 5000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (仮)ペインキラー(Sホム)
		// ----------------------------------------------------------------
		SKILL_ID_PAIN_KILLER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(仮)ペインキラー(Sホム)";
			this.kana = "ヘインキラア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 44 + 4 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 30000 * Math.floor(skillLv / 2);
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ディフェンス(ホム)
		// ----------------------------------------------------------------
		SKILL_ID_DEFENCE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ディフェンス(ホム)";
			this.kana = "テイフエンス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return -2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 閃光連撃終了直後状態(約1.6秒のATK+状態)
		// ----------------------------------------------------------------
		SKILL_ID_ATK_PLUS_AFTER_SENKO_RENGEKI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "閃光連撃終了直後状態(ATK+状態)";
			this.kana = "センコウレンケキシユウリヨウチヨクコシヨウタイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// リッチズコイン
		// ----------------------------------------------------------------
		SKILL_ID_RICHS_COIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "リッチズコイン";
			this.kana = "リツチスコイン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フォーリンエンジェル
		// ----------------------------------------------------------------
		SKILL_ID_FALLIN_ANGEL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フォーリンエンジェル";
			this.kana = "フオオリンエンシエル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シャッターストーム
		// ----------------------------------------------------------------
		SKILL_ID_SHUTTER_STORM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "シャッターストーム";
			this.kana = "シヤツタアストオム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 1700 + 200 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マススパイラル
		// ----------------------------------------------------------------
		SKILL_ID_MASS_SPIRAL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マススパイラル";
			this.kana = "マススハイラル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エターナルチェーン
		// ----------------------------------------------------------------
		SKILL_ID_ETERNAL_CHAIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エターナルチェーン";
			this.kana = "エタアナルチエエン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 45;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData);
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ハウリングマイン
		// ----------------------------------------------------------------
		SKILL_ID_HOWLING_MINE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ハウリングマイン";
			this.kana = "ハウリンクマイン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 400 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ファイアーレイン
		// ----------------------------------------------------------------
		SKILL_ID_FIRE_RAIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ファイアーレイン";
			this.kana = "フアイアアレイン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 6000 - 1000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フリッカー
		// ----------------------------------------------------------------
		SKILL_ID_FRICKER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フリッカー";
			this.kana = "フリツカア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ファイアーダンス
		// ----------------------------------------------------------------
		SKILL_ID_FIRE_DANCE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ファイアーダンス";
			this.kana = "フアイアアタンス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// バニシングバスター
		// ----------------------------------------------------------------
		SKILL_ID_BUNISHING_BASTER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "バニシングバスター";
			this.kana = "ハニシンクハスタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 200 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アンチマテリアルブラスト
		// ----------------------------------------------------------------
		SKILL_ID_UNTIMATERIAL_BLAST = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アンチマテリアルブラスト";
			this.kana = "アンチマテリアルフラスト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 76 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 1500 + 300 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クイックドローショット
		// ----------------------------------------------------------------
		SKILL_ID_QUICKDRAW_SHOT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "クイックドローショット";
			this.kana = "クイツクトロオシヨツト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return 1 + Math.floor(charaDataManger.GetCharaJobLv() / 20);
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ドラゴンテイル
		// ----------------------------------------------------------------
		SKILL_ID_DRAGON_TAIL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ドラゴンテイル";
			this.kana = "トラコンテイル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 + 10 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return Math.min(2000, 1000 + 200 * skillLv);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ラウンドトリップ
		// ----------------------------------------------------------------
		SKILL_ID_ROUND_TRIP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ラウンドトリップ";
			this.kana = "ラウントトリツフ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				var pow = 0;

				// 基本式
				pow = 100 + 40 * skillLv;

				// ベースレベル補正
				pow = Math.floor(pow * charaDataManger.GetCharaBaseLv() / 100);

				return pow;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return Math.max(200, 1200 - 200 * skillLv);
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ヒートバレル
		// ----------------------------------------------------------------
		SKILL_ID_HEAT_BARREL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ヒートバレル";
			this.kana = "ヒイトハレル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 105000 - 5000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ヒートバレルのコイン枚数
		// ----------------------------------------------------------------
		SKILL_ID_HEAT_BARREL_COIN_COUNT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ヒートバレルのコイン枚数";
			this.kana = "ヒイトハレルノコインマイスウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スラッグショット
		// ----------------------------------------------------------------
		SKILL_ID_SLUG_SHOT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スラッグショット";
			this.kana = "スラツクシヨツト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100 + 20 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 15000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ハンマーオブゴッド
		// ----------------------------------------------------------------
		SKILL_ID_HAMMER_OF_GOD = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ハンマーオブゴッド";
			this.kana = "ハンマアオフコツト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30 + 5 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 30000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クリムゾンマーカー
		// ----------------------------------------------------------------
		SKILL_ID_CRYMSON_MARKER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "クリムゾンマーカー";
			this.kana = "クリムソンマアカア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// プラチナムアルター
		// ----------------------------------------------------------------
		SKILL_ID_PLATINUM_ALTER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "プラチナムアルター";
			this.kana = "フラチナムアルタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16 + 4 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// プラチナムのコイン枚数
		// ----------------------------------------------------------------
		SKILL_ID_PLATINUM_ALTER_COIN_COUNT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "プラチナムのコイン枚数";
			this.kana = "フラチナムノコインマイスウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// バインドトラップ
		// ----------------------------------------------------------------
		SKILL_ID_BIND_TRAP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "バインドトラップ";
			this.kana = "ハイントトラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 28 + 2 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ハウリングマイン追撃
		// ----------------------------------------------------------------
		SKILL_ID_HOWLING_MINE_APPEND = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.refId = SKILL_ID_HOWLING_MINE;
			this.name = "ハウリングマイン追撃";
			this.kana = "ハウリンクマインツイケキ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;

			this.Power = function(skillLv, charaDataManger) {
				return 1000 + 400 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クイックドローショットの全追撃
		// ----------------------------------------------------------------
		SKILL_ID_AS_QUICKDRAW = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "クイックドローショットの全追撃";
			this.kana = "クイツクトロオシヨツトノセンツイケキ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 基本スキル
		// ----------------------------------------------------------------
		SKILL_ID_KIHON_SKILL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "基本スキル";
			this.kana = "キホンスキル";
			this.maxLv = 9;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// レディムプティオ
		// ----------------------------------------------------------------
		SKILL_ID_REDEMPTIO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "レディムプティオ";
			this.kana = "レテイムフテイオ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 400;
			}

			this.CastTimeForce = function(skillLv, charaDataManger) {
				return 4000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サイトブラスター
		// ----------------------------------------------------------------
		SKILL_ID_SIGHT_BLASTER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "サイトブラスター";
			this.kana = "サイトフラスタア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// グリード
		// ----------------------------------------------------------------
		SKILL_ID_GREED = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "グリード";
			this.kana = "クリイト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CastTimeForce = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フェイクゼニー
		// ----------------------------------------------------------------
		SKILL_ID_FAKE_ZENY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フェイクゼニー";
			this.kana = "フエイクセニイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// オートガード（ダミー　※多重定義ミス）
		// ----------------------------------------------------------------
		SKILL_ID_AUTO_GUARD_DUMMY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "オートガード";
			this.kana = "オオトカアト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シュリンク
		// ----------------------------------------------------------------
		SKILL_ID_SHRINK = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "シュリンク";
			this.kana = "シユリンク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 気功転移
		// ----------------------------------------------------------------
		SKILL_ID_KIKO_TENI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "気功転移";
			this.kana = "キコウテンイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クリエイトコンバータ
		// ----------------------------------------------------------------
		SKILL_ID_CREATE_CONVERTER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "クリエイトコンバータ";
			this.kana = "クリエイトコンハアタ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ファイアーエレメンタルチェンジ
		// ----------------------------------------------------------------
		SKILL_ID_FIRE_ELEMENTAL_CHANGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ファイアーエレメンタルチェンジ";
			this.kana = "フアイアアエレメンタルチエンシ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウォーターエレメンタルチェンジ
		// ----------------------------------------------------------------
		SKILL_ID_WATER_ELEMENTAL_CHANGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ウォーターエレメンタルチェンジ";
			this.kana = "ウオオタアエレメンタルチエンシ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウィンドエレメンタルチェンジ
		// ----------------------------------------------------------------
		SKILL_ID_WIND_ELEMENTAL_CHANGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ウィンドエレメンタルチェンジ";
			this.kana = "ウイントエレメンタルチエンシ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アースエレメンタルチェンジ
		// ----------------------------------------------------------------
		SKILL_ID_EARTH_ELEMENTAL_CHANGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アースエレメンタルチェンジ";
			this.kana = "アアスエレメンタルチエンシ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 生命倫理
		// ----------------------------------------------------------------
		SKILL_ID_SEIMEI_RINRI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "生命倫理";
			this.kana = "セイメイリンリ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 安息
		// ----------------------------------------------------------------
		SKILL_ID_ANSOKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "安息";
			this.kana = "アンソク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// コールホムンクルス
		// ----------------------------------------------------------------
		SKILL_ID_CALL_HOMUNCULUS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "コールホムンクルス";
			this.kana = "コオルホムンクルス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// リザレクションホムンクルス
		// ----------------------------------------------------------------
		SKILL_ID_RESURRECTION_HOMUNCULUS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "リザレクションホムンクルス";
			this.kana = "リサレクシヨンホムンクルス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80 - 6 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ガンバンテイン
		// ----------------------------------------------------------------
		SKILL_ID_GANBANTEIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ガンバンテイン";
			this.kana = "カンハンテイン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 武器精錬
		// ----------------------------------------------------------------
		SKILL_ID_BUKISEIREN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "武器精錬";
			this.kana = "フキセイレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// プレッシャー（重複）
		// ----------------------------------------------------------------
		SKILL_ID_PRESSURE_MISS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "プレッシャー（重複）";
			this.kana = "フレツシヤアチヨウフク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フルストリップ
		// ----------------------------------------------------------------
		SKILL_ID_FULL_STRIP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フルストリップ";
			this.kana = "フルストリツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 2 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

				}

				return 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 10000;

				}

				return 0;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// プリザーブ
		// ----------------------------------------------------------------
		SKILL_ID_PRESERVE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "プリザーブ";
			this.kana = "フリサアフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 私を縛らないで
		// ----------------------------------------------------------------
		SKILL_ID_WATASHIWO_SHIBARANAIDE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "私を縛らないで";
			this.kana = "ワタシヲシハラナイテ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ヘルモードの杖
		// ----------------------------------------------------------------
		SKILL_ID_HELLMODENO_TUE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ヘルモードの杖";
			this.kana = "ヘルモオトノツエ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 10 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 月明かりの下で
		// ----------------------------------------------------------------
		SKILL_ID_TSUKIAKARINO_SHITADE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "月明かりの下で";
			this.kana = "ツキアカリノシタテ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 10 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 生命力変換
		// ----------------------------------------------------------------
		SKILL_ID_SEIMEIRYOKU_HENKAN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "生命力変換";
			this.kana = "セイメイリヨクヘンカン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 800 + 200 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スパイダーウェブ
		// ----------------------------------------------------------------
		SKILL_ID_SPIDER_WEB = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スパイダーウェブ";
			this.kana = "スハイタアウエフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウォールオブフォグ
		// ----------------------------------------------------------------
		SKILL_ID_WALL_OF_FOG = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ウォールオブフォグ";
			this.kana = "ウオオルオフフオク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スリムポーションピッチャー
		// ----------------------------------------------------------------
		SKILL_ID_SLIMPOTION_PITCHER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スリムポーションピッチャー";
			this.kana = "スリムホオシヨンヒツチヤア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フルケミカルチャージ
		// ----------------------------------------------------------------
		SKILL_ID_FULL_CHEMICAL_CHARGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フルケミカルチャージ";
			this.kana = "フルケミカルチヤアシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 植物栽培
		// ----------------------------------------------------------------
		SKILL_ID_SHOKUBUTSU_SAIBAI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "植物栽培";
			this.kana = "シヨクフツサイハイ";
			this.maxLv = 2;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ナイトの魂
		// ----------------------------------------------------------------
		SKILL_ID_KNIGHTNO_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ナイトの魂";
			this.kana = "ナイトノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アサシンの魂
		// ----------------------------------------------------------------
		SKILL_ID_ASSASINNO_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アサシンの魂";
			this.kana = "アサシンノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// プリーストの魂
		// ----------------------------------------------------------------
		SKILL_ID_PRIESTNO_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "プリーストの魂";
			this.kana = "フリイストノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ハンターの魂
		// ----------------------------------------------------------------
		SKILL_ID_HUNTERNO_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ハンターの魂";
			this.kana = "ハンタアノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウィザードの魂
		// ----------------------------------------------------------------
		SKILL_ID_WIZARDNO_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ウィザードの魂";
			this.kana = "ウイサアトノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ブラックスミスの魂
		// ----------------------------------------------------------------
		SKILL_ID_BLACKSMITHNO_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ブラックスミスの魂";
			this.kana = "フラツクスミスノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クルセイダーの魂
		// ----------------------------------------------------------------
		SKILL_ID_CRUSADERNO_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "クルセイダーの魂";
			this.kana = "クルセイタアノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ローグの魂
		// ----------------------------------------------------------------
		SKILL_ID_ROGUENO_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ローグの魂";
			this.kana = "ロオクノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// モンクの魂
		// ----------------------------------------------------------------
		SKILL_ID_MONKNO_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "モンクの魂";
			this.kana = "モンクノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// バードとダンサーの魂
		// ----------------------------------------------------------------
		SKILL_ID_BARDTO_DANCERNO_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "バードとダンサーの魂";
			this.kana = "ハアトトタンサアノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// セージの魂
		// ----------------------------------------------------------------
		SKILL_ID_SAGENO_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "セージの魂";
			this.kana = "セエシノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アルケミストの魂
		// ----------------------------------------------------------------
		SKILL_ID_ALCHEMISTNO_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アルケミストの魂";
			this.kana = "アルケミストノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 拳聖の魂
		// ----------------------------------------------------------------
		SKILL_ID_KENSENO_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "拳聖の魂";
			this.kana = "ケンセイノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ソウルリンカーの魂
		// ----------------------------------------------------------------
		SKILL_ID_SOULLINKERNO_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ソウルリンカーの魂";
			this.kana = "ソウルリンカアノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フリップザコイン
		// ----------------------------------------------------------------
		SKILL_ID_FLIP_THE_COIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フリップザコイン";
			this.kana = "フリツフサコイン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// キングスグレイス
		// ----------------------------------------------------------------
		SKILL_ID_KINGS_GRACE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "キングスグレイス";
			this.kana = "キンクスクレイス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 220 - 20 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 110000 - 10000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エスケープ
		// ----------------------------------------------------------------
		SKILL_ID_ESCAPE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エスケープ";
			this.kana = "エスケエフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9 + 1 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 7000;

				}

				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フリッグの歌
		// ----------------------------------------------------------------
		SKILL_ID_FRIGNO_UTA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フリッグの歌";
			this.kana = "フリツクノウタ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 170 + 30 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 1000;

				}

				return 0;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エレメンタルシールド
		// ----------------------------------------------------------------
		SKILL_ID_ELEMENTAL_SHIELD = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エレメンタルシールド";
			this.kana = "エレメンタルシイルト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// イリュージョンドーピング
		// ----------------------------------------------------------------
		SKILL_ID_ILLUSION_DOOPING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "イリュージョンドーピング";
			this.kana = "イリユウシヨントオヒンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 500 + 500 * skillLv;

				}

				return 0;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 6000 - 1000 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ダーククロス
		// ----------------------------------------------------------------
		SKILL_ID_DARK_CROSS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ダーククロス";
			this.kana = "タアククロス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_DARK;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 35 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// インティミデイト(盗作用Ex)
		// ----------------------------------------------------------------
		SKILL_ID_INTIMIDATE_FOR_CLONE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.refId = SKILL_ID_INTIMIDATE;
			this.name = "インティミデイト(盗作用Ex)";
			this.kana = "インテイミテイトトウサクヨウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 30 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (仮)コンボ計算(ｼﾞｮｲﾝﾄ→SpP→ｿﾆｯｸ)
		// ----------------------------------------------------------------
		SKILL_ID_COMBO_GIGANTSET_JOINT_BEAT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(仮)コンボ計算(ｼﾞｮｲﾝﾄ→SpP→ｿﾆｯｸ)";
			this.kana = "コンホケイサンシヨイント";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (仮)コンボ計算(SpP→ｿﾆｯｸ)
		// ----------------------------------------------------------------
		SKILL_ID_COMBO_GIGANTSET_SPIRAL_PIERCE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(仮)コンボ計算(SpP→ｿﾆｯｸ)";
			this.kana = "コンホケイサンスハイラルヒアアス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フルスロットル
		// ----------------------------------------------------------------
		SKILL_ID_FULLSLOT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フルスロットル";
			this.kana = "フルスロツトル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return -2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -2;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return -2;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ドラム基本スキル
		// ----------------------------------------------------------------
		SKILL_ID_DORAM_KIHON_SKILL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ドラム基本スキル";
			this.kana = "トラムキホンスキル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// かみつく
		// ----------------------------------------------------------------
		SKILL_ID_KAMITSUKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "かみつく";
			this.kana = "かみつく";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// かくれる
		// ----------------------------------------------------------------
		SKILL_ID_KAKURERU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "かくれる";
			this.kana = "かくれる";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ひっかく
		// ----------------------------------------------------------------
		SKILL_ID_HIKKAKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ひっかく";
			this.kana = "ひつかく";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 400 + 200 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// うずくまる
		// ----------------------------------------------------------------
		SKILL_ID_UZUKUMARU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "うずくまる";
			this.kana = "うすくまる";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 1500;

				}

				return 0;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ニャンジャンプ
		// ----------------------------------------------------------------
		SKILL_ID_NYAN_JAMP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ニャンジャンプ";
			this.kana = "ニヤンシヤンフ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// にゃん魂
		// ----------------------------------------------------------------
		SKILL_ID_NYAN_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "にゃん魂";
			this.kana = "にやんたましい";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ソウルアタック
		// ----------------------------------------------------------------
		SKILL_ID_SOUL_ATTACK = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ソウルアタック";
			this.kana = "ソウルアタツク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 新鮮なエビ
		// ----------------------------------------------------------------
		SKILL_ID_SHINSENNA_EBI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "新鮮なエビ";
			this.kana = "シンセンナエヒ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エビ三昧
		// ----------------------------------------------------------------
		SKILL_ID_EBI_ZANMAI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エビ三昧";
			this.kana = "エヒサンマイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 大トロ
		// ----------------------------------------------------------------
		SKILL_ID_OTORO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "大トロ";
			this.kana = "オオトロ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (skillLv == 1) ? 500 : 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (skillLv <= 2) ? 0 : 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return (skillLv == 5) ? 3000 : (-500 + 500 * skillLv);
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マグロシールド
		// ----------------------------------------------------------------
		SKILL_ID_MAGURO_SHIELD = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マグロシールド";
			this.kana = "マクロシイルト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -500 + 500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 海の力
		// ----------------------------------------------------------------
		SKILL_ID_UMINO_CHIKARA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "海の力";
			this.kana = "ウミノチカラ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シーフード系習得レベル合計
		// ----------------------------------------------------------------
		SKILL_ID_SEAFOOD_KEI_SHUTOKU_LEVEL_GOKEI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "シーフード系習得レベル合計";
			this.kana = "シイフウトケイシユウトクレヘルコウケイ";
			this.maxLv = 50;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// グルーミング
		// ----------------------------------------------------------------
		SKILL_ID_GROOMING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "グルーミング";
			this.kana = "クルウミンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -500 + 500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// のどを鳴らす
		// ----------------------------------------------------------------
		SKILL_ID_NODOWO_NARASU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "のどを鳴らす";
			this.kana = "ノトヲナラス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (skillLv == 5) ? 3000 : (-500 + 500 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エビパーティー
		// ----------------------------------------------------------------
		SKILL_ID_EBI_PARTY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エビパーティー";
			this.kana = "エヒハアテイイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 150;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 海の魂
		// ----------------------------------------------------------------
		SKILL_ID_UMINO_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "海の魂";
			this.kana = "ウミノタマシイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マタタビランス
		// ----------------------------------------------------------------
		SKILL_ID_MATATABI_LANCE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マタタビランス";
			this.kana = "マタタヒランス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_SPECIAL;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マタタビの根っこ
		// ----------------------------------------------------------------
		SKILL_ID_MATATABINO_NEKKO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マタタビの根っこ";
			this.kana = "マタタヒノネツコ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (skillLv <= 3) ? 1000 : (2500 - 500 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return (skillLv == 5) ? 3000 : -500 + 500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// イヌハッカメテオ
		// ----------------------------------------------------------------
		SKILL_ID_INUHAKKA_METEOR = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "イヌハッカメテオ";
			this.kana = "イヌハツカメテオ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_SPECIAL;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 700;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 7;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000 - 500 * Math.floor(skillLv / 2);
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// (×)イヌハッカシャワー
		// ----------------------------------------------------------------
		SKILL_ID_INUHAKKA_SHOWER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)イヌハッカシャワー";
			this.kana = "イヌハツカシヤワア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				var delayArray = [ 6000, 4000, 2000, 1000, 0 ];

				return delayArray[skillLv - 1];
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 大地の力
		// ----------------------------------------------------------------
		SKILL_ID_DAICHINO_CHIKARA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "大地の力";
			this.kana = "タイチノチカラ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// プラント系習得レベル合計
		// ----------------------------------------------------------------
		SKILL_ID_PLANT_KEI_SHUTOKU_LEVEL_GOKEI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "プラント系習得レベル合計";
			this.kana = "フラントケイシユウトクレヘルコウケイ";
			this.maxLv = 50;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// チャタリング
		// ----------------------------------------------------------------
		SKILL_ID_CHATTERING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "チャタリング";
			this.kana = "チヤタリンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -500 + 500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ミャウミャウ
		// ----------------------------------------------------------------
		SKILL_ID_MYAUMYAU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ミャウミャウ";
			this.kana = "ミヤウミヤウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 180;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ニャングラス
		// ----------------------------------------------------------------
		SKILL_ID_NYAN_GRASS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ニャングラス";
			this.kana = "ニヤンクラス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 140;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (skillLv == 1) ? 1000 : (-500 + 500 * skillLv);
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (skillLv == 1) ? 1000 : 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				var delayArray = [ 6000, 4000, 2000, 1000, 0 ];

				return delayArray[skillLv - 1];
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 大地の魂
		// ----------------------------------------------------------------
		SKILL_ID_DAICHINO_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "大地の魂";
			this.kana = "タイチノタマシイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ピッキ突き
		// ----------------------------------------------------------------
		SKILL_ID_PIKKI_TSUKI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ピッキ突き";
			this.kana = "ヒツキツキ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2500 - 500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アクラウスダッシュ
		// ----------------------------------------------------------------
		SKILL_ID_ARCLOUSE_DASH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アクラウスダッシュ";
			this.kana = "アクラウスタツシュ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// タロウの傷
		// ----------------------------------------------------------------
		SKILL_ID_TAROUNO_KIZU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "タロウの傷";
			this.kana = "タロウノキス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 90;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 15000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// キャロットビート
		// ----------------------------------------------------------------
		SKILL_ID_CARROT_BEAT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "キャロットビート";
			this.kana = "キヤロツトヒイト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (skillLv == 5) ? 3000 : (-500 + 500 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				var coolArray = [ 2000, 1500, 1500, 1000, 500 ];

				return coolArray[skillLv - 1];
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 生命の力
		// ----------------------------------------------------------------
		SKILL_ID_SEIMEINO_CHIKARA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "生命の力";
			this.kana = "セイメイノチカラ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アニマル系習得レベル合計
		// ----------------------------------------------------------------
		SKILL_ID_ANIMAL_KEI_SHUTOKU_LEVEL_GOKEI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アニマル系習得レベル合計";
			this.kana = "アニマルケイシユウトクレヘルコウケイ";
			this.maxLv = 50;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 警戒
		// ----------------------------------------------------------------
		SKILL_ID_KEIKAI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "警戒";
			this.kana = "ケイカイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 150;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return (skillLv == 1) ? 240000 : (210000 - 30000 * skillLv);
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 群れの力
		// ----------------------------------------------------------------
		SKILL_ID_MURENO_CHIKARA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "群れの力";
			this.kana = "ムレノチカラ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (skillLv == 5) ? 3000 : (-500 + 500 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				var coolArray = [ 3000, 2000, 1500, 500, 0 ];

				return coolArray[skillLv - 1];
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サベージの魂
		// ----------------------------------------------------------------
		SKILL_ID_SAVAGENO_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "サベージの魂";
			this.kana = "サヘエシノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (skillLv <= 3) ? 1000 : 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				var delayArray = [ 0, 500, 1000, 1000, 1500 ];

				return delayArray[skillLv - 1];
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2500 - 500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 生命の魂
		// ----------------------------------------------------------------
		SKILL_ID_SEIMEINO_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "生命の魂";
			this.kana = "セイメイノタマシイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 大地の魂効果(ﾏﾀﾀﾋﾞの根っこ使用後のMATK＋)
		// ----------------------------------------------------------------
		SKILL_ID_DAICHINO_TAMASHI_KOKA_MATATABINO_NEKKO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "大地の魂効果(ﾏﾀﾀﾋﾞの根っこ使用後のMATK＋)";
			this.kana = "タイチノタマシイコウカマタタヒノネツコシヨウコ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 大地の魂効果(ｲﾇﾊｯｶｼｬﾜｰ使用後の完全回避＋)
		// ----------------------------------------------------------------
		SKILL_ID_DAICHINO_TAMASHI_KOKA_INUHAKKA_SHOWER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "大地の魂効果(ｲﾇﾊｯｶｼｬﾜｰ使用後の完全回避＋)";
			this.kana = "タイチノタマシイコウカイヌハツカシヤワアシヨウコ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 大地の魂効果(ニャングラス使用後のMATK＋)
		// ----------------------------------------------------------------
		SKILL_ID_DAICHINO_TAMASHI_KOKA_NYAN_GRASS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "大地の魂効果(ニャングラス使用後のMATK＋)";
			this.kana = "タイチノタマシイコウカニヤンクラスシヨウコ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 生命の魂効果(残りHP)
		// ----------------------------------------------------------------
		SKILL_ID_SEIMEINO_TAMASHI_KOKA_NOKORI_HP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "生命の魂効果(残りHP)";
			this.kana = "セイメイノタマシイコウカノコリヒツトホイント";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ブレイクスルー
		// ----------------------------------------------------------------
		SKILL_ID_BREAK_THROUGH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ブレイクスルー";
			this.kana = "フレイクスルウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// トランセンデンス
		// ----------------------------------------------------------------
		SKILL_ID_TRANSCENDENCE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "トランセンデンス";
			this.kana = "トランセンテンス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 天使さま助けて
		// ----------------------------------------------------------------
		SKILL_ID_TENSHISAMA_TASUKETE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "天使さま助けて";
			this.kana = "テンシサマタスケテ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CoolTime = function(skillLv, charaDataManger) {
				return 300000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 太陽と月と星の記録
		// ----------------------------------------------------------------
		SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KIROKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "太陽と月と星の記録";
			this.kana = "タイヨウトツキトホシノキロク";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 太陽と月と星の浄化
		// ----------------------------------------------------------------
		SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_ZYOKA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "太陽と月と星の浄化";
			this.kana = "タイヨウトツキトホシノシヨウカ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 太陽の構え
		// ----------------------------------------------------------------
		SKILL_ID_TAIYONO_KAMAE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "太陽の構え";
			this.kana = "タイヨウノカマエ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 紅焔脚
		// ----------------------------------------------------------------
		SKILL_ID_KOEN_KYAKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "紅焔脚";
			this.kana = "コウエンキヤク";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 50 + 80 * skillLv + 40 * Math.floor(skillLv / 2);
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 太陽爆発
		// ----------------------------------------------------------------
		SKILL_ID_TAIYO_BAKUHATSU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "太陽爆発";
			this.kana = "タイヨウハクハツ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 太陽の光
		// ----------------------------------------------------------------
		SKILL_ID_TAIYONO_HIKARI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "太陽の光";
			this.kana = "タイヨウノヒカリ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 1000;

				}

				return 10000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 月の構え
		// ----------------------------------------------------------------
		SKILL_ID_TSUKINO_KAMAE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "月の構え";
			this.kana = "ツキノカマエ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 朔月脚
		// ----------------------------------------------------------------
		SKILL_ID_SAKUGETSU_KYAKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "朔月脚";
			this.kana = "サクケツキヤク";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 250 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 満月脚
		// ----------------------------------------------------------------
		SKILL_ID_MANGETSU_KYAKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "満月脚";
			this.kana = "マンケツキヤク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 月の光
		// ----------------------------------------------------------------
		SKILL_ID_TSUKINO_HIKARI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "月の光";
			this.kana = "ツキノヒカリ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 1000;

				}

				return 10000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 星の構え
		// ----------------------------------------------------------------
		SKILL_ID_HOSHINO_KAMAE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "星の構え";
			this.kana = "ホシノカマエ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 閃光脚
		// ----------------------------------------------------------------
		SKILL_ID_SENKO_KYAKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "閃光脚";
			this.kana = "センコウキヤク";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 流星落下
		// ----------------------------------------------------------------
		SKILL_ID_RYUSE_RAKKA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "流星落下";
			this.kana = "リユウセイラツカ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 120;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 4000 - 1000 * ((skillLv - 1) % 5);
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 星の光
		// ----------------------------------------------------------------
		SKILL_ID_HOSHINO_HIKARI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "星の光";
			this.kana = "ホシノヒカリ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 1000;

				}

				return 10000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 宇宙の構え
		// ----------------------------------------------------------------
		SKILL_ID_UCHUNO_KAMAE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "宇宙の構え";
			this.kana = "ウチユウノカマエ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 重力調節
		// ----------------------------------------------------------------
		SKILL_ID_ZYURYOKU_CHOSE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "重力調節";
			this.kana = "シユウリヨクチヨウセイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 10000;

				}

				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 新星爆発
		// ----------------------------------------------------------------
		SKILL_ID_SHINSE_BAKUHATSU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "新星爆発";
			this.kana = "シンセイハクハツ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 120;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 星帝降臨
		// ----------------------------------------------------------------
		SKILL_ID_SEITE_KORIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "星帝降臨";
			this.kana = "セイテイコウリン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 160;
			}

			this.Power = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 2250 + 750 * skillLv;

				}

				return 1500 + 500 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 創星の書
		// ----------------------------------------------------------------
		SKILL_ID_SOSENO_SHO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "創星の書";
			this.kana = "ソウセイノシヨ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 150;
			}

			this.Power = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 750 + 750 * skillLv;

				}

				return 500 + 500 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 次元の書
		// ----------------------------------------------------------------
		SKILL_ID_ZIGENNO_SHO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "次元の書";
			this.kana = "シケンノシヨ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 22500 - 2500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エスハ
		// ----------------------------------------------------------------
		SKILL_ID_ESHA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エスハ";
			this.kana = "エスハ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 2000 + (100 * skillLv);
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 200 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 200 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エスパ
		// ----------------------------------------------------------------
		SKILL_ID_ESPA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エスパ";
			this.kana = "エスパ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エスフ
		// ----------------------------------------------------------------
		SKILL_ID_ESFU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エスフ";
			this.kana = "エスフ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 120;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// カウト
		// ----------------------------------------------------------------
		SKILL_ID_KAUTO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "カウト";
			this.kana = "カウト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 魂の蓄積
		// ----------------------------------------------------------------
		SKILL_ID_TAMASHINO_CHIKUSEKI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "魂の蓄積";
			this.kana = "タマシイノチクセキ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 120;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 魂の収穫
		// ----------------------------------------------------------------
		SKILL_ID_TAMASHINO_SHUKAKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "魂の収穫";
			this.kana = "タマシイノシユウカク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 200 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 200 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 魂の循環
		// ----------------------------------------------------------------
		SKILL_ID_TAMASHINO_ZYUNKAN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "魂の循環";
			this.kana = "タマシイノシユンカン";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 150;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 4500 - 1500 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 4500 - 1500 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 魂の連結
		// ----------------------------------------------------------------
		SKILL_ID_TAMASHINO_RENKETSU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "魂の連結";
			this.kana = "タマシイノレンケツ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 300;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ソウルエナジー研究
		// ----------------------------------------------------------------
		SKILL_ID_SOUL_ENERGY_KENKYU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ソウルエナジー研究";
			this.kana = "ソウルエナシイケンキユウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 死霊憑依
		// ----------------------------------------------------------------
		SKILL_ID_SHIRYO_HYOI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "死霊憑依";
			this.kana = "シリヨウヒヨウイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 死霊爆発
		// ----------------------------------------------------------------
		SKILL_ID_SHIRYO_BAKUHATSU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "死霊爆発";
			this.kana = "シリヨウハクハツ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_DARK;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 魂の分裂
		// ----------------------------------------------------------------
		SKILL_ID_TAMASHINO_BUNRETSU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)魂の分裂";
			this.kana = "タマシイノフンレツ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 10000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 10000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 10000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 10000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 鷹の魂
		// ----------------------------------------------------------------
		SKILL_ID_TAKANO_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "鷹の魂";
			this.kana = "タカノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 妖精の魂
		// ----------------------------------------------------------------
		SKILL_ID_YOSENO_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "妖精の魂";
			this.kana = "ヨウセイノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 影の魂
		// ----------------------------------------------------------------
		SKILL_ID_KAGENO_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "影の魂";
			this.kana = "カケノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ゴーレムの魂
		// ----------------------------------------------------------------
		SKILL_ID_GOLEMNO_TAMASHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ゴーレムの魂";
			this.kana = "コオレムノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 560 - 100 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 魂の崩壊
		// ----------------------------------------------------------------
		SKILL_ID_TAMASHINO_HOKAI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)魂の崩壊";
			this.kana = "タマシイノホウカイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 10000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 10000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 10000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 10000;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ソウルエナジーの個数
		// ----------------------------------------------------------------
		SKILL_ID_COUNT_OF_SOUL_ENERGY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ソウルエナジーの個数";
			this.kana = "ソウルエナシイノコスウ";
			this.maxLv = 20;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 流星落下の計算方法
		// ----------------------------------------------------------------
		SKILL_ID_RYUSE_RAKKA_MODE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "流星落下の計算方法";
			this.kana = "リユウセイラツカノケイサンホウホウ";
			this.maxLv = 2;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ピオニーマミー
		// ----------------------------------------------------------------
		SKILL_ID_PEONY_MAMY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ピオニーマミー";
			this.kana = "ヒオニイマミイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9999;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ぴしゃりハーブ
		// ----------------------------------------------------------------
		SKILL_ID_PISHARI_HERB = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ぴしゃりハーブ";
			this.kana = "ヒシヤリハアフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9999;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 世界樹のほこり
		// ----------------------------------------------------------------
		SKILL_ID_SEKAIZYUNO_HOKORI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "世界樹のほこり";
			this.kana = "セカイシユノホコリ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9999;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スノーフリップ
		// ----------------------------------------------------------------
		SKILL_ID_SNOW_FLIP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スノーフリップ";
			this.kana = "スノオフリツフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9999;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 所持限界量増加Ｒ
		// ----------------------------------------------------------------
		SKILL_ID_SHOZIGENKAIRYO_ZOKA_R = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.refId = SKILL_ID_SHOZIGENKAIRYO_ZOKA;
			this.name = "所持限界量増加Ｒ";
			this.kana = "シヨシケンカイリヨウソウカアアル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ヴァンパイアギフト
		// ----------------------------------------------------------------
		SKILL_ID_VAMPIRE_GIFT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)ヴァンパイアギフト";
			this.kana = "ウアンハイアキフト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.Power = function(skillLv, charaDataManger) {
				return 100 * skillLv;
			}

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 魅惑のウィンク
		// ----------------------------------------------------------------
		SKILL_ID_MIWAKUNO_WINK = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "魅惑のウィンク";
			this.kana = "ミワクノウインク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9999;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シーフード系スキル（データ移行対応用ダミー定義）
		// ----------------------------------------------------------------
		SKILL_ID_SERIES_SEA_FOOD = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "シーフード系スキル";
			this.kana = "シーフートケイスキル";
			this.maxLv = 1;

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// プラント系スキル（データ移行対応用ダミー定義）
		// ----------------------------------------------------------------
		SKILL_ID_SERIES_PLANT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "プラント系スキル";
			this.kana = "フラントケイスキル";
			this.maxLv = 1;

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アニマル系スキル（データ移行対応用ダミー定義）
		// ----------------------------------------------------------------
		SKILL_ID_SERIES_ANIMAL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アニマル系スキル";
			this.kana = "アニマルケイスキル";
			this.maxLv = 1;

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ストーンスキン
		// ----------------------------------------------------------------
		SKILL_ID_STONE_SKIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ストーンスキン";
			this.kana = "ストオンスキン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9999;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クリティカルウーンズ
		// ----------------------------------------------------------------
		SKILL_ID_CRITICAL_WOUNDS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "クリティカルウーンズ";
			this.kana = "クリテイカルウウンス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9999;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// オーディンの力
		// ----------------------------------------------------------------
		SKILL_ID_ODINNO_CHIKARA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "オーディンの力";
			this.kana = "オオテインノチカラ";
			this.maxLv = 2;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return (40 + 30 * skillLv);
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 通常攻撃右手（ダメージ計算用ダミー定義）
		// ----------------------------------------------------------------
		SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "通常攻撃";
			this.kana = "ツウシヨウコウケキ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SPECIAL;

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData);
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 通常攻撃左手（ダメージ計算用ダミー定義）
		// ----------------------------------------------------------------
		SKILL_ID_TUZYO_KOGEKI_CALC_LEFT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "通常攻撃";
			this.kana = "ツウシヨウコウケキ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SPECIAL;

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData);
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// カタール追撃（ダメージ計算用ダミー定義）
		// ----------------------------------------------------------------
		SKILL_ID_TUZYO_KOGEKI_CALC_KATAR_APPEND = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "x";
			this.kana = "ン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SPECIAL;

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData);
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;






		// ----------------------------------------------------------------
		// サーヴァントウェポン
		// ----------------------------------------------------------------
		SKILL_ID_SERVANT_WEAPON = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)サーヴァントウェポン";
			this.kana = "サアウアントウエホン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 210;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 60000;
			}



			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サーヴァントウェポン：サイン
		// ----------------------------------------------------------------
		SKILL_ID_SERVANT_WEAPON_SIGN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "サーヴァントウェポン：サイン";
			this.kana = "サアウアントウエホン　サイン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 60;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (500 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 800;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サーヴァントウェポン：ファントム
		// ----------------------------------------------------------------
		SKILL_ID_SERVANT_WEAPON_PHANTOM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)サーヴァントウェポン：ファントム";
			this.kana = "サアウアントウエホン　ファントム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 190;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000 + (200 * skillLv);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (1000 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}



			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サーヴァントウェポン：デモリッション
		// ----------------------------------------------------------------
		SKILL_ID_SERVANT_WEAPON_DEMOLISION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)サーヴァントウェポン：デモリッション";
			this.kana = "サアウアントウエホン　テモリツシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 190;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (1000 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return (500 * skillLv);
			}



			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// チャージングピアース
		// ----------------------------------------------------------------
		SKILL_ID_CHARGING_PIERCE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)チャージングピアース";
			this.kana = "チヤアシンクヒアアス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ツーハンドディフェンディング
		// ----------------------------------------------------------------
		SKILL_ID_TWOHAND_DEFENDING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)ツーハンドディフェンディング";
			this.kana = "ツウハントテイフエンテインク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ハックアンドスラッシャー
		// ----------------------------------------------------------------
		SKILL_ID_HACK_AND_SLASHER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)ハックアンドスラッシャー";
			this.kana = "ハツクアントスラツシヤア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SPECIAL;
			this.element = CSkillData.ELEMENT_VOID;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 190;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (100 + (200 * skillLv));
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (200 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ドラゴニックオーラ
		// ----------------------------------------------------------------
		SKILL_ID_DRAGONIC_AURA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ドラゴニックオーラ";
			this.kana = "トラコニツクオオラ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マッドネスクラッシャー
		// ----------------------------------------------------------------
		SKILL_ID_MADNESS_CRUSHER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)マッドネスクラッシャー";
			this.kana = "マツトネスクラツシヤア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 190;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (1100 + (200 * skillLv));
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (1000 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return (500 * skillLv);
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ヴィゴール
		// ----------------------------------------------------------------
		SKILL_ID_VIGOR = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ヴィゴール";
			this.kana = "ウイコオル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;


			// TODO: 現状、Lv6までしか確認不能（ジョブレベルキャップ）

			this.CostFixed = function(skillLv, charaDataManger) {
				return 320;
			}

			this.CostAP = function(skillLv, charaDataManger) {
				return (20 + 3 * skillLv);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ストームスラッシュ
		// ----------------------------------------------------------------
		SKILL_ID_STORM_SLASH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)ストームスラッシュ";
			this.kana = "ストオムスラツシユ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 110;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500 + (500 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}



			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;






		// ----------------------------------------------------------------
		// ダンシングナイフ
		// ----------------------------------------------------------------
		SKILL_ID_DANCING_KNIFE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ダンシングナイフ";
			this.kana = "タンシンクナイフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サベージインパクト
		// ----------------------------------------------------------------
		SKILL_ID_SAVAGE_IMPACT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "サベージインパクト";
			this.kana = "サヘエシインハクト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 210;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (500 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}



			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData) / 2;
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シャドウセンス
		// ----------------------------------------------------------------
		SKILL_ID_SHADOW_SENSE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "シャドウセンス";
			this.kana = "シヤトウセンス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エターナルスラッシュ
		// ----------------------------------------------------------------
		SKILL_ID_ETERNAL_SLASH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)エターナルスラッシュ";
			this.kana = "エタアナルスラツシユ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;



			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData) / 2;
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エンチャンティングシャドウ
		// ----------------------------------------------------------------
		SKILL_ID_ENCHANTING_SHADOW = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)エンチャンティングシャドウ";
			this.kana = "エンチヤンテインクシヤトウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 190;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (500 * (skillLv - 1));
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ポテントベナム
		// ----------------------------------------------------------------
		SKILL_ID_POTENT_VENOM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ポテントベナム";
			this.kana = "ホテントヘナム";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 190;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シャドウエクシード
		// ----------------------------------------------------------------
		SKILL_ID_SHADOW_EXCEED = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)シャドウエクシード";
			this.kana = "シヤトウエクシイト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フェイタルシャドウクロー
		// ----------------------------------------------------------------
		SKILL_ID_FATAL_SHADOW_CRAW = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)フェイタルシャドウクロー";
			this.kana = "フエイタルシヤトウクロオ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;



			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return 10000;
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シャドウスタブ
		// ----------------------------------------------------------------
		SKILL_ID_SHADOW_STAB = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)シャドウスタブ";
			this.kana = "シヤトウスタフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// インパクトクレーター
		// ----------------------------------------------------------------
		SKILL_ID_IMPACT_CRATER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "インパクトクレーター";
			this.kana = "インハクトクレエタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 210;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (1000 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return (500 * skillLv);
			}



			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData) / 2;
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;






		// ----------------------------------------------------------------
		// レパラティオ
		// ----------------------------------------------------------------
		SKILL_ID_REPARATIO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)レパラティオ";
			this.kana = "レハラテイオ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// メディアリボトゥム
		// ----------------------------------------------------------------
		SKILL_ID_MEDIA_REBOTUM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)メディアリボトゥム";
			this.kana = "メテイアリホトウム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 鈍器＆本修練
		// ----------------------------------------------------------------
		SKILL_ID_DONKI_HON_SHUREN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)鈍器＆本修練";
			this.kana = "トンキホンシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アルグトゥスヴィタ
		// ----------------------------------------------------------------
		SKILL_ID_ARUGUTUS_VITA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)アルグトゥスヴィタ";
			this.kana = "アルクトウスウイタ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アルグトゥステルム
		// ----------------------------------------------------------------
		SKILL_ID_ARUGUTUS_TERUM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)アルグトゥステルム";
			this.kana = "アルクトウステルム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アルビトリウム
		// ----------------------------------------------------------------
		SKILL_ID_ARBITRIUM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)アルビトリウム";
			this.kana = "アルヒトリウム";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// プレセンスアキエース
		// ----------------------------------------------------------------
		SKILL_ID_PRESENSE_AKYACE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)プレセンスアキエース";
			this.kana = "フレセンスアキエエス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フィドスアニムス
		// ----------------------------------------------------------------
		SKILL_ID_FIDOS_ANIMUS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)フィドスアニムス";
			this.kana = "フイトスアニムス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エフィリゴ
		// ----------------------------------------------------------------
		SKILL_ID_EFIRIGO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)エフィリゴ";
			this.kana = "エフイリコ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;



			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// コンペテンティア
		// ----------------------------------------------------------------
		SKILL_ID_CONPETENTIA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)コンペテンティア";
			this.kana = "コンヘテンテイア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ニューマティックプロセラ
		// ----------------------------------------------------------------
		SKILL_ID_NUMATIC_PROCERA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ニューマティックプロセラ";
			this.kana = "ニユウマテイツクフロセラ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ディレクティオヒール
		// ----------------------------------------------------------------
		SKILL_ID_DIRECTIO_HEAL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ディレクティオヒール";
			this.kana = "テイレクテイオヒイル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// レリギオ
		// ----------------------------------------------------------------
		SKILL_ID_RERIGIO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)レリギオ";
			this.kana = "レリキオ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ベネディクトゥム
		// ----------------------------------------------------------------
		SKILL_ID_BENEDICTUM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ベネディクトゥム";
			this.kana = "ヘネテイクトウム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ペティティオ
		// ----------------------------------------------------------------
		SKILL_ID_PETITIO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ペティティオ";
			this.kana = "ヘテイテイオ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;



			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ペティティオ習得レベル
		// ----------------------------------------------------------------
		SKILL_ID_PETITIO_LEARNED = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ペティティオ習得レベル";
			this.kana = "ヘテイテイオシユウトクレヘル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フレーメン
		// ----------------------------------------------------------------
		SKILL_ID_PHREMEN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)フレーメン";
			this.kana = "フレエメン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;
		};
		this.dataArray[skillId] = skillData;
		skillId++;





		// ----------------------------------------------------------------
		// アドバンスドトラップ
		// ----------------------------------------------------------------
		SKILL_ID_ADVANCED_TRAP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アドバンスドトラップ";
			this.kana = "アトハンストトラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ウィンドサイン
		// ----------------------------------------------------------------
		SKILL_ID_WIND_SIGN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ウィンドサイン";
			this.kana = "ウイントサイン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 自然親和
		// ----------------------------------------------------------------
		SKILL_ID_SHIZEN_SHINWA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)自然親和";
			this.kana = "シセンシンワ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ホークラッシュ
		// ----------------------------------------------------------------
		SKILL_ID_HAWK_RUSH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ホークラッシュ";
			this.kana = "ホオクラツシユ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 120;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (1000 * skillLv);;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}



			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 4;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ホークマスタリー
		// ----------------------------------------------------------------
		SKILL_ID_HAWK_MASTERY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ホークマスタリー";
			this.kana = "ホオクマスタリイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 190;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// カラミティゲイル
		// ----------------------------------------------------------------
		SKILL_ID_CALAMITY_GALE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)カラミティゲイル";
			this.kana = "カラミテイケイル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ホークブーメラン
		// ----------------------------------------------------------------
		SKILL_ID_HAWK_BOOMERANG = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ホークブーメラン";
			this.kana = "ホオクフウメラン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 170;
			}

			this.CostAP = function(skillLv, charaDataManger) {
				return 5;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (1000 * skillLv);;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}



			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) * 1.25;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ゲイルストーム
		// ----------------------------------------------------------------
		SKILL_ID_GALE_STORM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ゲイルストーム";
			this.kana = "ケイルストオム";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 120;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (100 + (200 * skillLv));
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (500 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				if (UsedSkillSearch(SKILL_ID_CALAMITY_GALE) > 0) {
					return this._CriActRate100(skillLv, charaData, specData, mobData);
				} else {
					return 0;
				}
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				if (UsedSkillSearch(SKILL_ID_CALAMITY_GALE) > 0) {
					return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
				} else {
					return 0;
				}
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ディープブラインドトラップ
		// ----------------------------------------------------------------
		SKILL_ID_DEEP_BLIND_TRAP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ディープブラインドトラップ";
			this.kana = "テイイフフライントトラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_DARK;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 250;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (300 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return [0, 60000, 30700, 15100, 8500, 6100][skillLv];
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ソリッドトラップ
		// ----------------------------------------------------------------
		SKILL_ID_SOLID_TRAP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ソリッドトラップ";
			this.kana = "ソリツトトラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 180;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (300 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return [0, 60000, 30700, 15100, 8500, 6100][skillLv];
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スイフトトラップ
		// ----------------------------------------------------------------
		SKILL_ID_SWIFT_TRAP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スイフトトラップ";
			this.kana = "スイフトトラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_WIND;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 210;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (300 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return [0, 60000, 30700, 15100, 8500, 6100][skillLv];
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クレッシブボルト
		// ----------------------------------------------------------------
		SKILL_ID_CRESSIVE_VOLT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)クレッシブボルト";
			this.kana = "クレツシフホルト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 120;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (100 + (200 * skillLv));
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (500 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}



			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フレイムトラップ
		// ----------------------------------------------------------------
		SKILL_ID_FLAME_TRAP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "フレイムトラップ";
			this.kana = "フレイムトラツフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 210;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (300 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return [0, 60000, 30700, 15100, 8500, 6100][skillLv];
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;





		// ----------------------------------------------------------------
		// デッドリープロジェクション
		// ----------------------------------------------------------------
		SKILL_ID_DEADLY_PROJECTION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)デッドリープロジェクション";
			this.kana = "テツトリイフロシエクシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_UNDEAD;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ディストラクティブハリケーン
		// ----------------------------------------------------------------
		SKILL_ID_DESTRACTIVE_HURRICANE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ディストラクティブハリケーン";
			this.kana = "テイストラクテイフハリケエン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クライマックスハリケーン状態
		// ----------------------------------------------------------------
		SKILL_ID_CLIMAX_HURRICANE_STATE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "クライマックスハリケーン状態";
			this.kana = "クライマツクスハリケエンシヨウタイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// レインオブクリスタル
		// ----------------------------------------------------------------
		SKILL_ID_RAIN_OF_CRYSTAL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)レインオブクリスタル";
			this.kana = "レインオフクリスタル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ミステリーイリュージョン
		// ----------------------------------------------------------------
		SKILL_ID_MYSTERY_ILLUSION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ミステリーイリュージョン";
			this.kana = "ミステリイイリユウシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_DARK;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// バイオレントクエイク
		// ----------------------------------------------------------------
		SKILL_ID_VIOLENT_QUAKE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)バイオレントクエイク";
			this.kana = "ハイオレントクエイク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ソウルバルカンストライク
		// ----------------------------------------------------------------
		SKILL_ID_SOUL_VULKUN_STRIKE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ソウルバルカンストライク";
			this.kana = "ソウルハルカンストライク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_PSYCO;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ストラタムトレマー
		// ----------------------------------------------------------------
		SKILL_ID_STRATUM_TREAMER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ストラタムトレマー";
			this.kana = "ストラタムトレマア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// オールブルーム
		// ----------------------------------------------------------------
		SKILL_ID_ALL_BLOOM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)オールブルーム";
			this.kana = "オオルフルウム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クリスタルインパクト
		// ----------------------------------------------------------------
		SKILL_ID_CRYSTAL_IMPACT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)クリスタルインパクト";
			this.kana = "クリスタルインハクト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// トルネードストーム
		// ----------------------------------------------------------------
		SKILL_ID_TORNADE_STORM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)トルネードストーム";
			this.kana = "トルネエトストオム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フローラルフレアロード
		// ----------------------------------------------------------------
		SKILL_ID_FLORAL_FLARE_ROAD = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)フローラルフレアロード";
			this.kana = "フロオラルフレアロオト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クライマックス
		// ----------------------------------------------------------------
		SKILL_ID_CLIMAX = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)クライマックス";
			this.kana = "クライマツクス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アストラルストライク
		// ----------------------------------------------------------------
		SKILL_ID_ASTRAL_STRIKE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)アストラルストライク";
			this.kana = "アストラルストライク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ロックダウン
		// ----------------------------------------------------------------
		SKILL_ID_ROCK_DOWN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ロックダウン";
			this.kana = "ロツクタウン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ストームキャノン
		// ----------------------------------------------------------------
		SKILL_ID_STORM_CANNON = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ストームキャノン";
			this.kana = "ストオムキヤノン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クリムゾンアロー
		// ----------------------------------------------------------------
		SKILL_ID_CRYMSON_ARROW = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)クリムゾンアロー";
			this.kana = "クリムソンアロオ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フローズンスラッシュ
		// ----------------------------------------------------------------
		SKILL_ID_FROZEN_SLASH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)フローズンスラッシュ";
			this.kana = "フロオスンスラツシユ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 両手杖修練
		// ----------------------------------------------------------------
		SKILL_ID_RYOTETUSE_SHUREN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "両手杖修練";
			this.kana = "リヨウテツエシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;





		// ----------------------------------------------------------------
		// アックスストンプ
		// ----------------------------------------------------------------
		SKILL_ID_AXE_STOMP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アックスストンプ";
			this.kana = "アツクスストンフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 300;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500 * skillLv;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ラッシュクエイク
		// ----------------------------------------------------------------
		SKILL_ID_RUSH_QUAKE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ラッシュクエイク";
			this.kana = "ラツシユクエイク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 440;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}			
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ラッシュ状態
		// ----------------------------------------------------------------
		SKILL_ID_RUSH_STATE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ラッシュ状態";
			this.kana = "ラツシユシヨウタイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 装置製造
		// ----------------------------------------------------------------
		SKILL_ID_SOCHI_SEIZO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)装置製造";
			this.kana = "ソウチセイソウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 攻撃装置有効化
		// ----------------------------------------------------------------
		SKILL_ID_KOGEKI_SOCHI_YUKOKA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)攻撃装置有効化";
			this.kana = "コウケキソウチユウコウカ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 防御装置有効化
		// ----------------------------------------------------------------
		SKILL_ID_BOGYO_SOCHI_YUKOKA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)防御装置有効化";
			this.kana = "コウケキソウチユウコウカ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ツーアックスディフェンディング
		// ----------------------------------------------------------------
		SKILL_ID_TWO_AXE_DEFENDING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)ツーアックスディフェンディング";
			this.kana = "ツウアツクステイフエンテインク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ABRマスタリー
		// ----------------------------------------------------------------
		SKILL_ID_ABR_MASTERY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ABRマスタリー";
			this.kana = "エイヒイアアルマスタリイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ABR バトルウォリアー
		// ----------------------------------------------------------------
		SKILL_ID_ABR_BATTLE_WARRIER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ABR バトルウォリアー";
			this.kana = "エイヒイアアル　ハトルウオリアア";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ABR デュアルキャノン
		// ----------------------------------------------------------------
		SKILL_ID_ABR_DUAL_CANNON = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ABR デュアルキャノン";
			this.kana = "エイヒイアアル　テユアルキヤノン";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ABR マザーネット
		// ----------------------------------------------------------------
		SKILL_ID_ABR_MOTHER_NET = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ABR マザーネット";
			this.kana = "エイヒイアアル　マサアネツト";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ABR インフィニティ
		// ----------------------------------------------------------------
		SKILL_ID_ABR_INFINITY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ABR インフィニティ";
			this.kana = "エイヒイアアル　インフイニテイ";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;





		// ----------------------------------------------------------------
		// ガードスタンス
		// ----------------------------------------------------------------
		SKILL_ID_GUARD_STANCE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ガードスタンス";
			this.kana = "カアトスタンス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ガーディアンシールド
		// ----------------------------------------------------------------
		SKILL_ID_GUARDIAN_SHIELD = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ガーディアンシールド";
			this.kana = "カアテイアンシイルト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// リバウンドシールド
		// ----------------------------------------------------------------
		SKILL_ID_REBOUND_SHIELD = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)リバウンドシールド";
			this.kana = "リハウントシイルト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 盾修練
		// ----------------------------------------------------------------
		SKILL_ID_TATE_SHUREN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "盾修練";
			this.kana = "タテシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 槍＆片手剣修練
		// ----------------------------------------------------------------
		SKILL_ID_YARI_KATATE_KEN_SHUREN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "槍＆片手剣修練";
			this.kana = "ヤリカタテケンシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アタックスタンス
		// ----------------------------------------------------------------
		SKILL_ID_ATTACK_STANCE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)アタックスタンス";
			this.kana = "アタツクスタンス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アルティメットサクリファイス
		// ----------------------------------------------------------------
		SKILL_ID_ULTIMATE_SACRIFICE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)アルティメットサクリファイス";
			this.kana = "アルテイメツトサクリフアイス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ホーリーシールド
		// ----------------------------------------------------------------
		SKILL_ID_HOLY_SHIELD = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ホーリーシールド";
			this.kana = "ホオリイシイルト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// グランドジャッジメント
		// ----------------------------------------------------------------
		SKILL_ID_GRAND_JUDGEMENT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)グランドジャッジメント";
			this.kana = "クラントシヤツシメント";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ジャッジメントクロス
		// ----------------------------------------------------------------
		SKILL_ID_JUDGEMENT_CROSS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ジャッジメントクロス";
			this.kana = "シヤツシメントクロス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// シールドシューティング
		// ----------------------------------------------------------------
		SKILL_ID_SHIELD_SHOOTING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)シールドシューティング";
			this.kana = "シイルトシユウテインク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// オーバースラッシュ
		// ----------------------------------------------------------------
		SKILL_ID_OVER_SLASH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)オーバースラッシュ";
			this.kana = "オオハアスラツシユ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クロスレイン
		// ----------------------------------------------------------------
		SKILL_ID_CROSS_RAIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)クロスレイン";
			this.kana = "クロスレイン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_HOLY;
		};
		this.dataArray[skillId] = skillData;
		skillId++;





		// ----------------------------------------------------------------
		// 短剣＆弓修練
		// ----------------------------------------------------------------
		SKILL_ID_TANKEN_YUMI_SHUREN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "短剣＆弓修練";
			this.kana = "タンケンユミシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 魔法剣修練
		// ----------------------------------------------------------------
		SKILL_ID_MAHOKEN_SHUREN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "魔法剣修練";
			this.kana = "マホウケンシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ストリップシャドウ
		// ----------------------------------------------------------------
		SKILL_ID_STRIP_SHADOW = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ストリップシャドウ";
			this.kana = "ストリツフシヤトウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アビスダガー
		// ----------------------------------------------------------------
		SKILL_ID_ABYSS_DAGGER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)アビスダガー";
			this.kana = "アヒスタカア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アンラッキーラッシュ
		// ----------------------------------------------------------------
		SKILL_ID_UNLUCKY_RUSH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)アンラッキーラッシュ";
			this.kana = "アンラツキイラツシユ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// チェーンリアクションショット
		// ----------------------------------------------------------------
		SKILL_ID_CHAIN_REACTION_SHOT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)チェーンリアクションショット";
			this.kana = "チエエンリアクシヨンショヨツト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フロムジアビス
		// ----------------------------------------------------------------
		SKILL_ID_FROM_THE_ABYSS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)フロムジアビス";
			this.kana = "フロムシアヒス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アビススレイヤー
		// ----------------------------------------------------------------
		SKILL_ID_ABYSS_SLAYER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)アビススレイヤー";
			this.kana = "アヒススレイヤア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// オメガアビスストライク
		// ----------------------------------------------------------------
		SKILL_ID_OMEGA_ABYSS_STRIKE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)オメガアビスストライク";
			this.kana = "オメカアヒスストライク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// デフトスタブ
		// ----------------------------------------------------------------
		SKILL_ID_DEFT_STAB = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)デフトスタブ";
			this.kana = "テフトスタフ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アビススクエア
		// ----------------------------------------------------------------
		SKILL_ID_ABYSS_SQUARE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)アビススクエア";
			this.kana = "アヒススクエア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アビススクエア習得Lv
		// ----------------------------------------------------------------
		SKILL_ID_ABYSS_SQUARE_LEARNED_LEVEL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アビススクエア習得Lv";
			this.kana = "アヒススクエアシユウトクレヘル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フレンジショット
		// ----------------------------------------------------------------
		SKILL_ID_FLANGE_SHOT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)フレンジショット";
			this.kana = "フレンシシヨツト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;



			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;





		// ----------------------------------------------------------------
		// 強靭な信念
		// ----------------------------------------------------------------
		SKILL_ID_KYOZINNA_SHINNEN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "強靭な信念";
			this.kana = "キヨウシンナシンネン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 堅固な信念
		// ----------------------------------------------------------------
		SKILL_ID_KENKONA_SHINNEN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "堅固な信念";
			this.kana = "ケンコナシンネン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 信仰の意志
		// ----------------------------------------------------------------
		SKILL_ID_SHINKONO_ISHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "信仰の意志";
			this.kana = "シンコウノイシ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 聖油洗礼
		// ----------------------------------------------------------------
		SKILL_ID_SEYU_SENRE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)聖油洗礼";
			this.kana = "セイユセンレイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 忠実な信念
		// ----------------------------------------------------------------
		SKILL_ID_CHUZITSUNA_SHINNEN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "忠実な信念";
			this.kana = "チユウシツナシンネン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 第一撃：烙印
		// ----------------------------------------------------------------
		SKILL_ID_DAIICHIGEKI_RAKUIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)第一撃：烙印";
			this.kana = "タイ１ケキ　ラクイン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 第一章：信念の力
		// ----------------------------------------------------------------
		SKILL_ID_DAIISSHO_SHINNENNO_CHIKARA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "第一章：信念の力";
			this.kana = "タイ１シヨウ　シンネンノチカラ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 第三撃：断罪
		// ----------------------------------------------------------------
		SKILL_ID_DAISANGEKI_DANZAI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)第三撃：断罪";
			this.kana = "タイ３ケキ　タンサイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;



			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 第三撃：滅火撃
		// ----------------------------------------------------------------
		SKILL_ID_DAISANGEKI_MEKKAGEKI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)第三撃：滅火撃";
			this.kana = "タイ３ケキ　メツカケキ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 第三撃：浄化
		// ----------------------------------------------------------------
		SKILL_ID_DAISANGEKI_ZYOKA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)第三撃：浄化";
			this.kana = "タイ３ケキ　シヨウカ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 第二撃：滅魔の火
		// ----------------------------------------------------------------
		SKILL_ID_DAINIGEKI_METSUMANO_HI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)第二撃：滅魔の火";
			this.kana = "タイ２ケキ　メツマノヒ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 第二撃：信念
		// ----------------------------------------------------------------
		SKILL_ID_DAINIGEKI_SHINNEN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)第二撃：信念";
			this.kana = "タイ２ケキ　シンネン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 第二撃：審判
		// ----------------------------------------------------------------
		SKILL_ID_DAINIGEKI_SHINPAN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)第二撃：審判";
			this.kana = "タイ２ケキ　シンハン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 爆火神弾
		// ----------------------------------------------------------------
		SKILL_ID_BAKKA_SHINDAN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)爆火神弾";
			this.kana = "ハツカシンタン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;



			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 炎火滅魔神弾
		// ----------------------------------------------------------------
		SKILL_ID_ENKA_METSUMA_SHINDAN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)炎火滅魔神弾";
			this.kana = "エンカメツマシンタン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;



			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 第二章：審判者
		// ----------------------------------------------------------------
		SKILL_ID_DAINISHO_SHIPANSHA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "第二章：審判者";
			this.kana = "タイ２シヨウ　シンハンシヤ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 最終章：滅魔の炎
		// ----------------------------------------------------------------
		SKILL_ID_SAISHUSHO_METSUMANO_HONO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "最終章：滅魔の炎";
			this.kana = "サイシユウシヨウ　メツマノホノオ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;





		// ----------------------------------------------------------------
		// ステージマナー
		// ----------------------------------------------------------------
		SKILL_ID_STAGE_MANNER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ステージマナー";
			this.kana = "ステエシマナア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 回想
		// ----------------------------------------------------------------
		SKILL_ID_KAISO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "回想";
			this.kana = "カイソウ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ミスティックシンフォニー
		// ----------------------------------------------------------------
		SKILL_ID_MYSTIC_SYMPHONY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ミスティックシンフォニー";
			this.kana = "ミステイツクシンフオニイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ソナタオブクヴァシル
		// ----------------------------------------------------------------
		SKILL_ID_SONATA_OF_KUVASIL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ソナタオブクヴァシル";
			this.kana = "ソナタオフクウアシル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ロゼブロッサム
		// ----------------------------------------------------------------
		SKILL_ID_ROSE_BLOSSOM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ロゼブロッサム";
			this.kana = "ロセフロツサム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// リズムシューティング
		// ----------------------------------------------------------------
		SKILL_ID_RHYTHM_SHOOTING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)リズムシューティング";
			this.kana = "リスムシユウテインク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// メタリックフューリー
		// ----------------------------------------------------------------
		SKILL_ID_METALIC_FURY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)メタリックフューリー";
			this.kana = "メタリツクフユウリイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サウンドブレンド
		// ----------------------------------------------------------------
		SKILL_ID_SOUND_BLEND = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)サウンドブレンド";
			this.kana = "サウントフレント";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ゲフェニアノクターン
		// ----------------------------------------------------------------
		SKILL_ID_GEFFENIA_NOCTURNE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ゲフェニアノクターン";
			this.kana = "ケフエニアノクタアン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ロキの気まぐれ
		// ----------------------------------------------------------------
		SKILL_ID_LOKINO_KIMAGURE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ロキの気まぐれ";
			this.kana = "ロキノキマクレ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 鉱員のラプソディ
		// ----------------------------------------------------------------
		SKILL_ID_KOINNO_RHAPSODY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)鉱員のラプソディ";
			this.kana = "コウインノラフソテイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ミュージカルインタールード
		// ----------------------------------------------------------------
		SKILL_ID_MUSICAL_INTERLUDE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ミュージカルインタールード";
			this.kana = "ミユウシカルインタアルウト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 夕焼けのセレナーデ
		// ----------------------------------------------------------------
		SKILL_ID_YUYAKENO_SERENADE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)夕焼けのセレナーデ";
			this.kana = "ユウヤケノセレナアテ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 死者たちへのレクイエム
		// ----------------------------------------------------------------
		SKILL_ID_SHISHATACHIHENO_REQUIEM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)死者たちへのレクイエム";
			this.kana = "シシヤタチヘノレクイエム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// プロンテラマーチ
		// ----------------------------------------------------------------
		SKILL_ID_PRONTERA_MARCH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)プロンテラマーチ";
			this.kana = "フロンテラマアチ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;





		// ----------------------------------------------------------------
		// 魔法本修練
		// ----------------------------------------------------------------
		SKILL_ID_MAHO_HON_SHUREN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "魔法本修練";
			this.kana = "マホウホンシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スペルエンチャンティング
		// ----------------------------------------------------------------
		SKILL_ID_SPELL_ENCHANTING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)スペルエンチャンティング";
			this.kana = "スヘルエンチヤンテインク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 170;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アクティビティバーン
		// ----------------------------------------------------------------
		SKILL_ID_ACTIVITY_BURN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "アクティビティバーン";
			this.kana = "アクテイヒテイハアン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 170;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500 + (200 * skillLv);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// インクリーシングアクティビティ
		// ----------------------------------------------------------------
		SKILL_ID_INCREASING_ACTIVITY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "インクリーシングアクティビティ";
			this.kana = "インクリイシンクアクテイヒテイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 250;
			}

			this.CostAP = function(skillLv, charaDataManger) {
				return (50 + (10 * skillLv));
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ダイヤモンドストーム
		// ----------------------------------------------------------------
		SKILL_ID_DIAMOND_STORM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ダイヤモンドストーム";
			this.kana = "タイヤモントストオム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 400;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (5500 + (800 * skillLv));
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ライトニングランド
		// ----------------------------------------------------------------
		SKILL_ID_LIGHTNING_LAND = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ライトニングランド";
			this.kana = "ライトニンクラント";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 440;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (5500 + (800 * skillLv));
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (500 + (200 * skillLv));
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ベナムスワンプ
		// ----------------------------------------------------------------
		SKILL_ID_VENOM_SWAMP = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ベナムスワンプ";
			this.kana = "ヘナムスワンフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_POISON;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 350;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (5500 + (800 * skillLv));
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (500 + (200 * skillLv));
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// コンフラグレーション
		// ----------------------------------------------------------------
		SKILL_ID_CONFLAGRATION = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "コンフラグレーション";
			this.kana = "コンフラクレエシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 440;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (5500 + (800 * skillLv));
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (500 + (200 * skillLv));
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// テラドライブ
		// ----------------------------------------------------------------
		SKILL_ID_TERA_DRIVE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "テラドライブ";
			this.kana = "テラトライフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 400;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (5500 + (800 * skillLv));
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エレメンタルスピリットマスタリー
		// ----------------------------------------------------------------
		SKILL_ID_ELEMENTAL_SPIRIT_MASTERY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)エレメンタルスピリットマスタリー";
			this.kana = "エレメンタルスヒリツトマスタリイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サモンアルドール
		// ----------------------------------------------------------------
		SKILL_ID_SUMMON_ALDOR = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)サモンアルドール";
			this.kana = "サモンアルトオル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 330;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サモンディルビオ
		// ----------------------------------------------------------------
		SKILL_ID_SUMMON_DILBIO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)サモンディルビオ";
			this.kana = "サモンテイルヒオ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 300;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サモンプロセラ
		// ----------------------------------------------------------------
		SKILL_ID_SUMMON_PROCERA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)サモンプロセラ";
			this.kana = "サモンフロセラ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 330;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サモンテレモトゥス
		// ----------------------------------------------------------------
		SKILL_ID_SUMMON_TELEMOTUS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)サモンテレモトゥス";
			this.kana = "サモンテレモトウス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 300;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サモンサーペンス
		// ----------------------------------------------------------------
		SKILL_ID_SUMMON_SERPENSE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)サモンサーペンス";
			this.kana = "サモンサアヘンス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 260;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エレメンタルバスター
		// ----------------------------------------------------------------
		SKILL_ID_ELEMENTAL_BASTER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エレメンタルバスター";
			this.kana = "エレメンタルハスタア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_SPECIAL;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 530;
			}

			this.CostAP = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エレメンタルヴェール
		// ----------------------------------------------------------------
		SKILL_ID_ELEMENTAL_VEIL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "エレメンタルヴェール";
			this.kana = "エレメンタルウエエル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;



			this.CostFixed = function(skillLv, charaDataManger) {
				return 330;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (500 * skillLv);
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 10000;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;





		// ----------------------------------------------------------------
		// バイオニックファーマシー
		// ----------------------------------------------------------------
		SKILL_ID_BIONIC_PHARMACY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)バイオニックファーマシー";
			this.kana = "ハイオニツクフアアマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// バイオニックスマスタリー
		// ----------------------------------------------------------------
		SKILL_ID_BIONICS_MASTERY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)バイオニックスマスタリー";
			this.kana = "ハイオニツクマスタリイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ホールフルケミカルチャージ
		// ----------------------------------------------------------------
		SKILL_ID_HALL_FULL_CHEMICAL_CHARGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ホールフルケミカルチャージ";
			this.kana = "ホオルフルケミカルチヤアシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// フルシャドウチャージ
		// ----------------------------------------------------------------
		SKILL_ID_FULL_SHADOW_CHARGE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)フルシャドウチャージ";
			this.kana = "フルシヤトウチヤアシ";
			this.maxLv = 4;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アシディファイドゾーン(水)
		// ----------------------------------------------------------------
		SKILL_ID_ACIDIFIED_ZONE_MIZU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)アシディファイドゾーン(水)";
			this.kana = "アシテイフアイトソオン　ミス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SPECIAL;
			this.element = CSkillData.ELEMENT_FORCE_WATER;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アシディファイドゾーン(地)
		// ----------------------------------------------------------------
		SKILL_ID_ACIDIFIED_ZONE_CHI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)アシディファイドゾーン(地)";
			this.kana = "アシテイフアイトソオン　チ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SPECIAL;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アシディファイドゾーン(火)
		// ----------------------------------------------------------------
		SKILL_ID_ACIDIFIED_ZONE_HI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)アシディファイドゾーン(火)";
			this.kana = "アシテイフアイトソオン　ヒ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SPECIAL;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// アシディファイドゾーン(風)
		// ----------------------------------------------------------------
		SKILL_ID_ACIDIFIED_ZONE_KAZE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)アシディファイドゾーン(風)";
			this.kana = "アシテイフアイトソオン　カセ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SPECIAL;
			this.element = CSkillData.ELEMENT_FORCE_WIND;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クリエイトウドゥンウォリアー
		// ----------------------------------------------------------------
		SKILL_ID_CREATE_WOODEN_WARRIER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)クリエイトウドゥンウォリアー";
			this.kana = "クリエイトウトウンウオリアア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クリエイトウドゥンフェアリー
		// ----------------------------------------------------------------
		SKILL_ID_CREATE_WOODEN_FAIRY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)クリエイトウドゥンフェアリー";
			this.kana = "クリエイトウトウンフエアリイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クリエイトクリーパー
		// ----------------------------------------------------------------
		SKILL_ID_CREATE_CREAPER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)クリエイトクリーパー";
			this.kana = "クリエイトクリイハア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// リサーチレポート
		// ----------------------------------------------------------------
		SKILL_ID_RESEARCH_REPORT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)リサーチレポート";
			this.kana = "リサアチレホオト";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// クリエイトヘルツリー
		// ----------------------------------------------------------------
		SKILL_ID_CREATE_HELL_TREE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)クリエイトヘルツリー";
			this.kana = "クリエイトヘルツリイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;





		// ----------------------------------------------------------------
		// ドラゴニックオーラ状態
		// ----------------------------------------------------------------
		SKILL_ID_DRAGONIC_AURA_STATE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)ドラゴニックオーラ状態";	// TODO: ドラゴンブレスのダメージ増加が未実測
			this.kana = "トラコニツクオオラシヨウタイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;





		// ----------------------------------------------------------------
		// 天気修練
		// ----------------------------------------------------------------
		SKILL_ID_TENKI_SHUREN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "天気修練";
			this.kana = "テンキシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 兵法修練
		// ----------------------------------------------------------------
		SKILL_ID_HYOHO_SHUREN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "兵法修練";
			this.kana = "ヒヨウホウシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 天地一陽
		// ----------------------------------------------------------------
		SKILL_ID_TENCHI_ICHIYO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)天地一陽";
			this.kana = "テンチイチヨウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 太天一陽
		// ----------------------------------------------------------------
		SKILL_ID_TAITEN_ICHIYO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)太天一陽";
			this.kana = "タイテンイチヨウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CriActRate = (skillLv, charaData, specData, mobData) => {

				// 正午、天気の身状態の場合のみ
				if (UsedSkillSearch(SKILL_ID_UNKONO_ZYOTAI) == 2) {
				}
				else if (UsedSkillSearch(SKILL_ID_TENKINO_MI) >= 1) {
				}
				else {
					return 0;
				}

				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {

				// 正午、天気の身状態の場合のみ
				if (UsedSkillSearch(SKILL_ID_UNKONO_ZYOTAI) == 2) {
				}
				else if (UsedSkillSearch(SKILL_ID_TENKINO_MI) >= 1) {
				}
				else {
					return 0;
				}

				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 天陽
		// ----------------------------------------------------------------
		SKILL_ID_TENYO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)天陽";
			this.kana = "テンヨウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CriActRate = (skillLv, charaData, specData, mobData) => {

				// 日没、天気の身状態の場合のみ
				if (UsedSkillSearch(SKILL_ID_UNKONO_ZYOTAI) == 3) {
				}
				else if (UsedSkillSearch(SKILL_ID_TENKINO_MI) >= 1) {
				}
				else {
					return 0;
				}

				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {

				// 日没、天気の身状態の場合のみ
				if (UsedSkillSearch(SKILL_ID_UNKONO_ZYOTAI) == 3) {
				}
				else if (UsedSkillSearch(SKILL_ID_TENKINO_MI) >= 1) {
				}
				else {
					return 0;
				}

				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 天地一月
		// ----------------------------------------------------------------
		SKILL_ID_TENCHI_ICHIGETSU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)天地一月";
			this.kana = "テンチイチケツ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 太天一月
		// ----------------------------------------------------------------
		SKILL_ID_TAITEN_ICHIGETSU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)太天一月";
			this.kana = "タイテンイチケツ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 天月
		// ----------------------------------------------------------------
		SKILL_ID_TENGETSU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)天月";
			this.kana = "テンケツ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 天地万星
		// ----------------------------------------------------------------
		SKILL_ID_TENCHI_BANSE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)天地万星";
			this.kana = "テンチバンセイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 天命落星
		// ----------------------------------------------------------------
		SKILL_ID_TENME_RAKUSE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)天命落星";
			this.kana = "テンメイラクセイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 天星
		// ----------------------------------------------------------------
		SKILL_ID_TENSE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)天星";
			this.kana = "テンセイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 天羅万象
		// ----------------------------------------------------------------
		SKILL_ID_TENRA_BANSHO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)天羅万象";
			this.kana = "テンラハンシヨウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 天気の身
		// ----------------------------------------------------------------
		SKILL_ID_TENKINO_MI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)天気の身";
			this.kana = "テンキノミ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 運行の状態
		// ----------------------------------------------------------------
		SKILL_ID_UNKONO_ZYOTAI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)運行の状態";
			this.kana = "ウンコウノシヨウタイ";
			this.maxLv = 6;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;





		// ----------------------------------------------------------------
		// 護符修練
		// ----------------------------------------------------------------
		SKILL_ID_GOFU_SHUREN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "護符修練";
			this.kana = "コフシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 霊道術修練
		// ----------------------------------------------------------------
		SKILL_ID_REIDOZYUTSU_SHUREN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "霊道術修練";
			this.kana = "レイトウシユツシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 守護符
		// ----------------------------------------------------------------
		SKILL_ID_SHUGO_FU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)守護符";
			this.kana = "シユコフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 武士符
		// ----------------------------------------------------------------
		SKILL_ID_BUSHI_FU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "武士符";
			this.kana = "フシフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 法師符
		// ----------------------------------------------------------------
		SKILL_ID_HOSHI_FU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "法師符";
			this.kana = "ホウシフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 護魂一身
		// ----------------------------------------------------------------
		SKILL_ID_GOKON_ISSHIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "護魂一身";
			this.kana = "ココンイツシン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 城隍堂
		// ----------------------------------------------------------------
		SKILL_ID_ZYOKODO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)城隍堂";
			this.kana = "シヨウコウトウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 五行符
		// ----------------------------------------------------------------
		SKILL_ID_GOGYO_FU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "五行符";
			this.kana = "コキヨウフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 霊道符
		// ----------------------------------------------------------------
		SKILL_ID_REIDO_FU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)霊道符";
			this.kana = "レイトウフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 死霊浄化
		// ----------------------------------------------------------------
		SKILL_ID_SHIRYO_ZYOKA = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)死霊浄化";
			this.kana = "シリヨウシヨウカ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 青龍符
		// ----------------------------------------------------------------
		SKILL_ID_SEIRYU_FU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)青龍符";
			this.kana = "セイリユウフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 白虎符
		// ----------------------------------------------------------------
		SKILL_ID_BYAKKO_FU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)白虎符";
			this.kana = "ヒヤツコフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 朱雀符
		// ----------------------------------------------------------------
		SKILL_ID_SUZAKU_FU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)朱雀符";
			this.kana = "スサクフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 玄武符
		// ----------------------------------------------------------------
		SKILL_ID_SEIRYU_FU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)玄武符";
			this.kana = "ケンフフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 四方神符
		// ----------------------------------------------------------------
		SKILL_ID_SHIHOZIN_FU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)四方神符";
			this.kana = "シホウシンフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 四方五行陣
		// ----------------------------------------------------------------
		SKILL_ID_SHIHO_GOGYO_ZIN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)四方五行陣";
			this.kana = "シホウコキヨウシン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 天地神霊
		// ----------------------------------------------------------------
		SKILL_ID_TENCHI_SHINRE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "天地神霊";
			this.kana = "テンチシンレイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 四方五行陣状態
		// ----------------------------------------------------------------
		SKILL_ID_SHIHO_FU_ZYOTAI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "四方符状態";
			this.kana = "シホウフシヨウタイ";
			this.maxLv = 6;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スピリットマスタリー
		// ----------------------------------------------------------------
		SKILL_ID_SPIRIT_MASTERY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スピリットマスタリー";
			this.kana = "スヒリツトマスタリイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 三霊一体
		// ----------------------------------------------------------------
		SKILL_ID_SANREI_ITTAI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "三霊一体";
			this.kana = "サンレイイツタイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// にゃんブレッシング
		// ----------------------------------------------------------------
		SKILL_ID_NYAN_BRESSING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "にゃんブレッシング";
			this.kana = "ニヤンフレツシンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マリンフェスティバル
		// ----------------------------------------------------------------
		SKILL_ID_MARIN_FESTIVAL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マリンフェスティバル";
			this.kana = "マリンフエステイハル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// サンドフェスティバル
		// ----------------------------------------------------------------
		SKILL_ID_SAND_FESTIVAL = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "サンドフェスティバル";
			this.kana = "サントフエステイハル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 独学 -戦闘学-
		// ----------------------------------------------------------------
		SKILL_ID_DOKUGAKU_SENTOGAKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "独学 -戦闘学-";
			this.kana = "トクカクセントウカク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 独学 -魔導学-
		// ----------------------------------------------------------------
		SKILL_ID_DOKUGAKU_MADOGAKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "独学 -魔導学-";
			this.kana = "トクカクマトウカク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// P.F.I
		// ----------------------------------------------------------------
		SKILL_ID_PFI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "P.F.I";
			this.kana = "ヒイエフアイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// グレネードマスタリー
		// ----------------------------------------------------------------
		SKILL_ID_GRENADE_MASTERY = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "グレネードマスタリー";
			this.kana = "クレネエトマスタリイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// インテンシブエイム
		// ----------------------------------------------------------------
		SKILL_ID_INTENSIVE_AIM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "インテンシブエイム";
			this.kana = "インテンシフエイム";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ヒドゥンカード
		// ----------------------------------------------------------------
		SKILL_ID_HIDDEN_CARD = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ヒドゥンカード";
			this.kana = "ヒトウンカアト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// オンリーワンバレット
		// ----------------------------------------------------------------
		SKILL_ID_ONLY_ONE_BULLET = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "オンリーワンバレット";
			this.kana = "オンリイワンハレツト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スパイラルシューティング
		// ----------------------------------------------------------------
		SKILL_ID_SPIRAL_SHOOTING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スパイラルシューティング";
			this.kana = "スハイラルシユウテインク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マガジンフォーワン
		// ----------------------------------------------------------------
		SKILL_ID_MAGAZIN_FOR_ONE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マガジンフォーワン";
			this.kana = "マカシンフオオワン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ビジラントアットナイト
		// ----------------------------------------------------------------
		SKILL_ID_VIGILANT_AT_NIGHT = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ビジラントアットナイト";
			this.kana = "ヒシラントアツトナイト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ワイルドファイア
		// ----------------------------------------------------------------
		SKILL_ID_WILD_FIRE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "ワイルドファイア";
			this.kana = "ワイルトフアイア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// タイガースラッシュ
		// ----------------------------------------------------------------
		SKILL_ID_TIGER_SLASH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)タイガースラッシュ";
			this.kana = "タイカアスラツシユ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// タイガーハウリング
		// ----------------------------------------------------------------
		SKILL_ID_TIGER_HOWLING = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)タイガーハウリング";
			this.kana = "タイカアハウリンク";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// タイガーストライク
		// ----------------------------------------------------------------
		SKILL_ID_TIGER_STRIKE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)タイガーストライク";
			this.kana = "タイカアストライク";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// にゃん友 -鉄虎-
		// ----------------------------------------------------------------
		SKILL_ID_NYANTOMO_TEKKO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "にゃん友 -鉄虎-";
			this.kana = "ニヤントモテツコ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 影の舞
		// ----------------------------------------------------------------
		SKILL_ID_KAGE_NO_MAI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)影の舞";
			this.kana = "カケノマイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			/*
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (0 * skillLv);
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
			*/
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 影一閃
		// ----------------------------------------------------------------
		SKILL_ID_KAGE_ISSEN = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)影一閃";
			this.kana = "カケイツセン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			/*
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (0 * skillLv);
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
			*/
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 影狩り
		// ----------------------------------------------------------------
		SKILL_ID_KAGE_GARI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)影狩り";
			this.kana = "カケカリ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			/*
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (0 * skillLv);
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
			*/
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 幻術 -影縫い-
		// ----------------------------------------------------------------
		SKILL_ID_GENJUTSU_KAGE_NUI = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)幻術 -影縫い-";
			this.kana = "ケンシユツカケヌイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			/*
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (0 * skillLv);
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
			*/
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 風魔手裏剣 -掌握-
		// ----------------------------------------------------------------
		SKILL_ID_FUMASHURIKEN_SHOUAKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)風魔手裏剣 -掌握-";
			this.kana = "フウマシユリケンシヨウアク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			/*
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (0 * skillLv);
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
			*/
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// 風魔手裏剣 -構築-
		// ----------------------------------------------------------------
		SKILL_ID_FUMASHURIKEN_KOUCHIKU = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)風魔手裏剣 -構築-";
			this.kana = "フウマシユリケンコウチク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			/*
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (0 * skillLv);
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
			*/
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ユピテルサンダーストーム
		// ----------------------------------------------------------------
		SKILL_ID_JUPITER_THUNDER_STORM = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ユピテルサンダーストーム";
			this.kana = "ユヒテルサンタアストオム";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;
			/*
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (0 * skillLv);
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
			*/
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ヘルズドライブ
		// ----------------------------------------------------------------
		SKILL_ID_HELLS_DRIVE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ヘルズドライブ";
			this.kana = "ヘルストライフ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;
			/*
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (0 * skillLv);
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
			*/
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ナパームバルカンストライク
		// ----------------------------------------------------------------
		SKILL_ID_NAPALM_VULKAN_STRIKE = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ナパームバルカンストライク";
			this.kana = "ナハアムハルカンストライク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_PSYCO;
			/*
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (0 * skillLv);
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
			*/
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// メテオストームバスター
		// ----------------------------------------------------------------
		SKILL_ID_METEOR_STORM_BUSTER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)メテオストームバスター";
			this.kana = "メテオストオムハスタア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;
			/*
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (0 * skillLv);
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
			*/
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ダブルボウリングバッシュ
		// ----------------------------------------------------------------
		SKILL_ID_DOUBLE_BOWLING_BASH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ダブルボウリングバッシュ";
			this.kana = "タフルホウリンクハツシユ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			/*
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (0 * skillLv);
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
			*/
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// メガソニックブロー
		// ----------------------------------------------------------------
		SKILL_ID_MEGA_SONIC_BLOW = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)メガソニックブロー";
			this.kana = "メカソニツクフロオ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}

			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
			/*
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (0 * skillLv);
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
			*/
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// スパークブラスター
		// ----------------------------------------------------------------
		SKILL_ID_SPARK_BLASTER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(△)スパークブラスター";
			this.kana = "スハアクフラスタア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 250;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000 + 200 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// トリプルレーザー
		// ----------------------------------------------------------------
		SKILL_ID_TRIPLE_LASER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "トリプルレーザー";
			this.kana = "トリフルレエサア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 140;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// エクスプロッシブパウダー
		// ----------------------------------------------------------------
		SKILL_ID_EXPLOSIVE_POWDER = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)エクスプロッシブパウダー";
			this.kana = "エクスフロツシフハウタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			/*
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (0 * skillLv);
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
			*/
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// メイヘミックソーンズ
		// ----------------------------------------------------------------
		SKILL_ID_MEYHEMIC_THORNS = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)メイヘミックソーンズ";
			this.kana = "メイヘミツクソオンス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
			/*
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (0 * skillLv);
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
			*/
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// ドラゴニックブレス
		// ----------------------------------------------------------------
		SKILL_ID_DRAGONIC_BREATH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "(×)ドラゴニックブレス";
			this.kana = "トラコニツクフレス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			/*
			this.CostFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (0 * skillLv);
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 0;
			}
			*/
		};
		this.dataArray[skillId] = skillData;
		skillId++;

		// ----------------------------------------------------------------
		// マイティスマッシュ
		// ----------------------------------------------------------------
		SKILL_ID_MIGHTY_SMASH = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "マイティスマッシュ";
			this.kana = "マイテイスマツシユ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 250;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 200 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		};
		this.dataArray[skillId] = skillData;
		skillId++;
	}

	// 初期化
	this.Init();

}

/*
		// ----------------------------------------------------------------
		// スキル名
		// ----------------------------------------------------------------
		SKILL_ID_NYANTOMO_TEKKO = skillId;
		skillData = new function() {
			this.prototype = new CSkillData();
			CSkillData.call(this);

			this.id = skillId;
			this.name = "スキル名";
			this.kana = "スキルメイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		};
		this.dataArray[skillId] = skillData;
		skillId++;

*/
