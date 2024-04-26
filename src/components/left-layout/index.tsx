import { FC } from 'react';
import { Button } from '~/shadcn/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/shadcn/ui/card';
import { useConfigStore } from '~/store';

interface Props {
  onSelectSingleFile(file?: File): void;
  onSave(): void;
  onModelClisk(url: string): void;
  onDownloadScenePicture(): void;
}

export const LeftLayout: FC<Props> = ({
  onSelectSingleFile,
  onSave,
  onModelClisk,
  onDownloadScenePicture,
}) => {
  const defaultModelPaths = useConfigStore((state) => state.defaultModelPaths);

  console.log(defaultModelPaths);

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
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Remote modal</CardTitle>
          <CardDescription> Add a remote model</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 w-full">
            {defaultModelPaths.map((item) => (
              <img
                src={item.picture}
                key={item.picture}
                className="rounded-sm"
                onClick={() => onModelClisk(item.url)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      <Button className="mt-4 mr-2" onClick={onSave}>
        Save
      </Button>
      <Button className="mt-4" onClick={onDownloadScenePicture}>
        Download Scene Picture
      </Button>
    </div>
  );
};
