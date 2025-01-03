/**
 * @description Car
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import Mathy from '../utils/mathy.js'
import Control from './car/control.js'
import Sensor from './car/sensor.js'

export default class Car {
  /**
   * @type {boolean}
   */
  isDamage = false

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
   * @type {{x: number, y: number}[][]}
   */
  polygon = []

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
   * @type {string}
   */
  color

  /**
   * @type {string}
   */
  damageColor

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
   * @param {string}  color
   * @param {string}  damageColor
   * @param {number}  force
   * @param {Control} control
   * @param {Sensor}  sensor
   */
  constructor(
    centerX,
    centerY,
    width = 50,
    height = 100,
    color = 'hsl(200,100%,50%)',
    damageColor = 'hsl(0,0%,30%)',
    force = 200,
    control = new Control(),
    sensor = new Sensor(),
  ) {
    this.centerX = centerX
    this.centerY = centerY
    this.width = width
    this.height = height
    this.color = color
    this.damageColor = damageColor
    this.force = force
    this.control = control
    this.sensor = sensor
  }

  /**
   * Update car
   *
   * @param   {number}                     t           Delta time in seconds
   * @param   {{x: number, y: number}[][]} roadBorders Road borders
   * @param   {Car[]}                      cars        Other cars
   * @returns {void}
   */
  update(t, roadBorders = [], cars = []) {
    if (!this.isDamage) {
      this.control.update(t)

      this.#applyAcceleration(t)
      this.#applyDisplacement(t)

      this.#assessDamage(roadBorders, cars)
    }

    this.sensor.update(
      this.control.angle,
      this.centerX,
      this.centerY,
      roadBorders,
      cars,
    )
  }

  /**
   * Draw the car
   *
   * @param   {CanvasRenderingContext2D} context
   * @returns {void}
   */
  draw(context) {
    context.save()
    context.fillStyle = this.color
    if (this.isDamage) {
      context.fillStyle = this.damageColor
    }
    this.#draw(context)
    context.restore()

    this.sensor.draw(context)
  }

  /**
   * Assess damage
   *
   * @param   {{x: number, y: number}[][]} roadBorders Road borders
   * @param   {Car[]}                      cars        Other cars
   * @returns {void}
   */
  #assessDamage(roadBorders, cars) {
    if (Mathy.hasPolygonIntersection(roadBorders, this.polygon)) {
      this.isDamage = true
    }

    for (const car of cars) {
      if (Mathy.hasPolygonIntersection(car.polygon, this.polygon)) {
        this.isDamage = true
      }
    }
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
    this.centerX -= Math.sin(this.control.angle) * this.speed * t
    this.centerY -= Math.cos(this.control.angle) * this.speed * t
  }

  /**
   * Draw
   *
   * @param   {CanvasRenderingContext2D} context
   * @returns {void}
   */
  #draw(context) {
    this.#buildCarPolygon()

    context.beginPath()
    context.moveTo(this.polygon[0][0].x, this.polygon[0][0].y)
    this.polygon.forEach((segment) => {
      context.lineTo(segment[1].x, segment[1].y)
    })
    context.fill()
  }

  /**
   * Build car polygon
   *
   * @returns {void}
   */
  #buildCarPolygon() {
    this.polygon = []

    const mag = Math.hypot(this.width, this.height) / 2
    const angle = Math.atan2(this.width, this.height)
    const alpha = this.control.angle + angle
    const beta = this.control.angle - angle

    const topLeft = {
      x: this.centerX - Math.sin(alpha) * mag,
      y: this.centerY - Math.cos(alpha) * mag,
    }
    const topRight = {
      x: this.centerX - Math.sin(beta) * mag,
      y: this.centerY - Math.cos(beta) * mag,
    }
    const bottomLeft = {
      x: this.centerX - Math.sin(beta + Math.PI) * mag,
      y: this.centerY - Math.cos(beta + Math.PI) * mag,
    }
    const bottomRight = {
      x: this.centerX - Math.sin(alpha + Math.PI) * mag,
      y: this.centerY - Math.cos(alpha + Math.PI) * mag,
    }

    this.polygon.push(
      [topLeft, bottomLeft],
      [bottomLeft, bottomRight],
      [bottomRight, topRight],
      [topRight, topLeft],
    )
  }
}
