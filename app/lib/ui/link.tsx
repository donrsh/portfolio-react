import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const linkVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap underline-offset-4 underline",
  {
    variants: {
      variant: {
        default: "text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  asChild?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, ...props }, ref) => {
    const Comp = props.asChild ? Slot : "a";

    return (
      <Comp
        className={cn(linkVariants({ variant, className }))}
        ref={ref as any}
        {...props}
      />
    );
  }
);
Link.displayName = "Link";

export { Link, linkVariants };
