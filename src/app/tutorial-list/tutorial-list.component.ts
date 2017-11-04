import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FormGroup, FormBuilder } from '@angular/forms';
export interface Tutorial {
  id?: string;
  title: string;
  description: string;
  url: string;
}
@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.css']
})
export class TutorialListComponent implements OnInit {
  tutorialsRef: AngularFireList<any>;
  tutorialsObservable: Observable<any[]>;
  formUpdate: FormGroup;
  show = 'showList';
  showButton = 'addButton';
  tutorialKey = '';
  constructor(private db: AngularFireDatabase, private fb: FormBuilder) {}

  addForm() {
    this.show = 'addForm';
    this.showButton = '';
  }

  ngOnInit() {
    this.tutorialsRef = this.db.list('tutoriale');
    this.tutorialsObservable = this.tutorialsRef
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
  }

  deleteTutorial(key: string) {
    this.tutorialsRef.remove(key);
  }
  updateBtn(tutorial) {
    this.show = 'formUpdate';
    this.tutorialKey = tutorial.key;

    // create form
    this.formUpdate = this.fb.group({
      title: tutorial.title,
      description: tutorial.description,
      url: tutorial.url
    });
  }
  updateTutorial(tutorial) {
    this.tutorialsRef.update(this.tutorialKey, {
      title: tutorial.title,
      description: tutorial.description,
      url: tutorial.url
    });
    this.show = 'showList';
    return (this.tutorialKey = '');
  }
}
