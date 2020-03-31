import { Trait } from '../Entity.js';

export default class Descend extends Trait {
    constructor() {
        super('descend');

        this.duration = 5000;
        this.engageTime = 0;
        this.descendSpeed = 0.0005;
    }

    start() {
        this.engageTime = this.duration;
        
    }

    cancel(){
        this.engageTime = 0;
    }

    update(entity, deltaTime) {
        // entity.pos.x +=  entity.vel.x * deltaTime;
        if (entity.pos.y >= 128*5) {
            return;
        }

        if (this.engageTime > 0 && entity.pos.y <= 128*5 ) {
          
            if (entity.pos.y <= 128*5){
                entity.pos.y += this.descendSpeed * this.engageTime;
                entity.vel.y = this.descendSpeed;
            }else{
                entity.pos.y = 0;
                entity.vel.y = 0;
            }
            this.engageTime -= deltaTime;
        }
    }
}
