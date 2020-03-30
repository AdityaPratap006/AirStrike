import Entity from './Entity.js';
import { loadPlayerFighterSprites } from './sprites.js';
import Velocity from './traits/Velocity.js'; 
import Acceleration from './traits/Acceleration.js';
import Deceleration from './traits/Deceleration.js';
import Ascend from './traits/Ascend.js';
import Descend from './traits/Descend.js';
import Go from './traits/Go.js';

export async function createPlayerFighter() {

    return loadPlayerFighterSprites()
    .then(sprite => {
        const playerFighter = new Entity();
        playerFighter.size.set(sprite.width*sprite.scale, sprite.height*sprite.scale);

        playerFighter.addTrait(new Go());
        // playerFighter.addTrait(new Velocity());
        playerFighter.addTrait(new Acceleration(0.005));
        playerFighter.addTrait(new Deceleration(0.005));
        playerFighter.addTrait(new Ascend(0.001));
        playerFighter.addTrait(new Descend(0.001));
        

        playerFighter.draw = function drawPlayerFighter(context) {
            sprite.draw('playerFighter', context, this.pos.x , this.pos.y);
            // for (let i = 0; i < 20; ++i) {
            //     sprite.draw('playerFighter', context, this.position.x + i*140, this.position.y);
            // }
        }

        // playerFighter.update = function updatePlayerFighter(deltaTime) {
           
        // }

        return playerFighter;
    })
}