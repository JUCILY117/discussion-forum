import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { useGetThreadsQuery } from "../features/thread/threadApi";
import ThreadCard from "../components/Threads/ThreadCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

export default function ThreadsPage() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [filters, setFilters] = useState({
    category: "",
    tags: [],
    sort: "recent",
    search: "",
    page: 1,
    limit: 10,
  });

  const { data: threads, isLoading, isError } = useGetThreadsQuery(filters);

  useEffect(() => {
    setFilters((f) => ({ ...f, page: 1 }));
  }, [filters.category, filters.tags, filters.sort, filters.search]);

  const updateFilter = (key, value) => {
    setFilters((f) => ({ ...f, [key]: value, page: 1 }));
  };

  const handleTagsInput = (value) => {
    const tagsArray = value
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");
    updateFilter("tags", tagsArray);
  };

  const clearSearch = () => updateFilter("search", "");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        backgroundColor: theme.background,
        color: theme.textPrimary,
        minHeight: "calc(100vh - 88px)",
        padding: "2.5rem 3rem",
        transition: "background-color 0.4s, color 0.4s",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginBottom: "2.5rem",
          gap: "1rem",
        }}
      >
        <h1
          style={{
            fontSize: "2.2rem",
            fontWeight: "900",
            color: theme.textPrimary,
          }}
        >
          Threads
        </h1>

        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <select
            value={filters.category}
            onChange={(e) => updateFilter("category", e.target.value)}
            style={{
              padding: "0.7rem 1rem",
              borderRadius: theme.borderRadius,
              border: `1px solid ${theme.border}`,
              backgroundColor: theme.surface,
              color: theme.textPrimary,
              minWidth: "160px",
              cursor: "pointer",
              outline: "none",
              boxShadow: "none",
            }}
          >
            <option value="">All Categories</option>
            <option value="Gaming">Gaming</option>
            <option value="Steam">Steam</option>
            <option value="Streaming">Streaming</option>
          </select>

          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={filters.tags.join(", ")}
            onChange={(e) => handleTagsInput(e.target.value)}
            style={{
              flexGrow: 1,
              maxWidth: "260px",
              padding: "0.7rem 1rem",
              borderRadius: theme.borderRadius,
              border: `1px solid ${theme.border}`,
              backgroundColor: theme.surface,
              color: theme.textPrimary,
              outline: "none",
              boxShadow: "none",
            }}
          />

          <select
            value={filters.sort}
            onChange={(e) => updateFilter("sort", e.target.value)}
            style={{
              padding: "0.7rem 1rem",
              borderRadius: theme.borderRadius,
              border: `1px solid ${theme.border}`,
              backgroundColor: theme.surface,
              color: theme.textPrimary,
              minWidth: "150px",
              cursor: "pointer",
              outline: "none",
              boxShadow: "none",
            }}
          >
            <option value="recent">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="upvoted">Most Upvoted</option>
          </select>

          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              maxWidth: "300px",
              width: "100%",
            }}
          >
            <input
              type="search"
              placeholder="Search threads..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              style={{
                outline: "none",
                boxShadow: "none",
                width: "100%",
                padding: "0.7rem 2.5rem 0.7rem 1rem",
                borderRadius: theme.borderRadius,
                border: `1px solid ${theme.border}`,
                backgroundColor: theme.surface,
                color: theme.textPrimary,
              }}
            />
            {filters.search && (
              <IoClose
                onClick={clearSearch}
                size={20}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  cursor: "pointer",
                  color: theme.accent,
                  opacity: 0.85,
                }}
              />
            )}
          </div>
        </div>

        {user && (
          <motion.button
            onClick={() => navigate("/threads/create")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              backgroundColor: theme.accent,
              color: theme.surface,
              padding: "0.7rem 1.6rem",
              borderRadius: "30px",
              fontWeight: "700",
              border: "none",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
          >
            + Create Thread
          </motion.button>
        )}
      </motion.div>

      {isLoading && (
        <p style={{ color: theme.textSecondary, textAlign: "center" }}>
          Loading threads...
        </p>
      )}
      {isError && (
        <p style={{ color: theme.textSecondary, textAlign: "center" }}>
          Failed to load threads.
        </p>
      )}
      {!isLoading && threads?.length === 0 && (
        <p style={{ color: theme.textSecondary, textAlign: "center" }}>
          No threads found.
        </p>
      )}

      <div style={{ maxWidth: "850px", margin: "0 auto" }}>
        {threads?.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))}
      </div>
    </motion.div>
  );
}
