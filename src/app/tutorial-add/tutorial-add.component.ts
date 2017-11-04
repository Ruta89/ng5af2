import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FormGroup, FormBuilder } from '@angular/forms';

export interface Tutorial {
  title: string;
  description: string;
  url: string;
}
@Component({
  selector: 'app-tutorial-add',
  templateUrl: './tutorial-add.component.html',
  styleUrls: ['./tutorial-add.component.css']
})
export class TutorialAddComponent implements OnInit {
  tutorialeRef: AngularFireList<any>;
  formAdd: FormGroup;

  constructor(private db: AngularFireDatabase, private fb: FormBuilder) {
    this.tutorialeRef = db.list('tutoriale');
    this.createForm();
  }

  createForm() {
    this.formAdd = this.fb.group({
      title: '',
      description: '',
      url: ''
    });
  }

  ngOnInit() {}

  saveTutorial(form) {
    this.tutorialeRef.push({
      title: form.title,
      description: form.description,
      url: form.url
    });
    this.createForm();
  }
}
