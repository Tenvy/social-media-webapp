export function hitungSelisihWaktu(tanggalKomentar: Date): string {
    // Dapatkan tanggal hari ini
    const tanggalHariIni = new Date();
  
    // Hitung selisih waktu dalam milisekon
    const selisihWaktu = tanggalHariIni.getTime() - tanggalKomentar.getTime();
  
    // Konversi selisih waktu ke dalam hari, minggu, bulan, dan tahun
    const hari = Math.floor(selisihWaktu / (1000 * 60 * 60 * 24));
    const minggu = Math.floor(hari / 7);
    const bulan = Math.floor(hari / 30);
    const tahun = Math.floor(hari / 365);
  
    // Pilih format teks berdasarkan selisih waktu
    let hasil: string;
    if (hari === 0) {
      hasil = "Hari ini";
    } else if (tahun >= 2) {
      hasil = `${tahun} tahun yang lalu`;
    } else if (bulan >= 2) {
      hasil = `${bulan} bulan yang lalu`;
    } else if (minggu >= 2) {
      hasil = `${minggu} minggu yang lalu`;
    } else {
      hasil = `${hari} hari yang lalu`;
    }
  
    return hasil;
  }