'use client';

import { Button } from '@/shared/components/ui/Button';
import React, { useState } from 'react';
import Link from 'next/link';
import { signUp } from '@/shared/utils/auth-helpers/server';
import { handleRequest } from '@/shared/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';

// Define prop type with allowEmail boolean
interface SignUpProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function SignUp({ allowEmail, redirectMethod }: SignUpProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, signUp, router);
    setIsSubmitting(false);
  };

  return (
    <div className="my-8">
      <form
        noValidate
        className="mb-4"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</label>
            <input
              id="email"
              placeholder="name@example.com"
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="w-full p-3 rounded-md bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white"
            />
            <label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</label>
            <input
              id="password"
              placeholder="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              className="w-full p-3 rounded-md bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white"
            />
          </div>
          <Button
            variant="outline"
            type="submit"
            className={`mt-1 p-3 rounded-md ${isSubmitting
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
              }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing up...' : 'Sign up'}
          </Button>
        </div>
      </form>
      <p className="text-gray-700 dark:text-gray-300 mt-4">Already have an account?</p>
      <p className='mt-4'>
        <Link href="/signin/password_signin" className="font-light text-sm text-blue-600 dark:text-blue-400">
          Sign in with email and password
        </Link>
      </p>
      {allowEmail && (
        <p className='mt-4'>
          <Link href="/signin/email_signin" className="font-light text-sm text-blue-600 dark:text-blue-400">
            Sign in via magic link
          </Link>
        </p>
      )}
    </div>
  );
}
