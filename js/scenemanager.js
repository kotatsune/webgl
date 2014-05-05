//================================================================================
//
//    SceneManager.js
//
//================================================================================


'use strict';


//--------------------------------------------------------------------------------
// クラス　SceneManager
//--------------------------------------------------------------------------------
function SceneManager ( core, gl )
{
	// 定数
	var REQUEST_TYPE_NONE             = 0;
	var REQUEST_TYPE_PUSH_SCENE       = 1;
	var REQUEST_TYPE_POP_SCENE        = 2;
	var REQUEST_TYPE_CLEAR_ALL_SCENES = 3;


	// リクエスト スタック
	var m_requestStack = [];

	// シーン　スタック
	var m_sceneStack = [];

	// コア
	var m_core = core;

	// WebGL
	var m_gl = gl;


	//--------------------------------------------------------------------------------
	// シーン マネージャーの後片付けを行います。
	//--------------------------------------------------------------------------------
	this.finalize = function ()
	{
		clearAllScenes();

		m_core = null;
		m_gl = null;
	};


	//--------------------------------------------------------------------------------
	// シーンのプッシュをリクエストします。
	//--------------------------------------------------------------------------------
	this.requestPushScene = function ( scene, cooperative )
	{
		if ( !scene )
		{
			alert( 'Scene is invalid.' );

			return;
		}

		var request = { 'type' : REQUEST_TYPE_PUSH_SCENE, 'scene' : scene, 'cooperative' : cooperative };
		
		m_requestStack.push( request );
		//Array.prototype.push.apply( m_requestStack, [ request ] );  // 大量の配列を連結する場合は、こっちの方が高速らしい。
	};


	//--------------------------------------------------------------------------------
	// シーンのポップをリクエストします。
	//--------------------------------------------------------------------------------
	this.requestPopScene = function ()
	{
		var request = { 'type' : REQUEST_TYPE_POP_SCENE };

		m_requestStack.push( request );
	};


	//--------------------------------------------------------------------------------
	// すべてのシーンのクリアをリクエストします。
	//--------------------------------------------------------------------------------
	this.requestClearAllScenes = function ()
	{
		var request = { 'type' : REQUEST_TYPE_CLEAR_ALL_SCENES };

		m_requestStack.push( request );
	};


	//--------------------------------------------------------------------------------
	// 実際に、シーンをプッシュします。
	//--------------------------------------------------------------------------------
	var pushScene = function ( nextScene, cooperative )
	{
		if ( nextScene )
		{
			if ( !cooperative )
			{
				var currentScene = peekTopScene();
				if ( currentScene && currentScene.isActive() )
				{
					currentScene.activate( false );
					currentScene.onPause( m_core, m_gl );
				}
			}

			nextScene.onCreate( m_core, m_gl );
			nextScene.onResume( m_core, m_gl );
			nextScene.activate( true );
		
			m_sceneStack.push( nextScene );
		}
	};


	//--------------------------------------------------------------------------------
	// 実際に、シーンをポップします。
	//--------------------------------------------------------------------------------
	var popScene = function ()
	{
		var currentScene = m_sceneStack.pop();
		if ( currentScene )
		{
			currentScene.activate( false );
			currentScene.onPause( m_core, m_gl );
			currentScene.onDestroy( m_core, m_gl );

			var nextScene = peekTopScene();
			if ( nextScene && !nextScene.isActive() )
			{
				nextScene.onResume( m_core, m_gl );
				nextScene.activate( true );
			}
		}
	};


	//--------------------------------------------------------------------------------
	// 実際に、すべてのシーンをクリアします。
	//--------------------------------------------------------------------------------
	var clearAllScenes = function ()
	{
		var scene = undefined;
		while ( scene = m_sceneStack.pop() )
		{
			scene.activate( false );
			scene.onPause( m_core, m_gl );
			scene.onDestroy( m_core, m_gl );
		}
	};


	//--------------------------------------------------------------------------------
	// 最上位のシーンを参照します。
	//--------------------------------------------------------------------------------
	var peekTopScene = function ()
	{
		if ( m_sceneStack.length > 0 )
		{
			return m_sceneStack[ m_sceneStack.length - 1 ];
		}

		return undefined;
	};


	//--------------------------------------------------------------------------------
	// リクエストを処理します。
	//--------------------------------------------------------------------------------
	var processRequests = function ()
	{
		var request = undefined;
		while ( request = m_requestStack.pop() )
		{
			switch ( request.type )
			{
				case REQUEST_TYPE_PUSH_SCENE :
					pushScene( request.scene, request.cooperative );
					break;

				case REQUEST_TYPE_POP_SCENE :
					popScene();
					break;

				case REQUEST_TYPE_CLEAR_ALL_SCENES :
					clearAllScenes();
					break;

				case REQUEST_TYPE_NONE :
				default :
					break;
			}
		}
	};


	//--------------------------------------------------------------------------------
	// シーンを処理します。
	//--------------------------------------------------------------------------------
	var processScenes = function ()
	{
		var startSceneIndex = m_sceneStack.length;
		var endSceneIndex = m_sceneStack.length - 1;

		for ( var i = endSceneIndex; i >= 0; --i )
		{
			if ( !m_sceneStack[ i ].isActive() )
			{
				break;
			}

			startSceneIndex = i;
		}

		for ( var j = startSceneIndex; j <= endSceneIndex; ++j )
		{
			var scene = m_sceneStack[ j ];
			scene.onUpdate( m_core, m_gl );
			scene.onRender( m_core, m_gl );
		}
	};


	//--------------------------------------------------------------------------------
	// シーンを制御します。
	//--------------------------------------------------------------------------------
	this.process = function ()
	{
		m_gl.clearColor( 0.1, 0.1, 0.1, 1.0 );
		m_gl.clearDepth( 1.0 );
		m_gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

		processRequests();
		processScenes();

		m_gl.flush();
	};
}
