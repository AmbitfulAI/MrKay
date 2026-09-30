"use client";

import { useState } from "react";
import { useCommentsQuery, useLikeComment, type CommentRow } from "@/queries/comments";
import CommentForm from "./CommentForm";

function formatCommentDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function likedKey(id: string) {
  return `comment-liked-${id}`;
}

function hasLiked(id: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(likedKey(id)) === "1";
  } catch {
    return false;
  }
}

interface RowProps {
  comment: CommentRow;
  liked: boolean;
  onLike: () => void;
  onReply?: () => void;
}

function CommentRowView({ comment, liked, onLike, onReply }: RowProps) {
  return (
    <div>
      <div className="comment-meta">
        <span className="comment-author">{comment.authorName}</span>
        <span className="comment-date">{formatCommentDate(comment.createdAt)}</span>
      </div>
      <p className="comment-body">{comment.content}</p>
      <div className="comment-actions">
        <button type="button" onClick={onLike} className={`comment-like-btn${liked ? " is-liked" : ""}`}>
          ♥ {comment.likes > 0 ? comment.likes : "Like"}
        </button>
        {onReply && (
          <button type="button" onClick={onReply} className="comment-reply-btn">
            Reply
          </button>
        )}
      </div>
    </div>
  );
}

interface Props {
  noteId: string;
}

export default function CommentList({ noteId }: Props) {
  const { data: comments = [], isLoading } = useCommentsQuery(noteId);
  const likeMutation = useLikeComment(noteId);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [likedIds, setLikedIds] = useState<Set<string>>(() => new Set());

  function handleLike(id: string) {
    if (hasLiked(id)) return;
    likeMutation.mutate(id);
    try {
      localStorage.setItem(likedKey(id), "1");
    } catch {}
    setLikedIds((prev) => new Set(prev).add(id));
  }

  if (isLoading) {
    return <p className="text-dim font-light" style={{ fontSize: "0.85rem", marginTop: "32px" }}>Loading comments…</p>;
  }

  const topLevel = comments.filter((c) => !c.parentId);
  const repliesByParent = new Map<string, CommentRow[]>();
  for (const c of comments) {
    if (c.parentId) {
      const list = repliesByParent.get(c.parentId) ?? [];
      list.push(c);
      repliesByParent.set(c.parentId, list);
    }
  }

  if (topLevel.length === 0) {
    return <p className="text-dim font-light" style={{ fontSize: "0.85rem", marginTop: "32px" }}>Be the first to comment.</p>;
  }

  return (
    <div className="comment-list">
      {topLevel.map((comment) => {
        const replies = repliesByParent.get(comment._id) ?? [];
        return (
          <div key={comment._id} className="comment-item">
            <CommentRowView
              comment={comment}
              liked={likedIds.has(comment._id) || hasLiked(comment._id)}
              onLike={() => handleLike(comment._id)}
              onReply={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
            />
            {replyingTo === comment._id && (
              <div className="comment-reply-form">
                <CommentForm
                  noteId={noteId}
                  parentId={comment._id}
                  submitLabel="Post Reply"
                  autoFocus
                  onCancel={() => setReplyingTo(null)}
                  onSuccess={() => setReplyingTo(null)}
                />
              </div>
            )}
            {replies.length > 0 && (
              <div className="comment-replies">
                {replies.map((reply) => (
                  <CommentRowView
                    key={reply._id}
                    comment={reply}
                    liked={likedIds.has(reply._id) || hasLiked(reply._id)}
                    onLike={() => handleLike(reply._id)}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
