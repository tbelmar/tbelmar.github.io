import type {AnimatedSprite, Application, Container, Sprite} from 'pixi.js';

export const fadeOut = (
    app: Application,
    elem: Sprite | AnimatedSprite | Container
) => {
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            elem.alpha -= 0.1;
            if (elem.alpha <= 0) {
                clearInterval(interval);
                app.stage.removeChild(elem);
                resolve(null);
                elem.alpha = 1;
            }
        }, 20);
    });
};

export const fadeIn = (
    app: Application,
    elem: Sprite | AnimatedSprite | Container
) => {
    return new Promise((resolve) => {
        elem.alpha = 0;
        app.stage.addChild(elem);
        var interval = setInterval(() => {
            elem.alpha += 0.05;
            if (elem.alpha >= 1) {
                clearInterval(interval);
                resolve(null);
            }
        }, 20);
    });
};
