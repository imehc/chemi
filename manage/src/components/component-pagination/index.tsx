import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';

export const Pagination: React.FC<Props> = ({
  total,
  current = 1,
  defaultPageSize = 10,
  pageSizeOptions = [],
  onChange,
  disabled = false,
  hideOnSinglePage = false,
  showQuickJumper = true,
  showTitle = false,
  position = 'end',
  shape = 'square',
  color = '#ffffff',
  activeColor = '#ffffff',
  textColor = '#222222',
  activeTextColor = '#728cec',
  borderColor = '#e3e3e3',
  activeBorderColor = '#728cec',
}) => {
  const [pageLimit, setPageLimit] = useState<number>(defaultPageSize);
  const pageTotal = useMemo<number>(() => {
    let int = Math.floor(total / pageLimit);
    let remainder = total % pageLimit === 0 ? 0 : 1;
    return int + remainder;
  }, [total, pageLimit]);
  const [pageCurrent, setPageCurrent] = useState<number>(() =>
    current > pageTotal ? pageTotal : current
  );
  // hover点击向后/前翻页
  const [isHover, setIsHover] = useState<{
    hover: boolean;
    who: 'left' | 'right';
    textColor: string;
  }>({ hover: false, who: 'left', textColor: '#bfbfbf' });

  useEffect(() => {
    if (disabled) return;
    onChange(pageCurrent);
  }, [disabled, pageCurrent]);

  const generatePageNumberNode = useCallback(
    (total: number, startIndex: number = 0) => {
      return Array.from({ length: total }, (_, i) => i + 1 + startIndex).map(
        (page) =>
          page === pageCurrent ? (
            <PageLiActive
              title={showTitle ? page.toString() : undefined}
              key={page}
              theme={{
                activeColor,
                activeTextColor,
                activeBorderColor,
              }}
              shape={shape}
              disabled={disabled}
            >
              {page}
            </PageLiActive>
          ) : (
            <PageLi
              title={showTitle ? page.toString() : undefined}
              key={page}
              theme={{
                color,
                textColor,
                borderColor,
                activeColor,
                activeTextColor,
                activeBorderColor,
              }}
              shape={shape}
              disabled={disabled}
              onClick={() => (disabled ? null : setPageCurrent(page))}
            >
              {page}
            </PageLi>
          )
      );
    },
    [
      pageCurrent,
      showTitle,
      activeColor,
      activeTextColor,
      activeBorderColor,
      shape,
      disabled,
      color,
      textColor,
      borderColor,
    ]
  );

  return (
    <React.Fragment>
      <Main position={position}>
        <PageUl disabled={disabled}>
          <React.Fragment>
            {((!hideOnSinglePage && pageTotal === 1) || pageTotal > 1) && (
              <PageLi
                title={showTitle ? '上一页' : undefined}
                theme={{
                  color,
                  textColor,
                  borderColor,
                  activeColor,
                  activeTextColor,
                  activeBorderColor,
                }}
                shape={shape}
                disabled={disabled || pageCurrent === 1}
                onClick={() => {
                  if (disabled) return;
                  if (pageCurrent === 1) return;
                  setPageCurrent(pageCurrent - 1);
                }}
              >
                ᐸ
              </PageLi>
            )}
            {pageTotal <= 10
              ? generatePageNumberNode(pageTotal)
              : pageTotal > 10 && (
                  <React.Fragment>
                    {pageCurrent > 2
                      ? generatePageNumberNode(1)
                      : generatePageNumberNode(2)}
                    {[1, 2, 3].includes(pageCurrent) ? null : pageCurrent ===
                      4 ? (
                      generatePageNumberNode(1, 1)
                    ) : (
                      <Ellipsis
                        key={-1}
                        disabled={disabled}
                        onMouseOver={() => {
                          if (isHover.hover && isHover.who === 'left') return;
                          setIsHover({
                            hover: true,
                            who: 'left',
                            textColor: activeColor,
                          });
                        }}
                        onMouseOut={() => {
                          if (!isHover.hover && isHover.who === 'left') return;
                          setIsHover({
                            hover: false,
                            who: 'left',
                            textColor: '#bfbfbf',
                          });
                        }}
                        textColor={
                          (isHover.who === 'left' && isHover.textColor) ||
                          undefined
                        }
                        activeTextColor={
                          activeTextColor !== '#ffffff'
                            ? activeTextColor
                            : undefined
                        }
                        title={showTitle ? '向前五页' : undefined}
                        onClick={() =>
                          pageCurrent - 5 < 1
                            ? setPageCurrent(1)
                            : setPageCurrent(pageCurrent - 5)
                        }
                      >
                        {/* {isHover ? '···' : '•••'} */}
                        {isHover.hover && isHover.who === 'left' ? 'ᐸᐸ' : '•••'}
                      </Ellipsis>
                    )}
                    {pageCurrent === pageTotal - 2 &&
                      generatePageNumberNode(1, pageTotal - 5)}
                    {pageCurrent > 2
                      ? generatePageNumberNode(
                          3,
                          pageCurrent < pageTotal - 1
                            ? pageCurrent - 2
                            : pageTotal - 5
                        )
                      : generatePageNumberNode(
                          3,
                          pageCurrent >= 3 ? pageCurrent - 1 : 2
                        )}
                    {pageCurrent === 3 && generatePageNumberNode(1, 4)}

                    {[pageTotal - 1, pageTotal - 2, pageTotal].includes(
                      pageCurrent
                    ) ? null : pageCurrent === pageTotal - 3 ? (
                      generatePageNumberNode(1, pageTotal - 2)
                    ) : (
                      <Ellipsis
                        key={-2}
                        disabled={disabled}
                        onMouseOver={() => {
                          if (isHover.hover && isHover.who === 'right') return;
                          setIsHover({
                            hover: true,
                            who: 'right',
                            textColor: activeColor,
                          });
                        }}
                        onMouseOut={() => {
                          if (!isHover.hover && isHover.who === 'right') return;
                          setIsHover({
                            hover: false,
                            who: 'right',
                            textColor: '#bfbfbf',
                          });
                        }}
                        textColor={
                          (isHover.who === 'right' && isHover.textColor) ||
                          undefined
                        }
                        activeTextColor={
                          activeTextColor !== '#ffffff'
                            ? activeTextColor
                            : undefined
                        }
                        title={showTitle ? '向后五页' : undefined}
                        onClick={() =>
                          pageCurrent + 5 > pageTotal
                            ? setPageCurrent(pageTotal)
                            : setPageCurrent(pageCurrent + 5)
                        }
                      >
                        {/* {isHover ? '···' : '•••'} */}
                        {isHover.hover && isHover.who === 'right'
                          ? 'ᐳᐳ'
                          : '•••'}
                      </Ellipsis>
                    )}
                    {pageCurrent <= pageTotal - 2
                      ? generatePageNumberNode(1, pageTotal - 1)
                      : generatePageNumberNode(2, pageTotal - 2)}
                  </React.Fragment>
                )}
            {((!hideOnSinglePage && pageTotal === 1) || pageTotal > 1) && (
              <PageLi
                title={showTitle ? '下一页' : undefined}
                theme={{
                  color,
                  textColor,
                  borderColor,
                  activeColor,
                  activeTextColor,
                  activeBorderColor,
                }}
                shape={shape}
                disabled={disabled || pageCurrent === pageTotal}
                onClick={() => {
                  if (disabled) return;
                  if (pageCurrent === pageTotal) return;
                  setPageCurrent(pageCurrent + 1);
                }}
              >
                ᐳ
              </PageLi>
            )}
          </React.Fragment>
        </PageUl>
        {pageSizeOptions.length > 1 && (
          <Select
            disabled={disabled}
            theme={{
              borderColor,
              textColor,
              color,
              activeBorderColor,
              activeTextColor,
              activeColor,
            }}
            title={showTitle ? `${pageLimit}条/页` : undefined}
            defaultValue={
              pageSizeOptions.includes(defaultPageSize)
                ? defaultPageSize
                : pageSizeOptions[0]
            }
            onChange={(element) => {
              setPageLimit(Number(element.target.value));
            }}
          >
            {pageSizeOptions.map((pageSize, index) => (
              <option key={index} value={pageSize}>
                {pageSize}条/页
              </option>
            ))}
          </Select>
        )}
        {showQuickJumper && (
          <JumpContainer disabled={disabled} theme={{ textColor }}>
            跳至
            <TextField
              disabled={disabled}
              theme={{
                borderColor,
                textColor,
                color,
                activeBorderColor,
                activeTextColor,
                activeColor,
              }}
              type="number"
              onKeyDown={(e) => {
                if (e.defaultPrevented) return;
                let handled: boolean = false;
                if (e.key === 'Enter') {
                  const page = parseInt(
                    Number((e.target as HTMLInputElement).value).toFixed(0)
                  );
                  setPageCurrent(
                    page > pageTotal ? pageTotal : page < 1 ? 1 : page
                  );
                  handled = true;
                  (e.target as HTMLInputElement).blur();
                }
                if (handled) e.preventDefault();
              }}
              onBlur={(e) => ((e.target as HTMLInputElement).value = '')}
            />
            页
          </JumpContainer>
        )}
      </Main>
    </React.Fragment>
  );
};

