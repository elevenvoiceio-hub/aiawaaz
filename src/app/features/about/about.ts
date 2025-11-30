import { Component } from '@angular/core';
import { Footer } from '../../shared/components/footer/footer';
import { Headers } from '../../shared/components/headers/headers';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-about',
  imports: [Footer, Headers],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  appName = environment.applicationName;
}
