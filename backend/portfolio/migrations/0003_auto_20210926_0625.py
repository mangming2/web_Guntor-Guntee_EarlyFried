# Generated by Django 3.2 on 2021-09-26 06:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0002_auto_20210925_0639'),
    ]

    operations = [
        migrations.AlterField(
            model_name='portfolioitem',
            name='portfolio',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='portfolio_items', to='portfolio.portfolio'),
        ),
        migrations.AlterField(
            model_name='specificationcard',
            name='portfolio',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='specification_cards', to='portfolio.portfolio'),
        ),
    ]
