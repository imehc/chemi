import { FC } from 'react';
import { Button } from '~/shadcn/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/shadcn/ui/card';

interface Props {
  onSelectSingleFile(file?: File): void;
}

export const LeftLayout: FC<Props> = ({ onSelectSingleFile }) => {
  return (
    <div className="w-1/5 max-w-[360px] h-full p-4">
      <Card>
        <CardHeader>
          <CardTitle>Local modal</CardTitle>
          <CardDescription> Add a local model</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline">
            <label htmlFor="add-local-modal" className="cursor-pointer w-fit">
              <input
                id="add-local-modal"
                type="file"
                className="hidden"
                onChange={(e) => onSelectSingleFile(e.target.files?.[0])}
                accept="model/gltf-binary,.glb,.gltf"
              />
              Add
            </label>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}