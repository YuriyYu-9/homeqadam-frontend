import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicTechnician } from "../api/technicians.api";
import TechnicianReviews from "../reviews/TechnicianReviews";

const TechnicianPublicProfile = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await getPublicTechnician(id);
        if (!cancelled) setData(res);
      } catch (e) {
        if (!cancelled) {
          setError(
            e?.response?.status === 404
              ? "Специалист не найден"
              : "Ошибка загрузки профиля"
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
  }, [id]);

  if (loading) {
    return (
      <section className="py-20 text-center text-gray-600">
        Загрузка профиля…
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 text-center text-red-600">
        {error}
      </section>
    );
  }

  if (!data) return null;

  const avatarSrc = data.avatarUrl || "/images/anonymus_avatar.png";

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-5xl px-4 mx-auto">
        {/* PROFILE CARD */}
        <div className="p-6 mb-16 border border-blue-100 bg-blue-50 rounded-3xl sm:p-8">
          <div className="grid gap-8 md:grid-cols-[1fr_240px] items-start">
            {/* INFO */}
            <div>
              <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
                {data.firstName} {data.lastName}
              </h1>

              <div className="mb-4 text-gray-700">
                <span className="font-medium">{data.specialty}</span> · опыт{" "}
                <b>{data.experienceYears}</b> лет
              </div>

              {data.about && (
                <div className="mb-6">
                  <h3 className="mb-2 font-semibold">
                    О специалисте
                  </h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {data.about}
                  </p>
                </div>
              )}

              {data.telegram && (
                <div className="text-gray-700">
                  <span className="font-medium">Telegram:</span>{" "}
                  <a
                    href={`https://t.me/${data.telegram.replace(
                      "@",
                      ""
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {data.telegram}
                  </a>
                </div>
              )}
            </div>

            {/* AVATAR */}
            <div className="flex justify-center md:justify-end">
              <img
                src={avatarSrc}
                alt="Фото специалиста"
                className="object-cover w-40 h-40 border  sm:w-48 sm:h-48 rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* REVIEWS */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="mb-2 text-xl font-bold sm:text-2xl">
              Отзывы клиентов
            </h2>
            <p className="text-gray-600">
              Отзывы оставлены клиентами после выполнения заказов
              и отражают реальный опыт взаимодействия со специалистом.
            </p>
          </div>

          <TechnicianReviews technicianId={data.userId} />
        </div>
      </div>
    </section>
  );
};

export default TechnicianPublicProfile;
