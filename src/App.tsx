import { useDimensions } from './hooks/UseDimensions'
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { Canvas3D, Canvas4D, CenVert, Checkbox, ControlPanel, SliderContainer, SwitchButton } from './components'
import { useState } from 'react'

export const planes = ['zw', 'yw', 'yz', 'xw', 'xz', 'xy'] as const
export type pName = typeof planes[number]

export const axes = ['x', 'y', 'z'] as const
export type aName = typeof axes[number]

const App = (): JSX.Element => {
  const { pathname } = useLocation()
  const [fourD, setFourD] = useState(['/', '/4d'].includes(pathname))
  const [speed, setSpeed] = useState(50)
  const [selectedAxes, setSelectedAxes] = useState(['x', 'y', 'z'] as aName[])
  const [selectedPlanes, setSelectedPlanes] = useState(['yz', 'xw'] as pName[])
  const [width, height] = useDimensions()
  const primary = '#434a91'

  const handleChange = (toggle: string): void => {
    const curState = (fourD ? selectedPlanes : selectedAxes) as string[]
    const index = curState.indexOf(toggle)

    if (index !== -1) {
      curState.splice(index, 1)
    } else {
      curState.push(toggle)
    }

    if (fourD) {
      setSelectedPlanes(curState as pName[])
    } else {
      setSelectedAxes(curState as aName[])
    }
  }

  const rotatables = fourD
    ? ['zw', 'yw', 'yz', 'xw', 'xz', 'xy']
    : ['x', 'y', 'z']

  return <>
    <ControlPanel>
      <CenVert flex={5}>
        <div>
          <em><strong>speed: {speed}%</strong></em>
          <SliderContainer>
            <Slider trackStyle={{ background: primary }} handleStyle={{ borderColor: primary }} defaultValue={speed} min={0} max={100} onChange={setSpeed}/>
          </SliderContainer>
        </div>
      </CenVert>
      <CenVert flex={6}>
        <form>
          <div style={{ marginBottom: '0.3em' }}>
            <em><strong>{fourD ? 'rotation planes:' : 'rotation axes:'}</strong></em></div>
          {
          rotatables.map(item => {
            return (
              <label key={ item }>
                <Checkbox
                  primary={primary}
                  onChange={() => {
                    handleChange(item)
                  }}
                  defaultChecked={
                    fourD
                      ? selectedPlanes.includes(item as pName)
                      : selectedAxes.includes(item as aName)
                    }
                  type="checkbox"
                />
                <span>{ item }</span>
              </label>
            )
          })
          }
        </form>
      </CenVert>
      <CenVert>
        <Link style={{ textDecoration: 'none' }} onClick={() => setFourD(!fourD)} to={fourD ? '/3d' : '/4d'}>
          <SwitchButton primary={fourD}>{fourD ? 'switch to cube' : 'switch to tesseract'}</SwitchButton>
        </Link>
      </CenVert>
    </ControlPanel>
    <Routes>
      <Route
        path='/4d'
        element={
        <Canvas4D
          speed={speed / 100}
          width={width}
          height={height}
          selectedPlanes={selectedPlanes}
        />}
      />
      <Route
        path='/3d'
        element={
        <Canvas3D
          speed={speed / 100}
          width={width}
          height={height}
          selectedAxes={selectedAxes}
        />
      }
      />
      <Route
        path="/"
        element={<Navigate replace to='/4d'/>}
      />
    </Routes>
  </>
}

export default App
