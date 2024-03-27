import type { Page, Locator } from '@playwright/test';
import { PreviewPageParams } from '../types';
import { PREVIEW_URL } from '../constants';

export class PreviewPage {
    private locators: {
        regionContentNotBusy: Locator;
    };

    constructor(public readonly page: Page) {
        const regionContentNotBusy = page.locator('[data-e2e-testid="Preview Content"][aria-busy="false"]');
        this.locators = {
            regionContentNotBusy,
        };
    }

    async goto() {
        await this.page.goto(PREVIEW_URL);
    }

    async getScreenshotOptions(): Promise<{ fullPage?: boolean }> {
        // in some very rare cases, the content is not fully ready, this small timeout solves the issue.
        await this.page.waitForTimeout(10);
        return { fullPage: true };
    }

    async editPreview(params: PreviewPageParams) {
        await this.page.evaluate((p: string) => {
            const PlayWriteInterfaceName = '_uui_playwrite_interface';
            (window as any)[PlayWriteInterfaceName](p);
        }, jsonStringify(params));
        await this.locators.regionContentNotBusy.waitFor();
    }
}

function jsonStringify(json: object) {
    return JSON.stringify(json, undefined, 1);
}
