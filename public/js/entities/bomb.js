import Entity, { Trait } from '../Entity.js';
import { loadSpriteSheet } from '../loaders.js';
import { createAnim } from '../anim.js';
import Killable from '../traits/Killable.js';
import Gravity from '../traits/Gravity.js';

class Behaviour extends Trait {
    constructor() {
        super('behaviour');
    }

    collides(us, them) {

       
        if (them.enemyVehicle) {
            us.killable.kill();
            them.killable.kill();
        }
 
    }
}


export async function loadBomb() {

    return loadSpriteSheet('bomb')
    .then(createMissileFactory);
}

function createMissileFactory(sprite) {

    function routeFrame(bomb) {
      

        return 'falling';
    }

    function drawBomb(context) {
        sprite.draw( routeFrame(this), context, 0, 0);
    }

    return function createBomb() {
        const bomb = new Entity();
        bomb.size.set(sprite.width*sprite.scale, sprite.height*sprite.scale);
        bomb.offset.set(0, 0);
        
        bomb.addTrait(new Gravity());
        bomb.addTrait(new Behaviour());
        bomb.addTrait(new Killable());

        bomb.draw = drawBomb;

        return bomb;
    };
}

