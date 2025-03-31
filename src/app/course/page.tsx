import { type Metadata } from 'next'
import { SimpleLayout } from '@/components/SimpleLayout'

import { Button } from '@/components/Button'

export const metadata: Metadata = {
  title: 'Banen',
  description: 'Informasjon om banen',
}

export default function Projects() {
  return (
    <SimpleLayout title="Banen" intro="Under utbygging">
      <div className="flex flex-col gap-y-16">
        <div className="flex flex-row gap-x-16">
          <Button
            href="https://udisc.com/courses/flaktveit-disk-golf-park-8viX"
            variant="primary"
          >
            Banen på UDisc
          </Button>
        </div>
      </div>
    </SimpleLayout>
  )
}
