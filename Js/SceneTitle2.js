//================================================================================
//
//    SceneTitle2.js
//
//================================================================================


'use strict';


//--------------------------------------------------------------------------------
// コンストラクタ
//--------------------------------------------------------------------------------
function SceneTitle2()
{
	//SceneBase.apply( this, arguments ); 
	SceneBase.apply( this, [ 'Title2', true ] ); 
}

SceneTitle2.prototype = Object.create( SceneBase.prototype );
SceneTitle2.prototype.constructor = SceneTitle2;


//--------------------------------------------------------------------------------
// シーンが作成されるときに呼ばれます。
//--------------------------------------------------------------------------------
SceneTitle2.prototype.onCreate = function ( gl, app )
{
	this.mat4Pool = new Float32ArrayPool( 16 );
	this.rad = 0.0;
	this.t = 0.0;

	var vertexShader1 = GLUT.createShader( gl, 'vertex-shader-1' );
	var fragmentShader1 = GLUT.createShader( gl, 'fragment-shader-1' );
	this.program1 = GLUT.createProgram( gl, vertexShader1, fragmentShader1 );
	GLUT.deleteShader( gl, vertexShader1 );
	GLUT.deleteShader( gl, fragmentShader1 );

	this.vertices1 = GLUT.createVertexBuffer( gl, Model.Box.VERTICES );
	this.indices1 = GLUT.createIndexBuffer( gl, Model.Box.INDICES );
	this.texture1 = GLUT.createTexture( gl, 'Miku2.png', '/Image/Miku2.png', function ( ar ) { console.log( ar.name + ' has been created.' ); } );
};


//--------------------------------------------------------------------------------
// シーンが破棄されるときに呼ばれます。
//--------------------------------------------------------------------------------
SceneTitle2.prototype.onDestroy = function ( gl, app )
{
	GLUT.deleteProgram( gl, this.program1 );
	GLUT.deleteVertexBuffer( gl, this.vertices1 );
	GLUT.deleteIndexBuffer( gl, this.indices1 );
	GLUT.deleteTexture( gl, this.texture1.textureId );
};


//--------------------------------------------------------------------------------
// シーンが再開されるときに呼ばれます。
//--------------------------------------------------------------------------------
SceneTitle2.prototype.onResume = function ( gl, app )
{
	this.count = 100;
};


//--------------------------------------------------------------------------------
// シーンが停止されるときに呼ばれます。
//--------------------------------------------------------------------------------
SceneTitle2.prototype.onPause = function ( gl, app )
{
};


//--------------------------------------------------------------------------------
// シーンが更新されるときに呼ばれます。
//--------------------------------------------------------------------------------
SceneTitle2.prototype.onUpdate = function ( gl, app )
{
	this.rad += 0.01;

	this.t += 0.01;
	if ( this.t >= 1.0 ) { this.t = 0.0; }

	if ( --this.count == 0 )
	{
		app.popScene();
	}
};


//--------------------------------------------------------------------------------
// シーンが描画されるときに呼ばれます。
//--------------------------------------------------------------------------------
SceneTitle2.prototype.onRender = function ( gl, app )
{
	var matPool = this.mat4Pool;
	matPool.reset();


	gl.useProgram( this.program1 );
	gl.bindBuffer( gl.ARRAY_BUFFER, this.vertices1 );
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices1 );

	
	// 使用されない attribute 等はデッドストリップされ、getAttribLocation() で位置を取得できなくなります!!
	// 位置の取得に失敗した場合は -1 が返されます。
	
	var positionLocation = gl.getAttribLocation( this.program1, 'position' );
	gl.enableVertexAttribArray( positionLocation );
	gl.vertexAttribPointer( positionLocation, 3, gl.FLOAT, false, 48, 0 );

	//var normalLocation = gl.getAttribLocation( this.program1, 'normal' );
	//gl.enableVertexAttribArray( normalLocation );
	//gl.vertexAttribPointer( normalLocation, 3, gl.FLOAT, false, 48, 12 );

	var colorLocation = gl.getAttribLocation( this.program1, 'color' );
	gl.enableVertexAttribArray( colorLocation );
	gl.vertexAttribPointer( colorLocation, 4, gl.FLOAT, false, 48, 24 );

	var uvLocation = gl.getAttribLocation( this.program1, 'uv' );
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

	var s = Common.CANVAS_WIDTH / Common.CANVAS_HEIGHT;
	var fovy = 30.0;
	var d = 1.0 * s + 1.0 / Math.tan( Math.PI * fovy / 360.0 );

	var scaleMatrix = Mat4.scale( [ s, 1, s ] );
	mMatrix = Mat4.multiply( mMatrix, scaleMatrix, matPool.get() );

	var vMatrix = Mat4.lookAt( [ 0, 0, d ], [ 0, 0, 0 ], [ 0, 1, 0 ], matPool.get() );
	var pMatrix = Mat4.perspective( fovy, Common.CANVAS_WIDTH / Common.CANVAS_HEIGHT, 0.1, 100, matPool.get() );
	//var pMatrix = Mat4.frustum( 0, 640, 0, 480, 0.1, 100 );

	var pvMatrix = Mat4.multiply( pMatrix, vMatrix, matPool.get() );
	var mvpMatrix = Mat4.multiply( pvMatrix, mMatrix, matPool.get() );

	var mvpMatrixUniformLocation = gl.getUniformLocation( this.program1, 'mvpMatrix' );
	gl.uniformMatrix4fv( mvpMatrixUniformLocation, false, mvpMatrix );

	var texture0Location = gl.getUniformLocation( this.program1, 'texture0' );
	gl.uniform1i( texture0Location, 0 );


	gl.enable( gl.CULL_FACE );
	gl.frontFace( gl.CCW );

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

