/**
 * @description Car
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import Control from './car/control.js'

export default class Car {
  /**
   * @type {number}
   * @note This is the force that will cause acceleration
   */
  force

  /**
   * @type {number}
   */
  velocity = 0

  /**
   * @type {number}
   */
  acceleration = 0

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
   * @type {Control}
   */
  control

  /**
   * Constructor
   *
   * @param {number}  centerX
   * @param {number}  centerY
   * @param {number}  width
   * @param {number}  height
   * @param {number}  force
   * @param {Control} control
   */
  constructor(
    centerX,
    centerY,
    width,
    height,
    force = 200,
    control = new Control(),
  ) {
    this.centerX = centerX
    this.centerY = centerY
    this.width = width
    this.height = height
    this.force = force
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

    this.#applyAcceleration(t)
    this.#applyDisplacement(t)
  }

  /**
   * Draw car
   *
   * @param   {CanvasRenderingContext2D} context
   * @returns {void}
   */
  draw(context) {
    context.save()
    context.translate(this.centerX, this.centerY)
    context.rotate(this.control.angle)
    this.#draw(context, -this.width / 2, -this.height / 2)
    context.restore()
  }

  /**
   * Apply acceleration
   *
   * @param   {number} t Delta time in seconds
   * @returns {void}
   */
  #applyAcceleration(t) {
    if (this.control.forward) {
      this.acceleration = this.force
    }

    if (this.control.reverse) {
      this.acceleration = -this.force
    }

    if (!this.control.forward && !this.control.reverse) {
      this.acceleration = 0
    }

    this.velocity += this.acceleration * t
  }

  /**
   * Apply displacement
   *
   * @param   {number} t Delta time in seconds
   * @returns {void}
   * @note    Displacement is velocity times time
   */
  #applyDisplacement(t) {
    this.centerX += Math.sin(this.control.angle) * this.velocity * t
    this.centerY -= Math.cos(this.control.angle) * this.velocity * t
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
