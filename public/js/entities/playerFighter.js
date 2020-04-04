import Entity, { Trait } from '../Entity.js';

import { loadSpriteSheet } from '../loaders.js';
import { createAnim } from '../anim.js';

import Ascend from '../traits/Ascend.js';
import Go from '../traits/Go.js';
import Killable from '../traits/Killable.js';
import SuperCruise from '../traits/SuperCruise.js';


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

export async function loadPlayerFighter() {

    return loadSpriteSheet('playerFighter')
    .then(createPlayerFighterFactory);
}

function createPlayerFighterFactory(sprite) {

    const runAnim = createAnim(['flying'], 10);

    function routeFrame(playerFighter) {
        if(playerFighter.go.direction !== 0) {
            return runAnim(undefined);
        }

        return 'flying';
    }

    function drawPlayerFighter(context) {
        sprite.draw( routeFrame(this), context, 0, 0);
        // for (let i = 0; i < 20; ++i) {
        //     sprite.draw('playerFighter', context, this.position.x + i*140, this.position.y);
        // }
    }

    return function createPlayerFighter() {
        const playerFighter = new Entity();
        playerFighter.size.set(sprite.width*sprite.scale, sprite.height*sprite.scale);
         
        // playerFighter.vel.set(50000, -100)
        playerFighter.addTrait(new Go());
        playerFighter.addTrait(new Ascend());
        playerFighter.addTrait(new Behaviour());
        playerFighter.addTrait(new Killable());
        playerFighter.addTrait(new SuperCruise());
                
        playerFighter.draw = drawPlayerFighter;

        return playerFighter;
    };
}

