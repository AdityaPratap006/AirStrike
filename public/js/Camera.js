import { Vector2d } from "./math.js";

export default class Camera {
    constructor() {
        this.pos = new Vector2d(0, 0);
        this.size = new Vector2d(128*11, 128*5);
    }
}