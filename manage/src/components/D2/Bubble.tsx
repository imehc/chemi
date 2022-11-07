import React from 'react';

interface Props {
  text?: string;
}

export const Bubble: React.FC<Props> = ({ text = '20%' }): JSX.Element => {
  return (
    <svg
      width="50px"
      height="31px"
      viewBox="0 0 50 31"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>矩形</title>
      <defs>
        <linearGradient
          x1="1.34754714%"
          y1="38.8589991%"
          x2="100%"
          y2="61.5176749%"
          id="linearGradient-1"
        >
          <stop stop-color="#6F88FF" offset="0%"></stop>
          <stop stop-color="#4C4DE2" offset="100%"></stop>
        </linearGradient>
        <path
          d="M421,212.5 L443,212.5 C447.418278,212.5 451,216.081722 451,220.5 C451,224.918278 447.418278,228.5 443,228.5 L434.02002,228.5 L434.02002,228.5 L432,230.738159 L430,228.5 L421,228.5 C416.581722,228.5 413,224.918278 413,220.5 C413,216.081722 416.581722,212.5 421,212.5 Z"
          id="path-2"
        ></path>
        <filter
          x="-34.2%"
          y="-38.4%"
          width="168.4%"
          height="248.1%"
          filterUnits="objectBoundingBox"
          id="filter-3"
        >
          <feMorphology
            radius="1"
            operator="erode"
            in="SourceAlpha"
            result="shadowSpreadOuter1"
          ></feMorphology>
          <feOffset
            dx="0"
            dy="8"
            in="shadowSpreadOuter1"
            result="shadowOffsetOuter1"
          ></feOffset>
          <feGaussianBlur
            stdDeviation="4"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          ></feGaussianBlur>
          <feColorMatrix
            values="0 0 0 0 0.376470588   0 0 0 0 0.435294118   0 0 0 0 0.952941176  0 0 0 0.55821132 0"
            type="matrix"
            in="shadowBlurOuter1"
          ></feColorMatrix>
        </filter>
      </defs>
      <g
        id="页面"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g
          id="home--亮色模式-修改后备份"
          transform="translate(-407.000000, -212.000000)"
          fill-rule="nonzero"
        >
          <g id="矩形">
            <use
              fill="black"
              fill-opacity="1"
              filter="url(#filter-3)"
              xlinkHref="#path-2"
            ></use>
            <use fill="url(#linearGradient-1)" xlinkHref="#path-2"></use>
            <text
              x="432"
              y="222"
              fontFamily="PingFangSC-Semibold, PingFang SC"
              fontSize="12"
              fontWeight="500"
              fill="#ffffff"
            >
              <tspan
                width="32"
                height="16.5"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {text}
              </tspan>
            </text>
          </g>
        </g>
      </g>
    </svg>
  );
};
