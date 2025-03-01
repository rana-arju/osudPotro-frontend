import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  items: { label: string; href: string }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <Link
                href={item.href}
                className="ml-1 text-sm font-medium text-muted-foreground hover:text-foreground md:ml-2"
              >
                {item.label}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
