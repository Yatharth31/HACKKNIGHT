import { Button } from '@/components/ui/button'
import '../../App.css'
import { RegisterDialog } from '../register/RegisterDialog'

export default function Hero() {
  return (
    <div
      className="hero mr-40 ml-40"
      style={{ marginTop: '70px', marginBottom: '70px' }}
    >
      <div className="hero-content">
        <div className="text-content">
          <h1 className="hero-text">Swipe Cash</h1>
          <p className="tagline">
            Connecting Lenders and Borrowers, Instantly!
          </p>
          <p className="subtitle">
            Discover a new, intuitive way to match with financial peers. Whether
            you're lending or borrowing, we've got you covered.
          </p>
          <RegisterDialog />
        </div>
      </div>
      <img alt="Loander Logo" className="hero-image" src="hero_image.svg" />
    </div>
  )
}
