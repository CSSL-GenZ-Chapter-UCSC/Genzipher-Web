import ContactCard from "@/components/contactCard";

export default function ContactUs() {
  return (
    <div className="flex  flex-col w-full h-full bg-[#D8CDB9]">
        <h2 className="text-6xl block md:hidden text-[#5B3F04] text-center  mt-10 mb-5">
            Contact Us
        </h2>
      <div className="flex flex-col justify-between  items-center  md:grid md:grid-cols-4 w-full h-[80%] md:h-full ">
        <ContactCard name="Mr.Surname" role="Finance Lead" email="email@email.com" phone="0734562819"/>
        <ContactCard name="Mr.Surname" role="Finance Lead" email="email@email.com" phone="0734562819"/>
        <ContactCard name="Mr.Surname" role="Finance Lead" email="email@email.com" phone="0734562819"/>
        <ContactCard name="Mr.Surname" role="Finance Lead" email="email@email.com" phone="0734562819"/>
      </div>
    </div>
  );
}
