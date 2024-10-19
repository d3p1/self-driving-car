/**
 * @description Car
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import Control from './car/control.js'
import Sensor from './car/sensor.js'

export default class Car {
  /**
   * @type {number}
   * @note This is the force that will cause acceleration
   * @note For now, it is considered that force cause acceleration without
   *       taking into consideration mass
   *       (acceleration is force divided by mass)
   */
  force

  /**
   * @type {number}
   * @note It is defined as speed and not velocity, because velocity is
   *       speed and direction.
   *       This property will store the magnitude of the
   *       velocity, and the direction will be given by the control angle
   */
  speed = 0

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
   * @type {Sensor}
   */
  sensor

  /**
   * Constructor
   *
   * @param {number}  centerX
   * @param {number}  centerY
   * @param {number}  width
   * @param {number}  height
   * @param {number}  force
   * @param {Control} control
   * @param {Sensor}  sensor
   */
  constructor(
    centerX,
    centerY,
    width,
    height,
    force = 200,
    control = new Control(),
    sensor = new Sensor(),
  ) {
    this.centerX = centerX
    this.centerY = centerY
    this.width = width
    this.height = height
    this.force = force
    this.control = control
    this.sensor = sensor
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

    this.sensor.update(this.control.angle, this.centerX, this.centerY)
  }

  /**
   * Draw the car
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

    this.sensor.draw(context)
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

    this.speed += this.acceleration * t
  }

  /**
   * Apply displacement
   *
   * @param   {number} t Delta time in seconds
   * @returns {void}
   * @note    Displacement is velocity (speed and a direction) times time
   */
  #applyDisplacement(t) {
    this.centerX += Math.sin(this.control.angle) * this.speed * t
    this.centerY -= Math.cos(this.control.angle) * this.speed * t
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
