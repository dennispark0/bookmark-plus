export interface FolderState {
    expanded : boolean;
    allowDrop : boolean;
    newNode : string | null;
    newIndex : number | null;
    list : chrome.bookmarks.BookmarkTreeNode[] | undefined;
}