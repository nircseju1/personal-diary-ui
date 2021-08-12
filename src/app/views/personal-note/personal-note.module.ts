import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PersonalNoteRoutingModule} from "./personal-note-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ModalModule} from "ngx-bootstrap/modal";
import {PersonalNoteComponent} from "./personal-note.component";

@NgModule({
  imports: [
    CommonModule,
    PersonalNoteRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot()

  ],
  declarations: [
    PersonalNoteComponent
  ]
})
export class PersonalNoteModule { }
