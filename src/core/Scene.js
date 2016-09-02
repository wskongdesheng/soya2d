﻿/**
 *  场景用来管理通过XML构建的UI
 *  @class Scene
 */
function Scene(data,game) {
    soya2d.ext(this,data);

    this.map = {};
    this.game = game;
}

Scene.prototype = {
    /**
     * 通过XML文档设置UI
     * @method setView
     * @param {XMLDocument} doc xml文档对象
     */
    setView:function(doc){
        var world = doc.children[0];
        build(this,world,this.game.world,this.game);
    },
    /**
     * 通过id属性查找显示对象
     * @method findview
     * @param  {String} id xml中节点的id属性
     * @return {soya2d.DisplayObject}
     */
    findView:function(id){
        return this.map[id];
    }
}


/**
 * 预加载回调，该回调中可以进行资源加载操作。资源加载完成后，会自动调用onInit回调
 * @method onPreload
 * @param {soya2d.Game} game 场景所属game
 */
/**
 * 初始化回调，在onPreload后调用
 * @method onInit
 * @param {soya2d.Game} game 场景所属game
 */
/**
 * 更新回调，每帧调用
 * @method onUpdate
 * @param {soya2d.Game} game 场景所属game
 * @param {Number} d 上一次调用的间隔
 */

function build(scene,node,parent,game){
    for(var i=0;i<node.children.length;i++){
        var n = node.children[i];
        var type = n.tagName;
        var id = n.attributes['id'] ? n.attributes['id'].value : null;
        var data = parseData(n.attributes,parent);
        var atlas = data['atlas'];
        if(type === 'sprite' && atlas){
            var prefix = data['atlas-prefix'];
            data.images = game.assets.atlas(atlas).getAll(prefix);
        }
        if(type === 'text'){
            var atlas = data['atlas'];
            var txt = '';
            for(var k=0;k<n.childNodes.length;k++){
                if(n.childNodes[k].nodeType === 3){
                    txt += n.childNodes[k].nodeValue;
                }
            }
            data.text = txt.replace(/(^\s+)|(\s+$)/mg,'');
            if(atlas)
            data.font = game.assets.atlas(atlas);
            data.size = parseInt(data['size']);
        }
        var ins = newInstance(type,data,game);

        bindEvent(n.attributes,ins,scene);
        if(id){
            scene.map[id] = ins;
        }
        parent.add(ins);

        if(n.children.length>0){
            build(scene,n,ins,game);
        }
    }
}

function parseData(attrs,parent){
    var rs = {};
    var ks = Object.keys(attrs);
    for(var i=ks.length;i--;){
        var k = ks[i];
        var kName = attrs[k].name;
        if(kName.indexOf('layout-')===0){
            if(!rs['layout'])rs['layout'] = {};
            
            rs['layout'][kName.split('-')[1]] = filter(kName,attrs[k].value,parent);
        }else{
            rs[kName] = filter(kName,attrs[k].value,parent);
        }
    }
    return rs;
}

function bindEvent(attrs,ins,scene){
    var ks = Object.keys(attrs);
    for(var i=ks.length;i--;){
        var k = ks[i];
        var kName = attrs[k].name;
        var val = attrs[k].value;
        if(kName.indexOf('on-') !== 0)continue;
        var evType = kName.substr(3);
        var evFn = scene[val];
        if(evFn instanceof Function){
            ins.on(evType,evFn);
        }else{
            soya2d.console.warn('invalid callback "'+val+'" of '+kName);
        }
    }
}

function filter(type,val,parent){
    switch(type){
        case 'x':case 'w':
        case 'y':case 'h':
        case 'z':case 'angle':case 'scaleX':
        case 'scaleY':case 'skewX':case 'skewY':
        case 'scrollAngle':case 'speed':case 'frameRate':
        case 'frameIndex':
        case 'letterSpacing':case 'lineSpacing':
            return parseFloat(val);
        case 'visible':case 'autoScroll':
        case 'loop':case 'autoplay':case 'fixedToCamera':
            return new Function('return '+val)();
        default:
            return val;
    }
}

function newInstance(type,data,game){
    var instance = new game.objects.map[type](data);
    return instance;
}
