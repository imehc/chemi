import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import {
  ColumnDef,
  ColumnOrderState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { makeData, Person } from '~/mocks';
import { faker } from '@faker-js/faker';

const columnHelper = createColumnHelper<Person>();

const defaultColumns2: ColumnDef<Person, any>[] = [
  columnHelper.accessor('firstName', {
    cell: (info) => {
      console.log(info, 'info');
      return info.getValue();
    },
    enablePinning: true,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: 'lastName',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
  }),
  columnHelper.accessor('age', {
    header: () => 'Age',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('visits', {
    header: () => <span>Visits</span>,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
  }),
  columnHelper.accessor('progress', {
    header: 'Profile Progress',
  }),
];

const defaultColumns: ColumnDef<Person>[] = [
  {
    header: 'Name',
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: 'firstName',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
    ],
  },
  {
    header: 'Info',
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: 'age',
        header: () => 'Age',
        footer: (props) => props.column.id,
      },
      {
        header: 'More Info',
        columns: [
          {
            accessorKey: 'visits',
            header: () => <span>Visits</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'status',
            header: 'Status',
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'progress',
            header: 'Profile Progress',
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
  },
];

export function Table1() {
  const [data, setData] = React.useState(() => makeData(5000));
  const [columns] = React.useState(() => [...defaultColumns2]);

  const [columnPinning, setColumnPinning] = React.useState({});

  const rerender = () => setData(() => makeData(5000));

  const table = useReactTable({
    data,
    columns,
    state: {
      columnPinning,
    },
    onColumnPinningChange: setColumnPinning,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    // enablePinning: false,
  });

  const randomizeColumns = () => {
    table.setColumnOrder(
      faker.helpers.shuffle(table.getAllLeafColumns().map((d) => d.id))
    );
  };

  return (
    <div className="p-2">
      <div className="inline-block border border-black shadow rounded">
        <div className="px-1 border-b border-black">
          <label>
            <input
              {...{
                type: 'checkbox',
                checked: table.getIsAllColumnsVisible(),
                onChange: table.getToggleAllColumnsVisibilityHandler(),
              }}
            />
            Toggle All
          </label>
        </div>
        {table.getAllLeafColumns().map((column) => {
          return (
            <div key={column.id} className="px-1">
              <label>
                <input
                  {...{
                    type: 'checkbox',
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                />
                {column.id}
              </label>
            </div>
          );
        })}
      </div>
      <div className="h-4" />
      <div className="flex flex-wrap gap-2">
        <button onClick={() => rerender()} className="border p-1">
          Regenerate
        </button>
        <button onClick={() => randomizeColumns()} className="border p-1">
          Shuffle Columns
        </button>
      </div>
      <div className="h-4" />
      <div className={`flex`}>
        <table className="border-2 border-black w-[300px]">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    <div className="whitespace-nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </div>
                    {!header.isPlaceholder && header.column.getCanPin() && (
                      <div className="flex gap-1 justify-center">
                        {header.column.getIsPinned() !== 'left' ? (
                          <button
                            className="border rounded px-2"
                            onClick={() => {
                              header.column.pin('left');
                            }}
                          >
                            {'<='}
                          </button>
                        ) : null}
                        {header.column.getIsPinned() ? (
                          <button
                            className="border rounded px-2"
                            onClick={() => {
                              header.column.pin(false);
                            }}
                          >
                            X
                          </button>
                        ) : null}
                        {header.column.getIsPinned() !== 'right' ? (
                          <button
                            className="border rounded px-2"
                            onClick={() => {
                              header.column.pin('right');
                            }}
                          >
                            {'=>'}
                          </button>
                        ) : null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 20)
              .map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <pre>{JSON.stringify(table.getState().columnPinning, null, 2)}</pre>
    </div>
  );
}
