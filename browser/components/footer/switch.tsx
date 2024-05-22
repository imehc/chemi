"use client";

import { useParams } from "next/navigation";
import { usePathname, useRouter } from "~/lib/navigation";
import { FC } from "react";
import { locales } from "~/config";

interface Props {
  locales: typeof locales;
  lng: (typeof locales)[number];
}

export const Switch: FC<Props> = ({ locales, lng }) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  return locales
    .filter((l) => lng !== l)
    .map((l, index) => {
      return (
        <span key={l}>
          {index > 0 && " | "}
          <span
            onClick={() => {
              router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                { pathname, params },
                { locale: l }
              );
            }}
          >
            {l}
          </span>
        </span>
      );
    });
};
