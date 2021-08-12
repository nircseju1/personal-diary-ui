import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Category} from "./service/category.model";
import {CategoryService} from "./service/category.service";
import {ModalDirective} from "ngx-bootstrap/modal";
import {PersonalNoteService} from "../personal-note/service/personal-note.service";
import {PersonalNote} from "../personal-note/service/personal-note.model";

@Component({
  templateUrl: 'category.component.html'
})
export class CategoryComponent implements OnInit {

  @ViewChild('warningModal') public warningModal: ModalDirective;
  @ViewChild('dangerModal') public dangerModal: ModalDirective;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private personalNoteService: PersonalNoteService,
    public router: Router,
    private toastr: ToastrService,
    private renderer: Renderer2
  ) { }

  get frm() { return this.categoryForm.controls; }

  categoryForm: FormGroup;
  list: Category[];
  personalNoteList: PersonalNote[];
  personalNote: PersonalNote;
  category: Category;
  deleteCategory: Category;
  submitted = false;

  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      id: '',
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
      description: ''
    });

    this.getCategoryList();
    this.getPersonalNoteList();
  }

  getCategoryList() {
    this.categoryService.getList().then(
      res => this.list = res as Category[]
    );
  }

  getPersonalNoteList() {
    this.personalNoteService.getList().then(
      res => this.personalNoteList = res as PersonalNote[]
    );
  }

  onSaveModal() {
    this.submitted = true;
    if (this.categoryForm.invalid) {
      return;
    }

    // Validation-1: Duplicate Name
    const id = this.categoryForm.get('id').value;
    const name = this.categoryForm.get('name').value;
    this.category = this.list.filter(p => p.name.toUpperCase() === name.toUpperCase())[0];
    if (this.category !== null && this.category !== undefined && this.category.id !== Number(id)) {
      this.toastr.error('Category already exist. Please change name and try again.');
      return;
    }

    this.warningModal.show();
  }

  onSaveSubmit() {
    this.categoryService.formData = this.categoryForm.getRawValue();
    console.log(this.categoryService.formData);

    this.categoryService.saveCategory(this.categoryService.formData).subscribe((data: {
    }) => {
      this.warningModal.hide();
      this.toastr.success('Category has been Saved Successfully.', 'Category');
      this.onReset();
      this.getCategoryList();
    });
  }

  onSelect(category: Category) {
    this.categoryForm.patchValue({
      id: category.id,
      name: category.name,
      description: category.description
    });
  }

  onDeleteModal(category: Category) {
    this.deleteCategory = category;

    // Validation-1: Delete will not allow that is already used into personal note
    this.personalNote = this.personalNoteList.filter(p => p.categoryId === this.deleteCategory.id)[0];
    if (this.personalNote !== null && this.personalNote !== undefined) {
      this.toastr.error('Selected category is already used in personal note. Please delete note and then try again.');
      return;
    }

    this.dangerModal.show()
  }

  onDeleteSubmit() {
    this.categoryService.deleteCategory(this.deleteCategory).subscribe((data: {}) => {
      this.dangerModal.hide();
      this.toastr.success('Category has been Deleted Successfully.', 'Category');
      this.onReset();
      this.getCategoryList();
    });
  }

  onReset() {
    this.submitted = false;
    this.deleteCategory = null;

    this.categoryForm.reset({
      id: '',
      name: '',
      description: ''
    });
  }

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  onRedirectToPersonalNoteList() {
    this.router.navigate(['/personal-note/personal-note']);
  }
}
