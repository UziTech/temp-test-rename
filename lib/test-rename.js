'use babel';

import TestRenameView from './test-rename-view';
import { CompositeDisposable } from 'atom';

export default {

  testRenameView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.testRenameView = new TestRenameView(state.testRenameViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.testRenameView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'test-rename:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.testRenameView.destroy();
  },

  serialize() {
    return {
      testRenameViewState: this.testRenameView.serialize()
    };
  },

  toggle() {
    console.log('TestRename was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
