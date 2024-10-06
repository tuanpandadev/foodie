interface SamplePrevArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function SamplePrevArrow({
  className,
  style,
  onClick
}: SamplePrevArrowProps) {
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    >
      BACK
    </div>
  );
}
