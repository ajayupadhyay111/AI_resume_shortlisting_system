import React, { useEffect } from 'react'

type Props = {}

function Contact({}: Props) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className='h-screen w-full flex items-center justify-center'>Contact</div>
    )
}

export default Contact