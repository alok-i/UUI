import fs from 'fs';
import path from 'path';
import { createFileSync, uuiRoot } from '../jsBridge';
import { IUuiTokensCollection, TFigmaThemeName } from '../figmaTokensGen/types/sharedTypes';
import { PATH } from '../figmaTokensGen/constants';
import { coreMixinGenTemplate, coreThemeMixinsConfig } from './constants';

main();

function main() {
    const tokens = readFigmaTokens();
    genForFigmaTheme({
        tokens,
        figmaTheme: TFigmaThemeName.LOVESHIP_LIGHT,
    });
}

function readFigmaTokens(): IUuiTokensCollection {
    const content = fs.readFileSync(path.resolve(uuiRoot, PATH.FIGMA_VARS_COLLECTION_OUT_TOKENS)).toString();
    return JSON.parse(content);
}

function genForFigmaTheme(params: { figmaTheme: TFigmaThemeName, tokens: IUuiTokensCollection }) {
    const { figmaTheme, tokens } = params;

    const scssVars = new Map<string, string>();
    const cssVars = new Map<string, string>();

    tokens.supportedTokens.forEach(({ valueByTheme, cssVar }) => {
        const valueChain = valueByTheme[figmaTheme]?.valueChain;
        const valueAliases = valueChain?.alias;
        const explicitValue = valueChain?.value as string;
        let cssVarValue: string;
        if (valueAliases?.length) {
            const firstAlias = valueAliases[0];
            if (firstAlias.supported) {
                cssVarValue = `var(${firstAlias.cssVar})`;
            } else {
                const scssVarName = '-' + firstAlias.id.replace(/\//g, '_');
                cssVarValue = `$${scssVarName}`;
                scssVars.set(scssVarName, explicitValue);
            }
        } else {
            cssVarValue = explicitValue;
        }
        cssVars.set(cssVar, cssVarValue);
    });

    //
    // Validate theme file
    const themeFilePathRel = coreThemeMixinsConfig[figmaTheme].themeFile;
    const themeFileContent = fs.readFileSync(path.resolve(uuiRoot, themeFilePathRel)).toString();
    const referencedVars = getAllReferencedCssVars(themeFileContent);

    const unknownVars = retainUnique(referencedVars, new Set(cssVars.keys()));

    let errors = '';
    if (unknownVars.size > 0) {
        errors = [
            '/*',
            ' *    ERROR',
            ` *    Next CSS variables are referenced in ${themeFilePathRel}.`,
            ' *    But they aren\'t defined here.',
            [...unknownVars].map((v) => ` *    ${v}`).join('\n'),
            '*/',
            '',
        ].join('\n');
    }

    const content = coreMixinGenTemplate({ cssVars, scssVars, errors });
    const mixinsPath = coreThemeMixinsConfig[figmaTheme].mixinsFile;
    createFileSync(path.resolve(uuiRoot, mixinsPath), content);
}

function getAllReferencedCssVars(scssFileContent: string) {
    const regexpReferenced = /var\((--[a-zA-Z0-9-]+)\);/gim;
    const resReferenced = [...scssFileContent.matchAll(regexpReferenced)];
    const referenced = new Set<string>();
    resReferenced.forEach((m) => {
        const name = m[1];
        referenced.add(name);
    });

    const regexpDefined = /(--[a-zA-Z0-9-]+): .*;/gim;
    const resDefined = [...scssFileContent.matchAll(regexpDefined)];
    const defined = new Set<string>();
    resDefined.forEach((m) => {
        const name = m[1];
        defined.add(name);
    });

    return retainUnique(referenced, defined);
}

function retainUnique(origSet: Set<string>, setToExclude: Set<string>) {
    const retained = new Set<string>();
    origSet.forEach((r) => {
        if (!setToExclude.has(r)) {
            retained.add(r);
        }
    });
    return retained;
}
