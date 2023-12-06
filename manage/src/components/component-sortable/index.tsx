import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { SortableItem } from './SortableItem';

const data = [
  { id: 1, content: 'Item 1' },
  { id: 2, content: 'Item 2' },
  { id: 3, content: 'Item 3' },
]

/**
 * 拖拽拍排序 dndkit
 */
export const SortAble = () => {
  const [items, setItems] = useState(data);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  console.log(items)

  return (
    <div className='bg-pink-200'>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items}
          strategy={verticalListSortingStrategy}
        >
          {items.map(({ id, content }) => <div key={id} className="flex">
            <span onClick={() => { console.log(id) }}>I im a sortable item</span>
            <SortableItem key={id} id={id} name={content} />
          </div>)}
        </SortableContext>
      </DndContext>
    </div>
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(v => v.id === active.id);
        const newIndex = items.findIndex(v => v.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}