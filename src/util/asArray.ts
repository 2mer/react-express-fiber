export default function asArray<T>(a: T | T[]) {
	if (!a) return [];

	return Array.isArray(a) ? a : [a];
}