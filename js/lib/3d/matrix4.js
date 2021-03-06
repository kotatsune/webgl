//================================================================================
//
//    Matrix4.js
//
//================================================================================


'use strict';


var Mat4 = {};


//--------------------------------------------------------------------------------
// 行列を作成します。 
//--------------------------------------------------------------------------------
Mat4.create = function ( mat )
{
	// |  a00  a04  a08  a12  |
	// |  a01  a05  a09  a13  |
	// |  a02  a06  a10  a14  |
	// |  a03  a07  a11  a15  |
	
	var dest = new Float32Array( 16 );

	if ( mat )
	{
		dest[  0 ] = mat[  0 ];  dest[  4 ] = mat[  4 ];  dest[  8 ] = mat[  8 ];  dest[ 12 ] = mat[ 12 ];
		dest[  1 ] = mat[  1 ];  dest[  5 ] = mat[  5 ];  dest[  9 ] = mat[  9 ];  dest[ 13 ] = mat[ 13 ];
		dest[  2 ] = mat[  2 ];  dest[  6 ] = mat[  6 ];  dest[ 10 ] = mat[ 10 ];  dest[ 14 ] = mat[ 14 ];
		dest[  3 ] = mat[  3 ];  dest[  7 ] = mat[  7 ];  dest[ 11 ] = mat[ 11 ];  dest[ 15 ] = mat[ 15 ];
	}

	return dest;
};


//--------------------------------------------------------------------------------
// 単位行列を作成します。 
//--------------------------------------------------------------------------------
Mat4.identity = function ( dest )
{
	if ( !dest )
	{
		dest = Mat4.create();
	}

	dest[  0 ] = 1;  dest[  4 ] = 0;  dest[  8 ] = 0;  dest[ 12 ] = 0;
	dest[  1 ] = 0;  dest[  5 ] = 1;  dest[  9 ] = 0;  dest[ 13 ] = 0;
	dest[  2 ] = 0;  dest[  6 ] = 0;  dest[ 10 ] = 1;  dest[ 14 ] = 0;
	dest[  3 ] = 0;  dest[  7 ] = 0;  dest[ 11 ] = 0;  dest[ 15 ] = 1;

	return dest;
};


//--------------------------------------------------------------------------------
// 零行列を作成します。 
//--------------------------------------------------------------------------------
Mat4.zero = function ( dest )
{
	if ( !dest )
	{
		dest = Mat4.create();
	}

	dest[  0 ] = 0;  dest[  4 ] = 0;  dest[  8 ] = 0;  dest[ 12 ] = 0;
	dest[  1 ] = 0;  dest[  5 ] = 0;  dest[  9 ] = 0;  dest[ 13 ] = 0;
	dest[  2 ] = 0;  dest[  6 ] = 0;  dest[ 10 ] = 0;  dest[ 14 ] = 0;
	dest[  3 ] = 0;  dest[  7 ] = 0;  dest[ 11 ] = 0;  dest[ 15 ] = 0;

	return dest;
};


//--------------------------------------------------------------------------------
// 要素を設定します。
//--------------------------------------------------------------------------------
Mat4.set = function ( mat, dest )
{
	if ( !dest )
	{
		dest = Mat4.create();
	}

	dest[  0 ] = mat[  0 ];  dest[  4 ] = mat[  4 ];  dest[  8 ] = mat[  8 ];  dest[ 12 ] = mat[ 12 ];
	dest[  1 ] = mat[  1 ];  dest[  5 ] = mat[  5 ];  dest[  9 ] = mat[  9 ];  dest[ 13 ] = mat[ 13 ];
	dest[  2 ] = mat[  2 ];  dest[  6 ] = mat[  6 ];  dest[ 10 ] = mat[ 10 ];  dest[ 14 ] = mat[ 14 ];
	dest[  3 ] = mat[  3 ];  dest[  7 ] = mat[  7 ];  dest[ 11 ] = mat[ 11 ];  dest[ 15 ] = mat[ 15 ];

	return dest;
};


