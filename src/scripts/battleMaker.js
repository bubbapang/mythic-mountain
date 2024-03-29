// makes each battle visual

// makes a new battle

import BattleLogic from "./battleLogic.js";

export default class BattleMaker {
	constructor(puppeteer, sceneArt, sceneMusic, player, enemy) {
		this.puppeteer = puppeteer;
		this.sceneArt = sceneArt;
		this.sceneMusic = sceneMusic;
		this.player = player;
		this.enemy = enemy;

		this.gameContainer = this.puppeteer.element;
		this.canvas = this.puppeteer.canvas;
		this.context = this.puppeteer.context;

		this.battleScreenArt = new Image();
		this.battleScreenArt.src = this.sceneArt;

		function createCanvasAndContext(container, className) {
			const canvas = document.createElement("canvas");
			canvas.classList.add(className);
			canvas.width = container.offsetWidth / 2;
			canvas.height = container.offsetHeight;
			const context = canvas.getContext("2d");
			context.imageSmoothingEnabled = false;

			canvas.style.position = "relative";

			container.appendChild(canvas);

			return { canvas, context };
		}

		const { canvas: playerCanvas, context: playerContext } =
			createCanvasAndContext(this.gameContainer, "player-canvas");
		const { canvas: enemyCanvas, context: enemyContext } =
			createCanvasAndContext(this.gameContainer, "enemy-canvas");

		this.playerCanvas = playerCanvas;
		this.playerContext = playerContext;
		this.enemyCanvas = enemyCanvas;
		this.enemyContext = enemyContext;

		this.playerCanvasVariables = this.player.canvasVariables;
		this.enemyCanvasVariables = this.enemy.canvasVariables;

		this.playerImages = [];
		this.enemyImages = [];

		this.playerframeCount = 0;
		this.enemyframeCount = 0;
	}

	init() {
		this.playSceneMusic();

		this.battle = new BattleLogic(this, this.player, this.enemy).init();
		this.menu = document.querySelector(".HUD");
		this.menu.style.display = "flex";
		this.battleScreenArt.onload = () => {
			this.context.drawImage(
				this.battleScreenArt,
				0,
				0,
				this.canvas.width,
				this.canvas.height
			);
			this.playerImages = this.sliceSpriteSheet(
				this.playerCanvasVariables
			);
			this.enemyImages = this.sliceSpriteSheet(this.enemyCanvasVariables);
			this.animateCombatants();
		};
	}

	playSceneMusic() {
		if (!this.puppeteer.audio) {
			this.puppeteer.createAudio();
		}

		if (this.puppeteer.audio) {
			this.puppeteer.audio.src = this.sceneMusic;
			this.puppeteer.audio.load(); // Load the new source
			this.puppeteer.audio.play(); // Play the audio
		}
	}

	sliceSpriteSheet(canvasVariables) {
		const {
			spriteSheet,
			srcX,
			srcY,
			destX,
			destY,
			width,
			height,
			frameCount,
			scaling,
		} = canvasVariables;

		const characterImages = [];

		for (let i = 0; i < frameCount; i++) {
			const frameSrcX = srcX + i * width;
			characterImages.push({
				spriteSheet,
				srcX: frameSrcX,
				srcY,
				srcWidth: width,
				srcHeight: height,
				destX: destX,
				destY: destY,
				destWidth: width * scaling,
				destHeight: height * scaling,
			});
		}

		return characterImages;
	}

	drawCharacter(team, context, canvas) {
		let frame;

		if (team === "player") {
			frame =
				this.playerImages[
				this.playerframeCount % this.playerImages.length
				];
		} else if (team === "enemy") {
			frame =
				this.enemyImages[
				this.enemyframeCount % this.enemyImages.length
				];
		}

		let {
			spriteSheet,
			srcX,
			srcY,
			srcWidth,
			srcHeight,
			destX,
			destY,
			destWidth,
			destHeight,
		} = frame;

		// if (destX > canvas.width) {
		// 	destX = canvas.width;
		// }

		// if (destY > canvas.height) {
		// 	destY = canvas.height;
		// }

		// Clear and draw the image on the canvas
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(
			spriteSheet,
			srcX,
			srcY,
			srcWidth,
			srcHeight,
			destX,
			destY,
			destWidth,
			destHeight
		);
	}

	animateCombatants() {
		const milliseconds = 800;
		const playerFrameSpeed = milliseconds / this.playerImages.length;
		const enemyFrameSpeed = milliseconds / this.enemyImages.length;

		this.playerAnimationInterval = setInterval(() => {
			this.drawCharacter(
				this.player.team,
				this.playerContext,
				this.playerCanvas
			);
			this.playerframeCount++;
		}, playerFrameSpeed);

		this.enemyAnimationInterval = setInterval(() => {
			this.drawCharacter(
				this.enemy.team,
				this.enemyContext,
				this.enemyCanvas
			);
			this.enemyframeCount++;
		}, enemyFrameSpeed);
	}

	// move the character's canvas back and forth to "animate" an attack
	animateAttack = (team) => {
		const canvas = team === "player" ? this.playerCanvas : this.enemyCanvas;
		const deltaX = team === "player" ? 70 : -70;
		const originalX = canvas.style.left || "0px";
		const currentX = parseInt(originalX, 10);

		canvas.style.left = `${currentX + deltaX}px`;
		setTimeout(() => {
			canvas.style.left = originalX;
		}, 300);
	};

	// remove all the elements that this file made from the DOM
	destroy() {
		// Stop animations
		clearInterval(this.playerAnimationInterval);
		clearInterval(this.enemyAnimationInterval);

		// Remove menu
		const menu = document.querySelector(".HUD");
		if (menu) {
			menu.style.display = "none";
		}

		// Remove playerCanvas and enemyCanvas
		if (this.playerCanvas && this.playerCanvas.parentNode === this.gameContainer) {
			this.gameContainer.removeChild(this.playerCanvas);
		}
		if (this.enemyCanvas && this.enemyCanvas.parentNode === this.gameContainer) {
			this.gameContainer.removeChild(this.enemyCanvas);
		}

		// Clear child nodes from gameContainer
		while (this.gameContainer.firstChild) {
			if (this.gameContainer.firstChild.nodeName !== 'CANVAS') {
				this.gameContainer.removeChild(this.gameContainer.firstChild);
			} else {
				break;
			}
		}

		// Reset properties
		this.playerCanvas = null;
		this.enemyCanvas = null;
		this.menu = null;
		this.playerAnimationInterval = null;
		this.enemyAnimationInterval = null;
	}
}
