import ContactCard from "@/components/contactCard";

export default function ContactUs() {
  return (
    <div className="flex  flex-col w-full h-full bg-[#D8CDB9]">
      <h2 className="text-6xl block md:hidden text-[#5B3F04] text-center  mt-10 mb-5">
        Contact Us
      </h2>
      <div className="flex flex-col justify-between  items-center  md:grid md:grid-cols-2 w-full h-[40%] md:h-full mt-[20%] md:mt-0 md:px-[15%] ">
        <ContactCard
          name="Hansaja Kithmal Damsara"
          role="Event Co-Chairs"
          email="hansaja.dev101@gmail.com"
          phone="+94 70 396 4857"
          profilePic="/assets/hansajakd.webp"
        />
        <ContactCard
          name="Lehan Munasinghe"
          role="Event Co-Chairs"
          email="lehanselaka@gmail.com"
          phone="+94 75 295 4809"
          profilePic="/assets/lehan-munasinghe.webp"
        />
      </div>
    </div>
  );
}
