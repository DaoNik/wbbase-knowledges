import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackComponent {
  feedback: FormGroup;

  constructor(private fb: FormBuilder) {
    this.feedback = this.fb.group({
      userName: ['', [Validators.required, Validators.pattern(/[А-я]/)]],
      userId: ['', [Validators.required]],
      text: ['', [Validators.minLength(10)]],
    });
  }
}
