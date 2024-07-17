import { Slider } from '@/components/ui/slider'
import {
  SliderState,
  SliderValues,
  useSliderStore,
} from '@/store/useSliderStore'

type SliderProps = React.ComponentProps<typeof Slider>

interface SliderFilterProps extends SliderProps {
  label: string
  min: number
  max: number
}

const toCamelCase = (str: string) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
    if (+match === 0) return ''
    return index === 0 ? match.toLowerCase() : match.toUpperCase()
  })
}

const getSliderValue = (
  state: SliderValues,
  key: keyof SliderValues
): number => {
  return state[key]
}

export function SliderFilter({ label, min, max, step }: SliderFilterProps) {
  const sliderName = toCamelCase(label)

  const sliderValue = useSliderStore((state) =>
    getSliderValue(state, sliderName as keyof SliderState)
  )

  const setSliderValue = useSliderStore((state) => state.setSliderValue)

  return (
    <div className="sm:w-[20%] sm:mr-16 my-4">
      {label && <label className="block mb-2">{label}</label>}
      <Slider
        value={[sliderValue]}
        // defaultValue={[]}
        min={min}
        max={max}
        step={step}
        onValueChange={(values) => setSliderValue(sliderName, values[0])}
      />

      {/* display the slider value */}
      <div className="mt-2 text-sm text-gray-600">
        Current value: {sliderValue}
      </div>
    </div>
  )
}
