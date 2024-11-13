import { IOffsetsWaves } from './offsetsWaves.interface';

export interface IOozeParams {
	colors: string[];
	numWaves: number;
	pointsPerWave: number;
	waveSpeed: number;
	offsetsWave: IOffsetsWaves[];
}
