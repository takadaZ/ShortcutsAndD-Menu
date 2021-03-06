// Generated by CoffeeScript 1.6.3
(function() {
  var copyHist, frame;

  copyHist = JSON.parse(localStorage.copyHistory || null) || [];

  frame = document.querySelector(".frame");

  copyHist.forEach(function(item) {
    var div;
    frame.appendChild(div = document.createElement("div"));
    div.textContent = item;
    return div.addEventListener("click", function(event) {
      return chrome.runtime.sendMessage({
        action: "pasteText",
        value1: event.currentTarget.textContent
      }, function(msg) {
        return window.close();
      });
    });
  });

}).call(this);
