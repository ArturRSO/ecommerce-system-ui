import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stores-table',
  templateUrl: './stores-table.component.html',
  styleUrls: ['./stores-table.component.scss']
})
export class StoresTableComponent implements OnInit {

  // TEST
  public columns = ['id', 'name', 'progress', 'fruit'];
  public headers = ['ID', 'Name', 'Progress', 'Fruit'];
  public users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));;

  constructor() { }

  ngOnInit(): void {
  }

  public getObject(object: any) {
    // TO DO
    console.log(object);
  }
}

// TEST

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))]
  };
}
