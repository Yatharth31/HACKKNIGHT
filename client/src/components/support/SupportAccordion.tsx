import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function SupportAccordion() {
  const accordionData = [
    {
      id: 'question-1',
      question: 'How does Loander ensure secure transactions?',
      answer:
        'While Loander provides a platform to match lenders and borrowers, all actual transactions are managed through trusted third-party payment platforms to ensure security and transparency.',
    },
    {
      id: 'question-2',
      question:
        'Can I change my role from a lender to a borrower or vice versa?',
      answer:
        "Yes, you can request a role change from your profile settings. However, ensure that you don't have any active loans before making the switch.",
    },
    {
      id: 'question-3',
      question: "What should I do if I can't find a suitable match?",
      answer:
        "Don't worry! Our platform constantly updates with new users. We recommend revisiting after a few days or adjusting your preferences to increase your matching chances.",
    },
    {
      id: 'question-4',
      question: 'Is there a fee for using Loander?',
      answer:
        'As of now, Loander is free to use for both lenders and borrowers. We aim to make financial connections accessible to everyone.',
    },
    {
      id: 'question-5',
      question: 'How can I report a user or a suspicious activity?',
      answer:
        'Your safety is our top priority. If you encounter any suspicious activities or users, please report them immediately using our contact form below or email us directly at support@Loander.com.',
    },
  ]

  return (
    <>
      <h1 className="text-3xl font-medium">FAQs</h1>
      <Accordion type="single" collapsible className="w-full">
        {accordionData.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}
