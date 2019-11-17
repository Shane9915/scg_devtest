const math = require('mathjs')

//example of sequence: x,5,9,15,23,y,z

class SolveVariables 
{ 
   /*
   Using matrix determinant to find F(x) Polynomial Form
   and then use the Polynomial Form to solve the variables     
   */

   constructor(){
      this.sequence = "";
      this.term = 0;
      this.Matrix_A = [];
      this.Matrix_B = [];
      this.Matrix_Coefficient = [];
      this.variables = [];
   }

   setSequence( sequence ){
      this.sequence = sequence;
      this.processMatricesElements();
   }

   processMatricesElements(){
      var arr = this.sequence.split(',');

      
      //#(1) Find this.term 
      this.term = 0;
      for(var i=0; i<arr.length; i++){
         if( isNaN(arr[i]) == false ){
            this.term++;
         }
         //console.log(arr[i] + ' - ' + isNaN(arr[i]) );
      }
      //console.log( 'term: '+ this.term );

      
      //#(2) Find this.Matrix_A 
      this.Matrix_A = [];
      for(var i=0; i<arr.length; i++){
         if( isNaN(arr[i]) == false ){
            var A_el = [];
            for(var tm=0; tm<this.term; tm++){
               A_el[tm] = Math.pow(i, this.term-1-tm);
            }
            this.Matrix_A[this.Matrix_A.length] = A_el;
         }
      }
      //console.log( 'Matrix_A:' );
      //console.log( this.Matrix_A );

      
      //#(3) Find this.Matrix_B
      this.Matrix_B = [];
      for(var i=0; i<arr.length; i++){
         if( isNaN(arr[i]) == false ){
            this.Matrix_B[this.Matrix_B.length] = parseFloat(arr[i]);
         }
      }
      //console.log( 'Matrix_B:' );
      //console.log( this.Matrix_B );
      

      //#(4) Find this.Matrix_Coefficient
      this.Matrix_Coefficient = [];
      this.Matrix_Temp = math.round( math.lusolve(this.Matrix_A, this.Matrix_B) , 2)  //round number with 2 decimal digits
      for(var i=0; i<this.Matrix_Temp.length; i++){
         this.Matrix_Coefficient[i] = this.Matrix_Temp[i][0];
      }
      //console.log( 'Matrix_Coefficient:' );
      //console.log( this.Matrix_Coefficient );
   }

   FindVariables(){
      var arr = this.sequence.split(',');
      this.variables = [];

      for(var i=0; i<arr.length; i++){
         var PolyValOfN = 0;
         //var str_PolyVal = ""
         var jsonObj = {};
         if( isNaN(arr[i]) == true ){
            PolyValOfN = this.PolynomialOfN(i);
            //jsonObj[ arr[i] ] = PolyValOfN;
            jsonObj[ 'variable' ] = arr[i];
            jsonObj[ 'value' ] = PolyValOfN;
            this.variables.push(jsonObj)
         }
         //console.log(arr[i] + str_PolyVal + ' - ' + isNaN(arr[i]) );
      }
      return this.variables;
   }

   PolynomialOfN(n){
      //n start from 0

      var PolynomailVal = 0;
      for(var tm=0; tm<this.term; tm++){
         var A_el = Math.pow(n, this.term-1-tm);
         var Val_el = A_el * this.Matrix_Coefficient[tm];
         PolynomailVal += Val_el;
      }
      return PolynomailVal;
   }

}

module.exports = SolveVariables
