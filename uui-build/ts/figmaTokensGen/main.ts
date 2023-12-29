import { FileUtils } from './utils/fileUtils';
import { IGNORED_VAR_PLACEHOLDER } from './constants';
import { FigmaScriptsContext } from './context/context';
import { logger } from '../jsBridge';
import {
    getCssVarFromFigmaVar,
    getNormalizedResolvedValueMap, isFigmaVarSupported,
} from './utils/cssVarUtils';
import { IThemeVar, TUuiCssVarName } from './types/sharedTypes';
import { IFigmaVar } from './types/sourceTypes';

export function main() {
    try {
        generateTokens();
    } catch (err) {
        logger.error(err);
        throw err;
    }
}

function generateTokens() {
    const ctx = new FigmaScriptsContext();
    const source = FileUtils.readFigmaVarCollection();
    const supportedTokens: IThemeVar[] = [];

    // non-filtered map
    const figmaVarById = source.variables.reduce<Record<string, IFigmaVar>>((acc, figmaVar) => {
        acc[figmaVar.id] = figmaVar;
        return acc;
    }, {});

    const variables = source.variables.map((figmaVar) => {
        const cssVar = getCssVarFromFigmaVar(figmaVar.name) as TUuiCssVarName;
        const supported = isFigmaVarSupported({ path: figmaVar.name });
        if (supported) {
            supportedTokens.push({
                id: figmaVar.name,
                type: figmaVar.type,
                description: figmaVar.description,
                useCases: '',
                cssVar,
                valueByTheme: getNormalizedResolvedValueMap({ figmaVar, figmaVarById, modes: source.modes }),
            });
        }
        return {
            ...figmaVar,
            codeSyntax: {
                ...figmaVar.codeSyntax,
                WEB: supported ? `var(${cssVar})` : IGNORED_VAR_PLACEHOLDER,
            },
        };
    });

    // It will mutate the original arr.
    supportedTokens.sort((t1, t2) => {
        return t1.id.localeCompare(t2.id);
    });

    FileUtils.writeResults({
        newFigmaVarCollection: { ...source, variables },
        uuiTokensCollection: { supportedTokens },
        ctx,
    });
}
