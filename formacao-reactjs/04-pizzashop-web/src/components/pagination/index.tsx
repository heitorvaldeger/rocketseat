import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "../ui/button";

interface PaginationProps {
  onPageChange: (pageIndex: number) => void;
  pageIndex: number;
  perPage: number;
  totalCount: number;
}

export const Pagination = ({
  onPageChange,
  pageIndex,
  perPage,
  totalCount,
}: PaginationProps) => {
  const pages = Math.ceil(totalCount / perPage) || 1;

  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground text-sm">
        Total de {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex + 1} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="h-8 w-8 p-0"
            disabled={pageIndex <= 0}
            onClick={() => {
              onPageChange(0);
            }}
            variant="outline"
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button
            className="h-8 w-8 p-0"
            disabled={pageIndex <= 0}
            onClick={() => {
              onPageChange(pageIndex - 1);
            }}
            variant="outline"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            className="h-8 w-8 p-0"
            disabled={pageIndex >= pages - 1}
            onClick={() => {
              onPageChange(pageIndex + 1);
            }}
            variant="outline"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button
            className="h-8 w-8 p-0"
            disabled={pageIndex >= pages - 1}
            onClick={() => {
              onPageChange(pages - 1);
            }}
            variant="outline"
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
