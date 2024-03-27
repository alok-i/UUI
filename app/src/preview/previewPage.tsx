import { Page } from '../common';
import React, { useCallback, useEffect, useMemo } from 'react';
import { ComponentPreview } from './componentPreview/componentPreview';
import { PreviewQueryHelpers, usePreviewParams } from './previewQueryHelpers';
import { TComponentPreviewParams } from './componentPreview/types';
import { PlayWriteInterfaceName } from './componentPreview/constants';

export function PreviewPage() {
    const params = usePreviewParams();
    const theme = params.theme;
    const isSkin = params.isSkin || false;
    const componentId = params.componentId;
    const previewId = params.previewId;

    const currentParams: TComponentPreviewParams = useMemo(() => {
        return {
            theme,
            isSkin,
            componentId,
            previewId,
        };
    }, [
        theme,
        isSkin,
        componentId,
        previewId,
    ]);

    const handleNavPreview = useCallback((newParams: TComponentPreviewParams) => {
        PreviewQueryHelpers.setParams({
            componentId: newParams.componentId,
            previewId: newParams.previewId,
            theme: newParams.theme,
            isSkin: newParams.isSkin,
        });
    }, []);

    usePlayWriteInterface(handleNavPreview);

    const key = `${theme}_${isSkin}_${componentId}_${previewId}`;
    return (
        <Page renderHeader={ () => null }>
            <ComponentPreview
                key={ key }
                params={ currentParams }
                onParamsChange={ handleNavPreview }
            />
        </Page>
    );
}

function usePlayWriteInterface(setter: (newParams: TComponentPreviewParams) => void) {
    useEffect(() => {
        (window as any)[PlayWriteInterfaceName] = (_params: string) => {
            setter(JSON.parse(_params) as TComponentPreviewParams);
        };
        return () => {
            delete (window as any)[PlayWriteInterfaceName];
        };
    }, [setter]);
}
