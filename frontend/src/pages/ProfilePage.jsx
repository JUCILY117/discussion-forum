import ProfileHeader from "../components/profile/ProfileHeader";
import { useTheme } from "../contexts/ThemeContext";
import { useGetProfileQuery } from "../features/profile/profileApi";

export default function ProfilePage() {
  const { theme } = useTheme();
  const { data, isLoading, isError } = useGetProfileQuery();

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center"
        style={{
          height: "calc(100vh - 88px)",
          backgroundColor: theme.background,
        }}
      >
        <span style={{ color: theme.textSecondary }}>Loading profile…</span>
      </div>
    );
  }

  if (isError || !data?.user) {
    return (
      <div
        className="flex items-center justify-center"
        style={{
          height: "calc(100vh - 88px)",
          backgroundColor: theme.background,
        }}
      >
        <span style={{ color: theme.textSecondary }}>
          Failed to load profile
        </span>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col w-full overflow-hidden"
      style={{
        backgroundColor: theme.background,
        height: "calc(100vh - 88px)",
        transition: "background-color 0.5s, color 0.5s",
      }}
    >
      <ProfileHeader user={data.user} />
    </div>
  );
}
