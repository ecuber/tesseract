import { useState } from 'react'
import Canvas from './components/Canvas'

const App = (): JSX.Element => {
  const [orthographic, setOrtho] = useState<boolean>(false)

  return <Canvas style={orthographic ? 'orthographic' : 'perspective'} width={500} height={500}/>
}

export default App
