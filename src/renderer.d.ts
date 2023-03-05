export interface IApi{
    onTest: () => void,
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