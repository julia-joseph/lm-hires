import { createClient } from "@/lib/supabase/server";
import { Candidate } from "@/lib/hires/candidate";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Creating Supabase client...");
    const supabase = await createClient();
    console.log("Supabase client created successfully", supabase);

    console.log("Querying table: gf-lm-ext-teachers");
    const { data, error } = await supabase
      .from("gf-lm-ext-teachers")
      .select("*");

    console.log("Query completed");
    console.log("error", error);
    console.log("data", data);

    if (error) {
      console.error("Error fetching teachers:", error);
      return NextResponse.json(
        { error: "Failed to fetch teachers" },
        { status: 500 },
      );
    }

    return NextResponse.json(data as Candidate[]);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
