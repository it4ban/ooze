import { IOozeParams, IWavePoints } from '../interface';

class Ooze {
	// canvas
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D | null;

	// params
	private colors: string[];
	private numWaves: number;
	private pointPerWaves: number;
	private waveSpeed: number;

	// variable
	private wavePoints: IWavePoints[] | [];

	constructor(
		params: IOozeParams = {
			colors: ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.4)'],
			pointPerWave: 30,
			numWaves: 3,
			waveSpeed: 0.015,
		},
	) {
		let canvas = document.getElementById('oozes') as HTMLCanvasElement;
		let context = canvas?.getContext('2d');

		this.canvas = canvas;
		this.context = context;
		if (!this.context) {
			throw new Error("Couldn't get canvas context");
		}

		this.colors = params.colors;
		this.numWaves = params.numWaves;
		this.pointPerWaves = params.pointPerWave;
		this.waveSpeed = params.waveSpeed;

		this.wavePoints = [];

		this.resizeCanvas();
		this.createWaves();
		this.animate();
	}

	private resizeCanvas() {}

	private createWaves() {
		for (let i = 0; i <= this.numWaves; i++) {
			const points = [];

			for (let j = 0; j <= this.pointPerWaves; j++) {
				// points.push({
				//     x:
				// })
			}
		}
	}

	private animate() {
		console.log('animate');
	}
}

export default Ooze;
