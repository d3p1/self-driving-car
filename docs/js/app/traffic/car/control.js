/**
 * @description Traffic car control
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import BaseControl from '../../car/control.js'

export default class Control extends BaseControl {
  /**
   * Constructor
   */
  constructor() {
    super()

    /**
     * @note Traffic cars always go forward
     */
    this.forward = true
  }

  /**
   * Add key listeners
   *
   * @returns {void}
   * @note    Traffic cars do not have key listeners
   */
  _addKeyListeners() {}
}
