export class Product {
  id?: number;
  name?: string;
  stock?: number;
  category?: string;
  isbn?: string;
  description?: string;
  author?: string;
  language?: string;
  publisher?: string;
  picture?: string;
  price?: number;
  pdf?: string;

  constructor(
      id?: number,
      name?: string,
      stock?: number,
      category?: string,
      isbn?: string,
      description?: string,
      author?: string,
      language?: string,
      publisher?: string,
      picture?: string,
      price?: number,
      pdf?: string
  ) {
    this.id = id;
    this.name = name;
    this.stock = stock;
    this.category = category;
    this.isbn = isbn;
    this.description = description;
    this.author = author;
    this.language = language;
    this.publisher = publisher;
    this.picture = picture;
    this.price = price;
    this.pdf = pdf;
  }
}
