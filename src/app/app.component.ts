import { RecipeService } from './recipes/recipe.service';
import { Component } from '@angular/core';

import { HeaderComponent } from './header.component';
import { RecipesComponent } from './recipes/recipes.component';

@Component({
  selector: 'rb-root',
  templateUrl: './app.component.html',
  providers: [RecipeService]
})
export class AppComponent {
}
