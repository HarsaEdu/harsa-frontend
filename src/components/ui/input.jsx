import * as React from "react";
import { cva } from "class-variance-authority";
<<<<<<< HEAD
import { cn } from "@/utils/utils";
=======
import { cn } from "@/utils/utils"
>>>>>>> 3e4d37d (feat: add from tambah kelas)

const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: " ",
        bottom: "border-0 border-b-2 rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Input = React.forwardRef(({ className, variant, ...props }, ref) => {
  return (
    <input
      className={cn(inputVariants({ variant }), className)}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input, inputVariants };
