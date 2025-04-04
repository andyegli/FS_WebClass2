console.log("FutureSkills MCSD51: Certificate in Introductory Software Development");
console.log("JS Basics");
console.log(Date());


let OutlessAddress;
OutlessAddress = "blockhouse bay";
console.log(OutlessAddress);
OutlessAddress = "manukau";
console.log(OutlessAddress);
OutlessAddress = "auckland";
console.log(OutlessAddress);

if (OutlessAddress == "blockhouse bay") {
    console.log("Outless Address is Blockhouse Bay");
}
if (OutlessAddress == "manukau") {
        console.log("Head Office is in Manukau");
}

switch(OutlessAddress) {
    case "blockhouse bay":
        console.log("Outless Address is Blockhouse Bay");
        break;
    case "manukau":
        console.log("Head Office is in Manukau");
        break;
    default:
        console.log("Unknown address");
}
