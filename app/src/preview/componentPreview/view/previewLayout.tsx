import * as React from 'react';
import {
    FlexCell,
    FlexRow,
    Spinner, Text, ErrorAlert,
} from '@epam/uui';
//
import css from './previewLayout.module.scss';
import { useCallback, useMemo } from 'react';
import { cx } from '@epam/uui-core';
import {
    CELL_SIZE_DEFAULT_PX,
    SIDE_PADDING_OF_LAYOUT_PX,
    MAX_ALLOWED_LAYOUT_WIDTH_PX,
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
    const { renderCell, renderToolbar, isLoaded, cellSize, totalNumberOfCells, error } = props;

    const renderErr = useCallback(() => {
        if (error) {
            return (
                <ErrorAlert>
                    <Text size="30">{ error }</Text>
                </ErrorAlert>

            );
        }
        return null;
    }, [error]);

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
    };

    return (
        <FlexRow cx={ css.root } rawProps={ commonAttrs }>
            {
                !isLoaded && (
                    <div className={ css.spinner }>
                        <Spinner />
                    </div>
                )
            }
            {
                isLoaded && (
                    <>
                        <FlexCell cx={ css.toolbar } rawProps={ TOOLBAR_REGION_ATTRS }>
                            { renderToolbar() }
                        </FlexCell>
                        <FlexCell cx={ css.previewWrapper } rawProps={ { style: { width: layoutSize.layoutFixedWidth } } }>
                            { renderErr() }
                            <div className={ cx(css.preview) }>
                                { renderAllCells() }
                            </div>
                        </FlexCell>
                    </>
                )
            }
        </FlexRow>
    );
}
