/*
 Navicat Premium Data Transfer

 Source Server         : MongodbLocal
 Source Server Type    : MongoDB
 Source Server Version : 40011
 Source Host           : localhost:27017
 Source Schema         : kulon

 Target Server Type    : MongoDB
 Target Server Version : 40011
 File Encoding         : 65001

 Date: 19/07/2021 06:10:32
*/


// ----------------------------
// Collection structure for data__home
// ----------------------------
db.getCollection("data__home").drop();
db.createCollection("data__home");

// ----------------------------
// Documents of data__home
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("kulon");
db.getCollection("data__home").insert([ {
    _id: ObjectId("60dc795020d8361d3428b5b4"),
    id: 3,
    alias: "dosen",
    link: "/posts/dosen",
    title: "Dosen Pengajar",
    deskripsi: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
} ]);
db.getCollection("data__home").insert([ {
    _id: ObjectId("60dc796520d8361d3428b5b5"),
    id: 2,
    alias: "latihan",
    link: "/posts/latihan",
    title: "Latihan",
    deskripsi: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
} ]);
db.getCollection("data__home").insert([ {
    _id: ObjectId("60dc7f5820d8361d3428b5b8"),
    id: 1,
    alias: "modul",
    link: "/posts/modul",
    title: "Modul Pemberlajaran",
    deskripsi: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
} ]);
db.getCollection("data__home").insert([ {
    _id: ObjectId("60e0509bc4ea3826337dc693"),
    id: 4,
    alias: "ranking",
    link: "/posts/ranking",
    title: "Ranking",
    deskripsi: ""
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for data__kelas
// ----------------------------
db.getCollection("data__kelas").drop();
db.createCollection("data__kelas");

// ----------------------------
// Documents of data__kelas
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("kulon");
db.getCollection("data__kelas").insert([ {
    _id: ObjectId("60f20b73e1363609994a3106"),
    "id_kelas": "34dfd34c-18b2-494f-881e-ea26180ae23b",
    "nama_kelas": "ALPRO-1",
    "kode_kelas": "kBoI1",
    semester: "20202",
    "nama_semester": "2020/2021 Genap",
    prodi: "49202",
    "nama_prodi": "Sains Data",
    "nim_nidn": "ahmadluky",
    "_id_user": "60de5d5fa5a64c3646552632",
    createAt: "17-07-2021 05:42:58",
    updateAt: "18-07-2021 04:54:44",
    "nama_dosen": "Ahmad Luky Ramdani",
    delete: "0"
} ]);
db.getCollection("data__kelas").insert([ {
    _id: ObjectId("60f20b84e1363609994a3107"),
    "id_kelas": "50d5230d-d2c1-4126-a444-3b7ba77dc46b",
    "nama_kelas": "ALPRO-2",
    "kode_kelas": "jjWNG",
    semester: "20202",
    "nama_semester": "2020/2021 Genap",
    prodi: "49202",
    "nama_prodi": "Sains Data",
    "nim_nidn": "ahmadluky",
    "_id_user": "60de5d5fa5a64c3646552632",
    createAt: "17-07-2021 05:43:16",
    updateAt: "18-07-2021 04:54:49",
    "nama_dosen": "Ahmad Luky Ramdani",
    delete: "0"
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for data__kelas_mahasiswa
// ----------------------------
db.getCollection("data__kelas_mahasiswa").drop();
db.createCollection("data__kelas_mahasiswa");

// ----------------------------
// Documents of data__kelas_mahasiswa
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("kulon");
db.getCollection("data__kelas_mahasiswa").insert([ {
    _id: ObjectId("60f3368896795803731b3ddc"),
    "id_kelas_mahasiswa": "0f8dec82-e6c3-4456-9fe2-05a96bae4112",
    "kode_kelas": "kBoI1",
    nim: "123",
    "nama_mhs": "Naufal Al-Arkhan Ahmad",
    "id_kelas": "34dfd34c-18b2-494f-881e-ea26180ae23b",
    "nama_kelas": "ALPRO-1",
    nidn: "ahmadluky",
    "nama_dosen": "Ahmad Luky Ramdani",
    semester: "20202",
    "nama_semester": "2020/2021 Genap",
    prodi: "55202",
    "nama_prodi": "Teknik Informatika",
    createAt: "18-07-2021 02:59:03",
    updateAt: "18-07-2021 02:59:03",
    revoke: "0",
    status: "1"
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for data__kelas_material
// ----------------------------
db.getCollection("data__kelas_material").drop();
db.createCollection("data__kelas_material");

// ----------------------------
// Documents of data__kelas_material
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("kulon");
db.getCollection("data__kelas_material").insert([ {
    _id: ObjectId("60f20be5e1363609994a3108"),
    "id_kelas_material": "9baf1fa4-cfaa-4a82-91d9-731846c0320f",
    "minggu_ke": "1",
    judul: "Pengenalan Bahasa Pemrograman",
    "keyword_soal": "#ALR #ALPRO #minggu1",
    materi: "https://drive.google.com/drive/u/0/folders/104yprW8yfYLZM5dHK60hkTGB_KV6AJtG",
    deadline: "2021-07-24T05:44",
    "status_pengerjaan": "",
    token: "sriH4",
    "id_kelas": "34dfd34c-18b2-494f-881e-ea26180ae23b",
    "nama_kelas": "ALPRO-1",
    semester: "20202",
    "nama_semester": "2020/2021 Genap",
    prodi: "55202",
    "nama_prodi": "Teknik Informatika",
    "nim_nidn": "ahmadluky",
    "nama_dosen": "Ahmad Luky Ramdani",
    "_id_user": "60de5d5fa5a64c3646552632",
    createAt: "17-07-2021 05:44:52",
    updateAt: "17-07-2021 05:44:52",
    delete: "0"
} ]);
db.getCollection("data__kelas_material").insert([ {
    _id: ObjectId("60f45f31236435253e769165"),
    "id_kelas_material": "f8490ff1-452f-4b2b-8699-055a51a76db6",
    "minggu_ke": "2",
    judul: "Array",
    "keyword_soal": "#array",
    materi: "htttp://python.io",
    deadline: "2021-07-31T18:04",
    "status_pengerjaan": "",
    token: "EKkDE",
    "id_kelas": "34dfd34c-18b2-494f-881e-ea26180ae23b",
    "nama_kelas": "ALPRO-1",
    semester: "20202",
    "nama_semester": "2020/2021 Genap",
    prodi: "49202",
    "nama_prodi": "Sains Data",
    "nim_nidn": "ahmadluky",
    "nama_dosen": "Ahmad Luky Ramdani",
    "_id_user": "60de5d5fa5a64c3646552632",
    createAt: "19-07-2021 12:04:49",
    updateAt: "19-07-2021 12:04:49",
    delete: "0"
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for data__modul
// ----------------------------
db.getCollection("data__modul").drop();
db.createCollection("data__modul");

// ----------------------------
// Documents of data__modul
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("kulon");
db.getCollection("data__modul").insert([ {
    _id: ObjectId("60f20e35e1363609994a3109"),
    "id_modul": "a082b736-4b9c-47a6-a420-3ab415ab8af5",
    "nama_modul": "Modul Matakuliah Algoritma dan Pemrograman",
    "deskripsi_modul": "Modul ini disusun oleh ig: @ahmadluky dkk. Modul ini dikembangkan untuk membantu mahasiswa dalam memahami materi-materi perkuliahan pada matakuliah algoritma dan pemrograman",
    "nama_file": "https://drive.google.com/drive/u/0/folders/104yprW8yfYLZM5dHK60hkTGB_KV6AJtG",
    semester: "20202",
    "nama_semester": "2020/2021 Genap",
    prodi: "55202",
    "nama_prodi": "Teknik Informatika",
    "nim_nidn": "ahmadluky",
    "_id_user": "60de5d5fa5a64c3646552632",
    createAt: "17-07-2021 05:54:45",
    updateAt: "17-07-2021 05:54:45",
    "nama_dosen": "Ahmad Luky Ramdani",
    delete: "0"
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for data__pengumuman
// ----------------------------
db.getCollection("data__pengumuman").drop();
db.createCollection("data__pengumuman");

// ----------------------------
// Documents of data__pengumuman
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("kulon");
db.getCollection("data__pengumuman").insert([ {
    _id: ObjectId("60de62efa5a64c364655263c"),
    "id_pengumuman": "21d50564-abfd-48ca-85d5-9ea2e644ee8e",
    judul: "Pengumuman Pengerjaan Latihan",
    pengumuman: "Or, keep it light and add a border for some added definition to the boundaries of your content. Be sure to look under the hood at the source HTML here as we've adjusted the alignment and sizing of both column's content for equal-height.",
    semester: "20202",
    "nama_semester": "2020/2021 Genap",
    prodi: "55202",
    "nama_prodi": "Teknik Informatika",
    "nim_nidn": "0923088801",
    "nama_dosen": "Ahmad Luky Ramdani",
    "_id_user": "60de5d5fa5a64c3646552632",
    createAt: "2021-07-01 02:31:16.036",
    updateAt: "2021-07-01 02:31:16.036",
    delete: "1"
} ]);
db.getCollection("data__pengumuman").insert([ {
    _id: ObjectId("60f3528696795803731b3ddf"),
    "id_pengumuman": "0466e208-257a-4dd0-8cc1-07de023ffa22",
    judul: "Pelaksanaan Ujian Akhir Semester",
    pengumuman: "Pelaksanaan UAS akan dilakukan pada:\nTanggal : 27 Agustus 2020\nJam : 19.00-20:00\nSifat : Tertutup\n\nTerima Kasih \nttd\nDosen Pengampu Matakuliah",
    semester: "20202",
    "nama_semester": "2020/2021 Genap",
    prodi: "49202",
    "nama_prodi": "Sains Data",
    "nim_nidn": "ahmadluky",
    "_id_user": "60de5d5fa5a64c3646552632",
    createAt: "18-07-2021 04:58:30",
    updateAt: "18-07-2021 05:01:47",
    "nama_dosen": "Ahmad Luky Ramdani",
    delete: "0"
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for data__prodi
// ----------------------------
db.getCollection("data__prodi").drop();
db.createCollection("data__prodi");

// ----------------------------
// Documents of data__prodi
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("kulon");
db.getCollection("data__prodi").insert([ {
    _id: ObjectId("60e17c640a90a9335804f032"),
    "id_prodi": 55202,
    "nama_prodi": "Teknik Informatika"
} ]);
db.getCollection("data__prodi").insert([ {
    _id: ObjectId("60e17c680a90a9335804f033"),
    "id_prodi": 49202,
    "nama_prodi": "Sains Data"
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for data__semester
// ----------------------------
db.getCollection("data__semester").drop();
db.createCollection("data__semester");

// ----------------------------
// Documents of data__semester
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("kulon");
db.getCollection("data__semester").insert([ {
    _id: ObjectId("60e1856f0a90a9335804f034"),
    "id_semester": "20202",
    "nama_semester": "2020/2021 Genap",
    createAt: "2021-07-01 02:31:16.036",
    updateAt: "2021-07-01 02:31:16.036"
} ]);
db.getCollection("data__semester").insert([ {
    _id: ObjectId("60e185760a90a9335804f035"),
    "id_semester": 20201,
    "nama_semester": "2020/2021 Ganjil",
    createAt: "2021-07-01 02:31:16.036",
    updateAt: "2021-07-01 02:31:16.036"
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for data__soal
// ----------------------------
db.getCollection("data__soal").drop();
db.createCollection("data__soal");

// ----------------------------
// Documents of data__soal
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("kulon");
db.getCollection("data__soal").insert([ {
    _id: ObjectId("60f2759407b49f02d97e88dd"),
    "id_soal": "24a39391-4fd3-400a-b7f7-89ccd7cf81be",
    "nama_soal": "Menentukan Bilangan Prima",
    "test_case": [
        {
            "id_kelas_material": "9baf1fa4-cfaa-4a82-91d9-731846c0320f",
            "id_soal": "24a39391-4fd3-400a-b7f7-89ccd7cf81be",
            "id_test_case": "d781f545-6bab-444f-a14a-e57643efe682",
            masukan: "2 2",
            keluaran: "4",
            createAt: "18-07-2021 04:06:06",
            updateAt: "18-07-2021 04:06:06"
        },
        {
            "id_kelas_material": "9baf1fa4-cfaa-4a82-91d9-731846c0320f",
            "id_soal": "24a39391-4fd3-400a-b7f7-89ccd7cf81be",
            "id_test_case": "793cb9f3-aee3-425c-8112-d766eecd3ec8",
            masukan: "3 5",
            keluaran: "8",
            createAt: "18-07-2021 04:06:06",
            updateAt: "18-07-2021 04:06:06"
        }
    ],
    "id_modul": "a082b736-4b9c-47a6-a420-3ab415ab8af5",
    "nama_modul": "Modul Matakuliah Algoritma dan Pemrograman",
    "id_kelas_material": "9baf1fa4-cfaa-4a82-91d9-731846c0320f",
    "deskripsi_soal": "Bilangan prima merupakan bilangan bulang yang hanya dapat dibagi oleh bilangan 1 dan bilangan dirinya sendiri. Sekarang anda ditugaskan membuat program untuk menentukan bilangan yang diinputkan pennguna adalah bilanga prima atau bilangan bukan prima.\n\n\nContoh\ninput     : 3\noutput   : bilangan prima\ninput      : 4\noutput    : bilangan bukan prima",
    semester: "20202",
    "nama_semester": "2020/2021 Genap",
    prodi: "49202",
    "nama_prodi": "Sains Data",
    "nim_nidn": "ahmadluky",
    "_id_user": "60de5d5fa5a64c3646552632",
    createAt: "18-07-2021 04:06:06",
    updateAt: "18-07-2021 04:06:06",
    "nama_dosen": "Ahmad Luky Ramdani",
    delete: "0",
    keyword: null
} ]);
db.getCollection("data__soal").insert([ {
    _id: ObjectId("60f348ce96795803731b3ddd"),
    "id_soal": "a687da88-88d5-4178-9712-6343f6655b4b",
    "nama_soal": "Penjumlahan Bilangan",
    "test_case": [
        {
            "id_kelas_material": "9baf1fa4-cfaa-4a82-91d9-731846c0320f",
            "id_soal": "a687da88-88d5-4178-9712-6343f6655b4b",
            "id_test_case": "d28ec62e-5b00-494f-b470-f620068ebdb1",
            masukan: "1\n2",
            keluaran: "3",
            createAt: "18-07-2021 04:17:02",
            updateAt: "18-07-2021 04:17:02"
        },
        {
            "id_kelas_material": "9baf1fa4-cfaa-4a82-91d9-731846c0320f",
            "id_soal": "a687da88-88d5-4178-9712-6343f6655b4b",
            "id_test_case": "ee7fab72-a665-405d-b5b1-82ef4bdd7d8a",
            masukan: "4\n5",
            keluaran: "9",
            createAt: "18-07-2021 04:17:02",
            updateAt: "18-07-2021 04:17:02"
        },
        {
            "id_kelas_material": "9baf1fa4-cfaa-4a82-91d9-731846c0320f",
            "id_soal": "a687da88-88d5-4178-9712-6343f6655b4b",
            "id_test_case": "36f33868-6c50-43c8-a75c-7f4a81a7cbe1",
            masukan: "5\n0",
            keluaran: "5",
            createAt: "18-07-2021 04:17:02",
            updateAt: "18-07-2021 04:17:02"
        }
    ],
    "id_modul": "a082b736-4b9c-47a6-a420-3ab415ab8af5",
    "nama_modul": "Modul Matakuliah Algoritma dan Pemrograman",
    "id_kelas_material": "9baf1fa4-cfaa-4a82-91d9-731846c0320f",
    "deskripsi_soal": "Merupakan Program untuk menjumlahkan 2 buah bilangan yang diinputkan oleh pengguna. Sehingga program menerima 2 bilangan bulat dari pennguna\n\nContoh ( baris ke-3 merupakan penjumlahan bilangan baris ke-1 dan ke-2)\n2\n3\n5\n\nContoh\n4\n5\n9",
    semester: "20202",
    "nama_semester": "2020/2021 Genap",
    prodi: "55202",
    "nama_prodi": "Teknik Informatika",
    "nim_nidn": "ahmadluky",
    "_id_user": "60de5d5fa5a64c3646552632",
    createAt: "18-07-2021 04:17:02",
    updateAt: "18-07-2021 04:17:02",
    "nama_dosen": "Ahmad Luky Ramdani",
    delete: "0"
} ]);
db.getCollection("data__soal").insert([ {
    _id: ObjectId("60f34de996795803731b3dde"),
    "id_soal": "03485b95-af11-481d-8e51-f7b53c1a1c26",
    "nama_soal": "Menghitung Gaji Karyawan",
    "test_case": [
        {
            "id_kelas_material": "9baf1fa4-cfaa-4a82-91d9-731846c0320f",
            "id_soal": "03485b95-af11-481d-8e51-f7b53c1a1c26",
            "id_test_case": "da816a59-74ce-4701-8b45-db05df82daf6",
            masukan: "30",
            keluaran: "210000",
            createAt: "18-07-2021 04:38:49",
            updateAt: "18-07-2021 04:38:49"
        },
        {
            "id_kelas_material": "9baf1fa4-cfaa-4a82-91d9-731846c0320f",
            "id_soal": "03485b95-af11-481d-8e51-f7b53c1a1c26",
            "id_test_case": "cc50eae2-f45e-4415-9dc5-97d552698f99",
            masukan: "60",
            keluaran: "648000",
            createAt: "18-07-2021 04:38:49",
            updateAt: "18-07-2021 04:38:49"
        }
    ],
    "id_modul": "a082b736-4b9c-47a6-a420-3ab415ab8af5",
    "nama_modul": "Modul Matakuliah Algoritma dan Pemrograman",
    "id_kelas_material": "9baf1fa4-cfaa-4a82-91d9-731846c0320f",
    "deskripsi_soal": "Buatlah program untuk menentukan gaji karyawan mingguan dengan ketentuan sebagai berikut:\n\n1. Golongan = A maka upah per jam 5000\n2. Golongan = B maka upah per jam 7000\n3. Golongan = C maka upah per jam 8000\n4. Golongan = D maka upah per jam 10000\n\nKetentuan tambahan:\n1. Jam kerja lebih dari 48 jam per minggu, akan mendapat uang lembur \n2. Uang lembur dengan perhitungan(jam kerja-48)*4000.\n3. Kerja kurang dari 50 jam maka pegawai tidak mendapat uang lembur.\n4. Perhitungan gaji pegawai adalah upah + uang lembur.\n5. Input berupa nama karyawan, golongan dan jam kerja.\n6. Outputnya adalah nama karyawan dan gaji yang diterima.",
    semester: "20202",
    "nama_semester": "2020/2021 Genap",
    prodi: "49202",
    "nama_prodi": "Sains Data",
    "nim_nidn": "ahmadluky",
    "_id_user": "60de5d5fa5a64c3646552632",
    createAt: "18-07-2021 04:38:49",
    updateAt: "18-07-2021 04:45:16",
    "nama_dosen": "Ahmad Luky Ramdani",
    delete: "0",
    keyword: null
} ]);
session.commitTransaction(); session.endSession();

// ----------------------------
// Collection structure for data__soal_test_case
// ----------------------------
db.getCollection("data__soal_test_case").drop();
db.createCollection("data__soal_test_case");

// ----------------------------
// Collection structure for data__solusi
// ----------------------------
db.getCollection("data__solusi").drop();
db.createCollection("data__solusi");

// ----------------------------
// Collection structure for data__user
// ----------------------------
db.getCollection("data__user").drop();
db.createCollection("data__user");

// ----------------------------
// Documents of data__user
// ----------------------------
session = db.getMongo().startSession();
session.startTransaction();
db = session.getDatabase("kulon");
db.getCollection("data__user").insert([ {
    _id: ObjectId("60de5d5fa5a64c3646552632"),
    email: "ahmadluky@if.itera.ac.id",
    password: "$2b$10$rllqijwMUEUsCDC9rSDax.E6FXjId5okAMM4V129cxRyqRagGO2W2",
    name: "Ahmad Luky Ramdani",
    "nim_nidn": "ahmadluky",
    image: "https://lh3.googleusercontent.com/a-/AOh14GhH4PT6e-gkWeM71WUBz_fP-hLyhe9VwKyVw8JAlw=s96-c",
    createAt: "2021-07-01 02:31:16.036",
    updateAt: "2021-07-01 02:31:16.036",
    tipe: "dosen"
} ]);
db.getCollection("data__user").insert([ {
    _id: ObjectId("60e5bb2919aee238cc1c3fc2"),
    email: "mahasiswa@gmail.com",
    password: "$2b$10$rllqijwMUEUsCDC9rSDax.E6FXjId5okAMM4V129cxRyqRagGO2W2",
    name: "Naufal Al-Arkhan Ahmad",
    "nim_nidn": "123",
    image: "https://lh3.googleusercontent.com/a-/AOh14GhH4PT6e-gkWeM71WUBz_fP-hLyhe9VwKyVw8JAlw=s96-c",
    createAt: "2021-07-01 02:31:16.036",
    updateAt: "2021-07-01 02:31:16.036",
    tipe: "mahasiswa"
} ]);
session.commitTransaction(); session.endSession();
