'use client'
interface Props {
  tagId: string
  text: string
  color: string
  opacity?: number
  onClick?: (id: string, text: string, color: string) => void
}
const TagClient = ({ tagId, text, color = '#ffffff', opacity = 20, onClick }: Props) => {
  const rgbaColor = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})` // 투명도 적용
  }
  const styles = {
    backgroundColor: rgbaColor(color, opacity || 20), // 배경색을 흐리게
    color: color, // 글자 색상은 그대로
    fontWeight: 'bold',
    borderRadius: '8px',
    padding: '4px 8px',
    display: 'inline-block',
  }
  const handleClick = (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    id: string,
    text: string,
    color: string
  ) => {
    if (onClick) {
      e.preventDefault() // `onClick`이 있으면 기본 이동 동작 방지
      onClick(id, text, color) // `onClick` 함수 실행
    }
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick(e, tagId, text, color)
    }
  }
  return (
    <div
      role="button"
      tabIndex={0}
      className="me-2 cursor-pointer rounded-sm px-2.5 py-0.5 text-sm font-medium hover:brightness-50"
      style={styles}
      onClick={(event) => handleClick(event, tagId, text, color)}
      onKeyDown={handleKeyDown}
    >
      {text}
    </div>
  )
}

export default TagClient
