!function(){"use strict";!function(){class e{constructor(e){this.overworld=e,this.gameContainer=e.element,this.canvas=e.canvas,this.context=e.context,this.audio=e.audio,this.battleScreenArt=new Image,this.battleScreenArt.src="../assets/battle-screen-art/twilight-pond.png",this.audio.src="../music/xDeviruchi - And The Journey Begins .wav",this.playerCanvas=document.createElement("canvas"),this.playerCanvas.classList.add("player-canvas"),this.playerCanvas.width=700,this.playerCanvas.height=400,this.playerContext=this.playerCanvas.getContext("2d"),this.playerContext.imageSmoothingEnabled=!1,this.enemyCanvas=document.createElement("canvas"),this.enemyCanvas.classList.add("enemy-canvas"),this.enemyCanvas.width=700,this.enemyCanvas.height=400,this.enemyContext=this.enemyCanvas.getContext("2d"),this.enemyContext.imageSmoothingEnabled=!1,this.fireknight1=new Image,this.fireknight2=new Image,this.fireknight3=new Image,this.fireknight4=new Image,this.fireknight5=new Image,this.fireknight6=new Image,this.fireknight7=new Image,this.fireknight8=new Image,this.fireknight1.src="../assets/battle-screen-art/fireknight/idle_1.png",this.fireknight2.src="../assets/battle-screen-art/fireknight/idle_2.png",this.fireknight3.src="../assets/battle-screen-art/fireknight/idle_3.png",this.fireknight4.src="../assets/battle-screen-art/fireknight/idle_4.png",this.fireknight5.src="../assets/battle-screen-art/fireknight/idle_5.png",this.fireknight6.src="../assets/battle-screen-art/fireknight/idle_6.png",this.fireknight7.src="../assets/battle-screen-art/fireknight/idle_7.png",this.fireknight8.src="../assets/battle-screen-art/fireknight/idle_8.png",this.playerFrame=0,this.slime=new Image,this.slime.src="../assets/battle-screen-art/slime/slime_idle.png",this.enemyFrame=0}init(){this.battleScreenArt.onload=()=>{this.audio.play(),this.context.drawImage(this.battleScreenArt,0,0,this.canvas.width,this.canvas.height),this.animateCombatants()}}animateCombatants(){setInterval((()=>{this.drawPlayer(),this.drawEnemy(),this.gameContainer.appendChild(this.playerCanvas),this.gameContainer.appendChild(this.enemyCanvas),this.playerFrame++,this.enemyFrame++}),100)}drawPlayer(){const e=[this.fireknight1,this.fireknight2,this.fireknight3,this.fireknight4,this.fireknight5,this.fireknight6,this.fireknight7,this.fireknight8],t=e[this.playerFrame%e.length];this.playerContext.clearRect(0,0,this.playerCanvas.width,this.playerCanvas.height),this.playerContext.drawImage(t,80,62,this.playerCanvas.width,this.playerCanvas.height,0,0,6*this.playerCanvas.width,6*this.playerCanvas.height)}drawEnemy(){this.enemyFrame<14?this.enemyFrame++:this.enemyFrame=0,this.enemyContext.clearRect(0,0,this.enemyCanvas.width,this.enemyCanvas.height),this.enemyContext.drawImage(this.slime,64*Math.floor(this.enemyFrame/3),0,64,32,260,150,.6*this.enemyCanvas.width,.6*this.enemyCanvas.height)}}class t{constructor(e){this.element=e.element,this.canvas=this.element.querySelector(".game-canvas"),this.canvas.width=this.element.offsetWidth,this.canvas.height=this.element.offsetHeight,this.context=this.canvas.getContext("2d"),this.context.imageSmoothingEnabled=!1,this.currentScreen=null,this.audio=new Audio,this.audio.loop=!0,this.audio.muted=!0,this.audio.volume=.3}init(){const t=document.getElementById("mute-button");t.addEventListener("click",(()=>{this.audio.muted=!this.audio.muted,this.audio.muted?t.innerHTML="<img src='assets/overworld/mute_icon.png' alt='muted'></img>":(this.audio.play(),t.innerHTML="<img src='assets/overworld/unmute_icon.png' alt='unmuted'></img>")})),this.currentScreen=new e(this),this.currentScreen.init()}changeScreen(e){this.currentScreen=new e(this),this.currentScreen.init()}}window.onload=function(){new t({element:document.querySelector(".game-container")}).init()}}()}();
//# sourceMappingURL=main.js.map