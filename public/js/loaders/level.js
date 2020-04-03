import Level from '../Level.js';
import { Matrix } from '../math.js';

import { createBackgroundLayer, createSpriteLayer } from '../layers.js';
import { loadJSON, loadSpriteSheet } from '../loaders.js';

function setupCollision(levelSpec, level) {
    const mergedTiles = levelSpec.layers.reduce((mergedTiles, layerSpec) => {
        return mergedTiles.concat(layerSpec.tiles);
    }, []);

    const collisionGrid = createCollisionGrid(mergedTiles, levelSpec.patterns);
    level.setCollisionGrid(collisionGrid);
}

function setupBackgrounds(levelSpec, level, backgroundSprites) {
    levelSpec.layers.forEach(layer => {
        const backgroundGrid = createBackgroundGrid(layer.tiles, levelSpec.patterns);
        const backgroundLayer = createBackgroundLayer(level, backgroundGrid, backgroundSprites);
        level.comp.layers.push(backgroundLayer);
    });
}

function setupEntities(levelSpec, level, entityFactory) {
  

    levelSpec.entities.forEach(({name, pos: [x, y]}) => {
        const createEntity = entityFactory[name];
        const entity = createEntity();
        entity.pos.set(x, y);
        entity.vel.set(-(50 + Math.floor(Math.random() * 100)), 0);
        level.entities.add(entity);
    });

    const spriteLayer = createSpriteLayer(level.entities, 128*3, 128*3);
    level.comp.layers.push(spriteLayer);
}


export  function createLevelLoader(entityFactory) {

  return async function loadLevel(name) {

        return loadJSON(`../levels/${name}.json`)
        .then(levelSpec => {
            //To randomly populate the clouds without manually putting them in JSON
            levelSpec.layers.forEach(layerSpec => {
                layerSpec.tiles.forEach(tileSpec => {
                    if(tileSpec.pattern === 'cloud') {
                        const yIndexOfCloud = [-1, 0, 1];
                        // let lastIndex = 0;
                        for(let i=2; i < 1650; i += 4) {
                            let randomIndex =  Math.floor(Math.random()*yIndexOfCloud.length);
                            // randomIndex = (randomIndex === lastIndex) ? (lastIndex - 1) % yIndexOfCloud.length : randomIndex;
                            tileSpec.ranges.push([i, yIndexOfCloud[randomIndex]]);
        
                        }
                    }
                });
            });
            
            //To randomly populate enemyFighters 
            const yIndexEnemyFighter = [0, 1, 2];
            for (let i = 20; i < 1600; i+=20) {
                let randomIndex =  Math.floor(Math.random()*yIndexEnemyFighter.length);
                levelSpec.entities.push({
                    name: 'enemyFighter',
                    pos: [i*128, yIndexEnemyFighter[randomIndex]*128],
                })
            }

            return Promise.all([
                levelSpec,
                loadSpriteSheet(levelSpec.spriteSheet),
            ]);
        })
        .then(([levelSpec, backgroundSprites]) => {
    
            const level = new Level();
    
            setupCollision(levelSpec, level);
            setupBackgrounds(levelSpec, level, backgroundSprites);
            setupEntities(levelSpec, level, entityFactory);
            
            // console.table(level.tiles.grid);
    
            return level;
        });
    }
} 

function createCollisionGrid(tiles, patterns) {
    const grid = new Matrix();

    for (const {tile, x, y} of expandTiles(tiles, patterns)) {
        grid.set(x, y, {type: tile.type});
    }

    return grid;
}

function createBackgroundGrid(tiles, patterns) {
    const grid = new Matrix();

    for (const {tile, x, y} of expandTiles(tiles, patterns)) {
        
        grid.set(x, y, {name: tile.name});
    }

    return grid;
}


function* expandSpan(xStart, xLength, yStart, yLength) {
    const xEnd = xStart + xLength;
    const yEnd = yStart + yLength;
    for(let x = xStart; x < xEnd; ++x) {
        for(let y = yStart; y < yEnd; ++y) {
            yield {x, y};
        }
    }
}

function expandRange(range) {
    if(range.length === 4) {
        const [xStart, xLength, yStart, yLength] = range;
        return expandSpan(xStart, xLength, yStart, yLength);
    }
    else if (range.length === 3){
        const [xStart, xLength, yStart] = range;
        return expandSpan(xStart, xLength, yStart, 1);
    }
    else if (range.length === 2) {
        const [xStart, yStart] = range;
        return expandSpan(xStart, 1, yStart, 1);
    }
}

function* expandRanges(ranges) {
    for ( const range of ranges) {
      yield* expandRange(range);
    }
}


function* expandTiles(tiles, patterns) {

    function* walkTiles(tiles, offsetX, offsetY) {
        for (const tile of tiles) {
            for (const { x, y } of expandRanges(tile.ranges)) {
                const derivedX = x + offsetX;
                const derivedY = y + offsetY;
                if (tile.pattern) {
                    const patternTiles = patterns[tile.pattern].tiles;
                    yield* walkTiles(patternTiles, derivedX, derivedY);
                }
                else {
                    yield {
                        tile,
                        x: derivedX,
                        y: derivedY,
                    };
                }
            } 
        }
    }

    yield* walkTiles(tiles, 0, 0);

}