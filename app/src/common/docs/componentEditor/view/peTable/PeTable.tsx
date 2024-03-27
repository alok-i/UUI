import * as React from 'react';
import {
    Button,
    ControlGroup, Dropdown, DropdownMenuButton,
    FlexCell,
    FlexRow,
    FlexSpacer,
    IconButton, Panel,
    ScrollBars,
    Text,
    Tooltip,
} from '@epam/uui';
import { PeTableRow } from './PeTableRow';
import { IPeTableProps } from './types';
import { ReactComponent as ResetIcon } from '../../../../../icons/reset-icon.svg';
import { ReactComponent as PreviewIcon } from '@epam/assets/icons/common/media-fullscreen-12.svg';
import { ReactComponent as MenuIcon } from '@epam/assets/icons/common/navigation-more_vert-18.svg';
import css from './peTable.module.scss';
import { PropDoc } from '@epam/uui-docs';

function propsComparator<TProps>(p1: PropDoc<TProps, keyof TProps>, p2: PropDoc<TProps, keyof TProps>) {
    return p1.name.toLowerCase().localeCompare(p2.name.toLowerCase());
}

export function PeTable<TProps>(props: IPeTableProps<TProps>) {
    const sortedProps = [...props.propDoc].sort((p1, p2) => propsComparator<TProps>(p1, p2));

    const rows = sortedProps.map((p, index: number) => {
        const key = `${p.name}_${index}`;
        const value = props.inputData[p.name]?.value;
        const exampleId = props.inputData[p.name]?.exampleId;
        return (
            <PeTableRow<TProps>
                key={ key }
                prop={ p }
                value = { value }
                exampleId = { exampleId }
                onClearProp={ props.onClearProp }
                propContext={ props.propContext }
                onValueChange={ props.onValueChange }
                onExampleIdChange={ props.onExampleIdChange }
            />
        );
    });

    return (
        <div className={ css.container }>
            <PeTableToolbar
                previewRef={ props.previewRef }
                tooltip={ props.typeRef }
                title={ props.title }
                onResetAllProps={ props.onResetAllProps }
            />
            <PeTableHeader />
            <div className={ css.rowProps }>
                <ScrollBars>
                    { rows }
                </ScrollBars>
            </div>
            { props.children }
        </div>
    );
}
PeTable.displayName = 'PeTable';

const PeTableToolbar = React.memo(
    function PeTableToolbarComponent<TProps>({ title, onResetAllProps, tooltip, previewRef }: Pick<IPeTableProps<TProps>, 'title' | 'onResetAllProps' | 'previewRef'> & { tooltip: string }) {
        const renderPreviewTooltipContent = () => {
            const err = previewRef.error;
            return (
                <>
                    <Text size="30">Open Preview</Text>
                    { err && <Text size="30" color="critical">{ err }</Text> }
                </>
            );
        };

        const hasPredefinedPreviews = previewRef.predefinedPreviewRefs.length > 0;

        const renderPredefinedPreviewList = () => {
            if (hasPredefinedPreviews) {
                return (
                    <Panel background="surface-main" shadow={ true }>
                        {
                            previewRef.predefinedPreviewRefs.map(({ link, id }) => {
                                return (
                                    <DropdownMenuButton caption={ id } href={ link } target="_blank" />
                                );
                            })
                        }
                    </Panel>
                );
            }
            return null;
        };

        const renderPreviewBtn = () => {
            return (
                <ControlGroup>
                    <Tooltip placement="auto" color="neutral" content={ renderPreviewTooltipContent() }>
                        <Button
                            target="_blank"
                            icon={ PreviewIcon }
                            href={ previewRef.link }
                            caption="Preview"
                            fill="none"
                            size="24"
                        />
                    </Tooltip>
                    { hasPredefinedPreviews && (
                        <Dropdown
                            renderBody={ renderPredefinedPreviewList }
                            renderTarget={ (props) => <Button { ...props } size="24" fill="none" icon={ MenuIcon } isDropdown={ false } /> }
                            placement="bottom-end"
                        />
                    )}
                </ControlGroup>
            );
        };

        return (
            <FlexRow key="head" size="36" padding="12" borderBottom columnGap="12" cx={ [css.boxSizing, css.toolbar] }>
                <Tooltip content={ tooltip }>
                    <Text fontSize="16" lineHeight="24" cx={ css.vPadding } fontWeight="600">
                        {title}
                    </Text>
                </Tooltip>
                <FlexSpacer />
                { renderPreviewBtn() }
                <Tooltip placement="auto" content="Reset setting">
                    <IconButton
                        icon={ ResetIcon }
                        onClick={ onResetAllProps }
                        color="info"
                    />
                </Tooltip>
            </FlexRow>
        );
    },
);
const PeTableHeader = React.memo(function HeaderComponent() {
    return (
        <FlexRow key="table-head" size="36" padding="12" columnGap="6" borderBottom cx={ css.boxSizing } background="surface-main">
            <FlexCell key="name" width={ 130 }>
                <Text size="24" fontWeight="600">
                    NAME
                </Text>
            </FlexCell>
            <FlexCell key="default" width={ 100 }>
                <Text size="24" fontWeight="600">
                    DEFAULT
                </Text>
            </FlexCell>
            <FlexCell key="examples" grow={ 1 }>
                <Text size="24" fontWeight="600">
                    PRESET
                </Text>
            </FlexCell>
        </FlexRow>
    );
});
