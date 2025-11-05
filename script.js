function goTo(page) {
  const content = document.getElementById("content");

  // ======================
  // HALAMAN EDUKASI
  // ======================
  if (page === "edukasi") {
    content.innerHTML = `
      <section>
        <h2>Edukasi Anti-Bullying</h2>
        <p>
          Bullying bisa terjadi dalam berbagai bentuk: fisik, verbal, sosial, dan cyber. 
          Penting bagi kita untuk mengenali tanda-tandanya dan tidak diam saja.
        </p>
        <ul style="text-align:left;max-width:500px;margin:auto;">
          <li><b>Fisik:</b> memukul, mendorong, atau merusak barang orang lain.</li>
          <li><b>Verbal:</b> menghina, mengejek, atau menyebarkan rumor.</li>
          <li><b>Sosial:</b> mengucilkan teman dari kelompok.</li>
          <li><b>Cyber:</b> menyebar kebencian di media sosial.</li>
        </ul>
        <button onclick="goTo('home')">Kembali</button>
      </section>
    `;
  }

  // ======================
  // HALAMAN REFLEKSI DIRI
  // ======================
  else if (page === "refleksi") {
    content.innerHTML = `
      <section>
        <h2>Refleksi Diri</h2>
        <p>Jawab pertanyaan berikut untuk merenungkan sikapmu terhadap bullying.</p>

        <form id="refleksiForm">
          <label>Pernahkah kamu menyaksikan tindakan bullying?</label><br>
          <textarea id="jawaban1" rows="3" placeholder="Tulis jawabanmu di sini..."></textarea><br><br>

          <label>Bagaimana perasaanmu saat melihat atau mengalami bullying?</label><br>
          <textarea id="jawaban2" rows="3" placeholder="Tulis perasaanmu..."></textarea><br><br>

          <label>Menurutmu, apa yang bisa dilakukan untuk mencegah bullying?</label><br>
          <textarea id="jawaban3" rows="3" placeholder="Tulis pendapatmu..."></textarea><br><br>

          <button type="button" onclick="simpanRefleksi()">Simpan Jawaban</button>
          <button type="button" onclick="lihatHasil()">Lihat Hasil</button>
          <button type="button" onclick="goTo('home')">Kembali</button>
        </form>
      </section>
    `;
  }

  // ======================
  // HALAMAN HASIL REFLEKSI
  // ======================
  else if (page === "hasil") {
    const data = JSON.parse(localStorage.getItem("refleksi")) || {};
    if (data.jawaban1) {
      content.innerHTML = `
        <section>
          <h2>📘 Hasil Refleksi Diri</h2>

          <div class="card">
            <h3>Pernahkah kamu menyaksikan bullying?</h3>
            <p>${data.jawaban1}</p>
          </div>

          <div class="card">
            <h3>Bagaimana perasaanmu saat melihat atau mengalaminya?</h3>
            <p>${data.jawaban2}</p>
          </div>

          <div class="card">
            <h3>Menurutmu, apa yang bisa dilakukan untuk mencegah bullying?</h3>
            <p>${data.jawaban3}</p>
          </div>

          ${tampilkanGrafikRefleksi()}

          <button onclick="hapusHasil()">Hapus Jawaban</button>
          <button onclick="tampilkanMotivasi()">Lanjut ke Motivasi</button>
          <button onclick="goTo('refleksi')">Kembali</button>
        </section>
      `;
    } else {
      content.innerHTML = `
        <section>
          <h2>Belum Ada Data Refleksi</h2>
          <p>Isi refleksi terlebih dahulu ya 😊</p>
          <button onclick="goTo('refleksi')">Mulai Refleksi</button>
        </section>
      `;
    }
  }

  // ======================
  // HALAMAN UTAMA (HOME)
  // ======================
  else {
    content.innerHTML = `
      <section>
        <h2>Selamat Datang di SpeakUp!</h2>
        <p>
          SpeakUp! adalah media berbasis web yang membantu kamu memahami dan merenungkan isu bullying.
          Yuk mulai perjalanan edukasi dan refleksi dirimu!
        </p>
        <button onclick="goTo('edukasi')">Mulai Edukasi</button>
        <button onclick="goTo('refleksi')">Mulai Refleksi</button>
      </section>
    `;
  }
}

// ======================
// FUNGSI PENYIMPANAN
// ======================
function simpanRefleksi() {
  const data = {
    jawaban1: document.getElementById("jawaban1").value.trim(),
    jawaban2: document.getElementById("jawaban2").value.trim(),
    jawaban3: document.getElementById("jawaban3").value.trim(),
  };

  if (!data.jawaban1 || !data.jawaban2 || !data.jawaban3) {
    alert("Harap isi semua pertanyaan sebelum disimpan 🙏");
    return;
  }

  localStorage.setItem("refleksi", JSON.stringify(data));
  alert("Jawaban kamu berhasil disimpan di browser!");
}

// ======================
// NAVIGASI HALAMAN HASIL
// ======================
function lihatHasil() {
  goTo("hasil");
}

// ======================
// HAPUS HASIL REFLEKSI
// ======================
function hapusHasil() {
  if (confirm("Yakin ingin menghapus semua jawaban refleksi?")) {
    localStorage.removeItem("refleksi");
    alert("Data refleksi telah dihapus.");
    goTo("refleksi");
  }
}

// ======================
// GRAFIK REFLEKSI (SIMBOLIK)
// ======================
function tampilkanGrafikRefleksi() {
  const data = JSON.parse(localStorage.getItem("refleksi")) || {};
  if (!data.jawaban1) return "";

  // Nilai simbolik berdasarkan panjang jawaban (semakin panjang, semakin reflektif)
  const skor = Math.min(
    ((data.jawaban1.length + data.jawaban2.length + data.jawaban3.length) / 10),
    100
  );

  return `
    <div class="grafik-container">
      <p><b>Tingkat Refleksi Diri:</b></p>
      <div class="progress">
        <div class="progress-bar" style="width:${skor}%;"></div>
      </div>
      <p>${Math.round(skor)}% reflektif 🎯</p>
    </div>
  `;
}

// ======================
// HALAMAN MOTIVASI
// ======================
function tampilkanMotivasi() {
  const pesan = [
    "Kamu hebat karena mau belajar memahami perasaan orang lain 💙",
    "Empati kecil bisa membawa perubahan besar 🌱",
    "Berani bersuara, berarti kamu peduli 👏",
    "SpeakUp! – Jadilah bagian dari solusi, bukan penonton 🔊"
  ];
  const acak = pesan[Math.floor(Math.random() * pesan.length)];

  const content = document.getElementById("content");
  content.innerHTML = `
    <section>
      <h2>✨ Refleksimu Luar Biasa!</h2>
      <p>${acak}</p>
      <button onclick="goTo('home')">Kembali ke Beranda</button>
      <button onclick="goTo('edukasi')">Baca Edukasi Lagi</button>
    </section>
  `;
}
