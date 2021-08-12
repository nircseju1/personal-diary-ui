import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CategoryComponent} from "./category.component";
import {CategoryRoutingModule} from "./category-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ModalModule} from "ngx-bootstrap/modal";

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  declarations: [
    CategoryComponent
  ]
})
export class CategoryModule { }
