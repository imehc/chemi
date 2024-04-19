import { createTheme, MantineProvider, Select } from '@mantine/core';
import { useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from '~/components';
import collect from './collect';

const theme = createTheme({
  /** Put your mantine theme override here */
});

// const idx = 35;
const idx = 41;

/**
 * @link https://sbcode.net/react-three-fiber/
 */
export const R3F: React.FC = () => {
  const [select, setSelect] = useState<
    Omit<(typeof collect)[number], 'component'>
  >(() => ({ label: collect.at(idx)!.label, value: collect.at(idx)!.value }));

  return (
    <div className="bg-black h-full w-full">
      <MantineProvider theme={theme}>
        <div className="fixed flex gap-2 items-center justify-start left-10 min-w-[15rem] top-10 w-1/5 z-10">
          <Select
            searchable
            onChange={(value) => {
              if (!value) return;
              const temp = collect.find((v) => v.value === value);
              if (!temp) return;
              setSelect({ value: temp.value, label: temp.label });
            }}
            value={select.value}
            data={collect.map((v) => ({ label: v.label, value: v.value }))}
          />
          <Link
            to="https://sbcode.net/react-three-fiber/"
            target="_blank"
            rel="noreferrer"
            className="whitespace-nowrap"
          >
            参考链接
          </Link>
        </div>
        <div className="h-full w-full">
          <Suspense fallback={<Loading />}>
            {collect.find((v) => v.value === select.value)!.component}
          </Suspense>
        </div>
      </MantineProvider>
    </div>
  );
};
