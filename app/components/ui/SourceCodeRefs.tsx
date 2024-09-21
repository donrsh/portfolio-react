import { ComponentProps, ReactNode, memo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/lib/ui/accordion";
import { Link } from "~/lib/ui/link";

export type ReferenceEntry = {
  title: ReactNode;
  description?: ReactNode;
  link: string;
};

export type SourceCodeRefsProps = {
  title?: ReactNode;
  data: ReferenceEntry[];
} & Omit<ComponentProps<"details">, "title">;

function SourceCodeRefs({
  title = <b>Source Code References</b>,
  data,
  ...rest
}: SourceCodeRefsProps) {
  return (
    <Accordion type="single" collapsible defaultValue="only">
      <AccordionItem value="only">
        <AccordionTrigger className="justify-start gap-4">
          {title}
        </AccordionTrigger>
        <AccordionContent>
          <ul className="list-inside list-disc">
            {data.map((x, idx) => {
              return (
                <li key={idx} className="list-item mb-1">
                  <span style={{ fontWeight: 500 }}>{x.title}</span> (
                  <Link href={x.link}>Link</Link>)
                </li>
              );
            })}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default memo(SourceCodeRefs);
