export interface IApi{
    test: () => Promise<void>,
}

export interface ITest{
    test: () => void
}

declare global {
    interface Window{
        api: IApi
        test: ITest
    }
}