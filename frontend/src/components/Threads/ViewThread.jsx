import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { FaReply } from "react-icons/fa";
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
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",
          flexWrap: "wrap",
          padding: "2rem 2.5rem 1.2rem 2.5rem",
          borderBottom: `1.5px solid ${theme.border}`,
        }}
      >
        <span
          style={{
            background: theme.gradient,
            color: theme.textPrimary,
            fontWeight: "700",
            fontSize: "1rem",
            padding: "5px 22px",
            borderRadius: "18px",
          }}
        >
          {thread.category?.name}
        </span>
        <span
          style={{
            color: theme.textSecondary,
            fontWeight: "500",
            fontSize: "0.97rem",
          }}
        >
          Posted by <b style={{ color: theme.accent }}>{thread.author?.username}</b> •{" "}
          {new Date(thread.createdAt).toLocaleString()}
        </span>
        <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", marginLeft: "auto" }}>
          {thread.tags?.map((t) => (
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
              }}
            >
              #{t.tag.name}
            </span>
          ))}
        </div>
      </div>
      <div className="pl-[4rem]">
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          width: "100%",
          padding: "2rem 3rem 1.4rem 2rem",
        }}
      >
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontSize: "2.3rem",
              fontWeight: "900",
              color: theme.textPrimary,
              marginBottom: "1.0rem",
            }}
          >
            {thread.title}
          </h1>
          <div
            style={{
              fontSize: "1.15rem",
              marginBottom: "2rem",
              color: theme.textPrimary,
            }}
          >
            {thread.description}
          </div>

          <form onSubmit={handleReply} >
            <textarea
              value={replyContent}
              onChange={(e) => {
                setReplyContent(e.target.value);
                e.target.style.height = "3rem";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              placeholder="Add a comment..."
              style={{
                width: "80%",
                height: "3rem",
                minHeight: "3rem",
                background: "none",
                border: `1px solid ${theme.border}`,
                color: theme.textPrimary,
                borderRadius: "25px",
                padding: "0.7rem 1.5rem",
                resize: "none",
                overflow: "hidden",
                outline: "none",
                fontSize: "1rem",
                lineHeight: "1.5rem",
              }}
              required
            />

            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.6rem", marginLeft: "0.8rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <motion.button
                  onClick={() => handleVote(1)}
                  whileTap={{ scale: 1.13 }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: theme.accent,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <BiSolidUpvote size={20} />
                  {upvotes > 0 ? <span>{upvotes}</span> : <span style={{ fontSize: "0.8rem" }}>Vote</span>}
                </motion.button>

                <motion.button
                  onClick={() => handleVote(-1)}
                  whileTap={{ scale: 1.13 }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#ef4444",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <BiSolidDownvote size={20} />
                  {downvotes > 0 && <span>{downvotes}</span>}
                </motion.button>
              </div>
              <motion.button
                type="submit"
                disabled={postingReply || !replyContent.trim()}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "none",
                  border: "none",
                  color: theme.accent,
                  cursor: postingReply ? "not-allowed" : "pointer",
                  fontWeight: "600",
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <FaReply size={15} />
                <span>{postingReply ? "Posting..." : "Reply"}</span>
              </motion.button>
            </div>
          </form>
        </div>
      </div>

      <div style={{ padding: "0 3rem 2.2rem 3rem", width: "100%" }}>
        <h3
          style={{
            margin: "1.7rem 0 1rem 0",
            fontSize: "1.14rem",
            fontWeight: 700,
            color: theme.textPrimary,
          }}
        >
          Comments
        </h3>
        {loadingReplies ? (
          <div style={{ color: theme.textSecondary }}>Loading replies...</div>
        ) : replies && replies.length > 0 ? (
          replies.map((reply) => (
            <Reply key={reply.id} reply={reply} threadId={threadId} refetchReplies={refetch} depth={0} />
          ))
        ) : (
          <div style={{ color: theme.textSecondary }}>No comments yet.</div>
        )}
      </div>
      </div>
    </motion.div>
  );
}
