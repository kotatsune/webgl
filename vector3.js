//================================================================================
//
//    vector3.js
//
//================================================================================


'use strict';


var Vec3 = {};


//--------------------------------------------------------------------------------
// ベクトルを作成します。
//--------------------------------------------------------------------------------
Vec3.create = function ( vec )
{
	var dest = new MatrixArray( 3 );

	if ( vec )
	{
		dest[ 0 ] = vec[ 0 ];
		dest[ 1 ] = vec[ 1 ];
		dest[ 2 ] = vec[ 2 ];
	}

	return dest;
};


//--------------------------------------------------------------------------------
// 零ベクトルを作成します。
//--------------------------------------------------------------------------------
Vec3.zero = function ( dest )
{
	if ( !dest )
	{
		dest = Vec3.create();
	}

	dest[ 0 ] = 0;
	dest[ 1 ] = 0;
	dest[ 2 ] = 0;

	return dest;
};


//--------------------------------------------------------------------------------
// 要素を設定します。
//--------------------------------------------------------------------------------
Vec3.set = function ( vec, dest )
{
	if ( !dest )
	{
		dest = Vec3.create();
	}

	dest[ 0 ] = vec[ 0 ];
	dest[ 1 ] = vec[ 1 ];
	dest[ 2 ] = vec[ 2 ];

	return dest;
};


//--------------------------------------------------------------------------------
// 符号を反転します。
//--------------------------------------------------------------------------------
Vec3.negate = function ( vec, dest )
{
	if ( !dest )
	{
		dest = Vec3.create();
	}

	dest[ 0 ] = -vec[ 0 ];
	dest[ 1 ] = -vec[ 1 ];
	dest[ 2 ] = -vec[ 2 ];

	return dest;
};


//--------------------------------------------------------------------------------
// 加算します。
//--------------------------------------------------------------------------------
Vec3.add = function ( vec1, vec2, dest )
{
	if ( !dest )
	{
		dest = Vec3.create();
	}

	dest[ 0 ] = vec1[ 0 ] + vec2[ 0 ];
	dest[ 1 ] = vec1[ 1 ] + vec2[ 1 ];
	dest[ 2 ] = vec1[ 2 ] + vec2[ 2 ];

	return dest;
};


//--------------------------------------------------------------------------------
// 減算します。
//--------------------------------------------------------------------------------
Vec3.subtract = function ( vec1, vec2, dest )
{
	if ( !dest )
	{
		dest = Vec3.create();
	}

	dest[ 0 ] = vec1[ 0 ] - vec2[ 0 ];
	dest[ 1 ] = vec1[ 1 ] - vec2[ 1 ];
	dest[ 2 ] = vec1[ 2 ] - vec2[ 2 ];

	return dest;
};


//--------------------------------------------------------------------------------
// スケーリングします。
//--------------------------------------------------------------------------------
Vec3.scale = function ( vec, a, dest )
{
	if ( !dest )
	{
		dest = Vec3.create();
	}

	dest[ 0 ] = vec[ 0 ] * a;
	dest[ 1 ] = vec[ 1 ] * a;
	dest[ 2 ] = vec[ 2 ] * a;

	return dest;
};


//--------------------------------------------------------------------------------
// 内積を算出します。
//--------------------------------------------------------------------------------
Vec3.dot = function ( vec1, vec2 )
{
	return vec1[ 0 ] * vec2[ 0 ] + vec1[ 1 ] * vec2[ 1 ] + vec1[ 2 ] * vec[ 2 ];
};


//--------------------------------------------------------------------------------
// 外積を算出します。
//--------------------------------------------------------------------------------
Vec3.cross = function ( vec1, vec2, dest )
{
	if ( !dest )
	{
		dest = Vec3.create();
	}

	var x1 = vec1[ 0 ],
		y1 = vec1[ 1 ],
		z1 = vec1[ 2 ];

	var x2 = vec2[ 0 ],
		y2 = vec2[ 1 ],
		z2 = vec2[ 2 ];

	dest[ 0 ] = y1 * z2 - z1 * y2;
	dest[ 1 ] = z1 * x2 - x1 * z2;
	dest[ 2 ] = x1 * y2 - y1 * x2;

	return dest;
};


