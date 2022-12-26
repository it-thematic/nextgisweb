import { PropTypes } from "prop-types";
import { Fragment, useMemo, useEffect } from "react";
import { Form, Input, InputNumber } from "@nextgisweb/gui/antd";
import { Checkbox } from "./field/Checkbox";
import i18n from "@nextgisweb/pyramid/i18n!gui";

export function FieldsForm(props) {
    const { fields, initialValues, onChange, whenReady, form, ...formProps } =
        props;
    const form_ = Form.useForm(form)[0];

    const isValid = async () => {
        return form_.getFieldsError().every((e) => {
            return e.errors.length === 0;
        });
    };
    const onFieldsChange = (changedFields) => {
        const value = {};
        for (const c of changedFields) {
            value[c.name[0]] = c.value;
        }
        onChange({ isValid, value });
    };

    const formProps_ = {
        form: form_,
        initialValues,
        autoComplete: "off",
        labelCol: { span: 5 },
        labelAlign: "left",
        ...formProps,
    };

    if (onChange) {
        formProps_.onFieldsChange = onFieldsChange;
    }

    const includedFormItems = useMemo(
        () =>
            fields
                ? fields.filter((f) => {
                    const included = f.included;
                    if (included !== undefined) {
                        if (typeof included === "function") {
                            return included(f, initialValues);
                        }
                        return !!included;
                    }
                    return true;
                })
                : [],
        [fields]
    );

    useEffect(() => {
        if (whenReady) {
            whenReady();
        }
    }, []);

    return (
        <Form labelWrap colon={false} {...formProps_} className="fields-form">
            {includedFormItems.map((f) => (
                <Fragment key={f.name}>{FormItem({ ...f })}</Fragment>
            ))}
            {props.children}
        </Form>
    );
}

function FormItem(props) {
    const { required, requiredMessage, widget, ...formProps } = props;

    delete formProps.included;
    delete formProps.value;

    formProps.rules = formProps.rules || [];

    if (required) {
        formProps.rules.push({
            required: true,
            message: requiredMessage ?? i18n.gettext("This value is required"),
        });
    }

    const FormWidget = widget;
    if (typeof widget === "function") {
        return <FormWidget {...formProps}></FormWidget>;
    }
    if (widget === "checkbox") {
        return <Checkbox {...formProps}></Checkbox>;
    }

    return (
        <Form.Item {...formProps}>{getInputType(widget, formProps)}</Form.Item>
    );
}

function getInputType(widget, props) {
    if (typeof widget === "string") {
        widget = widget.toLowerCase();
        if (widget === "password") {
            return <Input.Password {...props} />;
        } else if (widget === "textarea") {
            return <Input.TextArea {...props} />;
        } else if (widget === "number") {
            return <InputNumber type="number" {...props} />;
        }
    }
    return <Input {...props} />;
}

const FieldPropTypes = PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    widget: PropTypes.any,
    mode: PropTypes.string,
    included: PropTypes.bool,
    choices: PropTypes.arrayOf(
        PropTypes.shape({ name: PropTypes.string, value: PropTypes.any })
    ),
    disabled: PropTypes.bool,
});

FieldsForm.propTypes = {
    initialValues: PropTypes.object,
    whenReady: PropTypes.func,
    onChange: PropTypes.func,
    children: PropTypes.node,
    fields: PropTypes.arrayOf(FieldPropTypes),
    form: PropTypes.any,
};
FormItem.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    widget: PropTypes.string,
    widgetProps: PropTypes.object,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    choices: PropTypes.array,
    requiredMessage: PropTypes.string,
    included: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};
