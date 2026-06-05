/**
 * Sanity Studio served at /studio
 * Visit http://localhost:3000/studio to manage content
 */
'use client'

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export const dynamic = "force-dynamic";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
