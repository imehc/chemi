import styled from "@emotion/styled";
import clsx from "clsx";
import React, {
  ButtonHTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  startIcon?: React.ReactNode;
  children: React.ReactNode;
  size?: "default" | "small";
  theme?: "primary" | "default" | "contained";
  color?: string | "delete";
}

type StyledButtonType = Required<Pick<Props, "size" | "theme">> &
  Pick<Props, "color">;

export const Button: React.FC<Props> = ({
  startIcon,
  children,
  size = "default",
  theme = "default",
  color,
  ...props
}): JSX.Element => {
  const ref = useRef(null);

  const btnId = useMemo(() => "custom-btn", []);
  const maskId = useMemo(() => "custom-btn-mask", []);

  const searchElement = useCallback(
    (e: MouseEvent): { left: number; top: number } => {
      const attr = (e.target as Element).getAttribute("id");
      if (attr && attr === btnId) {
        return {
          left: e.offsetX,
          top: e.offsetY,
        };
      }
      return {
        left: e.offsetX + (e.target as HTMLElement).offsetLeft,
        top: e.offsetY + (e.target as HTMLElement).offsetTop,
      };
    },
    [btnId]
  );

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    let timer: ReturnType<typeof setTimeout>;

    const generateRipples = (e: MouseEvent): void => {
      const { left, top } = searchElement(e);
      let ripples = document.createElement("div");
      ripples.setAttribute("id", maskId);
      ripples.style.left = left + "px";
      ripples.style.top = top + "px";
      dom.appendChild(ripples);
      timer = setTimeout(() => {
        dom.removeChild(ripples);
      }, 500);
    };
    const dom: HTMLButtonElement = ref.current;
    dom.addEventListener("click", generateRipples);

    return () => {
      dom.removeEventListener("click", generateRipples);
      timer && clearTimeout(timer);
    };
  }, [maskId, ref, searchElement]);

  const style = useMemo(() => {
    return `
      #${maskId} {
        position: absolute;
        background: #fff;
        transform: translate(-50%, -50%);
        pointer-events: none;
        border-radius: 50%;
        animation: animate .5s linear infinite;
      }
    `;
  }, [maskId]);

  return (
    <StyledButton
      className="w-full relative flex justify-center items-center px-2 py-1 font-medium rounded-lg box-border overflow-hidden"
      id={btnId}
      ref={ref}
      theme={theme}
      size={size}
      color={color}
      {...props}
    >
      <style>{style}</style>
      {startIcon && <span className="shrink-0">{startIcon}</span>}
      <span
        className={clsx(
          "shrink overflow-hidden whitespace-nowrap text-ellipsis",
          { "ml-2": !!startIcon }
        )}
      >
        {children}
      </span>
    </StyledButton>
  );
};

const StyledButton = styled.button`
  height: ${(props: StyledButtonType) => {
    if (props.size === "default") {
      return "2.5rem";
    }
    return "1.75rem";
  }};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props: StyledButtonType) => {
    if (props.theme === "default" || props.theme === "contained") {
      return "0.0625rem solid #DCDEEA";
    }
    return "none";
  }};
  color: ${(props: StyledButtonType) => {
    switch (props.theme) {
      case "default":
      case "contained":
        return "#9A9FA5";
      default:
        return "#ffffff;";
    }
  }};
  font-weight: 400;
  outline: none;
  user-select: none;
  overflow: hidden;
  background: ${(props: StyledButtonType) => {
    let bg = "linear-gradient(to bottom right, #ffa16f,#fb7a35)";
    if (props?.color) {
      bg = props.color === "delete" ? "#FF5F5F" : props.color;
    }
    switch (props.theme) {
      case "primary":
        return bg;
      default:
        return "#ffffff;";
    }
  }};
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: ${(props: StyledButtonType) => {
    const sd =
      "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)";
    switch (props.theme) {
      case "default":
      case "contained":
        return "none";
      default:
        return sd;
    }
  }};
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &:hover {
    box-shadow: ${(props: StyledButtonType) => {
      const sd =
        "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)";
      switch (props.theme) {
        case "default":
        case "contained":
          return "none";
        default:
          return sd;
      }
    }};
    background: ${(props: StyledButtonType) => {
      let bg = "linear-gradient(to bottom right, #ffa16f,#fb7a35)";
      if (props?.color) {
        bg = props.color === "delete" ? "#FF5F5F" : props.color;
      }
      switch (props.theme) {
        case "primary":
          return bg;
        case "contained":
          return bg;
        default:
          return "rgba(25, 118, 210, 0.04)";
      }
    }};
    border: ${(props: StyledButtonType) => {
      if (props.theme === "default") {
        return "0.0625rem solid #DCDEEA";
      }
      return "none";
    }};
    color: ${(props: StyledButtonType) => {
      if (props.theme === "default") {
        return "#9A9FA5";
      }
      return "#ffffff";
    }};
  }

  @keyframes animate {
    0% {
      width: 0;
      height: 0;
      opacity: 0.3;
    }
    100% {
      width: 10rem;
      height: 10rem;
      opacity: 0;
    }
  }
`;
