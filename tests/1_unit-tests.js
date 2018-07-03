/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = '32.587kg';
      assert.equal(convertHandler.getNum(input), 32.587);
      done();
    });
    
    test('Fractional Input', function(done) {
      assert.equal(convertHandler.getNum('12/3L'), 4);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      assert.equal(convertHandler.getNum('10/2.5kg'), 4);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      assert.equal(convertHandler.getNum('4/5/5L'), null);
      assert.equal(convertHandler.getNum('3.45/23.4/0.3434lbs'), null);
      done();
    });
    
    test('No Numerical Input', function(done) {
      assert.equal(convertHandler.getNum('kg'), 1);
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        assert.equal(convertHandler.getUnit('123.2/23.33' + ele), ele);
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      assert.equal(convertHandler.getUnit('233.23klg'), null);
      assert.equal(convertHandler.getUnit('3434.54'), null);
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
      input.forEach(function(el, i) {
        assert.equal(convertHandler.spellOutUnit(el), expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      assert.approximately(convertHandler.convert(2.5, 'l'), 0.6604304, 0.1);
      done();
    });
    
    test('Mi to Km', function(done) {
      assert.approximately(convertHandler.convert(1.43, 'mi'), 2.3013562, 0.1);
      done();
    });
    
    test('Km to Mi', function(done) {
      assert.approximately(convertHandler.convert(0.698, 'km'), 0.43371817, 0.1);
      done();
    });
    
    test('Lbs to Kg', function(done) {
      assert.approximately(convertHandler.convert(3.27, 'lbs'), 1.48324584, 0.1);
      done();
    });
    
    test('Kg to Lbs', function(done) {
      assert.approximately(convertHandler.convert(7.234, 'kg'), 15.948253, 0.1)
      done();
    });
    
  });

});