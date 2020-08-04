from django.db import models
from django.core.exceptions import ValidationError

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

def validate_image(image):
    max_width = 800
    max_height = 800
    height = image.height 
    width = image.width
    error_message = "Image height or width is larger than allowed: "+str(max_width)+"x"+str(max_height)
    if width > max_width or height > max_height:
        raise ValidationError(error_message)

# class Book(models.Model):
#     title = models.CharField(max_length=200)
#     description = models.TextField()
#     grade = models.CharField(max_length=1, choices=GRADE_OPTIONS)
#     year = models.PositiveSmallIntegerField()
#     image = models.ImageField(upload_to='divertida/images/books/', null=True, validators=[validate_image])
#     class Meta():
#         ordering = ['grade', 'year']

#     def __str__(self):
#         return self.title

# class Interactive(models.Model):
#     title = models.CharField(max_length=140)
#     body = models.TextField(blank=True)
#     image = models.ImageField(upload_to='divertida/images/interacts/', null=True, validators=[validate_image])
    
#     def __str__(self):
#         return self.title

# class Card(models.Model):
#     index = models.PositiveSmallIntegerField()
#     title = models.CharField(max_length=200)
#     interactive = models.ForeignKey(Interactive, related_name='interactive', on_delete=models.DO_NOTHING)
#     book = models.ForeignKey(Book, related_name='book', on_delete=models.SET_NULL, null=True)
    
#     class Meta():
#         ordering = ['book', 'index']
        
#     def __str__(self):
#         return self.book.title + ": " + self.title

# class Instructions(models.Model):
#     card = models.ForeignKey(Card, related_name='card', on_delete=models.DO_NOTHING, null=True)
#     title = models.CharField(max_length=100)
#     body = models.TextField()

#     def __str__(self):
#         return self.title

