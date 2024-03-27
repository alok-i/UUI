import { DocBuilder, PropDocPropsUnknown, TDocContext, TComponentPreview } from '@epam/uui-docs';
import { TPropInputDataAll } from '../../../common/docs/componentEditor/propDocUtils';
import { TTheme } from '../../../common/docs/docsConstants';

const INLINE_PREVIEW_PREFIX = 'json:';

export type TPreviewRef = { link: string, error: string | undefined, predefinedPreviewRefs: { id: string, link: string }[] };

type TBuildPreviewLinkParams = {
    context: TDocContext,
    inputData: TPropInputDataAll,
    theme: TTheme,
    isSkin: boolean,
    componentId: string,
    docs: DocBuilder<PropDocPropsUnknown>
};

export function buildPreviewRef(params: TBuildPreviewLinkParams): TPreviewRef {
    const { context, inputData, theme, isSkin, componentId, docs } = params;
    const unableToSerialize: string[] = [];
    const initialValue = {
        id: '',
        context,
        matrix: {},
    };

    const previewProps = Object.keys(inputData).reduce<TComponentPreview<any>>((acc, name) => {
        const { value, exampleId } = inputData[name];
        if (exampleId !== undefined) {
            const exObject = Object.values(docs.getPropExamplesMap(name)).find(({ id }) => exampleId === id);
            if (exObject) {
                if (!exObject?.isDefault) {
                    Object.assign(acc.matrix, {
                        [name]: {
                            examples: [exObject.name],
                        },
                    });
                }
            } else {
                console.error(`Unable to find example of property=${name} by exampleId=${exampleId}. The property will be ignored.`);
            }
        } else if (value !== undefined) {
            if (['string', 'boolean', 'number'].indexOf(typeof value) !== -1) {
                Object.assign(acc.matrix, {
                    [name]: {
                        values: [value],
                    },
                });
            } else {
                unableToSerialize.push(name);
            }
        }
        return acc;
    }, initialValue);

    const baseLink = `/preview?theme=${theme}&isSkin=${isSkin}&componentId=${componentId}`;
    const link = `${baseLink}&previewId=${encodeInlinePreviewPropsForUrl(previewProps)}`;
    let error;
    if (unableToSerialize.length) {
        error = `Next props cannot be serialized for URL and will be excluded: ${unableToSerialize.join(', ')}.`;
    }

    const predefinedPreviewRefs = docs.docPreview?.listOfPreviews.map((pp) => {
        return {
            link: `${baseLink}&previewId=${encodeURIComponent(pp.id)}`,
            id: pp.id,
        };
    }) || [];

    return { link, error, predefinedPreviewRefs };
}

export function parsePreviewIdFromString(previewId: string | undefined): TComponentPreview<unknown> | string | undefined {
    if (previewId && isPreviewIdInline(previewId)) {
        const json = previewId.substring(INLINE_PREVIEW_PREFIX.length);
        try {
            return JSON.parse(json) as TComponentPreview<unknown>;
        } catch (err) {
            console.error(err);
        }
    }
    return previewId;
}

export function formatPreviewIdToString(previewId: string | undefined | TComponentPreview<unknown>): string | undefined {
    if (previewId) {
        if (typeof previewId !== 'string') {
            return `${INLINE_PREVIEW_PREFIX}${JSON.stringify(previewId)}`;
        }
        return previewId;
    }
}

function encodeInlinePreviewPropsForUrl(pp: object) {
    const str = JSON.stringify(pp);
    return encodeURIComponent(`${INLINE_PREVIEW_PREFIX}${str}`);
}

function isPreviewIdInline(previewId: string) {
    return previewId.indexOf(INLINE_PREVIEW_PREFIX) === 0;
}
