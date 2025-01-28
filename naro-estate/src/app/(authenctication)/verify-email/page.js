'use client'

import VerifyEmail from '@/components/react-components/VerifyEmail'
import React, { Suspense, } from 'react'

const Loading=()=>{
  return <div>
         <span className='animate-pulse transition delay-75 duration-75'> loading......</span>
  </div>
}

const page = () => {

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <VerifyEmail />
      </Suspense>
    </div>
  )
}

export default page
