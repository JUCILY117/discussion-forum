import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

export default function ThreadCard({ thread }) {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/threads/${thread.id}`)}
      style={{
        padding: theme.spacingMedium || "1.25rem",
        borderRadius: theme.borderRadius || "12px",
        border: `1px solid ${theme.border}`,
        backgroundColor: theme.surface,
        color: theme.textPrimary,
        cursor: "pointer",
        marginBottom: theme.spacingLarge || "1.5rem",
        boxShadow: `0 1px 6px rgba(0,0,0,0.06)`,
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
        display: "flex",
        flexDirection: "column",
        gap: theme.spacingSmall || "0.5rem",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 6px 20px rgba(0,0,0,0.12)`;
        e.currentTarget.style.transform = `translateY(-4px)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 1px 6px rgba(0,0,0,0.06)`;
        e.currentTarget.style.transform = `translateY(0)`;
      }}
      title={`by ${thread.author?.username || "Unknown"} in ${thread.category?.name || "Uncategorized"}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigate(`/threads/${thread.id}`);
      }}
      aria-label={`View thread titled ${thread.title}`}
    >
      <h2
        style={{
          margin: 0,
          fontSize: theme.fontSizeLarge || "1.375rem",
          fontWeight: 700,
          letterSpacing: "0.02em",
          lineHeight: 1.3,
          color: theme.textPrimary,
        }}
      >
        {thread.title}
      </h2>

      <div
        style={{
          display: "flex",
          gap: theme.spacingSmall || "0.75rem",
          fontSize: theme.fontSizeSmall || "0.875rem",
          fontWeight: 500,
          color: theme.textSecondary,
          userSelect: "none",
        }}
      >
        <span>by <strong>{thread.author?.username || "Unknown"}</strong></span>
        <span>•</span>
        <span>{thread.category?.name || "Uncategorized"}</span>
      </div>

      <p
        style={{
          margin: 0,
          marginTop: theme.spacingSmall || "0.75rem",
          fontSize: theme.fontSizeBase || "1rem",
          lineHeight: 1.6,
          color: theme.textPrimary,
          maxHeight: "4.5em",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
        }}
      >
        {thread.description}
      </p>

      <div
        style={{
          marginTop: theme.spacingMedium || "1rem",
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
        }}
      >
        {thread.tags?.map(({ tag }) => (
          <span
            key={tag.id}
            style={{
              backgroundColor: theme.accentLight || "rgba(0, 123, 255, 0.15)",
              color: theme.accent,
              borderRadius: "16px",
              padding: "4px 12px",
              fontSize: theme.fontSizeSmall || "0.75rem",
              fontWeight: 600,
              userSelect: "none",
              whiteSpace: "nowrap",
              boxShadow: `0 1px 2px rgba(0,0,0,0.05)`,
              transition: "background-color 0.2s ease",
            }}
          >
            #{tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}
