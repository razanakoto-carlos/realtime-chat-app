import { useAuthStore } from "../store/useAuthStore";

function Avatar({ size = "md" }) {
  const sz = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";
  const { user } = useAuthStore();
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
      {/* {online && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full" />
      )} */}
    </div>
  );
}

export default Avatar;
