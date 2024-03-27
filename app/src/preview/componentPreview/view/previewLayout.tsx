import * as React from 'react';
import {
    FlexCell,
    FlexRow,
    Spinner, Text, ErrorAlert,
} from '@epam/uui';
//
import css from './previewLayout.module.scss';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useLayoutEffectSafeForSsr } from '@epam/uui-core';
import {
    CELL_SIZE_DEFAULT_PX,
    SIDE_PADDING_OF_LAYOUT_PX,
    MAX_ALLOWED_LAYOUT_WIDTH_PX,
    SECTION_HEIGHT_LIMIT,
} from '../constants';
import { TPreviewCellSize } from '@epam/uui-docs';

interface IPreviewLayout {
    error: string | undefined;
    isLoaded: boolean;
    renderToolbar: () => (React.ReactNode | undefined);
    renderCell: (params: { index: number }) => (React.ReactNode | undefined);
    totalNumberOfCells: number;
    cellSize: TPreviewCellSize | undefined;
}

const TOOLBAR_REGION_ATTRS = {
    role: 'region',
    'aria-label': 'Preview Toolbar',
};
const PREVIEW_REGION_ATTRS = {
    'aria-label': 'Preview Content',
    role: 'region',
};

export function PreviewLayout(props: IPreviewLayout) {
    const sectionRef = useRef<HTMLElement>();
    const [layoutHeight, setLayoutHeight] = useState<number>(0);
    const { renderCell, renderToolbar, isLoaded, cellSize, totalNumberOfCells, error } = props;

    useLayoutEffectSafeForSsr(() => {
        if (sectionRef.current) {
            setLayoutHeight(sectionRef.current.offsetHeight);
        }
    });

    const renderErr = useCallback(() => {
        let errMsg;
        if (error) {
            errMsg = error;
        } else {
            const isTooTall = layoutHeight > SECTION_HEIGHT_LIMIT;
            if (isTooTall) {
                errMsg = `Section height should not exceed ${SECTION_HEIGHT_LIMIT} px. Actual height: ${layoutHeight} px.`;
            }
        }
        if (errMsg) {
            return (
                <ErrorAlert>
                    <Text size="30">{ errMsg }</Text>
                </ErrorAlert>

            );
        }
        return null;
    }, [layoutHeight, error]);

    const layoutSize = useMemo(() => {
        const [
            requestedWidthPx = CELL_SIZE_DEFAULT_PX.width,
            requestedHeightPx = CELL_SIZE_DEFAULT_PX.height,
        ] = cellSize?.split('-').map((s) => typeof s === 'string' ? parseInt(s) : undefined) || [];

        const cellWidth = `${requestedWidthPx}px`;
        const cellHeight = requestedHeightPx ? `${requestedHeightPx}px` : 'auto';
        let howManyFits = Math.floor((MAX_ALLOWED_LAYOUT_WIDTH_PX - SIDE_PADDING_OF_LAYOUT_PX) / requestedWidthPx);
        if (totalNumberOfCells && totalNumberOfCells < howManyFits) {
            howManyFits = totalNumberOfCells;
        }

        return {
            cellWidth,
            cellHeight,
            layoutFixedWidth: `${howManyFits * requestedWidthPx + SIDE_PADDING_OF_LAYOUT_PX}px`,
        };
    }, [cellSize, totalNumberOfCells]);

    const renderAllCells = useCallback(() => {
        if (!isLoaded) {
            return null;
        }

        return (
            <React.Fragment>
                {
                    new Array(totalNumberOfCells).fill(null).map((_, index) => {
                        return (
                            <div data-index={ index } key={ index } className={ css.cell } style={ { width: layoutSize.cellWidth, height: layoutSize.cellHeight } }>
                                { renderCell({ index }) }
                            </div>
                        );
                    })
                }
            </React.Fragment>
        );
    }, [layoutSize, isLoaded, renderCell, totalNumberOfCells]);

    const commonAttrs = {
        role: 'region',
        'aria-label': PREVIEW_REGION_ATTRS['aria-label'],
        'aria-busy': !isLoaded,
        'data-e2e-testid': PREVIEW_REGION_ATTRS['aria-label'],
    };

    if (!isLoaded) {
        return (
            <div className={ css.spinner } { ...commonAttrs }>
                <Spinner />
            </div>
        );
    }

    return (
        <FlexRow cx={ css.root } rawProps={ { ...commonAttrs, style: { width: layoutSize.layoutFixedWidth } } }>
            <FlexCell cx={ css.toolbar } rawProps={ TOOLBAR_REGION_ATTRS }>
                { renderToolbar() }
            </FlexCell>
            <FlexCell cx={ css.previewWrapper } rawProps={ PREVIEW_REGION_ATTRS }>
                { renderErr() }
                <FlexRow cx={ css.preview } ref={ sectionRef }>
                    { renderAllCells() }
                </FlexRow>
            </FlexCell>
        </FlexRow>
    );
}
