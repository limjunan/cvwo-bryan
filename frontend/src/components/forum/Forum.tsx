import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Thread from "./Thread";
import Header from "../Header";
import TagSidebar from "./Tag-Sidebar";
import BtnTag from "./BtnTag";

interface Comment {
  ID: number;
  Content: string;
  UserID: number;
  CreatedAt: string;
}

interface Tag {
  ID: number;
  Name: string;
}

interface ThreadData {
  ID: number;
  Title: string;
  Content: string;
  UserID: number;
  User: { Username: string };
  Tags: Tag[];
  CreatedAt: string;
  UpdatedAt: string;
  Comments: Comment[] | null;
}

const Forum: React.FC = () => {
  const [threads, setThreads] = useState<ThreadData[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    api
      .get("/threads")
      .then((response) => {
        setThreads(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the threads!", error);
      });
  }, []);

  const handleTagClick = (tagName: string) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tagName)
        ? prevSelectedTags.filter((tag) => tag !== tagName)
        : [...prevSelectedTags, tagName]
    );
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto py-6 flex">
        <div className="w-3/4">
          <h1 className="text-3xl font-bold">Threads</h1>
          <div className="my-4 flex flex-row items-center">
            <span className="text-l font-bold mr-2">Filters: </span>
            <div className="flex flex-wrap justify-center items-center">
              {selectedTags.map((tag) => (
                <BtnTag
                  key={tag}
                  name={tag}
                  remove={true}
                  onClick={() => handleTagClick(tag)}
                />
              ))}
            </div>
          </div>
          {threads.map((thread) => (
            <Thread
              key={thread.ID}
              title={thread.Title}
              content={thread.Content}
              user={thread.User}
              tags={thread.Tags}
              createdAt={thread.CreatedAt}
              updatedAt={thread.UpdatedAt}
              comments={thread.Comments}
            />
          ))}
        </div>
        <div className="w-1/4">
          <TagSidebar tags={selectedTags} onTagClick={handleTagClick} />
        </div>
      </div>
    </div>
  );
};

export default Forum;
