import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabService } from './tab.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ihb-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {

  userId: string;

  name = new FormControl();
  email = new FormControl();

  constructor(private activatedRoute: ActivatedRoute, private tabService: TabService) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params.id;
    this.tabService.get(this.userId).subscribe(value => {
      this.name.setValue(value.firstName + ' ' + value.lastName);
      this.email.setValue(value.email);
    });
  }

}
