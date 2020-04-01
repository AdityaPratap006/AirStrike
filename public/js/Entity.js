import { Vector2d } from './math.js';

export class Trait {
    constructor(name) {
        this.NAME = name;
    }

    obstruct() {

    }

    updateTrait() {
        console.warn('Unhandled update call in Trait');
    }
}

export default class Entity {
    constructor() {
        this.pos = new Vector2d(0,0);
        this.vel = new Vector2d(0,0);
        this.size = new Vector2d(0, 0);
        this.traits = [];
        this.collided = false;
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    obstruct() {
        
        this.traits.forEach(trait => {
            trait.obstruct(this);
        });
    }

    update(deltaTime) {
      
        this.traits.forEach(trait => {
            trait.update(this, deltaTime);
        });
    }
     
}