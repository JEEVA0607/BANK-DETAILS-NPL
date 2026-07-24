// =====================================
// BANK QR MANAGER V3
// popup.js
// =====================================


if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
}


// ---------- STORAGE ----------

let banks = [];

let editingIndex = -1;


// ---------- MAIN ELEMENTS ----------

const bankContainer = document.getElementById("bankContainer");

const searchInput = document.getElementById("searchInput");

const addBankBtn = document.getElementById("addBankBtn");

const exportBtn = document.getElementById("exportBtn");

const importBtn = document.getElementById("importBtn");

const importFile = document.getElementById("importFile");

const totalBanks = document.getElementById("totalBanks");

const favoriteBanks = document.getElementById("favoriteBanks");

const toast = document.getElementById("toast");

const categoryInputs = document.getElementsByName("category");

const homeCount = document.getElementById("homeCount");

const belowCount = document.getElementById("belowCount");

const aboveCount = document.getElementById("aboveCount");

const merchantCount = document.getElementById("merchantCount");

const favoriteBtn = document.getElementById("favoriteBtn");

const favoriteCountSide = document.getElementById("favoriteCountSide");

// =========================
// OPTIONS
// =========================

const optionsBtn = document.getElementById("optionsBtn");

const optionsModal = document.getElementById("optionsModal");

const closeOptions = document.getElementById("closeOptions");

const backupBtn = document.getElementById("backupBtn");

const restoreBtn = document.getElementById("restoreBtn");

const clearAllBtn = document.getElementById("clearAllBtn");

const resetFavBtn = document.getElementById("resetFavBtn");

const logoutBtn = document.getElementById("logoutBtn");

console.log(optionsBtn);
console.log(logoutBtn);
console.log(optionsModal);


// ===========================
// SIDEBAR BUTTONS
// ===========================

const homeBtn = document.getElementById("homeBtn");

const belowBtn = document.getElementById("belowBtn");

const aboveBtn = document.getElementById("aboveBtn");

const merchantBtn = document.getElementById("merchantBtn");


favoriteBtn.addEventListener("click", () => {

    currentCategory = "FAVORITES";

    document.querySelectorAll(".menuBtn").forEach(btn =>
        btn.classList.remove("active")
    );

    favoriteBtn.classList.add("active");

    renderBanks();

});

// Current Filter

let currentCategory = "ALL";


// ---------- MODALS ----------

const addModal = document.getElementById("addModal");

const viewModal = document.getElementById("viewModal");


// ---------- FORM ----------

const displayName = document.getElementById("displayName");

const bankLogo = document.getElementById("bankLogo");

const qrImage = document.getElementById("qrImage");

const logoPreview = document.getElementById("logoPreview");

const qrPreview = document.getElementById("qrPreview");

const extraToggle = document.getElementById("extraToggle");

const extraSection = document.getElementById("extraSection");

const holderName = document.getElementById("holderName");

const accountNumber = document.getElementById("accountNumber");

const bankName = document.getElementById("bankName");

const branchName = document.getElementById("branchName");

const remarks = document.getElementById("remarks");


// ---------- BUTTONS ----------

const saveBank = document.getElementById("saveBank");

const closeModal = document.getElementById("closeModal");

const closeView = document.getElementById("closeView");

const downloadQR = document.getElementById("downloadQR");


// ---------- VIEW ----------

const viewImage = document.getElementById("viewImage");

// =====================================
// LOAD STORAGE
// =====================================


totalBanks.textContent = banks.length;

favoriteBanks.textContent = banks.filter(bank => bank.favorite).length;

renderBanks();


// =====================================
// SAVE STORAGE
// =====================================

// =====================================
// FIREBASE LIVE SYNC
// =====================================

db.collection("banks").onSnapshot((snapshot) => {

    banks = [];

    snapshot.forEach((doc) => {

        banks.push({

            id: doc.id,

            ...doc.data()

        });

    });

    totalBanks.textContent = banks.length;

    favoriteBanks.textContent =
        banks.filter(bank => bank.favorite).length;

    renderBanks();

});

// =====================================
// OPEN ADD MODAL
// =====================================

addBankBtn.addEventListener("click", () => {

    editingIndex = -1;

    clearForm();

    addModal.style.display = "flex";

});


// =====================================
// CLOSE ADD MODAL
// =====================================

closeModal.addEventListener("click", () => {

    addModal.style.display = "none";

});


// =====================================
// CLOSE VIEW MODAL
// =====================================

closeView.addEventListener("click", () => {

    viewModal.style.display = "none";

});


// =====================================
// OPTIONAL DETAILS
// =====================================

