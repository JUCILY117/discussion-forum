import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  useCreateThreadMutation,
  useGetCategoriesQuery,
  useGetTagsQuery,
} from "../features/thread/threadApi";
import { useTheme } from "../contexts/ThemeContext";
import { FaTimes, FaPlusCircle } from "react-icons/fa";
import { BiSolidTagAlt } from "react-icons/bi";

export default function CreateThreadModal({ isOpen, onClose }) {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const { data: categories = [] } = useGetCategoriesQuery();
  const [createThread, { isLoading: threadLoading }] = useCreateThreadMutation();

  const [tagSearch, setTagSearch] = useState("");
  const { data: tags = [] } = useGetTagsQuery(tagSearch);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  function handleTagInputKeyDown(e) {
    if (
      (e.key === "Enter" || e.key === ",") &&
      tagInput.trim() &&
      !selectedTags.includes(tagInput.trim().toLowerCase())
    ) {
      setSelectedTags((tags) => [...tags, tagInput.trim().toLowerCase()]);
      setTagInput("");
    }
  }

  function removeTag(tag) {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedCategory || !title.trim() || !description.trim()) {
      toast.error("Please fill all required fields.");
      return;
    }
    const payload = {
      title,
      description,
      categoryId: Number(selectedCategory),
      tagNames: selectedTags,
    };
    try {
      const result = await createThread(payload).unwrap();
      toast.success("Thread created!");
      onClose();
      if (result.id) {
        navigate(`/threads/${result.id}`);
       }
    } catch (err) {
      toast.error(err?.data?.error || "Failed to create thread.");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 998,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            minWidth: "100vw",
            overflowY: "none",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#000",
              zIndex: 998,
            }}
          />

          <motion.div
            ref={modalRef}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              background: theme.surface,
              color: theme.textPrimary,
              borderRadius: "18px",
              padding: "1.5rem 1.5rem",
              width: "95vw",
              maxWidth: "520px",
              zIndex: 999,
              boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
              display: "flex",
              flexDirection: "column",
              maxHeight: "70vh",
              overflowY: "auto",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.8rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 900,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  color: theme.accent,
                  margin: 0,
                }}
              >
                <FaPlusCircle />
                Create New Thread
              </h2>

              <button
                onClick={onClose}
                aria-label="Close modal"
                style={{
                  background: theme.background,
                  border: "none",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: theme.textSecondary,
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = theme.border)}
                onMouseLeave={(e) => (e.currentTarget.style.background = theme.background)}
              >
                <FaTimes size={18} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
                flexGrow: 1,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{
                    color: theme.textSecondary,
                    fontWeight: 600,
                    marginBottom: "0.4rem",
                  }}
                >
                  Category
                </label>
                <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    required
                    style={{
                        padding: "0.6rem 0.9rem",
                        fontSize: "0.98rem",
                        borderRadius: "25px",
                        border: `1.5px solid ${theme.border}`,
                        backgroundColor: theme.surface,
                        color: theme.textPrimary,
                        outline: "none",
                        transition: "border-color 0.3s",
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                    }}
                    >
                  <option style={{ backgroundColor: theme.surface, color: theme.textPrimary }} value="" disabled>
                        Select Category
                    </option>
                    {categories.map((cat) => (
                        <option
                        key={cat.id}
                        value={cat.id}
                        style={{ backgroundColor: theme.surface, color: theme.textPrimary }}
                        >
                        {cat.name}
                        </option>
                    ))}
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{
                    color: theme.textSecondary,
                    fontWeight: 600,
                    marginBottom: "0.4rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontSize: "1rem",
                  }}
                >
                  <BiSolidTagAlt />
                  Tags{" "}
                  <span style={{ fontWeight: 400, fontSize: "0.85rem", marginLeft: 6 }}>
                    (Enter/Comma to add)
                  </span>
                </label>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    alignItems: "center",
                    background: theme.surface,
                    border: `1.5px solid ${theme.border}`,
                    borderRadius: "25px",
                    paddingLeft: "1rem",
                    maxHeight: "3rem",
                    cursor: "text",
                  }}
                  onClick={() => document.getElementById("tag-input").focus()}
                >
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: theme.accent + "22",
                        color: theme.accent,
                        padding: "6px 12px",
                        borderRadius: "25px",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        border: `1.5px solid ${theme.accent}`,
                      }}
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        style={{
                          background: "none",
                          border: "none",
                          color: theme.accent,
                          cursor: "pointer",
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          lineHeight: 1,
                          padding: 0,
                          marginLeft: "4px",
                        }}
                        aria-label={`Remove tag ${tag}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    id="tag-input"
                    placeholder="Add tag..."
                    value={tagInput}
                    onChange={(e) => {
                      setTagInput(e.target.value);
                      setTagSearch(e.target.value);
                    }}
                    onKeyDown={handleTagInputKeyDown}
                    list="tag-options"
                    style={{
                      flex: 1,
                      border: "none",
                      outline: "none",
                      fontSize: "1rem",
                      background: "transparent",
                      minWidth: "90px",
                      color: theme.textPrimary,
                      padding: "6px 4px",
                    }}
                  />
                  <datalist id="tag-options">
                    {tags
                      .filter((t) => !selectedTags.includes(t.name.toLowerCase()))
                      .map((t) => (
                        <option value={t.name} key={t.id} />
                      ))}
                  </datalist>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{
                    color: theme.textSecondary,
                    fontWeight: 600,
                    marginBottom: "0.4rem",
                  }}
                >
                  Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={120}
                  required
                  style={{
                    padding: "0.6rem 0.9rem",
                    fontSize: "0.98rem",
                    borderRadius: "25px",
                    border: `1.5px solid ${theme.border}`,
                    background: "none",
                    maxHeight: "2.4rem",
                    color: theme.textPrimary,
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{
                    color: theme.textSecondary,
                    fontWeight: 600,
                    marginBottom: "0.4rem",
                  }}
                >
                  Description
                </label>
                <textarea
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                        e.target.style.height = "3rem";
                        e.target.style.height = e.target.scrollHeight + "px";
                    }}
                    maxLength={2000}
                    required
                    style={{
                        padding: "0.7rem 0.9rem",
                        fontSize: "0.98rem",
                        borderRadius: "25px",
                        border: `1.5px solid ${theme.border}`,
                        background: "none",
                        color: theme.textPrimary,
                        outline: "none",
                        resize: "none",
                        overflow: "hidden",
                        fontFamily: "inherit",
                        height: "3rem",
                        minHeight: "3rem",
                    }}
                    />
              </div>

              <motion.button
                type="submit"
                disabled={threadLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: theme.accent,
                  color: theme.surface,
                  border: "none",
                  borderRadius: "28px",
                  padding: "0.5rem 2rem",
                  fontWeight: 700,
                  fontSize: "1rem",
                  cursor: threadLoading ? "not-allowed" : "pointer",
                  opacity: threadLoading ? 0.7 : 1,
                  alignSelf: "flex-end",
                  marginTop: "1rem",
                  transition: "box-shadow 0.3s",
                }}
              >
                {threadLoading ? "Creating..." : "Create Thread"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
