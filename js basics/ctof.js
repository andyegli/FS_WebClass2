
let degree = '0'
function convert(degree) {
  var x;
  if (degree == "C") {
    x = document.getElementById("c").value * 9 / 5 + 32;
    document.getElementById("f").value = Math.round(x);
  } else {
    x = (document.getElementById("f").value -32) * 5 / 9;
    document.getElementById("c").value = Math.round(x);
  }
  
  console.log(x); // Log the return value
  return x;
}