extraToggle.addEventListener("change", () => {

    if (extraToggle.checked) {

        extraSection.style.display = "block";

    } else {

        extraSection.style.display = "none";

    }

});


// =====================================
// CLEAR FORM
// =====================================

function clearForm() {

    displayName.value = "";

    bankLogo.value = "";

    qrImage.value = "";

    holderName.value = "";

    accountNumber.value = "";

    bankName.value = "";

    branchName.value = "";

    remarks.value = "";

    extraToggle.checked = false;

    extraSection.style.display = "none";

}

// =====================================
// SAVE BANK
// =====================================

saveBank.addEventListener("click", async () => {

    let selectedCategory = "";

categoryInputs.forEach(item=>{

    if(item.checked){

        selectedCategory = item.value;

    }

});

if(selectedCategory===""){

    showToast("Select a Bank Category");

    return;

}

    if (displayName.value.trim() === "") {

        showToast("Enter Display Name");
        return;

    }

    if (editingIndex === -1 &&
        (bankLogo.files.length === 0 || qrImage.files.length === 0)) {

        showToast("Select Bank logo and QR Image");
        return;

    }

    let logoData = "";
    let qrData = "";

    // Keep old images while editing
    if (editingIndex !== -1) {

        logoData = banks[editingIndex].logo;
        qrData = banks[editingIndex].qr;

    }

    // New Logo
    if (bankLogo.files.length > 0) {

        logoData = await fileToBase64(bankLogo.files[0]);

    }

    // New QR
    if (qrImage.files.length > 0) {

        qrData = await fileToBase64(qrImage.files[0]);

    }

    const bank = {

        display: displayName.value.trim(),

        logo: logoData,

        qr: qrData,

        category:selectedCategory,

        holder: holderName.value.trim(),

        account: accountNumber.value.trim(),

        bank: bankName.value.trim(),

        branch: branchName.value.trim(),

        remarks: remarks.value.trim(),

        favorite: false

    };

    if (editingIndex === -1) {

    await db.collection("banks").add(bank);

    showToast("Bank Added");

} else {

    bank.favorite = banks[editingIndex].favorite;

    await db.collection("banks")
        .doc(banks[editingIndex].id)
        .set(bank);

    showToast("Bank Updated");

}

addModal.style.display = "none";

clearForm();

});


// =====================================
// FILE → BASE64
// =====================================

function fileToBase64(file) {

    return new Promise((resolve) => {

        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);

        reader.readAsDataURL(file);

    });

}

// =====================================
// RENDER BANKS
// =====================================

homeCount.textContent = banks.length;

belowCount.textContent = banks.filter(b => b.category === "10K Below").length;

aboveCount.textContent = banks.filter(b => b.category === "10K Above").length;

merchantCount.textContent = banks.filter(b => b.category === "Merchant").length;

favoriteCountSide.textContent = banks.filter(bank => bank.favorite).length;

function renderBanks() {
    
    bankContainer.innerHTML = "";

    let filteredBanks = [...banks];

if (currentCategory === "10K Below") {

    filteredBanks = filteredBanks.filter(bank => bank.category === "10K Below");

}

else if (currentCategory === "10K Above") {

    filteredBanks = filteredBanks.filter(bank => bank.category === "10K Above");

}

else if (currentCategory === "Merchant") {

    filteredBanks = filteredBanks.filter(bank => bank.category === "Merchant");

}

if (currentCategory === "FAVORITES") {

    filteredBanks = filteredBanks.filter(bank => bank.favorite);

}

    let keyword = searchInput.value.toLowerCase();

    let filtered = filteredBanks.filter(bank =>

    bank.display.toLowerCase().includes(keyword) ||

    bank.holder.toLowerCase().includes(keyword) ||

    bank.account.toLowerCase().includes(keyword) ||

    bank.bank.toLowerCase().includes(keyword)

);

    if (filtered.length === 0) {

        bankContainer.innerHTML = `

        <div class="empty">

            No Banks Added

        </div>

        `;

        return;

    }

    filtered.forEach((bank, index) => {

        bankContainer.innerHTML += `

        <div class="bankCard" data-id="${bank.id}">

            <div class="cardHeader">

                <div class="displayName">

                    🏦 ${bank.display}

                </div>

                <div class="favorite">

                    ${bank.favorite ? "⭐" : "☆"}

                </div>

            </div>


            <div class="cardBody">

                <img class="bankLogo"

                     src="${bank.logo}">


                <div class="details">

                    <div class="detailRow">

                        <div class="detailLabel">

                            Holder Name

                        </div>

                        <div class="detailValue">

                            ${bank.holder || "-"}

                        </div>

                    </div>

                    <div class="detailRow">

                        <div class="detailLabel">

                            Account Number

                        </div>

                        <div class="detailValue">

                            ${bank.account || "-"}

                        </div>

                    </div>

                    <div class="detailRow">

                        <div class="detailLabel">

                            Bank Name

                        </div>

                        <div class="detailValue">

                            ${bank.bank || "-"}

                        </div>

                    </div>

                    <div class="detailRow">

                        <div class="detailLabel">

                            Branch Name

                        </div>

                        <div class="detailValue">

                            ${bank.branch || "-"}

                        </div>

                    </div>

                    <div class="detailRow">

                        <div class="detailLabel">

                            Remarks

                        </div>

                        <div class="detailValue">

                            ${bank.remarks || "-"}

                        </div>

                    </div>

                </div>


                <div class="qrArea">

                    <img class="qrImage"

                         src="${bank.qr}">

                </div>

            </div>


            <div class="actionBar">

                <button class="actionBtn viewBtn">

                    👁 View

                </button>

                <button class="actionBtn copyQrBtn">

                    📷 Copy QR

                </button>

                <button class="actionBtn copyDetailsBtn">

                    📄 Details

                </button>

                <button class="actionBtn copyAccBtn">

                    #️⃣ A/C

                </button>

                <button class="actionBtn editBtn">

                    ✏ Edit

                </button>

                <button class="actionBtn deleteBtn">

                    🗑 Delete

                </button>

            </div>

        </div>

        `;

    });

}


