import ContactCard from "@/components/contactCard";

export default function ContactUs() {
  return (
    <div className="flex flex-col w-full h-full bg-[#D8CDB9]">
      {/* Mobile title */}
      <h2 className="text-6xl block md:hidden text-[#5B3F04] text-center mt-10 mb-5">
        Contact Us
      </h2>

      <div
        className="
          flex flex-col md:grid md:grid-cols-4 
          gap-6 md:gap-12
          w-full 
          md:px-[12%] 
          mt-8 md:mt-16
          items-center md:items-start
        "
      >
        <ContactCard
          name="Hansaja Kithmal Damsara"
          role="Event Co-Chair"
          email="hansaja.dev101@gmail.com"
          phone="+94 70 396 4857"
          profilePic="/assets/hansajakd.webp"
          picPosition="left"
        />

        <ContactCard
          name="Lehan Munasinghe"
          role="Event Co-Chair"
          email="lehanselaka@gmail.com"
          phone="+94 75 295 4809"
          profilePic="/assets/lehan-munasinghe.webp"
          picPosition="right"
        />

        <ContactCard
          name="Kaveesha Perera"
          role="Delegates Lead"
          email="kaveeshanirmal02@gmail.com"
          phone="+94 77 923 0596"
          profilePic="/assets/kaveeshanirmal.webp"
          picPosition="left"
        />

        <ContactCard
          name="Ranuga Lecamwasam"
          role="Events Lead"
          email="ranugalecamwasam2002@gmail.com"
          phone="+94 77 772 1655"
          profilePic="/assets/ranuga-lecamwasam.webp"
          picPosition="right"
        />
      </div>
    </div>
  );
}
