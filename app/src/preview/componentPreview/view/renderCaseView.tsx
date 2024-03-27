import * as React from 'react';
import { DemoContext, DocBuilder, PropDocPropsUnknown } from '@epam/uui-docs';

import {
    buildNormalizedInputValuesMap,
    buildPropInputDataAll,
    TPropInputDataAll,
} from '../../../common/docs/componentEditor/propDocUtils';
import { PropSamplesCreationContext } from '../../../common/docs/componentEditor/view/PropSamplesCreationContext';

import css from './renderCaseView.module.scss';

interface ISingleRenderCaseView {
    docs: DocBuilder<PropDocPropsUnknown>;
    DemoComponent: React.ComponentType<PropDocPropsUnknown>;
    renderCaseProps: Record<string, unknown>;
    context: DemoContext<PropDocPropsUnknown>;
}

interface ISingleRenderCaseViewState {
    inputData: TPropInputDataAll;
    isInited: boolean
}

export class RenderCaseView extends React.PureComponent<ISingleRenderCaseView, ISingleRenderCaseViewState> {
    state = { inputData: {}, isInited: false };

    private propExamplesCtx = new PropSamplesCreationContext({
        forceUpdate: () => this.forceUpdate(),
        getInputValues: () => this.getInputValues(),
        handleChangeValueOfPropertyValue: (newValue) => this.setState((prev) => {
            return {
                ...prev,
                inputData: {
                    ...prev.inputData,
                    value: {
                        ...prev.inputData.value,
                        value: newValue,
                    },
                },
            };
        }),
    });

    private getCtx = () => {
        return this.propExamplesCtx;
    };

    componentDidMount() {
        this.initProps();
    }

    initProps() {
        const { docs, renderCaseProps } = this.props;
        const inputData = buildPropInputDataAll({ docs, ctx: this.getCtx() });
        const renderCasePropsNorm = Object.keys(renderCaseProps).reduce<TPropInputDataAll>((acc, name) => {
            acc[name] = { value: renderCaseProps[name] };
            return acc;
        }, {});
        this.setState({
            inputData: {
                ...inputData,
                ...renderCasePropsNorm, // props from render cases have higher priority
            },
            isInited: true,
        });
    }

    getInputValues = () => {
        return buildNormalizedInputValuesMap(this.state.inputData);
    };

    render = () => {
        const { isInited } = this.state;
        if (!isInited) {
            return null;
        }

        const { DemoComponent, context } = this.props;
        const SelectedDemoContext = context.context;
        const inputValues = this.getInputValues();

        let propsStr = '';
        try {
            propsStr = JSON.stringify(inputValues, undefined, 1);
        } catch (err) {}

        return (
            <div className={ css.root } data-props={ propsStr }>
                <SelectedDemoContext
                    DemoComponent={ DemoComponent }
                    props={ inputValues }
                    isPreview={ true }
                />
            </div>
        );
    };
}
