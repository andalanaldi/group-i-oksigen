# group-i-backend
Backend repository for group-i

[Backend App is Deployed here](https://group-i-backend-floral-haze-8477.fly.dev)

# Express Application (app.js)

Purpose:
The JavaScript code in **app.js** is an Express application that sets up various routes, middleware for authentication and authorization, and a scheduled task (using **node-cron**) for checking transactions. It also listens on a specified port for incoming requests.

Usage:
1. **Installation:** Ensure you have Node.js installed.
2. **Environment Setup:** Set up environment variables like **PORT, DATABASE_URL, ENABLE_CRON,** and **INTERVAL_INQUIRY**.
3. **Dependencies:** Install required npm packages **(express, cors, node-cron**, etc.).
4. **Start Application:** Run the app using **node app.js**.

Code Explanation:
- It imports necessary modules like **express, cors**, and routes (**authRouter, serviceuserRouter**, etc.).
- Defines middleware for handling JSON parsing and CORS.
- Sets up various routes with associated middleware for authorization.
- Utilizes **node-cron** to periodically execute a function (**checkTransactionRoutine**) based on a configured interval if **ENABLE_CRON** is set to **true**.
- Finally, it starts the server on a specified port (default: 3000).

# Middleware and Routes Explanation:
1. **app.use('/auth', authRouter)**
- **Purpose**: This line sets up a middleware for handling routes related to authentication. Any requests starting with **/auth** will be directed to the **authRouter**.
- **Usage**: It's typically used for user authentication-related functionalities like login, registration, etc.
- **Example**: If a request is made to **/auth/login**, it will be handled by the **authRouter** specified elsewhere in the code.
2. **app.use(authenticationMiddleware)**
- **Purpose**: This line uses a custom middleware (**authenticationMiddleware**) to handle authentication for all routes defined after this middleware.
- **Usage**: It's intended to validate and authenticate incoming requests before they reach further route handling.
- **Example**: Any request that reaches this middleware is checked for valid authentication tokens or credentials before proceeding to other routes.
3. **app.use('/', authorizationUser, serviceuserRouter)**
- **Purpose**: Routes starting from the root URL / are handled by this middleware chain. It includes authorization for users (**authorizationUser**) and routes specified in **serviceuserRouter**.
- **Usage**: It's used to protect and manage routes accessible to authenticated users, typically for user-specific functionalities.
- **Example**: Requests to URLs like **/profile**, **/dashboard**, etc., after authentication, are handled by **serviceuserRouter**.
4. **app.use('/superadmin', authorizationSuperAdmin, servicesuperadminRouter)**
- **Purpose**: Similar to the previous one, but specifically for superadmin-related functionalities.
- **Usage**: Restricts access to routes starting with **/superadmin** to users with superadmin privileges.
- **Example**: Routes like **/superadmin/dashboard, /superadmin/settings**, etc., are handled by **servicesuperadminRouter** but only accessible to superadmins.
5. **app.use("/transaction", authorizationUser, transactionRoutes)**
- **Purpose**: Handles routes related to transactions, applying user authorization (**authorizationUser**) before processing requests through **transactionRoutes**.
- **Usage**: Controls access to transaction-related endpoints based on user authorization.
- **Example**: Requests to endpoints like **/transaction/history**, **/transaction/new**, etc., are handled by **transactionRoutes** but only accessible to authorized users.
6. **if (ENABLE_CRON == "true") { ... }**
- **Purpose**: Conditionally schedules a task using **node-cron** if the **ENABLE_CRON** configuration variable is set to **"true"**.
- **Usage**: It schedules the **checkTransactionRoutine** function at specified intervals for transaction-related checks, possibly for recurring tasks like data updates or validations.
- **Example**: If **ENABLE_CRON** is set to **"true"** in the environment, the **checkTransactionRoutine** function will be executed periodically based on the configured **INTERVAL_INQUIRY**.

These middleware and route setups help in organizing and managing different aspects of the application, such as authentication, authorization, routing for various user roles and functionalities and services or controllers such as transactions for instance.

# PostgreSQL Schema (Prisma)

Purpose:
The Prisma schema defines the structure of your PostgreSQL database using models and their relationships. It specifies tables, fields, data types, and relations between various entities.

Usage:
1. **Setup Database**: Ensure you have PostgreSQL installed or you have PostgreSQL connection in Supabase and create a database based on the configuration.
2. **Prisma ORM**: Use Prisma CLI to generate a Prisma client for database interactions. Some commands are :

Generate database
```
npx prisma generate
```
3. **Migrations**: Apply migrations to synchronize the database with the defined schema.
Syncronize database with POstgreSQL connection in Supabase
```
npx prisma db push
```
Migrate
```
npx prisma migrate
```
Create a UI for database schemas or tables 
```
npx prisma studio
```

Schema Explanation:
- **user Model**: Represents users with various fields like **id, organization_name, organization_email,** etc. Also has a relationship (**transactions**) with the **transaction** model.
- **role Enum**: Defines two roles which are **user** and **superadmin**.
- **polution Model**: Represents pollution data in cities with fields like **id, cityId, polution, caseRespiratory, costRespiratory**, etc. Has a relationship (**location**) with the **location** model.
- **location Model**: Represents city locations with fields like **id, cityName, cityLat, cityLon**, etc. Relates to **polution**.
- **transaction Model**: Represents transaction data with fields like **id, createdAt, updatedAt**, etc. Relates to **user**.

# Instructions:
1. **Express Application**:
- Clone the repository.
- Set up environment variables (e.g., **DATABASE_URL, ENABLE_CRON**, etc.).
- Install dependencies (**npm install**).
- Run the application (**node app.js**).

2. **PostgreSQL Setup (Prisma)**:
- Install PostgreSQL.
- Create a database.
- Configure the database URL in the **.env** file or as an environment variable.
- Run Prisma migrations.
```
npx prisma migrate
```

Remember to replace placeholders like **DATABASE_URL, PORT**, and environment-specific configurations with actual values relevant to your setup.

This documentation should serve as a guide for anyone wanting to understand, set up, and use your Express application along with the PostgreSQL database defined using Prisma. Adjust it based on your specific project requirements and add any additional details or instructions as necessary.

# Backend Technologies Used:

Core Backend Framework and Dependencies:
- **Express.js (express)**: A popular Node.js framework for building web applications and APIs.
- **Node.js (nodemon)**: Used for auto-restarting the server during development.
- **CORS (cors)**: Enables Cross-Origin Resource Sharing for handling requests from different origins.

Database Related:
- **Prisma ORM (@prisma/client, prisma)**: An ORM (Object-Relational Mapping) tool for interfacing with databases, specifically used in this backend *Oksigen* project with PostgreSQL.

Authentication and Security:
- **JWT (jsonwebtoken)**: Used for generating and validating JSON Web Tokens for authentication.
- **Bcrypt and BcryptJS (bcrypt, bcryptjs)**: Libraries for hashing passwords securely.

Request Handling and Middleware:
- **Body Parser (body-parser)**: Parses incoming request bodies in middleware.
- **Cookie Parser (cookie-parser)**: Parses cookies attached to the client's request.
- **Express Validator (express-validator)**: Middleware for validating and sanitizing incoming request data.
- **Express Async Handler (express-async-handler)**: Simplifies error handling in Express routes when using asynchronous functions.

Additional Dependencies:
- **Axios (axios)**: Used for making HTTP requests.
- **Node-Cron (node-cron)**: Used for scheduling cron jobs within Node.js applications.
- **dotenv (dotenv)**: Loads environment variables from a .env file into process.env.

Development Dependencies:
- **Prisma CLI (prisma)**: Development tool for managing database migrations and generating Prisma client.

These technologies collectively enable building a RESTful API with Express, handling authentication, database operations using Prisma with PostgreSQL, managing middleware for request handling, and scheduling background tasks using cron jobs within the Node.js application.

# References for Used Data in This Project

Air Quality Index

https://support.iqair.com/en/articles/4939698-how-can-i-access-historical-data-on-the-iqair-platform
https://www.iqair.com/newsroom/what-is-aqi

An AQI number is assigned based on the air pollutant with the highest AQI number at the moment the air quality is measured. Only pollutants available from a given air quality monitoring station are measured.

There are six air pollutants measured in the index formula, including:

   - PM2.5
   - PM10
   - carbon monoxide
   - sulfur dioxide
   - nitrogen dioxide
   - ground-level ozone


Many air quality monitoring stations do not include all six pollutants equally. Because air quality changes throughout the day, a monitored location’s AQI changes with the level of measured air pollutant concentrations.

The index represents air pollutant concentrations with a number falling within a range of air quality categories. Within each category and number range, elevated health risks associated with rising air pollutant concentrations are identified.

The air quality index ranges from 0 to 500, though air quality can be indexed beyond 500 when there are higher levels of hazardous air pollution. Good air quality ranges from 0 to 50, while measurements over 300 are considered hazardous.

IQAir AirVisual platform AQI readings are based on the U.S. Environmental Protection Agency (EPA) National Ambient Air Quality Standards (NAAQS) to calculate AQI and to attribute code color.4,5 AirVisual Series air quality monitors measure PM2.5, PM1, PM10, and carbon dioxide levels and use PM2.5, or fine particulate matter, to determine the AQI.

The AirVisual Series monitors AQI using PM2.5 measurements as the determinant for AQI readings because PM2.5 is widely available and considered the most hazardous air pollutant impacting human health.6,7,8

PM2.5 is measured by micrograms per cubic meter (μg/m3). According to the U.S. EPA NAAQS, any measurement greater than 12.0 μg/m3 (US AQI 50) can be dangerous to human health.

https://www.iqair.com/newsroom/pm2-5

Particulate matter, or PM, refers to particles found in the air, including dust, soot, dirt, smoke, and liquid droplets. PM2.5 particles measure 2.5 microns or less in diameter. PM2.5 particles are so small they can only be seen with an electron microscope. 

Some of the most common manmade sources of pollutant PM2.5 are (3) (4) (5):

    motor combustion
    power plant combustion
    industrial processes
    stoves, fireplaces, and home wood burning
    smoke from fireworks
    smoking

Natural sources of PM2.5 can include:

    dust
    soot
    dirt
    windblown salt
    plant spores
    pollen
    smoke from wildfires

The dominant sources of PM2.5 air quality can vary depending on the season, weather, climate, level of urbanization, country, and region.

PM2.5 can be created by other pollutants chemically reacting in the atmosphere.

Chemical reaction between gases can be sources of PM2.5 pollutants, including reactions between (8):

    sulfur dioxide
    nitrogen oxides
    ammonia
    black carbon
    mineral dust
    water
    volatile organic compounds

PM 2.5’s microscopic size increases its potential to be lodged deep into the respiratory tracts. At 2.5 microns, PM2.5 is capable of entering the circulatory system and even the brain (9). Short term symptoms of exposure to high levels of particulate matter include irritation of the throat and airways, coughing, and difficulty breathing (10).

More serious, long-term complications can include:

    heart and lung disease
    bronchitis
    emphysema
    nonfatal heart attacks
    irregular heartbeat
    asthma and more intense flareups
    decreased lung function
    early death

People with heart or lung diseases, children, and older adults are most likely to be affected by particle pollution exposure.

Numerous studies have confirmed a multitude of serious health complications caused by exposure to pollutant PM2.5.

For example, a 2011 study published in The American Journal of Respiratory and Critical Care Medicine tracked 1.2 million Americans from 1982 until 2008 (11). Each 10 microgram per cubic meter increase in PM2.5 concentrations was associated with a 15-27% increase in lung cancer mortality.

PM2.5 pollution has been tied to increased risk of asthma in young children in Denmark, according to a 2020 study published in the British Medical Journal(12). All children born between 1997 and 2014 were followed for asthma onset and persistent wheezing from age 1 to 15. The study found that children exposed to higher levels of PM2.5 were more likely to develop asthma and persistent wheezing than children who weren’t exposed. 

AQI categories

Here’s how each of the AQI categories are represented, how they can impact human health, and some recommendations for what to do when the AQI has reached a higher category.

The categories are listed from least harmful to human health (“good”) to the most harmful (“hazardous”).
Good

green-aqi_4

    AQI: 0-50
    PM2.5 (μg/m3): 0-12.0
    Green

When categorised as good, air quality poses little to no health risk at an AQI of 0 up to an AQI of 50. You can enjoy your usual outdoor activities. You may choose to open your windows and ventilate your home to bring in outdoor air.
Moderate

yellow 4

    AQI: 51-100
    PM2.5 (μg/m3): 12.1-35.4
    Yellow

Due to the risk of respiratory illness symptoms, sensitive groups should greatly reduce outdoor exercise when air quality is moderate (US AQI 51-100). Avoid ventilating indoor spaces with outdoor air, and close windows to avoid letting outdoor air pollution indoors.

Note that sensitive groups for all categories include children, the elderly, pregnant people, and people with cardiac and pulmonary diseases.
Unhealthy for sensitive groups

orange 5

    AQI: 101-150
    PM2.5 (μg/m3): 35.5-55.5
    Orange

When air quality is unhealthy for sensitive groups, everyone is at risk for eye, skin, and throat irritation as well as respiratory problems. The public should greatly reduce outdoor exertion.

Sensitive groups are at greater health risk, should avoid all outdoor activity, and should consider wearing an air pollution mask outdoors. Ventilation is discouraged. A high-performance air purifier should be turned on if indoor air quality is unhealthy.
Unhealthy

red 4

    AQI: 151-200
    PM2.5 (μg/m3): 55.6-150.4
    Red

Unhealthy AQI measurements mean that there is an increased likelihood of heart and lung aggravation as well as health impacts among the public, particularly for sensitive groups.

Everyone should avoid and wear a pollution mask outdoors. Ventilation is discouraged. Air purifiers should be turned on.
Very unhealthy

purple 4

    AQI: 201-300
    PM2.5 (μg/m3): 150.5-250.4
    Purple

When air quality is very unhealthy, the public will be noticeably affected. Sensitive groups will experience reduced endurance in activities. These individuals should remain indoors and limit activities.

Everyone should avoid outdoor exercise and wear a pollution mask outdoors. Ventilation is discouraged. Air purifiers should be turned on.
Hazardous

maroon 4

    AQI: 301-500 or greater
    PM2.5 (μg/m3): 250.5 or greater
    Maroon

Everyone is at high risk of experiencing strong irritation and negative health effects that could trigger cardiovascular and respiratory illnesses.

Avoid exercise and remain indoors. Avoid outdoor exercise and wear a pollution mask outdoors. Ventilation is discouraged. Air purifiers should be turned on.
Differences between AQI systems

There are different systems used around the world for measuring air quality. The United States and China AQI systems are the most widely used systems – both measure the same group of air pollutants. However, each system rates AQI scores from 200 and lower differently.2

The U.S. AQI system generally yields higher scores for AQI under 200 because lower levels of concentrations of PM2.5 result in a higher AQI value. The U.S. revised its AQI standard in 2013 when it was found that lower levels of PM2.5 were associated with greater serious health consequences than was previously understood.3 Consequently, the U.S. AQI system is considered the more stringent standard and is the world standard.
China and U.S. air quality index and PM2.5 concentration comparison chart
U.S./China AQI Level 	U.S. PM2.5 concentrations (µg/m3) 	China PM2.5 concentrations (µg/m3)
0-50 	0-12 	0-35
51-100 	12.1-35.4 	35-75
101-150 	35.5-55.5 	75-115
151-200 	56.6-150.4 	115-150
201-300 	150.5-250.4 	150-250
301-500 	250.5-500 	250-500

Pictured: Comparison chart of China and U.S. air quality index differences.
The takeaway

The air quality index reinterprets potentially complex air quality data into a meaningful number with corresponding categories of pollutant concentrations and associated health effects.

Please note, though, that there is no safe level of air pollution, in particular as the AQI reaches closer to 50 and beyond. By knowing whether the air we breathe is safe and how it can impact our health, it’s possible to take action to help control the harmful health effects of air pollution.

ABOUT IQAIR

IQAir is a Swiss technology company that empowers individuals, organizations and governments to improve air quality through information and collaboration.

https://support.iqair.com/en/articles/4939698-how-can-i-access-historical-data-on-the-iqair-platform

How can I access historical data on the IQAir platform?

A guide to the freely available historical air quality data provided on the IQAir website and app
Chloe avatar
Written by Chloe
Updated over a week ago

A range of historical air quality data is freely available on the IQAir platform, for each location it reports on. Here's how to access three main types of historical data: 

1) Past 48h detailed hourly data

