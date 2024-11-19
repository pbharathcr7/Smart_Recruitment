# Generated by Django 4.2.16 on 2024-10-11 13:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_title', models.CharField(max_length=200)),
                ('job_description', models.TextField()),
                ('department', models.CharField(max_length=100)),
                ('location', models.CharField(max_length=100)),
                ('employment_type', models.CharField(max_length=50)),
                ('salary_range', models.CharField(max_length=100)),
                ('application_deadline', models.DateField()),
                ('qualifications', models.TextField()),
                ('responsibilities', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]