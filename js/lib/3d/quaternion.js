//================================================================================
//
//    quaternion.js
//
//================================================================================


'use strict';


var Quat = {};


//--------------------------------------------------------------------------------
// クォータニオンを作成します。 
//--------------------------------------------------------------------------------
Quat.create = function ( quat )
{
	// ( w; x, y, z )
	
	var dest = new Float32Array( 4 );

	if ( quat )
	{
		dest[ 0 ] = quat[ 0 ];
		dest[ 1 ] = quat[ 1 ];
		dest[ 2 ] = quat[ 2 ];
		dest[ 3 ] = quat[ 3 ];
	}

	return dest;
};


//--------------------------------------------------------------------------------
// 要素を設定します。
//--------------------------------------------------------------------------------
Quat.set = function ( quat, dest )
{
	if ( !dest )
	{
		dest = Quat.create();
	}

	dest[ 0 ] = quat[ 0 ];
	dest[ 1 ] = quat[ 1 ];
	dest[ 2 ] = quat[ 2 ];
	dest[ 3 ] = quat[ 3 ];

	return dest;
};


//--------------------------------------------------------------------------------
// 共役クォータニオンを作成します。
//--------------------------------------------------------------------------------
Quat.conjugate = function ( quat, dest )
{
	// ( w; x, y, z ) → ( w; -x, -y, -z )
	
	if ( !dest )
	{
		dest = Quat.create();
	}

	dest[ 0 ] =  quat[ 0 ];
	dest[ 1 ] = -quat[ 1 ];
	dest[ 2 ] = -quat[ 2 ];
	dest[ 3 ] = -quat[ 3 ];

	return dest;
};


//--------------------------------------------------------------------------------
// 乗算します。
//--------------------------------------------------------------------------------
Quat.multiply = function ( quat1, quat2, dest )
{
	// 回転を表すクォータニオンを合成するときは単純に乗算すればよいです。

	if ( !dest )
	{
		dest = Quat.create();
	}

	var aw = quat1[ 0 ],  ax = quat1[ 1 ],  ay = quat1[ 2 ],  az = quat1[ 3 ],
		bw = quat2[ 0 ],  bx = quat2[ 1 ],  by = quat2[ 2 ],  bz = quat2[ 3 ];

	dest[ 0 ] = aw * bw - ax * bx - ay * by - az * bz;
	dest[ 1 ] = aw * bx + ax * bw + ay * bz - az * by;
	dest[ 2 ] = aw * by - ax * bz + ay * bw + az * bx;
	dest[ 3 ] = aw * bz + ax * by - ay * bx + az * bw;

	return dest;
};


//--------------------------------------------------------------------------------
// 正規化します。
//--------------------------------------------------------------------------------
Quat.normalize = function ( quat, dest )
{
	if ( !dest )
	{
		dest = Quat.create();
	}

	var w = quat[ 0 ],
		x = quat[ 1 ],
		y = quat[ 2 ],
		z = quat[ 3 ];

	var length = Math.sqrt( w * w + x * x + y * y + z * z );
	if ( !length )
	{
		dest[ 0 ] = 0;
		dest[ 1 ] = 0;
		dest[ 2 ] = 0;
		dest[ 3 ] = 0;
	}
	else if ( length === 1 )
	{
		dest[ 0 ] = w;
		dest[ 1 ] = x;
		dest[ 2 ] = y;
		dest[ 3 ] = z;
	}
	else
	{
		var f = 1 / length;
		dest[ 0 ] = w * f;
		dest[ 1 ] = x * f;
		dest[ 2 ] = y * f;
		dest[ 3 ] = z * f;
	}

	return dest

};


//--------------------------------------------------------------------------------
// 任意軸周りの回転クォータニオンを作成します。
//--------------------------------------------------------------------------------
Quat.rotation = function ( vec, rad, dest )
{
	// 軸は正規化されている必要があります。
	
	if ( !dest )
	{
		dest = Quat.create();
	}
	
	var harfRad = rad * 0.5;

	var	c = Math.cos( harfRad ),
		s = Math.sin( harfRad );

	dest[ 0 ] = c;
	dest[ 1 ] = vec[ 0 ] * s;
	dest[ 2 ] = vec[ 1 ] * s;
	dest[ 3 ] = vec[ 2 ] * s;

	return dest;
};


