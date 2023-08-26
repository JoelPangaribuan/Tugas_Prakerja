/*
Menghitung Jumlah Diskon Belanja
*/
import readline from "readline";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  switch (input) {
    case "belanja":
      belanja();
      break;
    default:
      console.log("No data");
      break;
  }
});

function belanja() {
  rl.question("Masukkan Total Belanja: ", (totalBelanja) => {
    if (totalBelanja >= 100000) {
      console.log("Selamat Anda Mendapatkan Diskon 20%");
      const totalbayar = totalBelanja - totalBelanja * 0.2;
      console.log(`Total belanja anda adalah: ${totalbayar}`);
      rl.close();
    }
    if (totalBelanja >= 1000000) {
      console.log("Selamat Anda Mendapatkan Diskon 50%");
      const totalbayar = totalBelanja - totalBelanja * 0.5;
      console.log(`Total belanja anda adalah: ${totalbayar}`);
      rl.close();
    } else {
      console.log("Total Belanja anda adalah :" + totalBelanja);
    }
  });
}
