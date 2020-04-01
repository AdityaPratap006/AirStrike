import { Trait } from '../Entity.js';

export default class ExplosionAircraft extends Trait {
    constructor() {
        super('explosionAircraft');

        this.duration = 0;
    }


    update(entity, deltaTime) {

        if(this.duration >= 400) {
            this.duration = 400;
            return;
        }
        
        this.duration += 1000 * deltaTime;

    }
}