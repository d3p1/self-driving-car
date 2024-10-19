/**
 * @description Road
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import Mathy from '../utils/mathy.js'

/**
 * @const {number} INFINITY
 * @note  It is mentioned that working with native infinity constant could
 *        cause issues during calculation
 */
const INFINITY = 10000000

export default class Road {
  /**
   * @type {{x: number, y: number}[][]}
   */
  borders

  /**
   * @type {number}
   */
  top

  /**
   * @type {number}
   */
  bottom

  /**
   * @type {number}
   */
  left

  /**
   * @type {number}
   */
  right

  /**
   * @type {number}
   */
  centerX

  /**
   * @type {number}
   */
  width

  /**
   * @type {string}
   */
  color

  /**
   * @type {number}
   */
  lineWidth

  /**
   * @type {number}
   */
  laneCount

  /**
   * @type {number}
   */
  laneDelimiterHeight

  /**
   * @type {number}
   */
  laneDelimiterGap

  /**
   * Constructor
   *
   * @param {number} centerX
   * @param {number} width
   * @param {string} color
   * @param {number} lineWidth
   * @param {number} laneCount
   * @param {number} laneDelimiterHeight
   * @param {number} laneDelimiterGap
   */
  constructor(
    centerX,
    width,
    color = 'hsl(0,0%,100%)',
    lineWidth = 3,
    laneCount = 3,
    laneDelimiterHeight = 20,
    laneDelimiterGap = 20,
  ) {
    this.centerX = centerX
    this.width = width
    this.color = color
    this.lineWidth = lineWidth
    this.laneCount = laneCount
    this.laneDelimiterHeight = laneDelimiterHeight
    this.laneDelimiterGap = laneDelimiterGap

    this.#initRoadParameters()
  }

  /**
   * Get the lane center
   *
   * @param   {number} laneIndex Index that defines lane position
   *                             (starting at `0` from left to right)
   * @returns {number}
   */
  getLaneCenterFromLaneIndex(laneIndex) {
    return Mathy.lerp(
      this.left,
      this.right,
      (Math.min(laneIndex, this.laneCount - 1) + 1) / this.laneCount -
        (1 / this.laneCount) * 0.5,
    )
  }

  /**
   * Draw the road
   *
   * @param   {CanvasRenderingContext2D} context
   * @returns {void}
   */
  draw(context) {
    context.save()

    context.strokeStyle = this.color
    context.lineWidth = this.lineWidth
    this.#drawBorders(context)
    this.#drawLanes(context)

    context.restore()
  }

  /**
   * Draw the road borders
   *
   * @param   {CanvasRenderingContext2D} context
   * @returns {void}
   */
  #drawBorders(context) {
    this.borders.forEach((border) => {
      context.beginPath()
      this.#drawLine(
        context,
        {
          x: border[0].x,
          y: border[0].y,
        },
        {
          x: border[1].x,
          y: border[1].y,
        },
      )
    })
  }

  /**
   * Draw the road lanes
   *
   * @param   {CanvasRenderingContext2D} context
   * @returns {void}
   */
  #drawLanes(context) {
    context.setLineDash([this.laneDelimiterHeight, this.laneDelimiterGap])
    for (let i = 1; i < this.laneCount; i++) {
      const x = Mathy.lerp(this.left, this.right, i / this.laneCount)
      this.#drawLine(
        context,
        {
          x: x,
          y: this.top,
        },
        {
          x: x,
          y: this.bottom,
        },
      )
    }
  }

  /**
   * Draw line
   *
   * @param   {CanvasRenderingContext2D} context
   * @param   {{x: number, y: number}}   start
   * @param   {{x: number, y: number}}   end
   * @returns {void}
   */
  #drawLine(context, start, end) {
    context.beginPath()
    context.moveTo(start.x, start.y)
    context.lineTo(end.x, end.y)
    context.stroke()
  }

  /**
   * Init road parameters
   *
   * @returns {void}
   * @note    It is considered that the road will always start at the top of
   *          the canvas
   */
  #initRoadParameters() {
    this.left = this.centerX - this.width / 2
    this.right = this.centerX + this.width / 2
    this.top = -INFINITY
    this.bottom = INFINITY

    const topLeft = {x: this.left, y: this.top}
    const bottomLeft = {x: this.left, y: this.bottom}
    const topRight = {x: this.right, y: this.top}
    const bottomRight = {x: this.right, y: this.bottom}
    this.borders = [
      [topLeft, bottomLeft],
      [topRight, bottomRight],
    ]
  }
}
