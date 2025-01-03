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
   * @type {Traffic}
   */
  traffic

  /**
   * Constructor
   *
   * @param {Car}     car
   * @param {Road}    road
   * @param {Traffic} traffic
   */
  constructor(car, road, traffic) {
    this.car = car
    this.road = road
    this.traffic = traffic
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
    this.traffic.draw(context)
    this.car.draw(context)
    context.restore()
  }
}
