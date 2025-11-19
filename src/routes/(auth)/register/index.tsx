import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/(auth)/register/')({
  component: RegisterPage,
})

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className='max-w-md mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>Register</h1>
      <form
        action=''
        className='space-y-4'
      >
        <input
          type='text'
          className='w-full border-gray rounded-md p-2'
          name={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Name'
          autoComplete='off'
        />
        <input
          type='email'
          className='w-full border-gray rounded-md p-2'
          name={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          autoComplete='off'
        />
        <input
          type='password'
          className='w-full border-gray rounded-md p-2'
          name={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          autoComplete='off'
        />
        <button className='bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-4 py-2 rounded-md w-full'>
          Register
        </button>
      </form>

      <p className='text-sm text-center mt-4'>
        Already have an account?{' '}
        <Link
          to='/login'
          className='text-blue-600 hover:underline font-medium'
        >
          Login
        </Link>
      </p>
    </div>
  )
}
