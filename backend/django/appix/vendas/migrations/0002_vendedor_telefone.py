# Generated by Django 4.2.6 on 2023-10-26 18:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vendas', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='vendedor',
            name='telefone',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
    ]