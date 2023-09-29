//=============================================================================
// x倍スロットマシーンプラグイン
// Exc_DoublingSlotMashine.js
// ----------------------------------------------------------------------------
// Copyright (c) 2023 IdiotException
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2023/08/24 初版
//=============================================================================

/*:
 * @target MZ
 * @plugindesc x倍スロットマシーンを追加します。
 * @author IdiotException
 * @url https://github.com/IdiotException/EXC_DoublingSlotMachine
 * @help 揃った絵柄の倍率を全て掛け算し、
 * その倍率だけ増えた掛け金を払い戻すスロットマシーンです。
 * 主にキーボードで操作することが想定されています。
 * 
 * あらかじめベットするコイン数を変数に設定する必要があります。
 * 
 * 
 * 操作方法
 * 　↑キー：掛け金の投入、再度押下するとスロットスタート。
 * 　→キー：右リールの停止
 * 　↓キー：中央リールの停止
 * 　←キー：左リールの停止
 * 　決定キー長押し：上記の一連の流れを押している間実行
 * 　キャンセルキー：終了メニュー表示
 *
 * 画像の準備
 * 　実装時には配布Urlにあるimgフォルダの、
 * 　"dSlot"フォルダを対象プロジェクトのimgフォルダに配置してください。
 * 　また、各画像ファイルと同名のファイルを用意していただくことで
 *   オリジナルの画像が利用できます。
 * 　他に、起動時コマンドで別フォルダを指定することでマシンごとに
 * 　別な画像を設定することもできます。
 * 
 * リールの絵柄並びの指定について
 *  リールの絵柄の数（リールの長さ）は自由に変更できます。
 *  ただし、すべてのリールの長さは同じにしてください。
 *  指定時の各番号は以下に対応します。
 *   x1   : 1
 *   x3   : 2
 *   x5   : 3
 *   x10  : 4
 *   x20  : 5
 *   x30  : 6
 *   x50  : 7
 *   x100 : 8
 * 
 * 利用規約
 *   MITライセンスです。
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * 起動時に直前の選択肢ウィンドウが残ってしまう場合
 *   スロットの起動コマンドの直前に7~10フレーム程度のウェイトを入れてください。
 *   ウィンドウが消えきる前にスロットを起動してしまうとそれが画面に残ります。
 * 
 * 絵柄ファイルについて
 *  末尾なし：停止時の基本絵柄です
 *  glow：絵柄がそろった際の光った状態のものです
 *  blur：回転中に画像がぶれている状態のものです
 * 
 * @param CoinID
 * @text コイン変数ID
 * @desc カジノで使用するコインの所持数を保管する変数ID
 * @type number
 * @default 11
 * 
 * @param BetCoinID
 * @text 投入コイン数変数ID
 * @desc 1ゲームごとに投入するコイン数量を保管する変数ID
 * @type number
 * @default 12
 * 
 * @param ScreenLayout
 * @text ウィンドウ配置
 * @desc どの位置にスロット画面を配置するか(1~9)
 * 数字はテンキー配置に対応。ex.) 5:中央寄せ
 * @type number
 * @default 5
 * 
 * @param WinTitle
 * @text Winタイトル
 * @desc Win表示部のタイトルテキスト
 * @type text
 * @default WIN
 *
 * @param BetTitle
 * @text Betタイトル
 * @desc BET数表示部のタイトルテキスト
 * @type text
 * @default BET
 *
 * @param CoinTitle
 * @text Coinタイトル
 * @desc コイン残数表示部のタイトルテキスト
 * @type text
 * @default CREDIT
 *
 * @param GameCountTitle
 * @text GameCountタイトル
 * @desc ゲーム数表示部のタイトルテキスト
 * @type text
 * @default GAME COUNT
 *
 * @param CommandContinue
 * @text 継続の選択肢
 * @desc 終了確認コマンドウィンドウでの継続選択肢テキスト
 * @type text
 * @default 続ける
 * 
 * @param CommandBuyCoin
 * @text コイン購入の選択肢
 * @desc 終了確認コマンドウィンドウでのコイン購入選択肢テキスト
 * @type text
 * @default コインを買う
 *
 * @param CommandExit
 * @text 終了の選択肢
 * @desc 終了確認コマンドウィンドウでの終了選択肢テキスト
 * @type text
 * @default 終了する
 *
 * @param BuyCoin
 * @text 購入コイン数
 * @desc コイン購入選択肢で購入できるコイン数
 * @type number
 * @default 50
 *
 * @param PayMoney
 * @text 支払金額
 * @desc コイン購入選択肢で支払う金額
 * @type number
 * @default 1000
 *
 * @param MainFontFileName
 * @text 項目名フォントファイル名
 * @desc 各項目の項目名に適用するフォントのファイル名
 * @type text
 *
 * @param NumberFontFileName
 * @text 数字フォントファイル名
 * @desc 各項目の数字に適用するフォントのファイル名
 * @type text
 *
 * @command DisplaySlotMachine
 * @text x倍スロットマシーン画面表示
 * @desc x倍スロットマシーンを開始します。
 *
 * @arg LeftReelPattern
 * @text 左リール絵柄並び
 * @desc 左リールの絵柄の並び
 * @type number[]
 * @default [1,8,1,2,4,3,3,3,4,7,6,1,1,5,4,5,1,4,5,7,3,8,8,8,4,4,4]
 *
 * @arg CenterReelPattern
 * @text 中央リール絵柄並び
 * @desc 中央リールの絵柄の並び
 * @type number[]
 * @default [7,8,2,1,6,5,4,1,3,2,1,6,1,5,4,4,4,3,1,2,8,4,1,1,3,3,3]
 *
 * @arg RightReelPattern
 * @text 右リール絵柄並び
 * @desc 右リールの絵柄の並び
 * @type number[]
 * @default [2,2,4,4,4,3,3,3,5,4,6,6,4,1,1,6,8,8,5,6,5,4,3,2,1,1,1]
 *
 * @arg SlideProbability
 * @text 停止時滑り確率
 * @desc 停止時に滑るコマ数の確率(%)
 * 1 = 0コマ滑り（滑りなし）の確率、2 = 1コマ滑りの確率、3 = 2コマ滑りの…
 * @type number[]
 * @default [0,40,30,20,10]
 *
 * @arg ReelSpeed
 * @text リール回転速度
 * @desc リールの絵柄の移動速度(px/f)
 * @type number
 * @max 100
 * @min 1
 * @default 40
 *
 * @arg AlternativeImageFolder
 * @text 別画像フォルダ名
 * @desc 別な画像取得先フォルダ名 ex.) img/dSlot2/
 * 指定することで「img/dSlot/」ではないフォルダから画像を取得する
 * @type Text
 *
 * @arg CoinInsertSE
 * @text コイン投入時SE
 * @desc コインを投入したときに鳴らすSE
 * @type Text
 * @default Coin
 *
 * @arg ReelStartSE
 * @text リール回転開始時SE
 * @desc リール回転開始時に鳴らすSE
 * @type Text
 * @default Door6
 *
 * @arg reelStopSE
 * @text リール停止時SE
 * @desc リール停止時に鳴らすSE
 * @type Text
 * @default Door1
 *
 * @arg WinSE
 * @text 勝ちSE
 * @desc 絵柄がそろった時に鳴らすSE
 * @type Text
 * @default Cat
 *
 * @arg LoseSE
 * @text 負けSE
 * @desc 絵柄がそろわなかった時に鳴らすSE
 * @type Text
 * @default Miss
 *
 * @arg BuyCoinSE
 * @text コイン購入時SE
 * @desc コイン購入時に鳴らすSE
 * @type Text
 * @default Coin
 *
 * @arg BuzzserSE
 * @text コイン不足時SE
 * @desc コイン不足時、お金不足時に鳴らすSE
 * @type Text
 * @default Buzzer1
 *
 */
