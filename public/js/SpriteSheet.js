export default class SpriteSheet {
    constructor(image, width, height, scale = 1) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.scale = scale;
        this.tiles = new Map();
    }

    define(name, x, y, width, height, scale = 1) {
        this.width = width;
        this.height = height;
        this.scale = scale;
        const buffer  = document.createElement('canvas');
        buffer.width =  width;
        buffer.height = height;

        buffer
        .getContext('2d')
        .drawImage(
        this.image,
        x ,
        y,
        width,
        height,
        0,
        0,
        Math.ceil(width * this.scale),
        Math.ceil(height * this.scale) );

        this.tiles.set(name, buffer);
        // buffer
        // .getContext('2d')
        // .strokeStyle = "#f00";

        // buffer
        // .getContext('2d')
        // .lineWidth = 2;
        
        // buffer
        // .getContext('2d')
        // .strokeRect(x, y, width * this.scale, height* this.scale);
        
       
    }

    defineTile(name, x, y, offsetX = 0, offsetY = 0) {
        this.define(name, 
            x*this.width + offsetX, 
            y*this.height + offsetY, 
            this.width, 
            this.height
        );
    }

    draw(name, context, x, y) {
        const buffer = this.tiles.get(name);
        context.drawImage(buffer, x, y);
    }

    drawTile(name, context, x, y) {
        this.draw(name, context, x*this.width, y*this.height);
    }
}