//--------------------------------------------------------------------------------
// 補間します。
//--------------------------------------------------------------------------------
Vec3.lerp = function ( vec1, vec2, t, dest )
{
	if ( !dest )
	{
		dest = Vec3.create();
	}
	
	dest[ 0 ] = vec1[ 0 ] + ( vec2[ 0 ] - vec1[ 0 ] ) * t;
	dest[ 1 ] = vec1[ 1 ] + ( vec2[ 1 ] - vec1[ 1 ] ) * t;
	dest[ 2 ] = vec1[ 2 ] + ( vec2[ 2 ] - vec1[ 2 ] ) * t;

	return dest;
};


//--------------------------------------------------------------------------------
// 正規化します。
//--------------------------------------------------------------------------------
Vec3.normalize = function ( vec, dest )
{
	if ( !dest )
	{
		dest = Vec3.create();
	}

	var x = vec[ 0 ],
		y = vec[ 1 ],
		z = vec[ 2 ];

	var length = Math.sqrt( x * x + y * y + z * z );
	if ( !length )
	{
		dest[ 0 ] = 0;
		dest[ 1 ] = 0;
		dest[ 2 ] = 0;
	}
	else if ( length === 1 )
	{
		dest[ 0 ] = x;
		dest[ 1 ] = y;
		dest[ 2 ] = z;
	}
	else
	{
		var f = 1 / length;
		dest[ 0 ] = x * f;
		dest[ 1 ] = y * f;
		dest[ 2 ] = z * f;
	}

	return dest;
};


//--------------------------------------------------------------------------------
// 方向を算出します。
//--------------------------------------------------------------------------------
Vec3.direction = function ( vec1, vec2, dest )
{
	if ( !dest )
	{
		dest = Vec3.create();
	}

	var x = vec1[ 0 ] - vec2 [ 0 ],
		y = vec1[ 1 ] - vec2 [ 1 ],
		z = vec1[ 2 ] - vec2 [ 2 ];

	var length = Math.sqrt( x * x + y * y + z * z );
	if ( !length )
	{
		dest[ 0 ] = 0;
		dest[ 1 ] = 0;
		dest[ 2 ] = 0;
	}
	else if ( length === 1 )
	{
		dest[ 0 ] = x;
		dest[ 1 ] = y;
		dest[ 2 ] = z;
	}
	else
	{
		var f = 1 / length;
		dest[ 0 ] = x * f;
		dest[ 1 ] = y * f;
		dest[ 2 ] = z * f;
	}

	return dest;
};


//--------------------------------------------------------------------------------
// 長さを算出します。
//--------------------------------------------------------------------------------
Vec3.length = function ( vec )
{
	var x = vec[ 0 ],
		y = vec[ 1 ],
		z = vec[ 2 ];

	return Math.sqrt( x * x + y * y + z * z );
};


//--------------------------------------------------------------------------------
// 長さ二乗を算出します。
//--------------------------------------------------------------------------------
Vec3.squaredLength = function ( vec )
{
	var x = vec[ 0 ],
		y = vec[ 1 ],
		z = vec[ 2 ];

	return x * x + y * y + z * z;
};


//--------------------------------------------------------------------------------
// 0.0 ～ 1.0 の範囲内におさまるようにクランプします。
//--------------------------------------------------------------------------------
Vec3.clamp = function ( vec, dest )
{
	if ( !dest )
	{
		dest = Vec3.create();
	}

	var x = vec[ 0 ],
		y = vec[ 1 ],
		z = vec[ 2 ];

	if ( x < 0.0 ) { x = 0.0; }
	else if ( x > 1.0 ) { x = 1.0; }

	if ( y < 0.0 ) { y = 0.0; }
	else if ( y > 1.0 ) { y = 1.0; }

	if ( z < 0.0 ) { z = 0.0; }
	else if ( z > 1.0 ) { z = 1.0; }

	dest[ 0 ] = x;
	dest[ 1 ] = y;
	dest[ 2 ] = z;

	return dest;
};


//--------------------------------------------------------------------------------
// 文字列表現に変換します。
//--------------------------------------------------------------------------------
Vec3.toString = function ( vec )
{
	return '( ' + vec[ 0 ] + ', ' + vec[ 1 ] + ', ' + vec[ 2 ] + ' )';
};
