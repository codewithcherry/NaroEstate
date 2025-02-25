'use client';
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {

  const router =useRouter();

  const handleCreateNewListing=()=>{
      router.push('/create-listing');
  }
  return (
    <div className='flex flex-end'>
      
      <Button onClick={handleCreateNewListing}><Plus />New Listing</Button>
    </div>
  )
}

export default page