const Main = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${(props: { position?: Position }) =>
    props.position === 'start'
      ? 'flex-start'
      : props.position === 'center'
      ? 'center'
      : 'flex-end'};
`;

const PageUl = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: ${(props: { disabled?: boolean }) =>
    props?.disabled ? 'no-drop' : 'default' ?? 'default'};
`;

const PageLi = styled(PageUl)`
  font-size: 16px;
  width: 30px !important;
  height: 30px !important;
  border: 1px solid
    ${(props: PageLiProps) => {
      if (props.disabled) return '#b8b8b8';
      return props?.theme?.borderColor;
    }};
  background-color: ${(props: PageLiProps) => {
    if (props.disabled) return '#f5f5f5';
    return props?.theme?.color;
  }};
  border-radius: ${(props: PageLiProps) =>
    props?.shape === 'round' ? '50%' : '5px'};
  color: ${(props: PageLiProps) => {
    if (props.disabled) return '#b8b8b8';
    return props?.theme?.textColor;
  }};
  justify-content: center;
  box-sizing: border-box;
  margin: 0 5px;
  user-select: none;
  &:hover {
    border-color: ${(props: PageLiProps) => {
      if (props.disabled) return;
      return props.theme?.activeBorderColor;
    }};
    background-color: ${(props: PageLiProps) => {
      if (props.disabled) return;
      return props.theme?.activeColor;
    }};
    color: ${(props: PageLiProps) => {
      if (props.disabled) return;
      return props.theme?.activeTextColor;
    }};
  }
`;

