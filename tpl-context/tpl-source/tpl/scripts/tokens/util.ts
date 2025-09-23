/**
 * wrapper for JSON.stringify which stringifies in a consistent format
 */
const stringifyJson = (obj: any) => JSON.stringify(obj, null, 2);

export { stringifyJson };
