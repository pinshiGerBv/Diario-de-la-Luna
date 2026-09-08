import { Injectable } from '@nestjs/common';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsService {
  private reports: Report[] = [];
  private nextId = 1;

  create(createReportDto: CreateReportDto): Report {
    const report: Report = {
      id: this.nextId++,
      postId: createReportDto.postId,
      reportedBy: createReportDto.reportedBy,
      reason: createReportDto.reason,
      description: createReportDto.description,
      createdAt: new Date(),
    };
    this.reports.push(report);
    return report;
  }

  findAll(): Report[] {
    return [...this.reports].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }
}