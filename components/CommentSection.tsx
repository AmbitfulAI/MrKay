"use client";

import { useCommentsQuery } from "@/queries/comments";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

interface Props {
  noteId: string;
}

export default function CommentSection({ noteId }: Props) {
  const { data: comments = [] } = useCommentsQuery(noteId);
  const count = comments.length;

  return (
    <div className="comment-section">
      <h2 className="comment-heading">
        {count > 0 ? `${count} Comment${count === 1 ? "" : "s"}` : "Leave a Comment"}
      </h2>
      <CommentForm noteId={noteId} />
      <CommentList noteId={noteId} />
    </div>
  );
}
