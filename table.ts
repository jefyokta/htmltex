
// fetch('http://127.0.0.1:3000/latex', {
//   method: "POST",
//   headers: {
//     "content-type": "application/json"
//   },
//   body: JSON.stringify({
//     latex: `
//    \\section{Latar Belakang}\\par  Perkembangan teknologi informasi dan komunikasi di Indonesia semakin pesat, dan kebutuhan akan informasi yang cepat sangat dibutuhkan oleh masyarakat. Begitu juga kebutuhan akan komunikasi yang cepat dan akurat untuk menyediakan data yang valid, khususnya dalam sebuah instansi. Akses yang cepat dan akurat kini dapat diperoleh melalui teknologi yang terkoneksi dengan internet. Teknologi banyak dimanfaatkan sebagai sistem informasi, salah satunya dengan menggunakan teknologi web, di mana informasi dapat diakses tanpa batasan ruang dan waktu, seperti dalam metode pemrograman untuk membangun aplikasi menggunakan komputer.\\par Perumahan merupakan salah satu kebutuhan utama manusia yang harus di penuhi di samping pangan dan sandang, artinya setiap orang sangat memerlukan tempat tinggal atau rumah untuk berteduh dari panas dan hujan.rumah adalah bangunan yang berfungsi sebagai tempat tinggal atau hunian dan sarana pembinaan keluarga sedangkan perumahan adalah kelompok rumah yang berfungsi sebagai lingkungan tempat tinggal atau lingkungan hunian yang dilengkapi dengan sarana dan prasarana dan permukiman adalah bagian dari lingkungan hidup di luar kawasan lindung, baik berupa kawasan perkotaan maupun perdesaan yang berfungsi sebagai tempat tinggal atau hunian dan tempat kegiatan yang mendukung perikehidupan dan penghidupan (UU no. 4 tahun 1992 tentang perumahan dan pemukiman,pasal 1 ayat 2).\\par Perumahan Kamela Permai merupakan sebuah perumahan yang berada di Kabupaten Kuantan Singingi. Berdasarkan observasi langsung oleh peneliti di Perumahan Kamela Permai Bangkinang Bersama Agusman, S.E selaku Kepala Cabang, pemesanan perumahan masih dilakukan secara manual dan harus mendatangi kantor marketing untuk mendapatkan syarat-syarat pemesanan.. Hal ini menyebabkan calon pelanggan yang jauh dari lokasi perumahan sulit untuk mengetahui dan melakukan pemesanan. Oleh karena itu, diperlukan sistem informasi pemesanan perumahan agar pemesananan dapat menjangkau calon pelanggan lebih luas dan lebih mudah. Selain itu sistem informasi ini juga menyimpanan dokumen yang dipelukan untuk pemesanan hingga dapat dicari dengan mudah oleh marketing.
//     `
//   })
// }).then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.error('Error:', error));

import { convertLatexToHtml } from "./src/converter/core";


console.log(convertLatexToHtml(`
  $ \\sqrt{3} $ 
$$
   \\test{} 
$$`))