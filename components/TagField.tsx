import React, { useState } from 'react';
import { Tag } from "../lib/weblog/types";
import TagWrap from "@/components/Tag"

interface TagFieldProps {
    tags: Tag[];
    onSelectTags: (selectedTags: Tag['id'][]) => void;
}

const TagField: React.FC<TagFieldProps> = ({ tags, onSelectTags }) => {
    // 선택된 태그 상태
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // 체크박스 상태 변경 핸들러
    const handleCheckboxChange = (tagId: string) => {
        const updatedTags = selectedTags.includes(tagId)
            ? selectedTags.filter((id) => id !== tagId)
            : [...selectedTags, tagId];
        setSelectedTags(updatedTags);
        onSelectTags(updatedTags);
    };

    return (
        <div className="w-full mb-1 rounded-lg shadow-md p-4 bg-white">
            <div className="space-y-2">
                {tags.map((tag) => (
                    <div key={tag.id} className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id={tag.id}
                            checked={selectedTags.includes(tag.id)}
                            onChange={() => handleCheckboxChange(tag.id)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor={tag.id} className="text-sm font-medium text-gray-800">
                            <TagWrap id={tag.id} text={tag.name} color={tag.color} onClick={() => handleCheckboxChange(tag.id)}/>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagField;