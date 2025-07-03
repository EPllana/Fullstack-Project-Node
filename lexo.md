si ka startu projekti nga fillimi <3>
ktu e komentojm si e startojm projektin etj  me npm init 
e shtojm server.js dhe prej indeksit ne server.js
e shtojm type:"module" na kallzon mnyren per me i importu filet require esht e vjeter kjo esht metoda e re
dhe tek test e shtojm node server.js tek skripta  apo start  e shtojm start nodemon server .js 
e shtojm te packge.json  expressin  npm install express ose nmyr medor me shtu 
portin ne env dhe e einstalojm npm i dotenv dhe e importtojm import dotenv from "dotenv"
dotenv.config();// e lexon dotenv pastaj per me lexu nga .envportin esht kjo posht 
const PORT = process.env.PORT;
VARIBALAT NE .ENV ME SHKRONJA TMADHAJ TONA 
        process.exit(1);// kur ndodh naj gabim apo diqka e shut down kompelt o mir me perdor se kur te sulmon dikush projektin a databasen  e bon shut down

npm install cors
cors e nuk e lejon gjithkon memarr tdhana prej faqes ton  i jep akses t limitun 

folderi server config konfigurimet e serverit 

pastaj e instalojm npm i mongoose  per datba pastaj e bojm import tek database.js
shkojm te cliuster nbrowse collections dhe e krijojm nje dtb tre  ja kem venods emrin travel-api , dhe collection name user me cluster index...
tek linku i databases qe kemi marr nga mongodb ne fund e shtojm  /dhe emrin e databases qe e kemi len nket rast ne ee kemi travel-api si shembulli meposht 
MONGODB_URI=mongodb+srv://infooutdoorks:outdorks@cluster07.dvexkix.mongodb.net/travel-api  



tek modules i vendsim krejt userat reviews etj 
mrena userit i  krijojm 3 file routes controller dhe modules 