import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/shared/ui'

interface PaginationControlProps {
  /** 1-based page number */
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function PaginationControl({ page, totalPages, onPageChange }: PaginationControlProps) {
  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            onClick={() => onPageChange(page - 1)}
            aria-disabled={page === 1}
            aria-label="Go to previous page"
            className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          >
            <ChevronLeftIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink isActive className="cursor-default pointer-events-none">
            {page}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            onClick={() => onPageChange(page + 1)}
            aria-disabled={page >= totalPages}
            aria-label="Go to next page"
            className={page >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          >
            <ChevronRightIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
