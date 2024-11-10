/**
 * @description World object
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        For now, just the `velocity` getter and setter will be used,
 *              but it is added other property getters and setters
 *              for possible future requirements
 */
export default class Obj {
  /**
   * @type {object}
   */
  instance

  /**
   * @type {string|null}
   */
  positionXPropName

  /**
   * @type {string|null}
   */
  positionYPropName

  /**
   * @type {string|null}
   */
  velocityPropName

  /**
   * @type {string|null}
   */
  accelerationPropName

  /**
   * Constructor
   *
   * @param {object}      instance
   * @param {string|null} positionXPropName
   * @param {string|null} positionYPropName
   * @param {string|null} velocityPropName
   * @param {string|null} accelerationPropName
   */
  constructor(
    instance,
    positionXPropName,
    positionYPropName,
    velocityPropName,
    accelerationPropName,
  ) {
    this.instance = instance
    this.positionXPropName = positionXPropName
    this.positionYPropName = positionYPropName
    this.velocityPropName = velocityPropName
    this.accelerationPropName = accelerationPropName
  }

  /**
   * Get x coordinate
   *
   * @returns {number|null}
   */
  get positionX() {
    if (this.instance[this.positionXPropName]) {
      return this.instance[this.positionXPropName]
    }
    return null
  }

  /**
   * Set x coordinate
   *
   * @param   {number} x
   * @returns {void}
   */
  set positionX(x) {
    if (this.positionXPropName) {
      this.instance[this.positionXPropName] = x
    }
  }

  /**
   * Get y coordinate
   *
   * @returns {number|null}
   */
  get positionY() {
    if (this.positionYPropName) {
      return this.instance[this.positionYPropName]
    }
    return null
  }

  /**
   * Set y coordinate
   *
   * @param   {number} y
   * @returns {void}
   */
  set positionY(y) {
    if (this.positionYPropName) {
      this.instance[this.positionYPropName] = y
    }
  }

  /**
   * Get velocity
   *
   * @returns {number|null}
   */
  get velocity() {
    if (this.velocityPropName) {
      return this.instance[this.velocityPropName]
    }
    return null
  }

  /**
   * Set velocity
   *
   * @param   {number} velocity
   * @returns {void}
   */
  set velocity(velocity) {
    if (this.velocityPropName) {
      this.instance[this.velocityPropName] = velocity
    }
  }

  /**
   * Get acceleration
   *
   * @returns {number|null}
   */
  get acceleration() {
    if (this.accelerationPropName) {
      return this.instance[this.accelerationPropName]
    }
    return null
  }

  /**
   * Set acceleration
   *
   * @param   {number} acceleration
   * @returns {void}
   */
  set acceleration(acceleration) {
    if (this.accelerationPropName) {
      this.instance[this.accelerationPropName] = acceleration
    }
  }
}
