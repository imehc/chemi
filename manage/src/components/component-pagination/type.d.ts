type Position = 'start' | 'center' | 'end';

type Shape = 'round' | 'square';

declare interface Props {
  total: number;
  current?: number;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  disabled?: boolean;
  hideOnSinglePage?: boolean;
  showQuickJumper?: boolean;
  showTitle?: boolean;
  color?: string;
  activeColor?: string;
  textColor?: string;
  activeTextColor?: string;
  borderColor?: string;
  activeBorderColor?: string;
  // enum: 'start','center','end' default: 'end'
  position?: Position;
  shape?: Shape;
  onChange: (cur: number) => void;
}

declare interface PageLiProps {
  theme?: {
    color?: string;
    textColor?: string;
    activeColor?: string;
    activeTextColor?: string;
    borderColor?: string;
    activeBorderColor?: string;
  };
  shape?: Shape;
  disabled?: boolean;
}