from django.db import models


predio_choices = [
  ('a', 'Prédio A'),
  ('b1', 'Prédio B1'),
  ('b2', 'Prédio B2'),
  ('b3', 'Prédio B3'),
  ('c1', 'Prédio C1'),
  ('c2', 'Prédio C2'),
  ('c3', 'Prédio C3'),
]

class Vendedor(models.Model):
    nome = models.CharField(max_length=100, null=False, blank=False)
    email = models.EmailField()
    observacao = models.CharField(verbose_name='Observação', max_length=200, default='Sem observações')
    local = models.CharField(verbose_name='Prédio', choices=predio_choices, max_length=100, default='b2')
    telefone = models.CharField(max_length=15, null=True, blank=True, help_text='(86) 99999-9999')

    class Meta:
      verbose_name = 'Vendedor'
      verbose_name_plural = 'Vendedores'
    
    def __str__(self):
      return f'{self.nome}'

    def quantidade_produtos(self):
      return self.produtos.count()
    quantidade_produtos.short_description = 'Produtos'


class Produto(models.Model):
    nome = models.CharField(verbose_name='Nome', max_length=50, blank=False, null=False)
    preco = models.DecimalField(verbose_name='Preço', max_digits=6, decimal_places=2)
    ativo = models.BooleanField(default=True)

    vendedor = models.ForeignKey(Vendedor, on_delete=models.CASCADE, related_name='produtos')

    class Meta:
      verbose_name = 'Produto'


  
