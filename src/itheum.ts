import p5 from "p5";

export class Itheum {
    private viewport: HTMLElement
    private canvas!: p5.Renderer
    private debug: boolean
    public x: number
    private y: number
    private px: number
    private py: number
    
	constructor($viewport: HTMLElement, x: number, y: number) {
        this.debug = false;
        this.viewport = $viewport;
        this.canvas;
        this.x = x;
        this.y = y;
        this.px = 0;
        this.py = 0;
        new p5(this.sketch, this.viewport);
        console.log("testRun");
	}

    sketch = (p:p5) => {
        p.setup = () => {
            this.canvas = p.createCanvas(window.innerWidth, window.innerHeight);
            this.px = window.innerWidth / 2;
            this.py = window.innerHeight / 2;
        };

        p.draw = () => {
            p.background(10);
            p.fill(200,100,50);
            p.ellipse(this.px,this.py,this.x,this.y);
        };

        p.windowResized = () => {
            if(this.debug){
                console.log(`resized ${window.innerWidth}, ${window.innerHeight}`);
            }
            p.resizeCanvas(window.innerWidth, window.innerHeight);
            this.x = window.innerWidth / 2;
            this.y = window.innerHeight / 2;
        };

    }
}

declare global {
	interface Window {
		Itheum: typeof Itheum;
		onItheumLoaded: () => void;
	}
}

if (import.meta.env.MODE === "iife") {
	window.Itheum = Itheum;
	window.onItheumLoaded && window.onItheumLoaded();
}