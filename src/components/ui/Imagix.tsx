import { Box } from "@/components/ui";

interface ImageProps {
  src: string;
  width: number;
  alt?: string;
  ar?: string;
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
    .map(
      ({ dpr, quality }) =>
        `${baseUrl}?auto=format&dpr=${dpr}&fit=crop&ixlib=python-3.2.1&q=${quality}&ar=${ar}&w=${width} ${dpr}x`,
    )
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
