from django.db import models

# Create your models here.

class Janariak(models.Model):
    izena=models.CharField(max_length=50)
    prezioa=models.CharField(max_length=50)
    kopurua=models.CharField(max_length=50)
    argazkia=models.ImageField()
    deskripzioa=models.CharField(max_length=100)
    janarimota=models.IntegerField()
    posizioa=models.CharField(max_length=10)
    def __str__(self):
        return self.izena

class Janarimota(models.Model):
    izena=models.CharField(max_length=50)
    argazkia=models.ImageField()

    def __str__(self):
        return self.izena

class Repartidor(models.Model):
    nanbanatzailea=models.CharField(max_length=9, verbose_name="NaNBanatzailea")
    izena=models.CharField(max_length=50)
    abizena=models.CharField(max_length=50)
    telefonoa=models.CharField(max_length=50)
    urtebetetzea=models.DateField("Urtebetetzea")

    def __str__(self):
        return self.izena

class Saskia(models.Model):
    idJanaria=models.IntegerField()
    codEskaera=models.IntegerField()
    kopurua=models.IntegerField()

    def __str__(self):
        return self.idJanaria

class Eskaera(models.Model):
    bezeroErabiltzailea=models.CharField(max_length=150)
    eskaeraData=models.DateField()
    baieztatua=models.BooleanField()
    prezioTotala=models.FloatField()
    nanBanatzailea=models.CharField(max_length=9)

    def __str__(self):
        return self.nanBezeroa
