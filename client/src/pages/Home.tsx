import Hero from '@/components/home/hero' // Import your Hero component
import Intro from '@/components/home/intro'
import How from '@/components/home/howitworks'
import Testimonials from '@/components/home/testimonials'
import Why from '@/components/home/whychooseloander'
import '../App.css'

export function Home() {
  return (
    <div>
      <Hero /> {/*Hero component */}
      <div className="line"></div> {/* Black line */}
      <Intro /> {/* Intro component */}
      <div className="line"></div> {/* Black line */}
      <div>
        <h1 className="section-title mt-20">How Loander works</h1>
      </div>
      <How /> {/* How it works component */}
      <div className="max-w-full testimonial-section pt-10 pb-1">
        <h1 className="section-title text-white">Testimonials</h1>
        <Testimonials />
      </div>
      <Why />
      <div className="line"></div> {/* Black line */}
    </div>
  )
}
