import { Check } from "lucide-react";

const RoleBlocks = () => {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="grid gap-8 px-4 mx-auto max-w-7xl md:grid-cols-2">
        <div className="p-8 bg-white border rounded-xl">
          <h3 className="mb-4 text-xl font-semibold sm:text-2xl">
            Для клиентов
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex gap-2">
              <Check className="text-green-500" /> Быстрое оформление заказа
            </li>
            <li className="flex gap-2">
              <Check className="text-green-500" /> Проверенные специалисты
            </li>
            <li className="flex gap-2">
              <Check className="text-green-500" /> Прозрачные условия
            </li>
          </ul>
        </div>

        <div className="p-8 border rounded-xl bg-blue-50">
          <h3 className="mb-4 text-xl font-semibold sm:text-2xl">
            Для специалистов
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex gap-2">
              <Check className="text-green-500" /> Поиск заказов рядом
            </li>
            <li className="flex gap-2">
              <Check className="text-green-500" /> Свободный график
            </li>
            <li className="flex gap-2">
              <Check className="text-green-500" /> Прямой контакт с клиентами
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RoleBlocks;
