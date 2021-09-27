class Bezeroa:
    def __init__(self, Nan, Izena, Abizena, Telefonoa, Helbidea, PostaKodea, OrdainketaMota, Erabiltzailea, Pasahitza):
        self.NanBezeroa = Nan
        self.Izena = Izena
        self.Abizena = Abizena
        self.Telefonoa = Telefonoa
        self.Helbidea = Helbidea
        self.PostaKodea = PostaKodea
        self.OrdainketaMota = OrdainketaMota
        self.Erabiltzailea = Erabiltzailea
        self.Pasahitza = Pasahitza

class Banatzailea:
    def __init__(self, Nan, Izena, Abizena, Telefonoa):
        self.NanBanatzailea = Nan
        self.Izena = Izena
        self.Abizena = Abizena
        self.Telefonoa = Telefonoa

class Janaria:
    def __init__(self, Id, Izena, Prezioa, Kopurua):
        self.IdJanaria = Id
        self.JanariIzena = Izena
        self.Prezioa = Prezioa
        self.Kopurua = Kopurua

class Eskaera:
    def __init__(self, Cod, NanBez, NanBan, Data, Entregatua, PrezioTotala):
        self.CodEskaera = Cod
        self.NanBezeroa = NanBez
        self.NanBanatzailea = NanBan
        self.EskaeraData = Data
        self.Entregatua = Entregatua
        self.PrezioTotala = PrezioTotala

class Saskia:
    def __init__(self, Cod, IdJan, CodEsk, Kopurua):
        self.CodSaskia = Cod
        self.IdJanaria = IdJan
        self.CodEskaera = CodEsk
        self.Kopurua = Kopurua
