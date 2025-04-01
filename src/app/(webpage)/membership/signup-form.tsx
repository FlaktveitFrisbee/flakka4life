import React from "react";
import { sendMembershipDiscordNotification } from "./actions";
import SubmitButton from "./submit-button";
import { LoaderCircle } from "lucide-react";

export default function SignupForm() {
  return (
    <form
      action={sendMembershipDiscordNotification}
      className="grid w-full max-w-lg grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
    >
      <div className="col-span-1 sm:col-span-6">
        <label htmlFor="name" className="block text-sm leading-6 font-medium">
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
            className="block w-full rounded-md border-0 p-2 shadow-xs ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="sm:col-span-6">
        <label htmlFor="email" className="block text-sm leading-6 font-medium">
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
            className="block w-full rounded-md border-0 p-2 shadow-xs ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="sm:col-span-6">
        <label htmlFor="tel" className="block text-sm leading-6 font-medium">
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
            className="block w-full rounded-md border-0 p-2 shadow-xs ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="sm:col-span-6">
        <label htmlFor="bday" className="block text-sm leading-6 font-medium">
          Fødselsdag
        </label>
        <div className="mt-2">
          <input
            required
            id="bday"
            name="bday"
            type="date"
            autoComplete="bday"
            className="block w-full rounded-md border-0 p-2 shadow-xs ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="col-span-full">
        <label
          htmlFor="street-address"
          className="block text-sm leading-6 font-medium"
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
            placeholder="Flaktveitveien 123"
            className="block w-full rounded-md border-0 p-2 shadow-xs ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="sm:col-span-3">
        <label
          htmlFor="postal-code"
          className="block text-sm leading-6 font-medium"
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
            className="block w-full rounded-md border-0 p-2 shadow-xs ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="sm:col-span-3">
        <label htmlFor="city" className="block text-sm leading-6 font-medium">
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
            className="block w-full rounded-md border-0 p-2 shadow-xs ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="col-span-1 sm:col-span-6">
        <SubmitButton
          defaultContent="Send inn"
          pendingContent={
            <>
              <span className="">Sender inn...</span>
              <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />
            </>
          }
        />
      </div>
    </form>
  );
}
