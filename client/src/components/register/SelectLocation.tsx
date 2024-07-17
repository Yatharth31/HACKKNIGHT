import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFormDataStore } from '@/store/formDataStore'
import { useState } from 'react'

export function SelectLocation() {
  // const [value, setValue] = useState('')

  // const handleValueChange = (newValue) => {
  //   setValue(newValue)
  //   if (onChange) {
  //     // notify parent component of new value
  //     onChange(newValue)
  //   }
  // }

  const location = useFormDataStore((state) => state.location)
  const updateField = useFormDataStore((state) => state.updateField)

  const handleValueChange = (newValue) => {
    updateField('location', newValue)
  }

  return (
    <Select value={location} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Choose your role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>I want to be a...</SelectLabel>
          <SelectItem value="melbourne">melbourne</SelectItem>
          <SelectItem value="sydney">sydney</SelectItem>
          <SelectItem value="brisbane">brisbane</SelectItem>
          <SelectItem value="perth">perth</SelectItem>
          <SelectItem value="adelaide">adelaide</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
