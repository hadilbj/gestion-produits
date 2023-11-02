

import { Component } from '@angular/core';
import { Produit } from '../model/produit';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent {

  produits: Array<Produit> = [
    {id:1,code:'x12',designation:"Panier plastique",prix:20},
    {id:2,code:'y4',designation:"table en bois",prix:100},
    {id:3,code:'y10',designation:"salon en cuir",prix:3000}
    ];

    produitCourant = new Produit();

  supprimerProduit(p: Produit) {
    // Afficher une boîte de dialogue pour confirmer la suppression
    let reponse: boolean = confirm("Voulez-vous supprimer le produit : " + p.designation + " ?");
    if (reponse == true) {
      console.log("Suppression confirmée...");
      // Chercher l'indice du produit à supprimer
      let index: number = this.produits.indexOf(p);
      console.log("Indice du produit à supprimer : " + index);
      if (index !== -1) {
        // Supprimer le produit référencé
        this.produits.splice(index, 1);
      }
    } else {
      console.log("Suppression annulée...");
    }
  }
  validerFormulaire(form: NgForm) 
  {
    console.log(form.value);
    //this.produits.push(this.produitCourant);
    if (form.value.id != undefined)
    {
      console.log("id non vide ...");
      this.produits.push(form.value);
    }
    else
    {
      console.log("id vide ...");
    }
  }
    
  ajouterProduit(nouveauProduit: Produit) {
    // Vérifier si un produit avec le même ID existe déjà
    const produitExistant = this.produits.find((produit) => produit.id === nouveauProduit.id);
  
    // Si un produit avec le même ID existe, empêcher l'ajout
    if (produitExistant) {
      console.log("Le produit avec l'ID " + nouveauProduit.id + " existe déjà. Ajout annulé.");
    } else {
      // Sinon, ajouter le nouveau produit à la liste
      this.produits.push(nouveauProduit);
    }
  }
  
}