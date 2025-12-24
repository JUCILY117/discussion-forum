import { useTheme } from "../../contexts/ThemeContext";

export default function ProfileAvatar({ username, avatar }) {
  const { theme } = useTheme();

  const avatarSrc =
    avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      username
    )}&background=random&size=256`;

  return (
    <div className="absolute -top-24 left-12">
      <div
        className="h-48 w-48 rounded-full p-2"
        style={{
          backgroundColor: theme.surface,
          boxShadow: `0 16px 40px ${theme.shadow}`,
          transition: "background-color 0.5s, box-shadow 0.5s",
        }}
      >
        <img
          src={avatarSrc}
          alt={`${username} avatar`}
          className="h-full w-full rounded-full object-cover select-none"
          draggable={false}
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              username
            )}&background=random&size=256`;
          }}
        />
      </div>
    </div>
  );
}
