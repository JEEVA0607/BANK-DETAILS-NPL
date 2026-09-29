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

const closedBtn = document.getElementById("closedBtn");

const closedCount = document.getElementById("closedCount");

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

closedBtn.addEventListener("click", () => {

    currentCategory = "CLOSED";

    document.querySelectorAll(".menuBtn").forEach(btn =>
        btn.classList.remove("active")
    );

    closedBtn.classList.add("active");

    renderBanks();

});

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

let bankLogos = [];

const defaultBankNames = [

    "Agricultural Development Bank Ltd.",
    "Best Finance Company Ltd.",
    "Central Finance Ltd",
    "Citizens Bank International Limited",
    "Corporate Development Bank Ltd.",
    "Everest Bank Limited",
    "Excel Development Bank Ltd.",
    "Garima Bikas Bank Limited",
    "Global IME Bank Limited",
    "Goodwill Finance Limited",
    "Green Development Bank Ltd.",
    "Guheswori Merchant Banking and Finance Limited",
    "Gurkhas Finance Limited",
    "Himalayan Bank Limited",
    "ICFC Finance Limited",
    "Janaki Finance Ltd.",
    "Jyoti Bikash Bank Ltd",
    "Kamana Sewa Bikas Bank Ltd.",
    "Kumari Bank Limited",
    "Laxmi Sunrise Bank Limited",
    "Lumbini Bikas Bank Limited",
    "Machhapuchchhre Bank Limited",
    "Mahalaxmi Bikas Bank Ltd.",
    "Manjushree Finance Limited",
    "Miteri Development Bank Limited",
    "Muktinath Bikas Bank Limited",
    "Multipurpose Finance Limited",
    "Nabil Bank Limited",
    "Narayani Development Bank Limited",
    "Nepal Bank Limited",
    "Nepal Finance Limited",
    "Nepal Infrastructure Bank Ltd.",
    "Nepal Investment Mega Bank Limited",
    "Nepal SBI Bank Limited",
    "NIC Asia Bank Limited",
    "NMB Bank Limited",
    "Pokhara Finance Ltd.",
    "Prabhu Bank Limited",
    "Prime Commercial Bank Limited",
    "Progressive Finance Co. Ltd.",
    "Rastriya Banijya Bank Limited",
    "Reliance Finance Ltd.",
    "Salapa Bikas Bank Ltd.",
    "Samriddhi Finance Company Ltd.",
    "Sanima Bank Ltd.",
    "Saptakoshi Development Bank Ltd.",
    "Shangrila Development Bank Limited",
    "Shine Resunga Development Bank Ltd.",
    "Shree Investment & Finance Co. Limited",
    "Siddhartha Bank Limited",
    "Sindhu Bikash Bank Ltd.",
    "Standard Chartered Bank Nepal Limited"

];


let selectedBankLogo = "";


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

// =====================================
// BANK DROPDOWN
// =====================================

const bankSearchInput =
    document.getElementById("bankSearchInput");

const bankDropdown =
    document.getElementById("bankDropdown");

const selectedBankPreview =
    document.getElementById("selectedBankPreview");

const selectedBankText =
    document.getElementById("selectedBankText");



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


// =====================================
// SAVE STORAGE
// =====================================
// =====================================
// BANK LOGOS LIVE SYNC
// =====================================

db.collection("bankLogos").onSnapshot((snapshot) => {

    bankLogos = [];

    snapshot.forEach((doc) => {

        bankLogos.push({

            id: doc.id,

            ...doc.data()

        });

    });

    // =========================
    // BANK LOGO COUNT
    // =========================

    if (bankLogoCount) {

        bankLogoCount.textContent =
            bankLogos.length;

    }

    renderBankDropdown();

    renderBankLogoManager();

});



// =====================================
// FIREBASE LIVE SYNC
// =====================================

// =====================================
// FIREBASE LIVE SYNC
// =====================================

// =====================================
// FIREBASE LIVE SYNC
// =====================================

console.log("POPUP JS STARTED");

