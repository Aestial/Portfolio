from django.db import models

# Create your models here.

GRADE_OPTIONS = (
    ('K', 'Preescolar'),
    ('P', 'Primaria'),
    ('S', 'Secundaria'),
)

YEAR_GRADE = (
    ('1', 'Primero'),
    ('2', 'Segundo'),
    ('3', 'Tercero'),
    ('4', 'Cuarto'),
    ('5', 'Quinto'),
    ('6', 'Sexto'),
)

class Interactive(models.Model):
    title = models.CharField(max_length=140)
    body = models.TextField(blank=True)

    def __str__(self):
        return self.title

class Card(models.Model):
    index = models.IntegerField()
    grade = models.CharField(max_length=1, choices=GRADE_OPTIONS)
    # year = models.CharField(max_length=1, choices)
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

