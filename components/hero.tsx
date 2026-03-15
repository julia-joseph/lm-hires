"use client";

import { useEffect, useState } from "react";
import Candidates from "./candidates/candidates";
import Reviews from "./candidates/reviews";
import { Candidate } from "@/lib/hires/candidate";
import ReviewMode from "./candidates/review-mode";
import { Review } from "@/lib/hires/reviews";

export function Hero() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewMode, setReviewMode] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null,
  );

  useEffect(() => {
    async function fetchCandidates() {
      try {
        const response = await fetch("/api/candidates");
        if (!response.ok) {
          throw new Error("Failed to fetch candidates");
        }
        const data = await response.json();
        setCandidates(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchCandidates();

    async function fetchReviews() {
      try {
        const response = await fetch("/api/candidates/reviews");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setReviewsError(
          err instanceof Error ? err.message : "An error occurred",
        );
      } finally {
        setReviewsLoading(false);
      }
    }

    fetchReviews();
  }, []);

  const toggleReviewMode = () => {
    setReviewMode(!reviewMode);
    setSelectedCandidate(null);
  };

  return (
    <div className="flex flex-col gap-10 items-center">
      {candidates && !reviewMode && (
        <Candidates
          candidates={candidates}
          loading={loading}
          error={error}
          reviews={reviews}
          onSelectCandidate={(candidate) => setSelectedCandidate(candidate)}
          reviewMode={reviewMode}
          toggleReviewMode={toggleReviewMode}
        />
      )}
      {reviews && reviewMode && (
        <ReviewMode
          candidates={candidates}
          reviews={reviews}
          loading={reviewsLoading}
          error={reviewsError}
          reviewMode={reviewMode}
          toggleReviewMode={toggleReviewMode}
        />
      )}
      {selectedCandidate != null && !reviewMode && (
        <Reviews
          candidate={selectedCandidate}
          initialReview={reviews.find(
            (review) => review.candidate_id === selectedCandidate.id,
          )}
          onCancel={() => setSelectedCandidate(null)}
          onSubmit={async (reviewData) => {
            // Optional: post review back to API and refresh reviews
            try {
              const response = await fetch("/api/candidates/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reviewData),
              });
              if (!response.ok) throw new Error("Failed to save review");

              const saved = await response.json();
              setReviews((prev) => [
                ...prev.filter((r) => r.candidate_id !== selectedCandidate.id),
                ...saved,
              ]);
              setSelectedCandidate(null);
            } catch (err) {
              console.error(err);
              setSelectedCandidate(null);
            }
          }}
        />
      )}
    </div>
  );
}
