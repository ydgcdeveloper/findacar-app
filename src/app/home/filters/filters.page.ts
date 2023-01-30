import { Router } from '@angular/router';
import { CommonService } from './../../services/common/common.service';
import { FilterInput } from './../../api/models/filter.input';
import { UserService } from './../../api/services/user/user.service';
import { CategoryService } from './../../api/services/category/category.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
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

  user;

  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private filterService: FilterService,
    private commonService: CommonService,
    private router: Router,
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

    this.user = this.userService.user;
    await this.getCategories();
    this.show = false;

    // this.filterData = await this.filterService.getFilter();
    this.filterData = this.user?.profile?.filter;

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
      onlyAvailable: [this.filterData?.onlyAvailable || false],
      priceRange: [{ lower: this.filterData?.priceRange.lower || this.priceRangeMin,
        upper: this.filterData?.priceRange.upper || this.priceRangeMax }, [Validators.required]],
      category: this.categoryFormArray
    });
    this.show = true;
  }


  setCheckedCategory() {
    this.checkedCategories = this.categories.map((category) => ({
      ...category, checked: this.filterData?.categories.includes(category.id)
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

  async getCategories() {
    this.categories = await this.categoryService.getCategories();
  }

  public customFormatter(value: number) {
    return `$${value}`;
  }

  async onSubmit() {
    if (this.filterForm.valid) {

      const filterInput: FilterInput = {
        sortBy: this.sortBy.value as SortByTypes,
        onlyAvailable: this.onlyAvailable.value,
        priceRange: this.priceRange.value,
        categories: this.getIdSelectedCategories()
      };

      try {
        await this.commonService.showLoader();
        await this.userService.updateFilter(filterInput).then(async (value) => {
          if (value) {
            this.router.navigateByUrl('/tabs/order', { skipLocationChange: true }).then(() => {
              this.router.navigate(['tabs/home']);
            });
          }
        });
      } catch (error) {
        this.commonService.showErrorMsg(error);
      } finally {
        await this.commonService.hideLoader();
      }
    }
  }
}

export const checkAtLeastOneCategory: ValidatorFn = (control: AbstractControl): ValidationErrors |
  null => !control.value.includes(true) ? { noCategorySelected: true } : null;
