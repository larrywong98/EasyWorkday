import { Controller } from "react-hook-form";
import styles from "./index.module.css";
import { Input } from "antd";
const InputComp = (props) => {
  return (
    <Controller
      control={props.control}
      name={props.field}
      render={({ field: { onChange, value } }) => (
        <Input onChange={onChange} value={value} />
      )}
    />
  );
};
export default InputComp;
