'use client'
import { Button } from '@/components/Button'
import React from 'react'
import { createInvoice } from './actions'
import { useFormStatus } from 'react-dom'

export default function SignupForm() {
  const { pending } = useFormStatus()
  return (
    <form
      action={pending ? undefined : createInvoice}
      className="grid w-full max-w-lg grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
    >
      <div className="col-span-1 sm:col-span-6">
        <label htmlFor="name" className="block text-sm font-medium leading-6">
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
        <label htmlFor="email" className="block text-sm font-medium leading-6">
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
        <label htmlFor="tel" className="block text-sm font-medium leading-6">
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
        <label htmlFor="bday" className="block text-sm font-medium leading-6">
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
        <label htmlFor="city" className="block text-sm font-medium leading-6">
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
        <Button disabled={pending}>Send inn</Button>
      </div>
    </form>
  )
}
