import React from "react";

interface Comment {
  ID: number;
  Content: string;
  UserID: number;
  CreatedAt: string;
}

interface ThreadProps {
  title: string;
  content: string;
  userId: number;
  tagId: number;
  createdAt: string;
  updatedAt: string;
  comments?: Comment[];
}

const Thread: React.FC<ThreadProps> = ({
  title,
  content,
  userId,
  tagId,
  createdAt,
  updatedAt,
  comments = [],
}) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{content}</p>
      <div className="text-sm text-gray-500">
        <span>Posted by User {userId}</span> | <span>Tag ID: {tagId}</span>
      </div>
      <div className="text-sm text-gray-500">
        <span>Created at: {new Date(createdAt).toLocaleString()}</span> |{" "}
        <span>Updated at: {new Date(updatedAt).toLocaleString()}</span>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Comments</h3>
        {comments.map((comment) => (
          <div key={comment.ID} className="border-t border-gray-200 pt-2 mt-2">
            <p className="text-gray-700">{comment.Content}</p>
            <div className="text-sm text-gray-500">
              <span>Posted by User {comment.UserID}</span> |{" "}
              <span>
                Created at: {new Date(comment.CreatedAt).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Thread;
