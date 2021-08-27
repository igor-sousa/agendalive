import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Live } from 'src/app/shared/model/live.model';
import { LiveService } from 'src/app/shared/service/live.service';

@Component({
  selector: 'app-live-nxt',
  templateUrl: './live-nxt.component.html',
  styleUrls: ['./live-nxt.component.css']
})
export class LiveNxtComponent implements OnInit {

  livesNext!: Live[];

  constructor(
    public liveService: LiveService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getLivesNxt();
  }

  getLivesNxt() {
    this.liveService.getLivesWithFlag('next').subscribe(data => {
      this.livesNext = data.content;
      console.log(this.livesNext);
      this.livesNext.forEach(live => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      })
    });
  }
}
