import React from 'react';
import { toast } from 'react-toastify';

export default function AlertErrors(type: string) {
  switch (type) {
    case 'auth/wrong-password':
      toast.warning('Email or passsword incorrect.');
      break;
    case 'auth/email-already-in-use':
      toast.warning('This email is already use');
      break;
    default:
      toast.warning('Error on server. Please try again later.');
  }
}
