import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  onGoingTraining = false;
  isLoading = false;
  private loadingSubs: Subscription;
  exerciseSubscription: Subscription;

  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
      exercise => {
        if(exercise) {
          this.onGoingTraining = true;
        } else {
          this.onGoingTraining = false;
        }
      }
    );
  }

  ngOnDestroy() {
    if(this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }

}
