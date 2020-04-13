/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

"use strict";

function MyGame() {
    // textures: 
    this.kDuckSprite = "assets/Ducks_Bobbing.png";
    //this.kBreadSprite = "assets/Duck_Sprite.png"
    
    // The camera to view the scene
    this.mCamera = null;

    this.mTarget = null;

    this.mFlock = null;
    //this.mDuck = null;
    this.xRange = 10;
    this.xStart = 13;
    this.yRange = 5;
    this.yStart = 57;
}

gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    // loads the textures
    gEngine.Textures.loadTexture(this.kDuckSprite);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kDuckSprite);
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(20, 60),   // position of the camera
        20,                        // width of camera
        [20, 40, 600, 300]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray

    // Step B: Create the support objects


    // This should create a duck sprite with a unique position that can be fed into the array with a loop
    MyGame.prototype.makeDuck = function (){
        var chick = new SpriteAnimateRenderable(this.kDuckSprite);
        var x, y;
        x = Math.floor(Math.random() * this.xRange + this.xStart);
        y = Math.floor(Math.random() * this.yRange + this.yStart); 
        //console.log(x);
        //console.log(y);
        //x = 25;
        //y = 55;

        chick.setColor([1, 1, 1, 0]);
        chick.getXform().setSize(2, 2);
        chick.getXform().setPosition(x, y);
        chick.setSpriteSequence(256, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    256, 256,       // widthxheight in pixels
                                     6,              // number of elements in this sequence
                                     0);             // horizontal padding in between
        chick.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
        chick.setAnimationSpeed(15);
        return chick;
    }
    MyGame.prototype.makeFlock = function (flockSize){
        var i = 0;
        var flock = new Array();
        for(i; i<flockSize; i++){
            flock.push(this.makeDuck());
            console.log("pushing ducks");
        }
        console.log("flock made");
        return flock;
    }

    // this.mDuck= new SpriteAnimateRenderable(this.kDuckSprite);
    // this.mDuck.setColor([1, 1, 1, 0]);
    // this.mDuck.getXform().setPosition(26, 56.5);
    // this.mDuck.getXform().setSize(2, 2);
    // this.mDuck.setSpriteSequence(512, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    //256, 256,       // widthxheight in pixels
                                    //4,              // number of elements in this sequence
                                    //0);             // horizontal padding in between
    // this.mDuck.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    //this.mDuck.setAnimationSpeed(25);
                                // show each element for mAnimSpeed updates

    this.mFlock = this.makeFlock(5);

    this.mTarget = new SpriteRenderable(this.kDuckSprite);
    this.mTarget.setColor([1, 1, 1, 0]);
    this.mTarget.getXform().setPosition(25, 65);
    // 20 60
    this.mTarget.getXform().setSize(3, 3);
    this.mTarget.setElementPixelPositions(1536, 1792, 0, 256);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    var i = 0;
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: Draw everything
    //this.mFlock.draw(this.mCamera.getVPMatrix());
    for(i; i <this.mFlock.length; i++){
        this.mFlock[i].draw(this.mCamera.getVPMatrix());
    }

    this.mTarget.draw(this.mCamera.getVPMatrix());
};


// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {

    var deltaX = 0.1;
    var deltaY = 0.1;
    var i = 0;

    var xform = this.mTarget.getXform();
    // Support hero movements
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        xform.incXPosBy(deltaX);

        if (xform.getXPos() > 30) { // this is the right-bound of the window
            xform.setPosition(12, 60);
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        xform.incXPosBy(-deltaX);
        if (xform.getXPos() < 11) {  // this is the left-bound of the window
            xform.setXPos(20);
        }
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        xform.incYPosBy(deltaY);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        xform.incYPosBy(-deltaY);
    }

    //this.mFlock.updateAnimation();
    for(i; i <this.mFlock.length; i++){
        this.mFlock[i].updateAnimation();
    }

};