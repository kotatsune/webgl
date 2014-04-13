//================================================================================
//
//    scenemanager.js
//
//================================================================================


'use strict';


//--------------------------------------------------------------------------------
// コンストラクタ
//--------------------------------------------------------------------------------
function SceneManager ()
{
	this.sceneStack = [];
	this.commandStack = [];
}


//--------------------------------------------------------------------------------
// 定数
//--------------------------------------------------------------------------------
SceneManager.COMMAND_TYPE_NONE  = 0;
SceneManager.COMMAND_TYPE_PUSH  = 1;
SceneManager.COMMAND_TYPE_POP   = 2;
SceneManager.COMMAND_TYPE_CLEAR = 3;


//--------------------------------------------------------------------------------
// シーン マネージャーの後片付けを行います。
//--------------------------------------------------------------------------------
SceneManager.prototype.finalize = function ( gl )
{
	this.onClear( gl );
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
// シーンをプッシュするコマンドを追加します。
//--------------------------------------------------------------------------------
SceneManager.prototype.push = function ( scene )
{
	if ( !scene )
	{
		alert( 'Scene is invalid.' );
	}
	
	this.commandStack.push( { 'type' : SceneManager.COMMAND_TYPE_PUSH, 'scene' : scene } );
	//Array.prototype.push.apply( this.commandStack, [ { 'type' : SceneManager.COMMAND_TYPE_PUSH, 'scene' : scene } ] );
};


//--------------------------------------------------------------------------------
// シーンをポップするコマンドを追加します。
//--------------------------------------------------------------------------------
SceneManager.prototype.pop = function ()
{
	this.commandStack.push( { 'type' : SceneManager.COMMAND_TYPE_POP } );
};


//--------------------------------------------------------------------------------
// すべてのシーンを削除するコマンドを追加します。
//--------------------------------------------------------------------------------
SceneManager.prototype.clear = function ()
{
	this.commandStack.push( { 'type' : SceneManager.COMMAND_TYPE_CLEAR } );
};


//--------------------------------------------------------------------------------
// シーンをプッシュします。 
//--------------------------------------------------------------------------------
SceneManager.prototype.onPush = function ( gl, newScene )
{
	var currentScene = this.getCurrentScene();
	if ( currentScene )
	{
		currentScene.onPause( gl );
	}

	if ( newScene )
	{
		newScene.onCreate( gl );
		newScene.onResume( gl );
	
		this.sceneStack.push( newScene );	
	}
};


//--------------------------------------------------------------------------------
// シーンをポップします。
//--------------------------------------------------------------------------------
SceneManager.prototype.onPop = function ( gl )
{
	var currentScene = this.getCurrentScene();
	if ( currentScene )
	{
		currentScene.onPause( gl );
		currentScene.onDestroy( gl );

		this.sceneStack.pop();
	}

	var newScene = this.getCurrentScene();
	if ( newScene )
	{
		newScene.onResume( gl );
	}
};


//--------------------------------------------------------------------------------
// すべてのシーンをクリアします。
//--------------------------------------------------------------------------------
SceneManager.prototype.onClear = function ( gl )
{
	var sceneStack = this.sceneStack;
	while ( sceneStack.length > 0 )
	{
		var scene = sceneStack.pop();
		scene.onPause( gl );
		scene.onDestroy( gl );
	}
};


//--------------------------------------------------------------------------------
// シーンを制御します。
//--------------------------------------------------------------------------------
SceneManager.prototype.control = function ( gl )
{
	var commandStack = this.commandStack;
	while ( commandStack.length > 0 )
	{
		var command = commandStack.pop();
		switch ( command.type )
		{
			case SceneManager.COMMAND_TYPE_PUSH :
				this.onPush( gl, command.scene );
				break;

			case SceneManager.COMMAND_TYPE_POP :
				this.onPop( gl );
				break;

			case SceneManager.COMMAND_TYPE_CLEAR :
				this.onClear( gl );
				break;

			case SceneManager.COMMAND_TYPE_NONE :
			default :
				break;
		}
	}

	var currentScene = this.getCurrentScene();
	currentScene.onUpdate( gl, this );
	currentScene.onRender( gl );
};

