import * as React from 'react';
import { BaseDocsBlock, DocExample, EditableDocContent } from '../../../common';

export class DatasourcesArrayDatasourceDoc extends BaseDocsBlock {
    title = 'ArrayDatasource';

    renderContent() {
        return (
            <>
                <EditableDocContent fileName="datasources-Array-datasource" />
                
                <DocExample title="ArrayDatasourceProps" path="./_examples/datasources/ArrayDatasourceProps.code.example.ts" onlyCode={ true } />
                <EditableDocContent fileName="datasources-array-datasource-props-overview" />

                <DocExample title="useArrayDataSource" path="./_examples/datasources/UseArrayDataSource.code.example.ts" onlyCode={ true } />

                <DocExample title="Data" path="./_examples/datasources/ArrayDatasourceData.example.tsx" />
                <DocExample title="Search" path="./_examples/datasources/ArrayDatasourceSearch.example.tsx" />
                <DocExample title="Filter" path="./_examples/datasources/ArrayDatasourceFilter.example.tsx" />
                <DocExample title="Sorting" path="./_examples/datasources/ArrayDatasourceSorting.example.tsx" />
            </>
        );
    }
}