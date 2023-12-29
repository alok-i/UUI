/**
 * NOTE: Types in this file are shared with front-end and must be copied as-is.
 * From: uui-build/ts/figmaTokensGen/types/sharedTypes.ts --> To: app/src/sandbox/tokens/palette/types/sharedTypes.ts
 *
 * Please make sure that this file has no dependencies to any other files.
 */
//

export enum TFigmaThemeName {
    LOVESHIP_LIGHT = 'Loveship-Light',
    LOVESHIP_DARK = 'Loveship-Dark',
    PROMO = 'Promo',
    EPAM = 'EPAM'
}
export type TFloatValue = number;
export type THexaValue = `#${string}`;
export type TUuiCssVarName = `--${string}`;
export enum TVarType {
    COLOR = 'COLOR',
    FLOAT = 'FLOAT'
}

export type TCssVarRef = {
    id: IThemeVar['id'],
} & (
    { cssVar: IThemeVar['cssVar'], supported: true } | { supported: false }
);
export type TResolvedValueNorm = {
    value: THexaValue | TFloatValue
    alias: TCssVarRef[],
};
export type TValueByThemeValue = {
    valueChain: TResolvedValueNorm,
    valueDirect: TResolvedValueNorm,
};

export interface IThemeVar {
    /** Figma path which can be used as a unique ID */
    id: string,
    type: TVarType,
    description: string,
    useCases: string,
    cssVar: TUuiCssVarName,
    /** resolvedValue in this map is taken from Figma. It can be used to compare with actual rendered value in browser */
    valueByTheme: {
        [themeName in TFigmaThemeName]?: TValueByThemeValue
    },
}
export interface IUuiTokensCollection {
    supportedTokens: IThemeVar[]
}
