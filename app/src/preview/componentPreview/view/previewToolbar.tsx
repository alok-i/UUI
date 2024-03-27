import * as React from 'react';
//
import css from './previewToolbar.module.scss';
import { TComponentPreviewParams } from '../types';
import { PlayWriteInterfaceName } from '../constants';
import { useMemo } from 'react';

interface IPreviewToolbar {
    value: TComponentPreviewParams;
    onValueChange: (value: TComponentPreviewParams) => void;
}

export function PreviewToolbar(props: IPreviewToolbar) {
    const hint1 = useMemo(() => {
        return jsonStringify(props.value);
    }, [props.value]);
    const hint2 = `window.${PlayWriteInterfaceName}(JSON.stringify(${hint1}));`;
    return (
        <div className={ css.root } title={ hint1 }>
            <pre style={ { display: 'none' } }>{hint2}</pre>
        </div>
    );
}

function jsonStringify(o: object) {
    return JSON.stringify(o, undefined, 2);
}
