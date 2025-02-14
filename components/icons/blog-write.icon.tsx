import React from 'react'

const BlogWriteIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20" // ✅ w-5 h-5 (20px x 20px)에 최적화
      fill="currentColor"
      className="h-5 w-5" // ✅ Tailwind 크기 적용
    >
      {/* 문서 아이콘 */}
      <path d="M3 2C2.447 2 2 2.447 2 3V17C2 17.553 2.447 18 3 18H14C14.553 18 15 17.553 15 17V7.828C15 7.298 14.789 6.789 14.414 6.414L11.586 3.586C11.211 3.211 10.702 3 10.172 3H3ZM4 4H9V6H4V4ZM4 8H12V10H4V8ZM4 12H10V14H4V12ZM12 7H14V9H12V7Z"></path>

      {/* 연필 아이콘 (글쓰기) */}
      <path d="M16 9L18 11L12 17H10V15L16 9Z"></path>
    </svg>
  )
}

export default BlogWriteIcon
