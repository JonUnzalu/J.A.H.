# Generated by Django 3.2.8 on 2021-11-05 09:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Eskaera',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bezeroErabiltzailea', models.CharField(max_length=150)),
                ('eskaeraData', models.DateField()),
                ('baieztatua', models.BooleanField()),
                ('prezioTotala', models.FloatField()),
                ('nanBanatzailea', models.CharField(max_length=9)),
            ],
        ),
        migrations.CreateModel(
            name='Janariak',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('izena', models.CharField(max_length=50)),
                ('prezioa', models.CharField(max_length=50)),
                ('kopurua', models.CharField(max_length=50)),
                ('argazkia', models.ImageField(upload_to='')),
                ('deskripzioa', models.CharField(max_length=100)),
                ('janarimota', models.IntegerField()),
                ('posizioa', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Janarimota',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('izena', models.CharField(max_length=50)),
                ('argazkia', models.ImageField(upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Repartidor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nanbanatzailea', models.CharField(max_length=9, verbose_name='NaNBanatzailea')),
                ('izena', models.CharField(max_length=50)),
                ('abizena', models.CharField(max_length=50)),
                ('telefonoa', models.CharField(max_length=50)),
                ('urtebetetzea', models.DateField(verbose_name='Urtebetetzea')),
            ],
        ),
        migrations.CreateModel(
            name='Saskia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('idJanaria', models.IntegerField()),
                ('codEskaera', models.IntegerField()),
                ('kopurua', models.IntegerField()),
            ],
        ),
    ]
