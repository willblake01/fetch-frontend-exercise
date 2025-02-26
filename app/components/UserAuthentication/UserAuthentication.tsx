'use client'
import { FC, FormEvent, useContext } from 'react';
import { useRouter } from 'next/navigation'
import { Context, ContextType } from '../../context';
import { login } from '../../api/userApi';
import { AuthenticationCard } from './components';

const UserAuthentication: FC = () => {
  const router = useRouter();

  const {
    setUser
  } = useContext(Context) as unknown as ContextType

  const handleLogin = async () => {
    const nameInput = document.getElementById('name-input') as HTMLInputElement;
    const emailInput = document.getElementById('email-input') as HTMLInputElement;
    
    const name = nameInput.value;
    const email = emailInput.value;

    const clearInputs = () => {
    (document.getElementById('name-input') as HTMLInputElement).value = '';
    (document.getElementById('email-input') as HTMLInputElement).value = '';
  }

    Promise.all([await login({ name, email }), clearInputs()]).then(() => setUser({ name, email })).then(() => router.push('/search/dogs'));
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
  }

  return (
    <AuthenticationCard onSubmit={handleSubmit} />
  )
}

export default UserAuthentication