//--------------------------------------------------------------------------------
// 転置します。
//--------------------------------------------------------------------------------
Mat4.transpose = function ( mat, dest )
{
	if ( !dest )
	{
		dest = Mat4.create();
	}

	var a11 = mat[  0 ],  a12 = mat[  4 ],  a13 = mat[  8 ],  a14 = mat[ 12 ],
		a21 = mat[  1 ],  a22 = mat[  5 ],  a23 = mat[  9 ],  a24 = mat[ 13 ],
		a31 = mat[  2 ],  a32 = mat[  6 ],  a33 = mat[ 10 ],  a34 = mat[ 14 ],
		a41 = mat[  3 ],  a42 = mat[  7 ],  a43 = mat[ 11 ],  a44 = mat[ 15 ];

	dest[  0 ] = a11;  dest[  4 ] = a21;  dest[  8 ] = a31;  dest[ 12 ] = a41;
	dest[  1 ] = a12;  dest[  5 ] = a22;  dest[  9 ] = a32;  dest[ 13 ] = a42;
	dest[  2 ] = a13;  dest[  6 ] = a23;  dest[ 10 ] = a33;  dest[ 14 ] = a43;
	dest[  3 ] = a14;  dest[  7 ] = a24;  dest[ 11 ] = a34;  dest[ 15 ] = a44;

	return dest;
};


//--------------------------------------------------------------------------------
// 逆行列を作成します。
//--------------------------------------------------------------------------------
Mat4.inverse = function ( mat, dest )
{
	if ( !dest )
	{
		dest = Mat4.create();
	}

	var a11 = mat[  0 ],  a12 = mat[  4 ],  a13 = mat[  8 ],  a14 = mat[ 12 ],
		a21 = mat[  1 ],  a22 = mat[  5 ],  a23 = mat[  9 ],  a24 = mat[ 13 ],
		a31 = mat[  2 ],  a32 = mat[  6 ],  a33 = mat[ 10 ],  a34 = mat[ 14 ],
		a41 = mat[  3 ],  a42 = mat[  7 ],  a43 = mat[ 11 ],  a44 = mat[ 15 ];

	var b00 = a11 * a22 - a12 * a21,
		b01 = a11 * a23 - a13 * a21,
		b02 = a11 * a24 - a14 * a21,
		b03 = a12 * a23 - a13 * a22,
		b04 = a12 * a24 - a14 * a22,
		b05 = a13 * a24 - a14 * a23,
		b06 = a31 * a42 - a32 * a41,
		b07 = a31 * a43 - a33 * a41,
		b08 = a31 * a44 - a34 * a41,
		b09 = a32 * a43 - a33 * a42,
		b10 = a32 * a44 - a34 * a42,
		b11 = a33 * a44 - a34 * a43;

	var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
	var f = 1 / det;

	dest[  0 ] = (  a22 * b11 - a23 * b10 + a24 * b09 ) * f;
	dest[  1 ] = ( -a21 * b11 + a23 * b08 - a24 * b07 ) * f;
	dest[  2 ] = (  a21 * b10 - a22 * b08 + a24 * b06 ) * f;
	dest[  3 ] = ( -a21 * b09 + a22 * b07 - a23 * b06 ) * f;

	dest[  4 ] = ( -a12 * b11 + a13 * b10 - a14 * b09 ) * f;
	dest[  5 ] = (  a11 * b11 - a13 * b08 + a14 * b07 ) * f;
	dest[  6 ] = ( -a11 * b10 + a12 * b08 - a14 * b06 ) * f;
	dest[  7 ] = (  a11 * b09 - a12 * b07 + a13 * b06 ) * f;

	dest[  8 ] = (  a42 * b05 - a43 * b04 + a44 * b03 ) * f;
	dest[  9 ] = ( -a41 * b05 + a43 * b02 - a44 * b01 ) * f;
	dest[ 10 ] = (  a41 * b04 - a42 * b02 + a44 * b00 ) * f;
	dest[ 11 ] = ( -a41 * b03 + a42 * b01 - a43 * b00 ) * f;

	dest[ 12 ] = ( -a32 * b05 + a33 * b04 - a34 * b03 ) * f;
	dest[ 13 ] = (  a31 * b05 - a33 * b02 + a34 * b01 ) * f;
	dest[ 14 ] = ( -a31 * b04 + a32 * b02 - a34 * b00 ) * f;
	dest[ 15 ] = (  a31 * b03 - a32 * b01 + a33 * b00 ) * f;

	return dest;
};


