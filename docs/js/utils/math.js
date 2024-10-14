/**
 * @description Math utility
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
export default class Math {
  /**
   * Linear interpolation between two points
   *
   * @param   {number} A
   * @param   {number} B
   * @param   {number} t
   * @returns {number}
   */
  static lerp(A, B, t) {
    return A + (B - A) * t
  }
}
