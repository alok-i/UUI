import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { PreviewPageParams, ScreenshotTestParamsSingle, TMatrix, TTheme } from '../types';
import { TPreviewIdByComponentId, TComponentId } from '../constants';

export class TestBuilder {
    private cfgByComponent: Map<TComponentId, TMatrix[]> = new Map();

    /**
     * @param cid
     * @param matrix
     */
    add<Comp extends keyof TPreviewIdByComponentId>(cid: Comp, matrix: Partial<TMatrix<TPreviewIdByComponentId[typeof cid]>> & Pick<TMatrix<TPreviewIdByComponentId[typeof cid]>, 'previewId'>) {
        let prev = this.cfgByComponent.get(cid);
        if (!prev) {
            prev = [];
            this.cfgByComponent.set(cid, prev);
        }
        const matrixFull: TMatrix<TPreviewIdByComponentId[typeof cid]> = {
            ...matrix,
            isSkin: matrix.isSkin === undefined ? [true, false] : matrix.isSkin,
            theme: matrix.theme === undefined ? Object.values(TTheme) : matrix.theme,
        };
        prev!.push(matrixFull as TMatrix<TPreviewIdByComponentId[typeof cid]>);
        return this;
    }

    buildTests(params?: { runId?: string }) {
        const runId = params?.runId;
        this.cfgByComponent.forEach((matrix, componentId) => {
            matrix.forEach((m) => {
                createScreenshotTestsSingle({
                    runId,
                    componentId,
                    matrix: m,
                });
            });
        });
    }
}

function createScreenshotTestsSingle(builderParams: ScreenshotTestParamsSingle) {
    const { componentId, matrix } = builderParams;
    matrix.theme.forEach((theme) => {
        matrix.isSkin.forEach((isSkin) => {
            matrix.previewId.forEach((previewId) => {
                const pageParams = { theme, isSkin, previewId, componentId };
                createSingleScreenshotTest({ builderParams, pageParams });
            });
        });
    });
}

function createSingleScreenshotTest(
    params: { builderParams: ScreenshotTestParamsSingle, pageParams: PreviewPageParams },
) {
    const { pageParams, builderParams } = params;

    const testName = createUniqueTestName(params);

    test.describe(() => {
        test(testName, async ({ previewPage }) => {
            await previewPage.editPreview(pageParams);
            const opts = await previewPage.getScreenshotOptions();

            if (builderParams.onBeforeAssertion) {
                await builderParams.onBeforeAssertion({ previewPage, pageParams });
            }
            await expect(previewPage.page).toHaveScreenshot(`${testName}.png`, opts);
        });
    });
}

function createUniqueTestName(params: { builderParams: ScreenshotTestParamsSingle, pageParams: PreviewPageParams }) {
    const {
        builderParams: {
            runId = '',
        },
        pageParams: {
            isSkin,
            theme,
            componentId,
            previewId,
        },
    } = params;

    return [
        runId,
        componentId,
        (isSkin ? 'skin' : 'notSkin'),
        theme,
        previewId,
    ].filter((i) => !!i).map((i) => capitalize(i)).join(' | ');
}

function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
