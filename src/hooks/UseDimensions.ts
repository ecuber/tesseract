import { useEffect, useState } from 'react'

const getWidth = (): number => window.innerWidth ??
document.documentElement.clientWidth ??
document.body.clientWidth

const getHeight = (): number => window.innerHeight ??
document.documentElement.clientHeight ??
document.body.clientHeight

export const useDimensions = (): number[] => {
  const [width, setWidth] = useState(getWidth())
  const [height, setHeight] = useState(getHeight())
  useEffect(() => {
    const resizeListener = (): void => {
      setWidth(getWidth())
      setHeight(getHeight())
    }
    window.addEventListener('resize', resizeListener)

    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  return [width, height]
}
