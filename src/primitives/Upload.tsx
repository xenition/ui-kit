import * as React from 'react';
import { cn } from './cn';

export interface UploadProps {
  /** Called with the chosen/dropped files. */
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  label?: React.ReactNode;
  className?: string;
}

/** Click-or-drop file dropzone bound to the theme tokens. Pairs with `@xenition/sdk` storage. */
export function Upload({
  onFiles,
  accept,
  multiple,
  label = 'Drag files here or click to browse',
  className,
}: UploadProps): React.ReactElement {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [drag, setDrag] = React.useState(false);

  const handle = (list: FileList | null) => {
    if (list && list.length) onFiles(Array.from(list));
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click();
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        handle(e.dataTransfer.files);
      }}
      className={cn(
        'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[var(--xen-radius-md)] border-2 border-dashed p-6 text-center transition-colors',
        drag ? 'border-primary bg-primary-50' : 'border-border bg-surface',
        className
      )}
    >
      <span className="text-sm text-muted">{label}</span>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => handle(e.target.files)}
      />
    </div>
  );
}
