import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../ui/Container";
import { useAuth } from "../../store/useAuth";

const images = [
  "/images/hero/Plumber.png",
  "/images/hero/Electric.png",
  "/images/hero/Cleaner.png",
  "/images/hero/TechRepair.png",
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const { token, role } = useAuth();

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const onCreateOrder = () => {
    if (!token) return navigate("/auth/register");
    if (role === "CLIENT") return navigate("/client/orders/new");
    navigate("/app");
  };

  const onFindOrders = () => {
    if (!token) return navigate("/auth/register?role=TECHNICIAN");
    if (role === "TECHNICIAN") return navigate("/technician/orders");
    navigate("/app");
  };

  return (
    <section className="py-16 bg-gray-50 sm:py-20">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* TEXT */}
          <div className="text-center md:text-left">
            <h1 className="mb-6 text-3xl font-bold sm:text-4xl">
              Osonly — проверенные специалисты за минуты
            </h1>

            <p className="mb-8 text-gray-600">
              Платформа для быстрого поиска мастеров и заказов
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
              <button
                onClick={onCreateOrder}
                className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Сделать заказ
              </button>

              <button
                onClick={onFindOrders}
                className="px-6 py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
              >
                Найти заказы
              </button>
            </div>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src={images[index]}
              alt="Service"
              className="w-full max-w-sm transition-opacity duration-500 sm:max-w-md"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
