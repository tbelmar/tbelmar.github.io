import type {AnimatedSprite, Sprite} from 'pixi.js';

type AnimatedSpriteContainer = {
    name: string;
    pivot: {x: number; y: number};
    sprite?: AnimatedSprite;
    animationSpeed?: number;
    hitArea?: [number, number, number, number];
    autoplay?: boolean;
    dontAutoRender?: boolean;
    playOnMouseover?: boolean;
    playOnClick?: boolean;
    playOnHover?: boolean;
};

type SpriteContainer = {
    name: string;
    pivot: {x: number; y: number};
    sprite?: Sprite;
    dontAutoRender?: boolean;
};

export let background: AnimatedSpriteContainer = {
    name: 'background',
    pivot: {x: 0, y: 0},
    autoplay: true
};

export let belmarDefault: AnimatedSpriteContainer = {
    name: 'belmar-default',
    pivot: {x: 25, y: -260},
    autoplay: true,
    hitArea: [-253, 67, 133, 200],
    dontAutoRender: true
};

export let belmarLook: AnimatedSpriteContainer = {
    name: 'belmar-look',
    pivot: {x: 25, y: -260},
    hitArea: [-253, 67, 133, 200],
    dontAutoRender: true
};

export let belmarTransitionOut: AnimatedSpriteContainer = {
    name: 'belmar-transition-out',
    pivot: {x: 25, y: -260},
    hitArea: [-253, 67, 133, 200],
    dontAutoRender: true
};

export let belmarWave: AnimatedSpriteContainer = {
    name: 'belmar-wave',
    pivot: {x: 25, y: -260},
    hitArea: [-253, 67, 133, 200],
    dontAutoRender: true
};

export let lightStrip: AnimatedSpriteContainer = {
    name: 'light-strip',
    pivot: {x: -16, y: -220},
    hitArea: [-213, -13, 80, 80],
    playOnMouseover: true
};

export let purplePlant: AnimatedSpriteContainer = {
    name: 'purple-plant',
    pivot: {x: 64, y: -191},
    playOnMouseover: true
};

export let speakerLeft: AnimatedSpriteContainer = {
    name: 'speaker-left',
    pivot: {x: 73, y: -252},
    playOnMouseover: true
};

export let speakerRight: AnimatedSpriteContainer = {
    name: 'speaker-right',
    pivot: {x: -12, y: -308},
    playOnMouseover: true
};

export let bike: AnimatedSpriteContainer = {
    name: 'bike',
    pivot: {x: 788, y: -249},
    playOnHover: true,
    animationSpeed: 1
};

export let flag: AnimatedSpriteContainer = {
    name: 'flag',
    pivot: {x: 452, y: -220},
    playOnClick: true
};

export let knight: AnimatedSpriteContainer = {
    name: 'knight',
    pivot: {x: 504, y: -328},
    playOnMouseover: true
};

export let steve: AnimatedSpriteContainer = {
    name: 'steve',
    pivot: {x: 440, y: -304},
    playOnMouseover: true
};

export let viola: AnimatedSpriteContainer = {
    name: 'viola',
    pivot: {x: 469, y: -117},
    playOnClick: true
};

export let flowerPlant: AnimatedSpriteContainer = {
    name: 'flower-plant',
    pivot: {x: -1, y: -460},
    playOnClick: true
};

export let tallPlant: AnimatedSpriteContainer = {
    name: 'tall-plant',
    pivot: {x: 788, y: -249},
    playOnClick: true,
    dontAutoRender: true
};

export let shortPlant: AnimatedSpriteContainer = {
    name: 'short-plant',
    pivot: {x: 700, y: -288},
    playOnClick: true
};

export let smallShelfPlant: AnimatedSpriteContainer = {
    name: 'small-shelf-plant',
    pivot: {x: 599, y: -175},
    playOnMouseover: true
};

export let smallShelfFlower: AnimatedSpriteContainer = {
    name: 'small-shelf-flower',
    pivot: {x: 433, y: -164},
    playOnMouseover: true
};

export let smallShelfPeashooter: AnimatedSpriteContainer = {
    name: 'small-shelf-peashooter',
    pivot: {x: 493, y: -161},
    playOnMouseover: true
};

export let downwardsArrow: SpriteContainer = {
    name: 'downwards-arrow',
    pivot: {x: 184, y: -278}
};
