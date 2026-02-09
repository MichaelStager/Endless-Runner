class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    preload() {
        //load images here
        this.load.image('brick','./assets/testEnemy.png')
        this.load.image('player','./assets/testPlayer.png')
        this.load.image('grassbg','./assets/backgroundTower.png')
        this.load.image('longbg','./assets/longneck.png')
    }

    create() {
        //Declare scene vars here
        this.speed = 20
        this.myClock = 0
        this.LanePostions = [(width / 3) / 2,(width / 3) + (width / 3) / 2,(width / 3) * 2 + (width / 3) / 2]
        //add Background image here
        this.bgImage = this.add.image(width/2,height/2,'grassbg').setOrigin(.5,.5)
        // Position scrolling BG at top of bgImage (off-screen initially)
        this.scrollingBG = this.add.tileSprite(width/2, -height/2, 0, 0, 'longbg').setOrigin(.5,.5).setScale(0.5,0.5)
        //Make lane lines
        this.add.rectangle(width / 3, height / 2, 10, height, 0x0000f)
        this.add.rectangle((width / 3) * 2, height / 2, 10, height, 0x0000f)
        

        //adding enemies to lanes to test positioning (should have a factory that produces these)
        this.enemy1 = new Obstical(this, (width / 3) / 2, 50, 'brick', 0, this.speed)
        this.enemy2 = new Obstical(this, (width / 3) + (width / 3) / 2, 50, 'brick', 0, this.speed)
        this.enemy3 = new Obstical(this, (width / 3) * 2 + (width / 3) / 2, 50, 'brick', 0, this.speed)
        this.enemies = this.physics.add.group([this.enemy1,this.enemy2,this.enemy3])

        //add player
        this.player = new Player(this, 'player')

        //add collisions
        this.physics.add.collider(this.player,this.enemies,(player,enemy)=>{
            enemy.respawnObstical(this.LanePostions[Phaser.Math.Between(0,2)],Phaser.Math.Between(this.speed-10,this.speed))
        })
    }

    update() {
        this.updateLanePosition()
        this.enemy1.moveObstical()
        this.enemy2.moveObstical()
        this.enemy3.moveObstical()
        this.bgImage.setY(this.bgImage.y +2)
        // Move scrollingBG down with bgImage to keep it at the top
       
        if(this.scrollingBG.y <height/2){
             this.scrollingBG.setY(this.scrollingBG.y + 2)
        }
        else{
            this.scrollingBG.tilePositionY -=2
        }
        
       //if player and enemy collide respawn the enemy and add score
        
        //If an enemy goes off the screen, respawn it at the top with a random lane and speed
        if(this.enemy1.y > height + 100)
        {
            this.enemy1.respawnObstical(this.LanePostions[Phaser.Math.Between(0,2)],Phaser.Math.Between(this.speed-10,this.speed))
        }
         if(this.enemy2.y > height + 100)
        {
            this.enemy2.respawnObstical(this.LanePostions[Phaser.Math.Between(0,2)],Phaser.Math.Between(this.speed-10,this.speed))
        }
         if(this.enemy3.y > height + 100)
        {
            this.enemy3.respawnObstical(this.LanePostions[Phaser.Math.Between(0,2)],Phaser.Math.Between(this.speed-10,this.speed))
        }
        //Speeds up the enemy over time, needs to be reworked, I dont like handling this here.
        this.speed+= .001

        //After 30 seconds flash the screen the screen white for a second to indicate the game just got harder, will need to add a ui overlay to make it look crazier
        if(this.myClock == 1800){
                this.cameras.main.flash(5000, 255, 255, 255)
            }
            this.myClock +=1;
    }

    //Might try to migrate this to Player.js , I feel this does not need to be checked everyframe, just when lanepos changes
    updateLanePosition() {
        switch (this.player.lanePos) {
            case 1:
                console.log("case 1")
                this.player.setX((width / 3) / 2)
                break
            case 2:
                console.log("case 2")
                this.player.setX((width / 3) + (width / 3) / 2)
                break
            case 3:
                console.log("case 3")
                this.player.setX((width / 3) * 2 + (width / 3) / 2)
                break
        }
    }
    
}