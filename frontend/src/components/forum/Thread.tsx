import React, { useEffect, useState } from "react";
import Tag from "./Tag";
import api from "../../services/api";
import { jwtDecode } from "jwt-decode";
import { MdDeleteOutline, MdModeEdit } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IoMdSend } from "react-icons/io";
import { Edit } from "lucide-react";
import EditThread from "./Edit-Thread";

interface Comment {
  ID: number;
  Content: string;
  User: { Username: string };
  CreatedAt: string;
}

interface TagProps {
  ID: number;
  Name: string;
  Color: string;
}

interface ThreadProps {
  ID: number;
  title: string;
  content: string;
  user: { Username: string };
  tags: TagProps[];
  createdAt: string;
  updatedAt: string;
  comments: Comment[] | null;
  onPost: () => void;
}

interface DecodedToken {
  username: string;
}

const Thread: React.FC<ThreadProps> = ({
  ID,
  title,
  content,
  user,
  tags,
  createdAt,
  updatedAt,
  comments,
  onPost,
}) => {
  const [loggedInUsername, setLoggedInUsername] = useState<string | null>(null);
  const [newComment, setNewComment] = useState<string>("");
  const [commentList, setCommentList] = useState<Comment[]>(comments || []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      setLoggedInUsername(decoded.username);
    }
  }, []);

  const handleDelete = async () => {
    try {
      await api.delete(`/threads/${ID}`);
      onPost();
    } catch (error) {
      console.error("There was an error deleting the thread!", error);
    }
  };

  const handleCommentDelete = async (commentId: number) => {
    try {
      console.log("Deleting comment with ID:", commentId);
      console.log("Thread ID:", ID);
      const response = await api.delete(`/threads/${ID}/comments/${commentId}`);
      console.log("Comment deleted:", response);
      onPost();
    } catch (error) {
      console.error("There was an error deleting the comment!", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await api.post(`/threads/${ID}/comments`, {
        content: newComment,
        username: loggedInUsername,
      });
      setNewComment("");
      // Fetch the latest comments after posting a new comment
      const response = await api.get(`/threads/${ID}/comments`);
      setCommentList(response.data);
      onPost();
    } catch (error) {
      console.error("There was an error adding the comment!", error);
    }
  };

  return (
    <div className="border border-gray-300 bg-white rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        {user.Username === loggedInUsername && (
          <div className="flex space-x-2">
            <EditThread
              ID={ID}
              title={title}
              content={content}
              tags={tags}
              onPost={onPost}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant={"outline"} className="p-2 text-red-500">
                        <MdDeleteOutline size={24} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete this thread.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete this thread</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
      <p className="text-gray-700 mb-4">{content}</p>
      <div className="text-sm text-gray-500 mb-2">
        <span>
          Posted by {user.Username === loggedInUsername ? "you" : user.Username}
        </span>{" "}
        |{" "}
        {tags.map((tag) => (
          <Tag key={tag.ID} name={tag.Name} color={tag.Color} />
        ))}
      </div>
      <div className="text-sm text-gray-500 mb-2">
        <span>Posted on {new Date(createdAt).toLocaleString()}</span>
        {createdAt !== updatedAt && (
          <span> | Edited on {new Date(updatedAt).toLocaleString()}</span>
        )}
      </div>

      {comments && comments.length > 0 && (
        <div className="mt-4">
          <div className="border-t border-gray-300 pt-4">
            <h3 className="text-l font-semibold mb-2">
              {comments.length} Comment{comments.length !== 1 && "s"}
            </h3>
            {comments.map((comment) => (
              <div key={comment.ID} className="pt-2 mt-2">
                <p className="text-sm text-gray-700">{comment.Content}</p>
                <div className="text-sm text-gray-500 flex justify-between items-center">
                  <span>
                    Commented by {comment.User.Username} on{" "}
                    {new Date(comment.CreatedAt).toLocaleString()}
                  </span>
                  {comment.User.Username === loggedInUsername && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button className="text-red-500">
                                <MdDeleteOutline size={16} />
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete this comment.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleCommentDelete(comment.ID)
                                  }
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete this comment</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mt-4 flex items-center">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="w-full"
        />
        <Button className="ml-1" variant={"outline"} onClick={handleAddComment}>
          <IoMdSend />
        </Button>
      </div>
    </div>
  );
};

export default Thread;
