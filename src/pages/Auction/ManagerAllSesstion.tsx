/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {
    useGetAllSessionsQuery,
} from '../../features/auction/auctionAPI'
import {
    Table,
    Typography,
} from 'antd'

const { Paragraph } = Typography

const ManagerAllSessionPage: React.FC = () => {
    const { data: items = [], isLoading } = useGetAllSessionsQuery({})
    console.log(items)

    return (
        <>
            <h2>Pending Auction Items</h2>
            <Table
                dataSource={items}
                loading={isLoading}
                rowKey='id'
                pagination={{ pageSize: 5 }}
            >
                <Table.Column
                    title="Item Name"
                    dataIndex="auctionItem"
                    render={(auctionItem) => auctionItem?.name || 'N/A'}
                />
                <Table.Column
                    title='Description'
                    dataIndex='auctionItem'
                    render={(auctionItem) => (
                        <Paragraph ellipsis={{ rows: 2 }}>{auctionItem?.description}</Paragraph>
                    )}
                />
                <Table.Column
                    title='Image'
                    dataIndex='auctionItem'
                    render={(auctionItem) => (
                        <img src={auctionItem?.imageUrl} alt='preview' style={{ width: 80 }} />
                    )}
                />
                <Table.Column
                    title="Start Price"
                    dataIndex="auctionItem"
                    render={(auctionItem) => auctionItem?.startPrice.toLocaleString('vi-VN') || 'N/A'}
                />
                <Table.Column
                    title="Finish Price"
                    dataIndex="auctionItem"
                    // render={(auctionItem) =>  || 'N/A'}
                    render={(auctionItem) => auctionItem?.finalPrice ? auctionItem.finalPrice.toLocaleString('vi-VN') : 'N/A'} />
                <Table.Column
                    title="End Time"
                    dataIndex="endTime"
                    render={(endTime) => {
                        if (!endTime) return 'N/A';
                        const date = new Date(endTime);
                        const hours = String(date.getHours()).padStart(2, '0');
                        const minutes = String(date.getMinutes()).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 because getMonth() is 0-based
                        const year = String(date.getFullYear()).slice(-2);
                        return `${hours}:${minutes} ${day}-${month}-${year}`;
                    }}
                />
            </Table>
        </>

    )
}

export default ManagerAllSessionPage
