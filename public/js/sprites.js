import  SpriteSheet from './SpriteSheet.js';
import { loadImage } from './loaders.js';


export async function loadPlayerFighterSprites() {
    return  loadImage('../images/aircrafts/F-22-right.png')
    .then(image => {
        
        const sprites = new SpriteSheet(image, 257, 57, 0.7);
        sprites.define('playerFighter', 0, 0, 257, 57);

        return sprites;
    });
}