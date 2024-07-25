import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { phoneTypeValues, addressTypeValues } from '../contacts/contact.model';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  phoneTypes = phoneTypeValues;
  addressTypes = addressTypeValues;
  contactForm = this.fb.nonNullable.group({
    id: '',
    personal: false,
    //FormControl syntax: firstName: new FormControl('initial value', Validator or [Validators array])
    //eg.: new FormControl('', Validators.required);
    
    //FormBuilder syntax:
    firstName: ['', Validators.required],
    lastName: '',
    dateOfBirth: '',
    favoritesRanking: < number | null>null,
    phone: this.fb.nonNullable.group({
      phoneNumber: '',
      phoneType: '',
    }),
    address: this.fb.nonNullable.group({
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      addressType: '',
    }),
    notes: '',
  });
  

  constructor(
    private route: ActivatedRoute, 
    private contactSvc: ContactsService, 
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return

    this.contactSvc.getContact(contactId).subscribe((contact) => {
      if(!contact) return;

      //if we would like to initialize only some of the required properties, eg.:
      //cons names = {firstName: contact.firstName, lastName: contact.lastName};
      //this.contactForm.patchValue(names);
      
      this.contactForm.setValue(contact);
    })
  }

  saveContact() {
    console.log(this.contactForm.controls.dateOfBirth.value, typeof this.contactForm.controls.dateOfBirth.value);
    this.contactSvc.saveContact(this.contactForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/contacts'])
    });
  }
}
