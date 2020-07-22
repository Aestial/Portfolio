from django.db import models

# Create your models here.
class Interactive(models.Model):
    title = models.CharField(max_length=140)
    body = models.TextField(blank=True)

    def __str__(self):
        return self.title

class Card(models.Model):
    index = models.IntegerField()
    grade = models.IntegerField()
    title = models.CharField(max_length=200)
    interactive = models.ForeignKey(Interactive, related_name='interactive', on_delete=models.DO_NOTHING)

    class Meta():
        ordering = ['grade', 'index']
        
    def __str__(self):
        return self.title

class Instructions(models.Model):
    instructions = models.ForeignKey(Card, related_name='instructions', on_delete=models.DO_NOTHING)
    title = models.CharField(max_length=100)
    body = models.TextField()

    def __str__(self):
        return self.title

