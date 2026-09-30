import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    noteId:      { type: Schema.Types.ObjectId, ref: "Note", required: true, index: true },
    parentId:    { type: Schema.Types.ObjectId, ref: "Comment", default: null, index: true },
    authorName:  { type: String, required: true },
    authorEmail: { type: String, required: true },
    content:     { type: String, required: true },
    likes:       { type: Number, default: 0 },
  },
  { timestamps: true },
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
CommentSchema.set("toJSON", { transform: (_: unknown, ret: any) => { ret._id = String(ret._id); if (ret.noteId) ret.noteId = String(ret.noteId); if (ret.parentId) ret.parentId = String(ret.parentId); delete ret.__v; return ret; } });

export const Comment = mongoose.models.Comment ?? mongoose.model("Comment", CommentSchema);
