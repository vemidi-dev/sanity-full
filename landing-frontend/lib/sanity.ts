import { createClient } from "@sanity/client";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "r1krvsp5";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: "2024-01-01",
});