export interface FolderProps {
    treeNode : chrome.bookmarks.BookmarkTreeNode;
    internalDrag : boolean;
    updateTree : (...args : any) => void;
    forceUpdateCallback : (...args : any) => void;
    setInternalDrag : (value : boolean) => void;
    index : number[];
}