//--------------------------------------------------------------------------------
// 加算します。
//--------------------------------------------------------------------------------
Mat4.add = function ( mat1, mat2, dest )
{
	if ( !dest )
	{
		dest = Mat4.create();
	}

	dest[  0 ] = mat1[  0 ] + mat2[  0 ];  dest[  4 ] = mat1[  4 ] + mat2[  4 ];  dest[  8 ] = mat1[  8 ] + mat2[  8 ];  dest[ 12 ] = mat1[ 12 ] + mat2[ 12 ];
	dest[  1 ] = mat1[  1 ] + mat2[  1 ];  dest[  5 ] = mat1[  5 ] + mat2[  5 ];  dest[  9 ] = mat1[  9 ] + mat2[  9 ];  dest[ 13 ] = mat1[ 13 ] + mat2[ 13 ];
	dest[  2 ] = mat1[  2 ] + mat2[  2 ];  dest[  6 ] = mat1[  6 ] + mat2[  6 ];  dest[ 10 ] = mat1[ 10 ] + mat2[ 10 ];  dest[ 14 ] = mat1[ 14 ] + mat2[ 14 ];
	dest[  3 ] = mat1[  3 ] + mat2[  3 ];  dest[  7 ] = mat1[  7 ] + mat2[  7 ];  dest[ 11 ] = mat1[ 11 ] + mat2[ 11 ];  dest[ 15 ] = mat1[ 15 ] + mat2[ 15 ];

	return dest;
};


//--------------------------------------------------------------------------------
// 減算します。
//--------------------------------------------------------------------------------
Mat4.subtract = function ( mat1, mat2, dest )
{
	if ( !dest )
	{
		dest = Mat4.create();
	}

	dest[  0 ] = mat1[  0 ] - mat2[  0 ];  dest[  4 ] = mat1[  4 ] - mat2[  4 ];  dest[  8 ] = mat1[  8 ] - mat2[  8 ];  dest[ 12 ] = mat1[ 12 ] - mat2[ 12 ];
	dest[  1 ] = mat1[  1 ] - mat2[  1 ];  dest[  5 ] = mat1[  5 ] - mat2[  5 ];  dest[  9 ] = mat1[  9 ] - mat2[  9 ];  dest[ 13 ] = mat1[ 13 ] - mat2[ 13 ];
	dest[  2 ] = mat1[  2 ] - mat2[  2 ];  dest[  6 ] = mat1[  6 ] - mat2[  6 ];  dest[ 10 ] = mat1[ 10 ] - mat2[ 10 ];  dest[ 14 ] = mat1[ 14 ] - mat2[ 14 ];
	dest[  3 ] = mat1[  3 ] - mat2[  3 ];  dest[  7 ] = mat1[  7 ] - mat2[  7 ];  dest[ 11 ] = mat1[ 11 ] - mat2[ 11 ];  dest[ 15 ] = mat1[ 15 ] - mat2[ 15 ];

	return dest;
};


//--------------------------------------------------------------------------------
// スカラー倍します。
//--------------------------------------------------------------------------------
Mat4.multiplyScalar = function ( mat, a, dest )
{
	if ( !dest )
	{
		dest = Mat4.create();
	}

	dest[  0 ] = mat[  0 ] * a;  dest[  4 ] = mat[  4 ] * a;  dest[  8 ] = mat[  8 ] * a;  dest[ 12 ] = mat[ 12 ] * a;
	dest[  1 ] = mat[  1 ] * a;  dest[  5 ] = mat[  5 ] * a;  dest[  9 ] = mat[  9 ] * a;  dest[ 13 ] = mat[ 13 ] * a;
	dest[  2 ] = mat[  2 ] * a;  dest[  6 ] = mat[  6 ] * a;  dest[ 10 ] = mat[ 10 ] * a;  dest[ 14 ] = mat[ 14 ] * a;
	dest[  3 ] = mat[  3 ] * a;  dest[  7 ] = mat[  7 ] * a;  dest[ 11 ] = mat[ 11 ] * a;  dest[ 15 ] = mat[ 15 ] * a;

	return dest;
};


