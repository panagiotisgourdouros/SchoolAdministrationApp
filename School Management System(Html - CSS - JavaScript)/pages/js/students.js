
document.body.onload = function () {

    var students = getStudents();
//    var students = null; // Case to reset date to initial one.

    if (students === null) {

        students = [];

        students.push({fname: "John", lname: "Stewart",
            dob: "15/11/1980", fees: "1500,00", email: "john_stewart@gmail.com"});
        students.push({fname: "Larry", lname: "Coleman",
            dob: "28/07/1990", fees: "1200,00", email: "larry_coleman@gmail.com"});
        students.push({fname: "Mike", lname: "Dow",
            dob: "17/12/1998", fees: "1600,00", email: "mike_dow@yahoo.com"});
        students.push({fname: "Tonny", lname: "Robins",
            dob: "18/06/2000", fees: "2000,00", email: "mary_poppins@yahoo.com"});

        setStudents(students);
    }

    updateTable();
};

// To set date in ISO format.
Date.prototype.toISODate = function() {
    return this.getFullYear() + '-' +
           ('0'+ (this.getMonth()+1)).slice(-2) + '-' +
           ('0'+ this.getDate()).slice(-2);
  };

var rIndex,
        table = document.getElementById('table');

function checkInput() {
    var cfname = document.getElementById("fname").value,
            clname = document.getElementById("lname").value,
            cdbirth = document.getElementById("dbirth").value,
            ctfee = document.getElementById("tfee").value,
            cmail = document.getElementById("mail").value;

    var d = new Date(cdbirth);
    
    var age = new Date().getFullYear() - d.getFullYear();

    if (new Date().getMonth() < d.getMonth() || 
        new Date().getMonth() === d.getMonth() && new Date().getDate() < d.getDate()) {
        age--;
    }
    
    console.log(age);

    if (cfname === "" || !/^[a-zA-Z]+$/.test(cfname)) {
        alert("Student first name is not valid");
        return false;
    } else if (clname === null|| !/^[a-zA-Z]+$/.test(clname)) {
        alert("Student last name is not valid");
        return false;
    } else if (cdbirth === "") {
        alert("Student date of birth cannot be empty");
        return false;
    } else if (age < 17 || age > 65) {
        alert("Student age must be between 17 and 65");
        return false;
    }
    else if (isNaN(parseFloat(ctfee))) {
        alert("Student tuition fees is not valid number");
        return false;
    } else if (parseFloat(ctfee) < 0) {
        alert("Student tuition fees cannot be negative");
        return false;
    } 
    else if (!validateEmail(cmail)) {
        alert("Student email is not valid");
        return false;
    }
    return true;
}

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function AddHtmlTableRow() {

    if (checkInput()) {

        var students = getStudents();

        var datePartsDob = document.getElementById("dbirth").value.split("-");

        students.push({
            fname: document.getElementById('fname').value,
            lname: document.getElementById('lname').value,
            dob: datePartsDob[2] + "/" + datePartsDob[1] + "/" + datePartsDob[0],
            fees: document.getElementById('tfee').value,
            email: document.getElementById('mail').value
        });

        setStudents(students);

        updateTable();
    }

}

function selectedRowToInput() {
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {
            rIndex = this.rowIndex;
            document.getElementById('fname').value = this.cells[0].innerHTML;
            document.getElementById('lname').value = this.cells[1].innerHTML;

            var dateParts = this.cells[2].innerHTML.split("/");
            var d = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
            document.getElementById('dbirth').value = d.toISODate();
            document.getElementById('tfee').value = parseFloat(this.cells[3].innerHTML);
            document.getElementById('mail').value = this.cells[4].innerHTML;
        };
    }
}
selectedRowToInput();

function editHtmlTableSelectedRow() {
    var cfname = document.getElementById("fname").value,
            clname = document.getElementById("lname").value,
            cdbirth = document.getElementById("dbirth").value,
            ctfee = document.getElementById("tfee").value,
            cmail = document.getElementById("mail").value;

    if (checkInput()) {

        var students = getStudents();
        var s = students[rIndex - 1];

        if (s === undefined)
            return; // If row not selected.

        s.fname = cfname;
        s.lname = clname;

        var datePartsStart = cdbirth.split("-");
        s.dob = datePartsStart[2] + "/" + datePartsStart[1] + "/" + datePartsStart[0];
        s.fees = ctfee;
        s.email = cmail;

        setStudents(students);

        updateTable();
    }
}

function removeSelectedRow() {
    var students = getStudents();

    students.splice(rIndex - 1, 1);

//    console.log(assignments);

    setStudents(students);

    updateTable();
    
    document.getElementById('fname').value = "";
    document.getElementById('lname').value = "";
    document.getElementById('dbirth').value = "";
    document.getElementById('tfee').value = "";
    document.getElementById('mail').value = "";
}

function updateTable() {

    clearTable();

    var students = getStudents();

    var s;
    for (s of students) {
        var newRow = table.insertRow(table.length),
                cell1 = newRow.insertCell(0),
                cell2 = newRow.insertCell(1),
                cell3 = newRow.insertCell(2),
                cell4 = newRow.insertCell(3),
                cell5 = newRow.insertCell(4);
        cell1.innerHTML = s.fname;
        cell2.innerHTML = s.lname;
        cell3.innerHTML = s.dob;
        cell4.innerHTML = s.fees;
        cell5.innerHTML = s.email;
    }
    selectedRowToInput();
}

function clearTable() {

    var rows = table.rows.length;

    for (var i = 1; i < rows; i++) {
        table.deleteRow(1); // 1 because 0 is head, and after 1 is deleted, 
        // second is also 1 until empty.
    }
}

// Retrieve from local storage.
function getStudents() {
    return JSON.parse(localStorage.getItem("students"));
}

// Save to local storage.
function setStudents(students) {
    localStorage.setItem("students", JSON.stringify(students));
}