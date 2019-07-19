import { Component, OnInit } from '@angular/core';
import { SectionService } from '../../services/section.service';
import { Section } from '../../shared/Section';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {
  public sections: Section[] = [];
  constructor(private sectionService: SectionService) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.sectionService.all().subscribe((sections: Section[]) => {
      this.sections = sections;
    });
  }

  deleteSection(id) {
    this.sectionService.destroy(id).subscribe(res => {
      this.sectionService.sectionsChanged.next();
      this.sections = this.sections.filter(s => s.id != id);
    });
  }
}
