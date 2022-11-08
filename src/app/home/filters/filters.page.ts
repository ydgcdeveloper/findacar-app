import { NavController } from '@ionic/angular';
import { CategoryService } from './../../api/services/category/category.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../../api/interfaces/category.interface';
import { FilterService } from '../../api/services/filter/filter.service';
import { Filter, SortByTypes } from 'src/app/api/interfaces/filter';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
})
export class FiltersPage implements OnInit {

  public filterForm: FormGroup;
  priceRangeMin = 30;
  priceRangeMax = 5000;
  priceRangeStep = 50;
  categories: Category[];
  checkedCategories;
  show = false;
  filterData: Filter;
  sortTypes = SortByTypes;
  categoryFormArray: FormArray = new FormArray([], { validators: checkAtLeastOneCategory });


  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private filterService: FilterService,
    private navController: NavController
  ) { }


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

  async ngOnInit() {

    this.getCategories();

    setTimeout(() => {

      this.show = true;
    }, environment.skeletonTime);

    this.filterData = await this.filterService.getFilter();

    this.setCheckedCategory();

    // // eslint-disable-next-line @typescript-eslint/naming-conventions
    // for (let i = 0; i < this.checkedCategories.length; i++) {
    //   this.categoryFormArray.push(new FormControl(this.checkedCategories[i].checked));
    // }

    for (const checkedCategory of this.checkedCategories) {
      this.categoryFormArray.push(new FormControl(checkedCategory.checked));
    }

    this.filterForm = this.formBuilder.group({
      sortBy: [this.filterData?.sortBy || SortByTypes.CLOSENESS, [Validators.required]],
      onlyAvailable: [this.filterData.onlyAvailable || false],
      priceRange: [{ lower: this.filterData?.priceRange.lower, upper: this.filterData?.priceRange.upper } ||
        { lower: this.priceRangeMin, upper: this.priceRangeMax }, [Validators.required]],
      category: this.categoryFormArray
    });
  }


  setCheckedCategory() {
    this.checkedCategories = this.categories.map((category) => ({
      ...category, checked: this.filterData.categories.includes(category.id)
    }));
  }

  updateChecked() {
    this.checkedCategories = this.getCategoryFormArray().controls.map((category, index) => (
      { ...this.checkedCategories[index], checked: category.value }
      ));
  }

  getIdSelectedCategories() {
    const finalCheckedCategories = this.checkedCategories as Array<any>;
    return finalCheckedCategories.filter((category) => category.checked).map((category) => category.id);
  }



  getCategoryFormArray() {
    return this.filterForm.controls.category as FormArray;
  }

  getCategories() {
    this.categories = this.categoryService.getCategories();
  }

  public customFormatter(value: number) {
    return `$${value}`;
  }

  onSubmit() {
    if (this.filterForm.invalid) {
      return;
    }

    const newFilter: Filter = {
      sortBy: this.sortBy.value as SortByTypes,
      onlyAvailable: this.onlyAvailable.value,
      priceRange: this.priceRange.value,
      categories: this.getIdSelectedCategories()
    };

    this.filterService.saveFilter(newFilter);
    this.navController.navigateForward('tabs/home');
  }
}

export const checkAtLeastOneCategory: ValidatorFn = (control: AbstractControl): ValidationErrors |
null => !control.value.includes(true) ? { noCategorySelected: true } : null;
