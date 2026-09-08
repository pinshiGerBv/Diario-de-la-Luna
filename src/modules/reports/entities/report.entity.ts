export class Report {
  id: number;
  postId: string | number;
  reportedBy?: string | number;
  reason: string;
  description?: string;
  createdAt: Date;
}