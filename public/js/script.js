/**
  * @author David Carvajal Bonilla
  * @desc This file is used to handle all the javascript of the page
*/

document.addEventListener("DOMContentLoaded", function(event) {
  var url = 'http://localhost:3000/api/nav.json';
  _httpGetAsync(url, _nav_process);
});

/**
 *
 */
  * @desc function to generate the navbar from a json
  * @param json $response - the data returnned by the XMLHttpRequest
  * @return does not return nothing
*/
function _nav_process(response){
  var menu_id = 'd-navbar';
  var menu = document.getElementById(menu_id)
  var menu_data = response.items;
  for (var i = 0; i < menu_data.length; i++) {
    // Process each of the json elements
    var label = menu_data[i].label;
    var url = menu_data[i].url;
    // Custom function to process each leaf of the menu
    menuElement = _nav_process_leaf(menu, label, url, menu_data[i]);
  }
  Array.from(document.getElementsByClassName("leaf")).forEach(
      function(element, index, array) {
          element.addEventListener("click", function(e){
            remove_active_menu_leaf();
          });
      }
  );
  Array.from(document.getElementsByClassName("with-submenu")).forEach(
      function(element, index, array) {
          element.addEventListener("click", function(e){
            e.preventDefault();
            remove_active_menu_leaf();
            var current_submenu = this.querySelector('ul');
            this.classList.add('submenu-active');
          });
      }
  );
  toggle_mask();
}

/**
  * @desc process and create each leaf of a menu
  * @param element object $menu - represents the menu Element node
  * @param string $label - title and html text of the hyperlink
  * @param string $url - href of the hyperlink
  * @param boolean $submenuFlag - flag true if the leaf has submenu
  * @return element object of the menu li created
*/
function _nav_process_leaf(menu, label, url, leafdata){
  // Create an empty leaf and proceed to append the refered menu
  var menuElement = document.createElement("li");
  menuElement.classList.add("leaf");
  menu.appendChild(menuElement);

  // Create the hyperlink element with the data requested
  var menuLink = document.createElement("a");
  menuLink.setAttribute("href", url);
  menuLink.innerHTML = label;
  menuElement.appendChild(menuLink);
  if(leafdata.items){
      // create a submenu if the current leaf contains subleafs
      if(leafdata.items.length > 0){
        var menuIconUp = document.createElement("i");
        menuIconUp.classList.add("chevron");
        menuIconUp.classList.add("chevron-up");
        menuIconUp.classList.add("hidden-sm-up");
        menuLink.appendChild(menuIconUp);
        var menuIconDown = document.createElement("i");
        menuIconDown.classList.add("chevron");
        menuIconDown.classList.add("chevron-down");
        menuIconDown.classList.add("hidden-sm-up");
        menuLink.appendChild(menuIconDown);
        menuElement.classList.add("with-submenu");
        var submenu = document.createElement("ul");
        submenu.classList.add("submenu");
        menuElement.appendChild(submenu);
        for (var j = 0; j < leafdata.items.length; j++) {
          // Process each of the submenu items
          var submenu_label = leafdata.items[j].label;
          var submenu_url = leafdata.items[j].url;
          submenuElement = _nav_process_leaf(submenu, submenu_label, submenu_url, leafdata.items[j]);
        }
      }
  }
  return menuElement;
}

/**
  * @desc make a get request using vanilla javascript
  * @param string $theUrl - the get url with the data
  * @param function callback - the function that will process the asynchronous response
  * @return does not return nothing
*/
function _httpGetAsync(theUrl, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(JSON.parse(xmlHttp.responseText));
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function remove_active_menu_leaf(){
  Array.from(document.getElementsByClassName("leaf")).forEach(
      function(element, index, array) {
        element.classList.remove("submenu-active");
      }
  );
}

function toggle_mask(){
  var content = document.getElementById("content-wrapper");
  var mask = document.getElementById("mask");
  _set_mask_height(content, mask);
  content.addEventListener("click", function(e){
    document.getElementById("nav-trigger").click();
  });
  Array.from(document.getElementsByClassName("with-submenu")).forEach(
      function(element, index, array) {
        element.addEventListener("mouseover", function(e){
           document.getElementById("mask").classList.add("active");
        });
      }
  );
  mask.addEventListener("click", function(e){
    this.classList.remove("active");
    remove_active_menu_leaf();
  });
}

function _set_mask_height(content, mask){
  var content = document.getElementById("content-wrapper");
  var contentHeight = "height: "+content.clientHeight+"px";
  mask.setAttribute("style", contentHeight);
}
