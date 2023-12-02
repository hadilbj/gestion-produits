import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit'; // Importez la classe Produit depuis le chemin correct
import { ProduitsService } from '../services/produits.service'; // Importez le service ProduitsService depuis le chemin correct

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {

  constructor(private produitsService: ProduitsService) {}

  ngOnInit(): void {
    // Message affiché au moment de l'affichage du composant
    console.log("Initialisation du composant: Ajouter un nouveau produit");
  }

  ajouterProduit(nouveauProduit: Produit) {
    this.produitsService.addProduit(nouveauProduit).subscribe({
      next: addProduit => {
        console.log("Succès POST", addProduit);
        // Ajoutez ici le code nécessaire pour traiter le succès de l'ajout du produit
      },
      error: err => {
        console.log("Erreur POST", err);
        // Ajoutez ici le code nécessaire pour traiter l'erreur lors de l'ajout du produit
      }
    });
  }
}
