import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import {Observer} from 'rxjs/Observer';
import {setTimeout} from 'timers';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/Rx' ;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  numbersObsSubcription: Subscription;
  customObsSubcription: Subscription;

  constructor() {
  }

  ngOnInit() {
    const myNumbers = Observable.interval(1000)
      .map((data: number) => {
        return data * 2;
      });
    this.numbersObsSubcription = myNumbers.subscribe(
      (number: number) => {
        console.log(number);
      }
    );

    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package');
      }, 2000);
      setTimeout(() => {
        observer.next('second package');
      }, 4000);
      setTimeout(() => {
        //observer.next('first package') ;
        //observer.error('this does not work') ;
        observer.complete();
      }, 5000);

      setTimeout(() => {
        observer.next('third package');
      }, 6000);
    });

    this.customObsSubcription = myObservable.subscribe(
      (data: string) => {
        console.log(data);
      },
      (error: string) => {
        console.log(error);
      },
      () => {
        console.log('completed');
      }
    );
  };

  ngOnDestroy() {
    this.numbersObsSubcription.unsubscribe();
    this.customObsSubcription.unsubscribe();
  }
}
