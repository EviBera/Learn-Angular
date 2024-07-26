import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { phoneTypeValues, addressTypeValues } from '../contacts/contact.model';
import { restrictedWordsValidator } from '../validators/restricted-words.validator';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  phoneTypes = phoneTypeValues;
  addressTypes = addressTypeValues;
  contactForm = this.fb.nonNullable.group({
    id: '',
    icon: '',
    personal: false,
    //FormControl syntax: firstName: new FormControl('initial value', Validator or [Validators array])
    //eg.: new FormControl('', Validators.required);

    //FormBuilder syntax:
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: '',
    dateOfBirth: < Date | null >null,
    favoritesRanking: < number | null >null,
    phones: this.fb.array([this.createPhoneGroup()]),
    address: this.fb.nonNullable.group({
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      addressType: '',
    }),
    notes: ['', restrictedWordsValidator(['foo', 'bar'])],
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
      
      for(let i = 1; i < contact.phones.length; i++){
        this.addPhone();
      }

      this.contactForm.setValue(contact);
    })
  }

  get firstName(){
    return this.contactForm.controls.firstName;
  }

  get notes(){
    return this.contactForm.controls.notes;
  }

  createPhoneGroup(){
     const phoneGroup = this.fb.nonNullable.group({
      phoneNumber: '',
      phoneType: '',
      preferred: false
    })

    phoneGroup.controls.preferred.valueChanges.subscribe(value => {
      
    });

    return phoneGroup;
  }

  addPhone() {
    this.contactForm.controls.phones.push(this.createPhoneGroup());
  }

  saveContact() {
    console.log(this.contactForm.controls.dateOfBirth.value, typeof this.contactForm.controls.dateOfBirth.value);
    this.contactSvc.saveContact(this.contactForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/contacts'])
    });
  }
}
