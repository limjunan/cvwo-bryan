import React, { useEffect, useState } from "react";
import BtnTag from "./BtnTag";
import api from "../../services/api";

interface Tag {
  ID: number;
  Name: string;
  Color: string;
}

interface TagSidebarProps {
  selectedTags: Tag[];
  onTagClick: (tag: Tag) => void;
}

const TagSidebar: React.FC<TagSidebarProps> = ({
  selectedTags,
  onTagClick,
}) => {
  const [allTags, setAllTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await api.get("/tags");
        setAllTags(response.data);
      } catch (error) {
        console.error("There was an error fetching the tags!", error);
      }
    };

    fetchTags();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Tags</h2>
      <div className="flex flex-wrap">
        {allTags.map((tag) => (
          <BtnTag
            key={tag.ID}
            remove={selectedTags.includes(tag)}
            name={tag.Name}
            color={tag.Color}
            onClick={() => onTagClick(tag)}
          />
        ))}
      </div>
    </div>
  );
};

export default TagSidebar;
