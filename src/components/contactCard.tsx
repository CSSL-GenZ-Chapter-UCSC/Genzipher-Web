export default function ContactCard({
  name,
  role,
  email,
  phone,
  profilePic,
  picPosition = "left",
}: {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  profilePic: string;
  picPosition?: "left" | "right"; 
}) {
  return (
    <div
      className={`
        flex
        md:flex-col
        items-center
        gap-4
        text-2xl
        p-4 md:p-8
        w-[90%] md:w-full
        bg-[#140E021C] md:bg-inherit
        rounded-2xl
        transition-all
        ${picPosition === "right" ? "flex-row-reverse" : "flex-row"}
      `}
    >
      {/* IMAGE */}
      <div
        className="
          rounded-full
          w-[6rem] h-[6rem]
          md:w-[10rem] md:h-[10rem]
          bg-center bg-cover bg-no-repeat
          shrink-0
        "
        style={{ backgroundImage: `url(${profilePic})` }}
      />

      {/* TEXT */}
      <div className="flex flex-col gap-1 text-center md:text-center leading-tight">
        <span className="text-[1.1rem] md:text-[1.3rem]">
          {name}
        </span>
        <span className="opacity-80 text-[0.9rem] md:text-[1.1rem]">
          {role}
        </span>
        <span className="underline text-[0.9rem] md:text-[1rem] break-all">
          {email}
        </span>
        <span className="text-[1rem] md:text-[1.1rem]">{phone}</span>
      </div>
    </div>
  );
}
