import { Trait } from '../Entity.js';

export default class Ascend extends Trait {
    constructor(ascendSpeed) {
        super('ascend');

        this.duration = 5000;
        this.engageTime = 0;
        this.ascendSpeed = ascendSpeed;
    }

    start() {
        this.engageTime = this.duration;
        
    }

    cancel(){
        this.engageTime = 0;
    }

    update(entity, deltaTime) {
        // entity.pos.x +=  entity.vel.x * deltaTime;
        if (entity.pos.y <= 0) {
            return;
        }

        if (this.engageTime > 0 && entity.pos.y >= 0 ) {
          
            if (entity.pos.y > 0){
                entity.pos.y -= this.ascendSpeed * this.engageTime;
                entity.vel.y = -this.ascendSpeed;
            }else{
                entity.vel.y = 0;
                entity.pos.y = 0;
            }
            this.engageTime -= deltaTime;
        }
    }
}
