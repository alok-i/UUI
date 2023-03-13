import * as React from 'react';
import cx from 'classnames';

import { PlateTableRowElement } from '@udecode/plate';

import css from './Table.scss';

export function TableRow(props: any) {

    const isHeaderRow = () => {
        return true; //this.props.node.nodes.toArray()[0].type === 'table_header_cell';
    };

    const { attributes, children } = props;
    return <PlateTableRowElement
        { ...attributes }
        { ...props }
        className={ cx(css.row, isHeaderRow() && css.headerRow) }
    >
        { children }
    </PlateTableRowElement>;
}
