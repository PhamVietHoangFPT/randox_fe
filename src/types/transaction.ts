export interface Transaction {

    id: string
    payDate: string
    amount: number
    description: string
    transactionStatus: TransactionStatus
}
export interface TransactionStatus {
    id: string
    transactionStatusName: string
}
