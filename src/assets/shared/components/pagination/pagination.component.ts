import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() totalItems = 0;
  @Input() itemsPerPage = 6;
  @Input() currentPage = 1;
  @Output() pageChanged = new EventEmitter<number>();

  // Calculate total pages
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  // Get visible pages for pagination display
  get visiblePages(): number[] {
    const pages = [];
    const total = this.totalPages;
    const range = 2;

    for (let i = 1; i <= total; i++) {
      if (
        i === 1 ||
        i === total ||
        (i >= this.currentPage - range && i <= this.currentPage + range)
      ) {
        pages.push(i);
      }
    }

    return pages;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.onPageChange(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.onPageChange(this.currentPage + 1);
    }
  }

  goToPage(page: number) {
    if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
      this.onPageChange(page);
    }
  }

  onPageChange(page: number) {
    this.pageChanged.emit(page);
  }
}
