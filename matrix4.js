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
Mat4.substract = function ( mat1, mat4, dest )
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
