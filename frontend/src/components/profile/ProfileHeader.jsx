import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import ProfileActions from "./ProfileActions";
import ProfileAvatar from "./ProfileAvatar";
import ProfileMeta from "./ProfileMeta";

export default function ProfileHeader({ user }) {
  const { theme } = useTheme();

  return (
    <div className="relative flex flex-col h-full">
      <div
        className="h-56 w-full shrink-0"
        style={{
            backgroundImage: user.bannerImage
            ? `url(${user.bannerImage})`
            : theme.gradient,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transition: "background-image 0.6s ease, background 0.6s ease",
        }}
        />
      <motion.div
        className="relative flex flex-col flex-1 px-10 pt-32 pb-8"
        style={{
          backgroundColor: theme.surface,
          boxShadow: `0 10px 30px ${theme.shadow}`,
          borderRadius: theme.borderRadius,
          marginTop: "-24px",
          transition:
            "background-color 0.5s, color 0.5s, box-shadow 0.5s",
        }}
      >
        <ProfileAvatar username={user.username} avatar={user.avatar}/>

        <div className="flex items-start justify-between">
          <div>
            <h1
              className="text-3xl font-extrabold"
              style={{ color: theme.textPrimary }}
            >
              @{user.username}
            </h1>

            {user.name && (
              <p
                className="text-base font-medium mt-2"
                style={{ color: theme.textSecondary }}
              >
                {user.name}
              </p>
            )}
          </div>

          <ProfileActions user={user} />
        </div>

        {user.bio && (
          <p
            className="mt-4 max-w-2xl text-lg leading-relaxed"
            style={{ color: theme.textPrimary }}
          >
            {user.bio}
          </p>
        )}

        <ProfileMeta user={user} />

        <div className="flex-1" />
      </motion.div>
    </div>
  );
}
