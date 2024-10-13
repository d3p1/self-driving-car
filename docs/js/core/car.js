/**
 * @description Car
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import Control from './car/control.js'

export default class Car {
  /**
   * @type {Control}
   */
  control

  /**
   * @type {number}
   */
  centerX

  /**
   * @type {number}
   */
  centerY

  /**
   * @type {number}
   */
  width

  /**
   * @type {number}
   */
  height

  /**
   * Constructor
   *
   * @param {number}  centerX
   * @param {number}  centerY
   * @param {number}  width
   * @param {number}  height
   * @param {Control} control
   */
  constructor(centerX, centerY, width, height, control = new Control()) {
    this.centerX = centerX
    this.centerY = centerY
    this.width = width
    this.height = height
    this.control = control
  }

  /**
   * Update car
   *
   * @param   {number} t Delta time in seconds
   * @returns {void}
   */
  update(t) {
    this.control.update(t)
  }

  /**
   * Draw car
   *
   * @param   {CanvasRenderingContext2D} context
   * @returns {void}
   * @note    Just in case, it is used `beginPath()`, but I think that
   *          this method is only necessary when it is drawn a path using
   *          drawing commands like `lineTo()`, `arc()`, etc.
   */
  draw(context) {
    context.save()
    context.translate(this.centerX, this.centerY)
    context.rotate(this.control.angle)
    this.#draw(context, -this.width / 2, -this.height / 2)
    context.restore()
  }

  /**
   * Draw
   *
   * @param {CanvasRenderingContext2D} context
   * @param {number}                   x
   * @param {number}                   y
   */
  #draw(context, x, y) {
    context.beginPath()
    context.rect(x, y, this.width, this.height)
    context.fill()
  }
}
