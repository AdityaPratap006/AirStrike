import Entity from '../Entity.js';

import MissileLaunch from '../traits/MissileLaunch.js';

import { loadSpriteSheet } from '../loaders.js';
import { createAnim } from '../anim.js';

export async function loadMissile() {

    return loadSpriteSheet('missile')
    .then(createMissileFactory);
}

function createMissileFactory(sprite) {

    // const runAnim = createAnim(['flying'], 10);

    function routeFrame(missile) {
        // if(missile.go.direction !== 0) {
        //     return runAnim(undefined);
        // }

        return 'flying';
    }

    function drawMissile(context) {
        sprite.draw( routeFrame(this), context, 0, 0);
    }

    return function createMissile() {
        const missile = new Entity();
        missile.size.set(sprite.width*sprite.scale, sprite.height*sprite.scale);
        
        
        missile.addTrait(new MissileLaunch());
                
        missile.draw = drawMissile;

        return missile;
    };
}

