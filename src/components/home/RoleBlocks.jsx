import { Check } from "lucide-react";

const RoleBlocks = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-8">
      {/* CLIENT */}
      <div className="border rounded-xl p-8">
        <h3 className="text-2xl font-semibold mb-4">Для клиентов</h3>
        <ul className="space-y-3 text-gray-600">
          <li className="flex gap-2"><Check className="text-green-500" /> Быстрое оформление заказа</li>
          <li className="flex gap-2"><Check className="text-green-500" /> Проверенные специалисты</li>
          <li className="flex gap-2"><Check className="text-green-500" /> Прозрачные условия</li>
        </ul>
      </div>

      {/* TECH */}
      <div className="border rounded-xl p-8 bg-blue-50">
        <h3 className="text-2xl font-semibold mb-4">Для специалистов</h3>
        <ul className="space-y-3 text-gray-600">
          <li className="flex gap-2"><Check className="text-green-500" /> Поиск заказов рядом</li>
          <li className="flex gap-2"><Check className="text-green-500" /> Свободный график</li>
          <li className="flex gap-2"><Check className="text-green-500" /> Прямой контакт с клиентами</li>
        </ul>
      </div>
    </section>
  );
};

export default RoleBlocks;
