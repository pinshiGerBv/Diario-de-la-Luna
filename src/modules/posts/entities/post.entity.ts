export interface Post {
  id: number;
  author: string;
  authorId?: string;
  title?: string;
  category: string;
  content: string;
  excerpt?: string;
  replies: number;
  likes: number;
  reported: boolean;
  createdAt: Date;
  updatedAt: Date;
}
