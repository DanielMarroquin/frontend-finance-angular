import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { FormModalProductsComponent } from './shared/components/ui/modal/form-modal-products/form-modal-products.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

@NgModule({
    declarations: [
        AppComponent,
        MainLayoutComponent,
        HeaderComponent,
        SidebarComponent,
        FooterComponent,
        FormModalProductsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxDatatableModule
    ],
    providers: [],
    exports: [
        FormModalProductsComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
