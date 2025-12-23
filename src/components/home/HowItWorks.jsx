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
    <section className="py-16 bg-white sm:py-20">
      <div className="px-4 mx-auto text-center max-w-7xl">
        <h2 className="mb-12 text-2xl font-bold sm:text-3xl">
          Как это работает
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map(({ Icon, title, text }) => {
            const IconComponent = Icon;

            return (
              <div
                key={title}
                className="p-6 border rounded-xl bg-gray-50"
              >
                <IconComponent
                  className="mx-auto mb-4 text-blue-600"
                  size={36}
                />
                <h4 className="mb-2 font-semibold">{title}</h4>
                <p className="text-sm text-gray-600">{text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
