import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/useAuth";

const CTA = () => {
  const navigate = useNavigate();
  const { token, role } = useAuth();

  const onCreateOrder = () => {
    if (!token) return navigate("/auth/register");
    if (role === "CLIENT") return navigate("/client/orders/new");
    navigate("/app");
  };

  const onBecomeTechnician = () => {
    if (!token) return navigate("/auth/register?role=TECHNICIAN");
    if (role === "TECHNICIAN") return navigate("/technician/orders");
    navigate("/app");
  };

  return (
    <section className="py-20 text-white bg-blue-600">
      <div className="px-4 mx-auto text-center max-w-7xl">
        <h2 className="mb-6 text-3xl font-bold">
          Начните с Osonly уже сегодня
        </h2>

        <div className="flex justify-center gap-4">
          <button
            onClick={onCreateOrder}
            className="px-6 py-3 font-medium text-blue-600 bg-white rounded-lg"
          >
            Сделать заказ
          </button>

          <button
            onClick={onBecomeTechnician}
            className="px-6 py-3 border border-white rounded-lg"
          >
            Стать специалистом
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
