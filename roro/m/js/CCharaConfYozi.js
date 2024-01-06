function CCharaConfYozi(confArray) {

	// 継承定義
	CCharaConfYozi.prototype = new CConfBase();



	// 基底クラスのコンストラクタ呼び出し
	CConfBase.call(this, confArray);



	// 設定の限界値
	// この数を超える場合は、セーブデータの拡張が必要
	this.confCountLimit = 30;



	// 設定欄の横方向項目数
	this.itemInRow = 2;



	// 設定欄のラベル
	this.confLabel = "四次職支援設定";





	//********************************************************************************************************************************
	//********************************************************************************************************************************
	//****
	//**** 四次職支援データ定義
	//****
	//********************************************************************************************************************************
	//********************************************************************************************************************************

	/**
	 * 設定データを初期化（セットアップ）する.
	 * （継承先でオーバーライドすること）
	 */
	this.InitData = function () {

		var idx = 0;

		var confId = 0;
		var confData = new Array();
		var confDataOBJSorted = new Array();



		// 基底クラスのセットアップ処理を実行
		CCharaConfYozi.prototype.InitData.call(this);



		//----------------------------------------------------------------
		// データ定義　ここから
		//----------------------------------------------------------------
		CCharaConfYozi.CONF_ID_ARUGUTUS_VITA = confId;
		confData = [
			confId,
			CConfBase.ConfText("アルグトゥスヴィタ"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_ARUGUTUS_TERUM = confId;
		confData = [
			confId,
			CConfBase.ConfText("アルグトゥステルム"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_PRESENSE_AKYACE = confId;
		confData = [
			confId,
			CConfBase.ConfText("プレセンスアキエース"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_CONPETENTIA = confId;
		confData = [
			confId,
			CConfBase.ConfText("コンペテンティア"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_RERIGIO = confId;
		confData = [
			confId,
			CConfBase.ConfText("(△)レリギオ"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_BENEDICTUM = confId;
		confData = [
			confId,
			CConfBase.ConfText("(△)ベネディクトゥム"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_CLIMAX_IMPACT = confId;
		confData = [
			confId,
			CConfBase.ConfText("クライマックスインパクト"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_KOGEKI_SOCHI_YUKOKA = confId;
		confData = [
			confId,
			CConfBase.ConfText("攻撃装置有効化"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_BOGYO_SOCHI_YUKOKA = confId;
		confData = [
			confId,
			CConfBase.ConfText("防御装置有効化"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_SPELL_ENCHANTING = confId;
		confData = [
			confId,
			CConfBase.ConfText("スペルエンチャンティング"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_MUSICAL_INTERLUDE = confId;
		confData = [
			confId,
			CConfBase.ConfText("ミュージカルインタールード"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_YUYAKENO_SERENADE = confId;
		confData = [
			confId,
			CConfBase.ConfText("夕焼けのセレナーデ"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_PRONTERA_MARCH = confId;
		confData = [
			confId,
			CConfBase.ConfText("プロンテラマーチ"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_BUSHI_FU = confId;
		confData = [
			confId,
			CConfBase.ConfText("武士符"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_HOSHI_FU = confId;
		confData = [
			confId,
			CConfBase.ConfText("法師符"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_GOGYO_FU = confId;
		confData = [
			confId,
			CConfBase.ConfText("五行符"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_TENCHI_SHINRE = confId;
		confData = [
			confId,
			CConfBase.ConfText("天地神霊"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(10)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_NYAN_BRESSING = confId;
		confData = [
			confId,
			CConfBase.ConfText("にゃんブレッシング"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;


		CCharaConfYozi.CONF_ID_DUMMY = confId;
		confData = [
			confId,
			CConfBase.ConfText("-"),
			CConfBase.ConfControlType(CONTROL_TYPE_DUMMY),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(0)
		];
		this.confDataObj[confId] = confData;
		confId++;



		//----------------------------------------------------------------
		// データ定義数チェック
		//----------------------------------------------------------------
		if (this.confCountLimit < this.confDataObj.length) {
			alert("四次職支援設定　定義数超過");
			return;
		}



		//----------------------------------------------------------------
		// 四次職支援設定変数配列を初期化
		//----------------------------------------------------------------
		for (idx = 0; idx < this.confCountLimit; idx++) {
			if (idx < this.confDataObj.length) {
				this.confArray[idx] = this.confDataObj[idx][CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE];
			}
			else {
				this.confArray[idx] = 0;
			}
		}



		//----------------------------------------------------------------
		// 表示順序に従い、四次職支援設定データ定義を再配列
		//----------------------------------------------------------------
		confDataOBJSorted = new Array();
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfYozi.CONF_ID_ARUGUTUS_VITA];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfYozi.CONF_ID_ARUGUTUS_TERUM];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfYozi.CONF_ID_PRESENSE_AKYACE];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfYozi.CONF_ID_CONPETENTIA];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfYozi.CONF_ID_RERIGIO];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfYozi.CONF_ID_BENEDICTUM];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfYozi.CONF_ID_CLIMAX_IMPACT];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfYozi.CONF_ID_SPELL_ENCHANTING];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfYozi.CONF_ID_KOGEKI_SOCHI_YUKOKA];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfYozi.CONF_ID_BOGYO_SOCHI_YUKOKA];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfYozi.CONF_ID_MUSICAL_INTERLUDE];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfYozi.CONF_ID_YUYAKENO_SERENADE];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfYozi.CONF_ID_PRONTERA_MARCH];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfYozi.CONF_ID_DUMMY];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfYozi.CONF_ID_BUSHI_FU];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfYozi.CONF_ID_HOSHI_FU];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfYozi.CONF_ID_GOGYO_FU];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfYozi.CONF_ID_TENCHI_SHINRE];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfYozi.CONF_ID_NYAN_BRESSING];
		this.confDataObj = confDataOBJSorted;

	}





	/**
	 * 設定欄テーブルを構築する（サブ　特殊欄構築用）.
	 * （継承先でオーバーライドすること）
	 */
	this.BuildUpSelectAreaSubForSpecial = function (objTd, confData) {

		var confId = confData[CConfBase.CONF_DATA_INDEX_ID];
		var controlId = this.GetControlIdString(this.instanceNo, confId);
		var controlType = confData[CConfBase.CONF_DATA_INDEX_CONTROL_TYPE];

		// 個別に実装する
		switch (confId) {

		}
	}





	// 初期化実行
	this.InitData();



}