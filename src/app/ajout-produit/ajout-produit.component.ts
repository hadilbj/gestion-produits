import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { ProduitsService } from '../services/produits.service';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {

  nouveauProduit: Produit = {
    id: 0,
    code: '',
    designation: '',
    prix: 0
  };

  constructor(private produitsService: ProduitsService) {}

  ngOnInit(): void {
    console.log("Initialisation du composant: Ajouter un nouveau produit");
  }

  ajouterProduit(nouveauProduit: Produit) {
    this.produitsService.addProduit(nouveauProduit).subscribe({
      next: addProduit => {
        console.log("Succès POST", addProduit);
        alert("Produit ajouté avec succès !");
        // Réinitialise le formulaire pour préparer une nouvelle insertion
        this.nouveauProduit = {
          id: 0,
          code: '',
          designation: '',
          prix: 0
        };
      },
      error: err => {
        console.log("Erreur POST", err);
        // Ajoutez ici le code nécessaire pour traiter l'erreur lors de l'ajout du produit
      }
    });
  }

  validerFormulaire() {
  // Vérifier si l'ID est défini avant d'appeler la méthode idExiste
  if (this.nouveauProduit.id !== undefined && this.produitsService.idExiste(this.nouveauProduit.id)) {
    alert("Identificateur de produit déjà existant.");
  } else {
    this.ajouterProduit(this.nouveauProduit);
  }
}

}
