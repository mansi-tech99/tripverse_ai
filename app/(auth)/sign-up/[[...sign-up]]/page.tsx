"use client";

import { SignUp, useAuth } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function SignUpPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect_url') || '/create-new-trip';

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      window.location.replace(redirectUrl);
    }
  }, [isLoaded, isSignedIn, redirectUrl]);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 text-slate-500 font-medium">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-orange-500 border-t-transparent"></div>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (isSignedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 text-slate-500 font-medium">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-orange-500 border-t-transparent"></div>
          <span>Redirecting...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <SignUp
        fallbackRedirectUrl={redirectUrl}
        forceRedirectUrl={redirectUrl}
      />
    </div>
  )
}