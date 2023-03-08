let animatedSprites = [
    background,
    belmarDefault,
    belmarLook,
    belmarTransitionOut,
    belmarWave,
    smallShelfPlant,
    smallShelfFlower,
    smallShelfPeashooter,
    bike,
    flag,
    knight,
    steve,
    viola,
    flowerPlant,
    tallPlant,
    shortPlant,
    purplePlant,
    speakerLeft,
    speakerRight,
    lightStrip
];

let staticSprites = [downwardsArrow];

// Gets a spritesheet's name and turns it into an AnimatedSprite
async function getAnimatedSprite(spriteSheetName) {
    const sheet = await PIXI.Assets.load(
        `lib/spritesheets/${spriteSheetName}.json`
    );
    let sprite = new PIXI.AnimatedSprite(Object.values(sheet.textures));

    return sprite;
}

console.log(PIXI.filters.GlowFilter);

// Sets basic properties to all sprites
async function spritesSetup() {
    // Background Setup
    background.sprite =
        background.sprite || (await getAnimatedSprite('background'));

    const scale = window.innerHeight / background.sprite.height;
    background.sprite.scale.set(scale, scale);

    // Animated Sprites Setup
    for (let i = 0; i < animatedSprites.length; i++) {
        const spriteObject = animatedSprites[i];
        const sprite =
            spriteObject.sprite || (await getAnimatedSprite(spriteObject.name));

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

    // Normal Sprites Setup
    for (let i = 0; i < staticSprites.length; i++) {
        const spriteObject = staticSprites[i];
        const sprite = PIXI.Sprite.from(`lib/sprites/${spriteObject.name}.png`);
        if (spriteObject.pivot) {
            sprite.pivot.set(spriteObject.pivot.x, spriteObject.pivot.y);
        }
    }
    console.log(GlowFilter);

    downwardsArrow.sprite.filters = [
        new PIXI.filters.GlowFilter({
            distance: 15,
            outerStrength: 3,
            color: 0xffda87,
            quality: 0.5
        })
    ];

    const hover = () => {
        let up = true;
        setInterval(() => {
            const x = downwardsArrow.x;
            const y = downwardsArrow.y;

            downwardsArrow.position.set(x, up ? y - 2 : y + 2);
        }, 100);

        setInterval(() => {
            up = !up;
        }, 500);
    };

    hover();
}

let belmarContainer = new PIXI.Container();

// Sets up behavior of "Belmar" character
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
        if (spriteObject.sprite && !spriteObject.dontAutoRender) {
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
