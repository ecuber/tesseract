/* eslint-disable prefer-const */
// p5.js needs access to actual variables rather than state
import Sketch from 'react-p5'
import p5Types from 'p5'
import { chain, multiply } from 'mathjs'
import {
  transform3d,
  createPoint4D,
  createRotation4D,
  composeMatrices,
  Point4D,
  transform4d
} from './mathutils'

interface PropTypes {
  width: number
  height: number
  speed: number
}

let rotation = 0

const vertices: Point4D[] = []

// Generate points in R4. All dimensions are ±0.5 from 0.
let j = 0
for (let i = 0; i < 16; i++) {
  const pattern = [0.5, 0.5, -0.5, -0.5]
  const x = pattern[(i + 1) % 4]
  const y = pattern[i % 4]
  if (i % 4 === 0) { j++ }
  const z = j % 2 === 0 ? 0.5 : -0.5
  const w = i < 8 ? 0.5 : -0.5
  vertices.push(createPoint4D(x, y, z, w))
}

type r2pt = [number, number]

const colors = [
  'rgba(255, 74, 74, 0.35)',
  'rgba(255, 191, 72, 0.4)',
  'rgba(255, 251, 31, 0.4)',
  'rgba(66, 255, 66, 0.4)',
  'rgba(58, 225, 255, 0.4)',
  'rgba(199, 0, 199, 0.4)',
  'rgba(199, 71, 199, 0.4)',
  'rgba(110, 230, 252, 0.4)',
  'rgba(121, 248, 121, 0.4)',
  'rgba(252, 250, 105, 0.4)',
  'rgba(250, 203, 116, 0.4)',
  'rgba(250, 111, 111, 0.35)'
]

const drawEdge = (p5: p5Types, p1: r2pt, p2: r2pt): void => {
  p5.strokeWeight(5)
  p5.stroke('black')
  p5.line(...p1, ...p2)
}

const Canvas = ({ width, height, speed }: PropTypes): JSX.Element => {
  const setup = (p5: p5Types, canvasParentRef: Element): void => {
    p5.createCanvas(width, height).parent(canvasParentRef)
  }

  const windowResized = (p5: p5Types): void => {
    p5.resizeCanvas(width, height)
  }

  const draw = (p5: p5Types): void => {
    // translate coordinate system—origin in center
    p5.translate(width / 2, height / 2)
    p5.scale(1, -1)

    p5.background('#ebebeb')

    const pts: r2pt[] = []

    vertices.forEach(({ x, y, z, mat }, index) => {
      const rotMatrix = createRotation4D(0, 0, rotation, rotation, 0, 0)
      const rotated = composeMatrices([rotMatrix, mat])
      const projectedTo3D = composeMatrices([transform4d.persp(1.2, rotated.get([3, 0])), rotated])
      const projectedTo2D = composeMatrices([transform3d.persp(2, projectedTo3D.get([2, 0])), projectedTo3D])

      const coords: r2pt = multiply([projectedTo2D.get([0, 0]), projectedTo2D.get([1, 0])], 200) // scale from mathematical unit scale to 200 px
      pts.push(coords)

      p5.stroke('#000000')
      p5.strokeWeight(12)
      p5.point(...coords)
    })

    // TODO: procedurally generate the face combinations
    const cubePoints = [
      [0, 1, 2, 3],
      [1, 2, 6, 5],
      [2, 3, 7, 6],
      [3, 7, 4, 0],
      [0, 1, 5, 4],
      [4, 5, 6, 7]
    ]

    const faces = (offset: number): r2pt[][] => chain(cubePoints).add(offset).mod(pts.length).done().map((indexes: number[]) => indexes.map(i => pts[i]))

    p5.noStroke() // double lines make things messy
    const toDraw = [faces(0), faces(8)]

    for (let i = 0; i < 7; i++) {
      toDraw.push([[i + 8, i + 9, i + 1, i].map(i => pts[i])])
    }

    const fillFace = (face: r2pt[], color: string): void => {
      p5.fill(color)
      p5.beginShape()
      p5.vertex(...face[0])
      p5.vertex(...face[1])
      p5.vertex(...face[2])
      p5.vertex(...face[3])
      p5.endShape('close')
    }

    toDraw.forEach(set => {
      set.forEach((face, i) => {
        fillFace(face, colors[i % colors.length])
      })
    })

    // algorithm inspired by coding train
    const drawCube = (offset: number): void => {
      for (let i = 0; i < 4; i++) {
        drawEdge(p5, pts[i + offset], pts[(i + 1) % 4 + offset])
        drawEdge(p5, pts[i + 4 + offset], pts[(i + 1) % 4 + 4 + offset])
        drawEdge(p5, pts[i + offset], pts[i + 4 + offset])
      }
    }

    // draw edges, starting with inner/outer cube, and then connecting them
    p5.strokeWeight(3)
    drawCube(0)
    drawCube(8)
    for (let i = 0; i < 8; i++) {
      drawEdge(p5, pts[i], pts[i + 8])
    }

    rotation += 0.04 * speed
  }

  return <Sketch windowResized={windowResized} setup={setup} draw={draw}/>
}

export default Canvas
