import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";
import { MdLocationOn, MdOutlineEmail } from "react-icons/md";

export default function Footer() {
  return (
    // <div className="mt-auto md:mt-auto h-max w-full md:h-auto bg-[#2a1a0e] text-gray-200 p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-10 rounded-t-[3rem]  box-border text-center align-center justify-center">
   <div className="mt-auto md:mt-auto h-max w-full md:h-auto bg-[#0F0D08] text-gray-200 p-8 pt-50 md:pt-50 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-10 box-border text-center align-center justify-center relative z-10 clip-diagonal">   
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
        <a href="#home" className="hover:underline">Home</a>
    <a href="#about" className="hover:underline">About</a>
    <a href="#timeline" className="hover:underline">Timeline</a>
    <a href="#contact" className="hover:underline">Contact</a>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg uppercase mb-4 tracking-wider  md:text-start">
          CONTACT US
        </h3>
        <div className="flex flex-col gap-4 text-gray-300">
          <a className="flex items-start gap-3" href="https://maps.app.goo.gl/qRjYcgDzwLcFreSz9" target="_blank">
            <MdLocationOn className="text-xl mt-1 flex-shrink-0" />
            <span className="text-start">UCSC Building Complex, 35 Reid Ave, Colombo 00700</span>
          </a>
               <a className="flex items-center gap-3" href="https://www.linkedin.com/company/cssl-genz-chapter-of-ucsc" target="_blank">
            <FaLinkedin className="text-xl" />
            <span>@cssl-genz-chapter-of-ucsc</span>
          </a>
          <a className="flex items-center gap-3" href="https://www.instagram.com/cssl_ucsc" target="_blank">
            <FaInstagram className="text-xl" />
            <span>@cssl_ucsc</span>
          </a>
          <a className="flex items-center gap-3" href="https://www.facebook.com/cssl.ucsc" target="_blank">
            <FaFacebook className="text-xl" />
            <span>@cssl.ucsc</span>
          </a>
     
        </div>
      </div>
      
    </div>
  );
}