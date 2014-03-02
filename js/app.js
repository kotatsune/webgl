//================================================================================
//
//  test.js
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


function App() {}


//--------------------------------------------------------------------------------
// 定数
//--------------------------------------------------------------------------------
App.prototype.CANVAS_ID = 'screen';
App.prototype.CANVAS_WIDTH = 640;
App.prototype.CANVAS_HEIGHT = 480;
App.prototype.FPS = 1;


//--------------------------------------------------------------------------------
// WebGL の初期化を行います。
//--------------------------------------------------------------------------------
App.prototype.setupGl = function ( gl )
{
}


//--------------------------------------------------------------------------------
// WebGL の後片付けを行います。
//--------------------------------------------------------------------------------
App.prototype.tearDownGl = function ( gl )
{
}


//--------------------------------------------------------------------------------
// ループ
//--------------------------------------------------------------------------------
App.prototype.loop = function ( gl )
{
	//console.log( 'loop()' );

	gl.clearColor( 0.0, 0.0, 1.0, 1.0 );
	gl.clearDepth( 1.0 );
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

	gl.flush();
	
	var that = this;
	setTimeout( function () { that.loop( gl ); }, 1000 / this.FPS );
}


//--------------------------------------------------------------------------------
// ループ
//--------------------------------------------------------------------------------
App.prototype.run = function ()
{
	var canvas = document.getElementById( this.CANVAS_ID );
	if ( canvas )
	{
		var gl = canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' );
		if ( gl )
		{
			
			this.loop( gl );
		}
	}
}
