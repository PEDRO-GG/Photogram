import { Component, Input, OnInit } from '@angular/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnInit {
  @Input() post;
  constructor() {}

  timeFromNow(createdAt) {
    dayjs.extend(relativeTime);
    return dayjs(createdAt).fromNow();
  }

  ngOnInit(): void {
    // console.log(this.post)
  }
}
