import { Vector2d } from './math.js';
import BoundingBox from './BoundingBox.js';


export class Trait {
    constructor(name) {
        this.NAME = name;
    }

    collides(us ,them) {
       
    }

    obstruct() {
        
    }

    update() {
         
    }
}

export default class Entity {
    constructor() {
        this.pos = new Vector2d(0,0);
        this.vel = new Vector2d(0,0);
        this.size = new Vector2d(0,0);
        this.offset = new Vector2d(0,0);
        this.traits = [];
        this.bounds = new BoundingBox(this.pos, this.size, this.offset);
        this.canCollide = true;
        this.lifeTime = 0;
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    collides(candidate) {
        this.traits.forEach(trait => {
            trait.collides(this, candidate);
        });
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

        this.lifeTime += deltaTime;
    }
     
}