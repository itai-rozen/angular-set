import { Component } from '@angular/core';
import { SocketioService } from '../../services/socketio.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-multiplayer',
  standalone: true,
  imports: [],
  templateUrl: './multiplayer.component.html',
  styleUrl: './multiplayer.component.sass'
})
export class MultiplayerComponent {
  constructor(
    private socketIoService: SocketioService,
    private route: ActivatedRoute,
    private router: Router
  ){}
  gameId: string = this.route.snapshot.paramMap.get('gameId') ?? '';
  ngOnInit() {

    // this.socketIoService.connect()
  }

  onCreateGame = () => {
    this.gameId = crypto.randomUUID()
    this.router.navigate(['/multiplayer', this.gameId])
  }
}
