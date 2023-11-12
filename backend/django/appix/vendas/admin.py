from django.contrib import admin
from vendas.models import Vendedor, Produto

class ProdutoInline(admin.TabularInline):
    model = Produto
    extra = 1


@admin.register(Vendedor)
class VendedorAdmin(admin.ModelAdmin):
    list_display = ['id', 'nome', 'local', 'telefone', 'quantidade_produtos']
    list_filter = ['local']
    search_fields = ['nome']
    
    inlines = [ProdutoInline]


# @admin.register(Produto)
# class ProdutoAdmin(admin.ModelAdmin):
#     list_display = ['id', 'nome', 'preco']

# admin.site.register(Vendedor)

