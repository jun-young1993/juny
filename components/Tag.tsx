import Link from 'next/link'
import TagClient from './TagClient'
interface Props {
  tagId: string
  text: string
  color: string
  opacity?: number
  onClick?: (id: string, text: string, color: string) => void
}

const Tag = ({ tagId, text, color = '#ffffff', opacity = 20, onClick }: Props) => {
  // 배경색을 투명하게 처리하는 함수
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

  return (
    <>
      {onClick ? (
        <TagClient tagId={tagId} text={text} color={color} onClick={onClick} />
      ) : (
        <Link
          className="me-2 rounded-sm px-2.5 py-0.5 text-sm font-medium hover:brightness-50"
          style={styles}
          href={`/tags/${tagId}`}
        >
          {text}
        </Link>
      )}
    </>
  )
}

export default Tag
