import { Autocomplete, createTheme, MantineProvider } from '@mantine/core';
import { useState } from 'react';
import { Demo01 } from './01';
import { Demo02 } from './02';
import { Demo03 } from './03';
import { Demo04 } from './04';
import { Demo05 } from './05';
import { Demo06 } from './06';
import { Demo07 } from './07';
import { Demo08 } from './08';
import { Demo09 } from './09';
import { Demo10 } from './10';
import { Demo11 } from './11';
import { Demo12 } from './12';
import { Demo13 } from './13';
import { Demo14 } from './14';
import { Demo15 } from './15';
import { Demo16 } from './16';
import { Demo17 } from './17';
import { Demo18 } from './18';
import { Demo19 } from './19';
import { Demo20 } from './20';
import { Demo21 } from './21';
import { Demo22 } from './22';
import { Demo23 } from './23';
const theme = createTheme({
  /** Put your mantine theme override here */
});

type Data = `Demo${
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23}`;

const data = [...new Array(23).fill(0)].map(
  (_, idx) => `Demo${(idx + 1).toString().padStart(2, '0')}`
) as Data[];

export const R3F: React.FC = () => {
  const [select, setSelect] = useState<Data>('Demo19');

  return (
    <MantineProvider theme={theme}>
      <div className="-translate-x-1/2 fixed left-1/2 min-w-[15rem] top-10 w-1/5 z-10">
        <Autocomplete
          placeholder="Pick value or enter anything"
          value={select}
          data={data}
          onChange={(v) => setSelect(v as Data)}
        />
      </div>
      <div className="h-full w-full">
        {select === 'Demo01' ? (
          <Demo01 />
        ) : select === 'Demo02' ? (
          <Demo02 />
        ) : select === 'Demo03' ? (
          <Demo03 />
        ) : select === 'Demo04' ? (
          <Demo04 />
        ) : select === 'Demo05' ? (
          <Demo05 />
        ) : select === 'Demo06' ? (
          <Demo06 />
        ) : select === 'Demo07' ? (
          <Demo07 />
        ) : select === 'Demo08' ? (
          <Demo08 />
        ) : select === 'Demo09' ? (
          <Demo09 />
        ) : select === 'Demo10' ? (
          <Demo10 />
        ) : select === 'Demo11' ? (
          <Demo11 />
        ) : select === 'Demo12' ? (
          <Demo12 />
        ) : select === 'Demo13' ? (
          <Demo13 />
        ) : select === 'Demo14' ? (
          <Demo14 />
        ) : select === 'Demo15' ? (
          <Demo15 />
        ) : select === 'Demo16' ? (
          <Demo16 />
        ) : select === 'Demo17' ? (
          <Demo17 />
        ) : select === 'Demo18' ? (
          <Demo18 />
        ) : select === 'Demo19' ? (
          <Demo19 />
        ) : select === 'Demo20' ? (
          <Demo20 />
        ) : select === 'Demo21' ? (
          <Demo21 />
        ) : select === 'Demo22' ? (
          <Demo22 />
        ) : select === 'Demo23' ? (
          <Demo23 />
        ) : null}
      </div>
    </MantineProvider>
  );
};
