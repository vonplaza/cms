import { Department } from "./department"

export interface Subject {
  id: number
  user_id?: number
  subject_code: string
  description: string
  department_id: number | null
  status: string
  department?: Department
}

