/**
 * Converts 0 to `'--'`. Also does with falsy values.
 * @param {Number} value
 * @return {string}
 */
export function dashedZero(value) {
  if (!value || value === 0) {
    return '--';
  }
  return value.toString();
}

export default {
  dashedZero,
};
