//================================================================================
//
//    App.js
//
//================================================================================


'use strict';


//--------------------------------------------------------------------------------
// クラス App
//--------------------------------------------------------------------------------
function App ( canvasId )
{
	// 実行中かどうかを表すフラグ
	var m_running = true;

	// コア
	var m_core = null;

	// WebGL
	var m_gl = null;

	// シーン　マネージャー
	var m_sceneManager = null;

	// キャンバス　ID
	var m_canvasId = canvasId;


	//--------------------------------------------------------------------------------
	// WebGL の構築を行います。
	//--------------------------------------------------------------------------------
	var setUpGl = function ( canvasId )
	{
		var canvas = document.getElementById( canvasId );
		if ( canvas )
		{
			var gl = canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' );
			if ( gl )
			{
				// 【重要!!】
				// canvas のサイズは css で指定してはいけません!!
				// canvas のサイズを css で指定すると、
				// 300px * 150px の canvas が css で指定したサイズに引き伸ばされることになります。
				// (300px * 150px が canvas のデフォルト サイズらしい)
				// そのため、
				// gl.drawingBufferWidth と gl.drawingBufferHeight の値が canvas のサイズと一致せず、
				// viewport 設定がなんか変ってことになってしまいます。
				// なので、
				// canvas のサイズは属性で直に指定しましょう。
				gl.viewport( 0, 0, canvas.width, canvas.height );

				return gl;
			}
		}

		return null;
	};


	//--------------------------------------------------------------------------------
	// WebGL の取り壊しを行います。
	//--------------------------------------------------------------------------------
	var tearDownGl = function ( gl )
	{
	};


	//--------------------------------------------------------------------------------
	// アプリケーションの初期化を行います。
	//--------------------------------------------------------------------------------
	var initialize = function ( canvasId )
	{
		var gl = setUpGl( canvasId );
		if ( gl )
		{
			// 初期化の順序に注意!!

			m_core = {};
			m_core.time = 0;
			m_core.deltaTime = 0;
			m_core.requestPushScene = function ( scene, cooperative ) { m_sceneManager.requestPushScene( scene, cooperative ); };
			m_core.requestPopScene = function () { m_sceneManager.requestPopScene(); };
			m_core.requestClearAllScenes = function () { m_sceneManager.requestClearAllScenes(); };

			m_gl = gl;

			m_sceneManager = new SceneManager( m_core, m_gl );
			
			return true;
		}

		return false;
	};


	//--------------------------------------------------------------------------------
	// アプリケーションの後片付けを行います。
	//--------------------------------------------------------------------------------
	var finalize = function ()
	{
		// 後片付けの順序に注意!!

		m_sceneManager.finalize();
		m_sceneManager = null;

		tearDownGl( m_gl );
		m_gl = null;

		m_core.requestClearAllScenes = null;
		m_core.requestPopScene = null;
		m_core.requestPushScene = null;
		m_core.deltaTime = 0;
		m_core.time = 0;
		m_core = null;
	};


	//--------------------------------------------------------------------------------
	// 時間を更新します。
	//--------------------------------------------------------------------------------
	var updateTime = function ()
	{
		var now = DateTime.now();
		m_core.deltaTime = ( m_core.time ) ? ( now - m_core.time ) : 0;
		m_core.time = now;
	};


	//--------------------------------------------------------------------------------
	// フレーム処理を行います。
	//--------------------------------------------------------------------------------
	var processFrame = function ()
	{
		if ( m_running )
		{
			updateTime();

			m_sceneManager.process();
		
			var requestId = window.requestProcessNextFrame( processFrame );
		}
		else
		{
			finalize();
		}
	};


	//--------------------------------------------------------------------------------
	// アプリケーションを実行します。
	//--------------------------------------------------------------------------------
	this.run = function ()
	{
		var result = initialize( m_canvasId );
		if ( result )
		{
			// 最初のシーンをプッシュします。
			m_sceneManager.requestPushScene( new SceneTitle1(), false );

			processFrame();
		}
	};
}
