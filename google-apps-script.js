/**
 * GOOGLE APPS SCRIPT SECURE VERIFICATION FOR SUNRISE TRAVELS (WITH DUP PREVENTION)
 * 
 * Petunjuk Instalasi / Update:
 * 1. Buka Google Spreadsheet tempat Anda menyimpan data penumpang.
 * 2. Klik menu 'Ekstensi' (Extensions) > 'Apps Script'.
 * 3. Hapus semua kode lama di editor, lalu tempel (paste) kode baru ini.
 * 4. Klik ikon Simpan (Save).
 * 
 * PENTING - LANGKAH DEPLOY ULANG (Wajib Agar Kode Baru Aktif):
 * 5. Klik tombol biru 'Terapkan' (Deploy) di kanan atas > 'Kelola penerapan' (Manage deployments).
 * 6. Klik ikon Pensil (Edit) di kanan atas jendela popup.
 * 7. Pada bagian 'Versi' (Version), klik dropdown dan pilih 'Versi Baru' (New version).
 * 8. Klik tombol biru 'Terapkan' (Deploy) di pojok kanan bawah.
 * 9. Selesai! Sekarang sistem baru Anda sudah aktif.
 */

function doGet(e) {
  try {
    const p = e.parameter;
    const name = p.nama || "Tanpa Nama";
    const route = p.rute || "Tanpa Rute";
    const dateStr = p.tgl || ""; // YYYY-MM-DD format
    const address = p.alamat || "-";
    const passengers = p.penumpang || "1 Orang";
    const total = p.total || "Rp 0";
    
    // Dapatkan URL Apps Script dinamis
    const scriptUrl = ScriptApp.getService().getUrl();
    
    const html = getChallengeHtml(name, route, dateStr, address, passengers, total, scriptUrl, "");
    return HtmlService.createHtmlOutput(html)
                      .setTitle("Verifikasi Admin - Sunrise Travels")
                      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } catch (error) {
    return HtmlService.createHtmlOutput("<h3>Terjadi Kesalahan: " + error.toString() + "</h3>").setTitle("Error");
  }
}

