async function buildAnimatedSprite(spriteName, numOfFrames) {
    let frames = [];

    for (let i = 1; i <= numOfFrames; i++) {
        let texture = await PIXI.Assets.load(
            `lib/animations/${spriteName}/${spriteName}${i}.png`
        );
        frames.push(texture);
    }
    let sprite = new PIXI.AnimatedSprite(frames);

    return sprite;
}

async function spritesSetup() {
    background.sprite = await buildAnimatedSprite('bg-non-interactive', 64);

    const scale = window.innerHeight / background.sprite.height;

    for (let i = 0; i < animatedSprites.length; i++) {
        const spriteObject = animatedSprites[i];
        const sprite =
            spriteObject.sprite ||
            (await buildAnimatedSprite(spriteObject.name, spriteObject.frames));

        spriteObject.sprite = sprite;

        sprite.animationSpeed = spriteObject.animationSpeed || 0.2;
        sprite.anchor.set(1, 0);
        sprite.position.set(app.renderer.width, 0);
        if (sprite.scale.x === 1 && sprite.scale.y === 1) {
            sprite.scale.set(scale, scale);
        }

        if (spriteObject.autoplay) {
            sprite.play();
        }

        if (spriteObject.pivot) {
            sprite.pivot.set(spriteObject.pivot.x, spriteObject.pivot.y);
        }

        if (spriteObject.hitArea) {
            sprite.hitArea = new PIXI.Rectangle(...spriteObject.hitArea);
        }

        if (spriteObject.playOnMouseover) {
            sprite.interactive = true;
            sprite.loop = false;

            sprite.onmouseover = () => {
                if (!sprite.playing) sprite.gotoAndPlay(0);
            };
            sprite.onComplete = () => {
                sprite.gotoAndStop(0);
            };
        }

        if (spriteObject.playOnHover) {
            sprite.interactive = true;
            sprite.loop = false;

            sprite.onmouseenter = () => {
                if (!sprite.playing) sprite.gotoAndPlay(0);
            };
            sprite.onmouseleave = () => {
                sprite.gotoAndStop(0);
            };
        }

        if (spriteObject.playOnClick) {
            sprite.interactive = true;
            sprite.loop = false;

            sprite.onclick = () => {
                if (!sprite.playing) sprite.gotoAndPlay(0);
            };

            sprite.onComplete = () => {
                sprite.gotoAndStop(0);
            };
        }
    }
}

let belmarContainer = new PIXI.Container();

async function characterSetup() {
    belmarContainer.addChild(belmarDefault.sprite);
    belmarDefault.sprite.play();

    belmarDefault.sprite.interactive = true;
    belmarLook.sprite.interactive = true;
    belmarWave.sprite.interactive = true;

    belmarLook.sprite.loop = false;
    belmarTransitionOut.sprite.loop = false;
    belmarWave.sprite.loop = false;

    belmarLook.sprite.onmouseout = () => {
        belmarContainer.removeChild(belmarLook.sprite);

        belmarTransitionOut.sprite.gotoAndPlay(0);

        belmarContainer.addChild(belmarTransitionOut.sprite);
        isClickable = false;
    };

    belmarLook.sprite.onclick = () => {
        belmarContainer.removeChild(belmarLook.sprite);

        belmarWave.sprite.gotoAndPlay(0);
        isClickable = true;

        belmarContainer.addChild(belmarWave.sprite);
    };

    belmarLook.sprite.onmouseover = () => {
        isClickable = true;
    };

    belmarDefault.sprite.onmouseout = () => {
        isClickable = false;
    };

    belmarWave.sprite.onComplete = () => {
        belmarContainer.removeChild(belmarWave.sprite);

        if (isClickable) {
            belmarLook.sprite.gotoAndPlay(33);
            belmarContainer.addChild(belmarLook.sprite);
        } else {
            belmarTransitionOut.sprite.gotoAndPlay(0);
            belmarContainer.addChild(belmarTransitionOut.sprite);
        }
    };

    belmarWave.sprite.onmouseout = () => {
        isClickable = false;
    };

    belmarTransitionOut.sprite.onComplete = () => {
        belmarContainer.removeChild(belmarTransitionOut.sprite);
        belmarContainer.addChild(belmarDefault.sprite);
    };

    belmarDefault.sprite.onmouseover = () => {
        belmarContainer.removeChild(belmarDefault.sprite);
        belmarLook.sprite.gotoAndPlay(0);
        belmarContainer.addChild(belmarLook.sprite);
    };

    belmarDefault.sprite.on('pointerdown', () => {
        belmarLook.onComplete = () => {
            belmarContainer.removeChild(belmarLook.sprite);
            belmarWave.sprite.gotoAndPlay(0);
            belmarContainer.addChild(belmarWave.sprite);
        };

        belmarContainer.removeChild(belmarDefault.sprite);

        belmarLook.sprite.gotoAndPlay(0);
        belmarContainer.addChild(belmarLook.sprite);

        fadeOut(downwardsArrow);
    });
}

async function render() {
    await spritesSetup();
    await characterSetup();

    for (const spriteObject of animatedSprites) {
        if (!spriteObject.dontAutoRender) {
            app.stage.addChild(spriteObject.sprite);
        }
    }

    app.stage.addChild(belmarContainer);
}

const canvas = document.getElementById('game');

let app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    view: canvas,
    backgroundAlpha: 0
});

render();