// =====================================
// SIDEBAR FILTER
// =====================================

homeBtn.addEventListener("click", () => {

    currentCategory = "ALL";

    document.querySelectorAll(".menuBtn").forEach(btn => btn.classList.remove("active"));

    homeBtn.classList.add("active");

    renderBanks();

});

belowBtn.addEventListener("click", () => {

    currentCategory = "10K Below";

    document.querySelectorAll(".menuBtn").forEach(btn => btn.classList.remove("active"));

    belowBtn.classList.add("active");

    renderBanks();

});

aboveBtn.addEventListener("click", () => {

    currentCategory = "10K Above";

    document.querySelectorAll(".menuBtn").forEach(btn => btn.classList.remove("active"));

    aboveBtn.classList.add("active");

    renderBanks();

});

merchantBtn.addEventListener("click", () => {

    currentCategory = "Merchant";

    document.querySelectorAll(".menuBtn").forEach(btn => btn.classList.remove("active"));

    merchantBtn.classList.add("active");

    renderBanks();

});

// =====================================
// OPTIONS
// =====================================

optionsBtn.addEventListener("click", () => {

    optionsModal.style.display = "flex";

});

closeOptions.addEventListener("click", () => {

    optionsModal.style.display = "none";

});

optionsModal.addEventListener("click", (e) => {

    if (e.target === optionsModal) {

        optionsModal.style.display = "none";

    }

});

logoutBtn.addEventListener("click", () => {

    if (!confirm("Logout from Panel?")) return;

    localStorage.removeItem("loggedIn");

    window.location.href = "index.html";

});

// =====================================
// BACKUP
// =====================================

backupBtn.addEventListener("click", () => {

    exportBtn.click();

    optionsModal.style.display = "none";

});

// =====================================
// RESTORE
// =====================================

restoreBtn.addEventListener("click", () => {

    importFile.click();

    optionsModal.style.display = "none";

});

// =====================================
// CLEAR ALL
// =====================================

clearAllBtn.addEventListener("click", async () => {

    if (!confirm("Delete ALL Banks?")) return;

    const snapshot = await db.collection("banks").get();

    const batch = db.batch();

    snapshot.forEach((doc) => {

        batch.delete(doc.ref);

    });

    await batch.commit();

    optionsModal.style.display = "none";

    showToast("All Banks Deleted");

});

// =====================================
// RESET FAVORITES
// =====================================

resetFavBtn.addEventListener("click", async () => {

    const snapshot = await db.collection("banks").get();

    const batch = db.batch();

    snapshot.forEach((doc) => {

        batch.update(doc.ref, {

            favorite: false

        });

    });

    await batch.commit();

    optionsModal.style.display = "none";

    showToast("Favorites Reset");

});

// =====================================
// SEARCH
// =====================================

searchInput.addEventListener("input", renderBanks);

// ---------------- COPY QR IMAGE ----------------

if (button.classList.contains("copyQrBtn")) {

    try {

        const response = await fetch(bank.qr);

        const blob = await response.blob();

        await navigator.clipboard.write([
            new ClipboardItem({
                [blob.type]: blob
            })
        ]);

        showToast("QR Image Copied");

    } catch (err) {

        console.error(err);

        showToast("QR Copy Failed");

    }

}


