/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import Timer from './utils/timer.js'
import Car from './core/car.js'

export default class App {
  /**
   * @type {Car}
   */
  car

  /**
   * @type {Timer}
   */
  timer

  /**
   * @type {CanvasRenderingContext2D}
   */
  context

  /**
   * @type {HTMLCanvasElement}
   */
  canvas

  /**
   * Constructor
   */
  constructor(car = new Car(0, 0, 50, 100), timer = new Timer()) {
    this.#initCanvas()
    this.#initCar(car)
    this.timer = timer
  }

  /**
   * Run
   *
   * @param   {number} t Elapsed time in milliseconds
   *                     since the init of the animation
   * @returns {void}
   */
  run(t = 0) {
    this.timer.update(t)

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.car.update(this.timer.delta)
    this.car.draw(this.context)

    requestAnimationFrame(this.run.bind(this))
  }

  /**
   * Init car
   *
   * @param   {Car}  car
   * @returns {void}
   */
  #initCar(car) {
    this.car = car
    this.car.centerX = this.canvas.width / 2
    this.car.centerY = this.canvas.height / 2
  }

  /**
   * Init canvas
   *
   * @returns {void}
   */
  #initCanvas() {
    this.canvas = document.createElement('canvas')
    this.context = this.canvas.getContext('2d')

    this.#initCanvasStyles()
    this.#resizeCanvas()

    window.addEventListener('resize', this.#resizeCanvas.bind(this))

    document.body.appendChild(this.canvas)
  }

  /**
   * Resize canvas
   *
   * @returns {void}
   */
  #resizeCanvas() {
    this.canvas.width = window.innerWidth / 3
    this.canvas.height = window.innerHeight
  }

  /**
   * Init canvas styles
   *
   * @returns {void}
   */
  #initCanvasStyles() {
    this.canvas.style.backgroundColor = 'hsl(0,0%,93%)'
    this.canvas.style.display = 'block'
    this.canvas.style.margin = '0 auto'
  }
}
