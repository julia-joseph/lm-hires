"use client";

import { useEffect, useState } from "react";
import { Review } from "@/lib/hires/reviews";
import { createClient } from "@/lib/supabase/client";
import { Heading } from "../heading";
import { Candidate } from "@/lib/hires/candidate";

interface ReviewFormProps {
  candidate: Candidate;
  initialReview?: Review | null;
  onSubmit?: (
    review: Omit<Review, "review_id" | "created_at" | "updated_at">,
  ) => void;
  onCancel?: () => void;
}

export default function Reviews({
  candidate,
  initialReview,
  onSubmit,
  onCancel,
}: ReviewFormProps) {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    candidate_id: candidate.id,
    behavioural_score: "",
    teaching_score: "",
    speaking_score: "",
    overall_score: "",
    comments: "",
  });

  useEffect(() => {
    if (!initialReview) {
      setFormData({
        candidate_id: candidate.id,
        behavioural_score: "",
        teaching_score: "",
        speaking_score: "",
        overall_score: "",
        comments: "",
      });
      return;
    }

    setFormData({
      candidate_id: candidate.id,
      behavioural_score: initialReview.behavioural_score?.toString() ?? "",
      teaching_score: initialReview.teaching_score?.toString() ?? "",
      speaking_score: initialReview.speaking_score?.toString() ?? "",
      overall_score: initialReview.overall_score?.toString() ?? "",
      comments: initialReview.comments ?? "",
    });
  }, [candidate.id, initialReview]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setUserEmail(data.user?.email ?? null);
    }

    loadUser();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const reviewData = {
        candidate_id: candidate.id,
        behavioural_score: formData.behavioural_score
          ? parseFloat(formData.behavioural_score)
          : null,
        teaching_score: formData.teaching_score
          ? parseFloat(formData.teaching_score)
          : null,
        speaking_score: formData.speaking_score
          ? parseFloat(formData.speaking_score)
          : null,
        overall_score: formData.overall_score
          ? parseFloat(formData.overall_score)
          : null,
        reading_score: null,
        writing_score: null,
        reviewed_by: userEmail,
        comments: formData.comments || null,
      };

      // Here you would typically send the data to your API
      // For now, we'll call the onSubmit prop
      if (onSubmit) {
        onSubmit(reviewData);
      }

      // Reset form
      setFormData({
        candidate_id: candidate.id,
        behavioural_score: "",
        teaching_score: "",
        speaking_score: "",
        overall_score: "",
        comments: "",
      });
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const ScoreInput = ({
    label,
    name,
    value,
    onChange,
  }: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-bold text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type="number"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        min="0"
        max="10"
        step="0.1"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="0.0 - 10.0"
      />
    </div>
  );

  const candidateIdMod = `GM${new Date(candidate.created_at).getFullYear()}${String(new Date(candidate.created_at).getMonth() + 1).padStart(2, "0")}${String(
    new Date(candidate.created_at).getDate(),
  ).padStart(2, "0")}${candidate.id}`;

  return (
    <div className="body-bg p-6 rounded-lg w-full max-w-7xl border">
      <div className="flex justify-between items-center">
        <Heading title={`Review Candidate #${candidateIdMod}`} />
        <div className="flex justify-end space-x-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isSubmitting
              ? "Submitting..."
              : initialReview
                ? "Update"
                : "Submit"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <div className="">
            <ScoreInput
              label="Behavioural Score"
              name="behavioural_score"
              value={formData.behavioural_score}
              onChange={handleInputChange}
            />
            <ScoreInput
              label="Teaching Score"
              name="teaching_score"
              value={formData.teaching_score}
              onChange={handleInputChange}
            />
            <ScoreInput
              label="Listening Score"
              name="speaking_score"
              value={formData.speaking_score}
              onChange={handleInputChange}
            />
            <ScoreInput
              label="Overall Score"
              name="overall_score"
              value={formData.overall_score}
              onChange={handleInputChange}
            />
          </div>

          <div className="grow">
            <label
              htmlFor="comments"
              className="block text-sm font-bold text-gray-700 mb-1"
            >
              Comments
            </label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              rows={7}
              className="w-full h-full px-3 pt-1 pb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Additional comments about the candidate..."
            />
          </div>
        </div>
      </form>
    </div>
  );
}
