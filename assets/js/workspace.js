
/* 
*   Global event listeners who match with a selector 
*   don't break with DOM delete / create element
*/

export function globalListener(
    type,
    selector,
    callback,
    options,
    parent){

    var parent = parent || document;
    parent.addEventListener(
      type,
      function(e) {
        if (e.target.matches(selector)) {callback(e);}
      },
      options
    );

  }

/* Faster querySelector */
export function qs(selector, parent) {
    var parent = parent || document;
    return parent.querySelector(selector);
}

/* Faster querySelectorAll */
export function qsa(selector, parent) {
    var parent = parent || document;
    return parent.querySelectorAll(selector);
}
  
/* Faster CreateElement */
export function createElement(type, options) {

    var options = options || {};
    var element = document.createElement(options.tag || type);

    Object.entries(options).forEach(([key, value]) => {
      if (key === "class") {
        if(Array.isArray(value)) value.forEach((name) => {element.classList.add(name);});
        else element.classList.add(value);
        return;
      }
  
      if (key === "dataset") {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue;
        })
        return;
      }
  
      if (key === "text") {
        element.textContent = value;
        return;
      }
  
      element.setAttribute(key, value);
    });

    return element;

}

/* Get a random number between 2 values */
export function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/*
*   Array functions
*   get first, last or random elements
*/

export function first(array, n) {
    var n = n || 1;
    if (n === 1) {return array[0];}
    return array.filter(function(_, index){ return index < n; });
}
  
export function last(array, n) {
    var n = n || 1;
    if (n === 1) {return array[array.length - 1];}
    return array.filter(function(_, index){ return array.length - index <= n; });
}
  
export function sample(array) {
    return array[randomNumberBetween(0, array.length - 1)];
}
  
export function pluck(array, key) {
    return array.map(function(element){ return element[key]; })
}

// ES6 syntax (Chrome 60 / Firefox 55) - change syntax for more compatibility
// spread operator on objects litterals - array litterals works fine on Chrome 45
/*
  function groupBy(array, key) {
      return array.reduce(function(group, element) {
        var keyValue = element[key];
        return { ...group, [keyValue]: [...((typeof group[keyValue] == 'undefined' || group[keyValue] == null) ? [] : group[keyValue]), element] };
      }, {});
  }
*/

/*
*   Formatters
*   usefull for numbers and dates
*/

var CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "EUR",
    style: "currency"
});
export function formatCurrency(number) {
    return CURRENCY_FORMATTER.format(number);
}
  
var NUMBER_FORMATTER = new Intl.NumberFormat(undefined);
export function formatNumber(number) {
    return NUMBER_FORMATTER.format(number);
}
  
var COMPACT_NUMBER_FORMATTER = new Intl.NumberFormat(undefined, {
    notation: "compact"
});
export function formatCompactNumber(number) {
    return COMPACT_NUMBER_FORMATTER.format(number);
}
  
var DIVISIONS = [
    { amount: 60, name: "seconds" },
    { amount: 60, name: "minutes" },
    { amount: 24, name: "hours" },
    { amount: 7, name: "days" },
    { amount: 4.34524, name: "weeks" },
    { amount: 12, name: "months" },
    { amount: Number.POSITIVE_INFINITY, name: "years" },
];

if(Intl.RelativeTimeFormat){
  var RELATIVE_DATE_FORMATTER = new Intl.RelativeTimeFormat(undefined, {
      numeric: "auto"
  });
  function formatRelativeDate(toDate, fromDate) {

      var fromDate = fromDate || new Date();
      var duration = (toDate - fromDate) / 1000;
    
      for (var i = 0; i <= DIVISIONS.length; i++) {

        var division = DIVISIONS[i];

        if (Math.abs(duration) < division.amount) {
          return RELATIVE_DATE_FORMATTER.format(Math.round(duration), division.name);
        }

        duration /= division.amount;

      }
  }
}