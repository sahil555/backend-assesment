# Generated by Django 2.2.12 on 2021-04-23 07:18

import core.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_auto_20210420_1025'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='user_picture',
            field=models.ImageField(blank=True, default=None, null=True, upload_to=core.models.imagepathconvert),
        ),
        migrations.AlterField(
            model_name='userposts',
            name='u_id',
            field=models.UUIDField(editable=False, primary_key=True, serialize=False),
        ),
    ]
