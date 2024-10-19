/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import Timer from './utils/timer.js'
import Road from './core/road.js'
import Car from './core/car.js'
import CarControl from './core/car/control.js'
import World from './core/world.js'

export default class App {
  /**
   * @type {World}
   */
  world

  /**
   * @type {Road}
   */
  road

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
   */
  constructor() {
    this.#initCanvas()
    this.#initRoad()
    this.#initCarControl()
    this.#initCar()
    this.#initWorld()
    this.#initTimer()
  }

  /**
   * Run
   *
   * @param   {number} t Elapsed time in milliseconds
   *                     since the init of the animation
   * @returns {void}
   * @todo    Encapsulate logic of context `save()`, `translate()`
   *          and `restore()` related to camera movement
   */
  run(t = 0) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.#update(t)
    this.#draw()
    requestAnimationFrame(this.run.bind(this))
  }

  /**
   * Update objects
   *
   * @param {number} t Elapsed time in milliseconds
   *                   since the init of the animation
   * @returns {void}
   */
  #update(t) {
    this.timer.update(t)
    this.car.update(this.timer.delta, this.road.borders)
    this.world.update(this.timer.delta)
  }

  /**
   * Draw objects
   *
   * @returns {void}
   * @note    It is used a translation of the coordinate origin
   *          with respect to the car position
   *          to generate the effect of road movement
   */
  #draw() {
    this.context.save()
    this.context.translate(0, -this.car.centerY * 0.3)
    this.road.draw(this.context)
    this.car.draw(this.context)
    this.context.restore()
  }

  /**
   * Init world
   *
   * @returns {void}
   */
  #initWorld() {
    this.world = new World(10)
    this.world.add(this.carControl, null, null, 'omega', 'alpha')
    this.world.add(this.car, 'centerX', 'centerY', 'speed', 'acceleration')
  }

  /**
   * Init road
   *
   * @returns {void}
   */
  #initRoad() {
    this.road = new Road(this.canvas.width / 2, this.canvas.width * 0.9)
  }

  /**
   * Init car control
   *
   * @returns {void}
   */
  #initCarControl() {
    this.carControl = new CarControl(25)
  }

  /**
   * Init car
   *
   * @returns {void}
   */
  #initCar() {
    this.car = new Car(
      this.road.getLaneCenterFromLaneIndex(2),
      this.canvas.height - this.canvas.height * 0.1,
      50,
      100,
      500,
      this.carControl,
    )
  }

  /**
   * Init timer
   *
   * @returns {void}
   */
  #initTimer() {
    this.timer = new Timer()
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
