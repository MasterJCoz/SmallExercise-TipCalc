// Get all elements needed for referenceing 
var billV = document.getElementById('billV');
var tipV = document.getElementById('tipV');
var tipOptionSelected = 5;        //give a default value that matches boot value
var customInput = document.getElementById('tipVCustom');
var submitBtn = document.getElementById('submitBtn');
var result = document.getElementById('result');


//reveal custom tip percentage input box if custom is selected
document.getElementById('tipV').addEventListener('change', function() {
    
    tipOptionSelected = this.value;
    if (this.value === 'Custom') {
      customInput.style.display = 'flex'; // Show custom input when "Custom" is selected
    } 
    else {
      customInput.style.display = 'none'; // Hide it otherwise
    }
  });


//on button press trigger 'calculate results' function
submitBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form from submitting/reloading the page
    DoCalculation();        
});





function DoCalculation(){

    console.log("DoCalcFunction")


    //* if [custom tip amount] is selected grab the custom boxes value
    if (tipOptionSelected === 'Custom') {
        tipAmount = customInput.value.toString();
    } else {
        tipAmount = tipV.value.toString();
    }

    //* clean typed values and check they are numbers
    //let cleanedMulti = tipAmount.toString().replace(/%/g, '');
    let cleanedMulti = tipAmount.toString().replace(/[^\d.]/g, '');     
        //(\d for digits)(. for decimals)
    let cleanedBill = billV.value.toString().replace(/[^\d.]/g, ''); 


    //* try convert to numbers  (try/catch wasnt necessary)
    if (isNaN(cleanedBill.toString()) || cleanedBill.toString() === "") {
        DisplayResults(
            "Entry for Bill Amount cant be used",            
            "Please try another value",
            "eg. £35.60");
        result.style.lineHeight = "1em";
        return
    }
    cleanedMulti = parseFloat(cleanedMulti) / 100;
    if (isNaN(cleanedMulti.toString())) {
        DisplayResults(
            "Entry for Custom Tip Amount cant be used",            
            "Please try another value",
            "eg. 20.5%");
        result.style.lineHeight = "1em";
        return
    }


    //cleanedMulti = parseFloat(cleanedMulti) / 100;
    //var billAmount = parseFloat(billV.value);
    //DisplayResults((billAmount * cleanedMulti).toString() + "  |  BILL " +  billAmount + "  |  TIPV " + cleanedMulti);



    billAmount = parseFloat(cleanedBill);
    var resultTip = billAmount * cleanedMulti;
    var resultTotal = billAmount + resultTip;

    //round to 2dp
    resultTip = resultTip.toFixed(2);
    resultTotal = resultTotal.toFixed(2);


    //tip and total amounts - included clarification note
    DisplayResults(
        "Tip: £" + (resultTip).toString(),
        "Total Amount:  £" + resultTotal.toString(),
        `£${billAmount}  with  ${cleanedMulti*100}% tip`,
        true    //dims clarification note
    );
}


function DisplayResults(note, note2 = "Please try another value", note3 = "", dimNote3 = false){
    //innerHTML to use <br>, \n wasnt working  -> lets us add a class for colouring which is nice
    if (dimNote3) {     
        note3 = `<h3 id="dim">${note3}</h3>`    
        result.style.lineHeight = "1.5em"; 
    }
    result.innerHTML = `${note} <br> ${note2} <br> ${note3}`;    
}