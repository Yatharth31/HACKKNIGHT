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

export function SelectRole() {
  // const [value, setValue] = useState('')

  // const handleValueChange = (newValue) => {
  //   setValue(newValue)
  //   if (onChange) {
  //     // notify parent component of new value
  //     onChange(newValue)
  //   }
  // }

  const role = useFormDataStore((state) => state.role)
  const updateField = useFormDataStore((state) => state.updateField)

  const handleValueChange = (newValue) => {
    updateField('role', newValue)
  }

  return (
    <Select value={role} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Choose your role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>I want to be a...</SelectLabel>
          <SelectItem value="lender">lender</SelectItem>
          <SelectItem value="borrower">borrower</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
