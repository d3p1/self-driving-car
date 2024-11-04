/**
 * @description Car control
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
export default class Control {
  /**
   * @type {number}
   * @note This is the angular force that will cause acceleration
   * @note For now, it is considered that force cause acceleration without
   *       taking into consideration mass
   *       (acceleration is force divided by mass)
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
   * @param {number} torque
   */
  constructor(torque = 20) {
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
    this.#applyDisplacement(t)
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
   * Apply displacement
   *
   * @param   {number} t Delta time in seconds
   * @returns {void}
   * @note    Displacement is velocity times time
   */
  #applyDisplacement(t) {
    this.angle += this.omega * t
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
      const code = this.#processKeyCode(e.code)

      switch (code) {
        case 'ArrowUp':
          this.forward = true
          break

        case 'ArrowDown':
          this.reverse = true
          break

        case 'ArrowLeft':
          this.left = true
          this.alpha = +this.torque
          break

        case 'ArrowRight':
          this.right = true
          this.alpha = -this.torque
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
   */
  #addKeyUpListener() {
    window.addEventListener('keyup', (e) => {
      const code = this.#processKeyCode(e.code)

      switch (code) {
        case 'ArrowUp':
          this.forward = false
          break

        case 'ArrowDown':
          this.reverse = false
          break

        case 'ArrowLeft':
          this.left = false
          this.alpha = 0
          break

        case 'ArrowRight':
          this.right = false
          this.alpha = 0
          break
      }
    })
  }

  /**
   * Process key code
   *
   * @param   {string} code
   * @returns {string}
   * @note    When the car is in reversed mode,
   *          then left and right should be switched to
   *          make the experience of driving in reverse mode easier
   */
  #processKeyCode(code) {
    if (this.reverse && code === 'ArrowLeft') {
      code = 'ArrowRight'
    } else if (this.reverse && code === 'ArrowRight') {
      code = 'ArrowLeft'
    }
    return code
  }
}
