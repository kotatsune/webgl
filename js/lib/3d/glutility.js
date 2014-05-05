//================================================================================
//
//    GlUtility.js
//
//================================================================================


'use strict';


var GLUT = {};


//--------------------------------------------------------------------------------
// 定数
//--------------------------------------------------------------------------------
GLUT.SCRIPT_TYPE_VERTEX_SHADER = "x-shader/x-vertex";
GLUT.SCRIPT_TYPE_FRAGMENT_SHADER = "x-shader/x-fragment";


//--------------------------------------------------------------------------------
// シェーダーを作成します。
//--------------------------------------------------------------------------------
GLUT.createShader = function ( gl, id )
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
		case GLUT.SCRIPT_TYPE_VERTEX_SHADER :
			{
				shader = gl.createShader( gl.VERTEX_SHADER );
			}
			break;
			
		case GLUT.SCRIPT_TYPE_FRAGMENT_SHADER :
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
// シェーダーを削除します。
//--------------------------------------------------------------------------------
GLUT.deleteShader = function ( gl, shader )
{
	gl.deleteShader( shader );
};


//--------------------------------------------------------------------------------
// プログラムを作成します。
//--------------------------------------------------------------------------------
GLUT.createProgram = function ( gl, vertexShader, fragmentShader )
{
	var program = gl.createProgram();
	gl.attachShader( program, vertexShader );
	gl.attachShader( program, fragmentShader );
	gl.linkProgram( program );
	
	if ( !gl.getProgramParameter( program, gl.LINK_STATUS ) )
	{
		alert( gl.getProgramInfoLog( program ) );

		gl.deleteProgram( program );

		return null;
	}

	gl.useProgram( program );

	return program;
};


//--------------------------------------------------------------------------------
// プログラムを削除します。
//--------------------------------------------------------------------------------
GLUT.deleteProgram = function ( gl, program )
{
	gl.deleteProgram( program );
};


//--------------------------------------------------------------------------------
// 頂点バッファを作成します。
//--------------------------------------------------------------------------------
GLUT.createVertexBuffer = function ( gl, data )
{
	// gl.ARRAY_BUFFER と gl.ELEMENT_ARRAY_BUFFER の違いに注意!!
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( data ), gl.STATIC_DRAW );
	gl.bindBuffer( gl.ARRAY_BUFFER, null );
	
	return vertexBuffer;
};


//--------------------------------------------------------------------------------
// 頂点バッファを削除します。
//--------------------------------------------------------------------------------
GLUT.deleteVertexBuffer = function ( gl, vertexBuffer )
{
	gl.deleteBuffer( vertexBuffer );
};


//--------------------------------------------------------------------------------
// インデックス バッファを作成します。
//--------------------------------------------------------------------------------
GLUT.createIndexBuffer = function ( gl, data )
{
	// gl.ARRAY_BUFFER と gl.ELEMENT_ARRAY_BUFFER の違いに注意!!
	var indexBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indexBuffer );
	gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Int16Array( data ), gl.STATIC_DRAW );
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, null );
	
	return indexBuffer;
};


//--------------------------------------------------------------------------------
// インデックス バッファを削除します。
//--------------------------------------------------------------------------------
GLUT.deleteIndexBuffer = function ( gl, indexBuffer )
{
	gl.deleteBuffer( indexBuffer );
};


//--------------------------------------------------------------------------------
// テクスチャを作成します。
//--------------------------------------------------------------------------------
GLUT.createTexture = function ( gl, name, source, callback )
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
// テクスチャを削除します。
//--------------------------------------------------------------------------------
GLUT.deleteTexture = function ( gl, texture )
{
	gl.deleteTexture( texture );
};
