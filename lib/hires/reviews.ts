export interface Review {
  review_id: number;
  created_at: string;
  updated_at: string | null;
  candidate_id: number | null;
  behavioural_score: number | null;
  teaching_score: number | null;
  speaking_score: number | null;
  overall_score: number | null;
  reviewed_by: string | null;
  comments: string | null;
}
