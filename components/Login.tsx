'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { login } from '../lib/weblog'

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Please fill in both fields.')
      return
    }
    //
    setIsLoading(true)

    toast
      .promise(
        () => {
          return login({
            input: {
              email: email,
              password,
            },
          })
        },
        {
          loading: 'Logging in...',
          success: () => {
            setIsLoading(false)
            return 'Login Successfully!'
          },
          error: (error) => {
            setIsLoading(false)
            return error.message
          },
        }
      )
      .then(async (result) => {
        router.push(`/`)
        router.refresh()
      })
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div className="mt-4 w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <h2 className="text-center text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Login
        </h2>
        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-3 font-medium text-white transition duration-300 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="mr-2 h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                <path fill="white" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : null}
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
