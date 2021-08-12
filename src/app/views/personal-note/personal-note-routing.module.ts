import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PersonalNoteComponent} from "./personal-note.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Personal Note'
    },
    children: [
      {
        path: '',
        redirectTo: 'personal-note'
      },
      {
        path: 'personal-note',
        component: PersonalNoteComponent,
        data: {
          title: 'Personal Note'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalNoteRoutingModule {}
