import { useState } from "react";
import explorer from "./utils/data";
import Folder from "./components/Folder";
import useTreeTraversal from "./hooks/useTreeTraversal";
function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode } = useTreeTraversal();

  const handleInsertNode = (folderId, itemName, isFolder) => {
    const finalTree = insertNode(explorerData,folderId, itemName, isFolder);
    setExplorerData(finalTree);
  }

  return (
    <div className="App">
      <Folder handleInsertNode={handleInsertNode} explorer={ explorer} />
    </div>
  );
}

export default App;
