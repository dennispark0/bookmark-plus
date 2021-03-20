import React from 'react';
import './App.scss';
import Folder from './components/Folder/Folder';
import { AppState } from './AppState';
import 'bootstrap/dist/js/bootstrap.min';

const BOOKMARKS_BAR_ID = "1";
const OTHER_BOOKMARKS_ID = "2";
class App extends React.Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {

    };
    this.setBookmarkState();
    this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
  }

  rerenderParentCallback() {
    this.setBookmarkState();
  }

  render() {
    if (this.state.bookmarkBarNode && this.state.otherBookmarksNode) {
      return (
        <div className="App">
          <Folder forceUpdateCallback={this.rerenderParentCallback} index={[0]} updateTree={this.updateBookmarkBarTree} treeNode={this.state.bookmarkBarNode[0]}></Folder>
            <Folder forceUpdateCallback={this.rerenderParentCallback} index={[0]} updateTree={this.updateOtherBookmarksTree} treeNode={this.state.otherBookmarksNode[0]}></Folder>

        </div>
      );
    }
    return null;
  }

  updateBookmarkBarTree = (currentList: any, indices: number[]) => {
    if (this.state.bookmarkBarNode) {
      let temp = [...this.state.bookmarkBarNode];
      const _indices = [...indices];
      const firstIndex = _indices.pop();
      if (firstIndex!==undefined) {
        const arr = _indices.reduce((a, i) => a[i].children as any, temp);
        if(arr[firstIndex]){
          arr[firstIndex].children = currentList;
        }
        this.setState({ bookmarkBarNode: temp });
      }
    }
  }

  updateOtherBookmarksTree = (currentList: any, indices: number[]) => {
    if (this.state.otherBookmarksNode) {
      let temp = [...this.state.otherBookmarksNode];
      const _indices = [...indices];
      const firstIndex = _indices.pop();
      if (firstIndex!==undefined) {
        const arr = _indices.reduce((a, i) => a[i].children as any, temp);
        if(arr[firstIndex]){
          arr[firstIndex].children = currentList;
        }
        this.setState({ otherBookmarksNode: temp });
      }
    }
  }

  setBookmarkState() {
    chrome.bookmarks.getSubTree(BOOKMARKS_BAR_ID, (node) => {
      this.setState({ bookmarkBarNode: node });
    });
    chrome.bookmarks.getSubTree(OTHER_BOOKMARKS_ID, (node) => {
      this.setState({ otherBookmarksNode: node });
    });
  }

}

export default App;
