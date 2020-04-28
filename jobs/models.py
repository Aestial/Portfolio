from django.db import models

class Job(models.Model):
    title = models.CharField(max_length=140, default="Job title")
    image = models.ImageField(upload_to='images/')
    summary = models.CharField(max_length=200)
    tags = models.CharField(max_length=255, default="")

    def __str__(self):
        return self.title
