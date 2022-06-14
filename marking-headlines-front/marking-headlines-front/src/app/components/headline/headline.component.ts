import { Component, OnInit } from '@angular/core';
import { Headline } from '../../models/headline.model';
import { User } from '../../models/s/user.model';
import {HeadlineService } from '../../services/headline.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.css']
})
export class HeadlineComponent implements OnInit {
  headlines: Headline[] = [];
  randomHeadline: Headline = new Headline();
  currentUser: User = new User();
  lastHeadlineMgs = false;
  noHeadlinesMgs = false;

  constructor(private headlineService: HeadlineService,
    private cookieService: CookieService) { }

  ngOnInit(): void {
    this.currentUser.number = this.getOrCreateUserNumberFromCookie();
    this.getHeadlines();
  }

getOrCreateUserNumberFromCookie(): string {
    // Get user number from sookies or create it.
    var userNumber = this.cookieService.get('number');
    if (!userNumber) {
      this.cookieService.set('number', `${Date.now()}`, {expires: new Date("August 22, 2023 01:15:00")});
      userNumber = this.cookieService.get('number');
    }
    return userNumber;
}

getHeadlines(): void {
  this.headlineService.getHeadlinesForUser(this.currentUser.number)
  .subscribe(
    data => {
      if (data.length) {
      this.noHeadlinesMgs = false;
      this.headlines = data;
      var randomIndex = this.nextRandomIndex(this.headlines.length)
      this.randomHeadline = this.headlines[randomIndex];
      } else { // data empty
      this.noHeadlinesMgs = true;
      }

    },
    error => {
      console.log(error);
    });
}

nextRandomIndex(max: number, except?: number): number {
  if (!except) {
    except = max;
  }
  do {
      // Max not inscluded
      var index = Math.floor(Math.random() * max);
  } while(except == index);
  return index;
}

saveEval(evaluation: string): void {
  // use current user instead ? 
  // save user choise
  var userToSave = new User();
    userToSave.title_id = this.randomHeadline.id,
    userToSave.number = this.currentUser.number,
    userToSave.eval = evaluation

  // Show success toastr
  this.headlineService.showSuccess(`${evaluation}`, 'Saglabāts! ');

  this.headlineService.createUser(userToSave)
  .subscribe(
    newUser => {
      // Remove evaluated headline
        var indexToRemove = this.headlines.findIndex(item => item.id == this.randomHeadline.id);
        this.headlines.splice(indexToRemove, 1);
        if (this.headlines.length) {
          this.lastHeadlineMgs = false;
          // change headline to random next
          var randomIndex = this.nextRandomIndex(this.headlines.length)
          this.randomHeadline = this.headlines[randomIndex];
        } else {
          this.noHeadlinesMgs = true;
        }

    },
    error => {
      console.log(error);
    });

}

skip(): void {
  if (this.headlines.length <= 1) {
    this.lastHeadlineMgs = true;
  } else {
      var except = this.headlines.findIndex(item => item.id == this.randomHeadline.id);
      var max = this.headlines.length;
      this.randomHeadline = this.headlines[this.nextRandomIndex(max, except)];
  }

}
}
