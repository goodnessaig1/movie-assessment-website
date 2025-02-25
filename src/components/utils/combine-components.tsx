import { FC, JSX, PropsWithChildren } from "react";

export default function combineComponents(
  ...components: FC<PropsWithChildren>[]
): FC<PropsWithChildren> {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) =>
      function ({ children }: PropsWithChildren): JSX.Element {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      },
    ({ children }: PropsWithChildren) => children
  );
}
