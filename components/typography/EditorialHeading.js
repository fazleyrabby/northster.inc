export default function EditorialHeading({
  children,
  as: As = "h2",
  size = "lg",
  className = "",
}) {
  const sizes = {
    sm: "text-4xl md:text-5xl",
    md: "text-5xl md:text-6xl lg:text-7xl",
    lg: "text-6xl md:text-8xl lg:text-9xl",
    xl: "text-7xl md:text-[8.5rem] lg:text-[12rem]",
  };
  return (
    <As className={`font-display ${sizes[size]} ${className}`}>
      {children}
    </As>
  );
}
