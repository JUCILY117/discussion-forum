import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { FaMinusCircle, FaPlusCircle, FaReply } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";
import { useVoteMutation, useAddReplyMutation } from "../../features/threadView/threadViewApi";
import toast from "react-hot-toast";

export default function Reply({
  reply,
  threadId,
  refetchReplies,
  depth = 0,
  isLast = false
}) {
  const { theme } = useTheme();
  const [vote] = useVoteMutation();
  const [addReply, { isLoading }] = useAddReplyMutation();
  const [replyContent, setReplyContent] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [voteDiff, setVoteDiff] = useState(0);

  const upvotesCount = (reply.votes?.filter(v => v.value === 1).length || 0) + voteDiff;
  const downvotesCount = (reply.votes?.filter(v => v.value === -1).length || 0) - voteDiff;

  const handleVote = async (value) => {
    setVoteDiff(prev => prev + value);
    try {
      await vote({ replyId: reply.id, value }).unwrap();
      setVoteDiff(0);
      toast.success("Vote registered!");
      refetchReplies();
    } catch (err) {
      setVoteDiff(prev => prev - value);
      toast.error(err?.data?.error || "Vote failed.");
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    try {
      await addReply({ threadId: Number(threadId), content: replyContent, parentReplyId: reply.id }).unwrap();
      setReplyContent("");
      setShowReplyBox(false);
      toast.success("Reply posted!");
      refetchReplies();
    } catch (err) {
      toast.error(err?.data?.error || "Failed to post reply.");
    }
  };

  return (
    <div
      className="flex items-start relative min-h-[40px]"
    >
      <div
        className="flex flex-row items-center min-w-[48px] mr-2"
        style={{ marginLeft: depth * 32 }}
      >
        {depth > 0 && (
          <div
            style={{
              position: "absolute",
              left: (depth * 32) + 22,
              top: 36,
              bottom: isLast ? 36 : 0,
              width: "2px",
              background: theme.border,
              borderRadius: "8px"
            }}
          />
        )}
        <div
          onClick={() => setCollapsed(!collapsed)}
          className="cursor-pointer"
          style={{
            color: theme.accent,
            zIndex: 1
          }}
        >
          {collapsed ? <FaPlusCircle size={18}/> : <FaMinusCircle size={18}/>}
        </div>
        {!collapsed && (
          <img
            src={reply.author?.avatar || `https://ui-avatars.com/api/?name=${reply.author?.username}&background=random&size=64`}
            alt={reply.author?.username}
            className="w-7 h-7 rounded-full object-cover ml-2"
            style={{
              border: `1.3px solid ${theme.border}`,
              background: theme.surface,
              zIndex: 10
            }}
          />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <strong
            style={{ color: theme.textPrimary, fontSize: "1.03rem" }}
            className=""
          >
            {reply.author?.username || "Anonymous"}
          </strong>
          <span style={{ color: theme.textSecondary, fontSize: "0.97rem" }}>
            • {new Date(reply.createdAt).toLocaleString()}
          </span>
        </div>

        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.div
              key="reply-content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.27 }}
              style={{ overflow: "hidden" }}
              className=""
            >
              <div
                style={{
                  fontSize: "1.01rem",
                  color: theme.textPrimary,
                  marginBottom: "8px",
                }}
              >
                {reply.content}
              </div>
              <div className="flex items-center gap-2 mb-1">
                <motion.button
                  onClick={() => handleVote(1)}
                  style={{
                    background: "none",
                    border: "none",
                    color: theme.accent,
                    cursor: "pointer",
                    fontWeight: 700
                  }}
                  whileTap={{ scale: 1.13 }}
                  className="flex items-center"
                >
                  <BiSolidUpvote size={19} />
                  {upvotesCount > 0 ? (
                    <span>{upvotesCount}</span>
                  ) : (
                    <span className="text-xs" style={{ fontSize: "0.77rem" }}>
                      Vote
                    </span>
                  )}
                </motion.button>
                <motion.button
                  onClick={() => handleVote(-1)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#ef4444",
                    cursor: "pointer",
                    fontWeight: 700
                  }}
                  whileTap={{ scale: 1.13 }}
                  className="flex items-center"
                >
                  <BiSolidDownvote size={19} />
                  {downvotesCount > 0 && <span>{downvotesCount}</span>}
                </motion.button>
                <button
                  onClick={() => setShowReplyBox((v) => !v)}
                  style={{
                    background: "none",
                    border: "none",
                    color: theme.accent,
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "0.95rem"
                  }}
                  className="flex items-center gap-1"
                >
                  <FaReply size={15} />
                  <span>{showReplyBox ? "Cancel" : "Reply"}</span>
                </button>
              </div>

              {showReplyBox && (
                <form onSubmit={handleReply} className="mt-2">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Reply..."
                    rows={2}
                    className="w-full rounded-md p-2 resize-vertical outline-none text-sm"
                    style={{
                      border: `1px solid ${theme.border}`,
                      background: theme.background,
                      color: theme.textPrimary,
                    }}
                    required
                  />
                  <motion.button
                    type="submit"
                    disabled={isLoading || !replyContent.trim()}
                    style={{
                      backgroundColor: theme.accent,
                      color: theme.surface,
                      border: "none",
                      borderRadius: "18px",
                      fontWeight: 700,
                      cursor: isLoading ? "not-allowed" : "pointer",
                      fontSize: "0.93rem"
                    }}
                    className="mt-2 px-4 py-1"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {isLoading ? "Replying..." : "Reply"}
                  </motion.button>
                </form>
              )}
              {reply.childReplies?.length > 0 && (
                <div className="mt-2">
                  {reply.childReplies.map((child, idx) => (
                    <Reply
                      key={child.id}
                      reply={child}
                      threadId={threadId}
                      refetchReplies={refetchReplies}
                      depth={depth + 1}
                      isLast={idx === reply.childReplies.length - 1}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
