import styled from '@emotion/styled';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { debounceTime, Subject, tap } from 'rxjs';

interface Film {
  title: string;
  year: number;
}

export const SearchInput: React.FC = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [keyValue, setKeyValue] = useState<string>('');
  const [resultKey, setResultKey] = useState<string>('');

  const handleScroll = useCallback((e: any) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollTop + clientHeight === scrollHeight) {
      console.log('滚动到底部...');
    }
  }, []);
  const input$ = useMemo(() => new Subject<string>(), []);
  useEffect(() => {
    const task = input$
      .pipe(
        debounceTime(500),
        tap((v) => {
          console.log(v, '...123');
          if (!v) return false; // 或者重新刷新请求
          setKeyValue(v);
          return true;
        })
      )
      .subscribe();
    return () => task.unsubscribe();
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;// 点击范围
      if (!e.target) return;//body
      if (
        !(ref.current as unknown as HTMLDivElement)?.contains(
          e.target as HTMLElement
        )
      ) {
        setVisible(false);
      }
    };
    // 通过createPortal挂载节点需要通过body监听，winow无效
    document.body?.addEventListener("click", handler);
    return () => document.body?.removeEventListener("click", handler);
  }, []);

  const [options, setOptions] = useState<readonly Film[]>([]);

  useEffect(() => {
    let active = true;
    (async () => {
      await sleep(1e3); // For demo purposes.
      if (active) {
        setOptions([...topFilms]);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const formatOptions = useMemo(() => {
    return options.filter((o) => o.title.search(keyValue) !== -1);
  }, [options, keyValue]);
  return (
    <div className="relative" ref={ref}>
      <input
        className="w-full h-8 px-2 rounded-[8px] border-[1px] border-solid border-[#ececec] outline-none"
        defaultValue={1}
        onFocus={(e) => setVisible(true)}
        onBlur={() => {}}
        onChange={(e) => input$.next(e.target.value)}
      />
      {visible && (
        <Div
          className="absolute top-8 left-0 w-full rounded-[8px] p-1 overflow-y-scroll text-sm max-h-[6rem] bg-white"
          onScroll={(e) => handleScroll(e)}
        >
          {options.map((d) => (
            <div
              className="h-6 text-sm truncate"
              key={d.title}
              onClick={() => {
                console.log(d.title, 'result...');
                setResultKey(d.title);
                setVisible(false);
              }}
            >
              {d.title}
            </div>
          ))}
        </Div>
      )}
    </div>
  );
};

const Div = styled.div``;

const sleep = (delay = 0) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

// Top films as rated by IMDb users. http://www.imdb.com/chart/top
const topFilms = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
];
