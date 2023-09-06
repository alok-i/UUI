import React from 'react';
import { renderer } from '@epam/uui-test-utils';
import { ScrollBars } from '../ScrollBars';
import { Button } from '../../buttons';

describe('ScrollBars', () => {
    it('should render with default props', () => {
        const tree = renderer
            .create(
                <ScrollBars theme="dark">
                    <Button />
                </ScrollBars>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});