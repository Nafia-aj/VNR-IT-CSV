(function () {
    emailjs.init("N2e2SbIggu5DgyLvA");
})();

function sendEmails(event) {
    event.preventDefault();

    var subject = document.getElementById("subject").value;
    var content = document.getElementById("content").value;
    var csvFile = document.getElementById("csvFile").files[0];

    if (!csvFile) {
        alert("Please select a CSV file.");
        return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
        var csvText = e.target.result;
        console.log("CSV Text:", csvText);

        Papa.parse(csvText, {
            delimiter: ",",
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: function (results) {
                if (results.errors.length > 0) {
                    console.error("Error parsing CSV:", results.errors);
                    return;
                }
                console.log("Parsed CSV data:", results.data);
                console.log("Errors:", results.errors);

                const serviceID = "service_th478dp";
                const templateID = "template_mdo1sji";

                results.data.forEach(function (row) {
                    if (row.email) {
                        var params = {
                            email: row.email,
                            subject: subject,
                            content: content,
                        };

                        emailjs.send(serviceID, templateID, params).then((res) => {
                            alert("Message sent successfully  ");
                            document.getElementById('subject').value = '';
                            document.getElementById('content').value = '';
                            document.getElementById('csvFile').value = '';
                        }).catch((err) => {
                            alert("Error sending message "+err);
                        });
                    }
                });
            }
        });
    };

    reader.readAsText(csvFile);
}








