// create node
class Node {
    value = null;
    right = null;
    left = null;
    constructor(data) {
        this.value = data;
    }
}

// insert data
class BinaryInsertion {
    root = null;
    constructor() {

    }

    insert(value) {
        if(!this.root) {
            this.root = new Node(value);
        } else {
            this.insertNode(this.root, value)
        }
        return this;
    }

    insertNode(current, value) {
        if(value < current.value) {
            if(!current.left) {
                current.left = new Node(value);
            } else {
                this.insertNode(current.left, value)
            }
        } else {
            if(!current.right) {
                current.right = new Node(value);
            } else {
                this.insertNode(current.right, value)
            }
        }
    }
}

class BinarySearch {
    contains(root, value) {
        if(!root) {
            return false;
        }
        if(root.value === value) {
            return true;
        } else if(value < root.value) {
            return this.contains(root.left, value);
        } else {
            return this.contains(root.right, value);
        }
    }
}

class BinaryHeight {

    maxDepth(node) {
        if(!node) {
            return 0;
        } else {
            const lDepth = this.maxDepth(node.left);
            const rDepth = this.maxDepth(node.right);

            if(lDepth > rDepth) {
                return (lDepth + 1);
            } else {
                return (rDepth + 1);
            }
        }
    }

    nodeFromRoot(node, k) {
       debugger;
       if(!node) {
           return null;
       } else {
           if(node === k) {
               console.log()
           } else {

           }
       }
    }
}

const binary = new BinaryInsertion();
binary.insert(1);
binary.insert(2);
binary.insert(4);
binary.insert(-1);

const counter = new BinaryHeight();
//console.log(counter.maxDepth(binary.root));
console.log(counter.nodeFromRoot(binary.root, 2));

// const binarySearch = new BinarySearch();
// binarySearch.contains(binary.root, -2);
