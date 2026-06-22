"use client";

interface UserAvatarProps {
  name?: string;
  avatar?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const SIZE = {
  sm: "w-6 h-6 text-xs rounded-full",
  md: "w-8 h-8 text-sm rounded-full",
  lg: "w-20 h-20 text-3xl rounded-2xl",
  xl: "w-28 h-28 text-4xl rounded-2xl",
} as const;

export function UserAvatar({ name, avatar, size = "md", className = "" }: UserAvatarProps) {
  const initial = (name ?? "U")[0].toUpperCase();
  const sizeClass = SIZE[size];

  if (avatar) {
    return (
      <div className={`relative overflow-hidden border-2 border-gold/30 ${sizeClass} ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatar}
          alt={name ? `${name}'s profile photo` : "Profile photo"}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`gold-gradient flex items-center justify-center font-heading font-black text-white shadow-md ${sizeClass} ${className}`}
      aria-hidden={!name}
    >
      {initial}
    </div>
  );
}
