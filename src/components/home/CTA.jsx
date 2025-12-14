const CTA = () => {
  return (
    <section className="py-20 text-white bg-blue-600">
      <div className="px-4 mx-auto text-center max-w-7xl">
        <h2 className="mb-6 text-3xl font-bold">
          Начните с Osonly уже сегодня
        </h2>

        <div className="flex justify-center gap-4">
          <a
            href="/auth/register"
            className="px-6 py-3 font-medium text-blue-600 bg-white rounded-lg"
          >
            Сделать заказ
          </a>
          <a
            href="/auth/register?role=TECHNICIAN"
            className="px-6 py-3 border border-white rounded-lg"
          >
            Стать специалистом
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
