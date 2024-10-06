interface SampleNextArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function SampleNextArrow({
  className,
  style,
  onClick
}: SampleNextArrowProps) {
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      NEXT
    </div>
  );
}
