//================================================================================
//
//    scenemanager.js
//
//================================================================================


'use strict';


//--------------------------------------------------------------------------------
// �R���X�g���N�^
//--------------------------------------------------------------------------------
function SceneManager ()
{
	this.sceneStack = [];
	this.commandStack = [];
}


//--------------------------------------------------------------------------------
// �萔
//--------------------------------------------------------------------------------
SceneManager.COMMAND_TYPE_NONE  = 0;
SceneManager.COMMAND_TYPE_PUSH  = 1;
SceneManager.COMMAND_TYPE_POP   = 2;
SceneManager.COMMAND_TYPE_CLEAR = 3;


//--------------------------------------------------------------------------------
// �V�[�� �}�l�[�W���[�̌�Еt�����s���܂��B
//--------------------------------------------------------------------------------
SceneManager.prototype.finalize = function ( gl )
{
	this.onClear( gl );
};


//--------------------------------------------------------------------------------
// ���݂̃V�[�����擾���܂��B 
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
// �V�[�����v�b�V������R�}���h��ǉ����܂��B
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
// �V�[�����|�b�v����R�}���h��ǉ����܂��B
//--------------------------------------------------------------------------------
SceneManager.prototype.pop = function ()
{
	this.commandStack.push( { 'type' : SceneManager.COMMAND_TYPE_POP } );
};


//--------------------------------------------------------------------------------
// ���ׂẴV�[�����폜����R�}���h��ǉ����܂��B
//--------------------------------------------------------------------------------
SceneManager.prototype.clear = function ()
{
	this.commandStack.push( { 'type' : SceneManager.COMMAND_TYPE_CLEAR } );
};


//--------------------------------------------------------------------------------
// �V�[�����v�b�V�����܂��B 
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
// �V�[�����|�b�v���܂��B
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
// ���ׂẴV�[�����N���A���܂��B
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
// �V�[���𐧌䂵�܂��B
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

