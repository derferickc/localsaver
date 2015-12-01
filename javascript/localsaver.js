$(document).ready(function(){
	// console.log("we made it here");
	var location;
	getLocation();
	// get location and pass to show function
	function getLocation(){
		if(navigator.geolocation){
			// console.log("geolocation is supported");
			navigator.geolocation.getCurrentPosition(getHeader);
			navigator.geolocation.getCurrentPosition(getInfo);
		}else{
			$("#message").innerHTML = "Geolocation is not supported by this browser.";
		}
	}

	// using datasphere api
			function getHeader(location){
				$.get(
					"http://codingchallenge.datasphere.com:8084/getbusinesses/?location="+location.coords.latitude+","+location.coords.longitude+"&pg=1&pz=10&callback", function(info){
						// console.log(info);
						// console.log(typeof info);
						info = info.substr(1, info.length-2);
						// console.log(info);
						// console.log(info.businesses.length);
						var output = JSON.parse(info);
						console.log('martin is here', output);
						console.log(output.count);
						$(".small").append(
							"+"+output.count+" MATCHES FOUND");
				})
			}

			function getInfo(location){
				$.get("http://codingchallenge.datasphere.com:8084/getbusinesses/?location="+location.coords.latitude+","+location.coords.longitude+"&pg=1&pz=10&callback", function(info){
						// console.log(info);
						// console.log(typeof info);
						info = info.substr(1, info.length-2);
						// console.log(info);
						// console.log(info.businesses.length);
						var bizz = JSON.parse(info);
						// console.log('martin is here', bizz);
						console.log('new stuff', bizz);
						for(var i=0, j=0, k=1; i<10, j<20, k<21; i++, j=j+2, k=k+2){
							var length = bizz.businesses[i].coupons.length
							// console.log(length);
							$("#city_state"+i).append(
							bizz.businesses[i].city+", "+bizz.businesses[i].state);
							$("#miles_away"+i).append(
							bizz.businesses[i].distance+" mi");
							$("#category"+i).append(
							bizz.businesses[i].category);
							$(".button"+i).append(
							bizz.businesses[i].businessname);
							if(bizz.businesses[i].coupons.length == 1){
								$(".coupon"+j).append(bizz.businesses[i].coupons[0].title);
								$(".coupon"+k).empty;
							}else if(bizz.businesses[i].coupons.length == 2){
								$(".coupon"+j).append(bizz.businesses[i].coupons[0].title);
								$(".coupon"+k).append(bizz.businesses[i].coupons[1].title);
							}else{
								$(".coupon"+j).append(bizz.businesses[i].coupons[0].title);
								$(".coupon"+k).append(bizz.businesses[i].coupons[1].title);
								$(".excess"+i).append("See All "+length);
							}
							
						}
				})
			}
})