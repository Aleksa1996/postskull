import { Component, OnInit } from '@angular/core';
import { OverviewService } from '../../../../services/overview.service';
import { Overview } from '../../../../shared/Overview';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public overviewFilter;
  public overviewFilters: string[] = ['all', 'posts', 'comments', 'likes'];
  public overviews: Overview = new Overview();
  constructor(private overviewService: OverviewService) {}

  ngOnInit() {
    this.overviewService.all().subscribe((res: Overview) => {
      this.overviews = res;
    });
  }

  filterChange(filter) {
    this.overviewService.allWithFilter(filter).subscribe((res: Overview) => {
      this.overviews = res;
    });
  }
}
