import { Trait } from '../Entity.js';

export default class Ascend extends Trait {
    constructor() {
        super('ascend');

        this.duration = 5000;
        this.engageTime = 0;
        this.ascendSpeed = 0.0005;
        this.direction = 0;
    }

    start() {
        this.engageTime = this.duration;
        
    }

    cancel(){
        this.engageTime = 0;
    }

    update(entity, deltaTime) {
        // entity.pos.x +=  entity.vel.x * deltaTime;
        this.ascendSpeed = entity.vel.x / 1000000;
        if (entity.pos.y <= 0) {
            entity.pos.y = 1
             return;
        }

        if (this.engageTime > 0 && entity.pos.y >= 0 ) {
          
            if (entity.pos.y > 0){
                entity.pos.y += this.direction * this.ascendSpeed * this.engageTime;
                entity.vel.y = this.direction * this.ascendSpeed;
            }else{
                entity.vel.y = 0;
                entity.pos.y = 1;
            }
            this.engageTime -= deltaTime;
        }
    }
}
