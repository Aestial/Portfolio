from django.db import models

# Create a Job
class Job(models.Model):
    title = models.CharField(max_length=140, default="Job title")
    summary = models.CharField(max_length=200)
    body = models.TextField(default="HTML Body!")
    tags = models.CharField(max_length=255, default="")

    def __str__(self):
        return self.title

class JobImage(models.Model):
    job = models.ForeignKey(Job, related_name='images', on_delete=models.CASCADE)
    title = models.CharField(max_length=50, default="Image title")
    description = models.CharField(max_length=80, default="Image description")
    image = models.ImageField(upload_to='images/jobs/', default='/static/default/img.png')

    def __str__(self):
        return self.title