// =====================================
// ACTION EVENTS
// =====================================

bankContainer.addEventListener("click", async (e) => {

    const button = e.target.closest("button");

    if (!button) return;

    const card = button.closest(".bankCard");

    if (!card) return;

    const bank = banks.find(b => b.id === card.dataset.id);

    if (!bank) return;

    if (!bank) return;

    // ---------------- VIEW ----------------

    if (button.classList.contains("viewBtn")) {

        viewImage.src = bank.qr;

        viewModal.style.display = "flex";

    }

    // ---------------- COPY DETAILS ----------------

    if (button.classList.contains("copyDetailsBtn")) {

        const text =

`Holder Name : ${bank.holder}
Account No  : ${bank.account}
Bank Name   : ${bank.bank}
Branch Name : ${bank.branch}
Remarks     : ${bank.remarks}`;

        await navigator.clipboard.writeText(text);

        showToast("Bank Details Copied");

    }

    // ---------------- COPY ACCOUNT ----------------

    if (button.classList.contains("copyAccBtn")) {

        await navigator.clipboard.writeText(bank.account);

        showToast("Account Number Copied");

    }

    // ---------------- DELETE ----------------

    if (button.classList.contains("deleteBtn")) {

    if (!confirm("Delete this bank?")) return;

    await db.collection("banks")
        .doc(bank.id)
        .delete();

    showToast("Bank Deleted");

}

    // ---------------- EDIT ----------------

    if (button.classList.contains("editBtn")) {

        editingIndex = banks.findIndex(b => b.id === bank.id);

        displayName.value = bank.display;

        holderName.value = bank.holder;

        accountNumber.value = bank.account;

        bankName.value = bank.bank;

        branchName.value = bank.branch;

        remarks.value = bank.remarks;

        extraToggle.checked = true;

        extraSection.style.display = "block";

        addModal.style.display = "flex";

    }

});

// =====================================
// FAVORITE
// =====================================

bankContainer.addEventListener("dblclick", async (e) => {

    const header = e.target.closest(".favorite");

    if (!header) return;

    const card = header.closest(".bankCard");

    const bank = banks.find(b => b.id === card.dataset.id);

    if (!bank) return;

    await db.collection("banks")
        .doc(bank.id)
        .update({
            favorite: !bank.favorite
        });

});


// =====================================
// EXPORT
// =====================================

exportBtn.addEventListener("click", () => {

    const blob = new Blob(

        [JSON.stringify(banks, null, 2)],

        { type: "application/json" }

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "BankQR_Backup.json";

    a.click();

    URL.revokeObjectURL(url);

});


// =====================================
// IMPORT
// =====================================

importBtn.addEventListener("click", () => {

    importFile.click();

});


importFile.addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = async () => {

    try {

        const importedBanks = JSON.parse(reader.result);

        const snapshot = await db.collection("banks").get();

        const batch = db.batch();

        // പഴയ ബാങ്കുകൾ delete ചെയ്യുക
        snapshot.forEach((doc) => {

            batch.delete(doc.ref);

        });

        await batch.commit();

        // പുതിയ ബാങ്കുകൾ add ചെയ്യുക
        for (const bank of importedBanks) {

            delete bank.id;

            await db.collection("banks").add(bank);

        }

        showToast("Import Successful");

    } catch (e) {

        console.error(e);

        showToast("Invalid Backup File");

    }

};

    reader.readAsText(file);

});

// =====================================
// DOWNLOAD QR
// =====================================

downloadQR.addEventListener("click", () => {

    const a = document.createElement("a");

    a.href = viewImage.src;

    a.download = "QR.png";

    a.click();

});


// =====================================
// CLOSE MODAL (CLICK OUTSIDE)
// =====================================

window.addEventListener("click", (e) => {

    if (e.target === addModal) {

        addModal.style.display = "none";

    }

    if (e.target === viewModal) {

        viewModal.style.display = "none";

    }

});


// =====================================
// INITIAL RENDER
// =====================================

renderBanks();

// =====================================
// LIVE PREVIEW
// =====================================

bankLogo.addEventListener("change", () => {

    const file = bankLogo.files[0];

    if (!file) {

        logoPreview.style.display = "none";
        return;

    }

    logoPreview.src = URL.createObjectURL(file);

    logoPreview.style.display = "block";

});


qrImage.addEventListener("change", () => {

    const file = qrImage.files[0];

    if (!file) {

        qrPreview.style.display = "none";
        return;

    }

    qrPreview.src = URL.createObjectURL(file);

    qrPreview.style.display = "block";

});

// =====================================
// TOAST
// =====================================

function showToast(message){

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}
