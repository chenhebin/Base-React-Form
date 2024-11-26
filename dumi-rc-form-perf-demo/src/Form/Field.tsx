import FormContext from "./hook/userFormContext";
import type { FieldProps, Store } from './interface'
import React, {useContext, useEffect, useState} from "react";
import RawAsyncValidator from 'async-validator'
const Field: React.FC<FieldProps> = ({ name, children, shouldUpdate, rules }) => {
    const form = useContext(FormContext)
    const [value, setValue] = useState(() => form?.getFieldValue(name) ?? '')

    let validatePromise: Promise<string[]> | null = null
    let errors: string[] = []

    const onStoreChange = (prevStore: Store, nextStore: Store) => {
      const _renderFn = () => setValue(form?.getFieldValue(name) ?? '')
      // 用户手动更新渲染
      if (Object.prototype.toString.call(shouldUpdate) === '[object Function]') {
        shouldUpdate && shouldUpdate(prevStore, nextStore) && _renderFn()
      } else {
        _renderFn()
      }
    }

    useEffect(() => {
        const unregister = form?.registerField({
          name,
          onStoreChange,
          rules,
          validateRules
        })
        return () => unregister?.()
    }, [form, name]);

    const validateRule = async (name: any, value: any, rule: any) => {
      // 创建async-validator校验器
      const validator = new RawAsyncValidator({ [name]: rule })
      let _result = []
      try {
        await Promise.resolve(validator.validate({ [name]: value }))
      } catch (e: any) {
        if (e && e.errors) {
          _result = e.errors.map((c: any) => c.message)
        }
      }
      return _result
    }
    // 依次校验rules每一条，一有错误就返回错误信息，不继续校验
    const executeValidate = async (namePath: string, value: any, rules: any[]): Promise<string[]> => {
      for (const rule of rules) {
        const errors = await validateRule(namePath, value, rule);
        if (errors.length) {
          return Promise.reject(errors); // 一旦有错误，立即停止并返回
        }
      }
      return []; // 如果所有规则都通过，返回空数组
    };
    const validateRules = () => {
      const _rules = rules || []
      let _errors: string[] = []
      const currentValue = form?.getFieldValue(name)
      const rootPromise: Promise<string[]> = (async () => {
        try {
          _errors = await executeValidate(name, currentValue, _rules)
        } catch (e: any) {
          if (Array.isArray(e)) _errors = e
          else if (typeof e === 'string') _errors = [e]
          else _errors = ['unknown error!']
          return Promise.reject(_errors)
        }
        return _errors
      })()
      validatePromise = rootPromise
      return rootPromise
    }
    /**
     * 受控组件prop劫持
     */
    const getControlled = () => {
        return {
            value,
            onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
              const newValue = event.target.value
              form?.setFieldValue(name, newValue)
              // console.log('change:', name, form?.getFieldsValue(), value)
            }
        }
      }
    return <>
      {children(getControlled())}
    </>
}

export default Field
