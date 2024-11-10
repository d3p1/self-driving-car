/**
 * @description Traffic car
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import BaseCar from '../car.js'
import Control from './car/control.js'
import Sensor from './car/sensor.js'

export default class Car extends BaseCar {
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
   * @note  Notice that traffic cars have a weaker default force
   *        with respect to the main car to be able to catch
   *        them with the main car
   */
  constructor(
    centerX,
    centerY,
    width = 50,
    height = 100,
    color = 'hsl(200,100%,50%)',
    damageColor = 'hsl(0,0%,30%)',
    force = 100,
    control = new Control(),
    sensor = new Sensor(),
  ) {
    super(
      centerX,
      centerY,
      width,
      height,
      color,
      damageColor,
      force,
      control,
      sensor,
    )
  }
}
