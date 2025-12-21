# Kanban App (Full Stack)

Aplikasi manajemen proyek kolaboratif berbasis Kanban (mirip Trello) yang dibangun dengan arsitektur Full Stack modern. Proyek ini memisahkan **Frontend** (Vue 3) dan **Backend** (Express.js) untuk skalabilitas dan kemudahan pengembangan.

![Kanban App Banner](frontend/public/favicon.ico) <!-- Placeholder, bisa diganti screenshot nanti -->

## 🚀 Fitur Utama

### Manajemen Proyek (Kanban)
*   **Board:** Buat dan kelola banyak papan proyek. Dukungan untuk papan **Pribadi** (hanya pemilik) dan **Publik** (komunitas bisa melihat).
*   **List:** Organisir tugas dalam daftar (misal: "To Do", "In Progress", "Done"). Dukungan urutan posisi kustom.
*   **Card:** Buat tugas dengan detail lengkap: Judul, Deskripsi, Tanggal Jatuh Tempo (Due Date), dan Status Selesai.
*   **Interaktivitas:** Antarmuka responsif untuk memindahkan status tugas dan daftar.

### Kolaborasi & Komunitas
*   **Public Boards:** Lihat papan proyek milik pengguna lain di komunitas untuk inspirasi (Mode *Read-Only*).
*   **Owner Badges:** Identifikasi pemilik papan dengan jelas.

### Produktivitas
*   **Pomodoro Timer:** (Fitur opsional) Pengatur waktu fokus terintegrasi.
*   **Lofi Audio:** (Fitur opsional) Pemutar musik latar untuk meningkatkan fokus kerja.

---

## 🛠️ Teknologi (Tech Stack)

### Frontend (Client-Side)
Terletak di folder `/frontend`.
*   **Framework:** [Vue.js 3](https://vuejs.org/) (Composition API)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Routing:** Vue Router 4
*   **HTTP Client:** Axios

### Backend (Server-Side)
Terletak di folder `/backend`.
*   **Runtime:** [Node.js](https://nodejs.org/)
*   **Framework:** [Express.js](https://expressjs.com/)
*   **Database:** MySQL
*   **ORM/Query:** Sequelize & MySQL2
*   **Authentication:** JWT (JSON Web Token)

---

## 📋 Prasyarat Sistem

Sebelum memulai, pastikan komputer Anda telah terinstal:
*   **Node.js** (Versi 18 atau lebih baru disarankan)
*   **MySQL Database Server**
*   **NPM** (Node Package Manager)

---

## 🚀 Panduan Instalasi & Menjalankan

Anda perlu menjalankan Frontend dan Backend secara bersamaan (di dua terminal berbeda).

### 1. Persiapan Backend

1.  Masuk ke direktori backend:
    ```bash
    cd backend
    ```
2.  Instal dependensi:
    ```bash
    npm install
    ```
3.  Konfigurasi Environment:
    *   Copy file `.env.example` menjadi `.env`.
    *   Sesuaikan konfigurasi database (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).
    ```bash
    cp .env.example .env
    # Edit file .env sesuai konfigurasi MySQL Anda
    ```
4.  Setup Database:
    *   Buat database kosong di MySQL sesuai `DB_NAME` (misal: `db_kanban_app`).
    *   Jalankan migrasi untuk membuat tabel:
    ```bash
    npm run migrate
    ```
5.  Jalankan Server:
    ```bash
    npm run dev
    ```
    Server akan berjalan di `http://localhost:3000`.

### 2. Persiapan Frontend

1.  Buka terminal baru dan masuk ke direktori frontend:
    ```bash
    cd frontend
    ```
2.  Instal dependensi:
    ```bash
    npm install
    ```
3.  Jalankan Server Development:
    ```bash
    npm run dev
    ```
4.  Buka browser dan akses alamat yang muncul (biasanya `http://localhost:5173`).

---

## 📚 Dokumentasi API

Backend menyediakan RESTful API yang lengkap. Dokumentasi lengkap endpoint tersedia di file `backend/README.md`.

**Ringkasan Endpoint Utama:**
*   **Auth:** `/api/auth/login`, `/api/auth/register`
*   **Boards:** `/api/boards` (CRUD), `/api/boards/public` (Public Boards)
*   **Lists:** `/api/lists` (CRUD, Move)
*   **Cards:** `/api/cards` (CRUD, Move, Complete)

Untuk pengujian API, Anda dapat menggunakan file koleksi Postman yang tersedia di:
`backend/docs/KanbanApp.postman_collection.json`

---

## 📁 Struktur Proyek

```
kanban-app/
├── backend/            # Source code server (Express + MySQL)
│   ├── src/
│   │   ├── controllers/# Logika bisnis
│   │   ├── models/     # Definisi skema database
│   │   ├── routes/     # Definisi endpoint API
│   │   └── ...
│   └── ...
├── frontend/           # Source code client (Vue 3 + Tailwind)
│   ├── src/
│   │   ├── components/ # Komponen UI reusable (Modal, Card, List)
│   │   ├── views/      # Halaman utama (Dashboard, BoardView)
│   │   ├── services/   # Integrasi API (Axios)
│   │   └── ...
│   └── ...
└── README.md           # Dokumentasi utama ini
```

## 🤝 Kontribusi

Proyek ini dikembangkan untuk tujuan pembelajaran dan tugas kuliah (PWL). Pull request dan saran perbaikan sangat diterima.

## 📄 Lisensi

ISC License.
