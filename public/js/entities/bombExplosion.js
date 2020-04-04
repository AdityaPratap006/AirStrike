import Entity from '../Entity.js';
import ExplosionBomb from '../traits/ExplosionBomb.js';

import { loadSpriteSheet } from '../loaders.js';


export async function loadBombExplosion() {

    return loadSpriteSheet('bombExplosion')
    .then(createBombExplosionFactory);
}

function createBombExplosionFactory(sprite) {

    const runAnim =  sprite.animations.get('explosion');

    function routeFrame(bombExplosion) {
        if(bombExplosion.explosionBomb.duration < 900) {
            return runAnim(bombExplosion.explosionBomb.duration);
        }

        return 'explosion-9';
    }

    function drawBombExplosion(context) {
        sprite.draw( routeFrame(this), context, 0, 0);
    }

    return function createBombExplosion() {
        const bombExplosion = new Entity();
        bombExplosion.size.set(sprite.width*sprite.scale, sprite.height*sprite.scale);
        

        bombExplosion.addTrait(new ExplosionBomb());

            
        bombExplosion.draw = drawBombExplosion;

        return bombExplosion;
    }
}