/*
 * @Author: chb
 * @Date: 2024-11-15 11:09:50
 * @Description:
 */
import React, { useEffect } from "react";
import { Input, Button } from "antd";
import Form, { useForm, Field } from "rc-field-form";
export default function Form2() {
  // 1. 创建表单实例
  const [form] = useForm();

  // 2. 表单提交成功的回调
  const onFinish = (values) => {
    console.log("Form Values:", values); // 打印提交的表单数据
  };

  // 3. 表单提交失败的回调
  const onFinishFailed = (errorInfo) => {
    console.log("Validation Failed:", errorInfo); // 打印验证错误信息
  };

  // 确保form已挂在
  useEffect(() => {
    form.setFieldsValue({
      username: "cccc",
      password: "123123",
    });
  }, [form]);
  return (
    <>
      hello Form2
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Field
            name="username"
            rules={[{ required: true, message: '请输入账号' }]}
        >
          {(control, meta) => {
            return (
              <div>
                <label>Username：</label>
                <Input
                  {...control}
                  placeholder="Enter your username"
                  style={{ width: "200px" }}
                /><br/>
                {meta.errors.length > 0 && (
                  <span style={{ color: "red" }}>{JSON.stringify(meta)}</span>
                )}
              </div>
            );
          }}
        </Field>
        <Field name="password">
          {(control, meta) => {
            return (
              <div>
                <label>PassWord：</label>
                <Input
                  {...control}
                  placeholder="Enter your password"
                  style={{ width: "200px" }}
                /><br/>
                {meta.errors.length > 0 && (
                  <span style={{ color: "red" }}>{meta.errors[0]}</span>
                )}
              </div>
            );
          }}
        </Field>
        <div>
          <Button htmlType="submit" type="primary">
            提交
          </Button>
        </div>
      </Form>
    </>
  );
}
