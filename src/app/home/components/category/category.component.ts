import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ICategory } from 'src/assets/model/icategory';
import { CategoryService } from 'src/assets/shared/services/category.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  @Output() categoryChanged = new EventEmitter<string>();
  categories: ICategory[] = [];
  selectedCategory: string = '';
  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.getAllCategories();
  }

  onCategoryChange(category: string) {
    this.categoryChanged.emit(category);
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((response) => {
      if (response && Array.isArray(response.body)) {
        this.categories = response.body;
        this.selectedCategory = '';
      } else {
        console.error('Failed to fetch categories:', response);
      }
    });
  }
}
