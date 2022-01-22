import { useDimensions } from './hooks/UseDimensions'
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import styled from '@emotion/styled'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import Canvas3D from './components/Canvas3D'
import Canvas4D from './components/Canvas4D'
import { useState } from 'react'

interface ButtonProps {
  primary: boolean
}

const SwitchButton = styled.div<ButtonProps>`
  background-color: ${props =>
    props.primary ? '#bfe1be' : '#e9d2d6'
  };
  color: black;
  font-size: 18px;
  padding: 10px;
  :hover {
    background-color: ${props =>
      props.primary ? '#a0d89f' : '#f4bbc4'}
  }
  transition: background-color 0.3s ease-in-out;
  font-style: italic;
  font-weight: bold;
`
const ControlPanel = styled.div`
  position: absolute;
  margin: 1em;
  background-color: lightgray;
  padding: 1.3em;
  display: flex;
`

const SliderContainer = styled.div`
  margin-right: 1em;
  padding-top: 0.2em;
  width: 200px;
  align-content: center;
  
`

const App = (): JSX.Element => {
  const { pathname } = useLocation()
  const [fourD, setFourD] = useState(['/', '/4d'].includes(pathname))
  const [speed, setSpeed] = useState(50)
  const [width, height] = useDimensions()
  const primary = '#434a91'

  return <>
    <ControlPanel>
      <div>
        <em><strong>speed: {speed}%</strong></em>
        <SliderContainer>
          <Slider trackStyle={{ background: primary }} handleStyle={{ borderColor: primary }} defaultValue={speed} min={0} max={100} onChange={setSpeed}/>
        </SliderContainer>
      </div>
      <Link onClick={() => setFourD(!fourD)} to={fourD ? '/3d' : '/4d'}>
        <SwitchButton primary={fourD}>{fourD ? 'switch to cube' : 'switch to tesseract'}</SwitchButton>
      </Link>
    </ControlPanel>
    <Routes>
      <Route
        path='/4d'
        element={<Canvas4D speed={speed / 100} width={width} height={height}/>}
      />
      <Route
        path='/3d'
        element={<Canvas3D speed={speed / 100} width={width} height={height}/>}
      />
      <Route
        path="/"
        element={<Navigate replace to='/4d'/>}
      />
    </Routes>
  </>
}

export default App
