export default function TimerCard({value, label}: {value: number; label: string}) {

    return (
      <div className="text-[1rem] md:text-[2rem] timer-item flex flex-col items-center justify-center text-[#D7CEBB] w-[25%] aspect-square">
        <div
          className="aspect-square md:text-[6rem] text-[2rem] box bg-[#D8CDBB] p-1 text-[#211600] md:rounded-[2.8rem] rounded-[1rem]"
          style={{ lineHeight: "normal" }}
        >
          {value.toString().padStart(2, "0")}
        </div>
        {label}
      </div>
    );
}
