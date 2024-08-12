import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';

import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [ButtonComponent, PaginationComponent],
  imports: [CommonModule],
  exports: [ButtonComponent, PaginationComponent],
})
export class SharedModule {}
