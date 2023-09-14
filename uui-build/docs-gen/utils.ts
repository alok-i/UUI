import { TTypeProp } from './types';
import fs from 'fs';

function propsComparator(p1: TTypeProp, p2: TTypeProp) {
    function compareStr(s1: string, s2: string) {
        return String(s1).localeCompare(String(s2));
    }
    return compareStr(p1.name, p2.name)
        || compareStr(`${p1.from.module}/${p1.from.name}`, `${p2.from.module}/${p2.from.name}`)
        || compareStr(String(p1.required), String(p2.required));
}

export function sortProps(propsArr: TTypeProp[]): TTypeProp[] {
    if (propsArr) {
        return [...propsArr].sort(propsComparator);
    }
}

export function saveJsonToFile(fullPath: string, jsonToSave: object) {
    if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { force: true });
    }
    const content = JSON.stringify(jsonToSave, undefined, 1);
    fs.writeFileSync(fullPath, content);
}

export function isExternalFile(filePath: string) {
    return filePath.indexOf('node_modules') !== -1 && filePath.indexOf('@epam/') === -1;
}
