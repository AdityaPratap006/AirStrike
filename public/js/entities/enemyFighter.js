import Entity from '../Entity.js';


import { loadSpriteSheet } from '../loaders.js';
import { createAnim } from '../anim.js';

export async function loadEnemyFighter() {

    return loadSpriteSheet('enemyFighter')
    .then(createEnemyFighterFactory);
}

function createEnemyFighterFactory(sprite) {

    // const runAnim = createAnim(['flying'], 10);

    function routeFrame(enemyFighter) {

        return 'flying';
    }

    function drawMissile(context) {
        sprite.draw( routeFrame(this), context, 0, 0);
    }

    return function createMissile() {
        const enemyFighter = new Entity();
        enemyFighter.size.set(sprite.width*sprite.scale, sprite.height*sprite.scale);
        enemyFighter.vel.set(-50, 0);
        
        // enemyFighter.addTrait(new Fly());
                
        enemyFighter.draw = drawMissile;

        return enemyFighter;
    };
}

