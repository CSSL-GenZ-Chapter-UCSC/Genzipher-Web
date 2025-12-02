export default function Button({
  text,
  onClick,
  className = "", 
  disabled = false,
}: Readonly<{
  text: string;
  onClick?: () => void;
  className?: string;
  disabled: boolean
}>) {
  return (
    <div
      // Added 'select-none' to prevent text highlighting during rapid clicks
      className={`
        bg-gradient-to-r from-[#4C2901] via-[#C3840F] to-[#4C2901] 
        bg-[length:200%_auto] 
        transition-all duration-500 ease-out
        hover:bg-right
        active:scale-95
        text-[#D8CDB9] w-max rounded-md text-2xl py-2 px-4 cursor-pointer select-none
        ${className}
      `}
      onClick={!disabled ? onClick : ()=>{}}
    >
      {text}
    </div>
  );
}