import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Contact } from '../contacts/contact.model';
import { ContactsService } from '../contacts/contacts.service';
import { phoneTypeValues } from '../contacts/contact.model';

@Component({
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  phoneTypes = phoneTypeValues;

  contact: Contact = {
    id: '',
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
    }
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
    console.log(form.value);
    //contact data model is substituded with the freshly formed form.value:
    this.contactsSvc.saveContact(form.value).subscribe({
      next: () => this.router.navigate(["/contacts"])
    });     
  }
}
