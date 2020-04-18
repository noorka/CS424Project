"use strict";

class Flock {
    constructor(spriteTexture, flockSize) {
        this.xRange = 50;
        this.xStart = 10;
        this.yRange = 50;
        this.yStart = 5;
        //GameObject.call(this, this.mFlock);
        this.mFlock = new Array();
        var x, y;
        var i, p;
        var h = [];
        var duckReady = false;
        for (i = 0; i < flockSize; i++) {
            duckReady = false;
            while(!duckReady){
                x = Math.floor(Math.random() * this.xRange + this.xStart);
                y = Math.floor(Math.random() * this.yRange + this.yStart);
                var newDucky = new Duck(spriteTexture, x, y);
                duckReady = true;
                for(p = 0; p < this.mFlock.length; p++){
                    if(this.mFlock[p].pixelTouches(newDucky, h)){
                        duckReady = false;
                        newDucky = null;
                    }
                }

                if(duckReady){
                    this.mFlock.push(newDucky);
                }
          }
       } //GameObject.call(this, this.mFlock);
    }
    update() {
        var i = 0;
        for (i; i < this.mFlock.length; i++) {
            if((this.mFlock[i].isFed() == false)){
                this.mFlock[i].update();
            }
        }
    }
    draw(camera){
        var i = 0; 
        for(i; i < this.mFlock.length; i++){
            if((this.mFlock[i].isFed() == false)){
                this.mFlock[i].draw(camera);
            }
        }
    }
    isTouched(bread, h){
        var i = 0;
        var touchedDuck = null;
        for(i; i < this.mFlock.length; i++){
            if((this.mFlock[i].pixelTouches(bread, h))&& (this.mFlock[i].isFed() == false)){
                touchedDuck = this.mFlock[i];
            }
        }
        return touchedDuck;
    }

}