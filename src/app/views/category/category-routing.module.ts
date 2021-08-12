import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CategoryComponent} from "./category.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Category'
    },
    children: [
      {
        path: '',
        redirectTo: 'category'
      },
      {
        path: 'category',
        component: CategoryComponent,
        data: {
          title: 'Category'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {}
