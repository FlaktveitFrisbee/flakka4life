import { type Metadata } from 'next'

import { SimpleLayout } from '@/components/SimpleLayout'
import { Button } from '@/components/Button'

export const metadata: Metadata = {
  title: 'Innmeldingen er vellykket',
  description: 'Takk for at du har blitt med i Flaktveit Frisbeegolf.',
}

export default function SucessPage() {
  return (
    <SimpleLayout
      title="Innmeldingen er vellykket!"
      intro="Takk for at du har blitt med i Flaktveit Frisbeegolf. Du vil snart motta en epost med mer informasjon."
    >
      <Button href={'/'}>Tilbake til forsiden</Button>
    </SimpleLayout>
  )
}
