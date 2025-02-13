import React from 'react';

interface EditableTitleBoxProps {
    editable: boolean; // 수정 모드 여부
    title: string; // 제목 텍스트
    onChange?: (value: string) => void; // 제목 변경 콜백 (optional)
}

const EditableTitleBox: React.FC<EditableTitleBoxProps> = ({
                                                               editable,
                                                               title,
                                                               onChange,
                                                           }) => {
    return (
        <div className="w-full mb-1 rounded-lg shadow-md w-full mx-auto">
            {editable ? (
                // Input 모드
                <input
                    type="text"
                    value={title}
                    onChange={(e) => onChange?.(e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            ) : (
                // Read-Only 모드
                <h1 className="text-2xl font-bold">{title}</h1>
            )}
        </div>
    );
};

export default EditableTitleBox;