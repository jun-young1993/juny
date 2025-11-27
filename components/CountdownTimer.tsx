'use client'

import { useEffect, useState } from 'react'

interface CountdownTimerProps {
  expiredAt: string
  className?: string
}

interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

function calculateTimeRemaining(expiredAt: string): TimeRemaining {
  const now = new Date().getTime()
  const expired = new Date(expiredAt).getTime()
  const difference = expired - now

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    }
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false,
  }
}

export default function CountdownTimer({ expiredAt, className = '' }: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(expiredAt)
  )

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining(expiredAt)
      setTimeRemaining(remaining)

      if (remaining.isExpired) {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [expiredAt])

  if (timeRemaining.isExpired) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400 ${className}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-red-500 dark:bg-red-400" />
        만료됨
      </div>
    )
  }

  const { days, hours, minutes, seconds } = timeRemaining

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm ring-1 ring-blue-200/50 dark:from-gray-800 dark:to-gray-900 dark:text-gray-200 dark:ring-gray-700/50 ${className}`}
    >
      <span className="flex items-center gap-1">
        {days > 0 && (
          <>
            <span className="font-semibold tabular-nums">{String(days).padStart(2, '0')}</span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400">일</span>
          </>
        )}
        <span className="font-semibold tabular-nums">{String(hours).padStart(2, '0')}</span>
        <span className="text-[10px] text-gray-500 dark:text-gray-400">:</span>
        <span className="font-semibold tabular-nums">{String(minutes).padStart(2, '0')}</span>
        <span className="text-[10px] text-gray-500 dark:text-gray-400">:</span>
        <span className="font-semibold tabular-nums text-blue-600 dark:text-blue-400">
          {String(seconds).padStart(2, '0')}
        </span>
      </span>
    </div>
  )
}
