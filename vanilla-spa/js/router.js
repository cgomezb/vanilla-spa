'use strict';

function Router(routes) {
  try {
    if (!routes) {
      throw 'error: routes param is mandatory';
    }
    this.constructor(routes);
    this.init();
  } catch (e) {
    console.error(e);
  }
}

Router.prototype = {
  routes: undefined,
  rootElem: undefined,
  constructor: function (routes) {
    this.routes = routes;
    this.rootElem = document.getElementById('app');
  },
  init: function () {
    var r = this.routes;
    (function (scope, r) {
      window.addEventListener('hashchange', function (e) {
        scope.hasChanged(scope, r);
      });
    })(this, r);
    this.hasChanged(this, r);
  },
  hasChanged: function (scope, r) {
    if (window.location.hash.length > 0) {
      for (var i = 0, length = r.length; i < length; i++) {
        var route = r[i];
        if (route.isActiveRoute(window.location.hash.substr(1))) {
          scope.goToRoute(route);
        }
      }
    } else {
      for (var i = 0, length = r.length; i < length; i++) {
        var route = r[i];
        if (route.default) {
          scope.goToRoute(route);
        }
      }
    }
  },
  goToRoute: function (route) {
    (function (scope) {
      const url = `views/${route.name}.html`;
      const xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          scope.rootElem.innerHTML = this.responseText;

          let script = document.head.querySelector('script');

          if (script) {
            script.parentNode.removeChild(script);
          }
          
          const version = Math.floor(Math.random() * Date.now());
          script = document.createElement('script');
          script.src = `js/views/${route.name}.js?${version}`;
          script.type = 'module';
          script.async = false;
          document.head.append(script);
        }
      };
      xhttp.open('GET', url, true);
      xhttp.send();
    })(this);
  }
};