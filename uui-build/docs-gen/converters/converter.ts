import {
    Node,
    SyntaxKind,
    Type,
} from 'ts-morph';
import { sortProps } from '../utils';
import { IConverter, IConverterContext, TType, TTypeProp } from '../types';
import { ConverterUtils } from './converterUtils';

export class Converter implements IConverter {
    constructor(public readonly context: IConverterContext) {}

    protected getTypeString(typeNode: Node): string {
        return ConverterUtils.getTypeTextFromNode(typeNode);
    }

    protected isPropsSupported(typeNode: Node) {
        const type = ConverterUtils.getTypeFromNode(typeNode);
        if (ConverterUtils.isExternalNode(typeNode) || type.isTuple()) {
            return false;
        }
        return type.isClassOrInterface() || type.isIntersection() || type.isObject();
    }

    public isSupported(typeNode: Node) {
        return !!typeNode;
    }

    public convert(typeNode: Node): TType {
        const type = ConverterUtils.getTypeFromNode(typeNode);
        const kind = ConverterUtils.getSyntaxKindNameFromNode(typeNode);
        const name = ConverterUtils.getTypeName(typeNode.getSymbol());
        const value = this.getTypeString(typeNode);
        const comment = ConverterUtils.getCommentFromNode(typeNode);
        const valuePrint = ConverterUtils.printNode(typeNode);
        const props = this.isPropsSupported(typeNode) ? extractMembers(typeNode, type, this.context) : undefined;
        return {
            kind,
            name,
            value,
            valuePrint,
            comment,
            props,
        };
    }
}

function mapSingleMember(originTypeNode: Node, node: Node, context: IConverterContext): TTypeProp {
    let prop: TTypeProp = undefined;
    const nKind = node.getKind();
    const isSupported = [
        SyntaxKind.PropertySignature,
        SyntaxKind.MethodSignature,
        SyntaxKind.GetAccessor,
        SyntaxKind.SetAccessor,
        SyntaxKind.MethodDeclaration,
        SyntaxKind.PropertyDeclaration,
    ].indexOf(nKind) !== -1;

    if (isSupported) {
        const comment = ConverterUtils.getCommentFromNode(node);
        const from = ConverterUtils.getTypeParentRef(node, originTypeNode);
        let name = Node.isPropertyNamed(node) ? node.getName() : '';
        const typeNode = Node.isTypeAliasDeclaration(node) ? node.getTypeNode() : node;
        let value = context.convert(typeNode).value;
        if (Node.isGetAccessorDeclaration(node)) {
            const returnType = node.getStructure().returnType;
            name = `get ${name}`;
            value = `${name}(): ${returnType}`;
        } else if (Node.isSetAccessorDeclaration(node)) {
            const params = node.getStructure().parameters[0];
            name = `set ${name}`;
            value = `${name}(${params.name}: ${params.type})`;
        }
        const kind = ConverterUtils.getSyntaxKindNameFromNode(typeNode);
        const hasQuestionToken = Node.isQuestionTokenable(node) ? node.hasQuestionToken() : false;
        const required = !(ConverterUtils.getTypeFromNode(typeNode).isNullable() || hasQuestionToken);
        prop = {
            kind,
            name,
            comment,
            value,
            from,
            required,
        };
    } else {
        console.warn(`[Converter.mapSingleMember] Unsupported kind=${nKind}`);
    }
    return prop;
}

function extractMembers(originTypeNode: Node, type: Type, context: IConverterContext): TTypeProp[] | undefined {
    const props = type.getProperties();
    if (props.length > 0) {
        const propsUnsorted: TTypeProp[] = props.map((symb) => {
            const decls = symb.getDeclarations();
            const node = decls[0];
            return mapSingleMember(originTypeNode, node, context);
        });
        return sortProps(propsUnsorted);
    }
}
