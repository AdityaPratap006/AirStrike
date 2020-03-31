import Entity from './Entity.js';
import Acceleration from './traits/Acceleration.js';
import Deceleration from './traits/Deceleration.js';
import Ascend from './traits/Ascend.js';
import Descend from './traits/Descend.js';
import Go from './traits/Go.js';
import { loadSpriteSheet } from './loaders.js';
import { createAnim } from './anim.js';

export async function createPlayerFighter() {

    return loadSpriteSheet('playerFighter')
    .then(sprite => {
        
        const playerFighter = new Entity();
        playerFighter.size.set(sprite.width*sprite.scale, sprite.height*sprite.scale);
        // playerFighter.vel.set(50000, -100)
        playerFighter.addTrait(new Go());
        // playerFighter.addTrait(new Velocity());
        playerFighter.addTrait(new Acceleration(0.005));
        playerFighter.addTrait(new Deceleration(0.005));
        playerFighter.addTrait(new Ascend());
        playerFighter.addTrait(new Descend());
        
        function routeFrame(playerFighter) {
            if(playerFighter.go.direction !== 0) {
                return runAnim(undefined);
            }

            return 'flying';
        }

        const runAnim = createAnim(['flying'], 10);
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