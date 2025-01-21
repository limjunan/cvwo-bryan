import React, { useEffect, useState } from "react";
import api from "../../services/api";
import BtnTag from "./BtnTag";

interface TagData {
  ID: number;
  Name: string;
}

interface TagSidebarProps {
  tags: string[];
  onTagClick: (tagName: string) => void;
}

const TagSidebar: React.FC<TagSidebarProps> = ({ tags, onTagClick }) => {
  const [allTags, setAllTags] = useState<TagData[]>([]);

  useEffect(() => {
    api
      .get("/tags")
      .then((response) => {
        setAllTags(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the tags!", error);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Tags</h2>
      <div className="flex flex-wrap">
        {allTags.map((tag) => (
          <BtnTag
            key={tag.ID}
            remove={false}
            name={tag.Name}
            onClick={() => onTagClick(tag.Name)}
          />
        ))}
      </div>
    </div>
  );
};

export default TagSidebar;
