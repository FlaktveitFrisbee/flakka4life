import { type Metadata } from 'next'

import { SimpleLayout } from '@/components/SimpleLayout'
import { Button } from '@/components/Button'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Bli medlem i klubben',
  description: 'Fyll ut skjemaet for å bli med i Flaktveit Frissbeegolf.',
}

export default function MembershipPage() {
  async function createInvoice(formData: FormData) {
    'use server'

    const rawFormData = {
      name: formData.get('name'),
      email: formData.get('email'),
      tel: formData.get('tel'),
      bday: formData.get('bday'),
      streetAddress: formData.get('street-address'),
      postalCode: formData.get('postal-code'),
      city: formData.get('city'),
    }
    const url = process.env.DISCORD_WEBHOOK_URL
    if (!url) {
      throw new Error('DISCORD_WEBHOOK_URL is not set')
    }

    let data = 'Ny innmelding!\n\n'
    data += `Navn: ${rawFormData.name}\n`
    data += `Epost: ${rawFormData.email}\n`
    data += `Telefon: ${rawFormData.tel}\n`
    data += `Fødselsdag: ${rawFormData.bday} (YYYY-MM-DD)\n`
    data += `Adresse: ${rawFormData.streetAddress}\n`
    data += `Postnummer: ${rawFormData.postalCode}\n`
    data += `Poststed: ${rawFormData.city}\n`
    data += '-------------------------- \n\n'

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: data,
        username: 'Flakka4Life',
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to send Discord message')
    }

    console.log('Discord message sent')
    redirect('/membership/signup-success')
  }

  return (
    <SimpleLayout
      title="Bli medlem i klubben!"
      intro="Fyll ut skjemaet for å bli med i Flaktveit Frissbeegolf."
    >
      <div className="flex justify-center">
        <form
          action={createInvoice}
          className="grid w-full max-w-lg grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
        >
          <div className="col-span-1 sm:col-span-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6"
            >
              Fullt Navn
            </label>
            <div className="mt-2">
              <input
                required
                id="name"
                name="name"
                type="text"
                autoComplete="given-name"
                placeholder="Navn Navnesen"
                className="block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6"
            >
              Epost
            </label>
            <div className="mt-2">
              <input
                required
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="epost@example.com"
                className="block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-6">
            <label
              htmlFor="tel"
              className="block text-sm font-medium leading-6"
            >
              Telefon
            </label>
            <div className="mt-2">
              <input
                required
                id="tel"
                name="tel"
                type="tel"
                placeholder="+47 123 45 678"
                autoComplete="tel"
                className="block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-6">
            <label
              htmlFor="bday"
              className="block text-sm font-medium leading-6"
            >
              Fødselsdag
            </label>
            <div className="mt-2">
              <input
                required
                id="bday"
                name="bday"
                type="date"
                autoComplete="bday"
                className="block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6"
            >
              Adresse
            </label>
            <div className="mt-2">
              <input
                required
                id="street-address"
                name="street-address"
                type="text"
                autoComplete="street-address"
                placeholder="Flakteitveien 123"
                className="block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="postal-code"
              className="block text-sm font-medium leading-6"
            >
              Postnummer
            </label>
            <div className="mt-2">
              <input
                required
                id="postal-code"
                name="postal-code"
                type="number"
                max={9999}
                min={0}
                autoComplete="postal-code"
                placeholder="1234"
                className="block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="city"
              className="block text-sm font-medium leading-6"
            >
              Poststed
            </label>
            <div className="mt-2">
              <input
                required
                id="city"
                name="city"
                type="text"
                autoComplete="address-level2"
                placeholder="Flaktveit"
                className="block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="col-span-1 sm:col-span-6">
            <Button>Send inn</Button>
          </div>
        </form>
      </div>
    </SimpleLayout>
  )
}
