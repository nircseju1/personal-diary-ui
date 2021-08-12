import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ModalDirective} from "ngx-bootstrap/modal";
import {PersonalNoteService} from "./service/personal-note.service";
import {PersonalNote} from "./service/personal-note.model";
import {Category} from "../category/service/category.model";
import {CategoryService} from "../category/service/category.service";
import {PersonalNoteListFilter} from "./service/personal-note-list-filter.model";

@Component({
  templateUrl: 'personal-note.component.html'
})
export class PersonalNoteComponent implements OnInit {

  @ViewChild('infoModal') public infoModal: ModalDirective;
  @ViewChild('warningModal') public warningModal: ModalDirective;
  @ViewChild('dangerModal') public dangerModal: ModalDirective;

  constructor(
    private formBuilder: FormBuilder,
    private personalNoteService: PersonalNoteService,
    private categoryService: CategoryService,
    public router: Router,
    private toastr: ToastrService,
    private renderer: Renderer2
  ) { }

  get frm() { return this.personalNoteForm.controls; }

  personalNoteForm: FormGroup;
  categoryList: Category[];
  list: PersonalNote[];
  personalNote: PersonalNote;
  deletePersonalNote: PersonalNote;
  personalNoteListFilter: PersonalNoteListFilter;
  submitted = false;
  isHidePersonalNoteEntry: boolean;
  isHidePersonalNoteList: boolean;

  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';

  ngOnInit() {
    this.isHidePersonalNoteEntry = true;
    this.isHidePersonalNoteList = false;
    this.personalNoteListFilter = null;

    this.personalNoteForm = this.formBuilder.group({
      id: '',
      categoryId: '',
      title: ['', [Validators.required, Validators.minLength(4)]],
      content: '',
      scNoteUpdatedDate: '',
      scCategoryId: '',
      scCategoryName: '',
      scTitle: '',
      scContent: '',
      vwCategory: '',
      vwTitle: '',
      vwContent: '',
      vwLastUpdatedAsString: ''
    });

    this.getCategoryList();
    this.onSearchFilter();
  }

  onRedirectToCategory() {
    this.router.navigate(['/category/category']);
  }

  onShowPersonalNoteEntry() {
    this.onReset();
    this.isHidePersonalNoteEntry = false;
    this.isHidePersonalNoteList = true;
  }

  onShowPersonalNoteList() {
    this.onReset();
    this.isHidePersonalNoteEntry = true;
    this.isHidePersonalNoteList = false;
  }

  getCategoryList() {
    this.categoryService.getList().then(
      res => this.categoryList = res as Category[]
    );
  }

  onSaveModal() {
    this.submitted = true;
    if (this.personalNoteForm.invalid) {
      return;
    }

    this.warningModal.show();
  }

  onSaveSubmit() {
    const isFromEditOption = this.personalNoteForm.get('id').value;
    this.personalNoteService.formData = this.personalNoteForm.getRawValue();
    console.log(this.personalNoteService.formData);

    this.personalNoteService.savePersonalNote(this.personalNoteService.formData).subscribe((data: {
    }) => {
      this.warningModal.hide();
      this.toastr.success('Personal Note has been Saved Successfully.', 'Personal Note');
      this.onReset();

      if (isFromEditOption !== '' && isFromEditOption !== undefined) {
        this.onShowPersonalNoteList();
        this.onSearchReset();
        this.onSearchFilter();
      }
    });
  }

  onSelect(personalNote: PersonalNote) {
    this.personalNoteForm.patchValue({
      id: personalNote.id,
      categoryId: personalNote.categoryId,
      title: personalNote.title,
      content: personalNote.content
    });

    this.isHidePersonalNoteEntry = false;
    this.isHidePersonalNoteList = true;
  }

  onViewDetails(personalNote: PersonalNote) {
    this.personalNoteForm.patchValue({
      vwCategory: personalNote.categoryName,
      vwTitle: personalNote.title,
      vwContent: personalNote.content,
      vwLastUpdatedAsString: personalNote.lastUpdatedAsString
    });

    this.infoModal.show();
  }

  onDeleteModal(personalNote: PersonalNote) {
    this.deletePersonalNote = personalNote;

    this.dangerModal.show()
  }

  onDeleteSubmit() {
    this.personalNoteService.deletePersonalNote(this.deletePersonalNote).subscribe((data: {}) => {
      this.dangerModal.hide();
      this.toastr.success('Personal Note has been Deleted Successfully.', 'Personal Note');

      this.deletePersonalNote = null;
      this.onSearchFilter();
    });
  }

  onReset() {
    this.submitted = false;

    this.personalNoteForm.reset({
      id: '',
      categoryId: '',
      title: '',
      content: ''
    });
  }

  onSearchReset() {
    this.deletePersonalNote = null;
    this.personalNoteListFilter = null;

    this.personalNoteForm.reset({
      scNoteUpdatedDate: '',
      scCategoryId: '',
      scCategoryName: '',
      scTitle: '',
      scContent: ''
    });

    this.onSearchFilter();
  }

  onSearchFilter() {
    this.personalNoteListFilter = this.personalNoteForm.getRawValue();
    console.log(this.personalNoteListFilter);
    this.personalNoteService.getPersonalNoteDetailsFilterList(this.personalNoteListFilter).subscribe(
      (response) => {
        this.list = response;
      },
      (error) => {
        // this.toastr.error(error);
      }
    );
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


}
