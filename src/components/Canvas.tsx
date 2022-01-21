/* eslint-disable prefer-const */
// p5.js needs access to actual variables rather than state
import { projectionType } from '../types'
import Sketch from 'react-p5'
import p5Types from 'p5'
import { multiply } from 'mathjs'
import { transform, createPoint, createRotation, composeMatrices, Point3D } from './mathutils'

interface PropTypes {
  style: projectionType
  width: number
  height: number
}

let rotation = 0

const vertices: Point3D[] = [
  createPoint(0.5, 0.5, 0.5),
  createPoint(-0.5, 0.5, 0.5),
  createPoint(-0.5, -0.5, 0.5),
  createPoint(0.5, -0.5, 0.5),
  createPoint(0.5, 0.5, -0.5),
  createPoint(-0.5, 0.5, -0.5),
  createPoint(-0.5, -0.5, -0.5),
  createPoint(0.5, -0.5, -0.5)
]

// for (let i = 0; i < 8; i++) {
//   const x = (i + 1) % 2 !== 0 || (i + 2) % 2 !== 0 ? 0.5 : -0.5
//   const y = (i + 1) % 3 !== 0 || (i + 2) % 4 !== 0 ? 0.5 : -0.5
//   const z = i < 3 ? 0.5 : -0.5
//   vertices.push(createPoint(x, y, z))
// }
// console.log(vertices)

type r2pt = [number, number]

const drawEdge = (p5: p5Types, p1: r2pt, p2: r2pt): void => {
  p5.strokeWeight(5)
  p5.stroke('black')
  p5.line(p1[0], p1[1], p2[0], p2[1])
}

const Canvas = ({ width, height, style }: PropTypes): JSX.Element => {
  const setup = (p5: p5Types, canvasParentRef: Element): void => {
    p5.createCanvas(width, height).parent(canvasParentRef)
  }

  const draw = (p5: p5Types): void => {
    // translate coordinate system—origin in center
    p5.translate(width / 2, height / 2)
    p5.scale(1, -1)

    p5.background('lightgray')

    p5.strokeWeight(3)
    p5.stroke('purple')
    p5.point(0, 0)

    const points: r2pt[] = []

    vertices.forEach(({ x, y, z, mat }, index) => {
      const rotMatrix = createRotation(0.5 * rotation, rotation, rotation)
      // const rotMatrix = createRotation(Math.PI / 8, Math.PI / 4, Math.PI / 8)
      const rotated = composeMatrices([rotMatrix, mat])
      const projected = composeMatrices([transform.persp(2, rotated.get([2, 0])), rotated])
      const coords: r2pt = multiply([projected.get([0, 0]), projected.get([1, 0])], 300)
      points.push(coords)

      p5.strokeWeight(10)
      p5.stroke('black')
      p5.point(coords[0], coords[1])
    })

    for (let i = 0; i < 6; i++) {
      if (i < 4) {
        drawEdge(p5, points[i], points[(i + 1) % 4])
        drawEdge(p5, points[i + 4], points[(i + 1) % 4 + 4])
        drawEdge(p5, points[i], points[i + 4])
      }
    }

    rotation += 0.02
  }

  return <Sketch setup={setup} draw={draw}/>
}

export default Canvas
