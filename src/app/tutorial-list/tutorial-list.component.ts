import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.css']
})
export class TutorialListComponent implements OnInit {
  tutorialsObservable: Observable<any[]>;
  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.tutorialsObservable = this.getTutorials('/tutoriale');
  }

  getTutorials(listPath): Observable<any[]> {
    return this.db.list(listPath).valueChanges();
  }

}
