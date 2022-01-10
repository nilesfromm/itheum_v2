import p5 from "p5";

interface Coordinate {
	x: number;
	y: number;
}

export class Itheum {
	private viewport: HTMLElement;
	private canvas!: p5.Renderer;
	private shader!: p5.Shader;
	private debug: boolean;
	private logoBase: Coordinate[];
	public x: number;
	private y: number;

	constructor($viewport: HTMLElement, x: number, y: number) {
		this.debug = false;
		this.viewport = $viewport;
		this.canvas;
		this.shader;
		this.x = x;
		this.y = y;

		this.logoBase = [
			{ x: 0, y: -291 },
			{ x: -100, y: -117 },
			{ x: 26, y: 14 },
			{ x: 191, y: 36 },
			{ x: 79, y: 135 },
			{ x: -118, y: 160 },
			{ x: 165, y: 181 },
			{ x: -320, y: 266 },
			{ x: 61, y: 266 },
			{ x: 320, y: 266 },
		];

		new p5(this.sketch, this.viewport);
		console.log("testRun");
	}

	sketch = (p: p5) => {
		p.preload = () => {
			this.shader = p.loadShader("src/shader.vert", "src/shader.frag");
		};

		p.setup = () => {
			this.canvas = p.createCanvas(
				window.innerWidth,
				window.innerHeight,
				p.WEBGL
			);
			const gl: any = (this.canvas as any).canvas.getContext("webgl");
			gl.disable(gl.DEPTH_TEST);
			p.colorMode(p.RGB);
			p.noStroke();
			p.pixelDensity(1);
			p.smooth();
		};

		p.draw = () => {
			p.background(10);
			// p.clear();
			p.fill(255, 0, 0);
			p.ellipse(p.mouseX - window.innerWidth / 2, 0, this.x, this.y);
		};

		p.windowResized = () => {
			if (this.debug) {
				console.log(`resized ${window.innerWidth}, ${window.innerHeight}`);
			}
			p.resizeCanvas(window.innerWidth, window.innerHeight);
			this.x = window.innerWidth / 2;
			this.y = window.innerHeight / 2;
		};

		class OrbitPoint {
			private base: p5.Vector;
			private current: p5.Vector;
			private baseRadius: number;
			private baseOffset: number;
			private radius: number;
			private offset: number;
			private lineDist: number;
			private timeDist: number;
			private repelDist: boolean;
			private timeOffset: number;

			constructor(
				x: number,
				y: number,
				_radius: number,
				_offset: number,
				_timeOffset: number
			) {
				this.base = p.createVector(x, y);
				this.current = p.createVector(x, y);
				this.baseRadius = _radius;
				this.baseOffset = _offset;
				this.radius = 0;
				this.offset = 0;
				this.lineDist = 0;
				this.timeDist = 0;
				this.repelDist = false;
				this.timeOffset = _timeOffset;
				this.setScroll(100);
			}

			setScroll(_scroll: number): void {
				this.radius = 3 + this.baseRadius * (_scroll / 100);
				this.offset = this.baseOffset * (_scroll / 100);
				this.lineDist = (160 - _scroll) * 5;
				this.timeDist = (80 - _scroll) / 100;
			}

			update(_time: number): void {
				let time: number = _time * this.timeOffset;
				this.current.x =
					this.base.x -
					p.sin(time) * this.offset +
					this.radius * p.cos(2 * p.PI * time);
				this.current.y =
					this.base.y -
					p.cos(time) * this.offset +
					this.radius * p.sin(2 * p.PI * time);
				// if (!mobile) {
				// 	this.repel();
				// }
			}

			draw(): void {
				p.fill(255, 0, 0);
				p.ellipse(this.current.x, this.current.y, 8);
			}
		}
	};
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
