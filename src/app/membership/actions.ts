'use server'
import { redirect } from "next/navigation"

export async function createInvoice(formData: FormData) {

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