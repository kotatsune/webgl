//================================================================================
//
//    Float32ArrayPool.js
//
//================================================================================


'use strict';


//--------------------------------------------------------------------------------
// コンストラクタ
//--------------------------------------------------------------------------------
function Float32ArrayPool( numberOfElements )
{
	this.numberOfElements = numberOfElements;
	this.pool = [];
	this.index = 0;
}


//--------------------------------------------------------------------------------
// オブジェクトを取得します。
//--------------------------------------------------------------------------------
Float32ArrayPool.prototype.get = function ()
{
	if ( this.pool.length <= this.index )
	{
		this.pool.push( new Float32Array( this.numberOfElements ) );
	}

	return this.pool[ this.index++ ];
};


//--------------------------------------------------------------------------------
// オブジェクト インデックスをリセットします。
//--------------------------------------------------------------------------------
Float32ArrayPool.prototype.reset = function ()
{
	this.index = 0;
};


//--------------------------------------------------------------------------------
// プールされているオブジェクトの数を取得します。
//--------------------------------------------------------------------------------
Float32ArrayPool.prototype.count = function ()
{
	return this.pool.length;
};