//--------------------------------------------------------------------------------
// 乗算します。
//--------------------------------------------------------------------------------
Mat4.multiply = function ( mat1, mat2, dest )
{
	if ( !dest )
	{
		dest = Mat4.create();
	}

	var a11 = mat1[  0 ],  a12 = mat1[  4 ],  a13 = mat1[  8 ],  a14 = mat1[ 12 ],
		a21 = mat1[  1 ],  a22 = mat1[  5 ],  a23 = mat1[  9 ],  a24 = mat1[ 13 ],
		a31 = mat1[  2 ],  a32 = mat1[  6 ],  a33 = mat1[ 10 ],  a34 = mat1[ 14 ],
		a41 = mat1[  3 ],  a42 = mat1[  7 ],  a43 = mat1[ 11 ],  a44 = mat1[ 15 ];

	var b11 = mat2[  0 ],  b12 = mat2[  4 ],  b13 = mat2[  8 ],  b14 = mat2[ 12 ],
		b21 = mat2[  1 ],  b22 = mat2[  5 ],  b23 = mat2[  9 ],  b24 = mat2[ 13 ],
		b31 = mat2[  2 ],  b32 = mat2[  6 ],  b33 = mat2[ 10 ],  b34 = mat2[ 14 ],
		b41 = mat2[  3 ],  b42 = mat2[  7 ],  b43 = mat2[ 11 ],  b44 = mat2[ 15 ];

	dest[  0 ] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
	dest[  1 ] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
	dest[  2 ] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
	dest[  3 ] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;

	dest[  4 ] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
	dest[  5 ] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
	dest[  6 ] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
	dest[  7 ] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;

	dest[  8 ] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
	dest[  9 ] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
	dest[ 10 ] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
	dest[ 11 ] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;

	dest[ 12 ] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
	dest[ 13 ] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
	dest[ 14 ] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
	dest[ 15 ] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

	return dest;
};


//--------------------------------------------------------------------------------
// ブレンドします。
//--------------------------------------------------------------------------------
Mat4.blend = function ( mat1, w1, mat2, w2, dest )
{
	if ( !dest )
	{
		dest = Mat4.create();
	}

	dest[  0 ] = mat1[  0 ] * w1 + mat2[  0 ] * w2;
	dest[  1 ] = mat1[  1 ] * w1 + mat2[  1 ] * w2;
	dest[  2 ] = mat1[  2 ] * w1 + mat2[  2 ] * w2;
	dest[  3 ] = mat1[  3 ] * w1 + mat2[  3 ] * w2;

	dest[  4 ] = mat1[  4 ] * w1 + mat2[  4 ] * w2;
	dest[  5 ] = mat1[  5 ] * w1 + mat2[  5 ] * w2;
	dest[  6 ] = mat1[  6 ] * w1 + mat2[  6 ] * w2;
	dest[  7 ] = mat1[  7 ] * w1 + mat2[  7 ] * w2;

	dest[  8 ] = mat1[  8 ] * w1 + mat2[  8 ] * w2;
	dest[  9 ] = mat1[  9 ] * w1 + mat2[  9 ] * w2;
	dest[ 10 ] = mat1[ 10 ] * w1 + mat2[ 10 ] * w2;
	dest[ 11 ] = mat1[ 11 ] * w1 + mat2[ 11 ] * w2;

	dest[ 12 ] = mat1[ 12 ] * w1 + mat2[ 12 ] * w2;
	dest[ 13 ] = mat1[ 13 ] * w1 + mat2[ 13 ] * w2;
	dest[ 14 ] = mat1[ 14 ] * w1 + mat2[ 14 ] * w2;
	dest[ 15 ] = mat1[ 15 ] * w1 + mat2[ 15 ] * w2;

	return dest;
};


//--------------------------------------------------------------------------------
// 拡大縮小行列を作成します。
//--------------------------------------------------------------------------------
Mat4.scale = function ( vec, dest )
{
	if ( !dest )
	{
		dest = Mat4.create();
	}

	dest[  0 ] = vec[ 0 ];  dest[  4 ] =        0;  dest[  8 ] =        0;  dest[ 12 ] =        0;
	dest[  1 ] =        0;  dest[  5 ] = vec[ 1 ];  dest[  9 ] =        0;  dest[ 13 ] =        0;
	dest[  2 ] =        0;  dest[  6 ] =        0;  dest[ 10 ] = vec[ 2 ];  dest[ 14 ] =        0;
	dest[  3 ] =        0;  dest[  7 ] =        0;  dest[ 11 ] =        0;  dest[ 15 ] =        1;

	return dest;
};


