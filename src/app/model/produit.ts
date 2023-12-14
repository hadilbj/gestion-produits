export class Produit {
    id: number | undefined;
    code: string | undefined;
    designation: string | undefined;
    categorie: {
      code: string | undefined;
      // Other properties of Categorie, if any
    } | undefined;
    prix: number | undefined;
  }
  