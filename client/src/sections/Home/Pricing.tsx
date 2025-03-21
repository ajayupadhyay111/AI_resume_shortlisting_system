import { Button } from "@/components/ui/button"

const pricing = [
    {

        title: "Personal Plan",
        subtitle: "For Individual Recruiters & Small-Scale Hiring",
        price: "Basic Plan – Free",
        features: ["Upload up to 10 resumes per day", "100% free", "No credit card required", "AI-powered resume screening"],
        button: "Get Started"
    },
    {
        title: "Standard Plan",
        subtitle: "For Growing Teams & Efficient Shortlisting",
        price: "₹1499/month",
        features: ["Upload up to 500 resumes per month", "AI-powered resume shortlisting", "Download shortlisted resumes", "Basic search & filter options"],
        button: "Purchase Now"
    },
    {
        title: "Enterprise Plan",
        subtitle: "For Enterprises with High-Volume Hiring Needs",
        price: "₹3999/month",
        features: ["Unlimited resume uploads", "Advanced AI shortlisting", "Custom search & filters", "Priority support"],
        button: "Purchase Now"
    },

]

type Props = {}

function Pricing({ }: Props) {
    return (
        <section className="py-20">
            <div className="container max-w-[1280px] flex flex-col justify-center items-center mx-auto px-4">
                <div className="relative">
                    <h1 className="text-4xl font-bold px-10">Pricing</h1>
                    <div className="absolute -bottom-4 h-[6px] w-full bg-yellow-600"></div>
                </div>
                <div className="relative grid grid-cols-1 md:grid-cols-4 w-full lg:grid-cols-3 gap-5 mt-32">
                  {
                    pricing.map((item, index) => (
                        <div key={index} className={`bg-gray-900/40 p-5 md:col-span-2 lg:col-span-1 rounded-lg flex flex-col gap-9 border border-yellow-400 backdrop-blur-lg overflow-hidden ${index===1?"lg:scale-105":""} ${index === 2 ? "md:col-start-2" : ""}`}>
                        <div className="boxx absolute bottom-0 left-[50%] translate-x-[-50%]"></div>
                        <button className="px-4 py-1 backdrop-blur-md border w-fit border-gray-500/70 rounded-full bg-gray-400/20 text-[12px]">{item.title}</button>
                        <div className="flex flex-col gap-2">
                            <h2 className="text-3xl font-bold">{item.price}</h2>
                            <p className="text-gray-400">{item.subtitle}</p>
                        </div>
                        <hr />
                        <div>
                            <ul className="flex flex-col gap-3">
                                {
                                    item.features.map((feature, index) => (
                                        <li key={index}>✔ {feature}</li>
                                    ))
                                }
                                
                            </ul>
                        </div>
                        <button className={`border border-yellow-500/50 hover:bg-yellow-500/10 transition-all duration-300 bg-gray-400/10 rounded-sm px-4 py-3 ${index===1?"bg-yellow-500/20 border-yellow-500 hover:bg-yellow-500/30":"bg-gray-400/10 border-gray-500/70"}`}>{item.button}</button>
                    </div>
                    ))
                  }

                    
                </div>
            </div>
        </section>
    )
}

export default Pricing