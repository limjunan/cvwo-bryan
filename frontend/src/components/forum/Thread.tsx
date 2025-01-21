import React from "react";
import Tag from "./Tag";

interface Comment {
  ID: number;
  Content: string;
  UserID: number;
  CreatedAt: string;
}

interface TagProps {
  ID: number;
  Name: string;
}

interface ThreadProps {
  title: string;
  content: string;
  user: { Username: string };
  tags: TagProps[];
  createdAt: string;
  updatedAt: string;
  comments: Comment[] | null;
}

const Thread: React.FC<ThreadProps> = ({
  title,
  content,
  user,
  tags,
  createdAt,
  updatedAt,
  comments,
}) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{content}</p>
      <div className="text-sm text-gray-500">
        <span>Posted by {user.Username}</span> |{" "}
        {tags.map((tag) => (
          <Tag key={tag.ID} name={tag.Name} />
        ))}
      </div>
      <div className="text-sm text-gray-500">
        <span>Created at: {new Date(createdAt).toLocaleString()}</span> |{" "}
        <span>Updated at: {new Date(updatedAt).toLocaleString()}</span>
      </div>
      {comments && (
        <div className="mt-4">
          <div className="border-t border-gray-300 pt-4">
            <h3 className="text-l font-semibold mb-2">
              {comments.length} Comment{comments.length !== 1 && "s"}
            </h3>
            {comments.map((comment) => (
              <div key={comment.ID} className=" pt-2 mt-2">
                <p className="text-sm text-gray-700">{comment.Content}</p>
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
      )}
    </div>
  );
};

export default Thread;
