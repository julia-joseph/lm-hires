"use client";

import { Candidate } from "@/lib/hires/candidate";
import { Heading } from "../heading";

export default function Candidates(props: {
  candidates: Candidate[];
  loading: boolean;
  error: string | null;
  reviews: import("@/lib/hires/reviews").Review[];
  onSelectCandidate: (candidate: Candidate) => void;
  reviewMode?: boolean;
  toggleReviewMode?: () => void;
}) {
  const { candidates, loading, error, reviews, onSelectCandidate } = props;

  if (loading) {
    return <div className="text-center py-8">Loading candidates...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-2 py-2 ">
      <div className="flex justify-between items-center">
        <Heading title="Instructor Candidates" />
        {props.reviewMode ? (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            onClick={props.toggleReviewMode}
          >
            Candidate Mode
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            onClick={props.toggleReviewMode}
          >
            Review Mode
          </button>
        )}
      </div>
      <div
        className="overflow-x-auto max-h-70 overflow-y-auto"
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
              <th className="px-4 py-2 border-b text-left">Action</th>
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
              <th className="px-4 py-2 border-b text-left">Submitted On</th>
              <th className="px-4 py-2 border-b text-left">
                Days Since Submission
              </th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => {
              const createDate = new Date(candidate.created_at);
              const candidateId = `GM${createDate.getFullYear()}${String(createDate.getMonth() + 1).padStart(2, "0")}${String(
                createDate.getDate(),
              ).padStart(2, "0")}${candidate.id}`;
              const hasReview = reviews.some(
                (review) => review.candidate_id === candidate.id,
              );

              function dateDiffInDays(a: Date, b: Date) {
                const _MS_PER_DAY = 1000 * 60 * 60 * 24;
                // Discard the time and time-zone information.
                const utc1 = Date.UTC(
                  a.getFullYear(),
                  a.getMonth(),
                  a.getDate(),
                );
                const utc2 = Date.UTC(
                  b.getFullYear(),
                  b.getMonth(),
                  b.getDate(),
                );

                return Math.floor((utc2 - utc1) / _MS_PER_DAY);
              }

              const date1 = createDate;
              const date2 = new Date();
              const diffDays = dateDiffInDays(date1, date2);

              return (
                <tr key={candidate.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => onSelectCandidate(candidate)}
                      className={
                        "px-3 py-1 rounded text-sm font-medium " +
                        (hasReview
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-red-600 text-white hover:bg-red-700")
                      }
                    >
                      {hasReview ? "View" : "Review"}
                    </button>
                  </td>
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
                    {new Date(candidate.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {hasReview ? "-" : diffDays}
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
