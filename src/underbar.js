/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {    
    if (n === undefined) {
      return array[0];
    }
    else {
       return array.slice(0,n);
    }
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) { 
    if (n === undefined) {
      return array[array.length-1];
    }
    else if (n > array.length) {
      return array;
    }
    else {
      return array.slice(array.length-n, array.length);
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++){
        iterator(collection[i], i, collection);
      }
    }
    else { //object
      for (var i in collection){
        iterator(collection[i], i, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var index = -1;
    _.each(array, function(value, i){
      if (index != -1){
        return;
      }
      if (array[i] === target){
        index = i;
      }
    })
    return index;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var passedItems = [];
    _.each(collection, function(item) {
      if (iterator(item)){
        passedItems.push(item);
      }
    });
    return passedItems;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    // TIP: see if you can re-use _.select() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(item){
      return !iterator(item); 
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var dupFreeArray = [];
    _.each(array, function(item){
      if (dupFreeArray.indexOf(item) === -1) {
        dupFreeArray.push(item);
      }
    });
    return dupFreeArray;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var mappedArray = [];
    _.each(array, function(item){
      mappedArray.push(iterator(item));
    })
    return mappedArray;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    var func;
    if (typeof methodName === "function"){
      func = function(item) {
        return methodName.apply(item, args);
      }
    }
    else if (typeof methodName === "string"){
      func = function(item) {
        return item[methodName](args);
      }
    }
    return _.map(list, func);
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  _.reduce = function(collection, iterator, initialValue) {
    if (initialValue === undefined) {
      initialValue = 0;
    }
    var prevValue = initialValue;
    _.each(collection, function(item){
      prevValue = iterator(prevValue,item);
    });
    return prevValue;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if(wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    if (iterator === undefined){
      return true;
    }
    return _.reduce(collection, function(every, item){
      if (every === false) {
        return false;
      }
      else {
        return Boolean(iterator(item));
      } 
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if (collection.length === 0){
      return false;
    }
    if (iterator === undefined){
      iterator = function(item){
        return Boolean(item);
      }
    }
    //some: if opposite of every is false
    return _.every(collection, function(item){
      return !iterator(item);
    }) === false;

  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    _.each(arguments, function(object){
      for (var key in object){
        obj[key] = object[key];
      }
    })
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.each(arguments, function(object){
      for (var key in object){
        if (obj[key] === undefined){
          obj[key] = object[key];
        }
      }
    })
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var prevResults = {};
    var result;

    return function(someArgument){
      if (prevResults[someArgument] === undefined) {
        prevResults[someArgument] = func(someArgument);
      };
        return prevResults[someArgument];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var parameters = Array.prototype.slice.call(arguments, 2);
    return window.setTimeout(function(){
      return func.apply(null, parameters);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */
  // Swap items in an array.
  _.swap = function(arr, firstIndex, secondIndex){
    var temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    return arr;
  }

  // Shuffle an array.
  _.shuffle = function(array) {
    var shuffledArray = array.slice(); //not change original
    var arrayLength = shuffledArray.length;
    for (var i = 0; i < arrayLength; i++){
      //swap each index with another random index
      _.swap(shuffledArray, i, Math.floor(Math.random()*arrayLength)); 
    }
    return shuffledArray;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    //define sort function: linear sort
    var findMinIndex = function(arr){
      var minIndex = 0;
      if (typeof iterator === 'string'){
        var min = arr[0][iterator];
        _.each(arr, function(item, i){
          if (item[iterator] < min || min === undefined){
            min = item[iterator];
            minIndex = i;
          }
        });
      }
      else {
        var min = iterator(arr[0]);
        _.each(arr, function(item, i){
          if (iterator(item) < min || min === undefined) {
            min = iterator(item);
            minIndex = i;
          }
        });
      }
      return minIndex;
    };
    
    for (var i = 0; i < collection.length; i++){  
      _.swap(collection, i, i+findMinIndex(collection.slice(i, collection.length)));
    }
    return collection;
  };

  // My own helper function
  // Takes an array or arguments and return the longest item.length.
  _.longestArr = function(arr){
    var longest = arr[0].length;
    var longestIndex = 0;
    _.each(arr, function(item, i) {
      if (item.length > longest) {
        longest = item.length;
        findLongest = i;
      }
    });
    return longest;
  };
  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var longest = _.longestArr(arguments);
    var obj = [];
    for (var i = 0; i < longest; i++) {
      var items = [];
      for (var j = 0; j < arguments.length; j++) {
        items.push(arguments[j][i]);
      }
      obj.push(items);
    }
    return obj;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var flatArray = [];
    var enterItems = function(arr) {
      _.each(arr, function(item) {
        if (Array.isArray(item)) {
          enterItems(item);
        }
        else {
          flatArray.push(item);
        }
      });
    };
    enterItems(nestedArray);
    return flatArray;
  };
    

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    //plan: 1) find longest arg 2) go through each arr 3) check if the item
    //has already passed or failed the check, use indexOf on all other arrays
    var arrList = arguments;
    var intersectList = [];
    var failedList = [];
    //search rest of the arrays for item. Return true if all arrays have it, false otherwise.
    var searchOtherArrays = function(item) {
      var i = 0;
      while (++i < arrList.length) {
        if (arrList[i].indexOf(item) === -1) {
          return false;
        }
      }
      return true;
    }
    _.each(arrList[0], function(item) {
      if (intersectList.indexOf(item) === -1 && failedList.indexOf(item) 
        === -1) {
        if (searchOtherArrays(item)) { 
          intersectList.push(item);
        } else {
          failedList.push(item);
        }
      }
    });
    return intersectList;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var arrList = arguments;
    var diffList = [];
    var findUniqItem = function(item) {
      var i = 0;
      while (++i < arrList.length) {
        if (arrList[i].indexOf(item) !== -1) {
          return false;
        }
      }
      return true;
    };
    _.each(array, function(item) {
      if (findUniqItem(item)) {
        diffList.push(item);
      }
    });
    return diffList;
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
    var args = Array.prototype.slice.call(this, arguments, 2);
    var lastCallTime;
    var now;
    var ans;
    var waiting = false;
    var env = this;
    return function() {
      now = Date.now();
      if (lastCallTime === undefined || now - lastCallTime > wait) {
        lastCallTime = now;
        ans = func.apply(this, args);
        return ans;
      } else if (waiting === false) {
        waiting = true;
        window.setTimeout(function(){
          waiting = false;
          lastCallTime = Date.now();
          ans = func.apply(this, args);
        }, wait-(Date.now()-lastCallTime));
        return ans;      
      } else {
        return ans;
      }
    }
  };
}).call(this);
//1,1,1,2,2,3
//