import React, { useEffect } from 'react'

type Props = {}

function About({}: Props) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
  return (
    <div className='h-screen w-full flex items-center justify-center'>About</div>
  )
}

export default About