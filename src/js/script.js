// DOM
var beer                   = document.querySelector( '.click' );
var money_score            = document.querySelector( '.chiffre_affaire' );
var item                   = document.querySelector( '.item' );
var items                  = document.querySelectorAll( '.item ');
var items_container        = document.querySelector( '.items-container' );
var level_up               = document.querySelector( '.level-up' );
var staff                  = document.querySelectorAll( '.staff' );
var hire                   = document.querySelectorAll( '.hire' );
var fire                   = document.querySelectorAll( '.round2' );

// STAFF
var chauffeur        = document.querySelector( '.chauffeur' );
var livreur          = document.querySelector( '.livreur' );
var commercial       = document.querySelector( '.commercial' );
var routier          = document.querySelector( '.routier' );
var ingenieur        = document.querySelector( '.ingenieur' );
var pilote           = document.querySelector( '.pilote' );
var securite         = document.querySelector( '.commercial' );
var matelot          = document.querySelector( '.commercial' );
var capitaine        = document.querySelector( '.commercial' );
var scientifique     = document.querySelector( '.commercial' );
var astronaute       = document.querySelector( '.commercial' );
var astrophysicien   = document.querySelector( '.astrophysicien' );

// MONEY & LEVEL
var money      = 0;
var level      = 0;
var click_gain = 1;

// Load JSON
function loadJSON( callback ) {   
  var xobj = new XMLHttpRequest(  );
  xobj.overrideMimeType( "application/json" );
  xobj.open( 'GET', 'src/js/data.json', true ); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function() {
    if ( xobj.readyState == 4 && xobj.status == "200" ) {
      callback( xobj.responseText );
    }
  };
  xobj.send( null );  
}

document.addEventListener( "DOMContentLoaded", loadElements() );

// Load the elements in the shop of the current level
function loadElements(){
  loadJSON( function( response ) {
    // Parse JSON string into object
    var actual_JSON = JSON.parse( response );
    for ( var j = actual_JSON[level].containers.length - 1; j >= 0; j-- ) {
     $( '.items-container' ).append( '<div class="item" data-cost="' + actual_JSON[level].containers[j].cost + '" data-price="' + actual_JSON[level].containers[j].price + '" onclick="purchase( ' + actual_JSON[level].containers[j].price + ' )"><div class="container-panel-text"><p class="name_element">'+ actual_JSON[level].containers[j].name +'</p><p class="price_element">'+actual_JSON[level].containers[j].price+'€</p><div class="clear">' );
   }
 } );
}

// INCREMENT MONEY
beer.addEventListener( 'click', function() {
 function moneyIncrement(){
  loadJSON( function( response ) {
    // Parse JSON string into object
    var actual_JSON = JSON.parse( response );
    // set the value of the click with the last element's bought price
    if ( document.body.contains( document.querySelector( '.active-money-increment' ) ) ){
     click_gain = parseInt( document.querySelector( '.active-money-increment' ).dataset.cost );
     money += click_gain;
     money_score.innerHTML = money + " €";
   }
   // if no item is currently bought, every click add 1€
   else{
    money += 1;
    money_score.innerHTML = money + " €";
  }
} );
}
moneyIncrement(  ); 
} );

// PURCHASING ITEM
var purchase = function( increment ) {
  money -= increment;
  money_score.innerHTML = money + " €";
};

// MAKE ACCESSIBLE ONLY ITEMS YOU CAN AFFORD
setInterval(function() {
  var itemsSet = document.querySelectorAll( '.item ');

  for (var z = itemsSet.length - 1; z >= 0; z--) {
    if (itemsSet[z].dataset.price > money) {
      if (itemsSet[z].classList.contains('bought')) {
        itemsSet[z].classList.remove('tooExpensive');
      } else {
        itemsSet[z].classList.add('tooExpensive');
      }
    } else {
      itemsSet[z].classList.remove('tooExpensive');
    }
  }
}, 200);

// LEVEL UP
level_up.addEventListener( 'click', function() {
  level += 1;
  // Clear the item container in the shop
  items_container.innerHTML = "";
  loadJSON( function( response ) {
    var actual_JSON = JSON.parse( response );
    // deduct the price of the upgrade
    money = money - actual_JSON[level+1].price;
    money_score.innerHTML = money + " €";
  } );
  // launch all level up functions
  loadElements(); 
  levelDisplay();
  levelBackground();
} );

// DISPLAY RIGHT NEXT LEVEL GOAL ( json )
function levelDisplay(){
  loadJSON( function( response ) {
       // Parse JSON string into object
       var actual_JSON = JSON.parse( response );
       document.querySelector( '.level-up' ).append = actual_JSON[level+1].name;
       // set the upgrade's image
       document.querySelector( '.level-up-img' ).src = actual_JSON[level+1].img;
       // Write the conditions to level up
       document.querySelector( '.goal' ).innerHTML = actual_JSON[level+1].goal;
       // Write the price of the upgrade
       document.querySelector( '.level-up-price' ).innerHTML = actual_JSON[level+1].price + "€";
       // Make the next upgrade unaivailable
       document.querySelector( '.level-up' ).classList.add( 'unavailable' );
     } );
}

