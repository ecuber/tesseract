import { Matrix, matrix, multiply, sin, cos } from 'mathjs'

// TYPES

export interface Point3D {
  x: number
  y: number
  z: number
  mat: Matrix
}

export interface Point4D {
  x: number
  y: number
  z: number
  w: number
  mat: Matrix
}

// 3D UTILS

export const createRotation3D = (x: number, y: number, z: number): Matrix => {
  const xRot = matrix([
    [1, 0, 0],
    [0, cos(x), -sin(x)],
    [0, sin(x), cos(x)]
  ])

  const yRot = matrix([
    [cos(y), 0, sin(y)],
    [0, 1, 0],
    [-sin(y), 0, cos(y)]
  ])

  const zRot = matrix([
    [cos(z), -sin(z), 0],
    [sin(z), cos(z), 0],
    [0, 0, 1]
  ])

  // composition of the 3 rotations
  return composeMatrices([xRot, yRot, zRot])
}

export const createPoint3D = (x: number, y: number, z: number): Point3D => ({
  x, y, z, mat: matrix([[x], [y], [z]])
})

// 4D UTILS

/**
 * Generates a rotation matrix based on the rotation angles about the planes defined
 * by the intersections of the x, y, z, and w axes.
 *
 * Matrices found at https://math.stackexchange.com/a/3311905/967336
 *
 * @param zw Rotation angle about zw plane
 * @param yw Rotation angle about yw plane
 * @param yz Rotation angle about yz plane
 * @param xw Rotation angle about xw plane
 * @param xz Rotation angle about xz plane
 * @param xy Rotation angle about xy plane
 * @returns Resulting rotation matrix
 */
export const createRotation4D = (
  zw: number,
  yw: number,
  yz: number,
  xw: number,
  xz: number,
  xy: number
): Matrix => {
  const zwRot = matrix([
    [cos(zw), -sin(zw), 0, 0],
    [sin(zw), cos(zw), 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ])

  const ywRot = matrix([
    [cos(yw), 0, -sin(yw), 0],
    [0, 1, 0, 0],
    [sin(yw), 0, cos(yw), 0],
    [0, 0, 0, 1]
  ])

  const yzRot = matrix([
    [cos(yz), 0, 0, -sin(yz)],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [sin(yz), 0, 0, cos(yz)]
  ])

  const xwRot = matrix([
    [1, 0, 0, 0],
    [0, cos(xw), -sin(xw), 0],
    [0, sin(xw), cos(xw), 0],
    [0, 0, 0, 1]
  ])

  const xzRot = matrix([
    [1, 0, 0, 0],
    [0, cos(xz), 0, -sin(xz)],
    [0, 0, 1, 0],
    [0, sin(xz), 0, cos(xz)]
  ])

  const xyRot = matrix([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, cos(xy), -sin(xy)],
    [0, 0, sin(xy), cos(xy)]
  ])

  // composition of the 3 rotations
  return composeMatrices([zwRot, ywRot, yzRot, xwRot, xzRot, xyRot])
}

export const createPoint4D = (
  x: number,
  y: number,
  z: number,
  w: number
): Point4D => ({
  x, y, z, w, mat: matrix([[x], [y], [z], [w]])
})

// GENERAL UTILS

/**
 * Composes matrices from right to left. Order matrices just like you would if you were
 * multiplying them by hand.
 * @param matrices Array of matrices in reverse order of composition.
 * @returns The matrix product of the composition of matrices.
 */
export const composeMatrices = (matrices: Matrix[]): Matrix => (
  matrices.reduce((prev, curr) => multiply(prev, curr))
)

export const transform4d = {
  ortho: matrix([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
  ]),
  /**
   * Generates stereographic projection matrix.
   *
   * @param distance The camera's calculated distance from the origin.
   * @param w The z value of the point being projected.
   * @returns A matrix with domain R4, codomain R3
   */
  persp: (distance: number, w: number) => {
    const scale = 1 / (distance - w)
    const proj = matrix([
      [scale, 0, 0, 0],
      [0, scale, 0, 0],
      [0, 0, scale, 0]
    ])
    return proj
  }
}

export const transform3d = {
  ortho: matrix([
    [1, 0, 0],
    [0, 1, 0]
  ]),

  /**
   * Generates stereographic projection matrix.
   *
   * @param distance The camera's calculated distance from the origin.
   * @param z The z value of the point being projected.
   * @returns A matrix with domain R3, codomain R2
   */
  persp: (distance: number, z: number) => {
    const scale = 1 / (distance - z)
    const proj = matrix([
      [scale, 0, 0],
      [0, scale, 0]
    ])
    return proj
  }
}
