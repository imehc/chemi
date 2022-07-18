import styled from '@emotion/styled';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useStatic } from '../../hooks';
import { CustomDialog } from '../component-dialog';

interface Props {
  callback: (result: boolean) => void;
  visible: boolean;
}

const CustomDeleteDialog: React.FC<Props> = ({ callback, visible }) => {
  const [visib, setVisib] = useState<boolean>(() => visible);
  const [result, setResult] = useState<boolean | undefined>(undefined);
  const callbackRef = useStatic(callback);
  useEffect(() => {
    setVisib(visible);
    if (result === undefined) return;
    callbackRef.current(result);
    return () => setResult(undefined);
  }, [callbackRef, result, visible]);
  return (
    <CustomDialog visible={visib} onClose={() => setResult(false)}>
      <div className="w-[250px] h-[300px] bg-white rounded-[8px] overflow-hidden shadow-2xl p-[20px] flex flex-col justify-evenly items-center">
        <div className="flex flex-col justify-around items-center">
          <div className="relative w-[60px] h-[60px]">
            <ViceIcon className="absolute w-[60px] h-[60px] rounded-[18px] rotate-[17deg] translate-x-[10px] translate-y-[-15px]"></ViceIcon>
            <Icon className="absolute w-[60px] h-[60px] rounded-[18px] top-0 left-0 box-border border-[1px] border-solid border-[rgba(255,255,255,.7)] flex justify-center items-center">
              {/* <img src={} alt="" className="w-7" /> */}
            </Icon>
          </div>
          <div className="text-[#040F1F] mt-[10px] font-bold">确定删除?</div>
        </div>
        <Btn
          className="w-[60%] h-8 whitespace-nowrap"
          onClick={() => setResult(true)}
        >
          确定
        </Btn>
        <Btnn
          className="w-[60%] h-8 border-[1px] border-solid whitespace-nowrap"
          onClick={() => setResult(false)}
        >
          取消
        </Btnn>
      </div>
    </CustomDialog>
  );
};
const Icon = styled.div`
  background-color: rgba(255, 212, 213, 0.8);
  background: linear-gradient(
    to right top,
    rgba(255, 107, 107, 0.28),
    rgba(255, 135, 135, 1)
  );
`;
const ViceIcon = styled.div`
  background: linear-gradient(
    to right bottom,
    #ff9898,
    #f98484,
    #ff7272,
    #ff8787
  );
`;

const Btn = styled.button`
  border-radius: 8px;
  color: #ffffff;
  background: linear-gradient(to right bottom, #6f88ff, #4c4de2);
`;

const Btnn = styled.button`
  border-radius: 8px;
  color: #9a9fa5;
  border-color: #dcdeea;
`;

interface CustomDeleteDialogContextOptions {
  showDelDialog: () => Promise<boolean>;
}
type StateProps = {
  visible: boolean;
  result: boolean | undefined;
};

let result: boolean | undefined = undefined;
let timer: ReturnType<typeof setInterval>;

const CustomDeleteDialogContext =
  createContext<CustomDeleteDialogContextOptions>({} as any);
export const CustomDeleteDialogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const initState = useMemo<StateProps>(() => {
    return {
      visible: false,
      result: undefined,
    };
  }, []);
  const [state, setState] = useState<StateProps>(initState);
  useEffect(() => {
    if (state.result === undefined) return;
    result = state.result;
    return () => setState(initState);
  }, [state, initState]);

  return (
    <CustomDeleteDialogContext.Provider
      value={{
        showDelDialog: async () => {
          setState({ ...state, visible: true });
          return await new Promise<boolean>((resolve) => {
            if (timer) clearInterval(timer);
            timer = setInterval(() => {
              if (result !== undefined) {
                resolve(result);
                result = undefined;
                clearInterval(timer);
              }
            }, 100);
          });
        },
      }}
    >
      <CustomDeleteDialog
        visible={state.visible}
        callback={(res) => setState({ result: res, visible: false })}
      />
      {children}
    </CustomDeleteDialogContext.Provider>
  );
};
export const useShowlDialog = () => {
  const { showDelDialog } = useContext(CustomDeleteDialogContext);
  return showDelDialog;
};
