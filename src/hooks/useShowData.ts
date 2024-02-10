import { useEffect, useState } from 'react'

export const useShowData = (text: string) => {
  const [textToShow, setTextToShow] = useState('')

  useEffect(() => {
    let t = ''
    let i = 0
    const interval = setInterval(() => {
      t += text[i]
      setTextToShow(t)
      i++
      if (i === text.length) {
        clearInterval(interval)
      }
    }, 50)

    return () => {
      clearInterval(interval)
    }
  }, [text])

  return [textToShow]
}
