import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anuncio } from '../models/anuncio.model';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {
  private baseUrl: string = 'http://localhost:5000/api/anuncio';

  constructor(
    private http: HttpClient
  ) { }

  getAnuncios(): Observable<Anuncio[]> {
    return this.http.get<Anuncio[]>(this.baseUrl);
  }

  criarAnuncio(anuncio: Anuncio): Observable<void> {
    return this.http.post<void>(this.baseUrl, anuncio);
  }

  editarAnuncio(anuncio: Anuncio): Observable<void> {
    return this.http.put<void>(this.baseUrl, anuncio);
  }

  deletarAnuncio(anuncioId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${anuncioId}`);
  }
}
