import { createSkinComponent } from '@epam/uui-core';
import * as uui from '@epam/uui';
import { EpamPrimaryColor } from '../types';

interface AlertMods {
    /**
     * Defines component color.
     * @default 'sky'
     */
    color?: EpamPrimaryColor | uui.AlertProps['color'];
}

/** Represents the properties of the Alert component. */
export interface AlertProps extends uui.AlertCoreProps, AlertMods {}

export const Alert = createSkinComponent<uui.AlertProps, AlertProps>(
    uui.Alert,
    (props) => ({
        ...props,
        color: props.color ?? 'sky',
    }),
);
