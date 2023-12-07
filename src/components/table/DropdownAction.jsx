import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function DropdownMenuDemo(props) {
  const { children } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="bg-[#092C4C]">
        <Button className="">. . .</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white text-center text-black">
        <DropdownMenuGroup>
          <DropdownMenuItem>{children}</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownMenuDemo;
