/**
 * @description Car
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import Control from './car/control.js'

export default class Car {
  /**
   * @type {number}
   */
  velocity = 0

  /**
   * @type {number}
   */
  acceleration = 0

  /**
   * @type {Control}
   */
  control

  /**
   * @type {number}
   */
  friction

  /**
   * @type {number}
   */
  force

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
   * @param {number}  friction
   * @param {number}  force
   * @param {Control} control
   */
  constructor(
    centerX,
    centerY,
    width,
    height,
    friction = 1,
    force = 100,
    control = new Control(),
  ) {
    this.centerX = centerX
    this.centerY = centerY
    this.width = width
    this.height = height
    this.friction = friction
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
    this.#applyFriction(t)
    this.#applyDisplacement(t)
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
   * Apply friction
   *
   * @param   {number} t Delta time in seconds
   * @returns {void}
   * @note    Friction is a force that is always opposite
   *          to the movement/velocity.
   *          If there is no movement, there is no friction.
   *          That is why friction decelerates the movement/velocity
   *          until it reaches `0`. At that moment, the friction disappears
   */
  #applyFriction(t) {
    if (Math.abs(this.friction) > Math.abs(this.velocity)) {
      this.velocity = 0
    } else if (this.velocity > 0) {
      this.velocity -= this.friction * t
    } else if (this.velocity < 0) {
      this.velocity += this.friction * t
    }
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
