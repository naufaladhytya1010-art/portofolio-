const form = document.getElementById("form");
const saldoEl = document.getElementById("saldo");
const riwayatEl = document.getElementById("riwayat");
const resetBtn = document.getElementById("resetbtn");

let transaksi = JSON.parse(localStorage.getItem("transaksi")) || [];

function tampilkanData() {
    riwayatEl.innerHTML = "";

    let saldo = 0;

    transaksi.forEach(item => {
        const li = document.createElement("li");

        li.classList.add(item.tipe);

        li.textContent =
            `${item.nama} - Rp ${item.jumlah.toLocaleString("id-ID")}`;

        riwayatEl.appendChild(li);

        if (item.tipe === "masuk") {
            saldo += item.jumlah;
        } else {
            saldo -= item.jumlah;
        }
    });

    saldoEl.textContent =
        `Rp ${saldo.toLocaleString("id-ID")}`;

    localStorage.setItem(
        "transaksi",
        JSON.stringify(transaksi)
    );
}

form.addEventListener("submit", e => {
    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const jumlah = parseInt(
        document.getElementById("jumlah").value
    );
    const tipe = document.getElementById("tipe").value;

    transaksi.push({
        nama,
        jumlah,
        tipe
    });

    tampilkanData();
    form.reset();
});

resetBtn.addEventListener("click", () => {
    if (confirm("Apakah Anda yakin ingin mereset semua data?")) {
        transaksi = [];
        tampilkanData();
    }
});

tampilkanData();