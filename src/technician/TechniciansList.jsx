import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listPublicTechnicians } from "../api/technicians.api";

const TechniciansList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await listPublicTechnicians();
        if (!cancelled) setItems(res || []);
      } catch (e) {
        if (!cancelled) {
          setMsg(
            e?.response?.data?.message ||
              "Ошибка загрузки списка специалистов"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center text-gray-600">
        Загрузка специалистов…
      </section>
    );
  }

  if (msg) {
    return (
      <section className="py-20 text-center text-red-600">
        {msg}
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h1 className="mb-4 text-2xl font-bold sm:text-3xl">
            Специалисты платформы
          </h1>
          <p className="text-gray-600">
            Здесь представлены специалисты, готовые принять заказы.
            Ознакомьтесь с их опытом, специализацией и выберите подходящего
            исполнителя для своей задачи.
          </p>
        </div>

        {items.length === 0 && (
          <div className="text-center text-gray-600">
            Пока нет доступных анкет специалистов.
          </div>
        )}

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => {
            const avatarSrc =
              t.avatarUrl || "/images/anonymus_avatar.png";

            return (
              <div
                key={t.userId}
                className="flex flex-col justify-between p-6 transition bg-white border  rounded-2xl hover:shadow-md"
              >
                {/* TOP */}
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={avatarSrc}
                    alt="avatar"
                    className="object-cover w-16 h-16 border rounded-xl"
                  />

                  <div>
                    <div className="text-lg font-semibold">
                      {t.firstName} {t.lastName}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t.specialty} · опыт {t.experienceYears} лет
                    </div>
                  </div>
                </div>

                {/* CONTACT */}
                <div className="mb-6 text-sm text-gray-600">
                  {t.telegram ? (
                    <>
                      Telegram:{" "}
                      <a
                        href={`https://t.me/${t.telegram.replace(
                          "@",
                          ""
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {t.telegram}
                      </a>
                    </>
                  ) : (
                    <span>Контактные данные доступны в профиле</span>
                  )}
                </div>

                {/* ACTION */}
                <Link
                  to={`/technicians/${t.userId}`}
                  className="inline-block px-4 py-2 mt-auto text-center text-blue-600 transition border rounded-lg  hover:bg-blue-50"
                >
                  Открыть профиль
                </Link>
              </div>
            );
          })}
        </div>

        {/* BOTTOM INFO */}
        <div className="max-w-4xl p-6 mx-auto mt-16 text-center border border-blue-100 bg-blue-50 rounded-2xl sm:p-8">
          <p className="text-gray-700">
            Публичные профили и отзывы помогают клиентам сделать
            осознанный выбор, а специалистам — продемонстрировать свой
            опыт и профессиональный уровень.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TechniciansList;
