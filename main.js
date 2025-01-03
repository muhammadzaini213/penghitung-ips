function buatTabel() {
    let matkul = parseInt(document.getElementById("jumlah_matkul").value);

    if (matkul <= 0) {
        alert("Kosong cok");
        return;
    }
    if (isNaN(matkul)) {
        alert("Itu bukan nomor anjir");
        return;
    }

    // Get the container
    const tableContainer = document.getElementById("tableContainer");

    // Clear previous table and button if they exist
    tableContainer.innerHTML = "";

    // Create a table element
    const table = document.createElement("table");
    table.border = "1";
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.style.textAlign = "left";

    // Create table header
    const header = table.insertRow();
    ["Matkul", "SKS", "Nilai"].forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        th.style.padding = "8px";
        th.style.backgroundColor = "#f2f2f2";
        header.appendChild(th);
    });

    // Create rows based on 'matkul' value
    for (let i = 0; i < matkul; i++) {
        const row = table.insertRow();

        // Add cell for Matkul
        const matkulCell = row.insertCell();
        matkulCell.contentEditable = true;
        matkulCell.style.padding = "8px";

        // Add cell for SKS
        const sksCell = row.insertCell();
        sksCell.contentEditable = true;
        sksCell.style.padding = "8px";

        // Add dropdown for Nilai
        const nilaiCell = row.insertCell();
        const select = document.createElement("select");
        ["A", "AB", "B", "BC", "C", "D", "E"].forEach(optionText => {
            const option = document.createElement("option");
            option.value = optionText;
            option.textContent = optionText;
            select.appendChild(option);
        });
        nilaiCell.appendChild(select);
        nilaiCell.style.padding = "8px";
    }

    // Append the table to the container
    tableContainer.appendChild(table);

    // Create and append a button below the table
    const button = document.createElement("button");
    button.textContent = "Hitung IPS";
    button.style.marginTop = "10px";
    button.onclick = function () {
        submitTableData();
    };
    tableContainer.appendChild(button);
}

async function submitTableData() {
    const table = document.querySelector("#tableContainer table");
    if (!table) {
        alert("No table found!");
        return;
    }

    const gradeMap = {
        A: 4,
        AB: 3.5,
        B: 3,
        BC: 2.5,
        C: 2,
        D: 1,
        E: 0
    };

    let total = 0;
    let totalSKS = 0;
    let logData = "Matkul\tSKS\tNilai\n"; // Initialize logData with the header row

    // Loop through the rows of the table (excluding the header)
    for (let i = 1; i < table.rows.length; i++) {
        const row = table.rows[i];
        const matkul = row.cells[0].textContent.trim(); // Matkul column
        const sksCell = row.cells[1].textContent.trim(); // SKS column
        const nilaiCell = row.cells[2].querySelector("select").value; // Nilai dropdown

        const sks = parseFloat(sksCell);
        const nilaiIndex = gradeMap[nilaiCell];

        if (!isNaN(sks) && nilaiIndex !== undefined) {
            total += sks * nilaiIndex;
            totalSKS += sks;

            // Append the current row's data to logData
            logData += `${matkul}\t${sks}\t${nilaiCell}\n`;
        } else {
            alert(`Data apa di baris ${i} cok`);
        }
    }

    if (totalSKS > 0) {
        const ips = (total / totalSKS).toFixed(2);

        // Append the IPS to logData
        logData += `IPS: ${ips}`;

        // Display the IPS below the table
        const ipsElement = document.createElement("h3");
        ipsElement.textContent = `IPS kamu: ${ips}`;
        const tableContainer = document.getElementById("tableContainer");
        tableContainer.appendChild(ipsElement);
    } else {
        alert("Bentar ngeleg.");
    }

    // Log the collected data to the console
    console.log(logData);

}

