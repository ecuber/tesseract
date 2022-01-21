import { Matrix, matrix, multiply, sin, cos } from 'mathjs'

export interface Point3D {
  x: number
  y: number
  z: number
  mat: Matrix
}

export const createRotation = (x: number, y: number, z: number): Matrix => {
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

/**
 * Composes matrices from right to left. Order matrices just like you would if you were
 * multiplying them by hand.
 * @param matrices Array of matrices in reverse order of composition.
 * @returns The matrix product of the composition of matrices.
 */
export const composeMatrices = (matrices: Matrix[]): Matrix => (
  matrices.reduce((prev, curr) => multiply(prev, curr))
)

export const createPoint = (x: number, y: number, z: number): Point3D => ({
  x, y, z, mat: matrix([[x], [y], [z]])
})

export const transform = {
  ortho: matrix([ // orthographic projection of 3D to 2D
    [1, 0, 0],
    [0, 1, 0]
  ]),

  // Basic perspective projection: scales points by the reciprocal of the
  // difference between the distance of the "camera" from the origin and the
  // z-value of a given point.
  persp: (distance: number, z: number) => {
    const scale = 1 / (distance - z)
    const proj = matrix([
      [scale, 0, 0],
      [0, scale, 0]
    ])
    return proj
  }
}
