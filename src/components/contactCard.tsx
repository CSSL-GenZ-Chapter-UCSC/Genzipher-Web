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
        group
        flex
        md:flex-col
        items-center
        gap-4
        text-2xl
        p-4 md:p-8
        w-[90%] md:w-full
        bg-[#140E021C] md:bg-inherit
        rounded-2xl
        transition-all duration-300 ease-out
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

<span
  className="
    relative inline-block
    text-[1.1rem] md:text-[1.3rem]
    font-normal
                       
    transition-all duration-500 ease-out
    group-hover:text-transparent          
    group-hover:bg-gradient-to-r
    group-hover:from-[#4C2901]
    group-hover:via-[#C3840F]
    group-hover:to-[#4C2901]
    group-hover:bg-[length:200%_auto]
    group-hover:bg-left
    group-hover:bg-right
    group-hover:bg-clip-text
  "
>
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
