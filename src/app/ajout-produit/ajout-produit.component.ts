// ajout-produit.component.ts
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private produitsService: ProduitsService) { }

  ngOnInit(): void {
    // Fetch existing products on component initialization
    this.produitsService.getProduits().subscribe(
      data => {
        console.log("Existing products:", data);
        // Handle the existing products as needed
      },
      error => {
        console.error("Error fetching existing products:", error);
      }
    );
  }

  validerFormulaire(form: NgForm) {
    if (form.value.id !== undefined) {
      alert("Identificateur de produit déjà existant.");
    } else {
      // Delegate to the service method for adding a new product
      this.ajouterProduit();
      // Clear the form for a new insertion
      form.resetForm();
    }
  }
  ajouterProduit() {
    // Delegate to the service method for adding a new product
    this.produitsService.addProduit(this.nouveauProduit).subscribe(
      addedProduct => {
        console.log("New product added:", addedProduct);
        // Handle the added product as needed
      },
      error => {
        console.error("Error adding new product:", error);
      }
    );
  }
  effacerSaisie() {
    this.nouveauProduit = {
      id: 0,
      code: '',
      designation: '',
      prix: 0
    };
  }
}

  // Additional methods can be added as needed