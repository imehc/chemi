import { useMemo, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnHelper,
} from '@tanstack/react-table';
import styled from '@emotion/styled';

type StyleOption = {
  height?: string | number;
  header?: {
    height: string | number;
  };
  body?: {
    height: string | number;
  };
};
const defaultStyleOption = {
  header: {
    height: 40,
  },
  body: {
    height: 48,
  },
};

type TableProps<T = unknown> =
  | (TableOption<T> & {
      scroll?: false;
      styleOption?: StyleOption;
    })
  | (TableOption<T> & {
      scroll: true;
      styleOption: Required<Pick<StyleOption, 'height'>> &
        Omit<StyleOption, 'height'>;
    });

interface TableOption<T> {
  rows: T[];
  columns: (d: ColumnHelper<T>) => ColumnDef<T, any>[];
  sticky?: boolean;
}

/**
 * 未完成❎
 */
export const Table = <T,>({
  rows,
  columns,
  styleOption,
  ...attr
}: TableProps<T>): JSX.Element => {
  const columnHelper = useMemo(() => createColumnHelper<T>(), []);

  const [data, setData] = useState(() => [...rows]);

  const table = useReactTable({
    data,
    columns: columns(columnHelper),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <TableWrap {...attr} styleOption={styleOption}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {/* {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <ThWrap key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </ThWrap>
              ))}
            </tr>
          ))} */}
        </tfoot>
      </TableWrap>
    </div>
  );
};

type TableWrapProps = Pick<TableProps, 'scroll' | 'sticky' | 'styleOption'>;

const TableWrap = styled.table<TableWrapProps>`
  width: 100%;
  height: ${(props) => {
    if (!props.scroll) return 'auto';
    const height = props.styleOption?.height;
    return typeof height === 'number' ? height + 'px' : height;
  }};
  overflow-y: scroll;
  display: block;
  & > thead {
    display: table;
    table-layout: fixed;
    width: 100%;
    height: ${(props) => {
      const header =
        props.styleOption?.header?.height ?? defaultStyleOption.header.height;
      return typeof header === 'number' ? header + 'px' : header;
    }};
    position: ${(props) => (props.sticky ? 'sticky' : 'relative')};
    top: 0;
    // TODO:可配置项
    background-color: #ffffff; // 设置 border-radius 滚动 thead 会出现滚动项
    & > tr > th {
      background-color: #f4f6fc;
      &:first-of-type {
        background-color: #f4f6fc;
        border-radius: 8px 0 0 8px;
      }
      &:last-child {
        background-color: #f4f6fc;
        border-radius: 0 8px 8px 0;
      }
    }
  }
  & > tbody {
    display: block;
    > tr {
      display: table;
      width: 100%;
      table-layout: fixed;
      height: ${(props) => {
        const height =
          props.styleOption?.body?.height ?? defaultStyleOption.body.height;
        return typeof height === 'number' ? height + 'px' : height;
      }};
      // TODO:可配置项
      padding: 0 4px;
      &:hover {
        // TODO:可配置项
        background-color: #f4f6fc;
        border-radius: 8px;
      }
    }
  }
`;
