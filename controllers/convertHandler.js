/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  function toPrecision(n, p) {
    return Math.round(n * Math.pow(10, p)) / Math.pow(10, p);
  }
  
  this.getNum = function(input) {
    var slashRE = /\//g;
    var slashMatch = input.match(slashRE);
    if (slashMatch && slashMatch.length > 1) return null;
    
    var numRE = /([\d.\/])+/gi;
    var numMatch = input.match(numRE);
    if (numMatch === null) return 1;
    
    return eval(numMatch[0]);
  };
  
  this.getUnit = function(input) {
    var re = /km|mi|kg|lbs|gal|l$/gi;
    var match = input.match(re);
    
    if (match === null) return null;
    
    return match[0];
  };
  
  this.getReturnUnit = function(initUnit) {
    switch (String(initUnit).toLowerCase()) {
      case 'km': return 'mi';
      case 'mi': return 'km';
      case 'kg': return 'lbs';
      case 'lbs': return 'kg';
      case 'gal': return 'l';
      case 'l': return 'gal';
      default: return null;
    }
  };

  this.spellOutUnit = function(unit) {
    switch (unit.toLowerCase()) {
      case 'km': return 'kilometers';
      case 'mi': return 'miles';
      case 'kg': return 'kilograms';
      case 'lbs': return 'pounds';
      case 'gal': return 'gallons';
      case 'l': return 'liters';
      default: return null;
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    switch(initUnit.toLowerCase()) {
      case 'gal': return initNum * galToL;
      case 'l': return initNum * (1 / galToL);
      case 'lbs': return initNum * lbsToKg;
      case 'kg': return initNum * (1 / lbsToKg);
      case 'mi': return initNum * miToKm;
      case 'km': return initNum * (1 / miToKm);
      default: return null;
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var str = String(toPrecision(initNum, 5)) + ' ' +
              this.spellOutUnit(initUnit) +
              ' converts to ' +
              String(toPrecision(returnNum, 5)) + ' ' +
              this.spellOutUnit(returnUnit);
    return str;
  };
  
}

module.exports = ConvertHandler;
