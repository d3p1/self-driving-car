/**
 * @description Math utility
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
export default class Mathy {
  /**
   * Linear interpolation between two points
   *
   * @param   {number} A
   * @param   {number} B
   * @param   {number} t
   * @returns {number}
   */
  static lerp(A, B, t) {
    return A + (B - A) * t
  }

  /**
   * Process segment intersection
   *
   * @param   {{x: number, y: number}[]}                    AB
   * @param   {{x: number, y: number}[]}                    CD
   * @returns {{x: number, y: number, offset: number}|null}
   * @note    The offset returned is related to the first segment
   */
  static processSegmentIntersection(AB, CD) {
    /**
     * @note To calculate segment intersection, we are going to
     *       resolve a system of two equations that derives
     *       from applying `lerp` to determine the shared point
     *       between the two segments
     *
     *       ```
     *       x = AX + (BX - AX) * t
     *       y = AY + (BY - AY) * t
     *       x = CX + (DX - CX) * u
     *       y = CY + (DY - CY) * u
     *
     *       AX + (BX - AX) * t                = CX + (DX - CX) * u
     *       (AX + tBX - tAX - CX) / (DX - CX) = u
     *
     *       AX + (BX - AX) * t = CX + (DX - CX) * u
     *                        t = (CX + uDX - uCX - AX) / (BX - AX)
     *
     *       AY + (BY - AY) * t                = CY + (DY - CY) * u
     *       (AY + BYt - AYt - CY) / (DY - CY) = u
     *
     *       AY + (BY - AY) * t = CY + (DY - CY) * u
     *                        t = (CY + DYu - CYu - AY) / (BY - AY)
     *
     *       (AX + tBX - tAX - CX) / (DX - CX) = (AY + BYt - AYt - CY) / (DY - CY)
     *       (AX + tBX - tAX - CX) * (DY - CY) = (AY + BYt - AYt - CY) * (DX - CX)
     *
     *       (CX + uDX - uCX - AX) / (BX - AX) = (CY + DYu - CYu - AY) / (BY - AY)
     *       (CX + uDX - uCX - AX) * (BY - AY) = (CY + DYu - CYu - AY) * (BX - AX)
     *
     *       (AX)(DY) + (tBX)(DY) - (tAX)(DY) - (CX)(DY) - (AX)(CY) - (tBX)(CY) + (tAX)(CY) + (CX)(CY)     = (AY)(DX) + (BYt)(DX) - (AYt)(DX) - (CY)(DX) - (AY)(CX) - (BYt)(CX) + (AYt)(CX) + (CY)(CX)
     *       (tBX)(DY) - (tAX)(DY) - (tBX)(CY) + (tAX)(CY) - (BYt)(DX) + (AYt)(DX) + (BYt)(CX) - (AYt)(CX) = (AY)(DX) - (CY)(DX) - (AY)(CX) + (CY)(CX) - (AX)(DY) + (CX)(DY) + (AX)(CY) - (CX)(CY)
     *       t ((BX)(DY) - (AX)(DY) - (BX)(CY) + (AX)(CY) - (BY)(DX) + (AY)(DX) + (BY)(CX) - (AY)(CX))     = (AY)(DX) - (CY)(DX) - (AY)(CX) + (CY)(CX) - (AX)(DY) + (CX)(DY) + (AX)(CY) - (CX)(CY)
     *
     *       (CX)(BY) + (uDX)(BY) - (uCX)(BY) - (AX)(BY) - (CX)(AY) - (uDX)(AY) + (uCX)(AY) + (AX)(AY)     = (CY)(BX) + (DYu)(BX) - (CYu)(BX) - (AY)(BX) - (CY)(AX) - (DYu)(AX) + (CYu)(AX) + (AY)(AX)
     *       (uDX)(BY) - (uCX)(BY) - (uDX)(AY) + (uCX)(AY) - (DYu)(BX) + (CYu)(BX) + (DYu)(AX) - (CYu)(AX) = (CY)(BX) - (AY)(BX) - (CY)(AX) + (AY)(AX) - (CX)(BY) + (AX)(BY) + (CX)(AY) - (AX)(AY)
     *       u ((DX)(BY) - (CX)(BY) - (DX)(AY) + (CX)(AY) - (DY)(BX) + (CY)(BX) + (DY)(AX) - (CY)(AX))     = (CY)(BX) - (AY)(BX) - (CY)(AX) + (AY)(AX) - (CX)(BY) + (AX)(BY) + (CX)(AY) - (AX)(AY)
     *
     *       t = ((AY)(DX) - (CY)(DX) - (AY)(CX) + (CY)(CX) - (AX)(DY) + (CX)(DY) + (AX)(CY) - (CX)(CY)) / ((BX)(DY) - (AX)(DY) - (BX)(CY) + (AX)(CY) - (BY)(DX) + (AY)(DX) + (BY)(CX) - (AY)(CX))
     *       u = ((CY)(BX) - (AY)(BX) - (CY)(AX) + (AY)(AX) - (CX)(BY) + (AX)(BY) + (CX)(AY) - (AX)(AY)) / ((DX)(BY) - (CX)(BY) - (DX)(AY) + (CX)(AY) - (DY)(BX) + (CY)(BX) + (DY)(AX) - (CY)(AX))
     *       ```
     */
    const AX = AB[0].x
    const BX = AB[1].x
    const AY = AB[0].y
    const BY = AB[1].y
    const CX = CD[0].x
    const DX = CD[1].x
    const CY = CD[0].y
    const DY = CD[1].y

    const tNumerator =
      AY * DX -
      CY * DX -
      AY * CX +
      CY * CX -
      AX * DY +
      CX * DY +
      AX * CY -
      CX * CY
    const tDivider =
      BX * DY -
      AX * DY -
      BX * CY +
      AX * CY -
      BY * DX +
      AY * DX +
      BY * CX -
      AY * CX
    const uNumerator =
      CY * BX -
      AY * BX -
      CY * AX +
      AY * AX -
      CX * BY +
      AX * BY +
      CX * AY -
      AX * AY
    const uDivider =
      DX * BY -
      CX * BY -
      DX * AY +
      CX * AY -
      DY * BX +
      CY * BX +
      DY * AX -
      CY * AX

    if (tDivider !== 0) {
      const t = tNumerator / tDivider
      const u = uNumerator / uDivider
      if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        return {
          x: this.lerp(AB[0].x, AB[1].x, t),
          y: this.lerp(AB[0].y, AB[1].y, t),
          offset: t,
        }
      }
    }
    return null
  }

  /**
   * Validate if the polygons intersect
   *
   * @param  {{x: number, y: number}[][]} polyA
   * @param  {{x: number, y: number}[][]} polyB
   * @return boolean
   */
  static hasPolygonIntersection(polyA, polyB) {
    for (const segmentA of polyA) {
      for (const segmentB of polyB) {
        if (this.processSegmentIntersection(segmentA, segmentB)) {
          return true
        }
      }
    }
    return false
  }
}