2) Past 30 days daily average data

3) Yearly and monthly average data since 2018, in IQAir's World Air Quality Reports

     Article Resources

    [1]Zhao B, et al. (2020). Short-term exposure to ambient fine particulate matter and out-of-hospital cardiac arrest: a nationwide case-crossover study in Japan. The Lancet. DOI: https://doi.org/10.1016/S2542-5196(19)30262-1

    [2] Li, Y, et al. Assessment and comparison of three different air quality indices in China. Environmental Engineering Research. DOI: 10.4491/eer.2017.006

    [3 ] U.S. Environmental Protection Agency. (2013). National ambient air quality standards for particulate matter.

    [4] U.S. Environmental Protection Agency. (2021). NAAQS table.

    [5] Yiqian Z. (2013, January 13). Chinese, US Air Quality Index not the same. Global Times.

    [6] World Health Organization. (2013). Health effects of particulate matter: Policy implications in eastern Europe, Caucasus and central Asia.

    [7] U.S. Environmental Protection Agency. (2020). Health and environmental effects of particulate matter (PM).

    [8] Yang L, et al. (2020). The impact of PM2.5 on the host defense of respiratory system. Frontiers in Cell and Development Biology. DOI: 10.3389/fcell.2020.00091

BPJS Dummy Sample Data

