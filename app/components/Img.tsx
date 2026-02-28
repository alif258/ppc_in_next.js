interface ImgProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  onClick?: () => void;
  aspectRatio?: string;
}

const roundedMap = {
  none: "0px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "24px",
  full: "9999px",
};

export default function Img({
  src,
  alt = "",
  width,
  height,
  className = "",
  objectFit = "cover",
  rounded = "none",
  onClick,
  aspectRatio,
}: ImgProps) {
  return (
    <div
      className={className}
      style={{
        width: width ?? "100%",
        height: height ?? "auto",
        aspectRatio,
        borderRadius: roundedMap[rounded],
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit,
        }}
      />
    </div>
  );
}