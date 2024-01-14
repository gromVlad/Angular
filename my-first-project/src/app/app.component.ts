import { Component } from '@angular/core';

interface Item {
  id: number;
  name: string;
}

interface NestedArray {
  id: number;
  name: string;
  items: Item[];
}

@Component({
  selector: 'main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  nestedArray: NestedArray[] = [
    {
      id: 1,
      name: 'Parent 1',
      items: [
        {
          id: 11,
          name: 'Child 1.1',
        },
        {
          id: 12,
          name: 'Child 1.2',
        },
      ],
    },
    {
      id: 2,
      name: 'Parent 2',
      items: [
        {
          id: 21,
          name: 'Child 2.1',
        },
        {
          id: 22,
          name: 'Child 2.2',
        },
      ],
    },
  ];

}
