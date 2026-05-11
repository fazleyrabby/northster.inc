import Link from "next/link";

export default function Button({
  children,
  href,
  variant = "primary",
  size = "default",
  className = "",
  ...rest
}) {
  const base =
    "inline-flex items-center gap-3 meta border transition-all duration-400 select-none";
  const sizes = {
    default: "px-5 py-3",
    sm: "px-3.5 py-2",
    lg: "px-7 py-4 text-[12px]",
  };
  const variants = {
    primary:
      "border-text/60 text-text hover:border-text hover:bg-text/8 hover:text-text",
    ghost:
      "border-border text-muted hover:border-accent/40 hover:text-accent",
    accent:
      "border-accent text-accent hover:bg-accent/10",
    bare:
      "border-transparent text-text hover:text-accent",
  };
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  const inner = (
    <>
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }
  return (
    <button className={cls} type="button" {...rest}>
      {inner}
    </button>
  );
}
