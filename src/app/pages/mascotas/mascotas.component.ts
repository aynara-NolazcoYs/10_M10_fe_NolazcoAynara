import { Component } from '@angular/core';
import { MascotasService } from './services/mascotas.service';
@Component({
  selector: 'app-mascotas',
  standalone: false,
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.css'
})
export class MascotasComponent {
mascotas: any[] = [];

  form: any = {
    id: null,
    nombre: '',
    tipo: '',
    edad: '',
    descripcion: ''
  };

  editando = false;

  constructor(private service: MascotasService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
  this.service.getAll().subscribe((data: any) => {
    this.mascotas = [...data]; // 🔥 aquí va
  });
}

  guardar() {
    if (this.editando) {
      this.service.update(this.form.id, this.form).subscribe(() => {
        this.reset();
        this.cargar();
      });
    } else {
      this.service.create(this.form).subscribe(() => {
        this.reset();
        this.cargar();
      });
    }
  }

  editar(m: any) {
    this.form = { ...m };
    this.editando = true;
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar mascota?')) {
      this.service.delete(id).subscribe(() => {
        this.cargar();
      });
    }
  }

  reset() {
    this.form = {
      id: null,
      nombre: '',
      tipo: '',
      edad: '',
      descripcion: ''
    };
    this.editando = false;
  }
}
