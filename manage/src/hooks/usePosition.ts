import { useState, useCallback } from "react";

// 以逗号隔开的设置经度纬度，返回数组
export const usePosition = (defaultPosition?: [number, number]) => {
  const [position, setPosition] = useState<[number, number]>(() =>
    defaultPosition ? defaultPosition : [0, 0]
  );
  const setInitPosition = useCallback(
    (location: string, isGetCurrentPosition?: boolean) => {
      if (isGetCurrentPosition) {
        navigator?.geolocation.getCurrentPosition(
          ({ coords }) => {
            if (
              position[0] !== coords.longitude &&
              position[1] !== coords.latitude
            ) {
              handlePositionChange([coords.longitude, coords.latitude]);
            }
          },
          ({ message }) => {
            console.error(
              `Failed to get latitude and longitude, The reason is ${message}`
            );
          }
        );
        return;
      }
      const reg = /^-?\d+(\.\d+)?,\s?-?\d+(\.\d+)?$/;
      if (reg.test(location)) {
        // 判断经纬度是否在范围内
        const [longitude, latitude] = location.split(",");
        const lgt = Number(longitude);
        const lat = Number(latitude);
        if (lgt >= -180 && lgt <= 180 && lat >= -90 && lat <= 90) {
          handlePositionChange([lgt, lat]);
          return;
        }
        return console.error("Parameter out of range");
      } else {
        return console.error("Incorrect format");
      }
    },
    [position]
  );
  const handlePositionChange = useCallback(
    (pst: [number, number]) => {
      if (pst[0] !== position[0] || pst[1] !== position[1]) {
        setPosition(pst)
      }
    }
    , [position]);
  return { position, setInitPosition };
};
