import { loadImage } from './loaders.js';

function drawBackground(background, ctx, sprites) {

    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for(let x = x1; x < x2; ++x) {
            for(let y = y1; y < y2; ++y) {
                sprites.drawTile(background.tile, ctx, x, y);
            }
        }
    });

}


export function createBackgroundLayer(level, sprites) {
    const tiles = level.tiles;
    const resolver = level.tileCollider.tiles;

    const backgroundBuffer = document.createElement('canvas');
    backgroundBuffer.width = 128*12;
    backgroundBuffer.height = 128*5;

    const context = backgroundBuffer.getContext('2d');

    let startIndex, endIndex;

    function redraw(drawFrom, drawTo) {

        if ( drawFrom === startIndex && drawTo === endIndex) {
            return;
        }
        
        startIndex = drawFrom;
        endIndex = drawTo;
         
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

        loadImage('../images/sky3.png')
        .then(backgroundImage => {
            for(let i = 0; i < Math.ceil(camera.pos.x/1920) + 1; ++i ) {
                context.drawImage(backgroundImage, 0 - camera.pos.x + i*1920, -320 - camera.pos.y);
            }
        }).then(() => {
            const drawWidth = resolver.toIndex(camera.size.x);
            const drawFrom = resolver.toIndex(camera.pos.x);
            const drawTo = drawFrom + drawWidth;
            redraw(drawFrom, drawTo);

            
            context.drawImage(backgroundBuffer, -camera.pos.x % 128, -camera.pos.y);
        });
        
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

            entity.draw(spriteBufferContext);
            context.drawImage(
                spriteBuffer,
                entity.pos.x - camera.pos.x,
                entity.pos.y - camera.pos.y,
            );
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