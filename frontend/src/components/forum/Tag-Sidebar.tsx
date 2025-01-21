import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Tag from "./Tag";
import BigTag from "./BigTag";

interface TagData {
  ID: number;
  Name: string;
}

const TagSidebar: React.FC = () => {
  const [tags, setTags] = useState<TagData[]>([]);

  useEffect(() => {
    api
      .get("/tags")
      .then((response) => {
        setTags(response.data);
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
        {tags.map((tag) => (
          <BigTag key={tag.ID} name={tag.Name} />
        ))}
      </div>
    </div>
  );
};

export default TagSidebar;
