import { useMemo, useRef, useState, type PropsWithChildren } from "react";
import { useClickAway } from "ahooks";
import loadingIcon from "./assets/loading.svg";
import errorIcon from "./assets/error.svg";

interface Props {
  play?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  onPlayClick?(): void;
  onPauseClick?(): void;
  onControlRightClick?(): void;
  onControlBottomClick?(): void;
  onControlLeftClick?(): void;
  onControlTopClick?(): void;
  onFullClick?(): void;
}

export const Control: React.FC<PropsWithChildren<Props>> = ({
  children,
  play = false,
  isLoading = false,
  isError = false,
  onPlayClick,
  onPauseClick,
  onControlRightClick,
  onControlBottomClick,
  onControlLeftClick,
  onControlTopClick,
  onFullClick,
}) => {
  const controlRef = useRef<HTMLDivElement>(null);
  const controlBtnRef = useRef<SVGSVGElement>(null);

  const [visible, setVisible] = useState<boolean>(false);
  const [controlVisible, setControlVisible] = useState<boolean>(false);

  const checkPending = useMemo(
    () => isError || isLoading,
    [isError, isLoading]
  );

  useClickAway(() => setControlVisible(false), [controlRef, controlBtnRef]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="w-full h-full pointer-events-none">{children}</div>
      <div
        className="absolute left-0 top-0 w-full h-full flex justify-start items-end"
        onMouseEnter={() => play && setVisible(true)}
        onMouseLeave={() => play && setVisible(false)}
        style={{ pointerEvents: checkPending ? "none" : "auto" }}
      >
        {(visible || !play) && (
          <div className="h-10 w-full bg-[rgba(0,0,0,.7)] px-3 flex justify-between items-center">
            {play ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                className="cursor-pointer"
                onClick={onPauseClick}
              >
                <path
                  fill="#fff"
                  d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM7 6h2v8H7V6zm4 0h2v8h-2V6z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                className="cursor-pointer"
                onClick={onPlayClick}
              >
                <path
                  fill="#fff"
                  d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM7 6l8 4l-8 4V6z"
                />
              </svg>
            )}
            <div className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="cursor-pointer"
                onClick={() => setControlVisible((state) => !state)}
                ref={controlBtnRef}
              >
                <path
                  fill="#fff"
                  d="M9 12c0-.81.3-1.5.89-2.11C10.5 9.3 11.19 9 12 9c.81 0 1.5.3 2.11.89c.59.61.89 1.3.89 2.11c0 .81-.3 1.5-.89 2.11c-.61.59-1.3.89-2.11.89c-.81 0-1.5-.3-2.11-.89C9.3 13.5 9 12.81 9 12M5.53 8.44l1.78 1.78L5.53 12l1.78 1.78l-1.78 1.78L2 12l3.53-3.56m2.91 10.03l1.78-1.78L12 18.47l1.78-1.78l1.78 1.78L12 22l-3.56-3.53m10.03-2.91l-1.78-1.78L18.47 12l-1.78-1.78l1.78-1.78L22 12l-3.53 3.56M15.56 5.53l-1.78 1.78L12 5.53l-1.78 1.78l-1.78-1.78L12 2l3.56 3.53Z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="cursor-pointer"
                onClick={onFullClick}
              >
                <path
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 9V6a2 2 0 0 1 2-2h3m11 11v3a2 2 0 0 1-2 2h-3m0-16h3a2 2 0 0 1 2 2v3M9 20H6a2 2 0 0 1-2-2v-3"
                />
              </svg>
            </div>
          </div>
        )}
        {!checkPending && controlVisible && (
          <div
            className="absolute bottom-20 right-16 w-24 h-24 rounded-full overflow-hidden"
            ref={controlRef}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
            >
              <g transform="rotate(45 50 50)">
                {pieConfig.map((v) => (
                  <path
                    key={v.keyBoard}
                    d={v.d}
                    stroke={v.stroke}
                    strokeWidth="2"
                    fill={v.fill}
                    className="cursor-pointer"
                    onMouseDown={({ currentTarget }) => {
                      currentTarget.style.stroke = v.fill;
                      switch (v.keyBoard) {
                        case "right":
                          onControlRightClick?.();
                          break;
                        case "bottom":
                          onControlBottomClick?.();
                          break;
                        case "left":
                          onControlLeftClick?.();
                          break;
                        case "top":
                          onControlTopClick?.();
                          break;
                        default:
                          break;
                      }
                    }}
                    onMouseUp={({ currentTarget }) => {
                      currentTarget.style.stroke = v.stroke;
                    }}
                  />
                ))}
                {arrowConfig.map((v) => (
                  <path
                    key={v.keyBoard}
                    d={v.d}
                    fill={v.fill}
                    className={v.className}
                  />
                ))}
                <circle
                  cx="50"
                  cy="50"
                  r="11"
                  fill="rgba(0,0,0,.1)"
                  className="cursor-move"
                  onMouseDown={() => {
                    // TODO:
                  }}
                  onMouseMove={() => {
                    // TODO:
                  }}
                  onMouseUp={() => {
                    // TODO:
                  }}
                />
                <g
                  transform="translate(46 0) scale(-1 1) rotate(-45 50 50)"
                  className="cursor-move"
                >
                  <path
                    fill="rgba(204, 204, 204,.7)"
                    d="M9 20q-.825 0-1.413-.588T7 18q0-.825.588-1.413T9 16q.825 0 1.413.588T11 18q0 .825-.588 1.413T9 20Zm6 0q-.825 0-1.413-.588T13 18q0-.825.588-1.413T15 16q.825 0 1.413.588T17 18q0 .825-.588 1.413T15 20Zm-6-6q-.825 0-1.413-.588T7 12q0-.825.588-1.413T9 10q.825 0 1.413.588T11 12q0 .825-.588 1.413T9 14Zm6 0q-.825 0-1.413-.588T13 12q0-.825.588-1.413T15 10q.825 0 1.413.588T17 12q0 .825-.588 1.413T15 14ZM9 8q-.825 0-1.413-.588T7 6q0-.825.588-1.413T9 4q.825 0 1.413.588T11 6q0 .825-.588 1.413T9 8Zm6 0q-.825 0-1.413-.588T13 6q0-.825.588-1.413T15 4q.825 0 1.413.588T17 6q0 .825-.588 1.413T15 8Z"
                  />
                </g>
              </g>
            </svg>
          </div>
        )}
      </div>
      {checkPending && (
        <div className="absolute left-0 top-0 w-full h-full bg-[rgba(255,255,255,.3)] flex justify-center items-center z-10 pointer-events-none">
          {isLoading ? (
            <img src={loadingIcon} alt="" className="w-10 h-10" />
          ) : (
            <img src={errorIcon} alt="" className="w-10 h-10" />
          )}
        </div>
      )}
    </div>
  );
};

