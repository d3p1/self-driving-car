/**
 * @description Road
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */

/**
 * @const {number} INFINITY
 * @note  It is mentioned that working with native infinity constant could
 *        cause issues during calculation
 */
const INFINITY = 100000000

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
   * Constructor
   *
   * @param {number} centerX
   * @param {number} width
   * @param {string} color
   * @param {number} lineWidth
   * @param {number} laneCount
   */
  constructor(
    centerX,
    width,
    color = 'hsl(0,0%,100%)',
    lineWidth = 3,
    laneCount = 3,
  ) {
    this.centerX = centerX
    this.width = width
    this.color = color
    this.lineWidth = lineWidth
    this.laneCount = laneCount

    this.#initRoadParameters()
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
      context.moveTo(border[0].x, border[0].y)
      context.lineTo(border[1].x, border[1].y)
      context.stroke()
    })
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
    this.top = 0
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
