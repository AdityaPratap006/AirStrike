import { Trait } from '../Entity.js';

export default class Acceleration extends Trait {
    constructor(acceleration) {
        super('accelerate');

        this.duration = 5000;
        this.engageTime = 0;
        this.acceleration = acceleration;
    }

    start() {
        this.engageTime = this.duration;
        
    }

    cancel(){
        this.engageTime = 0;
    }

    update(entity, deltaTime) {
        // entity.pos.x +=  entity.vel.x * deltaTime;
        if (entity.vel.x >= 1200 || entity.pos.x > 128*10) {
            // entity.vel.x = 0;
            return;
        }

        if (this.engageTime > 0 && entity.vel.x <= 1200 ) {
          
            if (entity.pos.x < 128*10){
                 
                entity.vel.x += this.acceleration * this.engageTime;
            }else{
                entity.vel.x = 0;
                entity.pos.x = 128*102;
            }
            this.engageTime -= deltaTime;
        }
    }
}
