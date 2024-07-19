import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Contact, phoneTypeValues, addressTypeValues } from '../contacts/contact.model';
import { ContactsService } from '../contacts/contacts.service';
import { RestrictedWordsValidator } from '../validators/restricted-words-validator.directive';
import { DateValueAccessorDirective } from '../date-value-accessor/date-value-accessor.directive';

@Component({
  imports: [CommonModule, FormsModule, RestrictedWordsValidator, DateValueAccessorDirective],
  standalone: true,
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  phoneTypes = phoneTypeValues;
  addressTypes = addressTypeValues;

  contact: Contact = {
    id: '',
    personal: false,
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    favoritesRanking: 0,
    phone: {
      phoneNumber: '',
      phoneType: '',
    },
    address: {
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      addressType: ''
    },
    notes: '',
  };

  constructor(
    private route: ActivatedRoute,
    private contactsSvc: ContactsService,
    private router: Router
  ) { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return
    this.contactsSvc.getContact(contactId).subscribe((contact) => {
      if (contact)
        this.contact = contact;
    });
  }

  saveContact(form: NgForm) {
    console.log(this.contact.dateOfBirth, typeof this.contact.dateOfBirth);
    //contact data model is substituded with the freshly formed form.value:
    this.contactsSvc.saveContact(form.value).subscribe({
      next: () => this.router.navigate(["/contacts"])
    });     
  }
}
