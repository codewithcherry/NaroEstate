import { useParams } from 'next/navigation'
import React from 'react'

const ViewListing = () => {

  const {listingId}=useParams();
  return (
    <div>
      <p>THis is the listing id {listingId} of the property</p>
    </div>
  )
}

export default ViewListing
