import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MascotasService } from './services/mascotas.service';

@Component({
  selector: 'app-mascotas',
  standalone: false,
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.css'
})
export class MascotasComponent implements OnInit {
  mascotas: any[] = [];
  
  formulario!: FormGroup;
  editando = false;
  mensajeError = '';
  mensajeExito = '';
  mascotaIdEditando: number | null = null;

  constructor(
    private service: MascotasService,
    private fb: FormBuilder
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.cargar();
  }

  crearFormulario(): void {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      tipo: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0), Validators.max(50)]],
      descripcion: ['', [Validators.minLength(5)]]
    });
  }

  cargar(): void {
    this.service.getAll().subscribe((data: any) => {
      this.mascotas = [...data];
    });
  }

  guardar(): void {
    // Validar que el formulario sea válido
    if (!this.formulario.valid) {
      this.mostrarError('Por favor completa todos los campos requeridos correctamente');
      return;
    }

    const datos = this.formulario.value;

    if (this.editando) {
      this.service.update(this.mascotaIdEditando!, datos).subscribe(
        () => {
          this.mostrarExito('Mascota actualizada exitosamente');
          this.reset();
          // Pequeño delay para que el servidor procese completamente
          setTimeout(() => this.cargar(), 500);
        },
        (error) => {
          // Verificar si es un error real o solo una respuesta con status inconsistente
          if (error.status >= 200 && error.status < 300) {
            this.mostrarExito('Mascota actualizada exitosamente');
            this.reset();
            setTimeout(() => this.cargar(), 500);
          } else {
            this.mostrarError('Error al actualizar la mascota');
          }
        }
      );
    } else {
      this.service.create(datos).subscribe(
        () => {
          this.mostrarExito('Mascota registrada exitosamente');
          this.reset();
          // Pequeño delay para que el servidor procese completamente
          setTimeout(() => this.cargar(), 500);
        },
        (error) => {
          // Verificar si es un error real o solo una respuesta con status inconsistente
          if (error.status >= 200 && error.status < 300) {
            this.mostrarExito('Mascota registrada exitosamente');
            this.reset();
            setTimeout(() => this.cargar(), 500);
          } else {
            this.mostrarError('Error al registrar la mascota');
          }
        }
      );
    }
  }

  editar(m: any): void {
    this.mascotaIdEditando = m.id;
    this.formulario.patchValue({
      nombre: m.nombre,
      tipo: m.tipo,
      edad: m.edad,
      descripcion: m.descripcion || ''
    });
    this.editando = true;
    this.mensajeError = '';
    this.mensajeExito = '';
  }

  eliminar(id: number): void {
    if (confirm('¿Eliminar esta mascota?')) {
      this.service.delete(id).subscribe(
        () => {
          this.mostrarExito('Mascota eliminada exitosamente');
          setTimeout(() => this.cargar(), 500);
        },
        (error) => {
          // Verificar si es un error real o solo una respuesta con status inconsistente
          if (error.status >= 200 && error.status < 300) {
            this.mostrarExito('Mascota eliminada exitosamente');
            setTimeout(() => this.cargar(), 500);
          } else {
            this.mostrarError('Error al eliminar la mascota');
          }
        }
      );
    }
  }

  reset(): void {
    this.formulario.reset();
    this.editando = false;
    this.mascotaIdEditando = null;
    this.mensajeError = '';
    this.mensajeExito = '';
  }

  private mostrarError(mensaje: string): void {
    this.mensajeError = mensaje;
    setTimeout(() => {
      this.mensajeError = '';
    }, 5000);
  }

  private mostrarExito(mensaje: string): void {
    this.mensajeExito = mensaje;
    setTimeout(() => {
      this.mensajeExito = '';
    }, 5000);
  }

  // Métodos para validación en template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.formulario.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.formulario.get(fieldName);
    return field ? field.valid && (field.dirty || field.touched) : false;
  }

  // Método para obtener errores específicos de un campo
  getFieldError(fieldName: string): string {
    const field = this.formulario.get(fieldName);
    if (!field || !field.errors || !field.touched) return '';

    if (field.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} es requerido`;
    }
    if (field.hasError('minlength')) {
      const minLength = field.getError('minlength')?.requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    if (field.hasError('min')) {
      const min = field.getError('min')?.min;
      return `Mínimo ${min}`;
    }
    if (field.hasError('max')) {
      const max = field.getError('max')?.max;
      return `Máximo ${max}`;
    }
    if (field.hasError('email')) {
      return 'Email inválido';
    }

    return '';
  }
}
