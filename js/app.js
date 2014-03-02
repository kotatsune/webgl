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
App.CANVAS_ID = 'screen';
App.CANVAS_WIDTH = 640;
App.CANVAS_HEIGHT = 480;
App.FPS = 1;
App.SCRIPT_TYPE_VERTEX_SHADER = "x-shader/x-vertex";
App.SCRIPT_TYPE_FRAGMENT_SHADER = "x-shader/x-fragment";


//--------------------------------------------------------------------------------
// シェーダーを作成します。
//--------------------------------------------------------------------------------
App.prototype.createShader = function ( gl, id )
{
	var script = document.getElementById( id );
	if ( !script )
	{
		alert( 'Script not found.' );

		return null;
	}
	
	var shader = null;
	switch ( script.type )
	{
		case App.SCRIPT_TYPE_VERTEX_SHADER :
			{
				shader = gl.createShader( gl.VERTEX_SHADER );
			}
			break;
			
		case App.SCRIPT_TYPE_FRAGMENT_SHADER :
			{
				shader = gl.createShader( gl.FRAGMENT_SHADER );
			}
			break;

		default :
			{
				alert( 'Bad script type.' );
			}
			return null;
	}
	
	gl.shaderSource( shader, script.text );
	gl.compileShader( shader ); 
	if ( !gl.getShaderParameter( shader, gl.COMPILE_STATUS ) )
	{
		alert( gl.getShaderInfoLog( shader ) );

		return null;
	}

	return shader;
};


//--------------------------------------------------------------------------------
// プログラム オブジェクトを作成します。
//--------------------------------------------------------------------------------
App.prototype.createProgramObject = function ( gl, vs, fs )
{
	var program = gl.createProgram();
	gl.attachShader( program, vs );
	gl.attachShader( program, fs );
	gl.linkProgram( program );
	
	if ( !gl.getProgramParameter( program, gl.LINK_STATUS ) )
	{
		alert( gl.getProgramInfoLog( program ) );

		return null;
	}

	gl.useProgram( program );

	return program;
};


//--------------------------------------------------------------------------------
// VBO を作成します。
//--------------------------------------------------------------------------------
App.prototype.createVBO = function ( gl, data )
{
	// gl.ARRAY_BUFFER と gl.ELEMENT_ARRAY_BUFFER の違いに注意!!
	var vbo = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vbo );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( data ), gl.STATIC_DRAW );
	gl.bindBuffer( gl.ARRAY_BUFFER, null );
	
	return vbo;
};


//--------------------------------------------------------------------------------
// IBO を作成します。
//--------------------------------------------------------------------------------
App.prototype.createIBO = function ( gl, data )
{
	// gl.ARRAY_BUFFER と gl.ELEMENT_ARRAY_BUFFER の違いに注意!!
	var ibo = gl.createBuffer();
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, ibo );
	gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Int16Array( data ), gl.STATIC_DRAW );
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, null );
	
	return ibo;
};


//--------------------------------------------------------------------------------
// WebGL の初期化を行います。
//--------------------------------------------------------------------------------
App.prototype.setupGl = function ( gl )
{
	this.vertexShader1 = this.createShader( gl, 'vertex-shader-1' );
	this.fragmentShader1 = this.createShader( gl, 'fragment-shader-1' );
	this.programObject1 = this.createProgramObject( gl, this.vertexShader1, this.fragmentShader1 );
	this.vertices1 = this.createVBO( gl, Model.Box.VERTICES );
	this.indices1 = this.createIBO( gl, Model.Box.INDICES );
};


//--------------------------------------------------------------------------------
// WebGL の後片付けを行います。
//--------------------------------------------------------------------------------
App.prototype.tearDownGl = function ( gl )
{
	// Nothing to do.
};


//--------------------------------------------------------------------------------
// シーン 1 をレンダリングします。
//--------------------------------------------------------------------------------
App.prototype.renderScene1 = function ( gl )
{
	gl.enable( gl.CULL_FACE );
	gl.frontFace( gl.CCW );

	gl.bindBuffer( gl.ARRAY_BUFFER, this.vertices1 );

	// 使用されない attribute はデッドストリップされ、getAttribLocation() で位置を取得できなくなります!!
	
	var positionLocation = gl.getAttribLocation( this.programObject1, 'position' );
	gl.enableVertexAttribArray( positionLocation );
	gl.vertexAttribPointer( positionLocation, 3, gl.FLOAT, false, 40, 0 );

	//var normalLocation = gl.getAttribLocation( this.programObject1, 'normal' );
	//gl.enableVertexAttribArray( normalLocation );
	//gl.vertexAttribPointer( normalLocation, 3, gl.FLOAT, false, 40, 12 );

	//var colorLocation = gl.getAttribLocation( this.programObject1, 'color' );
	//gl.enableVertexAttribArray( colorLocation );
	//gl.vertexAttribPointer( colorLocation, 4, gl.FLOAT, false, 40, 24 );

	var mvpMatrix = Mat4.identity();
	var mvpMatrixUniformLocation = gl.getUniformLocation( this.programObject1, 'mvpMatrix' );
	gl.uniformMatrix4fv( mvpMatrixUniformLocation, false, mvpMatrix );

	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices1 );

	gl.enable( gl.BLEND );
	gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );

	//gl.drawElements( gl.TRIANGLES, this.indices1.length, gl.UNSIGNED_SHORT, 0 );

	gl.disable( gl.BLEND );
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, null );
	gl.bindBuffer( gl.ARRAY_BUFFER, null );
};


//--------------------------------------------------------------------------------
// ループ
//--------------------------------------------------------------------------------
App.prototype.loop = function ( gl )
{
	//console.log( 'loop()' );

	gl.clearColor( 0.0, 0.0, 1.0, 1.0 );
	gl.clearDepth( 1.0 );
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

	this.renderScene1( gl );

	gl.flush();
	
	var that = this;
	setTimeout( function () { that.loop( gl ); }, 1000 / App.FPS );
};


//--------------------------------------------------------------------------------
// 実行します。
//--------------------------------------------------------------------------------
App.prototype.run = function ()
{
	var canvas = document.getElementById( App.CANVAS_ID );
	if ( !canvas )
	{
		alert( 'Cannot get canvas.' );

		return;
	}

	var gl = canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' );
	if ( !gl )
	{
		alert( 'Cannot get gl.' );

		return
	}

	this.setupGl( gl );	
	this.loop( gl );
};