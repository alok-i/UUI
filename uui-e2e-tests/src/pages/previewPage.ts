import type { Page, Locator } from '@playwright/test';
import { PreviewPageParams } from '../types';
import { PlayWriteInterfaceName, PREVIEW_URL } from '../constants';

export class PreviewPage {
    private locators: {
        regionContentNotBusy: Locator;
    };

    constructor(public readonly page: Page) {
        const regionContentNotBusy = page.locator('[aria-label="Preview Content"][aria-busy="false"]');
        this.locators = {
            regionContentNotBusy,
        };
    }

    async goto() {
        await this.page.goto(PREVIEW_URL);
    }

    async waitBeforeScreenshot(): Promise<void> {
        // in some very rare cases, the content is not fully ready, this small timeout solves the issue.
        await this.page.waitForTimeout(10);
    }

    async editPreview(params: PreviewPageParams) {
        await this.page.evaluate((_params: string) => {
            const [p, i] = _params.split('[||||]');
            (window as any)[i](p);
        }, [jsonStringify(params), PlayWriteInterfaceName].join('[||||]'));
        await this.locators.regionContentNotBusy.waitFor();
    }
}

function jsonStringify(json: object) {
    return JSON.stringify(json, undefined, 1);
}
