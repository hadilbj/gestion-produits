import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProduitsService } from '../services/produits.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  constructor(private http: HttpClient, private produitsService: ProduitsService) { }

produits: Produit[] = [];

  categories: string[] = [];

  filtreCategorie: string = '';
  produitEdite: Produit | null = null;

  produitCourant = new Produit();

  ngOnInit(): void {
    console.log("Initialisation du composant:.....");
    this.consulterProduits();
    this.consulterCategories();
  }

  consulterProduits() {
    console.log("Récupérer la liste des produits");
    this.produitsService.getProduits()
      .subscribe({
        next: data => {
          console.log("Succès GET");
          this.produits = data;
        },
        error: err => {
          console.log("Erreur GET");
        }
      });
  }

  consulterCategories() {
    console.log("Récupérer la liste des categories");
    this.produitsService.getCategories()
      .subscribe({
        next: data => {
          console.log("Succès GET");
          this.categories = data;
        },
        error: err => {
          console.log("Erreur GET");
        }
      });
  }

  validerFormulaire(form: NgForm) {
    console.log(form.value);
  
    if (form.value.id !== undefined) {
      console.log("id non vide ...");
      // flag pour distinguer entre le mode AJOUT et le mode EDIT
      let nouveau: boolean = true;
      let index = 0;
  
      do {
        let p = this.produits[index];
        console.log(p.code + ' : ' + p.designation + ': ' + p.prix + ' : ' + p.categorie);
  
        if (p.id === form.value.id) {
          // rendre le mode à EDIT
          nouveau = false;
          console.log('ancien');
  
          let reponse: boolean = confirm("Produit existant. Confirmez vous la mise à jour de :" + p.designation + " ?");
          if (reponse === true) {
            // mettre à jour dans le BackEnd
            this.http.put<Array<Produit>>("http://localhost:3333/produits/" + form.value.id, form.value)
              .subscribe({
                next: updatedProduit => {
                  console.log("Succès PUT");
                  // mettre à jour le produit aussi dans le tableau "produits" (FrontEnd)
                  p.code = form.value.code;
                  p.designation = form.value.designation;
                  p.prix = form.value.prix;
                  p.categorie = form.value.categorie;
                  console.log('Mise à jour du produit:' + p.designation);
                  // Hide the form after successful update
                  this.produitEdite = null;
                },
                error: err => {
                  console.log("Erreur PUT");
                }
              });
          } else {
            console.log("Mise à jour annulée");
          }
          // Arrêter la boucle
          break;
        } else {
          // continuer à boucler
          index++;
        }
      } while (nouveau && index < this.produits.length);
  
      // en cas d'ajout
      if (nouveau) {
        console.log('nouveau');
        this.produits.push(form.value);
        console.log("Ajout d'un nouveau produit:" + form.value.designation);
      }
    } else {
      console.log("id vide...");
    }
  }
  

  ajouterProduit(nouveauProduit: Produit) {
    this.http.post<Produit>("http://localhost:3333/produits", nouveauProduit)
      .subscribe({
        next: addedProduct => {
          console.log("Succès POST");
          this.produits.push(addedProduct);
          console.log("Ajout d'un nouveau produit:" + addedProduct.designation);
        },
        error: err => {
          console.log("Erreur POST");
        }
      });
  }

  mettreAJourProduit(nouveau: Produit, ancien: Produit) {
    let reponse: boolean = confirm("Produit existant. Confirmez-vous la mise à jour de :" + ancien.designation + " ?");
    if (reponse == true) {
      this.http.put<Produit>("http://localhost:3333/produits/" + ancien.id, nouveau)
        .subscribe({
          next: updatedProduit => {
            console.log("Succès PUT");
            Object.assign(ancien, updatedProduit);
            console.log('Mise à jour du produit:' + ancien.designation);
          },
          error: err => {
            console.log("Erreur PUT");
          }
        });
    } else {
      console.log("Mise à jour annulée");
    }
  }

  supprimerProduit(produit: Produit) {
    const reponse: boolean = confirm("Voulez-vous supprimer le produit : " + produit.designation + " ?");
    if (reponse === true) {
      console.log("Suppression confirmée...");
      this.http.delete("http://localhost:3333/produits/" + produit.id)
        .subscribe({
          next: () => {
            console.log("Succès DELETE");
            // Remove the product from the local array
            const index = this.produits.indexOf(produit);
            if (index !== -1) {
              this.produits.splice(index, 1);
            }
          },
          error: err => {
            console.log("Erreur DELETE");
          }
        });
    } else {
      console.log("Suppression annulée...");
    }
  }

  effacerSaisie() {
    this.produitCourant = new Produit();
  }

  editerProduit1(produit: Produit) {
    this.produitCourant = { ...produit };
    this.produitEdite = produit; // Copy the attributes of the product being edited into produitCourant
  }

}