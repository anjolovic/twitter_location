angular.module('trending').factory('yahooFactory', [ "$http", function($http) {
	return {
		
		findLocation: function(locationSearch) {
			//http://where.yahooapis.com/v1/places.q('sydney%20opera%20house')?appid=dj0yJmk9bEhEbE50blUwek1BJmQ9WVdrOU9WSmpiRmRQTlRJbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD02YQ--
			var url = "http://where.yahooapis.com/v1/places.q('";
			url += encodeURIComponent(locationSearch);
			url += "')?appid=dj0yJmk9bEhEbE50blUwek1BJmQ9WVdrOU9WSmpiRmRQTlRJbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD02YQ--"
			
			console.log(url);
			
			return $http.get(url);
		
		}
	};
}]);
