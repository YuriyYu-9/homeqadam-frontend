const CTA = () => {
  return (
    <section className="bg-blue-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Готовы начать?
        </h2>
        <div className="flex justify-center gap-4">
          <a
            href="/auth/register"
            className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium"
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
