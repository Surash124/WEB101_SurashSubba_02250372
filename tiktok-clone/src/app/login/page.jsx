'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/authContext';
import { LoginForm } from '@/components/auth/AuthForms';

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/');
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <div className="w-full max-w-md">
        <div className="border rounded-lg shadow-sm">
          <LoginForm
            onSuccess={() => router.push('/')}
            onSwitchToSignup={() => router.push('/signup')}
          />
        </div>
      </div>
    </div>
  );
}