//--------------------------------------------------------------------------------
// X 軸回転行列を作成します。
//--------------------------------------------------------------------------------
Mat4.rotationX = function ( rad, dest )
{
	// ちなみに 3x3 の回転行列の逆行列は転置行列です。
	
	if ( !dest )
	{
		dest = Mat4.create();
	}

	var s = Math.sin( rad ),
		c = Math.cos( rad );

	dest[  0 ] =  1;  dest[  4 ] =  0;  dest[  8 ] =  0;  dest[ 12 ] =  0;
	dest[  1 ] =  0;  dest[  5 ] =  c;  dest[  9 ] = -s;  dest[ 13 ] =  0;
	dest[  2 ] =  0;  dest[  6 ] =  s;  dest[ 10 ] =  c;  dest[ 14 ] =  0;
	dest[  3 ] =  0;  dest[  7 ] =  0;  dest[ 11 ] =  0;  dest[ 15 ] =  1;

	return dest;
};


//--------------------------------------------------------------------------------
// X 軸回転行列を掛けます。
//--------------------------------------------------------------------------------
Mat4.multiplyRotationX = function ( mat, rad, dest )
{
	// TO DO !!
};


//--------------------------------------------------------------------------------
// Y 軸回転行列を作成します。
//--------------------------------------------------------------------------------
Mat4.rotationY = function ( rad, dest )
{
	// ちなみに 3x3 の回転行列の逆行列は転置行列です。
	
	if ( !dest )
	{
		dest = Mat4.create();
	}

	var s = Math.sin( rad ),
		c = Math.cos( rad );

	dest[  0 ] =  c;  dest[  4 ] =  0;  dest[  8 ] =  s;  dest[ 12 ] =  0;
	dest[  1 ] =  0;  dest[  5 ] =  1;  dest[  9 ] =  0;  dest[ 13 ] =  0;
	dest[  2 ] = -s;  dest[  6 ] =  0;  dest[ 10 ] =  c;  dest[ 14 ] =  0;
	dest[  3 ] =  0;  dest[  7 ] =  0;  dest[ 11 ] =  0;  dest[ 15 ] =  1;

	return dest;
};


//--------------------------------------------------------------------------------
// Y 軸回転行列を掛けます。
//--------------------------------------------------------------------------------
Mat4.multiplyRotationY = function ( mat, rad, dest )
{
	// TO DO !!
};


//--------------------------------------------------------------------------------
// Z 軸回転行列を作成します。
//--------------------------------------------------------------------------------
Mat4.rotationZ = function ( rad, dest )
{
	// ちなみに 3x3 の回転行列の逆行列は転置行列です。
	
	if ( !dest )
	{
		dest = Mat4.create();
	}

	var s = Math.sin( rad ),
		c = Math.cos( rad );

	dest[  0 ] =  c;  dest[  4 ] = -s;  dest[  8 ] =  0;  dest[ 12 ] =  0;
	dest[  1 ] =  s;  dest[  5 ] =  c;  dest[  9 ] =  0;  dest[ 13 ] =  0;
	dest[  2 ] =  0;  dest[  6 ] =  0;  dest[ 10 ] =  1;  dest[ 14 ] =  0;
	dest[  3 ] =  0;  dest[  7 ] =  0;  dest[ 11 ] =  0;  dest[ 15 ] =  1;

	return dest;
};


//--------------------------------------------------------------------------------
// Z 軸回転行列を掛けます。
//--------------------------------------------------------------------------------
Mat4.multiplyRotationZ = function ( mat, rad, dest )
{
	// TO DO !!
};


