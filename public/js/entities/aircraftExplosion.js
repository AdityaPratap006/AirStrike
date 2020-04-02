import Entity from '../Entity.js';
import ExplosionAircraft from '../traits/ExplosionAircraft.js';

import { loadSpriteSheet } from '../loaders.js';


export async function loadAircraftExplosion() {

    return loadSpriteSheet('aircraftExplosion')
    .then(createAircraftExplosionFactory);
}

function createAircraftExplosionFactory(sprite) {

    const runAnim =  sprite.animations.get('explosion');

    function routeFrame(aircraftExplosion) {
        if(aircraftExplosion.explosionAircraft.duration < 400) {
            return runAnim(aircraftExplosion.explosionAircraft.duration);
        }

        return 'explosion-4';
    }

    function drawAircraftExplosion(context) {
        sprite.draw( routeFrame(this), context, 0, 0);
    }

    return function createAircraftExplosion() {
        const aircraftExplosion = new Entity();
        aircraftExplosion.size.set(sprite.width*sprite.scale, sprite.height*sprite.scale);
        
        aircraftExplosion.addTrait(new ExplosionAircraft());

            
        aircraftExplosion.draw = drawAircraftExplosion;

        return aircraftExplosion;
    }
}