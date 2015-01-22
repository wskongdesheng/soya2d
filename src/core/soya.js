﻿/**
 * 引擎命名空间
 * @namespace
 * @author {@link http://weibo.com/soya2d soya哥}
 */
var soya2d = new function(){

    //渲染实例编号
    this.__roIndex=0;
    /**
     * 版本信息
     * @type {Object}
     * @property {Array} v 版本号
     * @property {string} state
     * @property {function} toString 返回版本
     */
	this.version = {
        v:[0,1,0,156],//[major,minor,patch,build]
        state:'alpha',
        toString:function(){
            return soya2d.version.v.join('.') + ' ' + soya2d.version.state;
        }
    };
    /**
     * 官网地址
     * @type {String}
     * @constant
     */
	this.website = 'http://soya2d.com';
    /**
     * 扩展属性到对象
     * @param {Object} obj 对象
     * @param {Object} attrs 属性
     * @param {Object} [cover=false] 如果已有该属性，是否覆盖
     */
	this.ext = function(obj,attrs,cover){
        var keys = Object.keys(attrs);
		for (var i=keys.length;i--;) {
            var attrName = keys[i];
            if(!obj.hasOwnProperty(attrName) || cover)
                obj[attrName] = attrs[attrName];
        }
	};

    /**
     * 继承
     * @param {Function} child 子类
     * @param {Function} parent 父类
     */
    this.inherits = function(child,parent){
    	//采用原型对象创建，可以保证只继承原型上挂着的方法，而构造内定义的方法不会继承
        child.prototype = Object.create(parent.prototype);
        child.prototype.constructor = child;
        child.prototype._super = parent.prototype;
	}

    /**
     * 模块管理
     * @type {object}
     */
    this.module = new function(){
        var map = {};
        /**
         * 安装新模块
         * @param  {string} key  模块标识
         * @param  {Object} opts 回调事件
         * @param  {function} opts.onInit 模块初始化时调用,回调参数[soya2d.Game]
         * @param  {function} opts.onLoop 主循环时调用[soya2d.Game,循环间隔，当前时间毫秒]
         * @param  {function} opts.onStart 游戏实例启动时调用[soya2d.Game]
         * @param  {function} opts.onStop 游戏实例停止时调用[soya2d.Game]
         * @param  {function} opts.onSceneChange 游戏当前场景发生改变时调用[soya2d.Game，当前场景]
         * @alias module.install
         * @memberof! soya2d#
         */
        this.install = function(key,opts){
            map[key] = opts;
        }

        /**
         * @private
         */
        this._getAll = function(){
            return map;
        }
    }
};
var soya = soya2d;

//系统扩展
self.Int8Array = self.Int8Array || Array;
self.Uint8Array = self.Uint8Array || Array;
self.Int16Array = self.Int16Array || Array;
self.Uint16Array = self.Uint16Array || Array;
self.Int32Array = self.Int32Array || Array;
self.Uint32Array = self.Uint32Array || Array;
self.Float32Array = self.Float32Array || Array;

self.console = self.console||new function(){
	this.log = function(){}
	this.info = function(){}
	this.debug = function(){}
	this.error = function(){}
}

self.cancelAFrame = (function(w){
    return w.cancelAnimationFrame           ||
        w.webkitCancelRequestAnimationFrame ||
        w.msCancelRequestAnimationFrame     ||
        w.mozCancelRequestAnimationFrame    ||
        w.oCancelRequestAnimationFrame      ||
        w.clearTimeout
})(self);
self.requestAFrame = (function(w){
    return  w.requestAnimationFrame       || 
            w.webkitRequestAnimationFrame ||
            w.msRequestAnimationFrame     ||
            w.mozRequestAnimationFrame    ||
            w.oRequestAnimationFrame      ||
            function(callback) {
                return w.setTimeout(function() {
                    callback(Date.now());
                },16.7);
            };
})(self);

/**
 * 混合类型——默认
 * @constant
 */
soya2d.BLEND_NORMAL = 'source-over';
/**
 * 混合类型——高亮
 * @constant
 */
soya2d.BLEND_LIGHTER = 'lighter';
/**
 * 混合类型——遮罩
 * @constant
 */
soya2d.BLEND_MASK = 'destination-in';
/**
 * 混合类型——清除
 * @constant
 */
soya2d.BLEND_CLEAR = 'destination-out';
/**
 * 线条端点类型——BUTT
 * @constant
 */
