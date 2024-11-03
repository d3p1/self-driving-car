/**
 * @description Camera
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
export default class Camera {
  /**
   * @type {Car}
   */
  car

  /**
   * @type {Road}
   */
  road

  /**
   * Constructor
   *
   * @param {Car}  car
   * @param {Road} road
   */
  constructor(car, road) {
    this.car = car
    this.road = road
  }

  /**
   * Draw
   *
   * @param   {CanvasRenderingContext2D} context
   * @param   {number}                   focus
   * @returns {void}
   * @note    It is used a translation of the coordinate origin
   *          with respect to the car position
   *          to generate the effect of road movement
   */
  draw(context, focus) {
    context.save()
    context.translate(0, focus)
    this.road.draw(context)
    this.car.draw(context)
    context.restore()
  }
}
