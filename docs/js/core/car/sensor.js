/**
 * @description Car sensors
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import Mathy from '../../utils/mathy.js'

export default class Sensor {
  /**
   * @type {{x: number, y: number}[][]}
   */
  rays

  /**
   * @type {{x: number, y: number, offset: number}[][]}
   * @note This array will share the `rays` index.
   *       Its elements will be related to the respective ray
   */
  touches

  /**
   * @type {{x: number, y: number, offset: number}[][]}
   * @note This array will share the `rays` index.
   *       Its elements will be related to the respective ray
   * @note This array will store the touch with min offset fora ray
   */
  readings

  /**
   * @type {number}
   */
  rayRadius

  /**
   * @type {number}
   */
  raySpreadAngle

  /**
   * @type {number}
   */
  rayCount

  /**
   * Constructor
   *
   * @param {number} rayCount
   * @param {number} raySpreadAngle
   * @param {number} rayRadius
   */
  constructor(rayCount = 5, raySpreadAngle = Math.PI / 2, rayRadius = 300) {
    this.rayCount = rayCount
    this.raySpreadAngle = raySpreadAngle
    this.rayRadius = rayRadius
    this.rays = []
    this.touches = []
    this.readings = []
  }

  /**
   * Update
   *
   * @param   {number} carAngle
   * @param   {number} carCenterX
   * @param   {number} carCenterY
   * @returns {void}
   */
  update(carAngle, carCenterX, carCenterY) {
    this.#createRaySegments(carAngle, carCenterX, carCenterY)
  }

  /**
   * Draw
   *
   * @param   {CanvasRenderingContext2D} context
   * @returns {void}
   */
  draw(context) {
    for (const ray of this.rays) {
      this.#drawRay(context, ray)
    }
  }

  /**
   * Draw ray
   *
   * @param   {CanvasRenderingContext2D} context
   * @param   {{x: number, y: number}[]} ray
   * @returns {void}
   */
  #drawRay(context, ray) {
    context.beginPath()
    context.lineWidth = 2
    context.strokeStyle = 'hsl(45,100%,50%)'
    context.moveTo(ray[0].x, ray[0].y)
    context.lineTo(ray[1].x, ray[1].y)
    context.stroke()
  }

  /**
   * Create ray segments
   *
   * @param   {number} carAngle
   * @param   {number} carCenterX
   * @param   {number} carCenterY
   * @returns {{x: number, y: number}[][]}
   */
  #createRaySegments(carAngle, carCenterX, carCenterY) {
    this.rays = []

    const spreadAngle = this.raySpreadAngle / 2
    for (let i = 0; i < this.rayCount; i++) {
      const angle = Mathy.lerp(
        spreadAngle,
        -spreadAngle,
        i / (this.rayCount === 1 ? 0.5 : this.rayCount - 1),
      )
      this.rays.push(
        this.#createRaySegment(angle, carAngle, carCenterX, carCenterY),
      )
    }
  }

  /**
   * Create ray segment
   *
   * @param   {number} rayAngle
   * @param   {number} carAngle
   * @param   {number} carCenterX
   * @param   {number} carCenterY
   * @returns {{x: number, y: number}[]}
   */
  #createRaySegment(rayAngle, carAngle, carCenterX, carCenterY) {
    const start = {
      x: carCenterX,
      y: carCenterY,
    }
    const end = {
      x: carCenterX - Math.sin(rayAngle - carAngle) * this.rayRadius,
      y: carCenterY - Math.cos(rayAngle - carAngle) * this.rayRadius,
    }
    return [start, end]
  }
}
