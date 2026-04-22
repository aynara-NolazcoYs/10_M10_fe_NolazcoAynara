import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: false,
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  services = [
  {
    name: 'Consulta veterinaria',
    description: 'Revisión completa de salud para tu mascota.',
    image: 'https://hospitalveterinario.cr/wp-content/uploads/2018/11/consulta-veterinaria-1.jpg'
  },
  {
    name: 'Vacunación',
    description: 'Protección contra enfermedades comunes.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwA1fpnBm-d6Dr9E4LPX8NoTwz8XDKIOosjQ&s'
  },
  {
    name: 'Grooming',
    description: 'Baño, corte y cuidado estético profesional.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKvRibn8YTgRo8s0eeb7-AgP83DJo3e_g2YA&s'
  }
  ];
}
