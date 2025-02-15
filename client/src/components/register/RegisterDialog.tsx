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
import { auth, db } from '../../lib/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { SelectRole } from './SelectRole'
import { SelectLocation } from './SelectLocation'
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
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      const user = userCredential.user

      console.log(user)
      formData.userId = user.uid
      localStorage.setItem('userID', user.uid)

      // Insert data into the profile collection
      await setDoc(doc(db, 'profiles', user.uid), {
        user_id: user.uid,
        date_of_birth: formData.dateOfBirth,
        full_name: formData.fullName,
        bio: formData.bio,
        role: formData.role,
        location: formData.location,
        loan_amount: formData.loanAmount,
        interest_rate: formData.interestRate,
        repayment_period: formData.repaymentPeriod,
      })

      // Insert data into the rewards collection
      await setDoc(doc(db, 'rewards', user.uid), {
        user_id: user.uid,
        score: 0
      })

      console.log('User, profile, and rewards data inserted successfully!')
    } catch (error) {
      alert(error.message)
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