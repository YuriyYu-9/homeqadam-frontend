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
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* TEXT */}
          <div>
            <h1 className="mb-6 text-4xl font-bold">
              Osonly — проверенные специалисты за минуты
            </h1>

            <p className="mb-8 text-gray-600">
              Платформа для быстрого поиска мастеров и заказов
            </p>

            <div className="flex gap-4">
              <a
                href="/auth/register"
                className="px-6 py-3 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Сделать заказ
              </a>
              <a
                href="/auth/register"
                className="px-6 py-3 text-blue-600 transition border border-blue-600 rounded-lg hover:bg-blue-50"
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