https://e-ppid.bpjs-kesehatan.go.id/eppid/

DATA SAMPEL BPJS KESEHATAN TAHUN 2015 - 2021
Page 59/60
Lampiran C: Penamaan File Data Pelayanan FKRTL No Variabel Label variabel Deskripsi
1 PSTV01 Nomor peserta
Nomor identifikasi peserta yang bersifat unik dan telah dideidentifikasi untuk melindungi identitas peserta sebenarnya
2 PSTV02 Nomor keluarga
Nomor yang mengidentifikasi kepala keluarga dalam sampel dan berfungsi sebagai penanda keluarga (peserta BPJS Kesehatan dalam satu keluarga memiliki nomor kepala keluarga yang sama)
3 PSTV15 Bobot
Faktor pengali yang menggambarkan jumlah individu di dalam populasi diwakili oleh individu di dalam sampel
4 FKP02 ID kunjungan FKTP
ID Kunjungan pada data pelayanan FKTP sebagai variabel untuk menggabungkan pelayanan FKTP dan FKRTL
5 FKL02 ID Kunjungan FKRTL
Nomor identifikasi unik untuk menandakan setiap kunjungan ke FKRTL oleh peserta
6 FKL03 Tanggal datang kunjungan FKRTL 
Tanggal melakukan kunjungan
7 FKL04 Tanggal pulang kunjungan FKRTL 
Tanggal menyelesaikan kunjungan
8 FKL05 Provinsi FKRTL
Provinsi fasilitas kesehatan tempat peserta mengakses pelayanan FKRTL
9 FKL06 Kabupaten/Kota FKRTL
Kabupaten/kota fasilitas kesehatan tempat peserta mengakses pelayanan FKRTL
10 FKL07 Kepemilikan FKRTL
Jenis kepemilikan dari fasilitas kesehatan rujukan tingkat lanjut
11 FKL08 Jenis FKRTL 
Jenis fasilitas kesehatan rujukan tingkat lanjut
12 FKL09 Tipe FKRTL 
Tipe fasilitas kesehatan rujukan tingkat lanjut
13 FKL10 Tingkat Pelayanan FKRTL 
Tingkat layanan di fasilitas kesehatan rujukan tingkat lanjut (FKRTL)
14 FKL11 Jenis Poli FKRTL
Poli tempat melakukan kunjungan oleh peserta ke fasilitas kesehatan rujukan tingkat lanjut (FKRTL)
15 FKL12 Segmen Peserta saat akses layanan FKRTL 
Segmen peserta saat peserta mengakses pelayanan kesehatan di FKRTL
16 FKL13 Kelas rawat peserta
Kelas rawat saat peserta mengakses pelayanan kesehatan di FKRTL
17 FKL14 Status pulang dari FKRTL
Status kepulangan peserta setelah mendapatkan pelayanan kesehatan di FKRTL
18 FKL15 Kode dan nama diagnosis masuk ICD 10 (3 digit) 
Kode dan nama diagnosis masuk berdasarkan ICD 10 yang di-input ke aplikasi INA-CBGs berdasarkan 3 digit pertama
19 FKL15A Kode diagnosis masuk ICD 10 (3 digit)
20 FKL16 Kode ICD 10 diagnosis masuk FKRTL (3-6digit) 
Kode diagnosis masuk berdasarkan ICD 10 yang diinput ke aplikasi INA-CBGs (jumlah digit beragam pada semua observasi dengan rentang 3-5 digit)

