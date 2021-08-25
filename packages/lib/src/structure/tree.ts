import { isArray } from 'common';
import { SingleOrArray } from 'types';

type ChildrenDesc = SingleOrArray<string | number>;
type TreeNode<PropType> = Record<string | number | symbol, PropType>;

/**
 * 将树里的数据筛选收集成数组
 *
 * TODO: SPEC
 *
 * @function collectInTree
 * @author czzczz
 * @template PropType
 * @param {TreeNode<PropType>} root
 * @param {ChildrenDesc} childrenProp
 * @param {(node: TreeNode<PropType>) => boolean} [toCollect= () => true]
 * @returns {any}
 */
export function collectInTree<PropType = unknown>(
	root: TreeNode<PropType>,
	childrenProp: ChildrenDesc,
	toCollect: (node: TreeNode<PropType>) => boolean = () => true,
): TreeNode<PropType>[] {
	const res: TreeNode<PropType>[] = [];
	const inner = (root: TreeNode<PropType>) => {
		if (toCollect(root)) res.push(root);
		let childList: TreeNode<PropType>[] = [];
		if (isArray(childrenProp)) childList = childrenProp.map(k => root[k] as unknown as TreeNode<PropType>);
		else {
			const list = root[childrenProp] as unknown as SingleOrArray<TreeNode<PropType>>;
			if (isArray(list)) childList = list;
			else childList = [list];
		}
		childList.forEach(inner);
	};
	inner(root);
	return res;
}
