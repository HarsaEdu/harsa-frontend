import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ActionIcon from '../../assets/Action.svg'

function DropdownMenuDemo(props) {
  const { children } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="bg-[#092C4C] rounded">
        <img src={ActionIcon} alt="act" />
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
