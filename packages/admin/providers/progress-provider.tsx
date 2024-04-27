"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export function ProgressProvider() {
  return (
    <ProgressBar
      height="2px"
      color="#000"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
