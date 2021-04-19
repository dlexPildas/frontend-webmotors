import { MarcaModel } from './../models/marca.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModeloModel } from '../models/modelo.model';
import { VersaoModel } from '../models/versao.model';

@Injectable({
  providedIn: 'root'
})
export class WebmotorsService {
  private baseUrl: string = 'http://desafioonline.webmotors.com.br/api/OnlineChallenge';
  constructor(
    private http: HttpClient
  ) { }

  obterMarcas(): Observable<MarcaModel[]> {
    return this.http.get<MarcaModel[]>(`${this.baseUrl}/Make`);
  }

  obterModelos(marcaId: number): Observable<ModeloModel[]> {
    return this.http.get<ModeloModel[]>(`${this.baseUrl}/Model`, {
      params: {
        MakeID: `${marcaId}`
      }
    });
  }

  obterVersoes(modeloId: number): Observable<VersaoModel[]> {
    return this.http.get<VersaoModel[]>(`${this.baseUrl}/Version`, {
      params: {
        ModelID: `${modeloId}`
      }
    });
  }
}
