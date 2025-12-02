'use client'

import type { MouseEvent } from 'react'

interface PagenationProps {
  currentPage: number
  totalPages: number
  onPageChange?: (page: number) => void
}

type PageItem = number | 'ellipsis'

function buildPageItems(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const items: PageItem[] = []

  items.push(1)

  const start = Math.max(2, currentPage - 1)
  const end = Math.min(totalPages - 1, currentPage + 1)

  if (start > 2) {
    items.push('ellipsis')
  }

  for (let page = start; page <= end; page += 1) {
    items.push(page)
  }

  if (end < totalPages - 1) {
    items.push('ellipsis')
  }

  items.push(totalPages)

  return items
}

export default function Pagenation({ currentPage, totalPages, onPageChange }: PagenationProps) {
  if (totalPages <= 1) return null

  const pageItems = buildPageItems(currentPage, totalPages)
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  const handleClick = (event: MouseEvent<HTMLButtonElement>, page: number | 'prev' | 'next') => {
    event.preventDefault()
    if (!onPageChange) return

    if (page === 'prev' && !isFirstPage) {
      onPageChange(currentPage - 1)
      return
    }

    if (page === 'next' && !isLastPage) {
      onPageChange(currentPage + 1)
      return
    }

    if (typeof page === 'number' && page !== currentPage) {
      onPageChange(page)
    }
  }

  return (
    <nav
      aria-label="Pagination"
      className="mt-6 flex items-center justify-center gap-2 text-xs sm:mt-8 sm:gap-3"
    >
      {/* Previous */}
      <button
        type="button"
        onClick={(event) => handleClick(event, 'prev')}
        disabled={isFirstPage}
        className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 transition ${
          isFirstPage
            ? 'cursor-not-allowed border-gray-200 bg-gray-50 text-gray-300 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-600'
            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-gray-500 dark:hover:bg-gray-800'
        }`}
      >
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-gray-100 text-[10px] text-gray-500 dark:bg-gray-800 dark:text-gray-300">
          ‹
        </span>
        <span className="hidden sm:inline">이전</span>
      </button>

      {/* Page numbers */}
      <ul className="flex items-center gap-1.5 sm:gap-2">
        {pageItems.map((item, index) => {
          if (item === 'ellipsis') {
            return (
              <li key={`ellipsis-${index}`} className="px-1 text-gray-400 dark:text-gray-500">
                …
              </li>
            )
          }

          const isActive = item === currentPage

          return (
            <li key={item}>
              <button
                type="button"
                onClick={(event) => handleClick(event, item)}
                aria-current={isActive ? 'page' : undefined}
                className={`inline-flex h-8 min-w-[2rem] items-center justify-center rounded-full px-2 text-xs font-medium transition ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-sm shadow-indigo-500/40'
                    : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50 hover:text-gray-900 dark:bg-gray-900 dark:text-gray-100 dark:ring-gray-700 dark:hover:bg-gray-800'
                }`}
              >
                <span className="tabular-nums">{item}</span>
              </button>
            </li>
          )
        })}
      </ul>

      {/* Next */}
      <button
        type="button"
        onClick={(event) => handleClick(event, 'next')}
        disabled={isLastPage}
        className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 transition ${
          isLastPage
            ? 'cursor-not-allowed border-gray-200 bg-gray-50 text-gray-300 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-600'
            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-gray-500 dark:hover:bg-gray-800'
        }`}
      >
        <span className="hidden sm:inline">다음</span>
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-gray-100 text-[10px] text-gray-500 dark:bg-gray-800 dark:text-gray-300">
          ›
        </span>
      </button>
    </nav>
  )
}
