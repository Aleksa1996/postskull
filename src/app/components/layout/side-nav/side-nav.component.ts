import { Component, OnInit, OnDestroy } from '@angular/core';
import { SectionService } from '../../../services/section.service';
import { Section } from '../../../shared/Section';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
  public sections: Section[] = [];
  private subs = new Subject();
  constructor(private sectionService: SectionService) {}

  ngOnInit() {
    this.fetchSections();
    this.sectionService.sectionsChanged.takeUntil(this.subs).subscribe(() => {
      this.fetchSections();
    });
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  fetchSections() {
    this.sectionService.all().subscribe((sections: Section[]) => {
      this.sections = sections;
    });
  }
}
