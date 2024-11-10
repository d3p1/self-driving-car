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
   * @type {{x: number, y: number, offset: number}|null[]}
   * @note This array will share the `rays` index.
   *       Its elements will be related to the respective ray
   * @note This array will store the touch with min offset for a ray
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
    this.readings = []
  }

  /**
   * Update
   *
   * @param   {number}                     carAngle
   * @param   {number}                     carCenterX
   * @param   {number}                     carCenterY
   * @param   {{x: number, y: number}[][]} roadBorders
   * @param   {Car[]}                      cars
   * @returns {void}
   */
  update(carAngle, carCenterX, carCenterY, roadBorders, cars) {
    this.#createRaySegments(carAngle, carCenterX, carCenterY)
    this.#processIntersections(roadBorders)
    for (const car of cars) {
      this.#processIntersections(car.polygon)
    }
  }

  /**
   * Draw
   *
   * @param   {CanvasRenderingContext2D} context
   * @returns {void}
   */
  draw(context) {
    for (let i = 0; i < this.rayCount; i++) {
      const ray = this.rays[i]

      this.#drawRay(context, ray)
      if (this.readings[i]) {
        this.#drawRayIntersection(context, ray, this.readings[i])
      }
    }
  }

  /**
   * Process intersections
   *
   * @param   {{x: number, y: number}[][]} roadBorders
   * @returns {void}
   */
  #processIntersections(roadBorders) {
    this.readings = []

    for (let i = 0; i < this.rayCount; i++) {
      const touches = []
      for (let j = 0; j < roadBorders.length; j++) {
        const intersection = Mathy.processSegmentIntersection(
          this.rays[i],
          roadBorders[j],
        )

        if (intersection) {
          touches.push(intersection)
        }
      }

      if (touches.length) {
        this.readings[i] = this.#processTouches(touches)
      } else {
        this.readings[i] = null
      }
    }
  }

  /**
   * Get min touch
   *
   * @param   {{x: number, y: number, offset: number}[]} touches
   * @returns {{x: number, y: number, offset: number}}
   */
  #processTouches(touches) {
    const offsets = touches.map((item) => item.offset)
    const minOffset = Math.min(...offsets)
    return touches.filter((item) => item.offset <= minOffset)[0]
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
   * Draw ray intersection
   *
   * @param   {CanvasRenderingContext2D} context
   * @param   {{x: number, y: number}[]} ray
   * @param   {{x: number, y: number}}   reading
   * @returns {void}
   */
  #drawRayIntersection(context, ray, reading) {
    context.beginPath()
    context.lineWidth = 2
    context.strokeStyle = 'hsl(0,0%,0%)'
    context.moveTo(reading.x, reading.y)
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
      x: carCenterX - Math.sin(rayAngle + carAngle) * this.rayRadius,
      y: carCenterY - Math.cos(rayAngle + carAngle) * this.rayRadius,
    }
    return [start, end]
  }
}