let _coinInsertSE, _reelStartSE, _reelStopSE, _winSe, _loseSE, _buyCoinSE, _buzzerSE;
const ExcDoublingSlotMachinePluginName = document.currentScript.src.match(/^.*\/(.+)\.js$/)[1];

(function() {
	"use strict";
	
	//--------------------------------------------------
	// 定数設定
	//--------------------------------------------------
	// 画像素材の名前
	const PICT_PATH				= "img/dSlot/";		// スロットの画像ファイル格納フォルダ
	const PICT_BACK_NAME		= "slot_bg";		// フレームの画像ファイル名
	const PICT_FRAME_NAME		= "slot_frame";		// フレームの画像ファイル名
	const PICT_PATTERN_NAME		= "slot_pattern_";	// 通し番号を除く絵柄の画像ファイル名
	const PICT_BLUR_TRAILING	= "_blur";			// 回転中画像につく末尾
	const PICT_GLOW_TRAILING	= "_glow";			// 点滅用画像につく末尾
	const PICT_TEXT_BACK_NAME	= "slot_text_BG_";	// l,rを除くテキスト項目背景画像のファイル名
	
	// スロットマシンのサイズ
	const SLOT_HEIGHT = 624;
	const SLOT_WIDTH = 816;

	// リール設定の固定値
	const REEL_POS_X = [77, 307, 537];	// 各リールの左側の横位置
	const REEL_POS_Y = 110;				// リールの上部の縦位置
	const REEL_DISP_COUNT = 3;			// 各リールの高さ指定（絵柄何個分か

	// リールの絵柄の画像ファイル関連の設定
	const REEL_PATTERN_HEIGHT	= 100;		// 絵柄の縦の間隔
	const REEL_PATTERN_WIDTH	= 200;		// 絵柄の横幅（使ってない
	const REEL_FLASH_FRAME		= 11;		// リールの結果の絵柄の点滅切り替わり待ちフレーム数

	// キーの入力不可時間
	const INIT_DISABLE_FRAME		= 15	// 開始直後等のボタン誤入力を防ぐ
	const INS_COIN_DISABLE_FRAME	= 8;	// コイン投入からレバー操作の入力不可フレーム数
	const STARTING_DISABLE_FRAME	= 12;	// 回転直後の停止入力不可時間のフレーム数
	const STOP_DISABLE_FRAME		= 6;	// 停止同時押し不可時間のフレーム数
	const RESULT_DISABLE_FRAME		={  lose:5,
										win :90 };	// コイン払い戻し中入力不可時間
	const SPACE_DISABLE_FRAME		= 30;	// スペース・Enter入力時の次入力不可フレーム数

	// テキスト表示
	const TEXT_POS_Y	= [460,520];	// テキスト表示の縦位置
	const TEXT_HEIGHT	= 40;					// テキスト表示の高さ
	const TEXT_WIDTH	= 370;					// テキスト表示の幅
	const TEXT_SIZE		= 32;					// テキストのフォントサイズ
	const TEXT_PADDING	= 20;					// テキストの左右余白
	const NUM_UPDATE_WAIT = 6;					// 数値テキストの更新待ちフレーム数

	// 乱数基底設定
	const RANDOM_MAX = 100;

	// 以下スロットマシンの状態管理（こちらはいじらないで！）
	const MachineMode = {
		stop	: 0,
		run		: 1,
		result	: 2
	};
	const PatternCode = {
		x1		: 1,
		x3		: 2,
		x5		: 3,
		x10		: 4,
		x20		: 5,
		x30		: 6,
		x50		: 7,
		x100	: 8
	};
	const PatternState = {
		stop	:0,
		glow	:1,
		blur	:2
	};
	const ReelIndexes = {
		left	:0,
		center	:1,
		right	:2
	};
	const FontType ={
		mainFont	:"slot-mainfont",
		numberFont	:"slot-numberfont"
	};

	//パラメータ受取処理
	let parameters = PluginManager.parameters(ExcDoublingSlotMachinePluginName);
	let _coinId				= Number(parameters['CoinID'] || 11);
	let _betCoinId			= Number(parameters['BetCoinID'] || 12);
	let _screenLayout		= Number(parameters['ScreenLayout'] || 5);
	let _winTitle			= String(parameters['WinTitle'] || "WIN");
	let _betTitle			= String(parameters['BetTitle'] || "BET");
	let _coinTitle			= String(parameters['CoinTitle'] || "CREDIT");
	let _gameCntTitle		= String(parameters['GameCountTitle'] || "GAME");
	let _commandContinue	= String(parameters['CommandContinue'] || "続ける");
	let _commandBuyCoin		= String(parameters['CommandBuyCoin'] || "コインを買う");
	let _commandExit		= String(parameters['CommandExit'] || "終了する");
	let _buyCoin			= String(parameters['BuyCoin'] || 50);
	let _payMoney			= String(parameters['PayMoney'] || 1000);
	let _mainFontName		= String(parameters['MainFontFileName'] || "");
	let _numberFontName		= String(parameters['NumberFontFileName'] || "");
	
	// 画面配置制御
	let offsetX = 0;
	let offsetY = 0;

	//--------------------------------------------------
	// 変数宣言
	//--------------------------------------------------
	// コマンド起動時の引数受け取り変数
	// 滑りの確率格納用
	let _slideProb;
	// 絵柄の移動速度格納用
	let _reelSpeed;
	// 各種SE指定格納用
	let _coinInsertSE, _reelStartSE, _reelStopSE, _winSe, _loseSE, _buyCoinSE, _buzzerSE;
	// 画像差し替え用
	let _altImageFolder;

	// スロット内部管理
	// 投入コイン数
	let _betCoin;

	// スロットマシーンの状態
	let _machineMode = MachineMode.stop;
	let _machineDisableCount = 0;

	// フレーム管理用スプライト
	let _sprFrame;

	// リールの状態管理変数
	let _reelPattern = [];
	let _reelObj =[];
	let _resultIndexes = [[],[],[]];
	let _resultFlash = {mode:0, count:0, speed:REEL_FLASH_FRAME};

	// 画像用Bitmapの保持
	let _bmpPatterns, _bmpBack, _bmpFrame, _bmpTextBackR, _bmpTextBackL;

	// テキスト表示Bitmapの保持
	let _txtWin, _txtBet, _txtCoin, _txtGameCnt;

	// テキスト表示項目関連
	let _valueWin,_valueBet,_valueCoin;
	let _gameCount = 0;

	
	//--------------------------------------------------
	// ツクール側変数取得宣言
	//--------------------------------------------------
	// コイン
	function Exc_getCoin() {
		return $gameVariables.value(_coinId);
	}
	function Exc_setCoin(value) {
		$gameVariables.setValue(_coinId, value);
	}
	function Exc_addCoin(value) {
		Exc_setCoin(Number(Exc_getCoin() || 0) + Number(value || 0));
	}
	// １ゲーム当たりコイン数量
	function Exc_getBetCoin() {
		return $gameVariables.value(_betCoinId);
	}

	//--------------------------------------------------
	// プラグインコマンド宣言
	//--------------------------------------------------
	// スロット開始コマンド設定
	PluginManager.registerCommand(ExcDoublingSlotMachinePluginName, "DisplaySlotMachine", function(args) {
		// パラメータの取得
		_reelPattern = [];
		_reelPattern.push(JSON.parse(args['LeftReelPattern'] || "[1,8,3,1,2,4,3,4,7,6,1,1,5,4,5,1,4,5,7,3,3,3,8,4]"));
		_reelPattern.push(JSON.parse(args['CenterReelPattern'] || "[7,8,2,1,6,5,4,1,3,2,1,6,1,5,4,3,1,8,4,1,1,3,3,3]"));
		_reelPattern.push(JSON.parse(args['RightReelPattern'] || "[5,8,4,4,3,3,3,5,4,6,6,4,1,1,6,1,8,5,6,5,4,3,2,1]"));
		_slideProb = JSON.parse(args['SlideProbability'] || "[25,25,20,15]");
		_reelSpeed = Number(args['ReelSpeed'] || 40);
		_altImageFolder = String(args['AlternativeImageFolder'] || "");
		_coinInsertSE = String(args['CoinInsertSE'] || "Coin");
		_reelStartSE = String(args['ReelStartSE'] || "Door6");
		_reelStopSE = String(args['reelStopSE'] || "Door1");
		_winSe = String(args['WinSE'] || "Cat");
		_loseSE = String(args['LoseSE'] || "Miss");
		_buyCoinSE = String(args['BuyCoinSE'] || "Coin");
		_buzzerSE = String(args['BuzzserSE'] || "Buzzer1");
		SceneManager.push(EXC_DoublingSlotMachine);
	});

	//--------------------------------------------------
	// Name : Scene_Boot
	// Desc : シーンブートクラス
	//--------------------------------------------------
	const _Scene_Boot_loadGameFonts = Scene_Boot.prototype.loadGameFonts;
	Scene_Boot.prototype.loadGameFonts = function () {
		_Scene_Boot_loadGameFonts.call(this);
		FontManager.load(FontType.mainFont, _mainFontName);
		FontManager.load(FontType.numberFont, _numberFontName);
	};

	//--------------------------------------------------
	// Name : EXC_DoublingSlotMachine
	// Desc : スロットマシーンクラス
	//--------------------------------------------------
	// シーンの作成
	function EXC_DoublingSlotMachine() {
		this.initialize.apply(this, arguments);
	};
	EXC_DoublingSlotMachine.prototype = Object.create(Scene_Base.prototype);
	EXC_DoublingSlotMachine.prototype.constructor = EXC_DoublingSlotMachine;
	
	// init
	EXC_DoublingSlotMachine.prototype.initialize = function() {
		Scene_Base.prototype.initialize.call(this);
	};

	// スプライトの作成（画像の準備）
	EXC_DoublingSlotMachine.prototype.create = function() {
		Scene_Base.prototype.create.call(this);
		this.setScreenLayout();
		this.loadImageBitmap();
		this.createBackground();
		this.createReel();
		this.createFrame();
		this.createText();
		// 変数の初期化
		this.machineReset();
		this.resultReset();
		// 開始直後の入力不可設定
		_machineDisableCount = INIT_DISABLE_FRAME;
	};
	
	//--------------------------------------------------
	// 画面初期表示
	//--------------------------------------------------
	// 画面表示位置の設定
	EXC_DoublingSlotMachine.prototype.setScreenLayout = function() {
		switch(_screenLayout){
			case 1:
			case 4:
			case 7:
				offsetX = 0;
				break;
			case 2:
			case 5:
			case 8:
				offsetX = (Graphics.width - SLOT_WIDTH)/2;
				break;
			case 3:
			case 6:
			case 9:
				offsetX = Graphics.width - SLOT_WIDTH;
				break;
		}
		switch(_screenLayout){
			case 1:
			case 2:
			case 3:
				offsetY = Graphics.height - SLOT_HEIGHT;
				break;
			case 4:
			case 5:
			case 6:
				offsetY = (Graphics.height - SLOT_HEIGHT)/2;
				break;
			case 7:
			case 8:
			case 9:
				offsetY = 0;
				break;
		}
	}

	// 画像準備（マジックナンバーが多すぎやしないかね
	EXC_DoublingSlotMachine.prototype.loadImageBitmap = function() {

		let imgFolder = _altImageFolder;
		if(imgFolder == ""){
			imgFolder = PICT_PATH;
		}
		
		// 背景の読み込み
		_bmpBack = ImageManager.loadBitmap(imgFolder, PICT_BACK_NAME, 0, false);

		// フレームの読み込み
		_bmpFrame = ImageManager.loadBitmap(imgFolder, PICT_FRAME_NAME, 0, false);
		
		// 絵柄画像の作成(絵柄パターンの組み合わせ、数に変更があった場合はここも修正)
		_bmpPatterns = [];
		for(let i = 1; i <= 8; i++) {
			let tmpPatterns = [];
			tmpPatterns.push(ImageManager.loadBitmap(imgFolder, PICT_PATTERN_NAME + i, 0, false));
			tmpPatterns.push(ImageManager.loadBitmap(imgFolder, PICT_PATTERN_NAME + i + PICT_GLOW_TRAILING, 0, false));
			tmpPatterns.push(ImageManager.loadBitmap(imgFolder, PICT_PATTERN_NAME + i + PICT_BLUR_TRAILING, 0, false));
			_bmpPatterns.push(tmpPatterns);
		}

		// テキスト項目背景の読み込み
		_bmpTextBackR = ImageManager.loadBitmap(imgFolder, PICT_TEXT_BACK_NAME + "r", 0, false);
		_bmpTextBackL = ImageManager.loadBitmap(imgFolder, PICT_TEXT_BACK_NAME + "l", 0, false);
	 
	};

	// 背景設定
	EXC_DoublingSlotMachine.prototype.createBackground = function() {

		// 画面背景の設定
		this._backgroundSprite = new Sprite();
		this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
		this.addChild(this._backgroundSprite);

		// リール背景の設定
		this.createSprite(_bmpBack, 0, 0, 0);

	};

	// リール初期設定
	EXC_DoublingSlotMachine.prototype.createReel = function() {
		// 保持変数初期化
		_reelObj = [];
		for(let i = 0; i < _reelPattern.length; i++) {
			// リール単位でオブジェクト設定
			let workObj = {
				reelNum: i,
				sprites: [],
				rotDistance: 0,
				rotSpeed: 0,
				rotation: false,
				slideCount:0,
				bottomIndex: 0,
				nextIndex: function(add) {
					return (this.bottomIndex + add) % _reelPattern[this.reelNum].length;
				}
			};
			_reelObj.push(workObj);
			for(let j = REEL_DISP_COUNT; j >= 0; j--) {
				// リールの絵柄のパラメータ初期化
				let workSprite = new Sprite(_bmpPatterns[_reelPattern[i][workObj.nextIndex(j)]-1][PatternState.stop]);
				workSprite.x = REEL_POS_X[i] + offsetX;
				// 上部見切れている分が必要なので絵柄の初期位置は実際のリールの頭位置より絵柄一つ分上になる
				// リールの上から絵柄を詰めている
				workSprite.y = REEL_POS_Y + REEL_PATTERN_HEIGHT * (REEL_DISP_COUNT - 1 - j) + offsetY;
				
				// 初期化した絵柄をそれぞれにセット
				_reelObj[i].sprites.unshift(workSprite);
				this.addChild(workSprite);
			}
		}
	};
	
	// スロットのフレームをセット
	EXC_DoublingSlotMachine.prototype.createFrame = function() {
		_sprFrame = new Sprite(_bmpFrame);
		_sprFrame.x = offsetX;
		_sprFrame.y = offsetY;
		this.addChild(_sprFrame);
	};
	
	// スロットのテキスト表示をセット
	EXC_DoublingSlotMachine.prototype.createText = function() {

		// 左側背景
		this.createSprite(_bmpTextBackL, 0, TEXT_POS_Y[0], 0);
		this.createSprite(_bmpTextBackL, 0, TEXT_POS_Y[1], 0);

		// 左側タイトル
		this.createTextSprite(_winTitle, 0, TEXT_POS_Y[0], 0, FontType.mainFont, "left");
		this.createTextSprite(_betTitle, 0, TEXT_POS_Y[1], 0, FontType.mainFont, "left");

		// 左側値
		_txtWin = this.createTextSprite(0, 0, TEXT_POS_Y[0], 0, FontType.numberFont, "right");
		_txtBet = this.createTextSprite(0, 0, TEXT_POS_Y[1], 0, FontType.numberFont, "right");

		// 右側背景
		this.createSprite(_bmpTextBackR, SLOT_WIDTH, TEXT_POS_Y[0], 1);
		this.createSprite(_bmpTextBackR, SLOT_WIDTH, TEXT_POS_Y[1], 1);

		// 右側タイトル
		this.createTextSprite(_gameCntTitle, SLOT_WIDTH, TEXT_POS_Y[0], 1, FontType.mainFont, "left");
		this.createTextSprite(_coinTitle, SLOT_WIDTH, TEXT_POS_Y[1], 1, FontType.mainFont, "left");
		
		// 右側値
		_txtGameCnt = this.createTextSprite("0", SLOT_WIDTH, TEXT_POS_Y[0], 1, FontType.numberFont, "right");
		_txtCoin = this.createTextSprite(Exc_getCoin(), SLOT_WIDTH, TEXT_POS_Y[1], 1, FontType.numberFont, "right");

	};

	// スロットのテキスト表示をセット（その際に使用したビットマップを返す
	EXC_DoublingSlotMachine.prototype.createTextSprite = function(text, x, y, anchorX, fontType, align) {

		let tmpBmp = new Bitmap(TEXT_WIDTH, TEXT_HEIGHT);
		tmpBmp.fontFace = fontType;
		tmpBmp.fontSize = TEXT_SIZE;
		tmpBmp.drawText(text, TEXT_PADDING, (TEXT_HEIGHT - TEXT_SIZE) / 2 , TEXT_WIDTH - TEXT_PADDING * 2, TEXT_SIZE, align);
		
		this.createSprite(tmpBmp, x, y, anchorX);

		return tmpBmp;
	};

	// スプライトの作成
	EXC_DoublingSlotMachine.prototype.createSprite = function(bmp, x, y, anchorX) {
		let tmpSprite = new Sprite(bmp);
		tmpSprite.x = x + offsetX;
		tmpSprite.y = y + offsetY;
		tmpSprite.anchor.x = anchorX;
		tmpSprite.anchor.y = 0;
		this.addChild(tmpSprite);
		return tmpSprite;
	};
	
	// テキスト部のテキスト再セット
	EXC_DoublingSlotMachine.prototype.redrawText = function(bmp, text) {
		bmp.clear();
		bmp.drawText(text, TEXT_PADDING, (TEXT_HEIGHT - TEXT_SIZE) / 2, TEXT_WIDTH - TEXT_PADDING * 2, TEXT_SIZE, "right");
	};
	

	//--------------------------------------------------
	// 画面更新処理
	//--------------------------------------------------
	// 1フレームごとの画面更新処理
	EXC_DoublingSlotMachine.prototype.update = function() {
		Scene_Base.prototype.update.call(this);
		
		// キー入力処理
		if(this.enableKeyCheck()) {
			this.keyControll();
		}
		
		// リール位置再計算
		this.reelRotation();

		// 役チェック
		this.reelResultCheck();

		// リザルト点滅
		this.reelResultShow();

		// コイン表示更新
		this.displayCoinUpdate();
	};
	
	// キー入力処理の前処理
	EXC_DoublingSlotMachine.prototype.enableKeyCheck = function() {
		let ret = true;

		// 確認ウィンドウ表示中はキー入力を処理しない
		if(this._exitWindow != null && this._exitWindow.isOpen()) {
			ret = false;
		}
		
		// キー入力不可カウント内の場合
		if(_machineDisableCount > 0) {
			_machineDisableCount--;
			ret = false;
		}

		return ret;
	};

	// キー入力受付処理
	EXC_DoublingSlotMachine.prototype.keyControll = function() {
		
		// コイン投入後は停止不可
		if (_valueBet.internal == 0 && Input.isTriggered('cancel')) {
			this.openExitWindow();
			return;
		}

		switch (_machineMode) {
			case MachineMode.stop:
			case MachineMode.result:
				if (Input.isTriggered('up') || Input.isPressed('ok')) {
					if(_valueBet.internal > 0) {
						// コイン投入済みの場合、リールを回す
						this.reelRun();
					} else {
						// コイン未投入の場合、投入処理
						this.insertCoin();
					}
				}
				break;
			case MachineMode.run:
				this.reelStopButton();
				break;
		}
		// スペースで操作した場合は待ち時間が長くなる
		if (_machineDisableCount != 0 && Input.isPressed('ok')) {
			_machineDisableCount = SPACE_DISABLE_FRAME;
		}
	};
	
	EXC_DoublingSlotMachine.prototype.insertCoin = function() {
		// リプレイの時は音と見た目のみ
		let se = _coinInsertSE;
		// コイン枚数のチェック
		if(Exc_getCoin() < _betCoin) {
			// コイン不足
			se = _buzzerSE;
		} else {
			// winの初期化
			_valueWin.internal = 0;

			// コイン投入処理
			_valueBet.internal = _betCoin;
			Exc_addCoin(-1 * _valueBet.internal);
			_machineDisableCount = INS_COIN_DISABLE_FRAME;
		}
		_machineDisableCount = INS_COIN_DISABLE_FRAME;
		AudioManager.playSe({"name":se,"volume":90,"pitch":100,"pan":0});
	};
	
	// リールの回転開始処理
	EXC_DoublingSlotMachine.prototype.reelRun = function() {
	
		// 結果表示状態のリセット
		this.resultReset();

		// スロット状態の更新
		_machineMode = MachineMode.run;

		// リールの状態を回転中に設定
		for(let i = 0; i < _reelPattern.length; i++) {
			_reelObj[i].rotation = true;
			_reelObj[i].rotSpeed = _reelSpeed;
			for(let j = 0; j <= REEL_DISP_COUNT; j++) {
				// 回転中絵柄に置換
				_reelObj[i].sprites[j].bitmap = _bmpPatterns[_reelPattern[i][_reelObj[i].nextIndex(j)]-1][PatternState.blur];
			}
		}
		// 開始後のキー入力不可セット
		_machineDisableCount = STARTING_DISABLE_FRAME;

		AudioManager.playSe({"name":_reelStartSE,"volume":90,"pitch":100,"pan":0});


		// ゲーム数カウント
		_gameCount++;
		this.redrawText(_txtGameCnt, _gameCount);

	};

	// リールの停止ボタン押下処理
	EXC_DoublingSlotMachine.prototype.reelStopButton= function() {

		let stopTarget = -1;

		// 処理対象振り分け
		if(Input.isTriggered('left') && _reelObj[ReelIndexes.left].rotation) {
			stopTarget = ReelIndexes.left;
		} else if(Input.isTriggered('down') && _reelObj[ReelIndexes.center].rotation) {
			stopTarget = ReelIndexes.center;
		} else if(Input.isTriggered('right') && _reelObj[ReelIndexes.right].rotation) {
			stopTarget = ReelIndexes.right;
		} else if(Input.isPressed('ok')) {
			if(_reelObj[ReelIndexes.left].rotation) {
				stopTarget = ReelIndexes.left;
			} else if(_reelObj[ReelIndexes.center].rotation) {
				stopTarget = ReelIndexes.center;
			} else if(_reelObj[ReelIndexes.right].rotation) {
				stopTarget = ReelIndexes.right;
			}
		}

		if(stopTarget < 0) {
			return;
		}

		switch(stopTarget) {
			case ReelIndexes.left:
				// 左キー処理
				_reelObj[ReelIndexes.left].rotation = false;
				_reelObj[ReelIndexes.left].slideCount = this.setSlideCount();
				_machineDisableCount = STOP_DISABLE_FRAME;
				break;
			case ReelIndexes.center:
				// 下キー処理
				_reelObj[ReelIndexes.center].rotation = false;
				_reelObj[ReelIndexes.center].slideCount = this.setSlideCount();
				_machineDisableCount = STOP_DISABLE_FRAME;
				break;
			case ReelIndexes.right:
				// 右キー処理
				_reelObj[ReelIndexes.right].rotation = false;
				_reelObj[ReelIndexes.right].slideCount = this.setSlideCount();
				_machineDisableCount = STOP_DISABLE_FRAME;
				break;
		}
	}

	// リールの回転処理
	EXC_DoublingSlotMachine.prototype.reelRotation = function() {
		// 回転処理中でない場合処理しない
		if( _machineMode != MachineMode.run) {
			return;
		}
		
		for(let i = 0; i < _reelPattern.length; i++) {
			// すでにスピードが０になっているものは再描画対象外
			if(_reelObj[i].rotSpeed >= 0) {
				// 回転による移動距離の計算
				_reelObj[i].rotDistance += _reelObj[i].rotSpeed;
				
				// 移動距離が絵柄一つ分を超過＝流れた絵柄の再設定と次の絵柄準備
				if (_reelObj[i].rotDistance > REEL_PATTERN_HEIGHT) {
					// 絵柄のインデックスを一つ分進める
					_reelObj[i].bottomIndex = _reelObj[i].nextIndex(1);
					
					// 絵柄を一つ下にずらす
					for(let j = 0; j < REEL_DISP_COUNT; j++) {
						_reelObj[i].sprites[j].bitmap = _reelObj[i].sprites[j + 1].bitmap;
					}
					_reelObj[i].sprites[REEL_DISP_COUNT].bitmap = _bmpPatterns[_reelPattern[i][_reelObj[i].nextIndex(REEL_DISP_COUNT)]-1][PatternState.blur];

					// 回転停止処理中かどうかチェック
					if(this.isStopReel(i)) {
						// 回転を停止
						_reelObj[i].rotDistance = 0;
						_reelObj[i].rotSpeed = 0;
						
						// 停止絵柄に置き換え
						for(let j = 0; j <= REEL_DISP_COUNT; j++) {
							_reelObj[i].sprites[j].bitmap = _bmpPatterns[_reelPattern[i][_reelObj[i].nextIndex(j)]-1][PatternState.stop];
						}

						// 停止音
						AudioManager.playSe({"name":_reelStopSE,"volume":90,"pitch":100,"pan":0});
					} else {
						// 移動距離を再計算
						_reelObj[i].rotDistance -= REEL_PATTERN_HEIGHT;
					}
				}
				// 表示範囲内の絵柄の縦位置再計算
				for(let j = 0; j <= REEL_DISP_COUNT; j++) {
					_reelObj[i].sprites[j].y = REEL_POS_Y + REEL_PATTERN_HEIGHT * (REEL_DISP_COUNT - j - 1) + _reelObj[i].rotDistance + offsetY;
				}
			}
		}
	};
	
	// リールがそろってるかチェック
	EXC_DoublingSlotMachine.prototype.reelResultCheck = function() {
		// 回転処理中のみチェック
		// 回転処理中でない場合処理しない
		if( _machineMode != MachineMode.run) {
			return;
		}
		// 速度が0でない=回転中のリールがあるかチェック
		let sumSpeed = 0;
		for(let i = 0; i < _reelPattern.length; i++) {
			sumSpeed += _reelObj[i].rotSpeed;
		}
		if(sumSpeed > 0) {
			// まだ回転中のリールがある場合はリザルトチェックしない
			return;
		}
		
		// モードを停止モードに
		_machineMode = MachineMode.stop;

		// 結果の保持用
		_valueWin.internal = 0;

		// 役のチェック
		let pattern = this.resultCheck(-1);

		if(pattern.length > 0) {
			// モードをリザルトモードに
			_machineMode = MachineMode.result;

			let win = 1;
			for(let i = 0; i < pattern.length; i++){
				// 役ごとの処理
				switch(Number(pattern[i] || 0)) {
					case PatternCode.x1:
						break;
					case PatternCode.x3:
						win *= 3;
						break;
					case PatternCode.x5:
						win *= 5;
						break;
					case PatternCode.x10:
						win *= 10;
						break;
					case PatternCode.x20:
						win *= 20;
						break;
					case PatternCode.x30:
						win *= 30;
						break;
					case PatternCode.x50:
						win *= 50;
						break;
					case PatternCode.x100:
						win *= 100;
						break;
				}
			}
			
			_valueWin.internal = win * _betCoin;
			Exc_addCoin(_valueWin.internal);

			_machineDisableCount = RESULT_DISABLE_FRAME.win;
			AudioManager.playSe({"name":_winSe,"volume":90,"pitch":100,"pan":0});
			
		} else {
			_machineDisableCount = RESULT_DISABLE_FRAME.lose;
			AudioManager.playSe({"name":_loseSE,"volume":90,"pitch":100,"pan":0});
		}
		// 投入済みコインを０に
		_valueBet.internal = 0;

		// スペース押下中は待ち時間が長くなる
		if (_machineDisableCount < SPACE_DISABLE_FRAME && Input.isPressed('ok')) {
			_machineDisableCount = SPACE_DISABLE_FRAME;
		}
	};


	// リザルト表示(絵柄点滅処理)
	EXC_DoublingSlotMachine.prototype.reelResultShow = function() {
		// リザルト表示モードでない場合処理しない
		if(_machineMode != MachineMode.result) {
			return;
		}
		// リザルトが格納されていない場合処理しない
		if(_resultIndexes[0].length == 0) {
			return;
		}

		// カウント0の場合のみ状態切り替え
		if(_resultFlash.count == 0) {
			// カウントセット
			_resultFlash.count = _resultFlash.speed;
			// 発光表現
			let tmpState = PatternState.stop;
			switch(_resultFlash.mode) {
				case 0:
					tmpState = PatternState.glow;
					_resultFlash.mode = 1;
					break;
				case 1:
					_resultFlash.mode = 0;
					break;
			}
			for(let i = 0; i < _resultIndexes.length; i++) {
				for (let j = 0; j < _resultIndexes[i].length; j++) {
					_reelObj[i].sprites[_resultIndexes[i][j]].bitmap = _bmpPatterns[_reelPattern[i][_reelObj[i].nextIndex(_resultIndexes[i][j])]-1][tmpState];
				}
			}
		} else {
			_resultFlash.count--;
		}
	};

	// win/bet/coinの表示処理
	EXC_DoublingSlotMachine.prototype.displayCoinUpdate = function() {
			// テキスト再セット
			// win
			if(_valueWin.wait > 0) {
				_valueWin.wait--;
			} else if(_valueWin.internal != _valueWin.display) {
				_valueWin.wait = NUM_UPDATE_WAIT;
				if(_valueWin.internal != _valueWin.display) {
					if(_valueWin.internal == 0) {
						_valueWin.display = 0;
					} else {
						_valueWin.display += this.getDisplayIncrementValue(_valueWin.internal - _valueWin.display);
					}
				}
				this.redrawText(_txtWin, _valueWin.display);
			}

			// bet
			if(_valueBet.wait > 0) {
				_valueBet.wait--;
			} else if(_valueBet.internal != _valueBet.display) {
				_valueBet.wait = NUM_UPDATE_WAIT;
				if(_valueBet.internal == 0) {
					_valueBet.display = 0;
				} else {
					_valueBet.display += this.getDisplayIncrementValue(_valueBet.internal - _valueBet.display);
				}
				this.redrawText(_txtBet, _valueBet.display);
			}
			
			// Coin
			let coin = Exc_getCoin()
			if(_valueCoin.wait > 0) {
				_valueCoin.wait--;
			} else if(coin != _valueCoin.display) {
				_valueCoin.wait = NUM_UPDATE_WAIT;
				_valueCoin.display += this.getDisplayIncrementValue(coin - _valueCoin.display);
				this.redrawText(_txtCoin, _valueCoin.display);
			}
	}

	//--------------------------------------------------
	// 内部での処理
	//--------------------------------------------------
	// 内部の状態リセット
	EXC_DoublingSlotMachine.prototype.machineReset = function() {
		_valueWin = {internal:0,display:0,wait:0};
		_valueBet = {internal:0,display:0,wait:0};
		_valueCoin = {display:Exc_getCoin()-1,wait:0};
		_gameCount = 0;
		_betCoin = Exc_getBetCoin();
	};

	// 画面の状態リセット
	EXC_DoublingSlotMachine.prototype.resultReset = function() {
		_machineMode = MachineMode.stop;
		_resultIndexes = [[],[],[]];
		_resultFlash.mode = 0;
		_resultFlash.count = 0;
		_resultFlash.speed = REEL_FLASH_FRAME;
	};
	
	// リール停止可否
	EXC_DoublingSlotMachine.prototype.isStopReel = function(reelIndex) {
		// 停止状態になっていなければ不可
		if(_reelObj[reelIndex].rotation) {
			return false;
		}

		// 滑りコマ数が残っている場合は不可
		if(_reelObj[reelIndex].slideCount > 0){
			_reelObj[reelIndex].slideCount--;
			return false;
		}

		return true;
	};

	// リール滑りコマ取得
	EXC_DoublingSlotMachine.prototype.setSlideCount = function() {
		
		// ランダム値をもとに滑り数を確定
		let rnd = Math.floor(Math.random() * RANDOM_MAX);
		let workSum = 0;
		let ret = 0;
		for(let i = 0; i < _slideProb.length; i++) {
			workSum += Number(_slideProb[i] || 0);
			if(rnd < workSum) {
				ret = i;
				break;
			}
		}

		return ret;
	};

	// 画面表示の数値増加量の取得
	EXC_DoublingSlotMachine.prototype.getDisplayIncrementValue = function(difference){
		// 一応対象を関数内の変数に格納
		let target = parseInt(difference);

		// マイナスの場合はいったんプラスに戻す
		let isNegative = false;
		if(target < 0){
			isNegative = true;
			target *= -1;
		}

		// 全桁が動くように全部１の文字列を加算
		let targetLenght = target.toString().length;
		let ret = Number("1".repeat(targetLenght));
		if(ret > target){
			ret = Number("1".repeat(targetLenght-1));
		}

		// マイナスに戻す
		if(isNegative){
			ret *= -1;
		}

		return ret;
	}
	
	// リザルトのチェック
	EXC_DoublingSlotMachine.prototype.resultCheck = function(checkIndex) {
		let ret = [];
		
		let baseReel = -1;
		// 最初のリール取得
		for(let i = 0; i< _reelPattern.length; i++) {
			if(_reelObj[i].rotSpeed == 0 || checkIndex == i) {
				baseReel = i;
				break;
			}
		}
		
		// チェック用変数
		let aligned = false;
		_resultIndexes = [[],[],[]];
		// リールの回転処理と違って横方向に探査する点に注意
		for(let i = 0; i < REEL_DISP_COUNT; i++) {
			aligned = true;
			let work = _reelPattern[baseReel][_reelObj[baseReel].nextIndex(i)];
			for(let j = baseReel + 1; j < _reelPattern.length; j++) {
				if(_reelObj[j].rotSpeed != 0 && checkIndex != j) {
					// リールが停止しておらず、確認対象でもない場合はスキップ
					continue;
				} else if( work != _reelPattern[j][_reelObj[j].nextIndex(i)]) {
					aligned = false;
					break;
				}
			}
			if(aligned) {
				ret.push(work);
				// インデックスを保持
				for(let j = 0; j < _reelPattern.length; j++) {
					if(baseReel <= j) { 
						_resultIndexes[j].push(i);
					} else {
						_resultIndexes[j].push(-1);
					}
				}
			}
		}
		// 斜め右上
		aligned = true;
		let work = _reelPattern[baseReel][_reelObj[baseReel].bottomIndex];
		for(let i = baseReel + 1; i < _reelPattern.length; i++) {
			if(_reelObj[i].rotSpeed != 0 && checkIndex != i) {
				// リールが停止しておらず、確認対象でもない場合はスキップ
				continue;
			} else if( work != _reelPattern[i][_reelObj[i].nextIndex(i)]) {
				aligned = false;
				break;
			}
		}
		if(aligned) {
			ret.push(work);
			// インデックスを保持
			for(let i = 0; i < _reelPattern.length; i++) {
				if(_reelObj[i].rotSpeed != 0 && checkIndex != i) { 
					_resultIndexes[i].push(-1);
				} else {
					_resultIndexes[i].push(i);
				}
			}
		}
		// 斜め右下
		aligned = true;
		work = _reelPattern[baseReel][_reelObj[baseReel].nextIndex(REEL_DISP_COUNT - 1)];
		for(let i = baseReel + 1; i < _reelPattern.length; i++) {
			if(_reelObj[i].rotSpeed != 0 && checkIndex != i) {
				// リールが停止しておらず、確認対象でもない場合はスキップ
				continue;
			} else if( work != _reelPattern[i][_reelObj[i].nextIndex(REEL_DISP_COUNT - 1 - i )]) {
				aligned = false;
				break;
			}
		}
		if(aligned) {
			ret.push(work);
			// インデックスを保持
			for(let i = 0; i < _reelPattern.length ; i++) {
				if(_reelObj[i].rotSpeed != 0 && checkIndex != i) { 
					_resultIndexes[i].push(-1);
				} else {
					_resultIndexes[i].push(REEL_DISP_COUNT - 1 - i);
				}
			}
		}
		
		return ret;
	};

	//--------------------------------------------------
	// 確認ウィンドウ処理
	//--------------------------------------------------
	// 子ウィンドウの作成
	EXC_DoublingSlotMachine.prototype.openExitWindow = function() {
		if(this._exitWindow == null) {
			let windowHeight = 160;
			let windowWidth = 350;
			this._exitWindow = new Exc_ExitWindow(new Rectangle(
								(SLOT_WIDTH - windowWidth)/2 + offsetX,
								(SLOT_HEIGHT - windowHeight)/2 + offsetY, 
								windowWidth, windowHeight));
			this._exitWindow.setHandler("continue", this.continueSlot.bind(this));
			this._exitWindow.setHandler("buyCoin", this.buyCoinSlot.bind(this));
			this._exitWindow.setHandler("exit", this.exitSlot.bind(this));
			this.addChild(this._exitWindow);
		} else {
			this._exitWindow.select(0);
			this._exitWindow.activate();
			this._exitWindow.open();
		}
	};
	
	// コマンドウィンドウで続けるを押したときの処理
	EXC_DoublingSlotMachine.prototype.continueSlot = function() {
		_machineDisableCount = INIT_DISABLE_FRAME;
		this._exitWindow.close();
	};

	// コマンドウィンドウでコインを買うを押したときの処理
	EXC_DoublingSlotMachine.prototype.buyCoinSlot = function() {
		// 所持金不足チェック
		if($gameParty.gold() < _payMoney) {
			AudioManager.playSe({"name":_buzzerSE,"volume":90,"pitch":100,"pan":0});
		} else {
			Exc_addCoin(_buyCoin);
			$gameParty.loseGold(_payMoney);
			this.redrawText(_txtCoin, Exc_getCoin());
			_valueCoin.display = Exc_getCoin();

			AudioManager.playSe({"name":_buyCoinSE,"volume":90,"pitch":100,"pan":0});
		}
		_machineDisableCount = INIT_DISABLE_FRAME;
		this._exitWindow.close();
	};

	// コマンドウィンドウで終了を押したときの処理
	EXC_DoublingSlotMachine.prototype.exitSlot = function() {
		this.popScene();
	};
	
	//--------------------------------------------------
	// 確認ウィンドウ定義
	//--------------------------------------------------
	// 確認ウィンドウの作成
	function Exc_ExitWindow() {
		this.initialize.apply(this, arguments);
	}
	
	Exc_ExitWindow.prototype = Object.create(Window_Command.prototype);
	Exc_ExitWindow.prototype.constructor = Exc_ExitWindow;

	Exc_ExitWindow.prototype.initialize = function(rect) {
		Window_Command.prototype.initialize.call(this, rect);
	};

	// コマンドを設定
	Exc_ExitWindow.prototype.makeCommandList = function() {
		this.addCommand(_commandContinue, "continue", true);
		this.addCommand(_commandBuyCoin, "buyCoin", true);
		this.addCommand(_commandExit, "exit", true);
	};

})();