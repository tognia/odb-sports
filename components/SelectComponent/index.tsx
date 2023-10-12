// SelectComponent

import { Form, Select } from "antd";
import React, { FC, InputHTMLAttributes } from "react";

interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  disable: boolean;
  oldChoice: string;
  required: boolean | undefined;
  onChange: (e: any) => void;
  placehold: string;
  value: string;
  values: {}[];
}

export function generate() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

const SelectComponent: FC<SelectProps> = ({
  name,
  label,
  onChange,
  placehold,
  disable,
  oldChoice,
  required,
  value,
  values,
  ...rest
}) => {
  return (
    <Form.Item 
       label={label}
       rules={[{ required: required }]}
    >
      
      {!disable && 
      
      <Select
                  options={values}
                  showSearch
                  value={value}
                  placeholder={placehold}
                  optionFilterProp="children"
                  onChange={onChange}
                  size="large"
                  filterOption={(input: string, option: any) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                />
      }

      {disable && 
      
      <Select
                  options={values}
                  showSearch
                  disabled
                  value={value}
                  placeholder={placehold}
                  optionFilterProp="children"
                  onChange={onChange}
                  size="large"
                  filterOption={(input: string, option: any) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                />
      }
      
    </Form.Item>

  );
};

export default SelectComponent;