//--------------------------------------------------------------------------------
// 平行移動行列を作成します。
//--------------------------------------------------------------------------------
Mat4.translation = function ( vec, dest )
{
	if ( !dest )
	{
		dest = Mat4.create();
	}

	dest[  0 ] = 1;  dest[  4 ] = 0;  dest[  8 ] = 0;  dest[ 12 ] = vec[ 0 ];
	dest[  1 ] = 0;  dest[  5 ] = 1;  dest[  9 ] = 0;  dest[ 13 ] = vec[ 1 ];
	dest[  2 ] = 0;  dest[  6 ] = 0;  dest[ 10 ] = 1;  dest[ 14 ] = vec[ 2 ];
	dest[  3 ] = 0;  dest[  7 ] = 0;  dest[ 11 ] = 0;  dest[ 15 ] = 1;

	return dest;
};


//--------------------------------------------------------------------------------
// 透視投影変換行列を作成します。
//--------------------------------------------------------------------------------
Mat4.frustum = function ( left, right, bottom, top, near, far, dest )
{
	if ( !dest )
	{
		dest = Mat4.create();
	}

	var rl = ( right - left   ),
		tb = ( top   - bottom ),
		fn = ( far   - near   );

	dest[  0 ] = ( near * 2 ) / rl;
	dest[  1 ] = 0;
	dest[  2 ] = 0;
	dest[  3 ] = 0;

	dest[  4 ] = 0;
	dest[  5 ] = ( near * 2 ) / tb;
	dest[  6 ] = 0;
	dest[  7 ] = 0;

	dest[  8 ] =  ( right + left   ) / rl;
	dest[  9 ] =  ( top   + bottom ) / tb;
	dest[ 10 ] = -( far   + near   ) / fn;
	dest[ 11 ] = -1;

	dest[ 12 ] = 0;
	dest[ 13 ] = 0;
	dest[ 14 ] = -( far * near * 2 ) / fn;
	dest[ 15 ] = 0;

	return dest;
};


//--------------------------------------------------------------------------------
// 透視投影変換行列を作成します。
//--------------------------------------------------------------------------------
Mat4.perspective = function ( fovy, aspect, near, far, dest )
{
	var top	   = near * Math.tan( Math.PI * fovy / 360.0 ),
		bottom = -top,
		right  = top * aspect,
		left   = -right;
	
	return Mat4.frustum( left, right, bottom, top, near, far, dest );
};


//--------------------------------------------------------------------------------
// 平行投影変換行列を作成します。
//--------------------------------------------------------------------------------
Mat4.ortho = function ( left, right, bottom, top, near, far, dest )
{
	if ( !dest )
	{
		dest = Mat4.create();
	}

	var rl = ( right - left   ),
		tb = ( top   - bottom ),
		fn = ( far   - near   );

	dest[  0 ] = 2 / rl;
	dest[  1 ] = 0;
	dest[  2 ] = 0;
	dest[  3 ] = 0;

	dest[  4 ] = 0;
	dest[  5 ] = 2 / tb;
	dest[  6 ] = 0;
	dest[  7 ] = 0;

	dest[  8 ] = 0;
	dest[  9 ] = 0;
	dest[ 10 ] = -2 / fn;
	dest[ 11 ] = 0;

	dest[ 12 ] = -( right + left   ) / rl;
	dest[ 13 ] = -( top   + bottom ) / tb;
	dest[ 14 ] = -( far   + near   ) / fn;
	dest[ 15 ] = 1;

	return dest;
};


//--------------------------------------------------------------------------------
// 平行投影変換行列を作成します。
//--------------------------------------------------------------------------------
Mat4.ortho2d = function ( left, right, bottom, top, dest )
{
	return Mat4.ortho( left, right, bottom, top, -1, 1, dest );
};


