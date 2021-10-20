from django.db import models

# Create your models here.

class Banatzailea(models.Model):
    nanbanatzailea=models.CharField(max_length=9, verbose_name="NaNBanatzailea")
    izena=models.CharField(max_length=50)
    abizena=models.CharField(max_length=50)
    telefonoa=models.CharField(max_length=50)

    def __str__(self):
        return self.izena
