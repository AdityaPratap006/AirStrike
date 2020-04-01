import { createAircraftExplosion } from './entities.js';
import TileResolver from './TileResorver.js';


export function createBackgroundLayer(level, tiles, sprites) {
    const resolver = new TileResolver(tiles);

    const buffer = document.createElement('canvas');
    buffer.width = 128*20;
    buffer.height = 128*5;

    const context = buffer.getContext('2d');

    function redraw(startIndex, endIndex) {
        
        context.clearRect(0, 0, buffer.width, buffer.height);

        for (let x = startIndex; x <= endIndex; ++x) {
            const col = tiles.grid[x];
            if (col) {
                col.forEach((tile, y) => {
                    sprites.drawTile(tile.name, context, x - startIndex, y);
                });
            }
        }
    }

    return function drawBackgroundLayer(context, camera) {

        // loadImage('../images/sky3.png')
        // .then(backgroundImage => {
        //     for(let i = 0; i < Math.ceil(camera.pos.x/1920) + 1; ++i ) {
        //         context.drawImage(backgroundImage, 0 - camera.pos.x + i*1920, -320 - camera.pos.y);
        //     }
        // }).then(() => {
            
        // });
        const drawWidth = resolver.toIndex(camera.size.x);
        const drawFrom = resolver.toIndex(camera.pos.x);
        const drawTo = drawFrom + drawWidth;
        redraw(drawFrom, drawTo);

        
        context.drawImage(buffer, -camera.pos.x % 128, -camera.pos.y);
    };
}

export function createSpriteLayer(entities, width, height) {
    const spriteBuffer = document.createElement('canvas');
    spriteBuffer.width = width;
    spriteBuffer.height = height;
    const spriteBufferContext = spriteBuffer.getContext('2d');
    

    return function drawSpriteLayer(context, camera) {

         

        
        entities.forEach(entity => {
            spriteBufferContext.clearRect(0, 0, width, height);

            if (entity.go && entity.go.isObstructed) {
                createAircraftExplosion()
                .then(aircraftExplosion => {
                    console.log('draw explosion! ', aircraftExplosion);
                    aircraftExplosion.pos.set(entity.pos.x + 50, entity.pos.y - 60);
                    entities.add(aircraftExplosion);
                    setTimeout(() => {
                        entities.delete(aircraftExplosion);
                    }, 400);
                    
                })

                entities.delete(entity);
            }
            else {
                entity.draw(spriteBufferContext);
                context.drawImage(
                    spriteBuffer,
                    entity.pos.x - camera.pos.x,
                    entity.pos.y - camera.pos.y,
                );
            }
            
           
        });
    };
}

export function createCollisionLayer(level) {
    const resolvedTiles = [];

    const tileResolver = level.tileCollider.tiles;
    const tileSize = tileResolver.tileSize;

    const getByIndexOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.push({x, y});
       
        return getByIndexOriginal.call(tileResolver, x, y);
    }

    return function drawCollision(context, camera) {
        context.strokeStyle = 'blue';
        resolvedTiles.forEach(({x, y}) => {
            context.beginPath();
            context.rect(
                x * tileSize - camera.pos.x, 
                y * tileSize - camera.pos.y, 
                tileSize, 
                tileSize
            );
            context.stroke();

        });

        context.strokeStyle = 'red';
        level.entities.forEach(entity => {
            context.beginPath();
            context.rect(
                entity.pos.x - camera.pos.x, 
                entity.pos.y - camera.pos.y, 
                entity.size.x, 
                entity.size.y
            );
            context.stroke();
        })

        resolvedTiles.length = 0;
    }
}

export function createCameraLayer(cameraToDraw) {
    return function drawCameraRect(context, fromCamera) {
        context.strokeStyle = 'purple';
        context.beginPath();
        context.rect(
            cameraToDraw.pos.x - fromCamera.pos.x, 
            cameraToDraw.pos.y - fromCamera.pos.y, 
            cameraToDraw.size.x,
            cameraToDraw.size.y
        );
        context.stroke();
    }
}