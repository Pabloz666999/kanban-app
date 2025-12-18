<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="relative flex min-h-screen w-full flex-col font-display bg-background-light dark:bg-background-dark text-[#0e141b] dark:text-gray-200">
    <!-- Top Navigation Bar -->
    <header class="sticky top-0 z-10 flex w-full items-center justify-between whitespace-nowrap px-4 py-5 sm:px-6 lg:px-8 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center gap-4 text-[#0e141b] dark:text-white cursor-pointer" @click="router.push('/')">
        <div class="size-6">
          <svg fill="currentColor" viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"></path>
            <path clip-rule="evenodd" d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z" fill-rule="evenodd"></path>
          </svg>
        </div>
        <h2 class="text-lg font-bold leading-tight tracking-[-0.015em] text-[#0e141b] dark:text-white cursor-pointer" @click="router.push('/')">
          KanbanApp
        </h2>
      </div>
      <div class="flex items-center gap-4">
        <router-link to="/login" class="text-sm font-medium hover:text-primary transition-colors">Masuk</router-link>
        <router-link to="/register" class="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
          Daftar
        </router-link>
      </div>
    </header>

    <main class="flex w-full flex-1 flex-col items-center px-4 py-12">
      <div class="w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-12">
        <!-- Headline Text -->
        <div class="mb-10 text-center">
          <h1 class="text-3xl font-bold tracking-tight text-[#0e141b] dark:text-white mb-4">
            Kebijakan Privasi
          </h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Terakhir diperbarui: 17 Desember 2025
          </p>
        </div>

        <!-- Content -->
        <div class="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
          <h3>1. Pendahuluan</h3>
          <p>
            Selamat datang di KanbanApp. Kami menghargai privasi Anda dan berkomitmen untuk melindungi informasi pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda saat Anda menggunakan layanan kami.
          </p>

          <h3>2. Informasi yang Kami Kumpulkan</h3>
          <p>
            Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami, seperti saat Anda membuat akun, memperbarui profil, atau menghubungi tim dukungan kami. Informasi ini dapat mencakup nama, alamat email, dan kata sandi Anda.
          </p>

          <h3>3. Bagaimana Kami Menggunakan Informasi Anda</h3>
          <p>
            Kami menggunakan informasi yang kami kumpulkan untuk:
          </p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Menyediakan, memelihara, dan meningkatkan layanan kami.</li>
            <li>Memproses transaksi dan mengelola akun pengguna Anda.</li>
            <li>Mengirimkan notifikasi teknis, pembaruan keamanan, dan pesan administratif.</li>
            <li>Merespons komentar, pertanyaan, dan permintaan layanan pelanggan Anda.</li>
          </ul>

          <h3>4. Keamanan Data</h3>
          <p>
            Kami mengambil langkah-langkah keamanan yang wajar untuk melindungi informasi Anda dari akses, pengungkapan, perubahan, atau perusakan yang tidak sah. Namun, perlu diingat bahwa tidak ada metode transmisi melalui internet atau metode penyimpanan elektronik yang 100% aman.
          </p>

          <h3>5. Perubahan pada Kebijakan Ini</h3>
          <p>
            Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Jika kami melakukan perubahan, kami akan memberi tahu Anda dengan merevisi tanggal "Terakhir diperbarui" di bagian atas kebijakan ini.
          </p>

          <h3>6. Hubungi Kami</h3>
          <p>
            Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di support@kanbanapp.com.
          </p>
        </div>

        <div class="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8 flex justify-center">
          <router-link to="/" class="font-medium text-primary hover:underline">
            &larr; Kembali ke Beranda
          </router-link>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="w-full py-6 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-gray-700">
      <div class="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-400 gap-4">
        <p>&copy; 2025 KanbanApp. Hak Cipta Dilindungi.</p>
        <div class="flex gap-6">
          <a class="hover:text-primary transition-colors" href="#">Syarat &amp; Ketentuan</a>
          <a class="hover:text-primary transition-colors" href="#">Kebijakan Privasi</a>
          <a class="hover:text-primary transition-colors" href="#">Bantuan</a>
        </div>
      </div>
    </footer>
  </div>
</template>