const PageLiActive = styled(PageLi)`
  border-color: ${(props: PageLiProps) => {
    if (props.disabled) return;
    return props?.theme?.activeBorderColor;
  }};
  background-color: ${(props: PageLiProps) => {
    if (props.disabled) return;
    return props?.theme?.activeColor;
  }};
  border-radius: ${(props: PageLiProps) =>
    props?.shape === 'round' ? '50%' : '5px'};
  color: ${(props: PageLiProps) => {
    if (props.disabled) return;
    return props?.theme?.activeTextColor;
  }};
`;

const Ellipsis = styled(PageLi)`
  font-size: 12px;
  color: ${(props: { textColor?: string; activeTextColor?: string }) =>
    props?.textColor ?? '#bfbfbf'};
  border: none !important;
  background-color: transparent !important;
  cursor: ${(props: { disabled?: boolean }) =>
    props?.disabled ? 'no-drop' : 'default' ?? 'default'};
  /* pointer-events: none; */
  &:hover {
    color: ${(props: { textColor?: string; activeTextColor?: string }) =>
      props?.activeTextColor ?? '#bfbfbf'};
  }
`;

const Select = styled.select`
  min-width: 80px;
  max-width: 100px;
  height: 30px;
  font-size: 14px;
  border: 1px solid
    ${(props: PageLiProps) => {
      if (props.disabled) return '#b8b8b8';
      return props?.theme?.borderColor;
    }};
  background-color: ${(props: PageLiProps) => {
    if (props.disabled) return '#f5f5f5';
    return props?.theme?.color;
  }};
  color: ${(props: PageLiProps) => {
    if (props.disabled) return '#f5f5f5';
    return props?.theme?.textColor;
  }};
  cursor: ${(props: { disabled?: boolean }) =>
    props?.disabled ? 'no-drop' : 'default' ?? 'default'};
  border-radius: 5px;
  margin-left: 10px;
  margin-right: 10px;
  outline: none;
  padding: 2px;
  line-height: 26px;
  & :active,
  :hover {
    border-color: ${(props: PageLiProps) => {
      if (props.disabled) return;
      return props.theme?.activeBorderColor;
    }};
    background-color: ${(props: PageLiProps) => {
      if (props.disabled) return;
      return props.theme?.activeColor;
    }};
    color: ${(props: PageLiProps) => {
      if (props.disabled) return;
      return props.theme?.activeTextColor;
    }};
  }
`;
const JumpContainer = styled.div`
  font-size: 14px;
  color: ${(props: PageLiProps) => {
    if (props.disabled) return;
    return props?.theme?.textColor;
  }};
  cursor: ${(props: { disabled?: boolean }) =>
    props?.disabled ? 'no-drop' : 'default' ?? 'default'};
`;

const TextField = styled.input`
  min-width: 30px;
  max-width: 40px;
  height: 30px;
  border-radius: 5px;
  margin: 0 5px;
  outline: none;
  padding: 0 6px;
  border: 1px solid
    ${(props: PageLiProps) => {
      if (props.disabled) return '#b8b8b8';
      return props?.theme?.borderColor;
    }};
  background-color: ${(props: PageLiProps) => {
    if (props.disabled) return '#f5f5f5';
    return props?.theme?.color;
  }};
  color: ${(props: PageLiProps) => {
    if (props.disabled) return '#f5f5f5';
    return props?.theme?.textColor;
  }};
  cursor: ${(props: { disabled?: boolean }) =>
    props?.disabled ? 'no-drop' : 'default' ?? 'default'};
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &[type='number'] {
    -moz-appearance: textfield;
  }
  & :active,
  :hover,
  :focus {
    border-color: ${(props: PageLiProps) => {
      if (props.disabled) return;
      return props.theme?.activeBorderColor;
    }};
    background-color: ${(props: PageLiProps) => {
      if (props.disabled) return;
      return props.theme?.activeColor;
    }};
    color: ${(props: PageLiProps) => {
      if (props.disabled) return;
      return props.theme?.activeTextColor;
    }};
  }
`;

export default Pagination;
