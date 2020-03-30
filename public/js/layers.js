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
    const backgroundBuffer = document.createElement('canvas');
    backgroundBuffer.width = 128*11;
    backgroundBuffer.height = 128*5;

    const context = backgroundBuffer.getContext('2d');

    level.tiles.forEach(( tile, x, y) => {
        sprites.drawTile(tile.name, context, x, y);
    });

    return function drawBackgroundLayer(context) {
        loadImage('../images/sky3.png')
        .then(backgroundImage => {
            context.drawImage(backgroundImage, 0, -320);
        }).then(() => {
            context.drawImage(backgroundBuffer, 0, 0);
        });
        
    };
}


export function createSpriteLayer(entities) {
    return function drawSpriteLayer(context) {
        entities.forEach(entity => {
            entity.draw(context);
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

    return function drawCollision(context) {
        context.strokeStyle = 'blue';
        resolvedTiles.forEach(({x, y}) => {
            context.beginPath();
            context.rect(x * tileSize, y * tileSize, tileSize, tileSize);
            context.stroke();

        });

        context.strokeStyle = 'red';
        level.entities.forEach(entity => {
            context.beginPath();
            context.rect(entity.pos.x, entity.pos.y, entity.size.x, entity.size.y);
            context.stroke();
        })

        resolvedTiles.length = 0;
    }
}