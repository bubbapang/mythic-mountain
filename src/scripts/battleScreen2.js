import Battle from "./battle.js"
import Unit from "./unit.js"

export default class BattleScreen2 {
    constructor(overworld) {
        this.gameContainer = overworld.element
        this.canvas = overworld.canvas
        this.context = overworld.context
        this.audio = overworld.audio

        // create battle screen art
        this.battleScreenArt = new Image()
        this.battleScreenArt.src = "assets/cave-art/gray-cave.png";

        // change audio
        this.audio.src = "music/xDeviruchi - Decisive Battle.wav"

        // create sprite canvases
        this.playerCanvas = document.createElement("canvas")
        this.playerCanvas.classList.add("player-canvas")
        this.playerCanvas.width = this.gameContainer.offsetWidth / 2
        this.playerCanvas.height = this.gameContainer.offsetHeight
        this.playerContext = this.playerCanvas.getContext("2d")
        this.playerContext.imageSmoothingEnabled = false
        
        this.enemyCanvas = document.createElement("canvas")
        this.enemyCanvas.classList.add("enemy-canvas")
        this.enemyCanvas.width = this.gameContainer.offsetWidth / 2
        this.enemyCanvas.height = this.gameContainer.offsetHeight
        this.enemyContext = this.enemyCanvas.getContext("2d")
        this.enemyContext.imageSmoothingEnabled = false

        // add canvases to game container
        this.gameContainer.appendChild(this.playerCanvas)
        this.gameContainer.appendChild(this.enemyCanvas)

        // create fireknight
        this.fireknight1 = new Image()
        this.fireknight2 = new Image()
        this.fireknight3 = new Image()
        this.fireknight4 = new Image()
        this.fireknight5 = new Image()
        this.fireknight6 = new Image()
        this.fireknight7 = new Image()
        this.fireknight8 = new Image()
        this.fireknight1.src = "assets/battle-screen-art/fireknight/idle_1.png"
        this.fireknight2.src = "assets/battle-screen-art/fireknight/idle_2.png"
        this.fireknight3.src = "assets/battle-screen-art/fireknight/idle_3.png"
        this.fireknight4.src = "assets/battle-screen-art/fireknight/idle_4.png"
        this.fireknight5.src = "assets/battle-screen-art/fireknight/idle_5.png"
        this.fireknight6.src = "assets/battle-screen-art/fireknight/idle_6.png"
        this.fireknight7.src = "assets/battle-screen-art/fireknight/idle_7.png"
        this.fireknight8.src = "assets/battle-screen-art/fireknight/idle_8.png"
        this.playerFrame = 0

        // create dragon
        this.dragon = new Image()
        this.dragon.src = "assets/battle-screen2-art/dragon/dragon_idle 1.png"
        this.enemyFrame = 0

        // found menu from overworld
        this.menu = document.querySelector(".menu")

        // find mini menu
        this.miniMenu = document.querySelector(".mini-menu")

        // find buttons
        this.fightButton = document.querySelector("#fight-button")

        // find all p tags in menu
        this.menuP = document.querySelectorAll("p")

        // remove all p tags from menu
        for (let i = 0; i < this.menuP.length; i++) {
            this.menuP[i].remove()
        }

        // find player and enemy HP bars
        this.playerHP = document.querySelector(".player-hp")
        this.enemyHP = document.querySelector(".enemy-hp")

        // remove player and enemy HP bars
        this.playerHP.remove()
        this.enemyHP.remove()

        // create HUD text
        // player name
        this.playerName = document.createElement("p")
        this.playerName.classList.add("player-name")
        this.playerName.innerText = "playername"
        this.playerName.style.color = "black"
        this.playerName.style.fontSize = "30px"
        this.playerName.style.fontFamily = "sans-serif"
        this.playerName.style.fontWeight = "bold"
        this.playerName.style.position = "absolute"
        this.playerName.style.top = "10px"
        this.playerName.style.left = "10px"
        this.playerName.style.zIndex = "1"
        this.menu.appendChild(this.playerName)

        // enemy name
        this.enemyName = document.createElement("p")
        this.enemyName.classList.add("enemy-name")
        this.enemyName.innerText = "enemyname"
        this.enemyName.style.color = "black"
        this.enemyName.style.fontSize = "30px"
        this.enemyName.style.fontFamily = "sans-serif"
        this.enemyName.style.fontWeight = "bold"
        this.enemyName.style.position = "absolute"
        this.enemyName.style.top = "10px"
        this.enemyName.style.right = "10px"
        this.enemyName.style.zIndex = "1"
        this.menu.appendChild(this.enemyName)

        // create HUD dialogue text
        this.dialogue = document.createElement("p")
        this.dialogue.classList.add("dialogue")
        this.dialogue.innerText = "Insert Dialogue..."
        this.dialogue.style.color = "white"
        this.dialogue.style.fontSize = "20px"
        this.dialogue.style.fontFamily = "sans-serif"
        this.dialogue.style.fontWeight = "bold"
        this.dialogue.style.position = "absolute"
        this.dialogue.style.top = "30px"
        this.dialogue.style.left = "300px"
        this.dialogue.style.zIndex = "1"
        this.menu.appendChild(this.dialogue)

        // create health bar borders
        // player health bar border
        this.playerHealthBarBorder = document.createElement("div")
        this.playerHealthBarBorder.classList.add("player-hp-border")
        this.playerHealthBarBorder.style.backgroundColor = "black"
        this.playerHealthBarBorder.style.width = "260px"
        this.playerHealthBarBorder.style.height = "20px"
        this.playerHealthBarBorder.style.position = "absolute"
        this.playerHealthBarBorder.style.top = "10px"
        this.playerHealthBarBorder.style.left = "10px"
        this.playerHealthBarBorder.style.zIndex = "1"
        this.playerHealthBarBorder.style.border = "4px solid black"
        this.menu.appendChild(this.playerHealthBarBorder)

        // enemy health bar border
        this.enemyHealthBarBorder = document.createElement("div")
        this.enemyHealthBarBorder.classList.add("enemy-hp-border")
        this.enemyHealthBarBorder.style.backgroundColor = "black"
        this.enemyHealthBarBorder.style.width = "260px"
        this.enemyHealthBarBorder.style.height = "20px"
        this.enemyHealthBarBorder.style.position = "absolute"
        this.enemyHealthBarBorder.style.top = "10px"
        this.enemyHealthBarBorder.style.right = "10px"
        this.enemyHealthBarBorder.style.zIndex = "1"
        this.enemyHealthBarBorder.style.border = "4px solid black"
        this.menu.appendChild(this.enemyHealthBarBorder)

        // create health bars
        // player health bar
        this.playerHealthBar = document.createElement("div")
        this.playerHealthBar.classList.add("player-hp")
        this.playerHealthBar.style.backgroundColor = "darkred"
        this.playerHealthBar.style.width = "260px"
        this.playerHealthBar.style.height = "20px"
        this.playerHealthBar.style.position = "absolute"
        this.playerHealthBar.style.top = "10px"
        this.playerHealthBar.style.left = "10px"
        this.playerHealthBar.style.zIndex = "1"
        // make a black border around the health bar
        this.playerHealthBar.style.border = "4px solid black"
        this.menu.appendChild(this.playerHealthBar)

        // enemy health bar
        this.enemyHealthBar = document.createElement("div")
        this.enemyHealthBar.classList.add("enemy-hp")
        this.enemyHealthBar.style.backgroundColor = "darkred"
        this.enemyHealthBar.style.width = "260px"
        this.enemyHealthBar.style.height = "20px"
        this.enemyHealthBar.style.position = "absolute"
        this.enemyHealthBar.style.top = "10px"
        this.enemyHealthBar.style.right = "10px"
        this.enemyHealthBar.style.zIndex = "1"
        // make a black border around the health bar
        this.enemyHealthBar.style.border = "4px solid black"
        this.menu.appendChild(this.enemyHealthBar)

        // find fight choice buttons
        this.fight1 = document.querySelector("#fight1")
        this.fight2 = document.querySelector("#fight2")
        this.fight3 = document.querySelector("#fight3")
        this.fight4 = document.querySelector("#fight4")

        // remove fight choice buttons
        this.miniMenu.removeChild(this.fight1)
        this.miniMenu.removeChild(this.fight2)
        this.miniMenu.removeChild(this.fight3)
        this.miniMenu.removeChild(this.fight4)

        // create fight choice buttons
        this.fight1 = document.createElement("button")
        this.fight2 = document.createElement("button")
        this.fight3 = document.createElement("button")
        this.fight4 = document.createElement("button")
        this.fight1.classList.add("fight-choice")
        this.fight2.classList.add("fight-choice")
        this.fight3.classList.add("fight-choice")
        this.fight4.classList.add("fight-choice")
        this.fight1.id = "fight1"
        this.fight2.id = "fight2"
        this.fight3.id = "fight3"
        this.fight4.id = "fight4"
        this.fight1.innerText = "fight1"
        this.fight2.innerText = "fight2"
        this.fight3.innerText = "fight3"
        this.fight4.innerText = "fight4"
        this.miniMenu.appendChild(this.fight1)
        this.miniMenu.appendChild(this.fight2)
        this.miniMenu.appendChild(this.fight3)
        this.miniMenu.appendChild(this.fight4)


        // start a new battle
        let player = new Unit("Astalor", 100, "player", [
            {"Sword Slice": [30, 100]}, 
            {"Sword Slash": [50, 80]}, 
            {"King's Strike": [80, 70]},
            {"Eat Coal": [30, 100]}
        ])
        let enemy = new Unit("Robert", 300, "enemy", [
            {"Sharp Roar": [30, 100]},  
            {"Dragon Tail": [50, 80]},
            {"Supernova Spit": [70, 60]},
            {"Devour Coal": [50, 100]}
        ])
        this.battle = new Battle(overworld, this.playerCanvas, this.enemyCanvas, player, enemy)
        this.battle.init()
    }

