import { typoGraphy } from "@/lib/cssConfig";
import clsx from "clsx";
import { FC, ComponentType } from "react";
import { Button01, ButtonProps } from "../globals/buttons";

const DashboardWrapper = <P extends object>(
  WrappedComponent: ComponentType<P>,
  head: string,
  className?: string,
  buttonProps?: ButtonProps
): FC<P> => {
  const Wrapper: FC<P> = (props) => {
    return (
      <div
        className={clsx(
          "w-full flex-1 py-9 px-8 box-border flex flex-col gap-8 overflow-y-auto",
          className
        )}
      >
        <div className="w-full flex items-center justify-between">
          <h2 className={clsx(typoGraphy.text24Sb)}>{head}</h2>
          {buttonProps && <Button01 {...buttonProps} />}
        </div>
        <WrappedComponent {...props} />
      </div>
    );
  };

  Wrapper.displayName = `Wrapper(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;
  return Wrapper;
};

export default DashboardWrapper;
