import { Button } from '@/components/ui/button';
import { Label, TextInput } from 'flowbite-react';
import { useState } from 'react';

export default function ProfileSetting() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: '',
    dateOfBirth: '',
  });

  console.log(formData);

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Your submit logic goes here
      console.log('Form submitted:', formData);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      <div className="">
        <h1 className="text-3xl font-medium">Change Password</h1>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* <div>
          <div className="mb-2 block">
            <Label htmlFor="fullName" value="Full Name" />
            <TextInput
              name="fullName"
              id="fullName"
              placeholder="your name"
              required
              type="fullName"
              onChange={handleChange}
            />
          </div>
        </div> */}

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
            <Label htmlFor="password" value="Old Password" />
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
            <Label htmlFor="password" value="New Password" />
            <TextInput
              name="password"
              id="password"
              required
              type="password"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* <div>
          <div className="mb-2 block">
            <Label htmlFor="fullName" value="Old Username" />
            <TextInput
              name="userName"
              id="userName"
              placeholder="your username"
              required
              type="userName"
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="fullName" value="New Username" />
            <TextInput
              name="userName"
              id="userName"
              placeholder="your username"
              required
              type="userName"
              onChange={handleChange}
            />
          </div>
        </div> */}

        {/* Role selection can be integrated here */}

        {/* <div>
          <div className="mb-2 block">
            <Label htmlFor="dateOfBirth" value="Date of birth" />
            <TextInput
              name="dateOfBirth"
              id="dateOfBirth"
              required
              type="date"
              onChange={handleChange}
            />
          </div>
        </div> */}

        <Button type="submit" className="hover:bg-purple-600">
          Save Changes
        </Button>
      </form>
    </div>
  );
}
