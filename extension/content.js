/**
 * This extension short circuits the semi fullscreen videos on facebook, so they go straight to complete fullscreen
 * And when exiting they go straight to the newsfeed again
 */
setInterval(function () {
  // Reselect all fullscreen buttons every 500ms
  var $enlargeButtons = $('button[data-tooltip-content="Click to enlarge"]');

  $enlargeButtons.off('click', registerFullscreenShortcut); // Remove the old event listeners
  $enlargeButtons.on('click', registerFullscreenShortcut);
}, 500);

function registerFullscreenShortcut() {
  // Wait for enlarge dialog to initialize
  setTimeout(function () {
    // Click on complete fullscreen button
    var $fullscreenButton = $('button[data-tooltip-content="Click to enter fullscreen"]');

    if ($fullscreenButton.length > 1) {
      console.warn('enter fullscreen selector selected more than 1 element');
    }

    $fullscreenButton.trigger('click');

    // Wait for fullscreen to initialize
    setTimeout(function () {
      // Also register the exit fullscreen button click, so we can go back to the news feed
      // Tooltip didn't update yet => select for enter fullscreen button to get the exit fullscreen button
      var $exitFullscreenButton = $('button[data-tooltip-content="Click to enter fullscreen"]');

      if ($exitFullscreenButton.length > 1) {
        console.warn('exit fullscreen selector selected more than 1 element');
      }

      $exitFullscreenButton.on('click', function () {
        // Wait for fullscreen to close and enlarge dialog to become visible
        setTimeout(function () {
          window.history.back();
        }, 200);
      })
    }, 200);

  }, 200);
}

