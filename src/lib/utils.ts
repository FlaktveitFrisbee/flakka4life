import { clsx, type ClassValue } from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { Competition } from './types/metrixresult'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
