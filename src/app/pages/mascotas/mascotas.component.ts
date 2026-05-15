import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MascotasService } from './services/mascotas.service';

@Component({
  selector: 'app-mascotas',
  standalone: false,
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.css'
})
export class MascotasComponent {
  mascotas: any[] = [];
  
  @ViewChild('formulario') formulario!: NgForm;

  form: any = {
    id: null,
    nombre: '',
    tipo: '',
    edad: '',
    descripcion: ''
  };

  editando = false;
  mensajeError = '';
  mensajeExito = '';

  constructor(private service: MascotasService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.service.getAll().subscribe((data: any) => {
      this.mascotas = [...data];
    });
  }

  guardar() {
    // Validar que el formulario sea válido
    if (!this.formulario.valid) {
      this.mostrarError('Por favor completa todos los campos requeridos correctamente');
      return;
    }

    if (this.editando) {
      this.service.update(this.form.id, this.form).subscribe(
        () => {
          this.mostrarExito('Mascota actualizada exitosamente');
          this.reset();
          this.cargar();
        },
        (error) => {
          this.mostrarError('Error al actualizar la mascota');
        }
      );
    } else {
      this.service.create(this.form).subscribe(
        () => {
          this.mostrarExito('Mascota registrada exitosamente');
          this.reset();
          this.cargar();
        },
        (error) => {
          this.mostrarError('Error al registrar la mascota');
        }
      );
    }
  }

  editar(m: any) {
    this.form = { ...m };
    this.editando = true;
    this.mensajeError = '';
    this.mensajeExito = '';
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar esta mascota?')) {
      this.service.delete(id).subscribe(
        () => {
          this.mostrarExito('Mascota eliminada exitosamente');
          this.cargar();
        },
        (error) => {
          this.mostrarError('Error al eliminar la mascota');
        }
      );
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
    this.mensajeError = '';
    this.mensajeExito = '';
    
    // Resetear el formulario también
    if (this.formulario) {
      this.formulario.resetForm();
    }
  }

  private mostrarError(mensaje: string) {
    this.mensajeError = mensaje;
    setTimeout(() => {
      this.mensajeError = '';
    }, 5000);
  }

  private mostrarExito(mensaje: string) {
    this.mensajeExito = mensaje;
    setTimeout(() => {
      this.mensajeExito = '';
    }, 5000);
  }

  // Métodos para validación en template
  isFieldInvalid(fieldName: string): boolean {
    if (!this.formulario) return false;
    const field = this.formulario.controls[fieldName];
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  isFieldValid(fieldName: string): boolean {
    if (!this.formulario) return false;
    const field = this.formulario.controls[fieldName];
    return field ? field.valid && (field.dirty || field.touched) : false;
  }
}
