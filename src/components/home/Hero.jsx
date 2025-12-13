import { useEffect, useState } from "react";
import Container from "../ui/Container";

const images = [
  "/images/hero/Plumber.png",
  "/images/hero/Electric.png",
  "/images/hero/Cleaner.png",
  "/images/hero/TechRepair.png",
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-gray-50 py-20">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* TEXT */}
          <div>
            <h1 className="text-4xl font-bold mb-6">
              Найдите проверенного специалиста за минуты
            </h1>
            <p className="text-gray-600 mb-8">
              Платформа для быстрого поиска мастеров и заказов
            </p>

            <div className="flex gap-4">
              <a
                href="/auth/register"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Сделать заказ
              </a>
              <a
                href="/auth/register"
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
              >
                Найти заказы
              </a>
            </div>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src={images[index]}
              alt="Service"
              className="w-full max-w-md transition-opacity duration-500"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
