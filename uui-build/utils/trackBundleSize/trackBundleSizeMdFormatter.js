module.exports = { comparisonResultToMd };

function comparisonResultToMd({ comparisonResult, currentBaseLine, newBaseLine }) {
    const isExceedsLimits = Object.keys(comparisonResult).reduce((acc, rowId) => {
        if (!comparisonResult[rowId]['withinThreshold']) {
            return true;
        }
        return acc;
    }, false);
    const attrs = [
        'baseLineSize', 'size', 'diffLabel', 'withinThreshold', 'thresholdLabel',
    ];
    const headerRemap = {
        baseLineSize: `Baseline Size (v${currentBaseLine.version})`,
        size: 'Size',
        diffLabel: 'Diff',
        withinThreshold: 'Within Threshold',
        thresholdLabel: 'Threshold (min - max)',
    };
    const formatHeader = (h) => {
        return headerRemap[h] || h;
    };
    const formatValue = (h, v) => {
        if (h === 'withinThreshold') {
            return v ? ':ok:' : ':no_entry:';
        }
        return v;
    };
    const tableMd = formatMdTable(
        comparisonResult,
        attrs,
        formatHeader,
        formatValue,
    );
    /*
     * "generatedBy" text is used by "trackBundleSizeCommentPR.yml" GitHub workflow to replace outdated comment.
     * The "Exceeds Limits: yes|no" part is used by "trackBundleSize.yml" to mark the workflow failed when limits exceeded.
     * So, if you want to change it, then please make sure that "trackBundleSize.yml" is updated as well.
     */
    const generatedBy = `Generated by: track-bundle-size. Exceeds Limits: ${isExceedsLimits ? 'yes' : 'no'}`;
    const ciStatus = `CI Status: ${isExceedsLimits ? 'error' : 'ok'}`;
    const descriptionMd = [
        'Bundle size diff (in kBytes). Not gzipped. Both CSS & JS included.',
        `Baseline: v${currentBaseLine.version} (${currentBaseLine.timestamp})`,
        generatedBy,
        `Generated at: ${new Date().toUTCString()}`,
        ciStatus,
    ].join('<br>');

    const newBaseLineMd = formatNewBaseLine(newBaseLine);

    return `${descriptionMd}\n${tableMd}\n${newBaseLineMd}`;
}

function formatMdTable(obj, attrs, formatHeader = (h) => h, formatValue = (h, v) => v) {
    const header = '| Module |' + attrs.map(formatHeader).join('|') + '|';
    const headerSep = '|:-----:|' + attrs.map(() => ':-----:').join('|') + '|';
    const rows = Object.keys(obj).reduce((acc, rowId) => {
        const rowContent = attrs.map((a) => {
            return formatValue(a, obj[rowId][a]);
        }).join('|');
        acc.push(`|${rowId}|${rowContent}|`);
        return acc;
    }, []);
    return `${header}\n${headerSep}\n${rows.join('\n')}`;
}

function formatNewBaseLine(newBaseLine) {
    return [
        '<details>',
        '<summary>new sizes (raw)</summary>',
        '',
        'To set the sizes as a new baseline, you can copy/paste next content to the ```uui-build/config/bundleSizeBaseLine.json``` and commit the file.',
        '',
        '```json',
        newBaseLine,
        '```',
        '</details>',
    ].join('\n');
}
