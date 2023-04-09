import { User } from "./user"

export interface Comment extends TimeStamp{
  id: number
  user_id: number
  body: string
  curriculum_id: number | null,
  curriculum_revision_id: number | null,
  status: string
  user?: User
}

export interface TimeStamp{
  created_at?: string
  updated_at?: string
}