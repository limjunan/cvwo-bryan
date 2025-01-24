import React from "react";
import Thread from "./Thread";
import Pagination from "./Pagination";

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

interface ThreadPageProps {
  threads: Thread[];
  threadsPerPage: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
  onPost: () => void;
}

const ThreadPage: React.FC<ThreadPageProps> = ({
  threads,
  threadsPerPage,
  currentPage,
  paginate,
  onPost,
}) => {
  // Calculate the current threads to display
  const indexOfLastThread = currentPage * threadsPerPage;
  const indexOfFirstThread = indexOfLastThread - threadsPerPage;
  const currentThreads = threads.slice(indexOfFirstThread, indexOfLastThread);

  return (
    <div>
      {currentThreads.map((thread) => (
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
          onPost={onPost}
        />
      ))}
      <Pagination
        threadsPerPage={threadsPerPage}
        totalThreads={threads.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ThreadPage;
