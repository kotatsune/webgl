//================================================================================
//
//    matrix4.js
//
//================================================================================


'use strict';


var Mat4 = {};


//--------------------------------------------------------------------------------
// 行列を作成します。 
//--------------------------------------------------------------------------------
Mat4.create = function ( mat )
{
	var dest = new MatrixArray( 16 );

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
// スケーリングします。
//--------------------------------------------------------------------------------
Mat4.scale = function ( mat, a, dest )
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
// 文字列表現に変換します。
//--------------------------------------------------------------------------------
Mat4.toString = function ( mat )
{
	var s1 = '| ' + mat[  0 ] + '  ' + mat[  4 ] + '  ' + mat[  8 ] + '  ' + mat[ 12 ] + ' |',
		s2 = '| ' + mat[  1 ] + '  ' + mat[  5 ] + '  ' + mat[  9 ] + '  ' + mat[ 13 ] + ' |',
		s3 = '| ' + mat[  2 ] + '  ' + mat[  6 ] + '  ' + mat[ 10 ] + '  ' + mat[ 14 ] + ' |',
		s4 = '| ' + mat[  3 ] + '  ' + mat[  7 ] + '  ' + mat[ 11 ] + '  ' + mat[ 15 ] + ' |';

	return s1 + '\n' + s2 + '\n' + s3 + '\n' + s4;
};
