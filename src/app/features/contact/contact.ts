import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { ISelectOption } from '../../core/interfaces/select.interface';
import { HlmSelect, HlmSelectImports } from '@spartan-ng/helm/select';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { BrnLabel } from '@spartan-ng/brain/label';
import { lucideAudioLines } from '@ng-icons/lucide';
import { FeedbackService } from '../../core/service/feedback-serice/feedback-service';
import { Loader } from '../../shared/components/loader/loader';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  imports: [
    NgIcon,
    RouterModule,
    HlmButton,
    ReactiveFormsModule,
    BrnSelectImports,
    HlmSelectImports,
    HlmInput,
    Loader,
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  viewProviders: [provideIcons({ lucideAudioLines })],
})
export class Contact {
  appName = environment.applicationName;

  feedbackForm = new FormGroup({
    category: new FormControl('general_inquiry', Validators.required),
    priority: new FormControl('low', Validators.required),
    user: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(255),
    ]),
  });

  loader = false;

  CATEGORY_CHOICES: ISelectOption[] = [
    { value: 'billing_inquiry', label: 'Billing Inquiry' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'technical_inquiry', label: 'Technical Inquiry' },
    { value: 'general_inquiry', label: 'General Inquiry' },
    { value: 'improvement_idea', label: 'Improvement Idea' },
  ];

  PRIORITY_CHOICES: ISelectOption[] = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  STATUS_CHOICES: ISelectOption[] = [
    { value: 'open', label: 'Open' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'closed', label: 'Closed' },
  ];

  constructor(private readonly feedbackService: FeedbackService) {}
  onSubmit = () => {
    this.loader = true;
    this.feedbackService.sendFeedback(this.feedbackForm.value).subscribe({
      next: (data) => {
        this.loader = false;
        this.feedbackForm.reset();
      },
      error: (error) => {
        this.loader = false;
      },
    });
  };
}
