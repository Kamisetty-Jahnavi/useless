import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Flag, MoreVertical } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ForumPostProps {
  post: {
    id: string;
    title: string;
    content: string;
    author: {
      id: string;
      name: string;
      avatar: string;
    };
    createdAt: string;
    likes: number;
    replies: number;
    liked?: boolean;
  };
  onLike: (postId: string) => void;
  onReply: (postId: string) => void;
  onReport: (postId: string) => void;
}

const ForumPost: React.FC<ForumPostProps> = ({ post, onLike, onReply, onReport }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-medium">{post.title}</h3>
            <p className="text-sm text-gray-500">
              by {post.author.name} • {formatDistanceToNow(new Date(post.createdAt))} ago
            </p>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>
          {showActions && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
              <button
                onClick={() => onReport(post.id)}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
              >
                <Flag className="w-4 h-4" />
                Report post
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="mt-4 text-gray-700">{post.content}</p>

      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={() => onLike(post.id)}
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm
            ${post.liked 
              ? 'bg-blue-50 text-blue-600' 
              : 'hover:bg-gray-50 text-gray-600'
            }`}
        >
          <ThumbsUp className="w-4 h-4" />
          {post.likes}
        </button>
        <button
          onClick={() => onReply(post.id)}
          className="flex items-center gap-2 px-3 py-1 rounded-full text-sm hover:bg-gray-50 text-gray-600"
        >
          <MessageSquare className="w-4 h-4" />
          {post.replies}
        </button>
      </div>
    </div>
  );
};

export default ForumPost;