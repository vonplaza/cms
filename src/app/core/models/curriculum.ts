import { User } from "./user";

export interface Curriculum {
  title: string;
  version: string;
  date: string;
  author: string;
  role: string;
  status: string;
  isCurrent: string;
}

export interface Curriculum2 {
  id: number
  user_id: number
  department_id: number
  version: string
  metadata: string
  user?: User 
}