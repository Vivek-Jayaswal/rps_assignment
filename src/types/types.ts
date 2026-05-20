export interface CommentType {
  id: number;
  user: string;
  time: string;
  currentValue: string;
  fieldValue: string;
  comment: string;
  file?: File;
}
