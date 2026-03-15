import { createClient } from "@/lib/supabase/server";
import { Review } from "@/lib/hires/reviews";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("lm-ext-teacher-reviews")
      .select("*");

    if (error) {
      console.error("Error fetching reviews:", error);
      return NextResponse.json(
        { error: "Failed to fetch reviews" },
        { status: 500 },
      );
    }

    return NextResponse.json(data as Review[]);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newReview: Omit<Review, "review_id" | "created_at" | "updated_at"> = {
      candidate_id: body.candidate_id ?? null,
      behavioural_score: body.behavioural_score ?? null,
      teaching_score: body.teaching_score ?? null,
      speaking_score: body.speaking_score ?? null,
      overall_score: body.overall_score ?? null,
      reviewed_by: body.reviewed_by ?? null,
      comments: body.comments ?? null,
    };

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("lm-ext-teacher-reviews")
      .insert(newReview)
      .select();

    if (error) {
      console.error("Error inserting review:", error);
      return NextResponse.json(
        { error: "Failed to insert review" },
        { status: 500 },
      );
    }

    return NextResponse.json(data as Review[]);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
