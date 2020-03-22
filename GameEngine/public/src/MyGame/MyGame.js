/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */


"use strict";

function MyGame() {
    // textures: 
    this.kMinionSprite = "assets/minion_sprite.png";  // Portal and Collector are embedded here
    this.kDuckSprite = "assets/Duck_Sprite.png"

    // The camera to view the scene
    this.mCamera = null;

    // the hero and the support objects
    this.mTarget = null;
    this.mDuck = null;
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

    // The right minion
    this.mDuck= new SpriteAnimateRenderable(this.kDuckSprite);
    this.mDuck.setColor([1, 1, 1, 0]);
    this.mDuck.getXform().setPosition(26, 56.5);
    this.mDuck.getXform().setSize(2, 2);
    this.mDuck.setSpriteSequence(512, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    256, 256,       // widthxheight in pixels
                                    4,              // number of elements in this sequence
                                    0);             // horizontal padding in between
    this.mDuck.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mDuck.setAnimationSpeed(25);
                                // show each element for mAnimSpeed updates


    this.mTarget = new SpriteRenderable(this.kDuckSprite);
    this.mTarget.setColor([1, 1, 1, 0]);
    this.mTarget.getXform().setPosition(20, 60);
    this.mTarget.getXform().setSize(1.5, 1.5);
    this.mTarget.setElementPixelPositions(0, 256, 0, 256);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: Draw everything
    this.mDuck.draw(this.mCamera.getVPMatrix());
    this.mTarget.draw(this.mCamera.getVPMatrix());
    // this.mDuck.draw(this.mCamera.getVPMatrix());
};


// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {

    var deltaX = 0.1;
    var deltaY = 0.1;

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

    this.mDuck.updateAnimation();

};