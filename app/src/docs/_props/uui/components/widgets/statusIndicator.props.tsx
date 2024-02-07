import * as React from 'react';
import { ColorPicker, DocBuilder } from '@epam/uui-docs';
import { StatusIndicator, StatusIndicatorProps } from '@epam/uui';
import { DefaultContext, ResizableContext } from '../../docs';

const statusIndicatorDoc = new DocBuilder<StatusIndicatorProps>({ name: 'statusIndicator', component: StatusIndicator })
    .prop('color', {
        renderEditor: (editable: any, examples) => <ColorPicker colors={ examples.map((i) => ({ value: i })) } { ...editable } />,
        examples: ['info', 'success', 'warning', 'critical', 'neutral'],
    })
    .prop('fill', {
        examples: ['solid', 'outline'],
        defaultValue: 'solid',
    })
    .prop('size', {
        examples: ['12', '18', '24'],
        defaultValue: '24',
    })
    .prop('caption', {
        examples: [
            { value: 'Indicator', isDefault: true }, { value: 'Status' },
        ],
        type: 'string',
    })
    .withContexts(DefaultContext, ResizableContext);

export default statusIndicatorDoc;