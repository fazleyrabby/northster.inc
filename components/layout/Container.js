export default function Container({ children, className = "", as: As = "div", size = "default" }) {
  const sizes = {
    narrow: "max-w-3xl",
    default: "max-w-[1400px]",
    wide: "max-w-[1680px]",
    full: "max-w-none",
  };
  return (
    <As className={`mx-auto w-full px-6 md:px-10 lg:px-16 ${sizes[size]} ${className}`}>
      {children}
    </As>
  );
}
