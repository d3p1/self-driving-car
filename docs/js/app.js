/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import Timer from './utils/timer.js'
import Road from './app/road.js'
import Car from './app/car.js'
import CarControl from './app/car/control.js'
import Traffic from './app/traffic.js'
import Camera from './core/camera.js'
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
   * @type {Traffic}
   */
  traffic

  /**
   * @type {Car}
   */
  car

  /**
   * @type {CarControl}
   */
  carControl

  /**
   * @type {Camera}
   */
  camera

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
    this.#initTraffic()
    this.#initCamera()
    this.#initWorld()
    this.#initTimer()
  }

  /**
   * Run
   *
   * @param   {number} t Elapsed time in milliseconds
   *                     since the init of the animation
   * @returns {void}
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
    this.traffic.update(this.timer.delta)
    this.car.update(this.timer.delta, this.road.borders)
    this.world.update(this.timer.delta)
  }

  /**
   * Draw objects
   *
   * @returns {void}
   * @todo    Instead of using a camera to draw, create an instance of a
   *          scene, then pass the scene and the camera to a renderer,
   *          and encapsulate render logic inside that renderer
   */
  #draw() {
    this.camera.draw(this.context, this.canvas.height * 0.7 - this.car.centerY)
  }

  /**
   * Init world
   *
   * @returns {void}
   */
  #initWorld() {
    this.world = new World(50)
    this.world.add(this.carControl, null, null, 'omega', 'alpha')
    this.#addCarToWorld(this.car)
    for (const trafficCar of this.traffic.cars) {
      this.#addCarToWorld(trafficCar)
    }
  }

  /**
   * Init camera
   *
   * @returns {void}
   */
  #initCamera() {
    this.camera = new Camera(this.car, this.road, this.traffic)
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
   * Init traffic
   *
   * @returns {void}
   */
  #initTraffic() {
    this.traffic = new Traffic(this.road, 1)
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
      this.road.getLaneCenterFromLaneIndex(1),
      this.canvas.height - this.canvas.height * 0.2,
      50,
      100,
      'hsl(10,100%,50%)',
      'hsl(0,0%,30%)',
      200,
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
   * Init canvas styles
   *
   * @returns {void}
   */
  #initCanvasStyles() {
    this.canvas.style.backgroundColor = 'hsl(0,0%,93%)'
    this.canvas.style.display = 'block'
    this.canvas.style.margin = '0 auto'
  }

  /**
   * Add a car to the world
   *
   * @param   {Car}  car
   * @returns {void}
   */
  #addCarToWorld(car) {
    this.world.add(car, 'centerX', 'centerY', 'speed', 'acceleration')
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
}
