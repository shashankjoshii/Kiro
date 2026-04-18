import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
}

/**
 * Semantic breadcrumb nav with schema.org BreadcrumbList microdata.
 * Pass crumbs in order: Home → Section → Current Page (no href on last item).
 */
export default function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol
        className="flex flex-wrap items-center gap-1 text-sm text-muted"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li
              key={i}
              className="flex items-center gap-1"
              itemScope
              itemProp="itemListElement"
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={String(i + 1)} />
              {crumb.href && !isLast ? (
                <>
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-foreground"
                    itemProp="item"
                  >
                    <span itemProp="name">{crumb.label}</span>
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5 opacity-40 shrink-0" />
                </>
              ) : (
                <span
                  className={isLast ? 'font-medium text-foreground' : ''}
                  itemProp="name"
                >
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
