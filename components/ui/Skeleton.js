export default function Skeleton({ className = "", shimmer = true }) {
  return (
    <div
      className={`bg-elevated relative overflow-hidden animate-pulse ${className} ${
        shimmer
          ? "after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_2s_infinite] after:bg-gradient-to-r after:from-transparent after:via-text/5 after:to-transparent"
          : ""
      }`}
    />
  );
}