function doPost(e) {
  const SECRET_PIN = "8899"; // Ganti dengan PIN rahasia pilihan Anda sendiri
  
  try {
    const p = e.parameter;
    const name = p.nama || "Tanpa Nama";
    const route = p.rute || "Tanpa Rute";
    const dateStr = p.tgl || ""; // YYYY-MM-DD format
    const address = p.alamat || "-";
    const passengers = p.penumpang || "1 Orang";
    const total = p.total || "Rp 0";
    const pin = p.pin || "";
    
    // Jika PIN salah, kembalikan ke halaman input PIN dengan pesan error
    if (pin !== SECRET_PIN) {
      const scriptUrl = ScriptApp.getService().getUrl();
      const html = getChallengeHtml(name, route, dateStr, address, passengers, total, scriptUrl, "⚠️ PIN Admin Salah!");
      return HtmlService.createHtmlOutput(html)
                        .setTitle("Verifikasi Admin - Sunrise Travels")
                        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    }
    
    // Tentukan Nama Tab berdasarkan Bulan dan Tahun Keberangkatan
    let monthYear = "General";
    if (dateStr) {
      const dateParts = dateStr.split("-"); // [YYYY, MM, DD]
      if (dateParts.length >= 2) {
        const year = dateParts[0];
        const monthNum = parseInt(dateParts[1], 10);
        const months = [
          "Januari", "Februari", "Maret", "April", "Mei", "Juni",
          "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];
        if (monthNum >= 1 && monthNum <= 12) {
          monthYear = months[monthNum - 1] + " " + year;
        }
      }
    }
    
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = doc.getSheetByName(monthYear);
    
    // JIKA TAB BARU BELUM ADA, BUAT STRUKTUR BARU (DENGAN RINGKASAN DI ATAS)
    if (!sheet) {
      sheet = doc.insertSheet(monthYear);
      
      // Setup Baris Ringkasan Pendapatan di baris 1-2
      sheet.getRange("A1").setValue("Ringkasan Pendapatan").setFontWeight("bold").setFontSize(11).setFontColor("#E05A00");
      sheet.getRange("A2").setValue("Total Uang Masuk:");
      sheet.getRange("B2").setFormula("=SUM(G5:G)").setFontWeight("bold").setNumberFormat('Rp#,##0').setFontColor("#1B7C3E");
      
      // Setup Tabel Header di baris 4
      sheet.getRange(4, 1, 1, 8).setValues([["Timestamp", "Nama Penumpang", "Rute Perjalanan", "Tanggal Keberangkatan", "Alamat Jemput & Tujuan", "Jumlah Penumpang", "Total Bayar", "Status"]]);
      
      // Berikan style tebal dan warna oranye estetik pada header
      sheet.getRange(4, 1, 1, 8)
           .setFontWeight("bold")
           .setBackground("#FFF2E6")
           .setFontColor("#E05A00")
           .setHorizontalAlignment("center");
           
      sheet.setColumnWidth(1, 160); // Timestamp
      sheet.setColumnWidth(2, 160); // Nama
      sheet.setColumnWidth(3, 200); // Rute
      sheet.setColumnWidth(4, 150); // Tanggal
      sheet.setColumnWidth(5, 300); // Alamat
      sheet.setColumnWidth(6, 120); // Penumpang
      sheet.setColumnWidth(7, 120); // Total Bayar
      sheet.setColumnWidth(8, 100); // Status
    } else {
      // JIKA TAB SUDAH ADA, LAKUKAN AUTO-MIGRASI JIKA MASIH MENGGUNAKAN LAYOUT LAMA
      
      // Cek jika baris 1 adalah header tabel lama ("Timestamp")
      if (sheet.getRange(1, 1).getValue() === "Timestamp") {
        // Sisipkan 3 baris kosong di atas untuk tempat Ringkasan
        sheet.insertRowsBefore(1, 3);
        
        // Buat Ringkasan Pendapatan di baris 1-2 baru
        sheet.getRange("A1").setValue("Ringkasan Pendapatan").setFontWeight("bold").setFontSize(11).setFontColor("#E05A00");
        sheet.getRange("A2").setValue("Total Uang Masuk:");
        sheet.getRange("B2").setFormula("=SUM(G5:G)").setFontWeight("bold").setNumberFormat('Rp#,##0').setFontColor("#1B7C3E");
        
        // Update header di baris 4 (sebelumnya bergeser dari baris 1)
        sheet.getRange("G4").setValue("Total Bayar");
        sheet.getRange("H4").setValue("Status");
        
        // Berikan format styling baru pada header
        sheet.getRange(4, 1, 1, 8)
             .setFontWeight("bold")
             .setBackground("#FFF2E6")
             .setFontColor("#E05A00")
             .setHorizontalAlignment("center");
             
        sheet.setColumnWidth(7, 120); // Total Bayar
        sheet.setColumnWidth(8, 100); // Status
      }
      
      // Bersihkan dan pindahkan nilai "LUNAS" lama yang salah masuk ke kolom Total Bayar (kolom G)
      const lastRow = sheet.getLastRow();
      if (lastRow >= 5) {
        const rangeG = sheet.getRange(5, 7, lastRow - 4, 1);
        const rangeH = sheet.getRange(5, 8, lastRow - 4, 1);
        const valuesG = rangeG.getValues();
        const valuesH = rangeH.getValues();
        
        let isModified = false;
        for (let i = 0; i < valuesG.length; i++) {
          if (valuesG[i][0] === "LUNAS" || valuesG[i][0] === "") {
            valuesG[i][0] = 0; // Set nominal ke 0 agar SUM formula berjalan normal
            valuesH[i][0] = "LUNAS"; // Pindahkan status ke kolom H
            isModified = true;
          }
        }
        if (isModified) {
          rangeG.setValues(valuesG);
          rangeH.setValues(valuesH);
        }
      }
    }
    
    // Parse nominal harga menjadi angka murni agar bisa dijumlahkan oleh SUM (misal: "Rp 280.000" -> 280000)
    let numericPrice = 0;
    if (total) {
      const cleanStr = total.replace(/[^0-9]/g, ""); // Hapus karakter non-angka
      numericPrice = parseInt(cleanStr, 10) || 0;
    }
    
    // Masukkan data penumpang ke baris baru
    const timestamp = new Date();
    sheet.appendRow([timestamp, name, route, dateStr, address, passengers, numericPrice, "LUNAS"]);
    
    // Dapatkan baris terakhir yang baru saja ditulis
    const lastRow = sheet.getLastRow();
    
    // Format nominal uang di kolom G agar berformat Rupiah rapi
    const priceCell = sheet.getRange(lastRow, 7);
    priceCell.setNumberFormat('Rp#,##0')
             .setHorizontalAlignment("right");
             
    // Style sel status LUNAS menjadi warna hijau sukses di kolom H
    const statusCell = sheet.getRange(lastRow, 8);
    statusCell.setBackground("#E2F8E8")
              .setFontColor("#1B7C3E")
              .setFontWeight("bold")
              .setHorizontalAlignment("center");
              
    // Format baris baru agar rata kiri
    sheet.getRange(lastRow, 1, 1, 6).setHorizontalAlignment("left");
    
    // Kembalikan halaman sukses
    const htmlSuccess = getSuccessHtml(name, route, dateStr, total, monthYear);
    return HtmlService.createHtmlOutput(htmlSuccess)
                      .setTitle("Konfirmasi Berhasil - Sunrise Travels")
                      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
                      
  } catch (error) {
    return HtmlService.createHtmlOutput("<h3>Terjadi Kesalahan: " + error.toString() + "</h3>").setTitle("Error");
  }
}

// Render halaman input PIN
function getChallengeHtml(name, route, dateStr, address, passengers, total, scriptUrl, errorMsg) {
  const pinWarning = errorMsg !== "" ? `<p style="color: #EF4444; font-weight: 600; font-size: 13px; margin: -10px 0 15px 0;">${errorMsg}</p>` : "";
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Outfit', sans-serif;
            background-color: #F8FAFC;
            color: #1E293B;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
            box-sizing: border-box;
          }
          .card {
            background: white;
            padding: 35px 25px;
            border-radius: 24px;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
            text-align: center;
            max-width: 400px;
            width: 100%;
            border: 1px solid #E2E8F0;
          }
          .icon {
            width: 64px;
            height: 64px;
            background-color: #FFF2E6;
            color: #E05A00;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            margin: 0 auto 20px;
            font-weight: bold;
          }
          h1 {
            font-size: 20px;
            font-weight: 800;
            color: #0B0F19;
            margin: 0 0 8px;
          }
          p.subtitle {
            font-size: 13px;
            color: #64748B;
            line-height: 1.5;
            margin: 0 0 20px;
          }
          .detail {
            background: #F8FAFC;
            border-radius: 12px;
            padding: 14px;
            text-align: left;
            font-size: 12px;
            margin-bottom: 20px;
            border: 1px solid #F1F5F9;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 6px;
            padding-bottom: 4px;
            border-bottom: 1px dashed #E2E8F0;
          }
          .detail-row:last-child {
            margin-bottom: 0;
            border-bottom: none;
            padding-bottom: 0;
          }
          .label {
            color: #64748B;
          }
          .value {
            font-weight: 600;
            color: #1E293B;
          }
          .input-group {
            margin-bottom: 20px;
          }
          input[type="password"] {
            width: 100%;
            padding: 14px;
            border: 1.5px solid #CBD5E1;
            border-radius: 12px;
            font-size: 16px;
            box-sizing: border-box;
            text-align: center;
            font-family: inherit;
            transition: border-color 0.2s;
          }
          input[type="password"]:focus {
            outline: none;
            border-color: #E05A00;
          }
          .submit-btn {
            width: 100%;
            background: #E05A00;
            color: white;
            border: none;
            padding: 14px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            transition: background 0.2s;
          }
          .submit-btn:hover {
            background: #C74E00;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="icon">🔒</div>
          <h1>Verifikasi Keamanan Admin</h1>
          <p class="subtitle">Silakan masukkan PIN keamanan Admin untuk mencatat pemesanan ini sebagai LUNAS ke Sheets.</p>
          
          <div class="detail">
            <div class="detail-row"><span class="label">Nama:</span><span class="value">${name}</span></div>
            <div class="detail-row"><span class="label">Rute:</span><span class="value">${route}</span></div>
            <div class="detail-row"><span class="label">Tanggal:</span><span class="value">${dateStr}</span></div>
            <div class="detail-row"><span class="label">Penumpang:</span><span class="value">${passengers}</span></div>
            <div class="detail-row" style="border-bottom: none;"><span class="label" style="color: #E05A00; font-weight: bold;">Total Bayar:</span><span class="value" style="color: #E05A00; font-weight: bold;">${total}</span></div>
          </div>

          <!-- Gunakan action yang mengarah ke URL Apps Script (POST) -->
          <form method="post" action="${scriptUrl}" onsubmit="return handleFormSubmit(this)">
            <input type="hidden" name="nama" value="${name}">
            <input type="hidden" name="rute" value="${route}">
            <input type="hidden" name="tgl" value="${dateStr}">
            <input type="hidden" name="alamat" value="${address}">
            <input type="hidden" name="penumpang" value="${passengers}">
            <input type="hidden" name="total" value="${total}">
            
            <div class="input-group">
              <input type="password" name="pin" placeholder="Masukkan PIN Admin" autofocus required>
            </div>
            
            ${pinWarning}
            
            <button type="submit" id="submit-btn" class="submit-btn">Konfirmasi & Simpan ke Sheets</button>
          </form>
        </div>

        <script>
          function handleFormSubmit(form) {
            const btn = document.getElementById('submit-btn');
            // Menonaktifkan tombol agar tidak bisa diklik berulang kali selama proses pengiriman
            btn.disabled = true;
            btn.innerText = "Memproses...";
            btn.style.background = "#94A3B8";
            btn.style.cursor = "not-allowed";
            return true;
          }
        </script>
      </body>
    </html>
  `;
}

// Render halaman sukses
function getSuccessHtml(name, route, dateStr, total, monthYear) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Outfit', sans-serif;
            background-color: #F8FAF6;
            color: #1E293B;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
            box-sizing: border-box;
          }
          .card {
            background: white;
            padding: 40px 30px;
            border-radius: 24px;
            box-shadow: 0 10px 30px rgba(27, 124, 62, 0.08);
            text-align: center;
            max-width: 400px;
            width: 100%;
            border: 1px solid #E2F8E8;
          }
          .icon {
            width: 72px;
            height: 72px;
            background-color: #E2F8E8;
            color: #1B7C3E;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
            margin: 0 auto 24px;
            font-weight: bold;
          }
          h1 {
            font-size: 22px;
            font-weight: 800;
            color: #0B0F19;
            margin: 0 0 12px;
          }
          p {
            font-size: 14px;
            color: #64748B;
            line-height: 1.6;
            margin: 0 0 24px;
          }
          .detail {
            background: #F8FAFC;
            border-radius: 12px;
            padding: 16px;
            text-align: left;
            font-size: 13px;
            margin-bottom: 24px;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            border-bottom: 1px dashed #E2E8F0;
            padding-bottom: 6px;
          }
          .detail-row:last-child {
            margin-bottom: 0;
            border-bottom: none;
            padding-bottom: 0;
          }
          .label {
            color: #64748B;
          }
          .value {
            font-weight: 600;
            color: #1E293B;
          }
          .close-btn {
            display: inline-block;
            background: #1B7C3E;
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 14px;
            transition: background 0.2s;
          }
          .close-btn:hover {
            background: #156331;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="icon">✓</div>
          <h1>Konfirmasi Berhasil!</h1>
          <p>Pemesanan telah diverifikasi sebagai <strong>LUNAS</strong> dan dicatat ke Google Sheets Anda.</p>
          <div class="detail">
            <div class="detail-row"><span class="label">Nama:</span><span class="value">${name}</span></div>
            <div class="detail-row"><span class="label">Rute:</span><span class="value">${route}</span></div>
            <div class="detail-row"><span class="label">Tanggal:</span><span class="value">${dateStr}</span></div>
            <div class="detail-row"><span class="label">Total Bayar:</span><span class="value" style="color: #1B7C3E; font-weight: bold;">${total}</span></div>
            <div class="detail-row" style="border-bottom: none;"><span class="label">Tab Bulan:</span><span class="value">${monthYear}</span></div>
          </div>
          <a href="javascript:window.close();" class="close-btn">Tutup Halaman</a>
        </div>
      </body>
    </html>
  `;
}
