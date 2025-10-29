export default function Button({
  text,
  onClick,
}: Readonly<{
  text: string;
  onClick?: () => void;
}>) {
  return (
    <div className="bg-gradient-to-r from-[#4C2901] via-[#C3840F] to-[#C3840F] text-[#D8CDB9] w-max rounded-md text-xl py-2 px-4 cursor-pointer">
      {text}
    </div>
  );
}
