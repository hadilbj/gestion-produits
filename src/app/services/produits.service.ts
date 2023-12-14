// produits.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../model/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  private urlHote = 'http://localhost:3333/produits/';
  private apiHote = 'http://localhost:3333/Categories/'; 
  constructor(private http: HttpClient) { }
  // Remplacez par l'URL correcte de votre backend


  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.apiHote);}

  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.urlHote);
  }

  deleteProduit(idP: number | undefined): Observable<any> {
    return this.http.delete(this.urlHote + idP);
  }

  addProduit(nouveau: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.urlHote, nouveau);
  }

  updateProduit(idP: number | undefined, nouveau: Produit): Observable<Produit> {
    return this.http.put<Produit>(this.urlHote + idP, nouveau);
  }
}
