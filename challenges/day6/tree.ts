import { TemporaryMap } from './parser';

export class Tree {
  public name: string;
  public children: Tree[] = [];
  public parent: Tree | null = null;

  constructor(name: string) {
    this.name = name;
  }

  addChild(name: string) {
    const child = new Tree(name);
    child.parent = this;
    this.children.push(child);
  }

}

export const buildTree = (map: TemporaryMap, node: Tree = new Tree('COM')) => {
  if (!map[node.name]) {
    return node;
  }
  map[node.name].children.forEach(child => {
    node.addChild(child);
  });

  node.children.forEach((child) => {
    buildTree(map, child);
  });

  return node;
};

export const countAllOrbits = (tree: Tree) => {
  return countAllChildrensParents(tree);
};

export const findNumberOfOrbitalTransfers = (tree: Tree) => {
  const startNode = findNodeByName(tree, 'YOU') as Tree;
  const endNode = findNodeByName(tree, 'SAN') as Tree;
  const commonAncestor = findCommonAncestor(startNode, 'SAN') as Tree;
  return calculateDistance(startNode, endNode, commonAncestor);
};


const countParents = (tree: Tree): number => {
  if (!tree.parent) {
    return 0;
  } else {
    return 1 + countParents(tree.parent);
  }
};

const countAllChildrensParents = (tree: Tree): number => {
  return tree.children.reduce((sum, child) => {
    return sum + countParents(child) + countAllChildrensParents(child);
  }, 0);
};

const findNodeByName = (tree: Tree, name: string): Tree | null => {
  if (tree.name === name) {
    return tree;
  } else {
    return tree.children.reduce((match: Tree | null, child) => {
      const node = findNodeByName(child, name);
      return node || match
    }, null);
  }
};

const findCommonAncestor = (node: Tree, name: string) => {
  while (node.parent) {
    if (findNodeByName(node.parent, name)) {
      return node.parent;
    } else {
      node = node.parent;
    }
  }
  return null;
};

const calculateDistance = (node1: Tree, node2: Tree, ancestor: Tree) => {
  let count = 0;
  while (node1.parent !== ancestor) {
    count += 1;
    node1 = node1.parent as Tree;
  }

  while (node2.parent !== ancestor) {
    count += 1;
    node2 = node2.parent as Tree;
  }

  return count;
};
