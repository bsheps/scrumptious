import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { MainContentDirective } from '../anchor-directives/main-content.directive';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';
import { RecipeCreatorComponent } from '../recipe-creator/recipe-creator.component';

@Component({
  selector: 'app-navigation-component',
  templateUrl: './navigation-component.component.html',
  styleUrls: ['./navigation-component.component.scss']
})
export class NavigationComponentComponent implements OnInit {
  @ViewChild(MainContentDirective,{static:true}) appMainContent: MainContentDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  openRecipeList():void{
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(RecipeListComponent);
    
    const viewContainerRef = this.appMainContent.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
  }
  openRecipeCreator(){
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(RecipeCreatorComponent);
    
    const viewContainerRef = this.appMainContent.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);

  }

}