    init() {
        this.menu.style.display = "flex"
        this.fightButton.style.display = "block"
        this.fight1.style.display = "none"
        this.fight2.style.display = "none"
        this.fight3.style.display = "none"
        this.fight4.style.display = "none"
        this.fightButton.addEventListener("click", () => {
            this.battle.onFightButton()
            this.fightButton.style.display = "none"
            this.miniMenu.style.flexWrap = "wrap"
            this.fight1.style.display = "block"
            this.fight2.style.display = "block"
            this.fight3.style.display = "block"
            this.fight4.style.display = "block"
            this.fight1.addEventListener("click", () => {this.battle.onFight1()})
            this.fight2.addEventListener("click", () => {this.battle.onFight2()})
            this.fight3.addEventListener("click", () => {this.battle.onFight3()})
            this.fight4.addEventListener("click", () => {this.battle.onFight4()})
        })
        this.menu.style.display = "flex"
        this.battleScreenArt.onload = () => {
            this.audio.play()
            this.context.drawImage(this.battleScreenArt, 0, 0, this.canvas.width, this.canvas.height)
            this.animateCombatants()
        }
    }

    animateCombatants() {
        setInterval(() => {
            this.drawPlayer()
            this.drawEnemy()
            this.gameContainer.appendChild(this.playerCanvas)
            this.gameContainer.appendChild(this.enemyCanvas)
            this.playerFrame++
            this.enemyFrame++
        }, 100)
    }

