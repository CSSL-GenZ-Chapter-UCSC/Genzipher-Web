import Image from "next/image";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { MdLocationOn, MdOutlineEmail } from "react-icons/md";

export default function Footer() {
  return (
    // <div className="mt-auto md:mt-auto h-max w-full md:h-auto bg-[#2a1a0e] text-gray-200 p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-10 rounded-t-[3rem]  box-border text-center align-center justify-center">
   <div className="mt-auto md:mt-auto h-max w-full md:h-auto bg-[#2a1a0e] text-gray-200 p-8 pt-50 md:pt-50 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-10 box-border text-center align-center justify-center relative z-10 clip-diagonal">   
      <div className="flex flex-col gap-6 justify-center align-center items-center">
        <div className="w-[80%] max-w-[300px]">
          <Image
            src="/assets/genzipher-text-logo-1.webp"
            alt="GenZipher Logo"
            width={700}
            height={900} 
            className="w-full h-auto" 
          />
        </div>
        <div className="w-[50%] max-w-[200px]">
          <Image
            src="/assets/CSSL-logo.webp"
            alt="CSSL Logo"
            width={700}
            height={900} 
            className="w-full h-auto" 
          />
        </div>
      </div>

      <div className="hidden md:block">
        <h3 className="font-bold text-lg uppercase mb-4 tracking-wider">
          QUICK LINKS
        </h3>
        <div className="flex flex-col gap-2 text-gray-300">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Timeline</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg uppercase mb-4 tracking-wider  md:text-start">
          CONTACT US
        </h3>
        <div className="flex flex-col gap-4 text-gray-300">
          <div className="flex items-start gap-3">
            <MdLocationOn className="text-xl mt-1 flex-shrink-0" />
            <span>No. address, address street, address City.</span>
          </div>
          <div className="flex items-center gap-3">
            <FaWhatsapp className="text-xl" />
            <span>000-000-0000</span>
          </div>
          <div className="flex items-center gap-3">
            <MdOutlineEmail className="text-xl" />
            <span>something@gmail.com</span>
          </div>
          <div className="flex items-center gap-3">
            <FaInstagram className="text-xl" />
            <span>@username</span>
          </div>
        </div>
      </div>
      
    </div>
  );
}