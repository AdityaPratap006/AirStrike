import Entity from './Entity.js';
import Ascend from './traits/Ascend.js';
import Go from './traits/Go.js';
import ExplosionAircraft from './traits/ExplosionAircraft.js';

import { loadSpriteSheet } from './loaders.js';
import { createAnim } from './anim.js';

export async function createPlayerFighter() {

    return loadSpriteSheet('playerFighter')
    .then(sprite => {
        
        const playerFighter = new Entity();
        playerFighter.size.set(sprite.width*sprite.scale, sprite.height*sprite.scale);
        // playerFighter.vel.set(50000, -100)
        playerFighter.addTrait(new Go());
        playerFighter.addTrait(new Ascend());
        
        
        const runAnim = createAnim(['flying'], 10);

        function routeFrame(playerFighter) {
            if(playerFighter.go.direction !== 0) {
                return runAnim(undefined);
            }

            return 'flying';
        }

        
        playerFighter.draw = function drawPlayerFighter(context) {
            sprite.draw( routeFrame(this), context, 0, 0);
            // for (let i = 0; i < 20; ++i) {
            //     sprite.draw('playerFighter', context, this.position.x + i*140, this.position.y);
            // }
        }

        // playerFighter.update = function updatePlayerFighter(deltaTime) {
           
        // }

        return playerFighter;
    })
}


export async function createAircraftExplosion() {

    return loadSpriteSheet('aircraftExplosion')
    .then(sprite => {
        
        const aircraftExplosion = new Entity();
        aircraftExplosion.size.set(sprite.width*sprite.scale, sprite.height*sprite.scale);
        
        aircraftExplosion.addTrait(new ExplosionAircraft());

        const frames = ['explosion-1','explosion-2','explosion-3','explosion-4'];
        const runAnim = createAnim( frames, 100);

        function routeFrame(aircraftExplosion) {
            if(aircraftExplosion.explosionAircraft.duration < 400) {
                return runAnim(aircraftExplosion.explosionAircraft.duration);
            }

            return 'explosion-4';
        }

        
        aircraftExplosion.draw = function drawAircraftExplosion(context) {
            sprite.draw( routeFrame(this), context, 0, 0);
        }

        return aircraftExplosion;
    })
}