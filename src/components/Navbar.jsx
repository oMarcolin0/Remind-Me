import React from "react";
import logoImage from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="sticky   top-0 z-90 bg-[#008B8B] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-0.3">
          <img 
            src={logoImage} 
            alt="Logo ReminderMe" 
            className="max-w-[80px] h-auto"
          />
          <h1 className="text-2xl font-bold">Remind<span className="text-[#008f8B]">Me</span></h1>
        </div>

        <ul className="flex gap-8 text-lg font-medium">
          <li><a href="#home" className="hover:text-[#20B2AA] transition">Home</a></li>
          <li><a href="#sobre" className="hover:text-[#20B2AA] transition">Sobre</a></li>
          <li>
            <a
              href="/login"
              className="bg-[#20B2AA] px-4 py-2 rounded-lg hover:bg-[#28c4ba] transition"
            >
              Entrar
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}