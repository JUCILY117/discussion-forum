import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { useTheme } from "../../contexts/ThemeContext";
import {
  useGetThreadQuery,
  useGetRepliesQuery,
  useVoteMutation,
  useAddReplyMutation,
} from "../../features/threadView/threadViewApi";
import toast from "react-hot-toast";
import Reply from "./Reply";

export default function ViewThread() {
  const { theme } = useTheme();
  const { threadId } = useParams();
  const { data: thread, isLoading: loadingThread } = useGetThreadQuery(threadId);
  const { data: replies, isLoading: loadingReplies, refetch } = useGetRepliesQuery(threadId);

  const [vote] = useVoteMutation();
  const [addReply, { isLoading: postingReply }] = useAddReplyMutation();
  const [replyContent, setReplyContent] = useState("");
  const [voteDiff, setVoteDiff] = useState(0);

  const handleVote = async (value) => {
    setVoteDiff((prev) => prev + value);
    try {
      await vote({ threadId: Number(threadId), value }).unwrap();
      setVoteDiff(0);
      toast.success("Vote registered!");
    } catch (err) {
      setVoteDiff((prev) => prev - value);
      toast.error(err?.data?.error || "Vote failed.");
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    try {
      await addReply({ threadId: Number(threadId), content: replyContent }).unwrap();
      setReplyContent("");
      toast.success("Reply posted!");
      refetch();
    } catch (err) {
      toast.error(err?.data?.error || "Failed to reply.");
    }
  };

  if (loadingThread) return <div style={{ color: theme.textSecondary }}>Loading...</div>;
  if (!thread) return <div style={{ color: theme.textSecondary }}>Thread not found.</div>;

  const upvotes = (thread.votes?.filter(v => v.value === 1).length || 0) + (voteDiff > 0 ? voteDiff : 0);
  const downvotes = (thread.votes?.filter(v => v.value === -1).length || 0) + (voteDiff < 0 ? -voteDiff : 0);

  return (
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  style={{
    background: theme.surface,
    color: theme.textPrimary,
    width: "100%",
    minHeight: "calc(100vh - 88px)",
    transition: "background 0.4s, color 0.4s, border 0.4s",
    borderRadius: 0,
    boxShadow: "none",
    margin: "0",
    padding: "0",
    display: "flex",
    flexDirection: "column"
  }}
>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "2rem",
        flexWrap: "wrap",
        padding: "2rem 2.5rem 1.2rem 2.5rem",
        borderBottom: `1.5px solid ${theme.border}`,
        transition: "background 0.4s, color 0.4s"
      }}>
        <span style={{
          background: theme.gradient,
          color: theme.textPrimary,
          fontWeight: "700",
          fontSize: "1rem",
          padding: "5px 22px",
          borderRadius: "18px"
        }}>
          {thread.category?.name}
        </span>
        <span style={{
          color: theme.textSecondary,
          fontWeight: "500",
          fontSize: "0.97rem"
        }}>
          Posted by <b style={{ color: theme.accent }}>{thread.author?.username}</b> • {new Date(thread.createdAt).toLocaleString()}
        </span>
        <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", marginLeft: "auto" }}>
          {thread.tags?.map(t => (
            <span
              key={t.tag.id}
              style={{
                background: "rgba(253,186,140,0.16)",
                color: theme.accent,
                padding: "3px 13px",
                borderRadius: "16px",
                fontSize: "0.98rem",
                border: `1px solid ${theme.accent}`,
                fontWeight: "700",
                marginLeft: "2px"
              }}
            >
              #{t.tag.name}
            </span>
          ))}
        </div>
      </div>

      <div style={{
        display: "flex",
        alignItems: "flex-stretch",
        width: "100%",
        padding: "0",
        transition: "background 0.4s, color 0.4s"
      }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: theme.background,
            padding: "2.2rem 1.4rem",
            borderRight: `1.5px solid ${theme.border}`,
            minWidth: "64px"
          }}
        >
          <motion.button
            onClick={() => handleVote(1)}
            whileTap={{ scale: 1.2 }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: theme.accent,
            }}
          >
            <BiSolidUpvote size={34} />
            <div style={{ fontSize: "1.14rem", fontWeight: 700, color: theme.textPrimary }}>
              {upvotes > 0 ? upvotes : ''}
            </div>
          </motion.button>
          <motion.button
            onClick={() => handleVote(-1)}
            whileTap={{ scale: 1.2 }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#ef4444",
            }}
          >
            <BiSolidDownvote size={34} />
            <div style={{ fontSize: "1.14rem", fontWeight: 700, color: "#ef4444" }}>
              {downvotes > 0 ? downvotes : ''}
            </div>
          </motion.button>
        </div>

        <div style={{ flex: 1, padding: "2.2rem 3rem 1.4rem 2rem" }}>
          <h1
            style={{
              fontSize: "2.3rem",
              fontWeight: "900",
              color: theme.textPrimary,
              marginBottom: "1.0rem",
              transition: "color 0.4s"
            }}
          >
            {thread.title}
          </h1>
          <div style={{
            fontSize: "1.15rem",
            marginBottom: "2rem",
            color: theme.textPrimary,
            transition: "color 0.4s"
          }}>
            {thread.description}
          </div>

          <form onSubmit={handleReply} style={{ marginBottom: "2.2rem" }}>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={3}
              placeholder="Add a comment..."
              style={{
                width: "100%",
                background: theme.background,
                border: `1px solid ${theme.border}`,
                color: theme.textPrimary,
                borderRadius: theme.borderRadius,
                padding: "0.9rem",
                resize: "vertical",
                outline: "none",
                fontSize: "1.01rem",
                transition: "background 0.4s, color 0.4s"
              }}
              required
            />
            <motion.button
              type="submit"
              disabled={postingReply || !replyContent.trim()}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                marginTop: "0.4rem",
                background: theme.accent,
                color: theme.surface,
                border: "none",
                borderRadius: "18px",
                padding: "0.54rem 1.45rem",
                fontWeight: "700",
                fontSize: "1rem",
                cursor: postingReply ? "not-allowed" : "pointer"
              }}
            >
              {postingReply ? "Posting..." : "Reply"}
            </motion.button>
          </form>
        </div>
      </div>

      <div style={{
        padding: "0 3rem 2.2rem 3rem",
        width: "100%",
        transition: "background 0.4s, color 0.4s"
      }}>
        <h3 style={{
          margin: "1.7rem 0 1rem 0",
          fontSize: "1.14rem",
          fontWeight: 700,
          color: theme.textPrimary,
          transition: "color 0.4s"
        }}>Comments</h3>
        {loadingReplies ? (
          <div style={{ color: theme.textSecondary }}>Loading replies...</div>
        ) : replies && replies.length > 0 ? (
          replies.map((reply) => (
            <Reply
              key={reply.id}
              reply={reply}
              threadId={threadId}
              refetchReplies={refetch}
              depth={0}
            />
          ))
        ) : (
          <div style={{ color: theme.textSecondary }}>No comments yet.</div>
        )}
      </div>
    </motion.div>
  );
}
