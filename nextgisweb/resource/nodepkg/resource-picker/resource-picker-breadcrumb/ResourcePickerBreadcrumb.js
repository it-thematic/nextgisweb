import { PropTypes } from "prop-types";

import { observer } from "mobx-react-lite";
import { useMemo } from "react";

import HomeFilledIcon from "@material-icons/svg/home-filled";
import { Breadcrumb, Skeleton, Space, Tooltip } from "@nextgisweb/gui/antd";

export const ResourcePickerBreadcrumb = observer(
    ({
        resourceStore,
        // TODO: make it dependent on the block length
        maxBreadcrumbItems = 2,
    }) => {
        const { brearcrumbItems, brearcrumbItemsLoading, allowMoveInside } =
            resourceStore;

        const breadcrumbItems = useMemo(() => {
            const items = [];
            const onClick = (newLastResourceId) => {
                resourceStore.changeParentTo(newLastResourceId);
            };

            const createLabel = (resItem, name, link = true) => {
                const displayName = name || resItem.resource.display_name;
                return (
                    <span className="resource-breadcrumb-item">
                        {allowMoveInside && link ? (
                            <a onClick={() => onClick(resItem.resource.id)}>
                                {displayName}
                            </a>
                        ) : (
                            displayName
                        )}
                    </span>
                );
            };

            const menuItems = [];
            const packFirstItemsToMenu =
                typeof maxBreadcrumbItems === "number" &&
                maxBreadcrumbItems !== Infinity &&
                brearcrumbItems.length > maxBreadcrumbItems + 1;

            if (packFirstItemsToMenu) {
                // Skip the first item because it's a Home
                const breadcrumbsForMenu = brearcrumbItems.splice(
                    1,
                    brearcrumbItems.length - 1 - maxBreadcrumbItems
                );
                const moveToMenuItems = breadcrumbsForMenu.map((item) => {
                    return {
                        key: item.resource.id,
                        label: createLabel(item),
                    };
                });
                menuItems.push(...moveToMenuItems);
            }

            const HomeIcon = () => (
                <HomeFilledIcon style={{ fontSize: "1.1rem" }} />
            );

            for (let i = 0; i < brearcrumbItems.length; i++) {
                const parent = brearcrumbItems[i];
                let name = null;
                const isLink = i < brearcrumbItems.length - 1;
                if (i === 0) {
                    if (brearcrumbItems.length > 1) {
                        name = (
                            <Tooltip title={parent.resource.display_name}>
                                <HomeIcon />
                            </Tooltip>
                        );
                    } else {
                        name = (
                            <Space>
                                <HomeIcon />
                                {parent.resource.display_name}
                            </Space>
                        );
                    }
                }
                const item = (
                    <Breadcrumb.Item key={parent.resource.id}>
                        {createLabel(parent, name, isLink)}
                    </Breadcrumb.Item>
                );
                items.push(item);
                if (i === 0 && packFirstItemsToMenu) {
                    if (packFirstItemsToMenu) {
                        items.push(
                            <Breadcrumb.Item
                                key="-1"
                                menu={{ items: menuItems }}
                            >
                                ...
                            </Breadcrumb.Item>
                        );
                    }
                }
            }
            return items;
        }, [brearcrumbItems, allowMoveInside]);

        return brearcrumbItemsLoading ? (
            <Space>
                <Skeleton.Button active size="small" shape="circle" />
                <Skeleton.Input active size="small" />
            </Space>
        ) : (
            <Breadcrumb>{breadcrumbItems}</Breadcrumb>
        );
    }
);

ResourcePickerBreadcrumb.propTypes = {
    resourceStore: PropTypes.object,
    maxBreadcrumbItems: PropTypes.number,
};
