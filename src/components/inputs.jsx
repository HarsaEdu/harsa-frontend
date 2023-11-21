import clsx from "clsx";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function InputType(props) {
  const { label, id, placeholder, type } = props;

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input type={type} id={id} placeholder={placeholder} />
    </div>
  );
}

function TextAreaLabel(props) {
  const { label, id, placeholder } = props;

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Textarea placeholder={placeholder} id={id} />
    </div>
  );
}

function InputSelect(props) {
  const { label, placeholder, id, options } = props;

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem value={option}>{option}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export { InputType, TextAreaLabel, InputSelect };