db.collection("banks")
    .onSnapshot(
        (snapshot) => {

            console.log("FIREBASE CONNECTED");
            console.log("BANK COUNT:", snapshot.size);

            banks = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // COUNTS
            homeCount.textContent = banks.length;

            belowCount.textContent =
                banks.filter(b => b.category === "10K Below").length;

            aboveCount.textContent =
                banks.filter(b => b.category === "10K Above").length;

            merchantCount.textContent =
                banks.filter(b => b.category === "Merchant").length;

            favoriteCountSide.textContent =
                banks.filter(b => b.favorite).length;

            closedCount.textContent =
                banks.filter(b => b.status === "CLOSED").length;

            totalBanks.textContent = banks.length;

            favoriteBanks.textContent =
                banks.filter(b => b.favorite).length;

            const totalBanks2 =
                document.getElementById("totalBanks2");

            const favoriteBanks2 =
                document.getElementById("favoriteBanks2");

            if (totalBanks2) {
                totalBanks2.textContent = banks.length;
            }

            if (favoriteBanks2) {
                favoriteBanks2.textContent =
                    banks.filter(b => b.favorite).length;
            }

            renderBanks();
            renderBankDropdown();

        },

        (error) => {

            console.error(
                "FIRESTORE ERROR:",
                error.code,
                error.message
            );

        }
    );




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

    qrImage.value = "";

    holderName.value = "";

    accountNumber.value = "";

    bankName.value = "";

    bankSearchInput.value = "";

    branchName.value = "";

    remarks.value = "";

    selectedBankLogo = "";

    logoPreview.src = "";

    logoPreview.style.display = "none";

    selectedBankText.textContent =
        "No Bank Selected";

    extraToggle.checked = false;

    extraSection.style.display = "none";

    document.querySelectorAll(
        'input[name="category"]'
    ).forEach(item => {

        item.checked = false;

    });

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

    showToast("Select a Bank Category", "warning");

    return;

}

    if (displayName.value.trim() === "") {

        showToast("Enter Display Name");
        return;

    }

if (editingIndex === -1 &&
    qrImage.files.length === 0) {

    showToast("Select QR Image");
    return;

}


let logoData = "";
let qrData = "";

if (editingIndex !== -1) {

    logoData = banks[editingIndex].logo || "";

    qrData = banks[editingIndex].qr || "";

}

if (selectedBankLogo) {

    logoData = selectedBankLogo;

}


    // New QR
    if (qrImage.files.length > 0) {

        qrData = await uploadToCloudinary(qrImage.files[0]);

    }

const bank = {

    display: displayName.value.trim(),

    logo: logoData,

    qr: qrData,

    category: selectedCategory,

    holder: holderName.value.trim(),

    account: accountNumber.value.trim(),

    bank: bankName.value.trim(),

    branch: branchName.value.trim(),

    remarks: remarks.value.trim(),

    favorite:
        editingIndex !== -1
            ? banks[editingIndex].favorite
            : false,

    status:
        editingIndex !== -1
            ? (banks[editingIndex].status || "ACTIVE")
            : "ACTIVE"

};

try {

    if (editingIndex !== -1) {

        const bankId = banks[editingIndex].id;

        await db
            .collection("banks")
            .doc(bankId)
            .update(bank);

        showToast("Bank Updated");

    } else {

        await db
            .collection("banks")
            .add({

                ...bank,

                createdAt:
                    firebase.firestore.FieldValue.serverTimestamp()

            });

        showToast("Bank Added");

    }

    addModal.style.display = "none";

    clearForm();

} catch (error) {

    console.error("Bank Save Error:", error);

    showToast("Bank Save Failed", "error");

}

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

// =====================================
// RENDER BANKS - OPTIMIZED
// =====================================

