import { AnuncioComponent } from './../anuncio/anuncio.component';
import { AnuncioService } from './../shared/services/anuncio.service';
import { Component, OnInit } from '@angular/core';
import { Anuncio } from '../shared/models/anuncio.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-anuncio-list',
  templateUrl: './anuncio-list.component.html',
  styleUrls: ['./anuncio-list.component.css']
})
export class AnuncioListComponent implements OnInit {
  anuncios: Anuncio[];

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private anuncioService: AnuncioService
  ) { }

  ngOnInit(): void {
    this.loadAnuncios();
  }

  loadAnuncios(): void {
    this.anuncioService.getAnuncios()
      .subscribe(anuncios => this.anuncios = anuncios);
  }

  criarAnuncio(): void {
    this.dialog.open(AnuncioComponent,  {
      width: '850px',
      data: null
    })
    .afterClosed()
    .subscribe(result => {
      this._snackBar.open('Criado com sucesso!', '😃', {
        duration: 5000
      });
      this.loadAnuncios();
    });
  }

  editarAnuncio(anuncio: Anuncio): void {
    this.dialog.open(AnuncioComponent, {
      width: '850px',
      data: anuncio
    })
      .afterClosed()
      .subscribe((response: boolean) => {
        if (response) {
          this._snackBar.open('Editado com sucesso!', '😃', {
            duration: 5000
          });
          this.loadAnuncios();
        }
      })
  }

  deletarAnuncio(anuncioId: number): void {
    this.anuncioService.deletarAnuncio(anuncioId)
      .subscribe(
        () => {
          this._snackBar.open('Deletado com sucesso!', '😃', {
            duration: 5000
          });
          this.loadAnuncios();
        });
  }
}
