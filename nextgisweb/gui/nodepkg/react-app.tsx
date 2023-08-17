/** @entrypoint */
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "./antd";

import type { Root } from "react-dom/client";

type PropsType = Record<string, unknown>;

const rootsMap = new Map<HTMLElement, Root>();

export default function reactApp<P extends PropsType = PropsType>(
    Component: React.ComponentType<P>,
    props: P,
    domNode: HTMLElement
) {
    let root = rootsMap.get(domNode);

    if (!root) {
        root = createRoot(domNode);
        rootsMap.set(domNode, root);
    }

    root.render(
        <ConfigProvider>
            <Component {...props} />
        </ConfigProvider>
    );

    const unmount = () => {
        root!.unmount();
        rootsMap.delete(domNode);
    };

    return {
        ref: domNode,
        unmount,
        update: (newProps: P) => {
            reactApp(Component, { ...props, ...newProps }, domNode);
        },
    };
}
