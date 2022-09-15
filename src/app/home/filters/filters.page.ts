import { CategoryService } from './../../api/services/category/category.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../../api/interfaces/category/category.interface';
import { FilterService } from '../../api/services/filter/filter.service';
import { Filter, SortByTypes } from 'src/app/api/interfaces/filter/filter';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
})
export class FiltersPage implements OnInit {

  public filterForm: FormGroup
  priceRangeMin: number = 30;
  priceRangeMax: number = 5000;
  priceRangeStep: number = 50;
  categories: Category[];
  checkedCategories;
  show = false;
  filterData: Filter;
  sortTypes = SortByTypes
  categoryFormArray: FormArray = new FormArray([], { validators: checkAtLeastOneCategory })


  constructor(private categoryService: CategoryService, private formBuilder: FormBuilder, private filterService: FilterService) { }

  async ngOnInit() {

    this.getCategories();

    setTimeout(() => {

      this.show = true;
    }, environment.skeleton_time);

    this.filterData = await this.filterService.getFilter();

    this.setCheckedCategory()

    for (let i = 0; i < this.checkedCategories.length; i++) {
      this.categoryFormArray.push(new FormControl(this.checkedCategories[i].checked))
    }

    this.filterForm = this.formBuilder.group({
      sortBy: [this.filterData?.sortBy || SortByTypes.CLOSENESS, [Validators.required]],
      onlyAvailable: [this.filterData.onlyAvailable || false],
      priceRange: [{ lower: this.filterData?.priceRange.lower, upper: this.filterData?.priceRange.upper } || { lower: this.priceRangeMin, upper: this.priceRangeMax }, [Validators.required]],
      category: this.categoryFormArray
    })
  }

  setCheckedCategory() {
    this.checkedCategories = this.categories.map((category) => {
      return { ...category, checked: this.filterData.categories.includes(category.id) }
    })
  }

  updateChecked() {
    this.checkedCategories = this.getCategoryFormArray().controls.map((category, index) => {
      return { ...this.checkedCategories[index], checked: category.value }
    })
  }

  getIdSelectedCategories() {
    let finalCheckedCategories = this.checkedCategories as Array<any>
    return finalCheckedCategories.filter((category) => category.checked).map((category) => {
      return category.id
    })
  }

  get sortBy() {
    return this.filterForm.get('sortBy');
  }

  get onlyAvailable() {
    return this.filterForm.get('onlyAvailable');
  }

  get priceRange() {
    return this.filterForm.get('priceRange');
  }

  get category() {
    return this.filterForm.get('category');
  }

  getCategoryFormArray() {
    return this.filterForm.controls.category as FormArray
  }

  getCategories() {
    this.categories = this.categoryService.getCategories();
  }

  public customFormatter(value: number) {
    return `$${value}`;
  }

  onSubmit() {
    console.log("Form --->>", this.filterForm)
    if (this.filterForm.invalid) {
      return
    }

    const newFilter: Filter = {
      sortBy: this.sortBy.value as SortByTypes,
      onlyAvailable: this.onlyAvailable.value,
      priceRange: this.priceRange.value,
      categories: this.getIdSelectedCategories()
    }

    console.log("Filter --->>", newFilter)
  }
}

export const checkAtLeastOneCategory: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return !control.value.includes(true) ? { noCategorySelected: true } : null;
};