    drawPlayer() { // animating with frames
        // 228 x 128
        const frames = [this.fireknight1, this.fireknight2, this.fireknight3, this.fireknight4, this.fireknight5, this.fireknight6, this.fireknight7, this.fireknight8]
        let currentPlayerFrame = this.playerFrame % frames.length
        const currentFireknight = frames[currentPlayerFrame]
        this.playerContext.clearRect(0, 0, this.playerCanvas.width, this.playerCanvas.height)
        this.playerContext.drawImage(
            currentFireknight, 
            80, 62, 
            this.playerCanvas.width, this.playerCanvas.height, 
            -50, 400, 
            this.playerCanvas.width * 6, this.playerCanvas.height * 6
        )
    }

    drawEnemy() { // animating with spritesheet
        // 320/5 x 64
        let dragonWidth = 64
        let dragonHeight = 64
        let dragonFrames = 5
        let slowDown = 3
        let scaling = 8
        
        if (this.enemyFrame < dragonFrames * slowDown) {this.enemyFrame++}
        else {this.enemyFrame = 0}
        this.enemyContext.clearRect(0, 0, this.enemyCanvas.width, this.enemyCanvas.height)
        this.enemyContext.drawImage(
            this.dragon, 
            (Math.floor(this.enemyFrame / slowDown) * dragonWidth), 0, // this slices the spritesheet into frames
            500, 800,
            0, 250,
            this.enemyCanvas.width * scaling, this.enemyCanvas.height * scaling
        )
    }
}

    // image, ///
    // sourceX, sourceY, ///
    // sourceWidth, sourceHeight, 
    // destinationX, destinationY, 
    // destinationWidth, destinationHeight