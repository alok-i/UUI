import React from 'react';
import { useUuiContext } from '@epam/uui-core';

import {
    createPluginFactory,
    getBlockAbove,
    PlateEditor,
    ToolbarButton as PlateToolbarButton,
} from '@udecode/plate';

import { isPluginActive, isTextSelected } from '../../../helpers';

import { ToolbarButton } from '../../../implementation/ToolbarButton';

import { ReactComponent as VideoIcon } from '../../../icons/video.svg';

import { AddVideoModal } from './AddVideoModal';

const noop = () => {};

const VIDEO_PLUGIN_KEY = 'video';

export const videoPlugin = createPluginFactory({
    key: VIDEO_PLUGIN_KEY,
    type: 'video',
});

interface IVideoButton {
    editor: PlateEditor;
}

export const VideoButton = ({
    editor,
}: IVideoButton) => {
    const context = useUuiContext();

    if (!isPluginActive('video')) return null;

    const block = getBlockAbove(editor);

    return (
        <PlateToolbarButton
            styles={ { root: { width: 'auto', cursor: 'pointer', padding: '0px' } } }
            onMouseDown={ async (event) => {
                if (!editor) return;
                event.preventDefault();

                context.uuiModals.show<string>(modalProps => (
                    <AddVideoModal
                        editor={ editor }
                        { ...modalProps }
                    />
                )).catch(() => null);
            } }
            icon={ <ToolbarButton
                onClick={ noop }
                isDisabled={ !!isTextSelected(editor, true) }
                icon={ VideoIcon }
                isActive={ block?.length && block[0].type === 'iframe' }
            /> }
        />
    );
};