import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifiertachebilantacheComponent } from './modifiertachebilantache.component';

describe('ModifiertachebilantacheComponent', () => {
  let component: ModifiertachebilantacheComponent;
  let fixture: ComponentFixture<ModifiertachebilantacheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifiertachebilantacheComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifiertachebilantacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
