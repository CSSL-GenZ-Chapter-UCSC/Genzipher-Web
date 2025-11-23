export default function ContactCard({
  name,
  role,
  email,
  phone,
  profilePic,
}: {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  profilePic: string;
}) {
  return (
    <div className="flex md:flex-col gap-4 text-2xl p-[3%] md:p-[20%] w-[80%] md:w-full md:h-full justify-center items-center bg-[#140E021C] md:bg-inherit rounded-2xl">
      <div
        className="rounded-full w-[5rem] h-[5rem] md:w-[10rem] md:h-[10rem] bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${profilePic})`,
        }}
      ></div>

      <div className="flex flex-col text-[1.2rem] md:text-center">
        <span>{name}</span>
        <span>{role}</span>
        <span>{email}</span>
        <span>{phone}</span>
      </div>
    </div>
  );
}
