

class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    preload() {
        //load images here
        this.load.image('brick', './assets/testEnemy.png')
        this.load.image('player', './assets/testPlayer.png')
        this.load.image('grassbg', './assets/StartTower.png')
        this.load.image('longbg', './assets/Sky.png')
        this.load.image('longbg2','./assets/longneck2.png')
        this.load.image('questionmarks',"./assets/questionmarkOverlay.png")
        this.load.image('tower','./assets/Tower.png')
        this.load.image('mouthMan','./assets/mouthMan.png')
        this.load.image('makeItHome','./assets/MakeItHome.png')
        this.load.image('chain','./assets/chain.png')
        //audio
        this.load.audio('vocals', './assets/Vocals.wav')
        this.load.audio('synth', './assets/Synth.wav')
        this.load.audio('claps', './assets/Claps.wav')
        this.load.audio('kicks', './assets/Kicks.wav')
        this.load.audio('bell', './assets/Bell.wav')
        this.load.audio('evolved','./assets/EvolvedTrack.wav')
        this.load.audio('shieldHit','./assets/ShieldHit.wav')

        //load font
       // this.load.font('roman','./assets/AUGUSTUS.TTF','truetype')
    }

    create() {
        //Declare scene vars here
        //Make a button for restart after gameover
        this.keyRestart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        //Gameover bool
        this.gameover = false;
        //Declare audio
        let audioConfig = {
            loop: true,
        }
        this.vocals = this.sound.add('vocals',audioConfig)
        this.synth = this.sound.add('synth',audioConfig)
        this.synth.play()
        this.claps = this.sound.add('claps',audioConfig)
        this.kicks = this.sound.add('kicks',audioConfig)
        this.bell = this.sound.add('bell')
        this.evolvedTrack = this.sound.add('evolved',audioConfig)
        this.shieldHit = this.sound.add('shieldHit').setVolume(0.25)
      
        //track score var
        this.score = 0
        //track health
        this.playerHealth = 5
        //tower cords for animation
        this.towerLocationX = ((width / 3)*2) + 50
        this.towerLocationY = height / 3
       //diffucltylvl
       this.difficultyLevel = 0
       //screenshaker bool
       
        //SPeed of obsticals
        this.speed = 10
        //dif speed the obstical can spawn (speed - diff)
        this.speeddif = 2
        //the background scrollspeed
        this.scrollSpeed = 2
        //used to track time , might go away if i use there clock
        this.myClock = 0
        this.difficultyTimer = this.vocals.duration *2
        //postion for the lanes
        this.LanePostions = [(width / 3) / 2, (width / 3) + (width / 3) / 2, (width / 3) * 2 + (width / 3) / 2]
        //add Background image here
        this.bgImage = this.add.image(width / 2, height / 2, 'grassbg').setOrigin(.5, .5)
        // Position scrolling BG at top of bgImage (off-screen initially) get rid of the set scale when I get new scrollin bg asset.
        this.scrollingBG = this.add.tileSprite(width / 2, -height / 2, 0, 0, 'longbg').setOrigin(0.5, 0.5)
       

        //LAyered arts that overlay
        this.questionmarks = this.add.tileSprite(0,height/2,0,0,'questionmarks').setOrigin(0.5,0.5).setRotation(0.35).setAlpha(0)
        this.mouthMan = this.add.sprite(width/2,(height/2) - 300,'mouthMan').setOrigin(0.5,0.5).setAlpha(0)
        this.makeItHome = this.add.sprite(width - 200,(height/2) - 200,'makeItHome').setScale(0.3).setAlpha(0)
        this.chain1 = this.add.tileSprite(width/2,height/2,0,0,'chain').setOrigin(0.5,0.5).setScale(3).setRotation(45).setAlpha(0)
        this.chain2 = this.add.tileSprite(width/2,height/2,0,0,'chain').setOrigin(0.5,0.5).setScale(3).setRotation(-45).setAlpha(0)
        this.chain3 = this.add.tileSprite(100,height/2,0,0,'chain').setOrigin(0.5,0.5).setScale(3).setAlpha(0)
        this.chain4 = this.add.tileSprite(width - 100,height/2,0,0,'chain').setOrigin(0.5,0.5).setScale(3).setAlpha(0)
       
        //THE TOWER NEEDS TO BE HERE SO NOTHING COVERS IT 
        this.tower = this.add.tileSprite((width/2)-10,-height/2,0,0,'tower').setOrigin(0.5,0.5)
        //the particle for the tower angles, make it go upwards and fade out, might add some more particles to make it look better

         this.emitter = this.add.particles(this.towerLocationX, this.towerLocationY, 'brick', {

             
            frequency: 200,    
            quantity: 1,
            emitting:false,
           
            speedY: { min: -600, max: -400 }, // negative Y = up
            speedX: { min: -1000, max: 800 },

            // A bit of random direction/rotation for organic feel
             angle: { min: 200, max: 340 },    // mostly upward cone
             rotate: { min: -20, max: 20 },
            angularVelocity: { min: -120, max: 120 },

             // Life + scale + fade
            lifespan: { min: 500, max: 1000 },
             scale: { start: 0.45, end: 0.1 },
             alpha: {values:[0,1,1,1,0] ,interpolation:'linear' },

             // Optional gravity if you want arc; 0 keeps straight-ish
            gravityY: 40,

            // make it look snappy
            blendMode: 'NORMAL'
             });

        //Make lane lines
        this.add.rectangle(width / 3, height / 2, 10, height, 0x0000f).setAlpha(0.5)
        this.add.rectangle((width / 3) * 2, height / 2, 10, height, 0x0000f).setAlpha(0.3)
        


        //adding enemies to lanes to test positioning (should have a factory that produces these)
        this.enemy1 = new Obstical(this, (width / 3) / 2, 50, 'brick', 0, this.speed)
        this.enemy2 = new Obstical(this, (width / 3) + (width / 3) / 2, 50, 'brick', 0, this.speed)
        this.enemy3 = new Obstical(this, (width / 3) * 2 + (width / 3) / 2, 50, 'brick', 0, this.speed)
        this.enemies = this.physics.add.group([this.enemy1, this.enemy2, this.enemy3])

        //Add score text and health text, change these later, but for now they work for testing
        this.textConfig ={
            fontSize: '64px',
            fontFamily: 'roman',
            color: '#000000'
        }
        this.scoreText = this.add.text(width/10,height/20,'Score: ',this.textConfig).setOrigin(0.5,0.5)
        this.healthText = this.add.text(width/2,height/20,'health: ' + this.playerHealth,this.textConfig).setOrigin(0.5,0.5)
        this.difficultyLevelText = this.add.text((width / 3) * 2 + (width / 3) / 2,height/20,'Difficulty: ' + this.difficultyLevel,this.textConfig).setOrigin(0.5,0.5)
        this.highScoreText = this.add.text(width/2,height - 100,"Highscore:",this.textConfig).setOrigin(0.5,0.5)

        //add player
        this.player = new Player(this, 'player')

        //if player and enemy collide respawn the enemy and add score
        this.physics.add.collider(this.player, this.enemies, (player, enemy) => {
            enemy.respawnObstical(this.LanePostions[Phaser.Math.Between(0, 2)], Phaser.Math.Between(this.speed - this.speeddif, this.speed))
            this.player.blockAnimation()
            this.score++
            this.scoreText.text = "Score: " + this.score
            this.shieldHit.play()
            
            
            
        })
        //Get a reference to a track length
        const trackDurationMs = Math.ceil(this.vocals.duration * 1000);
        // timer to better handle difficulty increase
        this.time.addEvent({
    delay: trackDurationMs,
    loop: true,
    callback: () => {
      if(this.gameover == false){
       this.startNextDifficulty()
      }
    }
  })
    }

    update() {
        if(this.gameover == false){
       this.gamePlaying()
    }
    }


    //Might try to migrate this to Player.js , I feel this does not need to be checked everyframe, just when lanepos changes
    updateLanePosition() {
        switch (this.player.lanePos) {
            case 1:
                this.player.setX((width / 3) / 2)
                break
            case 2:
                this.player.setX((width / 3) + (width / 3) / 2)
                break
            case 3:
                this.player.setX((width / 3) * 2 + (width / 3) / 2)
                break
        }
    }

    startNextDifficulty() {
        this.bell.play()
        this.difficultyLevel++
         this.difficultyLevelText.text = 'Difficulty: ' + this.difficultyLevel
        this.myClock = 0
        this.cameras.main.flash(5000, 255, 255, 255)
        this.scrollSpeed += 1
        this.speed += 1

        switch(this.difficultyLevel){

        case 1:
            this.vocals.play()
            this.synth.stop()
            this.bgShakeTween = this.tweens.add({
             targets: [this.scrollingBG,this.tower,this.mouthMan, this.makeItHome],
             angle: { from: -.5, to: .5 }, // keep small for vibration
             duration: 120,               // lower = faster vibration
             yoyo: true,
            repeat: -1,                 
            ease: 'Linear'
});

            break
        case 2:
            this.claps.play()
            this.vocals.stop()
            this.emitter.start()
            break
        case 3:
            this.kicks.play()
            this.claps.stop()
            this.scrollSpeed +=10
           break
        case 4:
            this.kicks.stop()
            this.vocals.play()
            break
        case 5:
            this.vocals.stop()
            this.evolvedTrack.play()
            this.evolvedTrack.setVolume(0.5)
            this.scrollingBG.setTexture('longbg2')
            break
        case 6:
            this.questionmarks.setAlpha(1)
            break
         case 7:
            this.makeItHome.setAlpha(.9)
            this.tweens.add({
            targets: this.makeItHome,
             scaleX: 0,          
             duration: 3000,
            yoyo: true,         
            repeat: -1,
            ease: 'Linear'
            });  
            break  
        case 8:
            this.chain1.setAlpha(1)
            this.chain2.setAlpha(1)
            this.chain3.setAlpha(1)
            this.chain4.setAlpha(1)
        break
        case 9:
            this.mouthMan.setAlpha(0.5)
            break
       
            
        }
        

    }

   
    gamePlaying()
    {
        if(this.highScore == null) { this.highScore = 0}
         this.highScoreText.text = "HighScore: " + this.highScore
        //for testing question marks rn
        this.questionmarks.tilePositionY-= this.scrollSpeed
        this.updateLanePosition()
        this.enemy1.moveObstical()
        this.enemy2.moveObstical()
        this.enemy3.moveObstical()
        this.bgImage.setY(this.bgImage.y + 2)
        // Move scrollingBG down with bgImage to keep it at the top

        if (this.scrollingBG.y < height / 2) {
            this.scrollingBG.setY(this.scrollingBG.y + this.scrollSpeed)
            this.tower.setY(this.tower.y + this.scrollSpeed)
        }
        else {
            this.scrollingBG.tilePositionY -= this.scrollSpeed
            this.tower.tilePositionY -= this.scrollSpeed *3
            this.chain1.tilePositionY -= this.scrollSpeed / 2
            this.chain2.tilePositionY -= this.scrollSpeed / 2
            this.chain3.tilePositionY -= this.scrollSpeed / 2
            this.chain4.tilePositionY += this.scrollSpeed / 2

        }


        //If an enemy goes off the screen, respawn it at the top with a random lane and speed
        if (this.enemy1.y > height + 100) {
            this.playerHealth--
            this.healthText.text = 'Health: ' +this.playerHealth
            this.enemy1.respawnObstical(this.LanePostions[Phaser.Math.Between(0, 2)], Phaser.Math.Between(this.speed - this.speeddif, this.speed))
        }
        if (this.enemy2.y > height + 100) {
            this.playerHealth--
            this.healthText.text = 'Health: ' +this.playerHealth
            this.enemy2.respawnObstical(this.LanePostions[Phaser.Math.Between(0, 2)], Phaser.Math.Between(this.speed - this.speeddif, this.speed))
        }
        if (this.enemy3.y > height + 100) {
            this.playerHealth--
            this.healthText.text = 'Health: ' +this.playerHealth
            this.enemy3.respawnObstical(this.LanePostions[Phaser.Math.Between(0, 2)], Phaser.Math.Between(this.speed - this.speeddif, this.speed))
        }
        //Handle GameOver
        if(this.playerHealth <= 0 && this.gameover==false)
        {
            this.gameoverStarted()
        }
    }

     gameoverStarted()
    {
        if(this.highScore ==null || this.highScore < this.score)
        {
         this.highScore = this.score 
         this.highScoreText.text = "HighScore: " + this.highScore
        }
        this.gameover = true
        this.cameras.main.flash(5000, 255, 0, 0,true)
        this.add.text(width/2,height/2,"Game Over",this.textConfig).setOrigin(0.5,0.5)
        this.add.text(width/2,(height/2) + 100,"Press 'R' to restart",this.textConfig).setOrigin(0.5,0.5)
        this.keyRestart.on('down',()=>{
        //Stops all music , trun this into a switch case statement for cleaner read, and prob efficeny 
        this.vocals.stop() 
        this.synth.stop()
        this.claps.stop()
        this.kicks.stop()
        this.bell.stop()
        this.evolvedTrack.stop()
             this.scene.start('menuScene')
        })
        
    }
}