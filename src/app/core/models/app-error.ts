export interface AppError {
  status: number;
  message: string;
  details?: any;
}