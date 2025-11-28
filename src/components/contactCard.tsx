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
        gap-4
        text-2xl
        p-[3%] md:p-[20%]
        w-[90%] md:w-full md:h-full
        justify-center items-center
        bg-[#140E021C] md:bg-inherit
        rounded-2xl
        md:mb-auto
        mb-[1rem]
        /* MOBILE: switch direction based on picPosition */
        ${picPosition === "right" ? "flex-row-reverse" : "flex-row"}
      `}
    >
      {/* PROFILE PIC */}
      <div
        className="
          rounded-full
          w-[7.5rem] md:w-[10rem]
          aspect-square
          shrink-0
          bg-center bg-cover bg-no-repeat
        "
        style={{ backgroundImage: `url(${profilePic})` }}
      ></div>

      {/* TEXT */}
      <div
        className="
          flex flex-col
          gap-2
          text-[1.1rem]
          md:text-[1.3rem]
          text-center
          leading-tight
        "
      >
        <span className="font-medium">{name}</span>
        <span className="text-[0.9rem] md:text-[1.1rem]">{role}</span>
        <span className="underline">{email}</span>
        <span>{phone}</span>
      </div>
    </div>
  );
}
