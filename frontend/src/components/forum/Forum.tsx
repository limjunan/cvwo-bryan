import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Thread from "./Thread";
import Header from "../Header";

interface Comment {
  ID: number;
  Content: string;
  UserID: number;
  CreatedAt: string;
}

interface ThreadData {
  ID: number;
  Title: string;
  Content: string;
  UserID: number;
  User: { Username: string };
  TagID: number;
  Tag: { Name: string };
  CreatedAt: string;
  UpdatedAt: string;
  Comments: Comment[] | null;
}

const Forum: React.FC = () => {
  const [threads, setThreads] = useState<ThreadData[]>([]);

  useEffect(() => {
    api
      .get("/threads")
      .then((response) => {
        setThreads(response.data);
        console.log(response.data);
        console.log("threads.comments", response.data[0].Comments);
      })
      .catch((error) => {
        console.error("There was an error fetching the threads!", error);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Threads</h1>
        {threads.map((thread) => (
          <Thread
            key={thread.ID}
            title={thread.Title}
            content={thread.Content}
            user={thread.User}
            tag={thread.Tag}
            createdAt={thread.CreatedAt}
            updatedAt={thread.UpdatedAt}
            comments={thread.Comments}
          />
        ))}
      </div>
    </div>
  );
};

export default Forum;
