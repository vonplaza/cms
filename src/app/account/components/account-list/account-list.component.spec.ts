import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountListComponent2 } from './account-list.component';

describe('AccountListComponent', () => {
  let component: AccountListComponent2;
  let fixture: ComponentFixture<AccountListComponent2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountListComponent2 ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountListComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
