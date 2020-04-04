import { Trait } from '../Entity.js';

export default class ExplosionBomb extends Trait {
    constructor() {
        super('explosionBomb');

        this.duration = 0;
        this.spawnTimeout = 0;
    }


    update(entity, gameContext) {

        const { deltaTime, audioBoard } = gameContext;

        if(this.duration >= 900) {
            
            this.duration = 0;
            return;
        }


        this.duration +=  1000 * deltaTime ;
        this.spawnTimeout += deltaTime;
    }
}