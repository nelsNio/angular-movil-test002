import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  constructor() { }

  retornar() {
    return [
              {
                codigo: 1,
                descripcion: "Carne",
                precio: 12.33
              },
              {
                codigo: 2,
                descripcion: "Pollo",
                precio: 54
              },
              {
                codigo: 3,
                descripcion: "BBC",
                precio: 14
              }
           ];
  }
}
