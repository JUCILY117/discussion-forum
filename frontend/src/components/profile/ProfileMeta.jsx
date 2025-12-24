import { Calendar, Link2, MapPin } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

function formatJoinedDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function normalizeWebsite(url) {
  return url.startsWith("http") ? url : `https://${url}`;
}

function displayWebsite(url) {
  return url.replace(/^https?:\/\//, "");
}

export default function ProfileMeta({ user }) {
  const { theme } = useTheme();

  return (
    <div
      className="mt-5 flex flex-wrap gap-6 text-sm font-medium"
      style={{
        color: theme.textSecondary,
        transition: "color 0.5s",
      }}
    >
      {user.location && (
        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <span>{user.location}</span>
        </div>
      )}

      {user.website && (
        <div className="flex items-center gap-2">
          <Link2 size={16} />
          <a
            href={normalizeWebsite(user.website)}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {displayWebsite(user.website)}
          </a>
        </div>
      )}

      {user.createdAt && (
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>Joined {formatJoinedDate(user.createdAt)}</span>
        </div>
      )}
    </div>
  );
}
