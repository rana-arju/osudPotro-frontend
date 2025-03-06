import Link from "next/link";

export default function PopularCategories() {
  const categories = [
    {
      name: "Medicines",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <path d="m19 14-7-7-7 7" />
          <path d="M12 21V7" />
        </svg>
      ),
      href: "/products?category=medicines",
      color: "bg-primary/10 text-primary",
    },
    {
      name: "Vitamins",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-secondary"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m4.93 4.93 4.24 4.24" />
          <path d="m14.83 9.17 4.24-4.24" />
          <path d="m14.83 14.83 4.24 4.24" />
          <path d="m9.17 14.83-4.24 4.24" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      ),
      href: "/products?category=vitamins",
      color: "bg-secondary/10 text-secondary",
    },
    {
      name: "Devices",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent"
        >
          <path d="M18 8a6 6 0 0 0-6-6 6 6 0 0 0-6 6c0 7 6 13 6 13s6-6 6-13Z" />
          <circle cx="12" cy="8" r="2" />
        </svg>
      ),
      href: "/products?category=devices",
      color: "bg-accent/10 text-accent",
    },
    {
      name: "Personal Care",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <path d="M7 21h10" />
          <rect width="14" height="14" x="5" y="3" rx="7" />
          <path d="M12 7v6" />
          <path d="M9 10h6" />
        </svg>
      ),
      href: "/products?category=personal-care",
      color: "bg-primary/10 text-primary",
    },
    {
      name: "Baby Care",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-secondary"
        >
          <path d="M9 12h.01" />
          <path d="M15 12h.01" />
          <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
          <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" />
        </svg>
      ),
      href: "/products?category=baby-care",
      color: "bg-secondary/10 text-secondary",
    },
    {
      name: "Ayurveda",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent"
        >
          <path d="M12 2a8 8 0 0 0-8 8c0 5.4 7.3 11.4 7.6 11.7a.7.7 0 0 0 .8 0c.3-.3 7.6-6.3 7.6-11.7a8 8 0 0 0-8-8Z" />
          <path d="M12 6v8" />
          <path d="M8.5 9.5 12 6l3.5 3.5" />
        </svg>
      ),
      href: "/products?category=ayurveda",
      color: "bg-accent/10 text-accent",
    },
  ];

  return (
    <section className="py-8">
      <div className=" px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          Popular Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className={`flex flex-col items-center justify-center p-4 rounded-lg ${category.color} transition-colors hover:opacity-90`}
            >
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                {category.icon}
              </div>
              <span className="text-sm font-medium text-center">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
