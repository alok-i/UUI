import { TSkin } from '../types';
import { DocBuilder, DocPreviewBuilder } from '../DocBuilder';
import { docCommonOverride } from './docOverrides/docCommonOverride';
import { buildPropDetails, buildPropFallbackDetails } from './propDetailsBuilders/build';
import { TType, TTypeProp, TTypeRef } from '../docsGen/sharedTypes';
import { mergeUnionTypeDuplicatePropsExamples } from './propDetailsBuilders/shared/unionPropsUtil';
import { TDocConfig } from './docBuilderGenTypes';
import { UuiContexts } from '@epam/uui-core';

interface IDocBuilderGenParams {
    config: TDocConfig,
    skin: TSkin,
    uuiCtx: Pick<UuiContexts, 'uuiNotifications'>,
    loadDocsGenType: (typeRef: TTypeRef) => Promise<{ content: TType }>
}
/**
 * Generates DocBuilder using given type metadata & any optional overrides
 * @param params
 */
export async function docBuilderGen(params: IDocBuilderGenParams): Promise<DocBuilder<any> | undefined> {
    const { config, loadDocsGenType, uuiCtx } = params;
    const {
        name,
        contexts,
        doc: docCommon,
        preview: previewCommon,
        bySkin,
    } = config;
    const forSkin = bySkin[params.skin];
    if (forSkin) {
        const { doc: docSkin, type: docGenType, component, preview: previewSkin } = forSkin;
        const { content: type } = await loadDocsGenType(docGenType);

        const docs = new DocBuilder<any>({ name, component });
        const props = type.details?.props;
        const unresolvedProps: TTypeProp[] = [];
        props?.forEach((prop) => {
            let nextProp = buildPropDetails({ prop, docs, skin: params.skin, uuiCtx });
            const isResolved = !!nextProp;
            if (!isResolved) {
                nextProp = buildPropFallbackDetails({ prop, docs, skin: params.skin, uuiCtx });
                unresolvedProps.push(prop);
            }
            const prevProp = docs.getPropDetails(prop.name);
            if (prevProp) {
                docs.merge(prop.name, {
                    examples: mergeUnionTypeDuplicatePropsExamples({ prevProp, nextProp }),
                });
            } else {
                docs.prop(prop.name, nextProp);
            }
        });

        const previewBuilder = new DocPreviewBuilder();
        docs.setDocPreview(previewBuilder);
        previewCommon?.(previewBuilder);
        previewSkin?.(previewBuilder);

        docCommonOverride({ docs, contexts });
        docCommon?.(docs);
        docSkin?.(docs);

        unresolvedProps.forEach((prop) => {
            const found = docs.props.find((p) => p.name === prop.name);
            const isPropNotComplete = Array.isArray(found.examples) && found.examples.length === 0 && !found.editorType;
            if (isPropNotComplete) {
                docs.merge(prop.name, { editorType: 'CantResolve' });
            }
        });

        return docs;
    }
}
