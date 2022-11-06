class Node{
    constructor(data){
        this.data = data
        this.left = null
        this.right = null
    }
}


class Tree{
    constructor(){
        this.root = null
    }

    buildTree(array, start, end){

        if (start > end){
            return null
        }
        
        let mid = parseInt((start + end)/2)
        let root = new Node(array[mid])

        root.left = this.buildTree(array, start, mid-1)
        root.right = this.buildTree(array, mid+1, end)

        return root
    }



    find(value, root = this.root) {
        if (root == null) return false;
    
        if (root.data == value) return root;
    
        if (root.data > value) {
          return this.find(value, root.left);

        } else if (root.data < value) {
          return this.find(value, root.right);
        }
    
        return root;
      }

    insert(value, root = this.root){
        if (root == null){
            return (root = new Node(value))
        }

        if (root.data < value){
            root.right = this.insert(value, root.right)
        } else {
            root.left = this.insert(value, root.left)
        }

        return root
    }

    removee(value, root = this.root){
        if (root == null){
            return root
        }

        if (value < root.data){
            root.left = this.removee(value, root.left)
        } else if (value > root.data){
            root.right = this.removee(value, root.right)
        }

        // if the value is the same as root's data, then this is the node to be deleted
        else {
            if (root.left == null){
                return root.right
            }
            else if (root.right == null){
                return root.left
            }

            // node with two children: Get the inorder successor (smallest in the right subtree)
            root.data = this.minValue(root.right);
            root.right = this.removee(root.right, root.data)
        }
        return root
    }

    minValue(root){
        let minv = root.data
        while (root.left != null){
            minv = root.left.data
            root = root.left
        }
        return minv
    }

    leveOrder(root){
        let queue = [];
        let result = [];
        
        if (root == null){
            return;
        }

        queue.push(root)
        

        while (queue.length > 0){
            let current = queue.shift(root);
            console.log(current.data)
            result.push(current.data)

            if (current.left !== null){
                queue.push(current.left)
            }
            if (current.right !== null){
                queue.push(current.right)
            }
        }
        return result
    }

    preOrder(root){
   
        if (root !== null){
            console.log(root.data)
            this.preOrder(root.left)
            this.preOrder(root.right)
        }
        
    }

    inOrder(root){
        if (root == null) {
            return;
        }
        if (root !== null){
            this.inOrder(root.left)
            console.log(root.data)
            this.inOrder(root.right)
        }
    }

    postOrder(root){
        if (root == null){
            return;
        }

        if (root !== null){
            this.postOrder(root.left)
            this.postOrder(root.right)
            console.log(root.data)
        }

    }

    maxDepth(root){
        let leftDepth;
        let rightDepth
        if (root == null){
            return 0;
        } else {
            leftDepth = this.maxDepth(root.left)
            rightDepth = this.maxDepth(root.right)
        }

        if (leftDepth > rightDepth){
            return (leftDepth + 1);
        } else {
            return (rightDepth + 1)
        }
    }

    depth(value, root = this.root){
        let dist = -1
        if (root == null){
            return -1
        }

        if ((root.data == value) || 
        (dist = this.depth(value, root.left)) >= 0 || 
        (dist = this.depth(value, root.right)) >= 0){
            return dist + 1
        }
    
        return dist;    
    }

    nodeHeight(value, root = this.root){
        let height = -1
        
        if (root == null){
            return -1 
        } 

        let leftHeight = this.nodeHeight(value, root.left)
        let rightHeight = this.nodeHeight(value, root.right)

        let ans = Math.max(leftHeight, rightHeight) + 1
        
        if (root.data == value){
            height = ans
        }

        return ans
    }

    

    isBalanced(root = this.root){
        if (root === null){
            return false;
        }
        let lh = this.isBalanced(root.left);
        if(lh == -1){
            return -1
        }
        let rh = this.isBalanced(root.right);
        if(rh == -1){
            return -1
        }
        if (Math.abs(lh - rh) > 1){
            return -1
        } else {
            return Math.max(lh, rh) + 1;
        }

        
    };

    traverse(array, root = this.root){
        if(array !== undefined){
            array.push(root.data)
        }
        if( root.left !== null){
            this.traverse(array, root.left)
        }
        if (root.right !== null){
            this.traverse(array, root.right)
        }
        return array;
    }

    // rebalance(){
    //     if (this.isBalanced(this.root) > 0){
    //         return this.root
    //     } else {
    //         let rebalanceArray = [];
    //         rebalanceArray = this.traverse(rebalanceArray, this.root)

    //         let balancedTree = new Tree(rebalanceArray)

    //         return balancedTree.root
    //     }
    // }
}



const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }





  let myArray = [1, 2, 3, 4, 5, 6, 7]

  let bt = new Tree()
  let n = myArray.length

  let newBt = new Tree()
  newBt.root = new Node(4)
  newBt.insert(6, newBt.right)
  newBt.insert(3, newBt.left)
  newBt.insert(120, newBt.right)
  newBt.insert(130, newBt.left)
  newBt.insert(125, newBt.right)

  console.log(newBt)
  prettyPrint(newBt.root)
  console.log(newBt.isBalanced(newBt.root))
  console.log(newBt.rebalance())


  

  prettyPrint(bt.buildTree(myArray, 0, n - 1))

console.log(bt.insert(8, bt.buildTree(myArray, 0, n - 1)))
console.log(bt.removee(8, bt.buildTree(myArray, 0, n - 1)))



let binaryTree = bt.buildTree(myArray, 0, n - 1)


console.log('level order')
console.log(bt.leveOrder(binaryTree))
console.log('---------------------------')

console.log('Pre Order')
console.log(bt.preOrder(binaryTree))
console.log('---------------------------')

console.log('In Order')
console.log(bt.inOrder(binaryTree))

console.log('---------------------------')

console.log('Post Order')
console.log(bt.postOrder(binaryTree))

console.log(bt.maxDepth(binaryTree))

console.log('Depth of node 7: ',bt.depth(7, binaryTree))

console.log('Height of node 7: ', bt.nodeHeight(2, binaryTree))

console.log(bt.isBalanced(binaryTree))


if (newBt.isBalanced(newBt.root) > 0){
    console.log('balance')
} else {
    console.log('not balanced')
}

