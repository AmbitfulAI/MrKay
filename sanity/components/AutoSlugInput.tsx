import { useEffect } from "react";
import { SlugInput, useFormValue, PatchEvent, set } from "sanity";
import type { SlugInputProps } from "sanity";

function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function AutoSlugInput(props: SlugInputProps) {
  const title = useFormValue(["title"]) as string | undefined;

  useEffect(() => {
    if (!title) return;
    if (props.value?.current) return; // never overwrite an existing slug
    const slug = slugify(title);
    if (!slug) return;
    props.onChange(PatchEvent.from(set({ _type: "slug", current: slug })));
  }, [title]); // eslint-disable-line react-hooks/exhaustive-deps

  return <SlugInput {...props} />;
}
