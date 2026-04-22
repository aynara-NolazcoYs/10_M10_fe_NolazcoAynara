import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
nombre = '';
  correo = '';

  enviar(e: Event) {
    e.preventDefault();
    console.log(this.nombre, this.correo);
    alert("Formulario enviado");
  }
}
