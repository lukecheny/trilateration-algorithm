// *****************************************
// *  Trilateration Algorithm Testing      *
// *  Author: Luke Chenevey                *
// *****************************************

function trilaterate() {
    // ***Purpose: compute the coordinates of an unknown location based on
    // three different known locations.
    // ***Input: three different sets of coordinates for three different 
    // locations along with three distance values each one associated with
    // a different one of the locations (measured from unknown location to the
    // known locations).
    // ***Desired output: x and y coordinates for the unknown location.
    // ***Equation format: x^2 - (2)(location.x)(x) + (location.x)^2 + y^2 - (2)(location.y)(y) + (location.y)^2 = dist^2
    //    - Create three different equations and subtract them to make two
    //      different "y=" equations in order to solve for x. Then solve for y.
    

    // *** CALCULATE DISTANCE FROM RSSI ***
    // Formula: Distance = 10 ^ ((Measured Power – RSSI)/(10 * N))

    var measuredPow = -69;
    var n = 2;
    
    // Calculate first RSSI value distance
    var rssiVal1 = -60;
    let rssiDist1 = (Math.pow(10, ((measuredPow - rssiVal1) / (10 * n)))).toFixed(2);
    console.log(rssiDist1);

    // Calculate second RSSI value distance
    var rssiVal2 = -69;
    let rssiDist2 = (Math.pow(10, ((measuredPow - rssiVal2) / (10 * n)))).toFixed(2);
    console.log(rssiDist2);

    // Calculate third RSSI value distance
    var rssiVal3 = -80;
    let rssiDist3 = (Math.pow(10, ((measuredPow - rssiVal3) / (10 * n)))).toFixed(2);
    console.log(rssiDist3);

    // ************************************


    // *** DECLARE INITIAL VALUES ***
    // Note: change these when using the equation.

    // Declare distances (radius) to be used
    // Walking Shape App terms: RSSI values
    var distA = 50.00;
    var distB = 36.06;
    var distC = 60.83;

    // Declare GPS coordinates (x and y coords) to be used
    // Walking Shape App terms: known beacon GPS coordinates
    var locationA = {"x": 100, "y": 100};
    var locationB = {"x": 160, "y": 120};
    var locationC = {"x": 70, "y": 150};

    // ******************************


    // *** PREPARE VALUES ***

    // Square distances
    var distA_Sq = Math.round(Math.pow(distA, 2));
    var distB_Sq = Math.round(Math.pow(distB, 2));
    var distC_Sq = Math.round(Math.pow(distC, 2));

    // Square location coordinates
    var locationA_Sq = {"x": Math.pow(locationA.x, 2), "y": Math.pow(locationA.y, 2)};
    var locationB_Sq = {"x": Math.pow(locationB.x, 2), "y": Math.pow(locationB.y, 2)};
    var locationC_Sq = {"x": Math.pow(locationC.x, 2), "y": Math.pow(locationC.y, 2)};

    // Multiply location coordinates by 2
    var locationA_T2 = {"x": (locationA.x * -2), "y": (locationA.y * -2)};
    var locationB_T2 = {"x": (locationB.x * -2), "y": (locationB.y * -2)};
    var locationC_T2 = {"x": (locationC.x * -2), "y": (locationC.y * -2)};

    // **********************


    // *** PREPARE FIRST EQUATION ***
    
    var temp_x = locationA_T2.x - locationB_T2.x;
    var temp_const = (locationA_Sq.x - locationB_Sq.x) + (locationA_Sq.y - locationB_Sq.y) - (distA_Sq - distB_Sq);
    var y_val_eq1 = locationA_T2.y - locationB_T2.y;    // for y value

    var x_val_eq1 = temp_x / ((-1) * y_val_eq1);    // for x value
    var const_eq1 = temp_const / ((-1) * y_val_eq1);    // for constant value
    
    // ******************************


    // *** PREPARE SECOND EQUATION ***

    var temp_x = locationB_T2.x - locationC_T2.x;
    var temp_const = (locationB_Sq.x - locationC_Sq.x) + (locationB_Sq.y - locationC_Sq.y) - (distB_Sq - distC_Sq);
    var y_val_eq2 = locationB_T2.y - locationC_T2.y;    // for y value

    var x_val_eq2 = temp_x / ((-1) * y_val_eq2);    // for x value
    var const_eq2 = temp_const / ((-1) * y_val_eq2);    // for constant value

    // *******************************


    // *** FIND X AND Y ***
    
    var finalX = x_val_eq1 - x_val_eq2;
    var finalConst = const_eq2 - const_eq1;

    // Find x-coordinate of unknown location
    let x = finalConst / finalX;

    // Find y-coordinate of unknown location
    let y = (x_val_eq2 * x) + const_eq2;
    
    // ********************


    // *** CREATE OBJECT LITERAL FOR GPS COORDS ***

    let gps_coords = {"x": x, "y": y};

    console.log(gps_coords);

    // ********************************************
}