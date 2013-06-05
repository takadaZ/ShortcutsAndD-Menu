
opt =
  canBubble: true
  cancelable: false
  view: document.defaultView
  keyIdentifier: ""
  ctrlKey: false
  altKey: false
  shiftKey: false
  metaKey: false
  altGraphKey: false

kbdEvent = new KeyboardEvent "keydown",
  opt.canBubble
  opt.cancelable
  opt.view
  opt.keyIdentifier
  opt.ctrlKey
  opt.altKey
  opt.shiftKey
  opt.metaKey
  opt.altGraphKey

document.dispatchEvent(kbdEvent)
