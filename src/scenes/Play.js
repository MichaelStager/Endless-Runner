class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        //Declare scene vars here
        this.speed = 20
        this.LanePostions = [(width / 3) / 2,(width / 3) + (width / 3) / 2,(width / 3) * 2 + (width / 3) / 2]
        //add Background image here
        this.add.image(width/2,height/2,'grassbg').setOrigin(.5,.5)
        //Make lane lines
        this.add.rectangle(width / 3, height / 2, 10, height, 0x0000f)
        this.add.rectangle((width / 3) * 2, height / 2, 10, height, 0x0000f)
        

        //adding enemies to lanes to test positioning (should have a factory that produces these)
        this.enemy1 = new Obstical(this, (width / 3) / 2, 50, 'brick', 0, this.speed)
        this.enemy2 = new Obstical(this, (width / 3) + (width / 3) / 2, 50, 'brick', 0, this.speed)
        this.enemy3 = new Obstical(this, (width / 3) * 2 + (width / 3) / 2, 50, 'brick', 0, this.speed)

        //add player
        this.player = new Player(this, 'player')
    }

    update() {
        this.updateLanePosition()
        this.enemy1.moveObstical()
        this.enemy2.moveObstical()
        this.enemy3.moveObstical()

        

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