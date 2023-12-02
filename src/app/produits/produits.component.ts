

import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { NgForm } from '@angular/forms';
import { ProduitsService } from '../services/produits.service';



@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit{

  constructor(private produitsService :ProduitsService)
  {

  }

  ngOnInit(): void 
  {
    //Message affiché au moment de l'affichage du composant
    console.log("Initialisation du composant: Récupérer la liste des produits");
    //charger les données
    this.consulterProduits(); 
  }

  consulterProduits()
  {
    console.log("Récupérer la liste des produits");
    //Appeler la méthode 'getProduits' du service pour récupérer les données du JSON
    this.produitsService.getProduits()
    .subscribe(
      {
        //En cas de succès
        next: data=> {
          console.log("Succès GET", data);
          this.produits=data;
        },
        //En cas d'erreur
        error: err=> {
          console.log("Erreur GET");
        }
      }
    )
  }

  produits: Array<Produit> = [
    {id:1,code:'x12',designation:"Panier plastique",prix:20},
    {id:2,code:'y4',designation:"table en bois",prix:100},
    {id:3,code:'y10',designation:"salon en cuir",prix:3000}
    ];

    produitEdite: Produit | null = null;

    nouveauProduit: Produit = {
      id: 0,
      code: '',
      designation: '',
      prix: 0
    };
    produitCourant = new Produit();

    editerProduit(produit: Produit) {
      this.produitEdite = produit;
    }

    supprimerProduit(p: Produit) {
      const confirmation = window.confirm("Voulez-vous vraiment supprimer ce produit ?");
      
      if (confirmation) {
        this.produitsService.deleteProduit(p.id).subscribe({
          next: () => {
            console.log("Succès DELETE", p);
            const index = this.produits.indexOf(p);
            if (index !== -1) {
              this.produits.splice(index, 1);
            }
          },
          error: err => {
            console.log("Erreur DELETE", err);
          }
        });
      }
    }
    
    validerFormulaire(form: NgForm) {
      if (this.produitEdite && form.valid) {
        console.log("Validation du formulaire pour la mise à jour du produit", form.value);
        this.produitsService.updateProduit(this.produitEdite.id, form.value).subscribe({
          next: updatedProduit => {
            console.log("Succès PUT", updatedProduit);
            // Mettre à jour le produit dans la liste
            const index = this.produits.findIndex(p => p.id === this.produitEdite!.id);
            if (index !== -1) {
              this.produits[index] = form.value;
            }
            // Cacher le formulaire après validation
            this.produitEdite = null;
          },
          error: err => {
            console.log("Erreur PUT", err);
          }
        });
      }
    }

    afficherFormulaireAjout: boolean = false;

    afficherFormulaireAjoutProduit() {
      this.afficherFormulaireAjout = true;
    }
  
  /*effacerSaisie() {
    this.produitCourant = new Produit(); // Réinitialise le produitCourant
  }*/

  annulerEdition() {
    // Annuler l'édition et cacher le formulaire
    this.produitEdite = null;
  }
  
  editerProduit1(produit: Produit) {
    this.produitCourant = { ...produit }; // Copie les attributs du produit en cours d'édition dans produitCourant
    this.produitEdite = produit;

  }
}
