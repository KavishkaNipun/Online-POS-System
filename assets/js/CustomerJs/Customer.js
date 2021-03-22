$(function () {
    loadAllCustomerToTheTable() ;
    $("#CustomerID").val(generateNewId());

    $("#dataTable3").on('click','tbody tr td i',(function () {
        //$(this).parents("tr").remove();
        $(this).parent().parent().remove();
    }));
});



// item event
$('#btnAddCustomer').click(function () {
    $('#dataTable3>tr').off('click');

    let custID = $("#CustomerID").val();
    let custNameF = $("#First").val();
    let custNameL = $("#last").val();
    let address = $("#Address").val();
    let phone = $("#phone").val();

    let res = saveCustomer(custID, custNameF, custNameL, address, phone);
    if (res) clearAllCustomerText();


    $('#dataTable3>tr').click(function () {
        let id = $(this).children('td:eq(0)').text();
        let fname = $(this).children('td:eq(1)').text();
        let lname = $(this).children('td:eq(2)').text();
        let address = $(this).children('td:eq(3)').text();
        let phoneno = $(this).children('td:eq(4)').text();

        $("#CustomerID").val(id);
        $("#First").val(fname);
        $("#last").val(lname);
        $("#Address").val(address);
        $("#phone").val(phoneno)
    });

});
// delete
    // ------------------------------------------------------------
    $("#btndeletecustomer").click(function () {
        let custID = $("#CustomerID").val();
        let option=confirm(`Do you want to delete ID:${custID}`);
        if (option){
            let res=deleteCustomer(custID);
            if (res){
                alert("Customer Deleted");
            } else{
                alert("Delete Failed")
            }

        }
        loadAllCustomerToTheTable();
        clearAllCustomerText();

        $('#dataTable3>tr').click(function () {
            let id = $(this).children('td:eq(0)').text();
            let fname = $(this).children('td:eq(1)').text();
            let lname = $(this).children('td:eq(2)').text();
            let address = $(this).children('td:eq(3)').text();
            let phoneno = $(this).children('td:eq(4)').text();

            $("#CustomerID").val(id);
            $("#First").val(fname);
            $("#last").val(lname);
            $("#Address").val(address);
            $("#phone").val(phoneno)
        });

    });


    // update

    $("#btnupdatecustomer").click(function () {
        let custID = $("#CustomerID").val();
        let custNameF = $("#First").val();
        let custNameL = $("#last").val();
        let address = $("#Address").val();
        let phone = $("#phone").val();

        let option=confirm(`Do you want to Update Customer ID:${custID}`);
        if (option){
            let res= updateCustomer(custID, custNameF, custNameL, address,phone);
            if (res){
                alert("Customer Updated");
            }else{
                alert("Update Faild");
            }
        }
        loadAllCustomerToTheTable();
        clearAllCustomerText();

        $('#dataTable3>tr').click(function () {
            let id = $(this).children('td:eq(0)').text();
            let fname = $(this).children('td:eq(1)').text();
            let lname = $(this).children('td:eq(2)').text();
            let address = $(this).children('td:eq(3)').text();
            let phoneno = $(this).children('td:eq(4)').text();

            $("#CustomerID").val(id);
            $("#First").val(fname);
            $("#last").val(lname);
            $("#Address").val(address);
            $("#phone").val(phoneno)
        });

    });

        // search
$("#CustomerID").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let customer = searchCustomer($(this).val());
        if (customer != null) {
            $("#CustomerID").val(customer.getCustomerID());
            $("#First").val(customer.getFname());
            $("#last").val(customer.getLname());
            $("#Address").val(customer.getaddress());
            $("#phone").val(customer.getphone());
        } else {
            clearAllCustomerText();
        }
    }
});

    function saveCustomer(custID, custNameF, custNameL, address, phone) {
        let customer = new Customer(custID, custNameF, custNameL, address, phone);
        customerDB.push(customer);// customer added

        // load the table
        loadAllCustomerToTheTable();
        return true;
    }


    function getAllCustomers() {
        return customerDB;
    }

function deleteCustomer(custID) {
    let customer = searchCustomer(custID);
    if (customer != null) {
        let indexNumber = customerDB.indexOf(customer);
        customerDB.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}
// search customer
function searchCustomer(cusID) {
    for (var i in customerDB) {
        if (customerDB[i].getCustomerID() == cusID) return customerDB[i];
    }
    return null;
}


function updateCustomer(custID, custNameF, custNameL, address, phone) {
    let customer = searchCustomer(custID);
    if (customer != null) {
        customer.setFname(custNameF)
        customer.setLname(custNameL)
        customer.setaddress(address);
        customer.setphone(phone)


        return true;
    } else {
        return false;
    }
}


    function loadAllCustomerToTheTable() {
        let allCustomers = getAllCustomers();
        $('#dataTable3').empty(); // clear all the table before adding for avoid duplicate
        for (var i in allCustomers) {
            let id = allCustomers[i].getCustomerID();
            let fname = allCustomers[i].getFname();
            let lname = allCustomers[i].getLname();
            let address = allCustomers[i].getaddress();
            let phoneno = allCustomers[i].getphone();
            var row = `<tr><td>${id}</td><td>${fname}</td><td>${lname}</td><td>${address}</td><td>${phoneno}</td></tr>`;
            $('#dataTable3').append(row);
        }
    }

    function clearAllCustomerText() {
        $("#CustomerID").val("");
        $("#First").val("");
        $("#last").val("");
        $("#Address").val("");
        $("#phone").val("");
    }

    // genarateCustomerID
function generateNewId() {

    var lastId = $("#dataTable3 tbody tr:last-child td:first-child").text();
    lastId = (lastId.replace(/[C]/g, ''));
    lastId=lastId+1;

    if(lastId<=10){
        lastId = "C00"+lastId;
    }else if(lastId<=100){
        lastId = "C0"+lastId;
    }else if(lastId<1000){
        lastId = "C"+lastId;
    }
    return lastId;
}

// var CustomerRegId=/^(C00-)[0-9]{1,3}$/;
//
// $('#CustomerID').on('keydown',function (event) {
//     var input=(event.key);
//     let inputID=$('#CustomerID').val();
//     if (CustomerRegId.test(inputID)){
//         $('#lblid').text('');
//         $('#CustomerID').css('border','2px solid lime');
//         if (input=="Enter"){
//             $('#First').focus();
//         }
//     }else {
//         $('#CustomerID').css('border','2px solid red');
//         $('#lblid').text('Your Input Data format Is Wrong(C00-001)');
//         $('#CustomerID').focus();
//     }
// });

// var CustomerName=/^[A-Z]{1}[a-z]{1,9}( )[A-Z]{1}[a-z]{1,9}$/;
//
// $('#First').on('keydown',function (event) {
//     var input=(event.key);
//     let inputName=$('#First').val();
//     if (CustomerName.test(inputName)){
//         $('#lblname').text('');
//         $('#First').css('border','2px solid lime');
//         if (input=="Enter"){
//             $('#input_address').focus();
//         }
//     }else {
//         $('#input_name').css('border','2px solid red');
//         $('#lblname').text('Your Input Data format Is Wrong(Ex:-Kavishka)');
//         $('#input_name').focus();
//     }
// });


function CCC() {
    var input=customerDB.length;
    var text=document.getElementById('custCount');
    text.innerText=input;
}