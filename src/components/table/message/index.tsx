import React from "react"
import {
    Table,
    generateTableColumns,
    convertDataToTableItems,
} from "@unipackage/webkit"
import { DataswapMessage } from "@dataswapjs/dataswapjs"
import { FromType } from "@unipackage/utils"
import Link from "next/link"
import {
    config_matchingDetailPageRoot,
    config_datasetDetailPageRoot,
    config_messageDetailPageRoot,
} from "../../../config/links"

interface MessageTableItem
    extends FromType<
        DataswapMessage,
        "height" | "timestamp" | "from" | "to" | "method" | "status" | "return"
    > {
    key: React.ReactNode
    cid: React.ReactNode
    datasetId: React.ReactNode
    matchingId: React.ReactNode
}

interface IProps {
    data: DataswapMessage[]
}

export default ({ data }: IProps) => {
    const columns = generateTableColumns<MessageTableItem>({
        cid: "7.5%",
        datasetId: "7.5%",
        matchingId: "7.5%",
        height: "10%",
        timestamp: "7.5%",
        from: "15%",
        to: "15%",
        method: "7.5%",
        status: "7.5%",
        return: "7.5%",
    })

    const tabelItems: MessageTableItem[] = convertDataToTableItems<
        DataswapMessage,
        MessageTableItem
    >(data, (item) => ({
        key: item.cid["/"],
        cid: (
            <Link href={`${config_messageDetailPageRoot}/${item.cid["/"]}`}>
                {item.cid["/"]}
            </Link>
        ),
        datasetId: (
            <Link href={`${config_datasetDetailPageRoot}/${item.datasetId}`}>
                {item.datasetId}
            </Link>
        ),
        matchingId: (
            <Link href={`${config_matchingDetailPageRoot}/${item.matchingId}`}>
                {item.matchingId}
            </Link>
        ),
        height: item.height,
        timestamp: item.timestamp,
        from: item.from,
        to: item.to,
        method: item.method,
        status: item.status,
        return: item.return,
    }))

    return <Table<MessageTableItem> columns={columns} data={tabelItems} />
}