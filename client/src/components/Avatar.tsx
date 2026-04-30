interface AvatarProps {
  size?: string;
  user: { avatar: string; name: string };
}

function Avatar({ size = "md", user }: AvatarProps) {
  const sz = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";
  return (
    <div className="relative shrink-0">
      <div
        className={`${sz} rounded-full overflow-hidden flex items-center justify-center font-semibold select-none`}
      >
        <img
          src={user?.avatar}
          alt={user?.name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Avatar;
