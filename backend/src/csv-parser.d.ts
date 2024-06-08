// src/csv-parser.d.ts
declare module 'csv-parser' {
	import { Stream } from 'stream';

	function csvParser(options?: csvParser.Options): Stream;

	namespace csvParser {
		interface Options {
			separator?: string;
			newline?: string;
			headers?: boolean | string[];
			skipLines?: number;
			maxRowBytes?: number;
			strict?: boolean;
			mapHeaders?: (args: { header: string; index: number }) => string | null;
			mapValues?: (args: { header: string; index: number; value: any }) => any;
		}
	}

	export = csvParser;
}
