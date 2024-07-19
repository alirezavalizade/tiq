import { Box } from "@/components/ui";

interface ImageProps {
  src: string;
  width: number;
  alt?: string;
  ar: string;
  className?: string;
}

interface ImageParams {
  baseUrl: string;
  width: number;
  ar: string;
  formats: { dpr: number; quality: number }[];
}

function generateSrcSet({ baseUrl, width, formats, ar }: ImageParams): string {
  return formats
    .map(({ dpr, quality }) => {
      const url = new URL(baseUrl);
      url.searchParams.set("auto", "format");
      url.searchParams.set("dpr", dpr.toString());
      url.searchParams.set("fit", "crop");
      url.searchParams.set("ixlib", "python-3.2.1");
      url.searchParams.set("q", quality.toString());
      url.searchParams.set("ar", ar);
      url.searchParams.set("w", width.toString());
      return `${url.toString()} ${dpr}x`;
    })
    .join(", ");
}

function Imagix({ src, width, ar, alt = "No image description available", className }: ImageProps) {
  const srcSet = generateSrcSet({
    baseUrl: src,
    ar,
    width,
    formats: [
      { dpr: 1, quality: 40 },
      { dpr: 2, quality: 30 },
    ],
  });

  return <Box as="img" src={src} srcSet={srcSet} className={className} loading="lazy" alt={alt} width={width} />;
}

export default Imagix;
