import Entity from '../Entity.js';
import Ascend from '../traits/Ascend.js';
import Go from '../traits/Go.js';

import { loadSpriteSheet } from '../loaders.js';
import { createAnim } from '../anim.js';
 
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
        
                
        playerFighter.draw = drawPlayerFighter;

        return playerFighter;
    };
}

