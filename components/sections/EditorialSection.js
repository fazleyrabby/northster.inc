import Container from "@/components/layout/Container";

export default function EditorialSection({ children, className = "", padded = true, bordered = true }) {
  return (
    <section className={`${bordered ? "border-b border-border-soft" : ""} ${padded ? "py-24 md:py-32" : ""} ${className}`}>
      <Container size="wide">{children}</Container>
    </section>
  );
}
