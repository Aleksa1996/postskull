import { Component, OnInit } from '@angular/core';
import { Report } from '../../shared/Report';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  public reports: Report[] = [];
  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.reportService.all().subscribe((reports: Report[]) => {
      this.reports = reports;
    });
  }

  deleteReport(id) {
    this.reportService.destroy(id).subscribe(() => {
      this.reports = this.reports.filter(r => r.id != id);
    });
  }
}
