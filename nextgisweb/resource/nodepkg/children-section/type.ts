export type ChildrenResourceAction = {
    href: string;
    target?: "_self" | "_blank";
    title: string;
    icon: string;
    key: string[];
};

export type ChildrenResource = {
    id: number;
    displayName: string;
    link: string;
    cls: string;
    clsDisplayName?: string;
    creationDate?: string;
    ownerUserDisplayName?: string;
    actions: ChildrenResourceAction[];
};
