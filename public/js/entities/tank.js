import Entity, { Trait } from '../Entity.js';

import { loadSpriteSheet } from '../loaders.js';
import { createAnim } from '../anim.js';

import Killable from '../traits/Killable.js';
import GroundVehicle from '../traits/GroundVehicle.js';


class Behaviour extends Trait {
    constructor() {
        super('behaviour');
    }

    collides(us, them) {

        if (them.gravity || them.go) {
            us.killable.kill();
            them.killable.kill();
        }

 
    }
}

export async function loadTank() {

    return loadSpriteSheet('tank')
    .then(createTankFactory);
}

function createTankFactory(sprite) {

    const runAnim = createAnim(['idle'], 10);

    function routeFrame(tank) {

        return 'idle';
    }

    function drawTank(context) {
        sprite.draw( routeFrame(this), context, 0, 0);
    }

    return function createTank() {
        const tank = new Entity();
        tank.size.set(sprite.width*sprite.scale, sprite.height*sprite.scale);
        tank.vel.set(0,0);
        
        tank.addTrait(new GroundVehicle());
        tank.addTrait(new Behaviour());
        tank.addTrait(new Killable());
                
        tank.draw = drawTank;

        return tank;
    };
}