//--------------------------------------------------------------------------------
// ヨー、ピッチ、ロールを指定して回転クォータニオンを作成します。 
//--------------------------------------------------------------------------------
Quat.yawPitchRollRotation = function ( yaw, pitch, roll, dest )
{
	// ( w; x, y, z )
	
	if ( !dest )
	{
		dest = Quat.create();
	}

	var PI_OVER_180 = Math.PI / 180;

	var y = yaw   * PI_OVER_180 * 0.5,
		p = pitch * PI_OVER_180 * 0.5,
		r = roll  * PI_OVER_180 * 0.5;
 
	var siny = Math.sin( y ),
		sinp = Math.sin( p ),
		sinr = Math.sin( r ),
		cosy = Math.cos( y ),
		cosp = Math.cos( p ),
		cosr = Math.cos( r );
 
	var quat = new MatrixArray( 4 );
	quat[ 0 ] = cosr * cosp * cosy + sinr * sinp * siny;
	quat[ 1 ] = sinr * cosp * cosy - cosr * sinp * siny;
	quat[ 2 ] = cosr * sinp * cosy + sinr * cosp * siny;
	quat[ 3 ] = cosr * cosp * siny - sinr * sinp * cosy;

	return Quat.normalize( quat, dest );
};


//--------------------------------------------------------------------------------
// 逆回転クォータニオンを作成します。
//--------------------------------------------------------------------------------
Quat.inverseRotation = function ( quat, dest )
{
	// 任意軸周りの回転クォータニオン ( w; x, y, z ) を考えるとき、
	// ( -w; -x, -y, -z ) は同じ回転を意味し、
	// ( w; -x, -y, -z ) は逆回転を意味します。
	
	return Quat.conjugate( quat, dest );
};


//--------------------------------------------------------------------------------
// 球面線形補間します。
//--------------------------------------------------------------------------------
Quat.slerp = function ( quat1, quat2, t, dest )
{
	// クォータニオンは正規化されている必要があります。

	if ( !dest )
	{
		dest = Quat.create();
	}

	var cosTheta = quat1[ 0 ] * quat2[ 0 ] + quat1[ 1 ] * quat2[ 1 ] + quat1[ 2 ] * quat2[ 2 ] + quat1[ 3 ] * quat2[ 3 ];  // クォータニオンの内積

	if ( Math.abs( cosTheta ) >= 1 )
	{
		dest[ 0 ] = quat1[ 0 ];
		dest[ 1 ] = quat1[ 1 ];
		dest[ 2 ] = quat1[ 2 ];
		dest[ 3 ] = quat1[ 3 ];

		return dest;
	}

	var sinTheta = Math.sqrt( 1 - cosTheta * cosTheta );

	if ( Math.abs( sinTheta ) < 0.001 )
	{
		dest[ 0 ] = quat1[ 0 ] * 0.5 + quat2[ 0 ] * 0.5;
		dest[ 1 ] = quat1[ 1 ] * 0.5 + quat2[ 1 ] * 0.5;
		dest[ 2 ] = quat1[ 2 ] * 0.5 + quat2[ 2 ] * 0.5;
		dest[ 3 ] = quat1[ 3 ] * 0.5 + quat2[ 3 ] * 0.5;

		return dest;
	}

	var theta = Math.acos( cosTheta );
	var ratioA = Math.sin( ( 1 - t ) * theta ) / sinTheta;
	var ratioB = Math.sin( t * theta ) / sinTheta;

	dest[ 0 ] = quat1[ 0 ] * ratioA + quat2[ 0 ] * ratioB;
	dest[ 1 ] = quat1[ 1 ] * ratioA + quat2[ 1 ] * ratioB;
	dest[ 2 ] = quat1[ 2 ] * ratioA + quat2[ 2 ] * ratioB;
	dest[ 3 ] = quat1[ 3 ] * ratioA + quat2[ 3 ] * ratioB;

	return dest;
};


