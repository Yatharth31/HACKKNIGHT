import { useSliderStore } from '@/store/useSliderStore'
import { Button } from '../ui/button'
import { SliderFilter } from './SliderFilter'

export const FilterSearch = () => {
  const resetSliders = useSliderStore((state) => state.resetSliders)

  return (
    <>
      <div className="flex sm:flex-row flex-col items-center">
        <SliderFilter step={1000} min={1000} max={10000} label="Loan Amount" />
        <SliderFilter step={0.5} min={1} max={12} label="Repayment Period" />
        <SliderFilter step={0.5} min={4} max={10} label="Interest Rate" />

        <Button className="ml-4 bg-gray-500" onClick={resetSliders}>
          Reset
        </Button>
      </div>
    </>
  )
}
