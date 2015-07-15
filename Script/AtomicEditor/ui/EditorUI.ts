
import MainFrame = require("../ui/MainFrame");
import ModalOps = require("./modal/ModalOps");

// this is designed with public get functions to solve
// circular dependency issues in TS

var editorUI:EditorUI;

export function getMainFrame():MainFrame {
  return editorUI.mainframe;
}

export function getModelOps():ModalOps {
  return editorUI.modalOps;
}

export function getView():Atomic.UIView {
  return editorUI.view;
}

export function initialize() {
  editorUI = new EditorUI();
}

export function showModalError(windowText:string, message:string) {
  editorUI.showModalError(windowText, message);
}


class EditorUI extends Atomic.ScriptObject {

  constructor() {

    super();

    var graphics = Atomic.getGraphics();

    this.view = new Atomic.UIView();

    this.mainframe = new MainFrame();

    this.view.addChild(this.mainframe);

    // set initial size
    this.mainframe.setSize(graphics.width, graphics.height);

    this.modalOps = new ModalOps();

  }

  showModalError(windowText:string, message:string)
  {
      var window = new Atomic.UIMessageWindow(this.view, "modal_error");
      window.show(windowText, message, 640, 360);
  }

  view: Atomic.UIView;
  mainframe: MainFrame;
  modalOps: ModalOps;

}
