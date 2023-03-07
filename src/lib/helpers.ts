import {Texture, AnimatedSprite} from 'pixi.js';

export async function loadAnimatedSprite(
    name: String,
    framesAmount = Infinity
) {
    let frames = [];

    try {
        for (let i = 1; i <= framesAmount; i++) {
            let texture = await Texture.fromURL(
                `animations/${name}/${name}${i}.png`
            );

            frames.push(texture);
        }
    } catch (err) {
        console.log('Error: File does not exist');
    }

    let sprite = new AnimatedSprite(frames);

    return sprite;
}