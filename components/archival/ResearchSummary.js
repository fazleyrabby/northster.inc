import MetaLabel from "@/components/ui/MetaLabel";

export default function ResearchSummary({ project, className = "" }) {
  return (
    <div className={`border border-border bg-panel hover:border-accent/50 transition-colors duration-400 ${className}`}>
      <div className="border-b border-border bg-panel-2 px-5 py-3 flex justify-between items-center gap-4">
        <div className="flex gap-6 items-center">
          <MetaLabel>{project.code}</MetaLabel>
          <span className="doc-ref">LAB/01</span>
        </div>
        <div className="flex gap-4 items-center">
          <MetaLabel accent>● {project.state}</MetaLabel>
        </div>
      </div>
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-display text-2xl md:text-3xl leading-tight group-hover:text-accent transition-colors duration-400">
            {project.title}
          </h3>
        </div>
        <p className="text-xs text-muted leading-relaxed">{project.summary}</p>
        <div className="border-t border-border-soft pt-4 space-y-2">
          <div className="flex justify-between gap-4">
            <MetaLabel>DIVISION</MetaLabel>
            <span className="doc-ref">{project.division}</span>
          </div>
          <div className="flex justify-between gap-4">
            <MetaLabel>STARTED</MetaLabel>
            <span className="doc-ref">{project.started}</span>
          </div>
          <div className="flex justify-between gap-4">
            <MetaLabel>STATUS</MetaLabel>
            <span className="doc-ref text-accent/70">{project.status}</span>
          </div>
          {project.nextReview && (
            <div className="flex justify-between gap-4">
              <MetaLabel>NEXT REVIEW</MetaLabel>
              <span className="doc-ref">{project.nextReview}</span>
            </div>
          )}
        </div>
        {project.notes && (
          <div className="border-t border-border-soft pt-4">
            <MetaLabel>NOTES</MetaLabel>
            <p className="text-xs text-muted-2 mt-2 leading-relaxed">{project.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}