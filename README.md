# React + ts 的基础form实现

## dumi-rc-form-perf-demo
> 基于async-validator的rc校验流程 demo实现

+ Form组件：  
> + 支持 useForm 实例注册 to FormStore
> + 支持 onFinish/onFinished 事件监听
> + 支持 form ref 提取
```ts
export type FormInstance = {
    registerField: (field: FieldEntity) => () => void,
    getFieldValue: (name: string) => any;
    setFieldValue: (name: string, value: any) => void;
    setFieldsValue: (value: Store) => void;
    getFieldsValue: () => Store;
    setInitialValues: (initialValues: Store, init: Boolean) => void;
    setCallbacks: (callbacks: { onFinish?: (values: Store) => void; onFinishFailed?: (errors: any[]) => void }) => void;
    validateFields: (nameList: Array<string>) => void;
    submit: () => void;
}
```

+ Field组件
> + 支持 name注入
> + 支持 rules注入
> + 支持 value/onChange fn 劫持
> + 支持 单一字段校验 validateFields
> + 支持 单一字段渲染逻辑劫持 shouldUpdate

### 建议
```react
nvm use 16
```

### 安装
在开始之前，请确保你已经安装了必要的依赖。你可以使用以下命令来安装
```react
npm install
```

### 使用
```react
npm run start
```

## rc-field-form-demo
> rc-field-form的使用demo
