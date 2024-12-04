import { titleFont } from '@/config/fonts'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <div className='flex w-full justify-center text-xs mb-10'>
        <Link href='/'>
        <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
        <span> | Shop</span>
        <span> &copy; {new Date().getFullYear()}</span>
        </Link>
        <Link href='/' className='ml-3 hover:underline'>
            Privacy Policy
        </Link>
        <Link href='/' className='ml-3 hover:underline'>
            Terms of Service
        </Link>
    </div>
  )
}
