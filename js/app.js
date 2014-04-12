//================================================================================
//
//    app.js
//
//================================================================================


// [メモ]
// 右手系
// 半時計回りが表
// モデル変換、ビュー変換、プロジェクション変換
// 頂点シェーダー、フラグメント シェーダー
// attribute, uniform, varying
// VBO (Vertex Buffer Object), IBO (Index Buffer Object)


'use strict';


//--------------------------------------------------------------------------------
// コンストラクタ
//--------------------------------------------------------------------------------
function App()
{
}


//--------------------------------------------------------------------------------
// 定数
//--------------------------------------------------------------------------------
App.CANVAS_ID = 'screen';
App.CANVAS_WIDTH = 640;
App.CANVAS_HEIGHT = 480;
App.FPS = 30;


//--------------------------------------------------------------------------------
// WebGL 初期化を行います。
//--------------------------------------------------------------------------------
App.prototype.setupGl = function ( gl )
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
	gl.viewport( 0, 0, App.CANVAS_WIDTH, App.CANVAS_HEIGHT );

};


//--------------------------------------------------------------------------------
// WebGL の後片付けを行います。
//--------------------------------------------------------------------------------
App.prototype.tearDownGl = function ( gl )
{
	// Nothing to do.
};


//--------------------------------------------------------------------------------
// アプリケーションの初期化を行います。
//--------------------------------------------------------------------------------
App.prototype.initialize = function ( gl )
{
	this.setupGl( gl );

	this.running = true;

	var scene = new SceneTitle();
	scene.onCreate( gl );

	this.sceneStack = [];
	this.sceneStack.push( scene );
};


//--------------------------------------------------------------------------------
// アプリケーションの後片付けを行います。
//--------------------------------------------------------------------------------
App.prototype.finalize = function ( gl )
{
	while ( this.sceneStack.length > 0 )
	{
		var scene = this.sceneStack.pop();
		scene.onDestroy( gl );
	}

	this.tearDownGl( gl );
};


//--------------------------------------------------------------------------------
// アプリケーション ループ
//--------------------------------------------------------------------------------
App.prototype.loop = function ( gl )
{
	if ( this.running )
	{
		gl.clearColor( 0.1, 0.1, 0.1, 1.0 );
		gl.clearDepth( 1.0 );
		gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

		var scene = this.sceneStack[ this.sceneStack.length - 1 ];
		if ( scene )
		{
			var commands = scene.onUpdate( gl );
			scene.onRender( gl );

			if ( commands )
			{
				for ( var i = 0; i < commands.length; ++i )
				{
				}
			}
		}

		gl.flush();
	
		var that = this;
		setTimeout( function () { that.loop( gl ); }, 1000 / App.FPS );
	}
	else
	{
		this.finalize( gl );
	}
};


//--------------------------------------------------------------------------------
// 実行します。
//--------------------------------------------------------------------------------
App.prototype.run = function ()
{
	var canvas = document.getElementById( App.CANVAS_ID );
	if ( canvas )
	{
		var gl = canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' );
		if ( gl )
		{
			this.initialize( gl );
			this.loop( gl );
		}
		else
		{
			alert( 'Cannot get gl.' );
		}
	}
	else
	{
		alert( 'Cannot get canvas.' );
	}
};

