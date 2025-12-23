import Container from "../ui/Container";
import { FaCheckCircle } from "react-icons/fa";

const benefits = [
  { title: "Быстро", description: "Отклики за минуты" },
  { title: "Безопасно", description: "Проверенные специалисты" },
  { title: "Удобно", description: "Простой интерфейс" },
  { title: "Прозрачно", description: "Понятные условия" },
  { title: "Гибко", description: "Вы выбираете исполнителя" },
  { title: "Надёжно", description: "Поддержка и контроль" },
];

export default function Benefits() {
  return (
    <section className="py-16 bg-white sm:py-20">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {benefits.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 p-6 border rounded-xl bg-gray-50"
            >
              <FaCheckCircle className="mt-1 text-xl text-blue-600 shrink-0" />
              <div>
                <h3 className="mb-1 font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
