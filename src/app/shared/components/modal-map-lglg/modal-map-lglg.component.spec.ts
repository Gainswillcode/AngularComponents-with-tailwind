import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMapLglgComponent } from './modal-map-lglg.component';

describe('ModalMapLglgComponent', () => {
  let component: ModalMapLglgComponent;
  let fixture: ComponentFixture<ModalMapLglgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalMapLglgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMapLglgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
