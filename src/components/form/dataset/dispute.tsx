import React from "react"
import { Select } from "antd"
import { Form, convertDataToFormFields } from "@unipackage/webkit"
import { DatasetDisputeCreateInfo } from "@dataswapjs/dataswapjs"

const { Option } = Select
const overwriteFieldRules = {
    mockResult: {
        customComponent: (
            <Select
                placeholder="Select a option and change input text above"
                allowClear
            >
                <Option value={false}>Invalid</Option>
                <Option value={true}>Valid</Option>
            </Select>
        ),
    },
}

interface IProps {
    data: DatasetDisputeCreateInfo
    onFinish: (values: any) => void
}

export default ({ data, onFinish }: IProps) => {
    const fields = convertDataToFormFields<DatasetDisputeCreateInfo>(
        data,
        overwriteFieldRules
    )

    return (
        <Form
            name="Create Dataset Dispute"
            fields={fields}
            onFinish={onFinish}
            initialValues={data}
        />
    )
}