soya2d.LINECAP_BUTT = 'butt';
/**
 * 线条端点类型——ROUND
 * @constant
 */
soya2d.LINECAP_ROUND = 'round';
/**
 * 线条端点类型——SQUARE
 * @constant
 */
soya2d.LINECAP_SQUARE = 'square';
/**
 * 线条交点类型——BEVEL
 * @constant
 */
soya2d.LINEJOIN_BEVEL = 'bevel';
/**
 * 线条交点类型——ROUND
 * @constant
 */
soya2d.LINEJOIN_ROUND = 'round';
/**
 * 线条交点类型——MITER
 * @constant
 */
soya2d.LINEJOIN_MITER = 'miter';

/**
 * 文本水平对齐类型——TEXTALIGN_LEFT
 * @constant
 */
soya2d.TEXTALIGN_LEFT = "left";
/**
 * 文本水平对齐类型——TEXTALIGN_CENTER
 * @constant
 */
soya2d.TEXTALIGN_CENTER = "center";
/**
 * 文本水平对齐类型——TEXTALIGN_RIGHT
 * @constant
 */
soya2d.TEXTALIGN_RIGHT = "right";
/**
 * 文本垂直对齐类型——TEXTVALIGN_TOP
 * @constant
 */
soya2d.TEXTVALIGN_TOP = "hanging";
/**
 * 文本垂直对齐类型——TEXTVALIGN_MIDDLE
 * @constant
 */
soya2d.TEXTVALIGN_MIDDLE = "middle";
/**
 * 文本垂直对齐类型——TEXTVALIGN_BOTTOM
 * @constant
 */
soya2d.TEXTVALIGN_BOTTOM = "alphabetic";
/**
 * 文本书写方向——从左到右
 * @constant
 */
soya2d.TEXTDIR_LTR = "ltr";
/**
 * 文本书写方向——从右到左
 * @constant
 */
soya2d.TEXTDIR_RTL = "rtl";

/**
 * 纹理重复类型——REPEAT
 * @constant
 */
soya2d.REPEAT = 'repeat';
/**
 * 纹理重复类型——NOREPEAT
 * @constant
 */
soya2d.NOREPEAT = 'no-repeat';
/**
 * 纹理重复类型——REPEAT_X
 * @constant
 */
soya2d.REPEAT_X = 'repeat-x';
/**
 * 纹理重复类型——REPEAT_Y
 * @constant
 */
soya2d.REPEAT_Y = 'repeat-y';
/**
 * 线性渐变类型
 * @constant
 */
soya2d.GRADIENTTYPE_LINEAR = 1;
/**
 * 放射渐变类型
 * @constant
 */
soya2d.GRADIENTTYPE_RADIAL = 2;

/**
 * 点击测试类型——路径
 * @constant
 */
soya2d.HITTEST_PATH = 1;
/**
 * 点击测试类型——像素
 * @constant
 */
soya2d.HITTEST_PIXEL = 2;

/**
 * 媒体加载错误类型——MEDIA_ERR_UNCERTAIN<br/>
 * 未知错误
 * @constant
 */
soya2d.MEDIA_ERR_UNCERTAIN = -1;
/**
 * 媒体加载错误类型——MEDIA_ERR_ABORTED<br/>
 * 加载被中断
 * @constant
 */
soya2d.MEDIA_ERR_ABORTED = 1;
/**
 * 媒体加载错误类型——MEDIA_ERR_NETWORK<br/>
 * 网络异常
 * @constant
 */
soya2d.MEDIA_ERR_NETWORK = 2;
/**
 * 媒体加载错误类型——MEDIA_ERR_DECODE<br/>
 * 无法解码
 * @constant
 */
soya2d.MEDIA_ERR_DECODE = 3;
/**
 * 媒体加载错误类型——MEDIA_ERR_SRC_NOT_SUPPORTED<br/>
 * 类型不支持
 * @constant
 */
soya2d.MEDIA_ERR_SRC_NOT_SUPPORTED = 4;
/**
 * 媒体加载错误类型——MEDIA_ERR_SRC_NOT_FORTHCOMING<br/>
 * 无法获取资源数据
 * @constant
 */
soya2d.MEDIA_ERR_SRC_NOT_FORTHCOMING = 101;

/**
 * 加载类型——并行
 * @constant
 */
soya2d.LOADMODE_PARA = 1;
/**
 * 加载类型——串行
 * @constant
 */
soya2d.LOADMODE_SEQU = 2;