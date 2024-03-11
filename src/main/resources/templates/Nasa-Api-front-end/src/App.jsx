import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NasaDataComponent from './components/NasaDataComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
       <NasaDataComponent/>
      </div>
     
    </>
  )
}

export default App
