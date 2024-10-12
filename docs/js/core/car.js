/**
 * @description Car
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
export default class Car {
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
   * @param {number} centerX
   * @param {number} centerY
   * @param {number} width
   * @param {number} height
   */
  constructor(centerX, centerY, width, height) {
    this.centerX = centerX
    this.centerY = centerY
    this.width = width
    this.height = height
  }

  /**
   * Update car
   *
   * @param   {number} t
   * @returns {void}
   */
  update(t) {
    console.log(t)
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
    context.beginPath()
    context.rect(
      this.centerX - this.width / 2,
      this.centerY - this.height / 2,
      this.width,
      this.height,
    )
    context.fill()
  }
}
