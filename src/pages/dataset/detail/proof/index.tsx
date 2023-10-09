import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Descriptions } from "antd"
import axios from "axios"
import DatasetProofTabel from "@/components/tabel/dataset/proof"
import { DatasetOverviewType, DatasetProofType } from "@dataswapjs/dataswap-sdk"
import { getDatasetProofDescriptionItems } from "@/components/dataset/utils"

interface IProps {
    id: number
}
export default ({ id }: IProps) => {
    const [proofList, setProofList] = useState<DatasetProofType[]>()
    const [datasetOverview, setDatasetOverview] =
        useState<DatasetOverviewType>()
    const router = useRouter()

    useEffect(() => {
        id &&
            axios(`http://localhost:3001/datasetInfo/${id}`).then((res) => {
                setDatasetOverview(res.data)
                res.data.proofs
                    ? setProofList(
                          Object.keys(res.data.proofs).map((key) => ({
                              key: key,
                              hash: key,
                              ...res.data.proofs[key],
                          }))
                      )
                    : setProofList([])
            })
    }, [])

    if (id != 0) {
        return (
            <>
                {datasetOverview && (
                    <Descriptions
                        title=""
                        items={getDatasetProofDescriptionItems(datasetOverview)}
                    />
                )}
                {proofList && <DatasetProofTabel data={proofList} />}
            </>
        )
    } else {
        return <p>Invalid ID</p>
    }
}
