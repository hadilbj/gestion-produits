

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
    this.produits.push(form.value);
  }
    
  ajouterProduit(nouveauProduit: Produit) {
    // Vérifier si un produit avec le même ID existe déjà
    const produitExistant = this.produits.find((produit) => produit.id === nouveauProduit.id);
  
    // Si un produit avec le même ID existe
  if (produitExistant) {
    // Afficher une boîte de dialogue de confirmation
    const confirmation = window.confirm("Le produit avec l'ID " + nouveauProduit.id + " existe déjà. Voulez-vous le mettre à jour ?");

    if (confirmation) {
      // Mettre à jour le produit existant
      Object.assign(produitExistant, nouveauProduit);
      console.log("Produit mis à jour avec succès !");
    } else {
      console.log("Mise à jour annulée.");
    }
  } else {
    // Si un produit avec le même ID n'existe pas, ajouter le nouveau produit à la liste
    // Assurez-vous que les propriétés du produit sont définies avant de l'ajouter
    if (nouveauProduit.id !== undefined && nouveauProduit.code !== undefined &&
        nouveauProduit.designation !== undefined && nouveauProduit.prix !== undefined) {
      this.produits.push(nouveauProduit);
      console.log("Produit ajouté avec succès !");
    } else {
      console.log("Les propriétés du produit ne sont pas toutes définies. Ajout annulé.");
    }
  }
  }

  
  verifierDoublon(id: number | undefined) {
    if (id === undefined) {
      console.log("L'ID est indéfini. Ajout annulé.");
      return;
    }
  
    // Convertir l'ID en nombre
    const idNumber: number = +id;
  
    const produitExistant = this.produits.find((produit) => produit.id === idNumber);
  
    if (produitExistant !== undefined) {
      console.log("Le produit avec l'ID " + idNumber + " existe déjà. Ajout annulé.");
      // Vous pouvez également afficher un message d'erreur ou mettre en surbrillance le champ, etc.
    }
  }
  
}
