import Container from "../ui/Container";

const categories = [
  { title: "Сантехника", image: "/images/hero/Plumber.png" },
  { title: "Электрика", image: "/images/hero/Electric.png" },
  { title: "Уборка", image: "/images/hero/Cleaner.png" },
  { title: "Ремонт техники", image: "/images/hero/TechRepair.png" },
];

const Categories = () => {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <Container>
        <h2 className="mb-10 text-2xl font-bold text-center sm:text-3xl">
          Популярные категории услуг
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {categories.map((item) => (
            <div
              key={item.title}
              className="p-6 text-center transition bg-white border rounded-xl hover:shadow-md"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-24 mx-auto mb-4"
              />
              <h3 className="font-semibold">{item.title}</h3>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Categories;
