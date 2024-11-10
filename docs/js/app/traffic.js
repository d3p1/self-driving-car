/**
 * @description Traffic
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import Car from './traffic/car.js'

export default class Traffic {
  /**
   * @type {Car[]}
   */
  cars = []

  /**
   * @type {Road}
   */
  road

  /**
   * Constructor
   *
   * @param {Road}   road
   * @param {number} numCars
   */
  constructor(road, numCars) {
    this.road = road
    for (let i = 0; i < numCars; i++) {
      this.cars.push(this.#createCar())
    }
  }

  /**
   * Update traffic
   *
   * @param   {number} t Delta time in seconds
   * @returns {void}
   */
  update(t) {
    for (const car of this.cars) {
      car.update(t)
    }
  }

  /**
   * Draw traffic
   *
   * @param   {CanvasRenderingContext2D} context
   * @returns {void}
   */
  draw(context) {
    for (const car of this.cars) {
      car.draw(context)
    }
  }

  /**
   * Create a traffic car
   *
   * @returns {Car}
   */
  #createCar() {
    return new Car(
      this.road.getLaneCenterFromLaneIndex(Math.round(Math.random() * 2)),
      -100 + Math.random() * -200,
    )
  }
}
