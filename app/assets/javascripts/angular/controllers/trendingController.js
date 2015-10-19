angular.module('trending').controller('trendingController',["$scope", "twitterFactory", "yahooFactory", function($scope, twitterFactory, yahooFactory) {

	$scope.topics = [];
	$scope.relatedTweets = [];
	$scope.searchLocation = '';
	$scope.locationName = 'San Francisco';

	$scope.findTrendsInLocation = function() {
		yahooFactory.findLocation($scope.searchLocation).then( function(response) {
			var woeid = response.data.places.place[0].woeid;
			$scope.locationName = response.data.places.place[0].name;
			getTrendingTopics(woeid);
		});

	};

	var getTrendingTopics = function(woeid) {
			twitterFactory.getTrendingTopics(woeid).then(function(data) {
        $scope.topics = $scope.topics = data[0].trends;
      	getTweetsForTrends($scope.topics);
    	}, function() {
        $scope.rateLimitError = true;
    	})
	},

	getTweetsForTrends = function (trends) {
		for (var i = trends.length - 1; i >= 0; i--) {
    	getTweetsForTrend(trends[i].name);
    };
	},
	getTweetsForTrend = function(trend) {
		console.log(trend);
		twitterFactory.getRelatedTweets(trend).then(function(data){
    		$scope.relatedTweets[trend] = data.statuses;
    		console.log($scope.relatedTweets);
    	});
	},
	init = function() {
		twitterFactory.initialize();

		if (!twitterFactory.isReady()) {
			twitterFactory.connectTwitter().done(function() {
				if (twitterFactory.isReady()) {
					getTrendingTopics(2487956);
				}
			});
		} else {
			//2487956 = SF, CA, USA;
			getTrendingTopics(2487956);
		}
	};

	init();
}]);
