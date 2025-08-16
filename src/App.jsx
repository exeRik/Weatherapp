import { useState } from 'react'

import Weatherr from './components/Weatherr'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <div className="h-screen flex items-center justify-center bg-red-800 sm:text-left">
      <h1 className="text-white text-4xl font-bold underline">
        Hello world

      </h1>
    </div> */}
    <Weatherr/>
    </>
  )
}

export default App
