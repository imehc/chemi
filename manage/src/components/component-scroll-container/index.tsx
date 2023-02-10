import styled from '@emotion/styled';
import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 滚动到页面底部回调
   */
  onScrollBottom?: () => void;
  /**
   * @deprecated
   * 快要接近底部触发
   */
  nearBottom?: boolean;
}

interface StateProps {}

/**
 * 滚动到底部触发，滚动条已隐藏，需要自己修改
 */
export class ScrollContainer extends React.Component<Props, StateProps> {
  static defaultProps: Props = {
    nearBottom: false,
  };

  scrollableRef: React.RefObject<HTMLDivElement>;
  constructor(props: Props) {
    super(props);
    this.scrollableRef = React.createRef();
  }

  handleScroll = () => {
    const clientHeight = this.scrollableRef.current?.clientHeight ?? 0;
    const scrollTop = this.scrollableRef.current?.scrollTop ?? 0;
    const scrollHeight = this.scrollableRef.current?.scrollHeight ?? 0;
    const distance = this.props?.nearBottom ? scrollTop * 0.2 : 0;
    console.log(scrollTop);
    if (clientHeight + scrollTop === scrollHeight - distance) {
      this.props?.onScrollBottom?.();
    }
  };

  render(): React.ReactNode {
    return (
      <WrapScrollbar
        ref={this.scrollableRef}
        onScroll={this.handleScroll}
        style={{ overflowY: 'scroll' }}
        {...this.props}
      >
        {this.props.children}
      </WrapScrollbar>
    );
  }
}

const WrapScrollbar = styled.div`
  overflow: -moz-hidden-unscrollable;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  /* width: calc(100vw + 18px); */
  overflow: auto;
`;

const Div = styled.div`
  background: radial-gradient(circle at bottom right, #630063, #dfb0df 60%);
`;
