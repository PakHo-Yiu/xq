var num1 = 1, num2 = 2; 
function cal() { var num1 = 10, num2 = 20; console.log(this.num1 + this.num2); } 
var calBind = cal.bind({ num1: 100, num2: 200 }) 
new cal(); cal(); new calBind(); calBind();