Page 60/61
21 FKL16A Nama diagnosis masuk FKRTL (3-6digit) 
Nama diagnosis masuk yang terbaca berdasarkan kode diagnosis (FKP15) yang di-input ke aplikasi INA-CBGs
22 FKL17 Kode dan nama diagnosis primer ICD 10 (3 digit) 
Kode dan nama diagnosis primer berdasarkan ICD 10 yang di-input ke aplikasi INA-CBGs berdasarkan 3 digit pertama
23 FKL17A Kode diagnosis primer ICD 10 (3 digit)
24 FKL18 Kode ICD 10 diagnosis primer FKRTL (3-6digit) 
Diagnosis Primer: diagnosis yang dipilih dokter pada hari terakhir perawatan dengan kriteria paling banyak menggunakan sumber daya atau hari rawatan paling lama.
25 FKL18A Nama diagnosis primer FKRTL (3-6digit) 
Nama diagnosis primer yang terbaca berdasarkan kode diagnosis (FKP15) yang di-input dalam aplikasi INA-CBGs
26 FKL19 Kode INACBGs
Sistem kodifikasi dari diagnosis akhir dan tindakan/prosedur yang menjadi output pelayanan, dengan acuan ICD-10 untuk diagnosis dan ICD-9 untuk tindakan/prosedur
1. Digit ke-1 (alfabetik) : menggambarkan kode CMG (Casemix Main Groups)
2. Digit ke-2 (numerik) : menggambarkan tipe kelompok kasus (Case Groups)
3. Digit ke-3 (numerik) : menggambarkan spesifikasi kelompok kasus
4. Digit ke-4 (romawi): menggambarkan tingkat keparahan kelompok kasus
27 FKL19A Deskripsi kode INACBGs
Nama dari diagnosis akhir dan tindakan/prosedur yang menjadi output pelayanan, dengan acuan ICD- 10 untuk diagnosis dan ICD-9 untuk tindakan/prosedur
28 FKL20
INACBGs - Kode Casemix main groups (Digit ke-1) Case Mix Groups (CMG) sebagai klasifikasi tingkat pertama yang dilabelkan dengan huruf alfabet (A to Z) dan berhubungan dengan system organ tubuh yang disesuaikan dengan ICD 10
29 FKL21
INACBGs - Tipe kelompok kasus atau case groups (Digit ke-2) INA-CBGs-Tipe Kelompok kasus atau case groups (Digit ke-2)
30 FKL22
INACBGs - Spesifikasi kelompok kasus (Digit ke-3) Case type: sub-group ketiga yang menunjukkan spesifik CBGs yang dilambangkan dengan numerik mulai dari 01 sampai dengan 99 Sumber: Peraturan Menteri Kesehatan Republik Indonesia Nomor 76 Tahun 2016 tentang Pedoman Indonesian Case Base Groups (INA-CBG) dalam Pelaksanaan Jaminan Kesehatan Nasional
31 FKL23
INACBGs - Tingkat keparahan kelompok kasus(Digit ke-4) Sub-group keempat merupakan resource intensity level yang menunjukkan tingkat keparahan kasus yang dipengaruhi adanya komorbidita ataupun komplikasi dalam masa perawatan

