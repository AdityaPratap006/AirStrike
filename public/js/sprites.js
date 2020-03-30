import  SpriteSheet from './SpriteSheet.js';
import { loadImage } from './loaders.js';

export async function loadBackgroundSprites() {
    return  loadImage('../images/tiles.png')
     .then(image => {
         
         const sprites = new SpriteSheet(image, 128, 128, 1);
         sprites.defineTile('ground', 2, 2);
 
         return sprites;
     });
}

export async function loadPlayerFighterSprites() {
    return  loadImage('../images/aircrafts/F-35-right.png')
    .then(image => {
        
        const sprites = new SpriteSheet(image, 243, 64, 0.6);
        sprites.define('playerFighter', 0, 0, 243, 64);

        return sprites;
    });
}