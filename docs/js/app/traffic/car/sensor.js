/**
 * @description Traffic car sensors
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import BaseSensor from '../../car/sensor.js'

export default class Sensor extends BaseSensor {
  /**
   * Constructor
   */
  constructor() {
    super()

    /**
     * @note Sensor for traffic cars are fake sensor
     */
    this.rayCount = 0
    this.raySpreadAngle = 0
    this.rayRadius = 0
  }
}
