import { useEffect, useState } from "react";
import { getAllReviews } from "../api/reviews.api";

const Stars = ({ value }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={i <= value ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default function ReviewsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllReviews()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center text-gray-600">
        Загрузка отзывов…
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h1 className="mb-4 text-2xl font-bold sm:text-3xl">
            Отзывы клиентов
          </h1>
          <p className="text-gray-600">
            Реальные отзывы — основа доверия на платформе Osonly.  
            Клиенты делятся своим опытом, а специалисты формируют
            репутацию и подтверждают свой профессионализм.
          </p>
        </div>

        {items.length === 0 && (
          <div className="text-center text-gray-600">
            Пока нет отзывов.
          </div>
        )}

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((r) => (
            <div
              key={r.id}
              className="flex flex-col justify-between p-6 transition bg-white border  rounded-2xl hover:shadow-md"
            >
              {/* TEXT */}
              <div className="mb-6 leading-relaxed text-gray-700">
                “{r.text}”
              </div>

              {/* FOOTER */}
              <div className="pt-4 text-sm border-t">
                <div className="mb-2 font-medium text-gray-800">
                  {r.clientFirstName} {r.clientLastName}
                  <span className="mx-1 text-gray-400">→</span>
                  {r.technicianFirstName} {r.technicianLastName}
                </div>

                <Stars value={r.rating} />
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM INFO */}
        <div className="max-w-4xl p-6 mx-auto mt-16 text-center border border-blue-100 bg-blue-50 rounded-2xl sm:p-8">
          <p className="text-gray-700">
            Для клиентов отзывы помогают сделать осознанный выбор
            специалиста, а для мастеров — служат важным показателем
            качества работы и формируют доверие со стороны новых заказчиков.
          </p>
        </div>
      </div>
    </section>
  );
}
