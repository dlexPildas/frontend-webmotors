import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';

import { AnunciosRoutingModule } from './anuncios-routing.module';
import { AnunciosComponent } from './anuncios.component';
import { AnuncioListComponent } from './anuncio-list/anuncio-list.component';
import { AnuncioComponent } from './anuncio/anuncio.component';

@NgModule({
  declarations: [
    AnunciosComponent,
    AnuncioListComponent,
    AnuncioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    AnunciosRoutingModule,
  ]
})
export class AnunciosModule { }
