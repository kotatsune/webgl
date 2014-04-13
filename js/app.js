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
	gl.viewport( 0, 0, Common.CANVAS_WIDTH, Common.CANVAS_HEIGHT );

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
	this.running = true;

	this.setupGl( gl );

	this.sceneManager = new SceneManager();
	this.sceneManager.push( new SceneTitle1() );
};


//--------------------------------------------------------------------------------
// アプリケーションの後片付けを行います。
//--------------------------------------------------------------------------------
App.prototype.finalize = function ( gl )
{
	this.sceneManager.finalize();

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

		this.sceneManager.control( gl );

		gl.flush();
	
		var that = this;
		setTimeout( function () { that.loop( gl ); }, 1000 / Common.FPS );
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
	var canvas = document.getElementById( Common.CANVAS_ID );
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

