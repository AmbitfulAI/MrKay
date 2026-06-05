import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityConfig } from "@/sanity/config";

const builder = createImageUrlBuilder(sanityConfig);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
