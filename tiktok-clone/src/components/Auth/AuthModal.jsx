'use client';
import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { LoginForm, SignupForm } from './AuthForms';

export default function AuthModal({ isOpen, onClose, defaultView = 'login' }) {
  const [view, setView] = useState(defaultView);

  const handleSuccess = () => {
    onClose(); // ← only close on SUCCESS
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {view === 'login' ? (
        <LoginForm
          onSuccess={handleSuccess}
          onSwitchToSignup={() => setView('signup')}
        />
      ) : (
        <SignupForm
          onSuccess={handleSuccess}
          onSwitchToLogin={() => setView('login')}
        />
      )}
    </Modal>
  );
}