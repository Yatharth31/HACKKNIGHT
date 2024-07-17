import { FilterSearch } from '@/components/browse/FilterSearch'
import { Button } from '@/components/ui/button'
import { useSliderStore } from '@/store/useSliderStore'
import { useFormDataStore } from '@/store/formDataStore'
import { supabase } from '../lib/client'
import { CardSlider } from '@/components/browse/CardSlider'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const Header = () => {
  return (
    <section className="mb-8 flex flex-col justify-start text-left">
      <h1 className="capitalize font-medium text-3xl">
        Find your perfect financial match!
      </h1>
      <h2 className="font-light text-md">
        Refine your search to find profiles tailored to your needs.
      </h2>
    </section>
  )
}

async function fetchUserData(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)

  if (error) {
    console.error('Error fetching user data:', error)
    return null
  }
  return data ? data[0] : null // Assuming one row per user
}

const updateFormDataWithFetchedData = (userData, sliderValues) => {
  const updateField = useFormDataStore.getState().updateField

  // Using the updateField method to populate the formDataStore
  updateField('userId', userData.user_id || '') // Assuming user_id is what's fetched from database
  updateField('fullName', userData.full_name || '')
  updateField('email', userData.email || '')
  updateField('role', userData.role || '')
  updateField('dateOfBirth', userData.date_of_birth || '1994-01-01')
  updateField('bio', userData.bio || '')
  updateField('location', userData.location || '')

  // Update the formdatastore with the slider values
  updateField('loanAmount', sliderValues.loanAmount)
  updateField('repaymentPeriod', sliderValues.repaymentPeriod)
  updateField('interestRate', sliderValues.interestRate)
}

export const Browse = () => {
  const [profiles, setProfiles] = useState(null)
  const [showCard, setShowCard] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleInterestedClick = (profileId) => {
    // Fade out animation
    setShowCard(false)

    // After the animation (e.g., 300ms), update the profiles list
    setTimeout(() => {
      const newProfiles = profiles.filter((profile) => profile.id !== profileId)
      setProfiles(newProfiles)
      setShowCard(true) // Prepare for next card
    }, 300)

    // Show the recommendation modal
    setIsModalOpen(true)
  }

  const handleSubmit = async () => {
    const userId = localStorage.getItem('userID')

    if (userId) {
      const userData = await fetchUserData(userId)
      console.log(userData)

      // Get values directly from the slider store
      const sliderValues = useSliderStore.getState()

      // Use a function to update the form data store based on the fetched data and slider values
      updateFormDataWithFetchedData(userData, sliderValues)

      // Log the updated form data
      const formData = useFormDataStore.getState()
      console.log(formData)

      const interestRateTolerance = 2

      let query = supabase.from('profiles').select('*')

      // If the user is a borrower, we don't need to adjust based on loan_amount as lenders don't specify this
      if (userData.role === 'borrower') {
        query = query
          .gte('repayment_period', sliderValues.repaymentPeriod - 3)
          .lte('repayment_period', sliderValues.repaymentPeriod + 3)
          .gte(
            'interest_rate',
            sliderValues.interestRate - interestRateTolerance
          )
          .lte(
            'interest_rate',
            sliderValues.interestRate + interestRateTolerance
          )
          .neq('role', 'borrower')
      } else if (userData.role === 'lender') {
        // If the user is a lender, adjust loan_amount based on slider for searching borrowers
        if (sliderValues.loanAmount !== 10000) {
          query = query
            .gte('loan_amount', sliderValues.loanAmount - 2000)
            .lte('loan_amount', sliderValues.loanAmount + 2000)
        } else {
          query = query.gte('loan_amount', sliderValues.loanAmount - 2000)
        }

        query = query
          .gte('repayment_period', sliderValues.repaymentPeriod - 3)
          .lte('repayment_period', sliderValues.repaymentPeriod + 3)
          .gte(
            'interest_rate',
            sliderValues.interestRate - interestRateTolerance
          )
          .lte(
            'interest_rate',
            sliderValues.interestRate + interestRateTolerance
          )
          .neq('role', 'lender')
      }

      const { data, error } = await query
      if (error) {
        console.error('Error fetching user data:', error)
        return null
      }

      console.log(data)
      setProfiles(data)
    }
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="p-8 flex-grow">
          <Header />
          <FilterSearch />
          <Button className="mr-4" onClick={handleSubmit}>
            Search
          </Button>

          <div className="flex items-center justify-center h-1/2">
            <div className="w-96">
              {/* Assuming CardSlider has a prop to handle the 'Interested' button click */}
              {profiles && (
                <CardSlider
                  profiles={profiles}
                  onInterestedClick={handleInterestedClick}
                />
              )}
            </div>
          </div>
        </div>

        {/* Modal for recommendation */}
      </div>
    </>
  )
}
