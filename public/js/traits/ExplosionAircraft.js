import { Trait } from '../Entity.js';

export default class ExplosionAircraft extends Trait {
    constructor() {
        super('explosionAircraft');

        this.duration = 0;
        this.spawnTimeout = 0;
    }


    update(entity, gameContext) {

        const { deltaTime, audioBoard } = gameContext;

        if(this.duration >= 400) {
            
            this.duration = 0;
            return;
        }


        this.duration +=  1000 * deltaTime;
        this.spawnTimeout += deltaTime;
    }
}