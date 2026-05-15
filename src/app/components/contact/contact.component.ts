import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  formulario!: FormGroup;
  mensajeError = '';
  mensajeExito = '';
  enviando = false;

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    // Componente listo
  }

  crearFormulario(): void {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  enviar(): void {
    if (!this.formulario.valid) {
      this.mostrarError('Por favor completa todos los campos correctamente');
      return;
    }

    this.enviando = true;
    const datos = this.formulario.value;

    // Simulamos envío (en producción sería un HttpClient)
    console.log('Datos de contacto:', datos);
    
    setTimeout(() => {
      this.mostrarExito('¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.');
      this.formulario.reset();
      this.enviando = false;
    }, 1500);
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
      return `${this.getNombreCampo(fieldName)} es requerido`;
    }
    if (field.hasError('minlength')) {
      const minLength = field.getError('minlength')?.requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    if (field.hasError('email')) {
      return 'Email inválido';
    }

    return '';
  }

  private getNombreCampo(fieldName: string): string {
    const nombres: { [key: string]: string } = {
      nombre: 'Nombre',
      correo: 'Correo',
      mensaje: 'Mensaje'
    };
    return nombres[fieldName] || fieldName;
  }
}