// DISPLAY RIGHT LEVEL BACKGROUND ( json )
function levelBackground(){
  loadJSON( function( response ) {
       // Parse JSON string into object
       var actual_JSON = JSON.parse( response );
       document.querySelector( '.context' ).style.background = "url( "+ actual_JSON[level].bg + " ) no-repeat center fixed";
       document.querySelector( '.context' ).style.backgroundSize = "cover";
     } );
}

var tab = ["Maman", "Maël", "Célia", "Eugénie", "paul"];

// AUTHORIZE LEVEL UP 
setInterval( function(){
  if( level == 0 ) {
    // set conditions to level up
    if( chauffeur.dataset.nb >= 3 && livreur.dataset.nb >= 2 && commercial.dataset.nb >= 1 && money >= 1000 ){
      // make the level up button clickable
      $( '.level-up' ).removeClass( 'unavailable' );
    }
  }
  else if( level = 1 ) {
    if( routier.dataset.nb >= 5 && commercial.dataset.nb >= 4 && ingenieur.dataset.nb >= 2 && money >= 14000 ){
      console.log( 'yes' );
      $( '.level-up' ).removeClass( 'unavailable' );
    }
    else {$( '.level-up' ).addClass( 'unavailable' );}
  }
  else if( level = 2 ) {
    if( commercial.dataset.nb >= 2 && ingenieur.dataset.nb >= 4 && money >= 567000 ){
      $( '.level-up' ).removeClass( 'unavailable' );
      console.log( 'oklm' );
    }
    else {$( '.level-up' ).addClass( 'unavailable' );}
  }
  else if( level = 3 ) {
    if( pilote.dataset.nb >= 4 && securite.dataset.nb >= 5 && ingenieur.dataset.nb >= 6 && money >= 20000000 ){
      $( '.level-up' ).removeClass( 'unavailable' );
    }
    else {$( '.level-up' ).addClass( 'unavailable' );}

  }
  else if( level = 4 ) {
    if( matelot.dataset.nb >= 10 && ingenieur.dataset.nb >= 8 && money >= 200000000){
      $( '.level-up' ).removeClass( 'unavailable' );
    }
    else {$( '.level-up' ).addClass( 'unavailable' );}
  }
  else if( level = 5 ) {
    if( astrophysicien.dataset.nb >= 30 && scientifique.dataset.nb >= 6 && astronaute.dataset.nb >= 5 && money >= 5000000000 ){
      $( '.level-up' ).removeClass( 'unavailable' );
    }
    else {$( '.level-up' ).addClass( 'unavailable' );}
  }
  else if( level = 6 ) {
    if( astrophysicien.dataset.nb >= 100 && scientifique.dataset.nb >= 40 && astronaute.dataset.nb >= 30 && money >= 100000000000 ){
      $( '.level-up' ).removeClass( 'unavailable' );
    }
    else {$( '.level-up' ).addClass( 'unavailable' );}
  }
}
, 500 );

// CLICK PRICE
$( document ).on( 'click', '.item', function(  ) {
  // forbid the player to buy several times an item
  $( this ).addClass( 'bought' );
  // set the new value of the click
  $( '.item' ).removeClass( 'active-money-increment' );
  // remove the old value of the click
  $( this ).addClass( 'active-money-increment' );
} ); 


// STAFF MANAGEMENT //

// HIRE STAFF
var hireStaff = function() {
  // look all hire buttons
  for ( var i=0; i < hire.length; i++ ){
    hire[i].addEventListener( 'click', function(  ){
      // set staff number in this category giving the data-nb (number) of the staff div
      var staff_number = parseInt( this.parentElement.dataset.nb );
      // increment the staff number
      this.parentElement.dataset.nb = staff_number + 1 ;
      // write the number of staff of this type
      this.parentElement.querySelector( '.round' ).innerHTML = 'x' + this.parentElement.dataset.nb;
    } );
  }
}
hireStaff();

// FIRE STAFF
var fireStaff = function() {
  // check the whole staff
  for ( var i=0; i<staff.length; i++ ){
    fire[i].addEventListener( 'click', function() {
      // set in a var the number of staff giving the data
      var staff_number = parseInt( this.parentElement.dataset.nb );
      // forbid to fire if 0 staff
      if ( this.parentElement.dataset.nb > 0 ) {
        this.parentElement.dataset.nb = staff_number - 1 ;
        // show number of staff for each category
        this.parentElement.querySelector( '.round' ).innerHTML = 'x' + this.parentElement.dataset.nb;
      }
    } );
  }
}
fireStaff();

//PAY DAY
var pay_day = 0;

var getTotalPays = function(){
  for ( var i=0; i<staff.length; i++ ){
    pay_day += staff[i].dataset.salary * staff[i].dataset.nb;
  }
  return pay_day;
}

setInterval( function(){
  money = money - getTotalPays();
  money_score.innerHTML = money + "€";
  pay_day = 0;
}
, 20000 );

// STAFF AUTOMATIC  WORK
var total_reward = 0;
var getTotalReward = function(){
  for ( var i=0; i<staff.length; i++ ){
    // get a number of the total reward of all staff giving their number data and reward data
    total_reward += staff[i].dataset.reward * staff[i].dataset.nb;
  }
  return total_reward;
}

setInterval( function(){
  money += getTotalReward();
  money_score.innerHTML = money + "€";
  total_reward = 0;
}
, 1000 );
