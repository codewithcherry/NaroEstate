import ResetPassword from '@/components/react-components/ResetPassword'
import React ,{Suspense}from 'react'

const page = () => {


    const Loading=()=>{
        return <div>
               <span className='animate-pulse transition delay-75 duration-75'> loading......</span>
        </div>
      }

  return (
    <div>
        <Suspense fallback={Loading}>

        <ResetPassword />
        </Suspense>
    </div>
  )
}

export default page
