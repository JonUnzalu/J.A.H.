import sys
import mariadb

try:
    conn1 = mariadb.connect(
        user='root',
        password='Admin123',
        host='localhost',
    )
    print('Conexion establecida')

    cur1 = conn1.cursor()
    cur1.execute("CREATE DATABASE IF NOT EXISTS jatetxea")

    print('Creada la base de datos')

except mariadb.Error as error:
    print(error)
    sys.exit(1)

try:
    conn = mariadb.connect(
        user='root',
        password='Admin123',
        host='localhost',
        database='jatetxea'
    )
    print('Conexion establecida')

    sql = "CREATE TABLE BEZEROA ( NanBezeroa varchar(9) NOT NULL, Izena varchar(50) NOT NULL, Abizena varchar(50) NOT NULL, Telefonoa varchar(50) NOT NULL, Helbidea varchar(50) NOT NULL, PostaKodea varchar(50) NOT NULL, OrdainketaMota varchar(50) NOT NULL, Erabiltzailea varchar(50) NOT NULL, Pasahitza varchar(50) NOT NULL, PRIMARY KEY (NanBezeroa) );"
    sql1 = "CREATE TABLE BANATZAILEA ( NanBanatzailea varchar(9) NOT NULL, Izena varchar(50) NOT NULL, Abizena varchar(50) NOT NULL, Telefonoa varchar(50) NOT NULL, PRIMARY KEY (NanBanatzailea) );"
    sql2 = "CREATE TABLE JANARIA ( IdJanaria integer NOT NULL AUTO_INCREMENT, JanariIzena varchar(50) NOT NULL, Prezioa float NOT NULL, Kopurua integer NOT NULL, PRIMARY KEY (IdJanaria) );"
    sql3 = "CREATE TABLE ESKAERA ( CodEskaera integer NOT NULL AUTO_INCREMENT, NanBezeroa varchar(9) NOT NULL, EskaeraData datetime NOT NULL, Entregatua boolean NOT NULL, PrezioTotala float, NanBanatzailea varchar(9) NOT NULL, PRIMARY KEY (CodEskaera), FOREIGN KEY (NanBezeroa) REFERENCES BEZEROA(NanBezeroa), FOREIGN KEY (NanBanatzailea) REFERENCES BANATZAILEA(NanBanatzailea) );"
    sql4 = "CREATE TABLE SASKIA ( CodSaskia integer NOT NULL AUTO_INCREMENT, IdJanaria integer NOT NULL, CodEskaera integer NOT NULL, Kopurua integer NOT NULL, PRIMARY KEY (CodSaskia), FOREIGN KEY (CodEskaera) REFERENCES ESKAERA(CodEskaera), FOREIGN KEY (IdJanaria) REFERENCES JANARIA(IdJanaria) );"
    sql5 = "INSERT INTO BEZEROA VALUES ('12345678A', 'Jon', 'Uwuzanlu','946292929', 'Durango', '48200', 'Paypal', 'Gilgameshsimp', 'soyotaku');"
    sql6 = "INSERT INTO BANATZAILEA VALUES ('11111111A', 'Mikel','Sapo', '954949494'), ('11111111B', 'Alvaro','Sapo', '954343434');"
    sql7 = "INSERT INTO JANARIA (JanariIzena, Prezioa, Kopurua) VALUES ('Kebap', 5.99, 20), ('Kalipo', 2.00, 20);"
    sql8 = "INSERT INTO ESKAERA (NanBezeroa, EskaeraData, Entregatua, PrezioTotala, NanBanatzailea) VALUES ('12345678A', '2021-09-15 23:59:59', TRUE,0.00,'11111111A'), ('12345678A', '2021-09-16 23:59:59', FALSE,0.00,'11111111B');"
    sql9 = "INSERT INTO SASKIA (IdJanaria, CodEskaera, Kopurua) VALUES (1, 1, 2), (2, 1, 1), (1, 2, 1);"

    cur = conn.cursor()
    cur.execute(sql)
    cur.execute(sql1)
    cur.execute(sql2)
    cur.execute(sql3)
    cur.execute(sql4)
    cur.execute(sql5)
    cur.execute(sql6)
    cur.execute(sql7)
    cur.execute(sql8)
    cur.execute(sql9)
    conn.commit()


except mariadb.Error as error:
    print(error)
    sys.exit(1)