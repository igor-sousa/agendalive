import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Live } from 'src/app/shared/model/live.model';
import { LiveService } from 'src/app/shared/service/live.service';

@Component({
  selector: 'app-live-pre',
  templateUrl: './live-pre.component.html',
  styleUrls: ['./live-pre.component.css']
})
export class LivePreComponent implements OnInit {

  livesPrevious!: Live[];

  constructor(
    public liveService: LiveService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getLivesPre();
  }

  getLivesPre() {
    this.liveService.getLivesWithFlag('previous').subscribe(data => {
      this.livesPrevious = data.content;
      console.log(this.livesPrevious);
      this.livesPrevious.forEach(live => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      })
    });
  }
}
