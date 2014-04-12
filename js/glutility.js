//================================================================================
//
//    glutility.js
//
//================================================================================


'use strict';


var GLUT = {};


//--------------------------------------------------------------------------------
// �萔
//--------------------------------------------------------------------------------
GLUT.SCRIPT_TYPE_VERTEX_SHADER = "x-shader/x-vertex";
GLUT.SCRIPT_TYPE_FRAGMENT_SHADER = "x-shader/x-fragment";


//--------------------------------------------------------------------------------
// �V�F�[�_�[���쐬���܂��B
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
// �v���O���� �I�u�W�F�N�g���쐬���܂��B
//--------------------------------------------------------------------------------
GLUT.createProgramObject = function ( gl, vs, fs )
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
// VBO ���쐬���܂��B
//--------------------------------------------------------------------------------
GLUT.createVBO = function ( gl, data )
{
	// gl.ARRAY_BUFFER �� gl.ELEMENT_ARRAY_BUFFER �̈Ⴂ�ɒ���!!
	var vbo = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vbo );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( data ), gl.STATIC_DRAW );
	gl.bindBuffer( gl.ARRAY_BUFFER, null );
	
	return vbo;
};


//--------------------------------------------------------------------------------
// IBO ���쐬���܂��B
//--------------------------------------------------------------------------------
GLUT.createIBO = function ( gl, data )
{
	// gl.ARRAY_BUFFER �� gl.ELEMENT_ARRAY_BUFFER �̈Ⴂ�ɒ���!!
	var ibo = gl.createBuffer();
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, ibo );
	gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Int16Array( data ), gl.STATIC_DRAW );
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, null );
	
	return ibo;
};


//--------------------------------------------------------------------------------
// �e�N�X�`�����쐬���܂��B
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
