"use strict";

function MyGame() {
    this.kDuckSprite = "assets/Ducks_Bobbing.png";
    this.kSinkingDucks = "assets/Sinking_Ducks.png";

    // The camera to view the scene
    this.mCamera = null;

    this.mMsg = null;

    this.score = 0;
    this.mBread = null;
    this.mDuck = null;
    this.mFlock = null;
    this.mDuckHit = null;

    this.didScore = false;

}

gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kDuckSprite);
    gEngine.Textures.loadTexture(this.kSinkingDucks);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kDuckSprite);
    gEngine.Textures.unloadTexture(this.kSinkingDucks);
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 37.5), // position of the camera
        100,                       // width of camera
        [0, 0, 640, 480]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray

    this.mBread = new Bread(this.kDuckSprite);
    //this.mDuck = new Duck(this.kDuckSprite, 35, 45);
    this.mDuckHit = new SinkingDuck(this.kSinkingDucks, 35, 45);
    this.mDuckHit.setVisibility(false);
    this.mFlock = new Flock(this.kDuckSprite, 15);


    this.mMsg = new FontRenderable("Score: 0");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(1, 2);
    this.mMsg.setTextHeight(3);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    this.mMsg.draw(this.mCamera);
    
    this.mFlock.draw(this.mCamera);
    /*var i = 0;
    for(i = 0; i <this.mFlock.length; i++){
        this.mFlock[i].draw(this.mCamera);
        console.log("DUCK");
    }*/
    this.mDuckHit.draw(this.mCamera);
    this.mBread.draw(this.mCamera);
    
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    var h = [];
    var touchedDuck = this.mFlock.isTouched(this.mBread,h);
    if((touchedDuck != null)&&(gEngine.Input.isKeyPressed(gEngine.Input.keys.Space))){
        console.log(touchedDuck.getXform().getXPos());
        console.log(touchedDuck.getXform().getYPos());
        this.mDuckHit.getXform().setPosition(touchedDuck.getXform().getXPos(), touchedDuck.getXform().getYPos());
        touchedDuck.setVisibility(false);
        this.mDuckHit.setVisibility(true);
        this.mDuckHit.updateBeginning();
        touchedDuck.feedDuck();
        this.score++;
        this.mMsg.setText("Score: "+ this.score);
    }

    this.mDuckHit.update();
    this.mBread.update();
    this.mFlock.update();
};