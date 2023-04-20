import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import cx from 'classnames';

import { Dropdown } from '@epam/uui-components';
import { uuiSkin } from "@epam/uui-core";

import { useFocused, useSelected } from 'slate-react';
import { invert, debounce } from 'lodash';

import {
    getBlockAbove,
    ImageElement,
    setElements,
    PlatePluginComponent,
    PlateRenderElementProps,
    Value,
    TElement,
    PlateEditor,
    findNodePath,
} from '@udecode/plate';

import { FileUploadResponse } from "@epam/uui-core";

import css from './ImageBlock.scss';
import { ImgToolbar } from './Toolbar';

export type PlateImgAlign = 'left' | 'center' | 'right';
type SlateImgAlign = 'align-left' | 'align-right' | 'align-center';
type SlateImageSize = { width: number, height: number | string };

type SlateImageData = {
    imageSize: SlateImageSize;
    align: SlateImgAlign;
} & Partial<(File | FileUploadResponse)>;

interface SlateProps {
    data: SlateImageData;
}

interface PlateProps {
    url: string;
    align?: PlateImgAlign;
    width?: number;
}

export interface ImageElement extends TElement, PlateProps, SlateProps {}

interface UpdatingProps { width?: number | string, align?: SlateImgAlign };

const { FlexRow, Spinner } = uuiSkin;

const IMAGE_STYLES = { paddingTop: 0, paddingBottom: 0 };
const MIN_CAPTION_WIDTH = 92;
const MIN_IMG_WIDTH = 12;
const PLATE_TO_SLATE_IMG_ALIGN = {
    'left': 'align-left',
    'right': 'align-right',
    'center': 'align-center',
};
const SLATE_TO_PLATE_IMG_ALIGN = invert(PLATE_TO_SLATE_IMG_ALIGN);

const toSlateAlign = (plateAlign: PlateImgAlign) => PLATE_TO_SLATE_IMG_ALIGN[plateAlign] as SlateImgAlign;

const toPlateAlign = (slateAlign: SlateImgAlign) => SLATE_TO_PLATE_IMG_ALIGN[slateAlign] as PlateImgAlign;

const getUpdatedElement = (
    element: ImageElement,
    { width = element.data?.imageSize?.width || 0, align = element.data?.align || 'align-left' }: UpdatingProps
) => ({
    ...element,
    data: {
        ...(element.data || {}),
        imageSize: { width, height: '100%' },
        align,
    },
});

const debounced = debounce((exec: () => void) => exec(), 50, { leading: true, trailing: false });

const isImgElem = (editor?: PlateEditor, element?: ImageElement) => editor && element.type === 'image';

const useUpdatingElement = ({ element, editor }: { element: ImageElement, editor: PlateEditor }) => {
    const [align, setAlign] = useState<PlateImgAlign>(toPlateAlign(element.data?.align) || 'left');
    const prevNodeWidthRef = useRef(element.width);

    // initialize image width
    if (isImgElem(editor, element) && !element.width) {
        if (element.data?.imageSize) {
            element.width = element.data?.imageSize?.width; // existing
        } else {
            element.width = 'fit-content' as unknown as number; // new image
        }
    }

    // update slate structure
    useEffect(() =>
        debounced(() => {
            const prevWidth = prevNodeWidthRef.current;
            const path = findNodePath(editor, element!);
            if (isImgElem(editor, element) && !!path && !!element.width && prevWidth !== element.width) {
                setElements(editor, getUpdatedElement(element, { width: element.width }));
                prevNodeWidthRef.current = element.width;
            }
        }), [element.width]
    );

    const resizableProps = { minWidth: MIN_IMG_WIDTH };
    const isCaptionEnabled = !!element.data && element.data?.imageSize?.width >= MIN_CAPTION_WIDTH;
    const caption = isCaptionEnabled ? { disabled: false } : { disabled: true };

    return { align, setAlign, resizableProps, caption, style: IMAGE_STYLES };
}

export const Image: PlatePluginComponent<PlateRenderElementProps<Value, ImageElement>> = (props) => {
    const { editor, element, children } = props;
    const ref = useRef(null);
    const isFocused = useFocused();
    const isSelected = useSelected();

    const { align, setAlign, ...imageSizeProps } = useUpdatingElement({ element, editor });
    const [showToolbar, setShowToolbar] = useState(false);

    useEffect(() => {
        const block = getBlockAbove(editor);
        setShowToolbar(isSelected && isFocused && block?.length && block[0].type === 'image');
    }, [isSelected, isFocused]);

    const onChangeDropDownValue = (value: boolean) => setShowToolbar(value);

    const toggleBlockAlignment = (align: PlateImgAlign) => {
        setAlign(align);
        setElements(editor, getUpdatedElement(element, { align: toSlateAlign(align) }));
    }

    const setMaxWidth = () => {
        const newWidth = ref?.current?.clientWidth;
        if (newWidth) {
            element.width = newWidth;
            setElements(editor, getUpdatedElement(element, { width: newWidth }));
        }
    };

    const isFullWidth = () => {
        const clientWidth = ref?.current?.clientWidth;
        return !clientWidth || (clientWidth === element.width);
    };

    if (!editor) {
        return null;
    }

    if (element.type === 'loader') {
        return (
            <>
                <Spinner  { ...props } cx={ css.spinner } />
                { children }
            </>
        );
    }

    return (
        <Dropdown
            renderTarget={ (innerProps: any) => (
                <div ref={ innerProps.ref } className={ cx(css.wrapper) }>
                    <div
                        ref={ ref }
                        className={ cx(css.slateImage) }>
                        <ImageElement
                            { ...props }
                            { ...imageSizeProps }
                            align={ align }
                        />
                    </div>
                </div>
            ) }
            renderBody={ () => (
                <FlexRow cx={ css.imageToolbarWrapper }>
                    <ImgToolbar editor={ editor }
                        align={ align }
                        element={ element }
                        toggleBlockAlignment={ toggleBlockAlignment }
                        isFullWidth={ isFullWidth }
                        setMaxWidth={ setMaxWidth }
                    />
                </FlexRow>
            ) }
            onValueChange={ onChangeDropDownValue }
            value={ showToolbar }
            placement='top'
        />
    );
};