import Container from "../ui/Container";
import { FaCheckCircle } from "react-icons/fa";

const benefits = [
  { title: "Быстро", description: "Отклики за минуты", icon: FaCheckCircle },
  { title: "Безопасно", description: "Проверенные специалисты", icon: FaCheckCircle },
  { title: "Удобно", description: "Простой интерфейс", icon: FaCheckCircle },
  { title: "Прозрачно", description: "Понятные условия", icon: FaCheckCircle },
  { title: "Гибко", description: "Вы выбираете исполнителя", icon: FaCheckCircle },
  { title: "Надёжно", description: "Поддержка и контроль", icon: FaCheckCircle },
];

export default function Benefits() {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map(({ title, description, icon }) => {
            const Icon = icon;
            return (
              <div key={title} className="flex gap-4">
                <Icon className="text-blue-600 text-xl shrink-0" />
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-gray-600">{description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
