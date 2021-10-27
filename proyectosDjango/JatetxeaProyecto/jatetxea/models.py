from django.db import models

# Create your models here.

class Banatzailea(models.Model):
    nanbanatzailea=models.CharField(max_length=9, verbose_name="NaNBanatzailea")
    izena=models.CharField(max_length=50)
    abizena=models.CharField(max_length=50)
    telefonoa=models.CharField(max_length=50)

    def __str__(self):
        return self.izena

class Janariak(models.Model):
    izena=models.CharField(max_length=50)
    prezioa=models.CharField(max_length=50)
    kopurua=models.CharField(max_length=50)
    argazkia=models.ImageField()
    deskripzioa=models.CharField(max_length=100)
    janarimota=models.CharField(max_length=100)
    posizioa=models.CharField(max_length=10)

    def __str__(self):
        return self.izena

class Janarimota(models.Model):
    izena=models.CharField(max_length=50)
    argazkia=models.ImageField()

    def __str__(self):
        return self.izena
    