function renderBanks() {

    // Clear container once
    bankContainer.innerHTML = "";

    let filteredBanks = [...banks];

    // ---------------------------------
    // CLOSED FILTER
    // ---------------------------------

    if (currentCategory !== "CLOSED") {

        filteredBanks = filteredBanks.filter(
            bank => bank.status !== "CLOSED"
        );

    }

    // ---------------------------------
    // CATEGORY FILTER
    // ---------------------------------

    if (currentCategory === "10K Below") {

        filteredBanks = filteredBanks.filter(
            bank => bank.category === "10K Below"
        );

    }

    else if (currentCategory === "10K Above") {

        filteredBanks = filteredBanks.filter(
            bank => bank.category === "10K Above"
        );

    }

    else if (currentCategory === "Merchant") {

        filteredBanks = filteredBanks.filter(
            bank => bank.category === "Merchant"
        );

    }

    // ---------------------------------
    // CLOSED
    // ---------------------------------

    else if (currentCategory === "CLOSED") {

        filteredBanks = filteredBanks.filter(
            bank => bank.status === "CLOSED"
        );

    }

    // ---------------------------------
    // FAVORITES
    // ---------------------------------

    if (currentCategory === "FAVORITES") {

        filteredBanks = filteredBanks.filter(
            bank => bank.favorite
        );

    }

    // ---------------------------------
    // SEARCH
    // ---------------------------------

    const keyword =
        (searchInput.value || "")
            .toLowerCase()
            .trim();

    const filtered = filteredBanks.filter(bank => {

        return (

            (bank.display || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (bank.holder || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (bank.account || "")
                .toLowerCase()
                .includes(keyword)

            ||

            (bank.bank || "")
                .toLowerCase()
                .includes(keyword)

        );

    });

    // ---------------------------------
    // EMPTY
    // ---------------------------------

    if (filtered.length === 0) {

        bankContainer.innerHTML = `

            <div class="empty">

                No Banks Added

            </div>

        `;

        return;

    }

    // ---------------------------------
    // CREATE HTML ONCE
    // ---------------------------------

    const html = filtered.map(bank => {

        const logo =
            optimizeCloudinary(bank.logo || "", 120);

        const qr =
            optimizeCloudinary(bank.qr || "", 400);

        return `

        <div
            class="bankCard"
            data-id="${bank.id}"
        >

            <!-- HEADER -->

            <div class="cardHeader">

                <div class="displayName">

                    🏦
                    ${escapeHTML(bank.display || "")}

                </div>

                <div class="favorite">

                    ${bank.favorite ? "⭐" : "☆"}

                </div>

            </div>


            <!-- BODY -->

            <div class="cardBody">


                <!-- BANK LOGO -->

                <img
                    class="bankLogo"
                    src="${logo}"
                    loading="lazy"
                    decoding="async"
                    alt="Bank Logo"
                >


                <!-- DETAILS -->

                <div class="details">


                    <div class="detailRow">

                        <div class="detailLabel">

                            Holder Name

                        </div>

                        <div class="detailValue">

                            ${escapeHTML(
                                bank.holder || "-"
                            )}

                        </div>

                    </div>


                    <div class="detailRow">

                        <div class="detailLabel">

                            Account Number

                        </div>

                        <div class="detailValue">

                            ${escapeHTML(
                                bank.account || "-"
                            )}

                        </div>

                    </div>


                    <div class="detailRow">

                        <div class="detailLabel">

                            Bank Name

                        </div>

                        <div class="detailValue">

                            ${escapeHTML(
                                bank.bank || "-"
                            )}

                        </div>

                    </div>


                    <div class="detailRow">

                        <div class="detailLabel">

                            Branch Name

                        </div>

                        <div class="detailValue">

                            ${escapeHTML(
                                bank.branch || "-"
                            )}

                        </div>

                    </div>


                    <div class="detailRow">

                        <div class="detailLabel">

                            Remarks

                        </div>

                        <div class="detailValue">

                            ${escapeHTML(
                                bank.remarks || "-"
                            )}

                        </div>

                    </div>


                </div>


                <!-- QR -->

                <div class="qrArea">

                    <img
                        class="qrImage"
                        src="${qr}"
                        loading="lazy"
                        decoding="async"
                        alt="QR Code"
                    >

                </div>


            </div>


            <!-- ACTION BAR -->

            <div class="actionBar">


                ${
                    currentCategory === "CLOSED"

                    ?

                    `

                    <button
                        class="actionBtn reactivateBtn"
                    >

                        ✅ Reactivate

                    </button>


                    <button
                        class="actionBtn deleteBtn"
                    >

                        🗑 Delete

                    </button>

                    `

                    :

                    `

                    <button
                        class="actionBtn viewBtn"
                    >

                        👁 View

                    </button>


                    <button
                        class="actionBtn copyQrBtn"
                    >

                        📷 Copy QR

                    </button>


                    <button
                        class="actionBtn copyDetailsBtn"
                    >

                        📄 Details

                    </button>


                    <button
                        class="actionBtn copyAccBtn"
                    >

                        📦 Move

                    </button>


                    <button
                        class="actionBtn editBtn"
                    >

                        ✏ Edit

                    </button>


                    <button
                        class="actionBtn deleteBtn"
                    >

                        🗑 Delete

                    </button>

                    `
                }


            </div>


        </div>

        `;

    }).join("");


    // ---------------------------------
    // ONE DOM UPDATE
    // ---------------------------------

    bankContainer.innerHTML = html;

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
Branch Name : ${bank.branch}`;

        await navigator.clipboard.writeText(text);

        showToast("Bank Details Copied");

    }



if (button.classList.contains("copyQrBtn")) {

    try {

        const response = await fetch(bank.qr);
        let blob = await response.blob();

        // JPEG → PNG
        if (blob.type !== "image/png") {

            const img = new Image();

            img.src = URL.createObjectURL(blob);

            await new Promise(resolve => img.onload = resolve);

            const canvas = document.createElement("canvas");

            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext("2d");

            ctx.drawImage(img, 0, 0);

            blob = await new Promise(resolve =>
                canvas.toBlob(resolve, "image/png")
            );

        }

        await navigator.clipboard.write([
            new ClipboardItem({
                "image/png": blob
            })
        ]);

        showToast("QR Image Copied");

    } catch (err) {

        console.error(err);

        showToast("QR Copy Failed");

    }

}

if (button.classList.contains("reactivateBtn")) {

    if (!confirm("Reactivate this bank?")) return;

    await db.collection("banks")
        .doc(bank.id)
        .update({
            status: "ACTIVE"
        });

    showToast("Bank Reactivated");

    return;

}

    // ---------------- DELETE ----------------

if (button.classList.contains("deleteBtn")) {

    const result = await Swal.fire({
        title: "Delete this bank?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#6c757d"
    });

    if (!result.isConfirmed) return;

    await db.collection("banks")
        .doc(bank.id)
        .delete();

    showToast("Bank Deleted");

}


if (button.classList.contains("copyAccBtn")) {

    if (!confirm("Move this bank to Temporary Closed?")) return;

    bank.status = "CLOSED";

    await db.collection("banks")
        .doc(bank.id)
        .update({
            status: "CLOSED"
        });

    showToast("Moved to Temporary Closed");

    return;

}

    // ---------------- EDIT ----------------

    if (button.classList.contains("editBtn")) {

        editingIndex = banks.findIndex(b => b.id === bank.id);

        displayName.value = bank.display;

        holderName.value = bank.holder;

        accountNumber.value = bank.account;

        bankName.value = bank.bank;

        bankSearchInput.value = bank.bank;

selectedBankLogo = bank.logo || "";

selectedBankText.textContent =
    bank.bank || "No Bank Selected";

    document.querySelectorAll('input[name="category"]').forEach(item => {

    item.checked = item.value === bank.category;

});


if(bank.logo){

    logoPreview.src = bank.logo;

    logoPreview.style.display = "block";

}else{

    logoPreview.style.display = "none";

}


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

function showToast(message, type = "success") {

    Swal.fire({
        toast: true,
        position: "top-end",
        icon: type,
        title: message,
        showConfirmButton: false,
        timer: 1800,
        timerProgressBar: true
    });

}


// =====================================
// RIGHT SIDEBAR BUTTONS
// =====================================

const addBankBtn2 = document.getElementById("addBankBtn2");
const exportBtn2 = document.getElementById("exportBtn2");
const importBtn2 = document.getElementById("importBtn2");

const settingsBtn2 = document.getElementById("settingsBtn2");

const gridViewBtn = document.getElementById("gridViewBtn");
const listViewBtn = document.getElementById("listViewBtn");


// Add Bank
if(addBankBtn2){
    addBankBtn2.addEventListener("click", () => {
        editingIndex = -1;
clearForm();
addModal.style.display = "flex";
    });
}

// Export
if(exportBtn2){
    exportBtn2.addEventListener("click", () => {
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
}

// Import
if(importBtn2){
    importBtn2.addEventListener("click", () => {
        importFile.click();
    });
}

// Settings
if(settingsBtn2){
    settingsBtn2.addEventListener("click", () => {
        optionsModal.style.display = "flex";
    });
}

if(gridViewBtn){
    gridViewBtn.addEventListener("click", () => {

        document.body.classList.remove("listMode");
        document.body.classList.add("gridMode");

        localStorage.setItem("viewMode","grid");

    });
}

if(listViewBtn){
    listViewBtn.addEventListener("click", () => {

        document.body.classList.remove("gridMode");
        document.body.classList.add("listMode");

        localStorage.setItem("viewMode","list");

    });
}


// Load saved mode
const savedView = localStorage.getItem("viewMode");

if(savedView === "list"){
    document.body.classList.add("listMode");
    document.body.classList.remove("gridMode");
}

// =====================================
// BANK DROPDOWN FUNCTIONS
// =====================================

function getAvailableBanks(){

    const firebaseNames =
        bankLogos
            .map(item => item.name)
            .filter(Boolean);

    const allNames =
        [...defaultBankNames, ...firebaseNames];

    return [...new Set(allNames)].sort();

}


function getBankLogo(name){

    const item = bankLogos.find(
        b =>
            b.name &&
            b.name.toLowerCase() === name.toLowerCase()
    );

    return item ? item.logo : "";

}


function renderBankDropdown(keyword = ""){

    if(!bankDropdown) return;

    const search =
        String(keyword || "").toLowerCase().trim();

    const names =
        getAvailableBanks().filter(name =>
            name.toLowerCase().includes(search)
        );

    bankDropdown.innerHTML = "";

    if(names.length === 0){

        bankDropdown.innerHTML = `
            <div class="bankOption">
                No Bank Found
            </div>
        `;

        return;

    }

    names.forEach(name => {

        const logo = getBankLogo(name);

        const option =
            document.createElement("div");

        option.className = "bankOption";

        option.innerHTML = `
            ${
                logo
                ?
                `<img src="${logo}">`
                :
                `<div class="noBankLogo">🏦</div>`
            }

            <div class="bankOptionName">
                ${escapeHTML(name)}
            </div>
        `;

        option.addEventListener("click", () => {
            selectBank(name);
        });

        bankDropdown.appendChild(option);

    });

}



function selectBank(name){

    bankName.value = name;

    bankSearchInput.value = name;

    selectedBankLogo = getBankLogo(name);

    selectedBankText.textContent = name;

    if(selectedBankLogo){

        logoPreview.src = selectedBankLogo;

        logoPreview.style.display = "block";

    }else{

        logoPreview.style.display = "none";

    }

    bankDropdown.classList.remove("show");

}

bankSearchInput.addEventListener("focus", () => {

    renderBankDropdown(
        bankSearchInput.value
    );

    bankDropdown.classList.add("show");

});


bankSearchInput.addEventListener("input", () => {

    renderBankDropdown(
        bankSearchInput.value
    );

    bankDropdown.classList.add("show");

});


document.addEventListener("click", (e) => {

    if(!e.target.closest("#bankSelector")){

        bankDropdown.classList.remove("show");

    }

});


// =====================================
// BANK LOGO MANAGER
// =====================================

const bankLogoBtn =
    document.getElementById("bankLogoBtn");

const bankLogoCount =
    document.getElementById("bankLogoCount");

const bankLogoModal =
    document.getElementById("bankLogoModal");

const closeBankLogoModal =
    document.getElementById("closeBankLogoModal");

const logoBankName =
    document.getElementById("logoBankName");

const logoBankFile =
    document.getElementById("logoBankFile");

const bankLogoManagerPreview =
    document.getElementById(
        "bankLogoManagerPreview"
    );

const saveBankLogo =
    document.getElementById("saveBankLogo");

const logoSearch =
    document.getElementById("logoSearch");

const bankLogoList =
    document.getElementById("bankLogoList");

let editingLogoId = null;

let logoPreviewData = "";


bankLogoBtn.addEventListener("click", () => {

    document.querySelectorAll(".menuBtn")
        .forEach(btn =>
            btn.classList.remove("active")
        );

    bankLogoBtn.classList.add("active");

    bankLogoModal.style.display = "flex";

    renderBankLogoManager();

});


closeBankLogoModal.addEventListener("click", () => {

    bankLogoModal.style.display = "none";

    clearLogoManagerForm();

});


logoBankFile.addEventListener("change", async () => {

    const file = logoBankFile.files[0];

    if(!file) return;

    logoPreviewData = await uploadToCloudinary(file);

    bankLogoManagerPreview.src =
        logoPreviewData;

    bankLogoManagerPreview.style.display =
        "block";

});


saveBankLogo.addEventListener("click", async () => {

    const name =
        logoBankName.value.trim();

    if(!name){

        showToast("Enter Bank Name");

        return;

    }

    if(!logoPreviewData){

        showToast("Select Bank Logo");

        return;

    }

    try{

        if(editingLogoId){

            await db.collection("bankLogos")
                .doc(editingLogoId)
                .update({

                    name: name,

                    logo: logoPreviewData

                });

            showToast("Bank Logo Updated");

        }else{

            const existing =
                bankLogos.find(
                    b =>
                    b.name.toLowerCase() ===
                    name.toLowerCase()
                );

            if(existing){

                await db.collection("bankLogos")
                    .doc(existing.id)
                    .update({

                        name: name,

                        logo: logoPreviewData

                    });

                showToast("Bank Logo Updated");

            }else{

                await db.collection("bankLogos")
                    .add({

                        name: name,

                        logo: logoPreviewData,

                        createdAt:
                            firebase.firestore.FieldValue.serverTimestamp()

                    });

                showToast("Bank Logo Added");

            }

        }

        clearLogoManagerForm();

    }catch(error){

        console.error(error);

        showToast("Logo Save Failed");

    }

});


function clearLogoManagerForm(){

    editingLogoId = null;

    logoBankName.value = "";

    logoBankFile.value = "";

    logoPreviewData = "";

    bankLogoManagerPreview.src = "";

    bankLogoManagerPreview.style.display =
        "none";

}


function renderBankLogoManager(){

    if(!bankLogoList) return;

    const keyword =
        (logoSearch.value || "")
        .toLowerCase()
        .trim();

const filtered =
    bankLogos.filter(bank =>
        (bank.name || "")
            .toLowerCase()
            .includes(keyword)
    );


    bankLogoList.innerHTML = "";

    if(filtered.length === 0){

        bankLogoList.innerHTML = `
            <div class="empty">
                No Bank Logos Added
            </div>
        `;

        return;

    }

    filtered.forEach(bank => {

        const item =
            document.createElement("div");

        item.className =
            "logoManagerItem";

        item.innerHTML = `

            <img src="${bank.logo}">

            <div class="logoManagerName">
                ${escapeHTML(bank.name)}
            </div>

            <div class="logoManagerActions">

                <button
                    class="logoEditBtn"
                    data-id="${bank.id}">
                    ✏️ Edit
                </button>

                <button
                    class="logoDeleteBtn"
                    data-id="${bank.id}">
                    🗑
                </button>

            </div>

        `;

        bankLogoList.appendChild(item);

    });

}


logoSearch.addEventListener("input", () => {

    renderBankLogoManager();

});


bankLogoList.addEventListener("click", async (e) => {

    const editBtn =
        e.target.closest(".logoEditBtn");

    const deleteBtn =
        e.target.closest(".logoDeleteBtn");


    if(editBtn){

        const id = editBtn.dataset.id;

        const bank =
            bankLogos.find(b => b.id === id);

        if(!bank) return;

        editingLogoId = bank.id;

        logoBankName.value =
            bank.name;

        logoPreviewData =
            bank.logo;

        bankLogoManagerPreview.src =
            bank.logo;

        bankLogoManagerPreview.style.display =
            "block";

        return;

    }


    if(deleteBtn){

        const id =
            deleteBtn.dataset.id;

        const bank =
            bankLogos.find(b => b.id === id);

        if(!bank) return;

        if(!confirm(
            `Delete logo for ${bank.name}?`
        )) return;

        await db.collection("bankLogos")
            .doc(id)
            .delete();

        showToast("Bank Logo Deleted");

    }

});

function escapeHTML(value){

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}

// =====================================
// CLOUDINARY UPLOAD
// =====================================

const CLOUDINARY_CLOUD_NAME = "wychgvzg";
const CLOUDINARY_UPLOAD_PRESET = "bank_qr_upload";

async function uploadToCloudinary(file) {

    const formData = new FormData();

    formData.append("file", file);
    formData.append(
        "upload_preset",
        CLOUDINARY_UPLOAD_PRESET
    );

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
            method: "POST",
            body: formData
        }
    );

    if (!response.ok) {

        const errorText = await response.text();

        console.error(
            "Cloudinary Upload Error:",
            errorText
        );

        throw new Error("Cloudinary upload failed");
    }

    const data = await response.json();

    return data.secure_url;
}

// =====================================
// CLOUDINARY IMAGE OPTIMIZATION
// =====================================

function optimizeCloudinary(url, width) {

    if (!url || !url.includes("res.cloudinary.com")) {
        return url;
    }

    return url.replace(
        "/image/upload/",
        `/image/upload/f_auto,q_auto,w_${width}/`
    );
}
