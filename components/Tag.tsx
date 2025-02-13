import Link from 'next/link';
import { slug } from 'github-slugger';

interface Props {
  tagId: string;
  text: string;
  color: string;
  opacity?: number;
  onClick?: (id: string, text: string, color: string) => void;
}

const Tag = ({ tagId, text, color = '#ffffff', opacity = 20, onClick }: Props) => {

  // 배경색을 투명하게 처리하는 함수
  const rgbaColor = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`; // 투명도 적용
  };

  const styles = {
    backgroundColor: rgbaColor(color, opacity || 20), // 배경색을 흐리게
    color: color, // 글자 색상은 그대로
    fontWeight: 'bold',
    borderRadius: '8px',
    padding: '4px 8px',
    display: 'inline-block',
  };

  const handleClick = (
      e: React.MouseEvent<HTMLDivElement>,
      id: string,
      text: string,
      color: string
  ) => {
    if (onClick) {
      e.preventDefault(); // `onClick`이 있으면 기본 이동 동작 방지
      onClick(id, text, color); // `onClick` 함수 실행
    }
  };

  return (
      <>
        {onClick ? (
            <div
                className="text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm hover:brightness-50 cursor-pointer"
                style={styles}
                onClick={(event) => handleClick(event, tagId, text, color)}
            >
              {text}
            </div>
        ) : (
            <Link
                className="text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm hover:brightness-50"
                style={styles}
                href={`/tags/${tagId}`}
            >
              {text}
            </Link>
        )}
      </>
  );
};

export default Tag;