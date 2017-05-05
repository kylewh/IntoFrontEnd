(function(){

"use strict";

function ImageLoader(selector, url, opts){
    
    if(url){ 
    
        // set image on background (set to false for image elements)
        this.background = true; 
            
        $.extend(this, opts);
        
        this.hasAllFeatures = true;
        if(!window.Blob){
            this.hasAllFeatures = false;
        };
        if(!window.URL && !window.webkitURL){
            this.hasAllFeatures = false;
        };
        
        // the element we will set the image on
        this.el = $(selector);
        
        // the url of the remote image we want to load
        this.url = url;
        
        this.getImage();
    }
}

// create an objectURL from the blob
ImageLoader.prototype.createObjectURL = function(blob){
    var url = window.URL || window.webkitURL;
    this.objectURL = url.createObjectURL(blob);
    return this.objectURL;
}

// after we've used the objectURL, get rid of it
ImageLoader.prototype.revokeObjectURL = function(blob){
    var url = window.URL || window.webkitURL;
    url.revokeObjectURL(this.objectURL);
}


// load the remote image using XHR2
ImageLoader.prototype.getImage = function(){
    if(this.url.indexOf('data:image') === -1
        && this.hasAllFeatures === true){
        this.xhr = new XMLHttpRequest();
        this.xhr.open('GET', this.url, true);
        this.xhr.responseType = 'arraybuffer';
        this.bindedOnLoad = this.onLoad.bind(this);
        this.bindedOnError = this.onError.bind(this);
        this.xhr.addEventListener('load', this.bindedOnLoad);
        this.xhr.addEventListener('error', this.bindedOnError);
        this.xhr.send();
    }
    else{
        this.show(this.url);
    }
}

// when the image has loaded, set it
ImageLoader.prototype.onLoad = function(e){
    this.xhr.removeEventListener('load', this.bindedOnLoad);
    this.xhr.removeEventListener('error', this.bindedOnError);
    if(this.xhr.status == 200){
        var blob = new Blob(
            [this.xhr.response], 
            {
                'type': 'image/jpeg'
            }
        );
        var src = this.createObjectURL(blob);
        this.show(src);
        setTimeout(this.revokeObjectURL.bind(this), 5000);
    }
}

// error in xhr
ImageLoader.prototype.onError = function(e){
    this.xhr.removeEventListener('load', this.bindedOnLoad);
    this.xhr.removeEventListener('error', this.bindedOnError);
    if(this.xhr.status === 0){
        this.imageObject = new Image();
        this.bindedOnImageObjectLoad = this.onImageObjectLoad.bind(this);
        this.imageObject.addEventListener('load', this.bindedOnImageObjectLoad);
        this.imageObject.src = this.url;
    }
}

// image object loaded
ImageLoader.prototype.onImageObjectLoad = function(e){
    this.imageObject.removeEventListener('load', this.bindedOnImageObjectLoad);
    this.show(this.url);
}

// show the image
ImageLoader.prototype.show = function(src){
    if(this.background === true){
        this.requestAnimationFrame(
            function(){
                this.el.css('backgroundImage', 'url('+src+')');
                if(this.showClass){
                    this.el.addClass(this.showClass);
                }
            }
        );  
    }
    else{
        this.requestAnimationFrame(
            function(){
                this.el.attr('src', src);
                if(this.showClass){
                    this.el.addClass(this.showClass);
                }
            }
        );
    }
}

ImageLoader.prototype.requestAnimationFrame = function(func){
    var rAF = window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame;
    if(rAF){
        rAF($.proxy(func, this));
    }
    else{
        func.call(this);
    }
}

// check if we've got require
if(typeof module !== "undefined"){
    module.exports = ImageLoader;
}
else{
    window.ImageLoader = ImageLoader;
}

}()); // end wrapper