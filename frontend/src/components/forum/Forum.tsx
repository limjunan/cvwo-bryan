import React, { useState, useEffect } from "react";
import Header from "../Header";
import Login from "../auth/Login";
import BtnTag from "./BtnTag";
import Thread from "./Thread";
import TagSidebar from "./Tag-Sidebar";
import api from "../../services/api";

interface Tag {
  ID: number;
  Name: string;
  Color: string;
}

interface User {
  Username: string;
}

interface Comment {
  ID: number;
  Content: string;
  User: User;
  CreatedAt: string;
}

interface Thread {
  ID: number;
  Title: string;
  Content: string;
  User: User;
  Tags: Tag[];
  CreatedAt: string;
  UpdatedAt: string;
  Comments: Comment[];
}

const Forum: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchThreads = async () => {
      const response = await api.get("/threads");
      setThreads(response.data);
    };

    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      fetchThreads();
    }
  }, []);

  const handleTagClick = (tag: Tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t.ID !== tag.ID)
        : [...prevTags, tag]
    );
  };

  const filteredThreads = threads.filter((thread) =>
    selectedTags.every((tag) =>
      thread.Tags.some((threadTag) => threadTag.Name === tag.Name)
    )
  );

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto py-6 flex">
        <div className="w-3/4">
          <h1 className="text-3xl font-bold">Threads</h1>
          <div className="my-4 flex flex-row items-center">
            <span className="text-l font-bold mr-2">Tag Filters: </span>
            <div className="flex flex-wrap justify-center items-center gap-2">
              {selectedTags.map((tag) => (
                <BtnTag
                  key={tag.ID}
                  name={tag.Name}
                  color={tag.Color}
                  remove={true}
                  onClick={() => handleTagClick(tag)}
                />
              ))}
            </div>
          </div>
          {filteredThreads.map((thread) => (
            <Thread
              ID={thread.ID}
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
          <TagSidebar selectedTags={selectedTags} onTagClick={handleTagClick} />
        </div>
      </div>
    </div>
  );
};

export default Forum;
