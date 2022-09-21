// API
// columns为表格定义数据格式,title字段为表格标题,dataIndex为传入的数据源中需要显示的字段一致,可以通过render函数来渲染当前列的数据 -> Array// dataSource为数据源 -> Array
// rowSelection列表项是否可选 -> Object | null
// pagination为分页器 -> Object | false
// onRowClick为单行点击事件
// 放弃。。。

import styled from '@emotion/styled';
import { useCallback, useState } from 'react';

type RecordType = any;

interface Props<RecordType> {
  /** 表头名称 */
  columns: {
    title: string;
    detaIndex: string;
    render?: (item: RecordType, index: number) => React.ReactNode;
  }[];
  /** 数据列表 */
  dataSource: RecordType[];
  onRowClick?: (item: RecordType, index: number) => void;
}

export const Table: React.FC<Props<RecordType>> = ({
  columns,
  dataSource,
  onRowClick,
}) => {
  console.log(columns, 'columns...');

  const generateRows = useCallback(
    (data: RecordType, index: number, length: number) => {

      return (
        dataSource
      )
    },
    []
  );
  return (
    <table className="w-full border-spacing-0 bg-white">
      <thead>
        <tr>
          {columns.map((c) => {
            return <Th key={c.detaIndex}>{c.title}</Th>;
          })}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((d, i) => {
          return (
            <Tr key={i} onClick={() => onRowClick && onRowClick(d, i)}>
              {generateRows(d, i, dataSource.length)}
            </Tr>
          );
        })}
        {/* <Tr>
          <Td>01</Td>
          <Td>02</Td>
        </Tr> */}
      </tbody>
      <tfoot>
        <Tr>
          <Td colSpan={3}>1</Td>
        </Tr>
      </tfoot>
    </table>
  );
};

const Th = styled.td`
  /* border: 1px solid #000000; */
  background-color: #a3b8f9;
  text-align: center;
  height: 2.5rem;
  line-height: 2.5rem;
  &:first-of-type {
    border-radius: 0.5rem 0 0 0.5rem;
  }
  &:last-of-type {
    border-radius: 0 0.5rem 0.5rem 0;
  }
`;

const Tr = styled.tr`
  height: 3.625rem;
  /* border: 0.125px solid #000000; */
  &:hover > td {
    background: #f4f6fb;
    &:first-of-type {
      border-radius: 0.5rem 0 0 0.5rem;
    }
    &:last-of-type {
      border-radius: 0 0.5rem 0.5rem 0;
    }
  }
`;

const Td = styled.td`
  text-align: center;
`;
