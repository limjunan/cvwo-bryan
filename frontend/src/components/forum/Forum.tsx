import React, { useState, useEffect } from "react";
import Header from "../Header";
import Login from "../auth/Login";
import BtnTag from "./BtnTag";
import Thread from "./Thread";
import TagSidebar from "./Tag-Sidebar";
import api from "../../services/api";
import { Button } from "../ui/button";
import { FaPen } from "react-icons/fa";
import Footer from "../Footer";
import AddThread from "./Add-Thread";

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
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      fetchThreads();
    }
  }, []);

  const fetchThreads = async () => {
    try {
      const response = await api.get("/threads");
      setThreads(response.data);
    } catch (error) {
      console.error("There was an error fetching the threads!", error);
    }
  };

  const handlePost = async () => {
    await fetchThreads();
  };

  const handleTagClick = (tag: Tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t.ID !== tag.ID)
        : [...prevTags, tag]
    );
  };

  const filteredThreads = threads.filter((thread) => {
    const matchesSearchQuery =
      thread.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.Content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      thread.Tags.some((tag) =>
        selectedTags.some((selectedTag) => selectedTag.ID === tag.ID)
      );
    return matchesSearchQuery && matchesTags;
  });

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="container mx-auto py-6 flex">
        <div className="w-2/3 pr-8">
          <div className="my-4 flex flex-row items-center">
            <span className="text-xl font-bold mr-2">Tag Filters: </span>
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
              onPost={handlePost}
            />
          ))}
        </div>
        <div className="w-1/3">
          <TagSidebar selectedTags={selectedTags} onTagClick={handleTagClick} />
          <AddThread onPost={handlePost} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Forum;
