import { ReferenceEntry } from "@lib-react/components/SourceCodeRefs";

export const sourceCodeReferences: ReferenceEntry[] = [
  {
    title: "This page",
    link: "https://github.com/donrsh/portfolio-react/blob/main/app/routes/demo.useTmpAuthorization-zustand.tsx",
  },
  {
    title: (
      <>
        <code>TmpAuthorization</code> type def
      </>
    ),
    link: "https://github.com/donrsh/web-apps-workspace/blob/main/libs/react/src/hooks/useTmpAuthorization/types/index.ts",
  },
  {
    title: (
      <>
        <code>useTmpAuthorization</code> zustand implementation
      </>
    ),
    link: "https://github.com/donrsh/web-apps-workspace/tree/main/libs/react/src/hooks/useTmpAuthorization/zustand",
  },
];
