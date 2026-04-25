import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  url = 'http://localhost:3000/mascotas';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.url);
  }

  create(data: any) {
    return this.http.post(this.url, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}