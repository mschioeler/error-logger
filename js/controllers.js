/***********************************************************************
 * App Controllers. These controllers will be called on page initialization. *
 ***********************************************************************/

myApp.controllers = {

  //////////////////////////
  // Tabbar Page Controller //
  //////////////////////////
  tabbarPage: function(page) {
    // Set button functionality to open/close the menu.
    //page.querySelector('[component="button/menu"]').onclick = function() {
    //  document.querySelector('#mySplitter').left.toggle();
    //};

    // Set button functionality to push 'new_task.html' page.
    Array.prototype.forEach.call(page.querySelectorAll('[component="button/new-task"]'), function(element) {
      element.onclick = function() {
        document.querySelector('#myNavigator').pushPage('html/new_task.html');
      };

      element.show && element.show(); // Fix ons-fab in Safari.
    });

    // Change tabbar animation depending on platform.
    page.querySelector('#myTabbar').setAttribute('animation', ons.platform.isAndroid() ? 'slide' : 'none');
  },

  ////////////////////////
  // Menu Page Controller //
  ////////////////////////
  menuPage: function(page) {
    // Set functionality for 'No Category' and 'All' default categories respectively.
    myApp.services.categories.bindOnCheckboxChange(page.querySelector('#default-category-list ons-list-item[category-id=""]'));
    myApp.services.categories.bindOnCheckboxChange(page.querySelector('#default-category-list ons-list-item:not([category-id])'));

    // Change splitter animation depending on platform.
    document.querySelector('#mySplitter').left.setAttribute('animation', ons.platform.isAndroid() ? 'overlay' : 'reveal');
  },

  ////////////////////////////
  // New Task Page Controller //
  ////////////////////////////
  newTaskPage: function(page) {
    // Set button functionality to save a new task.
    Array.prototype.forEach.call(page.querySelectorAll('[component="button/save-task"]'), function(element) {
      element.onclick = function() {

        var f1 = page.querySelector('#field1-input').value;
        var f2 = page.querySelector('#field2-input').value;
        var f3 = page.querySelector('#field3-input').value;
        var f4 = page.querySelector('#field4-input').value;
        var f5 = page.querySelector('#field5-input').checked;
        var f6 = page.querySelector('#field6-input').value;
        var f7 = page.querySelector('#field7-input').value;

        if (f1 && f2 && f3 && f4) {
          if (!f5 || (f5 && f6 && f7)) {
            myApp.services.tasks.create(
              {
                field1: f1,
                field2: f2,
                field3: f3,
                field4: f4,
                field5: f5,
                field6: f6,
                field7: f7,
                field8: page.querySelector('#field8-input').value,
                field9: page.querySelector('#field9-input').value,
                field10: page.querySelector('#field10-input').value,
                field11: page.querySelector('#field11-input').value,
                field12: page.querySelector('#field12-input').value
              }
            );
            // Set selected category to 'All', refresh and pop page.
            document.querySelector('#default-category-list ons-list-item ons-radio').checked = true;
            document.querySelector('#default-category-list ons-list-item').updateCategoryView();
            document.querySelector('#myNavigator').popPage();
          } else {
            // Show alert if the input title is empty.
            ons.notification.alert('Felterne Beskrivelse og Fejlmeddelelse skal udfyldes, hvis fejl.');
          }
        } else {
          // Show alert if the input title is empty.
          ons.notification.alert('Felterne Dato, Forestilling, Operatør og Klokkeslet skal udfyldes');
        }
      };
    });
  },

  ////////////////////////////////
  // Details Task Page Controller //
  ///////////////////////////////
  detailsTaskPage: function(page) {
    // Get the element passed as argument to pushPage.
    var element = page.data.element;
    var hasError = element.data.field5;
    // hide irrelevant error banner
    if (hasError) {
       page.querySelector('#no-error-banner').setAttribute('hidden');
    } else {
       page.querySelector('#error-banner').setAttribute('hidden'); 
       page.querySelector('#error-title').setAttribute('class', 'hidden');
       page.querySelector('#error-info').setAttribute('class', 'hidden');
    }
    // Fill the view with the stored data.
    page.querySelector('#field1-input').innerHTML = element.data.field1;
    page.querySelector('#field2-input').innerHTML = element.data.field2;
    page.querySelector('#field3-input').innerHTML = element.data.field3;
    page.querySelector('#field4-input').innerHTML = element.data.field4;
    page.querySelector('#field5-input').checked = element.data.field5;
    page.querySelector('#field6-input').innerHTML = element.data.field6;
    page.querySelector('#field7-input').innerHTML = element.data.field7;
    page.querySelector('#field8-input').innerHTML = element.data.field8;
    page.querySelector('#field9-input').innerHTML = element.data.field9;
    page.querySelector('#field10-input').innerHTML = element.data.field10;
    page.querySelector('#field11-input').innerHTML = element.data.field11;
    page.querySelector('#field12-input').innerHTML = element.data.field12;
  }
};
