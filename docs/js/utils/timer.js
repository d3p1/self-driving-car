/**
 * @description Timer
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        Custom utility to be able to get delta time from frame to frame
 * @note        Instead of using the time given to `requestAnimationFrame()`
 *              (that is the elapsed time since the init of the animation),
 *              the delta time will best suite this project, because
 *              the change of the app state depends on the user interaction
 *              (like games). Elapsed time is better for animations with a
 *              defined timeline (but this is not the case of this project)
 */
export default class Timer {
  /**
   * @type {number}
   */
  current = 0

  /**
   * @type {number}
   */
  delta = 0

  /**
   * Update. Calculate delta time (in seconds)
   * from the last registered time and given time
   *
   * @param   {number} t Elapsed time since the init of the animation
   *                     in milliseconds
   * @returns {void}
   */
  update(t) {
    this.delta = (t - this.current) * 0.001
    this.current = t
  }
}
