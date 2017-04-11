// proceeds to the next step
PS_Cover.Tutorial.next = function () {
  document.getElementById('tutorial-button-next').disabled = true;

  PS_Cover.Tutorial.focus();
  PS_Cover.Tutorial.progress++;
  PS_Cover.Tutorial.focus();

  PS_Cover.Tutorial.msg.firstChild.innerHTML = PS_Cover.Tutorial.step[PS_Cover.Tutorial.progress].message;

  var percent = ((PS_Cover.Tutorial.progress / PS_Cover.Tutorial.quota) * 100).toFixed(2),
      step = PS_Cover.Tutorial.step[PS_Cover.Tutorial.progress];

  PS_Cover.Tutorial.bar.innerHTML = '<div id="tutorial-progress-bar" style="width:' + percent + '%;"></div>'+
                                    '<div id="tutorial-progress-text">' + percent + '%</div>';

  if (step.condition) {
    step.condition();
  } else {
    window.setTimeout(function() {
      document.getElementById('tutorial-button-next').disabled = false;
    }, 1000);
  }
};


// toggle focus on an element or elements in a step
PS_Cover.Tutorial.focus = function () {
  var step = PS_Cover.Tutorial.step[PS_Cover.Tutorial.progress];

  if (step && step.focus) {
    for (var a = document.querySelectorAll(step.focus.selectors), i = 0, j = a.length; i < j; i++) {
      a[i].dataset.tutorialFocus = a[i].dataset.tutorialFocus == 'true' ? '' : true;

      if (step.focus.position) {
        a[i].style.position = a[i].style.position ? '' : step.focus.position;
      }

      if (step.focus.noclick) {
        a[i].dataset.tutorialNoclick = a[i].dataset.tutorialNoclick == 'true' ? '' : true;
      }
    }

    if (step.focus.jump) {
      document.body.scrollTop = a[0].offsetTop - 210;
    }

    if (step.focus.event) {
      for (var a = document.querySelectorAll(step.focus.event), i = 0, j = a.length; i < j; i++) {
        a[i].dataset.tutorialEvent = a[i].dataset.tutorialEvent == 'true' ? '' : true;
      }
    }
  }
};


// listen for a specific change
PS_Cover.Tutorial.listen = function (listener) {
  if (!PS_Cover.Tutorial.listener) {
    PS_Cover.Tutorial.listener = window.setInterval(function() {
      listener(function() {
        window.clearInterval(PS_Cover.Tutorial.listener);
        delete PS_Cover.Tutorial.listener;
      });
    }, 100);
  }
};


