import user1 from '../../assets/user 1.png';
import user2 from '../../assets/user 2.png';
import user3 from '../../assets/user 3.png';
import user4 from '../../assets/user 4.png';
import user5 from '../../assets/user 5.png';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';

// import required modules
import { EffectCreative } from 'swiper/modules';


const testimonials = [
    {
        "image": user1,
        "text": "🚀 This AI-powered resume shortlisting system saved me hours of manual work! Finding the right candidate has never been this easy.",
        "name": "Sarah Johnson",
        "role": "HR Manager, TechCorp"
    },
    {
        "image": user2,
        "text": "⚡ I was able to filter through hundreds of resumes in minutes. The AI shortlisting is spot-on and super accurate! A game-changer for recruiters.",
        "name": "Rahul Mehta",
        "role": "Senior Recruiter, HireX"
    },
    {
        "image": user3,
        "text": "🔥 A must-have tool for any recruiter! It made hiring so much faster and more efficient. Highly recommended for HR teams!",
        "name": "Emily Carter",
        "role": "Talent Acquisition Lead, Innovate Inc."
    },
    {
        "image": user4,
        "text": "💡 The resume screening feature is incredibly powerful. It helped us cut down hiring time by 70%! AI-driven recruitment is the future.",
        "name": "Michael Lee",
        "role": "Head of HR, FutureTech"
    },
    {
        "image": user5,
        "text": "✅ Simple, effective, and smart! This platform is exactly what our HR team needed to make recruitment smooth and stress-free.",
        "name": "Jessica Patel",
        "role": "HR Specialist, WorkWise"
    }
]


type Props = {}

function Testimonial({ }: Props) {
    return (
        <section className='py-20 relative'> 
        <div className='boxx absolute bottom-0 left-[50%] top-[55%] translate-x-[-50%] translate-y-[-50%] w-[600px] h-[235px]'></div>
        <div className='container mx-auto flex flex-col items-center'>
            <div className="relative mt-10 w-fit">
                    <h1 className="text-2xl md:text-4xl font-bold px-10">Testimonials</h1>
                    <div className="absolute -bottom-4 h-[6px] w-full bg-yellow-600"></div>
                </div>

            <Swiper
            grabCursor={true}
            effect={'creative'}
            creativeEffect={{
                prev: {
                    shadow: true,
                    translate: [0, 0, -400],
                },
                next: {
                    translate: ['100%', 0, 0],
                },
            }}
            modules={[EffectCreative]}
            className="mySwiper w-[340px] md:w-[600px] h-auto md:h-[235px]"

        >
            {
                testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index} className='flex justify-center items-center bg-white rounded-md'>
                        <div className='text-black p-6 flex flex-col gap-7 justify-between' >
                            <p className='text-[20px] font-normal'>{testimonial.text}</p>
                            <div className='flex items-center gap-4'>
                                <img src={testimonial.image} alt={testimonial.name} className='w-14 h-14 rounded-full' />
                                <div className='text-sm'>
                                    <h3 className='text-md'>{testimonial.name}</h3>
                                    <p className='font-medium pr-3 md:pr-0  text-sm'>{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))
            }

        </Swiper>
        </div>
        </section>
    )
}

export default Testimonial