'use strict';

(function () {
  function init() {
    var router = new Router([
      new Route('home', 'home.html', true),
      new Route('contacts', 'contacts.html'),
      new Route('users', 'users.html'),
      new Route('companies', 'companies.html'),
      new Route('regions', 'regions.html')
    ]);
  }
  init();
}());
