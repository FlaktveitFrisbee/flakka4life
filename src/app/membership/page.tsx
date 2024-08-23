import { type Metadata } from 'next'

import { SimpleLayout } from '@/components/SimpleLayout'
import SignupForm from './signup-form'

export const metadata: Metadata = {
  title: 'Bli medlem i klubben',
  description: 'Fyll ut skjemaet for å bli med i Flaktveit Frissbeegolf.',
}

export default function MembershipPage() {
  return (
    <SimpleLayout
      title="Bli medlem i klubben!"
      intro="Fyll ut skjemaet for å bli med i Flaktveit Frissbeegolf."
    >
      <div className="flex justify-center">
        <SignupForm />
      </div>
    </SimpleLayout>
  )
}
