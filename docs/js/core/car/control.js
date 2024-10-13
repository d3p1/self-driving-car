/**
 * @description Car control
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
export default class Control {
  /**
   * @type {number}
   */
  friction

  /**
   * @type {number}
   * @note This is the angular force
   */
  torque

  /**
   * @type {number}
   * @note This is the angular acceleration. Generally, `alpha` is the
   *       greek letter that denotes angular acceleration
   */
  alpha = 0

  /**
   * @type {number}
   * @note This is the angular velocity. Generally, `omega` is the
   *       greek letter that denotes angular velocity
   */
  omega = 0

  /**
   * @type {number}
   */
  angle = 0

  /**
   * @type {boolean}
   */
  forward = false

  /**
   * @type {boolean}
   */
  reverse = false

  /**
   * @type {boolean}
   */
  left = false

  /**
   * @type {boolean}
   */
  right = false

  /**
   * Constructor
   *
   * @param {number} friction
   * @param {number} torque
   */
  constructor(friction = 0, torque = 20) {
    this.friction = friction
    this.torque = torque

    this.#addKeyListeners()
  }

  /**
   * Update
   *
   * @param   {number} t Delta time in seconds
   * @returns {void}
   * @note    Calculate the car angle based on the pressed key
   */
  update(t) {
    this.#applyAcceleration(t)
    this.#applyFriction(t)
    this.angle += this.omega * t
  }

  /**
   * Apply friction
   *
   * @param   {number} t Delta time in seconds
   * @returns {void}
   * @note    Friction is a force that is always opposite
   *          to the movement/velocity/`omega`.
   *          If there is no movement, there is no friction.
   *          That is why friction decelerates the movement/velocity/`omega`
   *          until it reaches `0`. At that moment, the friction disappears
   */
  #applyFriction(t) {
    if (Math.abs(this.friction) > Math.abs(this.omega)) {
      this.omega = 0
    } else if (this.omega > 0) {
      this.omega -= this.friction * t
    } else if (this.omega < 0) {
      this.omega += this.friction * t
    }
  }

  /**
   * Apply acceleration
   *
   * @param   {number} t Delta time in seconds
   * @returns {void}
   * @note    The acceleration is how much the velocity
   *          is changed in a given time, that is why
   *          the `omega`/angular velocity is changed by the
   *          `alpha`/angular acceleration amount
   */
  #applyAcceleration(t) {
    this.omega += this.alpha * t
  }

  /**
   * Add key listeners
   *
   * @returns {void}
   */
  #addKeyListeners() {
    this.#addKeyDownListener()
    this.#addKeyUpListener()
  }

  /**
   * Add key down listener
   *
   * @returns {void}
   * @note    When left or right arrows are pressed, it is considered that
   *          the user is applying a `torque` to the car. Because `torque` is
   *          an angular force, and every force causes acceleration, then
   *          the `alpha`/angular acceleration is created/generated
   */
  #addKeyDownListener() {
    window.addEventListener('keydown', (e) => {
      switch (e.code) {
        case 'ArrowUp':
          this.forward = true
          break

        case 'ArrowDown':
          this.reverse = true
          break

        case 'ArrowLeft':
          this.left = true
          this.alpha = -this.torque
          break

        case 'ArrowRight':
          this.right = true
          this.alpha = +this.torque
          break
      }
    })
  }

  /**
   * Add key up listener
   *
   * @returns {void}
   * @note    When left or right arrows are released, it is considered that
   *          the user stops applying a `torque` to the car.
   *          Because `torque` is an angular force,
   *          and every force causes acceleration, then
   *          the `alpha`/angular acceleration is removed
   * @todo    For now, we are note going to use friction, and the
   *          `omega`/angular velocity will be reduce immediately to `0`
   *          without any force acting on it
   */
  #addKeyUpListener() {
    window.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'ArrowUp':
          this.forward = false
          break

        case 'ArrowDown':
          this.reverse = false
          break

        case 'ArrowLeft':
          this.left = false
          this.alpha = 0
          this.omega = 0
          break

        case 'ArrowRight':
          this.right = false
          this.alpha = 0
          this.omega = 0
          break
      }
    })
  }
}
