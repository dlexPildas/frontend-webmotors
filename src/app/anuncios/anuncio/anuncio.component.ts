import { WebmotorsService } from './../shared/services/webmotors.service';
import { Observable, of } from 'rxjs';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';

import { Anuncio } from './../shared/models/anuncio.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnuncioService } from '../shared/services/anuncio.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MarcaModel } from '../shared/models/marca.model';
import { ModeloModel } from '../shared/models/modelo.model';
import { VersaoModel } from '../shared/models/versao.model';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.css']
})
export class AnuncioComponent implements OnInit {
  anuncio: Anuncio;

  marcas$: Observable<MarcaModel[]>;
  modelos$: Observable<ModeloModel[]>;
  versoes$: Observable<VersaoModel[]>;

  anuncioForm = new FormGroup({
    marca: new FormControl(null, Validators.required),
    modelo: new FormControl(null, Validators.required),
    versao: new FormControl(null, Validators.required),
    ano: new FormControl(null, Validators.required),
    quilometragem: new FormControl(null, Validators.required),
    observacao: new FormControl(null, Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<AnuncioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Anuncio,
    private anuncioService: AnuncioService,
    private webmotorsService: WebmotorsService
  ) {
    this.anuncio = new Anuncio();
  }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.carregarAnuncio();
    this.obterMarcas();
  }

  obterMarcas(): void {
    this.marcas$ = this.webmotorsService.obterMarcas();
  }

  obterModelos(marcaId: number): void {
    this.modelos$ = this.webmotorsService.obterModelos(marcaId);
  }

  obterVersoes(modeloId: number): void {
    this.versoes$ = this.webmotorsService.obterVersoes(modeloId);
  }

  carregarAnuncio(): void {
    if (this.data) {
      this.anuncio.id = this.data.id;
      this.anuncioForm.get('marca').setValue( { Name: this.data.marca } as MarcaModel);
      this.anuncioForm.get('modelo').setValue( { Name: this.data.modelo } as ModeloModel);
      this.anuncioForm.get('versao').setValue(this.data.versao);
      this.anuncioForm.get('ano').setValue(this.data.ano);
      this.anuncioForm.get('quilometragem').setValue(this.data.quilometragem);
      this.anuncioForm.get('observacao').setValue(this.data.observacao);
    }
  }

  inicializarFormulario(): void {
    this.anuncioForm.get('marca').valueChanges.subscribe( (value: MarcaModel) => this.anuncio.marca = value.Name);
    this.anuncioForm.get('modelo').valueChanges.subscribe( (value: ModeloModel) => this.anuncio.modelo = value.Name);
    this.anuncioForm.get('versao').valueChanges.subscribe(value => this.anuncio.versao = value);
    this.anuncioForm.get('ano').valueChanges.subscribe(value => this.anuncio.ano = value);
    this.anuncioForm.get('quilometragem').valueChanges.subscribe(value => this.anuncio.quilometragem = value);
    this.anuncioForm.get('observacao').valueChanges.subscribe(value => this.anuncio.observacao = value);
  }

  criarAnuncio(): void {
    this.anuncioService.criarAnuncio(this.anuncio)
      .subscribe(() => this.dialogRef.close(true));
  }

  editarAnuncio(): void {
    this.anuncioService.editarAnuncio(this.anuncio)
      .subscribe(() => this.dialogRef.close(true));
  }

  readonly compararMarca = (naoAtual: MarcaModel, atual: MarcaModel): boolean => {
    if (atual?.Name === naoAtual?.Name) {
      this.obterModelos(naoAtual.ID);
      return true;
    }
    return false;
  }

  readonly compararModelo = (naoAtual: ModeloModel, atual: ModeloModel): boolean => {
    if (atual?.Name === naoAtual?.Name) {
      this.obterVersoes(naoAtual.ID);
      return true;
    }
    return false;
  }

  compararVersao(naoAtual: VersaoModel, atual: string): boolean {
    if (atual && naoAtual) {
      return atual === naoAtual.Name;
    }
    return false;
  }
}