// all steps in the tutorial
PS_Cover.Tutorial.step = [
  {
    message : 'Welcome to the PS4 Cover Generator Tutorial! This tutorial will walk you through the basics of using the PS4 Cover Generator. Click the button below to proceed to the next step.'
  },


  {
    message : 'See the big canvas below? This is where you\'ll work on your Cover Image. Any changes you make to your Cover will be displayed here. Click the NEXT button to find out how to edit this canvas.',

    focus : {
      selectors : '#ps4-cover-photo',
      position : 'relative',
      jump : true
    }
  },


  {
    message : 'Welcome to the toolbox! This is where you\'ll make changes to the canvas, such as adding your favorite character, changing colors, adding text, and more..! How about we create a simple cover image to get you started? Go ahead and click the NEXT button to continue.',

    focus : {
      selectors : '#cover-tools',
      noclick : true
    }
  },


  {
    message : 'To get started, we first need to clear the canvas by deleting all existing layers. Click the "DELETE ALL" button in the toolbox to delete all the layers so we can start fresh!',

    focus : {
      selectors : '#cover-tools',
      event : '#delete-all',
      noclick : true
    },

    condition : function () {
      var del = document.querySelector('.tools-delete'),
          delTuto = function () {
            PS_Cover.deleteLayers(true);
            this.removeEventListener('click', delTuto);
            this.setAttribute('onclick', this.dataset.onclick);
            PS_Cover.Tutorial.next();
          };

      del.dataset.onclick = del.getAttribute('onclick');
      del.setAttribute('onclick', 'return false');

      del.addEventListener('click', delTuto);
    }
  },


  {
    message : 'Well done! You deleted all the existing layers from the canvas. Now it\'s time to add your own personal touch! Click the "ADD IMAGE" button to open up the image selector and add an image to the canvas. Choose anything you want!',

    focus : {
      selectors : '#cover-tools',
      event : '#add-image',
      noclick : true
    },

    condition : function () {
      PS_Cover.Tutorial.listen(function(stop) {
        var layer = document.querySelector('.image-layer');

        if (layer && layer.querySelector('.main-input').value) {
          stop();
          PS_Cover.Tutorial.next();
        }
      });
    }
  },


  {
    message : 'Nice choice! Now that you have an image on the canvas things are starting to feel less empty. Once you\'re done admiring your handiwork, click the NEXT button to learn about layers and their controls.',

    focus : {
      selectors : '#ps4-cover-photo',
      position : 'relative',
      jump : true
    }
  },


  {
    message : 'Layers consist of three sections : The main input field, controls, and tools. We\'ll go over each section and their sub-options to get you familiar with how things work. Click the NEXT button to learn more.'
  },


  {
    message : 'This is the main input field, it allows you to insert text, links, or select options from a predefined list. In this input field we can insert direct image links from the web or the image selector.',

    focus : {
      selectors : '#cover-tools',
      event : '.cover-image',
      noclick : true
    }
  },


  {
    message : 'Sometimes main input fields will have additional options like, colors, fill, or in your case a search button for images. Clicking this button will open the image selector so you can choose another image. Go ahead and click it if you want a brand new image, otherwise click the NEXT button to move on.',

    focus : {
      selectors : '#cover-tools',
      event : '.image-caller',
      noclick : true
    }
  },


  {
    message : 'This little area is the layer controls. It allows you to rotate, move, change the stack order of, and delete the layer.',

    focus : {
      selectors : '#cover-tools',
      event : '.layer-controls',
      noclick : true
    }
  },


  {
    message : 'These two buttons rotate the layer. The first button freely rotates the layer, whereas the second button snap rotates the layer 90 degees. Go ahead and click these buttons to get a feel for how they work. When you\'re done spinning around, click the NEXT button to move on.',

    focus : {
      selectors : '#cover-tools',
      event : '.layer-rotate-box a',
      noclick : true
    }
  },


  {
    message : 'These four buttons move the layer in the direction they\'re pointing. Don\'t like where your image is? Want to move it somewhere else? Then click and hold down the ' + ( PS_Cover.isPS4 ? '<i class="ps-button cross"></i>' : 'Mouse' ) + ' Button on one of these buttons to move it! Seriously though, play around with these buttons to get acquainted with them, because they\'re gonna be your best friends. When you\'re finished playing with your new BFFs, click the NEXT button to move on.',

    focus : {
      selectors : '#cover-tools',
      event : '.arrow-box a',
      noclick : true
    }
  },


  {
    message : 'These buttons change the stack order of the layers. For example, the topmost layer is shown on top of everything and the bottommost layer is covered by everything else. If you want to bring a layer to the front so it\'s not covered by anything, click these buttons to change the stack order of each layer. Go ahead and show this square who\'s boss by bringing your image back to the front!',

    focus : {
      selectors : '#cover-tools',
      event : '.image-layer .layer-move-box a',
      noclick : true
    },

    condition : function () {
      PS_Cover.add('shape', {
        x : 0,
        y : 0,
        noScroll : 1,
        width : PS_Cover.canvas.width,
        height : PS_Cover.canvas.height
      });

      var image = document.querySelector('.image-layer'),
          moveTuto = function () {
            this.removeEventListener('click', moveTuto);
            PS_Cover.Tutorial.next();
          };

      document.getElementById('cover-tools').scrollTop = image.offsetTop - 3;
      image.querySelector('.fa-sort-asc').addEventListener('click', moveTuto);
    }
  },


  {
    message : 'Great job! You really showed that square who\'s boss! Let\'s teach it one more lesson by deleting it from our Cover Image. See that cross? Clicking it will delete the layer. Go ahead and take out the trash!',

    focus : {
      selectors : '#cover-tools',
      event : '.shape-layer .layer-controls .fa-times',
      noclick : true
    },

    condition : function () {
      var del = document.querySelector('.shape-layer .layer-controls .fa-times');

      del.setAttribute('onclick', 'return false');
      del.addEventListener('click', function () {
        PS_Cover.deleteLayer(this, true);
        PS_Cover.Tutorial.next();
      });
    }


  },


  {
    message : 'Phew, thanks for taking care of that rogue square! Just now you learned how to use the layer controls, while also saving your Cover Image from invading squares. Are you ready to learn about the more advanced tools? Click NEXT if you are, if not go get a snack and take a short break.',

    focus : {
      selectors : '#ps4-cover-photo',
      position : 'relative',
      jump : true
    }
  },


  {
    message : 'Last but not least is the layer tools! These tools, depending on the layer, allow you to adjust the opacity, scale, raw coordinates, and more. Go ahead and play with these tools to see how they work. If you\'re not sure what something does, click the blue icons for a hint. When you\'re done playing around, click the NEXT button to move on.',

    focus : {
      selectors : '#cover-tools',
      event : '.cover-input-tools input, .cover-input-tools a',
      noclick : true
    }
  },


  {
    message : 'That about sums up all I can teach you about layers. Kudos to you for putting up with me this long! How\'s your Cover looking so far? Good? Bad? Missing Something? How about we change the background color in the canvas settings? Click the NEXT button to learn about some of the canvas settings.',

    focus : {
      selectors : '#ps4-cover-photo',
      position : 'relative',
      jump : true
    }
  },


  {
    message : 'The canvas settings allow you to adjust some basic settings for the canvas, such as the background color. Click the color palette to pick a new background color for your Cover Image.',

    focus : {
      selectors : '#cover-tools',
      event : '.color-inpicker-box',
      noclick : true
    },

    condition : function () {
      document.getElementById('cover-tools').scrollTop = 0;

      var bg = document.getElementById('cover-bg-color'),
          oldVal = bg.value;

      PS_Cover.Tutorial.listen(function(stop) {
        if (bg.value != oldVal) {
          stop();
          PS_Cover.Tutorial.next();
        }
      });
    }
  },


  {
    message : 'Your Cover Image is looking FAB-U-LOUS with that new coat of paint! But how would it look on your profile? Hmm....',

    focus : {
      selectors : '#ps4-cover-photo',
      position : 'relative',
      jump : true
    }
  },


  {
    message : 'If you want to preview how your Cover Image would look on an actual Profile, then all you need to do is click the "Show Demo Profile" checkbox. Go ahead and click it to see how your Cover Image would look once applied to someones profile.',

    focus : {
      selectors : '#cover-tools',
      event : '.pseudo-checkbox',
      noclick : true
    },

    condition : function () {
      document.getElementById('cover-tools').scrollTop = 0;

      var demo = document.getElementById('cover-show-profile');
      demo.checked = false;

      PS_Cover.Tutorial.listen(function(stop) {
        if (demo.checked) {
          stop();
          PS_Cover.Tutorial.next();
        }
      });
    }
  },


  {
    message : 'Lookin\' good, right? We\'ve come a long way, so let\'s finish up by adding some text to your Cover Image and really personalize it! C\'mon click NEXT!',

    focus : {
      selectors : '#ps4-cover-photo, #ps4-demo-profile',
      position : 'relative',
      jump : true
    }
  },


  {
    message : 'Go ahead and click the "ADD TEXT" button to add a text layer to your Cover Image.',

    focus : {
      selectors : '#cover-tools',
      event : '#add-text',
      noclick : true
    },

    condition : function () {
      document.getElementById('cover-show-profile').checked = false;
      document.getElementById('ps4-demo-profile').className = 'hidden';
      document.getElementById('cover-tools').scrollTop = 0;

      PS_Cover.Tutorial.listen(function(stop) {
        if (document.querySelector('.text-layer')) {
          stop();
          PS_Cover.Tutorial.next();
        }
      });
    }
  },


  {
    message : 'Nice! Now we\'ve got a text layer to work with. Go ahead and add some text in the input field, like your username or whatever comes to mind. Once you\'ve got some text on your Cover, click NEXT to move on.',

    focus : {
      selectors : '#cover-tools',
      event : '.cover-text',
      noclick : true
    },

    condition : function () {
      var next = document.getElementById('tutorial-button-next');

      document.querySelector('.cover-text').addEventListener('keyup', function() {
        if (this.value && next.disabled) {
          next.disabled = false;
        } else if (!this.value && !next.disabled) {
          next.disabled = true;
        }
      });
    }
  },


  {
    message : 'Catchy! Okay, go ahead and select your favorite color for the text or just leave it as is. Click the NEXT button when you\'re ready to move on.',

    focus : {
      selectors : '#cover-tools',
      event : '.text-layer .color-inpicker-box',
      noclick : true
    }
  },


  {
    message : 'Now let\'s spruce up that text with a new look. Pick a new font from the drop down ; it can be any font you want! When you\'re ready to move on, click the NEXT button.',

    focus : {
      selectors : '#cover-tools',
      event : '.cover-input-font',
      noclick : true
    }
  },


  {
    message : 'Alright we\'re almost done, adjust the font size if you want to make the text bigger or smaller. Click the NEXT button When you\'re finished.',

    focus : {
      selectors : '#cover-tools',
      event : '.cover-input-size',
      noclick : true
    }
  },


  {
    message : 'For the last step, let\'s adjust the position of your text. Use the arrows to move the text wherever you want! Once you\'ve got it in a position you\'re happy with, click the NEXT button.',

    focus : {
      selectors : '#cover-tools',
      event : '.text-layer .arrow-box a',
      noclick : true
    }
  },


  {
    message : 'Your cover image is looking fantastic! Take a step back and admire your beautiful work.. when you\'re done being awestruck, click the NEXT button and we\'ll learn how to generate your Cover Image.',

    focus : {
      selectors : '#ps4-cover-photo',
      position : 'relative',
      jump : true
    }
  },


  {
    message : 'First things first, let\'s close the toolbox so we can get a better view of things.',

    focus : {
      selectors : '#cover-tools-title',
      event : '#cover-tools-title'
    },

    condition : function () {
      var title = document.getElementById('cover-tools-title');

      PS_Cover.Tutorial.listen(function (stop) {
        if (title.className == 'hidden') {
          stop();
          PS_Cover.Tutorial.next();
        }
      });
    }
  },


  {
    message : 'Congratulations! You\'ve finished the PS4 Cover Generator tutorial! Well, almost. The last thing you have to do is generate your Cover Image. After that you\'re ready to graduate to making Cover images on your own. Just remember I\'m here if you ever need a refresher or someone to keep you company.',

    focus : {
      selectors : '#generate-cover',
      event : '#download-ps4-cover',
      position : 'relative',
      jump : true
    },

    condition : function () {
      function Graduate () {
        var parent = this.parentsUntil('#generate-cover');

        document.body.className = document.body.className.replace('inTutorial', '');
        document.body.removeChild(PS_Cover.Tutorial.overlay);
        document.body.removeChild(PS_Cover.Tutorial.msg);

        PS_Cover.Tutorial.confirmed = false;
        delete PS_Cover.Tutorial.overlay;
        delete PS_Cover.Tutorial.bar;
        delete PS_Cover.Tutorial.msg;

        parent.style.position = '';
        parent.dataset.tutorialFocus = '';
        this.dataset.tutorialEvent = '';
        this.removeEventListener('click', Graduate);
      };

      document.getElementById('download-ps4-cover').addEventListener('click', Graduate);
    }
  }
];