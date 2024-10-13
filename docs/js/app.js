/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import Timer from './utils/timer.js'
import Car from './core/car.js'
import CarControl from './core/car/control.js'
import World from './core/world.js'

export default class App {
  /**
   * @type {World}
   */
  world

  /**
   * @type {Car}
   */
  car

  /**
   * @type {CarControl}
   */
  carControl

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
   *
   * @param {World}      world
   * @param {CarControl} carControl
   * @param {Car}        car
   * @param {Timer}      timer
   */
  constructor(
    world = new World(10),
    carControl = new CarControl(25),
    car = new Car(0, 0, 50, 100, 500, carControl),
    timer = new Timer(),
  ) {
    this.#initCanvas()
    this.#initCarControl(carControl)
    this.#initCar(car)
    this.#initWorld(world, carControl, car)
    this.#initTimer(timer)
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
    this.world.update(this.timer.delta)
    this.car.update(this.timer.delta)
    this.car.draw(this.context)

    requestAnimationFrame(this.run.bind(this))
  }

  /**
   * Init world
   *
   * @param   {World}      world
   * @param   {CarControl} carControl
   * @param   {Car}        car
   * @returns {void}
   */
  #initWorld(world, carControl, car) {
    this.world = world
    this.world.add(carControl, null, null, 'omega', 'alpha')
    this.world.add(car, 'centerX', 'centerY', 'velocity', 'acceleration')
  }

  /**
   * Init car control
   *
   * @param   {CarControl} carControl
   * @returns {void}
   */
  #initCarControl(carControl) {
    this.carControl = carControl
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
   * Init timer
   *
   * @param   {Timer} timer
   * @returns {void}
   */
  #initTimer(timer) {
    this.timer = timer
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
