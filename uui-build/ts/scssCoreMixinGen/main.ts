import scssParser from 'postcss-scss';
import fs from 'fs';
import path from 'path';
import { uuiRoot } from '../jsBridge';
import postcss from 'postcss';

main();

function main() {
    const absPath = path.resolve(uuiRoot, './epam-assets/theme/theme_loveship.scss');
    const scssContent = fs.readFileSync(absPath);
    const tree = scssParser.parse(scssContent);
    tree.append(new postcss.Comment({ text: 'Hello World!' }));

    const res = tree.toString();

    console.log(tree, res);
}
