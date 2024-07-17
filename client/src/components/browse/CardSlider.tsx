import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar } from 'flowbite-react'

export function CardSlider({ profiles, onInterestedClick }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentProfile = profiles[currentIndex]

  useEffect(() => {
    if (currentIndex < 0) {
      setCurrentIndex(profiles.length - 1)
    } else if (currentIndex >= profiles.length) {
      setCurrentIndex(0)
    }
  }, [currentIndex, profiles])

  const handleNext = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1)
    }
  }

  if (profiles.length === 0) return <div>No profiles available.</div>

  return (
    <div>
      <Card className="min-w-full h-full mt-16">
        <CardHeader>
          <Avatar />
          <CardTitle>{currentProfile.full_name}</CardTitle>
          <CardDescription>{currentProfile.role}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <div className="text-sm">
              <span className="font-semibold">Bio:</span> {currentProfile.bio}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Location:</span>{' '}
              {currentProfile.location}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Date of Birth:</span>{' '}
              {currentProfile.date_of_birth}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Interest Rate:</span>{' '}
              {currentProfile.interest_rate}%
            </div>

            {currentProfile.role !== 'lender' && (
              <div className="text-sm">
                <span className="font-semibold">Loan Amount:</span> $
                {currentProfile.loan_amount}
              </div>
            )}

            <div className="text-sm">
              <span className="font-semibold">Repayment Period:</span>{' '}
              {currentProfile.repayment_period} months
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handlePrev} variant="outline">
            Previous
          </Button>
          <Button onClick={handleNext}>Next</Button>
          <Button>Interested</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
