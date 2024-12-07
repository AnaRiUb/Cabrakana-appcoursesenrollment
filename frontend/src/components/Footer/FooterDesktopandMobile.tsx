import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

const FooterDesktopandMobile: React.FC = () => {
  const isDesktop = useMediaQuery({ minWidth: 769 });
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleButtonClick = (route: string) => {
    setActiveButton(route);
    navigate(route);
  };

  return (
    <footer className="text-center box-border bg-black sm:bg-white/75">
      {isDesktop && (
        <div className="flex justify-between items-start p-6">
          <div className="w-1/2 px-5">
            <h3 className="mb-2 font-bold text-lg">Sobre Nosotros</h3>
            <p className="text-justify">
              Piwis es una plataforma dedicada a la educación colaborativa,
              diseñada para crear una comunidad activa de aprendizaje. Nuestro
              objetivo es ofrecer un espacio donde estudiantes, educadores y
              entusiastas del conocimiento puedan conectarse, compartir ideas y
              crecer juntos. Ofreciendo la mejor experiencia a nuestros
              usuarios.
            </p>
          </div>

          <div className="w-1/2 px-5">
            <p className="mb-2 font-semibold">Contacto: contacto@example.com</p>
            <p className="font-semibold">Teléfono: +51 999 999 999</p>
          </div>
        </div>
      )}

  {/*movil*/}

{isMobile && (
  <div className="flex justify-between bg-none gap-1">
    {[
      {
        route: "/courses",
        label: "Cursos",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 19V6.2C4 5.0799 4 4.51984 4.21799 4.09202C4.40973 3.71569 4.71569 3.40973 5.09202 3.21799C5.51984 3 6.0799 3 7.2 3H16.8C17.9201 3 18.4802 3 18.908 3.21799C19.2843 3.40973 19.5903 3.71569 19.782 4.09202C20 4.51984 20 5.0799 20 6.2V17H6C4.89543 17 4 17.8954 4 19ZM4 19C4 20.1046 4.89543 21 6 21H20M9 7H15M9 11H15M19 17V21"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
      {
        route: "/forums",
        label: "Foros",
        icon: (
          <svg
            fill="#000000"
            width="40px"
            height="40px"
            viewBox="0 -64 640 640"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path>
          </svg>
        ),
      },
      {
        route: "/events",
        label: "Eventos",
        icon: (
          <svg
            width="40px"
            height="40px"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <g fill="#000000" fillRule="evenodd" clipRule="evenodd">
              <path d="M8.675 4.173a.75.75 0 00-1.35 0l-1.14 2.359-2.546.38a.75.75 0 00-.418 1.273l1.85 1.84-.437 2.6a.75.75 0 001.094.786L8 12.19l2.272 1.22a.75.75 0 001.094-.785l-.437-2.602 1.85-1.839a.75.75 0 00-.418-1.273l-2.545-.38-1.14-2.359zM7.362 7.542L8 6.222l.638 1.32a.75.75 0 00.565.415l1.459.218-1.066 1.059a.75.75 0 00-.21.656l.247 1.476-1.278-.686a.75.75 0 00-.71 0l-1.278.686.248-1.476a.75.75 0 00-.211-.656l-1.066-1.06 1.46-.217a.75.75 0 00.564-.415z"></path>
              <path d="M12 .75a.75.75 0 00-1.5 0V1h-5V.75a.75.75 0 00-1.5 0V1H2.25A2.25 2.25 0 000 3.25v10.5A2.25 2.25 0 002.25 16h11.5A2.25 2.25 0 0016 13.75V3.25A2.25 2.25 0 0013.75 1H12V.75zm-8 2.5V2.5H2.25a.75.75 0 00-.75.75v10.5c0 .414.336.75.75.75h11.5a.75.75 0 00.75-.75V3.25a.75.75 0 00-.75-.75H12v.75a.75.75 0 01-1.5 0V2.5h-5z"></path>
            </g>
          </svg>
        ),
      },
    ].map((item) => (
      <button
        key={item.route}
        className={`w-1/3 flex flex-col items-center justify-around bg-white gap-2 mt-2 p-2 shadow-lg border-none cursor-pointer hover:bg-green-300 transition ${
          activeButton === item.route ? "bg-green-300" : ""
        }`}
        onClick={() => handleButtonClick(item.route)}
      >
        <div className="rounded-full bg-white/50 w-20 h-20  flex items-center justify-center">
          {item.icon}
        </div>
        <p className="text-sm font-bold m-2">{item.label}</p>
      </button>
    ))}
  </div>
)}

    </footer>
  );
};

export default FooterDesktopandMobile;
