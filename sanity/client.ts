import { createClient } from "@sanity/client";
import { sanityConfig } from "./config";

export const sanityClient = createClient({
  ...sanityConfig,
  token: process.env.SANITY_API_TOKEN,
  perspective: "published",
});
