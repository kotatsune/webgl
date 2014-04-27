//================================================================================
//
//    SceneManager.js
//
//================================================================================


'use strict';


//--------------------------------------------------------------------------------
//  コンストラクタ
//--------------------------------------------------------------------------------
function SceneManager ()
{
	this.sceneStack = [];
	this.commandStack = [];
}


//--------------------------------------------------------------------------------
// 定数
//--------------------------------------------------------------------------------
SceneManager.COMMAND_TYPE_NONE             = 0;
SceneManager.COMMAND_TYPE_PUSH_SCENE       = 1;
SceneManager.COMMAND_TYPE_POP_SCENE        = 2;
SceneManager.COMMAND_TYPE_CLEAR_ALL_SCENES = 3;


//--------------------------------------------------------------------------------
// シーン マネージャーの後片付けを行います。
//--------------------------------------------------------------------------------
SceneManager.prototype.finalize = function ( gl, app )
{
	this.onClearAllScenes( gl, app );
};


//--------------------------------------------------------------------------------
// 現在のシーンを取得します。
//--------------------------------------------------------------------------------
SceneManager.prototype.getCurrentScene = function ()
{
	var sceneStack = this.sceneStack;
	if ( sceneStack.length > 0 )
	{
		return sceneStack[ sceneStack.length - 1 ];
	}

	return null;
};


//--------------------------------------------------------------------------------
// シーンをプッシュします。
//--------------------------------------------------------------------------------
SceneManager.prototype.pushScene = function ( scene )
{
	if ( !scene )
	{
		alert( 'Scene is invalid.' );
	}
	
	this.commandStack.push( { 'type' : SceneManager.COMMAND_TYPE_PUSH_SCENE, 'scene' : scene } );
	//Array.prototype.push.apply( this.commandStack, [ { 'type' : SceneManager.COMMAND_TYPE_PUSH, 'scene' : scene } ] );
};


//--------------------------------------------------------------------------------
// シーンをポップします。
//--------------------------------------------------------------------------------
SceneManager.prototype.popScene = function ()
{
	this.commandStack.push( { 'type' : SceneManager.COMMAND_TYPE_POP_SCENE } );
};


//--------------------------------------------------------------------------------
// すべてのシーンをクリアします。
//--------------------------------------------------------------------------------
SceneManager.prototype.clearAllScenes = function ()
{
	this.commandStack.push( { 'type' : SceneManager.COMMAND_TYPE_CLEAR_ALL_SCENES } );
};


//--------------------------------------------------------------------------------
// シーンのプッシュを実行します。
//--------------------------------------------------------------------------------
SceneManager.prototype.onPushScene = function ( gl, app, scene )
{
	var currentScene = this.getCurrentScene();
	if ( currentScene )
	{
		currentScene.onPause( gl, app );
	}

	if ( scene )
	{
		scene.onCreate( gl, app );
		scene.onResume( gl, app );
	
		this.sceneStack.push( scene );
	}
};


//--------------------------------------------------------------------------------
// シーンのポップを実行します。
//--------------------------------------------------------------------------------
SceneManager.prototype.onPopScene = function ( gl, app )
{
	var currentScene = this.getCurrentScene();
	if ( currentScene )
	{
		currentScene.onPause( gl, app );
		currentScene.onDestroy( gl, app );

		this.sceneStack.pop();
	}

	var scene = this.getCurrentScene();
	if ( scene )
	{
		scene.onResume( gl, app );
	}
};


//--------------------------------------------------------------------------------
// すべてのシーンのクリアを実行します。
//--------------------------------------------------------------------------------
SceneManager.prototype.onClearAllScenes = function ( gl, app )
{
	var sceneStack = this.sceneStack;
	while ( sceneStack.length > 0 )
	{
		var scene = sceneStack.pop();
		scene.onPause( gl, app );
		scene.onDestroy( gl, app );
	}
};



//--------------------------------------------------------------------------------
// コマンドを処理します。
//--------------------------------------------------------------------------------
SceneManager.prototype.processCommands = function ( gl, app )
{
	var commandStack = this.commandStack;
	while ( commandStack.length > 0 )
	{
		var command = commandStack.pop();
		switch ( command.type )
		{
			case SceneManager.COMMAND_TYPE_PUSH_SCENE :
				this.onPushScene( gl, app, command.scene );
				break;

			case SceneManager.COMMAND_TYPE_POP_SCENE :
				this.onPopScene( gl, app );
				break;

			case SceneManager.COMMAND_TYPE_CLEAR_ALL_SCENES :
				this.onClearAllScenes( gl, app );
				break;

			case SceneManager.COMMAND_TYPE_NONE :
			default :
				break;
		}
	}
};


//--------------------------------------------------------------------------------
// シーンを処理します。
//--------------------------------------------------------------------------------
SceneManager.prototype.processScenes = function ( gl, app )
{
	var sceneStack = this.sceneStack;

	var endSceneIndex = sceneStack.length - 1;
	var startSceneIndex = endSceneIndex;
	while ( startSceneIndex > 0 )
	{
		if ( sceneStack[ startSceneIndex ].isOverlay() )
		{
			--startSceneIndex;
		}
		else
		{
			break;
		}
	}

	for ( var sceneIndex = startSceneIndex; sceneIndex <= endSceneIndex; ++sceneIndex )
	{
		var scene = sceneStack[ sceneIndex ];
		scene.onUpdate( gl, app );
		scene.onRender( gl, app );
	}
};


//--------------------------------------------------------------------------------
// シーンを制御します。
//--------------------------------------------------------------------------------
SceneManager.prototype.process = function ( gl, app )
{
	this.processCommands( gl, app );
	this.processScenes( gl, app );
};

