/* eslint-disable prefer-const */
// p5.js needs access to actual variables rather than state
import Sketch from 'react-p5'
import p5Types from 'p5'
import { multiply } from 'mathjs'
import { transform, createPoint, createRotation, composeMatrices, Point3D } from './mathutils'

interface PropTypes {
  width: number
  height: number
}

let rotation = 0

const vertices: Point3D[] = []

for (let i = 0; i < 8; i++) {
  const pattern = [0.5, 0.5, -0.5, -0.5]
  const x = pattern[(i + 1) % 4]
  const y = pattern[i % 4]
  const z = i < 4 ? 0.5 : -0.5
  vertices.push(createPoint(x, y, z))
}

// console.log(vertices)

type r2pt = [number, number]

const drawEdge = (p5: p5Types, p1: r2pt, p2: r2pt): void => {
  p5.strokeWeight(5)
  p5.stroke('black')
  // p5.line(p1[0], p1[1], p2[0], p2[1])
  p5.line(...p1, ...p2)
}

const Canvas = ({ width, height }: PropTypes): JSX.Element => {
  const setup = (p5: p5Types, canvasParentRef: Element): void => {
    p5.createCanvas(width, height).parent(canvasParentRef)
  }

  const draw = (p5: p5Types): void => {
    // translate coordinate system—origin in center
    p5.translate(width / 2, height / 2)
    p5.scale(1, -1)

    p5.background('lightgray')

    const pts: r2pt[] = []

    vertices.forEach(({ x, y, z, mat }, index) => {
      const rotMatrix = createRotation(rotation, rotation, rotation)
      const rotated = composeMatrices([rotMatrix, mat])
      const projected = composeMatrices([transform.persp(2, rotated.get([2, 0])), rotated])
      const coords: r2pt = multiply([projected.get([0, 0]), projected.get([1, 0])], 300)
      pts.push(coords)

      p5.strokeWeight(12)
      p5.stroke('black')
      p5.point(...coords)
    })

    const colors = [
      'rgba(255, 74, 74, 0.5)',
      'rgba(255, 178, 36, 0.498)',
      'rgba(255, 251, 31, 0.498)',
      'rgba(66, 255, 66, 0.498)',
      'rgba(58, 225, 255, 0.5)',
      'rgba(199, 0, 199, 0.498)'
    ]

    // TODO: procedurally generate the face combinations
    const faces = [
      [pts[0], pts[1], pts[2], pts[3]],
      [pts[1], pts[2], pts[6], pts[5]],
      [pts[2], pts[3], pts[7], pts[6]],
      [pts[3], pts[7], pts[4], pts[0]],
      [pts[0], pts[1], pts[5], pts[4]],
      [pts[4], pts[5], pts[6], pts[7]]
    ]

    // p5.strokeWeight(4)
    p5.noStroke()

    faces.forEach((face, i) => {
      p5.fill(colors[i])
      p5.beginShape()
      p5.vertex(...face[0])
      p5.vertex(...face[1])
      p5.vertex(...face[2])
      p5.vertex(...face[3])
      p5.endShape('close')
    })

    p5.strokeWeight(3)

    for (let i = 0; i < 4; i++) {
      drawEdge(p5, pts[i], pts[(i + 1) % 4])
      drawEdge(p5, pts[i + 4], pts[(i + 1) % 4 + 4])
      drawEdge(p5, pts[i], pts[i + 4])
    }

    rotation += 0.02
  }

  return <Sketch setup={setup} draw={draw}/>
}

export default Canvas
