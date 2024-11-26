
## Form

Demo:

```tsx
import React from 'react';
import { Form } from 'dumi-rc-form-perf-demo';

const [form] = Form.useForm()
export default () => {
  const formRef = React.useRef(null)
  React.useEffect(() => {
    // console.log('get formRef is: ', formRef)
  }, [form]);
  const initialValues = {
    username: 'test name',
    password: '123123'
  }
  const onFinish = (values) => {
    console.log('Form Values: ', values)
  }
  const onFinishFailed = (values) => {
    console.log('Validation Failed: ', values)
  }
  return (
    <Form form={form} ref={formRef} initialValues={initialValues} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Field name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
        {({ value, onChange }) => <input placeholder="Username" value={value} onChange={onChange} />}
      </Form.Field>
      <Form.Field name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        {({ value, onChange }) => <input placeholder="Password" value={value} onChange={onChange} />}
      </Form.Field>
      <button type="submit">Submit</button>
    </Form>
  )
}
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
