import { SupportAccordion } from '@/components/support/SupportAccordion'
import { SupportForm } from '@/components/support/SupportForm'

const Header = () => {
  return (
    <section className="mb-8 flex flex-col justify-start text-left">
      <h1 className="capitalize font-medium text-3xl">Get the help you need</h1>
      <h2 className="font-light text-md">
        Find answers to common questions or reach out directly to our team.
        We're here to assist you!
      </h2>
    </section>
  )
}

export const Support = () => {
  return (
    <>
      <div className="p-8">
        <Header />
        <SupportAccordion />
      </div>
      <div className="flex justify-center">
        <SupportForm />
      </div>
    </>
  )
}
