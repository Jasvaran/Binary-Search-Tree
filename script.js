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

    remove(value, root = this.root){
        if (root == null){
            return root
        }

        
    }

    
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
//   prettyPrint(bt.buildTree(myArray, 0, n - 1))

console.log(bt.insert(8, bt.buildTree(myArray, 0, n - 1)))

