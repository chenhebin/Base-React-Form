type Store = Record<string, any>
export type FieldEntity = {
    name: string;
    onStoreChange: () => void
}
export type FormInstance = {

}

class FormStore {
    private store: Store = {}
}
