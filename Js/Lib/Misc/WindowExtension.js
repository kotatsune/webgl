//================================================================================
//
//    WindowExtension.js
//
//================================================================================


'use strict';


//--------------------------------------------------------------------------------
// 次のフレーム処理をリクエストします。
//--------------------------------------------------------------------------------
window.requestProcessNextFrame = (
	function ()
	{
		return window.requestAnimationFrame
			|| window.webkitRequestAnimationFrame
			|| window.mozRequestAnimationFrame
			|| window.oRequestAnimationFrame
			|| function　(　callback ) { window.setTimeout( callback, 1000.0 / 30.0 ); };
	}
)();


//--------------------------------------------------------------------------------
// 次のフレーム処理をキャンセルします。
//--------------------------------------------------------------------------------
window.cancelProcessNextFrame = (
	function ()
	{
		return window.cancelAnimationFrame
			|| window.webkitCancelAnimationFrame
			|| window.mozCancelAnimationFrame
			|| window.oCancelAnimationFrame
			|| function ( requestId ) { window.clearTimeout( requestId ); };
	}
)();
