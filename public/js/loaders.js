import  SpriteSheet from './SpriteSheet.js';
import { createAnim } from './anim.js';

export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            // setTimeout(resolve, 2000, image);
            resolve(image);
        });
        image.src = url;
    });
}

export async function loadJSON(url) {
   return  fetch(url)
    .then(r => r.json());
}

export async function loadSpriteSheet(name) {
    return loadJSON(`../sprites/${name}.json`)
    .then(sheetSpec => Promise.all([
        sheetSpec,
        loadImage(sheetSpec.imageURL),

    ]))
    .then(([sheetSpec, image]) => {

        const sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH, sheetSpec.scale);
        
        if ( sheetSpec.tiles ) {
          
            sheetSpec.tiles.forEach(tileSpec => {
                const { name, index, offsetX, offsetY } = tileSpec;
                sprites.defineTile(name, index[0], index[1], offsetX, offsetY);
            });
        }
        
        if ( sheetSpec.frames ) {
            
            sheetSpec.frames.forEach(frameSpec => {
                let x = frameSpec.rect[0], y = frameSpec.rect[1], width = frameSpec.rect[2], height = frameSpec.rect[3]; 
               
                sprites.define(frameSpec.name, x, y, width, height, frameSpec.scale);
            })
        }

        if ( sheetSpec.animations ) {
            sheetSpec.animations.forEach(animSpec => {
                const animation = createAnim(animSpec.frames, animSpec.frameLen);
                sprites.defineAnim(animSpec.name, animation);
            });
        }

        

        return sprites;
    })
}

