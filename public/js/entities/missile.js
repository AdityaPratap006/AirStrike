import Entity, { Trait } from '../Entity.js';
import { loadSpriteSheet } from '../loaders.js';
import { createAnim } from '../anim.js';
import MissileLaunch from '../traits/MissileLaunch.js';
import Killable from '../traits/Killable.js';

class Behaviour extends Trait {
    constructor() {
        super('behaviour');
    }

    collides(us, them) {

        if (them.enemyAircraft) {
            us.killable.kill();
            them.killable.kill();
        }
 
    }
}


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
        missile.offset.set(0, -20);
        
        missile.addTrait(new MissileLaunch());
        missile.addTrait(new Behaviour());
        missile.addTrait(new Killable());

        missile.draw = drawMissile;

        return missile;
    };
}

