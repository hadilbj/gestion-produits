

import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit{

  constructor(private http :HttpClient)
  {

  }

  ngOnInit(): void {
      console.log("Initialisation du composant: Récupérer la liste des produits");

      this.http.get<Array<Produit>> ("http://localhost:9999/produits")
      .subscribe(
        {
          next: data=>{
            console.log("Succès Get");
            this.produits=data;
          },
          error: err=>{
            console.log("Erreur Get");
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
  validerFormulaire(form: NgForm) {
    console.log(form.value);
    //this.produits.push(this.produitCourant);
    if (form.value.id != undefined)
    {
      console.log("id non vide ...");
      //flag pour distinguer entre le mode AJOUT et le mode EDIT
      let nouveau:boolean=true;
      let index=0;
      do{
        let p=this.produits[index];
        console.log(
          p.code + ' : ' + p.designation + ': ' + p.prix);

          if (p.id==form.value.id)
          {
            //rendre le mode à EDIT 
            nouveau=false; 
            console.log('ancien');

            let reponse:boolean = confirm("Produit existant. Confirmez vous la mise à jour de :"+p.designation+" ?");
            if (reponse==true)
            {
              //mettre à jour dans le BackEnd
              this.http.put<Array<Produit>> ("http://localhost:9999/produits/"+ form.value.id, form.value)
              .subscribe(
                {
                  next: updatedProduit=>{
                    console.log("Succès PUT");
                    //mettre à jour le produit aussi dans le tableau "produits" (FrontEnd)
                    p.code=form.value.code; 
                    p.designation=form.value.designation; 
                    p.prix=form.value.prix;
                    console.log('Mise à jour du produit:' +p.designation);
                  },
                  error: err=> { 
                    console.log("Erreur PUT"); 
                  }
                }
              )
            }
            else
            {
              console.log("Mise à jour annulée");
            }
            //Arrêter la boucle 
            return;
          }
          else{
            //continuer à boucler 
            index++;
          }
      }
      while(nouveau && index<this.produits.length);
      //en cas d'ajout
      if (nouveau)
      {
        console.log('nouveau'); 
        this.produits.push(form.value); 
        console.log("Ajout d'un nouveau produit:"+form.value.designation);
      }
    }
    else
    {
      console.log("id vide...");
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
  effacerSaisie() {
    this.produitCourant = new Produit(); // Réinitialise le produitCourant
  }
  
  editerProduit1(produit: Produit) {
    this.produitCourant = { ...produit }; // Copie les attributs du produit en cours d'édition dans produitCourant
    this.produitEdite = produit;

  }
}
