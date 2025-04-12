'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useFormStatus } from 'react-dom'

export default function SubmitButton(props: {
  defaultContent: React.ReactNode
  pendingContent: React.ReactNode
}) {
  const { pending } = useFormStatus()
  return (
    <Button 
      disabled={pending}
      variant="teal"
    >
      {pending ? props.pendingContent : props.defaultContent}
    </Button>
  )
}
