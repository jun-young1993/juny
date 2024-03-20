import ThemeToggleButton from '@/components/buttons/theme-toggle.button'

export default function NavBar() {
  return (
    <div className="navbar">
      <div className="flex-1 dark:text-gray-200">juny-blog</div>
      <ThemeToggleButton />
    </div>
  )
}
