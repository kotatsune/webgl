//================================================================================
//
//    ObjectPool.js
//
//================================================================================


'use strict';


//--------------------------------------------------------------------------------
// コンストラクタ
//--------------------------------------------------------------------------------
function ObjectPool( className )
{
	this.className = className;
	this.pool = [];
	this.index = 0;
}


//--------------------------------------------------------------------------------
// オブジェクトを借ります。
//--------------------------------------------------------------------------------
ObjectPool.prototype.borrow = function ()
{
	if ( this.pool.length <= this.index )
	{
		this.pool.push( new this.className() );
	}

	return this.pool[ this.index++ ];
};


//--------------------------------------------------------------------------------
// すべてのオブジェクトを返します。
//--------------------------------------------------------------------------------
ObjectPool.prototype.returnAll = function ()
{
	this.index = 0;
};


//--------------------------------------------------------------------------------
// オブジェクト数を取得します。
//--------------------------------------------------------------------------------
ObjectPool.prototype.count = function ()
{
	return this.pool.length;
};
