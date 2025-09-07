import { useState } from "react";

const Folder = ({ handleInsertNode,explorer }) => {
    const [expand, setExpand] = useState(false);
    const [newFolderOrFile, setNewFolderOrFile] = useState(
        {
            visible: false,
            isFolder: null
        }
    );
    const handleAddFolder = (e, isFolder) => {
        e.stopPropagation();
        setNewFolderOrFile({ visible: true, isFolder })
        setExpand(true);
    }

    const addFolder = (e) => {
       
       //The below if loop was not working as earlier I was doing '13' instead of 13 
        if (e.keyCode === 13 && e.target.value) {
            //Since Folder component is called recursively,explorer.id is getting changed
            //In this example, first id was 1(for root), then 2(for src) etc...
            handleInsertNode(explorer.id,e.target.value,newFolderOrFile.isFolder);
            setNewFolderOrFile({...newFolderOrFile,visible:false})
        }
    }
    return (
        <div className="explorer">
            <div className="parent">
                {/* Conditional rendering for folder */}
                {explorer.isFolder && (
                    <div className="folder"  onClick={() => setExpand(!expand)}>
                        <span>📁 {explorer.name}</span>
                        <div className="addOptions">
                            <button onClick={(e) => {
                                handleAddFolder(e,true);
                            }}>Folder +</button>
                            <button onClick={(e) => {
                                handleAddFolder(e,false);
                            }}>File +</button>
                        </div>
                    </div>
                )
                }
                {/* Conditional rendering for file */}
                {!explorer.isFolder && <span>📄 { explorer.name}</span>}

            </div>   
            <div className="child">
                {/* Add html for adding a new folder or file */}
                {
                    newFolderOrFile.visible && (
                        <div className="newFolder" style={{paddingLeft: '20px'} }>
                            <span>{newFolderOrFile.isFolder ? '📁' : '📄'}</span>
                            <input type="text"
                                autoFocus
                                onKeyDown={addFolder}
                                onBlur={() => {
                                    setNewFolderOrFile({...newFolderOrFile,visible:false})
                                }}
                            />
                        </div>
                    )
                }
                {
                    explorer.items.map((exp) => {
                        return <span style={{ display: expand ? 'block' : 'none', paddingLeft: '20px' }} key={exp.id}>
                            {/* We are passing handleInsertNode inside this Folder component for the recursive call */}
                            <Folder handleInsertNode={ handleInsertNode} explorer={exp} />
                        </span>
                    })
                }
            </div>
     </div>
 )
}
export default Folder;