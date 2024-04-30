import { FC, useMemo } from 'react';
import {
  presetsObj,
  PresetsType,
} from '@react-three/drei/helpers/environment-assets';
import { Button } from '~/shadcn/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/shadcn/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/shadcn/ui/select';
import { useConfigStore } from '~/store';

interface Props {
  onSelectSingleFile(file?: File): void;
  onSave(): void;
  onReset(): void;
  onModelClisk(url: string): void;
  onDownloadScenePicture(): void;
  onSceneBackgroundSelect(key: PresetsType): void;
}

export const LeftLayout: FC<Props> = ({
  onSelectSingleFile,
  onSave,
  onReset,
  onModelClisk,
  onDownloadScenePicture,
  onSceneBackgroundSelect,
}) => {
  const defaultModelPaths = useConfigStore((state) => state.defaultModelPaths);
  const presets = useMemo(() => Object.keys(presetsObj), []);

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
                src={item.path.picture}
                key={item.path.picture}
                className="rounded-sm cursor-pointer"
                onClick={() => onModelClisk(item.path.url)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      <Button className="mt-4 mr-2" onClick={onSave}>
        Save
      </Button>
      <Button className="mt-4 mr-2" onClick={onReset}>
        Reset
      </Button>
      <Button className="my-4" onClick={onDownloadScenePicture}>
        Download Scene Picture
      </Button>

      <Select
        defaultValue="park"
        onValueChange={(v) => onSceneBackgroundSelect(v as PresetsType)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Preset" />
        </SelectTrigger>
        <SelectContent>
          {presets.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
