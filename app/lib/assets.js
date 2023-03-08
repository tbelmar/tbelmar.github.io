let background = {
    name: 'bg-non-interactive',
    frames: 64,
    pivot: {x: 0, y: 0},
    autoplay: true
};

let belmarDefault = {
    name: 'bigbelmar-default',
    frames: 64,
    pivot: {x: 37, y: -390},
    autoplay: true,
    hitArea: [-380, 100, 200, 300],
    dontAutoRender: true
};

let belmarLook = {
    name: 'bigbelmar-look',
    frames: 34,
    pivot: {x: 37, y: -390},
    hitArea: [-380, 100, 200, 300],
    dontAutoRender: true
};

let belmarTransitionOut = {
    name: 'bigbelmar-transition-out',
    frames: 4,
    pivot: {x: 37, y: -390},
    hitArea: [-380, 100, 200, 300],
    dontAutoRender: true
};

let belmarWave = {
    name: 'bigbelmar-wave',
    frames: 13,
    pivot: {x: 37, y: -390},
    hitArea: [-380, 100, 200, 300],
    dontAutoRender: true
};

let lightStrip = {
    name: 'light-strip',
    frames: 6,
    pivot: {x: -24, y: -330},
    hitArea: [-320, -20, 120, 120],
    playOnMouseover: true
};

let purplePlant = {
    name: 'purple-plant',
    frames: 8,
    pivot: {x: 96, y: -286},
    playOnMouseover: true
};

let speakerLeft = {
    name: 'speaker-left',
    frames: 5,
    pivot: {x: 109, y: -378},
    playOnMouseover: true
};

let speakerRight = {
    name: 'speaker-right',
    frames: 5,
    pivot: {x: -18, y: -462},
    playOnMouseover: true
};

let bike = {
    name: 'bike',
    frames: 12,
    pivot: {x: 1182, y: -373},
    playOnHover: true
};

let flag = {
    name: 'flag',
    frames: 11,
    pivot: {x: 678, y: -330},
    playOnClick: true
};

let knight = {
    name: 'knight',
    frames: 10,
    pivot: {x: 756, y: -492},
    playOnMouseover: true
};

let steve = {
    name: 'steve',
    frames: 5,
    pivot: {x: 660, y: -456},
    playOnMouseover: true
};

let viola = {
    name: 'viola',
    frames: 7,
    pivot: {x: 704, y: -176},
    playOnClick: true
};

let flowerPlant = {
    name: 'plant-flowers',
    frames: 11,
    pivot: {x: -1, y: -690},
    playOnClick: true
};
let tallPlant = {
    name: 'plant-tall',
    frames: 12,
    pivot: {x: 1182, y: -373},
    playOnClick: true,
    dontAutoRender: true
};
let shortPlant = {
    name: 'plant-short',
    frames: 10,
    pivot: {x: 1050, y: -432},
    playOnClick: true
};

let smallShelfPlant = {
    name: 'small-shelf-plant',
    frames: 5,
    pivot: {x: 898, y: -263},
    playOnMouseover: true
};

let smallShelfFlower = {
    name: 'small-shelf-flower',
    frames: 4,
    pivot: {x: 650, y: -246},
    playOnMouseover: true
};
let smallShelfPeashooter = {
    name: 'small-shelf-peashooter',
    frames: 7,
    pivot: {x: 740, y: -242},
    playOnMouseover: true
};

let downwardsArrow = {
    name: 'downwards-arrow',
    pivot: {x: 1182, y: -373}
};

let animatedSprites = [
    background,
    belmarDefault,
    belmarLook,
    belmarTransitionOut,
    belmarWave,
    lightStrip,
    purplePlant,
    speakerLeft,
    speakerRight,
    bike,
    flag,
    knight,
    steve,
    viola,
    flowerPlant,
    tallPlant,
    shortPlant,
    smallShelfPlant,
    smallShelfFlower,
    smallShelfPeashooter
];
