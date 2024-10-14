/**
 * @description World
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        For now, this class is created as a way to encapsulate the
 *              friction logic that is being applied to the objects.
 *              In the future, other features could be added to its scope
 */
import Obj from './world/obj.js'

export default class World {
  /**
   * @type {Obj[]}
   */
  objects = []

  /**
   * @type {number}
   */
  friction

  /**
   * Constructor
   *
   * @param {number} friction
   */
  constructor(friction) {
    this.friction = friction
  }

  /**
   * Add an object to the world
   *
   * @param   {object}      object
   * @param   {string|null} positionXPropName
   * @param   {string|null} positionYPropName
   * @param   {string|null} velocity
   * @param   {string|null} acceleration
   * @returns {void}
   */
  add(object, positionXPropName, positionYPropName, velocity, acceleration) {
    this.objects.push(
      new Obj(
        object,
        positionXPropName,
        positionYPropName,
        velocity,
        acceleration,
      ),
    )
  }

  /**
   * Update world
   *
   * @param   {number} t Delta time in seconds
   * @returns {void}
   */
  update(t) {
    for (const object of this.objects) {
      this.#applyFriction(t, object)
    }
  }

  /**
   * Apply friction
   *
   * @param   {number} t      Delta time in seconds
   * @param   {Obj}    object World object
   * @returns {void}
   * @note    Friction is a force that is always opposite
   *          to the movement/velocity.
   *          If there is no movement, there is no friction.
   *          That is why friction decelerates the movement/velocity
   *          until it reaches `0`. At that moment, the friction disappears
   */
  #applyFriction(t, object) {
    const dragEffect = this.friction * t

    if (dragEffect >= Math.abs(object.velocity)) {
      object.velocity = 0
    } else if (object.velocity > 0) {
      object.velocity -= dragEffect
    } else if (object.velocity < 0) {
      object.velocity += dragEffect
    }
  }
}
