import React from "react"
import type { Transaction } from "../../types/transaction"
import { useTransactionHistoryQuery } from "../../features/wallet/walletAPI"
import { Table, Tag, Typography } from "antd"
interface TransactionHistoryResponse {
    data: Transaction[]
    isLoading: boolean
}
const { Paragraph } = Typography

const TransactionHistory: React.FC = () => {

    const { data, isLoading } = useTransactionHistoryQuery<TransactionHistoryResponse>({})
    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            className='main-detail'
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: '80%',
                    padding: '24px',
                    margin: '0 auto',
                }}
            >
                <Table
                    dataSource={data}
                    loading={isLoading}
                    rowKey='id'
                    pagination={{ pageSize: 5 }}
                >
                    <Table.Column
                        title="Transaction No."
                        render={(_, __, index) => index + 1} />
                    <Table.Column
                        title='Description'
                        dataIndex='description'
                        render={(description) => (
                            <Paragraph ellipsis={{ rows: 2 }}>{description}</Paragraph>
                        )}
                    />
                    <Table.Column
                        title='Pay Date'
                        dataIndex='payDate'
                    />
                    <Table.Column
                        title="Transaction Status"
                        dataIndex="transactionStatus"
                        render={(transactionStatus) => (<Tag color="blue">{transactionStatus?.transactionStatusName}</Tag>)}
                    />
                    <Table.Column
                        title="Amount"
                        dataIndex="amount"
                        // render={(auctionItem) =>  || 'N/A'}
                        render={(amount) => amount.toLocaleString('vi-VN') || 'N/A'} />
                </Table>
            </div>
        </div>
    )
}
export default TransactionHistory;