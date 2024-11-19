# Generated by Django 4.2.16 on 2024-10-12 17:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_alter_applicantprofile_gender'),
        ('jobs', '0003_rename_employment_type_job_employmenttype'),
    ]

    operations = [
        migrations.CreateModel(
            name='JobApplication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('applied_at', models.DateTimeField(auto_now_add=True)),
                ('applicant_profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='applications', to='accounts.applicantprofile')),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='applications', to='jobs.job')),
            ],
        ),
    ]
