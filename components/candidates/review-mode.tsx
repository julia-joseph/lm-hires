"use client";

import { Candidate } from "@/lib/hires/candidate";
import { Heading } from "../heading";
import { Review } from "@/lib/hires/reviews";

export default function ReviewMode(props: {
  candidates: Candidate[];
  loading: boolean;
  error: string | null;
  reviewMode?: boolean;
  toggleReviewMode?: () => void;
  reviews: Review[];
}) {
  const { candidates, loading, error, reviews } = props;

  const reviewsByCandidate = new Map<number, Review>();
  for (const review of reviews) {
    // keep most recent review per candidate (by created_at)
    const candidateKey = review.candidate_id ?? -1;
    const existing = reviewsByCandidate.get(candidateKey);
    if (
      !existing ||
      new Date(review.created_at) > new Date(existing.created_at)
    ) {
      if (review.candidate_id != null) {
        reviewsByCandidate.set(review.candidate_id, review);
      }
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading reviews...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-2 py-2">
      <div className="flex justify-between items-center">
        <Heading title="Instructor Reviews" />
        {props.reviewMode ? (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            onClick={props.toggleReviewMode}
          >
            Candidate View
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            onClick={props.toggleReviewMode}
          >
            Review View
          </button>
        )}
      </div>
      <div
        className="overflow-x-auto"
        style={{
          fontSize: "12px",
        }}
      >
        <table
          className="min-w-full bg-white border border-gray-300 font-normal"
          style={{
            fontSize: "12px",
          }}
        >
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 border-b text-left">Candidate ID</th>
              <th
                className="px-4 py-2 border-b text-left"
                style={{ minWidth: "150px" }}
              >
                Name
              </th>
              <th className="px-4 py-2 border-b text-left">Email</th>
              <th className="px-4 py-2 border-b text-left">Phone</th>
              <th className="px-4 py-2 border-b text-left">Location</th>
              <th className="px-4 py-2 border-b text-left">German Level</th>
              <th className="px-4 py-2 border-b text-left">Certificate Type</th>
              <th className="px-4 py-2 border-b text-left">
                Certificate Status
              </th>
              <th className="px-4 py-2 border-b text-left">Teaching Exp</th>
              <th className="px-4 py-2 border-b text-left">Teaching Levels</th>
              <th className="px-4 py-2 border-b text-left">
                Teaching Durations
              </th>
              <th className="px-4 py-2 border-b text-left">
                Teaching Locations
              </th>
              <th className="px-4 py-2 border-b text-left">Teaching Format</th>
              <th className="px-4 py-2 border-b text-left">Online Teaching</th>
              <th className="px-4 py-2 border-b text-left">Offline Teaching</th>
              <th className="px-4 py-2 border-b text-left">Preferred Slots</th>
              <th className="px-4 py-2 border-b text-left">Earliest Joining</th>
              <th className="px-4 py-2 border-b text-left">Intro Video</th>
              <th className="px-4 py-2 border-b text-left">CV</th>
              <th className="px-4 py-2 border-b text-left">Behavioural</th>
              <th className="px-4 py-2 border-b text-left">Teaching</th>
              <th className="px-4 py-2 border-b text-left">Speaking</th>
              <th className="px-4 py-2 border-b text-left">Overall</th>
              <th className="px-4 py-2 border-b text-left">Reviewed By</th>
              <th className="px-4 py-2 border-b text-left">Comments</th>
              <th className="px-4 py-2 border-b text-left">Submitted On</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => {
              const createDate = new Date(candidate.created_at);
              const candidateId = `GM${createDate.getFullYear()}${String(createDate.getMonth() + 1).padStart(2, "0")}${String(
                createDate.getDate(),
              ).padStart(2, "0")}${candidate.id}`;

              const review = reviewsByCandidate.get(candidate.id);

              return (
                <tr key={candidate.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{candidateId}</td>
                  <td className="px-4 py-2 border-b">
                    {candidate.name || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {candidate.email || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {candidate.phone || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {candidate.location || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {candidate.german_level || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {candidate.german_certificate_type || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {candidate.german_certificate_status || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {candidate.teaching_exp ? (
                      candidate.teaching_exp === "Yes" ? (
                        <span className="material-symbols-outlined text-green-500">
                          check_small
                        </span>
                      ) : (
                        <span className="material-symbols-outlined text-red-500">
                          close_small
                        </span>
                      )
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {candidate.teaching_german_levels || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {candidate.teaching_durations || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {candidate.teaching_locations || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {candidate.teaching_format || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {candidate.online_teaching ? (
                      candidate.online_teaching === "Yes" ? (
                        <span className="material-symbols-outlined text-green-500">
                          check_small
                        </span>
                      ) : (
                        <span className="material-symbols-outlined text-red-500">
                          close_small
                        </span>
                      )
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {candidate.offline_teaching ? (
                      candidate.offline_teaching === "Yes" ? (
                        <span className="material-symbols-outlined text-green-500">
                          check_small
                        </span>
                      ) : (
                        <span className="material-symbols-outlined text-red-500">
                          close_small
                        </span>
                      )
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {candidate.preferred_teachingSlots || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {candidate.earliest_joining
                      ? new Date(
                          candidate.earliest_joining,
                        ).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {candidate.intro_video_url ? (
                      <a
                        href={candidate.intro_video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {candidate.cv_url ? (
                      <a
                        href={candidate.cv_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {review?.behavioural_score ?? "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {review?.teaching_score ?? "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {review?.speaking_score ?? "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {review?.overall_score ?? "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {review?.reviewed_by || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {review?.comments || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {review?.created_at
                      ? new Date(review.created_at).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {candidates.length === 0 && (
        <p className="text-center py-8 text-gray-500">No candidates found.</p>
      )}
    </div>
  );
}
