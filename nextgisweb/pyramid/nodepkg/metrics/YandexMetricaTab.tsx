import { useState } from "react";

import { Checkbox, Input } from "@nextgisweb/gui/antd";
import { gettext } from "@nextgisweb/pyramid/i18n";

import type { TabProps } from "./tab";

interface TV {
    id: string;
    webvisor: boolean;
}

export default function YandexMetricaTab({
    value,
    onChange,
    readonly,
}: TabProps<TV>) {
    const [ivalue, setIvalue] = useState<TV>(() => ({
        id: value?.id || "",
        webvisor: value?.webvisor || false,
    }));

    const update = (k, v) => {
        const newIvalue = { ...ivalue, [k]: v };
        setIvalue(newIvalue);
        onChange && onChange(newIvalue.id ? newIvalue : null);
    };

    return (
        <div className="grid">
            <label>{gettext("Tag number")}</label>
            <Input
                value={ivalue.id}
                onChange={(evt) => {
                    if (readonly) return;
                    update("id", evt.target.value);
                }}
                placeholder="00000000"
                allowClear
            />

            <Checkbox
                checked={ivalue.webvisor}
                onChange={(evt) => {
                    if (readonly) return;
                    update("webvisor", evt.target.checked);
                }}
            >
                {gettext("Webvisor")}
            </Checkbox>
        </div>
    );
}
