import { useState, useEffect } from 'react'

const useWindowHeight = () => {
  const [height, setheight] = useState(window.innerHeight)

  useEffect(() => {
    const handleResize = () => setheight(window.innerHeight)
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  return height
}

export default useWindowHeight