const pieConfig = [
  {
    keyBoard: "right",
    d: "M50 5 A45 45 0 0 1 95 50 L50 50 Z",
    fill: "rgba(204, 204, 204,.7)",
    stroke: "rgba(0, 0, 0,.1)",
  },
  {
    keyBoard: "bottom",
    d: "M50 95 A45 45 0 0 0 95 50 L50 50 Z",
    fill: "rgba(204, 204, 204,.7)",
    stroke: "rgba(0, 0, 0,.1)",
  },
  {
    keyBoard: "left",
    d: "M5 50 A45 45 0 0 0 50 95 L50 50 Z",
    fill: "rgba(204, 204, 204,.7)",
    stroke: "rgba(0, 0, 0,.1)",
  },
  {
    keyBoard: "top",
    d: "M5 50 A45 45 0 0 1 50 5 L50 50 Z",
    fill: "rgba(204, 204, 204,.7)",
    stroke: "rgba(0, 0, 0,.1)",
  },
] as const;

const arrowConfig = [
  {
    keyBoard: "right",
    d: "M85 40 L60 40 L60 15",
    fill: "rgba(34, 34, 34,.5)",
    className: "pointer-events-none",
  },
  {
    keyBoard: "bottom",
    d: "M85 60 L60 60 L60 85",
    fill: "rgba(34, 34, 34,.5)",
    className: "pointer-events-none",
  },
  {
    keyBoard: "left",
    d: "M15 60 L40 60 L40 85",
    fill: "rgba(34, 34, 34,.5)",
    className: "pointer-events-none",
  },
  {
    keyBoard: "top",
    d: "M15 40 L40 40 L40 15",
    fill: "rgba(34, 34, 34,.5)",
    className: "pointer-events-none",
  },
] as const;
