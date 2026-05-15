import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  url = 'http://localhost:3000/mascotas';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.url).pipe(
      catchError((error) => {
        console.error('Error al obtener mascotas:', error);
        return of([]);
      })
    );
  }

  create(data: any) {
    return this.http.post(this.url, data).pipe(
      catchError((error) => {
        // Si recibimos un error pero el status es 2xx, lo consideramos éxito
        if (error.status >= 200 && error.status < 300) {
          console.log('Mascota creada (respuesta inconsistente):', error);
          return of(data);
        }
        console.error('Error real al crear mascota:', error);
        throw error;
      })
    );
  }

  update(id: number, data: any) {
    return this.http.put(`${this.url}/${id}`, data).pipe(
      catchError((error) => {
        if (error.status >= 200 && error.status < 300) {
          console.log('Mascota actualizada (respuesta inconsistente):', error);
          return of(data);
        }
        console.error('Error real al actualizar mascota:', error);
        throw error;
      })
    );
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`).pipe(
      catchError((error) => {
        if (error.status >= 200 && error.status < 300) {
          console.log('Mascota eliminada (respuesta inconsistente):', error);
          return of(null);
        }
        console.error('Error real al eliminar mascota:', error);
        throw error;
      })
    );
  }
}