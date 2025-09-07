const useTreeTraversal = () => {
    const insertNode = (tree, folderId, itemName, isFolder) => {

        //This section is only for adding value to the root and hence folderId is only compared to
        //root's id 
        if (tree.id === folderId && tree.isFolder) {
            //Since the new folder or file will be added in the items array only
            tree.items.unshift({
                id: Math.floor(Math.random() * 100),
                name:itemName,
                isFolder,
                items:[]
            })
            return tree;
        }

        //This section is for adding folder/files in the nested folders which are part of items object
        let finalTree = [];
        finalTree = tree.items.map((obj) => {
            return insertNode(obj,folderId,itemName, isFolder);
        })
        return {...tree,items:finalTree}
    }
    return {insertNode}
}

export default useTreeTraversal;