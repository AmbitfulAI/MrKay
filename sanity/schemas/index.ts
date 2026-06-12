import { noteSchema }                              from "./note";
import { noteCategorySchema }                      from "./noteCategory";
import { testimonialSchema, successStorySchema }   from "./testimonial";
import { productSchema }                           from "./product";
import { galleryImageSchema }                      from "./gallery";
import { impactOrgSchema }                         from "./impact";

export const schemas = [
  noteCategorySchema,
  noteSchema,
  testimonialSchema,
  successStorySchema,
  productSchema,
  galleryImageSchema,
  impactOrgSchema,
];
