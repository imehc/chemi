import styled from '@emotion/styled';

interface Props<T> {
  options: ReadonlyArray<T>;
}

export const MultiInput = <T,>({ options }: Props<T>) => {
  return <Wrap className='text-lg font-bold'>MultiInput</Wrap>;
};

const Wrap = styled.div`
  color: #b4e6ad;
`;
