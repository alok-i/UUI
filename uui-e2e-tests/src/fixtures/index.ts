import { test as baseTest } from '@playwright/test';
import { mockApi } from '../mocks/apiMocks';
import { PreviewPage } from '../pages/previewPage';

const test = baseTest.extend<{}, { previewPage: PreviewPage }>({
    previewPage: [
        async ({ browser }, use) => {
            const context = await browser.newContext({ bypassCSP: true });
            const page = await context.newPage();
            try {
                await mockApi(page);
                const pePage = new PreviewPage(page);
                await pePage.goto();
                await use(pePage);
            } finally {
                await context.close();
            }
        },
        { scope: 'worker' },
    ],
});

export { test };
