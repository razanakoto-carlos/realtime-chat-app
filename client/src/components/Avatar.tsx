function Avatar({ initials, index, size = "md", online = false }) {
  
  const AVATAR_COLORS = [
    "bg-indigo-100 text-indigo-600",
    "bg-emerald-100 text-emerald-600",
    "bg-amber-100 text-amber-700",
    "bg-rose-100 text-rose-600",
  ];

  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const sz = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";
  return (
    <div className="relative flex-shrink-0">
      <div
        className={`${sz} ${color} rounded-full flex items-center justify-center font-semibold select-none`}
      >
        {initials}
      </div>
      {online && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full" />
      )}
    </div>
  );
}

export default Avatar