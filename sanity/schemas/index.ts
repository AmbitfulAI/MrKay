import { noteSchema }                              from "./note";
import { noteCategorySchema }                      from "./noteCategory";
import { testimonialSchema, successStorySchema }   from "./testimonial";
import { productSchema }                           from "./product";
import { galleryImageSchema }                      from "./gallery";
import { impactOrgSchema }                         from "./impact";
import { heroSlideSchema }                         from "./heroSlide";
import { siteConfigSchema }                        from "./siteConfig";
import { faqSchema }                               from "./faq";

export const schemas = [
  siteConfigSchema,
  heroSlideSchema,
  faqSchema,
  noteCategorySchema,
  noteSchema,
  testimonialSchema,
  successStorySchema,
  productSchema,
  galleryImageSchema,
  impactOrgSchema,
];
