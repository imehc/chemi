import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortableItem({ id, name }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Create a draggable handle
  const dragHandle = (
    <span {...listeners} {...attributes} style={{ cursor: 'grab' }}>
      drag me
    </span>
  );

  return (
    <div ref={setNodeRef} style={style} className="flex">
      <span onClick={() => { console.log(id) }}>I'm a sortable item</span>
      <span>{name}</span>
      {dragHandle}
    </div>
  );
}