import { getImageProps } from "next/image";

import type { PhotoSource } from "@/content/photos";

const SIZES = "(max-width: 740px) 100vw, 55vw";

type PhotoProps = {
  photo: PhotoSource;
  alt: string;
  className?: string;
  /** For the largest above-the-fold image (LCP). */
  eager?: boolean;
};

/** A static image with an optional 720w variant for small screens. */
export function Photo({ photo, alt, className, eager }: PhotoProps) {
  const { props } = getImageProps({
    src: photo.image,
    alt,
    className,
    loading: eager ? "eager" : "lazy",
    fetchPriority: eager ? "high" : undefined,
  });
  const srcSet =
    photo.small && photo.image.width > 720
      ? `${photo.small.src} 720w, ${props.src} ${photo.image.width}w`
      : undefined;
  // Static export has no image optimizer, so the srcset is built from the two files.
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} alt={alt} srcSet={srcSet} sizes={srcSet ? SIZES : undefined} />;
}