//--------------------------------------------------------------------------------
// 内積を算出します。
//--------------------------------------------------------------------------------
Quat.dot = function ( quat1, quat2 )
{
	return quat1[ 0 ] * quat2[ 0 ] + quat1[ 1 ] * quat2[ 1 ] + quat1[ 2 ] * quat2[ 2 ] + quat1[ 3 ] * quat2[ 3 ];
};


//--------------------------------------------------------------------------------
// 長さを取得します。
//--------------------------------------------------------------------------------
Quat.length = function ( quat )
{
	var	w = quat[ 0 ],
		x = quat[ 1 ],
		y = quat[ 2 ],
		z = quat[ 3 ];

	return Math.sqrt( w * w + x * x + y * y + z * z );
};


//--------------------------------------------------------------------------------
// 長さの二乗を取得します。
//--------------------------------------------------------------------------------
Quat.squaredLength = function ( quat )
{
	var	w = quat[ 0 ],
		x = quat[ 1 ],
		y = quat[ 2 ],
		z = quat[ 3 ];

	return w * w + x * x + y * y + z * z;
};


//--------------------------------------------------------------------------------
// 回転軸と回転角を抽出します。 
//--------------------------------------------------------------------------------
Quat.extractAxisAngle = function ( quat )
{
	var	w = quat[ 0 ],
		x = quat[ 1 ],
		y = quat[ 2 ],
		z = quat[ 3 ];

	var scale = Math.sqrt( x * x + y * y + z * z );
	
	return { vec : [ x / scale, y / scale, z / scale ], rad : Math.acos( w ) * 2 };
};


//--------------------------------------------------------------------------------
// 4x4 行列に変換します。
//--------------------------------------------------------------------------------
Quat.toMat4 = function ( quat, dest )
{
	if ( !dest )
	{
		dest = Mat4.create();
	}

	var	w = quat[ 0 ],
		x = quat[ 1 ],
		y = quat[ 2 ],
		z = quat[ 3 ];

	var x2 = x + x,
		y2 = y + y,
		z2 = z + z;

	var xx = x * x2,
		xy = x * y2,
		xz = x * z2,
		yy = y * y2,
		yz = y * z2,
		zz = z * z2,
		wx = w * x2,
		wy = w * y2,
		wz = w * z2;

	dest[  0 ] = 1 - ( yy + zz );
	dest[  1 ] = xy + wz;
	dest[  2 ] = xz - wy;
	dest[  3 ] = 0;

	dest[  4 ] = xy - wz;
	dest[  5 ] = 1 - ( xx + zz );
	dest[  6 ] = yz + wx;
	dest[  7 ] = 0;

	dest[  8 ] = xz + wy;
	dest[  9 ] = yz - wx;
	dest[ 10 ] = 1 - ( xx + yy );
	dest[ 11 ] = 0;

	dest[ 12 ] = 0;
	dest[ 13 ] = 0;
	dest[ 14 ] = 0;
	dest[ 15 ] = 1;

	return dest;
};


//--------------------------------------------------------------------------------
// 文字列表現に変換します。
//--------------------------------------------------------------------------------
Quat.rotateVec3 = function ( quat, vec, dest )
{
	// クォータニオンは正規化されていなければいけません!!
	
	if ( !dest )
	{
		dest = Vec3.create();
	}

	var r = quat;
	var p = [ 0, vec[ 0 ], vec[ 1 ], vec[ 2 ] ];
	var q = Quat.conjugate( r );

	var result = Quat.multiply( r, p );
	result = Quat.multiply( result, q );
	
	dest[ 0 ] = result[ 1 ];
	dest[ 1 ] = result[ 2 ];
	dest[ 2 ] = result[ 3 ];

	return dest;
};


//--------------------------------------------------------------------------------
// 文字列表現に変換します。
//--------------------------------------------------------------------------------
Quat.toString = function ( quat )
{
	return '( ' + quat[ 0 ] + '; ' + quat[ 1 ] + ', ' + quat[ 2 ] + ', ' + quat[ 3 ] + ' )';
};
