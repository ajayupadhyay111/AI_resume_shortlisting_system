import image1 from '../../assets/1.png'
import image2 from '../../assets/2.png'
import image3 from '../../assets/3.png'
import Arrow from '../../assets/arrow.png'

const steps = [
    {
        id: 1,
        image: image1,
        title: 'Upload Resumes',
        description: 'Upload resumes in bulk or one by one. Our system supports multiple file formats like PDF and DOCX.',
    },
    {
        id: 2,
        image: image2,
        title: 'AI Processing',
        description: 'Our AI scans, analyzes, and ranks candidates based on skills, experience, and job relevance.',
    },
    {
        id: 3,
        image: image3,
        title: 'Get Results',
        description: ' Instantly view shortlisted candidates with key details to make quick hiring decisions.'
    }
]

type Props = {}

function HowItWorks({ }: Props) {
    return (
        <section className="py-28">
            <div className="container max-w-[1280px] mx-auto px-4">
                <div className="flex justify-center items-center flex-col gap-5">
                    <div className="relative">
                        <h1 className="text-2xl md:text-4xl font-bold px-10">How It Works</h1>
                        <div className="absolute -bottom-4 h-[6px] w-full bg-yellow-600"></div>
                    </div>
                    <div className="mt-10">
                        <h1 className="text-[33px] text-center font-bold md:text-5xl lg:text-7xl md:font-semibold">Three steps for smarter hiring</h1>
                    </div>
                    <div className=' relative flex flex-col md:flex-row  justify-between gap-14 items-center mt-20'>
                        <div className='md:block hidden absolute md:-top-5 lg:-top-14 md:left-40 lg:left-68 h-[6px]'>
                            <img src={Arrow} alt="" className='md:w-48 lg:w-72 rotate-4' />
                        </div>
                        <div className='md:block hidden absolute md:-top-5 lg:-top-14 md:right-40 lg:right-60 h-[6px]'>
                            <img src={Arrow} alt="" className='md:w-40 lg:w-72 rotate-4' />
                        </div>
                        {
                            steps.map((step) => (
                                <div key={step.id} className='flex flex-col gap-5 justify-center items-center'>
                                    <div className='flex flex-col gap-5 justify-center items-center'>
                                        <img src={step.image} alt="" className="w-32 h-32" />
                                        <h1 className="text-2xl font-semibold">
                                            {step.title}
                                        </h1>
                                        <p className="text-gray-500 text-center">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks