import { ClipboardList, UserCheck, Wrench } from "lucide-react";

const steps = [
  {
    Icon: ClipboardList,
    title: "Создайте заказ",
    text: "Опишите задачу за пару минут",
  },
  {
    Icon: UserCheck,
    title: "Выберите специалиста",
    text: "Получите отклики",
  },
  {
    Icon: Wrench,
    title: "Выполните работу",
    text: "Быстро и удобно",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Как это работает</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const IconComponent = step.Icon; // ← обычное JS-использование

            return (
              <div key={step.title} className="p-6 bg-white rounded-xl">
                <IconComponent
                  className="mx-auto mb-4 text-blue-600"
                  size={36}
                />
                <h4 className="font-semibold mb-2">{step.title}</h4>
                <p className="text-gray-600 text-sm">{step.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