//--------------------------------------------------------------------------------
// ビュー変換行列を作成します。 
//--------------------------------------------------------------------------------
Mat4.lookAt = function ( eye, target, up, dest )
{
	if ( !dest )
	{
		dest = Mat4.create();
	}

	var x0, x1, x2, y0, y1, y2, z0, z1, z2, length, f;

	var eyeX = eye[ 0 ],
		eyeY = eye[ 1 ],
		eyeZ = eye[ 2 ];

	var upX = up[ 0 ],
		upY = up[ 1 ],
		upZ = up[ 2 ];

	var targetX = target[ 0 ],
		targetY = target[ 1 ],
		targetZ = target[ 2 ];

	if (   ( eyeX === targetX )
		&& ( eyeY === targetY )
		&& ( eyeZ === targetZ ) )
	{
		return Mat4.identity( dest );
	}


	// Z 軸
	z0 = eyeX - target[ 0 ];
	z1 = eyeY - target[ 1 ];
	z2 = eyeZ - target[ 2 ];

	length = Math.sqrt( z0 * z0 + z1 * z1 + z2 * z2 );
	if ( !length )
	{
		z0 = 0;
		z1 = 0;
		z2 = 0;
	}
	else
	{
		f = 1 / length;
		z0 *= f;
		z1 *= f;
		z2 *= f;
	}

	// X 軸
	x0 = upY * z2 - upZ * z1;
	x1 = upZ * z0 - upX * z2;
	x2 = upX * z1 - upY * z0;

	length = Math.sqrt( x0 * x0 + x1 * x1 + x2 * x2 );
	if ( !length )
	{
		x0 = 0;
		x1 = 0;
		x2 = 0;
	}
	else
	{
		f = 1 / length;
		x0 *= f;
		x1 *= f;
		x2 *= f;
	}

	// Y 軸
	y0 = z1 * x2 - z2 * x1;
	y1 = z2 * x0 - z0 * x2;
	y2 = z0 * x1 - z1 * x0;

	length = Math.sqrt( y0 * y0 + y1 * y1 + y2 * y2 );
	if ( !length )
	{
		y0 = 0;
		y1 = 0;
		y2 = 0;
	}
	else
	{
		f = 1 / length;
		y0 *= f;
		y1 *= f;
		y2 *= f;
	}


	dest[  0 ] = x0;
	dest[  1 ] = y0;
	dest[  2 ] = z0;
	dest[  3 ] = 0;

	dest[  4 ] = x1;
	dest[  5 ] = y1;
	dest[  6 ] = z1;
	dest[  7 ] = 0;

	dest[  8 ] = x2;
	dest[  9 ] = y2;
	dest[ 10 ] = z2;
	dest[ 11 ] = 0;

	dest[ 12 ] = -( x0 * eyeX + x1 * eyeY + x2 * eyeZ );
	dest[ 13 ] = -( y0 * eyeX + y1 * eyeY + y2 * eyeZ );
	dest[ 14 ] = -( z0 * eyeX + z1 * eyeY + z2 * eyeZ );
	dest[ 15 ] = 1;

	return dest;
};


/*
//--------------------------------------------------------------------------------
// 行列式を計算します。(正攻法)
//--------------------------------------------------------------------------------
Mat4.determinant = function ( mat )
{
	// このメソッドでは乗算は 72 回。
	
	var a11 = mat[  0 ],  a12 = mat[  4 ],  a13 = mat[  8 ],  a14 = mat[ 12 ],
		a21 = mat[  1 ],  a22 = mat[  5 ],  a23 = mat[  9 ],  a24 = mat[ 13 ],
		a31 = mat[  2 ],  a32 = mat[  6 ],  a33 = mat[ 10 ],  a34 = mat[ 14 ],
		a41 = mat[  3 ],  a42 = mat[  7 ],  a43 = mat[ 11 ],  a44 = mat[ 15 ];

	var det = a11 * a22 * a33 * a44 + a11 * a23 * a34 * a42 + a11 * a24 * a32 * a43
		    + a12 * a21 * a34 * a43 + a12 * a23 * a31 * a44 + a12 * a24 * a33 * a41
			+ a13 * a21 * a32 * a44 + a13 * a22 * a34 * a41 + a13 * a24 * a31 * a42
			+ a14 * a21 * a33 * a42 + a14 * a22 * a31 * a43 + a14 * a23 * a32 * a41
			- a11 * a22 * a34 * a43 - a11 * a23 * a32 * a44 - a11 * a24 * a33 * a42
			- a12 * a21 * a33 * a44 - a12 * a23 * a34 * a41 - a12 * a24 * a31 * a43
			- a13 * a21 * a34 * a42 - a13 * a22 * a31 * a44 - a13 * a24 * a32 * a41
			- a14 * a21 * a32 * a43 - a14 * a22 * a33 * a41 - a14 * a23 * a31 * a42;

	return det;
};
*/


