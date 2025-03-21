import Hero from "@/sections/Home/Hero"
import HowItWorks from "@/sections/Home/HowItWorks"
import Pricing from "@/sections/Home/Pricing"
import Testimonial from "@/sections/Home/Testimonial"
import { useEffect } from "react"

export default function Home() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (    
        <main>
            <Hero />
            <hr className="border-gray-500/50" />
            <Pricing />
            <HowItWorks />
            <Testimonial />
        </main>
    )
}