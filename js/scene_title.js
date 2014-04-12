//================================================================================
//
//    scene_title.js
//
//================================================================================


'use strict';


//--------------------------------------------------------------------------------
// コンストラクタ
//--------------------------------------------------------------------------------
function SceneTitle()
{
	//SceneBase.apply( this, arguments ); 
	SceneBase.apply( this, [ 'Title' ] ); 
}

SceneTitle.prototype = Object.create( SceneBase.prototype );
SceneTitle.prototype.constructor = SceneTitle;


//--------------------------------------------------------------------------------
// シーンが作成されるときに呼ばれます。
//--------------------------------------------------------------------------------
SceneTitle.prototype.onCreate = function ( gl )
{
	this.mat4Pool = new Float32ArrayPool( 16 );
	this.rad = 0.0;
	this.t = 0.0;

	this.vertexShader1 = GLUT.createShader( gl, 'vertex-shader-1' );
	this.fragmentShader1 = GLUT.createShader( gl, 'fragment-shader-1' );
	this.programObject1 = GLUT.createProgramObject( gl, this.vertexShader1, this.fragmentShader1 );
	this.vertices1 = GLUT.createVBO( gl, Model.Box.VERTICES );
	this.indices1 = GLUT.createIBO( gl, Model.Box.INDICES );
	this.texture1 = GLUT.createTexture( gl, 'miku.png', '/image/miku.png', function ( ar ) { console.log( ar.name + ' has been created.' ); } );
};


//--------------------------------------------------------------------------------
// シーンが破棄されるときに呼ばれます。
//--------------------------------------------------------------------------------
SceneTitle.prototype.onDestroy = function ( gl )
{
};


//--------------------------------------------------------------------------------
// シーンが再開されるときに呼ばれます。
//--------------------------------------------------------------------------------
SceneTitle.prototype.onResume = function ( gl )
{
};


//--------------------------------------------------------------------------------
// シーンが停止されるときに呼ばれます。
//--------------------------------------------------------------------------------
SceneTitle.prototype.onPause = function ( gl )
{
};


//--------------------------------------------------------------------------------
// シーンが更新されるときに呼ばれます。
//--------------------------------------------------------------------------------
SceneTitle.prototype.onUpdate = function ( gl )
{
};


//--------------------------------------------------------------------------------
// シーンが描画されるときに呼ばれます。
//--------------------------------------------------------------------------------
SceneTitle.prototype.onRender = function ( gl )
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

