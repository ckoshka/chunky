export const range = (n: number) => Array.from(Array(n).keys());

export const chunk = <T>(arr: Array<T>, n: number): Array<Array<T>> =>
	range(Math.ceil(arr.length / n))
		.map((i: number) => i * n)
		.map((i: number) => arr.slice(i, i + n));

export const chunkCurried =
	<T>(n: number) => (arr: Array<T>): Array<Array<T>> =>
		range(Math.ceil(arr.length / n))
			.map((i: number) => i * n)
			.map((i: number) => arr.slice(i, i + n));

export const lazyChunk = async function* <T>(
	arr: AsyncIterableIterator<T>,
	n: number,
): AsyncIterableIterator<Array<T>> {
	for (;;) {
		const ch: Array<T> = Array(n);
		for (let i = 0; i < n; i++) {
			const result = await arr.next();
			if (result.done) {
				yield ch.slice(0, i - 1);
				return;
			}
			result.value ? ch[i] = result.value : null;
		}
		yield ch;
	}
};