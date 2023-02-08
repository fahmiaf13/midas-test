import { useController, FieldValues } from "react-hook-form";

interface TextFieldProps {
  name: string;
  placeholder: string;
  type: string;
  control: any;
}

export default function TextField(props: TextFieldProps) {
  const { name, placeholder, type } = props;
  const {
    field,
    fieldState: { error },
  } = useController<FieldValues, string>(props);
  return (
    <div className="flex flex-col w-full">
      <label>{name}</label>
      <input {...field} className="bg-slate-900/20" name={name} placeholder={placeholder} type={type} />
      <label>{error?.message}</label>
    </div>
  );
}