//--------------------------------------------------------------------------------
// 行列式を計算します。
//--------------------------------------------------------------------------------
Mat4.determinant = function ( mat )
{
	// このメソッドでは乗算は 30 回。
	
	var a11 = mat[  0 ],  a12 = mat[  4 ],  a13 = mat[  8 ],  a14 = mat[ 12 ],
		a21 = mat[  1 ],  a22 = mat[  5 ],  a23 = mat[  9 ],  a24 = mat[ 13 ],
		a31 = mat[  2 ],  a32 = mat[  6 ],  a33 = mat[ 10 ],  a34 = mat[ 14 ],
		a41 = mat[  3 ],  a42 = mat[  7 ],  a43 = mat[ 11 ],  a44 = mat[ 15 ];

	var b00 = a11 * a22 - a12 * a21,
		b01 = a11 * a23 - a13 * a21,
		b02 = a11 * a24 - a14 * a21,
		b03 = a12 * a23 - a13 * a22,
		b04 = a12 * a24 - a14 * a22,
		b05 = a13 * a24 - a14 * a23,
		b06 = a31 * a42 - a32 * a41,
		b07 = a31 * a43 - a33 * a41,
		b08 = a31 * a44 - a34 * a41,
		b09 = a32 * a43 - a33 * a42,
		b10 = a32 * a44 - a34 * a42,
		b11 = a33 * a44 - a34 * a43;

	var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

	return det;
};


//--------------------------------------------------------------------------------
// 三次元ベクトルを変換します。
//--------------------------------------------------------------------------------
Mat4.transformVec3 = function ( mat, vec, dest )
{
	if ( !dest )
	{
		dest = Vec3.create();
	}

	var x = vec[ 0 ],
		y = vec[ 1 ],
		z = vec[ 2 ];

	dest[ 0 ] = mat[  0 ] * x + mat[  4 ] * y + mat[  8 ] * z + mat[ 12 ];
	dest[ 1 ] = mat[  1 ] * x + mat[  5 ] * y + mat[  9 ] * z + mat[ 13 ];
	dest[ 2 ] = mat[  2 ] * x + mat[  6 ] * y + mat[ 10 ] * z + mat[ 14 ];

	return dest;
};


//--------------------------------------------------------------------------------
// 四次元ベクトルを変換します。
//--------------------------------------------------------------------------------
Mat4.transformVec4 = function ( mat, vec, dest )
{
	if ( !dest )
	{
		dest = Vec4.create();
	}

	var x = vec[ 0 ],
		y = vec[ 1 ],
		z = vec[ 2 ],
		w = vec[ 3 ];

	dest[ 0 ] = mat[  0 ] * x + mat[  4 ] * y + mat[  8 ] * z + mat[ 12 ] * w;
	dest[ 1 ] = mat[  1 ] * x + mat[  5 ] * y + mat[  9 ] * z + mat[ 13 ] * w;
	dest[ 2 ] = mat[  2 ] * x + mat[  6 ] * y + mat[ 10 ] * z + mat[ 14 ] * w;
	dest[ 3 ] = mat[  3 ] * x + mat[  7 ] * y + mat[ 11 ] * z + mat[ 15 ] * w;

	return dest;
};


//--------------------------------------------------------------------------------
// 文字列に変換します。
//--------------------------------------------------------------------------------
Mat4.toString = function ( mat )
{
	var s1 = '| ' + mat[  0 ] + '  ' + mat[  4 ] + '  ' + mat[  8 ] + '  ' + mat[ 12 ] + ' |',
		s2 = '| ' + mat[  1 ] + '  ' + mat[  5 ] + '  ' + mat[  9 ] + '  ' + mat[ 13 ] + ' |',
		s3 = '| ' + mat[  2 ] + '  ' + mat[  6 ] + '  ' + mat[ 10 ] + '  ' + mat[ 14 ] + ' |',
		s4 = '| ' + mat[  3 ] + '  ' + mat[  7 ] + '  ' + mat[ 11 ] + '  ' + mat[ 15 ] + ' |';

	return s1 + '\n' + s2 + '\n' + s3 + '\n' + s4;
};
