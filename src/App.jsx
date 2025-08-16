import { useState } from 'react'
import RandFact  from './components/RandFact'
import Weather from './components/Weather'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <div className="h-screen flex items-center justify-center bg-red-800 sm:text-left">
      <h1 className="text-white text-4xl font-bold underline">
        Hello world

      </h1>
    </div> */}
    <RandFact/> 
    {/* <Weather/> */}
    </>
  )
}

export default App
