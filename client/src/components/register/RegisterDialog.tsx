import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Checkbox, Label, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { supabase } from '../../lib/client'
import { SelectRole } from './SelectRole'
import { SelectLocation } from './SelectLocation'
import { id } from 'create-javascript-project'
import { useFormDataStore } from '@/store/formDataStore'

export function RegisterDialog() {
  const formData = useFormDataStore((state) => state)
  const updateField = useFormDataStore((state) => state.updateField)

  console.log(formData)

  function handleChange(event) {
    updateField(event.target.name, event.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (error) throw error
      console.log(data)
      console.log(typeof data.user.id)
      formData.userId = data.user.id
      localStorage.setItem('userID', data.user.id)

      // insert data into the profile table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            user_id: formData.userId,
            date_of_birth: formData.dateOfBirth,
            full_name: formData.fullName,
            bio: formData.bio,
            role: formData.role,
            location: formData.location,
            loan_amount: formData.loanAmount,
            interest_rate: formData.interestRate,
            repayment_period: formData.repaymentPeriod,
          },
        ])

      if (profileError) throw profileError

      console.log('User and profile data inserted successfully!')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4">Get started today</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create an account</DialogTitle>
          <DialogDescription>It's now or never!</DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="fullName" value="Full Name" />
              <TextInput
                name="fullName"
                id="fullName"
                placeholder="your name"
                required
                type="text"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
              <TextInput
                name="email"
                id="email"
                placeholder="name@loander.com"
                required
                type="email"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
              <TextInput
                name="password"
                id="password"
                required
                type="password"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="role" value="Your role" />
              <SelectRole onChange={handleChange} />
            </div>
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="dateOfBirth" value="Date of birth" />
              <TextInput
                name="dateOfBirth"
                id="dateOfBirth"
                required
                type="date"
                onChange={handleChange}
                value={formData.dateOfBirth}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="location" value="Your state" />
              <SelectLocation onChange={handleChange} />
            </div>
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="bio" value="Bio" />
              <TextInput
                name="bio"
                id="bio"
                required
                type="text"
                onChange={handleChange}
                value={formData.bio}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" className="hover:bg-purple-600">
              Sign Up
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
