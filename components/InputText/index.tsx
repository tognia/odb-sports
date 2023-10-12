// InputText Component

import { Form, Input } from "antd";
import React, { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: any;
  value: string;
  defaultValue: string | undefined;
  label: string;
  edit: boolean;
  disable: boolean;
  required: boolean;
  onChange: (e: any) => void;
}

const InputText: FC<InputProps> = ({
  name,
  value,
  label,
  defaultValue,
  required,
  edit,
  onChange,
  disable,
  ...rest
}) => {
  return (
    <>
    <Form.Item
      label={label}
      name={name}
      rules={[{ required: required, message: "" }]}
    >
      {(edit) && (
    <Input type="text" onChange={onChange} value={value} defaultValue={defaultValue} disabled={disable} />
      )}
      {!edit && (
    <Input type="text" onChange={onChange} value={value} defaultValue={defaultValue} disabled={disable} />
      )}

    </Form.Item>
  
    </>
  );
};

export default InputText;
