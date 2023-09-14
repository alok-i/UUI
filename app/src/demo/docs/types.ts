export type TRef = {
    module?: string,
    name: string,
};
export type TType = {
    kind: string;
    name: string;
    value: string;
    valuePrint: string[];
    comment?: string[];
    props?: TTypeProp[];
};
export type TTypeProp = {
    kind: string;
    name: string;
    value: string;
    comment?: string[];
    required: boolean;
    from?: TRef;
};
export type TPropsV2Response = Record<string, TType>;
