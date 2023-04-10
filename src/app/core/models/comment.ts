import { TimeStamp } from "./timestamp"
import { User } from "./user"

export interface Comment extends TimeStamp{
  id: number
  user_id: number,
  subject?: string
  body: string
  curriculum_id: number | null,
  curriculum_revision_id: number | null,
  status: string
  user?: User
}

