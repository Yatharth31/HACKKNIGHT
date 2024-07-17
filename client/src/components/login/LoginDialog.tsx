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
import { auth } from '../../lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export function LoginDialog({ setToken }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  console.log(formData)

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)
      const user = userCredential.user
      console.log(user)
      setToken(user)
      // You might want to adjust how you're setting the token, depending on your app's needs
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Log in</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Enter your credentials to access your account.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              name="email"
              id="email"
              placeholder="name@loander.com"
              required
              type="email"
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              name="password"
              id="password"
              required
              type="password"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <DialogFooter>
            <Button type="submit" className="hover:bg-purple-600">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}