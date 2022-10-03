import clsx from 'clsx';
import { EChartsOption } from 'echarts';
import EChartsReact from 'echarts-for-react';
// import echarts from 'echarts/types/dist/echarts';
import {
  forwardRef,
  HTMLAttributes,
  LegacyRef,
  useCallback,
  useImperativeHandle,
  ForwardRefRenderFunction,
  useMemo,
  useState,
} from 'react';
import styled from 'styled-components';
import { jsonMock } from './mock';

export interface PopupProps extends HTMLAttributes<HTMLDivElement> {
  pointId?: string;
  title?: string;
}
// 子组件方法
export interface PopupHandler {
  defaultSetting: () => void;
}

type Chose = {
  code: string;
  label: string;
  unit: string;
  checked: boolean;
};

const _Popup: ForwardRefRenderFunction<PopupHandler, PopupProps> = (
  props,
  ref
): JSX.Element => {
  const { pointId = '--', title = '--', ...rest } = props;
  console.log(pointId, title);

  const [eChartRef, setEChartRef] = useState<EChartsReact>();

  // tab列表
  const base = useMemo<Chose[]>(
    () => [
      { code: 'SO2', label: 'SO2', unit: 'μg/m3', checked: true },
      { code: 'NO2', label: 'NO2', unit: 'μg/m3', checked: false },
      { code: 'PM10', label: 'PM10', unit: 'μg/m3', checked: false },
      { code: 'CO', label: 'CO', unit: 'μg/m3', checked: false },
      { code: 'O38', label: 'O3-8', unit: 'μg/m3', checked: false },
      { code: 'PM25', label: 'PM2.5', unit: 'μg/m3', checked: false },
    ],
    []
  );
  const [choseList, setChoseList] = useState(base);
  // 默认选中的项
  const [curChosed, setCurChosed] = useState<string>('SO2'); // 当前选中因子编码
  const [curChosedLabel, setCurChosedLabel] = useState<string>('SO2'); // 当前选中因子名称
  const [curChosedUnit, setCurChosedUnit] = useState<string>('μg/m3'); // 当前选中因子单位
  const [echartObj, setEchartObj] = useState<EChartsOption>({}); // 图表对象
  const [dateTime, setDateTime] = useState<string>('--'); // 传的时间
  const [lineChartData, setLineChartData] = useState<
    { tstamp: string; factorValue: string }[]
  >([]); // 接口返回的图表数据
  const [upperValue, setUpperValue] = useState<string>(''); // 上限值
  const [isChartHaveData, setIsChartHaveData] = useState<boolean>(false); // false 图表无数据，反之亦然

  const choseType = useCallback((chose: Chose) => {
    // 清空上一次的图表
    setEchartObj({});
    setChoseList(
      choseList
        .map((e) => ({ ...e, checked: false }))
        .map((e) => ({ ...e, ...chose }))
    );
    loadEcharts();
  }, []);
  const loadEcharts = useCallback(() => {
    setDateTime('');
    setIsChartHaveData(false);
    // 调用具体的方法 或请求
    if (!jsonMock.data) return setIsChartHaveData(false);
    setDateTime(jsonMock.data.tstamp);
    setUpperValue(jsonMock.data.upperValue);
    if (!jsonMock.data.data || !jsonMock.data.data.length) {
      return setIsChartHaveData(false);
    }
    setIsChartHaveData(true);
    setLineChartData(jsonMock.data.data);
    drawChart();
  }, []);

  const drawChart = useCallback(() => {
    let xData: string[] = []; // 横坐标数据
    let yData: string[] = []; // 纵坐标数据
    let limitData: string[] = []; // 限值数据

    lineChartData.map((l) => {
      xData = [...xData, l.tstamp];
      yData = [...yData, l.factorValue];
      limitData = [...limitData, upperValue];
    });

    let seriesData: any = [
      {
        name: curChosedLabel,
        type: 'line',
        smooth: true,
        stack: '总量',
        data: yData,
        areaStyle: {
          normal: {
            lineStyle: {
              width: 3, // 折线宽度
              color: 'rgba(252,254,0,1)',
            },
          },
        },
      },
    ];
    if (!!upperValue) {
      seriesData = [
        ...seriesData,
        {
          name: '标准限值',
          type: 'line',
          showSymbol: false,
          data: limitData,
          lineStyle: {
            normal: {
              width: 1,
              color: '#e74143', // 设置安全基线颜色
              type: 'dashed',
            },
          },
        } as any,
      ];
    }

    const options: EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      grid: {
        top: '6%',
        left: '6%',
        right: '6%',
        bottom: '3%',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xData,
        axisLine: {
          show: true,
          lineStyle: {
            color: 'white',
            width: 1,
            type: 'solid',
          },
        },
        axisLabel: {
          show: true,
          textBorderColor: 'white',
          formatter: (params) => {
            let newParamsName = ''; // 最终拼接成的字符串
            const paramsNameNumber = params.length; // 实际标签的个数
            const provideNumber = 10; // 每行能显示的字的个数
            const rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
            /**
             * 判断标签的个数是否大于规定的个数，如果大于，则进行换行处理，反之亦然
             */
            // 条件等同于rowNumber > 1
            if (paramsNameNumber > provideNumber) {
              /** 循环一行，p表示行 */
              for (let p = 0; p < rowNumber; p++) {
                let tempStr = ''; // 表示每一次截取的字符串
                const start = p * provideNumber; // 开始截取的位置
                const end = start + provideNumber; // 结束截取的位置
                // 此处特殊处理最后一行的索引值
                if (p === rowNumber - 1) {
                  // 最后一次不换行
                  tempStr = params.substring(start, paramsNameNumber);
                } else {
                  // 每一次都拼接字符串并换行
                  tempStr = `${params.substring(start, end)}\n`;
                }
                newParamsName += tempStr; // 最终拼成的字符串
              }
            } else {
              // 将旧标签的值赋给新标签
              newParamsName = params;
            }
            // 将最终的字符串返回
            return newParamsName;
          },
        },
      },
      yAxis: {
        type: 'value',
        // axisTick: false,
        axisLabel: {
          show: true,
          textBorderColor: 'white',
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#777'],
            opacity: 0.3,
            width: 1,
            type: 'solid',
          },
        },
        axisLine: {
          // y轴线的颜色以及宽度
          show: false,
          lineStyle: {
            color: '#9dcbfb',
            width: 1,
            type: 'solid',
          },
        },
      },
      itemStyle: {
        // 面积图颜色设置
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(252, 254, 0, 1)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(252, 254, 0, 0.1)', // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        },
      },
      series: seriesData,
    };
    setEchartObj(options);
  }, []);

  const clearEcharts = useCallback(() => {
    if (!eChartRef) return;
    // echarts.init(eChartRef.ele).dispose(); // 组件销毁时清除定时器
  }, []);
  // 弹框打开就会调用
  const defaultSetting = useCallback((): void => {
    console.log('defaultSetting...');
    // 恢复默认设置
    setChoseList(
      choseList
        .map((e) => ({ ...e, checked: false }))
        .map((e) => {
          if (e.code === 'SO2') {
            setCurChosed('SO2');
            setCurChosedLabel('SO2');
            setCurChosedUnit('μg/m3');
            return {
              ...e,
              checked: true,
            };
          }
          return e;
        })
    );

    loadEcharts();
  }, []);

  useImperativeHandle(ref, () => ({
    defaultSetting,
  }));
  // return <div {...rest}>我是弹框</div>;
  return (
    <div style={{ width: '532px' }}>
      <Header>
        <Title>{title}</Title>
        <DateTime>{dateTime}</DateTime>
      </Header>
      <div>
        {choseList.map((c, i) => (
          <Tab
            key={i}
            className={clsx({
              'bg-[#00a2ff]': c.checked,
              'rounded-[7px]': c.checked,
            })}
          >
            {c.label}
          </Tab>
        ))}
      </div>
      <FactorUnitText>单位：{curChosedUnit}</FactorUnitText>
      {isChartHaveData ? (
        <div
          style={{
            width: '445px',
            height: '170px',
          }}
        >
          <EChartsReact
            ref={(e) => {
              if (!e) return;
              setEChartRef(e);
            }}
            option={echartObj}
            style={{ width: '445px', height: '170px' }}
          />
        </div>
      ) : (
        <div
          style={{
            width: '445px',
            height: '170px',
            color: '#909399',
            textAlign: 'center',
            lineHeight: '170px',
          }}
        >
          暂无数据
        </div>
      )}
    </div>
  );
};

export const Popup = forwardRef(_Popup);

const Header = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

const Title = styled.div`
  display: inline-block;
  color: #19ffff;
  font-weight: 700;
  font-size: 18px;
`;

const DateTime = styled.div`
  color: #00de00;
  transform: skew(-20deg);
  font-size: 21px;
  padding-left: 10px;
  padding-right: 10px;
  position: absolute;
  right: 75px;
  top: 0;
`;

const Tab = styled.div`
  display: inline-block;
  width: 60px;
  height: 40px;
  background-color: transparent;
  cursor: pointer;
  text-align: center;
  line-height: 40px;
`;

const FactorUnitText = styled.div`
  color: white;
  width: 100px;
  padding: 5px 0px 0px 10px;
`;
