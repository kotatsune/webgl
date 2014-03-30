//================================================================================
//
//    test.js
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
// テクスチャを作成します。
//--------------------------------------------------------------------------------
App.prototype.createTexture = function ( gl, name, source, callback )
{
	var asyncResult = { 'textureId' : null, 'loaded' : false, 'name' : name, 'source' : source };

	{
		var image = new Image();

		image.onload = function ()
		{
			var textureId = gl.createTexture();
			gl.activeTexture( gl.TEXTURE0 );
			gl.bindTexture( gl.TEXTURE_2D, textureId );
			gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image );
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR );
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR );
			gl.generateMipmap( gl.TEXTURE_2D );
			gl.bindTexture( gl.TEXTURE_2D, null );

			asyncResult.textureId = textureId;
			asyncResult.loaded = true;

			if ( callback )
			{
				callback( asyncResult );
			}
		};

		image.src = source;
	}

	return asyncResult;
};


//--------------------------------------------------------------------------------
// WebGL の初期化を行います。
//--------------------------------------------------------------------------------
App.prototype.setupGl = function ( gl )
{
	this.mat4Pool = new Float32ArrayPool( 16 );
	this.rad = 0.0;
	this.t = 0.0;

	this.vertexShader1 = this.createShader( gl, 'vertex-shader-1' );
	this.fragmentShader1 = this.createShader( gl, 'fragment-shader-1' );
	this.programObject1 = this.createProgramObject( gl, this.vertexShader1, this.fragmentShader1 );
	this.vertices1 = this.createVBO( gl, Model.Box.VERTICES );
	this.indices1 = this.createIBO( gl, Model.Box.INDICES );
	this.texture1 = this.createTexture( gl, 'miku.png', '/image/miku.png', function ( ar ) { console.log( ar.name + ' has been created.' ); } );

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
// シーン 1 をレンダリングします。
//--------------------------------------------------------------------------------
App.prototype.renderScene1 = function ( gl )
{
	var matPool = this.mat4Pool;
	matPool.reset();

	this.rad += 0.01;

	this.t += 0.01;
	if ( this.t >= 1.0 ) { this.t = 0.0; }
	
	gl.enable( gl.CULL_FACE );
	gl.frontFace( gl.CCW );

	gl.bindBuffer( gl.ARRAY_BUFFER, this.vertices1 );

	// 使用されない attribute 等はデッドストリップされ、getAttribLocation() で位置を取得できなくなります!!
	// 位置の取得に失敗した場合は -1 が返されます。
	
	var positionLocation = gl.getAttribLocation( this.programObject1, 'position' );
	gl.enableVertexAttribArray( positionLocation );
	gl.vertexAttribPointer( positionLocation, 3, gl.FLOAT, false, 48, 0 );

	//var normalLocation = gl.getAttribLocation( this.programObject1, 'normal' );
	//gl.enableVertexAttribArray( normalLocation );
	//gl.vertexAttribPointer( normalLocation, 3, gl.FLOAT, false, 48, 12 );

	var colorLocation = gl.getAttribLocation( this.programObject1, 'color' );
	gl.enableVertexAttribArray( colorLocation );
	gl.vertexAttribPointer( colorLocation, 4, gl.FLOAT, false, 48, 24 );

	var uvLocation = gl.getAttribLocation( this.programObject1, 'uv' );
	gl.enableVertexAttribArray( uvLocation );
	gl.vertexAttribPointer( uvLocation, 2, gl.FLOAT, false, 48, 40 );

	//var axis1 = Vec3.normalize( Vec3.create( [ 1, 0, 0 ] ) );
	//var quat1 = Quat.rotation( axis1, Math.PI * 0.5 ); 
	//var axis2 = Vec3.normalize( Vec3.create( [ 0, 1, 0 ] ) );
	//var quat2 = Quat.rotation( axis2, Math.PI * 0.5 ); 
	//var quat = Quat.slerp( quat1, quat2, this.t );
	//var mMatrix = Quat.toMat4( quat, matPool.get() );

	var axis = Vec3.normalize( [ 0, 1, 0 ] );
	var quat = Quat.rotation( axis, this.rad );
	var mMatrix = Quat.toMat4( quat );

	var s = App.CANVAS_WIDTH / App.CANVAS_HEIGHT;
	var fovy = 30.0;
	var d = 1.0 * s + 1.0 / Math.tan( Math.PI * fovy / 360.0 );

	var scaleMatrix = Mat4.scale( [ s, 1, s ] );
	mMatrix = Mat4.multiply( mMatrix, scaleMatrix, matPool.get() );

	var vMatrix = Mat4.lookAt( [ 0, 0, d ], [ 0, 0, 0 ], [ 0, 1, 0 ], matPool.get() );
	var pMatrix = Mat4.perspective( fovy, App.CANVAS_WIDTH / App.CANVAS_HEIGHT, 0.1, 100, matPool.get() );
	//var pMatrix = Mat4.frustum( 0, 640, 0, 480, 0.1, 100 );

	var pvMatrix = Mat4.multiply( pMatrix, vMatrix, matPool.get() );
	var mvpMatrix = Mat4.multiply( pvMatrix, mMatrix, matPool.get() );

	var mvpMatrixUniformLocation = gl.getUniformLocation( this.programObject1, 'mvpMatrix' );
	gl.uniformMatrix4fv( mvpMatrixUniformLocation, false, mvpMatrix );

	var texture0Location = gl.getUniformLocation( this.programObject1, 'texture0' );
	gl.uniform1i( texture0Location, 0 );

	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices1 );

	gl.enable( gl.BLEND );
	gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );

	if ( this.texture1.textureId )
	{
		gl.activeTexture( gl.TEXTURE0 );
		gl.bindTexture( gl.TEXTURE_2D, this.texture1.textureId );
	}
	else
	{
		gl.activeTexture( gl.TEXTURE0 );
		gl.bindTexture( gl.TEXTURE_2D, null );
	}

	//gl.drawArrays(gl.TRIANGLES, 0, 3);
	gl.drawElements( gl.TRIANGLES, Model.Box.INDICES.length, gl.UNSIGNED_SHORT, 0 );

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

	gl.clearColor( 0.1, 0.1, 0.1, 1.0 );
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
