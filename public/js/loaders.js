import  SpriteSheet from './SpriteSheet.js';
import Level from './Level.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';

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

async function loadJSON(url) {
   return  fetch(url)
    .then(r => r.json());
}

export function createTiles(level, backgrounds) {

    function applyRange(background, xStart, xLength, yStart, yLength) {
        const xEnd = xStart + xLength;
        const yEnd = yStart + yLength;
        for(let x = xStart; x < xEnd; ++x) {
            for(let y = yStart; y < yEnd; ++y) {
                level.tiles.set(x, y, {
                    name: background.tile,
                    type: background.type,
                });
            }
        }
    }

    backgrounds.forEach(background => {
        background.ranges.forEach((range) => {
           if(range.length === 4) {
               const [xStart, xLength, yStart, yLength] = range;
               applyRange(background, xStart, xLength, yStart, yLength);
           }
           else if (range.length === 2) {
                const [xStart, yStart] = range;
                applyRange(background, xStart, 1, yStart, 1);
           }
           else if (range.length === 3){
                const [xStart, xLength, yStart] = range;
                applyRange(background, xStart, xLength, yStart, 1);
           }
        });
    })
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

        // console.log(sprites);

        return sprites;
    })
}

export async function loadLevel(name) {

    return loadJSON(`../levels/${name}.json`)
    .then(levelSpec => Promise.all([
        levelSpec,
        loadSpriteSheet(levelSpec.spriteSheet),
    ]))
    .then(([levelSpec, backgroundSprites]) => {

        const level = new Level();

        createTiles(level, levelSpec.backgrounds);

        const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
        level.comp.layers.push(backgroundLayer);
        
        const spriteLayer = createSpriteLayer(level.entities, 128*3, 128*3);
        level.comp.layers.push(spriteLayer);
        
        // console.table(level.tiles.grid);

        return level;
    })
}


