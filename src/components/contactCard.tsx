export default function ContactCard() {
  return (
    <div className="flex md:flex-col gap-4 text-2xl p-[3%] md:p-[20%] w-[80%] md:w-full md:h-full justify-center items-center bg-[#140E021C] md:bg-inherit rounded-2xl">
      <div className="rounded-full bg-black w-[5rem] h-[5rem] md:w-[10rem] md:h-[10rem]"></div>
      <div className="flex flex-col text-[1.2rem] md:text-center">
        <span>Mr. surname</span>
        <span>Finance Lead</span>
        <span>email@emali.com</span>
        <span>073289293675</span>
      </div>
    </div>
  );
}
