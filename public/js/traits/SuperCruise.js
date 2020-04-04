import { Trait } from '../Entity.js';

export default class SuperCruise extends Trait {
    constructor() {
        super('supercruise');

        this.duration = 0;
    }

    obstruct(entity) {
        
    }

    maintainedFor() {
        return this.duration;
    }

    update(entity, gameContext) {
        
        const { deltaTime } = gameContext;

        if (entity.vel.x > 1235) {
            this.duration += deltaTime;
        }
    }
}