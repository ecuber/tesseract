import { useState, useEffect } from 'react'
import Canvas from './components/Canvas'

const App = (): JSX.Element => {
  const [rerender, forceRerender] = useState(1)

  const getWidth = (): number => window.innerWidth ??
  document.documentElement.clientWidth ??
  document.body.clientWidth

  const getHeight = (): number => window.innerHeight ??
  document.documentElement.clientHeight ??
  document.body.clientHeight

  const useDimensions = (): number[] => {
    const [width, setWidth] = useState(getWidth())
    const [height, setHeight] = useState(getHeight())
    useEffect(() => {
      const resizeListener = (): void => {
        setWidth(getWidth())
        setHeight(getHeight())
        forceRerender(rerender + 1)
      }
      window.addEventListener('resize', resizeListener)

      return () => {
        window.removeEventListener('resize', resizeListener)
      }
    }, [])

    return [width, height]
  }

  const [width, height] = useDimensions()
  return <Canvas key={rerender} width={width} height={height}/>
}

export default App
