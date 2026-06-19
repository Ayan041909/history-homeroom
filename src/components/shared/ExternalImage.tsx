"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

const FALLBACK =
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1280&h=720&fit=crop&q=80&auto=format";

type ExternalImageProps = Omit<ImageProps, "unoptimized" | "referrerPolicy"> & {
  fallbackSrc?: string;
};

/** External CDN / Wikimedia images — stable loading with referrer policy + fallback. */
export function ExternalImage({
  src,
  alt,
  fallbackSrc = FALLBACK,
  onError,
  ...props
}: ExternalImageProps) {
  const [failed, setFailed] = useState(false);
  const resolved = failed ? fallbackSrc : src;

  return (
    <Image
      {...props}
      src={resolved}
      alt={alt}
      unoptimized
      referrerPolicy="no-referrer"
      onError={(e) => {
        if (!failed) setFailed(true);
        onError?.(e);
      }}
    />
  );
}
