import Navbar from '@/components/navbar';
import { SubscriptionEntitlementQuery } from '@/convex/query.config';
import { combinedSlug } from '@/lib/utils';
import { redirect } from 'next/navigation';
import React from 'react'

const Layout = async ({children}:{children:React.ReactNode}) => {
    const { profileName , entitlement } = await SubscriptionEntitlementQuery();
    if(entitlement._valueJSON){
        //TODO : redirect to billing page
        redirect(`/dashboard/${combinedSlug(profileName!)}`)
    }
  return (
    <div>
      <Navbar/>
        {children}
    </div>
  )
}

export default Layout