/**
  * @author David Carvajal Bonilla
  * @desc This file is used to handle all the javascript of the page
*/
document.addEventListener("DOMContentLoaded", function(event) {
  var url = 'http://localhost:3000/api/nav.json';
  _httpGetAsync(url, _nav_process);
});

/**
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
    menuElement = _nav_process_leaf(menu, label, url);
    if (menu_data[i].items.length > 0) {
      // create a submenu if the current leaf contains subleafs
      var submenu = document.createElement("ul");
      menuElement.appendChild(submenu);
      for (var j = 0; j < menu_data[i].items.length; j++) {
        // Process each of the submenu items
        var submenu_label = menu_data[i].items[j].label;
        var submenu_url = menu_data[i].items[j].url;
        submenuElement = _nav_process_leaf(submenu, submenu_label, submenu_url);
      }
    }
  }
}

/**
  * @desc process and create each leaf of a menu
  * @param element object $menu - represents the menu Element node
  * @param string $label - title and html text of the hyperlink
  * @param string $url - href of the hyperlink
  * @return element object of the menu li created
*/
function _nav_process_leaf(menu, label, url){
  // Create an empty leaf and proceed to append the refered menu
  var menuElement = document.createElement("li");
  menu.appendChild(menuElement);

  // Create the hyperlink element with the data requested
  var menuLink = document.createElement("a");
  menuLink.setAttribute("href", url);
  menuLink.innerHTML = label;
  menuElement.appendChild(menuLink);

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
