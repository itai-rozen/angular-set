import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesRoomListComponent } from './games-room-list.component';

describe('GamesRoomListComponent', () => {
  let component: GamesRoomListComponent;
  let fixture: ComponentFixture<GamesRoomListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamesRoomListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GamesRoomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
