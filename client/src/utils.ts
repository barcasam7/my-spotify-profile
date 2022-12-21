/**
 * Higher-order function for async/await error handling
 * @param {function} fn an async function
 * @returns {function}
 */
export const catchErrors = (fn: Function): Function => {
  return function(...args: any[]): any {
      return fn(...args).catch((err: []) => {
        console.error(err);
      })
  }
}

/**
 * Format milliseconds to time duration
 * @param {number} ms number of milliseconds
 * @returns {string} formatted duration string
 * @example 216699 -> '3:36'
 */
export const formatDuration = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor(((ms % 60000) / 1000));
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
