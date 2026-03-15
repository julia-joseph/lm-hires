export interface Candidate {
  id: number;
  created_at: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  german_level: string | null;
  german_certificate_type: string | null;
  german_certificate_status: string | null;
  certificate_url: string | null;
  teaching_exp: string | null;
  teaching_german_levels: string | null;
  teaching_durations: string | null;
  teaching_locations: string | null;
  teaching_format: string | null;
  online_teaching: string | null;
  offline_teaching: string | null;
  preferred_teachingSlots: string | null;
  earliest_joining: string | null;
  intro_video_url: string | null;
  cv_url: string | null;
}
