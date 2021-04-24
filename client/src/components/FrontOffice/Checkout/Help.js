import components from "react-select";


function Help() {
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        navigator.geolocation.getCurrentPosition(
          function(position) {
            console.log(position);
          },
          function(error) {
            console.error("Error Code = " + error.code + " - " + error.message);
          } 
          );
        });
        return (null)
    }
export default Help = Help;
