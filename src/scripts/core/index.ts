import { IOozeParams, IWavePoints, IOffsetsWaves } from '../interface';
import { defaultValues } from './defaultValues';

class Ooze {
	// canvas
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;

	// params
	private colors: string[];
	private numWaves: number;
	private pointsPerWaves: number;
	private waveSpeed: number;
	private offsetsWave: IOffsetsWaves[] = [];

	// variable
	private wavePoints: IWavePoints[][] = [];
	private width: number = 0;
	private height: number = 0;

	constructor(params: IOozeParams = defaultValues) {
		let canvas = document.getElementById('ooze') as HTMLCanvasElement;
		let context = canvas?.getContext('2d');
		this.canvas = canvas;

		if (context) {
			this.context = context;
		} else {
			throw new Error("Couldn't get canvas context");
		}

		this.colors = params.colors;
		this.numWaves = params.numWaves;
		this.pointsPerWaves = params.pointsPerWave;
		this.waveSpeed = params.waveSpeed;
		this.offsetsWave = params.offsetsWave;

		this.wavePoints = [];

		this.resizeCanvas();
		this.createWaves();
		this.animate();
	}

	private resizeCanvas() {
		this.width = this.canvas.width = window.innerWidth;
		this.height = this.canvas.height = window.innerHeight;
	}

	private createWaves() {
		for (let i = 0; i < this.numWaves; i++) {
			const points = [];

			for (let j = 0; j <= this.pointsPerWaves; j++) {
				points.push({
					x: (j / this.pointsPerWaves) * (this.width + 100) - 30,
					y: this.height / 2 + i * 60,
					baseY: this.height / 2 + i * 60,
					angle: Math.random() * Math.PI * 3,
					speed: this.waveSpeed + Math.random() * 0.02,
				});
			}
			this.wavePoints.push(points);
		}

		if (this.offsetsWave.length > 0) {
			for (let i = 0; i <= this.offsetsWave.length - 1; i++) {
				this.wavePoints[this.offsetsWave[i].waveIndex].forEach(
					(point) => (point.baseY = this.offsetsWave[i].offsetValue),
				);
			}
		}
	}

	private animate() {
		this.context.clearRect(0, 0, this.width, this.height);
		this.context.clearRect(0, 0, this.width, this.height);

		this.wavePoints.forEach((points, waveIndex) => {
			this.context.beginPath();
			this.context.moveTo(points[0].x, points[0].y);

			points.forEach((point, pointIndex) => {
				point.y = point.baseY + 120 * Math.sin(point.angle);
				point.angle += point.speed;

				if (pointIndex < points.length - 1) {
					const nextPoint = points[pointIndex + 1];
					const controlX = (point.x + nextPoint.x) / 2;
					const controlY = (point.y + nextPoint.y) / 2;

					this.context?.quadraticCurveTo(point.x, point.y, controlX, controlY);
				}
			});

			this.context.lineTo(this.width, this.height);
			this.context.lineTo(0, this.height);
			this.context.closePath();

			this.context.fillStyle = this.colors[waveIndex];
			this.context.fill();
		});

		requestAnimationFrame(() => this.animate());
	}
}

export default Ooze;