Page 61/62
32 FKL25 Provinsi faskes perujuk 
Provinsi fasilitas kesehatan asal yang memberikan rujukan
33 FKL26 Kabupaten/Kota faskes perujuk 
Kabupaten/kota fasilitas kesehatan asal yang memberikan rujukan
34 FKL27 Kepemilikan faskes perujuk 
Kepemilikan fasilitas kesehatan asal yang memberikan rujukan
35 FKL28 Jenis faskes perujuk 
Jenis fasilitas kesehatan asal yang memberikan rujukan
36 FKL29 Tipe faskes perujuk 
Tipe fasilitas kesehatan asal yang memberikan rujukan
37 FKL30 Jenis prosedur
Jenis prosedur yang dilakukan pada pelayanan FKRTL
38 FKL31 Tarif regional INACBGs
Regionalisasi tarif terbagi menjadi 5 regional didasarkan pada indeks harga konsumen (IHK) Sumber: Peraturan Menteri Kesehatan Republik Indonesia Nomor 52 Tahun 2016 tentang Standar Tarif Pelayanan Kesehatan dalam Penyelenggaraan Program Jaminan Kesehatan
39 FKL32 Group Tarif INACBGs
Grup tarif paket yang meliputi seluruh komponen sumber daya rumah sakit yang digunakan dalam pelayanan baik medis maupun nonmedis. Lihat lampiran Peraturan Menteri Kesehatan Republik Indonesia Nomor 52 Tahun 2016 tentang Standar Tarif Pelayanan Kesehatan dalam Penyelenggaraan Program Jaminan Kesehatan
40 FKL33 Kode special sub-acute groups (SA) 
Kode special sub-acute groups
41 FKL34 Tarif special sub-acute groups (SA) 
Tarif special sub-acute groups
42 FKL35 Kode special procedures (SP) 
Kode special procedures
43 FKL36 Deskripsi special procedures (SP) 
Deskripsi special procedures
44 FKL37 Tarif special procedures (SP)
Tarif special procedures
45 FKL38 Kode special prosthesis (RR)
Kode special prosthesis
46 FKL39 Deskripsi special prosthesis (RR)
Deskripsi special prosthesis
47 FKL40 Tarif special prosthesis (RR)
Tarif special prosthesis
48 FKL41 Kode special investigation(SI)
Kode special investigation
49 FKL42 Deskripsi special investigation(SI)
Deskripsi special investigation
50 FKL43 Tarif special investigation(SI)
Tarif special investigation
51 FKL44 Kode special drugs (SD) 
Kode special drugs

Page 62/63
52 FKL45 Deskripsi special drugs (SD)
Deskripsi special drugs
53 FKL46 Tarif special drugs (SD) 
Tarif special drugs
54 FKL47 Biaya Tagih - oleh fasilitas kesehatan (provider)
Biaya yang ditagihkan untuk setiap ID kunjungan yang merupakan penjumlahan dari FKL33 + FKL35 + FKL38 + FKL41 + FKL44 + FKL47
55 FKL48 Biaya Verifikasi - BPJS Kesehatan 
setelah dilakukan verifikasi Biaya yang diverifikasi BPJS Kesehatan untuk setiap ID kunjungan

# API Documentation

https://documenter.getpostman.com/view/29042682/2s9YkraKDV
